import { NavBar, ContentBox } from './';

function Layout() {
    return(
        <div className="flex flex-col gap-5 w-screen max-w-4xl px-10">

            {/* insert navigation here! */}
            <NavBar></NavBar>

            <main>
                {/* insert ContentBox main container here! */}
                <ContentBox></ContentBox>       
            </main>
            
        </div>
    );
}

export default Layout