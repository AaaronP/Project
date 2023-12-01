import { Button, Card, Text, TextInput } from '@tremor/react'
import useDevicesActions from '../../hooks/useDevicesActions'

export default function DeleteDevicePage () {
  const { removeDevice } = useDevicesActions()

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.target

    const formData = new FormData(form)

    const id = formData.get('id')

    if (!id) {
      return
    }

    removeDevice(id)

    form.reset()
  }

  return (
      <>
        <Card className='min-w-fit'>
          <Text className='font-bold text-xl mb-3'>Eliminar un dispositivo</Text>
          <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
            <TextInput name='id' type='text' required placeholder='Id'/>

            <Button type='submit'>Eliminar</Button>
          </form>
      </Card>
      </>
  )
}
