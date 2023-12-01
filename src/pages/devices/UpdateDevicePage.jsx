import { Button, Card, Text, TextInput, DatePicker, NumberInput, Select, SelectItem } from '@tremor/react'
import { useState, useRef } from 'react'
import useDevicesActions from '../../hooks/useDevicesActions'
import { CurrencyIcon } from '../../components/Icons'
import { useAppSelector } from '../../hooks/store'
import { toast } from 'sonner'
import { es } from 'date-fns/locale'
import { CHEMICAL_LEVEL } from '../../contants'

export default function UpdateDevicePage () {
  const devices = useAppSelector(state => state.devices.devices)
  const { editDevice } = useDevicesActions()
  const [idValue, setIdValue] = useState('')
  const [installationDateValue, setInstallationDateValue] = useState(undefined)
  const [lastReadDateValue, setLastReadDateValue] = useState(undefined)
  const [chemicalLevelValue, setChemicalLevelValue] = useState('')

  const idRef = useRef(null)
  const emailOwnerRef = useRef(null)
  const nameRef = useRef(null)
  const priceRef = useRef(null)

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.target

    const formData = new FormData(form)

    const id = formData.get('id')
    const emailOwner = formData.get('emailOwner')
    const name = formData.get('name')
    const price = formData.get('price')

    if (!id) {
      return
    }

    editDevice({ id, name, emailOwner, price, installationDate: installationDateValue, lastRead: lastReadDateValue, chemicalLevel: chemicalLevelValue })

    form.reset()
    setInstallationDateValue(undefined)
    setLastReadDateValue(undefined)
    setIdValue('')
    setChemicalLevelValue('')
  }

  const refillInputs = () => {
    const device = devices.find(device => device.id === idValue)
    if (!device) return toast.error('Dispositivo no encontrado!')

    nameRef.current.value = device.name
    priceRef.current.value = device.price || ''
    emailOwnerRef.current.value = device.emailOwner || ''
    setInstallationDateValue(device.installationDate?.toDate() ?? undefined)
    setLastReadDateValue(device.lastRead?.toDate() ?? undefined)
    setChemicalLevelValue(device?.chemicalLevel ?? '')
  }

  return (
    <>
      <Card className='min-w-fit'>
          <Text className='font-bold text-xl mb-3'>Actualizar un dispositivo</Text>
          <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
            <TextInput
              ref={idRef}
              name='id'
              required
              placeholder="Id"
              type="text"
              value={idValue}
              onValueChange={() => setIdValue(idRef.current.value)}
            />
            { idValue && <Button className='w-20' type='button' onClick={refillInputs}>Rellenar</Button> }
            <TextInput
              ref={nameRef}
              name='name'
              placeholder="Nombre"
              type="text"
            />
            <TextInput
              ref={emailOwnerRef}
              name='emailOwner'
              type='email'
              placeholder='Email del dueño'
            />
            <DatePicker
              className="mx-auto"
              placeholder="Fecha de installación"
              locale={es}
              value={installationDateValue}
              onValueChange={setInstallationDateValue}
            />
            <DatePicker
              className="mx-auto"
              placeholder="Última lectura"
              locale={es}
              value={lastReadDateValue}
              onValueChange={setLastReadDateValue}
            />
            <NumberInput
              ref={priceRef}
              name="price"
              icon={CurrencyIcon}
              placeholder="Precio"
              min='0'
              className='mx-auto'
              step='.01'
            />

            <Select required name='chimicalLevel' value={chemicalLevelValue} onValueChange={setChemicalLevelValue} placeholder='Nivel químico'>
              {
                Object.entries(CHEMICAL_LEVEL).map((level, index) => (
                  <SelectItem key={index} value={ level[1] }>
                  { level[1] }
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
