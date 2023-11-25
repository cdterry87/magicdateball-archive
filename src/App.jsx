import { useState, useEffect } from 'react'

import EightBall from 'components/EightBall'
import Modal from 'components/Modal'
import Loading from 'components/Loading'
import ResultCard from 'components/ResultCard'
import EmptyResult from 'components/EmptyResult'

import { searchBusinesses } from 'services/api'

function App() {
  const [results, setResults] = useState([])
  const [result, setResult] = useState('')
  const [isGeolocationEnabled, setIsGeolocationEnabled] = useState(false)
  const [location, setLocation] = useState('')
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [radius, setRadius] = useState(0)
  const [price, setPrice] = useState(2)
  const [rating, setRating] = useState(3)
  const [term, setTerm] = useState('')
  const [isSearching, setisSearching] = useState(false)
  const [isSearchComplete, setIsSearchComplete] = useState(false)
  const [isEmptyResult, setIsEmptyResult] = useState(false)
  const [isTryingAgain, setIsTryingAgain] = useState(false)
  const [isTriedAgain, setIsTriedAgain] = useState(false)

  const search = async () => {
    // Close the modal
    document.getElementById('mdb__modal').close()

    // Reset the state
    setisSearching(true)
    setIsSearchComplete(false)
    setIsEmptyResult(false)

    // Set search values to localStorage
    localStorage.setItem('mdbLocation', location)
    localStorage.setItem('mdbRadius', radius)
    localStorage.setItem('mdbRating', rating)
    localStorage.setItem('mdbPrice', price)

    // Try the search
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

      // Filter the results by rating, if rating is specified
      let yelpResults = businesses
      if (rating && parseFloat(rating) > 0) {
        yelpResults = businesses.filter(yelpResult => {
          return yelpResult.rating >= rating
        })
      }

      // Save the results to localStorage and state
      localStorage.setItem('yelpResults', JSON.stringify(yelpResults))
      setResults(yelpResults)

      // If there are no results, show the empty result component
      if (yelpResults.length === 0) {
        setIsEmptyResult(true)
      } else {
        chooseRandom()
      }

      // Wait a second before showing the results
      setTimeout(function () {
        setisSearching(false)
        setIsSearchComplete(true)
      }, 1000)
    } catch (error) {
      console.log('error', error)
    }
  }

  // Choose a random result from the results array and save it to localStorage and state
  const chooseRandom = () => {
    localStorage.removeItem('mdbResult')

    let yelpResults = localStorage.getItem('yelpResults')
    yelpResults = JSON.parse(yelpResults)

    const mdbResult =
      yelpResults[Math.floor(Math.random() * yelpResults.length)]

    setResult(mdbResult)
    localStorage.setItem('mdbResult', JSON.stringify(mdbResult))
  }

  const tryAgain = () => {
    setIsTryingAgain(true)
    setIsTriedAgain(false)

    setTimeout(function () {
      chooseRandom()
      setIsTryingAgain(false)
      setIsTriedAgain(true)
    }, 1000)
  }

  const startOver = () => {
    setResult('')
    setResults([])
    setisSearching(false)
    setIsSearchComplete(false)
    setIsEmptyResult(false)
    setIsTryingAgain(false)
    setIsTriedAgain(false)
    localStorage.removeItem('yelpResults')
    localStorage.removeItem('mdbResult')
  }

  const disableGeolocation = () => {
    setIsGeolocationEnabled(false)
    setLatitude(0)
    setLongitude(0)
    localStorage.removeItem('mdbLatitude')
    localStorage.removeItem('mdbLongitude')
  }

  // useEffect on initial load
  useEffect(() => {
    // Get yelpResults from localStorage if they exist
    const yelpResults = localStorage.getItem('yelpResults') ?? null
    if (yelpResults) {
      setResults(JSON.parse(yelpResults))
      setIsSearchComplete(true)
    }

    // Get mdbResult from localStorage if it exists
    const mdbResult = localStorage.getItem('mdbResult') ?? null
    if (mdbResult) {
      setResult(JSON.parse(mdbResult))
    }

    // Set form values from localStorage if they exist
    const mdbLocation = localStorage.getItem('mdbLocation') ?? null
    const mdbRadius = localStorage.getItem('mdbRadius') ?? null
    const mdbLatitude = localStorage.getItem('mdbLatitude') ?? null
    const mdbLongitude = localStorage.getItem('mdbLongitude') ?? null
    const mdbRating = localStorage.getItem('mdbRating') ?? null
    const mdbPrice = localStorage.getItem('mdbPrice') ?? null

    if (mdbLocation) {
      setLocation(mdbLocation)
    }
    if (mdbRadius) {
      setRadius(mdbRadius)
    }
    if (mdbLatitude) {
      setLatitude(mdbLatitude)
    }
    if (mdbLongitude) {
      setLongitude(mdbLongitude)
    }
    if (mdbRadius) {
      setRadius(mdbRadius)
    }
    if (mdbRating) {
      setRating(mdbRating)
    }
    if (mdbPrice) {
      setPrice(mdbPrice)
    }

    // Enable or disable geolocation
    if (!mdbLatitude && !mdbLongitude) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            localStorage.setItem('mdbLatitude', position.coords.latitude)
            localStorage.setItem('mdbLongitude', position.coords.longitude)

            setIsGeolocationEnabled(true)
            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)
            setRadius(24000)
          },
          () => {
            localStorage.removeItem('mdbLatitude')
            localStorage.removeItem('mdbLongitude')

            setIsGeolocationEnabled(false)
            setLatitude(0)
            setLongitude(0)
            setRadius(0)
          }
        )
      }
    } else {
      setIsGeolocationEnabled(true)
    }
  }, [])

  return (
    <div id='app' className='min-h-screen flex items-center justify-center'>
      <div className='flex flex-col gap-6 items-center justify-center'>
        <div className='flex flex-col gap-2'>
          <h1 className='text-3xl sm:text-5xl text-center font-bold'>
            Magic Date Ball
          </h1>
          <h2 className='text-lg sm:text-xl text-center font-semibold'>
            Where do you want to eat? Just ask the Magic Date Ball!
          </h2>
        </div>
        {isSearching && !isSearchComplete && <Loading />}
        {!isSearching && !isSearchComplete && <EightBall />}
        {!isSearching && isSearchComplete && !isEmptyResult && (
          <ResultCard
            result={result}
            tryAgain={tryAgain}
            startOver={startOver}
            isSearchComplete={isSearchComplete}
            isTryingAgain={isTryingAgain}
            isTriedAgain={isTriedAgain}
          />
        )}
        {!isSearching && isSearchComplete && isEmptyResult && (
          <EmptyResult startOver={startOver} />
        )}
        <div className='flex flex-col gap-1 text-center'>
          <div className='flex items-center gap-2'>
            <span>&copy; 2023. Created by Chase Terry.</span>
            <span>|</span>
            <a
              href='https://chaseterry.com'
              className='font-bold underline'
              target='_blank'
              rel='noreferrer'
              aria-label='Visit my website!'
              title='Visit my website!'
            >
              https://chaseterry.com
            </a>
          </div>
        </div>
      </div>
      <Modal
        search={search}
        isGeolocationEnabled={isGeolocationEnabled}
        disableGeolocation={disableGeolocation}
        setLocation={setLocation}
        location={location}
        setRadius={setRadius}
        radius={radius}
        setPrice={setPrice}
        price={price}
        setRating={setRating}
        rating={rating}
        setTerm={setTerm}
        term={term}
      />
    </div>
  )
}

export default App
