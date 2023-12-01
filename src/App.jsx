import { Root } from './components/Root'
import Navigator from './components/Navigator'
import { Toaster } from 'sonner'
import { useAppDispatch } from './hooks/store'
import { useEffect } from 'react'
import useAuth from './hooks/useAuth'

function App () {
  const dispatch = useAppDispatch()
  const { initDbUser } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      dispatch(initDbUser())
    }

    fetchData()
  }, [dispatch])

  return (
    <nav>
      <Navigator/>
      <div className='p-5 pt-[5rem] overflow-x-hidden h-screen'>
        <Root/>
      </div>
      <Toaster position="bottom-right" richColors expand={true}/>
    </nav>
  )
}

export default App
