import React from 'react'

const Transcription = ({ resultText }) => {
  return (
    <div className='w-full max-w-lg rounded-lg shadow-sm p-5 '>
      <p>{ resultText }</p>
    </div>
  )
}

export default Transcription