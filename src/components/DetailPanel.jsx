// imports: React stuff
import React from 'react';
import ReactMarkdown from 'react-markdown';
// imports: components
import { createMarkdownRenderers } from '../utils/MarkdownComponents';
import { ImageCarousel } from '.';

// markdown link styles
const detailLinkClasses = "px-1.5 py-0.5 text-text-primary dark:text-text-primary-dark bg-bg-hover dark:bg-bg-hover-dark rounded-md transition-all hover:px-2 hover:py-1 hover:italic hover:text-text-primary dark:hover:text-text-primary-dark hover:bg-bg-hover dark:hover:bg-bg-hover-dark";
const detailPanelRenderers = createMarkdownRenderers(detailLinkClasses, true);

// to avoid rendering empty detail rows
const DetailRow = ({ label, children }) => {
    if (!children) return null; // if there's no data, don't render anything
    return (
        <>
            <dt className="col-span-1 font-bold">{label}:</dt>
            <dd className="col-span-2">{children}</dd>
        </>
    );
};

function DetailPanel({ type, data }) {
  // if there's no data for some reason, don't render the panel
  if (!data) {
      return null;
  }

    const renderCharacterDetails = () => (
        <dl className="grid grid-cols-3 gap-x-16 gap-y-3 text-sm">
            {/* CORRECTED: All rows now use the children pattern */}
            <DetailRow label="Alias">{data.alias}</DetailRow>
            <DetailRow label="Clan">{data.clan}</DetailRow>
            <DetailRow label="Generation">{data.generation}</DetailRow>
            {/* link wrapping for sire */}
            {data.sire && (
                <DetailRow label="Sire">
                    <ReactMarkdown components={detailPanelRenderers}>
                        {data.sire}
                    </ReactMarkdown>
                </DetailRow>
            )}
            <DetailRow label="Affiliation">{data.affiliation}</DetailRow>
        </dl>
    );

    const renderClanDetails = () => (
        <dl className="grid grid-cols-3 gap-x-4 gap-y-2 text-sm">
            {/* CORRECTED: All rows now use the children pattern */}
            <DetailRow label="Nickname">{data.nickname}</DetailRow>
            <DetailRow label="Disciplines">{data.disciplines}</DetailRow>
            <DetailRow label="Disciplines (V5)">{data.disciplinesv5}</DetailRow>
            <DetailRow label="Bane">{data.bane}</DetailRow>
            <DetailRow label="Compulsion">{data.compulsion}</DetailRow>
        </dl>
    );

    return (
        <aside className="overflow-x-hidden flex flex-col w-full md:max-w-2xl h-fit md:mt-20 p-6 text-text-primary dark:text-text-primary-dark bg-bg-tertiary dark:bg-bg-tertiary-dark rounded-md">
            {/* image Carousel is shared */}
            <ImageCarousel 
              images={data.images}
              type={type}
              clan={data.clan}
              characterName={data.name}
            />
            
            {/* conditionally render the correct details */}
            {type === 'character' && renderCharacterDetails()}
            {type === 'clan' && renderClanDetails()}
        </aside>
    );
}

export default DetailPanel