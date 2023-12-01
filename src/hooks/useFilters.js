import { useState } from 'react'

export const useFilters = ({ devices, user }) => {
  const [selectedEmailValue, setSelectedEmailValue] = useState(null)
  const [chemicalLevelFilter, setChemicalLevelFilter] = useState('')

  // filtrar el nivel quimico
  const filterChemicalLevel = chemicalLevelFilter ? devices.filter(device => device.chemicalLevel === chemicalLevelFilter) : devices

  // filtramos los dispositivos por el email
  const filteredDeviceByEmail = selectedEmailValue
    ? filterChemicalLevel.filter(device => device.emailOwner === selectedEmailValue)
    : filterChemicalLevel

  const filteredUserDevices = filterChemicalLevel.filter(device => device.emailOwner === user.email)

  // filtramos los elementos que tenga el email repetido
  // y los que no tienen email
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

  return {
    filteredDeviceByEmail,
    filteredDuplicatedDeviceEmail,
    filteredUserDevices,
    selectedEmailValue,
    chemicalLevelFilter,
    setSelectedEmailValue,
    setChemicalLevelFilter
  }
}
