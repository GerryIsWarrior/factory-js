!function (n, e) {
  for (var t in e) n[t] = e[t]
}(exports, function (n) {
  var e = {};

  function t(r) {
    if (e[r]) return e[r].exports;
    var o = e[r] = {i: r, l: !1, exports: {}};
    return n[r].call(o.exports, o, o.exports, t), o.l = !0, o.exports
  }

  return t.m = n, t.c = e, t.d = function (n, e, r) {
    t.o(n, e) || Object.defineProperty(n, e, {enumerable: !0, get: r})
  }, t.r = function (n) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(n, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(n, "__esModule", {value: !0})
  }, t.t = function (n, e) {
    if (1 & e && (n = t(n)), 8 & e) return n;
    if (4 & e && "object" == typeof n && n && n.__esModule) return n;
    var r = Object.create(null);
    if (t.r(r), Object.defineProperty(r, "default", {
      enumerable: !0,
      value: n
    }), 2 & e && "string" != typeof n) for (var o in n) t.d(r, o, function (e) {
      return n[e]
    }.bind(null, o));
    return r
  }, t.n = function (n) {
    var e = n && n.__esModule ? function () {
      return n.default
    } : function () {
      return n
    };
    return t.d(e, "a", e), e
  }, t.o = function (n, e) {
    return Object.prototype.hasOwnProperty.call(n, e)
  }, t.p = "", t(t.s = 2)
}([function (n, e) {
  n.exports = function (n, e) {
    if (!(n instanceof e)) throw new TypeError("Cannot call a class as a function")
  }
}, function (n, e) {
  function t(n, e) {
    for (var t = 0; t < e.length; t++) {
      var r = e[t];
      r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(n, r.key, r)
    }
  }

  n.exports = function (n, e, r) {
    return e && t(n.prototype, e), r && t(n, r), n
  }
}, function (n, e, t) {
  "use strict";
  t.r(e);
  var r = t(0), o = t.n(r), i = t(1), a = t.n(i), u = function () {
    function n() {
      o()(this, n)
    }

    return a()(n, [{
      key: "setBasics", value: function (n) {
        var e = this;
        n.forEach(function (n) {
          e[n.name] = n.assembly
        })
      }
    }, {
      key: "machiningBasics", value: function (n) {
        var e = this, t = {};
        n ? Array.isArray(n) ? n.forEach(function (n) {
          Object.assign(t, e[n])
        }) : Object.assign(t, this[n]) : Object.keys(this).forEach(function (n) {
          Object.assign(t, e[n])
        })
      }
    }]), n
  }();
  var c = function () {
    function n() {
      o()(this, n)
    }

    return a()(n, [{
      key: "setPackage", value: function (n, e) {
        var t = function (n) {
          for (var e in n) this[e] = n[e].bind(this)
        };
        return t.prototype = e, function (n, e) {
          var t = new n(e.assembly), r = {};
          for (var o in t) e.through ? t.hasOwnProperty(o) && (r[o] = t[o]) : r[o] = t[o];
          return r
        }(t, n)
      }
    }]), n
  }();
  t.d(e, "injection", function () {
    return y
  }), t.d(e, "getMateriel", function () {
    return p
  });
  var f = new u, s = new c, l = {}, y = function (n) {
    f.setBasics(n.atom), n.package.forEach(function (n) {
      var e = f.machiningBasics(n.extends);
      l[n.name] = s.setPackage(n, e)
    })
  }, p = function (n) {
    var e = {};
    if (n) {
      if (Array.isArray(n)) return n.forEach(function (n) {
        e[n] = l[n]
      });
      e = l[n]
    } else e = l;
    return l
  }
}]));
