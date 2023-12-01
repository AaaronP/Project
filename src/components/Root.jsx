import { Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { ProtectedRoute } from './ProtectedRoute'

// cargamos todas las paginas con lazi
// para que las cargue cuando sea necesario

const LoginPage = lazy(() => import('../pages/LoginPage'))
const HomePage = lazy(() => import('../pages/HomePage'))
const DashboardPage = lazy(() => import('../pages/DashboardPage'))
const ContactPage = lazy(() => import('../pages/ContactPage'))
const PreferencePage = lazy(() => import('../pages/PreferencePage'))
const Page404 = lazy(() => import('../pages/Page404'))
const AlertsPage = lazy(() => import('../pages/AlertsPage'))

const InsertUserPage = lazy(() => import('../pages/users/InsertUserPage'))
const UpdateUserPage = lazy(() => import('../pages/users/UpdateUserPage'))
const DeleteUserPage = lazy(() => import('../pages/users/DeleteUserPage'))
const UsersPage = lazy(() => import('../pages/users/UsersPage'))

const DevicesPage = lazy(() => import('../pages/devices/DevicesPage'))
const InsertDevicePage = lazy(() => import('../pages/devices/InsertDevicePage'))
const UpdateDevicePage = lazy(() => import('../pages/devices/UpdateDevicePage'))
const DeleteDevicePage = lazy(() => import('../pages/devices/DeleteDevicePage'))

// el usuario visualizador solo podra entrar a las pagina que tengan 'hasViewerAccess'

export function Root () {
  return (
        <Routes>
            <Route path='/' element={
                <ProtectedRoute hasViewerAccess>
                    <HomePage/>
                </ProtectedRoute>
            }/>
            <Route path='/login' element={
                <Suspense>
                    <LoginPage/>
                </Suspense>
            }/>
            <Route path='/estadistica' element={
                <ProtectedRoute>
                    <DashboardPage/>
                </ProtectedRoute>
            }/>
            <Route path='/contactos' element={
                <ProtectedRoute hasViewerAccess>
                    <ContactPage/>
                </ProtectedRoute>
            }/>
            <Route path='/preferencias' element={
                <ProtectedRoute>
                    <PreferencePage/>
                </ProtectedRoute>
            }/>
            <Route path='/alertas' element={
                <ProtectedRoute hasViewerAccess>
                    <AlertsPage/>
                </ProtectedRoute>
            }/>

            {/* Users pages */}
            <Route path='/users' element={
                <ProtectedRoute>
                    <UsersPage/>
                </ProtectedRoute>
            }>
                <Route path='insertUser' element={
                   <ProtectedRoute>
                        <InsertUserPage/>
                    </ProtectedRoute>
                }/>
                <Route path='updateUser' element={
                   <ProtectedRoute>
                        <UpdateUserPage/>
                    </ProtectedRoute>
                }/>
                <Route path='deleteUser' element={
                    <ProtectedRoute>
                        <DeleteUserPage/>
                    </ProtectedRoute>
                }/>
            </Route>

            {/* Devices pages */}
            <Route path='/devices' element={
               <ProtectedRoute>
                    <DevicesPage/>
                </ProtectedRoute>
            }>
                <Route path='insertDevice' element={
                    <ProtectedRoute>
                        <InsertDevicePage/>
                    </ProtectedRoute>
                }/>
                <Route path='updateDevice' element={
                    <ProtectedRoute>
                        <UpdateDevicePage/>
                    </ProtectedRoute>
                }/>
                <Route path='deleteDevice' element={
                    <ProtectedRoute>
                        <DeleteDevicePage/>
                    </ProtectedRoute>
                }/>
            </Route>

            {/* 404 path */}
            <Route path='*' element={<Page404/>}/>
        </Routes>
  )
}
