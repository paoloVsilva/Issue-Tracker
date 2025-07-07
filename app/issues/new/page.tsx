'use client'

import { Button, Callout, Text, TextField } from '@radix-ui/themes'
import { useForm, Controller } from 'react-hook-form'
import 'easymde/dist/easymde.min.css'
import dynamic from 'next/dynamic'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { createIssueSchema } from '@/app/validationSchemas'
import { z } from 'zod'

const SimpleMdeEditor = dynamic(() => import('react-simplemde-editor'), {
  ssr: false
})

type IssueForm = z.infer<typeof createIssueSchema>

const NewIssuePage = () => {
  const router = useRouter()
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  })
  const [error, setError] = useState('')

  return (
    <div className='max-w-xl'>
      {error && (
        <Callout.Root color='red' className='mb-5'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        onSubmit={handleSubmit(async data => {
          try {
            await axios.post('/api/issues', data)
            router.push('/issues')
          } catch (error) {
            setError('An unexpected error occurred.')
          }
        })}
      >
        <TextField.Root
          placeholder='Title'
          {...register('title')}
        ></TextField.Root>
        {errors.title && (
          <Text color='red' as='p'>
            {errors.title.message}
          </Text>
        )}
        <Controller
          name='description'
          control={control}
          render={({ field }) => (
            <SimpleMdeEditor
              className='mt-5'
              placeholder='Description'
              {...field}
            />
          )}
        />
        {errors.description && (
          <Text color='red' as='div'>
            {errors.description.message}
          </Text>
        )}

        <Button className='cursor-pointer !mt-5'>Submit New Issue</Button>
      </form>
    </div>
  )
}

export default NewIssuePage
