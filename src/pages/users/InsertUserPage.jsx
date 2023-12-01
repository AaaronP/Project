import { Button, Card, Select, SelectItem, Text, TextInput } from '@tremor/react'
import { useState } from 'react'
import useUsersActions from '../../hooks/useUsersActions'
import { ROLES } from '../../contants'

export default function InsertUserPage () {
  const { addUser } = useUsersActions()
  const [roleValue, setRoleValue] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.target

    const formData = new FormData(form)

    const email = formData.get('email')
    const name = formData.get('name')
    const role = formData.get('role')

    if (!email || !name || !role) {
      return
    }

    addUser({ email, name, role })

    form.reset()
  }

  return (
    <>
      <Card className='min-w-fit'>
          <Text className='font-bold text-xl mb-3'>Inserte un usuario</Text>
          <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
            <TextInput name='email' required placeholder='Email' type='email'/>
            <TextInput name='name' required placeholder="Nombre" type="text" />

            <Select required name='role' value={roleValue} onValueChange={setRoleValue} placeholder='Role'>
              {
                Object.entries(ROLES).map((role, index) => (
                  <SelectItem key={index} value={ role[1] }>
                  { role[1] }
                  </SelectItem>
                ))
              }
            </Select>

            <Button type='submit'>Insertar</Button>
          </form>
      </Card>
    </>
  )
}
