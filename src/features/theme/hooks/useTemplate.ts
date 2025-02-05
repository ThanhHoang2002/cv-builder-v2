import { useQuery } from '@tanstack/react-query'

import { getTemplates } from '../mock-apis/get-templates'

export const useTemplates = () => {
  return useQuery({
    queryKey: ['templates'],
    queryFn: getTemplates,
  })
}