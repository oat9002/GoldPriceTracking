import TableChartIcon from "@mui/icons-material/TableChart";
import { AppBar, Button, Container, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";

function Header() {
    return (
        <AppBar position="static" elevation={0}>
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <Button
                        component={Link}
                        to="/"
                        color="inherit"
                        startIcon={<TableChartIcon />}
                        sx={{ typography: "h6", textTransform: "none" }}
                    >
                        GoldPrice
                    </Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;
