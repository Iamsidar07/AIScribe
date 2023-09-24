import { useEffect, useRef, useState } from "react";

const HomePage = ({ setAudioStream, setFile }) => {
    const [audioRecordingStatus, setAudioRecordingStatus] = useState(false);
    const [duration, setDuration] = useState(0);
    const [audioChucks, setAudioChucks] = useState([]);
    const mediaRecorder = useRef(null);
    const mimeTye = 'audio/webm';
    const handleStartRecording = async () => {
        console.log("start recordings")
        let tempStream;
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
            tempStream = stream;

        } catch (error) {
            console.log('Something went wrong', error.message);
            alert(error.message);
            return;
        }
        setAudioRecordingStatus(true);
        // Create a new MediaRecorder instance, and start recording
        const media = new MediaRecorder(tempStream, { type: mimeTye });
        mediaRecorder.current = media;
        mediaRecorder.current.start();
        console.log("media recorder", mediaRecorder.current)
        let localAudioChunks = [];
        mediaRecorder.current.ondataavailable = (event) => {
            if (typeof event.data === "undefined") return;
            if (event.data.size === 0) return;
            localAudioChunks.push(event.data);
        }
        setAudioChucks(localAudioChunks);
    }

    const handleStopRecording = async () => {
        console.log("stop recordings")
        setAudioRecordingStatus(false);
        mediaRecorder.current.stop();
        mediaRecorder.current.onstop = () => {
            // Create a new Blob from the audio chunks
            const audioBlob = new Blob(audioChucks, { type: mimeTye });
            const url = URL.createObjectURL(audioBlob);
            console.log('recorded url:', url);
            // set the audio stream to the recorded audio
            setAudioStream(audioBlob);
            setDuration(0);
            setAudioChucks([]);
        }

    }
    const handleUploadFileChange = (e) => {
        const firstFile = e.target.files[0];
        setFile(firstFile);
    }

    useEffect(() => {
        console.log(audioRecordingStatus);
        if (!audioRecordingStatus) return;
        console.log("counting duration")
        const interval = setInterval(() => { setDuration(prev => prev + 1) }, 1000);
        console.log(duration);
        return () => clearInterval(interval);
    }, [audioRecordingStatus, duration])
    return (
        <main className="flex-1 flex flex-col items-center justify-center p-5 gap-4 sm:gap-5 lg:gap-6 pb-24">
            <h1 className='text-5xl sm:text-6xl lg:text-7xl font-semibold'>Ai<span className='text-blue-500 '>Scribe</span></h1>
            <h3 className="text-lg font-medium md:text-lg flex items-center gap-2">Record <span className="text-blue-400">&rarr;</span>
                Translate<span className="text-blue-400">&rarr;</span> Transcribe
            </h3>
            <button onClick={audioRecordingStatus ? handleStopRecording : handleStartRecording} className="specialBtn px-6 py-3.5 rounded-full font-base flex items-center gap-4 justify-between max-w-full w-72 md:text-lg my-4">
                <p className="text-blue-400">{
                    audioRecordingStatus ? `Stop Recording` : "Start Recording"
                }</p>
                <div className="flex items-center gap-2">
                    {
                        duration !== 0 && <p className="text-sm text-slate-400">{duration}s</p>
                    }
                    <i className={`fa-solid duration-200 fa-microphone ${audioRecordingStatus ? "text-blue-500" :"text-gray-600"}`}></i>
                </div>
            </button>
            <p className="text-base">or <label htmlFor="uploadFile" className="cursor-pointer hover:text-blue-500">Upload</label><input className="hidden" type="file" accept=".mp3,.wave" id="uploadFile" onChange={handleUploadFileChange} /> a mp3 file.</p>
            <p className="italic text-slate-400 ">Free untill eternity</p>
        </main>
    )
}

export default HomePage;