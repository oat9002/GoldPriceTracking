import Donation from "Donation";
import Home from "Home";
import Layout from "Layout";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
    return (
        <Router>
            <Layout>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/donate/complete">
                        <Donation complete={true} />
                    </Route>
                    <Route path="/donate" component={Donation} />
                </Switch>
            </Layout>
        </Router>
    );
}

export default App;
