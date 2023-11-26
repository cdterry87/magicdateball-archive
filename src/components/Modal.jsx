function Modal({
  search,
  isGeolocationEnabled,
  disableGeolocation,
  promptGeolocation,
  setLocation,
  location,
  setRadius,
  radius,
  setPrice,
  price,
  setRating,
  rating,
  setTerm,
  term
}) {
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
          <div className='flex flex-col gap-5'>
            {isGeolocationEnabled && (
              <div
                role='alert'
                className='alert bg-pink-600 text-white text-xl'
              >
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
                <div>
                  <p>We are using your location to find nearby results.</p>
                  <button
                    className='underline'
                    onClick={() => disableGeolocation()}
                  >
                    Click here to manually set your location.
                  </button>
                </div>
              </div>
            )}
            {isGeolocationEnabled && (
              <div>
                <h4 className='font-semibold text-xl'>
                  Search Radius (in miles)
                </h4>
                <input
                  type='range'
                  min='8000'
                  max='40000'
                  className='range range-xs'
                  step='8000'
                  value={radius}
                  onChange={e => setRadius(e.target.value)}
                />
                <div className='w-full flex justify-between px-2 text-sm'>
                  <span>5</span>
                  <span>10</span>
                  <span>15</span>
                  <span>20</span>
                  <span>25</span>
                </div>
              </div>
            )}
            {!isGeolocationEnabled && (
              <div
                role='alert'
                className='alert bg-pink-600 text-white text-xl'
              >
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
                <div>
                  <p>We are not using your location to find nearby results.</p>
                  <button
                    className='underline'
                    onClick={() => promptGeolocation()}
                  >
                    Click here to allow us to use your location.
                  </button>
                </div>
              </div>
            )}
            {!isGeolocationEnabled && (
              <div>
                <h4 className='font-semibold text-xl'>Search Location</h4>
                <input
                  type='text'
                  className='input input-bordered w-full text-base focus:outline-none'
                  placeholder='Location (i.e. City, State, etc.)'
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  required
                />
              </div>
            )}
            <hr />
            <div>
              <h4 className='font-semibold text-xl'>Price Selection</h4>
              <select
                className='select select-bordered w-full focus:outline-none text-base'
                value={price}
                onChange={e => setPrice(e.target.value)}
              >
                <option value='1,2,3,4'>Anything Goes ($ - $$$$)</option>
                <option value='1'>Fast and Cheap ($)</option>
                <option value='1,2'>Casual ($ - $$)</option>
                <option value='2,3'>Date Night ($$ - $$$)</option>
                <option value='4'>Special Occasions ($$$$)</option>
              </select>
            </div>
            <hr />
            <div>
              <h4 className='font-semibold text-xl'>Minimum Rating</h4>
              <input
                type='range'
                min='1'
                max='4.5'
                className='range range-xs'
                step='.5'
                value={rating}
                onChange={e => setRating(e.target.value)}
              />
              <div className='w-full flex justify-between text-sm px-2'>
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
                className='input input-bordered w-full focus:outline-none text-base'
                placeholder='Sushi, Tacos, etc.'
                value={term}
                onChange={e => setTerm(e.target.value)}
              />
            </div>
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
