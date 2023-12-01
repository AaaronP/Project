import { Button, Card } from '@tremor/react'
import { WarningIcon } from '../components/Icons'
import { Link, useLocation } from 'react-router-dom'

export default function Page404 () {
  const { pathname } = useLocation()
  const slicedPathname = pathname.slice(1)

  return (
    <div className='grid place-content-center'>
        <Card className='flex items-center gap-6 max-w-2xl shadow-red-500 bg-gradient-to-r from-red-200'>
        <div>
            <WarningIcon className='w-8 h-8 text-red-600'/>
        </div>
        <section className='mb-6'>
            <h3 className='font-semibold'>Error 404</h3>
            <h1 className='text-2xl font-bold text-red-600 mb-6'>Página no encontrada: <strong className='text-indigo-700 font-semibold'>{slicedPathname}</strong></h1>
            <Link to='/'>
                <Button>Página principal</Button>
            </Link>
        </section>
        </Card>
    </div>
  )
}
