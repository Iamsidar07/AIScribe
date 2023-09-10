const Transcribing = ({ downloading }) => {
    return (
        <main className="flex flex-col gap-8 items-center justify-center p-5 py-24">
            <div className="flex flex-col items-center gap-4">
                <h1 className='text-5xl sm:text-6xl lg:text-7xl font-semibold '>Trans<span className='text-blue-500 '>cribing</span></h1>
                <p>{downloading ? "Warning up cylinders " : "Core cylinders engaged"}</p>
            </div>
            <div className="flex flex-col gap-2 max-w-[500px] mx-auto w-full">
                {
                    [0, 1, 2].map((val) => <div key={val} className={`h-2 sm:h-3 bg-slate-400 rounded-full loading loading${val} `}></div>)
                }
            </div>
        </main>
    )
};

export default Transcribing;