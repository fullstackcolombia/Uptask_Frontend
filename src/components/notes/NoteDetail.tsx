import { useMemo } from 'react'
import { TNote } from '@/types/index'
import { useAuth } from '@/hooks/useAuth'
import { formatDate } from '@/utils/index'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { deleteNote } from '@/api/NoteAPI'
import { useLocation, useParams } from 'react-router-dom'

export default function NoteDetail ({ note }: { note: TNote }) {
  const params = useParams()
  const projectId = params.projectId!
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const taskId = queryParams.get('viewTask')!
  const { data, isLoading } = useAuth()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const canDelete = useMemo(() => data?._id === note.createdBy._id, [data])

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onError: error => {
      toast.error(error.message)
    },
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['task', taskId] })
      toast.success(data)
    }
  })
  if (isLoading) return <p>Cargando...</p>
  return (
    <div className='p-3 flex justify-between items-center'>
      <div>
        <p>
          {note.content} por:{' '}
          <span className='font-bold'>{note.createdBy.name}</span>
        </p>
        <p className='text-xs text-slate-500'>{formatDate(note.createdAt)}</p>
      </div>
      {canDelete && (
        <button
          type='button'
          className='bg-red-400 hover:bg-red-500 p-2 text-xs text-white font-bold cursor-pointer transition-colors'
          onClick={() => mutate({ projectId, taskId, noteId: note._id })}
        >
          Eliminar
        </button>
      )}
    </div>
  )
}
