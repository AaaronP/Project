import { Badge } from '@tremor/react'
import { useAppSelector } from '../hooks/store'
import useAuth from '../hooks/useAuth'
import { OutIcon, WarningIcon, XIcon } from './Icons'
import { ROLES } from '../contants'

export default function DialogUserProfile ({ children }) {
  const user = useAppSelector(state => state.user.user)
  const { signOut, deleteAuthUser } = useAuth()

  const badgeColor = user.role === ROLES.propietario
    ? 'lime'
    : 'blue'

  return (
          <>
              <button onClick={() => document.getElementById('userProfileDialog').showModal()}>
                { children }
              </button>

              <dialog id="userProfileDialog" className="modal">
                  <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black">
                            <XIcon/>
                        </button>
                    </form>
                        <header className='flex gap-3'>
                            <img src={user.profileImg}/>

                            <section className='items-center justify-start'>
                                <h3 className="font-bold text-lg">{user.name}</h3>
                                <p className="py-0">{user.email}</p>
                                { user.role
                                  ? <Badge color={badgeColor} size="xl" className='mt-6 font-bold text-xl'>{user.role}</Badge>
                                  : null
                                }
                            </section>
                        </header>

                      <footer className="modal-action flex justify-between">
                            <button className='btn btn-error text-white' onClick={deleteAuthUser}>
                              <WarningIcon className="w-5 h-5"/>
                              Eliminar cuenta
                            </button>
                            <button className='btn btn-info text-white' onClick={signOut}>
                              <OutIcon/>
                              Cerrar sesión
                            </button>
                      </footer>
                  </div>
              </dialog>
          </>
  )
}
