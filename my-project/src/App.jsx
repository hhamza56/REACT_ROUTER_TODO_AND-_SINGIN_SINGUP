import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Redirect, Link, Switch } from 'react-router-dom';

// Define TodoList component
const TodoList = () => {
  return (
    <div>
      <h1>Todo List</h1>
      {/* Your Todo list component goes here */}
    </div>
  );
};

// Define SignIn component
const SignIn = ({ onSignIn }) => {
  const handleSignIn = () => {
    // Here you can implement your sign-in logic, such as validating credentials
    // For simplicity, we're just calling the onSignIn callback
    onSignIn();
  };

  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
};

// Define ProtectedRoute component
const ProtectedRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isLoggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
      )
    }
  />
);

// Define App component
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/todos">Todo List</Link>
            </li>
            {isLoggedIn ? (
              <li>
                <button onClick={() => setIsLoggedIn(false)}>Logout</button>
              </li>
            ) : (
              <li>
                <Link to="/signin">Sign In</Link>
              </li>
            )}
          </ul>
        </nav>

        <Switch>
          <ProtectedRoute path="/todos" component={TodoList} isLoggedIn={isLoggedIn} />
          <Route path="/signin">
            <SignIn onSignIn={() => setIsLoggedIn(true)} />
          </Route>
          <Redirect to="/todos" />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
