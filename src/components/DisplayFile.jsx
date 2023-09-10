const DisplayFile = ({ handleAudioReset, setAudioStream, file, handleFormSubmission }) => {
    return (
        <main className="flex-1 flex flex-col items-center justify-center p-5 gap-4 sm:gap-5 lg:gap-6 pb-24 min-w-[80%]  mx-auto ">
            <h1 className='text-5xl sm:text-6xl lg:text-7xl font-semibold '>Your<span className='text-blue-500 '>File</span></h1>
            <div className="flex gap-2 flex-wrap my-4">
                <h2 className="font-semibold">Name:</h2>
                <p>{file ? file.name : "your_custom_audio(aiScribe).mp3"}</p>
            </div>
            <div className="flex items-center justify-between w-full mt-4">
                <button onClick={handleAudioReset} className="text-slate-500 font-semibold hover:opacity-75">Reset</button>
                <button onClick={handleFormSubmission} className="text-blue-500 specialBtn px-5 py-3.5 rounded-full flex items-center gap-3">Transcribe
                    <i className="fa-solid fa-pen"></i></button>
            </div>
        </main>
    )
}
export default DisplayFile;