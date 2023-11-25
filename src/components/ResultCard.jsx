import Yelp from 'assets/images/yelp/logo.png'
import Rating0 from 'assets/images/yelp/ratings/0.png'
import Rating1 from 'assets/images/yelp/ratings/1.png'
import Rating1_5 from 'assets/images/yelp/ratings/1.5.png'
import Rating2 from 'assets/images/yelp/ratings/2.png'
import Rating2_5 from 'assets/images/yelp/ratings/2.5.png'
import Rating3 from 'assets/images/yelp/ratings/3.png'
import Rating3_5 from 'assets/images/yelp/ratings/3.5.png'
import Rating4 from 'assets/images/yelp/ratings/4.png'
import Rating4_5 from 'assets/images/yelp/ratings/4.5.png'
import Rating5 from 'assets/images/yelp/ratings/5.png'

function ResultCard({
  result,
  tryAgain,
  startOver,
  isSearchComplete,
  isTryingAgain,
  isTriedAgain
}) {
  const {
    image_url,
    name,
    location,
    rating,
    review_count,
    price,
    categories,
    url
  } = result

  const { display_address = [] } = location || {}

  let cardAnimationClass
  if (isSearchComplete && !isTryingAgain) {
    cardAnimationClass = 'animate__zoomIn'
  }
  if (isTryingAgain) {
    cardAnimationClass = 'animate__flipOutY'
  }
  if (isTriedAgain) {
    cardAnimationClass = 'animate__flipInY'
  }

  return (
    <>
      <div className='flex flex-col gap-4'>
        <div
          className={`animate__animated card card-compact w-96 bg-base-100 shadow-xl text-gray-800 ${cardAnimationClass}`}
        >
          <figure>
            <img
              alt='Yelp Business'
              className='h-64 w-full object-cover'
              src={image_url}
            />
          </figure>
          <div className='card-body'>
            <h2 className='text-3xl font-bold'>{name}</h2>
            {display_address.length > 0 && (
              <div className='text-xl'>
                {display_address.map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </div>
            )}
            {rating && rating > 0 && rating <= 5 && (
              <div className='flex items-center gap-2 w-full'>
                <img
                  alt='Yelp Rating'
                  src={
                    rating === 0
                      ? Rating0
                      : rating === 1
                      ? Rating1
                      : rating === 1.5
                      ? Rating1_5
                      : rating === 2
                      ? Rating2
                      : rating === 2.5
                      ? Rating2_5
                      : rating === 3
                      ? Rating3
                      : rating === 3.5
                      ? Rating3_5
                      : rating === 4
                      ? Rating4
                      : rating === 4.5
                      ? Rating4_5
                      : rating === 5
                      ? Rating5
                      : null
                  }
                />
                <span className='text-lg'>({review_count} Reviews)</span>
              </div>
            )}
            <div className='flex items-center flex-wrap gap-1'>
              {price && (
                <div className='badge badge-lg badge-primary'>{price}</div>
              )}
              {categories &&
                categories.length > 0 &&
                categories.map((category, index) => (
                  <div key={index} className='badge badge-lg badge-secondary'>
                    {category.title}
                  </div>
                ))}
            </div>
            {url && (
              <div className='flex items-end justify-end w-full'>
                <a
                  href={url}
                  target='_blank'
                  rel='noreferrer'
                  title='View on Yelp!'
                  aria-label='View on Yelp!'
                >
                  <div className='flex items-end gap-2 text-lg'>
                    <span>View on</span>
                    <img alt='Yelp Logo' className='h-10' src={Yelp} />
                  </div>
                </a>
              </div>
            )}
          </div>
        </div>
        <div className='flex items-center justify-center w-full gap-4'>
          <button
            className='text-white text-2xl hover:text-gray-300 transition duration-300 ease-in-out px-4 py-2'
            onClick={tryAgain}
          >
            Try Again?
          </button>
          <button
            className='text-white text-2xl hover:text-gray-300 transition duration-300 ease-in-out px-4 py-2'
            onClick={startOver}
          >
            Start Over
          </button>
        </div>
      </div>
    </>
  )
}

export default ResultCard
