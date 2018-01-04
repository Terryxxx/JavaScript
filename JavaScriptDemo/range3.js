/**
 * Created Date: Tuesday December 26th 2017
 * Author: Terry Xu
 * -----
 * Last Modified:
 * Modified By:
 */
function defineClass(constructor,
                     methods,
                     statics){
                         if(methods) extend(constructor.prototype, methods);
                         if(statics) extend(constructor, statics);
                         return constructor;
                     }

var simpleRange = defineClass(function(f,t) {this.f = f; this.t = t; },
                              {
                                  includes: function(x){ return this.f <= x && x <= this.t; },
                                  toString: function(){ return  this.f + "..." + this.t; }
                              },
                              {
                                  upto: function(t){ return new simpleRange(o, t);}
                              });