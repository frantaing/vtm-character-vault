// React stuff
import { Routes, Route } from 'react-router-dom'
// import components
import { Layout } from './components'
// import pages
import { HomePage, ClanPage, CharacterPage, NotFoundPage } from './pages';

function App() {
  return (
    <Routes>
      {/* default layout */}
      <Route path="/" element={<Layout />}>
        {/* default page for "/..."" */}
        <Route index element={<HomePage />} />
  
        {/* clan pages */}
        <Route path="/:type/:clan" element={<ClanPage />} />
  
        {/* character page */}
        <Route path="/:type/:clan/:character" element={<CharacterPage />} />
        
        {/* Catch-all route for 404 pages */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App