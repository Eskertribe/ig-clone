import { useEffect, useState } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';

import { Login } from './Login/Login';
import { FrontPage } from './FrontPage/FrontPage';
import { UserPage } from './UserPage/UserPage';
import { SideNav } from './SideNav/SideNav';
import { AddContent } from './AddContent/AddContent';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAddContent, toggleShowAddContent] = useState(false);
  const [user, setUser] = useState(null);

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

  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    console.log("CREDENTIAL RESPONSE", credentialResponse);
    try {
      // TODO: URI from .env
      const response = await fetch('http://localhost:3000/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: credentialResponse.credential,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      const { user, token } = data;

      localStorage.setItem('token', token);

      setIsAuthenticated(true);
      setUser(user);
    } catch (error) {
      console.error('--- Login failed --- :', error);
    }
  };

  // TODO: Implement error handling
  const handleError = () => {
    console.log('Login Failed');
  };

  return (
    <GoogleLogin
      onSuccess={credentialResponse => handleSuccess(credentialResponse)}
      onError={handleError}
    />
    // TODO: WIP
    // <>
    //   {isAuthenticated
    //     ?
    //     <div className="flex h-screen w-screen">
    //       {showAddContent && <AddContent isOpen={showAddContent} toggleModal={() => toggleShowAddContent(!showAddContent)} />}
    //       <Router>
    //         <SideNav toggleShowAddContent={() => toggleShowAddContent(!showAddContent)} />
    //         <div className="w-4/6">
    //           <Routes>
    //             <Route path="/" element={<FrontPage />} />
    //             <Route path="/user" element={<UserPage />} />
    //           </Routes>
    //         </div>
    //         <div className="w-1/6 space-y-2 p-2"></div>
    //       </Router>
    //     </div>
    //     :
    //     <Login login={login} />
    //   }
    // </>
  );
}

export default App;