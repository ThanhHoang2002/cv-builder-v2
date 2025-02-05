import { SortableContext } from '@dnd-kit/sortable'
import { Plus } from 'lucide-react'

import Section from './Section'
import { ISection } from '../types/section.type'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

interface UnusedSectionsProps {
  unUseSections: ISection[]
  onAddRow: () => void
}

const UnusedSections = ({ unUseSections, onAddRow }: UnusedSectionsProps) => {
  return (
    <SortableContext items={unUseSections.map((s) => s.id)}>
      <div className='sticky top-0 z-30 mb-1 flex flex-col gap-y-2 rounded-md bg-white p-2'>
        <Card>
          <CardHeader>
            <h1>Unuse Sections</h1>
          </CardHeader>
          <CardContent>
            <div className='flex flex-wrap gap-2'>
              {unUseSections.map((s) => (
                <Section key={s.id} sectionName={s.sectionName} id={s.id} />
              ))}
            </div>
          </CardContent>
        </Card>
        <Button
          className='flex flex-row items-center justify-center'
          onClick={onAddRow}
        >
          Add new row
          <Plus color='white' />
        </Button>
      </div>
    </SortableContext>
  )
}

export default UnusedSections
