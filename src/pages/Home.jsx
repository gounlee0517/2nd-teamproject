import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Home/Header';
import Footer from '../components/Home/Footer';

function Home() {
    const navigate = useNavigate()

  return (
    <>
     <Header />



      <Footer />
    </>
  )
}

export default Home
