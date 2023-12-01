import { useAppSelector } from '../hooks/store'
import useDevicesActions from '../hooks/useDevicesActions'
import useUserActions from '../hooks/useUsersActions'
import { WarningIcon, XIcon } from './Icons'
import { ROLES } from '../contants'
import { useId } from 'react'
import { Card } from '@tremor/react'

export default function Dialog ({ children, title, message, id, category }) {
  const dialogId = useId()
  const { role } = useAppSelector(state => state.user.user)
  const { removeDevice } = useDevicesActions()
  const { removeUser } = useUserActions()

  const handleRemove = () => {
    if (category === 'device') removeDevice(id)
    if (category === 'user') removeUser(id)
  }

  const UnprivilegedDialog = () => {
    return (
        <>
            <Card className="overflow-hidden flex items-center gap-6 modal-box shadow-red-500 bg-gradient-to-r from-red-200 max-w-sm">
                <WarningIcon className='w-8 h-8 text-red-600'/>
                <aside>
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black">
                            <XIcon className='w-6 h-6'/>
                        </button>
                    </form>
                    <h3 className="font-bold text-2xl text-red-600">Incapaz de eliminar</h3>
                    <div className="py-4 w-70 whitespace-pre-line text-lg">
                        No tienes los privilegios suficientes para eliminar
                    </div>
                </aside>
            </Card>
        </>
    )
  }

  const PrivilegedDialog = () => {
    return (
        <>

            <div className="modal-box overflow-hidden">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black">
                        <XIcon className='w-6 h-6'/>
                    </button>
                </form>
                <h3 className="font-bold text-lg whitespace-normal w-80">{title}</h3>
                <div className="py-4 w-70 whitespace-pre-line">{message}</div>
                <div className="modal-action">
                    { category && <form method="dialog">
                        <button type='button' className="btn mr-5 w-16">No</button>
                        <button type='button' className="btn btn-error w-16 text-white" onClick={handleRemove}>Si</button>
                    </form> }
                </div>
            </div>

        </>
    )
  }

  return (
    <>
        <button onClick={() => document.getElementById(dialogId).showModal()}>
            {children}
        </button>
        <dialog id={dialogId} className="modal">
            {
                role === ROLES.visualizador || !role
                  ? <UnprivilegedDialog/>
                  : <PrivilegedDialog/>
            }
        </dialog>
    </>
  )
}
