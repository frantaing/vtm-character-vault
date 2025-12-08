// IMPORT: React stuff
import React, { useState } from "react";
// IMPORT: framer-motion
import { motion, AnimatePresence } from 'framer-motion';

// RESTYLE!

const DetailRow = ({ label, value }) => {
    if (value === null || value === undefined) return null;
    return (
        <>
            <dt className="font-bold capitalize">{label.replace(/_/g, ' ')}:</dt>
            <dd>{value}</dd>
        </>
    );
};

// Section titles that spans both columns of the grid
const CategoryHeader = ({ title }) => (
    <div className="col-span-2 mt-4 first:mt-0">
        <h3 className="text-lg font-bold font-heading border-b border-gray-400">{title}</h3>
    </div>
);

// Sub-category titles (like Physical, Social) that also spans the grid
const SubCategoryHeader = ({ title }) => (
    <dt className="col-span-2 mt-2 font-semibold capitalize text-gray-700">{title}</dt>
);

function CharacterSheetPanel({ sheet }) {
    const [isOpen, setIsOpen] = useState(false); // Start closed by default

    if (!sheet) return null;

    return (
        <aside className="overflow-x-hidden flex flex-col w-full md:max-w-2xl h-fit px-6 py-2 bg-gray-200 rounded-md">
            
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left text-xl font-bold font-heading cursor-pointer hover:text-red-600 transition"
            >
                Character Sheet
                <motion.span
                    animate={{ rotate: isOpen ? 0 : -180 }}
                    transition={{ duration: 0.3 }}
                    className="text-lg"
                >
                    ▲
                </motion.span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                        className="overflow-hidden mt-2 pt-2"
                    >
                        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs sm:text-sm">
                            
                            {/* Attributes */}
                            {sheet.attributes && (
                                <>
                                    <CategoryHeader title="Attributes" />
                                    {Object.entries(sheet.attributes).map(([subCategory, stats]) => (
                                        <React.Fragment key={subCategory}>
                                            <SubCategoryHeader title={subCategory} />
                                            {Object.entries(stats).map(([stat, value]) => (
                                                <DetailRow key={stat} label={stat} value={value} />
                                            ))}
                                        </React.Fragment>
                                    ))}
                                </>
                            )}

                            {/* Abilities */}
                            {sheet.abilities && (
                                <>
                                    <CategoryHeader title="Abilities" />
                                    {Object.entries(sheet.abilities).map(([subCategory, stats]) => (
                                        <React.Fragment key={subCategory}>
                                            <SubCategoryHeader title={subCategory} />
                                            {Object.entries(stats).map(([stat, value]) => (
                                                <DetailRow key={stat} label={stat} value={value} />
                                            ))}
                                        </React.Fragment>
                                    ))}
                                </>
                            )}

                            {/* Disciplines (and other flat lists) */}
                            {sheet.disciplines && (
                                <>
                                    <CategoryHeader title="Disciplines" />
                                    {Object.entries(sheet.disciplines).map(([stat, value]) => (
                                        <DetailRow key={stat} label={stat} value={value} />
                                    ))}
                                </>
                            )}

                            {sheet.backgrounds && (
                                <>
                                    <CategoryHeader title="Backgrounds" />
                                    {Object.entries(sheet.backgrounds).map(([stat, value]) => (
                                        <DetailRow key={stat} label={stat} value={value} />
                                    ))}
                                </>
                            )}

                            {sheet.virtues && (
                                <>
                                    <CategoryHeader title="Virtues" />
                                    {Object.entries(sheet.virtues).map(([stat, value]) => (
                                        <DetailRow key={stat} label={stat} value={value} />
                                    ))}
                                </>
                            )}

                            {/* Willpower (a single value) */}
                             {sheet.willpower && (
                                <>
                                  <CategoryHeader title="Willpower" />
                                  <DetailRow label="Willpower" value={sheet.willpower} />
                                </>
                             )}
                        </dl>
                    </motion.div>
                )}
            </AnimatePresence>
        </aside>
    );
}

export default CharacterSheetPanel;