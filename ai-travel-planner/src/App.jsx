import { useState } from 'react'
import './App.css'
import { Button } from "./components/ui/button"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h2>AI Travel Planner</h2>
        <Button>Click me</Button>
      </div>


    </>
  )
}

export default App
