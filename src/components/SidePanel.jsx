import React from 'react';
import { ImageCarousel } from './';

// to avoid rendering empty detail rows
const DetailRow = ({ label, value }) => {
    if (!value) return null; // if there's no data, don't render anything
    return (
        <>
            <dt className="font-bold">{label}:</dt>
            <dd>{value}</dd>
        </>
    );
};

function SidePanel({ type, data }) {
    // if there's no data for some reason, don't render the panel
    if (!data) {
        return null;
    }

    const renderCharacterDetails = () => (
        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs sm:text-sm">
            <DetailRow label="Alias" value={data.alias} />
            <DetailRow label="Clan" value={data.clan} />
            <DetailRow label="Generation" value={data.generation} />
            <DetailRow label="Sire" value={data.sire} />
            <DetailRow label="Affiliation" value={data.affiliation} />
        </dl>
    );

    const renderClanDetails = () => (
        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs sm:text-sm">
            <DetailRow label="Nickname" value={data.nickname} />
            <DetailRow label="Disciplines" value={data.disciplines} />
            <DetailRow label="Disciplines (V5)" value={data.disciplinesv5} />
            <DetailRow label="Bane" value={data.bane} />
            <DetailRow label="Compulsion" value={data.compulsion} />
        </dl>
    );

    return (
        <aside className="overflow-x-hidden flex flex-col w-full md:w-2xl h-fit sm:mt-8 md:mt-20 p-6 bg-gray-200 rounded-md">
            {/* Title */}
            {type === 'character' && (
                <h3 className="text-center text-2xl font-bold font-heading mb-4">{data.name}</h3>
            )}
            
            {/* image Carousel is shared */}
            <ImageCarousel 
              images={data.images}
              type={type}
              clan={data.clan} // Pass clan for character images, it will be undefined for clan type (which is fine)
              characterName={data.name}
            />
            
            {/* conditionally render the correct details */}
            {type === 'character' && renderCharacterDetails()}
            {type === 'clan' && renderClanDetails()}
        </aside>
    );
}

export default SidePanel;