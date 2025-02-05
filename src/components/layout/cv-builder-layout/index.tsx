import { ReactNode } from 'react'

import BuilderHeader from './header/BuilderHeader'
import PreviewCV from './preview/PreviewCV'
import BuilderSidebar from './sidebar/BuilderSidebar'

import { useSidebarStore } from '@/stores/sidebar'

const CvBuilderLayout = ({ children }: { children: ReactNode }) => {
  const isCollapsed = useSidebarStore((state) => state.isCollapsed)
  return (
    <div className='flex h-screen min-h-screen w-full  flex-row overflow-hidden'>
      <div
        className={`border-r bg-card transition-all duration-300 ${
          isCollapsed ? 'w-[60px]' : 'w-[280px]'
        }`}
      >
        <BuilderSidebar />
      </div>
      <div className='flex h-full flex-1 flex-col'>
        <BuilderHeader />
        <main className='grid h-[calc(100vh-64px)] flex-1 grid-cols-1 gap-4 md:grid-cols-2'>
          <div className='h-full overflow-hidden border-r'>{children}</div>
          <div className='h-full overflow-hidden'>
            <PreviewCV />
          </div>
        </main>
      </div>
    </div>
  )
}

export default CvBuilderLayout
