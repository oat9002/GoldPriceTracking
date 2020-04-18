import { CircularProgress } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
    position: absolute;
    top: 64px;
    left: 0;
    right: 0;
    bottom: 0;
    min-height: 100vh;
    z-index: 1;
    background: rgba(255, 255, 255, 0.97);
`;
const LoadingText = styled.div`
    font-family: Roboto;
    font-weight: bold;
    margin-top 3px;
`;
const LoadingCotainer = styled.div`
    position: relative;
    text-align: center;
    top: 40%;
`;

function Loading() {
    const [isShow, setIsShow] = React.useState(false);

    React.useEffect(() => {
        const timeout = setTimeout(() => setIsShow(true), 1000);
        return () => clearTimeout(timeout);
    });

    function render() {
        return isShow ? (
            <Container>
                <LoadingCotainer>
                    <CircularProgress />
                    <LoadingText>Loading...</LoadingText>
                </LoadingCotainer>
            </Container>
        ) : null;
    }
    return render();
}

export default Loading;
