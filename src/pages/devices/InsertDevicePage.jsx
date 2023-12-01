import { Button, Card, Text, TextInput, DatePicker, NumberInput, Select, SelectItem } from '@tremor/react'
import useDevicesActions from '../../hooks/useDevicesActions'
import { CurrencyIcon } from '../../components/Icons'
import { useState } from 'react'
import { es } from 'date-fns/locale'
import { CHEMICAL_LEVEL } from '../../contants'

export default function InsertDevicePage () {
  const [installationDateValue, setInstallationDateValue] = useState(undefined)
  const [lastReadDateValue, setLastReadDateValue] = useState(undefined)
  const [chemicalLevelValue, setChemicalLevelValue] = useState('')

  const { addDevice } = useDevicesActions()

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.target

    const formData = new FormData(form)

    const emailOwner = formData.get('emailOwner')
    const name = formData.get('name')
    const price = formData.get('price')

    if (!name) {
      return
    }

    addDevice({ emailOwner, name, price, installationDate: installationDateValue, lastRead: lastReadDateValue, chemicalLevel: chemicalLevelValue })

    setLastReadDateValue(undefined)
    setInstallationDateValue(undefined)
    form.reset()
  }

  return (
    <>
      <Card className='min-w-fit'>
          <Text className='font-bold text-xl mb-3'>Inserte un dispositivo</Text>
          <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
            <TextInput
              name='name'
              required
              type='text'
              placeholder='Nombre'
            />
            <TextInput
              name='emailOwner'
              type='email'
              placeholder='Email del dueño'/>
            <DatePicker
              name="installationDate"
              className="mx-auto"
              placeholder="Fecha de installación"
              locale={es}
              value={installationDateValue}
              onValueChange={setInstallationDateValue}
            />
            <DatePicker
              name='lastRead'
              className="mx-auto"
              placeholder="Última lectura"
              locale={es}
              value={lastReadDateValue}
              onValueChange={setLastReadDateValue}
            />
            <NumberInput
              name="price"
              icon={CurrencyIcon}
              placeholder="Precio"
              min='0'
              className='mx-auto'
              step='.01'
            />

            {/* Eliminar */}
            <Select required name='chimicalLevel' value={chemicalLevelValue} onValueChange={setChemicalLevelValue} placeholder='Nivel químico'>
              {
                Object.entries(CHEMICAL_LEVEL).map((level, index) => (
                  <SelectItem key={index} value={ level[1] }>
                  { level[1] }
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
