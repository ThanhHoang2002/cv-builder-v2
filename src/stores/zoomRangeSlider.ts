import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

interface ZoomRangeStates {
  range: number
}

interface ZoomRangeActions {
  updateRange: (newRange: number) => void
}
export const useZoomRangeStore = create<ZoomRangeStates & ZoomRangeActions>()(
  immer(
    devtools((set) => ({
      range: 1,
      updateRange: (newRange) =>
        set((state) => {
          state.range = newRange
        }),
    }))
  )
)
