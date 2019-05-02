import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import './CSS/index.css';

import Navigation from './components/topNav';
import Home from './components/homePage';
import Historical from './components/historicalPage';
import Streaming from './components/streamingPage';
import SubmitCSV from './components/submitCSV';
import About from './components/aboutPage';
import Notfound from './components/notFound';

export default class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <div>
                        <Navigation />
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
