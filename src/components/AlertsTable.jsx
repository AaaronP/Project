import { Badge, Card, Table, TableBody, TableHead, TableHeaderCell, TableRow, Title, TableCell, Text, Select, SelectItem } from '@tremor/react'
import { useAppSelector } from '../hooks/store'
import { CHEMICAL_LEVEL, DEFAULT_VALUE, ROLES } from '../contants'
import SelectChemicalLevel from './SelectChemicalLevel'
import { XIcon, CheckIcon } from './Icons'
import { useFilters } from '../hooks/useFilters'

const ChemicalLevelBadge = ({ chemicalLevel }) => {
  return (
        <>
            {
            chemicalLevel
              ? <Badge className='flex' style={{ alignItems: 'baseline' }} color={chemicalLevel !== CHEMICAL_LEVEL.full ? 'red' : 'lime'}>
                <span className='flex items-center'>
                  {
                    chemicalLevel === CHEMICAL_LEVEL.full ? <CheckIcon className="inline-block w-4 h-4"/> : <XIcon className='inline-block w-4 h-4'/>
                  }
                  <span className='ml-1'>
                    {
                      chemicalLevel
                    }
                  </span>
                </span>
              </Badge>
              : DEFAULT_VALUE.text
            }
        </>
  )
}

const DevicesTableMap = ({ devices, isLoading }) => {
  return (
    <>
        {
        isLoading
          ? <TableRow>
                <TableCell>Cargando dispositivos...</TableCell>
            </TableRow>

          : (
              devices.map((device) => (
                  <TableRow key={device.id}>
                      <TableCell>
                        {device.id}
                      </TableCell>
                      <TableCell>
                        <Text className='whitespace-normal w-80'>{device.name}</Text>
                      </TableCell>
                      <TableCell>
                        <Text>{device?.emailOwner ?? DEFAULT_VALUE.text}</Text>
                      </TableCell>
                      <TableCell>
                          <ChemicalLevelBadge chemicalLevel={device.chemicalLevel}/>
                      </TableCell>
                      <TableCell>
                        <SelectChemicalLevel initialChemicalLevel={device.chemicalLevel} id={device.id}/>
                      </TableCell>
                  </TableRow>)
              )
            )
        }
    </>
  )
}

export default function AlertsTable () {
  const user = useAppSelector(state => state.user.user)
  const devices = useAppSelector(state => state.devices.devices)
  const isLoading = useAppSelector(state => state.devices.isDeviceLoading)

  const {
    selectedEmailValue,
    setSelectedEmailValue,
    filteredDuplicatedDeviceEmail,
    filteredDeviceByEmail,
    setChemicalLevelFilter,
    chemicalLevelFilter,
    filteredUserDevices
  } = useFilters({ devices, user })

  // fix
  return (
    <Card>
        <Title className='inline-block'>Lista de dispositivos</Title>
        <Badge className='ml-2'>{user.role === ROLES.propietario ? filteredDeviceByEmail.length : filteredUserDevices.length}</Badge>
        <span className='block text-sm mt-2'>Notifica el nivel químico de tus dispositivos</span>

        {/* Filters */}
        <section className='flex flex-row flex-wrap items-center mt-6 gap-5'>
          {
            user.role !== ROLES.visualizador
              ? (
                  <Select className="w-1/6" value={selectedEmailValue} onValueChange={setSelectedEmailValue} placeholder='Email'>
                      {
                        filteredDuplicatedDeviceEmail.map(device => (
                              <SelectItem key={device.id} value={device.emailOwner}>{device.emailOwner}</SelectItem>
                        ))
                      }
                      </Select>
                )
              : null
          }

          <Select className="w-1/6" value={chemicalLevelFilter} onValueChange={setChemicalLevelFilter} placeholder='Nivel Químico'>
          {
            Object.entries(CHEMICAL_LEVEL).map((level, index) => (
                  <SelectItem key={index} value={level[1]}>{level[1]}</SelectItem>
            ))
          }
          </Select>
        </section>

        <Table className="mt-5 overflow-y-visible">
            <TableHead>
                <TableRow>
                <TableHeaderCell>Id</TableHeaderCell>
                <TableHeaderCell>Nombre</TableHeaderCell>
                <TableHeaderCell>Dueño</TableHeaderCell>
                <TableHeaderCell>Nivel Químico</TableHeaderCell>
                <TableHeaderCell>Editar</TableHeaderCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                  user.role !== ROLES.visualizador
                    ? <DevicesTableMap devices={filteredDeviceByEmail} isLoading={isLoading}/>
                    : <DevicesTableMap devices={filteredUserDevices} isLoading={isLoading}/>
                    }
            </TableBody>
        </Table>
    </Card>
  )
}
