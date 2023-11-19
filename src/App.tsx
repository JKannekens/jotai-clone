import { useState } from 'react'
import './App.css'

function App() {
  const [age, setAge] = useState(0)

  return (
    <>
      <h1>Jotai Clone</h1>
      <div className="card">
        <h2>My age: {age}</h2>
        <input className="age_input" value={age} onChange={(e) => setAge(+e.target.value)} />
      </div>
    </>
  )
}

export default App
