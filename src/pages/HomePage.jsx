// imports
import { Link } from "react-router-dom";
// nav links array
const clanLinks = [ // clans
    { href: '/clan/banu-haqim', text: 'Banu Haqim' },
    { href: '/clan/brujah', text: 'Brujah' },
    { href: '/clan/gangrel', text: 'Gangrel' },
    { href: '/clan/hecata', text: 'Hecata' },
    { href: '/clan/lasombra', text: 'Lasombra' },
    { href: '/clan/malkavian', text: 'Malkavian' },
    { href: '/clan/ministry', text: 'Ministry' },
    { href: '/clan/nosferatu', text: 'Nosferatu' },
    { href: '/clan/ravnos', text: 'Ravnos' },
    { href: '/clan/toreador', text: 'Toreador' },
    { href: '/clan/tremere', text: 'Tremere' },
    { href: '/clan/tzimisce', text: 'Tzimisce' },
    { href: '/clan/ventrue', text: 'Ventrue' },
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
                {/* clan links! */}
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