import './globals.css'
import { Inter, Truculenta } from 'next/font/google'
import ThemeRegistry from '../themes/themeRegistry'
import CookieConsentFooter from '@/components/cookieConsent/cookieConsentFooter'
import { cookies } from 'next/headers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CJC Fantasy Football',
  description: 'A fantasy football app that needs to be built',
}

export default function RootLayout({ children }) {

  const cookiesAckd = cookies().has(process.env.NEXT_PUBLIC_COOKIES_ACKD)
  async function setCookiesAckd(){
    'use server'
    cookies().set(process.env.NEXT_PUBLIC_COOKIES_ACKD, true, {
      maxAge: 15811200,
      sameSite: 'none',
      secure: true
    })
  }

  return (
    <html lang="en">
      <ThemeRegistry options={{key: 'mui-style'}}>
        <body className={inter.className}>
          <main>{children}</main>
         <footer><CookieConsentFooter 
                    cookiesAckd={cookiesAckd}
                    setCookiesAckd={setCookiesAckd} /></footer>
        </body>
      </ThemeRegistry>
    </html>
  )
}
