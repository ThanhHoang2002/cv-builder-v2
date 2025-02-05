import { create } from 'zustand'

interface PersonalInfo {
  firstName: string
  lastName: string
  phone: string
  email: string
  dob: string
  nationality: string
  profile: string
  showImage: boolean
  avatarUrl: string
}

interface PersonalInfoStore {
  info: PersonalInfo
  updateInfo: (field: keyof PersonalInfo, value: string | boolean) => void
}

const initialState: PersonalInfo = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  dob: '',
  nationality: '',
  profile: '',
  showImage: true,
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=50', // Default avatar
}

export const usePersonalInfoStore = create<PersonalInfoStore>((set) => ({
  info: initialState,
  updateInfo: (field, value) => 
    set((state) => ({
      info: {
        ...state.info,
        [field]: value,
      },
    })),
})) 