// BreadCrumbs.jsx
// imports
import { NavLink, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion"; // removed 'motion' since it's not used
// import components
import { useBreadcrumbs } from "../context/BreadCrumbContext";

// make the crumb not display URL
function prettyCrumb(crumb) { // display "John Smith" instead of "john-smith"
    return crumb
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());
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

    return(
        <nav className="flex items-center gap-3 text-sm">

            {/* NOTE: active crumb should be accented */}

            {/* Home crumb should always exist */}
            {crumbs.length > 0 ? (
                <>
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            `px-3 py-1 rounded-md transition
                             ${isActive ? "text-red-600 bg-red-100"
                                        : "text-gray-600 bg-gray-100 hover:text-black hover:bg-gray-200"}`
                        }
                    >
                        Home
                    </NavLink>
                </>
            ) : (
                <span className="px-3 py-1 text-red-600 bg-red-100 rounded-md">
                    Home
                </span>
            )}

            {/* wrap dynamic crumbs for animation */}
            <AnimatePresence>
                {/* render each crumb */}
                {crumbs.map((crumb, i) => (
                    <span 
                        key={crumb.to} // unique key!!
                        className="flex items-center gap-3"
                    >
                        {/* separator */}
                        <span>&gt;</span>

                        {/* last crumb is active and unclickable */}
                        {i === crumbs.length - 1 ? (
                            <span className="px-3 py-1 text-red-600 bg-red-100 rounded-md">
                                {crumb.name}
                            </span>
                        ) : (
                            <NavLink
                                to={crumb.to}
                                end
                                className={({ isActive }) =>
                                    `px-3 py-1 rounded-md transition
                                     ${isActive ? "text-red-600 bg-red-100"
                                                : "text-gray-600 bg-gray-100 hover:text-black hover:bg-gray-200"}`
                                }
                            >
                                {crumb.name}
                            </NavLink>
                        )}
                    </span>
                ))}
            </AnimatePresence>
        </nav>
    );
}

export default BreadCrumbs