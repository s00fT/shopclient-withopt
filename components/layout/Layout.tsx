import { ILayoutProps } from '@/types/common'
import dynamic from 'next/dynamic'

// 👇 динамический импорт
const Header = dynamic(() => import('../modules/Header/Header'), {
  ssr: false,
  loading: () => <div>Загрузка шапки...</div>,
})

const Footer = dynamic(() => import('../modules/Footer/Footer'), {
  ssr: false,
  loading: () => <div>Загрузка подвала...</div>,
})

const Layout = ({ children }: ILayoutProps) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
)

export default Layout