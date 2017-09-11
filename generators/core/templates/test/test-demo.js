var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should();

// Below code demonstrates using various methods of testing
describe('Demonstrating testing with various assertion methods', function() {
  describe('Testing with assert', function() {
    it('Tests assert.equal', function() {
      assert.equal('a', 'a');
    });
    it('Tests assert.typeOf', function() {
      assert.typeOf('a', 'string');
    });
    it('Tests assert.lengthOf', function() {
      assert.lengthOf([1, 2, 3], 3);
      assert.lengthOf('asd', 3);
    });
  });

  describe('Testing with expect', function() {
    it('Tests type using expect', function() {
      expect('a').to.be.a('string');
    });
    it('Tests value using expect', function() {
      expect('a').to.equal('a');
    });
    it('Tests length using expect', function() {
      expect([1, 2, 3]).to.have.lengthOf(3);
      expect('asd').to.have.lengthOf(3);
    });
    it('Tests property existence and length using expect', function() {
      expect({
        arr: [1, 2, 3],
      })
        .to.have.property('arr')
        .with.lengthOf(3);
    });
  });

  describe('Testing with should', function() {
    it('Tests type using should', function() {
      'a'.should.be.a('string');
    });
    it('Tests value using should', function() {
      'a'.should.equal('a');
    });
    it('Tests length using expect', function() {
      [1, 2, 3].should.have.lengthOf(3);
      'asd'.should.have.lengthOf(3);
    });
    it('Tests property existence and length using should', function() {
      var obj = {
        arr: [1, 2, 3],
      };
      obj.should.have.property('arr').with.lengthOf(3);
    });
  });
});
