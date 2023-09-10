const Header = () => {
    return (
        <header className='flex items-center justify-between p-5 '>
            <a href="/">
                <h1 className='text-xl sm:text-4xl font-bold '>ai<span className='text-blue-500'>Scribe</span></h1>
            </a>
            <a href="/">
                <button className='specialBtn px-5 py-3.5 rounded-lg sm:text-lg hover:text-blue-500 flex items-center gap-3 text-blue-400'>
                    <span>New</span>
                    <i className="fa-solid fa-plus sm:text-lg"></i>
                </button>
            </a>
        </header>
    )
};
export default Header;