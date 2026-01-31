function NotFoundPage() {
  return (
    <div className="flex flex-col gap-5">
      <h1>Oops! No page?</h1>
      <p>Sorry, the page you're looking for doesn't exist!</p>
      
      <div class="w-fit pl-2 border-l-4 border-gray-300 dark:border-gray-700 mt-1">
        <a href="/" className="pageLink w-fit!">Go back home</a>
      </div>
    </div>      
  );
}

export default NotFoundPage;