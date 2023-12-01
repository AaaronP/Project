import { Timestamp, doc, getDoc } from 'firebase/firestore'
import { fetchDevices } from '../data/fetch'
import idGenerator from '../data/idGenerator'
import { addNewDevice, deleteDeviceById, editDeviceAction, initDevices, startLoading, stopLoading, updateDevicesChemicalLevel } from '../store/devices/slice'
import { useAppDispatch } from './store'
import { db } from '../../firebase'
import { toast } from 'sonner'

export default function useDevicesActions () {
  const dispatch = useAppDispatch()

  const removeDevice = (id) => {
    dispatch(deleteDeviceById(id))
  }

  const addDevice = async ({ name, emailOwner, price, installationDate, lastRead, chemicalLevel }) => {
    const id = idGenerator()
    // convertimos el Date() a un objeto timestamp
    // con el fin de darselo a la base de datos
    const installationDateToTimestamp = installationDate
      ? Timestamp.fromDate(installationDate)
      : '--/--/--'
    const lastReadToTimestamp = lastRead
      ? Timestamp.fromDate(lastRead)
      : '--/--/--'

    // filtramos los parametros que son undefined
    // menos el id y name que son requeridos
    const payload = {
      id,
      name,
      ...(emailOwner && { emailOwner }),
      ...(price && { price }),
      ...(installationDate && { installationDate: installationDateToTimestamp }),
      ...(lastRead && { lastRead: lastReadToTimestamp }),
      ...(chemicalLevel && { chemicalLevel })
    }
    try {
      if (emailOwner) {
        const isUserDefined = await getDoc(doc(db, 'users', emailOwner))
        if (!isUserDefined.exists()) throw new Error()
      }

      dispatch(addNewDevice(payload))
    } catch {
      toast.error('Usuario no existe')
    }
  }

  const editDevice = ({ id, name, emailOwner, price, installationDate, lastRead, chemicalLevel }) => {
    // convertimos el Date() a un objeto timestamp
    // con el fin de darselo a la base de datos
    const installationDateToTimestamp = installationDate
      ? Timestamp.fromDate(installationDate)
      : ''
    const lastReadToTimestamp = lastRead
      ? Timestamp.fromDate(lastRead)
      : ''

    // filtramos los datos requeridos (id) y los opcionales
    const payload = {
      id,
      ...(name && { name }),
      ...(emailOwner && { emailOwner }),
      ...(price && { price }),
      ...(installationDateToTimestamp && { installationDate: installationDateToTimestamp }),
      ...(lastReadToTimestamp && { lastRead: lastReadToTimestamp }),
      ...(chemicalLevel && { chemicalLevel })
    }

    dispatch(editDeviceAction(payload))
  }

  const editDeviceChemicalLevel = ({ chemicalLevel, id }) => {
    dispatch(updateDevicesChemicalLevel({ chemicalLevel, id }))
  }

  // funcion asincrona
  const initDbDevices = () => {
    return async (dispatch) => {
      try {
        dispatch(startLoading())
        const devices = await fetchDevices()
        dispatch(initDevices(devices))
      } catch (err) {
        console.error('Error al cargar los dispositivos: ', err)
      } finally {
        dispatch(stopLoading())
      }
    }
  }

  return { removeDevice, addDevice, editDevice, editDeviceChemicalLevel, initDbDevices }
}
