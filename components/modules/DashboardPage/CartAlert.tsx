import { $mode } from '@/context/mode'
import { $totalPrice } from '@/context/shopping-cart'
import styles from '@/styles/dashboard/index.module.scss'
import { ICartAlertProps } from '@/types/dashboard'
import { formatPrice } from '@/utils/common'
import { useStore } from 'effector-react'
import Link from 'next/link'

const CartAlert = ({ count, closeAlert }: ICartAlertProps) => {
  const mode = useStore($mode)
  const totalPrice = useStore($totalPrice)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const showCountMessage = (count: number) => {
    const lastDigit = count % 10
    const lastTwoDigits = count % 100

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return 'товаров'
    if (lastDigit === 1) return 'товар'
    if (lastDigit >= 2 && lastDigit <= 4) return 'товара'
    return 'товаров'
  }

  return (
    <>
      <div className={`${styles.dashboard__alert__left} ${darkModeClass}`}>
        <span>
          В корзине {count} {showCountMessage(count)}
        </span>
        <span>На сумму {formatPrice(totalPrice)} ₽</span>
      </div>
      <div className={styles.dashboard__alert__right}>
        <Link href="/order" passHref legacyBehavior>
          <a className={styles.dashboard__alert__btn_cart}>Перейти в корзину</a>
        </Link>
        <Link href="/order" passHref legacyBehavior>
          <a className={styles.dashboard__alert__btn_order}>Оформить заказ</a>
        </Link>
      </div>
      <button
        className={styles.dashboard__alert__btn_close}
        onClick={closeAlert}
        aria-label="Закрыть уведомление"
      />
    </>
  )
}

export default CartAlert