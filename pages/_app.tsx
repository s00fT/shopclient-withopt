import '@/styles/globals.css'
import { withHydrate } from 'effector-next'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import NextNProgress from 'nextjs-progressbar'
import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// 🔽 Layout подключается через динамический импорт
const Layout = dynamic(() => import('@/components/templates/Layout/Layout'), {
  ssr: false,
  loading: () => <div>Загрузка интерфейса...</div>,
})

const enhance = withHydrate()

function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      <NextNProgress />
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ToastContainer
        position="bottom-right"
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        limit={1}
        theme="light"
      />
    </>
  )
}

export default enhance(App as React.FC<AppProps>)
