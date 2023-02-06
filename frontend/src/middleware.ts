import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
	const authenticationToken = request.cookies.get(
		`${process.env.NEXT_PUBLIC_LOCALSTORAGE_PREFIX_KEY ?? ''}-token`,
	)?.value;
	console.log(authenticationToken);
	if (!authenticationToken) {
		return NextResponse.redirect(new URL('/login', request.url));
	}
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|image|favicon.ico|login).*)'],
};
