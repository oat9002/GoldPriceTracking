import React from "react";

function Donation() {
    React.useEffect(() => {
        const script = document.createElement("script");

        script.src = "https://cdn.omise.co/omise.js";
        script.setAttribute("data-key", "pkey_test_5l9ewesw6om0qxdj448");
        script.setAttribute("data-amount", "1234");
        script.setAttribute("data-currency", "THB");
        script.setAttribute("data-default-payment-method", "credit_card");
        script.setAttribute(
            "data-image",
            "https://cdn.omise.co/assets/dashboard/images/omise-logo.png"
        );
        script.setAttribute("data-button-label", "Pay now");
        script.setAttribute("data-frame-label", "Omise page");
        script.setAttribute("data-submit-label", "Checkout");
        script.async = true;
        console.log(script);

        document.getElementById("omise").appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <form id="omise" method="POST" action="http://localhost:4000/donate" />
    );
}

export default Donation;
