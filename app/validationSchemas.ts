import { z } from 'zod'
import { Status } from './generated/prisma'

export const issueSchema = z.object({
  title: z.string().min(1, 'Required').max(255),
  description: z.string().min(1, 'Required')
})

export const issueStatusSchema = z.object({
  status: z.nativeEnum(Status)
})
