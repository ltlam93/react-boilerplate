
// The top-level (parent) route
export default {
  path: '/',
  //Keep in mind, routes are evaluated in order
  children: [
    require('./Book/App').default,

    // Wildcard routes, e.g. { path: '*', ... } (must go last)
    require('./Pages/NotFound').default,
  ],
  async action({next, api}) {
    const viewer = await api.fetchQuery(graphql`
      query Root_Query {
        viewer {
          ...Book_viewer
        }
      }
    `);
    // Excute each child route until one of them return the result
    const child = await next();

    // Provide default values for title, description, etc.
    child.title = `${child.title || 'Untitled Page'} - www.shippo.vn`;
    child.description = child.description || '';
    return child;
  },
}