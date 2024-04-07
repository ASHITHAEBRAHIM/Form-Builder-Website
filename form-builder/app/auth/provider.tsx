'use client'
import { SessionProvider } from 'next-auth/react'
import { PropsWithChildren } from 'react'

const Authprovider = ({children}:PropsWithChildren) => {
  return (
    <SessionProvider>{children}</SessionProvider>
  )
}

export default Authprovider