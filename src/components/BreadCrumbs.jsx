// imports
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// make the crumb not display URL
function prettyCrumb(crumb) { // display "John Smith" instead of "john-smith"
    return crumb
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());
}

// crumb animation [TINKER!!!]
const crumbAnimation = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { type: "spring", stiffness: 300, damping: 30 }
}

function BreadCrumbs() {
    const location = useLocation();
    const path = location.pathname; // "/brujah"

    // split into parts and remove empty "" from '/'
    const parts = path.split("/").filter(Boolean); // ['brujah']
    // build the breadcrumb list
    const crumbs = parts.map((part, idx) => { // { name, to }
        const to = "/" + parts.slice(0, idx + 1).join("/");
        return {
            name: prettyCrumb(part),
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
                    <motion.span 
                        key={crumb.to} // unique key!!
                        className="flex items-center gap-3"
                        {...crumbAnimation} 
                    >
                        {/* separator (animate separator too) */}
                        <motion.span {...crumbAnimation}>&gt;</motion.span>

                        {/* last crumb is active and unclickable */}
                        {i === crumbs.length - 1 ? (
                            <span className="px-3 py-1 text-red-600 bg-red-100 rounded-md">
                                {crumb.name}
                            </span>
                        ) : (
                            <NavLink
                                to={crumb.to}
                                className={({ isActive }) =>
                                    `px-3 py-1 rounded-md transition
                                     ${isActive ? "text-red-600 bg-red-100"
                                                : "text-gray-600 bg-gray-100 hover:text-black hover:bg-gray-200"}`
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