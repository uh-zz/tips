import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import {Navbar} from './app/Navbar';
import {NotificationsList} from './features/notifications/NotificationsList';
import {AddPostForm} from './features/posts/AddPostForm';
import {EditPostForm} from './features/posts/EditPostForm';
import {PostsList} from './features/posts/PostsLists';
import {SinglePostPage} from './features/posts/SinglePostPage';
import {UserList} from './features/users/UserList';
import {UserPage} from './features/users/UserPage';

function App() {
  const [isRed, setIsRed] = useState([false]);

  return (
    <Router>
      <div
        style={{
          width: 100,
          height: 100,
          backgroundColor: isRed[0]?'red':'black',
        }}
        onClick={()=>{
          setIsRed([!isRed[0]]);
        }}
      />
      <Navbar />
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <React.Fragment>
                <AddPostForm />
                <PostsList />
              </React.Fragment>
            )}
          />
          <Route exact path="/posts/:postId" component={SinglePostPage} />
          <Route exact path="/editPost/:postId" component={EditPostForm} />
          <Route exact path="/users" component={UserList} />
          <Route exact path="/users/:userId" component={UserPage} />
          <Route exact path="/notifications" component={NotificationsList}/>
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
