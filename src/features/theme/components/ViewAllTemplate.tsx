import { Template, ViewAllTemplateProps } from '../types'
import { TemplateItem } from './TemplateItem'

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { useTemplateStore } from '@/stores/template'

export const ViewAllTemplate = ({ listTemplate, setOpen }: ViewAllTemplateProps) => {
  const { updateTemplate } = useTemplateStore()

  const handleUpdateTemplate = (template: Template) => {
    updateTemplate(template)
    setOpen(false)
  }

  if (!listTemplate?.length) {
    return (
      <div className="flex h-full items-center justify-center">
        No templates available
      </div>
    )
  }

  return (
    <ScrollArea>
      <div className='flex flex-wrap justify-center gap-5'>
        {listTemplate.map((template) => (
          <TemplateItem
            key={template.id}
            template={template}
            onClick={handleUpdateTemplate}
            width={160}
          />
        ))}
      </div>
      <ScrollBar orientation='vertical' />
    </ScrollArea>
  )
}