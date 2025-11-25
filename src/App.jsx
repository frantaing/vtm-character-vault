// React stuff
import { Routes, Route } from 'react-router-dom'
// import components
import { Layout } from './components'
// import pages
import { 
  HomePage, ClanPage, CharacterPage
 } from './pages';

function App() {
  return (
    <Routes>

      {/* default layout */}
      <Route path="/" element={<Layout />}>

        {/* default page for "/..."" */}
        <Route index element={<HomePage />} />

        {/* clan pages */}
        <Route path="/:type/:clan" element={<ClanPage />} />

        {/* bloodline pages */}

        {/* character page */}
        <Route path="/:type/:clan/:character" element={<CharacterPage />} />

      </Route>
      
    </Routes>
  );
}

export default App