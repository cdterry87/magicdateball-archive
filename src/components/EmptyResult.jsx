function EmptyResult({ startOver }) {
  return (
    <>
      <div className='card w-96 bg-base-100 shadow-xl text-gray-800 animate__animated animate__zoomIn'>
        <div className='card-body'>
          <p className='text-4xl'>Sorry! No results were found!</p>
          <p className='text-lg'>
            Please adjust your preferences and try searching again.
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

export default EmptyResult
