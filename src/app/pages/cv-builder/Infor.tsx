import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

import { Card } from '@/components/ui/card'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { sections } from '@/features/information/sections/config'

const Infor = () => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    personal: true,
  })

  const handleSectionToggle = (sectionId: string, isOpen: boolean) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionId]: isOpen,
    }))
  }

  return (
    <div className="h-full overflow-auto">
      <div className="mx-auto max-w-4xl space-y-4 p-4">
        {sections.map(({ id, title, description, icon: Icon, component: SectionComponent }) => (
          <Card key={id}>
            <Collapsible
              open={openSections[id]}
              onOpenChange={(isOpen) => handleSectionToggle(id, isOpen)}
              className="transition-all duration-300 ease-in-out"
            >
              <CollapsibleTrigger className="flex w-full items-center justify-between px-6 py-4 transition-colors hover:bg-accent/50">
                <div>
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5" />
                    <h2 className="text-lg font-semibold">{title}</h2>
                  </div>
                  <p className="text-sm text-muted-foreground">{description}</p>
                </div>
                <ChevronDown className={`h-4 w-4 transform transition-transform duration-300 ${openSections[id] ? 'rotate-180' : ''}`} />
              </CollapsibleTrigger>
              
              <CollapsibleContent className="transition-all duration-300 ease-in-out">
                <div className="space-y-8 px-6 pb-6">
                  <SectionComponent />
                </div>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Infor