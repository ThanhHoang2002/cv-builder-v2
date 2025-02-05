import axios from 'axios'

import { Template } from '../types'

  
export const getTemplates = async ():Promise<Template[]>  => {
  const response = await axios.get('https://www.kickresume.com/api/templates/')
  return response.data
} 