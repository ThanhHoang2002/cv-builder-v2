import {
  DragOverEvent,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import _ from 'lodash'
import { useState, useCallback } from 'react'

import { useLayoutHandlers } from './useLayoutHandlers'
import { ISection } from '../types/section.type'

import { ILayout } from '@/stores/layoutSlider'

const isSectionToSection = (
  activeId: UniqueIdentifier,
  overId: UniqueIdentifier
) =>
  activeId.toString().includes('s') &&
  overId.toString().includes('s') &&
  activeId !== overId

const isSectionToColumn = (
  activeId: UniqueIdentifier,
  overId: UniqueIdentifier
) =>
  activeId.toString().includes('s') &&
  overId.toString().includes('c') &&
  activeId !== overId

const isColumnToColumn = (
  activeId: UniqueIdentifier,
  overId: UniqueIdentifier
) =>
  activeId.toString().includes('c') &&
  overId.toString().includes('c') &&
  activeId !== overId

const isRowToRow = (activeId: UniqueIdentifier, overId: UniqueIdentifier) =>
  activeId.toString().includes('r') &&
  overId.toString().includes('r') &&
  activeId !== overId

export const useLayoutDnd = (initialLayout: ILayout) => {
  const [layout, setLayout] = useState<ILayout>(initialLayout)
  const [activeId, setActiveId] = useState<UniqueIdentifier>(1)
  const [unUseSection, setUnUseSection] = useState<ISection[]>([])

  const debouncedSetLayout = useCallback(
    (value: ILayout | ((prev: ILayout) => ILayout)) => {
      const newValue = typeof value === 'function' ? value(layout) : value
      _.debounce((val: ILayout) => setLayout(val), 50)(newValue)
    },
    [layout]
  )

  const {
    handleSectionToSection,
    handleSectionToColumn,
    handleUnuseSectionToColumn,
    handleColumnToColumn,
    handleRowToRow,
  } = useLayoutHandlers(
    layout,
    debouncedSetLayout,
    unUseSection,
    setUnUseSection
  )

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    setActiveId(active.id)
  }

  const isSectionInLayout = (activeId: UniqueIdentifier) => {
    return layout.listRow.some((row) =>
      row.listCols.some((col) =>
        col.listSections.some((section) => section.id === activeId)
      )
    )
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!over) return

    let newLayout: ILayout | null = null

    if (isSectionToSection(active.id, over.id)) {
      newLayout = handleSectionToSection(active, over)
    } else if (isSectionToColumn(active.id, over.id)) {
      newLayout = isSectionInLayout(active.id)
        ? handleSectionToColumn(active, over)
        : handleUnuseSectionToColumn(active, over)
    } else if (isColumnToColumn(active.id, over.id)) {
      newLayout = handleColumnToColumn(active, over)
    } else if (isRowToRow(active.id, over.id)) {
      newLayout = handleRowToRow(active, over)
    }

    if (newLayout && !_.isEqual(newLayout, layout)) {
      debouncedSetLayout(newLayout)
    }
  }

  return {
    layout,
    setLayout,
    activeId,
    unUseSection,
    setUnUseSection,
    sensors,
    handleDragStart,
    handleDragOver,
  }
}
