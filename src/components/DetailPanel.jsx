// Imports
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { createMarkdownRenderers, formatLabel, inlineMarkdownRenderers } from '../utils/MarkdownComponents';
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

function DetailPanel({ type, data, clanSlug }) {
  if (!data) return null;

  const ignoredKeys = ['name', 'images', 'sheet', 'layout', 'tags'];
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
        {detailEntries.map(([key, value]) => {
          // If value is null/undefined, show a dash
          if (value === null || value === undefined) {
              return <DetailRow key={key} label={formatLabel(key)}>—</DetailRow>;
          }

          return (
            <DetailRow key={key} label={formatLabel(key)}>
              {/* CASE 1: Value is an Array (Bullet Points) */}
              {Array.isArray(value) ? (
                <ul className="list-disc pl-4 space-y-1">
                  {value.map((item, i) => (
                    <li key={i}>
                      <ReactMarkdown components={inlineMarkdownRenderers}>
                        {String(item)}
                      </ReactMarkdown>
                    </li>
                  ))}
                </ul>
              ) : (
                /* CASE 2: Value is a String/Number (Markdown Rendered) */
                <ReactMarkdown components={inlineMarkdownRenderers}>
                  {String(value)}
                </ReactMarkdown>
              )}
            </DetailRow>
          );
        })}
      </dl>
    </aside>
  );
}

export default DetailPanel;