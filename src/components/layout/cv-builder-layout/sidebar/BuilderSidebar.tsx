import {
  ChevronLeft,
  ChevronRight,
  User,
  LayoutDashboard,
  Palette,
  House,
} from 'lucide-react'
import { FC, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'

import logo from '@/assets/svg/logoHivetech.svg'
import { Button } from '@/components/ui/button'
import Image from '@/components/ui/image'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useSidebarStore } from '@/stores/sidebar'
interface Section {
  id: string
  title: string
  type: string
  to: string
}
const sectionIcons = {
  information: User,
  layout: LayoutDashboard,
  theme: Palette,
  house: House,
} as const
const sections: Section[] = [
  { id: 'house', title: 'House', type: 'house', to: '/' },
  { id: 'information', title: 'Information', type: 'information', to: 'infor' },
  { id: 'layout', title: 'Layout', type: 'layout', to: 'layout' },
  { id: 'theme', title: 'Theme', type: 'theme', to: 'theme' },
] as const

const BuilderSidebar: FC = () => {
  const location = useLocation().pathname.split('/').at(-1)
  const [idActiveSection, setIdActiveSection] = useState<string>('')
  const { isCollapsed, toggleCollapse } = useSidebarStore()
  const navigate = useNavigate()
  useEffect(() => {
    const initialSectionId = sections.find(
      (section) => location === section.to
    )?.id
    setIdActiveSection(initialSectionId as string)
  }, [location])

  const handleClickSection = (section: Section) => {
    if (idActiveSection === section.id) return
    setIdActiveSection(section.id)
    navigate(section.to)
  }
  return (
    <div className='group relative z-50 flex h-full flex-col'>
      <div className='flex h-14 items-center justify-between border-b px-4'>
        {!isCollapsed ? (
          <span className='text-xl font-semibold uppercase'>HiveTech</span>
        ) : (
          <Image src={logo} alt='logo' />
        )}
      </div>
      <ScrollArea className='flex-1 px-2 py-4'>
        <div className='space-y-2'>
          {sections.map((section) => {
            const Icon =
              sectionIcons[section.type as keyof typeof sectionIcons] || User

            return isCollapsed ? (
              <Tooltip key={section.id} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Button
                    variant={
                      idActiveSection === section.id ? 'default' : 'ghost'
                    }
                    size='icon'
                    className='w-full'
                    onClick={() => handleClickSection(section)}
                  >
                    <Icon size={18} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side='right' sideOffset={10}>
                  {section.title}
                </TooltipContent>
              </Tooltip>
            ) : (
              <Button
                key={section.id}
                variant={idActiveSection === section.id ? 'default' : 'ghost'}
                className='w-full justify-start gap-2'
                onClick={() => handleClickSection(section)}
              >
                <Icon size={18} />
                {section.title}
              </Button>
            )
          })}
        </div>
      </ScrollArea>
      <Button
        variant='ghost'
        size='icon'
        className='absolute right-0 top-1/2 w-fit -translate-y-1/2 translate-x-[101%]
        scale-90 rounded-none rounded-r-md bg-slate-100 opacity-0
        transition-all duration-500 ease-in-out
        hover:bg-gray-300 group-hover:scale-100  group-hover:opacity-100'
        onClick={toggleCollapse}
      >
        {isCollapsed ? (
          <ChevronRight className='px-0' size={18} />
        ) : (
          <ChevronLeft className='px-0' size={18} />
        )}
      </Button>
    </div>
  )
}

export default BuilderSidebar
