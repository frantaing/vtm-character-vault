function breadCrumbs() {
    return(
        <nav className="flex items-center gap-3 text-sm">
            <a href="" className="px-5 py-2 text-gray-600 bg-gray-100 rounded-md transition hover:text-black hover:bg-gray-200">breadcrumbs</a>
            <p>&gt;</p>
            <a href="" className="px-5 py-2 text-gray-600 bg-gray-100 rounded-md transition hover:text-black hover:bg-gray-200">hello</a>
            <p>&gt;</p>
            <a href="" className="px-5 py-2 text-red-600 bg-red-100 rounded-md">world</a>
        </nav>
    );
}

export default breadCrumbs