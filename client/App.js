import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TaskList from './TaskList';
import EventList from './EventList';
import AddTask from './AddTask';
import AddEvent from './AddEvent';
import Notes from './Notes';
import NotFound from './NotFound';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/task-list" component={TaskList}/>
            <Route path="/event-list" component={EventList}/>
            <Route path="/add-task" component={AddTask}/>
            <Route path="/add-event" component={AddEvent}/>
            <Route path="/notes" component={Notes}/>
            <Route path="/" exact component={TaskList}/>
            <Route path="*" component={NotFound}/>
          </Switch>
        </Router>
      </div>
    );
  }
}
export default App;
```
```javascript
import React from 'react';

const NotFound = () => (
  <div>
    <h2>404 Error: Page Not Found</h2>
    <p>The requested URL was not found on this server.</p>
  </div>
);

export default NotFound;