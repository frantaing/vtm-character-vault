// import breadcrumbs nav
import { BreadCrumbs } from './'

function NavBar() {
    return(
        <nav className="flex flex-col gap-5">
            <section>
                <div className="flex justify-between items-center pl-5 pr-2 py-2 bg-gray-100 rounded-md">
                    {/* title, maybe logo idk*/}
                    <span className="font-heading font-bold text-sm sm:text-lg">vtm character vault</span>
                    
                    {/* search (commented out for safekeeping) */}
                    {/* <input type="text" placeholder="Search?" className="w-24 px-5 py-2 text-black text-xs text-right rounded-md transition hover:bg-gray-200 focus:outline-0" /> */}
                
                    {/* link to repo */}
                    <a href='https://github.com/frantaing/vtm-character-vault' className='group flex gap-2 items-center px-3 py-1 bg-transparent rounded-md opacity-75 transition hover:bg-gray-200 hover:opacity-100'>
                      <span className='text-xs opacity-0 translate-x-2 transition group-hover:opacity-100 group-hover:translate-x-0'>Made by Frantaing</span>
                      <img src='/assets/icons/github.png' className='w-5.5' />
                    </a>
                </div>     
            </section>
            {/* primary navigation: BreadCrumbs */}
            <BreadCrumbs></BreadCrumbs>
        </nav>
    );
}

export default NavBar