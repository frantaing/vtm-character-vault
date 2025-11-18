// import react stuff
import { Outlet } from 'react-router-dom'
// import components
import { NavBar, ContentBox } from './'
import { BreadcrumbProvider } from '../context/BreadCrumbContext'

function Layout() {
    return(
        // provider wrapper
        <BreadcrumbProvider>
            <div className="flex flex-col gap-5 w-screen max-w-4xl px-10">

                {/* insert navigation here! */}
                <NavBar></NavBar>

                <main>
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