import { ScrollArea } from '@/components/ui/scroll-area'
import LayoutCv from '@/features/customize-layout/components/Layout-Cv'

const Layout = () => {
  return (
    <ScrollArea className='h-full w-full bg-slate-100'>
      <div className='flex min-h-full w-full justify-center px-4 py-5'>
        <LayoutCv />
      </div>
    </ScrollArea>
  )
}

export default Layout
