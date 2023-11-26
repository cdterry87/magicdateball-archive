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
            <span className='loading loading-spinner loading-2xl'></span>
          </div>
        )}
        {!isSearching && (
          <div className='bg-white h-32 w-32 rounded-full text-6xl text-black flex items-center justify-center'>
            8
          </div>
        )}
      </div>
      <div className='text-xl md:text-3xl text-center'>
        {isSearching && <h3>Searching for restaurants in your area...</h3>}
        {!isSearching && <h3>Click the 8-ball to begin!</h3>}
      </div>
    </>
  )
}

export default EightBall
