// imports
import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import matter from 'gray-matter';
// import components
import { useBreadcrumbs } from '../context/BreadCrumbContext';
import { SidePanel, ImageCarousel } from '../components';

function CharacterPage() {
    const location = useLocation();                             // get the current location object
    const { setCrumbName } = useBreadcrumbs();                  // get function from context
    const { type, clan, character } = useParams();                    // fill in key "/:type/:clan/:character"
    const [characterData, setCharacterData] = useState(null);   // store frontmatter (name, alias, etc)
    const [content, setContent] = useState('');                 // store main md content aside from frontmatter
    
    // fetch data based on current URL
    useEffect(() => {
        const fetchCharacterData = async () => {
            try {
                // dynamically import the markdown file
                const markdownModule = await import(`../content/${type}/${clan}/${character}.md?raw`);
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
    }, [type, clan, character, location.pathname, setCrumbName]); // rerun if clan or character in URL change; add depedencies
    if (!characterData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col justify-between gap-10 sm:flex-row">
            {/* Main Content */}
            <div className="flex flex-col order-last gap-5 w-fit">
                <h1>{characterData.name}</h1>
                <h2>{characterData.clan}, {characterData.generation} generation</h2>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
            </div>

            {/* detail sidebar pane */}
            <SidePanel type="character" data={characterData} className="order-first" />
        </div>
    );
}

export default CharacterPage;