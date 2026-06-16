import { KuroshioSite } from './components/kuroshio/KuroshioSite'
import { TooltipProvider } from './components/ui/tooltip'

function App() {
  return (
    <TooltipProvider delayDuration={120}>
      <KuroshioSite />
    </TooltipProvider>
  )
}

export default App
