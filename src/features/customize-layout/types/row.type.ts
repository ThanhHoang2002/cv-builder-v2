import { UniqueIdentifier } from '@dnd-kit/core'

import { ICol } from './col.type'


export interface IRow {
  id: UniqueIdentifier
  listCols: ICol[]
}
