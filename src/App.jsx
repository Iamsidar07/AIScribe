import { useEffect, useState, useRef } from 'react'
import HomePage from './components/HomePage'
import Header from './components/Header'
import DisplayFile from './components/DisplayFile';
import Information from './components/Information';
import Transcribing from './components/Transcribing';
import { MessageTypes } from './utils/presets';


function App() {
  const [file, setFile] = useState(null);
  const [audioStream, setAudioStream] = useState(null);
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const isAudioAvailable = file || audioStream;

  const handleAudioReset = () => {
    setAudioStream(null);
    setFile(null);
  }


  const worker = useRef(null);

  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(new URL('./utils/whisper.worker.js', import.meta.url), { type: 'module' });
    }
    const onMessageReceived = (e) => {
      const type = e.data.type;
      console.log("message received: ", type);
      switch (type) {
        case 'DOWNLOADING':
          setIsDownloading(true);
          console.log('downloading');
          break;
        case 'LOADING':
          setIsLoading(true);
          console.log('loading');
          break;
        case 'RESULT':
          setOutput(e.data.results);
          console.log('result',e.data.results);
          break;
        case 'INFERENCE_DONE':
          setFinished(true);
          console.log('inference done finished.');
          break;

        default:
          break;
      }
    }

    worker.current.addEventListener('message', onMessageReceived);
    return () => worker.current.removeEventListener('message', onMessageReceived);
  });

  const readAudioFrom = async (file) => {
    // sample rate is 16k
    const sampleRate = 16000;
    // create audio context
    const audioContext = new AudioContext({ sampleRate });
    // read file
    const response = await file.arrayBuffer();
    // decode audio data
    const decodedAudio = await audioContext.decodeAudioData(response);
    // get audio buffer
    const audioBuffer = decodedAudio.getChannelData(0);
    // return audio buffer
    return audioBuffer;
  }

  const handleFormSubmission = async (e) => {
    if (!file && !audioStream) return;
    let audio = await readAudioFrom(file?file:audioStream);
    const model_name = `openai/whisper-tiny.en`;
    worker.current.postMessage(
      {
        type: MessageTypes.INFERENCE_REQUEST,
        audio,
        model_name,
      }
    )
   }

  return (
    <div className="flex flex-col">
      <section className='flex flex-col min-h-screen max-w-[1440px] mx-auto  w-full'>
        <Header />
        {
          output ? (<Information output={ output } />)
            : isLoading ? (<Transcribing />)
              : isAudioAvailable ? (<DisplayFile handleFormSubmission={handleFormSubmission} handleAudioReset={handleAudioReset} setAudioStream={setAudioStream} file={file} />)
                : (<HomePage setAudioStream={setAudioStream} setFile={setFile} />)
        }
      </section>

      <footer className='p-5 '>
        footer
      </footer>
    </div>
  )
}

export default App
