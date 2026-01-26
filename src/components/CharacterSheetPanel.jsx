// Imports
import React, { useState } from "react";
import { useThemeContext } from '../context/ThemeContext';
import { formatLabel } from '../utils/MarkdownComponents';

// For rows...
const DetailRow = ({ label, children }) => {
    // CHECK: If children is an object (and not a React element/array), render nothing or stringify to prevent crash
    if (!children || (typeof children === 'object' && !React.isValidElement(children) && !Array.isArray(children))) {
        return null; 
    }
    return (
        <>
            <dt className="col-span-1 font-bold capitalize text-gray-900 dark:text-gray-100">{label}:</dt>
            <dd className="col-span-2 text-gray-800 dark:text-gray-200">{children}</dd>
        </>
    );
};

// Helper for section headers
const SectionHeader = ({ title }) => (
    <div className="col-span-3 mt-4 first:mt-0 mb-1">
        <h3 className="text-base font-bold font-heading border-b border-gray-400 dark:border-gray-600 text-gray-900 dark:text-gray-100">{title}</h3>
    </div>
);

const SubSectionHeader = ({ title }) => (
    <dt className="col-span-3 mt-2 font-semibold capitalize text-gray-700 dark:text-gray-300">{title}</dt>
);

function CharacterSheetPanel({ sheet }) {
  // Theme switching
  const { theme } = useThemeContext();
  const isDarkMode = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  const [isOpen, setIsOpen] = useState(false); // Start closed by default

  if (!sheet) return null;

  return (
    <aside className="flex flex-col w-full h-fit text-text-primary dark:text-text-primary-dark bg-bg-tertiary dark:bg-bg-tertiary-dark rounded-md transition-colors">
      {/* Button to open/collapse panel */}
      <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex justify-between items-center w-full px-6 py-2 text-left text-lg font-bold font-heading rounded-md cursor-pointer transition hover:bg-bg-hover dark:hover:bg-bg-hover-dark text-gray-900 dark:text-gray-100"
      >
        Character sheet
        <span className={`text-2xl transition-transform duration-300 ${isOpen ? '-rotate-90' : 'rotate-90'}`}>
          <img 
            src={isDarkMode ? "/assets/icons/chevron-right_light.png" : "/assets/icons/chevron-right.png"} 
            alt="Toggle" 
            className="w-3 sm:w-5"
          />
        </span>
      </button>

      {/* The rest of the sidepanel */}
      <div 
        className={`transition-[max-height,opacity,padding] duration-300 ease-in-out overflow-hidden
        ${isOpen 
          ? 'max-h-content opacity-100 pt-4 pb-5' 
          : 'max-h-0 opacity-0 py-0'
        }`}
      >
        <div className="px-6"> 
          <dl className="grid grid-cols-3 gap-x-16 gap-y-3 text-xs sm:text-sm">              
            {Object.entries(sheet).map(([key, value]) => {
              // CASE 1: Merits & Flaws (Specific Structure)
              if (key === 'merits_flaws') {
                  return (
                      <DetailRow key={key} label="Merits/Flaws">
                          <div className="flex flex-col gap-2">
                              {value.merits && (
                                  <div>
                                      <h4 className="font-medium text-gray-900 dark:text-gray-100">Merits</h4>
                                      <ul className="list-disc pl-5 text-gray-800 dark:text-gray-200">
                                          {value.merits.map((m, i) => <li key={i}>{m}</li>)}
                                      </ul>
                                  </div>
                              )}
                              {value.flaws && (
                                  <div>
                                      <h4 className="font-medium text-gray-900 dark:text-gray-100">Flaws</h4>
                                      <ul className="list-disc pl-5 text-gray-800 dark:text-gray-200">
                                          {value.flaws.map((f, i) => <li key={i}>{f}</li>)}
                                      </ul>
                                  </div>
                              )}
                          </div>
                      </DetailRow>
                  );
              }
              
              // CHECK FOR NESTING
              const isObject = typeof value === 'object' && value !== null && !Array.isArray(value);
              
              // CASE 2: Deep Nesting (e.g. Attributes -> Physical -> Strength)
              // Check if the first child of the object is ALSO an object
              const firstChild = isObject ? Object.values(value)[0] : null;
              const hasSubCategories = firstChild && typeof firstChild === 'object' && !Array.isArray(firstChild);
              
              if (hasSubCategories) {
                    return (
                      <React.Fragment key={key}>
                          <SectionHeader title={formatLabel(key)} />
                          {Object.entries(value).map(([subKey, subValue]) => (
                              <React.Fragment key={subKey}>
                                  <SubSectionHeader title={formatLabel(subKey)} />
                                  {Object.entries(subValue).map(([stat, val]) => (
                                      <DetailRow key={stat} label={formatLabel(stat)}>{val}</DetailRow>
                                  ))}
                              </React.Fragment>
                          ))}
                      </React.Fragment>
                  );
              }
              
              // CASE 3: Flat Nesting (e.g. Disciplines -> Potence, Backgrounds -> Allies)
              if (isObject) {
                  return (
                      <React.Fragment key={key}>
                          <SectionHeader title={formatLabel(key)} />
                          {Object.entries(value).map(([subKey, subValue]) => (
                              <DetailRow key={subKey} label={formatLabel(subKey)}>
                                  {subValue}
                              </DetailRow>
                          ))}
                      </React.Fragment>
                  );
              }
              
              // CASE 4: Simple Values (e.g. Willpower: 8)
              return (
                  <DetailRow key={key} label={formatLabel(key)}>
                      {value}
                  </DetailRow>
              );
            })}
          </dl>
        </div>
      </div>
    </aside>
  );
}

export default CharacterSheetPanel