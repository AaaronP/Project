import { Button, Card } from '@tremor/react'
import { Link } from 'react-router-dom'

export const ProtectedRoutePage = () => {
  return (
    <div className='grid place-content-center h-64'>
        <Card className='text-center '>
            <header className='mb-6'>
                <h1 className='text-2xl font-bold'>Inicia sesión</h1>
                <p className='text-lg'>Debes de iniciar sesión para poder acceder a las diferentes funciones del sitio web.</p>
            </header>
            <div>
                <Button>
                    <Link to='/login'>Login</Link>
                </Button>
            </div>
        </Card>
    </div>
  )
}
