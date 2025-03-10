import { NextResponse, NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const password = req.headers.get('Authorization');

  // ここでパスワードを指定（環境変数推奨）
  const correctPassword = process.env.APP_PASSWORD || 'secret';

  // パスワードの確認（Basic認証）
  if (password !== `Basic ${btoa(`user:${correctPassword}`)}`) {
    return new NextResponse('Authentication required', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
    });
  }

  // パスワードが正しければ元のリクエストを継続
  return NextResponse.next();
}

// 全ページに適用
export const config = {
  matcher: '/:path*',
};
