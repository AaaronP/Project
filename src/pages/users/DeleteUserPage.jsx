import { Card, TextInput, Button, Text } from '@tremor/react'
import useUserActions from '../../hooks/useUsersActions'

export default function DeleteUserPage () {
  const { removeUser } = useUserActions()

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.target

    const formData = new FormData(form)

    const email = formData.get('email')

    if (!email) {
      return
    }

    removeUser(email)

    form.reset()
  }

  return (
    <>
      <Card className='min-w-fit'>
          <Text className='font-bold text-xl mb-3'>Eliminar un usuario</Text>
          <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
            <TextInput name='email' type='email' required placeholder='Email'/>

            <Button type='submit'>Eliminar</Button>
          </form>
      </Card>
    </>
  )
}
