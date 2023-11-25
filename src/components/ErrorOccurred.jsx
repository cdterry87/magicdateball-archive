function ErrorOccurred({ startOver }) {
  return (
    <>
      <div className='card w-96 bg-base-100 shadow-xl text-gray-800 animate__animated animate__zoomIn text-center'>
        <div className='card-body'>
          <p className='text-4xl'>Sorry! An error occurred!</p>
          <p className='text-lg'>
            Please make sure you specified a location or allow us to use your
            location and try searching again.
          </p>
          <div className='flex items-center justify-center w-full gap-4'>
            <button
              className='btn bg-gradient-to-r from-fuchsia-700 to-red-600 text-white text-xl'
              onClick={startOver}
            >
              Start Over
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ErrorOccurred
