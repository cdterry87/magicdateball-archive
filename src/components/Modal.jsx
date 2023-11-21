function Modal({ search }) {
  return (
    <>
      <dialog id='mdb__modal' className='modal'>
        <div className='modal-box'>
          <form method='dialog'>
            <button className='btn btn-sm btn-circle btn-ghost absolute right-6 top-6'>
              ✕
            </button>
          </form>
          <h3 className='font-bold text-3xl'>Preferences</h3>
          <div className='flex flex-col gap-4'>
            <div>{/* Geolocation header */}</div>
            <h4 className='font-semibold text-xl'>Radius</h4>
            <h4 className='font-semibold text-xl'>Price</h4>
            <h4 className='font-semibold text-xl'>Minimum Rating</h4>
            <div>{/* Keyword field */}</div>
            <div className='flex items-center justify-center'>
              <button className='btn btn-secondary text-xl' onClick={search}>
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
