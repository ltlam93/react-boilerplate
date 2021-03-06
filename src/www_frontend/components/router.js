// The top-level (parent) route
export default {
  path: '/',
  //Keep in mind, routes are evaluated in order
  children: [
    require('./Book').default,
    require('./BookList').default,

    // Wildcard routes, e.g. { path: '*', ... } (must go last)
    require('shared/Pages/NotFound').default,
  ],
  async action({next, api}) {
    // Excute each child route until one of them return the result
    const child = await next();
    return child;
  },
}