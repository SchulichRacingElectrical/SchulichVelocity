import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import './CSS/index.css';
import 'normalize.css';

import Navigation from './components/navigation/topNav';
import Home from './components/home';
import Historical from './components/historical/historical';
import Streaming from './components/streaming/streaming';
import SubmitCSV from './components/CSV/submitCSV';
import About from './components/about';
import Notfound from './components/notFound';

export default class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <div>
                        <Navigation/>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/home" component={Home} />
                            <Route exact path="/about" component={About} />
                            <Route exact path="/historical" component={Historical} />
                            <Route exact path="/streaming" component={Streaming} />
                            <Route exact path="/submitCSV" component={SubmitCSV} />
                            <Route component={Notfound} />
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
