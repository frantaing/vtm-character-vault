// imports: react stuff
import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import matter from 'gray-matter';
// import components
import { useBreadcrumbs } from '../context/BreadCrumbContext';
import { createMarkdownRenderers } from '../utils/MarkdownComponents';
import { DetailPanel, CharacterSheetPanel } from '../components';

// markdown link styles
const markdownLinkClasses = "px-1 underline text-text-primary dark:text-text-primary-dark bg-bg-tertiary dark:bg-bg-tertiary-dark rounded-md transition-all hover:px-1.5 hover:py-0.5 hover:italic hover:bg-bg-hover dark:hover:bg-bg-hover-dark";
const mainContentRenderers = createMarkdownRenderers(markdownLinkClasses);

function CharacterPage() {
  const location = useLocation();                             // get the current location object
  const { setCrumbName } = useBreadcrumbs();                  // get function from context
  const { type, clan, character } = useParams();              // fill in key "/:type/:clan/:character"
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
    <div className="flex flex-col justify-between gap-7 md:flex-row md:gap-10">
      <div className='flex flex-col gap-2'>
        <h1 className='md:hidden'>{characterData.name}</h1>
        <h2 className='md:hidden'>{characterData.clan}, {characterData.generation} generation</h2>
      </div>
      {/* Main Content */}
      <div className="flex flex-col order-last gap-5 w-full md:order-first">
        <div className='flex flex-col gap-2'>
          <h1 className='hidden md:inline'>{characterData.name}</h1>
          <h2 className='hidden md:inline'>{characterData.clan}, {characterData.generation} generation</h2>
        </div>
        <div className="prose max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={mainContentRenderers}>
              {content}
          </ReactMarkdown>
        </div>
      </div>

      <div className="w-full md:w-5/12 flex flex-col gap-3">
        {/* Detail sidebar panel */}
        <DetailPanel type="character" data={characterData} className="order-first md:order-last" />
        {/* Character sheet sidebar panel */}
        <CharacterSheetPanel sheet={characterData.sheet} />
      </div>
    </div>
  );
}

export default CharacterPage;