import { useState } from 'react';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import { AddContent } from './AddContent/AddContent';
import { AuthRouter } from './AuthRouter/AuthRouter';
import { FrontPage } from './FrontPage/FrontPage';
import { PostModalProvider } from './PostModalContext/PostModalContextProvider';
import { SideNav } from './SideNav/SideNav';
import { UserPage } from './UserPage/UserPage';
import { PostsWithHashtag } from './PostList/PostsWithHashtag';
import { ConversationList } from './Messages/ConversationList';
import { Conversation } from './Messages/Conversation';

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
                  <Route path="/user/:username" element={<UserPage />} />
                  <Route
                    path="/hashtag/:hashtag"
                    element={<PostsWithHashtag />}
                  />
                  <Route path="/conversations" element={<ConversationList />} />
                  <Route path="/conversation/:id" element={<Conversation />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
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
