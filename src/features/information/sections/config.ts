import { UserRound } from 'lucide-react'

import { PersonalInfoSection } from '.'

export interface SectionConfig {
  id: string
  title: string
  description: string
  icon: typeof UserRound // Lucide icon type
  component: React.ComponentType<any> // Changed to React component type
}

export const sections: SectionConfig[] = [
  {
    id: 'personal',
    title: 'Personal Information',
    description: 'Fill in your personal details for your CV',
    icon: UserRound,
    component: PersonalInfoSection // Direct component reference
  },
  // Add more sections as needed:
  // {
  //   id: 'experience',
  //   title: 'Work Experience',
  //   description: 'Add your work history',
  //   icon: Briefcase,
  //   component: ExperienceSection
  // },
] 