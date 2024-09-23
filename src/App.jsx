import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import FruiteriaListDisplay from './assets/FruiteriaListDisplay'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <FruiteriaListDisplay />
        </div>
        
    </>
  )
}

export default App
