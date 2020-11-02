import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Navbar from '../components/Navbar'
import Books from '../components/Books'
import Sidebar from '../components/Sidebar'
import { fetchBookList } from '../redux/actions/bookActions'
import '../style/Home.css'

const Home = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchBookList())
  }, [dispatch])

  return (
    <div className="Home-MainContainer">
      <Navbar />
      <Sidebar />
      <Books />
    </div>
  )
}

export default Home