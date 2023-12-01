import { db } from '../../firebase'
import { insertUserAndDeviceDB } from './insertUserAndDeviceDB'
import { deleteUserAndDeviceDB } from './deleteUserAndDeviceDB'
import { updateUserAndDeviceDB } from './updateUserAndDeviceDB'
import { collection } from 'firebase/firestore'

export const syncWithDatabaseMiddleware = (store) => (next) => async (action) => {
  const { type, payload } = action
  const previouseState = store.getState()

  next(action)

  const deviceCollection = collection(db, 'dispositivos')
  const usersCollection = collection(db, 'users')

  insertUserAndDeviceDB({ type, payload, db, deviceCollection, usersCollection })
  deleteUserAndDeviceDB({ type, payload, db, previouseState, collection: deviceCollection })
  updateUserAndDeviceDB({ type, payload, db, previouseState, deviceCollection, usersCollection })
}
