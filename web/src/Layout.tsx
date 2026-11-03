import { Box } from "@mui/material";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import Header from "./Header";
import Footer from "./Footer";
import { Notification } from "./models/model";
import NotificationComponent from "./Notification";
import { RootReducer } from "./reducers/goldPrice";

interface LayoutProps {
    children: ReactNode;
}

function Layout(props: LayoutProps) {
    const notification = useSelector<RootReducer, Notification>(
        (state) => state.goldPrice.notification
    );

    return (
        <>
            <Box sx={{ flex: "1 0 auto" }}>
                <Header />
                <main>{props.children}</main>
            </Box>
            <Footer />
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
