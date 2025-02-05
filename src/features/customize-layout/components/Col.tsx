import { UniqueIdentifier } from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import clsx from 'clsx'
import { GripVertical } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

interface ColProps {
  id: UniqueIdentifier
  children: React.ReactNode
  className?: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ColHeader = ({ listeners }: { listeners: any }) => (
  <CardHeader className='p-2'>
    <Button variant='outline' className='w-fit' {...listeners}>
      <GripVertical />
    </Button>
  </CardHeader>
)

const Col = ({ id, children, className }: ColProps) => {
  const {
    attributes,
    setNodeRef,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: {
      type: 'Column',
    },
  })

  return (
    <div
      ref={setNodeRef}
      className={clsx('h-full w-full', className, isDragging && 'scale-[0.8]')}
    >
      <Card
        {...attributes}
        style={{
          transition,
          transform: CSS.Translate.toString(transform),
        }}
        className={clsx(
          'h-full w-full border-2 border-dashed border-slate-400 shadow-md',
          isDragging && 'opacity-30 '
        )}
      >
        <ColHeader listeners={listeners} />
        <CardContent className='p-4'>{children}</CardContent>
      </Card>
    </div>
  )
}

export default Col
