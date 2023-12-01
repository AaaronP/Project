import { deleteDoc, doc, getDocs, query, where, arrayRemove, updateDoc } from 'firebase/firestore'
import { toast } from 'sonner'

export const deleteUserAndDeviceDB = async ({ type, payload, db, previouseState, collection }) => {
  if (type === 'user/deleteUserByEmail') {
    const userToRemove = previouseState.users.users.find(user => user.email === payload)
    await deleteDoc(doc(db, 'users', userToRemove.email))
      .then(() => {
        toast.success(`Usuario ${userToRemove.name} eliminado`)
      })
      .catch(() => {
        toast.error('Error al eliminar el usuario')
      })
  }

  if (type === 'devices/deleteDeviceById') {
    const deviceToRemove = previouseState.devices.devices.find(device => device.id === payload)

    const q = query(collection, where('id', '==', deviceToRemove.id))
    const snapshot = await getDocs(q)
    snapshot.forEach(snap => {
      deleteDoc(doc(db, 'dispositivos', snap.id))
        .then(() => {
          toast.success(`Dispositivo ${deviceToRemove.name} eliminado`)
        })
        .catch(() => {
          toast.error('Error al eliminar el dispositivo')
        })
    })

    if (deviceToRemove.emailOwner) {
      await updateDoc(doc(db, 'users', deviceToRemove.emailOwner), { dispositivos: arrayRemove(deviceToRemove.id) })
    }
  }
}
