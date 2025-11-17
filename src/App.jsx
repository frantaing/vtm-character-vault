// React stuff
import { Routes, Route } from 'react-router-dom'
// import components
import { Layout } from './components'
// import pages
import { 
  HomePage, ClanBrujahPage
 } from './pages';

function App() {
  return (
    <Routes>

      {/* default layout */}
      <Route path="/" element={<Layout />}>

        {/* default page for "/..."" */}
        <Route index element={<HomePage />} />

        {/* add more pages here... */}
        <Route path="/brujah" element={<ClanBrujahPage />} />

      </Route>
      
    </Routes>
  );
}

export default App