import BillForm from "./components/BillForm"
import DemoBillboard from "./components/DemoHistory"
import Hero from "./components/Hero"
import HeroEmailComponent from "./components/HeroEmailComponents"
import HeroEnd from "./components/HeroEnd"
import History from "./components/History"
import Layout from "./components/Layout"
import Stats from "./components/Stats"
import { useAuth } from "./context/AuthContext"


function App() {
  const {globalUser, globalData, isLoading} = useAuth()
  const isAuthenticated = globalUser
  const isData = globalData && !!Object.keys(globalData || {}).length

  const authenticatedContent = (
    <>
      <History/>
      <Stats />
    </>
  )

  return (
    <Layout>
      <Hero />
      {isAuthenticated && (<BillForm isAuthenticated={isAuthenticated} />)}
      {(isAuthenticated && isLoading) && (
        <p>Loading data...</p>
      )}
      {(isAuthenticated && isData) && (authenticatedContent)}
      {!isAuthenticated && (<DemoBillboard />)}
      {!isAuthenticated && (<HeroEnd />)}
      {!isAuthenticated && (<HeroEmailComponent />)}
    </Layout>
  )
}

export default App
