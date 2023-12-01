import { useState } from 'react'
import './styles/Sidebar.css'
import { NavLink } from './NavLink'
import { Link } from 'react-router-dom'
import { ArrowIcon, AddIcon, RemoveIcon, EditIcon, SettingsIcon } from './Icons'

export default function Sidebar () {
  const [active, setActive] = useState(false)
  const [isOpenArrow1, setIsOpenArrow1] = useState(false)
  const [isOpenArrow2, setIsOpenArrow2] = useState(false)

  const handleOpenArrow1 = () => {
    setIsOpenArrow1(!isOpenArrow1)
  }
  const handleOpenArrow2 = () => {
    setIsOpenArrow2(!isOpenArrow2)
  }

  const isMenuActive = active
    ? 'ham-menu active'
    : 'ham-menu'

  const sidebarContentStyle = active
    ? { left: '0' }
    : { left: '-100%' }

  return (
    <>
        <div className='sidebar'>
            <div className={isMenuActive} onClick={() => setActive(!active)}>
                <span></span>
                <span></span>
                <span></span>
            </div>

            <div className='content' style={sidebarContentStyle}>
                <header>
                    <Link to='/' className='px-2 py-1 ml-[15px] font-bold text-2xl rounded-xl'>Project</Link>
                    <NavLink to='/preferencias' className="preferenceIcon">
                        <SettingsIcon/>
                    </NavLink>
                </header>
                <section>
                    <ul>
                        <li>
                            <section>
                                <NavLink to='/users'>
                                    <strong>Usuarios</strong>
                                </NavLink>
                                <button className='arrowIcon' onClick={handleOpenArrow1}>
                                    <ArrowIcon openArrow={isOpenArrow1}/>
                                </button>
                            </section>
                            <aside>
                                {
                                    isOpenArrow1 && (
                                        <>
                                            <NavLink to='/users/insertUser' className="">
                                                Insertar
                                                <AddIcon/>
                                            </NavLink>
                                            <NavLink to='/users/deleteUser'>
                                                Eliminar
                                                <RemoveIcon/>
                                            </NavLink>
                                            <NavLink to='/users/updateUser'>
                                                Actualizar
                                                <EditIcon/>
                                            </NavLink>
                                        </>
                                    )
                                }

                            </aside>
                        </li>
                        <li>
                            <section>
                                <NavLink to='/devices'>
                                    <strong>Dispositivos</strong>
                                </NavLink>
                                <button className='arrowIcon' onClick={handleOpenArrow2}>
                                    <ArrowIcon openArrow={isOpenArrow2}/>
                                </button>
                            </section>
                            <aside>
                            {
                                isOpenArrow2 && (
                                    <>
                                        <NavLink to='/devices/insertDevice'>
                                            Insertar
                                            <AddIcon/>
                                        </NavLink>
                                        <NavLink to='/devices/deleteDevice'>
                                            Eliminar
                                            <RemoveIcon/>
                                        </NavLink>
                                        <NavLink to='/devices/updateDevice'>
                                            Actualizar
                                            <EditIcon/>
                                        </NavLink>
                                    </>
                                )
                            }
                            </aside>
                        </li>
                        <li>
                            <NavLink to='estadistica'>
                                <strong>Estadistica</strong>
                            </NavLink></li>
                        <li>
                            <NavLink to='alertas'>
                                <strong>Alertas</strong>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='contactos'>
                                <strong>Contactos</strong>
                            </NavLink>
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    </>
  )
}
