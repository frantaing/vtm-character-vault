// IMPORT: React stuff
import React, { useState } from "react";
// IMPORT: framer-motion
import { motion, AnimatePresence } from 'framer-motion';

// For rows...
const DetailRow = ({ label, children }) => {
    if (!children) return null;
    return (
        <>
            <dt className="col-span-1 font-bold capitalize">{label.replace(/_/g, ' ')}:</dt>
            <dd className="col-span-2">{children}</dd>
        </>
    );
};

function CharacterSheetPanel({ sheet }) {
    const [isOpen, setIsOpen] = useState(false); // Start closed by default

    if (!sheet) return null;

    // A list of the keys for standard stat rows to render them in order
    const statKeys = [
        'physical', 'social', 'mental', 'talents', 'skills', 'knowledges',
        'disciplines', 'backgrounds', 'virtues', 'morality', 'willpower'
    ];

    return (
        <aside className="overflow-hidden flex flex-col w-full h-fit bg-gray-200 rounded-md">
            
            {/* Button to open/collapse panel */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex justify-between items-center w-full px-6 py-2 text-left text-lg font-bold font-heading rounded-md cursor-pointer transition hover:bg-gray-300"
            >
                Character Sheet
                <motion.span
                    animate={{ rotate: isOpen ? -90 : 90 }}
                    transition={{ duration: 0.3 }}
                    className="text-2xl"
                >
                    &gt;
                </motion.span>
            </button>

            {/* The rest of the sidepanel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                        className="overflow-hidden mt-2 pt-4 pb-8 px-6 py-2" // pt-4 for spacing
                    >

                        <dl className="grid grid-cols-3 gap-x-16 gap-y-3 text-xs sm:text-sm">
                            
                            {/* Render all the simple stat rows */}
                            {statKeys.map(key => (
                                sheet[key] && (
                                    <DetailRow key={key} label={key}>
                                        {sheet[key]}
                                    </DetailRow>
                                )
                            ))}

                            {/* --- Special Case: Merits & Flaws --- */}
                            {sheet.merits_flaws && (
                                <DetailRow label="Merits/Flaws">
                                    <div className="flex flex-col gap-2">
                                        {/* Merits List */}
                                        {sheet.merits_flaws.merits && (
                                            <div>
                                                <h4 className="font-medium">Merits</h4>
                                                <ul className="list-disc pl-5">
                                                    {sheet.merits_flaws.merits.map((merit, index) => (
                                                        <li key={index}>{merit}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                        {/* Flaws List */}
                                        {sheet.merits_flaws.flaws && (
                                            <div>
                                                <h4 className="font-medium">Flaws</h4>
                                                <ul className="list-disc pl-5">
                                                    {sheet.merits_flaws.flaws.map((flaw, index) => (
                                                        <li key={index}>{flaw}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </DetailRow>
                            )}

                        </dl>
                    </motion.div>
                )}
            </AnimatePresence>
        </aside>
    );
}

export default CharacterSheetPanel;