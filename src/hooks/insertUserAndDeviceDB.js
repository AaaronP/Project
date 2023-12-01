import { addDoc, doc, getDocs, setDoc, updateDoc, arrayUnion } from 'firebase/firestore'
import { toast } from 'sonner'

export const insertUserAndDeviceDB = async ({ type, payload, db, deviceCollection, usersCollection }) => {
  if (type === 'user/addNewUser') {
    const userEmail = payload.email

    const snapshot = await getDocs(usersCollection)
    const isUserDefined = snapshot.docs.findIndex(user => user.data().email === userEmail)

    if (isUserDefined === -1) {
      await setDoc(doc(db, 'users', userEmail), { ...payload })
        .then(() => {
          toast.success(`Usuario ${userEmail} añadido`)
        })
    } else {
      toast.error('El usuario ya existe!')
    }
  }

  if (type === 'devices/addNewDevice') {
    if (payload.emailOwner) {
      await addDoc(deviceCollection, { ...payload })
        .then(() => {
          toast.success(`Dispositivo ${payload.name} añadido`)
        })
        .catch(() => {
          toast.warning('Error al insertar!')
        })

      await updateDoc(doc(db, 'users', payload.emailOwner), { dispositivos: arrayUnion(payload.id) })
    } else {
      await addDoc(deviceCollection, { ...payload })
        .then(() => {
          toast.success(`Dispositivo ${payload.name} añadido`)
        })
        .catch(() => {
          toast.warning('Error al insertar!')
        })
    }
  }
}
