// nav links array
const clanLinks = [ // clans
    { href: '/brujah', text: 'Brujah' },
]
const bloodlineLinks = [ // bloodlines
    { href: '/ahrimanes', text: 'Ahrimanes' },
]

function HomePage(){
    return(
        <div className="overflow-y-scroll flex flex-col gap-10 h-full rounded-xl">

            <section className="flex flex-col gap-5">
                <h1>Welcome to my Vampire: the Masquerade Character Vault!</h1>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo facilis tempora dolorum! Quis repellat provident, facilis inventore dolore, velit expedita, natus sint saepe accusamus id fugiat hic mollitia soluta fuga.</p>
            </section>

            <section className="flex flex-col gap-5">
                {/* clan links! */}
                <h2>Clans</h2>
                <nav className="flex flex-col w-fit pl-2 border-l-6 border-gray-300">
                    {clanLinks.map((link) => (
                            // change <a> to custom link component when made!
                            <a key={link.href} to={link.href} end>
                                {link.text}
                            </a>
                    ))}
                </nav>
            </section>
            <section className="flex flex-col gap-5">
                {/* bloodline links! */}
                <h2>Bloodlines</h2>
                <nav className="flex flex-col w-fit pl-2 border-l-6 border-gray-300">
                    {bloodlineLinks.map((link) => (
                            // change <a> to custom link component when made!
                            <a key={link.href} to={link.href} end>
                                {link.text}
                            </a>
                    ))}
                </nav>
            </section>

        </div>
    );
}

export default HomePage