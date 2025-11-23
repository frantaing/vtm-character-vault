// imports
import { Link } from "react-router-dom";
// nav links array
const clanLinks = [ // clans
    { href: '/banu-haqim', text: 'Banu Haqim' },
    { href: '/brujah', text: 'Brujah' },
    { href: '/gangrel', text: 'Gangrel' },
    { href: '/hecata', text: 'Hecata' },
    { href: '/lasombra', text: 'Lasombra' },
    { href: '/malkavian', text: 'Malkavian' },
    { href: '/ministry', text: 'Ministry' },
    { href: '/nosferatu', text: 'Nosferatu' },
    { href: '/ravnos', text: 'Ravnos' },
    { href: '/toreador', text: 'Toreador' },
    { href: '/tremere', text: 'Tremere' },
    { href: '/tzimisce', text: 'Tzimisce' },
    { href: '/ventrue', text: 'Ventrue' },
]
const bloodlineLinks = [ // bloodlines
    { href: '/ahrimanes', text: 'Ahrimanes' }, // doesn't exit yet. to test for 404
]

function HomePage(){
    return(
        <div className="flex flex-col gap-10 h-full pr-5">

            <section className="flex flex-col gap-5">
                <h1>Welcome to my Vampire: the Masquerade Character Vault!</h1>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo facilis tempora dolorum! Quis repellat provident, facilis inventore dolore, velit expedita, natus sint saepe accusamus id fugiat hic mollitia soluta fuga.</p>
            </section>

            <section className="flex flex-col">
                {/* links! */}
                <h2>Clans</h2>
                <nav className="flex flex-col w-fit pl-2 border-l-4 border-gray-300 mt-4">
                    {clanLinks.map((link) => (
                            // change <a> to custom link component when made!
                            <Link key={link.href} to={link.href} end>
                                {link.text}
                            </Link>
                    ))}
                </nav>
            </section>
            <section className="flex flex-col">
                {/* bloodline links! */}
                <h2>Bloodlines</h2>
                <nav className="flex flex-col w-fit pl-2 border-l-4 border-gray-300 mt-4">
                    {bloodlineLinks.map((link) => (
                            // change <a> to custom link component when made!
                            <Link key={link.href} to={link.href} end>
                                {link.text}
                            </Link>
                    ))}
                </nav>
            </section>

        </div>
    );
}

export default HomePage