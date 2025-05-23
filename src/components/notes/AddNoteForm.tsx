import { useLocation, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { TNoteFormData } from '@/types/index'
import ErrorMessage from '../ErrorMessage'
import { createNote } from '@/api/NoteAPI'

export default function AddNoteForm () {
  const params = useParams()
  const projectId = params.projectId!
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const taskId = queryParams.get('viewTask')!
  const initialValues: TNoteFormData = {
    content: ''
  }
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({ defaultValues: initialValues })

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: createNote,
    onError: error => {
      toast.error(error.message)
    },
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['task', taskId] })
      toast.success(data)
      reset()
    }
  })

  const handleAddNote = (formData: TNoteFormData) =>
    mutate({
      projectId,
      taskId,
      formData
    })
  return (
    <form
      onSubmit={handleSubmit(handleAddNote)}
      noValidate
      className='space-y-3'
    >
      <div className='flex flex-col gap-2'>
        <label htmlFor='content'>Crear Nota</label>
        <input
          type='text'
          id='content'
          placeholder='Contenido de la nota'
          className='w-full p-3 border border-gray-300'
          {...register('content', {
            required: 'El contenido de la nota es obligatorio',
            minLength: {
              value: 5,
              message:
                'El contenido de la nota debe tener al menos 5 caracteres'
            }
          })}
        />
        {errors.content && (
          <ErrorMessage>{errors.content.message}</ErrorMessage>
        )}
      </div>
      <input
        type='submit'
        value='Crear Nota'
        className='bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-2 text-white font-black cursor-pointer'
      />
    </form>
  )
}
