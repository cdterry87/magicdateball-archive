function Modal({
  search,
  isGeolocationEnabled,
  disableGeolocation,
  setLocation,
  setRadius,
  setPrice,
  setRating,
  setTerm
}) {
  const radiusValues = [8000, 16000, 24000, 32000, 40000]
  const priceValues = [1, 2, 3, 4]
  const ratingValues = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5]

  return (
    <>
      <dialog id='mdb__modal' className='modal text-gray-900'>
        <div className='modal-box text-xl'>
          <form method='dialog'>
            <button className='btn btn-sm btn-circle outline-none absolute right-6 top-6'>
              ✕
            </button>
          </form>
          <h3 className='font-bold text-4xl'>Preferences</h3>
          <div className='flex flex-col gap-4'>
            {isGeolocationEnabled && (
              <div role='alert' className='alert bg-pink-600 text-white'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  className='shrink-0 w-6 h-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                  ></path>
                </svg>
                <span>
                  We are using your location to find nearby results.
                  <button
                    className='underline'
                    onClick={() => disableGeolocation()}
                  >
                    Click here to manually set your location.
                  </button>
                </span>
              </div>
            )}
            {isGeolocationEnabled && (
              <div>
                <h4 className='font-semibold text-xl'>Radius (miles)</h4>
                <input
                  type='range'
                  min='0'
                  max='4'
                  className='range'
                  step='1'
                  onChange={e => setRadius(radiusValues[e.target.value])}
                  required
                />
                <div className='w-full flex justify-between text-xs px-2'>
                  <span>5</span>
                  <span>10</span>
                  <span>15</span>
                  <span>20</span>
                  <span>25</span>
                </div>
              </div>
            )}
            {!isGeolocationEnabled && (
              <div>
                <h4 className='font-semibold text-xl'>Location</h4>
                <input
                  type='text'
                  className='input input-bordered w-full '
                  placeholder='City, State'
                  onChange={e => setLocation(e.target.value)}
                />
              </div>
            )}
            <hr />
            <div>
              <h4 className='font-semibold text-xl'>Price</h4>
              <input
                type='range'
                min='0'
                max='3'
                className='range'
                step='1'
                onChange={e => setPrice(priceValues[e.target.value])}
              />
              <div className='w-full flex justify-between text-xs px-2'>
                <span>$</span>
                <span>$$</span>
                <span>$$$</span>
                <span>$$$$</span>
              </div>
            </div>
            <hr />
            <div>
              <h4 className='font-semibold text-xl'>Minimum Rating</h4>
              <input
                type='range'
                min='0'
                max='7'
                className='range'
                step='1'
                onChange={e => setRating(ratingValues[e.target.value])}
              />
              <div className='w-full flex justify-between text-xs px-2'>
                <span>1</span>
                <span>1.5</span>
                <span>2</span>
                <span>2.5</span>
                <span>3</span>
                <span>3.5</span>
                <span>4</span>
                <span>4.5</span>
              </div>
            </div>
            <hr />
            <div>
              <h4 className='font-semibold text-xl'>Search Term (Optional)</h4>
              <input
                type='text'
                className='input input-bordered w-full '
                placeholder='Sushi, Tacos, etc.'
                onChange={e => setTerm(e.target.value)}
              />
            </div>
            <hr />
            <div className='flex items-center justify-center'>
              <button
                className='btn bg-gradient-to-r from-fuchsia-700 to-red-600 text-white text-xl'
                onClick={search}
              >
                Ready, Set, Date!
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default Modal
