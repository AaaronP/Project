import { useEffect } from 'react'
import PreferencesTable from '../components/PreferencesTable'
import { useAppDispatch } from '../hooks/store'
import useUserActions from '../hooks/useUsersActions'

export default function PreferencePage () {
  const { initDbUsers } = useUserActions()
  const dispatch = useAppDispatch()

  // inicializamos los usuarios desde db
  useEffect(() => {
    const fetchData = async () => {
      dispatch(initDbUsers())
    }

    fetchData()
  }, [])

  return (
    <PreferencesTable/>
  )
}
