import { ReactNode } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Header from "./Header";
import Loading from "./Loading";
import { Notification } from "./models/model";
import NotificationComponent from "./Notification";
import { RootState } from "./reducers/goldPrice";

interface LayoutProps {
    children: ReactNode;
}

const Wrapper = styled.div`
    flex: 1 0 auto;
`;

function Layout(props: LayoutProps) {
    const isLoading = useSelector<RootState, boolean>((state) => state.isLoading);
    const notification = useSelector<RootState, Notification>((state) => state.notification);

    return (
        <>
            {isLoading ? <Loading /> : null}
            <Wrapper>
                <Header />
                {props.children}
            </Wrapper>
            {notification ? (
                <NotificationComponent
                    text={notification.message}
                    severity={notification.severity}
                    variant="filled"
                />
            ) : null}
        </>
    );
}

export default Layout;
