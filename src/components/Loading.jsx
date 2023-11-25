function Loading() {
  return (
    <>
      <div className='flex flex-col items-center justify-center gap-2 text-2xl'>
        <p>Searching for restaurants in your area...</p>
        <span className='loading loading-spinner loading-2xl'></span>
      </div>
    </>
  )
}

export default Loading
