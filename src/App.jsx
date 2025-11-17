// React stuff
import { Routes, Route } from 'react-router-dom'
// import components
import { Layout } from './components'
// import pages
import { 
  HomePage, ClanBrujahPage, CharacterPage
 } from './pages';

function App() {
  return (
    <Routes>

      {/* default layout */}
      <Route path="/" element={<Layout />}>

        {/* default page for "/..."" */}
        <Route index element={<HomePage />} />

        {/* clan pages */}
        <Route path="/brujah" element={<ClanBrujahPage />} />

        {/* bloodline pages */}

        {/* character page */}
        <Route path="/:clan/:character" element={<CharacterPage />} />

      </Route>
      
    </Routes>
  );
}

export default App