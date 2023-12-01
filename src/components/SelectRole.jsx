import { Button, Select, SelectItem } from '@tremor/react'
import { useEffect, useId, useState } from 'react'
import { EditIcon } from './Icons'
import useUserActions from '../hooks/useUsersActions'
import { ROLES } from '../contants'

export default function SelectRole ({ initialRole, email }) {
  const selectId = useId()
  const { editUserRole } = useUserActions()
  const [value, setValue] = useState(initialRole)
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    if (value && value !== initialRole) setDisabled(false)
    else setDisabled(true)
  }, [value])

  const handleUpdateUserRole = () => {
    if (!value || value === initialRole) return

    editUserRole({ role: value, email })
  }

  return (
    <div id={selectId} className='flex flex-row gap-5'>
        <Select defaultValue={initialRole} value={value} onValueChange={setValue} className='w-1/6'>
            {
              Object.entries(ROLES).map((role, index) => (
                <SelectItem key={index} value={role[1]}>
                  { role[1] }
                </SelectItem>
              ))
            }
        </Select>
        <Button type='button' variant='secondary' onClick={handleUpdateUserRole} disabled={disabled}>
            <EditIcon/>
        </Button>
    </div>
  )
}
