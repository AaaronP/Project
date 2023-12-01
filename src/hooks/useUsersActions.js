import { deleteUserByEmail, addNewUser, editUserAction, initUsers, startLoading, stopLoading, updateUsersRole } from '../store/users/slice'
import { useAppDispatch } from './store'
import { fetchUsers } from '../data/fetch'
import { Timestamp } from 'firebase/firestore'
import { updateUserRole } from '../store/user/slice'

export default function useUserActions () {
  const dispatch = useAppDispatch()

  const removeUser = (email) => {
    dispatch(deleteUserByEmail(email))
  }

  const addUser = async ({ email, name, role }) => {
    // convertimos el Date() a tipo timestamp
    const currentDate = Timestamp.fromDate(new Date())
    dispatch(addNewUser({ email, name, role, created_at: currentDate }))
  }

  const editUser = ({ email, name, role }) => {
    // filtramos los datos requeridos y opcionales
    const payload = {
      email,
      ...(name && { name }),
      ...(role && { role })
    }

    dispatch(editUserAction(payload))
  }

  const editUserRole = ({ role, email }) => {
    // actualizamos el estado del usuario y el de los usuarios
    dispatch(updateUsersRole({ role, email }))
    dispatch(updateUserRole({ role, email }))
  }

  // funcion asincrona
  const initDbUsers = () => {
    return async (dispatch) => {
      try {
        dispatch(startLoading())

        const users = await fetchUsers()

        dispatch(initUsers(users))
      } catch (err) {
        console.error('Error al cargar los usuarios: ', err)
      } finally {
        dispatch(stopLoading())
      }
    }
  }

  return { removeUser, addUser, editUser, initDbUsers, editUserRole }
}
