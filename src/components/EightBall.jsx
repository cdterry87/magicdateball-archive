import Searching from './Searching'

function EightBall({ isSearching, isSearchComplete }) {
  let eightBallAnimationClass
  if (isSearching) {
    eightBallAnimationClass = 'animate__shakeX'
  } else if (isSearchComplete) {
    eightBallAnimationClass = 'animate__fadeOut'
  } else {
    eightBallAnimationClass = 'animate__bounceInDown'
  }

  return (
    <>
      <div
        className={`animate__animated bg-black h-64 w-64 sm:h-80 sm:w-80 rounded-full flex items-center justify-center shadow-2xl cursor-pointer ${eightBallAnimationClass}`}
        onClick={() => document.getElementById('mdb__modal').showModal()}
      >
        {isSearching && (
          <div className='bg-blue-900 h-32 w-32 rounded-full text-6xl text-white flex items-center justify-center'>
            ?
          </div>
        )}
        {!isSearching && (
          <div className='bg-white h-32 w-32 rounded-full text-6xl text-black flex items-center justify-center'>
            8
          </div>
        )}
      </div>
      {isSearching && <Searching />}
      {!isSearching && (
        <h3 className='text-xl sm:text-3xl text-center'>
          Click the 8-ball to begin!
        </h3>
      )}
    </>
  )
}

export default EightBall
