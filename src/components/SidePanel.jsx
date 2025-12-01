import React from 'react';
import { ImageCarousel } from './';

// A small helper component to avoid rendering empty detail rows
const DetailRow = ({ label, value }) => {
    if (!value) return null; // If there's no data, don't render anything
    return (
        <>
            <dt className="font-bold">{label}:</dt>
            <dd>{value}</dd>
        </>
    );
};

function SidePanel({ type, data }) {
    // If there's no data for some reason, don't render the panel
    if (!data) {
        return null;
    }

    const renderCharacterDetails = () => (
        <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
            <DetailRow label="Alias" value={data.alias} />
            <DetailRow label="Clan" value={data.clan} />
            <DetailRow label="Generation" value={data.generation} />
            <DetailRow label="Sire" value={data.sire} />
            <DetailRow label="Affiliation" value={data.affiliation} />
        </dl>
    );

    const renderClanDetails = () => (
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
            <DetailRow label="Nickname" value={data.nickname} />
            <DetailRow label="Disciplines" value={data.disciplines} />
            <DetailRow label="Disciplines (V5)" value={data.disciplinesv5} />
            <DetailRow label="Bane" value={data.bane} />
            <DetailRow label="Compulsion" value={data.compulsion} />
        </dl>
    );

    return (
        <aside className="overflow-x-hidden flex flex-col w-full md:w-2xl h-fit mt-8 md:mt-20 p-6 bg-gray-200 rounded-md">
            {/* Title (Characters have a proper name, clans don't need a separate one from the H1) */}
            {type === 'character' && (
                <h3 className="text-2xl font-bold mb-4">{data.name}</h3>
            )}
            
            {/* Image Carousel is shared */}
            <ImageCarousel 
              images={data.images}
              type={type}
              clan={data.clan} // Pass clan for character images, it will be undefined for clan type (which is fine)
              characterName={data.name}
            />
            
            {/* Conditionally render the correct details */}
            {type === 'character' && renderCharacterDetails()}
            {type === 'clan' && renderClanDetails()}
        </aside>
    );
}

export default SidePanel;