import { Card } from '@tremor/react'
import { WarningIcon } from '../components/Icons'

export default function RoleProtectedPage () {
  return (
    <div className='grid place-content-center'>
      <Card className='flex items-center gap-6 max-w-2xl shadow-red-500 bg-gradient-to-r from-red-200'>
        <div>
          <WarningIcon className="w-8 h-8 text-red-600"/>
        </div>
        <section className='mb-6'>
          <h1 className='text-2xl font-bold text-red-600'>Permisos insuficientes</h1>
          <p className='text-lg'>Debes de tener permisos elevados para poder acceder a esta página.</p>
        </section>
      </Card>
    </div>
  )
}
