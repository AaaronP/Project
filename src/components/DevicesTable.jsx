import {
  Badge,
  Card,
  Table,
  TableBody,
  TableHead,
  TableHeaderCell,
  TableRow,
  Title,
  TableCell,
  Text,
  Select,
  SelectItem,
  Icon
} from '@tremor/react'
import { useAppSelector } from '../hooks/store'
import Dialog from './Dialog'
import { ArrowRedirectIcon, CopyIcon, DeleteIcon } from './Icons'
import { DEFAULT_VALUE } from '../contants'
import formatPrice from '../data/priceFormat'
import { useState } from 'react'
import DeviceDetailCard from './DeviceDetailCard'

export default function DevicesTable () {
  const [selectedEmailValue, setSelectedEmailValue] = useState(null)
  const devices = useAppSelector(state => state.devices.devices)
  const isLoading = useAppSelector(state => state.devices.isDeviceLoading)

  // filtramos los dispositivos por el email
  const filteredDeviceByEmail = selectedEmailValue
    ? devices.filter(device => device.emailOwner === selectedEmailValue)
    : devices

  const uniqueEmailOwners = new Set()
  const filteredDuplicatedDeviceEmail = devices.filter(device => {
    if (device.emailOwner !== null && device.emailOwner !== undefined) {
      if (!uniqueEmailOwners.has(device.emailOwner)) {
        uniqueEmailOwners.add(device.emailOwner)
        return true
      }
    }
    return false
  })

  const formatDate = (timestanp) => {
    const date = timestanp.toDate().toLocaleDateString()
    return date
  }

  return (
    <Card>
      <Title className='inline-block'>Lista de dispositivos</Title>
      <Badge className='ml-2'>{filteredDeviceByEmail.length}</Badge>

      <Select className="w-1/6 mt-6" value={selectedEmailValue} onValueChange={setSelectedEmailValue} placeholder='Email' disabled={filteredDuplicatedDeviceEmail.length === 0}>
          {
            filteredDuplicatedDeviceEmail.map(device => (
                  <SelectItem key={device.id} value={device.emailOwner}>{device.emailOwner}</SelectItem>
            ))
          }
      </Select>

      <Table className="mt-5">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Id</TableHeaderCell>
            <TableHeaderCell>Nombre</TableHeaderCell>
            <TableHeaderCell>Dueño</TableHeaderCell>
            <TableHeaderCell>Precio</TableHeaderCell>
            <TableHeaderCell>Fecha de installación</TableHeaderCell>
            <TableHeaderCell>Última lectura</TableHeaderCell>
            <TableHeaderCell>Acciones</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
        { isLoading
          ? <TableRow>
                  <TableCell>Cargando dispositivos...</TableCell>
                </TableRow>
          : filteredDeviceByEmail.map((device) => (
            <TableRow key={device.id}>
              <TableCell>{device.id}</TableCell>
              <TableCell>
                <Text className='inline-block whitespace-normal w-64'>{device.name}</Text>
              </TableCell>
              <TableCell>
                <Text>{device?.emailOwner ?? DEFAULT_VALUE.text}</Text>
              </TableCell>
              <TableCell>
                <Text>{device.price ? formatPrice({ price: device.price }) : DEFAULT_VALUE.text}</Text>
              </TableCell>
              <TableCell>
                <Text>{device?.installationDate ? formatDate(device.installationDate) : DEFAULT_VALUE.date}</Text>
              </TableCell>
              <TableCell>
                <Text>{device?.lastRead ? formatDate(device.lastRead) : DEFAULT_VALUE.date}</Text>
              </TableCell>
              <TableCell>
                <div className='flex flex-row gap-2'>
                  <button onClick={() => {
                    navigator.clipboard.writeText(device.id)
                  }}>
                    <Icon icon={CopyIcon} tooltip='Copiar id' variant="simple" color='slate' />
                  </button>

                  <Dialog id={device.id} category="device" title={`Eliminar dispositivo: ${device.name}`} message={`Estás seguro de eliminar el dispositivo ${device.id}?`}>
                      <Icon icon={DeleteIcon} tooltip='Eliminar dispositivo' variant="simple" color='slate'/>
                  </Dialog>

                  <Dialog title={device.name} message={
                    <DeviceDetailCard device={device}/>
                  }>
                    <Icon icon={ArrowRedirectIcon} tooltip='Detalles' variant="simple" color='slate' className='z-0'/>
                  </Dialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
