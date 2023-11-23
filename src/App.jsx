import { useState, useEffect } from 'react'

import EightBall from 'components/EightBall'
import Modal from 'components/Modal'

import { searchBusinesses } from 'services/api'

function App() {
  const [results, setResults] = useState([])
  const [isGeolocationEnabled, setIsGeolocationEnabled] = useState(false)
  const [location, setLocation] = useState('')
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [radius, setRadius] = useState(0)
  const [price, setPrice] = useState(2)
  const [rating, setRating] = useState(4)
  const [term, setTerm] = useState('')

  const search = async () => {
    try {
      const businesses = await searchBusinesses(
        location,
        latitude,
        longitude,
        radius,
        price,
        rating,
        term
      )
      console.log('businesses', businesses)
      setResults(businesses)
    } catch (error) {
      console.log('error', error)
    }
  }

  const disableGeolocation = () => {
    setIsGeolocationEnabled(false)
    setLatitude(0)
    setLongitude(0)
  }

  // useEffect on initial load
  useEffect(() => {
    // Enable or disable geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setIsGeolocationEnabled(true)
          setLatitude(position.coords.latitude)
          setLongitude(position.coords.longitude)
          setRadius(24000)
        },
        () => {
          setIsGeolocationEnabled(false)
          setLatitude(0)
          setLongitude(0)
          setRadius(0)
        }
      )
    }
  }, [])

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
      <Modal
        search={search}
        isGeolocationEnabled={isGeolocationEnabled}
        disableGeolocation={disableGeolocation}
        setLocation={setLocation}
        setRadius={setRadius}
        setPrice={setPrice}
        setRating={setRating}
        setTerm={setTerm}
      />
    </div>
  )
}

export default App
