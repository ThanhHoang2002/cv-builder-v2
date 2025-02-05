import { UniqueIdentifier } from '@dnd-kit/core'
import _ from 'lodash'

import { ICol } from '../types/col.type'
import { IRow } from '../types/row.type'
import { ISection } from '../types/section.type'

import { ILayout } from '@/stores/layoutSlider'

export const findItemValue = (
  id: UniqueIdentifier | undefined,
  type: 'Row' | 'Column' | 'Section',
  layoutToSearch: ILayout
): IRow | ICol | null => {
  if (type === 'Row') {
    return _.find(layoutToSearch.listRow, { id }) || null
  }
  if (type === 'Column') {
    return (
      _.find(layoutToSearch.listRow, (row) => _.some(row.listCols, { id })) ||
      null
    )
  }
  if (type === 'Section') {
    for (const row of layoutToSearch.listRow) {
      const col = _.find(row.listCols, (col) =>
        _.some(col.listSections, { id })
      )
      if (col) return col
    }
  }
  return null
}

const findSectionInCol = (col: ICol, id: UniqueIdentifier) => {
  return col.listSections.find((section) => section.id === id)
}

export const findItem = (
  id: UniqueIdentifier,
  layout: ILayout
): ISection | IRow | ICol | null => {
  if (!id) return null

  for (const row of layout.listRow) {
    if (row.id === id) return row

    const matchingCol = row.listCols.find((col) => {
      if (col.id === id) return true
      return findSectionInCol(col, id)
    })

    if (matchingCol) {
      if (matchingCol.id === id) return matchingCol
      return findSectionInCol(matchingCol, id) || null
    }
  }
  return null
}

export const generateId = (prefix: string): string => {
  return `${prefix}-${Math.floor(Math.random() * 100)}`
}

export const addNewCol = (
  id: UniqueIdentifier,
  layout: ILayout
): { newLayout: ILayout; hasReachedLimit: boolean } => {
  const newLayout = _.cloneDeep(layout)
  const targetRow = newLayout.listRow.find((row) => row.id === id)
  const hasReachedLimit = targetRow ? targetRow.listCols.length >= 4 : false

  if (targetRow && !hasReachedLimit) {
    targetRow.listCols.push({
      id: generateId('c'),
      listSections: [],
    })
  }

  return { newLayout, hasReachedLimit }
}

export const addNewRow = (layout: ILayout): ILayout => {
  const newLayout = _.cloneDeep(layout)
  newLayout.listRow.push({
    id: generateId('r'),
    listCols: [],
  })
  return newLayout
}

export const removeColAndRow = (
  id: UniqueIdentifier,
  layout: ILayout,
  setUnUseSection: (sections: ISection[]) => void,
  unUseSection: ISection[]
): ILayout => {
  const newLayout = _.cloneDeep(layout)
  const row = newLayout.listRow.find((row) => row.id === id)

  if (!row) return newLayout

  if (row.listCols.length > 0) {
    const lastCol = row.listCols[row.listCols.length - 1]
    if (lastCol.listSections && lastCol.listSections.length > 0) {
      const updatedUnusedSections = [...unUseSection, ...lastCol.listSections]
      setUnUseSection(updatedUnusedSections)
    }

    row.listCols.pop()
  } else {
    _.remove(newLayout.listRow, (r) => r.id === id)
  }

  return newLayout
}
