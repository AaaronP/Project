import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  devices: [],
  isDeviceLoading: false
}

export const devicesSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    initDevices: (state, action) => {
      return { ...state.devices, devices: action.payload }
    },
    addNewDevice: (state, action) => {
      const device = { ...action.payload }
      const newDevice = [...state.devices, device]
      return { ...state, devices: newDevice }
    },
    deleteDeviceById: (state, action) => {
      const id = action.payload
      const filteredDevices = state.devices.filter(device => device.id !== id)

      return { ...state, devices: filteredDevices }
    },
    editDeviceAction: (state, action) => {
      const deviceIndex = state.devices.findIndex(device => device.id === action.payload.id)

      if (deviceIndex !== -1) {
        state.devices[deviceIndex] = { ...state.devices[deviceIndex], ...action.payload }
      }
    },
    startLoading: (state) => {
      return { ...state, isDeviceLoading: true }
    },
    stopLoading: (state) => {
      return { ...state, isDeviceLoading: false }
    },
    updateDevicesChemicalLevel: (state, action) => {
      const deviceIndex = state.devices.findIndex(device => device.id === action.payload.id)
      if (deviceIndex !== -1) {
        state.devices[deviceIndex] = { ...state.devices[deviceIndex], ...action.payload }
      }
    }
  }
})

export const { deleteDeviceById, addNewDevice, initDevices, editDeviceAction, startLoading, stopLoading, updateDevicesChemicalLevel } = devicesSlice.actions
export default devicesSlice.reducer
