import Feature from "@/components/feature"
import Footer from "@/components/footer"
import Hero from "@/components/hero"
import Navbar from "@/components/navbar"
import Stats from "@/components/stats"

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="flex flex-col gap-16 pb-24 pt-28 md:gap-16 md:pt-36">
        <Hero />
        <Feature />
        <Stats />
      </main>
      <Footer />
    </div>
  )
}

export default App
