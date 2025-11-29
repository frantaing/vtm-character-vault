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
const nonclanLinks = [
  { href: '/non-clan/thin-blood', text: 'Thin-blood' },
  { href: '/non-clan/caitiff', text: 'Caitiff' }, // doesn't exit yet. to test for 404
]

function HomePage(){
    return(
        <div className="flex flex-col gap-10 h-full pr-5">

            <section className="flex flex-col gap-5">
                <h1>Welcome to my Vampire: the Masquerade Character Vault!</h1>
                <p>This is a personal, wiki-style vault for the Kindred from my various chronicles (or just characters I created and particularly liked). It's a way for me to keep notes, images, and character details all in one organized place.</p>
                <p>Feel free to brwose by Clan or Bloodline (or the clanless) using the links below!</p>
                <span className="text-xs italic">Please be kind, even though some are cringe 🥺</span>
            </section>

            <section className="flex flex-col">
                {/* links! */}
                <h2>Clans</h2>
                <nav className="flex flex-col w-fit pl-2 border-l-4 border-gray-300 mt-4">
                    {clanLinks.map((link) => (
                            // change <a> to custom link component when made!
                            <Link key={link.href} to={link.href}>
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
                            <Link key={link.href} to={link.href} className="line-through">
                                {link.text}
                            </Link>
                    ))}
                </nav>
            </section>
            <section className="flex flex-col">
                {/* misc links! */}
                <h2>Non-clans</h2>
                <nav className="flex flex-col w-fit pl-2 border-l-4 border-gray-300 mt-4">
                    {nonclanLinks.map((link) => (
                            // change <a> to custom link component when made!
                            <Link key={link.href} to={link.href}>
                                {link.text}
                            </Link>
                    ))}
                </nav>
            </section>
            
        </div>
    );
}

export default HomePage