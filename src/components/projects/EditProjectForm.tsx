import { Link, useNavigate } from 'react-router-dom'
import ProjectForm from './ProjectForm'
import { TProject, TProjectFormData } from '@/types/index'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateProject } from '@/api/ProjectAPI'

export default function EditProjectForm ({
  data,
  projectId
}: {
  data: TProjectFormData
  projectId: TProject['_id']
}) {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      projectName: data.projectName,
      clientName: data.clientName,
      description: data.description
    }
  })

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: updateProject,
    onError: error => {
      toast.error(error.message)
    },
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      queryClient.invalidateQueries({ queryKey: ['project', projectId] })
      toast.success(data)
      navigate('/')
    }
  })

  const handleForm = (formData: TProjectFormData) => {
    const projectData = {
      formData,
      projectId
    }
    mutate(projectData)
  }
  return (
    <>
      <div className='max-w-3xl mx-auto'>
        <h1 className='text-5xl font-black'>Editar Proyecto</h1>
        <p className='font-2xl font-light text-gray-500 mt-5'>
          Completa el siguiente formulario para editar el proyecto
        </p>
        <nav className='my-5'>
          <Link
            to='/'
            className='bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors'
          >
            Volver a Proyectos
          </Link>
        </nav>

        <form
          className='mt-10 bg-white shadow-lg p-10 rounded-lg'
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <ProjectForm register={register} errors={errors} />
          <input
            type='submit'
            value='Guardar Cambios'
            className='bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors'
          />
        </form>
      </div>
    </>
  )
}
