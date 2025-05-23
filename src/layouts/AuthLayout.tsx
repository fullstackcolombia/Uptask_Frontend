import Logo from '@/components/Logo'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function AuthLayout () {
  return (
    <>
      <div className='bg-gray-800 min-h-screen'>
        <div className='py-5 lg:py-10 mx-auto w-[450px]'>
          <div className='mt-10'>
            <Logo />
            <Outlet />
          </div>
        </div>
      </div>
      <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
    </>
  )
}
