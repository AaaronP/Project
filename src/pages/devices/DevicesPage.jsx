import { Outlet } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/store'
import { useEffect } from 'react'
import useDevicesActions from '../../hooks/useDevicesActions'
import DevicesTable from '../../components/DevicesTable'

export default function Devices () {
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
    <>
      <DevicesTable/>
      <div className='mt-6'>
        <Outlet/>
      </div>
    </>
  )
}
