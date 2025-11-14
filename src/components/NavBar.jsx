function NavBar() {
    return(
        <nav className="flex flex-col gap-5">
            <section className="">
                <div className="flex justify-between items-center pl-5 pr-2 py-2 bg-gray-100 rounded-md">
                    {/* title, maybe logo idk*/}
                    <h1>vtm character vault</h1>
                    {/* search */}
                    <input type="text" placeholder="Search?" className="px-5 py-2 text-black text-xs text-right rounded-md transition hover:bg-gray-200 focus:outline-0" />
                </div>     
            </section>

            {/* THIS is the main navigation */}
            <section className="flex items-center gap-3 text-sm">
                <a href="" className="px-5 py-2 text-gray-600 bg-gray-100 rounded-md transition hover:text-black hover:bg-gray-200">breadcrumbs</a>
                <p>&gt;</p>
                <a href="" className="px-5 py-2 text-gray-600 bg-gray-100 rounded-md transition hover:text-black hover:bg-gray-200">hello</a>
                <p>&gt;</p>
                <a href="" className="px-5 py-2 text-red-600 bg-red-100 rounded-md">world</a>
            </section>
        </nav>
    );
}

export default NavBar