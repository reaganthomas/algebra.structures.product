var assert = require('assert');
var laws = require('algebra.laws');
var Product = require('../lib');

function makeProduct(a)     { return new Product(a); }
function makeListProduct(a) { return new Product([a]); }

describe('Product', function() {
  describe('Semigroup', function() {
    it('1. Associativity', function() { laws.semigroup.associativity(makeListProduct).asTest()(); });
  });

  describe('Monoid', function() {
    it('1. Left Identity',  function() { laws.monoid.leftIdentity(makeProduct).asTest()(); });
    it('2. Right Identity', function() { laws.monoid.rightIdentity(makeProduct).asTest()(); });
  });

  describe('empty', function() {
    it('should create a Product(1)', function() {
      var product = makeProduct(10);
      var product2 = product.empty();
      assert.equal(product2.inspect(), 'Product(1)');
    });
  });

  describe('concat', function() {
    it('should concat products containing arrays', function() {
      var product = makeProduct([-1,2,1]);
      var product2 = makeProduct([2,3,4]);
      assert.equal(product.concat(product2).inspect(), 'Product(-48)');
    });

    it('should find product of products containing single values', function() {
      var product = makeProduct(13);
      var product2 = makeProduct(-2);
      assert.equal(product.concat(product2).inspect(), 'Product(-26)');
    });
  });

  describe('inspect', function() {
    it('should show value of number', function() {
      var product = makeProduct(2);
      assert.equal(product.inspect(), 'Product(2)');
    });

    it('should show value of productized array', function() {
      var product = makeProduct([4,2,3]);
      assert.equal(product.inspect(), 'Product(24)');
    });
  });

  describe('isEqual', function() {
    it('should be true when products are equal', function() {
      var product = makeProduct(2);
      var product2 = makeProduct(2);
      assert.equal(product.isEqual(product2), true);
    });

    it('should be false when products are different', function() {
      var product = makeProduct(10);
      var product2 = makeProduct(11);
      assert.equal(product.isEqual(product2), false);
    });

    it('should be true for equal arrays', function() {
      var product = makeProduct([1,2,3]);
      var product2 = makeProduct([1,2,3]);
      assert.equal(product.isEqual(product2), true);
    });

    it('should be true for equal array and value', function() {
      var product = makeProduct([4,2,3]);
      var product2 = makeProduct(24);
      assert.equal(product.isEqual(product2), true);
    });
  });
});
