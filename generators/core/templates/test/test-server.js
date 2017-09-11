var expect = require('chai').expect;
var http = require('http');

// Below code demonstrates using various methods of testing
describe('Testing Server', function() {

  before(function(done){
    require(process.cwd() + '/server/server');
    setTimeout(done, 5000); // Waiting 5 seconds for server to start
    this.timeout(10000);
  });
<% if(typeof spec === 'undefined' || spec.applicationType !== 'MS'){ %>
  it('Public endpoint returns "Hello!"', function(done){
    var responseString = '';

    var options = {
      host: 'localhost',
      port: process.env.PORT || 3000,
      path: '/'
    };

    var callback = function(response){
      response.on('data', function (chunk) {
        responseString += chunk;
      });

      response.on('end', function () {
        expect(responseString).to.include('Hello');
        done();
      });
    };

    http.request(options, callback).end();
  });
<% } %>
  it('Health endpoint shows status up', function(done){
    var responseString = '';

    var options = {
      host: 'localhost',
      port: process.env.PORT || 3000,
      path: '/health'
    };

    var callback = function(response){
      response.on('data', function (chunk) {
        responseString += chunk;
      });

      response.on('end', function () {
        expect(responseString).to.equal('{"status":"UP"}');
        done();
      });
    };

    http.request(options, callback).end();
  });
});
