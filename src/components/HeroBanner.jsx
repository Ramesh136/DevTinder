import React from 'react'

const HeroBanner = () => {
  return (
    <div>
      <picture>
        <source srcSet="/hero_3.jpg" media="(max-width: 767px)" />
        <img src="/hero_8.jpg" alt="" className="mx-auto pb-10 w-[100%] h-auto" />
      </picture>
    </div>
  )
}

export default HeroBanner