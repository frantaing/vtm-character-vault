import React from 'react';
import { ImageCarousel } from './';

// to avoid rendering empty detail rows
const DetailRow = ({ label, value }) => {
    if (!value) return null; // if there's no data, don't render anything
    return (
        <>
            <dt className="col-span-1 font-bold">{label}:</dt>
            <dd className="col-span-2">{value}</dd>
        </>
    );
};

function SidePanel({ type, data }) {
    // if there's no data for some reason, don't render the panel
    if (!data) {
        return null;
    }

    const renderCharacterDetails = () => (
        <dl className="grid grid-cols-3 gap-x-16 gap-y-3 text-sm">
            <DetailRow label="Alias" value={data.alias} />
            <DetailRow label="Clan" value={data.clan} />
            <DetailRow label="Generation" value={data.generation} />
            <DetailRow label="Sire" value={data.sire} />
            <DetailRow label="Affiliation" value={data.affiliation} />
        </dl>
    );

    const renderClanDetails = () => (
        <dl className="grid grid-cols-3 gap-x-4 gap-y-2 text-sm">
            <DetailRow label="Nickname" value={data.nickname} />
            <DetailRow label="Disciplines" value={data.disciplines} />
            <DetailRow label="Disciplines (V5)" value={data.disciplinesv5} />
            <DetailRow label="Bane" value={data.bane} />
            <DetailRow label="Compulsion" value={data.compulsion} />
        </dl>
    );

    return (
        <aside className="overflow-x-hidden flex flex-col w-full md:max-w-2xl h-fit md:mt-20 p-6 bg-gray-200 rounded-md">
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