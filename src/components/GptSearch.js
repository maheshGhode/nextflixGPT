import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMoviesSuggestion from './GptMoviesSuggestion'
import { BG_URL } from '../utils/constant'

const GptSearch = () => {
  return (
    <>
    <div className='fixed -z-10'>
        <img src={BG_URL} alt="background"/>
    </div>
    <div>
      <GptSearchBar />
      <GptMoviesSuggestion />
    </div>
    </>
  )
}

export default GptSearch
