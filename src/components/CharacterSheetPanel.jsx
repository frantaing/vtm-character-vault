// Imports
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeContext } from "../context/ThemeContext";
import { formatLabel } from "../utils/MarkdownComponents";

// For rows...
const DetailRow = ({ label, children }) => {
  if (!children) return null;
  return (
    <>
      <dt className="col-span-1 font-bold capitalize">{label}:</dt>
      <dd className="col-span-2">{children}</dd>
    </>
  );
};

// Helper for section headers
const SectionHeader = ({ title }) => (
  <div className="col-span-3 mt-4 first:mt-0 mb-1">
    <h3 className="text-base font-bold font-heading border-b border-gray-400 dark:border-gray-600">
      {title}
    </h3>
  </div>
);

function CharacterSheetPanel({ sheet }) {
  // Theme switching
  const { theme } = useThemeContext();
  const isDarkMode = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  const [isOpen, setIsOpen] = useState(false); // Start closed by default

  if (!sheet) return null;

  return (
    <aside className="overflow-hidden flex flex-col w-full h-fit text-text-primary dark:text-text-primary-dark bg-bg-tertiary dark:bg-bg-tertiary-dark rounded-md">
      {/* Button to open/collapse panel */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full px-6 py-2 text-left text-lg font-bold font-heading rounded-md cursor-pointer transition hover:bg-bg-hover dark:hover:bg-bg-hover-dark"
      >
        Character sheet
        <motion.span
          animate={{ rotate: isOpen ? -90 : 90 }}
          transition={{ duration: 0.3 }}
          className="text-2xl"
        >
          <img
            src={ isDarkMode ? "/assets/icons/chevron-right_light.png" : "/assets/icons/chevron-right.png" }
            alt="Toggle"
            className="w-3 sm:w-5"
          />
        </motion.span>
      </button>

      {/* The rest of the sidepanel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden mt-2 pt-4 pb-5 px-6 py-2"
          >
            <dl className="grid grid-cols-3 gap-x-16 gap-y-3 text-xs sm:text-sm">
              {/* DYNAMIC MAPPING */}
              {Object.entries(sheet).map(([key, value]) => {
                // Merits & Flaws (Special List Logic)
                if (key === "merits_flaws") {
                  return (
                    <DetailRow key={key} label="Merits/Flaws">
                      <div className="flex flex-col gap-2">
                        {value.merits && (
                          <div>
                            <h4 className="font-medium">Merits</h4>
                            <ul className="list-disc pl-5">
                              {value.merits.map((m, i) => (
                                <li key={i}>{m}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {value.flaws && (
                          <div>
                            <h4 className="font-medium">Flaws</h4>
                            <ul className="list-disc pl-5">
                              {value.flaws.map((f, i) => (
                                <li key={i}>{f}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </DetailRow>
                  );
                }

                // Case 2: Nested Object (e.g., Attributes: { Physical: ... })
                // If value is an object (and not null/array), it's a category header
                if (
                  typeof value === "object" &&
                  value !== null &&
                  !Array.isArray(value)
                ) {
                  return (
                    <React.Fragment key={key}>
                      <SectionHeader title={formatLabel(key)} />
                      {/* Map the inner object */}
                      {Object.entries(value).map(([subKey, subValue]) => (
                        <DetailRow key={subKey} label={formatLabel(subKey)}>
                          {subValue}
                        </DetailRow>
                      ))}
                    </React.Fragment>
                  );
                }

                // Case 3: Simple Value (e.g., Willpower: 8)
                return (
                  <DetailRow key={key} label={formatLabel(key)}>
                    {value}
                  </DetailRow>
                );
              })}
            </dl>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}

export default CharacterSheetPanel;