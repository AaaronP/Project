import { useEffect } from 'react'
import AlertsTable from '../components/AlertsTable'
import { useAppDispatch } from '../hooks/store'
import useDevicesActions from '../hooks/useDevicesActions'

export default function AlertsPage () {
  const { initDbDevices } = useDevicesActions()
  const dispatch = useAppDispatch()

  // inicializamos los dispositivos desde db
  useEffect(() => {
    const fetchData = async () => {
      dispatch(initDbDevices())
    }

    fetchData()
  }, [])

  return (
    <AlertsTable/>
  )
}
