// import other routes
const editorRoutes = require('./edit');

const appRouter = (app, fs) => {

    // default route
    app.get('/', (req, res) => {
        res.send('welcome to the development api-server');
    });

    // // other routes
    editorRoutes(app, fs);

};

module.exports = appRouter;