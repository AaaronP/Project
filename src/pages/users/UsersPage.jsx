import { Outlet } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/store'
import useUserActions from '../../hooks/useUsersActions'
import { useEffect } from 'react'
import UsersTable from '../../components/UsersTable'

export default function UsersPage () {
  const { initDbUsers } = useUserActions()
  const dispatch = useAppDispatch()

  // inicializamos los usuarios
  useEffect(() => {
    const fetchData = async () => {
      dispatch(initDbUsers())
    }

    fetchData()
  }, [])

  return (
    <>
        <UsersTable/>
        <div className='mt-6'>
          <Outlet/>
        </div>
    </>
  )
}
