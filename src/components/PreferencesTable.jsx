import {
  Badge,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
  Title
} from '@tremor/react'
import { useAppSelector } from '../hooks/store'
import SelectRole from './SelectRole'

export default function PreferencesTable () {
  const users = useAppSelector(state => state.users.users)
  const isLoading = useAppSelector(state => state.users.isLoading)

  return (
        <Card>
          <Title className='inline-block'>Lista de roles de usuarios</Title>
          <Badge className='ml-2'>{users.length}</Badge>
          <p className='text-xs mt-2'>Los botones estarán desactivados si el role es vacio o si es igual a su role inicial.</p>
          <Table className="mt-5">
            <TableHead>
              <TableRow>
                <TableHeaderCell>Nombre</TableHeaderCell>
                <TableHeaderCell>Email</TableHeaderCell>
                <TableHeaderCell>Role</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { isLoading
                ? <TableRow>
                    <TableCell>Cargando Usuarios...</TableCell>
                  </TableRow>
                : users.map((user) => (
                    <TableRow key={user.email}>
                      <TableCell>
                        <Text className='flex flex-row gap-2 items-center'>
                          { user.profileImg
                            ? <img className='rounded-full w-6' src={user.profileImg}/>
                            : null
                          }
                          {user.name}
                        </Text>
                      </TableCell>
                      <TableCell>
                        <Text>{user.email}</Text>
                      </TableCell>
                      <TableCell>
                        <SelectRole initialRole={user.role} email={user.email}/>
                      </TableCell>
                    </TableRow>
                ))}
            </TableBody>
          </Table>
        </Card>
  )
}
