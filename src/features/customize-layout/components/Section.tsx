import { UniqueIdentifier } from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import clsx from 'clsx'

import { Button } from '@/components/ui/button'

interface SectionProps {
  id: UniqueIdentifier
  sectionName: string
}

const Section = ({ id, sectionName }: SectionProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: {
      type: 'Section',
    },
  })

  return (
    <Button
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      value={id}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      className={clsx('my-1 h-fit w-fit shadow-lg', isDragging && 'opacity-50')}
    >
      {sectionName}
    </Button>
  )
}

export default Section
