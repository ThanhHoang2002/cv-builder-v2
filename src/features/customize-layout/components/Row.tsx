import { UniqueIdentifier } from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Tooltip } from '@radix-ui/react-tooltip'
import clsx from 'clsx'
import { GripVertical, Minus, Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import useLayoutStore from '@/stores/layoutSlider'

interface RowProps {
  id: UniqueIdentifier
  children: React.ReactNode
  onAddCol: () => void
  onRemoveCol: () => void
}

const RowActions = ({
  onAddCol,
  onRemoveCol,
  listeners,
  colCount = 0,
}: {
  onAddCol: () => void
  onRemoveCol: () => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  listeners: any
  colCount?: number
}) => (
  <div className='flex flex-row justify-between gap-3'>
    <Button variant='ghost' className='w-fit' {...listeners}>
      <GripVertical />
    </Button>
    <div className='flex flex-row gap-2'>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant='outline' onClick={onAddCol}>
              <Plus />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add new col</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant='outline' onClick={onRemoveCol}>
              <Minus />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{colCount <= 0 ? 'Remove row' : 'Remove col'}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  </div>
)

const Row = ({ id, children, onAddCol, onRemoveCol }: RowProps) => {
  const { layout } = useLayoutStore()
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
      type: 'Row',
    },
  })

  const colCount = layout.listRow.find((r) => r.id === id)?.listCols.length ?? 0

  return (
    <Card
      ref={setNodeRef}
      {...attributes}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      className={clsx('relative shadow-md', isDragging && 'opacity-0')}
    >
      <CardHeader className='p-2'>
        <RowActions
          onAddCol={onAddCol}
          onRemoveCol={onRemoveCol}
          listeners={listeners}
          colCount={colCount}
        />
      </CardHeader>
      <CardContent className='p-2'>{children}</CardContent>
    </Card>
  )
}

export default Row
