import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useNavigate()

  return (
    <div>
      <button
        onClick={() => {
            navigate("/Login");
        }}
      >login</button>
    </div>
  )
}

export default Home
