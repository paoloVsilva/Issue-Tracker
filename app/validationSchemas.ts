import { z } from 'zod'
import { Status } from './generated/prisma'

export const patchIssueSchema = z.object({
  title: z.string().min(1, 'Required').max(255).optional(),
  description: z.string().min(1, 'Required').max(65535).optional(),
  assignedToUserId: z
    .string()
    .min(1, 'Required')
    .max(255)
    .optional()
    .nullable(),
  status: z.nativeEnum(Status).optional()
})
