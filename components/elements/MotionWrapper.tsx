'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const MotionWrapper = ({ children }: Props) => (
  <AnimatePresence>
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {children}
    </motion.div>
  </AnimatePresence>
)

export default MotionWrapper