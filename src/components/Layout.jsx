function Layout() {
    return(
        <div className="flex flex-col gap-5 w-screen max-w-4xl px-10">

            {/* NAVIGATION SECTION */}
            <nav className="flex flex-col gap-5">
                <section className="p-5 bg-gray-100 rounded-xl">
                    <div className="flex justify-between">
                        <h1>Character Vault</h1>
                        <p className="text-right">not impossible side-effect</p>
                    </div>     
                </section>
                <section className="flex items-center gap-3 text-sm">
                    <a href="" className="px-5 py-2 bg-gray-100 rounded-xl transition hover:bg-green-200">breadcrumbs</a>
                    <p>&gt;</p>
                    <a href="" className="px-5 py-2 bg-gray-100 rounded-xl transition hover:bg-green-200">hello</a>
                    <p>&gt;</p>
                    <a href="" className="px-5 py-2 bg-gray-100 rounded-xl transition hover:bg-green-200">world</a>
                </section>
            </nav>

            {/* HOMEPAGE SECTION */}
            <section className="flex flex-col gap-10 h-[70vh] p-5 bg-gray-100 rounded-xl">
                <div className="overflow-y-scroll h-full rounded-xl">
                    <h1>Hello, world!</h1>
                    <div className="flex flex-col gap-5 pr-5">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque rerum explicabo esse inventore molestias, eligendi repellendus expedita? Incidunt dolores voluptates deserunt suscipit modi recusandae officia sit omnis dicta? Consectetur, quo?</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur, unde! Eum, amet dolor. Totam quibusdam velit aliquam nisi. Expedita aspernatur velit veniam, delectus fuga voluptatem. Quidem asperiores deleniti nisi at!</p>         
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur, unde! Eum, amet dolor. Totam quibusdam velit aliquam nisi. Expedita aspernatur velit veniam, delectus fuga voluptatem. Quidem asperiores deleniti nisi at!</p>                    
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque rerum explicabo esse inventore molestias, eligendi repellendus expedita? Incidunt dolores voluptates deserunt suscipit modi recusandae officia sit omnis dicta? Consectetur, quo?</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur, unde! Eum, amet dolor. Totam quibusdam velit aliquam nisi. Expedita aspernatur velit veniam, delectus fuga voluptatem. Quidem asperiores deleniti nisi at!</p>         
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur, unde! Eum, amet dolor. Totam quibusdam velit aliquam nisi. Expedita aspernatur velit veniam, delectus fuga voluptatem. Quidem asperiores deleniti nisi at!</p>    
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque rerum explicabo esse inventore molestias, eligendi repellendus expedita? Incidunt dolores voluptates deserunt suscipit modi recusandae officia sit omnis dicta? Consectetur, quo?</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur, unde! Eum, amet dolor. Totam quibusdam velit aliquam nisi. Expedita aspernatur velit veniam, delectus fuga voluptatem. Quidem asperiores deleniti nisi at!</p>         
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur, unde! Eum, amet dolor. Totam quibusdam velit aliquam nisi. Expedita aspernatur velit veniam, delectus fuga voluptatem. Quidem asperiores deleniti nisi at!</p>                    
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque rerum explicabo esse inventore molestias, eligendi repellendus expedita? Incidunt dolores voluptates deserunt suscipit modi recusandae officia sit omnis dicta? Consectetur, quo?</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur, unde! Eum, amet dolor. Totam quibusdam velit aliquam nisi. Expedita aspernatur velit veniam, delectus fuga voluptatem. Quidem asperiores deleniti nisi at!</p>         
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur, unde! Eum, amet dolor. Totam quibusdam velit aliquam nisi. Expedita aspernatur velit veniam, delectus fuga voluptatem. Quidem asperiores deleniti nisi at!</p>    
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque rerum explicabo esse inventore molestias, eligendi repellendus expedita? Incidunt dolores voluptates deserunt suscipit modi recusandae officia sit omnis dicta? Consectetur, quo?</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur, unde! Eum, amet dolor. Totam quibusdam velit aliquam nisi. Expedita aspernatur velit veniam, delectus fuga voluptatem. Quidem asperiores deleniti nisi at!</p>         
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur, unde! Eum, amet dolor. Totam quibusdam velit aliquam nisi. Expedita aspernatur velit veniam, delectus fuga voluptatem. Quidem asperiores deleniti nisi at!</p>                    
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque rerum explicabo esse inventore molestias, eligendi repellendus expedita? Incidunt dolores voluptates deserunt suscipit modi recusandae officia sit omnis dicta? Consectetur, quo?</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur, unde! Eum, amet dolor. Totam quibusdam velit aliquam nisi. Expedita aspernatur velit veniam, delectus fuga voluptatem. Quidem asperiores deleniti nisi at!</p>         
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur, unde! Eum, amet dolor. Totam quibusdam velit aliquam nisi. Expedita aspernatur velit veniam, delectus fuga voluptatem. Quidem asperiores deleniti nisi at!</p>    
                    </div>                    
                </div>

            </section>

        </div>
    );
}

export default Layout