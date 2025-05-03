/* eslint-disable @next/next/no-img-element */
import { useMediaQuery } from '@/hooks/useMediaQuery'
import styles from '@/styles/part/index.module.scss'
import Image from 'next/image'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

const PartSlider = ({ images }: { images: string[] }) => {
  const isMobile700 = useMediaQuery(700)
  const isMobile530 = useMediaQuery(530)

  const settings = {
    dots: false,
    infinite: true,
    variableWidth: true,
    autoplay: true,
    speed: 500,
    arrows: false,
    slidesToScroll: 1,
  }

  return (
    <Slider {...settings} className={styles.part__slider}>
      {images.map((src, i) => (
        <div
          className={styles.part__slide}
          key={i}
          style={{ width: isMobile530 ? 228 : isMobile700 ? 350 : 593 }}
        >
          <Image 
            src={src}
            alt={`image-${i + 1}`}
            width={isMobile530 ? 228 : isMobile700 ? 350 : 593}
            height={isMobile530 ? 228 : isMobile700 ? 350 : 593}
            priority={false}
          />
        </div>
      ))}
    </Slider>
  )
}

export default PartSlider
