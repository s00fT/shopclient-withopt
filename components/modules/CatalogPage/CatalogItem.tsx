import { removeFromCartFx } from '@/app/api/shopping-cart'
import CartHoverCheckedSvg from '@/components/elements/CartHoverCheckedSvg/CartHoverCheckedSvg'
import CartHoverSvg from '@/components/elements/CartHoverSvg/CartHoverSvg'
import { $mode } from '@/context/mode'
import { $shoppingCart } from '@/context/shopping-cart'
import { $user } from '@/context/user'
import styles from '@/styles/catalog/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import { IBoilerPart } from '@/types/boilerparts'
import { formatPrice } from '@/utils/common'
import { toggleCartItem } from '@/utils/shopping-cart'
import { useStore } from 'effector-react'
import Image from 'next/image'
import Link from 'next/link'

const CatalogItem = ({
  item,
  isFirst,
}: {
  item: IBoilerPart
  isFirst?: boolean
}) => {
  const mode = useStore($mode)
  const user = useStore($user)
  const shoppingCart = useStore($shoppingCart)
  const isInCart = shoppingCart.some((cartItem) => cartItem.partId === item.id)
  const spinner = useStore(removeFromCartFx.pending)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const toggleToCart = () => toggleCartItem(user.username, item.id, isInCart)

  let imageSrc = '/images/boiler-parts/placeholder.webp'
  try {
    const parsed = typeof item.images === 'string' ? JSON.parse(item.images) : []
    if (Array.isArray(parsed) && parsed.length > 0) {
      imageSrc = parsed[0]
    }
  } catch (e) {
    console.warn('Ошибка парсинга изображения:', e)
  }

  return (
    <li className={`${styles.catalog__list__item} ${darkModeClass}`}>
      <div className={styles.catalog__list__item__image_wrapper}>
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '220px',
          }}
        >
          <Image
            src={imageSrc}
            alt={item.name}
            fill
            sizes="(max-width: 768px) 100vw, 640px"
            style={{ objectFit: 'contain' }}
            priority={!!isFirst}
            placeholder="blur"
            blurDataURL="/images/boiler-parts/placeholder.webp"
            className={styles.catalog__list__item__image}
          />
        </div>
      </div>
      <div className={styles.catalog__list__item__inner}>
        <Link href={`/catalog/${item.id}`} passHref legacyBehavior>
          <h3 className={styles.catalog__list__item__title}>{item.name}</h3>
        </Link>
        <span className={styles.catalog__list__item__code}>
          Артикул: {item.vendor_code}
        </span>
        <span className={styles.catalog__list__item__price}>
          {formatPrice(item.price)} ₽
        </span>
      </div>
      <button
        className={`${styles.catalog__list__item__cart} ${isInCart ? styles.added : ''}`}
        disabled={spinner}
        onClick={toggleToCart}
      >
        {spinner ? (
          <div className={spinnerStyles.spinner} style={{ top: 6, left: 6 }} />
        ) : (
          <span>{isInCart ? <CartHoverCheckedSvg /> : <CartHoverSvg />}</span>
        )}
      </button>
    </li>
  )
}

export default CatalogItem
