import Image from "next/image";

export default function LoadingComponent() {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "fixed",
                inset: "0px",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                zIndex: 9999,
            }}
        >
            <Image
                src={require("/public/static/images/saitm-logo.png").default}
                alt="SAITM"
                width={180}
                height={156}
            />
            <svg
                style={{
                    padding: "1em",
                    animation: "rotate infinite 3s ease-in-out",
                }}
                width={90}
                height={90}
                viewBox="0 0 58 58"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M27.1875 34.4375H30.8125V38.0625H27.1875V34.4375ZM27.1875 41.6875H30.8125V45.3125H27.1875V41.6875Z"
                    fill="#B3B3B3"
                />
                <path
                    d="M41.6875 21.1519V7.25H47.125V3.625H10.875V7.25H16.3125V21.1519C16.3125 21.9362 16.5669 22.6994 17.0375 23.3269L21.2969 29L17.0375 34.6731C16.5669 35.3006 16.3125 36.0638 16.3125 36.8481V50.75H10.875V54.375H47.125V50.75H41.6875V36.8481C41.6875 36.0638 41.4331 35.3006 40.9625 34.6731L36.7031 29L40.9625 23.3269C41.4331 22.6994 41.6875 21.9362 41.6875 21.1519ZM38.0625 7.25V19.9375H19.9375V7.25H38.0625ZM38.0625 36.8481V50.75H19.9375V36.8481L25.8281 29L21.75 23.5625H36.25L32.1719 29L38.0625 36.8481Z"
                    fill="#B3B3B3"
                />
            </svg>

            <span>Loading...</span>
        </div>
    );
}
