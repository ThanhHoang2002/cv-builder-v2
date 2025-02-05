import WebFont from 'webfontloader'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { FONTS } from '@/features/theme/constants/fonts'
import { Font } from '@/features/theme/types'


interface FontStoreProps {
    selectedFont: Font  | undefined;
}
interface FontActions {
    updateSelectedFont:(newFont:Font) => void;
}
export const useFontStore = create<FontStoreProps & FontActions>()(
  immer(
    devtools((set) => ({
      selectedFont:FONTS[0],
      updateSelectedFont:(newFont) => set((state) => {
        WebFont.load({
          google: {
            families: [newFont.name]
          }
        })
        state.selectedFont = newFont
      })
    }))
  )
)