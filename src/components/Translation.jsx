import React from 'react'
import { LANGUAGES } from '../utils/presets'

const Translation = ({ resultText, toLanguage, translating, setToLanguage, setTranslation, setTranslating, generateTranslation }) => {
  return (
    <div className='flex items-center gap-2  w-full max-w-2xl mx-auto'>
      {!translating && (<div className='flex flex-col gap-2 mx-auto'>
        <p className='text-slate-400 mr-auto'>To Language</p>
        <div className='flex gap-2 items-stretch w-full'>
          <select className='outline-none py-3.5 px-2 rounded bg-white border hover:border-blue-300 duration-200 w-full flex-1' value={toLanguage} onChange={(e) => setToLanguage(e.target.value)}>
            <option value={'select language'}>Select Language</option>
            {
              Object.entries(LANGUAGES).map(([key, value], i) => <option key={i} value={value}>{key}</option>)
            }
          </select>
          <button onClick={generateTranslation} className='specialBtn px-6 py-4 rounded hover:text-blue-500 duration-200 border '>Translate Now</button>
        </div>

      </div>)}

      {(resultText && (!translating)) && (<p>{resultText}</p>)}

      {translating && (<div className='grid place-items-center w-full'>
        <i className="fa-solid fa-spinner animate-spin text-2xl"></i>
      </div>)}
    </div>
  )
}

export default Translation