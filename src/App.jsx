import React, { useState } from 'react'

import EightBall from 'components/EightBall'
import Modal from 'components/Modal'

import { searchBusinesses } from 'services/api'

function App() {
  const [results, setResults] = useState([])
  // const [location, setLocation] = useState('')
  // const [price, setPrice] = useState(2)
  // const [radius, setRadius] = useState(2)
  // const [rating, setRating] = useState(4)
  // const [term, setTerm] = useState('')

  const handleSearch = async () => {
    // const minRatingValues = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]
    // const radiusValues = [8000, 16000, 24000, 32000, 40000]
    // const radiusLabels = [5, 10, 15, 20, 25]
    // const priceValues = [1, 2, 3, 4]
    // const priceLabels = ['$', '$$', '$$$', '$$$$']

    const location = 'memphis'
    const price = '2'
    const radius = '16000'
    const rating = '4'
    const term = null

    try {
      const businesses = await searchBusinesses(
        location,
        price,
        radius,
        rating,
        term
      )
      console.log('businesses', businesses)
      setResults(businesses)
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <div id='app' className='min-h-screen flex items-center justify-center'>
      <div className='flex flex-col gap-8 items-center justify-center'>
        <div className='flex flex-col gap-2'>
          <h1 className='text-4xl sm:text-6xl text-center font-bold'>
            Magic Date Ball
          </h1>
          <h2 className='text-lg sm:text-2xl text-center font-semibold'>
            Where do you want to eat? Ask the Magic Date Ball!
          </h2>
        </div>
        <EightBall />
        <h3 className='text-lg sm:text-2xl text-center'>
          Click the 8-ball to begin!
        </h3>
      </div>
      <Modal search={handleSearch} />
    </div>
  )
}

export default App
