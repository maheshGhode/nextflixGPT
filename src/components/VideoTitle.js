import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
    <div className='mt-36 p-4 m-4'>
        <h1 className='text-2xl font-bold'>{title}</h1>
        <p className='w-1/4 py-6 text-lg'>{overview}</p>
        <div className='my-4'>
           <button className='bg-gray-500 text-white px-6 py-4 text-xl rounded-lg opacity-80' >
            ▶️ Play
           </button>
            <button className='bg-gray-500 text-white px-6 py-4 text-xl rounded-lg opacity-80 mx-4' >
            ℹ️ More Info
           </button>
        </div>
    </div>
  )
}

export default VideoTitle
