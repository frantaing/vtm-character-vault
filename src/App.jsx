// React stuff
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
// import components
import { Layout } from './components'
// import pages
import { 
  HomePage, ClanPage, CharacterPage
 } from './pages';

function App() {
  
  // logic for dealing with github pages reloading issues
  // client-side vs. server-side stuff yet beyond me
  const navigate = useNavigate();
  useEffect(() => {
    // check if a redirect path exists in sessionStorage
    const redirectPath = sessionStorage.getItem('redirect');
    if (redirectPath) {
      // remove key so it doesn't run on every refresh
      sessionStorage.removeItem('redirect');
      // navigate user to path they were trying to go to
      // remove the base path from start of string
      navigate(redirectPath.replace('/vtm-character-vault', ''));
    }
  }, [navigate]); // run once when the app loads
  
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