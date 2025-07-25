import React from 'react'
import TvHero from '../components/TvHero'
import CardList2 from '../components/CardList2'
import Footer from '../components/Footer'

const TvSeries = () => {
  return (
    <div className='p-5'>
        <TvHero/>
    {/* <CardList2 title="Airing Today" category="airing_today"/> */}
        <CardList2 title="On the Air" category="on_the_air"/>
        <CardList2 title="Top Rated" category="top_rated"/>
        <CardList2 title="Popular" category="popular"/>
        
        <Footer/>
    </div>
  )
}

export default TvSeries