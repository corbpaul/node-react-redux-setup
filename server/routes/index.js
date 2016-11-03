// ROUTES
// ==============================================

export default [
    {
        path: '/',
        method: 'GET',
        handler: (request, reply) => reply.view('default')
    }
];
