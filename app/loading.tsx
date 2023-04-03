import Image from "next/image";

export default function Loading() {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "fixed",
                inset: "0px",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
            }}
        >
            <Image
                src={require("/public/static/images/saitm-logo.png").default}
                alt="SAITM"
                width={180}
                height={156}
            />
            <Image
                src={require("/public/static/images/hourglass.svg").default}
                alt="..."
                style={{
                    padding: "1em",
                    animation: "rotate infinite 3s ease-in-out",
                }}
                width={100}
                height={100}
            />
            <span>Loading...</span>
        </div>
    );
}
