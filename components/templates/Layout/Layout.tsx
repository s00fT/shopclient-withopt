import Footer from '@/components/modules/Footer/Footer'
import Header from '@/components/modules/Header/Header'
import { ILayoutProps } from '@/types/common'

const Layout = ({ children }: ILayoutProps) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
)

export default Layout
