import Donation from "Donation";
import Home from "Home";
import Layout from "Layout";
import PrivacyPolicy from "PrivacyPolicy";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ScrollToTop from "ScrollToTop";
import TermsAndCondition from "TermsAndCondition";
import { isDonateEnable } from "util/Util";

function App() {
    return (
        <Router>
            <ScrollToTop />
            <Layout>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route
                        path="/termsAndCondition"
                        exact
                        component={TermsAndCondition}
                    />
                    <Route
                        path="/privacyPolicy"
                        exact
                        component={PrivacyPolicy}
                    />
                    {isDonateEnable() && (
                        <>
                            <Route path="/donate/complete" exact>
                                <Donation complete={true} />
                            </Route>
                            <Route path="/donate" component={Donation} exact />
                        </>
                    )}
                </Switch>
            </Layout>
        </Router>
    );
}

export default App;
