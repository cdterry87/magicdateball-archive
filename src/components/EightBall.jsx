import 'animate.css'

function EightBall({ isSearching, isSearchComplete }) {
  let eightBallAnimationClass = 'animate__bounceInDown'
  if (isSearching) {
    eightBallAnimationClass = 'animate__shake'
  } else if (isSearchComplete) {
    eightBallAnimationClass = 'animate__fadeOut'
  }

  return (
    <>
      <div
        className={`animate__animated bg-black h-64 w-64 sm:h-80 sm:w-80 rounded-full flex items-center justify-center shadow-2xl cursor-pointer ${eightBallAnimationClass}`}
        onClick={() => document.getElementById('mdb__modal').showModal()}
      >
        <div className='bg-white h-32 w-32 rounded-full text-6xl text-black flex items-center justify-center'>
          8
        </div>
      </div>
      <h3 className='text-lg sm:text-2xl text-center'>
        Click the 8-ball to begin!
      </h3>
    </>
  )
}

export default EightBall
