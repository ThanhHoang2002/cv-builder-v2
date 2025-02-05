import {
  DndContext,
  DragEndEvent,
  pointerWithin,
  CollisionDetection,
  DragOverlay,
  closestCenter,
  closestCorners,
} from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'

import ColumnLayout from './ColumnLayout'
import DragOverlayComponent from './DragOverlay'
import Row from './Row'
import UnusedSections from './UnusedSections'
import { useLayoutDnd } from '../hooks/useLayoutDnd'
import {
  addNewCol,
  addNewRow,
  findItem,
  removeColAndRow,
} from '../utils/layout'

import { useLayoutStore } from '@/stores/layoutSlider'

const LayoutCv = () => {
  const { layout: initialLayout, updateLayout } = useLayoutStore()
  const {
    layout,
    activeId,
    unUseSection,
    setUnUseSection,
    sensors,
    handleDragStart,
    handleDragOver,
    setLayout,
  } = useLayoutDnd(initialLayout)

  const handleDragEnd = (event: DragEndEvent) => {
    const { over } = event
    if (!over) return
    updateLayout(layout)
  }

  const collisionDetectionStrategy: CollisionDetection = (args) => {
    if (!activeId) return []

    // Check if activeId is a section by its prefix
    const isSection = activeId.toString().startsWith('s')
    if (!isSection) return closestCenter(args)

    // Fast check for unused sections
    if (unUseSection.some((s) => s.id === activeId)) {
      return pointerWithin(args)
    }

    // Flat map to get all sections in layout
    const sectionsInLayout = layout.listRow.flatMap((row) =>
      row.listCols.flatMap((col) => col.listSections)
    )

    // Check if activeId exists in layout sections
    return sectionsInLayout.some((s) => s.id === activeId)
      ? closestCorners(args)
      : closestCenter(args)
  }

  const handleAddRow = () => {
    const newLayout = addNewRow(layout)
    updateLayout(newLayout)
    setLayout(newLayout)
    setTimeout(() => {
      const rows = document.querySelectorAll('.my-3 > div')
      const lastRow = rows[rows.length - 1]
      lastRow?.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }, 100)
  }

  const handleAddCol = (rowId: string) => {
    const { newLayout, hasReachedLimit } = addNewCol(rowId, layout)
    if (hasReachedLimit) {
      alert('Maximum of 4 columns reached')
      return
    }
    updateLayout(newLayout)
    setLayout(newLayout)
  }

  const handleRemoveCol = (rowId: string) => {
    const newLayout = removeColAndRow(
      rowId,
      layout,
      setUnUseSection,
      unUseSection
    )
    updateLayout(newLayout)
    setLayout(newLayout)
  }

  return (
    <div className='relative max-h-min w-full px-4'>
      <DndContext
        sensors={sensors}
        collisionDetection={collisionDetectionStrategy}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <UnusedSections unUseSections={unUseSection} onAddRow={handleAddRow} />

        <SortableContext items={layout.listRow.map((r) => r.id)}>
          <div className='my-3 flex flex-col justify-between gap-y-2'>
            {layout.listRow.map((row) => (
              <Row
                id={row.id}
                key={row.id}
                onAddCol={() => handleAddCol(row.id as string)}
                onRemoveCol={() => handleRemoveCol(row.id as string)}
              >
                <ColumnLayout columns={row.listCols} />
              </Row>
            ))}
          </div>
        </SortableContext>

        <DragOverlay>
          <DragOverlayComponent
            activeId={activeId}
            findItem={findItem}
            layout={layout}
          />
        </DragOverlay>
      </DndContext>
    </div>
  )
}

export default LayoutCv
