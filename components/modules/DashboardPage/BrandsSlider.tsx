import BrandsSliderNextArrow from '@/components/elements/BrandsSliderNextArrow/BrandsSliderNextArrow'
import BrandsSliderPrevArrow from '@/components/elements/BrandsSliderPrevArrow/BrandsSliderPrevArrow'
import { $mode } from '@/context/mode'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import styles from '@/styles/dashboard/index.module.scss'
import { useStore } from 'effector-react'
import Image from 'next/image'
import { useEffect } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

const brandItems = [
  { id: 1, img: '/img/brand-1.png', alt: 'Логотип бренда 1' },
  { id: 2, img: '/img/brand-3.png', alt: 'Логотип бренда 3' },
  { id: 3, img: '/img/brand-2.svg', alt: 'Логотип бренда 2' },
  { id: 4, img: '/img/brand-4.png', alt: 'Логотип бренда 4' },
  { id: 5, img: '/img/brand-1.png', alt: 'Логотип бренда 1' },
  { id: 6, img: '/img/brand-3.png', alt: 'Логотип бренда 3' },
  { id: 7, img: '/img/brand-2.svg', alt: 'Логотип бренда 2' },
  { id: 8, img: '/img/brand-1.png', alt: 'Логотип бренда 1' },
  { id: 9, img: '/img/brand-3.png', alt: 'Логотип бренда 3' },
  { id: 10, img: '/img/brand-4.png', alt: 'Логотип бренда 4' },
  { id: 11, img: '/img/brand-2.svg', alt: 'Логотип бренда 2' },
  { id: 12, img: '/img/brand-1.png', alt: 'Логотип бренда 1' },
]

const BrandsSlider = () => {
  const isMedia768 = useMediaQuery(768)
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  useEffect(() => {
    const slider = document.querySelector(
      `.${styles.dashboard__brands__slider}`
    )
    const list = slider?.querySelector('.slick-list') as HTMLElement

    if (list) {
      list.style.height = isMedia768 ? '60px' : '80px'
    }
  }, [isMedia768])

  const settings = {
    dots: false,
    infinite: true,
    slidesToScroll: 1,
    variableWidth: true,
    autoplay: true,
    speed: 500,
    nextArrow: <BrandsSliderNextArrow modeClass={darkModeClass} />,
    prevArrow: <BrandsSliderPrevArrow modeClass={darkModeClass} />,
  }

  return (
    <Slider {...settings} className={styles.dashboard__brands__slider}>
      {brandItems.map((item) => (
        <div
          key={item.id}
          className={`${styles.dashboard__brands__slide} ${darkModeClass}`}
          style={{ width: isMedia768 ? 124 : 180 }}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: isMedia768 ? 60 : 80,
            }}
          >
            <Image
              src={item.img}
              alt={item.alt}
              fill
              sizes="(max-width: 768px) 124px, 180px"
              style={{ objectFit: 'contain' }}
              loading="lazy"
            />
          </div>
        </div>
      ))}
    </Slider>
  )
}

export default BrandsSlider
