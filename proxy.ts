import { auth } from '@/lib/auth/server'

export default auth.middleware({
  loginUrl: '/auth/sign-in',
})

export const config = {
  matcher: ['/dashboard/:path*', '/subjects/:path*', '/uploads/:path*', '/notes/:path*', '/chat/:path*', '/profile/:path*'],
}
