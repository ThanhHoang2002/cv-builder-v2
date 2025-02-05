import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { Template } from '@/features/theme/types'



interface TemplateStoreStates {
    template:Template | undefined;
}

interface TemplateActions {
    updateTemplate:(newTemplate:Template) => void;
}
export const useTemplateStore = create<TemplateStoreStates & TemplateActions>()(
  immer(
    devtools((set) => ({
      template:undefined,
      updateTemplate:(newTemplate) => set((state) => {
        state.template = newTemplate
      })
    }))
  )
)