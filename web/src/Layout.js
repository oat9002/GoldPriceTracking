import "firebase/analytics";
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
    display: flex;
    justify-content: center;
    flex-direction: column;
    animation: ${fadeIn} 1s;
`;

function Layout(props) {
    // @ts-ignore
    const isLoading = useSelector((state) => state.goldPrice.isLoading);
    // @ts-ignore
    const errMsg = useSelector((state) => state.goldPrice.errMsg);

    return (
        <Content>
            {isLoading ? <Loading /> : null}
            <Header />
            {props.children}
            {errMsg ? (
                <Notification text={errMsg} severity="error" variant="filled" />
            ) : null}
        </Content>
    );
}

export default Layout;
