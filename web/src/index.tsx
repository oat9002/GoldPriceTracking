import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./libs/mui";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import store from "./store";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
        </ThemeProvider>
    </Provider>
);
