import { CircularProgress } from "@material-ui/core";
import React from "react";

function Loading() {
    const [isShow, setIsShow] = React.useState(false);

    React.useEffect(() => {
        const timeout = setTimeout(() => setIsShow(true), 1000);
        return () => clearTimeout(timeout);
    });

    function render() {
        return (
            <div>
                {isShow ? (
                    <>
                        <CircularProgress />
                        <div>Loading...</div>
                    </>
                ) : (
                    <span>test</span>
                )}
            </div>
        );
    }
    return render();
}

export default Loading;
