// Imports
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { createMarkdownRenderers, formatLabel } from '../utils/MarkdownComponents';
import ImageCarousel from './ImageCarousel';

// markdown link styles
const detailLinkClasses = "px-1.5 py-0.5 text-text-primary dark:text-text-primary-dark bg-bg-hover dark:bg-bg-hover-dark rounded-lg transition-all hover:px-2 hover:py-1 hover:italic hover:text-text-primary dark:hover:text-text-primary-dark hover:bg-bg-hover dark:hover:bg-bg-hover-dark";
const detailPanelRenderers = createMarkdownRenderers(detailLinkClasses, true);

// To avoid rendering empty detail rows
const DetailRow = ({ label, children }) => {
    if (!children) return null; // If there's no data, don't render anything
    return (
        <>
            <dt className="col-span-1 font-bold">{label}:</dt>
            <dd className="col-span-2">{children}</dd>
        </>
    );
};

function DetailPanel({ type, data }) {
  // if there's no data for some reason, don't render the panel
  if (!data) return null; 

  // Define keys to IGNORE!
  // 'sheet' goes to the CharacterSheetPanel, 'images' goes to ImageCarousel, 'name' is the title.
  const ignoredKeys = ['name', 'images', 'sheet', 'layout', 'tags'];

  // Filter the data
  const detailEntries = Object.entries(data).filter(([key]) => !ignoredKeys.includes(key));

  return (
    <aside className="overflow-x-hidden flex flex-col w-full md:max-w-2xl h-fit md:mt-20 p-6 text-text-primary dark:text-text-primary-dark bg-bg-tertiary dark:bg-bg-tertiary-dark rounded-lg">
      {/* Image carousel */}
      <ImageCarousel 
        images={data.images}
        type={type}
        clan={data.clan}
        characterName={data.name}
      />
       
      {/* Everything else */}
      <dl className="grid grid-cols-3 gap-x-16 gap-y-3 text-sm mt-4">
        {/* Map dynamically! */}
        {detailEntries.map(([key, value]) => {
          // Check if value is likely markdown (contains links or formatting)
          // Or if it's the specific 'sire' field
          const isMarkdown = typeof value === 'string' && (value.includes('[') || key === 'sire');

          return (
            <DetailRow key={key} label={formatLabel(key)}>
              {isMarkdown ? (
                <ReactMarkdown components={detailPanelRenderers}>
                  {value}
                </ReactMarkdown>
              ) : (
                value
              )}
            </DetailRow>
          );
        })}
      </dl>
    </aside>
  );
}

export default DetailPanel;