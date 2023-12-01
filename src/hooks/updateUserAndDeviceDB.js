import { doc, updateDoc, query, where, getDocs, arrayUnion, getDoc, arrayRemove } from 'firebase/firestore'
import { toast } from 'sonner'

export const updateUserAndDeviceDB = async ({ type, payload, db, deviceCollection, usersCollection }) => {
  if (type === 'user/editUserAction') {
    const userEmail = payload.email

    await updateDoc(doc(db, 'users', userEmail), {
      ...payload
    })
      .then(() => {
        toast.success(`Usuario ${userEmail} actualizado`)
      })
      .catch(() => {
        toast.error('Error al actualizar el usuario')
      })
  }

  if (type === 'user/updateUserRole') {
    const { email, role } = payload

    await updateDoc(doc(db, 'users', email), { ...payload })
      .then(() => {
        toast.success(`Role del usuario ${email}, actualizado a ${role}`)
      })
      .catch(() => {
        toast.error('Error al actualizar el role')
      })
  }

  if (type === 'devices/updateDevicesChemicalLevel') {
    const { id, chemicalLevel } = payload

    const q = query(deviceCollection, where('id', '==', id))
    const docs = await getDocs(q)
    docs.forEach(async device => {
      await updateDoc(doc(db, 'dispositivos', device.id), { chemicalLevel })
        .then(() => {
          toast.success(`Nivel químico del dispositivo ${device.data().name} actualizado a ${chemicalLevel}`)
        })
        .catch(() => {
          toast.error(`Error al actualizar nivel químico del dispositivo ${device.data().name}`)
        })
    })
  }

  if (type === 'devices/editDeviceAction') {
    const id = payload.id
    const userRef = payload.emailOwner
      ? await getDoc(doc(db, 'users', payload.emailOwner))
      : null

    try {
      if (payload.emailOwner && !userRef.exists()) {
        throw new Error()
      }

      const q = query(deviceCollection, where('id', '==', id))
      const snapshot = await getDocs(q)
      snapshot.forEach(snap => {
        updateDoc(doc(db, 'dispositivos', snap.id), { ...payload })
          .then(() => {
            toast.success(`Dispositivo ${payload.name} actualizado`)
          })
          .catch(() => {
            toast.error('Error al actualizar')
          })
      })

      if (userRef) {
        // checar si el emailOwner del dispositivo cambió
        const usersDocs = await getDocs(usersCollection)
        usersDocs.forEach(async user => {
        // verificamos que tenga la celda de dispositivos
          if (user.data().dispositivos) {
          // buscamos el indice de la celda "dispositivos" que machee con la id
            const deviceId = user.data().dispositivos.findIndex(user => user.includes(id))
            // si lo encuentra, actualiza el usuario
            // eliminando la id del array de dispositivos
            if (deviceId >= 0) {
              await updateDoc(doc(db, 'users', user.data().email), { dispositivos: arrayRemove(id) })
            }
          }
        })

        await updateDoc(doc(db, 'users', payload.emailOwner), { dispositivos: arrayUnion(id) })
      }
    } catch {
      toast.error('Usuario no existe')
    }
  }
}
