import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  users: [],
  isLoading: false
}

export const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // funcion que dicta cuando los usuarios ya se inicializaron
    startLoading: (state) => {
      return { ...state, isLoading: true }
    },
    stopLoading: (state) => {
      return { ...state, isLoading: false }
    },
    // inicializar los usuarios desde la db
    initUsers: (state, action) => {
      return { ...state, users: action.payload }
    },
    addNewUser: (state, action) => {
      // buscamos el usuario si existe para devolver el estado
      // y no crear un nuevo usuario
      const isUserDefined = state.users.findIndex(user => user.email === action.payload.email)
      if (isUserDefined >= 0) return { ...state }

      const user = { ...action.payload }
      const newUser = [...state.users, user]

      return { ...state, users: newUser }
    },
    deleteUserByEmail: (state, action) => {
      const email = action.payload
      const filteredUsers = state.users.filter(user => user.email !== email)

      return { ...state, users: filteredUsers }
    },
    editUserAction: (state, action) => {
      const userIndex = state.users.findIndex(user => user.email === action.payload.email)

      if (userIndex !== -1) {
        state.users[userIndex] = { ...state.users[userIndex], ...action.payload }
      }
    },
    updateUsersRole: (state, action) => {
      const userIndex = state.users.findIndex(user => user.email === action.payload.email)
      if (userIndex !== -1) {
        state.users[userIndex] = { ...state.users[userIndex], ...action.payload }
      }
    }
  }
})

export const {
  deleteUserByEmail,
  addNewUser,
  initUsers,
  editUserAction,
  startLoading,
  stopLoading,
  updateUsersRole
} = usersSlice.actions
export default usersSlice.reducer
