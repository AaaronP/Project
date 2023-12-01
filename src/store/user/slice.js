import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {},
  isUserLoading: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // inicializamos desde db
    initUser: (state, action) => {
      return { ...state, user: action.payload }
    },
    setUserLogOutState: state => {
      state.user = {}
    },
    startLoading: (state) => {
      return { ...state, isUserLoading: true }
    },
    stopLoading: (state) => {
      return { ...state, isUserLoading: false }
    },
    addUser: (state, action) => {
      const user = { ...action.payload }
      return { ...state.user, user }
    },
    updateUserRole: (state, action) => {
      const user = state.user.email === action.payload.email

      if (user) {
        const role = action.payload.role
        const editedUser = { ...state.user, role }
        return { ...state, user: editedUser }
      }

      return { ...state }
    },
    addUserUsingDB: (state, action) => {
      const user = { ...action.payload }
      return { ...state.user, user }
    }
  }
})

export const {
  setUserLogOutState,
  initUser,
  startLoading,
  stopLoading,
  updateUserRole,
  addUser,
  addUserUsingDB
} = userSlice.actions

export default userSlice.reducer
