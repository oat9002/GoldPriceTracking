import "firebase/analytics";
import Footer from "Footer";
import Header from "Header";
import React from "react";
import { useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import Loading from "./Loading";
import Notification from "./Notification";

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const Content = styled.div`
    position: relative;
    min-height: 100vh;
    padding-bottom: 100px;
    animation: ${fadeIn} 1s;
`;

function Layout(props) {
    // @ts-ignore
    const isLoading = useSelector((state) => state.goldPrice.isLoading);
    // @ts-ignore
    const notification = useSelector((state) => state.goldPrice.notification);

    return (
        <Content>
            {isLoading ? <Loading /> : null}
            <Header />
            {props.children}
            <Footer />
            {notification ? (
                <Notification
                    text={notification.message}
                    severity={notification.severity}
                    variant="filled"
                />
            ) : null}
        </Content>
    );
}

export default Layout;
