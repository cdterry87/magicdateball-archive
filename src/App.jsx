import axios from 'axios'
import EightBall from 'components/EightBall'
import Modal from 'components/Modal'

import { YELP_API_URL, YELP_API_KEY } from 'config/app'

function App() {
  const search = () => {
    axios
      .get(YELP_API_URL, {
        params: {
          location: 'memphis',
          term: 'sushi',
          sort_by: 'rating',
          limit: 5
          // open_now: true,
          // price: '',
          // radius: '',
        },
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + YELP_API_KEY
        }
      })
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err))
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
      <Modal search={search} />
    </div>
  )
}

export default App
