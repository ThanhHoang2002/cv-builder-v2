import { ReactNode } from 'react'

import MainHeader from './header/MainHeader'
import MainSideBar from './sidebar/MainSideBar'

export const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='flex h-screen min-h-screen w-full  flex-row overflow-hidden'>
      <div className='border-r bg-card'>
        <MainSideBar />
      </div>
      <div className='flex h-full flex-1 flex-col'>
        <MainHeader />
        <main className='grid h-[calc(100vh-64px)] flex-1 grid-cols-1 gap-4 md:grid-cols-2'>
          {children}
        </main>
      </div>
    </div>
  )
}
