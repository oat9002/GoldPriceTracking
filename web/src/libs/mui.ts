import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    typography: {
        h5: { fontWeight: 600 },
        h6: { fontWeight: 600 },
        button: { textTransform: "none" },
    },
    components: {
        MuiPaper: { defaultProps: { elevation: 0 } },
        MuiButton: { defaultProps: { disableElevation: true } },
        MuiIconButton: { styleOverrides: { root: { minWidth: 44, minHeight: 44 } } },
    },
});
