const server = require('./server');
const router = require('./router');
const requestHandler = require('./requestHandle');

const handle = {};
handle['/'] = requestHandler.start;
handle['/start'] = requestHandler.start;
handle['/upload'] = requestHandler.upload;
handle['/show'] = requestHandler.show;

server.start(router.route, handle);