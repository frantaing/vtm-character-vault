// Imports
import React, { useState, useMemo } from "react";
import { useThemeContext } from '../context/ThemeContext';
import { formatLabel } from '../utils/MarkdownComponents';

// --- HELPER COMPONENTS ---
// Helper for rows
const DetailRow = ({ label, children }) => {
    // CHECK: prevent objects from crashing React
    if (!children || (typeof children === 'object' && !React.isValidElement(children) && !Array.isArray(children))) {
        return null; 
    }
    return (
        <>
            <dt className="col-span-1 font-bold capitalize text-text-primary dark:text-text-primary-dark">{label}:</dt>
            <dd className="col-span-2 text-text-primary dark:text-text-primary-dark">{children}</dd>
        </>
    );
};

// Helper for section headers
const SubSectionHeader = ({ title }) => (
    <dt className="col-span-3 mt-2 font-semibold capitalize text-text-primary dark:text-text-primary-dark">{title}</dt>
);

// --- THE SHEET CONTENT RENDERER ---
// This handles the logic for a single specific sheet (e.g., just the V20 data)
const SheetContent = ({ data }) => {
    return (
        <dl className="grid grid-cols-3 gap-x-16 gap-y-3 text-xs sm:text-sm">
            {Object.entries(data).map(([key, value]) => {
                
                // CASE 1: Merits & Flaws
                if (key === 'merits_flaws') {
                    return (
                        <DetailRow key={key} label="Merits/Flaws">
                            <div className="flex flex-col gap-2">
                                {value.merits && (
                                    <div>
                                        <h4 className="font-medium text-text-primary dark:text-text-primary-dark">Merits</h4>
                                        <ul className="list-disc pl-5 text-text-primary dark:text-text-primary-dark">
                                            {value.merits.map((m, i) => <li key={i}>{m}</li>)}
                                        </ul>
                                    </div>
                                )}
                                {value.flaws && (
                                    <div>
                                        <h4 className="font-medium text-text-primary dark:text-text-primary-dark">Flaws</h4>
                                        <ul className="list-disc pl-5 text-text-primary dark:text-text-primary-dark">
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
                
                // CASE 2: Deep Nesting (Attributes -> Physical -> Strength)
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

                // CASE 3: Flat Nesting (Disciplines -> Potence)
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

                // CASE 4: Simple Values (Willpower: 8)
                return (
                    <DetailRow key={key} label={formatLabel(key)}>
                        {value}
                    </DetailRow>
                );
            })}
        </dl>
    );
};

// --- MAIN COMPONENT ---
function CharacterSheetPanel({ sheet }) {
    const { theme } = useThemeContext();
    const isDarkMode = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    const [isOpen, setIsOpen] = useState(false);

    // Get all available editions from the sheet object keys (e.g., ['v20', 'v5'])
    // Use useMemo so this doesn't recalculate constantly
    const editions = useMemo(() => sheet ? Object.keys(sheet) : [], [sheet]);

    // State for the active tab, default to the first edition found
    const [activeTab, setActiveTab] = useState(editions[0]);

    if (!sheet) return null;

    // Handle Tab Click
    const handleTabClick = (e, edition) => {
        e.stopPropagation(); // !!! Stop the click from bubbling up to the Accordion Toggle
        setActiveTab(edition);
    };

    return (
        <div className="flex flex-col w-full h-fit gap-3">
            {/* BUTTON: Toggles Panel */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="group flex justify-between items-center w-full pr-6 pl-1 py-1 text-left rounded-full bg-bg-tertiary dark:bg-bg-tertiary-dark hover:bg-bg-hover dark:hover:bg-bg-hover-dark text-text-primary dark:text-text-primary-dark transition-colors cursor-pointer"
            >
                <div className="flex items-center gap-2">                
                    {/* TABS AREA */}
                    {editions.length > 1 ? (
                        <div className="flex gap-2 rounded-full">
                            {editions.map(edition => (
                                <button
                                    key={edition}
                                    onClick={(e) => handleTabClick(e, edition)}
                                    className={`px-5 py-1.5 pt-2 text-xs uppercase rounded-full transition-all ease-linear cursor-pointer
                                        ${activeTab === edition 
                                            ? 'px-5 bg-bg-accent dark:bg-bg-accent-dark text-text-accent font-bold' 
                                            : 'bg-bg-tertiary hover:bg-bg-secondary dark:bg-bg-tertiary-dark text-text-primary group-hover:bg-bg-hover-dark dark:hover:bg-bg-secondary-dark dark:text-text-primary-dark'
                                        }`}
                                >
                                    {edition}
                                </button>
                            ))}
                        </div>
                    ) : (
                        // If only one edition, just show a subtle label
                        <span className="text-xs uppercase text-text-primary dark:text-text-primary-dark mt-1 ml-6">
                            {editions[0]}
                        </span>
                    )}
                </div>

                {/* Chevron Icon */}
                <span className={`text-2xl transition-transform duration-300 ${isOpen ? '-rotate-90' : 'rotate-90'}`}>
                    <img 
                        src={isDarkMode ? "/assets/icons/chevron-right_light.png" : "/assets/icons/chevron-right.png"} 
                        alt="Toggle" 
                        className="w-3 sm:w-4"
                    />
                </span>
            </button>

            {/* PANEL: Content Area */}
            <aside 
                className={`w-full text-text-primary dark:text-text-primary-dark bg-bg-tertiary dark:bg-bg-tertiary-dark rounded-lg transition-all duration-300 ease-in-out overflow-hidden
                ${isOpen 
                    ? 'max-h-[3000px] opacity-100 pt-6 pb-5' 
                    : 'max-h-0 opacity-0 py-0'
                }`}
            >
                <div className="px-6"> 
                    {/* Pass ONLY the data for the active tab to the renderer */}
                    <SheetContent data={sheet[activeTab]} />
                </div>
            </aside>
        </div>
    );
}

export default CharacterSheetPanel