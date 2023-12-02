'use client'
import { Toaster } from 'react-hot-toast'
import '../globals.css'
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createContext, useState } from 'react'
const inter = Inter({ subsets: ['latin'] })



export const RecoveryContext = createContext();


export default function RootLayout({ children }) {
    const [page, setPage] = useState("login");
    const [email, setEmail] = useState();
    const [otp, setOTP] = useState();
    return (
        <>
            <RecoveryContext.Provider value={{ page, setPage, otp, setOTP, setEmail, email }}>
                <html lang="en">
                    <body className={inter.className}>{children}</body>
                    <Toaster className="bg-blue-500 text-white p-4 rounded shadow-md" position="top-right" reverseOrder={false} gutter={8} containerClass="mt-4" containerStyle={{ zIndex: 9999 }} />
                </html>
            </RecoveryContext.Provider>
        </>

    )
}
