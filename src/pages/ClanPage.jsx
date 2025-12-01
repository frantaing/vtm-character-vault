import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
// import components
import { SidePanel, ImageCarousel } from '../components';

function ClanPage() {
    const { type, clan } = useParams();
    // state for the clan's own information (from _index.md)
    const [clanInfo, setClanInfo] = useState(null);         // for frontmatter
    const [clanContent, setClanContent] = useState('');     // for the main markdown content
    const [characters, setCharacters] = useState([]);       // state for the list of characters in that clan

    useEffect(() => {
        // create two async functions inside for clarity
        const fetchClanInfo = async () => {
            try {
                // dynamically import the clan's _index.md file
                const clanModule = await import(`../content/${type}/${clan}/_index.md?raw`);
                const { data, content } = matter(clanModule.default);
                setClanInfo(data);
                setClanContent(content);
            } catch (error) {
                console.error("Error fetching clan info:", error);
                // handle cases where a clan might not have an _index.md
            }
        };

        const fetchClanCharacters = async () => {
          const allCharacterModules = import.meta.glob('../content/**/*.md', { query: '?raw', import: 'default' });

            const characterPromises = Object.entries(allCharacterModules)
                // filter for paths that are in the current $type (clan/bloodline/misc)'s directory
                .filter(([path, ]) => path.startsWith(`../content/${type}/${clan}/`))
                // IMPORTANT: also filter out the _index.md file itself!
                .filter(([path, ]) => !path.endsWith('_index.md'))
                .map(async ([path, importer]) => {
                    const fileContent = await importer();
                    const { data } = matter(fileContent);
                    const slug = path.split('/').pop().replace('.md', '');
                    return { ...data, slug };
                });
            
            const clanCharacters = await Promise.all(characterPromises);
            setCharacters(clanCharacters);
        };

        // run both functions when the component loads or the clan changes
        fetchClanInfo();
        fetchClanCharacters();

    }, [type, clan]); // re-run whenever the URL param `clan` changes
    if (!clanInfo) { // add a loading state to prevent errors before data is fetched
        return <div>Loading clan information...</div>;
    }

    return (
        <div className="flex flex-col gap-10">
            {/* section for Clan Details */}
            <section className="flex flex-col justify-between gap-10 sm:flex-row">
                <div className="flex flex-col order-last gap-10 w-fit sm:order-first">
                    {/* section for page title + description */}
                    <div className="flex flex-col gap-5">
                        <h1>Clan {clanInfo.name}</h1>
                        {/* use the ReactMarkdown component to render the clan's description */}
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{clanContent}</ReactMarkdown>                        
                    </div> 
                    {/* section for the character list */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4">Known Members of Clan {clanInfo.name}</h2>
                        {characters.length > 0 ? (
                            <nav className="flex flex-col w-fit pl-2 border-l-4 border-gray-300 mt-4">
                                {characters.map((char) => (
                                  <Link key={char.slug} to={`/${type}/${clan}/${char.slug}`}>
                                        {char.name}
                                    </Link>
                                ))}
                            </nav>
                        ) : (
                            <p>No members of this clan have been recorded.</p>
                        )}
                    </section>                
                </div>

                {/* detail sidebar pane */}
                <SidePanel type="clan" data={clanInfo} className="order-first sm:order-last" />
            </section>
        </div>
    );
}

export default ClanPage;