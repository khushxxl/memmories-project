import Cards from './Cards'
import InputSection from './InputSection'

const Hero = () => {
  return (
    <div className="grid grid-cols-1 place-items-start items-start lg:grid-cols-3">
      <div className="col-span-1 items-start justify-start mt-10">
        <InputSection />
      </div>
      <div className="col-span-2">
        <Cards />
      </div>
    </div>
  )
}

export default Hero
