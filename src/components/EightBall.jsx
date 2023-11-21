import 'animate.css'

function EightBall() {
  return (
    <>
      <div
        className='animate__animated animate__bounceInDown bg-black h-64 w-64 sm:h-80 sm:w-80 rounded-full flex items-center justify-center shadow-2xl cursor-pointer'
        onClick={() => document.getElementById('mdb__modal').showModal()}
      >
        <div className='bg-white h-32 w-32 rounded-full text-6xl text-black flex items-center justify-center'>
          8
        </div>
      </div>
    </>
  )
}

export default EightBall
