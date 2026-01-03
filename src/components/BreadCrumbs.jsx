// imports
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; // add 'motion' !! IGNORE THE SQUIGGLY RED LINE!
// import components
import { useBreadcrumbs } from "../context/BreadCrumbContext";
// import context
import { useThemeContext } from '../context/ThemeContext';

// make the crumb not display URL
function prettyCrumb(crumb) { // display "John Smith" instead of "john-smith"
    return crumb
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());
}

// 2. animation constant !!
const crumbAnimation = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
    transition: { type: "", stiffness: 500, damping: 40, duration: 0.13 }
}

function BreadCrumbs() {
    const location = useLocation();
    const { crumbNames } = useBreadcrumbs();
    const path = location.pathname; // "/clan/brujah"
    const parts = path.split("/").filter(Boolean);

    // filter out the 'middleman' (clan/non clan/bloodlines/etc) from the parts array
    const filteredParts = parts.filter(part => !['clan', 'bloodline', 'non-clan'].includes(part));

    // split into parts and remove empty "" from '/'
    const crumbs = filteredParts.map((part) => { // removed unused 'idx'
        // rebuild the path based on original parts (not filtered)
        // to maintain correct linking
        const originalIdx = parts.indexOf(part);
        const to = "/" + parts.slice(0, originalIdx + 1).join("/");
        
        // check if a custom name exists in context for this path.
        // if it does, use it. if not, use the prettyCrumb function.
        const name = crumbNames[to] || prettyCrumb(part);
        return {
            name: name, // use the dynamically found name
            to: to,
        };
    });
    
    // theme swithcing
    const { theme } = useThemeContext();
    const isDarkMode = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    return(
        <nav className="overflow-x-auto flex items-center gap-1 w-full whitespace-nowrap text-xs sm:gap-2 sm:text-sm">

            {/* NOTE: active crumb should be accented */}

            {/* Home crumb should always exist */}
            {crumbs.length > 0 ? (
                <>
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            `px-2 py-1 rounded-md transition sm:px-3
                             ${isActive ? "italic text-text-accent bg-bg-accent"
                                        : "text-text-secondary dark:text-text-secondary-dark bg-bg-secondary dark:bg-bg-secondary-dark hover:italic hover:text-text-primary dark:hover:text-text-primary-dark hover:bg-bg-tertiary dark:hover:bg-bg-tertiary-dark"}`
                        }
                    >
                        Home
                    </NavLink>
                </>
            ) : (
                <span className="px-2 py-1 italic text-text-accent bg-bg-accent rounded-md sm:px-3">
                    Home
                </span>
            )}

            {/* wrap dynamic crumbs for animation */}
            <AnimatePresence>
                {/* render each crumb */}
                {crumbs.map((crumb, i) => (
                    <motion.span 
                        key={crumb.to} // unique key!!
                        className="flex items-center gap-1 sm:gap-2"
                        {...crumbAnimation}
                    >
                        {/* separators */}
                        <motion.span {...crumbAnimation}>
                            {/* show Slash on Mobile (hidden on sm and up) */}
                            {/* removed for now... */}
                            
                            {/* show Arrow on Desktop (hidden on mobile) */}
                            <img 
                                src={isDarkMode ? "/assets/icons/chevron-right_light.png" : "/assets/icons/chevron-right.png"} 
                                alt="Description" className="w-3 sm:w-5"
                            />
                        </motion.span>

                        {/* last crumb is active and unclickable */}
                        {i === crumbs.length - 1 ? (
                            <span className="px-2 py-1 italic text-text-accent bg-bg-accent rounded-md sm:px-3">
                                {crumb.name}
                            </span>
                        ) : (
                            <NavLink
                                to={crumb.to}
                                end
                                className={({ isActive }) =>
                                    `px-2 py-1 rounded-md transition sm:px-3
                                    ${isActive ? "italic text-text-accent bg-bg-accent"
                                      : "text-text-secondary dark:text-text-secondary-dark bg-bg-secondary dark:bg-bg-secondary-dark hover:italic hover:text-text-primary dark:hover:text-text-primary-dark hover:bg-bg-tertiary dark:hover:bg-bg-tertiary-dark"}`
                                }
                            >
                                {crumb.name}
                            </NavLink>
                        )}
                    </motion.span>
                ))}
            </AnimatePresence>
        </nav>
    );
}

export default BreadCrumbs