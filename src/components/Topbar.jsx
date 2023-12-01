import './styles/Topbar.css'
import { useAppSelector } from '../hooks/store'
import DialogUserProfile from './DialogUserProfile'
import { Link } from 'react-router-dom'
import { Button } from '@tremor/react'

export default function Topbar () {
  const user = useAppSelector(state => state.user.user)
  const isLoading = useAppSelector(state => state.user.isUserLoading)

  const IsUserLogged = () => {
    return (
      <>
        {
          user.email
            ? <DialogUserProfile>
             <img src={user.profileImg} alt="User profile"/>
            </DialogUserProfile>
            : <Link to='/login'>
                  <Button type='button'>Login</Button>
              </Link>

        }
      </>
    )
  }

  return (
        <div className='topbar'>
              {
                (!isLoading)
                  ? <IsUserLogged/>
                  : null
              }
        </div>
  )
}
