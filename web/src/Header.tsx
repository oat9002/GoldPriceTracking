import styled from "@emotion/styled";
import MenuIcon from "@mui/icons-material/Menu";
import TableChartIcon from "@mui/icons-material/TableChart";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Drawer from "./Drawer";
import { theme } from "./libs/mui";

const Root = styled.div`
    flex-grow: 1;
`;
const Title = styled.div`
    flex-grow: 1;
    padding-left: ${theme.spacing(1)};
    cursor: pointer;
`;

function Header() {
    const [openDrawer, setOpenDrawer] = React.useState(false);
    const navigate = useNavigate();
    const goToHome = () => navigate("/");

    return (
        <Root>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h4" onClick={goToHome} style={{ cursor: "pointer" }}>
                        GoldPrice
                    </Typography>
                    <Title onClick={goToHome}>
                        <TableChartIcon fontSize="large" />
                    </Title>
                    <IconButton color="inherit" onClick={() => setOpenDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)} />
        </Root>
    );
}

export default Header;
