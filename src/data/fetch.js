import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase.js'

export const fetchUsers = async () => {
  const users = []

  const querySnapshot = await getDocs(collection(db, 'users'))

  querySnapshot.forEach(doc => {
    users.push(doc.data())
  })
  return users
}

export const fetchDevices = async () => {
  const devices = []

  const querySnapshot = await getDocs(collection(db, 'dispositivos'))
  querySnapshot.forEach(doc => {
    devices.push(doc.data())
  })

  return devices
}
