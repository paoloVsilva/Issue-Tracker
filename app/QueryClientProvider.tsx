'use client'

import React, { PropsWithChildren } from 'react'
import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider
} from '@tanstack/react-query'

const queryCLient = new QueryClient()

const QueryClientProvider = ({ children }: PropsWithChildren) => {
  return (
    <ReactQueryClientProvider client={queryCLient}>
      {children}
    </ReactQueryClientProvider>
  )
}

export default QueryClientProvider
