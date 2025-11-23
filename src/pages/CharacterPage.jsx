// imports
import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import matter from 'gray-matter';
// import components
import { useBreadcrumbs } from '../context/BreadCrumbContext';

function CharacterPage() {
    const location = useLocation();                             // get the current location object
    const { setCrumbName } = useBreadcrumbs();                  // get function from context
    const { clan, character } = useParams();                    // fill in key "/:clan/:character"
    const [characterData, setCharacterData] = useState(null);   // store frontmatter (name, alias, etc)
    const [content, setContent] = useState('');                 // store main md content aside from frontmatter

    // fetch data based on current URL
    useEffect(() => {
        const fetchCharacterData = async () => {
            try {
                // dynamically import the markdown file
                const markdownModule = await import(`../content/clan/${clan}/${character}.md?raw`);
                const fileContent = markdownModule.default;

                // parse the frontmatter and content
                const { data, content } = matter(fileContent);
                setCharacterData(data);
                setContent(content);

                // afer getting data, set the name for the current path
                if (data.name) {
                    setCrumbName(location.pathname, data.name);
                }
            } catch (error) { // handle error state, maybe redirect to a 404 page (i'll make one sooooooon)
                console.error("Error fetching character data:", error);
            }
        };
        fetchCharacterData();
    }, [clan, character, location.pathname, setCrumbName]); // rerun if clan or character in URL change; add depedencies
    if (!characterData) {
        return <div>Loading...</div>;
    }

    return (

        // FIX FORMATTING/STYLING IT'S UGLY AF
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
            </div>

            {/* Sidebar */}
            <aside className="md:col-span-1">
                <div className="bg-gray-200 p-6 rounded-md">
                    <h2 className="text-2xl font-bold mb-4">{characterData.name}</h2>
                    {characterData.image && (
                        <img src={characterData.image} alt={characterData.name} className="w-full h-auto rounded-md mb-4" />
                    )}
                    <dl>
                        <dt className="font-bold">Alias:</dt>
                        <dd className="mb-2">{characterData.alias}</dd>

                        <dt className="font-bold">Clan:</dt>
                        <dd className="mb-2">{characterData.clan}</dd>

                        <dt className="font-bold">Generation:</dt>
                        <dd className="mb-2">{characterData.generation}</dd>

                        <dt className="font-bold">Sire:</dt>
                        <dd>{characterData.sire}</dd>
                    </dl>
                </div>
            </aside>
        </div>
    );
}

export default CharacterPage;