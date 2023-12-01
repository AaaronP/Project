import { List, ListItem, Badge } from '@tremor/react'
import { DEFAULT_VALUE } from '../contants'

export default function UserDetailCard ({ user }) {
  const { email, role, dispositivos } = user

  return (
      <div>
        <List>
            <ListItem>
                <span>Email</span>
                <span>{email}</span>
            </ListItem>
            <ListItem>
                <span>Role</span>
                <span>{role}</span>
            </ListItem>
            <ListItem>
                <span>Created at</span>
                <span>{user.created_at.toDate().toLocaleDateString()}</span>
            </ListItem>
            <ListItem>
            <span>Dispositivos</span>
            {
                dispositivos
                  ? (

                    <div className='flex flex-wrap gap-2 max-w-[20rem] justify-end'>
                    {
                        dispositivos.map(deviceId => (
                            <Badge key={deviceId}>{deviceId}</Badge>
                        ))
                    }
                    </div>

                    )
                  : DEFAULT_VALUE.text
            }
            </ListItem>
        </List>
      </div>
  )
}
