import { getBestsellersOrNewPartsFx } from '@/app/api/boilerParts'
import BrandsSlider from '@/components/modules/DashboardPage/BrandsSlider'
import CartAlert from '@/components/modules/DashboardPage/CartAlert'
import { $mode } from '@/context/mode'
import { $shoppingCart } from '@/context/shopping-cart'
import { useConnectionType } from '@/hooks/useConnectionType'
import styles from '@/styles/dashboard/index.module.scss'
import { IBoilerParts } from '@/types/boilerparts'
import type { IDashboardSlider } from '@/types/dashboard'
import { useStore } from 'effector-react'
import dynamic from 'next/dynamic'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'

const DashboardSlider = dynamic<IDashboardSlider>(
  () => import('@/components/modules/DashboardPage/DashboardSlider'),
  {
    ssr: false,
    loading: () => <div>Загрузка слайдера...</div>,
  }
)

const MotionWrapper = dynamic(() => import('@/components/elements/MotionWrapper'), {
  ssr: false,
})

const placeholderBlockStyle = {
  height: '300px',
  backgroundColor: '#f5f5f5',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#666',
}

const DashboardPage = () => {
  const [newParts, setNewParts] = useState<IBoilerParts>({} as IBoilerParts)
  const [bestsellers, setBestsellers] = useState<IBoilerParts>({} as IBoilerParts)
  const [spinner, setSpinner] = useState(false)
  const shoppingCart = useStore($shoppingCart)
  const [showAlert, setShowAlert] = useState(!!shoppingCart.length)
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? styles.dark_mode : ''
  const connectionType = useConnectionType()

  const isSlowConnection = useMemo(
    () => ['2g', '3g', 'slow-2g'].includes(connectionType),
    [connectionType]
  )

  const loadBoilerParts = useCallback(async () => {
    try {
      setSpinner(true)

      const bestsellers = await getBestsellersOrNewPartsFx('/boiler-parts/bestsellers')
      const newParts = await getBestsellersOrNewPartsFx('/boiler-parts/new')

      setBestsellers(bestsellers)
      setNewParts(newParts)
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }, [])

  useEffect(() => {
    loadBoilerParts()
  }, [loadBoilerParts])

  useEffect(() => {
    setShowAlert(!!shoppingCart.length)
  }, [shoppingCart.length])

  const closeAlert = () => setShowAlert(false)

  return (
    <section className={styles.dashboard}>
      <div className={`container ${styles.dashboard__container}`}>
        {showAlert && (
          <MotionWrapper>
            <div className={`${styles.dashboard__alert} ${darkModeClass}`}>
              <CartAlert
                count={shoppingCart.reduce((total, item) => total + item.count, 0)}
                closeAlert={closeAlert}
              />
            </div>
          </MotionWrapper>
        )}

        <div className={styles.dashboard__brands}>
          {!isSlowConnection ? (
            <BrandsSlider />
          ) : (
            <div style={{ ...placeholderBlockStyle, height: '80px', fontSize: '14px' }}>
              Слайдер брендов скрыт при медленном соединении
            </div>
          )}
        </div>

        <h2 className={`${styles.dashboard__title} ${darkModeClass}`}>
          Детали для газовых котлов
        </h2>

        <div className={styles.dashboard__parts}>
          <h3 className={`${styles.dashboard__parts__title} ${darkModeClass}`}>
            Хиты продаж
          </h3>
          {!isSlowConnection ? (
            <DashboardSlider items={bestsellers.rows || []} spinner={spinner} />
          ) : (
            <div style={placeholderBlockStyle}>
              <p style={{ margin: 0 }}>Слайдер скрыт при медленном соединении</p>
            </div>
          )}
        </div>

        <div className={styles.dashboard__parts}>
          <h3 className={`${styles.dashboard__parts__title} ${darkModeClass}`}>
            Новинки
          </h3>
          {!isSlowConnection ? (
            <DashboardSlider items={newParts.rows || []} spinner={spinner} />
          ) : (
            <div style={placeholderBlockStyle}>
              <p style={{ margin: 0 }}>Слайдер скрыт при медленном соединении</p>
            </div>
          )}
        </div>

        <div className={styles.dashboard__about}>
          <h3
            className={`${styles.dashboard__parts__title} ${styles.dashboard__about__title} ${darkModeClass}`}
          >
            О компании
          </h3>
          <p className={`${styles.dashboard__about__text} ${darkModeClass}`}>
            Инструкции и схемы помогут разобраться в эксплуатации, определить неисправность
            и правильно выбрать запчасть для ремонта Вашего газового оборудования.
            Купить запчасть, деталь для ремонта газового котла возможно в любом населенном
            пункте Российской Федерации: Осуществляем доставку запчасти к газовым котлам
            в следующие города: Москва, Сан...
          </p>
        </div>
      </div>
    </section>
  )
}

export default DashboardPage
