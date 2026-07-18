import { useNavigate } from 'react-router-dom'
import BorderGlowButton from '../components/buttons/BorderGlowButton'
import usePageSeo from '../hooks/usePageSeo'

const PageNotFound = () => {
  const navigate = useNavigate()
  usePageSeo({
    title: "Page Not Found | PartPixels",
    description: "The requested PartPixels page could not be found.",
    path: window.location.pathname,
    noIndex: true,
  })
  return (
    <main className="min-h-screen flex flex-col gap-5 items-center justify-center bg-black px-5 text-white">

      <h1 className="type-page-title text-center font-bold">
        The page you are looking for does not exist.
      </h1>

      <BorderGlowButton type='button' text='Back To Home' onClick={() => navigate('/')} />
    </main>
  )
}

export default PageNotFound
