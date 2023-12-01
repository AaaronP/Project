import { Button, Select, SelectItem } from '@tremor/react'
import { useEffect, useState } from 'react'
import { EditIcon } from './Icons'
import { CHEMICAL_LEVEL } from '../contants'
import useDevicesActions from '../hooks/useDevicesActions'

export default function SelectChemicalLevel ({ initialChemicalLevel, id }) {
  const { editDeviceChemicalLevel } = useDevicesActions()
  const [chemicalLevelValue, setChemicalLevelValue] = useState(initialChemicalLevel ?? '')
  const [updateButtonDisable, setUpdateButtonDisable] = useState(true)

  useEffect(() => {
    if (chemicalLevelValue && chemicalLevelValue !== initialChemicalLevel) setUpdateButtonDisable(false)
    else setUpdateButtonDisable(true)
  }, [chemicalLevelValue])

  const handleUpdateDeviceChemicalLevel = () => {
    if (!chemicalLevelValue || chemicalLevelValue === initialChemicalLevel) return

    editDeviceChemicalLevel({ chemicalLevel: chemicalLevelValue, id })
  }

  return (
    <div className='flex flex-row gap-5'>
        <Select defaultValue={initialChemicalLevel} value={chemicalLevelValue} onValueChange={setChemicalLevelValue} className='w-1/6'>
            {
                Object.entries(CHEMICAL_LEVEL).map((level, index) => (
                    <SelectItem key={index} value={ level[1] }>
                        { level[1] }
                    </SelectItem>
                ))
            }
        </Select>
        <Button type='button' onClick={handleUpdateDeviceChemicalLevel} disabled={updateButtonDisable}>
            <EditIcon/>
        </Button>
    </div>
  )
}
