import React from 'react'
import Hero from '../components/Hero'
import CardList from '../components/CardList'
import Footer from '../components/Footer'
import CardList2 from '../components/CardList2'

const Homepage = () => {
  return (
    <div className='p-5'>
        <Hero/>
        <CardList title="Newly Released Movies" category="upcoming"/>
        <CardList title="Now Playing Movies" category="now_playing"/>
        <CardList2 title="On the Air Tv Shows" category="on_the_air"/>
        <CardList title="Top Rated Movies" category="top_rated"/>
        <CardList2 title="Top Rated Tv Shows" category="top_rated"/>
        <CardList title="Popular Movies" category="popular"/>
        <CardList2 title="Popular Tv Shows" category="popular"/>

                
        <Footer/>

    </div>
  )
}

export default Homepage