import { create } from 'zustand'

interface SidebarStore {
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  isCollapsed: true,
  toggleCollapse: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
}))
