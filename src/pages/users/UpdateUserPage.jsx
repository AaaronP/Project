import { Card, Select, SelectItem, TextInput, Button, Text } from '@tremor/react'
import { useState, useRef } from 'react'
import useUsersActions from '../../hooks/useUsersActions'
import { toast } from 'sonner'
import { useAppSelector } from '../../hooks/store'
import { ROLES } from '../../contants'

export default function UpdateUserPage () {
  const users = useAppSelector(state => state.users.users)

  const { editUser } = useUsersActions()
  const [selectValue, setSelectValue] = useState('')
  const [emailValue, setEmailValue] = useState('')

  const emailRef = useRef(null)
  const nameRef = useRef(null)

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.target

    const formData = new FormData(form)

    const email = formData.get('email')
    const name = formData.get('name')
    const role = formData.get('role')

    if (!email || (!name && !role)) {
      return
    }

    editUser({ email, name, role })

    form.reset()
    setEmailValue('')
    nameRef.current.value = ''
    setSelectValue('')
  }

  const autocomplete = () => {
    const user = users.find(user => user.email === emailValue)

    if (!user) return toast.error('Usuario no encontrado!')

    setSelectValue(user.role)
    nameRef.current.value = user.name
  }

  return (
    <>
      <Card className='min-w-fit'>
          <Text className='font-bold text-xl mb-3'>Actualizar un usuario</Text>
          <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
            <TextInput
              ref={emailRef}
              name='email'
              required
              type='email'
              placeholder='Email'
              value={emailValue}
              onValueChange={() => setEmailValue(emailRef.current.value)}
            />
            { emailValue && <Button className='w-20' type='button' onClick={autocomplete}>Rellenar</Button> }
            <TextInput
              ref={nameRef}
              name='name'
              placeholder="Nombre"
              type="text"
            />

            <Select name='role' value={selectValue} onValueChange={setSelectValue} placeholder='Role'>
              {
                Object.entries(ROLES).map((role, index) => (
                  <SelectItem key={index} value={role[1]}>
                    { role[1] }
                  </SelectItem>
                ))
              }
            </Select>
            <Button type='submit'>Actualizar</Button>
          </form>
      </Card>
    </>
  )
}
