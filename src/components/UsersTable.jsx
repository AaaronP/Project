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
  Title,
  Icon
} from '@tremor/react'
import { ArrowRedirectIcon, CopyIcon, DeleteIcon } from './Icons'
import Dialog from './Dialog'
import { useAppSelector } from '../hooks/store'
import UserDetailCard from './UserDetailCard'
import { DEFAULT_VALUE } from '../contants'

export default function UsersTable () {
  const users = useAppSelector(state => state.users.users)
  const isLoading = useAppSelector(state => state.users.isLoading)

  const formatDate = (timestanp) => {
    const date = timestanp.toDate().toLocaleDateString()
    return date
  }

  return (
      <Card>
        <Title className='inline-block'>Lista de usuarios</Title>
        <Badge className='ml-2'>{users.length}</Badge>

        <Table className="mt-5">
          <TableHead>
            <TableRow>
              <TableHeaderCell>Nombre</TableHeaderCell>
              <TableHeaderCell>Email</TableHeaderCell>
              <TableHeaderCell>Role</TableHeaderCell>
              <TableHeaderCell>Fecha de creación</TableHeaderCell>
              <TableHeaderCell>Acciones</TableHeaderCell>
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
                      <Text>{user.role}</Text>
                    </TableCell>
                    <TableCell>
                      <Text>{user?.created_at ? formatDate(user.created_at) : DEFAULT_VALUE.date}</Text>
                    </TableCell>
                    <TableCell>
                      <div className='flex flex-row gap-2'>
                        <button onClick={() => {
                          navigator.clipboard.writeText(user.email)
                        }}>
                          <Icon icon={CopyIcon} tooltip='Copiar email' variant="simple" color='slate' />
                        </button>
                        <Dialog id={user.email} category='user' title='Eliminar usuario:' message={`Estás seguro de eliminar el usuario: ${user.email}`}>
                          <Icon icon={DeleteIcon} tooltip='Eliminar usuario' variant="simple" color='slate'/>
                        </Dialog>

                        <Dialog title={user.name} message={<UserDetailCard user={user}/>}>
                          <Icon icon={ArrowRedirectIcon} tooltip='Detalles' variant="simple" color='slate'/>
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
