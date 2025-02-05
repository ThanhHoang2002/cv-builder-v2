import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import initLayout from '@/features/customize-layout/mock-apis/layoutMockData.json'
import {IRow} from '@/features/customize-layout/types/row.type'

export interface ILayout {
  layoutId: string
  listRow: IRow[]
}

type LayoutState = {
  layout: ILayout
}

type LayoutActions = {
  updateLayout: (newLayout: ILayout) => void
}

export const useLayoutStore = create<LayoutState & LayoutActions>()(
  immer(
    devtools((set) => ({
      layout: initLayout,
      updateLayout: (newLayout) =>
        set(
          (state) => {
            state.layout = {
              ...newLayout,
              layoutId: newLayout.layoutId,
              listRow: [...newLayout.listRow],
            }
          },
          false,
          'layout/updateLayout'
        ),
    }))
  )
)

export default useLayoutStore
