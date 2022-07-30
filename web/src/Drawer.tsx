import styled from "@emotion/styled";
import {
    Description as DescriptionIcon,
    GitHub as GitHubIcon,
    HomeRounded as HomeRoundedIcon,
    LocalCafe as LocalCafeIcon,
    Policy as PolicyIcon,
} from "@mui/icons-material";
import { Drawer as DrawerMui, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";

import React from "react";
import { useNavigate } from "react-router-dom";

interface DrawerProps {
    onClose: () => void;
    open: boolean;
}

const Root = styled.div`
    width: 300px;
`;

function Drawer(props: DrawerProps) {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const onCloseHandler = () => {
        setOpen(false);
        props.onClose();
    };
    const onMenuClickHandler = (action: () => void) => {
        action();
        setOpen(false);
        onCloseHandler();
    };
    const githubOnClick = () => {
        onMenuClickHandler(() => {
            window.open("https://github.com/oat9002/GoldPriceTracking", "_blank");
        });
    };

    const donateOnClick = () => {
        onMenuClickHandler(() => {
            window.open("https://www.buymeacoffee.com/oatto", "_blank");
        });
    };

    const homeOnClick = () => {
        onMenuClickHandler(() => {
            navigate("/");
        });
    };

    const termsAndConditionOnClick = () => {
        onMenuClickHandler(() => {
            navigate("/termsAndCondition");
        });
    };

    const privacyPolicyOnClick = () => {
        onMenuClickHandler(() => {
            navigate("/privacyPolicy");
        });
    };

    React.useEffect(() => {
        setOpen(props.open);
    }, [props.open]);

    const list = () => (
        <Root role="presentation" onClick={() => setOpen(false)} onKeyDown={() => setOpen(false)}>
            <List>
                <ListItem button onClick={homeOnClick}>
                    <ListItemIcon>
                        <HomeRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button onClick={githubOnClick}>
                    <ListItemIcon>
                        <GitHubIcon />
                    </ListItemIcon>
                    <ListItemText primary="Github" />
                </ListItem>
                <ListItem button onClick={donateOnClick}>
                    <ListItemIcon>
                        <LocalCafeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Buy me a coffee" />
                </ListItem>
                <ListItem button onClick={termsAndConditionOnClick}>
                    <ListItemIcon>
                        <DescriptionIcon />
                    </ListItemIcon>
                    <ListItemText primary="Terms and Condition" />
                </ListItem>
                <ListItem button onClick={privacyPolicyOnClick}>
                    <ListItemIcon>
                        <PolicyIcon />
                    </ListItemIcon>
                    <ListItemText primary="Privacy policy" />
                </ListItem>
            </List>
        </Root>
    );

    return (
        <DrawerMui anchor="right" open={open} onClose={onCloseHandler}>
            {list()}
        </DrawerMui>
    );
}

export default Drawer;
