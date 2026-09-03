import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, locales } from "./i18n/config";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Пропускаємо статичні файли з папки public
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.match(/\.(jpg|jpeg|png|gif|svg|webp|ico|json|pdf)$/i)
  ) {
    return NextResponse.next();
  }

  // Отримуємо мову з cookies
  //   const savedLocale = request.cookies.get("preferredLocale")?.value;

  // Перевіряємо, чи шлях вже містить локаль
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Якщо шлях не містить локаль
  if (pathnameIsMissingLocale) {
    // Використовуємо збережену мову, якщо є, інакше дефолтну
    const locale = defaultLocale;

    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - Static files are handled in the middleware function itself
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
