// import react stuff
import { Outlet } from 'react-router-dom'
// import components
import { NavBar, ContentBox } from './'
import { BreadcrumbProvider } from '../context/BreadCrumbContext'

function Layout() {
    return(
        // provider wrapper
        <BreadcrumbProvider>
            <div className="overflow-hidden flex flex-col gap-5 w-screen max-w-4xl h-screen mx-auto p-10">

                {/* insert navigation here! */}
                <NavBar />

                <main className="flex-1 min-h-0 w-full">
                    {/* insert ContentBox main container here! */}
                    <ContentBox>
                        {/* insert outlet geez */}
                        <Outlet />
                    </ContentBox>       
                </main>
                
            </div>
        </BreadcrumbProvider>
    );
}

export default Layout