import Donation from "Donation";
import Home from "Home";
import Layout from "Layout";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { isDonateEnable } from "util/Util";

function App() {
    return (
        <Router>
            <Layout>
                <Switch>
                    <Route path="/" exact component={Home} />
                    {isDonateEnable() ? (
                        <>
                            <Route path="/donate/complete">
                                <Donation complete={true} />
                            </Route>
                            <Route path="/donate" component={Donation} />
                        </>
                    ) : null}
                </Switch>
            </Layout>
        </Router>
    );
}

export default App;
