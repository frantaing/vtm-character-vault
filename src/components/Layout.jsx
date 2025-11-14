function Layout() {
    return(
        <div className="flex">

            {/* NAVIGATION SECTION */}
            <nav className="w-screen max-w-72 min-h-screen p-5 bg-gray-100">
                <h1>Character Vault</h1>
                <div className="">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti necessitatibus maiores in libero, eos laboriosam aperiam iure! Eos dignissimos assumenda animi error ipsum modi blanditiis, incidunt, veritatis hic possimus nostrum!
                </div>
            </nav>

            {/* HOMEPAGE SECTION */}
            <section className="flex flex-col gap-10 p-16">
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