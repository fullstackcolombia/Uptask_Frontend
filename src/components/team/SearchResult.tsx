import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { TProject, TTeamMember } from '@/types/index'
import { addUserToProject } from '@/api/TeamAPI'
import { useNavigate } from 'react-router-dom'

export default function SearchResult ({
  user,
  projectId,
  reset
}: {
  user: TTeamMember
  projectId: TProject['_id']
  reset: () => void
}) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: addUserToProject,
    onError: error => {
      toast.error(error.message)
    },
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['projectTeam', projectId] })
      toast.success(data)
      reset()
      navigate(location.pathname, { replace: true })
    }
  })

  const handleForm = () => {
    const projectData = {
      projectId,
      id: user._id
    }
    mutate(projectData)
  }
  return (
    <>
      <p className='mt-10 text-center font-bold'>Resultado</p>
      <div className='flex justify-between items-center'>
        <p>{user.name}</p>
        <button
          onClick={handleForm}
          className='text-purple-600 hover:bg-purple-100 px-10 py-3 font-bold cursor-pointer'
        >
          Agregar al proyecto
        </button>
      </div>
    </>
  )
}
