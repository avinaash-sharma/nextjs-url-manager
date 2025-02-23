import { NextResponse } from "next/server";
// import { getAllUrls } from '@/actions/url-operations'

export async function middleware(req) {
    console.log("🚀 ~ middleware ~ req:", req)
    let redirects = [];
    const { pathname } = req.nextUrl;

    console.log("🚀 ~ middleware ~ pathname:", pathname);

    try {
        // Fetching the redirects using the action (getAllUrls)
        // const res = await fetch('https://dummyjson.com/posts/1');
        // const result = await res.json();
        // const result = await getAllUrls();
        // redirects = result;
        // console.log("🚀 ~ middleware ~ result:", result)

        // Find the matching redirect based on the original path
        // const redirect = redirects.find(r => r.originalPath === pathname);

        // if (redirects) {
        // Perform the redirect if a matching redirect path is found
        // const url = req.nextUrl.clone();
        // url.pathname = redirect.redirectPath;
        // return NextResponse.redirect(new URL(redirect.redirectPath, req.nextUrl.origin)) // 308 preserves the request method
        // return NextResponse.redirect(new URL('/about', '/about-us')) // 308 preserves the request method
        if (req.nextUrl.pathname === '/about') {
            return NextResponse.redirect(new URL('/about-us', req.nextUrl))
        }
        else if (req.nextUrl.pathname === '/contact')
            return NextResponse.redirect(new URL('/contact-us', req.nextUrl))
        else {
            return NextResponse.next();
        }


        // If no redirect matches, continue to the next handler
        // return NextResponse.next();
    } catch (e) {
        console.error('Error in middleware:', e);
        return NextResponse.next();
    }
}

// Apply this middleware to all routes
export const config = {
    matcher: "/:path*", // Apply to all paths
};
