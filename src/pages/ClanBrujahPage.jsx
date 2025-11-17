import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import matter from 'gray-matter';

function ClanBrujahPage() {
    const [brujahCharacters, setBrujahCharacters] = useState([]);

    useEffect(() => {
        const fetchBrujahCharacters = async () => {
            // vite glob import to get all markdown files in the brujah dir
            const characterModules = import.meta.glob('../content/brujah/*.md', { as: 'raw' });
            // get file content + frontmatter
            const characters = await Promise.all(
                Object.entries(characterModules).map(async ([path, importer]) => {
                    const fileContent = await importer();
                    const { data } = matter(fileContent);
                    const charactercrumb = path.split('/').pop().replace('.md', '');
                    return {
                        ...data,
                        crumb: charactercrumb,
                    };
                })
            );
            setBrujahCharacters(characters);
        };

        fetchBrujahCharacters();
    }, []);

    return (
        // STYLE THIS ALSO
        <div>
            <h1>Clan Brujah</h1>
            <p>List of known Brujah:</p>
            <nav className="flex flex-col w-fit pl-2 border-l-4 border-gray-300 mt-4">
                {brujahCharacters.map((char) => (
                    <Link key={char.crumb} to={`/brujah/${char.crumb}`}>
                        {char.name}
                    </Link>
                ))}
            </nav>
        </div>
    );
}

export default ClanBrujahPage;