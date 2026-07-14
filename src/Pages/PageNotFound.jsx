import { useNavigate } from 'react-router-dom'
import BorderGlowButton from '../components/buttons/BorderGlowButton'

const PageNotFound = () => {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen flex flex-col gap-5 items-center justify-center">

      <h1 className="text-3xl font-bold text-center">
        The page you are looking for does not exist.
      </h1>

      <BorderGlowButton type='button' text='Back To Home' onClick={() => navigate('/')} />
    </div>
  )
}

export default PageNotFound