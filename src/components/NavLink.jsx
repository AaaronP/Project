import { NavLink as NavLinkReactRouter } from 'react-router-dom'

export const NavLink = ({ to, children, props }) => {
  return (
        <NavLinkReactRouter {...props } to={to} style={({ isActive }) => {
          return {
            color: isActive ? '#f5f5f5' : '',
            background: isActive ? '#343434' : ''
          }
        }}>
            {children}
        </NavLinkReactRouter>
  )
}
