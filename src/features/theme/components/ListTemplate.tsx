import { Grid2X2 } from 'lucide-react'
import { useState } from 'react'

import { TemplateItem } from './TemplateItem'
import { ViewAllTemplate } from './ViewAllTemplate'
import { useTemplates } from '../hooks/useTemplate'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { useTemplateStore } from '@/stores/template'

export const ListTemplate = () => {
  const { data, isLoading } = useTemplates()
  const { updateTemplate } = useTemplateStore()
  const [open, setOpen] = useState(false)

  if (isLoading) {
    return (
      <div className="flex h-32 items-center justify-center">
        Loading templates...
      </div>
    )
  }

  const previewTemplates = data?.slice(0, 20)

  return (
    <ScrollArea className='w-full whitespace-nowrap pb-10' type='always' orientation='horizontal'> 
      <div className='flex'>
        {previewTemplates?.map((template) => (
          <div key={template.id} className='flex-shrink-0 p-2'>
            <TemplateItem
              key={template.id}
              template={template}
              onClick={updateTemplate}
            />
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button 
            className='absolute bottom-1 right-4 flex items-center gap-2 p-2 hover:bg-transparent focus-visible:ring-0' 
            variant='ghost'
          >
            <Grid2X2 size={20} />
            <small>View All Template</small>
          </Button>
        </DialogTrigger>
        <DialogContent className="flex h-[95%] w-2/3 flex-col">
          <DialogHeader className='border-b pb-2'>
            <DialogTitle className='text-base text-[#3f3f3f]'>
              Select a template
            </DialogTitle>         
          </DialogHeader>
          <ViewAllTemplate setOpen={setOpen} listTemplate={data}/>
        </DialogContent>
        <ScrollBar orientation='horizontal' />
      </Dialog>
    </ScrollArea>
  )
}
export default ListTemplate