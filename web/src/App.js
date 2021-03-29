import Donation from "Donation";
import Home from "Home";
import Layout from "Layout";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
    return (
        <Router>
            <Layout>
                <Route path="/" exact component={Home} />
                <Route path="/donate" exact component={Donation} />
            </Layout>
        </Router>
    );
}

export default App;
