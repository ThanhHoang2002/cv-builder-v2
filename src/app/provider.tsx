import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React from 'react'

import { TooltipProvider } from '@/components/ui/tooltip'
import { queryClient } from '@/lib/query-client'


export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {import.meta.env.DEV && <ReactQueryDevtools />}        
      <TooltipProvider>{children}</TooltipProvider>
    </QueryClientProvider>
  )
}