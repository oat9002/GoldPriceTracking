import styled from "@emotion/styled";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import Header from "./Header";
import Loading from "./Loading";
import { Notification } from "./models/model";
import NotificationComponent from "./Notification";
import { RootReducer } from "./reducers/goldPrice";

interface LayoutProps {
    children: ReactNode;
}

const Wrapper = styled.div`
    flex: 1 0 auto;
`;

function Layout(props: LayoutProps) {
    const isLoading = useSelector<RootReducer, boolean>((state) => state.goldPrice.isLoading);
    const notification = useSelector<RootReducer, Notification>(
        (state) => state.goldPrice.notification
    );

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
