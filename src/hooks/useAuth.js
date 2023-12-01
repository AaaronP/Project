import { Timestamp, deleteDoc, doc, getDoc } from 'firebase/firestore'
import { signInWithPopup, signOut as signOutFirebase, deleteUser } from 'firebase/auth'
import { auth, db, provider } from '../../firebase'
import { useAppDispatch } from './store'
import { addUser, addUserUsingDB, initUser, setUserLogOutState, startLoading, stopLoading } from '../store/user/slice'
import { addNewUser } from '../store/users/slice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export default function useAuth () {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  // funcion asincrona
  const signIn = () => {
    return async (dispatch) => {
      try {
        const res = await signInWithPopup(auth, provider)
        const snapshot = await getDoc(doc(db, 'users', res.user.email))

        if (snapshot.exists()) {
          const { name, profileImg, email, role } = snapshot.data()
          dispatch(addUserUsingDB({ email, name, profileImg, role, created_at: snapshot.data().created_at }))
        } else {
          const creationTime = res.user.metadata.creationTime
          const timestamp = Timestamp.fromDate(new Date(creationTime))

          const user = {
            name: res.user.displayName,
            email: res.user.email,
            profileImg: res.user.photoURL,
            created_at: timestamp,
            role: 'Visualizador'
          }

          dispatch(addUser(user))
          dispatch(addNewUser(user))
        }

        navigate('/')
      } catch (error) {
        console.error(error)
      }
    }
  }

  const signOut = async () => {
    await signOutFirebase(auth)
      .then(() => {
        toast.success('Usuario cerró sesión')
        dispatch(setUserLogOutState())
        navigate('/login')
      })
      .catch(() => {
        toast.error('Error al cerrar sesión')
      })
  }

  const deleteAuthUser = async () => {
    // esperamos que el auth termine de cargar
    await new Promise(resolve => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        resolve(user)
        unsubscribe()
      })
    })

    const user = auth.currentUser

    if (!user) return

    await deleteUser(user)
      .then(() => {
        dispatch(setUserLogOutState())
        deleteDoc(doc(db, 'users', user.email))

        navigate('/login')
      })
      .catch(() => {
        toast.error('Error al eliminarte!')
      })
  }

  const initDbUser = () => {
    return async (dispatch) => {
      try {
        dispatch(startLoading())

        if (auth === null) return

        await new Promise(resolve => {
          const unsubscribe = auth.onAuthStateChanged(user => {
            resolve(user)
            unsubscribe()
          })
        })
        if (!auth.currentUser) return

        const snapshot = await getDoc(doc(db, 'users', auth.currentUser.email))

        if (snapshot.data()) {
          dispatch(initUser(snapshot.data()))
        }
      } catch (err) {
        toast.error('Error al cargar usuario')
      } finally {
        dispatch(stopLoading())
      }
    }
  }

  return { signIn, signOut, initDbUser, deleteAuthUser }
}
