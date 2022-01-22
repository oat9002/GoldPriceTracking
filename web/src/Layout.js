import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header";
import Loading from "./Loading";
import Notification from "./Notification";

const Wrapper = styled.div`
    flex: 1 0 auto;
`;

function Layout(props) {
    // @ts-ignore
    const isLoading = useSelector((state) => state.goldPrice.isLoading);
    // @ts-ignore
    const notification = useSelector((state) => state.goldPrice.notification);

    return (
        <>
            {isLoading ? <Loading /> : null}
            <Wrapper>
                <Header />
                {props.children}
            </Wrapper>
            <Footer />
            {notification ? (
                <Notification
                    text={notification.message}
                    severity={notification.severity}
                    variant="filled"
                />
            ) : null}
        </>
    );
}

export default Layout;
