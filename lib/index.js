(function() {
  var deepEqual = require('deep-equal');
  var Constructor = require('algebra.structures.constructor').Constructor;

  function inspect(x) {
    if(x === null || x === undefined) return 'null';
    return x.inspect ? x.inspect() : x;
  }

  /**
    Product

    Product is a Monoid, making it also a Semigroup.
    Product implements the empty and concat methods to adhere
    to the Monoid and Semigroup algebras.

    Product only works for numbers or arrays of numbers. Should
    any other values be used the behavior is unspecified.
  **/
  var Product = Constructor(function(value) {
    if(value instanceof Array) {
      this.value = value.reduce(function(acc, val) {
        return acc * val;
      }, 1);
    } else {
      this.value = value;
    }
  });

  /**
    Product.empty

    Return an "empty product", otherwise known as 1.
  **/
  Product.prototype.empty = function() { return Product(1); };

  /**
    Product.concat

    Returns the product of two Products.
  **/
  Product.prototype.concat = function(product2) {
    return Product(this.value * product2.value);
  };

  /**
    Product.inspect

    Return the string representation of a Product.
  **/
  Product.prototype.inspect = function() { return 'Product(' + inspect(this.value) + ')'; };

  /**
    Product.isEqual

    Compares two Products for equality.
  **/
  Product.prototype.isEqual = function(product2) { return deepEqual(this.value, product2.value); };

  module.exports = Product;
})();
