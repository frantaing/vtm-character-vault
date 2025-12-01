// import breadcrumbs nav
import { BreadCrumbs } from './'

function NavBar() {
    return(
        <nav className="flex flex-col gap-5">
            <section>
                <div className="flex justify-between items-center pl-5 pr-2 py-2 bg-gray-100 rounded-md">
                    {/* title, maybe logo idk*/}
                    <span className="font-heading font-bold text-sm sm:text-lg">vtm character vault</span>
                    {/* search */}
                    <input type="text" placeholder="Search?" className="w-24 px-5 py-2 text-black text-xs text-right rounded-md transition hover:bg-gray-200 focus:outline-0" />
                </div>     
            </section>
            {/* primary navigation: BreadCrumbs */}
            <BreadCrumbs></BreadCrumbs>
        </nav>
    );
}

export default NavBar