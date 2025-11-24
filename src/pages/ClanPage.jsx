import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function ClanPage() {
    const { clan } = useParams();
    // state for the clan's own information (from _index.md)
    const [clanInfo, setClanInfo] = useState(null);         // for frontmatter
    const [clanContent, setClanContent] = useState('');     // for the main markdown content
    const [characters, setCharacters] = useState([]);       // state for the list of characters in that clan

    useEffect(() => {
        // create two async functions inside for clarity
        const fetchClanInfo = async () => {
            try {
                // dynamically import the clan's _index.md file
                const clanModule = await import(`../content/${clan}/_index.md?raw`);
                const { data, content } = matter(clanModule.default);
                setClanInfo(data);
                setClanContent(content);
            } catch (error) {
                console.error("Error fetching clan info:", error);
                // handle cases where a clan might not have an _index.md
            }
        };

        const fetchClanCharacters = async () => {
            const allCharacterModules = import.meta.glob('../content/**/*.md', { as: 'raw' });

            const characterPromises = Object.entries(allCharacterModules)
                // filter for paths that are in the current clan's directory
                .filter(([path, _]) => path.startsWith(`../content/${clan}/`))
                // IMPORTANT: also filter out the _index.md file itself!
                .filter(([path, _]) => !path.endsWith('_index.md'))
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

    }, [clan]); // re-run whenever the URL param `clan` changes
    if (!clanInfo) { // add a loading state to prevent errors before data is fetched
        return <div>Loading clan information...</div>;
    }

    return (
        <div className="flex flex-col gap-10">
            {/* section for Clan Details */}
            <section className="flex justify-between gap-10">
                <div className="flex flex-col gap-10 w-fit">
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
                                    <Link key={char.slug} to={`/${clan}/${char.slug}`}>
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
                <aside className="flex flex-col w-xl h-fit mt-20 p-6 bg-gray-200 rounded-md">
                    <h3 className="font-bold text-lg mb-2">Clan Details</h3>
                    <dl className="grid">



                        <div><dt className="font-bold">Nickname:</dt><dd>{clanInfo.nickname}</dd></div>
                        <div><dt className="font-bold">Disciplines:</dt>
                            <dd>{clanInfo.disciplines}</dd>
                            <dd>{clanInfo.disciplinesv5}</dd>
                        </div>
                        <div className="md:col-span-3 mt-2"><dt className="font-bold">Bane:</dt><dd>{clanInfo.bane}</dd></div>
                    </dl>
                </aside>
            </section>
        </div>
    );
}

export default ClanPage;