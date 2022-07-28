import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Layout from "./Layout";
import PrivacyPolicy from "./PrivacyPolicy";
import ScrollToTop from "./ScrollToTop";
import TermsAndCondition from "./TermsAndCondition";

function App() {
    return (
        <Router>
            <ScrollToTop />
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/termsAndCondition" element={<TermsAndCondition />} />
                    <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
