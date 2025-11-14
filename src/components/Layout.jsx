function Layout() {
    return(
        <div className="flex flex-col w-screen max-w-4xl px-10">

            {/* NAVIGATION SECTION */}
            <nav className="flex justify-between p-5 bg-gray-100 rounded-xl">
                <h1>Character Vault</h1>
                <p className="text-right">not impossible side-effect</p>
            </nav>

            {/* HOMEPAGE SECTION */}
            <section className="flex flex-col gap-10 px-5 py-10">
                <h1>Hello, world!</h1>
                <div className="flex flex-col gap-5">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque rerum explicabo esse inventore molestias, eligendi repellendus expedita? Incidunt dolores voluptates deserunt suscipit modi recusandae officia sit omnis dicta? Consectetur, quo?</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur, unde! Eum, amet dolor. Totam quibusdam velit aliquam nisi. Expedita aspernatur velit veniam, delectus fuga voluptatem. Quidem asperiores deleniti nisi at!</p>                    
                </div>
            </section>

        </div>
    );
}

export default Layout