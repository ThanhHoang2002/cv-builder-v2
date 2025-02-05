import { UniqueIdentifier } from '@dnd-kit/core'

import { ISection } from './section.type'

export interface ICol {
  id: UniqueIdentifier
  listSections: ISection[]
  style?: number
}
