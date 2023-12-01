import React, { useEffect } from 'react'
import TablePurchases from '../components/TablePurchases'
import Chart from '../components/Chart'
import useDevicesActions from '../hooks/useDevicesActions'
import { useAppDispatch } from '../hooks/store'

export default function Estadistica () {
  const dispatch = useAppDispatch()
  const { initDbDevices } = useDevicesActions()

  // inicializamos los dispositivos desde db
  useEffect(() => {
    const fetchData = async () => {
      dispatch(initDbDevices())
    }

    fetchData()
  }, [])

  return (
    <>
      <TablePurchases/>
      <Chart/>
    </>

  )
}
