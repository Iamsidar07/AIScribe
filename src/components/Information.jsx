import { useEffect, useRef, useState } from "react";
import Transcription from "./Transcription";
import Translation from "./Translation";

const Information = ({ output }) => {
    const [tab, setTab] = useState('transcription');
    const [translation, setTranslation] = useState(null);
    const [translating, setTranslating] = useState(false);
    const [toLanguage, setToLanguage] = useState('select language');

    const worker = useRef(null);

    console.log({ toLanguage })
    useEffect(() => {
        if (!worker.current) {
            worker.current = new Worker(new URL('../utils/translate.worker.js', import.meta.url), {
                type: 'module'
            })
        }

        const onMessageReceived = async (e) => {
            switch (e.data.status) {
                case 'initiate':
                    console.log('DOWNLOADING')
                    break;
                case 'progress':
                    console.log('LOADING')
                    break;
                case 'update':
                    setTranslation(e.data.output)
                    console.log(e.data.output)
                    break;
                case 'complete':
                    setTranslating(false)
                    console.log("DONE")
                    break;
            }
        }

        worker.current.addEventListener('message', onMessageReceived)

        return () => worker.current.removeEventListener('message', onMessageReceived)
    })


    function generateTranslation() {
        if (translating || toLanguage === 'Select language') {
            return
        }

        setTranslating(true)
        console.log({
            text: output.map(val => val.text),
            src_lang: 'eng_Latn',
            tgt_lang: toLanguage
        })
        worker.current.postMessage({
            text: output.map(val => val.text),
            src_lang: 'eng_Latn',
            tgt_lang: toLanguage
        })
    }

    const resultText = tab === "transcription" ? output.map(({ text }) => text).join(' ') : translation || '';

    const handleCopy = () => {
        navigator.clipboard.writeText(resultText);
    }

    const handleDownload = () => {
        const element = document.createElement("a");
        const file = new Blob([resultText], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `aiScribe_${(new Date()).toDateString()}.txt`;
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }
    return (
        <main className="flex flex-col gap-8 items-center justify-center p-5 py-24">
            <h1 className='text-5xl sm:text-6xl lg:text-7xl font-semibold '><span className='text-blue-500 '> Transcription</span></h1>
            <div className="flex items-center border rounded-full border-blue-300 bg-white">
                <button onClick={() => setTab("transcription")} className={`px-6 py-3.5 duration-200 ${tab === "transcription" ? "bg-blue-500 text-white rounded-l-full font-bold " : ""}`} >
                    Transcription
                </button>
                <button onClick={() => setTab("translation")} className={`px-6 py-3.5 duration-200 ${tab === "translation" ? "bg-blue-500 text-white rounded-r-full font-bold" : ""}`} >
                    Translation
                </button>
            </div>
            {
                tab === "transcription" ? (
                    < Transcription resultText={resultText} />
                ) : (
                    <Translation toLanguage={toLanguage} translating={translating} resultText={resultText} setToLanguage={setToLanguage} setTranslating={setTranslating} setTranslation={setTranslation} generateTranslation={generateTranslation} />
                )
            }

            <div className="flex items-center gap-4">
                <button onClick={handleCopy} className="specialBtn px-4 py-1.5 rounded grid place-items-center hover:text-blue-300 duration-200" title="Copy">
                    <i className="fa-solid fa-copy text-lg"></i>
                </button>
                <button onClick={handleDownload} className="specialBtn px-4 py-1.5 rounded grid place-items-center hover:text-blue-300 duration-200" title="Download">
                    <i className="fa-solid fa-download text-lg"></i>
                </button>
            </div>
        </main>
    )
};

export default Information;