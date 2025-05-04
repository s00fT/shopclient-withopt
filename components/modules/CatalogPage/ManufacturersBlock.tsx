import { $mode } from '@/context/mode'
import styles from '@/styles/catalog/index.module.scss'
import { IManufacturersBlockProps } from '@/types/catalog'
import { useStore } from 'effector-react'
import { AnimatePresence, motion } from 'framer-motion'
import ManufacturersBlockItem from './ManufacturersBlockItem'

const ManufacturersBlock = ({
  title,
  manufacturersList,
  event,
}: IManufacturersBlockProps) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? styles.dark_mode : ''
  const checkedItems = manufacturersList.filter((item) => item.checked)

  if (!checkedItems.length) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`${styles.manufacturers} ${darkModeClass}`}
    >
      <h3 className={styles.manufacturers__title}>{title}</h3>

      <ul className={styles.manufacturers__list}>
        <AnimatePresence>
          {checkedItems.map((item) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <ManufacturersBlockItem item={item} event={event} />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </motion.div>
  )
}

export default ManufacturersBlock
