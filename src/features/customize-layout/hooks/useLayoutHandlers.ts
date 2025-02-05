import { UniqueIdentifier } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import _ from 'lodash'
import { Dispatch, SetStateAction } from 'react'

import { ICol } from '../types/col.type'
import { IRow } from '../types/row.type'
import { ISection } from '../types/section.type'
import { findItemValue } from '../utils/layout'

import { ILayout } from '@/stores/layoutSlider'

interface DragItem {
  id: UniqueIdentifier
}

export const useLayoutHandlers = (
  layout: ILayout,
  _setLayout: Dispatch<SetStateAction<ILayout>>,
  unUseSection: ISection[],
  setUnUseSection: Dispatch<SetStateAction<ISection[]>>
) => {
  const handleSectionToSection = (active: DragItem, over: DragItem) => {
    const newLayout = _.cloneDeep(layout)
    const activeCol = findItemValue(
      active.id,
      'Section',
      newLayout
    ) as ICol | null
    const overCol = findItemValue(over.id, 'Section', newLayout) as ICol | null

    if (!activeCol || !overCol) return null

    const activeIndex = _.findIndex(
      activeCol.listSections,
      (section: ISection) => section.id === active.id
    )
    const overIndex = _.findIndex(
      overCol.listSections,
      (section: ISection) => section.id === over.id
    )

    if (activeIndex === -1 || overIndex === -1) return null

    if (activeCol.id === overCol.id) {
      activeCol.listSections = arrayMove(
        activeCol.listSections,
        activeIndex,
        overIndex
      )
    } else {
      const [movedSection] = activeCol.listSections.splice(activeIndex, 1)
      overCol.listSections.splice(overIndex, 0, movedSection)
    }

    return newLayout
  }

  const handleSectionToColumn = (active: DragItem, over: DragItem) => {
    const newLayout = _.cloneDeep(layout)
    const activeCol = findItemValue(
      active.id,
      'Section',
      newLayout
    ) as ICol | null
    const overRow = findItemValue(over.id, 'Column', newLayout) as IRow | null
    const overCol = overRow?.listCols.find((col: ICol) => col.id === over.id)

    if (!activeCol || !overCol) return null

    const activeIndex = _.findIndex(
      activeCol.listSections,
      (section: ISection) => section.id === active.id
    )

    if (activeIndex === -1) return null

    const [movedSection] = activeCol.listSections.splice(activeIndex, 1)
    overCol.listSections.push(movedSection)

    return newLayout
  }

  const handleUnuseSectionToColumn = (active: DragItem, over: DragItem) => {
    const newLayout = _.cloneDeep(layout)
    const activeSection = unUseSection.find(
      (section) => section.id === active.id
    )
    const overRow = findItemValue(over.id, 'Column', newLayout) as IRow | null
    const overCol = overRow?.listCols.find((col: ICol) => col.id === over.id)

    if (!activeSection || !overCol) return null

    overCol.listSections.push(activeSection)
    setUnUseSection(unUseSection.filter((section) => section.id !== active.id))

    return newLayout
  }

  const handleColumnToColumn = (active: DragItem, over: DragItem) => {
    const newLayout = _.cloneDeep(layout)
    const activeRow = findItemValue(
      active.id,
      'Column',
      newLayout
    ) as IRow | null
    const overRow = findItemValue(over.id, 'Column', newLayout) as IRow | null

    if (!activeRow || !overRow) return null

    const activeIndex = _.findIndex(
      activeRow.listCols,
      (col: ICol) => col.id === active.id
    )
    const overIndex = _.findIndex(
      overRow.listCols,
      (col: ICol) => col.id === over.id
    )

    if (activeIndex === -1 || overIndex === -1) return null

    if (activeRow.id === overRow.id) {
      activeRow.listCols = arrayMove(activeRow.listCols, activeIndex, overIndex)
    } else {
      const activeColsCopy = _.cloneDeep(activeRow.listCols)
      const overColsCopy = _.cloneDeep(overRow.listCols)

      const [movedActiveCol] = activeColsCopy.splice(activeIndex, 1)
      const [movedOverCol] = overColsCopy.splice(overIndex, 1)

      activeColsCopy.splice(overIndex, 0, movedOverCol)
      overColsCopy.splice(activeIndex, 0, movedActiveCol)

      activeRow.listCols = activeColsCopy
      overRow.listCols = overColsCopy
    }

    return newLayout
  }

  const handleRowToRow = (active: DragItem, over: DragItem) => {
    const activeIndex = _.findIndex(
      layout.listRow,
      (row: IRow) => row.id === active.id
    )
    const overIndex = _.findIndex(
      layout.listRow,
      (row: IRow) => row.id === over.id
    )

    if (activeIndex === -1 || overIndex === -1) return null

    const newLayout = _.cloneDeep(layout)
    newLayout.listRow = arrayMove(newLayout.listRow, activeIndex, overIndex)
    return newLayout
  }

  return {
    handleSectionToSection,
    handleSectionToColumn,
    handleUnuseSectionToColumn,
    handleColumnToColumn,
    handleRowToRow,
  }
}
