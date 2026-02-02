import { Link } from 'react-router-dom';

function PageLink({ to, children }) {

    // Wrapper handles the border-left line
    const WrapperStyles = "group pl-2 border-l-2 border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white transition-colors";
    // Link styles itself (.pagelink, moved from index.css)
    const PageLinkStyles = "block text-sm! cursor-pointer px-5 py-2 text-text-secondary dark:text-text-secondary-dark bg-bg-secondary dark:bg-bg-secondary-dark rounded-md transition-all hover:italic hover:italic hover:text-text-primary dark:hover:text-text-primary-dark hover:bg-bg-tertiary dark:hover:bg-bg-tertiary-dark sm:text-base";

    return (
        <Link to={to} className={WrapperStyles}>
            <span className={PageLinkStyles}>
                {children}
            </span>
        </Link>
    );
}

export default PageLink;