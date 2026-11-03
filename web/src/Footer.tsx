import React from "react";
import { useNavigate } from "react-router-dom";
import { Paper, Container, Button, IconButton, Box, Typography, Tooltip } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import PolicyIcon from "@mui/icons-material/Policy";
import GitHubIcon from "@mui/icons-material/GitHub";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";

const Footer: React.FC = () => {
    const navigate = useNavigate();

    const items = [
        {
            key: "terms",
            label: "Terms",
            icon: <DescriptionIcon />,
            onClick: () => navigate("/termsAndCondition"),
        },
        {
            key: "privacy",
            label: "Privacy",
            icon: <PolicyIcon />,
            onClick: () => navigate("/privacyPolicy"),
        },
        {
            key: "github",
            label: "GitHub",
            icon: <GitHubIcon />,
            onClick: () => window.open("https://github.com/oat9002/GoldPriceTracking", "_blank"),
        },
        {
            key: "donate",
            label: "Donate",
            icon: <LocalCafeIcon />,
            onClick: () => window.open("https://www.buymeacoffee.com/oatto", "_blank"),
        },
    ];

    return (
        <Paper
            component="footer"
            square
            elevation={0}
            sx={{ borderTop: 1, borderColor: "divider", py: 1.5 }}
        >
            <Container maxWidth="lg">
                <Box
                    sx={{
                        display: "flex",
                        gap: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        flexWrap: "wrap",
                    }}
                >
                    {items.map((it) => (
                        <React.Fragment key={it.key}>
                            <Tooltip title={it.label}>
                                <IconButton
                                    aria-label={it.label}
                                    color="inherit"
                                    onClick={it.onClick}
                                    sx={{ display: { xs: "inline-flex", sm: "none" } }}
                                >
                                    {it.icon}
                                </IconButton>
                            </Tooltip>
                            <Button
                                color="inherit"
                                startIcon={it.icon}
                                onClick={it.onClick}
                                sx={{ display: { xs: "none", sm: "inline-flex" } }}
                            >
                                {it.label}
                            </Button>
                        </React.Fragment>
                    ))}
                </Box>
                <Box sx={{ textAlign: "center", mt: 0.5 }}>
                    <Typography variant="caption" color="text.secondary">
                        © {new Date().getFullYear()} GoldPrice
                    </Typography>
                </Box>
            </Container>
        </Paper>
    );
};

export default Footer;
