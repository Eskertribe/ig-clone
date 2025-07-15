import { useState } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

import { FrontPage } from './FrontPage/FrontPage';
import { UserPage } from './UserPage/UserPage';
import { SideNav } from './SideNav/SideNav';
import { AddContent } from './AddContent/AddContent';
import { AuthRouter } from './AuthRouter/AuthRouter';
import { ToastContainer } from 'react-toastify';
import { PostModalProvider } from './PostModalContext/PostModalContextProvider';

function App() {
  const [showAddContent, toggleShowAddContent] = useState(false);

  return (
    <div className="flex h-screen w-screen">
      <ToastContainer />
      <Router>
        <AuthRouter>
          <>
            {showAddContent && (
              <AddContent
                isOpen={showAddContent}
                toggleModal={() => toggleShowAddContent(!showAddContent)}
              />
            )}
            <SideNav
              toggleShowAddContent={() => toggleShowAddContent(!showAddContent)}
            />
            <div className="w-4/6">
              <PostModalProvider>
                <Routes>
                  <Route path="/" element={<FrontPage />} />
                  <Route path="/user" element={<UserPage />} />
                </Routes>
              </PostModalProvider>
            </div>
            <div className="w-1/6 space-y-2 p-2"></div>
          </>
        </AuthRouter>
      </Router>
    </div>
  );
}

export default App;
