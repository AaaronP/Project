import {
  Card,
  Title,
  Flex,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableBody,
  Badge,
  Text
} from '@tremor/react'
import { useAppSelector } from '../hooks/store'
import MetricsCard from './MetricsCard'
import Dialog from './Dialog'
import { ArrowRedirectIcon } from './Icons'
import DeviceDetailCard from './DeviceDetailCard'
import { DEFAULT_VALUE } from '../contants'
import formatPrice from '../data/priceFormat'

export default function TablePurchases () {
  const devices = useAppSelector(state => state.devices.devices)
  const isLoading = useAppSelector(state => state.devices.isDeviceLoading)
  // filtramos los dispositivos que tenga propietario (emailOwner) del producto
  const filteredDevices = devices.filter(device => device.emailOwner)
  // obtenemos la suma del precio acumulado de todos los dispositivos que tengan dueño (que se vendió)
  const sales = filteredDevices.reduce((acumulador, device) => {
    if (!device.price) {
      return acumulador
    }
    // pasamos de string a float
    return acumulador + parseFloat(device.price)
  }, 0)

  return (
    <Card>
      <Flex justifyContent="start" className="space-x-2 mb-4">
        <Title>Compras</Title>
        <Badge>{filteredDevices.length}</Badge>
      </Flex>

        <MetricsCard sales={sales}/>

      <Table className="mt-6">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Id</TableHeaderCell>
            <TableHeaderCell>Usuario</TableHeaderCell>
            <TableHeaderCell>Item</TableHeaderCell>
            <TableHeaderCell>Costo</TableHeaderCell>
            <TableHeaderCell>Detalles</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { isLoading
            ? <TableRow>
                <TableCell>Cargando dispositivos...</TableCell>
              </TableRow>
            : filteredDevices.map((device, index) => (
            <TableRow key={device.id}>
              <TableCell>{device.id}</TableCell>
              <TableCell>{device.emailOwner}</TableCell>
              <TableCell>
                <Text className='whitespace-normal w-80'>{device.name}</Text>
              </TableCell>
              <TableCell>{device.price ? formatPrice({ price: device.price }) : DEFAULT_VALUE.text}</TableCell>
              <TableCell>
                <Dialog title={device.name} message={<DeviceDetailCard device={device}/>} id='hola'>
                  <div className='flex flex-row gap-2 items-center justify-between border rounded-lg border-blue-300 px-2 py-1 hover:text-blue-800'>
                      Detalles
                      <ArrowRedirectIcon className="w-4 h-4"/>
                  </div>
                </Dialog>
              </TableCell>
            </TableRow>
            ))}
        </TableBody>
      </Table>
    </Card>
  )
}
