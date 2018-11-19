/**
 *  通过自定义 Class 实现继承
 *  @ref https://gist.github.com/hayeah/93b26341e2d37cd7879f
 *  @ref https://gist.github.com/hayeah/84c39ebd33f52720f1eb
 * sepc:
 *  @see https://github.com/hayeah/js-classy-spec
 *  @see https://github.com/sikeio/js-classy-spec
 *
 * video:
 *  @see https://www.youtube.com/watch?v=8e5vUWmPkuA
 *
 */
var CTOR_NAME = 'initialize';

var extend = function(child, parent) {
  if(typeof parent === 'undefined') {
    parent = Object;
  }
  child.__super__ = parent;
  child.prototype.__proto__ = parent.prototype;
  var currentClass = child;
  child.prototype.super = function(methodName) {
    var args = [].splice.call(arguments, 1);
    currentClass = currentClass.__super__;
    var result = currentClass.prototype[methodName].apply(this, args);
    currentClass = child;
    return result;
  }
}

var Class = function(properties, parent) {
  function ctor() {
    if(properties.hasOwnProperty(CTOR_NAME)) {
      properties[CTOR_NAME].apply(this, arguments);
    }
  }

  for(var key in properties) {
    if(!properties.hasOwnProperty(key)){
      continue;
    }
    if(key === CTOR_NAME) {
      continue;
    }
    ctor.prototype[key] = properties[key];
  }

  extend(ctor, parent);
  return ctor;
};

module.exports = Class;