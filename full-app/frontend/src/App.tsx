import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Welcome } from "./Welcome";
import { Secured } from "./Secured";

const App: React.FC = () => {
  return (
    <Router>
      <div className="container">
        <ul>
          <li><Link to="/">public component</Link></li>
          <li><Link to="/secured">secured component</Link></li>
        </ul>
        <Route exact path="/" component={Welcome} />
        <Route path="/secured" component={Secured} />
      </div>
    </Router>
  );
}

export default App;
