import { Content } from './components/Content'
import { Footer } from './components/Footer'
import { Header } from './components/Header'

function App() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center">
      <Header />
      <Content />
      <Footer />
    </div>
  )
}

export default App
