import { Toaster } from 'react-hot-toast'
import './globals.css'
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Login',
  description: 'Banking',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>

      <Toaster className="bg-blue-500 text-white p-4 rounded shadow-md" position="top-right" reverseOrder={false} gutter={8} containerClass="mt-4" containerStyle={{ zIndex: 9999 }} />

    </html>
  )
}
