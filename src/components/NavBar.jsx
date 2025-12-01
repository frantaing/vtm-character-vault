// import breadcrumbs nav
import { BreadCrumbs } from './'

function NavBar() {
    return(
        <nav className="flex flex-col gap-5">
            <section>
                <div className="flex flex-col justify-between items-center pl-5 pr-2 py-2 bg-gray-100 rounded-md sm:flex-row">
                    {/* title, maybe logo idk*/}
                    <span className="pt-1 font-heading font-bold text-sm sm:pt-0 sm:text-lg">vtm character vault</span>
                    {/* search */}
                    <input type="text" placeholder="Search?" className="px-5 py-2 text-black text-xs text-center rounded-md transition hover:bg-gray-200 focus:outline-0 sm:text-right" />
                </div>     
            </section>
            {/* primary navigation: BreadCrumbs */}
            <BreadCrumbs></BreadCrumbs>
        </nav>
    );
}

export default NavBar