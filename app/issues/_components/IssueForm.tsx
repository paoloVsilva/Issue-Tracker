'use client'

import { ErrorMessage, Spinner } from '@/app/components'
import { Issue } from '@/app/generated/prisma'
import { patchIssueSchema } from '@/app/validationSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Callout, TextField } from '@radix-ui/themes'
import axios from 'axios'
import 'easymde/dist/easymde.min.css'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
// import SimpleMDE from 'react-simplemde-editor'
import { z } from 'zod'
import IssueFormSkeleton from './IssueFormSkeleton'

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false
})

type IssueFormData = z.infer<typeof patchIssueSchema>

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter()
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<IssueFormData>({
    resolver: zodResolver(patchIssueSchema)
  })
  const [error, setError] = useState('')
  const [isSubmitting, setSubmitting] = useState(false)

  const onSubmit = handleSubmit(async data => {
    try {
      setSubmitting(true)
      if (issue) {
        await axios.patch('/api/issues/' + issue.id, data)
        router.push('/issues/' + issue.id)
      } else {
        await axios.post('/api/issues', data)
        router.push('/issues')
        router.refresh()
      }
    } catch (error) {
      setError('An unexpected error occurred.')
      setSubmitting(false)
    }
  })

  return (
    <div className='max-w-xl'>
      {error && (
        <Callout.Root color='red' className='mb-5'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form onSubmit={onSubmit}>
        <TextField.Root
          placeholder='Title'
          defaultValue={issue?.title}
          {...register('title')}
        ></TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name='description'
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE className='mt-5' placeholder='Description' {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button className='cursor-pointer !mt-5' disabled={isSubmitting}>
          {issue ? 'Update Issue' : 'Submit New Issue'}{' '}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  )
}

export default dynamic(() => Promise.resolve(IssueForm), {
  ssr: false,
  loading: () => <IssueFormSkeleton />
})
