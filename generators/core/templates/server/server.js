require('appmetrics').monitor();
const appName = require('./../package').name;
const express = require('express');
const log4js = require('log4js');
const localConfig = require('./config/local.json');

const logger = log4js.getLogger(appName);
const app = express();
require('./services/index')(app);
require('./routers/index')(app);

// Add your code here

const port = process.env.PORT || localConfig.port;
app.listen(port, function(){
	logger.info(`<%= bluemix.name %> listening on http://localhost:${port}`);
	<% if(typeof spec !== 'undefined' && spec.applicationType === 'MS'){ %>
	logger.info(`OpenAPI (Swagger) spec is available at http://localhost:${port}/swagger/api`);
	logger.info(`Swagger UI is available at http://localhost:${port}/explorer`);
	<% } %>
});
