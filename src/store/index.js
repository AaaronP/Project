import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/slice'
import usersReducer from './users/slice'
import devicesReducer from './devices/slice'
import thunk from 'redux-thunk'
import { syncWithDatabaseMiddleware } from '../hooks/syncWithDatabaseMiddleware'

// el localStorage se ejecuta despues de que cambie el estado
// guardando el estado de los usuarios, usuario y dispositivos
const persistanceLocalStorageMiddleware = (store) => (next) => (action) => {
  next(action)
  window.localStorage.setItem('__redux_state__', JSON.stringify(store.getState()))
}

// agregamos todos los slices a necesitar
// y los middleware para controlar los estados asincronos
export const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
    devices: devicesReducer
  },
  middleware: [syncWithDatabaseMiddleware, persistanceLocalStorageMiddleware, thunk]
})
