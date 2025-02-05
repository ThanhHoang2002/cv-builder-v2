import { Font } from '../types'

export const FONTS: Font[] = [
  {
    name: 'Arial',
    languages: ['English', 'Tiếng Việt', 'Français']
  },
  {
    name: 'Roboto',
    languages: ['English', 'Tiếng Việt', 'Français']
  },
  {
    name: 'Open Sans',
    languages: ['English', 'Tiếng Việt', 'Français']
  },
  {
    name: 'Lato',
    languages: ['English', 'Tiếng Việt', '中文', '日本語', '한국어', 'Français']
  },
  {
    name: 'Montserrat',
    languages: ['English', 'Tiếng Việt', '中文', '日本語', '한국어', 'Français']
  },
  {
    name:'Dancing Script',
    languages:['Tiếng Việt']
  }
  ,
  {
    name:'Pacifico',
    languages:['English', 'Tiếng Việt', 'Français']
  }
]

export const LANGUAGES = FONTS.reduce((acc, font) => {
  font.languages.forEach((language) => {
    if (!acc.includes(language)) {
      acc.push(language)
    }
  })
  return acc
}, [] as string[])