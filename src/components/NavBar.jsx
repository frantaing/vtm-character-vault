// Import
import { BreadCrumbs } from './'
import { useThemeContext } from '../context/ThemeContext'

function NavBar() {
  // Get the current theme + function to change theme
  const { theme, setTheme } = useThemeContext();
  const isDarkMode = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  // Toggle theme function
  const toggleTheme = () => {
    setTheme(isDarkMode ? 'light' : 'dark');
  };
  
  return(
    <nav className="flex flex-col gap-5">
      <section>
        <div className="flex justify-between items-center pl-5 pr-2 py-2 bg-gray-100 dark:bg-gray-800 rounded-md transition-colors">
          {/* Logo + Title */}
          <div className="flex gap-2.5 items-center">
            <img src={isDarkMode ? '/assets/favicon-light.png' : '/assets/favicon-dark.png'} className='w-3.5 h-3.5' />
            <span className="hidden sm:block font-heading font-bold sm:text-lg text-black dark:text-white">vtm character vault</span>
          </div>
          
          {/* Search (commented out for safekeeping) */}
          {/* <input type="text" placeholder="Search?" className="w-24 px-5 py-2 text-black text-xs text-right rounded-md transition hover:bg-gray-200 focus:outline-0" /> */}
      
          <div className="flex px-3">
            {/* Link to repo */}
            <a href='https://github.com/frantaing/vtm-character-vault' className='group flex gap-2 items-center px-3 py-1 bg-transparent rounded-md transition hover:bg-gray-200 dark:hover:bg-gray-700'>
              <span className='text-xs text-black dark:text-white opacity-0 translate-x-2 transition group-hover:opacity-100 group-hover:translate-x-0'>Made by Frantaing</span>
              <img src={isDarkMode ? '/assets/icons/github_light.png' : '/assets/icons/github.png'} className='w-4 h-4' alt="GitHub" />
            </a>
            {/* Theme toggle button */}
            <button 
              onClick={toggleTheme}
              className="group px-1 py-1 rounded-md cursor-pointer transition hover:bg-black dark:hover:bg-white"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <div className="relative w-4!">
                {isDarkMode ? (
                  <>
                    {/* Dark mode: show light icon, hover shows dark icon */}
                    <img src="/assets/icons/sun-bright.png" alt="Switch to light mode" className="transition group-hover:opacity-0" />
                    <img src="/assets/icons/sun-bright_dark.png" alt="Switch to light mode" className="absolute inset-0 opacity-0 transition group-hover:opacity-100" />
                  </>
                ) : (
                  <>
                    {/* Light mode: show dark icon, hover shows light icon */}
                    <img src="/assets/icons/moon_dark.png" alt="Switch to dark mode" className="transition group-hover:opacity-0" />
                    <img src="/assets/icons/moon.png" alt="Switch to dark mode" className="absolute inset-0 opacity-0 transition group-hover:opacity-100" />
                  </>
                )}
              </div>
            </button>
          </div>
        </div>     
      </section>
      {/* Primary navigation: BreadCrumbs */}
      <BreadCrumbs></BreadCrumbs>
    </nav>
  );
}

export default NavBar