// Import: Components
import { PageLink } from "../components";

function NotFoundPage() {
  return (
    <div className="flex flex-col gap-5">
      <h1>Oops! Page not found!</h1>
      <p>Sorry, the page you're looking for doesn't exist!</p>
      
      <div class="flex mt-1">
        <PageLink to="/">
          Go back home
        </PageLink>
      </div>
    </div>      
  );
}

export default NotFoundPage;