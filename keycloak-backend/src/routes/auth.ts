import { map, redirect } from 'navi';

export function withAuthentication(matcher: any) {
  return map((request: any, context: any) =>
    context.isAuthenticated
      ? matcher
      : redirect('/login?redirectTo=' + encodeURIComponent(request.mountpath + request.search))
  );
}