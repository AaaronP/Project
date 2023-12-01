import { Suspense } from 'react'
import { useAppSelector } from '../hooks/store'
import { ProtectedRoutePage } from '../pages/ProtectedRoutePage'
import RoleProtectedPage from '../pages/RoleProtectedPage'
import { ROLES } from '../contants'

export const ProtectedRoute = ({ children, hasViewerAccess = false }) => {
  const user = useAppSelector(state => state.user.user)
  const isLoading = useAppSelector(state => state.user.isUserLoading)
  const userLength = JSON.stringify(user)

  if (userLength === '{}') {
    return (
      <>
        { !isLoading
          ? <ProtectedRoutePage/>
          : null
        }
      </>
    )
  }
  // si la ruta no tiene acceso a usuarios visualizadores
  // le mostramos otra página en su lugar
  if (!hasViewerAccess && (user.role === ROLES.visualizador || !user.role)) {
    return (
      <RoleProtectedPage/>
    )
  }

  if (hasViewerAccess || user.role !== ROLES.visualizador) {
    return (
     <Suspense>
      {children}
     </Suspense>
    )
  }
}
