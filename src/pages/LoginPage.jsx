import { useAppDispatch, useAppSelector } from '../hooks/store'
import '../components/styles/LoginPage.css'
import { Button, Card } from '@tremor/react'
import { GoogleIcon } from '../components/Icons'
import useAuth from '../hooks/useAuth'

export default function LoginPage () {
  const { signIn } = useAuth()
  const { email } = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()

  const onHandleSignIn = async () => {
    dispatch(signIn())
  }

  return (
    <div className='contenedor'>
      { email
        ? (
            <h1>Ya estás logeado</h1>
          )

        : (
            <Card className='text-center w-full'>

              <header className='mb-5'>
                <h1 className='text-3xl font-bold'>Bienvenido!</h1>
                <p className='text-xl'>Inicia sesión con Google</p>
              </header>

              <Button icon={GoogleIcon} variant='secondary' className='gap-2 w-full' onClick={onHandleSignIn}>
                Continuar con Google
              </Button>
            </Card>
          )
    }
    </div>
  )
}
