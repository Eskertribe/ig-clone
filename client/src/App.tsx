import { useEffect, useState } from 'react';
import { Login } from './Login/Login';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { FrontPage } from './FrontPage/FrontPage';
import { UserPage } from './UserPage/UserPage';
import { SideNav } from './SideNav/SideNav';
import { AddContent } from './AddContent/AddContent';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAddContent, toggleShowAddContent] = useState(false);

  const login = () => {
    const cookie = document.cookie.split('; ').find(row => row.startsWith('auth-cookie='));
    const authToken = cookie ? cookie.split('=')[1].substring(0, 36) : '';

    if (authToken) {
      setIsAuthenticated(true);
    }
  }

  useEffect(() => {
    login();
  }, []);

  return (
    <>
      {isAuthenticated
        ?
        <div className="flex h-screen w-screen">
          {showAddContent && <AddContent isOpen={showAddContent} toggleModal={() => toggleShowAddContent(!showAddContent)} />}
          <Router>
            <SideNav toggleShowAddContent={() => toggleShowAddContent(!showAddContent)} />
            <div className="w-4/6">
              <Routes>
                <Route path="/" element={<FrontPage />} />
                <Route path="/user" element={<UserPage />} />
              </Routes>
            </div>
            <div className="w-1/6 space-y-2 p-2"></div>
          </Router>
        </div>
        :
        <Login login={login} />
      }
    </>
  );
}

export default App;