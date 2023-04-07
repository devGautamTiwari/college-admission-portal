export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const authUrls = ["/signin", "/signup"];
const protectedUrls = ["/dashboard"];
const defaultAuth = "/signin";
const defaultAfterAuth = "/dashboard";

export async function middleware(req: NextRequest) {
    if (authUrls.includes(req.nextUrl.pathname)) {
        const afterAuth = req.nextUrl.clone();
        afterAuth.pathname =
            (req.nextUrl.searchParams.get("callbackUrl") as string) ??
            defaultAfterAuth;
        const session = await getToken({
            req,
            secret: process.env.NEXTAUTH_SECRET,
            secureCookie: process.env.NODE_ENV === "production",
        });
        afterAuth.searchParams.delete("callbackUrl");
        console.log(session, !!session);
        if (!!session) return NextResponse.redirect(afterAuth);
    }
    // when the url is a protected url
    else if (protectedUrls.includes(req.nextUrl.pathname)) {
        const auth = req.nextUrl.clone();
        auth.pathname = defaultAuth;
        const session = await getToken({
            req,
            secret: process.env.NEXTAUTH_SECRET,
            secureCookie: process.env.NODE_ENV === "production",
        });

        const callbackUrl = `${req.nextUrl.pathname}`;
        auth.searchParams.set("callbackUrl", callbackUrl);

        if (!session) return NextResponse.redirect(auth);
    }
}

// export const config = { matcher: protectedUrls };
