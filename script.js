var defs = {

  teamColor: ["#ff4444", "#00aaff"],

  frozenSprite: [193, 86, 11, 19],

  buttons: {
    "fighter": [4, 345, 64, 64],
    "speed": [132, 345, 64, 64],
    "life": [68, 345, 64, 64],
    "damage": [196, 345, 64, 64]
  },

  ships: {

    "fighter": {

      preference: ["small"],
      cooldown: 0.5,
      damage: 1,
      hp: 10,
      sprite: [407, 18, 32, 32],
      price: 1,
      speed: 80

    },

    "freelancer": {

      cooldown: 0.5,
      damage: 1,
      hp: 10,
      sprite: [367, 59, 31, 32],
      speed: 80

    },


    "creep1": {

      preference: ["big"],
      damage: 2,
      cooldown: 2,
      hp: 4,
      sprite: [444, 23, 22, 21],
      price: 5,
      speed: 60

    },

    "creep2": {

      preference: ["big"],
      damage: 2,
      cooldown: 2,
      hp: 10,
      sprite: [471, 23, 32, 23],
      price: 5,
      speed: 80

    },

    "creep3": {

      preference: ["big"],
      damage: 4,
      cooldown: 2,
      hp: 30,
      sprite: [503, 19, 32, 29],
      price: 5,
      speed: 50

    },

    "creep4": {

      preference: ["big"],
      damage: 6,
      cooldown: 2,
      hp: 50,
      sprite: [535, 18, 32, 32],
      price: 5,
      speed: 50

    },

    "boss": {

      damage: 10,
      cooldown: 2,
      hp: 500,
      sprite: [456, 53, 64, 64],
      speed: 32,
      boss: true

    }

  },

  tooltips: {

    "fighter": "build a fighter",
    "speed": "upgrade fighters speed",
    "life": "upgrade fighters life",
    "damage": "upgrade fighters damage"

  },

  bonuses: {
    shield: "asteroids shield",
    laser: "cursor laser",
    magnet: "coin magnet"
  },


  downloadLinks: {

    "ffdev": ["Learn more about Performance Tools in Developer Edition", "https://hacks.mozilla.org/?utm_source=codepen&utm_medium=referral&utm_campaign=firefox-developer-game&utm_content=learn-perf-tools"],
    "default": ["Get Firefox Developer Edition to try out the new performance tools", "https://www.mozilla.org/firefox/developer/?utm_source=codepen&utm_medium=referral&utm_campaign=firefox-developer-game&utm_content=game-promo"]

  }

};
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new
Date();a=s.createElement(o),

m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-49796218-26', 'auto');
ga('send', 'pageview');
var Utils = {

  extend: function() {
    for (var i = 1; i < arguments.length; i++) {
      for (var j in arguments[i]) {
        arguments[0][j] = arguments[i][j];
      }
    }

    return arguments[0];
  },

  distance: function(a, b) {

    var dx = a.x - b.x;
    var dy = a.y - b.y;

    return Math.sqrt(dx * dx + dy * dy);

  },

  nearest: function(from, entities) {

    var min = -1;
    var result = null;

    for (var i = 0; i < entities.length; i++) {

      var to = entities[i];

      if (from === to) continue;

      var distance = this.distance(from, to);

      if (distance < min || min < 0) {
        min = distance;
        result = to;
      }

    }

    return result;
  },

  circWrap: function(val) {

    return this.wrap(val, 0, Math.PI * 2);

  },

  wrap: function(value, min, max) {

    if (value < min) return max + (value % max);
    if (value >= max) return value % max;
    return value;

  },

  wrapTo: function(value, target, max, step) {

    if (value === target) return target;

    var result = value;

    var d = this.wrappedDistance(value, target, max);

    if (Math.abs(d) < step) return target;

    result += (d < 0 ? -1 : 1) * step;

    if (result > max) {
      result = result - max;
    } else if (result < 0) {
      result = max + result;
    }

    return result;

  },

  circWrapTo: function(value, target, step) {

    return this.wrapTo(value, target, Math.PI * 2, step);

  },

  circDistance: function(a, b) {

    return this.wrappedDistance(a, b, Math.PI * 2);

  },

  wrappedDistance: function(a, b, max) {

    if (a === b) return 0;
    else if (a < b) {
      var l = -a - max + b;
      var r = b - a;
    } else {
      var l = b - a;
      var r = max - a + b;
    }

    if (Math.abs(l) > Math.abs(r)) return r;
    else return l;

  },

  random: function(a, b) {

    if (a === undefined) {

      return Math.random();

    } else if (b !== undefined) {

      return Math.floor(a + Math.random() * Math.abs(b - a + 1));

    } else {

      if (a instanceof Array) return a[(a.length + 1) * Math.random() - 1 | 0];
      else {
        return a[this.random(Object.keys(a))];
      }

    }

  },

  sincos: function(angle, radius) {

    if (arguments.length === 1) {
      radius = angle;
      angle = Math.random() * 6.28;
    }

    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius
    };
  },

  ground: function(num, threshold) {

    return (num / threshold | 0) * threshold;

  },

  shuffle: function(o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  },

  sign: function(value) {

    return value / Math.abs(value);

  },

  moveTo: function(value, target, step) {

    if (value < target) {
      value += step;
      if (value > target) value = target;
    }

    if (value > target) {
      value -= step;
      if (value < target) value = target;
    }

    return value;

  },

  interval: function(key, interval, object) {

    if (!object.throttles) object.throttles = {};
    if (!object.throttles[key]) object.throttles[key] = object.lifetime - interval;

    if (object.lifetime - object.throttles[key] >= interval) {
      object.throttles[key] = object.lifetime;
      return true;
    } else return false;

  },

  moveInDirection: function(direction, value) {

    this.x += Math.cos(direction) * value;
    this.y += Math.sin(direction) * value;

  },

  osc: function(time, period) {

    return Math.sin(Math.PI * (time % period / period));

  },

  filter: function(array, test) {

    var result = [];

    for (var i = 0; i < array.length; i++) {
      if (test(array[i])) result.push(array[i]);
    }

    return result;

  },

  rectInRect: function(r1x, r1y, r1w, r1h, r2x, r2y, r2w, r2h) {
    return !(r2x > r1x + r1w ||
      r2x + r2w < r1x ||
      r2y > r1y + r1h ||
      r2y + r2h < r1y);
  }



};
/* file: license.txt */

/*

  PlaygroundJS r4

  http://playgroundjs.com

  (c) 2012-2015 http://rezoner.net

  Playground may be freely distributed under the MIT license.

  latest major changes:

  r4

  + tweens with events
  + context argument for events

  r3

  + pointer = mouse + touch

*/


/* file: src/lib/Ease.js */

/*

  Ease 1.0

  http://canvasquery.com

  (c) 2015 by Rezoner - http://rezoner.net

  `ease` may be freely distributed under the MIT license.

*/

(function() {

  var ease = function(progress, easing) {

    if (typeof ease.cache[easing] === "function") {

      return ease.cache[easing](progress);

    } else {

      return ease.spline(progress, easing || ease.defaultEasing);

    }

  };

  var extend = function() {
    for (var i = 1; i < arguments.length; i++) {
      for (var j in arguments[i]) {
        arguments[0][j] = arguments[i][j];
      }
    }

    return arguments[0];
  };

  extend(ease, {

    defaultEasing: "016",

    cache: {

      linear: function(t) {
        return t
      },

      inQuad: function(t) {
        return t * t
      },
      outQuad: function(t) {
        return t * (2 - t)
      },
      inOutQuad: function(t) {
        return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t
      },
      inCubic: function(t) {
        return t * t * t
      },
      outCubic: function(t) {
        return (--t) * t * t + 1
      },
      inOutCubic: function(t) {
        return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
      },
      inQuart: function(t) {
        return t * t * t * t
      },
      outQuart: function(t) {
        return 1 - (--t) * t * t * t
      },
      inOutQuart: function(t) {
        return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t
      },
      inQuint: function(t) {
        return t * t * t * t * t
      },
      outQuint: function(t) {
        return 1 + (--t) * t * t * t * t
      },
      inOutQuint: function(t) {
        return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t
      },
      inSine: function(t) {
        return -1 * Math.cos(t / 1 * (Math.PI * 0.5)) + 1;
      },
      outSine: function(t) {
        return Math.sin(t / 1 * (Math.PI * 0.5));
      },
      inOutSine: function(t) {
        return -1 / 2 * (Math.cos(Math.PI * t) - 1);
      },
      inExpo: function(t) {
        return (t == 0) ? 0 : Math.pow(2, 10 * (t - 1));
      },
      outExpo: function(t) {
        return (t == 1) ? 1 : (-Math.pow(2, -10 * t) + 1);
      },
      inOutExpo: function(t) {
        if (t == 0) return 0;
        if (t == 1) return 1;
        if ((t /= 1 / 2) < 1) return 1 / 2 * Math.pow(2, 10 * (t - 1));
        return 1 / 2 * (-Math.pow(2, -10 * --t) + 2);
      },
      inCirc: function(t) {
        return -1 * (Math.sqrt(1 - t * t) - 1);
      },
      outCirc: function(t) {
        return Math.sqrt(1 - (t = t - 1) * t);
      },
      inOutCirc: function(t) {
        if ((t /= 1 / 2) < 1) return -1 / 2 * (Math.sqrt(1 - t * t) - 1);
        return 1 / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1);
      },
      inElastic: function(t) {
        var s = 1.70158;
        var p = 0;
        var a = 1;
        if (t == 0) return 0;
        if (t == 1) return 1;
        if (!p) p = 0.3;
        if (a < 1) {
          a = 1;
          var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(1 / a);
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p));
      },
      outElastic: function(t) {
        var s = 1.70158;
        var p = 0;
        var a = 1;
        if (t == 0) return 0;
        if (t == 1) return 1;
        if (!p) p = 0.3;
        if (a < 1) {
          a = 1;
          var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(1 / a);
        return a * Math.pow(2, -10 * t) * Math.sin((t - s) * (2 * Math.PI) / p) + 1;
      },
      inOutElastic: function(t) {
        var s = 1.70158;
        var p = 0;
        var a = 1;
        if (t == 0) return 0;
        if ((t /= 1 / 2) == 2) return 1;
        if (!p) p = (0.3 * 1.5);
        if (a < 1) {
          a = 1;
          var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(1 / a);
        if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p));
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p) * 0.5 + 1;
      },
      inBack: function(t, s) {
        if (s == undefined) s = 1.70158;
        return 1 * t * t * ((s + 1) * t - s);
      },
      outBack: function(t, s) {
        if (s == undefined) s = 1.70158;
        return 1 * ((t = t / 1 - 1) * t * ((s + 1) * t + s) + 1);
      },
      inOutBack: function(t, s) {
        if (s == undefined) s = 1.70158;
        if ((t /= 1 / 2) < 1) return 1 / 2 * (t * t * (((s *= (1.525)) + 1) * t - s));
        return 1 / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2);
      },
      inBounce: function(t) {
        return 1 - this.outBounce(1 - t);
      },
      outBounce: function(t) {
        if ((t /= 1) < (1 / 2.75)) {
          return (7.5625 * t * t);
        } else if (t < (2 / 2.75)) {
          return (7.5625 * (t -= (1.5 / 2.75)) * t + .75);
        } else if (t < (2.5 / 2.75)) {
          return (7.5625 * (t -= (2.25 / 2.75)) * t + .9375);
        } else {
          return (7.5625 * (t -= (2.625 / 2.75)) * t + .984375);
        }
      },
      inOutBounce: function(t) {
        if (t < 1 / 2) return this.inBounce(t * 2) * 0.5;
        return this.outBounce(t * 2 - 1) * 0.5 + 0.5;
      }
    },

    translateEasing: function(key) {

      if (!this.cache[key]) {
        var array = key.split('');

        var sign = 1;
        var signed = false;

        for (var i = 0; i < array.length; i++) {

          var char = array[i];

          if (char === "-") {
            sign = -1;
            signed = true;
            array.splice(i--, 1);
          } else if (char === "+") {
            sign = 1;
            array.splice(i--, 1);
          } else array[i] = parseInt(array[i], 16) * sign;

        }

        var min = Math.min.apply(null, array);
        var max = Math.max.apply(null, array);
        var diff = max - min;
        var cache = [];
        var normalized = [];

        for (var i = 0; i < array.length; i++) {
          if (signed) {
            var diff = Math.max(Math.abs(min), Math.abs(max))
            normalized.push((array[i]) / diff);
          } else {
            var diff = max - min;
            normalized.push((array[i] - min) / diff);
          }
        }

        this.cache[key] = normalized;

      }

      return this.cache[key]

    },

    /*

      Cubic-spline interpolation by Ivan Kuckir

      http://blog.ivank.net/interpolation-with-cubic-splines.html

      With slight modifications by Morgan Herlocker

      https://github.com/morganherlocker/cubic-spline

    */

    splineK: {},
    splineX: {},
    splineY: {},

    insertIntermediateValues: function(a) {
      var result = [];
      for (var i = 0; i < a.length; i++) {
        result.push(a[i]);

        if (i < a.length - 1) result.push(a[i + 1] + (a[i] - a[i + 1]) * 0.6);
      }

      return result;
    },

    spline: function(x, key) {

      if (!this.splineK[key]) {

        var xs = [];
        var ys = this.translateEasing(key);

        // ys = this.insertIntermediateValues(ys);

        if (!ys.length) return 0;

        for (var i = 0; i < ys.length; i++) xs.push(i * (1 / (ys.length - 1)));

        var ks = xs.map(function() {
          return 0
        });

        ks = this.getNaturalKs(xs, ys, ks);

        this.splineX[key] = xs;
        this.splineY[key] = ys;
        this.splineK[key] = ks;

      }

      if (x > 1) return this.splineY[key][this.splineY[key].length - 1];

      var ks = this.splineK[key];
      var xs = this.splineX[key];
      var ys = this.splineY[key];

      var i = 1;

      while (xs[i] < x) i++;

      var t = (x - xs[i - 1]) / (xs[i] - xs[i - 1]);
      var a = ks[i - 1] * (xs[i] - xs[i - 1]) - (ys[i] - ys[i - 1]);
      var b = -ks[i] * (xs[i] - xs[i - 1]) + (ys[i] - ys[i - 1]);
      var q = (1 - t) * ys[i - 1] + t * ys[i] + t * (1 - t) * (a * (1 - t) + b * t);

      /*
      var py = ys[i - 2];
      var cy = ys[i - 1];
      var ny = (i < ys.length - 1) ? ys[i] : ys[i - 1];

      if (q > ny) {
        var diff = (q - py);
        //q = py + diff;

      }

    if (cy === ny && cy === py) q = py;
    */


      return q;
    },

    getNaturalKs: function(xs, ys, ks) {
      var n = xs.length - 1;
      var A = this.zerosMat(n + 1, n + 2);

      for (var i = 1; i < n; i++) // rows
      {
        A[i][i - 1] = 1 / (xs[i] - xs[i - 1]);
        A[i][i] = 2 * (1 / (xs[i] - xs[i - 1]) + 1 / (xs[i + 1] - xs[i]));
        A[i][i + 1] = 1 / (xs[i + 1] - xs[i]);
        A[i][n + 1] = 3 * ((ys[i] - ys[i - 1]) / ((xs[i] - xs[i - 1]) * (xs[i] - xs[i - 1])) + (ys[i + 1] - ys[i]) / ((xs[i + 1] - xs[i]) * (xs[i + 1] - xs[i])));
      }

      A[0][0] = 2 / (xs[1] - xs[0]);
      A[0][1] = 1 / (xs[1] - xs[0]);
      A[0][n + 1] = 3 * (ys[1] - ys[0]) / ((xs[1] - xs[0]) * (xs[1] - xs[0]));

      A[n][n - 1] = 1 / (xs[n] - xs[n - 1]);
      A[n][n] = 2 / (xs[n] - xs[n - 1]);
      A[n][n + 1] = 3 * (ys[n] - ys[n - 1]) / ((xs[n] - xs[n - 1]) * (xs[n] - xs[n - 1]));

      return this.solve(A, ks);
    },

    solve: function(A, ks) {
      var m = A.length;
      for (var k = 0; k < m; k++) // column
      {
        // pivot for column
        var i_max = 0;
        var vali = Number.NEGATIVE_INFINITY;
        for (var i = k; i < m; i++)
          if (A[i][k] > vali) {
            i_max = i;
            vali = A[i][k];
          }
        this.splineSwapRows(A, k, i_max);

        // for all rows below pivot
        for (var i = k + 1; i < m; i++) {
          for (var j = k + 1; j < m + 1; j++)
            A[i][j] = A[i][j] - A[k][j] * (A[i][k] / A[k][k]);
          A[i][k] = 0;
        }
      }
      for (var i = m - 1; i >= 0; i--) // rows = columns
      {
        var v = A[i][m] / A[i][i];
        ks[i] = v;
        for (var j = i - 1; j >= 0; j--) // rows
        {
          A[j][m] -= A[j][i] * v;
          A[j][i] = 0;
        }
      }
      return ks;
    },

    zerosMat: function(r, c) {
      var A = [];
      for (var i = 0; i < r; i++) {
        A.push([]);
        for (var j = 0; j < c; j++) A[i].push(0);
      }
      return A;
    },

    splineSwapRows: function(m, k, l) {
      var p = m[k];
      m[k] = m[l];
      m[l] = p;
    }
  });

  window.ease = ease;

})();


/* file: src/Playground.js */

PLAYGROUND = {};

function playground(args) {

  return new PLAYGROUND.Application(args);

};

/* file: src/Utils.js */

PLAYGROUND.Utils = {

  extend: function() {

    for (var i = 1; i < arguments.length; i++) {
      for (var j in arguments[i]) {
        arguments[0][j] = arguments[i][j];
      }
    }

    return arguments[0];

  },

  merge: function(a) {

    for (var i = 1; i < arguments.length; i++) {

      var b = arguments[i];

      for (var key in b) {

        var value = b[key];

        if (typeof a[key] !== "undefined") {
          if (typeof a[key] === "object") this.merge(a[key], value);
          else a[key] = value;
        } else {
          a[key] = value;
        }
      }
    }
    return a;

  },

  invoke: function(object, methodName) {

    var args = Array.prototype.slice.call(arguments, 2);

    for (var i = 0; i < object.length; i++) {
      var current = object[i];

      if (current[methodName]) current[methodName].apply(current, args);

    }

  },

  throttle: function(fn, threshold) {
    threshold || (threshold = 250);
    var last,
      deferTimer;
    return function() {
      var context = this;

      var now = +new Date,
        args = arguments;
      if (last && now < last + threshold) {
        // hold on to it
        clearTimeout(deferTimer);
        deferTimer = setTimeout(function() {
          last = now;
          fn.apply(context, args);
        }, threshold);
      } else {
        last = now;
        fn.apply(context, args);
      }
    };
  }

};

PLAYGROUND.Utils.ease = ease;


/* file: src/Events.js */

PLAYGROUND.Events = function() {

  this.listeners = {};

};

PLAYGROUND.Events.prototype = {

  on: function(event, callback, context) {

    if (typeof event === "object") {
      var result = {};
      for (var key in event) {
        result[key] = this.on(key, event[key], context)
      }
      return result;
    }

    if (!this.listeners[event]) this.listeners[event] = [];

    var listener = {
      once: false,
      callback: callback,
      context: context
    };

    this.listeners[event].push(listener);

    return listener;
  },

  once: function(event, callback, context) {

    if (typeof event === "object") {
      var result = {};
      for (var key in event) {
        result[key] = this.once(key, event[key], context)
      }
      return result;
    }

    if (!this.listeners[event]) this.listeners[event] = [];

    var listener = {
      once: true,
      callback: callback,
      context: context
    };

    this.listeners[event].push(listener);

    return listener;
  },

  off: function(event, callback) {

    for (var i = 0, len = this.listeners[event].length; i < len; i++) {
      if (this.listeners[event][i]._remove) {
        this.listeners[event].splice(i--, 1);
        len--;
      }
    }

  },

  trigger: function(event, data) {

    /* if you prefer events pipe */

    if (this.listeners["event"]) {

      for (var i = 0, len = this.listeners["event"].length; i < len; i++) {

        var listener = this.listeners["event"][i];

        listener.callback.call(listener.context || this, event, data);

      }

    }

    /* or subscribed to single event */

    if (this.listeners[event]) {
      for (var i = 0, len = this.listeners[event].length; i < len; i++) {

        var listener = this.listeners[event][i];

        listener.callback.call(listener.context || this, data);

        if (listener.once) {
          this.listeners[event].splice(i--, 1);
          len--;
        }
      }
    }

  }

};

/* file: src/States.js */

PLAYGROUND.States = function(app) {

  this.app = app;

  PLAYGROUND.Events.call(this);

  app.on("step", this.step.bind(this));

};

PLAYGROUND.States.prototype = {

  step: function(delta) {

    if (!this.next) return;

    if (this.current && this.current.locked) return;

    var state = this.next;

    if (typeof state === "function") state = new state;

    /* create state if object has never been used as a state before */

    if (!state.__created) {

      state.__created = true;

      state.app = this.app;

      this.trigger("createstate", {
        state: state
      });

      if (state.create) state.create();

    }

    /* enter new state */

    if (this.current) {
      this.trigger("leavestate", {
        prev: this.current,
        next: state,
        state: this.current
      });
    }

    this.trigger("enterstate", {
      prev: this.current,
      next: state,
      state: state
    });

    this.current = state;

    if (this.current && this.current.enter) {
      this.current.enter();
    }

    this.app.state = this.current;

    this.next = false;


  },

  set: function(state) {

    if (this.current && this.current.leave) this.current.leave();

    this.next = state;

    this.step(0);

  }


};

PLAYGROUND.Utils.extend(PLAYGROUND.States.prototype, PLAYGROUND.Events.prototype);

/* file: src/Application.js */

PLAYGROUND.Application = function(args) {

  var app = this;

  /* events */

  PLAYGROUND.Events.call(this);

  /* defaults */

  PLAYGROUND.Utils.merge(this, this.defaults, args);

  /* guess scaling mode */

  this.autoWidth = this.width ? false : true;
  this.autoHeight = this.height ? false : true;
  this.autoScale = this.scale ? false : true;

  /* get container */

  if (!this.container) this.container = document.body;

  if (this.container !== document.body) this.customContainer = true;

  if (typeof this.container === "string") this.container = document.querySelector(this.container);

  this.updateSize();

  /* events */

  // this.emitLocalEvent = this.emitLocalEvent.bind(this);
  // this.emitGlobalEvent = this.emitGlobalEvent.bind(this);

  /* states manager */

  this.states = new PLAYGROUND.States(this);
  this.states.on("event", this.emitLocalEvent, this);

  /* mouse */

  this.mouse = new PLAYGROUND.Mouse(this, this.container);
  this.mouse.on("event", this.emitGlobalEvent, this);

  /* touch */

  this.touch = new PLAYGROUND.Touch(this, this.container);
  this.touch.on("event", this.emitGlobalEvent, this);

  /* keyboard */

  this.keyboard = new PLAYGROUND.Keyboard();
  this.keyboard.on("event", this.emitGlobalEvent, this);

  /* gamepads */

  this.gamepads = new PLAYGROUND.Gamepads(this);
  this.gamepads.on("event", this.emitGlobalEvent, this);

  /* tweens */

  this.tweens = new PLAYGROUND.TweenManager(this);

  /* ease */

  this.ease = PLAYGROUND.Utils.ease;

  /* sound */

  PLAYGROUND.Sound(this);

  /* window resize */

  window.addEventListener("resize", this.handleResize.bind(this));

  /* visilibitychange */

  document.addEventListener("visibilitychange", function() {
    var hidden = document.visibilityState == 'hidden';
    app.emitGlobalEvent("visibilitychange", hidden);
  });

  /* assets containers */

  this.images = {};
  this.atlases = {};
  this.data = {};

  this.loader = new PLAYGROUND.Loader(this);

  this.loadFoo(0.25);

  /* create plugins in the same way */

  this.plugins = [];

  for (var key in PLAYGROUND) {

    var property = PLAYGROUND[key];

    if (property.plugin) this.plugins.push(new property(this));

  }

  /* flow */

  this.emitGlobalEvent("preload");

  this.firstBatch = true;

  function onPreloadEnd() {

    app.loadFoo(0.25);

    /* run everything in the next frame */

    setTimeout(function() {

      app.emitLocalEvent("create");

      app.setState(PLAYGROUND.DefaultState);
      app.handleResize();
      app.setState(PLAYGROUND.LoadingScreen);

      /* game loop */

      PLAYGROUND.GameLoop(app);

    });

    /* stage proper loading step */

    app.loader.once("ready", function() {

      app.firstBatch = false;

      app.setState(PLAYGROUND.DefaultState);

      app.emitLocalEvent("ready");
      app.handleResize();


    });


  };


  this.loader.once("ready", onPreloadEnd);

};

PLAYGROUND.Application.prototype = {

  defaults: {
    smoothing: 1,
    paths: {
      base: "",
      images: "images/"
    },
    offsetX: 0,
    offsetY: 0
  },

  setState: function(state) {

    this.states.set(state);

  },

  getPath: function(to) {

    return this.paths.base + (this.paths[to] || (to + "/"));

  },

  getAssetEntry: function(path, folder, defaultExtension) {

    /* translate folder according to user provided paths
       or leave as is */

    var folder = this.paths[folder] || (folder + "/");

    var fileinfo = path.match(/(.*)\..*/);
    var key = fileinfo ? fileinfo[1] : path;

    var temp = path.split(".");
    var basename = path;

    if (temp.length > 1) {
      var ext = temp.pop();
      path = temp.join(".");
    } else {
      var ext = defaultExtension;
      basename += "." + defaultExtension;
    }

    return {
      key: key,
      url: this.paths.base + folder + basename,
      path: this.paths.base + folder + path,
      ext: ext
    };

  },

  /* events that shouldn't flow down to the state */

  emitLocalEvent: function(event, data) {

    this.trigger(event, data);

    if ((!this.firstBatch || this.loader.ready) && this[event]) this[event](data);

  },

  /* events that should be passed to the state */

  emitGlobalEvent: function(event, data) {

    if (!this.state) return this.emitLocalEvent(event, data);

    this.trigger(event, data);

    if ((!this.firstBatch || this.loader.ready) && this.event) this.event(event, data);

    if ((!this.firstBatch || this.loader.ready) && this[event]) this[event](data);

    if (this.state.event) this.state.event(event, data);

    if (this.state[event]) this.state[event](data);

    this.trigger("post" + event, data);

    // if (this.state.proxy) this.state.proxy(event, data);

  },

  updateSize: function() {

    if (this.customContainer) {

      var containerWidth = this.container.offsetWidth;
      var containerHeight = this.container.offsetHeight;

    } else {

      var containerWidth = window.innerWidth;
      var containerHeight = window.innerHeight;

    }

    if (!this.autoScale && !this.autoWidth && !this.autoHeight) {

    } else if (!this.autoHeight && this.autoWidth) {

      if (this.autoScale) this.scale = containerHeight / this.height;

      this.width = Math.ceil(containerWidth / this.scale);

    } else if (!this.autoWidth && this.autoHeight) {

      if (this.autoScale) this.scale = containerWidth / this.width;

      this.height = Math.ceil(containerHeight / this.scale);


    } else if (this.autoWidth && this.autoHeight && this.autoScale) {

      this.scale = 1;
      this.width = containerWidth;
      this.height = containerHeight;

    } else if (this.autoWidth && this.autoHeight) {

      this.width = Math.ceil(containerWidth / this.scale);
      this.height = Math.ceil(containerHeight / this.scale);

    } else {

      this.scale = Math.min(containerWidth / this.width, containerHeight / this.height);

    }

    this.offsetX = (containerWidth - this.width * this.scale) / 2 | 0;
    this.offsetY = (containerHeight - this.height * this.scale) / 2 | 0;

    this.center = {
      x: this.width / 2 | 0,
      y: this.height / 2 | 0
    };

  },

  handleResize: PLAYGROUND.Utils.throttle(function() {

    this.updateSize();

    this.mouse.handleResize();
    this.touch.handleResize();

    this.emitGlobalEvent("resize", {});

  }, 16),

  /*
    request a file over http
    it shall be later an abstraction using 'fs' in node-webkit

    returns a promise
  */

  request: function(url) {

    function promise(success, fail) {

      var request = new XMLHttpRequest();

      var app = this;

      request.open("GET", url, true);

      request.onload = function(event) {

        var xhr = event.target;

        if (xhr.status !== 200 && xhr.status !== 0) {

          return fail(new Error("Failed to get " + url));

        }

        success(xhr);

      }

      request.send();

    }

    return new Promise(promise);

  },

  /* imaginary timeout to delay loading */

  loadFoo: function(timeout) {

    var loader = this.loader;

    this.loader.add("foo " + timeout);

    setTimeout(function() {
      loader.success("foo " + timeout);
    }, timeout * 1000);

  },

  /* data/json */

  loadData: function() {

    for (var i = 0; i < arguments.length; i++) {

      var arg = arguments[i];

      if (typeof arg === "object") {

        for (var key in arg) this.loadData(arg[key]);

      } else {

        this.loadDataItem(arg);

      }

    }

  },

  loadDataItem: function(name) {

    var entry = this.getAssetEntry(name, "data", "json");

    var app = this;

    this.loader.add();

    this.request(entry.url).then(processData);

    function processData(request) {

      if (entry.ext === "json") {
        app.data[entry.key] = JSON.parse(request.responseText);
      } else {
        app.data[entry.key] = request.responseText;
      }

      app.loader.success(entry.url);

    }

  },

  /* images */

  loadImage: function() {

    return this.loadImages.apply(this, arguments);

  },

  loadImages: function() {

    var promises = [];

    for (var i = 0; i < arguments.length; i++) {

      var arg = arguments[i];

      /* polymorphism at its finest */

      if (typeof arg === "object") {

        for (var key in arg) promises = promises.concat(this.loadImages(arg[key]));

      } else {

        promises.push(this.loadOneImage(arg));

      }

    }

    return Promise.all(promises);

  },

  loadOneImage: function(name) {

    var app = this;

    if (!this._imageLoaders) this._imageLoaders = {};

    if (!this._imageLoaders[name]) {

      var promise = function(resolve, reject) {

        /* if argument is not an object/array let's try to load it */

        var loader = app.loader;

        var entry = app.getAssetEntry(name, "images", "png");

        app.loader.add(entry.path);

        var image = app.images[entry.key] = new Image;

        image.addEventListener("load", function() {

          resolve(image);
          loader.success(entry.url);

        });

        image.addEventListener("error", function() {

          reject("can't load " + entry.url);
          loader.error(entry.url);

        });

        image.src = entry.url;

      };

      app._imageLoaders[name] = new Promise(promise);

    }

    return this._imageLoaders[name];

  },

  render: function() {

  }

};

PLAYGROUND.Utils.extend(PLAYGROUND.Application.prototype, PLAYGROUND.Events.prototype);



/* file: src/GameLoop.js */

PLAYGROUND.GameLoop = function(app) {

  app.lifetime = 0;
  app.ops = 0;
  app.opcost = 0;

  var lastTick = Date.now();
  var frame = 0;
  var unbounded = false;

  function render(dt) {

    app.emitGlobalEvent("render", dt)
    app.emitGlobalEvent("postrender", dt)

  };

  function step(dt) {

    app.emitGlobalEvent("step", dt)

  };

  function gameLoop() {
    if (requestId == 0) { // Window is blurred
      return;
    }

    if (!app.unbound) {
      if (app.immidiate) {
        setZeroTimeout(gameLoop);
      } else {
        requestId = requestAnimationFrame(gameLoop);
      }
    }

    var delta = Date.now() - lastTick;

    lastTick = Date.now();

    if (app.unbound) {
      delta = 20;
    }

    if (delta > 1000) return;

    var dt = delta / 1000;

    app.lifetime += dt;
    app.elapsed = dt;

    step(dt);

    render(dt);

    if (app.unbound && !unbounded) {
      unbounded = true;
      while (app.unbound) {
        gameLoop();
      }
      unbounded = false;
    }

  };

  window.addEventListener('blur', function() {
    if (requestId != 0) {
      cancelAnimationFrame(requestId);
      app.emitGlobalEvent("visibilitychange", true);
      requestId = 0;
    }
  });

  window.addEventListener('focus', function() {
    if (!requestId) {
      requestId = requestAnimationFrame(gameLoop);
      app.emitGlobalEvent("visibilitychange", false);
    }
  });

  var requestId = requestAnimationFrame(gameLoop);

};

// Copyright dbaron, via http://dbaron.org/log/20100309-faster-timeouts
// Only add setZeroTimeout to the window object, and hide everything
// else in a closure.
(function() {
  var timeouts = [];
  var messageName = "zero-timeout-message";

  // Like setTimeout, but only takes a function argument.  There's
  // no time argument (always zero) and no arguments (you have to
  // use a closure).
  function setZeroTimeout(fn) {
    timeouts.push(fn);
    window.postMessage(messageName, "*");
  }

  function handleMessage(event) {

    if (event.source == window && event.data == messageName) {
      event.stopPropagation();
      if (timeouts.length > 0) {
        var fn = timeouts.shift();
        fn();
      }
    }

  }

  window.addEventListener("message", handleMessage, true);

  // Add the one thing we want added to the window object.
  window.setZeroTimeout = setZeroTimeout;
})();

/* file: src/Gamepads.js */

PLAYGROUND.Gamepads = function(app) {

  this.app = app;

  PLAYGROUND.Events.call(this);

  this.getGamepads = navigator.getGamepads || navigator.webkitGetGamepads;

  this.gamepadmoveEvent = {};
  this.gamepaddownEvent = {};
  this.gamepadupEvent = {};

  this.gamepads = {};

  this.app.on("step", this.step.bind(this));

};

PLAYGROUND.Gamepads.prototype = {

  buttons: {
    0: "1",
    1: "2",
    2: "3",
    3: "4",
    4: "l1",
    5: "r1",
    6: "l2",
    7: "r2",
    8: "select",
    9: "start",
    12: "up",
    13: "down",
    14: "left",
    15: "right"
  },

  zeroState: function() {

    var buttons = [];

    for (var i = 0; i <= 15; i++) {
      buttons.push({
        pressed: false,
        value: 0
      });
    }

    return {
      axes: [],
      buttons: buttons
    };

  },

  createGamepad: function() {

    var result = {
      buttons: {},
      sticks: [{
        x: 0,
        y: 0
      }, {
        x: 0,
        y: 0
      }]
    };


    for (var i = 0; i < 16; i++) {
      var key = this.buttons[i];
      result.buttons[key] = false;
    }

    return result;

  },

  step: function() {

    if (!navigator.getGamepads) return;

    var gamepads = navigator.getGamepads();

    for (var i = 0; i < gamepads.length; i++) {

      var current = gamepads[i];

      if (!current) continue;

      if (!this[i]) this[i] = this.createGamepad();

      /* have to concat the current.buttons because the are read-only */

      var buttons = [].concat(current.buttons);

      /* hack for missing  dpads */

      for (var h = 12; h <= 15; h++) {
        if (!buttons[h]) buttons[h] = {
          pressed: false,
          value: 0
        };
      }

      var previous = this[i];

      /* axes (sticks) to buttons */

      if (current.axes) {

        if (current.axes[0] < 0) buttons[14].pressed = true;
        if (current.axes[0] > 0) buttons[15].pressed = true;
        if (current.axes[1] < 0) buttons[12].pressed = true;
        if (current.axes[1] > 0) buttons[13].pressed = true;

        previous.sticks[0].x = current.axes[0].value;
        previous.sticks[0].y = current.axes[1].value;
        previous.sticks[1].x = current.axes[2].value;
        previous.sticks[1].y = current.axes[3].value;

      }

      /* check buttons changes */

      for (var j = 0; j < buttons.length; j++) {

        var key = this.buttons[j];

        /* gamepad down */

        if (buttons[j].pressed && !previous.buttons[key]) {

          previous.buttons[key] = true;
          this.gamepaddownEvent.button = this.buttons[j];
          this.gamepaddownEvent.gamepad = i;
          this.trigger("gamepaddown", this.gamepaddownEvent);

        }

        /* gamepad up */
        else if (!buttons[j].pressed && previous.buttons[key]) {

          previous.buttons[key] = false;
          this.gamepadupEvent.button = this.buttons[j];
          this.gamepadupEvent.gamepad = i;
          this.trigger("gamepadup", this.gamepadupEvent);

        }

      }

    }

  }
};

PLAYGROUND.Utils.extend(PLAYGROUND.Gamepads.prototype, PLAYGROUND.Events.prototype);


/* file: src/Keyboard.js */

PLAYGROUND.Keyboard = function() {

  PLAYGROUND.Events.call(this);

  this.keys = {};

  document.addEventListener("keydown", this.keydown.bind(this));
  document.addEventListener("keyup", this.keyup.bind(this));
  document.addEventListener("keypress", this.keypress.bind(this));

  this.keydownEvent = {};
  this.keyupEvent = {};

  this.preventDefault = true;

};

PLAYGROUND.Keyboard.prototype = {

  keycodes: {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
    45: "insert",
    46: "delete",
    8: "backspace",
    9: "tab",
    13: "enter",
    16: "shift",
    17: "ctrl",
    18: "alt",
    19: "pause",
    20: "capslock",
    27: "escape",
    32: "space",
    33: "pageup",
    34: "pagedown",
    35: "end",
    36: "home",
    112: "f1",
    113: "f2",
    114: "f3",
    115: "f4",
    116: "f5",
    117: "f6",
    118: "f7",
    119: "f8",
    120: "f9",
    121: "f10",
    122: "f11",
    123: "f12",
    144: "numlock",
    145: "scrolllock",
    186: "semicolon",
    187: "equal",
    188: "comma",
    189: "dash",
    190: "period",
    191: "slash",
    192: "graveaccent",
    219: "openbracket",
    220: "backslash",
    221: "closebraket",
    222: "singlequote"
  },

  keypress: function(e) {

  },

  keydown: function(e) {
    if (e.which >= 48 && e.which <= 90) var keyName = String.fromCharCode(e.which).toLowerCase();
    else var keyName = this.keycodes[e.which];

    if (this.keys[keyName]) return;

    this.keydownEvent.key = keyName;
    this.keydownEvent.original = e;

    this.keys[keyName] = true;

    this.trigger("keydown", this.keydownEvent);

    if (this.preventDefault && document.activeElement === document.body) {
      e.returnValue = false;
      e.keyCode = 0;
      e.preventDefault();
      e.stopPropagation();
    }
  },

  keyup: function(e) {

    if (e.which >= 48 && e.which <= 90) var keyName = String.fromCharCode(e.which).toLowerCase();
    else var keyName = this.keycodes[e.which];

    this.keyupEvent.key = keyName;
    this.keyupEvent.original = e;

    this.keys[keyName] = false;

    this.trigger("keyup", this.keyupEvent);
  }

};

PLAYGROUND.Utils.extend(PLAYGROUND.Keyboard.prototype, PLAYGROUND.Events.prototype);



/* file: src/Pointer.js */

PLAYGROUND.Pointer = function(app) {

  this.app = app;

  app.on("touchstart", this.touchstart, this);
  app.on("touchend", this.touchend, this);
  app.on("touchmove", this.touchmove, this);

  app.on("mousemove", this.mousemove, this);
  app.on("mousedown", this.mousedown, this);
  app.on("mouseup", this.mouseup, this);

  this.pointers = app.pointers = {};

};

PLAYGROUND.Pointer.plugin = true;

PLAYGROUND.Pointer.prototype = {

  updatePointer: function(pointer) {

    this.pointers[pointer.id] = pointer;

  },

  removePointer: function(pointer) {

    delete this.pointers[pointer.id];

  },

  touchstart: function(e) {

    e.touch = true;

    this.updatePointer(e);

    this.app.emitGlobalEvent("pointerdown", e);

  },

  touchend: function(e) {

    e.touch = true;

    this.removePointer(e);

    this.app.emitGlobalEvent("pointerup", e);

  },

  touchmove: function(e) {

    e.touch = true;

    this.updatePointer(e);

    this.app.emitGlobalEvent("pointermove", e);

  },

  mousemove: function(e) {

    e.mouse = true;

    this.updatePointer(e);

    this.app.emitGlobalEvent("pointermove", e);

  },

  mousedown: function(e) {

    e.mouse = true;

    this.app.emitGlobalEvent("pointerdown", e);

  },

  mouseup: function(e) {

    e.mouse = true;

    this.app.emitGlobalEvent("pointerup", e);

  },

  mousewheel: function(e) {

    e.mouse = true;

    this.app.emitGlobalEvent("pointerwheel", e);

  }

};

/* file: src/Loader.js */

/* Loader */

PLAYGROUND.Loader = function(app) {

  this.app = app;

  PLAYGROUND.Events.call(this);

  this.reset();

};

PLAYGROUND.Loader.prototype = {

  /* loader */

  add: function(id) {

    this.queue++;
    this.count++;
    this.ready = false;
    this.trigger("add", id);

    return id;

  },

  error: function(id) {

    this.trigger("error", id);

  },

  success: function(id) {

    this.queue--;

    this.progress = 1 - this.queue / this.count;

    this.trigger("load", id);

    if (this.queue <= 0) {
      this.trigger("ready");
      this.reset();
    }

  },

  reset: function() {

    this.progress = 0;
    this.queue = 0;
    this.count = 0;
    this.ready = true;

  }
};

PLAYGROUND.Utils.extend(PLAYGROUND.Loader.prototype, PLAYGROUND.Events.prototype);

/* file: src/Mouse.js */

PLAYGROUND.Mouse = function(app, element) {

  var self = this;

  this.app = app;

  PLAYGROUND.Events.call(this);

  this.element = element;

  this.buttons = {};

  this.preventContextMenu = true;

  this.mousemoveEvent = {};
  this.mousedownEvent = {};
  this.mouseupEvent = {};
  this.mousewheelEvent = {};

  this.x = 0;
  this.y = 0;

  element.addEventListener("mousemove", this.mousemove.bind(this));
  element.addEventListener("mousedown", this.mousedown.bind(this));
  element.addEventListener("mouseup", this.mouseup.bind(this));

  this.enableMousewheel();

  this.element.addEventListener("contextmenu", function(e) {
    if (self.preventContextMenu) e.preventDefault();
  });

  element.requestPointerLock = element.requestPointerLock ||
    element.mozRequestPointerLock ||
    element.webkitRequestPointerLock;

  document.exitPointerLock = document.exitPointerLock ||
    document.mozExitPointerLock ||
    document.webkitExitPointerLock;


  this.handleResize();
};

PLAYGROUND.Mouse.prototype = {

  lock: function() {

    this.locked = true;
    this.element.requestPointerLock();

  },

  unlock: function() {

    this.locked = false;
    document.exitPointerLock();

  },

  getElementOffset: function(element) {

    var offsetX = 0;
    var offsetY = 0;

    do {
      offsetX += element.offsetLeft;
      offsetY += element.offsetTop;
    }

    while ((element = element.offsetParent));

    return {
      x: offsetX,
      y: offsetY
    };

  },

  handleResize: function() {

    this.elementOffset = this.getElementOffset(this.element);

  },

  mousemove: PLAYGROUND.Utils.throttle(function(e) {

    this.x = this.mousemoveEvent.x = (e.pageX - this.elementOffset.x - this.app.offsetX) / this.app.scale | 0;
    this.y = this.mousemoveEvent.y = (e.pageY - this.elementOffset.y - this.app.offsetY) / this.app.scale | 0;

    this.mousemoveEvent.original = e;

    if (this.locked) {
      this.mousemoveEvent.movementX = e.movementX ||
        e.mozMovementX ||
        e.webkitMovementX ||
        0;

      this.mousemoveEvent.movementY = e.movementY ||
        e.mozMovementY ||
        e.webkitMovementY ||
        0;
    }

    if (this.app.mouseToTouch) {
      //      if (this.left) {
      this.mousemoveEvent.id = this.mousemoveEvent.identifier = 255;
      this.trigger("touchmove", this.mousemoveEvent);
      //      }
    } else {
      this.mousemoveEvent.id = this.mousemoveEvent.identifier = 255;
      this.trigger("mousemove", this.mousemoveEvent);
    }

  }, 16),

  mousedown: function(e) {

    var buttonName = ["left", "middle", "right"][e.button];

    this.mousedownEvent.x = this.mousemoveEvent.x;
    this.mousedownEvent.y = this.mousemoveEvent.y;
    this.mousedownEvent.button = buttonName;
    this.mousedownEvent.original = e;

    this[buttonName] = true;

    this.mousedownEvent.id = this.mousedownEvent.identifier = 255;

    if (this.app.mouseToTouch) {
      this.trigger("touchmove", this.mousedownEvent);
      this.trigger("touchstart", this.mousedownEvent);
    } else {
      this.trigger("mousedown", this.mousedownEvent);
    }

  },

  mouseup: function(e) {

    var buttonName = ["left", "middle", "right"][e.button];

    this.mouseupEvent.x = this.mousemoveEvent.x;
    this.mouseupEvent.y = this.mousemoveEvent.y;
    this.mouseupEvent.button = buttonName;
    this.mouseupEvent.original = e;

    this.mouseupEvent.id = this.mouseupEvent.identifier = 255;

    if (this.app.mouseToTouch) {

      this.trigger("touchend", this.mouseupEvent);

    } else {

      this.trigger("mouseup", this.mouseupEvent);

    }

    this[buttonName] = false;

  },

  mousewheel: function(e) {

    this.mousewheelEvent.x = this.mousemoveEvent.x;
    this.mousewheelEvent.y = this.mousemoveEvent.y;
    this.mousewheelEvent.button = ["none", "left", "middle", "right"][e.button];
    this.mousewheelEvent.original = e;
    this.mousewheelEvent.id = this.mousewheelEvent.identifier = 255;

    this[e.button] = false;

    this.trigger("mousewheel", this.mousewheelEvent);

  },


  enableMousewheel: function() {

    var eventNames = 'onwheel' in document || document.documentMode >= 9 ? ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'];
    var callback = this.mousewheel.bind(this);
    var self = this;

    for (var i = eventNames.length; i;) {

      self.element.addEventListener(eventNames[--i], PLAYGROUND.Utils.throttle(function(event) {

        var orgEvent = event || window.event,
          args = [].slice.call(arguments, 1),
          delta = 0,
          deltaX = 0,
          deltaY = 0,
          absDelta = 0,
          absDeltaXY = 0,
          fn;

        orgEvent.type = "mousewheel";

        // Old school scrollwheel delta
        if (orgEvent.wheelDelta) {
          delta = orgEvent.wheelDelta;
        }

        if (orgEvent.detail) {
          delta = orgEvent.detail * -1;
        }

        // New school wheel delta (wheel event)
        if (orgEvent.deltaY) {
          deltaY = orgEvent.deltaY * -1;
          delta = deltaY;
        }

        // Webkit
        if (orgEvent.wheelDeltaY !== undefined) {
          deltaY = orgEvent.wheelDeltaY;
        }

        var result = delta ? delta : deltaY;

        self.mousewheelEvent.x = self.mousemoveEvent.x;
        self.mousewheelEvent.y = self.mousemoveEvent.y;
        self.mousewheelEvent.delta = result / Math.abs(result);
        self.mousewheelEvent.original = orgEvent;

        callback(self.mousewheelEvent);

        orgEvent.preventDefault();

      }, 40), false);
    }

  }

};

PLAYGROUND.Utils.extend(PLAYGROUND.Mouse.prototype, PLAYGROUND.Events.prototype);

/* file: src/Sound.js */

PLAYGROUND.Sound = function(app) {

  var audioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;

  if (audioContext) {

    if (!PLAYGROUND.audioContext) PLAYGROUND.audioContext = new audioContext;

    app.audioContext = PLAYGROUND.audioContext;
    app.sound = new PLAYGROUND.SoundWebAudioAPI(app, app.audioContext);
    app.music = new PLAYGROUND.SoundWebAudioAPI(app, app.audioContext);

  } else {

    app.sound = new PLAYGROUND.SoundAudio(app);
    app.music = new PLAYGROUND.SoundAudio(app);

  }

};

PLAYGROUND.Application.prototype.playSound = function(key, loop) {

  return this.sound.play(key, loop);

};

PLAYGROUND.Application.prototype.stopSound = function(sound) {

  this.sound.stop(sound);

};

PLAYGROUND.Application.prototype.loadSound = function() {

  return this.loadSounds.apply(this, arguments);

};

PLAYGROUND.Application.prototype.loadSounds = function() {

  for (var i = 0; i < arguments.length; i++) {

    var arg = arguments[i];

    /* polymorphism at its finest */

    if (typeof arg === "object") {

      for (var key in arg) this.loadSounds(arg[key]);

    } else {
      this.sound.load(arg);
    }
  }

};

/* file: src/SoundWebAudioAPI.js */

PLAYGROUND.SoundWebAudioAPI = function(app, audioContext) {

  this.app = app;

  var canPlayMp3 = (new Audio).canPlayType("audio/mp3");
  var canPlayOgg = (new Audio).canPlayType('audio/ogg; codecs="vorbis"');

  if (this.app.preferedAudioFormat === "mp3") {

    if (canPlayMp3) this.audioFormat = "mp3";
    else this.audioFormat = "ogg";

  } else {

    if (canPlayOgg) this.audioFormat = "ogg";
    else this.audioFormat = "mp3";

  }

  this.context = audioContext;

  this.gainNode = this.context.createGain()
  this.gainNode.connect(this.context.destination);

  this.compressor = this.context.createDynamicsCompressor();
  this.compressor.connect(this.gainNode);

  this.output = this.gainNode;

  this.gainNode.gain.value = 1.0;

  this.pool = [];
  this.volume = 1.0;

  this.setMasterPosition(0, 0, 0);

  this.loops = [];

  this.app.on("step", this.step.bind(this));

};

PLAYGROUND.SoundWebAudioAPI.prototype = {

  buffers: {},
  aliases: {},

  alias: function(alias, source, volume, rate) {

    this.aliases[alias] = {
      source: source,
      volume: volume,
      rate: rate
    };

  },

  setMaster: function(volume) {

    this.volume = volume;

    this.gainNode.gain.value = volume;

  },

  load: function(file) {

    var entry = this.app.getAssetEntry(file, "sounds", this.audioFormat);

    var sampler = this;

    var request = new XMLHttpRequest();

    request.open("GET", entry.url, true);
    request.responseType = "arraybuffer";

    var id = this.app.loader.add(entry.url);

    request.onload = function() {

      sampler.context.decodeAudioData(this.response, function(decodedBuffer) {
        sampler.buffers[entry.key] = decodedBuffer;
        sampler.app.loader.success(entry.url);
      });

    }

    request.send();

  },

  cleanArray: function(array, property) {
    for (var i = 0, len = array.length; i < len; i++) {
      if (array[i] === null || (property && array[i][property])) {
        array.splice(i--, 1);
        len--;
      }
    }
  },

  setMasterPosition: function(x, y, z) {

    this.masterPosition = {
      x: x,
      y: y,
      z: z
    };

    this.context.listener.setPosition(x, y, z)
      // this.context.listener.setOrientation(0, 0, -1, 0, 1, 0);
      // this.context.listener.dopplerFactor = 1;
      // this.context.listener.speedOfSound = 343.3;
  },

  getSoundBuffer: function() {
    if (!this.pool.length) {
      for (var i = 0; i < 100; i++) {

        var buffer, gain, panner;

        var nodes = [
          buffer = this.context.createBufferSource(),
          gain = this.context.createGain(),
          panner = this.context.createPanner()
        ];

        panner.distanceModel = "linear";

        // 1 - rolloffFactor * (distance - refDistance) / (maxDistance - refDistance)
        // refDistance / (refDistance + rolloffFactor * (distance - refDistance))
        panner.refDistance = 1;
        panner.maxDistance = 600;
        panner.rolloffFactor = 1.0;


        // panner.setOrientation(-1, -1, 0);

        this.pool.push(nodes);

        nodes[0].connect(nodes[1]);
        // nodes[1].connect(nodes[2]);
        nodes[1].connect(this.output);
      }
    }

    return this.pool.pop();
  },

  play: function(name, loop) {

    var alias = this.aliases[name];

    var nodes = this.getSoundBuffer();

    if (alias) name = alias.source;

    bufferSource = nodes[0];
    bufferSource.gainNode = nodes[1];
    bufferSource.pannerNode = nodes[2];
    bufferSource.buffer = this.buffers[name];
    bufferSource.loop = loop || false;
    bufferSource.key = name;

    bufferSource.alias = alias;

    this.setVolume(bufferSource, 1.0);
    this.setPlaybackRate(bufferSource, 1.0);

    if (this.loop) {
      //  bufferSource.loopStart = this.loopStart;
      // bufferSource.loopEnd = this.loopEnd;
    }


    bufferSource.start(0);

    bufferSource.volumeLimit = 1;

    this.setPosition(bufferSource, this.masterPosition.x, this.masterPosition.y, this.masterPosition.z);

    return bufferSource;
  },

  stop: function(what) {

    if (!what) return;

    what.stop(0);

  },

  setPlaybackRate: function(sound, rate) {

    if (!sound) return;

    if (sound.alias) rate *= sound.alias.rate;

    return sound.playbackRate.value = rate;
  },

  setPosition: function(sound, x, y, z) {

    if (!sound) return;

    sound.pannerNode.setPosition(x, y || 0, z || 0);
  },

  setVelocity: function(sound, x, y, z) {

    if (!sound) return;

    sound.pannerNode.setPosition(x, y || 0, z || 0);

  },

  getVolume: function(sound) {

    if (!sound) return;

    return sound.gainNode.gain.value;

  },

  setVolume: function(sound, volume) {

    if (!sound) return;

    if (sound.alias) volume *= sound.alias.volume;

    return sound.gainNode.gain.value = Math.max(0, volume);
  },

  fadeOut: function(sound) {

    if (!sound) return;

    sound.fadeOut = true;

    this.loops.push(sound);

    return sound;

  },

  fadeIn: function(sound) {

    if (!sound) return;

    sound.fadeIn = true;

    this.loops.push(sound);
    this.setVolume(sound, 0);


    return sound;

  },

  step: function(delta) {

    for (var i = 0; i < this.loops.length; i++) {

      var loop = this.loops[i];

      if (loop.fadeIn) {
        var volume = this.getVolume(loop);
        volume = this.setVolume(loop, Math.min(1.0, volume + delta * 0.5));

        if (volume >= 1.0) {
          this.loops.splice(i--, 1);
        }
      }

      if (loop.fadeOut) {
        var volume = this.getVolume(loop);
        volume = this.setVolume(loop, Math.min(1.0, volume - delta * 0.5));

        if (volume <= 0) {
          this.loops.splice(i--, 1);
          this.stop(loop);
        }
      }

    }

  }

};

/* file: src/SoundAudio.js */

PLAYGROUND.SoundAudio = function(app) {

  this.app = app;

  var canPlayMp3 = (new Audio).canPlayType("audio/mp3");
  var canPlayOgg = (new Audio).canPlayType('audio/ogg; codecs="vorbis"');

  if (this.app.preferedAudioFormat === "mp3") {

    if (canPlayMp3) this.audioFormat = "mp3";
    else this.audioFormat = "ogg";

  } else {

    if (canPlayOgg) this.audioFormat = "ogg";
    else this.audioFormat = "mp3";

  }

};

PLAYGROUND.SoundAudio.prototype = {

  samples: {},

  setMaster: function(volume) {

    this.volume = volume;

  },

  setMasterPosition: function() {

  },

  setPosition: function(x, y, z) {
    return;
  },

  load: function(file) {

    var url = "sounds/" + file + "." + this.audioFormat;

    var loader = this.app.loader;

    this.app.loader.add(url);

    var audio = this.samples[file] = new Audio;

    audio.addEventListener("canplay", function() {
      loader.success(url);
    });

    audio.addEventListener("error", function() {
      loader.error(url);
    });

    audio.src = url;

  },

  play: function(key, loop) {

    var sound = this.samples[key];

    sound.currentTime = 0;
    sound.loop = loop;
    sound.play();

    return sound;

  },

  stop: function(what) {

    if (!what) return;

    what.pause();

  },

  step: function(delta) {

  },

  setPlaybackRate: function(sound, rate) {

    return;
  },

  setVolume: function(sound, volume) {

    sound.volume = volume * this.volume;

  },

  setPosition: function() {

  }

};

/* file: src/Touch.js */

PLAYGROUND.Touch = function(app, element) {

  PLAYGROUND.Events.call(this);

  this.app = app;

  this.element = element;

  this.buttons = {};

  this.touches = {};

  this.x = 0;
  this.y = 0;

  element.addEventListener("touchmove", this.touchmove.bind(this));
  element.addEventListener("touchstart", this.touchstart.bind(this));
  element.addEventListener("touchend", this.touchend.bind(this));

};

PLAYGROUND.Touch.prototype = {

  getElementOffset: function(element) {

    var offsetX = 0;
    var offsetY = 0;

    do {
      offsetX += element.offsetLeft;
      offsetY += element.offsetTop;
    }

    while ((element = element.offsetParent));

    return {
      x: offsetX,
      y: offsetY
    };

  },

  handleResize: function() {

    this.elementOffset = this.getElementOffset(this.element);

  },

  touchmove: function(e) {

    for (var i = 0; i < e.changedTouches.length; i++) {

      var touch = e.changedTouches[i];

      touchmoveEvent = {}

      this.x = touchmoveEvent.x = (touch.pageX - this.elementOffset.x - this.app.offsetX) / this.app.scale | 0;
      this.y = touchmoveEvent.y = (touch.pageY - this.elementOffset.y - this.app.offsetY) / this.app.scale | 0;

      touchmoveEvent.original = touch;
      touchmoveEvent.id = touchmoveEvent.identifier = touch.identifier;

      this.touches[touch.identifier].x = touchmoveEvent.x;
      this.touches[touch.identifier].y = touchmoveEvent.y;

      this.trigger("touchmove", touchmoveEvent);

    }

    e.preventDefault();

  },

  touchstart: function(e) {

    for (var i = 0; i < e.changedTouches.length; i++) {

      var touch = e.changedTouches[i];

      var touchstartEvent = {}

      this.x = touchstartEvent.x = (touch.pageX - this.elementOffset.x - this.app.offsetX) / this.app.scale | 0;
      this.y = touchstartEvent.y = (touch.pageY - this.elementOffset.y - this.app.offsetY) / this.app.scale | 0;

      touchstartEvent.original = e.touch;
      touchstartEvent.id = touchstartEvent.identifier = touch.identifier;

      this.touches[touch.identifier] = {
        x: touchstartEvent.x,
        y: touchstartEvent.y
      };

      this.trigger("touchstart", touchstartEvent);

    }

    e.preventDefault();

  },

  touchend: function(e) {

    for (var i = 0; i < e.changedTouches.length; i++) {

      var touch = e.changedTouches[i];
      var touchendEvent = {};

      touchendEvent.x = (touch.pageX - this.elementOffset.x - this.app.offsetX) / this.app.scale | 0;
      touchendEvent.y = (touch.pageY - this.elementOffset.y - this.app.offsetY) / this.app.scale | 0;

      touchendEvent.original = touch;
      touchendEvent.id = touchendEvent.identifier = touch.identifier;

      delete this.touches[touch.identifier];

      this.trigger("touchend", touchendEvent);

    }

    e.preventDefault();

  }

};

PLAYGROUND.Utils.extend(PLAYGROUND.Touch.prototype, PLAYGROUND.Events.prototype);

/* file: src/Tween.js */

PLAYGROUND.Tween = function(manager, context) {

  PLAYGROUND.Events.call(this);

  this.manager = manager;
  this.context = context;

  PLAYGROUND.Utils.extend(this, {

    actions: [],
    index: -1,

    prevEasing: "045",
    prevDuration: 0.5

  });

  this.current = false;

};

PLAYGROUND.Tween.prototype = {

  add: function(properties, duration, easing) {

    if (duration) this.prevDuration = duration;
    else duration = 0.5;
    if (easing) this.prevEasing = easing;
    else easing = "045";

    this.actions.push([properties, duration, easing]);

    return this;

  },

  discard: function() {

    this.manager.discard(this.context, this);

    return this;

  },

  to: function(properties, duration, easing) {
    return this.add(properties, duration, easing);
  },

  loop: function() {

    this.looped = true;

    return this;

  },

  repeat: function(times) {

    this.actions.push(["repeat", times]);

  },

  wait: function(time) {

    this.actions.push(["wait", time]);

    return this;

  },

  delay: function(time) {

    this.actions.push(["wait", time]);

  },

  stop: function() {

    this.manager.remove(this);

    return this;

  },

  play: function() {

    this.manager.add(this);

    this.finished = false;

    return this;

  },


  end: function() {

    var lastAnimationIndex = 0;

    for (var i = this.index + 1; i < this.actions.length; i++) {
      if (typeof this.actions[i][0] === "object") lastAnimationIndex = i;
    }

    this.index = lastAnimationIndex - 1;
    this.next();
    this.delta = this.duration;
    this.step(0);

    return this;

  },

  forward: function() {

    this.delta = this.duration;
    this.step(0);

  },

  rewind: function() {

    this.delta = 0;
    this.step(0);

  },

  next: function() {

    this.delta = 0;

    this.index++;

    if (this.index >= this.actions.length) {

      if (this.looped) {

        this.trigger("loop", {
          tween: this
        });

        this.index = 0;
      } else {

        this.trigger("finished", {
          tween: this
        });

        this.finished = true;
        this.manager.remove(this);
        return;
      }
    }

    this.current = this.actions[this.index];

    if (this.current[0] === "wait") {

      this.duration = this.current[1];
      this.currentAction = "wait";

    } else {

      /* calculate changes */

      var properties = this.current[0];

      /* keep keys as array for 0.0001% performance boost */

      this.keys = Object.keys(properties);

      this.change = [];
      this.before = [];
      this.types = [];

      for (i = 0; i < this.keys.length; i++) {
        var key = this.keys[i];

        if (typeof this.context[key] === "number") {
          this.before.push(this.context[key]);
          this.change.push(properties[key] - this.context[key]);
          this.types.push(0);
        } else {
          var before = cq.color(this.context[key]);

          this.before.push(before);

          var after = cq.color(properties[key]);

          var temp = [];

          for (var j = 0; j < 3; j++) {
            temp.push(after[j] - before[j]);
          }

          this.change.push(temp);

          this.types.push(1);
        }

      }

      this.currentAction = "animate";

      this.duration = this.current[1];
      this.easing = this.current[2];

    }


  },

  prev: function() {

  },

  step: function(delta) {

    this.delta += delta;

    if (!this.current) this.next();

    switch (this.currentAction) {

      case "animate":
        this.doAnimate(delta);
        break;

      case "wait":
        this.doWait(delta);
        break;

    }

    if (this.onstep) this.onstep(this.context);

  },

  doAnimate: function(delta) {

    this.progress = Math.min(1, this.delta / this.duration);

    var mod = PLAYGROUND.Utils.ease(this.progress, this.easing);

    for (var i = 0; i < this.keys.length; i++) {

      var key = this.keys[i];

      switch (this.types[i]) {

        /* number */

        case 0:

          this.context[key] = this.before[i] + this.change[i] * mod;

          break;

          /* color */

        case 1:

          var change = this.change[i];
          var before = this.before[i];
          var color = [];

          for (var j = 0; j < 3; j++) {
            color.push(before[j] + change[j] * mod | 0);
          }

          this.context[key] = "rgb(" + color.join(",") + ")";

          break;
      }
    }

    if (this.progress >= 1) {
      this.next();
    }

  },

  doWait: function(delta) {

    if (this.delta >= this.duration) this.next();

  }

};

PLAYGROUND.Utils.extend(PLAYGROUND.Tween.prototype, PLAYGROUND.Events.prototype);

PLAYGROUND.TweenManager = function(app) {

  this.tweens = [];

  if (app) {
    this.app = app;
    this.app.tween = this.tween.bind(this);
  }

  this.delta = 0;

  this.app.on("step", this.step.bind(this));

};

PLAYGROUND.TweenManager.prototype = {

  defaultEasing: "128",

  discard: function(object, safe) {

    for (var i = 0; i < this.tweens.length; i++) {

      var tween = this.tweens[i];

      if (tween.context === object && tween !== safe) this.remove(tween);

    }

  },

  tween: function(context) {

    var tween = new PLAYGROUND.Tween(this, context);

    this.add(tween);

    return tween;

  },

  step: function(delta) {

    this.delta += delta;

    for (var i = 0; i < this.tweens.length; i++) {

      var tween = this.tweens[i];

      if (!tween._remove) tween.step(delta);

      if (tween._remove) this.tweens.splice(i--, 1);

    }

  },

  add: function(tween) {

    tween._remove = false;

    var index = this.tweens.indexOf(tween);

    if (index === -1) this.tweens.push(tween);

  },

  remove: function(tween) {

    tween._remove = true;

  }

};

/* file: src/Atlases.js */

PLAYGROUND.Application.prototype.loadAtlases = function() {

  for (var i = 0; i < arguments.length; i++) {

    var arg = arguments[i];

    /* polymorphism at its finest */

    if (typeof arg === "object") {

      for (var key in arg) this.loadAtlases(arg[key]);

    } else {

      /* if argument is not an object/array let's try to load it */

      this._loadAtlas(arg)

    }
  }

};

PLAYGROUND.Application.prototype.loadAtlas = function() {

  return this.loadAtlases.apply(this, arguments);

};

PLAYGROUND.Application.prototype._loadAtlas = function(filename) {

  var entry = this.getAssetEntry(filename, "atlases", "png");

  this.loader.add(entry.url);

  var atlas = this.atlases[entry.key] = {};

  var image = atlas.image = new Image;

  image.addEventListener("load", function() {
    loader.success(entry.url);
  });

  image.addEventListener("error", function() {
    loader.error(entry.url);
  });

  image.src = entry.url;

  /* data */

  var request = new XMLHttpRequest();

  request.open("GET", entry.path + ".json", true);

  this.loader.add(entry.path + ".json");

  var loader = this.loader;

  request.onload = function() {

    var data = JSON.parse(this.response);

    atlas.frames = [];

    for (var i = 0; i < data.frames.length; i++) {
      var frame = data.frames[i];

      atlas.frames.push({
        region: [frame.frame.x, frame.frame.y, frame.frame.w, frame.frame.h],
        offset: [frame.spriteSourceSize.x || 0, frame.spriteSourceSize.y || 0],
        width: frame.sourceSize.w,
        height: frame.sourceSize.h
      });
    }

    loader.success(entry.path + ".json");

  }

  request.send();
};

/* file: src/Fonts.js */

PLAYGROUND.Application.prototype.loadFont = function(name) {

  var styleNode = document.createElement("style");
  styleNode.type = "text/css";

  var formats = {
    "woff": "woff",
    "ttf": "truetype"
  };

  var sources = "";

  for (var ext in formats) {
    var type = formats[ext];
    sources += " url(\"fonts/" + name + "." + ext + "\") format('" + type + "');"
  }

  styleNode.textContent = "@font-face { font-family: '" + name + "'; src: " + sources + " }";

  document.head.appendChild(styleNode);

  var layer = cq(32, 32);

  layer.font("10px Testing");
  layer.fillText(16, 16, 16).trim();

  var width = layer.width;
  var height = layer.height;

  this.loader.add("font " + name);

  var self = this;

  function check() {

    var layer = cq(32, 32);

    layer.font("10px " + name).fillText(16, 16, 16);
    layer.trim();

    if (layer.width !== width || layer.height !== height) {

      self.loader.ready("font " + name);

    } else {

      setTimeout(check, 250);

    }

  };

  check();

};

/* file: src/DefaultState.js */

PLAYGROUND.DefaultState = {

};

/* file: src/LoadingScreen.js */

PLAYGROUND.LoadingScreen = {

  /* basic loading screen using DOM */

  logoRaw: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAAASBAMAAADPiN0xAAAAGFBMVEUAAQAtLixHSUdnaGaJioimqKXMzsv7/fr5shgVAAAAAWJLR0QAiAUdSAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB98EAwkeA4oQWJ4AAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAB9klEQVQ4y72UvW+rMBDAz+FrpVKrrFmesmapWNOlrKjSe1kZ+uoVAvj+/frujG1SaJcqJwU7voOf7xMQzQmsIDi5NPTMsLRntH3U+F6SAZo3NlCvcgBFJz8o+vkDiE63lI95Y/UmpinsZWkgJWJiDbAVQ16htptxSTNloIlugwaw001Ey3ASF3so6L1qLNXzQS5S0UGKL/CI5wWNriE0UH9Yty37LqIVg+wsqu7Ix0MwVBSF/dU+jv2SNnma021LEdPqVnMeU3xAu0kXcSGjmq7Ox4E2Wn88LZ2+EFj3avjixzai6VPVyuYveZLHF2XfdDnvAq27DIHGuq+0DJFsE30OtB1KqOwd8Dr7PcM4b+jfj2g5lp4WyntBK66qua3JzEA+uXJpwH/NlVuzRVPY/kTLB2mjuN+KwdZ8FOy8j2gDbEUSqumnSCY4lf4ibq3IhVM4ycZQRnv+zFqVdJQVn6BxvUqebGpuaNo3sZxwBzjajiMZOoBiwyVF+kCr+nUaJOaGpnAeRPPJZTr4FqmHRXcneEo4DqQ/ftfdnLeDrUAME8xWKPeKCwW6YkEpXfs3p1EWJhdcUAYP0TI/uYaV8cgjwBovaeyWwji2T9rTFIdS/cP/MnkTLRUWxgNNZVin7bT5fqT9miDcUVJzR1gRpfIONMmulU+5Qqr6zXAUqAAAAABJRU5ErkJggg==",

  create: function() {

    var self = this;

    this.logo = new Image;

    this.logo.addEventListener("load", function() {
      self.ready = true;
      self.createElements();
    });

    this.logo.src = this.logoRaw;

    this.background = "#000";

    if (window.getComputedStyle) {
      this.background = window.getComputedStyle(document.body).backgroundColor || "#000";
    }


  },

  enter: function() {

    this.current = 0;

  },

  leave: function() {

    this.locked = true;

    this.animation = this.app.tween(this)
      .to({
        current: 1
      }, 0.5);

  },

  step: function(delta) {

    if (this.locked) {

      if (this.animation.finished) {
        this.locked = false;
        this.wrapper.parentNode.removeChild(this.wrapper);
      }

    } else {

      this.current = this.current + Math.abs(this.app.loader.progress - this.current) * delta;
    }

  },

  createElements: function() {

    this.width = window.innerWidth * 0.6 | 0;
    this.height = window.innerHeight * 0.1 | 0;

    this.wrapper = document.createElement("div");
    this.wrapper.style.width = this.width + "px";
    this.wrapper.style.height = this.height + "px";
    this.wrapper.style.background = "#000";
    this.wrapper.style.border = "4px solid #fff";
    this.wrapper.style.position = "absolute";
    this.wrapper.style.left = (window.innerWidth / 2 - this.width / 2 | 0) + "px";
    this.wrapper.style.top = (window.innerHeight / 2 - this.height / 2 | 0) + "px";
    this.wrapper.style.zIndex = 100;

    this.app.container.appendChild(this.wrapper);

    this.progressBar = document.createElement("div");
    this.progressBar.style.width = "0%";
    this.progressBar.style.height = this.height + "px";
    this.progressBar.style.background = "#fff";

    this.wrapper.appendChild(this.progressBar);

  },


  render: function() {

    if (!this.ready) return;

    this.progressBar.style.width = (this.current * 100 | 0) + "%";


  }

};

/* file: src/lib/CanvasQuery.js */

/*

  Canvas Query r2

  http://canvasquery.com

  (c) 2012-2015 http://rezoner.net

  Canvas Query may be freely distributed under the MIT license.

  ! fixed color parsers

*/


(function() {

  var COCOONJS = false;

  var Canvas = window.HTMLCanvasElement;
  var Image = window.HTMLImageElement;
  var COCOONJS = navigator.isCocoonJS;

  var cq = function(selector) {
    if (arguments.length === 0) {
      var canvas = cq.createCanvas(window.innerWidth, window.innerHeight);
      window.addEventListener("resize", function() {
        // canvas.width = window.innerWidth;
        // canvas.height = window.innerHeight;
      });
    } else if (typeof selector === "string") {
      var canvas = document.querySelector(selector);
    } else if (typeof selector === "number") {
      var canvas = cq.createCanvas(arguments[0], arguments[1]);
    } else if (selector instanceof Image) {
      var canvas = cq.createCanvas(selector);
    } else if (selector instanceof cq.Layer) {
      return selector;
    } else {
      var canvas = selector;
    }

    return new cq.Layer(canvas);
  };

  cq.lineSpacing = 1.0;
  cq.defaultFont = "Arial";

  cq.cocoon = function(selector) {
    if (arguments.length === 0) {
      var canvas = cq.createCocoonCanvas(window.innerWidth, window.innerHeight);
      window.addEventListener("resize", function() {});
    } else if (typeof selector === "string") {
      var canvas = document.querySelector(selector);
    } else if (typeof selector === "number") {
      var canvas = cq.createCocoonCanvas(arguments[0], arguments[1]);
    } else if (selector instanceof Image) {
      var canvas = cq.createCocoonCanvas(selector);
    } else if (selector instanceof cq.Layer) {
      return selector;
    } else {
      var canvas = selector;
    }

    return new cq.Layer(canvas);
  }

  /* fast.js */

  cq.fastApply = function(subject, thisContext, args) {

    switch (args.length) {
      case 0:
        return subject.call(thisContext);
      case 1:
        return subject.call(thisContext, args[0]);
      case 2:
        return subject.call(thisContext, args[0], args[1]);
      case 3:
        return subject.call(thisContext, args[0], args[1], args[2]);
      case 4:
        return subject.call(thisContext, args[0], args[1], args[2], args[3]);
      case 5:
        return subject.call(thisContext, args[0], args[1], args[2], args[3], args[4]);
      case 6:
        return subject.call(thisContext, args[0], args[1], args[2], args[3], args[4], args[5]);
      case 7:
        return subject.call(thisContext, args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
      case 8:
        return subject.call(thisContext, args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7]);
      case 9:
        return subject.call(thisContext, args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8]);
      default:
        return subject.apply(thisContext, args);
    }

  };

  cq.extend = function() {
    for (var i = 1; i < arguments.length; i++) {
      for (var j in arguments[i]) {
        arguments[0][j] = arguments[i][j];
      }
    }

    return arguments[0];
  };

  cq.augment = function() {
    for (var i = 1; i < arguments.length; i++) {
      _.extend(arguments[0], arguments[i]);
      arguments[i](arguments[0]);
    }
  };

  cq.distance = function(x1, y1, x2, y2) {
    if (arguments.length > 2) {
      var dx = x1 - x2;
      var dy = y1 - y2;

      return Math.sqrt(dx * dx + dy * dy);
    } else {
      return Math.abs(x1 - y1);
    }
  };

  cq.extend(cq, {

    smoothing: true,

    blend: function(below, above, mode, mix) {

      if (typeof mix === "undefined") mix = 1;

      var below = cq(below);
      var mask = below.clone();
      var above = cq(above);

      below.save();
      below.globalAlpha(mix);
      below.globalCompositeOperation(mode);
      below.drawImage(above.canvas, 0, 0);
      below.restore();

      mask.save();
      mask.globalCompositeOperation("source-in");
      mask.drawImage(below.canvas, 0, 0);
      mask.restore();

      return mask;
    },

    matchColor: function(color, palette) {
      var rgbPalette = [];

      for (var i = 0; i < palette.length; i++) {
        rgbPalette.push(cq.color(palette[i]));
      }

      var imgData = cq.color(color);

      var difList = [];
      for (var j = 0; j < rgbPalette.length; j++) {
        var rgbVal = rgbPalette[j];
        var rDif = Math.abs(imgData[0] - rgbVal[0]),
          gDif = Math.abs(imgData[1] - rgbVal[1]),
          bDif = Math.abs(imgData[2] - rgbVal[2]);
        difList.push(rDif + gDif + bDif);
      }

      var closestMatch = 0;
      for (var j = 0; j < palette.length; j++) {
        if (difList[j] < difList[closestMatch]) {
          closestMatch = j;
        }
      }

      return palette[closestMatch];
    },

    temp: function(width, height) {
      if (!this.tempLayer) {
        this.tempLayer = cq(1, 1);
      }

      if (width instanceof Image) {
        this.tempLayer.width = width.width;
        this.tempLayer.height = width.height;
        this.tempLayer.context.drawImage(width, 0, 0);
      } else if (width instanceof Canvas) {
        this.tempLayer.width = width.width;
        this.tempLayer.height = width.height;
        this.tempLayer.context.drawImage(width, 0, 0);
      } else if (width instanceof CanvasQuery.Layer) {
        this.tempLayer.width = width.width;
        this.tempLayer.height = width.height;
        this.tempLayer.context.drawImage(width.canvas, 0, 0);
      } else {
        this.tempLayer.width = width;
        this.tempLayer.height = height;
      }

      return this.tempLayer;
    },

    wrapValue: function(value, min, max) {
      if (value < min) return max + (value % max);
      if (value >= max) return value % max;
      return value;
    },

    limitValue: function(value, min, max) {
      return value < min ? min : value > max ? max : value;
    },

    mix: function(a, b, amount) {
      return a + (b - a) * amount;
    },

    hexToRgb: function(hex) {
      if (hex.length === 7) return ['0x' + hex[1] + hex[2] | 0, '0x' + hex[3] + hex[4] | 0, '0x' + hex[5] + hex[6] | 0];
      else return ['0x' + hex[1] + hex[1] | 0, '0x' + hex[2] + hex[2] | 0, '0x' + hex[3] + hex[3] | 0];
    },

    rgbToHex: function(r, g, b) {
      return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1, 7);
    },

    /* author: http://mjijackson.com/ */

    rgbToHsl: function(r, g, b) {

      if (r instanceof Array) {
        b = r[2];
        g = r[1];
        r = r[0];
      }

      r /= 255, g /= 255, b /= 255;
      var max = Math.max(r, g, b),
        min = Math.min(r, g, b);
      var h, s, l = (max + min) / 2;

      if (max == min) {
        h = s = 0; // achromatic
      } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h = (b - r) / d + 2;
            break;
          case b:
            h = (r - g) / d + 4;
            break;
        }
        h /= 6;
      }

      return [h, s, l];
    },

    /* author: http://mjijackson.com/ */

    hue2rgb: function(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    },

    hslToRgb: function(h, s, l) {
      var r, g, b;

      if (s == 0) {
        r = g = b = l; // achromatic
      } else {

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = this.hue2rgb(p, q, h + 1 / 3);
        g = this.hue2rgb(p, q, h);
        b = this.hue2rgb(p, q, h - 1 / 3);
      }

      return [r * 255 | 0, g * 255 | 0, b * 255 | 0];
    },

    rgbToHsv: function(r, g, b) {
      if (r instanceof Array) {
        b = r[2];
        g = r[1];
        r = r[0];
      }

      r = r / 255, g = g / 255, b = b / 255;
      var max = Math.max(r, g, b),
        min = Math.min(r, g, b);
      var h, s, v = max;

      var d = max - min;
      s = max == 0 ? 0 : d / max;

      if (max == min) {
        h = 0; // achromatic
      } else {
        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h = (b - r) / d + 2;
            break;
          case b:
            h = (r - g) / d + 4;
            break;
        }
        h /= 6;
      }

      return [h, s, v];
    },

    hsvToRgb: function(h, s, v) {
      var r, g, b;

      var i = Math.floor(h * 6);
      var f = h * 6 - i;
      var p = v * (1 - s);
      var q = v * (1 - f * s);
      var t = v * (1 - (1 - f) * s);

      switch (i % 6) {
        case 0:
          r = v, g = t, b = p;
          break;
        case 1:
          r = q, g = v, b = p;
          break;
        case 2:
          r = p, g = v, b = t;
          break;
        case 3:
          r = p, g = q, b = v;
          break;
        case 4:
          r = t, g = p, b = v;
          break;
        case 5:
          r = v, g = p, b = q;
          break;
      }

      return [r * 255, g * 255, b * 255];
    },

    color: function() {
      var result = new cq.Color();
      result.parse(arguments[0], arguments[1]);
      return result;
    },

    poolArray: [],

    pool: function() {

      if (!this.poolArray.length) {
        for (var i = 0; i < 100; i++) {
          this.poolArray.push(this.createCanvas(1, 1));
        }
      }

      return this.poolArray.pop();

    },

    createCanvas: function(width, height) {
      var result = document.createElement("canvas");

      if (arguments[0] instanceof Image || arguments[0] instanceof Canvas) {
        var image = arguments[0];
        result.width = image.width;
        result.height = image.height;
        result.getContext("2d").drawImage(image, 0, 0);
      } else {
        result.width = width;
        result.height = height;
      }


      return result;
    },

    createCocoonCanvas: function(width, height) {
      var result = document.createElement("screencanvas");

      if (arguments[0] instanceof Image) {
        var image = arguments[0];
        result.width = image.width;
        result.height = image.height;
        result.getContext("2d").drawImage(image, 0, 0);
      } else {
        result.width = width;
        result.height = height;
      }

      return result;
    },

    createImageData: function(width, height) {
      return cq.createCanvas(width, height).getContext("2d").createImageData(width, height);
    }

  });

  cq.Layer = function(canvas) {
    this.context = canvas.getContext("2d");
    this.canvas = canvas;
    this.alignX = 0;
    this.alignY = 0;
    this.aligned = false;
    this.update();
  };

  cq.Layer.prototype = {

    update: function() {

      var smoothing = cq.smoothing;

      if (typeof this.smoothing !== "undefined") smoothing = this.smoothing;

      this.context.mozImageSmoothingEnabled = smoothing;
      this.context.msImageSmoothingEnabled = smoothing;
      this.context.imageSmoothingEnabled = smoothing;

      if (COCOONJS) Cocoon.Utils.setAntialias(smoothing);
    },

    appendTo: function(selector) {
      if (typeof selector === "object") {
        var element = selector;
      } else {
        var element = document.querySelector(selector);
      }

      element.appendChild(this.canvas);

      return this;
    },

    a: function(a) {
      if (arguments.length) {
        this.previousAlpha = this.globalAlpha();
        return this.globalAlpha(a);
      } else
        return this.globalAlpha();
    },

    ra: function() {
      return this.a(this.previousAlpha);
    },
    /*
        drawImage: function() {

          if (!this.alignX && !this.alignY) {
            this.context.call
          }

            return this;


        },

        restore: function() {
          this.context.restore();
          this.alignX = 0;
          this.alignY = 0;
        },
        */

    realign: function() {

      this.alignX = this.prevAlignX;
      this.alignY = this.prevAlignY;

      return this;

    },

    align: function(x, y) {

      if (typeof y === "undefined") y = x;

      this.alignX = x;
      this.alignY = y;

      return this;
    },


    /* save translate align rotate scale */

    stars: function(x, y, alignX, alignY, rotation, scaleX, scaleY) {

      if (typeof alignX === "undefined") alignX = 0.5;
      if (typeof alignY === "undefined") alignY = 0.5;
      if (typeof rotation === "undefined") rotation = 0;
      if (typeof scaleX === "undefined") scaleX = 1.0;
      if (typeof scaleY === "undefined") scaleY = scaleX;

      this.save();
      this.translate(x, y);
      this.align(alignX, alignY);
      this.rotate(rotation);
      this.scale(scaleX, scaleY);

      return this;
    },

    tars: function(x, y, alignX, alignY, rotation, scaleX, scaleY) {

      if (typeof alignX === "undefined") alignX = 0.5;
      if (typeof alignY === "undefined") alignY = 0.5;
      if (typeof rotation === "undefined") rotation = 0;
      if (typeof scaleX === "undefined") scaleX = 1.0;
      if (typeof scaleY === "undefined") scaleY = scaleX;

      this.translate(x, y);
      this.align(alignX, alignY);
      this.rotate(rotation);
      this.scale(scaleX, scaleY);

      return this;

    },

    fillRect: function(x, y, w, h) {

      if (this.alignX || this.alignY) {
        x -= w * this.alignX | 0;
        y -= h * this.alignY | 0;
      }

      this.context.fillRect(x, y, w, h);

      return this;

    },

    strokeRect: function(x, y, w, h) {

      if (this.alignX || this.alignY) {
        x -= w * this.alignX | 0;
        y -= h * this.alignY | 0;
      }

      this.context.strokeRect(x, y, w, h);

      return this;

    },

    drawImage: function(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {

      if (this.alignX || this.alignY) {
        if (sWidth == null) {
          sx -= image.width * this.alignX | 0;
          sy -= image.height * this.alignY | 0;
        } else {
          dx -= dWidth * this.alignX | 0;
          dy -= dHeight * this.alignY | 0;
        }
      }

      if (sWidth == null) {
        this.context.drawImage(image, sx, sy);
      } else if (dx == null) {
        this.context.drawImage(image, sx, sy, sWidth, sHeight);
      } else {
        this.context.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
      }

      // cq.fastApply(this.context.drawImage, this.context, arguments);

      return this;

    },

    save: function() {
      this.prevAlignX = this.alignX;
      this.prevAlignY = this.alignY;

      this.context.save();

      return this;
    },

    restore: function() {

      this.realign();
      this.context.restore();
      return this;
    },

    drawTile: function(image, x, y, frameX, frameY, frameWidth, frameHeight, frames, frame) {

    },

    drawAtlasFrame: function(atlas, frame, x, y) {

      var frame = atlas.frames[frame];

      this.drawRegion(
        atlas.image,
        frame.region,
        x - frame.width * this.alignX + frame.offset[0] + frame.region[2] * this.alignX, y - frame.height * this.alignY + frame.offset[1] + frame.region[3] * this.alignY
      );

      return this;

    },


    imageFill: function(image, width, height) {

      var scale = Math.max(width / image.width, height / image.height);

      this.save();
      this.scale(scale, scale);
      this.drawImage(image, 0, 0);
      this.restore();

    },

    drawRegion: function(image, region, x, y, scale) {

      scale = scale || 1;

      var dWidth = region[2] * scale | 0;
      var dHeight = region[3] * scale | 0;

      this.context.drawImage(
        image, region[0], region[1], region[2], region[3],
        x - dWidth * this.alignX | 0, y - dHeight * this.alignY | 0, dWidth, dHeight
      );

      return this;
    },

    cache: function() {

      return this.clone().canvas;

    },

    blendOn: function(what, mode, mix) {

      cq.blend(what, this, mode, mix);

      return this;
      
    },

    posterize: function(pc, inc) {
      pc = pc || 32;
      inc = inc || 4;
      var imgdata = this.getImageData(0, 0, this.width, this.height);
      var data = imgdata.data;

      for (var i = 0; i < data.length; i += inc) {
        data[i] -= data[i] % pc; // set value to nearest of 8 possibilities
        data[i + 1] -= data[i + 1] % pc; // set value to nearest of 8 possibilities
        data[i + 2] -= data[i + 2] % pc; // set value to nearest of 8 possibilities
      }

      this.putImageData(imgdata, 0, 0); // put image data to canvas

      return this;
    },


    bw: function(pc) {
      pc = 128;
      var imgdata = this.getImageData(0, 0, this.width, this.height);
      var data = imgdata.data;
      // 8-bit: rrr ggg bb
      for (var i = 0; i < data.length; i += 4) {
        var v = ((data[i] + data[i + 1] + data[i + 2]) / 3);

        v = (v / 128 | 0) * 128;
        //data[i] = v; // set value to nearest of 8 possibilities
        //data[i + 1] = v; // set value to nearest of 8 possibilities
        data[i + 2] = (v / 255) * data[i]; // set value to nearest of 8 possibilities

      }

      this.putImageData(imgdata, 0, 0); // put image data to canvas
    },

    blend: function(what, mode, mix) {
      if (typeof what === "string") {
        var color = what;
        what = cq(this.canvas.width, this.canvas.height);
        what.fillStyle(color).fillRect(0, 0, this.canvas.width, this.canvas.height);
      }

      var result = cq.blend(this, what, mode, mix);

      this.canvas = result.canvas;
      this.context = result.context;

      return this;
    },

    textWithBackground: function(text, x, y, background, padding) {
      var w = this.measureText(text).width;
      var h = this.fontHeight() * 0.8;
      var f = this.fillStyle();
      var padding = padding || 2;

      this.fillStyle(background).fillRect(x - w / 2 - padding * 2, y - padding, w + padding * 4, h + padding * 2)
      this.fillStyle(f).textAlign("center").textBaseline("top").fillText(text, x, y);

      return this;
    },

    fillCircle: function(x, y, r) {
      this.context.beginPath();
      this.context.arc(x, y, r, 0, Math.PI * 2);
      this.context.fill();
      return this;
    },

    strokeCircle: function(x, y, r) {
      this.context.beginPath();
      this.context.arc(x, y, r, 0, Math.PI * 2);
      this.context.stroke();
      return this;
    },

    circle: function(x, y, r) {
      this.context.beginPath();
      this.context.arc(x, y, r, 0, Math.PI * 2);
      return this;
    },

    crop: function(x, y, w, h) {

      if (arguments.length === 1) {

        var y = arguments[0][1];
        var w = arguments[0][2];
        var h = arguments[0][3];
        var x = arguments[0][0];
      }

      var canvas = cq.createCanvas(w, h);
      var context = canvas.getContext("2d");

      context.drawImage(this.canvas, x, y, w, h, 0, 0, w, h);
      this.canvas.width = w;
      this.canvas.height = h;
      this.clear();
      this.context.drawImage(canvas, 0, 0);

      return this;
    },

    set: function(properties) {
      cq.extend(this.context, properties);
    },

    resize: function(width, height) {
      var w = width,
        h = height;

      if (arguments.length === 1) {
        w = arguments[0] * this.canvas.width | 0;
        h = arguments[0] * this.canvas.height | 0;
      } else {

        if (height === false) {
          if (this.canvas.width > width) {
            h = this.canvas.height * (width / this.canvas.width) | 0;
            w = width;
          } else {
            w = this.canvas.width;
            h = this.canvas.height;
          }
        } else if (width === false) {
          if (this.canvas.width > width) {
            w = this.canvas.width * (height / this.canvas.height) | 0;
            h = height;
          } else {
            w = this.canvas.width;
            h = this.canvas.height;
          }
        }
      }

      var cqresized = cq(w, h).drawImage(this.canvas, 0, 0, this.canvas.width, this.canvas.height, 0, 0, w, h);
      this.canvas = cqresized.canvas;
      this.context = cqresized.context;

      return this;
    },

    imageLine: function(image, region, x, y, ex, ey, scale) {
      if (!region) region = [0, 0, image.width, image.height];

      var distance = cq.distance(x, y, ex, ey);
      var count = distance / region[3] + 0.5 | 0;
      var angle = Math.atan2(ey - y, ex - x) + Math.PI / 2;

      this.save();

      this.translate(x, y);
      this.rotate(angle);

      if (scale) this.scale(scale, 1.0);

      for (var i = 0; i <= count; i++) {
        this.drawRegion(image, region, -region[2] / 2 | 0, -region[3] * (i + 1));
      }

      this.restore();

      return this;
    },

    trim: function(color, changes) {
      var transparent;

      if (color) {
        color = cq.color(color).toArray();
        transparent = !color[3];
      } else transparent = true;

      var sourceData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
      var sourcePixels = sourceData.data;

      var bound = [this.canvas.width, this.canvas.height, 0, 0];

      var width = this.canvas.width;
      var height = this.canvas.height;

      for (var i = 0, len = sourcePixels.length; i < len; i += 4) {
        if (transparent) {
          if (!sourcePixels[i + 3]) continue;
        } else if (sourcePixels[i + 0] === color[0] && sourcePixels[i + 1] === color[1] && sourcePixels[i + 2] === color[2]) continue;

        var x = (i / 4 | 0) % this.canvas.width | 0;
        var y = (i / 4 | 0) / this.canvas.width | 0;

        if (x < bound[0]) bound[0] = x;
        if (x > bound[2]) bound[2] = x;

        if (y < bound[1]) bound[1] = y;
        if (y > bound[3]) bound[3] = y;
      }


      if (bound[2] === 0 && bound[3] === 0) {} else {
        if (changes) {
          changes.left = bound[0];
          changes.top = bound[1];

          changes.bottom = height - bound[3];
          changes.right = width - bound[2] - bound[0];

          changes.width = bound[2] - bound[0];
          changes.height = bound[3] - bound[1];
        }

        this.crop(bound[0], bound[1], bound[2] - bound[0] + 1, bound[3] - bound[1] + 1);
      }

      return this;
    },

    matchPalette: function(palette) {
      var imgData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);

      var rgbPalette = [];

      for (var i = 0; i < palette.length; i++) {
        rgbPalette.push(cq.color(palette[i]));
      }


      for (var i = 0; i < imgData.data.length; i += 4) {
        var difList = [];
        if (!imgData.data[i + 3]) continue;

        for (var j = 0; j < rgbPalette.length; j++) {
          var rgbVal = rgbPalette[j];
          var rDif = Math.abs(imgData.data[i] - rgbVal[0]),
            gDif = Math.abs(imgData.data[i + 1] - rgbVal[1]),
            bDif = Math.abs(imgData.data[i + 2] - rgbVal[2]);
          difList.push(rDif + gDif + bDif);
        }

        var closestMatch = 0;

        for (var j = 0; j < palette.length; j++) {
          if (difList[j] < difList[closestMatch]) {
            closestMatch = j;
          }
        }

        var paletteRgb = cq.hexToRgb(palette[closestMatch]);
        imgData.data[i] = paletteRgb[0];
        imgData.data[i + 1] = paletteRgb[1];
        imgData.data[i + 2] = paletteRgb[2];

        /* dithering */
        //imgData.data[i + 3] = (255 * Math.random() < imgData.data[i + 3]) ? 255 : 0;

        //imgData.data[i + 3] = imgData.data[i + 3] > 128 ? 255 : 0;
        /*
        if (i % 3 === 0) {
          imgData.data[i] -= cq.limitValue(imgData.data[i] - 50, 0, 255);
          imgData.data[i + 1] -= cq.limitValue(imgData.data[i + 1] - 50, 0, 255);
          imgData.data[i + 2] -= cq.limitValue(imgData.data[i + 2] - 50, 0, 255);
        }
        */

      }

      this.context.putImageData(imgData, 0, 0);

      return this;
    },

    getPalette: function() {
      var palette = [];
      var sourceData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
      var sourcePixels = sourceData.data;

      for (var i = 0, len = sourcePixels.length; i < len; i += 4) {
        if (sourcePixels[i + 3]) {
          var hex = cq.rgbToHex(sourcePixels[i + 0], sourcePixels[i + 1], sourcePixels[i + 2]);
          if (palette.indexOf(hex) === -1) palette.push(hex);
        }
      }

      return palette;
    },

    mapPalette: function() {

    },

    beginPath: function() {

      this.context.beginPath();

      return this;

    },

    moveTo: function(x, y) {

      this.context.moveTo(x, y);

      return this;

    },

    fillText: function(text, x, y) {

      this.context.fillText(text, x, y);

      return this;

    },

    stroke: function() {

      this.context.stroke();

      return this;

    },

    polygon: function(array) {

      this.beginPath();

      this.moveTo(array[0][0], array[0][1]);

      for (var i = 1; i < array.length; i++) {
        this.lineTo(array[i][0], array[i][1]);
      }

      this.closePath();

      return this;
    },

    fillPolygon: function(polygon) {
      this.beginPath();
      this.polygon(polygon);
      this.fill();
    },

    strokePolygon: function(polygon) {
      this.beginPath();
      this.polygon(polygon);
      this.stroke();
    },

    colorToMask: function(color, inverted) {
      color = cq.color(color).toArray();
      var sourceData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
      var sourcePixels = sourceData.data;

      var mask = [];

      for (var i = 0, len = sourcePixels.length; i < len; i += 4) {
        if (sourcePixels[i + 3] > 0) mask.push(inverted ? false : true);
        else mask.push(inverted ? true : false);
      }

      return mask;
    },

    grayscaleToMask: function() {

      var sourceData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
      var sourcePixels = sourceData.data;

      var mask = [];

      for (var i = 0, len = sourcePixels.length; i < len; i += 4) {
        mask.push(((sourcePixels[i + 0] + sourcePixels[i + 1] + sourcePixels[i + 2]) / 3) / 255);
      }

      return mask;
    },

    applyMask: function(mask) {
      var sourceData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
      var sourcePixels = sourceData.data;

      var mode = typeof mask[0] === "boolean" ? "bool" : "byte";

      for (var i = 0, len = sourcePixels.length; i < len; i += 4) {
        var value = mask[i / 4];
        sourcePixels[i + 3] = value * 255 | 0;
      }

      this.context.putImageData(sourceData, 0, 0);
      return this;
    },

    fillMask: function(mask) {

      var sourceData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
      var sourcePixels = sourceData.data;

      var maskType = typeof mask[0] === "boolean" ? "bool" : "byte";
      var colorMode = arguments.length === 2 ? "normal" : "gradient";

      var color = cq.color(arguments[1]);
      if (colorMode === "gradient") colorB = cq.color(arguments[2]);

      for (var i = 0, len = sourcePixels.length; i < len; i += 4) {
        var value = mask[i / 4];

        if (maskType === "byte") value /= 255;

        if (colorMode === "normal") {
          if (value) {
            sourcePixels[i + 0] = color[0] | 0;
            sourcePixels[i + 1] = color[1] | 0;
            sourcePixels[i + 2] = color[2] | 0;
            sourcePixels[i + 3] = value * 255 | 0;
          }
        } else {
          sourcePixels[i + 0] = color[0] + (colorB[0] - color[0]) * value | 0;
          sourcePixels[i + 1] = color[1] + (colorB[1] - color[1]) * value | 0;
          sourcePixels[i + 2] = color[2] + (colorB[2] - color[2]) * value | 0;
          sourcePixels[i + 3] = 255;
        }
      }

      this.context.putImageData(sourceData, 0, 0);
      return this;
    },

    clear: function(color) {
      if (color) {
        this.context.fillStyle = color;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
      } else {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }

      return this;
    },

    clone: function() {

      // var result = cq.createCanvas(this.canvas);

      var result = cq.pool();
      result.width = this.width;
      result.height = this.height;
      result.getContext("2d").drawImage(this.canvas, 0, 0);

      return cq(result);
    },

    gradientText: function(text, x, y, maxWidth, gradient) {

      var words = text.split(" ");

      var h = this.fontHeight() * 2;

      var ox = 0;
      var oy = 0;

      if (maxWidth) {
        var line = 0;
        var lines = [""];

        for (var i = 0; i < words.length; i++) {
          var word = words[i] + " ";
          var wordWidth = this.context.measureText(word).width;

          if (ox + wordWidth > maxWidth) {
            lines[++line] = "";
            ox = 0;
          }

          lines[line] += word;

          ox += wordWidth;
        }
      } else var lines = [text];

      for (var i = 0; i < lines.length; i++) {
        var oy = y + i * h * 0.6 | 0;
        var lingrad = this.context.createLinearGradient(0, oy, 0, oy + h * 0.6 | 0);

        for (var j = 0; j < gradient.length; j += 2) {
          lingrad.addColorStop(gradient[j], gradient[j + 1]);
        }

        var text = lines[i];

        this.fillStyle(lingrad).fillText(text, x, oy);
      }

      return this;
    },

    removeColor: function(color) {

      color = cq.color(color);

      var data = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
      var pixels = data.data;

      for (var x = 0; x < this.canvas.width; x++) {
        for (var y = 0; y < this.canvas.height; y++) {
          var i = (y * this.canvas.width + x) * 4;

          if (pixels[i + 0] === color[0] && pixels[i + 1] === color[1] && pixels[i + 2] === color[2]) {
            pixels[i + 3] = 0;
          }


        }
      }

      this.clear();
      this.context.putImageData(data, 0, 0);

      return this;
    },

    outline: function() {
      var data = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
      var pixels = data.data;

      var newData = this.createImageData(this.canvas.width, this.canvas.height);
      var newPixels = newData.data;

      var canvas = this.canvas;

      function check(x, y) {

        if (x < 0) return 0;
        if (x >= canvas.width) return 0;
        if (y < 0) return 0;
        if (y >= canvas.height) return 0;

        var i = (x + y * canvas.width) * 4;

        return pixels[i + 3] > 0;

      }

      for (var x = 0; x < this.canvas.width; x++) {
        for (var y = 0; y < this.canvas.height; y++) {

          var full = 0;
          var i = (y * canvas.width + x) * 4;

          if (!pixels[i + 3]) continue;

          full += check(x - 1, y);
          full += check(x + 1, y);
          full += check(x, y - 1);
          full += check(x, y + 1);

          if (full !== 4) {

            newPixels[i] = 255;
            newPixels[i + 1] = 255;
            newPixels[i + 2] = 255;
            newPixels[i + 3] = 255;
          }

        }
      }

      this.context.putImageData(newData, 0, 0);

      return this;
    },

    setHsl: function() {

      if (arguments.length === 1) {
        var args = arguments[0];
      } else {
        var args = arguments;
      }

      var data = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
      var pixels = data.data;
      var r, g, b, a, h, s, l, hsl = [],
        newPixel = [];

      for (var i = 0, len = pixels.length; i < len; i += 4) {
        hsl = cq.rgbToHsl(pixels[i + 0], pixels[i + 1], pixels[i + 2]);

        h = args[0] === false ? hsl[0] : cq.limitValue(args[0], 0, 1);
        s = args[1] === false ? hsl[1] : cq.limitValue(args[1], 0, 1);
        l = args[2] === false ? hsl[2] : cq.limitValue(args[2], 0, 1);

        newPixel = cq.hslToRgb(h, s, l);

        pixels[i + 0] = newPixel[0];
        pixels[i + 1] = newPixel[1];
        pixels[i + 2] = newPixel[2];
      }

      this.context.putImageData(data, 0, 0);

      return this;
    },

    shiftHsl: function() {

      if (arguments.length === 1) {
        var args = arguments[0];
      } else {
        var args = arguments;
      }

      var data = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
      var pixels = data.data;
      var r, g, b, a, h, s, l, hsl = [],
        newPixel = [];

      for (var i = 0, len = pixels.length; i < len; i += 4) {
        hsl = cq.rgbToHsl(pixels[i + 0], pixels[i + 1], pixels[i + 2]);

        if (pixels[i + 0] !== pixels[i + 1] || pixels[i + 1] !== pixels[i + 2]) {
          h = args[0] === false ? hsl[0] : cq.wrapValue(hsl[0] + args[0], 0, 1);
          s = args[1] === false ? hsl[1] : cq.limitValue(hsl[1] + args[1], 0, 1);
        } else {
          h = hsl[0];
          s = hsl[1];
        }

        l = args[2] === false ? hsl[2] : cq.limitValue(hsl[2] + args[2], 0, 1);

        newPixel = cq.hslToRgb(h, s, l);

        pixels[i + 0] = newPixel[0];
        pixels[i + 1] = newPixel[1];
        pixels[i + 2] = newPixel[2];
      }


      this.context.putImageData(data, 0, 0);

      return this;
    },

    applyColor: function(color) {

      if (COCOONJS) return this;
      this.save();

      this.globalCompositeOperation("source-in");
      this.clear(color);

      this.restore();

      return this;
    },

    negative: function(src, dst) {

      var data = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
      var pixels = data.data;
      var r, g, b, a, h, s, l, hsl = [],
        newPixel = [];

      for (var i = 0, len = pixels.length; i < len; i += 4) {
        pixels[i + 0] = 255 - pixels[i + 0];
        pixels[i + 1] = 255 - pixels[i + 1];
        pixels[i + 2] = 255 - pixels[i + 2];
      }

      this.context.putImageData(data, 0, 0);

      return this;
    },

    roundRect: function(x, y, width, height, radius) {

      this.beginPath();
      this.moveTo(x + radius, y);
      this.lineTo(x + width - radius, y);
      this.quadraticCurveTo(x + width, y, x + width, y + radius);
      this.lineTo(x + width, y + height - radius);
      this.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      this.lineTo(x + radius, y + height);
      this.quadraticCurveTo(x, y + height, x, y + height - radius);
      this.lineTo(x, y + radius);
      this.quadraticCurveTo(x, y, x + radius, y);
      this.closePath();

      return this;
    },

    markupText: function(text) {


    },

    wrappedText: function(text, x, y, maxWidth, lineHeight) {

      var words = text.split(" ");

      var lineHeight = lineHeight || this.fontHeight();

      var ox = 0;
      var oy = 0;

      if (maxWidth) {
        var line = 0;
        var lines = [""];

        for (var i = 0; i < words.length; i++) {
          var word = words[i] + " ";
          var wordWidth = this.context.measureText(word).width;

          if (ox + wordWidth > maxWidth || words[i] === "\n") {
            lines[++line] = "";
            ox = 0;
          }
          if (words[i] !== "\n") {
            lines[line] += word;

            ox += wordWidth;
          }


        }
      } else {
        var lines = [text];
      }

      for (var i = 0; i < lines.length; i++) {
        var oy = y + i * lineHeight | 0;

        var text = lines[i];

        this.fillText(text, x, oy);
      }

      return this;
    },

    fontHeights: {},

    fontHeight: function() {
      var font = this.font();

      if (!this.fontHeights[font]) {
        var temp = cq(100, 100);
        var height = 0;
        var changes = {};
        temp.font(font).fillStyle("#fff");
        temp.textBaseline("bottom").fillText("gM", 25, 100);
        temp.trim(false, changes);
        height += changes.bottom;

        var temp = cq(100, 100);
        var changes = {};
        temp.font(font).fillStyle("#fff");
        temp.textBaseline("top").fillText("gM", 25, 0);
        temp.trim(false, changes);
        height += changes.top;

        var temp = cq(100, 100);
        var changes = {};
        temp.font(font).fillStyle("#fff");
        temp.textBaseline("alphabetic").fillText("gM", 50, 50);
        temp.trim(false, changes);
        height += temp.height;

        this.fontHeights[font] = height;
      }

      return this.fontHeights[font];
    },

    textBoundaries: function(text, maxWidth) {
      var words = text.split(" ");

      var h = this.fontHeight();

      var ox = 0;
      var oy = 0;

      if (maxWidth) {
        var line = 0;
        var lines = [""];

        for (var i = 0; i < words.length; i++) {
          var word = words[i] + " ";
          var wordWidth = this.context.measureText(word).width;

          if (ox + wordWidth > maxWidth || words[i] === "\n") {
            lines[++line] = "";
            ox = 0;
          }

          if (words[i] !== "\n") {
            lines[line] += word;
            ox += wordWidth;
          }
        }
      } else {
        var lines = [text];
        maxWidth = this.measureText(text).width;
      }

      return {
        height: lines.length * h,
        width: maxWidth,
        lines: lines.length,
        lineHeight: h
      }
    },

    repeatImageRegion: function(image, sx, sy, sw, sh, dx, dy, dw, dh) {
      this.save();
      this.rect(dx, dy, dw, dh);
      this.clip();

      for (var x = 0, len = Math.ceil(dw / sw); x < len; x++) {
        for (var y = 0, leny = Math.ceil(dh / sh); y < leny; y++) {
          this.drawImage(image, sx, sy, sw, sh, dx + x * sw, dy + y * sh, sw, sh);
        }
      }

      this.restore();

      return this;
    },

    repeatImage: function(image, x, y, w, h) {
      // if (!env.details) return this;

      if (arguments.length < 9) {
        this.repeatImageRegion(image, 0, 0, image.width, image.height, x, y, w, h);
      } else {
        this.repeatImageRegion.apply(this, arguments);
      }

      return this;
    },

    borderImage: function(image, x, y, w, h, t, r, b, l, fill) {

      // if (!env.details) return this;

      if (typeof t === "object") {

        var bottomLeft = t.bottomLeft || [0, 0, 0, 0];
        var bottomRight = t.bottomRight || [0, 0, 0, 0];
        var topLeft = t.topLeft || [0, 0, 0, 0];
        var topRight = t.topRight || [0, 0, 0, 0];

        var clh = bottomLeft[3] + topLeft[3];
        var crh = bottomRight[3] + topRight[3];
        var ctw = topLeft[2] + topRight[2];
        var cbw = bottomLeft[2] + bottomRight[2];

        t.fillPadding = [0, 0, 0, 0];

        if (t.left) t.fillPadding[0] = t.left[2];
        if (t.top) t.fillPadding[1] = t.top[3];
        if (t.right) t.fillPadding[2] = t.right[2];
        if (t.bottom) t.fillPadding[3] = t.bottom[3];

        // if (!t.fillPadding) t.fillPadding = [0, 0, 0, 0];

        if (t.fill) {
          this.drawImage(image, t.fill[0], t.fill[1], t.fill[2], t.fill[3], x + t.fillPadding[0], y + t.fillPadding[1], w - t.fillPadding[2] - t.fillPadding[0], h - t.fillPadding[3] - t.fillPadding[1]);
        } else {
          // this.fillRect(x + t.fillPadding[0], y + t.fillPadding[1], w - t.fillPadding[2] - t.fillPadding[0], h - t.fillPadding[3] - t.fillPadding[1]);
        }

        if (t.left) this[t.left[4] === "stretch" ? "drawImage" : "repeatImage"](image, t.left[0], t.left[1], t.left[2], t.left[3], x, y + topLeft[3], t.left[2], h - clh);
        if (t.right) this[t.right[4] === "stretch" ? "drawImage" : "repeatImage"](image, t.right[0], t.right[1], t.right[2], t.right[3], x + w - t.right[2], y + topRight[3], t.right[2], h - crh);
        if (t.top) this[t.top[4] === "stretch" ? "drawImage" : "repeatImage"](image, t.top[0], t.top[1], t.top[2], t.top[3], x + topLeft[2], y, w - ctw, t.top[3]);
        if (t.bottom) this[t.bottom[4] === "stretch" ? "drawImage" : "repeatImage"](image, t.bottom[0], t.bottom[1], t.bottom[2], t.bottom[3], x + bottomLeft[2], y + h - t.bottom[3], w - cbw, t.bottom[3]);

        if (t.bottomLeft) this.drawImage(image, t.bottomLeft[0], t.bottomLeft[1], t.bottomLeft[2], t.bottomLeft[3], x, y + h - t.bottomLeft[3], t.bottomLeft[2], t.bottomLeft[3]);
        if (t.topLeft) this.drawImage(image, t.topLeft[0], t.topLeft[1], t.topLeft[2], t.topLeft[3], x, y, t.topLeft[2], t.topLeft[3]);
        if (t.topRight) this.drawImage(image, t.topRight[0], t.topRight[1], t.topRight[2], t.topRight[3], x + w - t.topRight[2], y, t.topRight[2], t.topRight[3]);
        if (t.bottomRight) this.drawImage(image, t.bottomRight[0], t.bottomRight[1], t.bottomRight[2], t.bottomRight[3], x + w - t.bottomRight[2], y + h - t.bottomRight[3], t.bottomRight[2], t.bottomRight[3]);


      } else {


        /* top */
        if (t > 0 && w - l - r > 0) this.drawImage(image, l, 0, image.width - l - r, t, x + l, y, w - l - r, t);

        /* bottom */
        if (b > 0 && w - l - r > 0) this.drawImage(image, l, image.height - b, image.width - l - r, b, x + l, y + h - b, w - l - r, b);
        //      console.log(x, y, w, h, t, r, b, l);
        //      console.log(image, 0, t, l, image.height - b - t, x, y + t, l, h - b - t);
        /* left */
        if (l > 0 && h - b - t > 0) this.drawImage(image, 0, t, l, image.height - b - t, x, y + t, l, h - b - t);


        /* right */
        if (r > 0 && h - b - t > 0) this.drawImage(image, image.width - r, t, r, image.height - b - t, x + w - r, y + t, r, h - b - t);

        /* top-left */
        if (l > 0 && t > 0) this.drawImage(image, 0, 0, l, t, x, y, l, t);

        /* top-right */
        if (r > 0 && t > 0) this.drawImage(image, image.width - r, 0, r, t, x + w - r, y, r, t);

        /* bottom-right */
        if (r > 0 && b > 0) this.drawImage(image, image.width - r, image.height - b, r, b, x + w - r, y + h - b, r, b);

        /* bottom-left */
        if (l > 0 && b > 0) this.drawImage(image, 0, image.height - b, l, b, x, y + h - b, l, b);

        if (fill) {
          if (typeof fill === "string") {
            this.fillStyle(fill).fillRect(x + l, y + t, w - l - r, h - t - b);
          } else {
            if (w - l - r > 0 && h - t - b > 0)
              this.drawImage(image, l, t, image.width - r - l, image.height - b - t, x + l, y + t, w - l - r, h - t - b);
          }
        }
      }
    },

    setPixel: function(color, x, y) {

      return this.fillStyle(color).fillRect(x, y, 1, 1);

    },

    getPixel: function(x, y) {
      var pixel = this.context.getImageData(x, y, 1, 1).data;
      return cq.color([pixel[0], pixel[1], pixel[2], pixel[3]]);
    },

    createImageData: function(width, height) {
      if (false && this.context.createImageData) {
        return this.context.createImageData.apply(this.context, arguments);
      } else {
        if (!this.emptyCanvas) {
          this.emptyCanvas = cq.createCanvas(width, height);
          this.emptyCanvasContext = this.emptyCanvas.getContext("2d");
        }

        this.emptyCanvas.width = width;
        this.emptyCanvas.height = height;
        return this.emptyCanvasContext.getImageData(0, 0, width, height);
      }
    },

    strokeLine: function(x1, y1, x2, y2) {

      this.beginPath();

      if (typeof x2 === "undefined") {
        this.moveTo(x1.x, x1.y);
        this.lineTo(y1.x, y1.y);
      } else {
        this.moveTo(x1, y1);
        this.lineTo(x2, y2);
      }

      this.stroke();

      return this;

    },

    setLineDash: function(dash) {
      if (this.context.setLineDash) {
        this.context.setLineDash(dash);
        return this;
      } else return this;
    },

    measureText: function() {
      return this.context.measureText.apply(this.context, arguments);
    },

    getLineDash: function() {
      return this.context.getLineDash();
    },

    createRadialGradient: function() {
      return this.context.createRadialGradient.apply(this.context, arguments);
    },

    createLinearGradient: function() {
      return this.context.createLinearGradient.apply(this.context, arguments);
    },

    createPattern: function() {
      return this.context.createPattern.apply(this.context, arguments);
    },

    getImageData: function() {
      return this.context.getImageData.apply(this.context, arguments);
    },

    /* If you think that I am retarded because I use fillRect to set
       pixels - read about premultipled alpha in canvas */

    writeMeta: function(data) {

      var json = JSON.stringify(data);

      json = encodeURIComponent(json);

      var bytes = [];

      for (var i = 0; i < json.length; i++) {
        bytes.push(json.charCodeAt(i));
        //      console.log(json[i])
      }

      bytes.push(127);

      var x = this.width - 1;
      var y = this.height - 1;

      var pixel = [];

      while (bytes.length) {

        var byte = bytes.shift();

        pixel.unshift(byte * 2);
        //        console.log(x + String.fromCharCode(byte), byte);

        if (!bytes.length)
          for (var i = 0; i < 3 - pixel.length; i++) pixel.unshift(254);

        if (pixel.length === 3) {
          this.fillStyle(cq.color(pixel).toRgb()).fillRect(x, y, 1, 1);
          pixel = [];
          x--;

          if (x < 0) {
            y--;
            x = this.width - 1;
          }
        }
      }

      return this;

    },

    readMeta: function() {

      var bytes = [];

      var x = this.width - 1;
      var y = this.height - 1;

      while (true) {
        var pixel = this.getPixel(x, y);

        var stop = false;

        for (var i = 0; i < 3; i++) {

          if (pixel[2 - i] === 254) stop = true;

          else bytes.push(pixel[2 - i] / 2 | 0);

        }

        if (stop) break;

        x--;

        if (x < 0) {
          y--;
          x = this.width - 1;
          break;
        }
      }


      var json = "";

      while (bytes.length) {
        json += String.fromCharCode(bytes.shift());
      }

      var data = false;

      console.log(json);

      try {
        data = JSON.parse(decodeURIComponent(json));
      } catch (e) {

      }

      return data;

    },

    get width() {
      return this.canvas.width;
    },

    get height() {
      return this.canvas.height;
    },

    set width(w) {
      this.canvas.width = w;
      this.update();
      return this.canvas.width;
    },

    set height(h) {
      this.canvas.height = h;
      this.update();
      return this.canvas.height;
    }


  };

  /* extend Layer with drawing context methods */

  var methods = ["arc", "arcTo", "beginPath", "bezierCurveTo", "clearRect", "clip", "closePath", "createLinearGradient", "createRadialGradient", "createPattern", "drawFocusRing", "drawImage", "fill", "fillRect", "fillText", "getImageData", "isPointInPath", "lineTo", "measureText", "moveTo", "putImageData", "quadraticCurveTo", "rect", "restore", "rotate", "save", "scale", "setTransform", "stroke", "strokeRect", "strokeText", "transform", "translate", "setLineDash"];

  for (var i = 0; i < methods.length; i++) {
    var name = methods[i];

    if (cq.Layer.prototype[name]) continue;

    cq.Layer.prototype[name] = (function(method) {

      return function() {

        var args = new Array(arguments.length);

        for (var i = 0; i < args.length; ++i) {

          args[i] = arguments[i];

        }

        cq.fastApply(method, this.context, args);

        return this;
      }

    })(CanvasRenderingContext2D.prototype[name]);


    continue;


    if (!this.debug) {
      // if (!cq.Layer.prototype[name]) cq.Layer.prototype[name] = Function("this.context." + name + ".apply(this.context, arguments); return this;");

      var self = this;

      (function(name) {

        cq.Layer.prototype[name] = function() {
          // this.context[name].apply(this.context, arguments);

          cq.fastApply(this.context[name], this.context, arguments);

          return this;
        }

      })(name);

    } else {

      var self = this;

      (function(name) {

        cq.Layer.prototype[name] = function() {
          try {
            this.context[name].apply(this.context, arguments);
            return this;
          } catch (e) {
            var err = new Error();
            console.log(err.stack);
            throw (e + err.stack);

            console.log(e, name, arguments);
          }
        }

      })(name);

    }

  };

  /* create setters and getters */

  var properties = ["canvas", "fillStyle", "font", "globalAlpha", "globalCompositeOperation", "lineCap", "lineJoin", "lineWidth", "miterLimit", "shadowOffsetX", "shadowOffsetY", "shadowBlur", "shadowColor", "strokeStyle", "textAlign", "textBaseline", "lineDashOffset"];

  for (var i = 0; i < properties.length; i++) {
    var name = properties[i];
    if (!cq.Layer.prototype[name]) cq.Layer.prototype[name] = Function("if(arguments.length) { this.context." + name + " = arguments[0]; return this; } else { return this.context." + name + "; }");
  };

  /* color */

  cq.Color = function(data, type) {

    if (arguments.length) this.parse(data, type);
  }

  cq.Color.prototype = {

    toString: function() {
      return this.toRgb();
    },

    parse: function(args, type) {
      if (args[0] instanceof cq.Color) {
        this[0] = args[0][0];
        this[1] = args[0][1];
        this[2] = args[0][2];
        this[3] = args[0][3];
        return;
      }

      if (typeof args === "string") {
        var match = null;

        if (args[0] === "#") {
          var rgb = cq.hexToRgb(args);
          this[0] = rgb[0];
          this[1] = rgb[1];
          this[2] = rgb[2];
          this[3] = 1.0;
        } else if (match = args.match(/rgb\((.*),(.*),(.*)\)/)) {
          this[0] = match[1] | 0;
          this[1] = match[2] | 0;
          this[2] = match[3] | 0;
          this[3] = 1.0;
        } else if (match = args.match(/rgba\((.*),(.*),(.*)\)/)) {
          this[0] = match[1] | 0;
          this[1] = match[2] | 0;
          this[2] = match[3] | 0;
          this[3] = match[4] | 0;
        } else if (match = args.match(/hsl\((.*),(.*),(.*)\)/)) {
          this.fromHsl(match[1], match[2], match[3]);
        } else if (match = args.match(/hsv\((.*),(.*),(.*)\)/)) {
          this.fromHsv(match[1], match[2], match[3]);
        }
      } else {
        switch (type) {
          case "hsl":
          case "hsla":

            this.fromHsl(args[0], args[1], args[2], args[3]);
            break;

          case "hsv":
          case "hsva":

            this.fromHsv(args[0], args[1], args[2], args[3]);
            break;

          default:
            this[0] = args[0];
            this[1] = args[1];
            this[2] = args[2];
            this[3] = typeof args[3] === "undefined" ? 1.0 : args[3];
            break;
        }
      }
    },

    a: function(a) {
      return this.alpha(a);
    },

    alpha: function(a) {
      this[3] = a;
      return this;
    },

    fromHsl: function() {
      var components = arguments[0] instanceof Array ? arguments[0] : arguments;

      var color = cq.hslToRgb(parseFloat(components[0]), parseFloat(components[1]), parseFloat(components[2]));

      this[0] = color[0];
      this[1] = color[1];
      this[2] = color[2];
      this[3] = typeof arguments[3] === "undefined" ? 1.0 : arguments[3];
    },

    fromHsv: function() {
      var components = arguments[0] instanceof Array ? arguments[0] : arguments;
      var color = cq.hsvToRgb(parseFloat(components[0]), parseFloat(components[1]), parseFloat(components[2]));

      this[0] = color[0];
      this[1] = color[1];
      this[2] = color[2];
      this[3] = typeof arguments[3] === "undefined" ? 1.0 : arguments[3];
    },

    toArray: function() {
      return [this[0], this[1], this[2], this[3]];
    },

    toRgb: function() {
      return "rgb(" + this[0] + ", " + this[1] + ", " + this[2] + ")";
    },

    toRgba: function() {
      return "rgba(" + this[0] + ", " + this[1] + ", " + this[2] + ", " + this[3] + ")";
    },

    toHex: function() {
      return cq.rgbToHex(this[0], this[1], this[2]);
    },

    toHsl: function() {
      var c = cq.rgbToHsl(this[0], this[1], this[2]);
      c[3] = this[3];
      return c;
    },

    toHsv: function() {
      var c = cq.rgbToHsv(this[0], this[1], this[2]);
      c[3] = this[3];
      return c;
    },

    gradient: function(target, steps) {
      var targetColor = cq.color(target);
    },

    shiftHsl: function() {
      var hsl = this.toHsl();

      if (this[0] !== this[1] || this[1] !== this[2]) {
        var h = arguments[0] === false ? hsl[0] : cq.wrapValue(hsl[0] + arguments[0], 0, 1);
        var s = arguments[1] === false ? hsl[1] : cq.limitValue(hsl[1] + arguments[1], 0, 1);
      } else {
        var h = hsl[0];
        var s = hsl[1];
      }

      var l = arguments[2] === false ? hsl[2] : cq.limitValue(hsl[2] + arguments[2], 0, 1);

      this.fromHsl(h, s, l);

      return this;
    },

    setHsl: function() {
      var hsl = this.toHsl();

      var h = arguments[0] === false ? hsl[0] : cq.limitValue(arguments[0], 0, 1);
      var s = arguments[1] === false ? hsl[1] : cq.limitValue(arguments[1], 0, 1);
      var l = arguments[2] === false ? hsl[2] : cq.limitValue(arguments[2], 0, 1);

      this.fromHsl(h, s, l);

      return this;
    },

    mix: function(color, amount) {
      color = cq.color(color);

      for (var i = 0; i < 4; i++)
        this[i] = cq.mix(this[i], color[i], amount);

      return this;
    }

  };

  window["cq"] = window["CanvasQuery"] = cq;


  return cq;

})();

/* file: src/layer/Layer.js */

PLAYGROUND.Renderer = function(app) {

  this.app = app;

  app.on("create", this.create.bind(this));
  app.on("resize", this.resize.bind(this));

  app.renderer = this;

};

PLAYGROUND.Renderer.plugin = true;

PLAYGROUND.Renderer.prototype = {

  create: function(data) {

    this.app.layer = cq().appendTo(this.app.container);

    if (!this.app.customContainer) {
      this.app.container.style.margin = "0px";
      this.app.container.style.overflow = "hidden";
    }

  },

  resize: function(data) {

    var app = this.app;

    var layer = app.layer;

    layer.width = app.width;
    layer.height = app.height;

    layer.canvas.style.transformOrigin = "0 0";
    layer.canvas.style.transform = "translate(" + app.offsetX + "px," + app.offsetY + "px) scale(" + app.scale + ", " + app.scale + ")";
    layer.canvas.style.transformStyle = "preserve-3d";

    layer.canvas.style.webkitTransformOrigin = "0 0";
    layer.canvas.style.webkitTransform = "translate(" + app.offsetX + "px," + app.offsetY + "px) scale(" + app.scale + ", " + app.scale + ")";
    layer.canvas.style.webkitTransformStyle = "preserve-3d";

    layer.smoothing = this.app.smoothing;
    layer.update();

    this.setSmoothing(this.app.smoothing);

  },

  setSmoothing: function(smoothing) {

    var layer = this.app.layer;

    this.app.smoothing = smoothing;


    if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {

      layer.canvas.style.imageRendering = smoothing ? "auto" : "-moz-crisp-edges";

    } else {

      layer.canvas.style.imageRendering = smoothing ? "auto" : "pixelated";

    }

    layer.smoothing = smoothing;
    layer.update();

  }

};

/* file: src/layer/Transitions.js */

PLAYGROUND.Transitions = function(app) {

  this.app = app;

  app.on("enterstate", this.enterstate.bind(this));
  app.on("postrender", this.postrender.bind(this));
  app.on("step", this.step.bind(this));

  this.progress = 1;
  this.lifetime = 0;
};

PLAYGROUND.Transitions.plugin = true;

PLAYGROUND.Transitions.prototype = {

  enterstate: function(data) {

    this.screenshot = this.app.layer.cache();

    if (data.prev) {
      this.lifetime = 0;
      this.progress = 0;
    }

  },

  postrender: function() {

    if (this.progress >= 1) return;

    PLAYGROUND.Transitions.Split(this, this.progress);

  },

  step: function(delta) {

    if (this.progress >= 1) return;

    this.lifetime += delta;

    this.progress = Math.min(this.lifetime / 0.5, 1);

  }

};

PLAYGROUND.Transitions.Implode = function(manager, progress) {

  var app = manager.app;
  var layer = app.layer;

  progress = app.ease(progress, "outCubic");

  var negative = 1 - progress;

  layer.save();
  layer.tars(app.center.x, app.center.y, 0.5, 0.5, 0, 0.5 + 0.5 * negative, negative);
  layer.drawImage(manager.screenshot, 0, 0);

  layer.restore();

};

PLAYGROUND.Transitions.Split = function(manager, progress) {

  var app = manager.app;
  var layer = app.layer;

  progress = app.ease(progress, "inOutCubic");

  var negative = 1 - progress;

  layer.save();

  layer.a(negative).clear("#fff").ra();

  layer.drawImage(manager.screenshot, 0, 0, app.width, app.height / 2 | 0, 0, 0, app.width, negative * app.height / 2 | 0);
  layer.drawImage(manager.screenshot, 0, app.height / 2 | 0, app.width, app.height / 2 | 0, 0, app.height / 2 + progress * app.height / 2 + 1 | 0, app.width, Math.max(1, negative * app.height * 0.5 | 0));

  layer.restore();

};

/* file: src/layer/LoadingScreen.js */

PLAYGROUND.LoadingScreen = {

  logoRaw: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAAASBAMAAADPiN0xAAAAGFBMVEUAAQAtLixHSUdnaGaJioimqKXMzsv7/fr5shgVAAAAAWJLR0QAiAUdSAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB98EAwkeA4oQWJ4AAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAB9klEQVQ4y72UvW+rMBDAz+FrpVKrrFmesmapWNOlrKjSe1kZ+uoVAvj+/frujG1SaJcqJwU7voOf7xMQzQmsIDi5NPTMsLRntH3U+F6SAZo3NlCvcgBFJz8o+vkDiE63lI95Y/UmpinsZWkgJWJiDbAVQ16htptxSTNloIlugwaw001Ey3ASF3so6L1qLNXzQS5S0UGKL/CI5wWNriE0UH9Yty37LqIVg+wsqu7Ix0MwVBSF/dU+jv2SNnma021LEdPqVnMeU3xAu0kXcSGjmq7Ox4E2Wn88LZ2+EFj3avjixzai6VPVyuYveZLHF2XfdDnvAq27DIHGuq+0DJFsE30OtB1KqOwd8Dr7PcM4b+jfj2g5lp4WyntBK66qua3JzEA+uXJpwH/NlVuzRVPY/kTLB2mjuN+KwdZ8FOy8j2gDbEUSqumnSCY4lf4ibq3IhVM4ycZQRnv+zFqVdJQVn6BxvUqebGpuaNo3sZxwBzjajiMZOoBiwyVF+kCr+nUaJOaGpnAeRPPJZTr4FqmHRXcneEo4DqQ/ftfdnLeDrUAME8xWKPeKCwW6YkEpXfs3p1EWJhdcUAYP0TI/uYaV8cgjwBovaeyWwji2T9rTFIdS/cP/MnkTLRUWxgNNZVin7bT5fqT9miDcUVJzR1gRpfIONMmulU+5Qqr6zXAUqAAAAABJRU5ErkJggg==",

  create: function() {

    var self = this;

    this.logo = new Image;

    this.logo.addEventListener("load", function() {
      self.ready = true;
    });

    this.logo.src = this.logoRaw;

    this.background = "#282245";

    if (window.getComputedStyle) {
      // this.background = window.getComputedStyle(document.body).backgroundColor || "#000";
    }


  },

  enter: function() {

    this.current = 0;

  },

  leave: function() {

    this.locked = true;

    this.animation = this.app.tween(this)
      .to({
        current: 1
      }, 0.5);

  },

  step: function(delta) {

    if (this.locked) {
      if (this.animation.finished) this.locked = false;
    } else {
      this.current = this.current + Math.abs(this.app.loader.progress - this.current) * delta;
    }

  },

  ready: function() {


  },

  render: function() {

    if (!this.ready) return;

    this.app.layer.clear(this.background);

    this.app.layer.fillStyle("#fff");

    this.app.layer.save();
    this.app.layer.align(0.5, 0.5);
    this.app.layer.globalCompositeOperation("lighter");
    this.app.layer.drawImage(this.logo, this.app.center.x, this.app.center.y);

    var w = this.current * this.logo.width;

    this.app.layer.fillStyle("#fff");

    this.app.layer.fillRect(this.app.center.x, this.app.center.y + 32, w, 12);
    this.app.layer.fillRect(this.app.center.x, this.app.center.y + 32, this.logo.width, 4);

    this.app.layer.restore();

  }

};
/* scanlines plugin for playground's default renderer */

PLAYGROUND.Scanlines = function(app) {

  this.app = app;

  app.on("resize", this.resize.bind(this));
  app.on("postrender", this.postrender.bind(this));

};

PLAYGROUND.Scanlines.plugin = true;

PLAYGROUND.Scanlines.prototype = {

  resize: function() {

    this.image = cq(this.app.width, this.app.height);

    this.image.globalAlpha(0.1);
    this.image.fillStyle("#008");

    for (var i = 1; i < this.image.canvas.height; i += 8){
      
      this.image.fillRect(0, i, this.image.canvas.width, 4);

    }

    this.image = this.image.cache();

  },

  postrender: function() {

    if (this.image) {

      // this.app.layer.drawImage(this.image, 0, 0);

    }

  }

};
/*

  SoundOnDemand r1

  (c) 2012-2015 http://rezoner.net

  This library may be freely distributed under the MIT license.

*/

/* options */

/* output: output node, default */
/* audioContext: audioContext */

SoundOnDemand = function(options) {

  options = options || {};

  var canPlayMp3 = (new Audio).canPlayType("audio/mp3");
  var canPlayOgg = (new Audio).canPlayType('audio/ogg; codecs="vorbis"');

  if (this.preferedAudioFormat === "mp3") {

    if (canPlayMp3) this.audioFormat = "mp3";
    else this.audioFormat = "ogg";

  } else {

    if (canPlayOgg) this.audioFormat = "ogg";
    else this.audioFormat = "mp3";

  }

  if (!options.audioContext) {
    console.warn('Possible duplicated AudioContext, use options.audioContext');
  }
  this.audioContext = options.audioContext || new AudioContext;

  this.compressor = this.audioContext.createDynamicsCompressor();
  this.compressor.connect(this.audioContext.destination);

  this.gainNode = this.audioContext.createGain()
  this.gainNode.connect(this.compressor);

  this.input = this.gainNode;

  this.gainNode.gain.value = 1.0;

  this.buffers = {};

  this.channels = {};
  this.aliases = {};

  var lastTick = Date.now();
  var engine = this;

  setInterval(function() {

    var delta = (Date.now() - lastTick) / 1000;

    lastTick = Date.now();

    engine.step(delta);

  }, 1000 / 60);

};

SoundOnDemand.moveTo = function(value, target, step) {

  if (value < target) {
    value += step;
    if (value > target) value = target;
  }

  if (value > target) {
    value -= step;
    if (value < target) value = target;
  }

  return value;

};

SoundOnDemand.prototype = {

  constructor: SoundOnDemand,

  path: "sounds/",

  channel: function(name) {

    if (!this.channels[name]) this.channels[name] = new SoundOnDemand.Channel(this);

    return this.channels[name];

  },

  getAssetEntry: function(path, defaultExtension) {

    /* translate folder according to user provided paths
       or leave as is */

    var fileinfo = path.match(/(.*)\..*/);
    var key = fileinfo ? fileinfo[1] : path;

    var temp = path.split(".");
    var basename = path;

    if (temp.length > 1) {
      var ext = temp.pop();
      path = temp.join(".");
    } else {
      var ext = defaultExtension;
      basename += "." + defaultExtension;
    }

    return {
      key: key,
      url: this.path + basename,
      path: this.path + path,
      ext: ext
    };

  },

  loaders: {},

  load: function(key) {

    var engine = this;
    var entry = engine.getAssetEntry(key, engine.audioFormat);

    if (!this.loaders[key]) {

      this.loaders[key] = new Promise(function(resolve, reject) {

        if (engine.buffers[entry.key]) return resolve(engine.buffers[entry.key]);

        var request = new XMLHttpRequest();

        request.open("GET", entry.url, true);
        request.responseType = "arraybuffer";

        request.onload = function() {
          engine.audioContext.decodeAudioData(this.response, function(decodedBuffer) {

            engine.buffers[entry.key] = decodedBuffer;
            resolve(decodedBuffer);

          });

        }

        request.send();

      });

    }

    return this.loaders[key];

  },

  step: function(delta) {

    for (var key in this.channels) {

      this.channels[key].step(delta);

    }

  },

  duplicate: function(source, as, volume, rate) {

    var engine = this;

    this.load(source).then(function() {

      engine.buffers[source];

      engine.buffers[as] = engine.buffers[source];

    });

  },

  alias: function(name, source, rate, volume) {

    this.aliases[name] = {
      source: source,
      rate: rate,
      volume: volume
    };

  }

};
SoundOnDemand.Events = function() {

  this.listeners = {};

};

SoundOnDemand.Events.prototype = {

  on: function(event, callback) {

    if (typeof event === "object") {
      var result = {};
      for (var key in event) {
        result[key] = this.on(key, event[key])
      }
      return result;
    }

    if (!this.listeners[event]) this.listeners[event] = [];

    this.listeners[event].push(callback);

    return callback;
  },

  once: function(event, callback) {

    callback.once = true;

    if (!this.listeners[event]) this.listeners[event] = [];

    this.listeners[event].push(callback);

    return callback;

  },

  off: function(event, callback) {

    for (var i = 0, len = this.listeners[event].length; i < len; i++) {
      if (this.listeners[event][i]._remove) {
        this.listeners[event].splice(i--, 1);
        len--;
      }
    }

  },

  trigger: function(event, data) {

    /* if you prefer events pipe */

    if (this.listeners["event"]) {
      for (var i = 0, len = this.listeners["event"].length; i < len; i++) {
        this.listeners["event"][i](event, data);
      }
    }

    /* or subscribed to single event */

    if (this.listeners[event]) {
      for (var i = 0, len = this.listeners[event].length; i < len; i++) {
        var listener = this.listeners[event][i];
        listener.call(this, data);

        if (listener.once) {
          this.listeners[event].splice(i--, 1);
          len--;
        }
      }
    }

  }

};
SoundOnDemand.Channel = function(engine) {

  this.engine = engine;
  this.audioContext = engine.audioContext;

  /* connection order goes from bottom to top */

  /* gain node */

  this.gainNode = this.audioContext.createGain();

  /* convolver */

  this.convolverWetNode = this.audioContext.createGain();
  this.convolverDryNode = this.audioContext.createGain();
  this.convolverNode = this.audioContext.createConvolver();
  this.convolverEnabled = false;

  this.route();

  this.queue = [];
  this.loops = [];

};

SoundOnDemand.Channel.prototype = {

  constructor: SoundOnDemand.Channel,

  /* get a sound for further usage */

  xroute: function() {

    if (this.currentRoute) {

      for (var i = 0; i < this.currentRoute.length - 1; i++) {

        this.currentRoute[i].disconnect();

      }

    }

    this.currentRoute = [];

    for (var i = 0; i < arguments.length; i++) {

      if (i < arguments.length - 1) {

        var node = arguments[i];

        node.connect(arguments[i + 1]);

      }

      this.currentRoute.push(node);

    }

    this.input = arguments[0];

  },

  get: function(key) {

    return new SoundOnDemand.Sound(key, this);

  },

  play: function(key) {

    var sound = this.get(key);

    this.add(sound);

    return sound;

  },

  remove: function(sound) {

    sound._remove = true;

  },

  add: function(sound) {

    sound._remove = false;

    this.queue.push(sound);

  },

  step: function(delta) {

    /* process queue */

    for (var i = 0; i < this.queue.length; i++) {

      var sound = this.queue[i];

      sound.step(delta);

      if (sound._remove) this.queue.splice(i--, 1);

    }

    /* process sounds being played */

  },

  volume: function(value) {

    if (arguments.length) {

      this.gainNode.gain.value = value;

      return this;

    } else {

      return this.gainNode.gain.value;

    }

  },

  swapConvolver: function(key) {

    var engine = this.engine;
    var channel = this;

    return new Promise(function(resolve, fail) {

      if (channel.currentConvolverImpulse === key) {

        resolve();

      } else {

        engine.load(key).then(function(buffer) {
          channel.currentConvolverImpulse = key;
          channel.convolverNode.buffer = buffer;
          resolve();
        });

      }

    });

  },

  updateConvovlerState: function(enabled) {

    this.convolverEnabled = enabled;
    this.route();

  },

  subroute: function(nodes) {

    for (var i = 0; i < nodes.length; i++) {

      if (i < nodes.length - 1) {

        var node = nodes[i];
        node.disconnect();
        node.connect(nodes[i + 1]);

      }

    }

    this.input = nodes[0];

  },

  route: function() {

    this.gainNode.disconnect();

    if (this.convolverEnabled) {

      this.gainNode.connect(this.convolverDryNode);

      this.gainNode.connect(this.convolverNode);
      this.convolverNode.connect(this.convolverWetNode);

      this.convolverWetNode.connect(this.engine.input);
      this.convolverDryNode.connect(this.engine.input);

    } else {

      this.gainNode.connect(this.engine.input);

    }

    this.input = this.gainNode;

  },

  convolver: function(value, key) {

    var enabled = value > 0;
    var channel = this;

    this.swapConvolver(key).then(function() {

      if (enabled !== channel.convolverEnabled) channel.updateConvovlerState(enabled);

    });

    this.convolverWetNode.gain.value = value;
    this.convolverDryNode.gain.value = 1 - value;

    return this;

  }

};
SoundOnDemand.Sound = function(key, channel) {

  this.key = key;
  this.bufferKey = key;

  if (channel.engine.aliases[key]) {

    this.alias = channel.engine.aliases[key];

    this.bufferKey = this.alias.source;

  }

  if (!channel.engine.buffers[this.bufferKey]) channel.engine.load(this.bufferKey);

  this.channel = channel;
  this.audioContext = this.channel.engine.audioContext;

  this.current = {
    volume: 1.0,
    rate: 1.0
  };

  this.fadeMod = 1.0;

  this.createNodes();

};

SoundOnDemand.Sound.prototype = {

  constructor: SoundOnDemand.Sound,

  alias: {
    volume: 1.0,
    rate: 1.0
  },

  createNodes: function() {

    var bufferSource = this.audioContext.createBufferSource();
    var gainNode = this.audioContext.createGain();
    var panNode = this.audioContext.createStereoPanner();

    bufferSource.connect(panNode);
    panNode.connect(gainNode);
    gainNode.connect(this.channel.input);

    this.bufferSource = bufferSource;
    this.gainNode = gainNode;
    this.panNode = panNode;

  },

  volume: function(volume) {

    volume *= this.alias.volume;

    this.current.volume = volume;

    this.updateVolume();

    return this;

  },

  updateVolume: function() {

    this.gainNode.gain.value = this.current.volume * this.fadeMod;

  },

  pan: function(pan) {

    this.current.pan = pan;

    this.updatePanning();

    return this;

  },

  updatePanning: function() {

    this.panNode.pan.value = this.current.pan;

  },

  loop: function() {

    this.bufferSource.loop = true;
    this.current.loop = true;

    return this;

  },

  rrate: function(range) {

    return this.rate(this.current.rate + (-1 + Math.random() * 2) * range);

  },

  rate: function(rate) {

    rate *= this.alias.rate;

    this.bufferSource.playbackRate.value = rate;

    this.current.rate = rate;

    return this;

  },

  onended: function() {

    if (!this.current.loop) this.stop();

  },

  step: function(delta) {

    if (!this.ready) {

      if (!this.channel.engine.buffers[this.bufferKey]) return;

      this.ready = true;
      this.playing = true;

      this.buffer = this.channel.engine.buffers[this.bufferKey];

      this.bufferSource.buffer = this.buffer;

      this.bufferSource.start(0);
      this.bufferSource.onended = this.onended.bind(this);

      this.currentTime = 0;

      this.currentTime += this.bufferSource.playbackRate.value * delta;
    }

    if (this.fadeTarget !== this.fadeMod) {

      this.fadeMod = SoundOnDemand.moveTo(this.fadeMod, this.fadeTarget, delta * this.fadeSpeed);

      this.updateVolume();

    } else if (this.fadeTarget === 0) {

      this.pause();

    }



  },

  pause: function() {

    this.channel.remove(this);

    this.bufferSource.stop(0);

    this.playing = false;

  },

  stop: function() {

    this.channel.remove(this);

    this.bufferSource.stop(0);

    this.playing = false;

  },

  resume: function() {

    this.createNodes();

    this.bufferSource.buffer = this.buffer;

    this.currentTime = this.currentTime % this.buffer.duration;
    this.bufferSource.start(0, this.currentTime);

    this.rate(this.current.rate);
    this.volume(this.current.volume);
    this.loop(this.current.loop);

    this.channel.add(this);

    this.playing = true;

  },

  fadeTo: function(target, duration) {

    if (!this.playing && this.ready) this.resume();

    duration = duration || 1.0;

    this.fadeTime = 0;
    this.fadeTarget = target;
    this.fadeDuration = duration;

    this.fadeSpeed = Math.abs(target - this.fadeMod) / duration;

    return this;

  },

  fadeIn: function(duration) {

    if (!this.playing && this.ready) this.resume();

    this.fadeMod = 0;
    this.fadeTo(1.0, duration);

    return this;

  },

  fadeOut: function(duration) {

    this.fadeTo(0, duration || 1.0);

    return this;

  },



};

PLAYGROUND.SoundOnDemand = function(app) {
  app.audio = new SoundOnDemand({
    audioContext: app.audioContext
  });

  app.audio.path = app.getPath("sounds");

  app.loadSounds = function() {

    for (var i = 0; i < arguments.length; i++) {

      var key = arguments[i];

      this.loader.add();

      this.audio.load(key).then(
        this.loader.success.bind(this.loader),
        this.loader.error.bind(this.loader)
      );

    }

  };

};

PLAYGROUND.SoundOnDemand.plugin = true;
ENGINE = { };
ENGINE.Benchmark = {

  create: function() {

    this.music = app.music.play("gameover").fadeIn(4).loop();

    this.ready = false;

    // this.gradient = app.layer.createRadialGradient(app.center.x, app.center.y, 0, app.center.x, app.center.y, app.center.x);
    // this.gradient.addColorStop(0.0, "transparent");
    // this.gradient.addColorStop(1.0, "#000");

    // JIT warmup
    this.didWarmup = false;
    this.steps = 0;
    this.iotaList = [];
    this.frameTimes = [];
    this.scores = [];
    this.runCount = 0;
    this.skipCount = 0;
    this.skipResetCount = 0;
    this.resetCount = 0;
    this.scoreStack = [];
    this.frameTime = 0.0;
    this.startTime = Date.now();
  },


  pointerdown: function() {

    if (this.ready) {
      if (window.ga) {
        ga('send', {
          'hitType': 'event',
          'eventCategory': 'game',
          'eventAction': 'start'
        });
      }

      this.music.fadeOut();

      app.setState(ENGINE.Game);
    }

  },

  enter: function() {
    if (window.ga) {
      ga('send', 'screenview', {
        'appName': 'PowerSurge',
        'screenName': 'Splashpage'
      });
    }

    this.startMod = 0;

    this.iotaCount = this.app.baseline ? Math.floor(this.app.baseline * 0.7) : 1;

    this.app.baseline = 0;

    this.reset();

  },

  // Called between benchmark loops
  reset: function() {
    this.steps = 0;
    this.frameTimes.length = 0;
    this.skipCount = 0;
    // JIT warmup settings (run unbound loops)
    if (!this.didWarmup) {
      // console.time('Warmup');
      this.app.unbound = true;
      this.app.immidiate = false;
    } else {
      this.app.unbound = false;
      this.app.immidiate = true;
    }
    if (this.iotaList.length == 0) {
      this.addIotas(this.didWarmup ? this.iotaCount : 1);
    }
  },

  step: function(dt) {
    if (this.ready) {
      return;
    }

    var before = performance.now();

    this.iotaList.forEach(function(iota) {
      iota.step(dt);
    });

    this.frameTime = performance.now() - before;

    if (!this.didWarmup) {
      // State: JIT Warmup
      this.stepWarmUp();
    } else if (this.frameTime) {
      // Stresstesting
      this.stepStressTest()
    }

  },

  stepWarmUp: function() {

    this.steps++;

    if (this.steps > 1100) {
      this.didWarmup = true;
      // console.timeEnd('Warmup');
      // console.log('Warmup with %d iotas', this.iotaList.length);
      this.reset();
    }
  },

  stepStressTest: function() {
    var add = 1;
    var frameTimes = this.frameTimes;
    var MAX_FRAMES = 45;
    var MIN_FRAMES = 15;
    var COST = 8;
    var ERROR = 0.25;
    var frameTime = this.frameTime;
    if (frameTimes.unshift(frameTime) > MAX_FRAMES) {
      frameTimes.length = MAX_FRAMES;
    }
    if (frameTimes.length >= MIN_FRAMES) {
      var sample = this.analyze(frameTimes);
      var score = this.iotaList.length;
      if (sample.rse <= ERROR && sample.mean > COST) {
        this.pushScore(score);
        return;
      }
      if (sample.rse > ERROR || sample.mean > COST) {
        // console.log('Skip #' + this.skipCount);
        this.skipCount++;
        if (this.skipCount > 60) {
          console.log(
            '[RESET STEP] High sampling error %f%% or mean %fms for %d entities.',
            sample.rse * 100, sample.mean, score
          );
          this.iotaCount = Math.floor(this.lastScore * 0.7);
          this.skipResetCount++;
          if (this.skipResetCount > 10) {
            this.finalize(false);
            return;
          }
          this.finalize(true);
        }
        return;
      }
      this.skipCount = 0;
      add = Math.round(COST / sample.mean);
    }

    this.addIotas(add);
  },

  pushScore: function(score) {
    var SAVE_SCORES = 3;
    var MIN_SCORES = 5;
    var MAX_SCORES = 10;
    var ERROR = 0.15;

    this.skipResetCount = 0;
    var scores = this.scores;
    this.runCount++;
    if (scores.unshift(score) > MAX_SCORES) {
      scores.length = MAX_SCORES;
    }
    this.iotaCount = Math.ceil(score * 0.7);
    var l = scores.length;
    if (l >= MIN_SCORES) {
      var sample = this.analyze(scores);
      if (sample.rse < ERROR) {
        this.resetCount = 0;
        this.app.baseline = Math.round(sample.mean);
        if (window.ga) {
          ga('send', {
            'hitType': 'event',
            'eventCategory': 'game',
            'eventAction': 'baselined',
            'eventValue': this.app.baseline,
            'nonInteraction': true
          });
        }
        this.app.baselineErr = sample.rse;
        this.scores.splice(SAVE_SCORES);
        this.finalize(false);
        return;
      } else {
        console.log(
          '[SCORE RESET] Standard error %f%% too high in score samples.',
          sample.rse * 100
        );
        this.resetCount++;
        if (this.resetCount > 10) {
          this.scores.splice(0);
          console.log('[BAIL] Too many [RESET SCORE].');
          if (window.ga) {
            ga('send', 'exception', {
              'exDescription': 'BenchmarkResetOverflow',
              'exFatal': false
            });
          }
          this.finalize(false);
          return;
        }
      }
    }
    this.finalize(true);
  },

  finalize: function(restart) {

    if (!restart) {
      // Remove iotas
      this.iotaCount = 0;
      this.runCount = 0;
      // Reset benchmark engine settings
      this.app.unbound = false;
      this.app.immidiate = false;
    }
    // Reduce iotaList to iotaCount
    this.iotaList.splice(this.iotaCount).forEach(function(iota) {
      iota.destroy();
    });
    if (restart) {
      this.reset();
    } else {
      if (window.ga) {
        ga('send', {
          'hitType': 'timing',
          'timingCategory': 'Benchmark',
          'timingVar': 'Loading',
          'timingValue': Date.now() - this.startTime
        });
      }
      this.ready = true;
      app.tween(this).to({
        startMod: 1.0
      }, 1.0, "outElastic");
    }

  },

  addIotas: function(count) {

    for (var j = 0; j < count; j++) {

      this.iotaList.push(new Iota(this.app, this));

    }

  },

  render: function() {

    /* get reference to the application */

    var app = this.app;

    /* get reference to drawing surface */

    var layer = this.app.layer;

    /* clear screen */

    layer.clear("#282245");


    layer.drawImage(app.images.splash, app.center.x - app.images.splash.width / 2 | 0, app.center.y - app.images.splash.height / 2 | 0)

    layer.save();
    layer.translate(600, 290);

    layer.align(0.5, 0.5);
    layer.scale(4, 4);
    layer.globalAlpha(0.4);
    layer.globalCompositeOperation("lighter");
    layer.drawImage(app.images.flare, 128 * (32 * (app.lifetime % 1.5 / 1.5) | 0), 0, 128, 128, 0, 0, 128, 128);
    layer.restore();


    app.fontSize(48);



    if (!this.ready) {
      var textX = app.center.x;
      var textY = app.center.y - 16;

      layer.fillStyle("rgba(0,0,0,0.5").fillRect(0, textY - 54, app.width, 74);

      layer.fillStyle("#000").textAlign("center").fillText("LOADING... please wait", textX, textY - 4);
      layer.fillStyle("#fff").textAlign("center").fillText("LOADING... please wait", textX, textY);

    } else {

      var textX = app.center.x + 100 + (1 - this.startMod) * 1000;
      var textY = app.center.y - 10;

      layer.a(0.5 + Utils.osc(app.lifetime, 1) * 0.5);
      layer.fillStyle("#000").textAlign("center").fillText("CLICK TO START!", textX, textY - 4);
      layer.fillStyle("#fa0").textAlign("center").fillText("CLICK TO START!", textX, textY);
      layer.a(1.0);

    }


    // app.ctx.fillStyle = this.gradient;
    // app.ctx.fillRect(0, 0, app.width, app.height);

    // this.iotaList.forEach(function(iota) {
    //   iota.render(layer);
    // });

    // layer
    //   .fillStyle('#fff')
    //   .font("14px 'arial'")
    //   .fillText('Stress test #' + this.runCount, 5, 15)
    //   .fillText('Entities: ' + this.iotaList.length, 5, 30)
    //   .fillText('Frametime:' + this.frameTime.toFixed(1), 5, 45);
  },

  analyze: function(population) {

    var l = population.length;
    var sum = 0.0;
    var sumsq = 0.0;
    for (var i = 0; i < l; i++) {
      sum += population[i];
      sumsq += population[i] * population[i];
    }
    var mean = sum / l;
    var sd = Math.sqrt(sumsq / l - sum * sum / (l * l));
    var se = sd / Math.sqrt(l);
    // standard error at 95% confidence
    var se95 = 1.96 * se;
    var rse = se / mean;
    return {
      mean: mean,
      sd: sd,
      se: se,
      se95: se95,
      rse: rse
    }

  },

  nearest: function(from, entities) {

    var min = -1;
    var result = null;

    for (var i = 0; i < entities.length; i++) {

      var to = entities[i];

      if (from === to) continue;

      var distance = this.distance(from, to);

      if (distance < min || min < 0) {
        min = distance;
        result = to;
      }

    }

    return result;
  },

  distance: function(a, b) {

    var dx = a.x - b.x;
    var dy = a.y - b.y;

    return Math.sqrt(dx * dx + dy * dy);

  }
};

var images = ['firefox', 'firefox_beta', 'firefox_developer_edition', 'firefox_nightly'];

function Iota(app, parent) {
  this.x = 0.0;
  this.y = 0.0;
  this.vx = 0.0;
  this.vy = 0.0;
  this.vr = 0.0;
  this.alpha = 0.0;
  this.angle = 0.0;
  this.app = app;
  this.parent = parent;
  this.x = Math.random() * app.width;
  this.y = Math.random() * app.height;
  this.maxVel = 100.0;
  this.maxTorq = Math.PI * 10;
  this.vx = Math.random() * this.maxVel * 2 - this.maxVel;
  this.vy = Math.random() * this.maxVel * 2 - this.maxVel;
  this.vr = Math.random() * this.maxTorq * 2 - this.maxTorq;
  this.image = app.images[images[Math.round(Math.random() * 3)]];
  this.region = Utils.random([
    [548, 88, 46, 47],
    [544, 142, 46, 48],
    [544, 200, 46, 47],
    [545, 253, 44, 48]
  ]);
  this.maxForce = 100.0;
  this.alpha = 0.2 + Math.random() * 0.8;
  this.angle = Math.random() * Math.PI;
}

Iota.prototype = {

  step: function(dt) {

    app.state.nearest(this, this.parent.iotaList);

    var iotaList = this.parent.iotaList;
    var forcex = 0.0;
    var forcey = 0.0;
    var forces = 0;
    var maxDist = 60.0;
    for (var i = 0, l = iotaList.length; i < l; i++) {
      var distx = (this.x - iotaList[i].x) / maxDist;
      var disty = (this.y - iotaList[i].y) / maxDist;
      var signx = Math.sign(distx);
      var signy = Math.sign(disty);
      var absx = Math.abs(distx);
      var absy = Math.abs(disty);
      if (absx < 1 && absy < 1) {
        forcex += signx + absx * signx;
        forcey += signy + absy * signy;
        forces++;
      }
    }

    if (forces == 0) {
      forces = 1;
    }
    forcex = Math.max(-this.maxForce, Math.min(this.maxForce, forcex / forces)) * 500;
    forcey = Math.max(-this.maxForce, Math.min(this.maxForce, forcey / forces)) * 500;
    this.vx = this.vx * 0.99 + forcex * 0.01;
    this.vy = this.vy * 0.99 + forcey * 0.01;

    var x = this.x + this.vx * dt;
    if (x < 0 || x > this.app.width) {
      x = Math.random() * this.app.width;
    }
    this.x = x;

    var y = this.y + this.vy * dt;
    if (y < 0 || y > this.app.height) {
      y = Math.random() * this.app.height;
    }
    this.y = y;
    this.angle += this.vr * dt;
  },

  // render: function(layer) {

  //   return;

  //   layer.context.save();
  //   layer.context.translate(this.x | 0, this.y | 0);
  //   // layer.a(this.alpha);
  //   layer.context.fillStyle = "#f00";
  //   layer.context.fillRect(this.x, this.y, 64, 64);
  //   layer.context.fillStyle = "#fff";
  //   layer.context.beginPath();
  //   layer.context.moveTo(this.x, this.y);
  //   layer.context.arc(this.x, this.y, 64, 0, Math.PI * 2);
  //   layer.context.rotate(this.angle);
  //   layer.drawRegion(app.images.spritesheet, this.region, 0, 0);
  //   layer.context.restore();
  // },

  destroy: function() {
    this.app = null;
    this.parent = null;
  }

}
ENGINE.BackgroundStars = function() {

  this.color = "#0af";

  this.count = Math.max(app.height, app.width) / 16 | 0;

  this.x = 0;
  this.y = 0;

  this.populated = false;
  this.image = app.getColoredImage(app.images.particles, this.color);

};

ENGINE.BackgroundStars.prototype = {

  images: {},

  colors: ["#afc", "#fa0"],

  sprites: [
    [0, 13, 5, 5],
    [1, 19, 3, 3]
  ],

  quota: 0.5,

  populate: function(fill) {

    this.stars = [];

    for (var i = 0; i < this.count; i++) {
      this.spawnStar(fill);
    }

  },

  spawnStar: function(fill) {

    var star = {
      x: Math.random() * app.width,
      y: Math.random() * app.height,
      z: 0.1 + 0.9 * Math.random(),
      s: Utils.random([1, 2, 3]),
      spriteIndex: Math.random() * this.sprites.length | 0
    };

    star.lx = star.x;
    star.ly = star.y;

    this.stars.push(star);

  },

  wrap: function(star) {

    if (star.x > app.width) star.x = 0;
    if (star.y > app.height) star.y = 0;

    if (star.x < 0) star.x = app.width;
    if (star.y < 0) star.y = app.height;

  },

  step: function(dt) {

    if (!this.populated) {
      this.populated = true;
      this.populate(true);
    }

    var diffX = (10 + app.game.score) * dt;
    var diffY = (10 + app.game.score) * dt;


    for (var i = 0; i < this.stars.length; i++) {

      var star = this.stars[i];

      this.wrap(star);

      star.x += diffX * star.z;
      star.y += diffY * star.z;

    }

  },

  render: function(dt) {


    for (var i = 0; i < this.stars.length; i++) {

      var star = this.stars[i];

      var sprite = this.sprites[star.spriteIndex];

      app.ctx.drawImage(this.image, sprite[0], sprite[1], sprite[2], sprite[3],
        star.x, star.y, sprite[2], sprite[3]);


    }

  }

};
ENGINE.CircleExplosion = function(args) {

  Utils.extend(this, {

    attachedTo: false,
    radius: 0,
    alpha: 1.0,
    duration: 0.5

  }, args);

  this.radius = 0;

  this.tween = app.tween(this).discard().to({
    radius: args.radius
  }, this.duration, "outElastic").to({
    radius: 0
  }, this.duration, "outElastic");

};

ENGINE.CircleExplosion.prototype = {

  constructor: ENGINE.CircleExplosion,

  type: "circleExplosion",

  action: function() {

    app.sound.play("laser");

  },

  step: function() {

    if(this.attachedTo) {
      this.x = this.attachedTo.x;
      this.y = this.attachedTo.y;
    }

    if (this.tween.finished) this.dead = true;

  },

  render: function() {

    if (this.radius > 0) {
      
      app.ctx.beginPath();
      app.ctx.fillStyle = this.color;
      app.ctx.globalCompositeOperation = "lighter";
      app.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      app.ctx.fill();
      app.ctx.globalCompositeOperation = "source-over";


    }

  }

};
ENGINE.Ship = function(args) {

  Utils.extend(this, {

    damage: 1,
    firerate: 0.5,
    speed: 160,
    radius: 16,
    rotationSpeed: 5,
    hp: 10,
    range: 200,
    force: 0,
    forceDirection: 0,
    targetTimeout: 0,
    hitLifespan: 0,
    scale: 1.0,
    rank: 0,
    kills: 0

  }, defs.ships[args.type], args);

  this.random = this.game.random();

  this.maxHp = this.hp;

  this.lifetime = this.game.random() * 10;
  this.cooldown = this.firerate;
  this.desiredDirection = this.direction = this.game.random() * 6;

  this.color = defs.teamColor[this.team];

  this.image = app.images.spritesheet;

  if (this.team) this.applyUpgrades(this.game.upgrades);
  else this.applyDifficulty();

};

ENGINE.Ship.prototype = {

  constructor: ENGINE.Ship,

  hoverable: true,

  frozenSprite: [193, 86, 11, 19],

  quota: 2,

  pointerenter: function() {

    this.repair();

  },

  ranks: [
    [318, 131, 10, 5],
    [333, 131, 10, 10],
    [348, 131, 10, 15],
    [360, 131, 10, 8],
    [372, 131, 10, 13],
    [384, 131, 10, 18],
    [396, 131, 15, 16]
  ],

  applyDifficulty: function() {

    var difficulty = this.game.wave / 30;

    this.speed *= 1 + difficulty;
    this.damage *= 1 + difficulty;

  },

  applyUpgrades: function(upgrades) {

    var hpmod = this.hp / this.maxHp;

    this.damage = 1 + upgrades.damage * 0.25;
    this.maxHp = upgrades.life * 10;
    this.hp = hpmod * this.maxHp;
    this.speed = 80 + 10 * upgrades.speed;


    if (this.free) {
      this.damage *= 2;
      this.maxHp *= 2;
      this.hp *= 2;
    }

  },

  die: function() {

    if (!this.team) this.game.score++;

    if (this.game.benchmark) {

      this.hp = this.maxHp;

    } else {

      this.dead = true;

    }

    if (this.boss) {

      this.game.shake();

      for (var i = 0; i < 16; i++) {

        this.game.add(ENGINE.Resource, {
          x: this.x,
          y: this.y
        });

      }

    }

    this.game.explosion(this.x, this.y, 16, this.color);

    this.game.add(ENGINE.Resource, {
      x: this.x,
      y: this.y,
      parent: this
    });

    if (this.planet) this.planet.ships--;

    if (!this.team) this.game.onenemydeath(this);

    app.sound.play("explosion").rrate(0.2);

  },

  applyDamage: function(damage, attacker) {

    if (this.dead) return;

    this.hitLifespan = 0.1;

    this.hp -= damage;

    if (this.hp <= 0) {
      this.die();
      if (attacker) attacker.onscore();
    }

    this.game.explosion(this.x, this.y, 3, this.color);


  },

  step: function(dt) {

    dt *= this.game.timeFactor;

    // if (!this.team) dt *= Math.sin((app.lifetime % 2 / 2) * Math.PI);

    this.lifetime += dt;

    if ((this.targetTimeout -= dt) <= 0) {

      this.target = false;
      this.targetTimeout = 0.25;

    }

    if (!this.target) {

      this.target = this.getTarget(this.game.entities);

    } else if (this.target.dead) {

      this.target = null;

    }


    this.foresightCollision();

    var destination = false;
    var speed = this.speed;

    var ox = 0;
    var oy = 0;

    if (this.team && this.target) {

      ox = Math.cos(this.random * 6.28) * 100;
      oy = Math.sin(this.random * 6.28) * 100;

      destination = this.target;

    } else destination = this.game.player.planet;

    if (this.team && Utils.distance(this, app.center) > app.center.y) {

      destination = app.center;

    }

    if (this.collisionDanger) {

      /*

        var angle = Math.atan2(this.collisionDanger.y - this.y, this.collisionDanger.x - this.x) - Math.PI / 2;

        destination = {
          x: this.collisionDanger.x + Math.cos(angle) * 150,
          y: this.collisionDanger.y + Math.cos(angle) * 150
        }

        speed *= 1 - 0.5 * Math.abs(Utils.circDistance(this.direction, angle) / (Math.PI));

      */

      if (this.collisionDistance < 50) {

        var angle = Math.atan2(this.collisionDanger.y - this.y, this.collisionDanger.x - this.x) - Math.PI;

        this.x = this.collisionDanger.x + Math.cos(angle) * 50;
        this.y = this.collisionDanger.y + Math.sin(angle) * 50;

      }

      // speed *= this.collisionDistance / 200;

    }


    if (destination) {

      this.desiredDirection = Math.atan2(destination.y - this.y + ox, destination.x - this.x + oy);

    }

    if (!this.frozen) {

      this.direction = Utils.circWrapTo(this.direction, this.desiredDirection, dt * this.rotationSpeed);

    }

    this.move(dt);

    /* firing mechanics */

    this.cooldown -= dt;

    if (this.canFire()) {

      this.fire();

    }

    if (!this.team && Utils.distance(this, this.game.playerPlanet) < this.game.playerPlanet.radius) {

      if (!this.game.benchmark) {

        this.game.player.planet.applyDamage(1, this);
        this.die();

      }

    }

    this.hitLifespan -= dt;

  },


  move: function(dt) {

    if (!this.frozen) {

      Utils.moveInDirection.call(this, this.direction, this.speed * dt);

    }

    if (this.force > 0) {

      this.force -= 200 * dt;

      Utils.moveInDirection.call(this, this.forceDirection, this.force * dt);

    }
  },

  canFire: function() {

    if (this.frozen) return false;

    if (this.cooldown > 0) return;
    if (!this.target) return;
    if (Utils.distance(this, this.target) > this.range) return;

    this.cooldown = this.firerate;

    this.fire();

  },

  fire: function() {

    this.game.add(ENGINE.Bullet, {
      x: this.x,
      y: this.y,
      team: this.team,
      target: this.target,
      damage: this.damage,
      parent: this
    });

    if (!this.game.benchmark) app.sound.play("laser");

  },

  render: function() {

    /* sprite */

    app.ctx.save();
    app.ctx.translate(this.x, this.y);

    this.renderHUD();

    if (this.hitLifespan > 0) {

      var image = app.getColoredImage(this.image, "#fff", "source-in");

    } else {

      var image = this.image;

    }

    app.ctx.rotate(this.direction - Math.PI / 2);
    app.ctx.scale(this.scale, this.scale);
    app.ctx.drawImage(image, this.sprite[0], this.sprite[1], this.sprite[2], this.sprite[3], -this.sprite[2] / 2, -this.sprite[3] / 2, this.sprite[2], this.sprite[3]);
    app.ctx.restore();

    if (this.frozen) {

      app.ctx.drawImage(app.images.spritesheet,
        this.frozenSprite[0], this.frozenSprite[1], this.frozenSprite[2], this.frozenSprite[3],
        this.x - this.frozenSprite[2] / 2, this.y - this.frozenSprite[3] / 2, this.frozenSprite[2], this.frozenSprite[3]);

    }

    if (this.team) {

      var rankSprite = this.ranks[this.rank];

      app.ctx.drawImage(app.images.spritesheet,
        rankSprite[0], rankSprite[1], rankSprite[2], rankSprite[3],
        this.x + 24, this.y - 24, rankSprite[2], rankSprite[3]);


    }

  },

  renderHUD: function() {

    if (this.frozen) return;

    var w = Math.min(100, (this.maxHp / 160) * 100 | 0);

    var mod = this.hp / this.maxHp;

    app.ctx.fillStyle = this.color;
    app.ctx.strokeStyle = this.color;
    app.ctx.lineWidth = 2;
    app.ctx.fillRect(-w * mod / 2 | 0, 32, w * mod, 5);
    app.ctx.strokeRect(-w * 0.5 | 0, 32, w, 5);

  },

  collisionRange: 100,

  foresightCollision: function() {

    this.collisionDanger = false;

    var self = this;

    var pool = Utils.filter(this.game.entities, function(e) {

      if (e.type !== "asteroid") return false;

      if (Utils.distance(self, e) > self.collisionRange) return false;

      return true;

    });

    this.collisionDanger = Utils.nearest(this, pool);

    if (this.collisionDanger) this.collisionDistance = Utils.distance(this, this.collisionDanger);

  },

  getTarget: function() {

    var pool = [];

    for (var i = 0; i < this.game.entities.length; i++) {

      var entity = this.game.entities[i];

      if (!(entity instanceof ENGINE.Ship)) continue;

      if (entity.team !== this.team) pool.push(entity);

    }

    return Utils.nearest(this, pool);

  },

  repair: function() {

    if (this.hp >= this.maxHp) return;

    this.game.add(ENGINE.CircleExplosion, {
      color: "#a04",
      radius: 32,
      attachedTo: this
    });

    this.hp = this.maxHp;

  },

  onscore: function() {

    this.kills++;

    this.rank = Math.min(this.ranks.length - 1, this.kills / 3 | 0);

  }

};
ENGINE.Bullet = function(args) {

  Utils.extend(this, {
    speed: 400
  }, args);

  this.color = defs.teamColor[this.team];
  this.radius = 4;
  this.direction = 0;

  this.sprite = this.sprites[this.team];

};

ENGINE.Bullet.prototype = {

  sprites: [
    [126, 25, 4, 37],
    [133, 25, 4, 37]
  ],

  quota: 0.5,

  constructor: ENGINE.Bullet,

  step: function(dt) {

    dt *= this.game.timeFactor;

    this.direction = Math.atan2(this.target.y - this.y, this.target.x - this.x);

    this.x += Math.cos(this.direction) * this.speed * dt;
    this.y += Math.sin(this.direction) * this.speed * dt;

    if (Utils.distance(this, this.target) < this.radius + this.target.radius) {

      this.hit(this.target);

    }

  },

  hit: function(target) {

    target.applyDamage(this.damage, this.parent);

    this.die();

  },

  die: function() {

    this.dead = true;

  },

  render: function() {

    app.ctx.save();

    app.ctx.translate(this.x, this.y);
    app.ctx.rotate(this.direction + Math.PI / 2);
    app.ctx.drawImage(app.images.spritesheet,
      this.sprite[0], this.sprite[1], this.sprite[2], this.sprite[3], -this.sprite[2] / 2, -this.sprite[3] / 2, this.sprite[2], this.sprite[3]
    );

    app.ctx.restore();

  }

};
ENGINE.Asteroid = function(args) {

  this.max = this.resources = 5;

  Utils.extend(this, {

    hitLifespan: 0

  }, args);

  this.radius = 32;

  this.direction = Math.atan2(app.center.y - this.y, app.center.x - this.x);
  this.speed = 8 + this.game.random() * 32;

  this.lifetime = 0;

  this.kind = this.game.random() > 0.8 ? "gold" : "normal";

  this.spriteIndex = Utils.random(0, 2);

  this.collectibles = 0;


};

ENGINE.Asteroid.prototype = {

  constructor: ENGINE.Asteroid,

  quota: 0.5,

  hoverable: "mining",
  silent: true,
  instant: true,

  type: "asteroid",


  sprites: {

    normal: [
      [341, 239, 52, 39],
      [337, 288, 61, 61],
      [338, 354, 57, 58]
    ],

    gold: [
      [408, 238, 52, 39],
      [404, 287, 59, 61],
      [403, 353, 59, 58]
    ],

    hit: [
      [476, 127, 52, 39],
      [472, 176, 61, 61],
      [473, 242, 57, 58]
    ]

  },

  pointerenter: function() {

    this.slowdown = true;

  },

  pointerleave: function() {

    this.slowdown = false;

  },

  die: function() {

    app.sound.play("explosion").rate(0.6);

    if (Math.random() > 0.7) {

      this.game.add(ENGINE.Powerup, {
        x: this.x,
        y: this.y
      });

    }

    this.game.remove(this);
    this.game.explosion(this.x, this.y, 16, "#aaa");
    this.game.spawnAsteroid();

  },

  dig: function() {

    this.hitLifespan = 0.1;

    this.resources--;

    if (this.resources <= 0) {
      this.die();
    }

    var count = this.kind === "gold" ? 2 : 1;

    this.spawnResources(count);

    this.game.explosion(this.x, this.y, 4, "#fa0");

    if (!this.game.benchmark) app.sound.play("dig");

  },

  spawnResources: function(count) {

    for (var i = 0; i < count; i++) {

      this.game.add(ENGINE.Resource, {
        x: this.x,
        y: this.y,
        parent: this
      });

    }

  },

  step: function(dt) {

    dt *= this.game.timeFactor;

    this.lifetime += dt;

    this.hitLifespan -= dt;

    var speed = this.speed * (this.slowdown ? 0.25 : 1.0);

    this.x += Math.cos(this.direction) * speed * dt;
    this.y += Math.sin(this.direction) * speed * dt;

    this.game.wrap(this);

    if (Utils.distance(this, app.center) < this.game.player.planet.radius + this.radius) {

      if (this.game.player.planet.asteroidsShield) {

        this.spawnResources(5);

      } else {

        this.game.player.planet.applyDamage(1, this);

      }

      this.die();

    }

  },

  render: function() {

    if (this.hitLifespan > 0) {
    
      var sprite = this.sprites.hit[this.spriteIndex];
    
    } else {
      
      var sprite = this.sprites[this.kind][this.spriteIndex];

    }

    var scale = 0.5 + 0.5 * this.resources / this.max;

    app.ctx.save();

    app.ctx.translate(this.x, this.y)
    app.ctx.rotate(this.lifetime)
    app.ctx.scale(scale, scale)
    app.ctx.drawImage(app.images.spritesheet,
      sprite[0], sprite[1], sprite[2], sprite[3], -sprite[2] / 2, -sprite[3] / 2, sprite[2], sprite[3]
    );
    app.ctx.restore();

  }

};
ENGINE.Cursor = function(game, team, planet) {

  this.game = game;

  this.actionTimeout = 0;

  this.dotRadius = 8;
  this.capacity = 10;
  this.resources = 4;
  this.x = 0;
  this.y = 0;
  this.hoverTime = 0;
  this.team = team;
  this.color = defs.teamColor[team];
  this.planet = planet;

  this.targetTimeout = this.targetInterval = 0.25;
  this.fireCooldown = this.fireInterval = 0.25;

  /* timers */

  this.times = {
    mining: 0.5,
    collect: 0.05,
    build: 0.5,
    repair: 2
  };


  this.tween = app.tween(this);

  if (!this.team) {

    this.ai = new ENGINE.Ai(this);
    this.ai.set("idle");

  }

  this.trail = new ENGINE.Trail(this, {
    interval: 0.05,
    maxPoints: 10,
    color: this.color
  });


};

ENGINE.Cursor.prototype = {

  constructor: ENGINE.Cursor,

  poke: function() {

    this.tween = app.tween(this).discard()

    .to({
      dotRadius: 16
    }, 0.1, "outSine")

    .to({
      dotRadius: 8
    }, 0.05, "inSine");

  },

  step: function(dt) {

    var prevEntity = this.entity;

    this.entity = this.getHoveredEntity();

    if (this.entity !== prevEntity) {

      if (prevEntity && prevEntity.pointerleave) prevEntity.pointerleave(this);
      if (this.entity && this.entity.pointerenter) this.entity.pointerenter(this);

      this.onentitychange();

    }

    if (this.action) {

      this.hoverTime += dt;

      this.progressAction(dt);

    }

    /* firing mechanics */

    if (this.target && this.target.dead) this.target = false;

    if ((this.targetTimeout -= dt) <= 0) {

      this.targetTimeout = 0.5;

      this.target = this.getTarget();

    }


    this.fireCooldown -= dt;

    if (this.canFire()) {

      this.fire();

    }

    this.trail.step(dt);


  },

  getTarget: function() {

    var pool = [];

    for (var i = 0; i < this.game.entities.length; i++) {

      var entity = this.game.entities[i];

      if (!(entity instanceof ENGINE.Ship)) continue;

      if (Utils.distance(entity, this) > 200) continue;
      if (entity.team !== this.team) pool.push(entity);

    }

    return Utils.nearest(this, pool);

  },

  onentitychange: function() {

    this.actionComplete = false;

    this.hoverTime = 0;

    if (this.entity) {

      this.action = this.entity.hoverable;
      this.resetAction();

      if (this.entity.instant) this.actionTimeout = 0;


    } else this.action = false;

    /*
        if (!this.actionSound) this.actionSound = app.sound.play("action").loop().rate(0.5);

        if (!this.action) {
          this.actionSound.stop();
        } else {
          this.actionSound.fadeIn();
        }
        */
    this.updateTooltip();


  },

  resetAction: function() {


    this.actionTimeout = this.times[this.action];

    this.actionDuration = this.actionTimeout;

  },

  upgrade: function(key) {

    this.game.upgrades[key] ++;

    this.game.buttons[key].count = this.getPrice(key);

    var ships = Utils.filter(this.game.entities, function(e) {

      return (e instanceof ENGINE.Ship) && e.team;

    });

    for (var i = 0; i < ships.length; i++) {

      var ship = ships[i];

      this.game.add(ENGINE.CircleExplosion, {
        color: "#0af",
        radius: 32,
        attachedTo: ship
      });

      ship.applyUpgrades(this.game.upgrades)

    }

  },

  getPrice: function(key) {

    return Math.pow(2, this.game.upgrades[key]);

  },

  canProgress: function() {

    switch (this.action) {

      case "repair":

        return this.planet.hp < this.planet.maxHP;

        break;

      case "build":

        if (this.entity.key === "fighter") {

          if (this.game.playerPlanet.max - this.game.playerPlanet.ships <= 0) return false;

          return this.resources > 0;
        } else {

          return this.resources >= this.getPrice(this.entity.key);

        }

        break;

      default:

        return true;

        break;

    }
  },

  progressAction: function(dt) {

    if (this.canProgress() && (this.actionTimeout -= dt) < 0) {

      this.finalizeAction();
      this.resetAction();

    };

    this.progress = 1 - this.actionTimeout / this.actionDuration;


  },

  finalizeAction: function() {

    this.actionComplete = true;

    switch (this.action) {

      case "repair":

        this.planet.repair();

        break;

      case "mining":

        this.entity.dig();

        break;


      case "build":

        switch (this.entity.key) {

          case "fighter":

            this.planet.spawnShip("fighter");
            this.resources -= 1;
            if (!this.game.benchmark) app.sound.play("build");

            break;

          case "life":
          case "damage":
          case "speed":

            this.resources -= this.getPrice(this.entity.key);

            this.upgrade(this.entity.key);

            if (!this.game.benchmark) app.sound.play("upgrade");


            break;

        }

        break;
    }

  },

  hit: function() {

    this.game.shake();

    this.planet.applyDamage(1, this.planet);

    this.game.add(ENGINE.CircleExplosion, {
      x: this.x,
      y: this.y,
      color: "#c02",
      radius: 32
    })

  },

  getHoveredEntity: function() {

    for (var i = 0; i < this.game.entities.length; i++) {

      var entity = this.game.entities[i];

      if (entity.hoverable && Utils.distance(entity, this) < entity.radius) return entity;

    }

    return null;

  },

  render: function() {

    this.trail.render();

    app.layer.fillStyle(this.color).fillCircle(this.x, this.y, this.dotRadius);

    if (this.action && !this.entity.silent) {

      var mod = Math.min(1, app.ease(2 * this.hoverTime, "outBounce"));

      app.ctx.save();
      app.ctx.translate(this.entity.x, this.entity.y);

      app.ctx.strokeStyle = this.color;
      app.ctx.lineWidth = 2;
      app.ctx.beginPath();
      app.ctx.arc(0, 0, (this.entity.radius + 2) * mod, 0, Math.PI * 2);
      app.ctx.stroke();

      app.ctx.lineWidth = 8;
      app.ctx.beginPath();
      app.ctx.globalAlpha = 0.25;
      app.ctx.arc(0, 0, this.entity.radius + 8, 0, Math.PI * 2)
      app.ctx.stroke()
      app.ctx.globalAlpha = 1.0;

      app.ctx.lineWidth = 8;
      app.ctx.beginPath();
      app.ctx.arc(0, 0, this.entity.radius + 8, 0, this.progress * Math.PI * 2)
      app.ctx.stroke();

      app.ctx.restore();

    }



  },

  canFire: function() {

    if (!this.game.checkBonus("laser")) return;

    if (this.fireCooldown > 0) return;
    if (!this.target) return;
    if (Utils.distance(this, this.target) > this.range) return;

    this.fireCooldown = this.fireInterval;

    this.fire();

  },

  fire: function() {

    this.game.add(ENGINE.Bullet, {
      x: this.x,
      y: this.y,
      team: this.team,
      target: this.target,
      damage: 2,
      speed: 1000
    });

    if (!this.game.benchmark) app.sound.play("laser");

  },

  moveTo: function(destination) {

    this.destination = destination;

  },

  updateTooltip: function() {

    if (this.entity) {
      if (this.entity.tooltip) this.game.tooltip = this.entity.tooltip;
    } else {
      this.game.tooltip = false;
    }

  }

}
ENGINE.Resource = function(args) {

  Utils.extend(this, args);

  this.radius = 32;

  this.direction = Math.random() * 6.28;
  this.speed = 32;

  this.forceDirection = Math.random() * 6.28;
  this.force = 64 + Math.random() * 128;

  this.force *= 3;
  this.forceDamping = this.force;

  this.lifetime = 0;
  this.duration = 10;

  this.value = Math.random() * 3 | 0;

  this.sprite = this.sprites[this.value];
};

ENGINE.Resource.prototype = {

  constructor: ENGINE.Resource,

  quota: 0.7,

  sprites: [
    [333, 105, 10, 10],
    [320, 104, 12, 12],
    [303, 102, 16, 16]
  ],

  type: "resource",


  collect: function() {

    this.game.remove(this);

    if (!this.game.benchmark) app.sound.play("coin");

    this.game.player.poke();

    this.game.add(ENGINE.CircleExplosion, {
      color: "#fc0",
      radius: 8,
      attachedTo: this,
      duration: 0.25
    });

    this.game.player.resources += this.value;

  },

  step: function(dt) {

    this.lifetime += dt;

    var playerDistance = Utils.distance(this, this.game.player);

    if (this.force) {

      this.x += Math.cos(this.forceDirection) * this.force * dt;
      this.y += Math.sin(this.forceDirection) * this.force * dt;

      this.force = Math.max(0, this.force - this.forceDamping * dt);

    }

    if (this.poked && this.game.checkBonus("magnet")) {

      this.direction = Math.atan2(this.game.player.y - this.y, this.game.player.x - this.x);

      this.x += Math.cos(this.direction) * this.speed * dt;
      this.y += Math.sin(this.direction) * this.speed * dt;


      if (!this.force) {
        this.speed += 256 * dt;
      }

    } else {

      if (playerDistance < 100) {
        this.poked = true;
        this.speed = 128;
      }

    }


    if (this.lifetime > 0.5) {
      if (playerDistance < 32) {
        this.collect();
      }
    }

    if (this.lifetime > this.duration) this.game.remove(this);

  },

  render: function() {

    var scale = 0.2 + 0.8 * Math.sin(Math.PI * (app.lifetime % 0.2 / 0.2));

    app.ctx.save();

    app.ctx.translate(this.x, this.y);

    app.ctx.scale(scale, 1.0);

    app.ctx.drawImage(app.images.spritesheet,
      this.sprite[0], this.sprite[1], this.sprite[2], this.sprite[3], -this.sprite[2] / 2, -this.sprite[3] / 2, this.sprite[2], this.sprite[3]
    );

    app.ctx.restore();

  }

};
ENGINE.Button = function(args) {

  Utils.extend(this, {

    radius: 32

  }, args);


  this.image = app.images.spritesheet;

};

ENGINE.Button.prototype = {

  constructor: ENGINE.Button,

  type: "button",

  pointerenter: function() {

    app.tween(this).discard().to({
      radius: 24
    }, 0.1).to({
      radius: 32
    }, 0.2, "outSine");

  },

  action: function() {


    app.sound.play("laser");

  },

  step: function() {

  },

  render: function() {


    if (this.sprite) {
      var scale = this.radius / 32;

      app.ctx.save();

      app.ctx.translate(this.x, this.y);
      app.ctx.drawImage(this.image,
        this.sprite[0], this.sprite[1], this.sprite[2], this.sprite[3], -this.sprite[2] / 2, -this.sprite[3] / 2, this.sprite[2], this.sprite[3]
      );

      app.ctx.restore();

    }

    if (this.count) {
      app.layer.textAlign("center").font("bold 32px Arial").fillStyle(this.color).fillText(this.count, this.x, this.y - this.radius - 48);
    }

  }

};
ENGINE.Particle = function(args) {

  Utils.extend(this, {
    color: "#0fa",
    radius: 4
  }, args)

  this.spriteIndex = 0;

  this.reset();

};

ENGINE.Particle.prototype = {

  constructor: ENGINE.Particle,

  quota: 0.5,

  sprites: [
    [0, 0, 6, 6],
    [0, 7, 5, 5],
    [0, 13, 5, 5],
    [1, 19, 3, 3]
  ],

  reset: function() {

    this.lifetime = 0;
    this.duration = 0.5;

    this.direction = this.game.random() * 6.28;
    this.speed = 32 + this.game.random() * 128;

    this.speed *= 3;

    this.damping = this.speed * 2;

  },

  step: function(dt) {

    this.lifetime += dt;

    this.x += Math.cos(this.direction) * this.speed * dt;
    this.y += Math.sin(this.direction) * this.speed * dt;

    this.speed = Math.max(0, this.speed - this.damping * dt);

    this.progress = Math.min(this.lifetime / this.duration, 1.0);

    if (this.progress >= 1.0) {
      this.x = 0;
      this.y = 0;
      this.progress = 0;
    }

    this.spriteIndex = this.progress * this.sprites.length | 0;

  },

  render: function() {


    // var s = this.size * (1 - this.progress);

    // if (s > 0) {
    if (this.progress >= 1.0) return;

    this.image = app.getColoredImage(app.images.particles, this.color || "#0fa");

    // app.ctx.fillStyle = this.color;
    // app.ctx.fillRect(this.x - s / 2, this.y - s / 2, s, s)

    var sprite = this.sprites[this.spriteIndex];

    app.ctx.drawImage(this.image, sprite[0], sprite[1], sprite[2], sprite[3],
      this.x, this.y, sprite[2], sprite[3])

    // }

  }

};
ENGINE.Planet = function(args) {

  Utils.extend(this, {

    radius: 48,
    hp: 20,
    max: 100,
    ships: 0,
    repairProgress: 0,
    repairTime: 4,
    asteroidsShield: true,
    shieldScale: 0.0

  }, args);

  this.maxHP = this.hp;

  this.lifetime = 0;

};

ENGINE.Planet.prototype = {

  constructor: ENGINE.Planet,

  type: "planet",

  hoverable: "repair",

  sprite: [201, 215, 104, 104],

  shieldSprite: [492, 320, 124, 124],

  repair: function() {

    this.hp++;

  },

  applyDamage: function(damage, attacker) {

    this.game.shake();

    this.hp--;

    if (this.hp <= 0 && !this.game.benchmark) this.game.gameover();

    if (!this.game.benchmark) app.sound.play("planetHit");

    this.game.add(ENGINE.CircleExplosion, {
      x: attacker.x,
      y: attacker.y,
      color: "#a04",
      radius: 32
    })

  },

  step: function(dt) {

    this.lifetime += dt;

    var prevShield = this.asteroidsShield;
    this.asteroidsShield = false;this.game.checkBonus("shield");

    if (prevShield !== this.asteroidsShield) {

      app.tween(this).discard().to({
        shieldScale: this.asteroidsShield ? 1.0 : 0.0
      }, 0.5, "outElastic");

    }

  },

  spawnShip: function(type) {

    var ship = this.game.add(ENGINE.Ship, {
      x: this.x,
      y: this.y,
      type: type,
      team: 1,
      planet: this
    });

    ship.forceDirection = Math.random() * 6;
    ship.force = 200;

    this.ships++;

  },

  render: function() {

    app.layer.align(0.5, 0.5);
    app.layer.drawRegion(app.images.spritesheet, this.sprite, this.x, this.y);
    app.layer.textAlign("center").font("bold 48px Arial").fillStyle("#fff").fillText(this.hp, this.x, this.y - 24);
    app.layer.realign();

    if (this.asteroidsShield && this.shieldScale > 0) {
      var scale = this.shieldScale;
      app.ctx.save();
      app.ctx.globalAlpha = 0.5;
      app.ctx.globalCompositeOperation = "lighter";
      app.ctx.translate(this.x, this.y);
      app.ctx.scale(scale, scale);
      app.ctx.drawImage(app.images.spritesheet, this.shieldSprite[0], this.shieldSprite[1], this.shieldSprite[2], this.shieldSprite[3], -this.shieldSprite[2] / 2, -this.shieldSprite[3] / 2, this.shieldSprite[2], this.shieldSprite[3]);
      app.ctx.restore();
    }

  }

};
/* The counter in the top-left corner is:

AVERAGE FRAME TIME |  DEVICE  POWER   | ENTITIES COUNT
                     (baselineFactor)
*/


/* Reference baseline to calculate device power */

REFERENCE_BASELINE = 378;

/* Reference frame time to tell how well the game has been optimized */
/* Make it higher to give user more CPU power */

REFERENCE_FRAME_TIME = 0.8;

/* How much optimization value one ship drains */

SHIP_CPU_COST = 0.1;

ENGINE.Game = {

  bonuses: {

    magnet: 0.1,
    laser: 0.2,
    shield: 0.4

  },

  explosion: function(x, y, count, color) {

    if (!this.particlesPool) {

      this.particlesPool = [];

      for (var i = 0; i < 100; i++) {

        var particle = this.add(ENGINE.Particle, {
          x: x,
          y: y
        });

        this.particlesPool.push(particle);

      }

      this.particleIndex = 0;

    }

    for (var i = 0; i <= count; i++) {

      if (++this.particleIndex >= this.particlesPool.length) this.particleIndex = 0;;

      var particle = this.particlesPool[this.particleIndex];

      particle.x = x;
      particle.y = y;
      particle.color = color;

      particle.reset();

    }

  },

  random: function() {

    return this.benchmark ? 0.5 : Math.random();

  },

  add: function(constructor, args) {

    args = args || {};

    args.game = this;

    var entity = new constructor(args);

    this.entities.push(entity);

    return entity;

  },

  remove: function(entity) {

    entity.dead = true;

  },

  scaleComicBubble: function() {

    this.comicScale = 1.0;

    $comicbubble = document.body.querySelector("#comicbubble");

    var tween = app.tween(this).to({
      comicScale: 0.5
    });

    tween.onstep = function(app) {

      $comicbubble.style.transform = "scale(" + app.comicScale + "," + app.comicScale + ")";

    }

  },

  enter: function() {
    if (window.ga) {
      ga('send', 'screenview', {
        'appName': 'PowerSurge',
        'screenName': 'Game'
      });
    }

    app.renderer.setSmoothing(false);

    this.scaleComicBubble();

    localStorage.setItem("baseline", app.baseline);

    this.music = app.music.play("dust").volume(0.5).fadeIn(4).loop();

    this.gradient = app.ctx.createRadialGradient(app.center.x, app.center.y, 0, app.center.x, app.center.y, app.center.x);

    this.gradient.addColorStop(0.0, "transparent");
    this.gradient.addColorStop(1.0, "#000");

    this.reset();

  },

  leave: function() {

    this.music.fadeOut(2);

  },

  getScale: function(entity) {

    return 1 - Math.min(1.0, Utils.distance(entity, app.center) / (app.width * 0.5)) * 0.75;

  },

  spawnAsteroid: function() {

    var angle = Math.random() * Math.PI * 2;
    var radius = app.width / 2;
    var ox = Math.cos(angle) * radius;
    var oy = Math.sin(angle) * radius;

    this.add(ENGINE.Asteroid, {
      x: app.center.x + ox,
      y: app.center.y + oy
    });

  },

  reset: function() {

    this.spawnTimeout = 0;
    this.cpuUsage = 0;
    this.cpuBarProgress = 0;

    this.upgrades = {

      speed: 1,
      damage: 1,
      life: 1

    };

    delete this.particlesPool;

    this.score = 0;

    this.wave = 0;

    this.tooltip = false;

    this.entities = [];

    this.stars = this.add(ENGINE.BackgroundStars);

    this.playerPlanet = this.add(ENGINE.Planet, {
      x: app.center.x,
      y: app.center.y,
      team: 1
    });

    this.player = new ENGINE.Cursor(this, 1, this.playerPlanet);

    this.player.x = app.center.x;
    this.player.y = app.center.y;

    for (var i = 0; i < 8; i++) {

      this.spawnAsteroid();

    }

    var buttons = ["speed", "life", "damage"];

    this.buttons = {};

    for (var i = 0; i < buttons.length; i++) {

      var key = buttons[i];

      this.buttons[key] = this.add(ENGINE.Button, {
        color: defs.teamColor[1],
        x: app.center.x - 80 + i * 100,
        y: app.height - 70,
        sprite: defs.buttons[key],
        key: key,
        count: 1,
        hoverable: "build",
        tooltip: defs.tooltips[key]
      })
    }

    this.nextWave();

    this.explosion(app.center.x, app.center.y, 1);

  },

  cpuHistory: [],

  step: function(dt) {

    var before = performance.now();

    /* slow motion - when you collect freeze powerup */

    this.timeFactor = 1.0;

    if (this.freezeLifespan > 0) {

      this.freezeLifespan -= dt;
      this.timeFactor = 0.1;

    }

    /* update the game 10 times to magnitude results in profiler */

    var MAGNIFY = 5;

    var quota = 0.0;

    for (var i = 0; i < this.entities.length; i++) {
      var entity = this.entities[i];
      quota += entity.quota || 0.7;

      for (var j = 0; j < MAGNIFY; j++) {
        entity.step(dt / MAGNIFY);

        if (entity.dead) {
          this.entities.splice(i--, 1);
          break;
        }
      }
    }

    this.quota = quota;

    var frameTime = (performance.now() - before) / MAGNIFY;

    /* measure optimization */

    /* It's the average of 100 frame times */

    /*

      baselineFactor      - baseline vs reference sample to get device power
                            if the device is over-powered we artificialy
                            make frameTime higher to make it more fair among the players

      optimizationRating  - reference frame time divided by (current) average frame time
                            handicaped by baselineFactor - this gives a factor of
                            how well user optimized the game

                            Make REFERENCE_FRAME_TIME higher to give player MORE cpu output

    */


    this.cpuHistory.push(frameTime / quota);

    if (this.cpuHistory.length > 60) this.cpuHistory.shift();

    this.averageFrameTime = this.average(this.cpuHistory);

    this.optimizationRating = ((0.8 / app.baseline) / (this.averageFrameTime));

    this.player.step(dt);

    /* use optimization results to affect the game */

    this.applyOptimization(dt);


  },

  average: function(array) {

    if (!array.length) return 0;

    var sum = 0;

    for (var i = 0; i < array.length; i++) {
      sum += array[i];
    }

    return sum / array.length;

  },

  applyOptimization: function(dt) {

    var cpuUsage = 0;

    /* calculate (artificial) cpuUsage of ships
       if cpuUsage is greater than optimizationRating
       freeze a ship
    */

    for (var i = 0; i < this.entities.length; i++) {

      var entity = this.entities[i];

      if (!(entity instanceof ENGINE.Ship)) continue;
      if (!entity.team) continue;
      if (entity.free) continue;

      cpuUsage += SHIP_CPU_COST;

      if (cpuUsage < this.optimizationRating) {

        entity.frozen = false;

      } else {

        entity.frozen = true;

      }

    }

    /* tween cpuUsage instead of setting it instantly (less jittering) */

    this.cpuUsage = Utils.moveTo(this.cpuUsage, cpuUsage, Math.abs(this.cpuUsage - cpuUsage) * 0.25 * dt);
    this.realCpuUsage = cpuUsage;

    /* that's the value 0.0 - 1.0 that coresponds with the yellow power bar */

    this.cpuRatio = 1 - Math.min(1.0, this.cpuUsage / this.optimizationRating);
    this.cpuBarProgress = Utils.moveTo(this.cpuBarProgress, this.cpuRatio, 0.2 * dt);

    /* spawn ships if there is enough power */

    if ((this.spawnTimeout -= dt) <= 0) {

      this.spawnTimeout = 0.5;

      //if (this.cpuRatio > 0.5) this.playerPlanet.spawnShip("fighter");
      if (this.optimizationRating > this.realCpuUsage + 0.1) this.playerPlanet.spawnShip("fighter");

    }

  },

  shake: function() {

    this.shakeLifespan = 0.4;

  },

  render: function(dt) {

    if (!this.averageFrameTime) return;

    app.ctx.textBaseline = "top";
    app.ctx.save();

    app.ctx.fillStyle = "#282245";
    app.ctx.fillRect(0, 0, app.width, app.height);

    // app.ctx.fillStyle = this.gradient;
    //app.ctx.fillRect(0, 0, app.width, app.height);

    if (this.shakeLifespan > 0) {
      this.shakeLifespan -= dt;
      var chaos = Utils.random(-6, 6);
      app.ctx.translate(chaos, chaos)
    }

    for (var i = 0; i < this.entities.length; i++) {

      this.entities[i].render();

    }

    this.player.render();

    this.renderTooltip();

    app.ctx.textAlign = "right";
    app.ctx.font = "bold 16px Arial";
    app.ctx.fillStyle = "#fff";
    app.ctx.fillText("SCORE: " + this.score, app.width - 20, 20);

    this.renderCPUBar();
    // this.renderBonuses();

    app.ctx.textAlign = "center";
    app.ctx.font = "bold 64px Arial";
    app.ctx.fillStyle = "#fa0";
    app.ctx.fillText(this.player.resources, app.center.x - 180, app.height - 104);

    // app.ctx.textAlign = "left";
    // app.ctx.font = "bold 16px Arial";
    // app.ctx.fillStyle = "#fff";
    // app.ctx.fillText(
    //   this.optimizationRating.toFixed(2) + " | " +
    //   // this.baselineFactor.toFixed(2) + " | " +
    //   this.entities.length + ' + ' +
    //   this.quota.toFixed(1), 16, 16);

    app.ctx.restore();

  },

  barWidth: 200,

  renderCPUBar: function() {


    var width = 200;
    var currentWidth = this.barWidth * this.cpuBarProgress;

    app.ctx.drawImage(app.images.spritesheet,
      defs.frozenSprite[0], defs.frozenSprite[1], defs.frozenSprite[2], defs.frozenSprite[3],
      app.center.x - this.barWidth / 2 - 32, 24, defs.frozenSprite[2], defs.frozenSprite[3]);


    app.ctx.strokeStyle = "#fa0";
    app.ctx.fillStyle = "#fa0";
    app.ctx.lineWidth = 2;

    app.ctx.strokeRect(app.center.x - this.barWidth / 2, 16, this.barWidth, 32)
    app.ctx.fillRect(app.center.x - this.barWidth / 2, 16, currentWidth, 32)

    app.ctx.fillStyle = "#fff";
    app.ctx.textAlign = "center";
    app.fontSize(16);
    app.ctx.fillText("AVAILABLE CPU", app.center.x, 24);

    app.ctx.textAlign = "left";
    app.ctx.fillStyle = "#fa0";

    app.ctx.fillText("+ " + this.optimizationRating.toFixed(2), app.center.x + width / 2 + 16, 16);

    app.ctx.fillStyle = "#c40";
    app.ctx.fillText("- " + this.realCpuUsage.toFixed(2), app.center.x + width / 2 + 16, 32);

  },


  renderBonuses: function() {

    app.ctx.save();
    app.ctx.translate(app.center.x - this.barWidth / 2, 54);
    app.ctx.textAlign = "left";
    app.ctx.textBaseline = "top";

    var i = Object.keys(this.bonuses).length;

    for (var key in this.bonuses) {

      var threshold = this.bonuses[key];

      var x = this.barWidth * threshold;
      var y = i * 16;

      app.ctx.globalAlpha = this.checkBonus(key) ? 1.0 : 0.4;

      app.ctx.fillStyle = "#fff";
      app.ctx.fillRect(x, 0, 2, y);
      app.ctx.fillRect(x, y, 16, 2);

      app.ctx.fillStyle = "#fff";
      app.fontSize(12);
      app.ctx.fillText(defs.bonuses[key].toUpperCase(), x + 20, y - 6);

      i--;

    }

    app.ctx.restore();

  },


  renderTooltip: function() {

    if (!this.tooltip) return;

    app.layer.textAlign("center").fillStyle("#fff").font("16px Arial").textWithBackground(this.tooltip, app.center.x, app.height - 64, "rgba(0,0,0,0.6)", 16);

  },

  pointermove: function(e) {

    this.player.x = e.x;
    this.player.y = e.y;

  },

  wrap: function(entity) {

    if (entity.x + entity.radius < 0) entity.x = app.width + entity.radius;
    if (entity.x - entity.radius > app.width) entity.x = -entity.radius;
    if (entity.y + entity.radius < 0) entity.y = app.height + entity.radius;
    if (entity.y - entity.radius > app.height) entity.y = -entity.radius;

  },

  keydown: function(e) {

  },

  nextWave: function() {

    if (this.benchmark) return;

    this.wave++;

    this.shipsLeft = 0;

    var streamsPositions = [
      [0.0, 1.0],
      [0.0, 0.5],
      [0.0, 0.0],
      [1.0, 0.0],
      [1.0, 0.5],
      [1.0, 1.0]
    ];

    var difficulty = this.wave / 20;

    Utils.shuffle(streamsPositions);

    var streamsCount = Math.min(3, 1 + difficulty) + 0.3 | 0;
    var shipsPerStream = Math.min(16, 4 + difficulty * 4) | 0;

    var possibleShips = [];

    if (this.wave > 0) possibleShips.push("creep1");
    if (this.wave > 3) possibleShips.push("creep2");
    if (this.wave > 6) possibleShips.push("creep3");
    if (this.wave > 10) possibleShips.push("creep4");

    if (this.wave % 5 === 0) possibleShips = ["boss"];

    for (var i = 0; i < streamsCount; i++) {

      var stream = streamsPositions.pop();

      var x = stream[0] * app.width;
      var y = stream[1] * app.height;

      var ship = Utils.random(possibleShips);
      var shipData = defs.ships[ship];
      var angle = Math.atan2(y - app.center.y, x - app.center.x);

      for (var j = 0; j < shipsPerStream; j++) {

        var entity = this.add(ENGINE.Ship, {
          type: ship,
          x: x + Math.cos(angle) * j * 100,
          y: y + Math.sin(angle) * j * 100,
          team: 0
        });

        this.shipsLeft++;

        if (shipData.boss) {

          entity.hp = entity.maxHp = this.score;
          entity.damage = this.score / 50 | 0;
          entity.scale = 0.5 + this.score / 200;

          break;

        }

      }

    }

  },

  repairShips: function() {

    var ships = Utils.filter(this.entities, function(e) {
      return (e instanceof ENGINE.Ship) && e.team;
    });

    for (var i = 0; i < ships.length; i++) {

      ships[i].repair();

    }

  },

  onenemydeath: function(ship) {

    this.shipsLeft--;

    if (this.shipsLeft <= 0) this.nextWave();

  },

  pointerdown: function(e) {

  },

  gameover: function() {

    ENGINE.Gameover.score = this.score;

    if (window.ga) {
      ga('send', {
        'hitType': 'event',
        'eventCategory': 'game',
        'eventAction': 'over',
        'eventValue': this.score,
        'nonInteraction': true
      });
    }

    app.setState(ENGINE.Gameover);

  },

  checkBonus: function(key) {

    return true;

  }

};
ENGINE.Powerup = function(args) {

  Utils.extend(this, args);

  this.radius = 32;

  this.direction = Math.random() * 6.28;
  this.speed = 32;

  this.forceDirection = Math.random() * 6.28;
  this.force = 64 + Math.random() * 128;

  this.force *= 3;
  this.forceDamping = this.force;

  this.lifetime = 0;
  this.duration = 10;

  var keys = ["repair", "missiles", "freeze"];

  var freelanersCount = Utils.filter(this.game.entities, function(e) {
    return e.free && e instanceof ENGINE.Ship;
  }).length;

  if (freelanersCount < 2) keys.push("freelancer");

  this.key = Utils.random(keys);
  this.sprite = this.sprites[this.key];

};

ENGINE.Powerup.prototype = {

  constructor: ENGINE.Powerup,

  sprite: [216, 159, 14, 14],

  type: "powerup",

  sprites: {

    "repair": [245, 89, 23, 25],
    "freelancer": [276, 51, 32, 32],
    "freeze": [242, 119, 19, 21],
    "missiles": [311, 13, 28, 32]

  },

  collect: function() {

    this.game.explosion(this.x, this.y, 16, "#fff");

    this.game.remove(this);

    app.sound.play("powerup");

    this.game.player.poke();

    this.game.add(ENGINE.TextOut, {
      x: this.x,
      y: this.y,
      text: this.key
    });

    switch (this.key) {

      case "freeze":

        this.game.freezeLifespan = 4.0;

        break;

      case "missiles":

        for (var i = 0; i < 4; i++) this.game.add(ENGINE.Missile, {
          x: this.x,
          y: this.y,
          team: 1
        });

        break;

      case "repair":

        this.game.repairShips();

        break;


      case "freelancer":

        var ship = this.game.add(ENGINE.Ship, {
          x: this.x,
          y: this.y,
          type: "freelancer",
          team: 1,
          free: true,
          planet: this.game.playerPlanet
        });

        ship.forceDirection = Math.random() * 6;
        ship.force = 200;

        break;
    }

  },

  step: function(dt) {

    this.lifetime += dt;

    var playerDistance = Utils.distance(this, this.game.player);

    if (this.force) {

      this.x += Math.cos(this.forceDirection) * this.force * dt;
      this.y += Math.sin(this.forceDirection) * this.force * dt;

      this.force = Math.max(0, this.force - this.forceDamping * dt);

    }

    if (this.lifetime > 0.5) {
      if (playerDistance < 32) {
        this.collect();
        this.game.player.resources++;
      }
    }

    if (this.lifetime > this.duration) this.game.remove(this);

  },

  render: function() {

    var linear = app.lifetime % 0.5 / 0.5;
    var scale = 0.8 + Math.sin(Math.PI * linear) * 0.4;

    app.ctx.save();

    app.ctx.translate(this.x, this.y);

    app.ctx.scale(scale, scale);

    app.ctx.drawImage(app.images.spritesheet,
      this.sprite[0], this.sprite[1], this.sprite[2], this.sprite[3], -this.sprite[2] / 2, -this.sprite[3] / 2, this.sprite[2], this.sprite[3]
    );

    app.ctx.restore();

  }

};
ENGINE.TextOut = function(args) {

  Utils.extend(this, {
    background: "rgba(0,0,0,0.5)",
    color: "#fff",
    fontSize: 24,
    scaleX: 0,
    scaleY: 1.0,
    text: "void",
    duration: 2.0
  }, args);

  var textout = this;

  app.tween(this)
    .to({
      scaleX: 1.0
    }, this.duration * 0.25, "outElastic")
    .wait(this.duration * 0.5)
    .to({
      scaleY: 0.0
    }, this.duration * 0.25, "outCirc")
    .on("finish", function() {
      textout.game.remove(textout);
    });

    ttt = this;

};

ENGINE.TextOut.prototype = {

  constructor: ENGINE.TextOut,

  sprite: [216, 159, 14, 14],

  type: "textout",

  step: function(dt) {

  },

  render: function() {

    if (!this.scaleX || !this.scaleY) return;

    app.ctx.save();

    app.ctx.translate(this.x, this.y);

    app.fontSize(this.fontSize);

    app.ctx.fillStyle = this.color;
    app.ctx.textAlign = "center";

    app.ctx.scale(this.scaleX, this.scaleY);
    app.ctx.fillText(this.text, 0, 0)

    app.ctx.restore();

  }

};
ENGINE.Trail = function(parent, args) {

  this.parent = parent;

  Utils.extend(this, {
    color: "#0fc",
    points: [],
    maxPoints: 5,
    width: 10,
    lifetime: 0,
    lifespan: 0,
    paused: false,
    interval: 0.15,
    stroke: true
  }, args);

};

ENGINE.Trail.prototype = {

  zIndex: 200,

  quota: 0.3,

  reaction: 8,

  clear: function() {

    this.points = [];

  },

  step: function(delta) {

    this.lifetime += delta;

    if (Utils.interval("point", this.interval, this)) {

      if (!this.paused) this.points.push(this.parent.x, this.parent.y);

      if (
        (this.points.length > this.maxPoints * 2) ||
        (this.paused && this.points.length > 0)
      ) {
        this.points.shift();
        this.points.shift();
      }
    }

    this.points[this.points.length - 2] = this.parent.x;
    this.points[this.points.length - 1] = this.parent.y;

    if(this.lifespan && this.lifetime > this.lifespan) {
      this.paused = true;
    }

  },

  render: function() {

    if(this.points.length <= 0) return;

    app.layer.save();
    app.layer.strokeStyle(this.color);
    app.layer.lineCap("square");

    // if (!this.stroke) app.layer.strokeStyle("rgba(0,0,0,0.1)");

    for (var i = 2; i < this.points.length; i += 2) {

      var ratio = i / (2 * this.maxPoints);
      var px = this.points[i - 2];
      var py = this.points[i - 1];
      var nx = this.points[i];
      var ny = this.points[i + 1];
      app.layer.beginPath();
      app.layer.moveTo(px | 0, py | 0);
      app.layer.lineTo(nx | 0, ny | 0);
      app.layer.a(ratio).lineWidth(ratio * this.width);
      app.layer.stroke();
    }

    app.layer.restore();


  }

};
ENGINE.Missile = function(args) {

  Utils.extend(this, {
    speed: 400
  }, args);

  this.color = defs.teamColor[this.team];
  this.radius = 4;
  this.direction = 0;

  this.force = 400;
  this.forceDirection = Math.random() * 6;

  this.trail = new ENGINE.Trail(this, {
    interval: 0.05,
    maxPoints: 10,
    color: "#fa0"
  });

  for (var i = 0; i < this.game.entities.length; i++) {

    var e = this.game.entities[i];

    if (!(e instanceof ENGINE.Ship)) continue;

    if (e.missileTarget) continue;
    if (e.team === this.team) continue;

    e.missileTarget = this;
    this.target = e;

    break;

  }

};

ENGINE.Missile.prototype = {

  sprite: [145, 25, 6, 39],

  quota: 0.5,

  constructor: ENGINE.Missile,

  step: function(dt) {

    if(!this.target) return this.die();

    this.direction = Math.atan2(this.target.y - this.y, this.target.x - this.x);

    this.x += Math.cos(this.direction) * this.speed * dt;
    this.y += Math.sin(this.direction) * this.speed * dt;

    this.force = Math.max(this.force - dt * 400, 0);

    this.x += Math.cos(this.forceDirection) * this.force * dt;
    this.y += Math.sin(this.forceDirection) * this.force * dt;


    if (Utils.distance(this, this.target) < this.radius + this.target.radius) {

      this.hit(this.target);

    }

    this.trail.step(dt);


  },

  hit: function(target) {

    target.applyDamage(10 + this.game.score / 10);

    this.die();

  },

  die: function() {

    this.dead = true;

  },

  render: function() {

    this.trail.render();

  }

};
ENGINE.Gameover = {

  score: 737,
  hiscore: 0,

  starOff: [382, 177, 15, 16],
  starOn: [339, 169, 37, 37],

  enter: function() {
    if (window.ga) {
      ga('send', 'screenview', {
        'appName': 'PowerSurge',
        'screenName': 'Gameover'
      });
    }

    this.done = false;

    app.renderer.setSmoothing(true);

    var hiscore = localStorage.getItem("hiscore") | 0;

    if (hiscore < this.score) {

      this.hiscore = this.score;
      localStorage.setItem("hiscore", hiscore);

    }

    this.music = app.music.play("gameover").fadeIn(3).loop();

    this.currentScore = 0;
    this.stars = [];
    this.scoreOffset = -app.width;
    this.achievedStars = Math.min(10, (this.score / 500) * 10 | 0);

    for (var i = 0; i < 10; i++) {

      this.stars.push({
        x: i * 64,
        y: 64,
        scale: 0
      });

    }

    for (var i = 0; i < this.achievedStars; i++) {

      var star = this.stars[i];

      app.tween(star).wait(i * 0.1).to({
        scale: 1.0,
        y: 64
      }, 2.5, "outElastic");

    }

    app.tween(this).to({

      currentScore: this.score,
      scoreOffset: 0

    }, 2.5, "outElastic").on("finished", function() {

      app.state.done = true;

    });


  },

  step: function() {

  },

  renderStars: function(x, y) {


    for (var i = 0; i < 10; i++) {

      var star = this.stars[i];

      app.layer.save();

      app.layer.translate(star.x + x, star.y + y);

      app.layer.align(0.5, 0.5);

      app.layer.drawRegion(app.images.spritesheet, this.starOff, 0, 0);

      if (star.scale > 0) {

        app.layer.rotate(app.lifetime);
        app.layer.scale(star.scale, star.scale);
        app.layer.drawRegion(app.images.spritesheet, this.starOn, 0, 0);
      }

      app.layer.restore();

    }

  },

  render: function() {

    app.ctx.fillStyle = "#282245";

    app.ctx.fillRect(0, 0, app.width, app.height);

    app.ctx.drawImage(app.images.help, app.center.x - app.images.help.width * 0.5 | 0, -50)

    this.renderStars(app.center.x - 320, 0);

    app.fontSize(48);

    app.ctx.fillStyle = "#fa0";
    app.ctx.textAlign = "center";

    app.ctx.fillText("SCORE: " + (this.currentScore | 0), app.center.x + this.scoreOffset, 180)

    app.fontSize(32);

    app.ctx.fillStyle = "#f40";
    app.ctx.textAlign = "center";

    app.ctx.fillText("HI-SCORE: " + (this.hiscore | 0), app.center.x - this.scoreOffset, 220);

    if (this.done) {

      app.ctx.fillStyle = "#cef";
      app.ctx.textAlign = "center";

      if (app.lifetime % 1 < 0.5) {

        app.ctx.fillText("CLICK TO TRY AGAIN ", app.center.x - this.scoreOffset, 260)

      }

    }

  },

  pointerdown: function() {

    if (this.done) {
      if (window.ga) {
        ga('send', {
          'hitType': 'event',
          'eventCategory': 'game',
          'eventAction': 'restart'
        });
      }

      app.setState(ENGINE.Game);

      ENGINE.Game.reset();

    }

  }

};
document.addEventListener("DOMContentLoaded", function(event) {

  app = playground({

    width: 1024,
    height: 640,

    smoothing: true,

    paths: {

      base: "//mozilla.github.io/devtools-perf-game/"

    },

    updateDownloadText: function() {

      if (navigator.userAgent.indexOf("Firefox/40") > -1) {

        var text = defs.downloadLinks["ffdev"][0];
        var link = defs.downloadLinks["ffdev"][1];

      } else {

        var text = defs.downloadLinks["default"][0];
        var link = defs.downloadLinks["default"][1];

      }

      document.body.querySelector("#comicbubble").innerHTML = text;
      document.body.querySelector("#comicbubble").setAttribute("href", link);

    },

    /* set context font size with default font */

    fontSize: function(size) {

      return this.ctx.font = size + "px 'Squada One'";

    },

    create: function() {

      this.loadImages("spritesheet", "help", "splash", "flare", "particles");

      this.keyboard.preventDefault = false;

      this.sound = this.audio.channel("sound").volume(0.5);
      this.music = this.audio.channel("music").volume(0.5);

      this.ctx = app.layer.context;

      this.game = ENGINE.Game;

    },

    /* all images loaded */

    ready: function() {

      this.updateDownloadText();

      /* cache some known colors for spritesheet */

      this.getColoredImage(this.images.spritesheet, "#fff");

      /* start the benchmark */

      this.setState(ENGINE.Benchmark);

    },

    resize: function() {

      this.state.render(0);

    },

    getColoredImage: function(key, color, mode) {

      if (typeof mode === "undefined") mode = "hard-light";

      if (typeof key === "string") {
        var image = this.images[key];
      } else {
        var image = key;
      }

      var storekey = "color-" + color;

      if (!image[storekey]) {

        if (typeof mix === "undefined") mix = 1;

        var below = document.createElement("canvas");
        belowCtx = below.getContext("2d");

        below.width = image.width;
        below.height = image.height;

        belowCtx.drawImage(image, 0, 0);
        belowCtx.globalCompositeOperation = "source-atop";
        belowCtx.fillStyle = color;
        belowCtx.fillRect(0, 0, image.width, image.height);

        image[storekey] = below;

      }

      return image[storekey];

    },

    roundAngle: function(angle) {

      return Utils.ground(angle - Math.PI / 16, Math.PI / 8);

    },

    visibilitychange: function(hidden) {

      if (hidden) {
        if (!this.storedSoundVolume) {
          this.storedSoundVolume = this.sound.volume();
          this.storedMusicVolume = this.music.volume();
          this.sound.volume(0);
          this.music.volume(0);
        }
      } else {
        if (this.storedSoundVolume) {
          this.sound.volume(this.storedSoundVolume);
          this.music.volume(this.storedMusicVolume);
          this.storedSoundVolume = 0;
          this.storedMusicVolume = 0;
        }
      }

    }

  });

});

var performance = window.performance || window.webkitPerformance || Date;

Math.sign = Math.sign || function(x) {

  x = +x; // convert to a number

  if (x === 0 || isNaN(x)) {

    return x;

  }

  return x > 0 ? 1 : -1;

};
/**
 * This is bad and unoptimized code just for you to fix :)
 *
 * Get Firefox Developer Edition to try the new Performance Tools:
 *   https://www.mozilla.org/firefox/developer/
 *
 * 1. Open the `Performance` tool in Firefox Developer Edition
 * 2. Start recording a performance profile
 * 3. Play the game
 * 4. Stop profiling and check the Call Tree or Flame Chart for the maleficent
 *
 * Got ideas for better bottlenecks or even faster code, file
 * an issue or send us a pull request:
 *   https://github.com/mozilla/devtools-perf-game/issues
 */

/**
 * Creates a new array with all elements that pass the `test` function
 * @param {Array} array The array to filter
 * @param {Function} test Function to test each element, invoked with (element)
 * @return {Array} A new array with only passed elements
 */
Utils.filter = function(array, test) {
  var result = array.slice(); // Clone array
  for (var i = 0; i < result.length; i++) {
    if (!test(result[i])) {
      result.splice(i, 1); // Remove element
      i--;
    }
  }
  return result;
};

/**
 * Find nearest entity from a list of entities
 * @param {Entity} from Entity
 * @param {Entity[]} entities List of entities to compare
 * @return {Entity} Nearest Entity
 */
Utils.nearest = function(from, entities) {
  var distances = [];
  for (var i = 0; i < entities.length; i++) {
    var to = entities[i];
    if (from === to) continue;
    var distance = this.distance(from, to);
    distances.push({
      target: to,
      distance: distance
    });
  }
  if (!distances.length) {
    return null;
  }
  var sortedDistances = distances.sort(
    function sortDistances(a, b) {
      return a.distance - b.distance;
    }
  );
  return sortedDistances[0].target;
};

/**
 * Returns nearest ship of opposite team
 * @return {Ship} Nearest enemy ship
 */
ENGINE.Ship.prototype.getTarget = function() {
  var pool = [];
  for (var i = 0; i < this.game.entities.length; i++) {
    var entity = this.game.entities[i];
    if (!(entity instanceof ENGINE.Ship)) continue;
    if (entity.team !== this.team) pool.push(entity);
  }
  // Is Utils.nearest fast enough?
  return Utils.nearest(this, pool);
};

// We update those for positions, maybe we don't need it?
var axes = {
  x: Math.cos,
  y: Math.sin
};

/**
 * Update position for an entity that has speed and direction.
 * @param {Number} direction Angle given in radians
 * @param {Number} value Distance to move
 */
Utils.moveInDirection = function(direction, value) {
  Utils.justAnExpensiveLoop();
  value /= 100;
  for (var i = 0; i < 100; i++) {
    for (var axis in axes) {
      this[axis] += axes[axis](this.direction) * value;
    }
  }
};

/**
 * I am really just an expensive loop ;)
 * Remove me and all references calling me!
 */
Utils.justAnExpensiveLoop = function() {
  // This isn't even doing anything
  var oops = Array(1000);
  oops.map(function(val, i) {
    return Math.PI / 2500 * i;
  }).filter(function(rad) {
    return Math.sin(rad) > 0;
  });
}

/**
 * Update ship position with current direction and speed
 * @param {Number} dt Time delta for current frame in seconds
 */
ENGINE.Ship.prototype.move = function(dt) {
  if (!this.frozen) {
    Utils.moveInDirection.apply(this, [this.direction, this.speed * dt]);
  }

  if (this.force > 0) {
    this.force -= 200 * dt;
    Utils.moveInDirection.apply(this, [this.forceDirection, this.force * dt]);
  }
};

/**
 * Frame step for a particle
 * @param {Number} dt Time delta for current frame in seconds
 */
ENGINE.Particle.prototype.step = function(dt) {
  this.lifetime += dt;
  // Update position
  for (var axis in axes) {
    this[axis] += axes[axis](this.direction) * this.speed * dt;
  }
  this.speed = Math.max(0, this.speed - this.damping * dt);

  this.progress = Math.min(this.lifetime / this.duration, 1.0);
  // Put particle offscreen for pooling and to keep render time constant
  if (this.progress >= 1.0) {
    this.x = 0;
    this.y = 0;
    this.progress = 0;
  }
  // Update index for current sprite to render
  this.spriteIndex = Math.floor(this.progress * this.sprites.length);
}

/**
 * Check if star is in screen boundaries.
 * Otherwise wrap it to the opposite side of screen.
 * @param {Star} star Probed star
 */
ENGINE.BackgroundStars.prototype.wrap = function(star) {
  var pos = [star.x, star.y, 1, 1];
  var bounds = [0, 0, app.width, app.height];

  if (pos[0] < bounds[0]) star.x = app.width;
  if (pos[1] < bounds[1]) star.y = app.height;

  if (pos[0] > bounds[2]) star.x = 0;
  if (pos[1] > bounds[3]) star.y = 0;
};


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGEuanMiLCJzdGF0cy5qcyIsIlV0aWxzLmpzIiwiUGxheWdyb3VuZC5qcyIsIlBsYXlncm91bmQuU2NhbmxpbmVzLmpzIiwiUGxheWdyb3VuZC5Tb3VuZE9uRGVtYW5kLmpzIiwiRW5naW5lLmpzIiwiQmVuY2htYXJrLmpzIiwiQmFja2dyb3VuZFN0YXJzLmpzIiwiQ2lyY2xlRXhwbG9zaW9uLmpzIiwiU2hpcC5qcyIsIkJ1bGxldC5qcyIsIkFzdGVyb2lkLmpzIiwiQ3Vyc29yLmpzIiwiUmVzb3VyY2UuanMiLCJCdXR0b24uanMiLCJQYXJ0aWNsZS5qcyIsIlBsYW5ldC5qcyIsIkdhbWUuanMiLCJQb3dlcnVwLmpzIiwiVGV4dE91dC5qcyIsIlRyYWlsLmpzIiwiTWlzc2lsZS5qcyIsIkdhbWVvdmVyLmpzIiwiTWFpbi5qcyIsImJvdHRsZW5lY2tzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3TkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4M0tBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNydkJBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZlQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xhQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoic2NyaXB0LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGRlZnMgPSB7XHJcblxyXG4gIHRlYW1Db2xvcjogW1wiI2ZmNDQ0NFwiLCBcIiMwMGFhZmZcIl0sXHJcblxyXG4gIGZyb3plblNwcml0ZTogWzE5MywgODYsIDExLCAxOV0sXHJcblxyXG4gIGJ1dHRvbnM6IHtcclxuICAgIFwiZmlnaHRlclwiOiBbNCwgMzQ1LCA2NCwgNjRdLFxyXG4gICAgXCJzcGVlZFwiOiBbMTMyLCAzNDUsIDY0LCA2NF0sXHJcbiAgICBcImxpZmVcIjogWzY4LCAzNDUsIDY0LCA2NF0sXHJcbiAgICBcImRhbWFnZVwiOiBbMTk2LCAzNDUsIDY0LCA2NF1cclxuICB9LFxyXG5cclxuICBzaGlwczoge1xyXG5cclxuICAgIFwiZmlnaHRlclwiOiB7XHJcblxyXG4gICAgICBwcmVmZXJlbmNlOiBbXCJzbWFsbFwiXSxcclxuICAgICAgY29vbGRvd246IDAuNSxcclxuICAgICAgZGFtYWdlOiAxLFxyXG4gICAgICBocDogMTAsXHJcbiAgICAgIHNwcml0ZTogWzQwNywgMTgsIDMyLCAzMl0sXHJcbiAgICAgIHByaWNlOiAxLFxyXG4gICAgICBzcGVlZDogODBcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIFwiZnJlZWxhbmNlclwiOiB7XHJcblxyXG4gICAgICBjb29sZG93bjogMC41LFxyXG4gICAgICBkYW1hZ2U6IDEsXHJcbiAgICAgIGhwOiAxMCxcclxuICAgICAgc3ByaXRlOiBbMzY3LCA1OSwgMzEsIDMyXSxcclxuICAgICAgc3BlZWQ6IDgwXHJcblxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgXCJjcmVlcDFcIjoge1xyXG5cclxuICAgICAgcHJlZmVyZW5jZTogW1wiYmlnXCJdLFxyXG4gICAgICBkYW1hZ2U6IDIsXHJcbiAgICAgIGNvb2xkb3duOiAyLFxyXG4gICAgICBocDogNCxcclxuICAgICAgc3ByaXRlOiBbNDQ0LCAyMywgMjIsIDIxXSxcclxuICAgICAgcHJpY2U6IDUsXHJcbiAgICAgIHNwZWVkOiA2MFxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgXCJjcmVlcDJcIjoge1xyXG5cclxuICAgICAgcHJlZmVyZW5jZTogW1wiYmlnXCJdLFxyXG4gICAgICBkYW1hZ2U6IDIsXHJcbiAgICAgIGNvb2xkb3duOiAyLFxyXG4gICAgICBocDogMTAsXHJcbiAgICAgIHNwcml0ZTogWzQ3MSwgMjMsIDMyLCAyM10sXHJcbiAgICAgIHByaWNlOiA1LFxyXG4gICAgICBzcGVlZDogODBcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIFwiY3JlZXAzXCI6IHtcclxuXHJcbiAgICAgIHByZWZlcmVuY2U6IFtcImJpZ1wiXSxcclxuICAgICAgZGFtYWdlOiA0LFxyXG4gICAgICBjb29sZG93bjogMixcclxuICAgICAgaHA6IDMwLFxyXG4gICAgICBzcHJpdGU6IFs1MDMsIDE5LCAzMiwgMjldLFxyXG4gICAgICBwcmljZTogNSxcclxuICAgICAgc3BlZWQ6IDUwXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBcImNyZWVwNFwiOiB7XHJcblxyXG4gICAgICBwcmVmZXJlbmNlOiBbXCJiaWdcIl0sXHJcbiAgICAgIGRhbWFnZTogNixcclxuICAgICAgY29vbGRvd246IDIsXHJcbiAgICAgIGhwOiA1MCxcclxuICAgICAgc3ByaXRlOiBbNTM1LCAxOCwgMzIsIDMyXSxcclxuICAgICAgcHJpY2U6IDUsXHJcbiAgICAgIHNwZWVkOiA1MFxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgXCJib3NzXCI6IHtcclxuXHJcbiAgICAgIGRhbWFnZTogMTAsXHJcbiAgICAgIGNvb2xkb3duOiAyLFxyXG4gICAgICBocDogNTAwLFxyXG4gICAgICBzcHJpdGU6IFs0NTYsIDUzLCA2NCwgNjRdLFxyXG4gICAgICBzcGVlZDogMzIsXHJcbiAgICAgIGJvc3M6IHRydWVcclxuXHJcbiAgICB9XHJcblxyXG4gIH0sXHJcblxyXG4gIHRvb2x0aXBzOiB7XHJcblxyXG4gICAgXCJmaWdodGVyXCI6IFwiYnVpbGQgYSBmaWdodGVyXCIsXHJcbiAgICBcInNwZWVkXCI6IFwidXBncmFkZSBmaWdodGVycyBzcGVlZFwiLFxyXG4gICAgXCJsaWZlXCI6IFwidXBncmFkZSBmaWdodGVycyBsaWZlXCIsXHJcbiAgICBcImRhbWFnZVwiOiBcInVwZ3JhZGUgZmlnaHRlcnMgZGFtYWdlXCJcclxuXHJcbiAgfSxcclxuXHJcbiAgYm9udXNlczoge1xyXG4gICAgc2hpZWxkOiBcImFzdGVyb2lkcyBzaGllbGRcIixcclxuICAgIGxhc2VyOiBcImN1cnNvciBsYXNlclwiLFxyXG4gICAgbWFnbmV0OiBcImNvaW4gbWFnbmV0XCJcclxuICB9LFxyXG5cclxuXHJcbiAgZG93bmxvYWRMaW5rczoge1xyXG5cclxuICAgIFwiZmZkZXZcIjogW1wiTGVhcm4gbW9yZSBhYm91dCBQZXJmb3JtYW5jZSBUb29scyBpbiBEZXZlbG9wZXIgRWRpdGlvblwiLCBcImh0dHBzOi8vaGFja3MubW96aWxsYS5vcmcvP3V0bV9zb3VyY2U9Y29kZXBlbiZ1dG1fbWVkaXVtPXJlZmVycmFsJnV0bV9jYW1wYWlnbj1maXJlZm94LWRldmVsb3Blci1nYW1lJnV0bV9jb250ZW50PWxlYXJuLXBlcmYtdG9vbHNcIl0sXHJcbiAgICBcImRlZmF1bHRcIjogW1wiR2V0IEZpcmVmb3ggRGV2ZWxvcGVyIEVkaXRpb24gdG8gdHJ5IG91dCB0aGUgbmV3IHBlcmZvcm1hbmNlIHRvb2xzXCIsIFwiaHR0cHM6Ly93d3cubW96aWxsYS5vcmcvZmlyZWZveC9kZXZlbG9wZXIvP3V0bV9zb3VyY2U9Y29kZXBlbiZ1dG1fbWVkaXVtPXJlZmVycmFsJnV0bV9jYW1wYWlnbj1maXJlZm94LWRldmVsb3Blci1nYW1lJnV0bV9jb250ZW50PWdhbWUtcHJvbW9cIl1cclxuXHJcbiAgfVxyXG5cclxufTsiLCIoZnVuY3Rpb24oaSxzLG8sZyxyLGEsbSl7aVsnR29vZ2xlQW5hbHl0aWNzT2JqZWN0J109cjtpW3JdPWlbcl18fGZ1bmN0aW9uKCl7XHJcbihpW3JdLnE9aVtyXS5xfHxbXSkucHVzaChhcmd1bWVudHMpfSxpW3JdLmw9MSpuZXdcclxuRGF0ZSgpO2E9cy5jcmVhdGVFbGVtZW50KG8pLFxyXG5cclxubT1zLmdldEVsZW1lbnRzQnlUYWdOYW1lKG8pWzBdO2EuYXN5bmM9MTthLnNyYz1nO20ucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoYSxtKVxyXG59KSh3aW5kb3csZG9jdW1lbnQsJ3NjcmlwdCcsJy8vd3d3Lmdvb2dsZS1hbmFseXRpY3MuY29tL2FuYWx5dGljcy5qcycsJ2dhJyk7XHJcblxyXG5nYSgnY3JlYXRlJywgJ1VBLTQ5Nzk2MjE4LTI2JywgJ2F1dG8nKTtcclxuZ2EoJ3NlbmQnLCAncGFnZXZpZXcnKTsiLCJ2YXIgVXRpbHMgPSB7XHJcblxyXG4gIGV4dGVuZDogZnVuY3Rpb24oKSB7XHJcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBmb3IgKHZhciBqIGluIGFyZ3VtZW50c1tpXSkge1xyXG4gICAgICAgIGFyZ3VtZW50c1swXVtqXSA9IGFyZ3VtZW50c1tpXVtqXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBhcmd1bWVudHNbMF07XHJcbiAgfSxcclxuXHJcbiAgZGlzdGFuY2U6IGZ1bmN0aW9uKGEsIGIpIHtcclxuXHJcbiAgICB2YXIgZHggPSBhLnggLSBiLng7XHJcbiAgICB2YXIgZHkgPSBhLnkgLSBiLnk7XHJcblxyXG4gICAgcmV0dXJuIE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XHJcblxyXG4gIH0sXHJcblxyXG4gIG5lYXJlc3Q6IGZ1bmN0aW9uKGZyb20sIGVudGl0aWVzKSB7XHJcblxyXG4gICAgdmFyIG1pbiA9IC0xO1xyXG4gICAgdmFyIHJlc3VsdCA9IG51bGw7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbnRpdGllcy5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgdmFyIHRvID0gZW50aXRpZXNbaV07XHJcblxyXG4gICAgICBpZiAoZnJvbSA9PT0gdG8pIGNvbnRpbnVlO1xyXG5cclxuICAgICAgdmFyIGRpc3RhbmNlID0gdGhpcy5kaXN0YW5jZShmcm9tLCB0byk7XHJcblxyXG4gICAgICBpZiAoZGlzdGFuY2UgPCBtaW4gfHwgbWluIDwgMCkge1xyXG4gICAgICAgIG1pbiA9IGRpc3RhbmNlO1xyXG4gICAgICAgIHJlc3VsdCA9IHRvO1xyXG4gICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfSxcclxuXHJcbiAgY2lyY1dyYXA6IGZ1bmN0aW9uKHZhbCkge1xyXG5cclxuICAgIHJldHVybiB0aGlzLndyYXAodmFsLCAwLCBNYXRoLlBJICogMik7XHJcblxyXG4gIH0sXHJcblxyXG4gIHdyYXA6IGZ1bmN0aW9uKHZhbHVlLCBtaW4sIG1heCkge1xyXG5cclxuICAgIGlmICh2YWx1ZSA8IG1pbikgcmV0dXJuIG1heCArICh2YWx1ZSAlIG1heCk7XHJcbiAgICBpZiAodmFsdWUgPj0gbWF4KSByZXR1cm4gdmFsdWUgJSBtYXg7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcblxyXG4gIH0sXHJcblxyXG4gIHdyYXBUbzogZnVuY3Rpb24odmFsdWUsIHRhcmdldCwgbWF4LCBzdGVwKSB7XHJcblxyXG4gICAgaWYgKHZhbHVlID09PSB0YXJnZXQpIHJldHVybiB0YXJnZXQ7XHJcblxyXG4gICAgdmFyIHJlc3VsdCA9IHZhbHVlO1xyXG5cclxuICAgIHZhciBkID0gdGhpcy53cmFwcGVkRGlzdGFuY2UodmFsdWUsIHRhcmdldCwgbWF4KTtcclxuXHJcbiAgICBpZiAoTWF0aC5hYnMoZCkgPCBzdGVwKSByZXR1cm4gdGFyZ2V0O1xyXG5cclxuICAgIHJlc3VsdCArPSAoZCA8IDAgPyAtMSA6IDEpICogc3RlcDtcclxuXHJcbiAgICBpZiAocmVzdWx0ID4gbWF4KSB7XHJcbiAgICAgIHJlc3VsdCA9IHJlc3VsdCAtIG1heDtcclxuICAgIH0gZWxzZSBpZiAocmVzdWx0IDwgMCkge1xyXG4gICAgICByZXN1bHQgPSBtYXggKyByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuXHJcbiAgfSxcclxuXHJcbiAgY2lyY1dyYXBUbzogZnVuY3Rpb24odmFsdWUsIHRhcmdldCwgc3RlcCkge1xyXG5cclxuICAgIHJldHVybiB0aGlzLndyYXBUbyh2YWx1ZSwgdGFyZ2V0LCBNYXRoLlBJICogMiwgc3RlcCk7XHJcblxyXG4gIH0sXHJcblxyXG4gIGNpcmNEaXN0YW5jZTogZnVuY3Rpb24oYSwgYikge1xyXG5cclxuICAgIHJldHVybiB0aGlzLndyYXBwZWREaXN0YW5jZShhLCBiLCBNYXRoLlBJICogMik7XHJcblxyXG4gIH0sXHJcblxyXG4gIHdyYXBwZWREaXN0YW5jZTogZnVuY3Rpb24oYSwgYiwgbWF4KSB7XHJcblxyXG4gICAgaWYgKGEgPT09IGIpIHJldHVybiAwO1xyXG4gICAgZWxzZSBpZiAoYSA8IGIpIHtcclxuICAgICAgdmFyIGwgPSAtYSAtIG1heCArIGI7XHJcbiAgICAgIHZhciByID0gYiAtIGE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YXIgbCA9IGIgLSBhO1xyXG4gICAgICB2YXIgciA9IG1heCAtIGEgKyBiO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChNYXRoLmFicyhsKSA+IE1hdGguYWJzKHIpKSByZXR1cm4gcjtcclxuICAgIGVsc2UgcmV0dXJuIGw7XHJcblxyXG4gIH0sXHJcblxyXG4gIHJhbmRvbTogZnVuY3Rpb24oYSwgYikge1xyXG5cclxuICAgIGlmIChhID09PSB1bmRlZmluZWQpIHtcclxuXHJcbiAgICAgIHJldHVybiBNYXRoLnJhbmRvbSgpO1xyXG5cclxuICAgIH0gZWxzZSBpZiAoYiAhPT0gdW5kZWZpbmVkKSB7XHJcblxyXG4gICAgICByZXR1cm4gTWF0aC5mbG9vcihhICsgTWF0aC5yYW5kb20oKSAqIE1hdGguYWJzKGIgLSBhICsgMSkpO1xyXG5cclxuICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICBpZiAoYSBpbnN0YW5jZW9mIEFycmF5KSByZXR1cm4gYVsoYS5sZW5ndGggKyAxKSAqIE1hdGgucmFuZG9tKCkgLSAxIHwgMF07XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBhW3RoaXMucmFuZG9tKE9iamVjdC5rZXlzKGEpKV07XHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gIH0sXHJcblxyXG4gIHNpbmNvczogZnVuY3Rpb24oYW5nbGUsIHJhZGl1cykge1xyXG5cclxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgIHJhZGl1cyA9IGFuZ2xlO1xyXG4gICAgICBhbmdsZSA9IE1hdGgucmFuZG9tKCkgKiA2LjI4O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHg6IE1hdGguY29zKGFuZ2xlKSAqIHJhZGl1cyxcclxuICAgICAgeTogTWF0aC5zaW4oYW5nbGUpICogcmFkaXVzXHJcbiAgICB9O1xyXG4gIH0sXHJcblxyXG4gIGdyb3VuZDogZnVuY3Rpb24obnVtLCB0aHJlc2hvbGQpIHtcclxuXHJcbiAgICByZXR1cm4gKG51bSAvIHRocmVzaG9sZCB8IDApICogdGhyZXNob2xkO1xyXG5cclxuICB9LFxyXG5cclxuICBzaHVmZmxlOiBmdW5jdGlvbihvKSB7XHJcbiAgICBmb3IgKHZhciBqLCB4LCBpID0gby5sZW5ndGg7IGk7IGogPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBpKSwgeCA9IG9bLS1pXSwgb1tpXSA9IG9bal0sIG9bal0gPSB4KTtcclxuICAgIHJldHVybiBvO1xyXG4gIH0sXHJcblxyXG4gIHNpZ246IGZ1bmN0aW9uKHZhbHVlKSB7XHJcblxyXG4gICAgcmV0dXJuIHZhbHVlIC8gTWF0aC5hYnModmFsdWUpO1xyXG5cclxuICB9LFxyXG5cclxuICBtb3ZlVG86IGZ1bmN0aW9uKHZhbHVlLCB0YXJnZXQsIHN0ZXApIHtcclxuXHJcbiAgICBpZiAodmFsdWUgPCB0YXJnZXQpIHtcclxuICAgICAgdmFsdWUgKz0gc3RlcDtcclxuICAgICAgaWYgKHZhbHVlID4gdGFyZ2V0KSB2YWx1ZSA9IHRhcmdldDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodmFsdWUgPiB0YXJnZXQpIHtcclxuICAgICAgdmFsdWUgLT0gc3RlcDtcclxuICAgICAgaWYgKHZhbHVlIDwgdGFyZ2V0KSB2YWx1ZSA9IHRhcmdldDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdmFsdWU7XHJcblxyXG4gIH0sXHJcblxyXG4gIGludGVydmFsOiBmdW5jdGlvbihrZXksIGludGVydmFsLCBvYmplY3QpIHtcclxuXHJcbiAgICBpZiAoIW9iamVjdC50aHJvdHRsZXMpIG9iamVjdC50aHJvdHRsZXMgPSB7fTtcclxuICAgIGlmICghb2JqZWN0LnRocm90dGxlc1trZXldKSBvYmplY3QudGhyb3R0bGVzW2tleV0gPSBvYmplY3QubGlmZXRpbWUgLSBpbnRlcnZhbDtcclxuXHJcbiAgICBpZiAob2JqZWN0LmxpZmV0aW1lIC0gb2JqZWN0LnRocm90dGxlc1trZXldID49IGludGVydmFsKSB7XHJcbiAgICAgIG9iamVjdC50aHJvdHRsZXNba2V5XSA9IG9iamVjdC5saWZldGltZTtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9IGVsc2UgcmV0dXJuIGZhbHNlO1xyXG5cclxuICB9LFxyXG5cclxuICBtb3ZlSW5EaXJlY3Rpb246IGZ1bmN0aW9uKGRpcmVjdGlvbiwgdmFsdWUpIHtcclxuXHJcbiAgICB0aGlzLnggKz0gTWF0aC5jb3MoZGlyZWN0aW9uKSAqIHZhbHVlO1xyXG4gICAgdGhpcy55ICs9IE1hdGguc2luKGRpcmVjdGlvbikgKiB2YWx1ZTtcclxuXHJcbiAgfSxcclxuXHJcbiAgb3NjOiBmdW5jdGlvbih0aW1lLCBwZXJpb2QpIHtcclxuXHJcbiAgICByZXR1cm4gTWF0aC5zaW4oTWF0aC5QSSAqICh0aW1lICUgcGVyaW9kIC8gcGVyaW9kKSk7XHJcblxyXG4gIH0sXHJcblxyXG4gIGZpbHRlcjogZnVuY3Rpb24oYXJyYXksIHRlc3QpIHtcclxuXHJcbiAgICB2YXIgcmVzdWx0ID0gW107XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAodGVzdChhcnJheVtpXSkpIHJlc3VsdC5wdXNoKGFycmF5W2ldKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG5cclxuICB9LFxyXG5cclxuICByZWN0SW5SZWN0OiBmdW5jdGlvbihyMXgsIHIxeSwgcjF3LCByMWgsIHIyeCwgcjJ5LCByMncsIHIyaCkge1xyXG4gICAgcmV0dXJuICEocjJ4ID4gcjF4ICsgcjF3IHx8XHJcbiAgICAgIHIyeCArIHIydyA8IHIxeCB8fFxyXG4gICAgICByMnkgPiByMXkgKyByMWggfHxcclxuICAgICAgcjJ5ICsgcjJoIDwgcjF5KTtcclxuICB9XHJcblxyXG5cclxuXHJcbn07IiwiLyogZmlsZTogbGljZW5zZS50eHQgKi9cclxuXHJcbi8qXHJcblxyXG4gIFBsYXlncm91bmRKUyByNFxyXG5cclxuICBodHRwOi8vcGxheWdyb3VuZGpzLmNvbVxyXG5cclxuICAoYykgMjAxMi0yMDE1IGh0dHA6Ly9yZXpvbmVyLm5ldFxyXG5cclxuICBQbGF5Z3JvdW5kIG1heSBiZSBmcmVlbHkgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxyXG5cclxuICBsYXRlc3QgbWFqb3IgY2hhbmdlczpcclxuXHJcbiAgcjRcclxuXHJcbiAgKyB0d2VlbnMgd2l0aCBldmVudHNcclxuICArIGNvbnRleHQgYXJndW1lbnQgZm9yIGV2ZW50c1xyXG5cclxuICByM1xyXG5cclxuICArIHBvaW50ZXIgPSBtb3VzZSArIHRvdWNoXHJcblxyXG4qL1xyXG5cclxuXHJcbi8qIGZpbGU6IHNyYy9saWIvRWFzZS5qcyAqL1xyXG5cclxuLypcclxuXHJcbiAgRWFzZSAxLjBcclxuXHJcbiAgaHR0cDovL2NhbnZhc3F1ZXJ5LmNvbVxyXG5cclxuICAoYykgMjAxNSBieSBSZXpvbmVyIC0gaHR0cDovL3Jlem9uZXIubmV0XHJcblxyXG4gIGBlYXNlYCBtYXkgYmUgZnJlZWx5IGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cclxuXHJcbiovXHJcblxyXG4oZnVuY3Rpb24oKSB7XHJcblxyXG4gIHZhciBlYXNlID0gZnVuY3Rpb24ocHJvZ3Jlc3MsIGVhc2luZykge1xyXG5cclxuICAgIGlmICh0eXBlb2YgZWFzZS5jYWNoZVtlYXNpbmddID09PSBcImZ1bmN0aW9uXCIpIHtcclxuXHJcbiAgICAgIHJldHVybiBlYXNlLmNhY2hlW2Vhc2luZ10ocHJvZ3Jlc3MpO1xyXG5cclxuICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICByZXR1cm4gZWFzZS5zcGxpbmUocHJvZ3Jlc3MsIGVhc2luZyB8fCBlYXNlLmRlZmF1bHRFYXNpbmcpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgfTtcclxuXHJcbiAgdmFyIGV4dGVuZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgZm9yICh2YXIgaiBpbiBhcmd1bWVudHNbaV0pIHtcclxuICAgICAgICBhcmd1bWVudHNbMF1bal0gPSBhcmd1bWVudHNbaV1bal07XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gYXJndW1lbnRzWzBdO1xyXG4gIH07XHJcblxyXG4gIGV4dGVuZChlYXNlLCB7XHJcblxyXG4gICAgZGVmYXVsdEVhc2luZzogXCIwMTZcIixcclxuXHJcbiAgICBjYWNoZToge1xyXG5cclxuICAgICAgbGluZWFyOiBmdW5jdGlvbih0KSB7XHJcbiAgICAgICAgcmV0dXJuIHRcclxuICAgICAgfSxcclxuXHJcbiAgICAgIGluUXVhZDogZnVuY3Rpb24odCkge1xyXG4gICAgICAgIHJldHVybiB0ICogdFxyXG4gICAgICB9LFxyXG4gICAgICBvdXRRdWFkOiBmdW5jdGlvbih0KSB7XHJcbiAgICAgICAgcmV0dXJuIHQgKiAoMiAtIHQpXHJcbiAgICAgIH0sXHJcbiAgICAgIGluT3V0UXVhZDogZnVuY3Rpb24odCkge1xyXG4gICAgICAgIHJldHVybiB0IDwgLjUgPyAyICogdCAqIHQgOiAtMSArICg0IC0gMiAqIHQpICogdFxyXG4gICAgICB9LFxyXG4gICAgICBpbkN1YmljOiBmdW5jdGlvbih0KSB7XHJcbiAgICAgICAgcmV0dXJuIHQgKiB0ICogdFxyXG4gICAgICB9LFxyXG4gICAgICBvdXRDdWJpYzogZnVuY3Rpb24odCkge1xyXG4gICAgICAgIHJldHVybiAoLS10KSAqIHQgKiB0ICsgMVxyXG4gICAgICB9LFxyXG4gICAgICBpbk91dEN1YmljOiBmdW5jdGlvbih0KSB7XHJcbiAgICAgICAgcmV0dXJuIHQgPCAuNSA/IDQgKiB0ICogdCAqIHQgOiAodCAtIDEpICogKDIgKiB0IC0gMikgKiAoMiAqIHQgLSAyKSArIDFcclxuICAgICAgfSxcclxuICAgICAgaW5RdWFydDogZnVuY3Rpb24odCkge1xyXG4gICAgICAgIHJldHVybiB0ICogdCAqIHQgKiB0XHJcbiAgICAgIH0sXHJcbiAgICAgIG91dFF1YXJ0OiBmdW5jdGlvbih0KSB7XHJcbiAgICAgICAgcmV0dXJuIDEgLSAoLS10KSAqIHQgKiB0ICogdFxyXG4gICAgICB9LFxyXG4gICAgICBpbk91dFF1YXJ0OiBmdW5jdGlvbih0KSB7XHJcbiAgICAgICAgcmV0dXJuIHQgPCAuNSA/IDggKiB0ICogdCAqIHQgKiB0IDogMSAtIDggKiAoLS10KSAqIHQgKiB0ICogdFxyXG4gICAgICB9LFxyXG4gICAgICBpblF1aW50OiBmdW5jdGlvbih0KSB7XHJcbiAgICAgICAgcmV0dXJuIHQgKiB0ICogdCAqIHQgKiB0XHJcbiAgICAgIH0sXHJcbiAgICAgIG91dFF1aW50OiBmdW5jdGlvbih0KSB7XHJcbiAgICAgICAgcmV0dXJuIDEgKyAoLS10KSAqIHQgKiB0ICogdCAqIHRcclxuICAgICAgfSxcclxuICAgICAgaW5PdXRRdWludDogZnVuY3Rpb24odCkge1xyXG4gICAgICAgIHJldHVybiB0IDwgLjUgPyAxNiAqIHQgKiB0ICogdCAqIHQgKiB0IDogMSArIDE2ICogKC0tdCkgKiB0ICogdCAqIHQgKiB0XHJcbiAgICAgIH0sXHJcbiAgICAgIGluU2luZTogZnVuY3Rpb24odCkge1xyXG4gICAgICAgIHJldHVybiAtMSAqIE1hdGguY29zKHQgLyAxICogKE1hdGguUEkgKiAwLjUpKSArIDE7XHJcbiAgICAgIH0sXHJcbiAgICAgIG91dFNpbmU6IGZ1bmN0aW9uKHQpIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5zaW4odCAvIDEgKiAoTWF0aC5QSSAqIDAuNSkpO1xyXG4gICAgICB9LFxyXG4gICAgICBpbk91dFNpbmU6IGZ1bmN0aW9uKHQpIHtcclxuICAgICAgICByZXR1cm4gLTEgLyAyICogKE1hdGguY29zKE1hdGguUEkgKiB0KSAtIDEpO1xyXG4gICAgICB9LFxyXG4gICAgICBpbkV4cG86IGZ1bmN0aW9uKHQpIHtcclxuICAgICAgICByZXR1cm4gKHQgPT0gMCkgPyAwIDogTWF0aC5wb3coMiwgMTAgKiAodCAtIDEpKTtcclxuICAgICAgfSxcclxuICAgICAgb3V0RXhwbzogZnVuY3Rpb24odCkge1xyXG4gICAgICAgIHJldHVybiAodCA9PSAxKSA/IDEgOiAoLU1hdGgucG93KDIsIC0xMCAqIHQpICsgMSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIGluT3V0RXhwbzogZnVuY3Rpb24odCkge1xyXG4gICAgICAgIGlmICh0ID09IDApIHJldHVybiAwO1xyXG4gICAgICAgIGlmICh0ID09IDEpIHJldHVybiAxO1xyXG4gICAgICAgIGlmICgodCAvPSAxIC8gMikgPCAxKSByZXR1cm4gMSAvIDIgKiBNYXRoLnBvdygyLCAxMCAqICh0IC0gMSkpO1xyXG4gICAgICAgIHJldHVybiAxIC8gMiAqICgtTWF0aC5wb3coMiwgLTEwICogLS10KSArIDIpO1xyXG4gICAgICB9LFxyXG4gICAgICBpbkNpcmM6IGZ1bmN0aW9uKHQpIHtcclxuICAgICAgICByZXR1cm4gLTEgKiAoTWF0aC5zcXJ0KDEgLSB0ICogdCkgLSAxKTtcclxuICAgICAgfSxcclxuICAgICAgb3V0Q2lyYzogZnVuY3Rpb24odCkge1xyXG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoMSAtICh0ID0gdCAtIDEpICogdCk7XHJcbiAgICAgIH0sXHJcbiAgICAgIGluT3V0Q2lyYzogZnVuY3Rpb24odCkge1xyXG4gICAgICAgIGlmICgodCAvPSAxIC8gMikgPCAxKSByZXR1cm4gLTEgLyAyICogKE1hdGguc3FydCgxIC0gdCAqIHQpIC0gMSk7XHJcbiAgICAgICAgcmV0dXJuIDEgLyAyICogKE1hdGguc3FydCgxIC0gKHQgLT0gMikgKiB0KSArIDEpO1xyXG4gICAgICB9LFxyXG4gICAgICBpbkVsYXN0aWM6IGZ1bmN0aW9uKHQpIHtcclxuICAgICAgICB2YXIgcyA9IDEuNzAxNTg7XHJcbiAgICAgICAgdmFyIHAgPSAwO1xyXG4gICAgICAgIHZhciBhID0gMTtcclxuICAgICAgICBpZiAodCA9PSAwKSByZXR1cm4gMDtcclxuICAgICAgICBpZiAodCA9PSAxKSByZXR1cm4gMTtcclxuICAgICAgICBpZiAoIXApIHAgPSAwLjM7XHJcbiAgICAgICAgaWYgKGEgPCAxKSB7XHJcbiAgICAgICAgICBhID0gMTtcclxuICAgICAgICAgIHZhciBzID0gcCAvIDQ7XHJcbiAgICAgICAgfSBlbHNlIHZhciBzID0gcCAvICgyICogTWF0aC5QSSkgKiBNYXRoLmFzaW4oMSAvIGEpO1xyXG4gICAgICAgIHJldHVybiAtKGEgKiBNYXRoLnBvdygyLCAxMCAqICh0IC09IDEpKSAqIE1hdGguc2luKCh0IC0gcykgKiAoMiAqIE1hdGguUEkpIC8gcCkpO1xyXG4gICAgICB9LFxyXG4gICAgICBvdXRFbGFzdGljOiBmdW5jdGlvbih0KSB7XHJcbiAgICAgICAgdmFyIHMgPSAxLjcwMTU4O1xyXG4gICAgICAgIHZhciBwID0gMDtcclxuICAgICAgICB2YXIgYSA9IDE7XHJcbiAgICAgICAgaWYgKHQgPT0gMCkgcmV0dXJuIDA7XHJcbiAgICAgICAgaWYgKHQgPT0gMSkgcmV0dXJuIDE7XHJcbiAgICAgICAgaWYgKCFwKSBwID0gMC4zO1xyXG4gICAgICAgIGlmIChhIDwgMSkge1xyXG4gICAgICAgICAgYSA9IDE7XHJcbiAgICAgICAgICB2YXIgcyA9IHAgLyA0O1xyXG4gICAgICAgIH0gZWxzZSB2YXIgcyA9IHAgLyAoMiAqIE1hdGguUEkpICogTWF0aC5hc2luKDEgLyBhKTtcclxuICAgICAgICByZXR1cm4gYSAqIE1hdGgucG93KDIsIC0xMCAqIHQpICogTWF0aC5zaW4oKHQgLSBzKSAqICgyICogTWF0aC5QSSkgLyBwKSArIDE7XHJcbiAgICAgIH0sXHJcbiAgICAgIGluT3V0RWxhc3RpYzogZnVuY3Rpb24odCkge1xyXG4gICAgICAgIHZhciBzID0gMS43MDE1ODtcclxuICAgICAgICB2YXIgcCA9IDA7XHJcbiAgICAgICAgdmFyIGEgPSAxO1xyXG4gICAgICAgIGlmICh0ID09IDApIHJldHVybiAwO1xyXG4gICAgICAgIGlmICgodCAvPSAxIC8gMikgPT0gMikgcmV0dXJuIDE7XHJcbiAgICAgICAgaWYgKCFwKSBwID0gKDAuMyAqIDEuNSk7XHJcbiAgICAgICAgaWYgKGEgPCAxKSB7XHJcbiAgICAgICAgICBhID0gMTtcclxuICAgICAgICAgIHZhciBzID0gcCAvIDQ7XHJcbiAgICAgICAgfSBlbHNlIHZhciBzID0gcCAvICgyICogTWF0aC5QSSkgKiBNYXRoLmFzaW4oMSAvIGEpO1xyXG4gICAgICAgIGlmICh0IDwgMSkgcmV0dXJuIC0uNSAqIChhICogTWF0aC5wb3coMiwgMTAgKiAodCAtPSAxKSkgKiBNYXRoLnNpbigodCAtIHMpICogKDIgKiBNYXRoLlBJKSAvIHApKTtcclxuICAgICAgICByZXR1cm4gYSAqIE1hdGgucG93KDIsIC0xMCAqICh0IC09IDEpKSAqIE1hdGguc2luKCh0IC0gcykgKiAoMiAqIE1hdGguUEkpIC8gcCkgKiAwLjUgKyAxO1xyXG4gICAgICB9LFxyXG4gICAgICBpbkJhY2s6IGZ1bmN0aW9uKHQsIHMpIHtcclxuICAgICAgICBpZiAocyA9PSB1bmRlZmluZWQpIHMgPSAxLjcwMTU4O1xyXG4gICAgICAgIHJldHVybiAxICogdCAqIHQgKiAoKHMgKyAxKSAqIHQgLSBzKTtcclxuICAgICAgfSxcclxuICAgICAgb3V0QmFjazogZnVuY3Rpb24odCwgcykge1xyXG4gICAgICAgIGlmIChzID09IHVuZGVmaW5lZCkgcyA9IDEuNzAxNTg7XHJcbiAgICAgICAgcmV0dXJuIDEgKiAoKHQgPSB0IC8gMSAtIDEpICogdCAqICgocyArIDEpICogdCArIHMpICsgMSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIGluT3V0QmFjazogZnVuY3Rpb24odCwgcykge1xyXG4gICAgICAgIGlmIChzID09IHVuZGVmaW5lZCkgcyA9IDEuNzAxNTg7XHJcbiAgICAgICAgaWYgKCh0IC89IDEgLyAyKSA8IDEpIHJldHVybiAxIC8gMiAqICh0ICogdCAqICgoKHMgKj0gKDEuNTI1KSkgKyAxKSAqIHQgLSBzKSk7XHJcbiAgICAgICAgcmV0dXJuIDEgLyAyICogKCh0IC09IDIpICogdCAqICgoKHMgKj0gKDEuNTI1KSkgKyAxKSAqIHQgKyBzKSArIDIpO1xyXG4gICAgICB9LFxyXG4gICAgICBpbkJvdW5jZTogZnVuY3Rpb24odCkge1xyXG4gICAgICAgIHJldHVybiAxIC0gdGhpcy5vdXRCb3VuY2UoMSAtIHQpO1xyXG4gICAgICB9LFxyXG4gICAgICBvdXRCb3VuY2U6IGZ1bmN0aW9uKHQpIHtcclxuICAgICAgICBpZiAoKHQgLz0gMSkgPCAoMSAvIDIuNzUpKSB7XHJcbiAgICAgICAgICByZXR1cm4gKDcuNTYyNSAqIHQgKiB0KTtcclxuICAgICAgICB9IGVsc2UgaWYgKHQgPCAoMiAvIDIuNzUpKSB7XHJcbiAgICAgICAgICByZXR1cm4gKDcuNTYyNSAqICh0IC09ICgxLjUgLyAyLjc1KSkgKiB0ICsgLjc1KTtcclxuICAgICAgICB9IGVsc2UgaWYgKHQgPCAoMi41IC8gMi43NSkpIHtcclxuICAgICAgICAgIHJldHVybiAoNy41NjI1ICogKHQgLT0gKDIuMjUgLyAyLjc1KSkgKiB0ICsgLjkzNzUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXR1cm4gKDcuNTYyNSAqICh0IC09ICgyLjYyNSAvIDIuNzUpKSAqIHQgKyAuOTg0Mzc1KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGluT3V0Qm91bmNlOiBmdW5jdGlvbih0KSB7XHJcbiAgICAgICAgaWYgKHQgPCAxIC8gMikgcmV0dXJuIHRoaXMuaW5Cb3VuY2UodCAqIDIpICogMC41O1xyXG4gICAgICAgIHJldHVybiB0aGlzLm91dEJvdW5jZSh0ICogMiAtIDEpICogMC41ICsgMC41O1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHRyYW5zbGF0ZUVhc2luZzogZnVuY3Rpb24oa2V5KSB7XHJcblxyXG4gICAgICBpZiAoIXRoaXMuY2FjaGVba2V5XSkge1xyXG4gICAgICAgIHZhciBhcnJheSA9IGtleS5zcGxpdCgnJyk7XHJcblxyXG4gICAgICAgIHZhciBzaWduID0gMTtcclxuICAgICAgICB2YXIgc2lnbmVkID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgICAgICB2YXIgY2hhciA9IGFycmF5W2ldO1xyXG5cclxuICAgICAgICAgIGlmIChjaGFyID09PSBcIi1cIikge1xyXG4gICAgICAgICAgICBzaWduID0gLTE7XHJcbiAgICAgICAgICAgIHNpZ25lZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGFycmF5LnNwbGljZShpLS0sIDEpO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChjaGFyID09PSBcIitcIikge1xyXG4gICAgICAgICAgICBzaWduID0gMTtcclxuICAgICAgICAgICAgYXJyYXkuc3BsaWNlKGktLSwgMSk7XHJcbiAgICAgICAgICB9IGVsc2UgYXJyYXlbaV0gPSBwYXJzZUludChhcnJheVtpXSwgMTYpICogc2lnbjtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgbWluID0gTWF0aC5taW4uYXBwbHkobnVsbCwgYXJyYXkpO1xyXG4gICAgICAgIHZhciBtYXggPSBNYXRoLm1heC5hcHBseShudWxsLCBhcnJheSk7XHJcbiAgICAgICAgdmFyIGRpZmYgPSBtYXggLSBtaW47XHJcbiAgICAgICAgdmFyIGNhY2hlID0gW107XHJcbiAgICAgICAgdmFyIG5vcm1hbGl6ZWQgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgaWYgKHNpZ25lZCkge1xyXG4gICAgICAgICAgICB2YXIgZGlmZiA9IE1hdGgubWF4KE1hdGguYWJzKG1pbiksIE1hdGguYWJzKG1heCkpXHJcbiAgICAgICAgICAgIG5vcm1hbGl6ZWQucHVzaCgoYXJyYXlbaV0pIC8gZGlmZik7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgZGlmZiA9IG1heCAtIG1pbjtcclxuICAgICAgICAgICAgbm9ybWFsaXplZC5wdXNoKChhcnJheVtpXSAtIG1pbikgLyBkaWZmKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY2FjaGVba2V5XSA9IG5vcm1hbGl6ZWQ7XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdGhpcy5jYWNoZVtrZXldXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvKlxyXG5cclxuICAgICAgQ3ViaWMtc3BsaW5lIGludGVycG9sYXRpb24gYnkgSXZhbiBLdWNraXJcclxuXHJcbiAgICAgIGh0dHA6Ly9ibG9nLml2YW5rLm5ldC9pbnRlcnBvbGF0aW9uLXdpdGgtY3ViaWMtc3BsaW5lcy5odG1sXHJcblxyXG4gICAgICBXaXRoIHNsaWdodCBtb2RpZmljYXRpb25zIGJ5IE1vcmdhbiBIZXJsb2NrZXJcclxuXHJcbiAgICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9tb3JnYW5oZXJsb2NrZXIvY3ViaWMtc3BsaW5lXHJcblxyXG4gICAgKi9cclxuXHJcbiAgICBzcGxpbmVLOiB7fSxcclxuICAgIHNwbGluZVg6IHt9LFxyXG4gICAgc3BsaW5lWToge30sXHJcblxyXG4gICAgaW5zZXJ0SW50ZXJtZWRpYXRlVmFsdWVzOiBmdW5jdGlvbihhKSB7XHJcbiAgICAgIHZhciByZXN1bHQgPSBbXTtcclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgcmVzdWx0LnB1c2goYVtpXSk7XHJcblxyXG4gICAgICAgIGlmIChpIDwgYS5sZW5ndGggLSAxKSByZXN1bHQucHVzaChhW2kgKyAxXSArIChhW2ldIC0gYVtpICsgMV0pICogMC42KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH0sXHJcblxyXG4gICAgc3BsaW5lOiBmdW5jdGlvbih4LCBrZXkpIHtcclxuXHJcbiAgICAgIGlmICghdGhpcy5zcGxpbmVLW2tleV0pIHtcclxuXHJcbiAgICAgICAgdmFyIHhzID0gW107XHJcbiAgICAgICAgdmFyIHlzID0gdGhpcy50cmFuc2xhdGVFYXNpbmcoa2V5KTtcclxuXHJcbiAgICAgICAgLy8geXMgPSB0aGlzLmluc2VydEludGVybWVkaWF0ZVZhbHVlcyh5cyk7XHJcblxyXG4gICAgICAgIGlmICgheXMubGVuZ3RoKSByZXR1cm4gMDtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB5cy5sZW5ndGg7IGkrKykgeHMucHVzaChpICogKDEgLyAoeXMubGVuZ3RoIC0gMSkpKTtcclxuXHJcbiAgICAgICAgdmFyIGtzID0geHMubWFwKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgcmV0dXJuIDBcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAga3MgPSB0aGlzLmdldE5hdHVyYWxLcyh4cywgeXMsIGtzKTtcclxuXHJcbiAgICAgICAgdGhpcy5zcGxpbmVYW2tleV0gPSB4cztcclxuICAgICAgICB0aGlzLnNwbGluZVlba2V5XSA9IHlzO1xyXG4gICAgICAgIHRoaXMuc3BsaW5lS1trZXldID0ga3M7XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoeCA+IDEpIHJldHVybiB0aGlzLnNwbGluZVlba2V5XVt0aGlzLnNwbGluZVlba2V5XS5sZW5ndGggLSAxXTtcclxuXHJcbiAgICAgIHZhciBrcyA9IHRoaXMuc3BsaW5lS1trZXldO1xyXG4gICAgICB2YXIgeHMgPSB0aGlzLnNwbGluZVhba2V5XTtcclxuICAgICAgdmFyIHlzID0gdGhpcy5zcGxpbmVZW2tleV07XHJcblxyXG4gICAgICB2YXIgaSA9IDE7XHJcblxyXG4gICAgICB3aGlsZSAoeHNbaV0gPCB4KSBpKys7XHJcblxyXG4gICAgICB2YXIgdCA9ICh4IC0geHNbaSAtIDFdKSAvICh4c1tpXSAtIHhzW2kgLSAxXSk7XHJcbiAgICAgIHZhciBhID0ga3NbaSAtIDFdICogKHhzW2ldIC0geHNbaSAtIDFdKSAtICh5c1tpXSAtIHlzW2kgLSAxXSk7XHJcbiAgICAgIHZhciBiID0gLWtzW2ldICogKHhzW2ldIC0geHNbaSAtIDFdKSArICh5c1tpXSAtIHlzW2kgLSAxXSk7XHJcbiAgICAgIHZhciBxID0gKDEgLSB0KSAqIHlzW2kgLSAxXSArIHQgKiB5c1tpXSArIHQgKiAoMSAtIHQpICogKGEgKiAoMSAtIHQpICsgYiAqIHQpO1xyXG5cclxuICAgICAgLypcclxuICAgICAgdmFyIHB5ID0geXNbaSAtIDJdO1xyXG4gICAgICB2YXIgY3kgPSB5c1tpIC0gMV07XHJcbiAgICAgIHZhciBueSA9IChpIDwgeXMubGVuZ3RoIC0gMSkgPyB5c1tpXSA6IHlzW2kgLSAxXTtcclxuXHJcbiAgICAgIGlmIChxID4gbnkpIHtcclxuICAgICAgICB2YXIgZGlmZiA9IChxIC0gcHkpO1xyXG4gICAgICAgIC8vcSA9IHB5ICsgZGlmZjtcclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICBpZiAoY3kgPT09IG55ICYmIGN5ID09PSBweSkgcSA9IHB5O1xyXG4gICAgKi9cclxuXHJcblxyXG4gICAgICByZXR1cm4gcTtcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0TmF0dXJhbEtzOiBmdW5jdGlvbih4cywgeXMsIGtzKSB7XHJcbiAgICAgIHZhciBuID0geHMubGVuZ3RoIC0gMTtcclxuICAgICAgdmFyIEEgPSB0aGlzLnplcm9zTWF0KG4gKyAxLCBuICsgMik7XHJcblxyXG4gICAgICBmb3IgKHZhciBpID0gMTsgaSA8IG47IGkrKykgLy8gcm93c1xyXG4gICAgICB7XHJcbiAgICAgICAgQVtpXVtpIC0gMV0gPSAxIC8gKHhzW2ldIC0geHNbaSAtIDFdKTtcclxuICAgICAgICBBW2ldW2ldID0gMiAqICgxIC8gKHhzW2ldIC0geHNbaSAtIDFdKSArIDEgLyAoeHNbaSArIDFdIC0geHNbaV0pKTtcclxuICAgICAgICBBW2ldW2kgKyAxXSA9IDEgLyAoeHNbaSArIDFdIC0geHNbaV0pO1xyXG4gICAgICAgIEFbaV1bbiArIDFdID0gMyAqICgoeXNbaV0gLSB5c1tpIC0gMV0pIC8gKCh4c1tpXSAtIHhzW2kgLSAxXSkgKiAoeHNbaV0gLSB4c1tpIC0gMV0pKSArICh5c1tpICsgMV0gLSB5c1tpXSkgLyAoKHhzW2kgKyAxXSAtIHhzW2ldKSAqICh4c1tpICsgMV0gLSB4c1tpXSkpKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgQVswXVswXSA9IDIgLyAoeHNbMV0gLSB4c1swXSk7XHJcbiAgICAgIEFbMF1bMV0gPSAxIC8gKHhzWzFdIC0geHNbMF0pO1xyXG4gICAgICBBWzBdW24gKyAxXSA9IDMgKiAoeXNbMV0gLSB5c1swXSkgLyAoKHhzWzFdIC0geHNbMF0pICogKHhzWzFdIC0geHNbMF0pKTtcclxuXHJcbiAgICAgIEFbbl1bbiAtIDFdID0gMSAvICh4c1tuXSAtIHhzW24gLSAxXSk7XHJcbiAgICAgIEFbbl1bbl0gPSAyIC8gKHhzW25dIC0geHNbbiAtIDFdKTtcclxuICAgICAgQVtuXVtuICsgMV0gPSAzICogKHlzW25dIC0geXNbbiAtIDFdKSAvICgoeHNbbl0gLSB4c1tuIC0gMV0pICogKHhzW25dIC0geHNbbiAtIDFdKSk7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcy5zb2x2ZShBLCBrcyk7XHJcbiAgICB9LFxyXG5cclxuICAgIHNvbHZlOiBmdW5jdGlvbihBLCBrcykge1xyXG4gICAgICB2YXIgbSA9IEEubGVuZ3RoO1xyXG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IG07IGsrKykgLy8gY29sdW1uXHJcbiAgICAgIHtcclxuICAgICAgICAvLyBwaXZvdCBmb3IgY29sdW1uXHJcbiAgICAgICAgdmFyIGlfbWF4ID0gMDtcclxuICAgICAgICB2YXIgdmFsaSA9IE51bWJlci5ORUdBVElWRV9JTkZJTklUWTtcclxuICAgICAgICBmb3IgKHZhciBpID0gazsgaSA8IG07IGkrKylcclxuICAgICAgICAgIGlmIChBW2ldW2tdID4gdmFsaSkge1xyXG4gICAgICAgICAgICBpX21heCA9IGk7XHJcbiAgICAgICAgICAgIHZhbGkgPSBBW2ldW2tdO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc3BsaW5lU3dhcFJvd3MoQSwgaywgaV9tYXgpO1xyXG5cclxuICAgICAgICAvLyBmb3IgYWxsIHJvd3MgYmVsb3cgcGl2b3RcclxuICAgICAgICBmb3IgKHZhciBpID0gayArIDE7IGkgPCBtOyBpKyspIHtcclxuICAgICAgICAgIGZvciAodmFyIGogPSBrICsgMTsgaiA8IG0gKyAxOyBqKyspXHJcbiAgICAgICAgICAgIEFbaV1bal0gPSBBW2ldW2pdIC0gQVtrXVtqXSAqIChBW2ldW2tdIC8gQVtrXVtrXSk7XHJcbiAgICAgICAgICBBW2ldW2tdID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgZm9yICh2YXIgaSA9IG0gLSAxOyBpID49IDA7IGktLSkgLy8gcm93cyA9IGNvbHVtbnNcclxuICAgICAge1xyXG4gICAgICAgIHZhciB2ID0gQVtpXVttXSAvIEFbaV1baV07XHJcbiAgICAgICAga3NbaV0gPSB2O1xyXG4gICAgICAgIGZvciAodmFyIGogPSBpIC0gMTsgaiA+PSAwOyBqLS0pIC8vIHJvd3NcclxuICAgICAgICB7XHJcbiAgICAgICAgICBBW2pdW21dIC09IEFbal1baV0gKiB2O1xyXG4gICAgICAgICAgQVtqXVtpXSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBrcztcclxuICAgIH0sXHJcblxyXG4gICAgemVyb3NNYXQ6IGZ1bmN0aW9uKHIsIGMpIHtcclxuICAgICAgdmFyIEEgPSBbXTtcclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByOyBpKyspIHtcclxuICAgICAgICBBLnB1c2goW10pO1xyXG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgYzsgaisrKSBBW2ldLnB1c2goMCk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIEE7XHJcbiAgICB9LFxyXG5cclxuICAgIHNwbGluZVN3YXBSb3dzOiBmdW5jdGlvbihtLCBrLCBsKSB7XHJcbiAgICAgIHZhciBwID0gbVtrXTtcclxuICAgICAgbVtrXSA9IG1bbF07XHJcbiAgICAgIG1bbF0gPSBwO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICB3aW5kb3cuZWFzZSA9IGVhc2U7XHJcblxyXG59KSgpO1xyXG5cclxuXHJcbi8qIGZpbGU6IHNyYy9QbGF5Z3JvdW5kLmpzICovXHJcblxyXG5QTEFZR1JPVU5EID0ge307XHJcblxyXG5mdW5jdGlvbiBwbGF5Z3JvdW5kKGFyZ3MpIHtcclxuXHJcbiAgcmV0dXJuIG5ldyBQTEFZR1JPVU5ELkFwcGxpY2F0aW9uKGFyZ3MpO1xyXG5cclxufTtcclxuXHJcbi8qIGZpbGU6IHNyYy9VdGlscy5qcyAqL1xyXG5cclxuUExBWUdST1VORC5VdGlscyA9IHtcclxuXHJcbiAgZXh0ZW5kOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBmb3IgKHZhciBqIGluIGFyZ3VtZW50c1tpXSkge1xyXG4gICAgICAgIGFyZ3VtZW50c1swXVtqXSA9IGFyZ3VtZW50c1tpXVtqXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBhcmd1bWVudHNbMF07XHJcblxyXG4gIH0sXHJcblxyXG4gIG1lcmdlOiBmdW5jdGlvbihhKSB7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgIHZhciBiID0gYXJndW1lbnRzW2ldO1xyXG5cclxuICAgICAgZm9yICh2YXIga2V5IGluIGIpIHtcclxuXHJcbiAgICAgICAgdmFyIHZhbHVlID0gYltrZXldO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIGFba2V5XSAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiBhW2tleV0gPT09IFwib2JqZWN0XCIpIHRoaXMubWVyZ2UoYVtrZXldLCB2YWx1ZSk7XHJcbiAgICAgICAgICBlbHNlIGFba2V5XSA9IHZhbHVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBhW2tleV0gPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBhO1xyXG5cclxuICB9LFxyXG5cclxuICBpbnZva2U6IGZ1bmN0aW9uKG9iamVjdCwgbWV0aG9kTmFtZSkge1xyXG5cclxuICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iamVjdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICB2YXIgY3VycmVudCA9IG9iamVjdFtpXTtcclxuXHJcbiAgICAgIGlmIChjdXJyZW50W21ldGhvZE5hbWVdKSBjdXJyZW50W21ldGhvZE5hbWVdLmFwcGx5KGN1cnJlbnQsIGFyZ3MpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgfSxcclxuXHJcbiAgdGhyb3R0bGU6IGZ1bmN0aW9uKGZuLCB0aHJlc2hvbGQpIHtcclxuICAgIHRocmVzaG9sZCB8fCAodGhyZXNob2xkID0gMjUwKTtcclxuICAgIHZhciBsYXN0LFxyXG4gICAgICBkZWZlclRpbWVyO1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgY29udGV4dCA9IHRoaXM7XHJcblxyXG4gICAgICB2YXIgbm93ID0gK25ldyBEYXRlLFxyXG4gICAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XHJcbiAgICAgIGlmIChsYXN0ICYmIG5vdyA8IGxhc3QgKyB0aHJlc2hvbGQpIHtcclxuICAgICAgICAvLyBob2xkIG9uIHRvIGl0XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KGRlZmVyVGltZXIpO1xyXG4gICAgICAgIGRlZmVyVGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgbGFzdCA9IG5vdztcclxuICAgICAgICAgIGZuLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xyXG4gICAgICAgIH0sIHRocmVzaG9sZCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGFzdCA9IG5vdztcclxuICAgICAgICBmbi5hcHBseShjb250ZXh0LCBhcmdzKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9XHJcblxyXG59O1xyXG5cclxuUExBWUdST1VORC5VdGlscy5lYXNlID0gZWFzZTtcclxuXHJcblxyXG4vKiBmaWxlOiBzcmMvRXZlbnRzLmpzICovXHJcblxyXG5QTEFZR1JPVU5ELkV2ZW50cyA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICB0aGlzLmxpc3RlbmVycyA9IHt9O1xyXG5cclxufTtcclxuXHJcblBMQVlHUk9VTkQuRXZlbnRzLnByb3RvdHlwZSA9IHtcclxuXHJcbiAgb246IGZ1bmN0aW9uKGV2ZW50LCBjYWxsYmFjaywgY29udGV4dCkge1xyXG5cclxuICAgIGlmICh0eXBlb2YgZXZlbnQgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgICBmb3IgKHZhciBrZXkgaW4gZXZlbnQpIHtcclxuICAgICAgICByZXN1bHRba2V5XSA9IHRoaXMub24oa2V5LCBldmVudFtrZXldLCBjb250ZXh0KVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLmxpc3RlbmVyc1tldmVudF0pIHRoaXMubGlzdGVuZXJzW2V2ZW50XSA9IFtdO1xyXG5cclxuICAgIHZhciBsaXN0ZW5lciA9IHtcclxuICAgICAgb25jZTogZmFsc2UsXHJcbiAgICAgIGNhbGxiYWNrOiBjYWxsYmFjayxcclxuICAgICAgY29udGV4dDogY29udGV4dFxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmxpc3RlbmVyc1tldmVudF0ucHVzaChsaXN0ZW5lcik7XHJcblxyXG4gICAgcmV0dXJuIGxpc3RlbmVyO1xyXG4gIH0sXHJcblxyXG4gIG9uY2U6IGZ1bmN0aW9uKGV2ZW50LCBjYWxsYmFjaywgY29udGV4dCkge1xyXG5cclxuICAgIGlmICh0eXBlb2YgZXZlbnQgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgICBmb3IgKHZhciBrZXkgaW4gZXZlbnQpIHtcclxuICAgICAgICByZXN1bHRba2V5XSA9IHRoaXMub25jZShrZXksIGV2ZW50W2tleV0sIGNvbnRleHQpXHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMubGlzdGVuZXJzW2V2ZW50XSkgdGhpcy5saXN0ZW5lcnNbZXZlbnRdID0gW107XHJcblxyXG4gICAgdmFyIGxpc3RlbmVyID0ge1xyXG4gICAgICBvbmNlOiB0cnVlLFxyXG4gICAgICBjYWxsYmFjazogY2FsbGJhY2ssXHJcbiAgICAgIGNvbnRleHQ6IGNvbnRleHRcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5saXN0ZW5lcnNbZXZlbnRdLnB1c2gobGlzdGVuZXIpO1xyXG5cclxuICAgIHJldHVybiBsaXN0ZW5lcjtcclxuICB9LFxyXG5cclxuICBvZmY6IGZ1bmN0aW9uKGV2ZW50LCBjYWxsYmFjaykge1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSB0aGlzLmxpc3RlbmVyc1tldmVudF0ubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgaWYgKHRoaXMubGlzdGVuZXJzW2V2ZW50XVtpXS5fcmVtb3ZlKSB7XHJcbiAgICAgICAgdGhpcy5saXN0ZW5lcnNbZXZlbnRdLnNwbGljZShpLS0sIDEpO1xyXG4gICAgICAgIGxlbi0tO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gIH0sXHJcblxyXG4gIHRyaWdnZXI6IGZ1bmN0aW9uKGV2ZW50LCBkYXRhKSB7XHJcblxyXG4gICAgLyogaWYgeW91IHByZWZlciBldmVudHMgcGlwZSAqL1xyXG5cclxuICAgIGlmICh0aGlzLmxpc3RlbmVyc1tcImV2ZW50XCJdKSB7XHJcblxyXG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gdGhpcy5saXN0ZW5lcnNbXCJldmVudFwiXS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG5cclxuICAgICAgICB2YXIgbGlzdGVuZXIgPSB0aGlzLmxpc3RlbmVyc1tcImV2ZW50XCJdW2ldO1xyXG5cclxuICAgICAgICBsaXN0ZW5lci5jYWxsYmFjay5jYWxsKGxpc3RlbmVyLmNvbnRleHQgfHwgdGhpcywgZXZlbnQsIGRhdGEpO1xyXG5cclxuICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKiBvciBzdWJzY3JpYmVkIHRvIHNpbmdsZSBldmVudCAqL1xyXG5cclxuICAgIGlmICh0aGlzLmxpc3RlbmVyc1tldmVudF0pIHtcclxuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHRoaXMubGlzdGVuZXJzW2V2ZW50XS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG5cclxuICAgICAgICB2YXIgbGlzdGVuZXIgPSB0aGlzLmxpc3RlbmVyc1tldmVudF1baV07XHJcblxyXG4gICAgICAgIGxpc3RlbmVyLmNhbGxiYWNrLmNhbGwobGlzdGVuZXIuY29udGV4dCB8fCB0aGlzLCBkYXRhKTtcclxuXHJcbiAgICAgICAgaWYgKGxpc3RlbmVyLm9uY2UpIHtcclxuICAgICAgICAgIHRoaXMubGlzdGVuZXJzW2V2ZW50XS5zcGxpY2UoaS0tLCAxKTtcclxuICAgICAgICAgIGxlbi0tO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG59O1xyXG5cclxuLyogZmlsZTogc3JjL1N0YXRlcy5qcyAqL1xyXG5cclxuUExBWUdST1VORC5TdGF0ZXMgPSBmdW5jdGlvbihhcHApIHtcclxuXHJcbiAgdGhpcy5hcHAgPSBhcHA7XHJcblxyXG4gIFBMQVlHUk9VTkQuRXZlbnRzLmNhbGwodGhpcyk7XHJcblxyXG4gIGFwcC5vbihcInN0ZXBcIiwgdGhpcy5zdGVwLmJpbmQodGhpcykpO1xyXG5cclxufTtcclxuXHJcblBMQVlHUk9VTkQuU3RhdGVzLnByb3RvdHlwZSA9IHtcclxuXHJcbiAgc3RlcDogZnVuY3Rpb24oZGVsdGEpIHtcclxuXHJcbiAgICBpZiAoIXRoaXMubmV4dCkgcmV0dXJuO1xyXG5cclxuICAgIGlmICh0aGlzLmN1cnJlbnQgJiYgdGhpcy5jdXJyZW50LmxvY2tlZCkgcmV0dXJuO1xyXG5cclxuICAgIHZhciBzdGF0ZSA9IHRoaXMubmV4dDtcclxuXHJcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIpIHN0YXRlID0gbmV3IHN0YXRlO1xyXG5cclxuICAgIC8qIGNyZWF0ZSBzdGF0ZSBpZiBvYmplY3QgaGFzIG5ldmVyIGJlZW4gdXNlZCBhcyBhIHN0YXRlIGJlZm9yZSAqL1xyXG5cclxuICAgIGlmICghc3RhdGUuX19jcmVhdGVkKSB7XHJcblxyXG4gICAgICBzdGF0ZS5fX2NyZWF0ZWQgPSB0cnVlO1xyXG5cclxuICAgICAgc3RhdGUuYXBwID0gdGhpcy5hcHA7XHJcblxyXG4gICAgICB0aGlzLnRyaWdnZXIoXCJjcmVhdGVzdGF0ZVwiLCB7XHJcbiAgICAgICAgc3RhdGU6IHN0YXRlXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYgKHN0YXRlLmNyZWF0ZSkgc3RhdGUuY3JlYXRlKCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qIGVudGVyIG5ldyBzdGF0ZSAqL1xyXG5cclxuICAgIGlmICh0aGlzLmN1cnJlbnQpIHtcclxuICAgICAgdGhpcy50cmlnZ2VyKFwibGVhdmVzdGF0ZVwiLCB7XHJcbiAgICAgICAgcHJldjogdGhpcy5jdXJyZW50LFxyXG4gICAgICAgIG5leHQ6IHN0YXRlLFxyXG4gICAgICAgIHN0YXRlOiB0aGlzLmN1cnJlbnRcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy50cmlnZ2VyKFwiZW50ZXJzdGF0ZVwiLCB7XHJcbiAgICAgIHByZXY6IHRoaXMuY3VycmVudCxcclxuICAgICAgbmV4dDogc3RhdGUsXHJcbiAgICAgIHN0YXRlOiBzdGF0ZVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5jdXJyZW50ID0gc3RhdGU7XHJcblxyXG4gICAgaWYgKHRoaXMuY3VycmVudCAmJiB0aGlzLmN1cnJlbnQuZW50ZXIpIHtcclxuICAgICAgdGhpcy5jdXJyZW50LmVudGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5hcHAuc3RhdGUgPSB0aGlzLmN1cnJlbnQ7XHJcblxyXG4gICAgdGhpcy5uZXh0ID0gZmFsc2U7XHJcblxyXG5cclxuICB9LFxyXG5cclxuICBzZXQ6IGZ1bmN0aW9uKHN0YXRlKSB7XHJcblxyXG4gICAgaWYgKHRoaXMuY3VycmVudCAmJiB0aGlzLmN1cnJlbnQubGVhdmUpIHRoaXMuY3VycmVudC5sZWF2ZSgpO1xyXG5cclxuICAgIHRoaXMubmV4dCA9IHN0YXRlO1xyXG5cclxuICAgIHRoaXMuc3RlcCgwKTtcclxuXHJcbiAgfVxyXG5cclxuXHJcbn07XHJcblxyXG5QTEFZR1JPVU5ELlV0aWxzLmV4dGVuZChQTEFZR1JPVU5ELlN0YXRlcy5wcm90b3R5cGUsIFBMQVlHUk9VTkQuRXZlbnRzLnByb3RvdHlwZSk7XHJcblxyXG4vKiBmaWxlOiBzcmMvQXBwbGljYXRpb24uanMgKi9cclxuXHJcblBMQVlHUk9VTkQuQXBwbGljYXRpb24gPSBmdW5jdGlvbihhcmdzKSB7XHJcblxyXG4gIHZhciBhcHAgPSB0aGlzO1xyXG5cclxuICAvKiBldmVudHMgKi9cclxuXHJcbiAgUExBWUdST1VORC5FdmVudHMuY2FsbCh0aGlzKTtcclxuXHJcbiAgLyogZGVmYXVsdHMgKi9cclxuXHJcbiAgUExBWUdST1VORC5VdGlscy5tZXJnZSh0aGlzLCB0aGlzLmRlZmF1bHRzLCBhcmdzKTtcclxuXHJcbiAgLyogZ3Vlc3Mgc2NhbGluZyBtb2RlICovXHJcblxyXG4gIHRoaXMuYXV0b1dpZHRoID0gdGhpcy53aWR0aCA/IGZhbHNlIDogdHJ1ZTtcclxuICB0aGlzLmF1dG9IZWlnaHQgPSB0aGlzLmhlaWdodCA/IGZhbHNlIDogdHJ1ZTtcclxuICB0aGlzLmF1dG9TY2FsZSA9IHRoaXMuc2NhbGUgPyBmYWxzZSA6IHRydWU7XHJcblxyXG4gIC8qIGdldCBjb250YWluZXIgKi9cclxuXHJcbiAgaWYgKCF0aGlzLmNvbnRhaW5lcikgdGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5ib2R5O1xyXG5cclxuICBpZiAodGhpcy5jb250YWluZXIgIT09IGRvY3VtZW50LmJvZHkpIHRoaXMuY3VzdG9tQ29udGFpbmVyID0gdHJ1ZTtcclxuXHJcbiAgaWYgKHR5cGVvZiB0aGlzLmNvbnRhaW5lciA9PT0gXCJzdHJpbmdcIikgdGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuY29udGFpbmVyKTtcclxuXHJcbiAgdGhpcy51cGRhdGVTaXplKCk7XHJcblxyXG4gIC8qIGV2ZW50cyAqL1xyXG5cclxuICAvLyB0aGlzLmVtaXRMb2NhbEV2ZW50ID0gdGhpcy5lbWl0TG9jYWxFdmVudC5iaW5kKHRoaXMpO1xyXG4gIC8vIHRoaXMuZW1pdEdsb2JhbEV2ZW50ID0gdGhpcy5lbWl0R2xvYmFsRXZlbnQuYmluZCh0aGlzKTtcclxuXHJcbiAgLyogc3RhdGVzIG1hbmFnZXIgKi9cclxuXHJcbiAgdGhpcy5zdGF0ZXMgPSBuZXcgUExBWUdST1VORC5TdGF0ZXModGhpcyk7XHJcbiAgdGhpcy5zdGF0ZXMub24oXCJldmVudFwiLCB0aGlzLmVtaXRMb2NhbEV2ZW50LCB0aGlzKTtcclxuXHJcbiAgLyogbW91c2UgKi9cclxuXHJcbiAgdGhpcy5tb3VzZSA9IG5ldyBQTEFZR1JPVU5ELk1vdXNlKHRoaXMsIHRoaXMuY29udGFpbmVyKTtcclxuICB0aGlzLm1vdXNlLm9uKFwiZXZlbnRcIiwgdGhpcy5lbWl0R2xvYmFsRXZlbnQsIHRoaXMpO1xyXG5cclxuICAvKiB0b3VjaCAqL1xyXG5cclxuICB0aGlzLnRvdWNoID0gbmV3IFBMQVlHUk9VTkQuVG91Y2godGhpcywgdGhpcy5jb250YWluZXIpO1xyXG4gIHRoaXMudG91Y2gub24oXCJldmVudFwiLCB0aGlzLmVtaXRHbG9iYWxFdmVudCwgdGhpcyk7XHJcblxyXG4gIC8qIGtleWJvYXJkICovXHJcblxyXG4gIHRoaXMua2V5Ym9hcmQgPSBuZXcgUExBWUdST1VORC5LZXlib2FyZCgpO1xyXG4gIHRoaXMua2V5Ym9hcmQub24oXCJldmVudFwiLCB0aGlzLmVtaXRHbG9iYWxFdmVudCwgdGhpcyk7XHJcblxyXG4gIC8qIGdhbWVwYWRzICovXHJcblxyXG4gIHRoaXMuZ2FtZXBhZHMgPSBuZXcgUExBWUdST1VORC5HYW1lcGFkcyh0aGlzKTtcclxuICB0aGlzLmdhbWVwYWRzLm9uKFwiZXZlbnRcIiwgdGhpcy5lbWl0R2xvYmFsRXZlbnQsIHRoaXMpO1xyXG5cclxuICAvKiB0d2VlbnMgKi9cclxuXHJcbiAgdGhpcy50d2VlbnMgPSBuZXcgUExBWUdST1VORC5Ud2Vlbk1hbmFnZXIodGhpcyk7XHJcblxyXG4gIC8qIGVhc2UgKi9cclxuXHJcbiAgdGhpcy5lYXNlID0gUExBWUdST1VORC5VdGlscy5lYXNlO1xyXG5cclxuICAvKiBzb3VuZCAqL1xyXG5cclxuICBQTEFZR1JPVU5ELlNvdW5kKHRoaXMpO1xyXG5cclxuICAvKiB3aW5kb3cgcmVzaXplICovXHJcblxyXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHRoaXMuaGFuZGxlUmVzaXplLmJpbmQodGhpcykpO1xyXG5cclxuICAvKiB2aXNpbGliaXR5Y2hhbmdlICovXHJcblxyXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ2aXNpYmlsaXR5Y2hhbmdlXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGhpZGRlbiA9IGRvY3VtZW50LnZpc2liaWxpdHlTdGF0ZSA9PSAnaGlkZGVuJztcclxuICAgIGFwcC5lbWl0R2xvYmFsRXZlbnQoXCJ2aXNpYmlsaXR5Y2hhbmdlXCIsIGhpZGRlbik7XHJcbiAgfSk7XHJcblxyXG4gIC8qIGFzc2V0cyBjb250YWluZXJzICovXHJcblxyXG4gIHRoaXMuaW1hZ2VzID0ge307XHJcbiAgdGhpcy5hdGxhc2VzID0ge307XHJcbiAgdGhpcy5kYXRhID0ge307XHJcblxyXG4gIHRoaXMubG9hZGVyID0gbmV3IFBMQVlHUk9VTkQuTG9hZGVyKHRoaXMpO1xyXG5cclxuICB0aGlzLmxvYWRGb28oMC4yNSk7XHJcblxyXG4gIC8qIGNyZWF0ZSBwbHVnaW5zIGluIHRoZSBzYW1lIHdheSAqL1xyXG5cclxuICB0aGlzLnBsdWdpbnMgPSBbXTtcclxuXHJcbiAgZm9yICh2YXIga2V5IGluIFBMQVlHUk9VTkQpIHtcclxuXHJcbiAgICB2YXIgcHJvcGVydHkgPSBQTEFZR1JPVU5EW2tleV07XHJcblxyXG4gICAgaWYgKHByb3BlcnR5LnBsdWdpbikgdGhpcy5wbHVnaW5zLnB1c2gobmV3IHByb3BlcnR5KHRoaXMpKTtcclxuXHJcbiAgfVxyXG5cclxuICAvKiBmbG93ICovXHJcblxyXG4gIHRoaXMuZW1pdEdsb2JhbEV2ZW50KFwicHJlbG9hZFwiKTtcclxuXHJcbiAgdGhpcy5maXJzdEJhdGNoID0gdHJ1ZTtcclxuXHJcbiAgZnVuY3Rpb24gb25QcmVsb2FkRW5kKCkge1xyXG5cclxuICAgIGFwcC5sb2FkRm9vKDAuMjUpO1xyXG5cclxuICAgIC8qIHJ1biBldmVyeXRoaW5nIGluIHRoZSBuZXh0IGZyYW1lICovXHJcblxyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgIGFwcC5lbWl0TG9jYWxFdmVudChcImNyZWF0ZVwiKTtcclxuXHJcbiAgICAgIGFwcC5zZXRTdGF0ZShQTEFZR1JPVU5ELkRlZmF1bHRTdGF0ZSk7XHJcbiAgICAgIGFwcC5oYW5kbGVSZXNpemUoKTtcclxuICAgICAgYXBwLnNldFN0YXRlKFBMQVlHUk9VTkQuTG9hZGluZ1NjcmVlbik7XHJcblxyXG4gICAgICAvKiBnYW1lIGxvb3AgKi9cclxuXHJcbiAgICAgIFBMQVlHUk9VTkQuR2FtZUxvb3AoYXBwKTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICAvKiBzdGFnZSBwcm9wZXIgbG9hZGluZyBzdGVwICovXHJcblxyXG4gICAgYXBwLmxvYWRlci5vbmNlKFwicmVhZHlcIiwgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICBhcHAuZmlyc3RCYXRjaCA9IGZhbHNlO1xyXG5cclxuICAgICAgYXBwLnNldFN0YXRlKFBMQVlHUk9VTkQuRGVmYXVsdFN0YXRlKTtcclxuXHJcbiAgICAgIGFwcC5lbWl0TG9jYWxFdmVudChcInJlYWR5XCIpO1xyXG4gICAgICBhcHAuaGFuZGxlUmVzaXplKCk7XHJcblxyXG5cclxuICAgIH0pO1xyXG5cclxuXHJcbiAgfTtcclxuXHJcblxyXG4gIHRoaXMubG9hZGVyLm9uY2UoXCJyZWFkeVwiLCBvblByZWxvYWRFbmQpO1xyXG5cclxufTtcclxuXHJcblBMQVlHUk9VTkQuQXBwbGljYXRpb24ucHJvdG90eXBlID0ge1xyXG5cclxuICBkZWZhdWx0czoge1xyXG4gICAgc21vb3RoaW5nOiAxLFxyXG4gICAgcGF0aHM6IHtcclxuICAgICAgYmFzZTogXCJcIixcclxuICAgICAgaW1hZ2VzOiBcImltYWdlcy9cIlxyXG4gICAgfSxcclxuICAgIG9mZnNldFg6IDAsXHJcbiAgICBvZmZzZXRZOiAwXHJcbiAgfSxcclxuXHJcbiAgc2V0U3RhdGU6IGZ1bmN0aW9uKHN0YXRlKSB7XHJcblxyXG4gICAgdGhpcy5zdGF0ZXMuc2V0KHN0YXRlKTtcclxuXHJcbiAgfSxcclxuXHJcbiAgZ2V0UGF0aDogZnVuY3Rpb24odG8pIHtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5wYXRocy5iYXNlICsgKHRoaXMucGF0aHNbdG9dIHx8ICh0byArIFwiL1wiKSk7XHJcblxyXG4gIH0sXHJcblxyXG4gIGdldEFzc2V0RW50cnk6IGZ1bmN0aW9uKHBhdGgsIGZvbGRlciwgZGVmYXVsdEV4dGVuc2lvbikge1xyXG5cclxuICAgIC8qIHRyYW5zbGF0ZSBmb2xkZXIgYWNjb3JkaW5nIHRvIHVzZXIgcHJvdmlkZWQgcGF0aHNcclxuICAgICAgIG9yIGxlYXZlIGFzIGlzICovXHJcblxyXG4gICAgdmFyIGZvbGRlciA9IHRoaXMucGF0aHNbZm9sZGVyXSB8fCAoZm9sZGVyICsgXCIvXCIpO1xyXG5cclxuICAgIHZhciBmaWxlaW5mbyA9IHBhdGgubWF0Y2goLyguKilcXC4uKi8pO1xyXG4gICAgdmFyIGtleSA9IGZpbGVpbmZvID8gZmlsZWluZm9bMV0gOiBwYXRoO1xyXG5cclxuICAgIHZhciB0ZW1wID0gcGF0aC5zcGxpdChcIi5cIik7XHJcbiAgICB2YXIgYmFzZW5hbWUgPSBwYXRoO1xyXG5cclxuICAgIGlmICh0ZW1wLmxlbmd0aCA+IDEpIHtcclxuICAgICAgdmFyIGV4dCA9IHRlbXAucG9wKCk7XHJcbiAgICAgIHBhdGggPSB0ZW1wLmpvaW4oXCIuXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFyIGV4dCA9IGRlZmF1bHRFeHRlbnNpb247XHJcbiAgICAgIGJhc2VuYW1lICs9IFwiLlwiICsgZGVmYXVsdEV4dGVuc2lvbjtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBrZXk6IGtleSxcclxuICAgICAgdXJsOiB0aGlzLnBhdGhzLmJhc2UgKyBmb2xkZXIgKyBiYXNlbmFtZSxcclxuICAgICAgcGF0aDogdGhpcy5wYXRocy5iYXNlICsgZm9sZGVyICsgcGF0aCxcclxuICAgICAgZXh0OiBleHRcclxuICAgIH07XHJcblxyXG4gIH0sXHJcblxyXG4gIC8qIGV2ZW50cyB0aGF0IHNob3VsZG4ndCBmbG93IGRvd24gdG8gdGhlIHN0YXRlICovXHJcblxyXG4gIGVtaXRMb2NhbEV2ZW50OiBmdW5jdGlvbihldmVudCwgZGF0YSkge1xyXG5cclxuICAgIHRoaXMudHJpZ2dlcihldmVudCwgZGF0YSk7XHJcblxyXG4gICAgaWYgKCghdGhpcy5maXJzdEJhdGNoIHx8IHRoaXMubG9hZGVyLnJlYWR5KSAmJiB0aGlzW2V2ZW50XSkgdGhpc1tldmVudF0oZGF0YSk7XHJcblxyXG4gIH0sXHJcblxyXG4gIC8qIGV2ZW50cyB0aGF0IHNob3VsZCBiZSBwYXNzZWQgdG8gdGhlIHN0YXRlICovXHJcblxyXG4gIGVtaXRHbG9iYWxFdmVudDogZnVuY3Rpb24oZXZlbnQsIGRhdGEpIHtcclxuXHJcbiAgICBpZiAoIXRoaXMuc3RhdGUpIHJldHVybiB0aGlzLmVtaXRMb2NhbEV2ZW50KGV2ZW50LCBkYXRhKTtcclxuXHJcbiAgICB0aGlzLnRyaWdnZXIoZXZlbnQsIGRhdGEpO1xyXG5cclxuICAgIGlmICgoIXRoaXMuZmlyc3RCYXRjaCB8fCB0aGlzLmxvYWRlci5yZWFkeSkgJiYgdGhpcy5ldmVudCkgdGhpcy5ldmVudChldmVudCwgZGF0YSk7XHJcblxyXG4gICAgaWYgKCghdGhpcy5maXJzdEJhdGNoIHx8IHRoaXMubG9hZGVyLnJlYWR5KSAmJiB0aGlzW2V2ZW50XSkgdGhpc1tldmVudF0oZGF0YSk7XHJcblxyXG4gICAgaWYgKHRoaXMuc3RhdGUuZXZlbnQpIHRoaXMuc3RhdGUuZXZlbnQoZXZlbnQsIGRhdGEpO1xyXG5cclxuICAgIGlmICh0aGlzLnN0YXRlW2V2ZW50XSkgdGhpcy5zdGF0ZVtldmVudF0oZGF0YSk7XHJcblxyXG4gICAgdGhpcy50cmlnZ2VyKFwicG9zdFwiICsgZXZlbnQsIGRhdGEpO1xyXG5cclxuICAgIC8vIGlmICh0aGlzLnN0YXRlLnByb3h5KSB0aGlzLnN0YXRlLnByb3h5KGV2ZW50LCBkYXRhKTtcclxuXHJcbiAgfSxcclxuXHJcbiAgdXBkYXRlU2l6ZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgaWYgKHRoaXMuY3VzdG9tQ29udGFpbmVyKSB7XHJcblxyXG4gICAgICB2YXIgY29udGFpbmVyV2lkdGggPSB0aGlzLmNvbnRhaW5lci5vZmZzZXRXaWR0aDtcclxuICAgICAgdmFyIGNvbnRhaW5lckhlaWdodCA9IHRoaXMuY29udGFpbmVyLm9mZnNldEhlaWdodDtcclxuXHJcbiAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgdmFyIGNvbnRhaW5lcldpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICAgIHZhciBjb250YWluZXJIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5hdXRvU2NhbGUgJiYgIXRoaXMuYXV0b1dpZHRoICYmICF0aGlzLmF1dG9IZWlnaHQpIHtcclxuXHJcbiAgICB9IGVsc2UgaWYgKCF0aGlzLmF1dG9IZWlnaHQgJiYgdGhpcy5hdXRvV2lkdGgpIHtcclxuXHJcbiAgICAgIGlmICh0aGlzLmF1dG9TY2FsZSkgdGhpcy5zY2FsZSA9IGNvbnRhaW5lckhlaWdodCAvIHRoaXMuaGVpZ2h0O1xyXG5cclxuICAgICAgdGhpcy53aWR0aCA9IE1hdGguY2VpbChjb250YWluZXJXaWR0aCAvIHRoaXMuc2NhbGUpO1xyXG5cclxuICAgIH0gZWxzZSBpZiAoIXRoaXMuYXV0b1dpZHRoICYmIHRoaXMuYXV0b0hlaWdodCkge1xyXG5cclxuICAgICAgaWYgKHRoaXMuYXV0b1NjYWxlKSB0aGlzLnNjYWxlID0gY29udGFpbmVyV2lkdGggLyB0aGlzLndpZHRoO1xyXG5cclxuICAgICAgdGhpcy5oZWlnaHQgPSBNYXRoLmNlaWwoY29udGFpbmVySGVpZ2h0IC8gdGhpcy5zY2FsZSk7XHJcblxyXG5cclxuICAgIH0gZWxzZSBpZiAodGhpcy5hdXRvV2lkdGggJiYgdGhpcy5hdXRvSGVpZ2h0ICYmIHRoaXMuYXV0b1NjYWxlKSB7XHJcblxyXG4gICAgICB0aGlzLnNjYWxlID0gMTtcclxuICAgICAgdGhpcy53aWR0aCA9IGNvbnRhaW5lcldpZHRoO1xyXG4gICAgICB0aGlzLmhlaWdodCA9IGNvbnRhaW5lckhlaWdodDtcclxuXHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuYXV0b1dpZHRoICYmIHRoaXMuYXV0b0hlaWdodCkge1xyXG5cclxuICAgICAgdGhpcy53aWR0aCA9IE1hdGguY2VpbChjb250YWluZXJXaWR0aCAvIHRoaXMuc2NhbGUpO1xyXG4gICAgICB0aGlzLmhlaWdodCA9IE1hdGguY2VpbChjb250YWluZXJIZWlnaHQgLyB0aGlzLnNjYWxlKTtcclxuXHJcbiAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgdGhpcy5zY2FsZSA9IE1hdGgubWluKGNvbnRhaW5lcldpZHRoIC8gdGhpcy53aWR0aCwgY29udGFpbmVySGVpZ2h0IC8gdGhpcy5oZWlnaHQpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm9mZnNldFggPSAoY29udGFpbmVyV2lkdGggLSB0aGlzLndpZHRoICogdGhpcy5zY2FsZSkgLyAyIHwgMDtcclxuICAgIHRoaXMub2Zmc2V0WSA9IChjb250YWluZXJIZWlnaHQgLSB0aGlzLmhlaWdodCAqIHRoaXMuc2NhbGUpIC8gMiB8IDA7XHJcblxyXG4gICAgdGhpcy5jZW50ZXIgPSB7XHJcbiAgICAgIHg6IHRoaXMud2lkdGggLyAyIHwgMCxcclxuICAgICAgeTogdGhpcy5oZWlnaHQgLyAyIHwgMFxyXG4gICAgfTtcclxuXHJcbiAgfSxcclxuXHJcbiAgaGFuZGxlUmVzaXplOiBQTEFZR1JPVU5ELlV0aWxzLnRocm90dGxlKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHRoaXMudXBkYXRlU2l6ZSgpO1xyXG5cclxuICAgIHRoaXMubW91c2UuaGFuZGxlUmVzaXplKCk7XHJcbiAgICB0aGlzLnRvdWNoLmhhbmRsZVJlc2l6ZSgpO1xyXG5cclxuICAgIHRoaXMuZW1pdEdsb2JhbEV2ZW50KFwicmVzaXplXCIsIHt9KTtcclxuXHJcbiAgfSwgMTYpLFxyXG5cclxuICAvKlxyXG4gICAgcmVxdWVzdCBhIGZpbGUgb3ZlciBodHRwXHJcbiAgICBpdCBzaGFsbCBiZSBsYXRlciBhbiBhYnN0cmFjdGlvbiB1c2luZyAnZnMnIGluIG5vZGUtd2Via2l0XHJcblxyXG4gICAgcmV0dXJucyBhIHByb21pc2VcclxuICAqL1xyXG5cclxuICByZXF1ZXN0OiBmdW5jdGlvbih1cmwpIHtcclxuXHJcbiAgICBmdW5jdGlvbiBwcm9taXNlKHN1Y2Nlc3MsIGZhaWwpIHtcclxuXHJcbiAgICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcblxyXG4gICAgICB2YXIgYXBwID0gdGhpcztcclxuXHJcbiAgICAgIHJlcXVlc3Qub3BlbihcIkdFVFwiLCB1cmwsIHRydWUpO1xyXG5cclxuICAgICAgcmVxdWVzdC5vbmxvYWQgPSBmdW5jdGlvbihldmVudCkge1xyXG5cclxuICAgICAgICB2YXIgeGhyID0gZXZlbnQudGFyZ2V0O1xyXG5cclxuICAgICAgICBpZiAoeGhyLnN0YXR1cyAhPT0gMjAwICYmIHhoci5zdGF0dXMgIT09IDApIHtcclxuXHJcbiAgICAgICAgICByZXR1cm4gZmFpbChuZXcgRXJyb3IoXCJGYWlsZWQgdG8gZ2V0IFwiICsgdXJsKSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3VjY2Vzcyh4aHIpO1xyXG5cclxuICAgICAgfVxyXG5cclxuICAgICAgcmVxdWVzdC5zZW5kKCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShwcm9taXNlKTtcclxuXHJcbiAgfSxcclxuXHJcbiAgLyogaW1hZ2luYXJ5IHRpbWVvdXQgdG8gZGVsYXkgbG9hZGluZyAqL1xyXG5cclxuICBsb2FkRm9vOiBmdW5jdGlvbih0aW1lb3V0KSB7XHJcblxyXG4gICAgdmFyIGxvYWRlciA9IHRoaXMubG9hZGVyO1xyXG5cclxuICAgIHRoaXMubG9hZGVyLmFkZChcImZvbyBcIiArIHRpbWVvdXQpO1xyXG5cclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgIGxvYWRlci5zdWNjZXNzKFwiZm9vIFwiICsgdGltZW91dCk7XHJcbiAgICB9LCB0aW1lb3V0ICogMTAwMCk7XHJcblxyXG4gIH0sXHJcblxyXG4gIC8qIGRhdGEvanNvbiAqL1xyXG5cclxuICBsb2FkRGF0YTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgIHZhciBhcmcgPSBhcmd1bWVudHNbaV07XHJcblxyXG4gICAgICBpZiAodHlwZW9mIGFyZyA9PT0gXCJvYmplY3RcIikge1xyXG5cclxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gYXJnKSB0aGlzLmxvYWREYXRhKGFyZ1trZXldKTtcclxuXHJcbiAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgIHRoaXMubG9hZERhdGFJdGVtKGFyZyk7XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICB9LFxyXG5cclxuICBsb2FkRGF0YUl0ZW06IGZ1bmN0aW9uKG5hbWUpIHtcclxuXHJcbiAgICB2YXIgZW50cnkgPSB0aGlzLmdldEFzc2V0RW50cnkobmFtZSwgXCJkYXRhXCIsIFwianNvblwiKTtcclxuXHJcbiAgICB2YXIgYXBwID0gdGhpcztcclxuXHJcbiAgICB0aGlzLmxvYWRlci5hZGQoKTtcclxuXHJcbiAgICB0aGlzLnJlcXVlc3QoZW50cnkudXJsKS50aGVuKHByb2Nlc3NEYXRhKTtcclxuXHJcbiAgICBmdW5jdGlvbiBwcm9jZXNzRGF0YShyZXF1ZXN0KSB7XHJcblxyXG4gICAgICBpZiAoZW50cnkuZXh0ID09PSBcImpzb25cIikge1xyXG4gICAgICAgIGFwcC5kYXRhW2VudHJ5LmtleV0gPSBKU09OLnBhcnNlKHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBhcHAuZGF0YVtlbnRyeS5rZXldID0gcmVxdWVzdC5yZXNwb25zZVRleHQ7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGFwcC5sb2FkZXIuc3VjY2VzcyhlbnRyeS51cmwpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgfSxcclxuXHJcbiAgLyogaW1hZ2VzICovXHJcblxyXG4gIGxvYWRJbWFnZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMubG9hZEltYWdlcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cclxuICB9LFxyXG5cclxuICBsb2FkSW1hZ2VzOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB2YXIgcHJvbWlzZXMgPSBbXTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgdmFyIGFyZyA9IGFyZ3VtZW50c1tpXTtcclxuXHJcbiAgICAgIC8qIHBvbHltb3JwaGlzbSBhdCBpdHMgZmluZXN0ICovXHJcblxyXG4gICAgICBpZiAodHlwZW9mIGFyZyA9PT0gXCJvYmplY3RcIikge1xyXG5cclxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gYXJnKSBwcm9taXNlcyA9IHByb21pc2VzLmNvbmNhdCh0aGlzLmxvYWRJbWFnZXMoYXJnW2tleV0pKTtcclxuXHJcbiAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgIHByb21pc2VzLnB1c2godGhpcy5sb2FkT25lSW1hZ2UoYXJnKSk7XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XHJcblxyXG4gIH0sXHJcblxyXG4gIGxvYWRPbmVJbWFnZTogZnVuY3Rpb24obmFtZSkge1xyXG5cclxuICAgIHZhciBhcHAgPSB0aGlzO1xyXG5cclxuICAgIGlmICghdGhpcy5faW1hZ2VMb2FkZXJzKSB0aGlzLl9pbWFnZUxvYWRlcnMgPSB7fTtcclxuXHJcbiAgICBpZiAoIXRoaXMuX2ltYWdlTG9hZGVyc1tuYW1lXSkge1xyXG5cclxuICAgICAgdmFyIHByb21pc2UgPSBmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcbiAgICAgICAgLyogaWYgYXJndW1lbnQgaXMgbm90IGFuIG9iamVjdC9hcnJheSBsZXQncyB0cnkgdG8gbG9hZCBpdCAqL1xyXG5cclxuICAgICAgICB2YXIgbG9hZGVyID0gYXBwLmxvYWRlcjtcclxuXHJcbiAgICAgICAgdmFyIGVudHJ5ID0gYXBwLmdldEFzc2V0RW50cnkobmFtZSwgXCJpbWFnZXNcIiwgXCJwbmdcIik7XHJcblxyXG4gICAgICAgIGFwcC5sb2FkZXIuYWRkKGVudHJ5LnBhdGgpO1xyXG5cclxuICAgICAgICB2YXIgaW1hZ2UgPSBhcHAuaW1hZ2VzW2VudHJ5LmtleV0gPSBuZXcgSW1hZ2U7XHJcblxyXG4gICAgICAgIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgIHJlc29sdmUoaW1hZ2UpO1xyXG4gICAgICAgICAgbG9hZGVyLnN1Y2Nlc3MoZW50cnkudXJsKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICByZWplY3QoXCJjYW4ndCBsb2FkIFwiICsgZW50cnkudXJsKTtcclxuICAgICAgICAgIGxvYWRlci5lcnJvcihlbnRyeS51cmwpO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaW1hZ2Uuc3JjID0gZW50cnkudXJsO1xyXG5cclxuICAgICAgfTtcclxuXHJcbiAgICAgIGFwcC5faW1hZ2VMb2FkZXJzW25hbWVdID0gbmV3IFByb21pc2UocHJvbWlzZSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLl9pbWFnZUxvYWRlcnNbbmFtZV07XHJcblxyXG4gIH0sXHJcblxyXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gIH1cclxuXHJcbn07XHJcblxyXG5QTEFZR1JPVU5ELlV0aWxzLmV4dGVuZChQTEFZR1JPVU5ELkFwcGxpY2F0aW9uLnByb3RvdHlwZSwgUExBWUdST1VORC5FdmVudHMucHJvdG90eXBlKTtcclxuXHJcblxyXG5cclxuLyogZmlsZTogc3JjL0dhbWVMb29wLmpzICovXHJcblxyXG5QTEFZR1JPVU5ELkdhbWVMb29wID0gZnVuY3Rpb24oYXBwKSB7XHJcblxyXG4gIGFwcC5saWZldGltZSA9IDA7XHJcbiAgYXBwLm9wcyA9IDA7XHJcbiAgYXBwLm9wY29zdCA9IDA7XHJcblxyXG4gIHZhciBsYXN0VGljayA9IERhdGUubm93KCk7XHJcbiAgdmFyIGZyYW1lID0gMDtcclxuICB2YXIgdW5ib3VuZGVkID0gZmFsc2U7XHJcblxyXG4gIGZ1bmN0aW9uIHJlbmRlcihkdCkge1xyXG5cclxuICAgIGFwcC5lbWl0R2xvYmFsRXZlbnQoXCJyZW5kZXJcIiwgZHQpXHJcbiAgICBhcHAuZW1pdEdsb2JhbEV2ZW50KFwicG9zdHJlbmRlclwiLCBkdClcclxuXHJcbiAgfTtcclxuXHJcbiAgZnVuY3Rpb24gc3RlcChkdCkge1xyXG5cclxuICAgIGFwcC5lbWl0R2xvYmFsRXZlbnQoXCJzdGVwXCIsIGR0KVxyXG5cclxuICB9O1xyXG5cclxuICBmdW5jdGlvbiBnYW1lTG9vcCgpIHtcclxuICAgIGlmIChyZXF1ZXN0SWQgPT0gMCkgeyAvLyBXaW5kb3cgaXMgYmx1cnJlZFxyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFhcHAudW5ib3VuZCkge1xyXG4gICAgICBpZiAoYXBwLmltbWlkaWF0ZSkge1xyXG4gICAgICAgIHNldFplcm9UaW1lb3V0KGdhbWVMb29wKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXF1ZXN0SWQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZ2FtZUxvb3ApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGRlbHRhID0gRGF0ZS5ub3coKSAtIGxhc3RUaWNrO1xyXG5cclxuICAgIGxhc3RUaWNrID0gRGF0ZS5ub3coKTtcclxuXHJcbiAgICBpZiAoYXBwLnVuYm91bmQpIHtcclxuICAgICAgZGVsdGEgPSAyMDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZGVsdGEgPiAxMDAwKSByZXR1cm47XHJcblxyXG4gICAgdmFyIGR0ID0gZGVsdGEgLyAxMDAwO1xyXG5cclxuICAgIGFwcC5saWZldGltZSArPSBkdDtcclxuICAgIGFwcC5lbGFwc2VkID0gZHQ7XHJcblxyXG4gICAgc3RlcChkdCk7XHJcblxyXG4gICAgcmVuZGVyKGR0KTtcclxuXHJcbiAgICBpZiAoYXBwLnVuYm91bmQgJiYgIXVuYm91bmRlZCkge1xyXG4gICAgICB1bmJvdW5kZWQgPSB0cnVlO1xyXG4gICAgICB3aGlsZSAoYXBwLnVuYm91bmQpIHtcclxuICAgICAgICBnYW1lTG9vcCgpO1xyXG4gICAgICB9XHJcbiAgICAgIHVuYm91bmRlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICB9O1xyXG5cclxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIGZ1bmN0aW9uKCkge1xyXG4gICAgaWYgKHJlcXVlc3RJZCAhPSAwKSB7XHJcbiAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHJlcXVlc3RJZCk7XHJcbiAgICAgIGFwcC5lbWl0R2xvYmFsRXZlbnQoXCJ2aXNpYmlsaXR5Y2hhbmdlXCIsIHRydWUpO1xyXG4gICAgICByZXF1ZXN0SWQgPSAwO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCBmdW5jdGlvbigpIHtcclxuICAgIGlmICghcmVxdWVzdElkKSB7XHJcbiAgICAgIHJlcXVlc3RJZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShnYW1lTG9vcCk7XHJcbiAgICAgIGFwcC5lbWl0R2xvYmFsRXZlbnQoXCJ2aXNpYmlsaXR5Y2hhbmdlXCIsIGZhbHNlKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgdmFyIHJlcXVlc3RJZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShnYW1lTG9vcCk7XHJcblxyXG59O1xyXG5cclxuLy8gQ29weXJpZ2h0IGRiYXJvbiwgdmlhIGh0dHA6Ly9kYmFyb24ub3JnL2xvZy8yMDEwMDMwOS1mYXN0ZXItdGltZW91dHNcclxuLy8gT25seSBhZGQgc2V0WmVyb1RpbWVvdXQgdG8gdGhlIHdpbmRvdyBvYmplY3QsIGFuZCBoaWRlIGV2ZXJ5dGhpbmdcclxuLy8gZWxzZSBpbiBhIGNsb3N1cmUuXHJcbihmdW5jdGlvbigpIHtcclxuICB2YXIgdGltZW91dHMgPSBbXTtcclxuICB2YXIgbWVzc2FnZU5hbWUgPSBcInplcm8tdGltZW91dC1tZXNzYWdlXCI7XHJcblxyXG4gIC8vIExpa2Ugc2V0VGltZW91dCwgYnV0IG9ubHkgdGFrZXMgYSBmdW5jdGlvbiBhcmd1bWVudC4gIFRoZXJlJ3NcclxuICAvLyBubyB0aW1lIGFyZ3VtZW50IChhbHdheXMgemVybykgYW5kIG5vIGFyZ3VtZW50cyAoeW91IGhhdmUgdG9cclxuICAvLyB1c2UgYSBjbG9zdXJlKS5cclxuICBmdW5jdGlvbiBzZXRaZXJvVGltZW91dChmbikge1xyXG4gICAgdGltZW91dHMucHVzaChmbik7XHJcbiAgICB3aW5kb3cucG9zdE1lc3NhZ2UobWVzc2FnZU5hbWUsIFwiKlwiKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGhhbmRsZU1lc3NhZ2UoZXZlbnQpIHtcclxuXHJcbiAgICBpZiAoZXZlbnQuc291cmNlID09IHdpbmRvdyAmJiBldmVudC5kYXRhID09IG1lc3NhZ2VOYW1lKSB7XHJcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICBpZiAodGltZW91dHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHZhciBmbiA9IHRpbWVvdXRzLnNoaWZ0KCk7XHJcbiAgICAgICAgZm4oKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCBoYW5kbGVNZXNzYWdlLCB0cnVlKTtcclxuXHJcbiAgLy8gQWRkIHRoZSBvbmUgdGhpbmcgd2Ugd2FudCBhZGRlZCB0byB0aGUgd2luZG93IG9iamVjdC5cclxuICB3aW5kb3cuc2V0WmVyb1RpbWVvdXQgPSBzZXRaZXJvVGltZW91dDtcclxufSkoKTtcclxuXHJcbi8qIGZpbGU6IHNyYy9HYW1lcGFkcy5qcyAqL1xyXG5cclxuUExBWUdST1VORC5HYW1lcGFkcyA9IGZ1bmN0aW9uKGFwcCkge1xyXG5cclxuICB0aGlzLmFwcCA9IGFwcDtcclxuXHJcbiAgUExBWUdST1VORC5FdmVudHMuY2FsbCh0aGlzKTtcclxuXHJcbiAgdGhpcy5nZXRHYW1lcGFkcyA9IG5hdmlnYXRvci5nZXRHYW1lcGFkcyB8fCBuYXZpZ2F0b3Iud2Via2l0R2V0R2FtZXBhZHM7XHJcblxyXG4gIHRoaXMuZ2FtZXBhZG1vdmVFdmVudCA9IHt9O1xyXG4gIHRoaXMuZ2FtZXBhZGRvd25FdmVudCA9IHt9O1xyXG4gIHRoaXMuZ2FtZXBhZHVwRXZlbnQgPSB7fTtcclxuXHJcbiAgdGhpcy5nYW1lcGFkcyA9IHt9O1xyXG5cclxuICB0aGlzLmFwcC5vbihcInN0ZXBcIiwgdGhpcy5zdGVwLmJpbmQodGhpcykpO1xyXG5cclxufTtcclxuXHJcblBMQVlHUk9VTkQuR2FtZXBhZHMucHJvdG90eXBlID0ge1xyXG5cclxuICBidXR0b25zOiB7XHJcbiAgICAwOiBcIjFcIixcclxuICAgIDE6IFwiMlwiLFxyXG4gICAgMjogXCIzXCIsXHJcbiAgICAzOiBcIjRcIixcclxuICAgIDQ6IFwibDFcIixcclxuICAgIDU6IFwicjFcIixcclxuICAgIDY6IFwibDJcIixcclxuICAgIDc6IFwicjJcIixcclxuICAgIDg6IFwic2VsZWN0XCIsXHJcbiAgICA5OiBcInN0YXJ0XCIsXHJcbiAgICAxMjogXCJ1cFwiLFxyXG4gICAgMTM6IFwiZG93blwiLFxyXG4gICAgMTQ6IFwibGVmdFwiLFxyXG4gICAgMTU6IFwicmlnaHRcIlxyXG4gIH0sXHJcblxyXG4gIHplcm9TdGF0ZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdmFyIGJ1dHRvbnMgPSBbXTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8PSAxNTsgaSsrKSB7XHJcbiAgICAgIGJ1dHRvbnMucHVzaCh7XHJcbiAgICAgICAgcHJlc3NlZDogZmFsc2UsXHJcbiAgICAgICAgdmFsdWU6IDBcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgYXhlczogW10sXHJcbiAgICAgIGJ1dHRvbnM6IGJ1dHRvbnNcclxuICAgIH07XHJcblxyXG4gIH0sXHJcblxyXG4gIGNyZWF0ZUdhbWVwYWQ6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHZhciByZXN1bHQgPSB7XHJcbiAgICAgIGJ1dHRvbnM6IHt9LFxyXG4gICAgICBzdGlja3M6IFt7XHJcbiAgICAgICAgeDogMCxcclxuICAgICAgICB5OiAwXHJcbiAgICAgIH0sIHtcclxuICAgICAgICB4OiAwLFxyXG4gICAgICAgIHk6IDBcclxuICAgICAgfV1cclxuICAgIH07XHJcblxyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTY7IGkrKykge1xyXG4gICAgICB2YXIga2V5ID0gdGhpcy5idXR0b25zW2ldO1xyXG4gICAgICByZXN1bHQuYnV0dG9uc1trZXldID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuXHJcbiAgfSxcclxuXHJcbiAgc3RlcDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgaWYgKCFuYXZpZ2F0b3IuZ2V0R2FtZXBhZHMpIHJldHVybjtcclxuXHJcbiAgICB2YXIgZ2FtZXBhZHMgPSBuYXZpZ2F0b3IuZ2V0R2FtZXBhZHMoKTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGdhbWVwYWRzLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICB2YXIgY3VycmVudCA9IGdhbWVwYWRzW2ldO1xyXG5cclxuICAgICAgaWYgKCFjdXJyZW50KSBjb250aW51ZTtcclxuXHJcbiAgICAgIGlmICghdGhpc1tpXSkgdGhpc1tpXSA9IHRoaXMuY3JlYXRlR2FtZXBhZCgpO1xyXG5cclxuICAgICAgLyogaGF2ZSB0byBjb25jYXQgdGhlIGN1cnJlbnQuYnV0dG9ucyBiZWNhdXNlIHRoZSBhcmUgcmVhZC1vbmx5ICovXHJcblxyXG4gICAgICB2YXIgYnV0dG9ucyA9IFtdLmNvbmNhdChjdXJyZW50LmJ1dHRvbnMpO1xyXG5cclxuICAgICAgLyogaGFjayBmb3IgbWlzc2luZyAgZHBhZHMgKi9cclxuXHJcbiAgICAgIGZvciAodmFyIGggPSAxMjsgaCA8PSAxNTsgaCsrKSB7XHJcbiAgICAgICAgaWYgKCFidXR0b25zW2hdKSBidXR0b25zW2hdID0ge1xyXG4gICAgICAgICAgcHJlc3NlZDogZmFsc2UsXHJcbiAgICAgICAgICB2YWx1ZTogMFxyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBwcmV2aW91cyA9IHRoaXNbaV07XHJcblxyXG4gICAgICAvKiBheGVzIChzdGlja3MpIHRvIGJ1dHRvbnMgKi9cclxuXHJcbiAgICAgIGlmIChjdXJyZW50LmF4ZXMpIHtcclxuXHJcbiAgICAgICAgaWYgKGN1cnJlbnQuYXhlc1swXSA8IDApIGJ1dHRvbnNbMTRdLnByZXNzZWQgPSB0cnVlO1xyXG4gICAgICAgIGlmIChjdXJyZW50LmF4ZXNbMF0gPiAwKSBidXR0b25zWzE1XS5wcmVzc2VkID0gdHJ1ZTtcclxuICAgICAgICBpZiAoY3VycmVudC5heGVzWzFdIDwgMCkgYnV0dG9uc1sxMl0ucHJlc3NlZCA9IHRydWU7XHJcbiAgICAgICAgaWYgKGN1cnJlbnQuYXhlc1sxXSA+IDApIGJ1dHRvbnNbMTNdLnByZXNzZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICBwcmV2aW91cy5zdGlja3NbMF0ueCA9IGN1cnJlbnQuYXhlc1swXS52YWx1ZTtcclxuICAgICAgICBwcmV2aW91cy5zdGlja3NbMF0ueSA9IGN1cnJlbnQuYXhlc1sxXS52YWx1ZTtcclxuICAgICAgICBwcmV2aW91cy5zdGlja3NbMV0ueCA9IGN1cnJlbnQuYXhlc1syXS52YWx1ZTtcclxuICAgICAgICBwcmV2aW91cy5zdGlja3NbMV0ueSA9IGN1cnJlbnQuYXhlc1szXS52YWx1ZTtcclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8qIGNoZWNrIGJ1dHRvbnMgY2hhbmdlcyAqL1xyXG5cclxuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBidXR0b25zLmxlbmd0aDsgaisrKSB7XHJcblxyXG4gICAgICAgIHZhciBrZXkgPSB0aGlzLmJ1dHRvbnNbal07XHJcblxyXG4gICAgICAgIC8qIGdhbWVwYWQgZG93biAqL1xyXG5cclxuICAgICAgICBpZiAoYnV0dG9uc1tqXS5wcmVzc2VkICYmICFwcmV2aW91cy5idXR0b25zW2tleV0pIHtcclxuXHJcbiAgICAgICAgICBwcmV2aW91cy5idXR0b25zW2tleV0gPSB0cnVlO1xyXG4gICAgICAgICAgdGhpcy5nYW1lcGFkZG93bkV2ZW50LmJ1dHRvbiA9IHRoaXMuYnV0dG9uc1tqXTtcclxuICAgICAgICAgIHRoaXMuZ2FtZXBhZGRvd25FdmVudC5nYW1lcGFkID0gaTtcclxuICAgICAgICAgIHRoaXMudHJpZ2dlcihcImdhbWVwYWRkb3duXCIsIHRoaXMuZ2FtZXBhZGRvd25FdmVudCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyogZ2FtZXBhZCB1cCAqL1xyXG4gICAgICAgIGVsc2UgaWYgKCFidXR0b25zW2pdLnByZXNzZWQgJiYgcHJldmlvdXMuYnV0dG9uc1trZXldKSB7XHJcblxyXG4gICAgICAgICAgcHJldmlvdXMuYnV0dG9uc1trZXldID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLmdhbWVwYWR1cEV2ZW50LmJ1dHRvbiA9IHRoaXMuYnV0dG9uc1tqXTtcclxuICAgICAgICAgIHRoaXMuZ2FtZXBhZHVwRXZlbnQuZ2FtZXBhZCA9IGk7XHJcbiAgICAgICAgICB0aGlzLnRyaWdnZXIoXCJnYW1lcGFkdXBcIiwgdGhpcy5nYW1lcGFkdXBFdmVudCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gIH1cclxufTtcclxuXHJcblBMQVlHUk9VTkQuVXRpbHMuZXh0ZW5kKFBMQVlHUk9VTkQuR2FtZXBhZHMucHJvdG90eXBlLCBQTEFZR1JPVU5ELkV2ZW50cy5wcm90b3R5cGUpO1xyXG5cclxuXHJcbi8qIGZpbGU6IHNyYy9LZXlib2FyZC5qcyAqL1xyXG5cclxuUExBWUdST1VORC5LZXlib2FyZCA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICBQTEFZR1JPVU5ELkV2ZW50cy5jYWxsKHRoaXMpO1xyXG5cclxuICB0aGlzLmtleXMgPSB7fTtcclxuXHJcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgdGhpcy5rZXlkb3duLmJpbmQodGhpcykpO1xyXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCB0aGlzLmtleXVwLmJpbmQodGhpcykpO1xyXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlwcmVzc1wiLCB0aGlzLmtleXByZXNzLmJpbmQodGhpcykpO1xyXG5cclxuICB0aGlzLmtleWRvd25FdmVudCA9IHt9O1xyXG4gIHRoaXMua2V5dXBFdmVudCA9IHt9O1xyXG5cclxuICB0aGlzLnByZXZlbnREZWZhdWx0ID0gdHJ1ZTtcclxuXHJcbn07XHJcblxyXG5QTEFZR1JPVU5ELktleWJvYXJkLnByb3RvdHlwZSA9IHtcclxuXHJcbiAga2V5Y29kZXM6IHtcclxuICAgIDM3OiBcImxlZnRcIixcclxuICAgIDM4OiBcInVwXCIsXHJcbiAgICAzOTogXCJyaWdodFwiLFxyXG4gICAgNDA6IFwiZG93blwiLFxyXG4gICAgNDU6IFwiaW5zZXJ0XCIsXHJcbiAgICA0NjogXCJkZWxldGVcIixcclxuICAgIDg6IFwiYmFja3NwYWNlXCIsXHJcbiAgICA5OiBcInRhYlwiLFxyXG4gICAgMTM6IFwiZW50ZXJcIixcclxuICAgIDE2OiBcInNoaWZ0XCIsXHJcbiAgICAxNzogXCJjdHJsXCIsXHJcbiAgICAxODogXCJhbHRcIixcclxuICAgIDE5OiBcInBhdXNlXCIsXHJcbiAgICAyMDogXCJjYXBzbG9ja1wiLFxyXG4gICAgMjc6IFwiZXNjYXBlXCIsXHJcbiAgICAzMjogXCJzcGFjZVwiLFxyXG4gICAgMzM6IFwicGFnZXVwXCIsXHJcbiAgICAzNDogXCJwYWdlZG93blwiLFxyXG4gICAgMzU6IFwiZW5kXCIsXHJcbiAgICAzNjogXCJob21lXCIsXHJcbiAgICAxMTI6IFwiZjFcIixcclxuICAgIDExMzogXCJmMlwiLFxyXG4gICAgMTE0OiBcImYzXCIsXHJcbiAgICAxMTU6IFwiZjRcIixcclxuICAgIDExNjogXCJmNVwiLFxyXG4gICAgMTE3OiBcImY2XCIsXHJcbiAgICAxMTg6IFwiZjdcIixcclxuICAgIDExOTogXCJmOFwiLFxyXG4gICAgMTIwOiBcImY5XCIsXHJcbiAgICAxMjE6IFwiZjEwXCIsXHJcbiAgICAxMjI6IFwiZjExXCIsXHJcbiAgICAxMjM6IFwiZjEyXCIsXHJcbiAgICAxNDQ6IFwibnVtbG9ja1wiLFxyXG4gICAgMTQ1OiBcInNjcm9sbGxvY2tcIixcclxuICAgIDE4NjogXCJzZW1pY29sb25cIixcclxuICAgIDE4NzogXCJlcXVhbFwiLFxyXG4gICAgMTg4OiBcImNvbW1hXCIsXHJcbiAgICAxODk6IFwiZGFzaFwiLFxyXG4gICAgMTkwOiBcInBlcmlvZFwiLFxyXG4gICAgMTkxOiBcInNsYXNoXCIsXHJcbiAgICAxOTI6IFwiZ3JhdmVhY2NlbnRcIixcclxuICAgIDIxOTogXCJvcGVuYnJhY2tldFwiLFxyXG4gICAgMjIwOiBcImJhY2tzbGFzaFwiLFxyXG4gICAgMjIxOiBcImNsb3NlYnJha2V0XCIsXHJcbiAgICAyMjI6IFwic2luZ2xlcXVvdGVcIlxyXG4gIH0sXHJcblxyXG4gIGtleXByZXNzOiBmdW5jdGlvbihlKSB7XHJcblxyXG4gIH0sXHJcblxyXG4gIGtleWRvd246IGZ1bmN0aW9uKGUpIHtcclxuICAgIGlmIChlLndoaWNoID49IDQ4ICYmIGUud2hpY2ggPD0gOTApIHZhciBrZXlOYW1lID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgZWxzZSB2YXIga2V5TmFtZSA9IHRoaXMua2V5Y29kZXNbZS53aGljaF07XHJcblxyXG4gICAgaWYgKHRoaXMua2V5c1trZXlOYW1lXSkgcmV0dXJuO1xyXG5cclxuICAgIHRoaXMua2V5ZG93bkV2ZW50LmtleSA9IGtleU5hbWU7XHJcbiAgICB0aGlzLmtleWRvd25FdmVudC5vcmlnaW5hbCA9IGU7XHJcblxyXG4gICAgdGhpcy5rZXlzW2tleU5hbWVdID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLnRyaWdnZXIoXCJrZXlkb3duXCIsIHRoaXMua2V5ZG93bkV2ZW50KTtcclxuXHJcbiAgICBpZiAodGhpcy5wcmV2ZW50RGVmYXVsdCAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBkb2N1bWVudC5ib2R5KSB7XHJcbiAgICAgIGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcclxuICAgICAgZS5rZXlDb2RlID0gMDtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGtleXVwOiBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgaWYgKGUud2hpY2ggPj0gNDggJiYgZS53aGljaCA8PSA5MCkgdmFyIGtleU5hbWUgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICBlbHNlIHZhciBrZXlOYW1lID0gdGhpcy5rZXljb2Rlc1tlLndoaWNoXTtcclxuXHJcbiAgICB0aGlzLmtleXVwRXZlbnQua2V5ID0ga2V5TmFtZTtcclxuICAgIHRoaXMua2V5dXBFdmVudC5vcmlnaW5hbCA9IGU7XHJcblxyXG4gICAgdGhpcy5rZXlzW2tleU5hbWVdID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy50cmlnZ2VyKFwia2V5dXBcIiwgdGhpcy5rZXl1cEV2ZW50KTtcclxuICB9XHJcblxyXG59O1xyXG5cclxuUExBWUdST1VORC5VdGlscy5leHRlbmQoUExBWUdST1VORC5LZXlib2FyZC5wcm90b3R5cGUsIFBMQVlHUk9VTkQuRXZlbnRzLnByb3RvdHlwZSk7XHJcblxyXG5cclxuXHJcbi8qIGZpbGU6IHNyYy9Qb2ludGVyLmpzICovXHJcblxyXG5QTEFZR1JPVU5ELlBvaW50ZXIgPSBmdW5jdGlvbihhcHApIHtcclxuXHJcbiAgdGhpcy5hcHAgPSBhcHA7XHJcblxyXG4gIGFwcC5vbihcInRvdWNoc3RhcnRcIiwgdGhpcy50b3VjaHN0YXJ0LCB0aGlzKTtcclxuICBhcHAub24oXCJ0b3VjaGVuZFwiLCB0aGlzLnRvdWNoZW5kLCB0aGlzKTtcclxuICBhcHAub24oXCJ0b3VjaG1vdmVcIiwgdGhpcy50b3VjaG1vdmUsIHRoaXMpO1xyXG5cclxuICBhcHAub24oXCJtb3VzZW1vdmVcIiwgdGhpcy5tb3VzZW1vdmUsIHRoaXMpO1xyXG4gIGFwcC5vbihcIm1vdXNlZG93blwiLCB0aGlzLm1vdXNlZG93biwgdGhpcyk7XHJcbiAgYXBwLm9uKFwibW91c2V1cFwiLCB0aGlzLm1vdXNldXAsIHRoaXMpO1xyXG5cclxuICB0aGlzLnBvaW50ZXJzID0gYXBwLnBvaW50ZXJzID0ge307XHJcblxyXG59O1xyXG5cclxuUExBWUdST1VORC5Qb2ludGVyLnBsdWdpbiA9IHRydWU7XHJcblxyXG5QTEFZR1JPVU5ELlBvaW50ZXIucHJvdG90eXBlID0ge1xyXG5cclxuICB1cGRhdGVQb2ludGVyOiBmdW5jdGlvbihwb2ludGVyKSB7XHJcblxyXG4gICAgdGhpcy5wb2ludGVyc1twb2ludGVyLmlkXSA9IHBvaW50ZXI7XHJcblxyXG4gIH0sXHJcblxyXG4gIHJlbW92ZVBvaW50ZXI6IGZ1bmN0aW9uKHBvaW50ZXIpIHtcclxuXHJcbiAgICBkZWxldGUgdGhpcy5wb2ludGVyc1twb2ludGVyLmlkXTtcclxuXHJcbiAgfSxcclxuXHJcbiAgdG91Y2hzdGFydDogZnVuY3Rpb24oZSkge1xyXG5cclxuICAgIGUudG91Y2ggPSB0cnVlO1xyXG5cclxuICAgIHRoaXMudXBkYXRlUG9pbnRlcihlKTtcclxuXHJcbiAgICB0aGlzLmFwcC5lbWl0R2xvYmFsRXZlbnQoXCJwb2ludGVyZG93blwiLCBlKTtcclxuXHJcbiAgfSxcclxuXHJcbiAgdG91Y2hlbmQ6IGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICBlLnRvdWNoID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLnJlbW92ZVBvaW50ZXIoZSk7XHJcblxyXG4gICAgdGhpcy5hcHAuZW1pdEdsb2JhbEV2ZW50KFwicG9pbnRlcnVwXCIsIGUpO1xyXG5cclxuICB9LFxyXG5cclxuICB0b3VjaG1vdmU6IGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICBlLnRvdWNoID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLnVwZGF0ZVBvaW50ZXIoZSk7XHJcblxyXG4gICAgdGhpcy5hcHAuZW1pdEdsb2JhbEV2ZW50KFwicG9pbnRlcm1vdmVcIiwgZSk7XHJcblxyXG4gIH0sXHJcblxyXG4gIG1vdXNlbW92ZTogZnVuY3Rpb24oZSkge1xyXG5cclxuICAgIGUubW91c2UgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMudXBkYXRlUG9pbnRlcihlKTtcclxuXHJcbiAgICB0aGlzLmFwcC5lbWl0R2xvYmFsRXZlbnQoXCJwb2ludGVybW92ZVwiLCBlKTtcclxuXHJcbiAgfSxcclxuXHJcbiAgbW91c2Vkb3duOiBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgZS5tb3VzZSA9IHRydWU7XHJcblxyXG4gICAgdGhpcy5hcHAuZW1pdEdsb2JhbEV2ZW50KFwicG9pbnRlcmRvd25cIiwgZSk7XHJcblxyXG4gIH0sXHJcblxyXG4gIG1vdXNldXA6IGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICBlLm1vdXNlID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLmFwcC5lbWl0R2xvYmFsRXZlbnQoXCJwb2ludGVydXBcIiwgZSk7XHJcblxyXG4gIH0sXHJcblxyXG4gIG1vdXNld2hlZWw6IGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICBlLm1vdXNlID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLmFwcC5lbWl0R2xvYmFsRXZlbnQoXCJwb2ludGVyd2hlZWxcIiwgZSk7XHJcblxyXG4gIH1cclxuXHJcbn07XHJcblxyXG4vKiBmaWxlOiBzcmMvTG9hZGVyLmpzICovXHJcblxyXG4vKiBMb2FkZXIgKi9cclxuXHJcblBMQVlHUk9VTkQuTG9hZGVyID0gZnVuY3Rpb24oYXBwKSB7XHJcblxyXG4gIHRoaXMuYXBwID0gYXBwO1xyXG5cclxuICBQTEFZR1JPVU5ELkV2ZW50cy5jYWxsKHRoaXMpO1xyXG5cclxuICB0aGlzLnJlc2V0KCk7XHJcblxyXG59O1xyXG5cclxuUExBWUdST1VORC5Mb2FkZXIucHJvdG90eXBlID0ge1xyXG5cclxuICAvKiBsb2FkZXIgKi9cclxuXHJcbiAgYWRkOiBmdW5jdGlvbihpZCkge1xyXG5cclxuICAgIHRoaXMucXVldWUrKztcclxuICAgIHRoaXMuY291bnQrKztcclxuICAgIHRoaXMucmVhZHkgPSBmYWxzZTtcclxuICAgIHRoaXMudHJpZ2dlcihcImFkZFwiLCBpZCk7XHJcblxyXG4gICAgcmV0dXJuIGlkO1xyXG5cclxuICB9LFxyXG5cclxuICBlcnJvcjogZnVuY3Rpb24oaWQpIHtcclxuXHJcbiAgICB0aGlzLnRyaWdnZXIoXCJlcnJvclwiLCBpZCk7XHJcblxyXG4gIH0sXHJcblxyXG4gIHN1Y2Nlc3M6IGZ1bmN0aW9uKGlkKSB7XHJcblxyXG4gICAgdGhpcy5xdWV1ZS0tO1xyXG5cclxuICAgIHRoaXMucHJvZ3Jlc3MgPSAxIC0gdGhpcy5xdWV1ZSAvIHRoaXMuY291bnQ7XHJcblxyXG4gICAgdGhpcy50cmlnZ2VyKFwibG9hZFwiLCBpZCk7XHJcblxyXG4gICAgaWYgKHRoaXMucXVldWUgPD0gMCkge1xyXG4gICAgICB0aGlzLnRyaWdnZXIoXCJyZWFkeVwiKTtcclxuICAgICAgdGhpcy5yZXNldCgpO1xyXG4gICAgfVxyXG5cclxuICB9LFxyXG5cclxuICByZXNldDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdGhpcy5wcm9ncmVzcyA9IDA7XHJcbiAgICB0aGlzLnF1ZXVlID0gMDtcclxuICAgIHRoaXMuY291bnQgPSAwO1xyXG4gICAgdGhpcy5yZWFkeSA9IHRydWU7XHJcblxyXG4gIH1cclxufTtcclxuXHJcblBMQVlHUk9VTkQuVXRpbHMuZXh0ZW5kKFBMQVlHUk9VTkQuTG9hZGVyLnByb3RvdHlwZSwgUExBWUdST1VORC5FdmVudHMucHJvdG90eXBlKTtcclxuXHJcbi8qIGZpbGU6IHNyYy9Nb3VzZS5qcyAqL1xyXG5cclxuUExBWUdST1VORC5Nb3VzZSA9IGZ1bmN0aW9uKGFwcCwgZWxlbWVudCkge1xyXG5cclxuICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gIHRoaXMuYXBwID0gYXBwO1xyXG5cclxuICBQTEFZR1JPVU5ELkV2ZW50cy5jYWxsKHRoaXMpO1xyXG5cclxuICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xyXG5cclxuICB0aGlzLmJ1dHRvbnMgPSB7fTtcclxuXHJcbiAgdGhpcy5wcmV2ZW50Q29udGV4dE1lbnUgPSB0cnVlO1xyXG5cclxuICB0aGlzLm1vdXNlbW92ZUV2ZW50ID0ge307XHJcbiAgdGhpcy5tb3VzZWRvd25FdmVudCA9IHt9O1xyXG4gIHRoaXMubW91c2V1cEV2ZW50ID0ge307XHJcbiAgdGhpcy5tb3VzZXdoZWVsRXZlbnQgPSB7fTtcclxuXHJcbiAgdGhpcy54ID0gMDtcclxuICB0aGlzLnkgPSAwO1xyXG5cclxuICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgdGhpcy5tb3VzZW1vdmUuYmluZCh0aGlzKSk7XHJcbiAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHRoaXMubW91c2Vkb3duLmJpbmQodGhpcykpO1xyXG4gIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgdGhpcy5tb3VzZXVwLmJpbmQodGhpcykpO1xyXG5cclxuICB0aGlzLmVuYWJsZU1vdXNld2hlZWwoKTtcclxuXHJcbiAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjb250ZXh0bWVudVwiLCBmdW5jdGlvbihlKSB7XHJcbiAgICBpZiAoc2VsZi5wcmV2ZW50Q29udGV4dE1lbnUpIGUucHJldmVudERlZmF1bHQoKTtcclxuICB9KTtcclxuXHJcbiAgZWxlbWVudC5yZXF1ZXN0UG9pbnRlckxvY2sgPSBlbGVtZW50LnJlcXVlc3RQb2ludGVyTG9jayB8fFxyXG4gICAgZWxlbWVudC5tb3pSZXF1ZXN0UG9pbnRlckxvY2sgfHxcclxuICAgIGVsZW1lbnQud2Via2l0UmVxdWVzdFBvaW50ZXJMb2NrO1xyXG5cclxuICBkb2N1bWVudC5leGl0UG9pbnRlckxvY2sgPSBkb2N1bWVudC5leGl0UG9pbnRlckxvY2sgfHxcclxuICAgIGRvY3VtZW50Lm1vekV4aXRQb2ludGVyTG9jayB8fFxyXG4gICAgZG9jdW1lbnQud2Via2l0RXhpdFBvaW50ZXJMb2NrO1xyXG5cclxuXHJcbiAgdGhpcy5oYW5kbGVSZXNpemUoKTtcclxufTtcclxuXHJcblBMQVlHUk9VTkQuTW91c2UucHJvdG90eXBlID0ge1xyXG5cclxuICBsb2NrOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB0aGlzLmxvY2tlZCA9IHRydWU7XHJcbiAgICB0aGlzLmVsZW1lbnQucmVxdWVzdFBvaW50ZXJMb2NrKCk7XHJcblxyXG4gIH0sXHJcblxyXG4gIHVubG9jazogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdGhpcy5sb2NrZWQgPSBmYWxzZTtcclxuICAgIGRvY3VtZW50LmV4aXRQb2ludGVyTG9jaygpO1xyXG5cclxuICB9LFxyXG5cclxuICBnZXRFbGVtZW50T2Zmc2V0OiBmdW5jdGlvbihlbGVtZW50KSB7XHJcblxyXG4gICAgdmFyIG9mZnNldFggPSAwO1xyXG4gICAgdmFyIG9mZnNldFkgPSAwO1xyXG5cclxuICAgIGRvIHtcclxuICAgICAgb2Zmc2V0WCArPSBlbGVtZW50Lm9mZnNldExlZnQ7XHJcbiAgICAgIG9mZnNldFkgKz0gZWxlbWVudC5vZmZzZXRUb3A7XHJcbiAgICB9XHJcblxyXG4gICAgd2hpbGUgKChlbGVtZW50ID0gZWxlbWVudC5vZmZzZXRQYXJlbnQpKTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB4OiBvZmZzZXRYLFxyXG4gICAgICB5OiBvZmZzZXRZXHJcbiAgICB9O1xyXG5cclxuICB9LFxyXG5cclxuICBoYW5kbGVSZXNpemU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHRoaXMuZWxlbWVudE9mZnNldCA9IHRoaXMuZ2V0RWxlbWVudE9mZnNldCh0aGlzLmVsZW1lbnQpO1xyXG5cclxuICB9LFxyXG5cclxuICBtb3VzZW1vdmU6IFBMQVlHUk9VTkQuVXRpbHMudGhyb3R0bGUoZnVuY3Rpb24oZSkge1xyXG5cclxuICAgIHRoaXMueCA9IHRoaXMubW91c2Vtb3ZlRXZlbnQueCA9IChlLnBhZ2VYIC0gdGhpcy5lbGVtZW50T2Zmc2V0LnggLSB0aGlzLmFwcC5vZmZzZXRYKSAvIHRoaXMuYXBwLnNjYWxlIHwgMDtcclxuICAgIHRoaXMueSA9IHRoaXMubW91c2Vtb3ZlRXZlbnQueSA9IChlLnBhZ2VZIC0gdGhpcy5lbGVtZW50T2Zmc2V0LnkgLSB0aGlzLmFwcC5vZmZzZXRZKSAvIHRoaXMuYXBwLnNjYWxlIHwgMDtcclxuXHJcbiAgICB0aGlzLm1vdXNlbW92ZUV2ZW50Lm9yaWdpbmFsID0gZTtcclxuXHJcbiAgICBpZiAodGhpcy5sb2NrZWQpIHtcclxuICAgICAgdGhpcy5tb3VzZW1vdmVFdmVudC5tb3ZlbWVudFggPSBlLm1vdmVtZW50WCB8fFxyXG4gICAgICAgIGUubW96TW92ZW1lbnRYIHx8XHJcbiAgICAgICAgZS53ZWJraXRNb3ZlbWVudFggfHxcclxuICAgICAgICAwO1xyXG5cclxuICAgICAgdGhpcy5tb3VzZW1vdmVFdmVudC5tb3ZlbWVudFkgPSBlLm1vdmVtZW50WSB8fFxyXG4gICAgICAgIGUubW96TW92ZW1lbnRZIHx8XHJcbiAgICAgICAgZS53ZWJraXRNb3ZlbWVudFkgfHxcclxuICAgICAgICAwO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmFwcC5tb3VzZVRvVG91Y2gpIHtcclxuICAgICAgLy8gICAgICBpZiAodGhpcy5sZWZ0KSB7XHJcbiAgICAgIHRoaXMubW91c2Vtb3ZlRXZlbnQuaWQgPSB0aGlzLm1vdXNlbW92ZUV2ZW50LmlkZW50aWZpZXIgPSAyNTU7XHJcbiAgICAgIHRoaXMudHJpZ2dlcihcInRvdWNobW92ZVwiLCB0aGlzLm1vdXNlbW92ZUV2ZW50KTtcclxuICAgICAgLy8gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLm1vdXNlbW92ZUV2ZW50LmlkID0gdGhpcy5tb3VzZW1vdmVFdmVudC5pZGVudGlmaWVyID0gMjU1O1xyXG4gICAgICB0aGlzLnRyaWdnZXIoXCJtb3VzZW1vdmVcIiwgdGhpcy5tb3VzZW1vdmVFdmVudCk7XHJcbiAgICB9XHJcblxyXG4gIH0sIDE2KSxcclxuXHJcbiAgbW91c2Vkb3duOiBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgdmFyIGJ1dHRvbk5hbWUgPSBbXCJsZWZ0XCIsIFwibWlkZGxlXCIsIFwicmlnaHRcIl1bZS5idXR0b25dO1xyXG5cclxuICAgIHRoaXMubW91c2Vkb3duRXZlbnQueCA9IHRoaXMubW91c2Vtb3ZlRXZlbnQueDtcclxuICAgIHRoaXMubW91c2Vkb3duRXZlbnQueSA9IHRoaXMubW91c2Vtb3ZlRXZlbnQueTtcclxuICAgIHRoaXMubW91c2Vkb3duRXZlbnQuYnV0dG9uID0gYnV0dG9uTmFtZTtcclxuICAgIHRoaXMubW91c2Vkb3duRXZlbnQub3JpZ2luYWwgPSBlO1xyXG5cclxuICAgIHRoaXNbYnV0dG9uTmFtZV0gPSB0cnVlO1xyXG5cclxuICAgIHRoaXMubW91c2Vkb3duRXZlbnQuaWQgPSB0aGlzLm1vdXNlZG93bkV2ZW50LmlkZW50aWZpZXIgPSAyNTU7XHJcblxyXG4gICAgaWYgKHRoaXMuYXBwLm1vdXNlVG9Ub3VjaCkge1xyXG4gICAgICB0aGlzLnRyaWdnZXIoXCJ0b3VjaG1vdmVcIiwgdGhpcy5tb3VzZWRvd25FdmVudCk7XHJcbiAgICAgIHRoaXMudHJpZ2dlcihcInRvdWNoc3RhcnRcIiwgdGhpcy5tb3VzZWRvd25FdmVudCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnRyaWdnZXIoXCJtb3VzZWRvd25cIiwgdGhpcy5tb3VzZWRvd25FdmVudCk7XHJcbiAgICB9XHJcblxyXG4gIH0sXHJcblxyXG4gIG1vdXNldXA6IGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICB2YXIgYnV0dG9uTmFtZSA9IFtcImxlZnRcIiwgXCJtaWRkbGVcIiwgXCJyaWdodFwiXVtlLmJ1dHRvbl07XHJcblxyXG4gICAgdGhpcy5tb3VzZXVwRXZlbnQueCA9IHRoaXMubW91c2Vtb3ZlRXZlbnQueDtcclxuICAgIHRoaXMubW91c2V1cEV2ZW50LnkgPSB0aGlzLm1vdXNlbW92ZUV2ZW50Lnk7XHJcbiAgICB0aGlzLm1vdXNldXBFdmVudC5idXR0b24gPSBidXR0b25OYW1lO1xyXG4gICAgdGhpcy5tb3VzZXVwRXZlbnQub3JpZ2luYWwgPSBlO1xyXG5cclxuICAgIHRoaXMubW91c2V1cEV2ZW50LmlkID0gdGhpcy5tb3VzZXVwRXZlbnQuaWRlbnRpZmllciA9IDI1NTtcclxuXHJcbiAgICBpZiAodGhpcy5hcHAubW91c2VUb1RvdWNoKSB7XHJcblxyXG4gICAgICB0aGlzLnRyaWdnZXIoXCJ0b3VjaGVuZFwiLCB0aGlzLm1vdXNldXBFdmVudCk7XHJcblxyXG4gICAgfSBlbHNlIHtcclxuXHJcbiAgICAgIHRoaXMudHJpZ2dlcihcIm1vdXNldXBcIiwgdGhpcy5tb3VzZXVwRXZlbnQpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICB0aGlzW2J1dHRvbk5hbWVdID0gZmFsc2U7XHJcblxyXG4gIH0sXHJcblxyXG4gIG1vdXNld2hlZWw6IGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICB0aGlzLm1vdXNld2hlZWxFdmVudC54ID0gdGhpcy5tb3VzZW1vdmVFdmVudC54O1xyXG4gICAgdGhpcy5tb3VzZXdoZWVsRXZlbnQueSA9IHRoaXMubW91c2Vtb3ZlRXZlbnQueTtcclxuICAgIHRoaXMubW91c2V3aGVlbEV2ZW50LmJ1dHRvbiA9IFtcIm5vbmVcIiwgXCJsZWZ0XCIsIFwibWlkZGxlXCIsIFwicmlnaHRcIl1bZS5idXR0b25dO1xyXG4gICAgdGhpcy5tb3VzZXdoZWVsRXZlbnQub3JpZ2luYWwgPSBlO1xyXG4gICAgdGhpcy5tb3VzZXdoZWVsRXZlbnQuaWQgPSB0aGlzLm1vdXNld2hlZWxFdmVudC5pZGVudGlmaWVyID0gMjU1O1xyXG5cclxuICAgIHRoaXNbZS5idXR0b25dID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy50cmlnZ2VyKFwibW91c2V3aGVlbFwiLCB0aGlzLm1vdXNld2hlZWxFdmVudCk7XHJcblxyXG4gIH0sXHJcblxyXG5cclxuICBlbmFibGVNb3VzZXdoZWVsOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB2YXIgZXZlbnROYW1lcyA9ICdvbndoZWVsJyBpbiBkb2N1bWVudCB8fCBkb2N1bWVudC5kb2N1bWVudE1vZGUgPj0gOSA/IFsnd2hlZWwnXSA6IFsnbW91c2V3aGVlbCcsICdEb21Nb3VzZVNjcm9sbCcsICdNb3pNb3VzZVBpeGVsU2Nyb2xsJ107XHJcbiAgICB2YXIgY2FsbGJhY2sgPSB0aGlzLm1vdXNld2hlZWwuYmluZCh0aGlzKTtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICBmb3IgKHZhciBpID0gZXZlbnROYW1lcy5sZW5ndGg7IGk7KSB7XHJcblxyXG4gICAgICBzZWxmLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWVzWy0taV0sIFBMQVlHUk9VTkQuVXRpbHMudGhyb3R0bGUoZnVuY3Rpb24oZXZlbnQpIHtcclxuXHJcbiAgICAgICAgdmFyIG9yZ0V2ZW50ID0gZXZlbnQgfHwgd2luZG93LmV2ZW50LFxyXG4gICAgICAgICAgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSxcclxuICAgICAgICAgIGRlbHRhID0gMCxcclxuICAgICAgICAgIGRlbHRhWCA9IDAsXHJcbiAgICAgICAgICBkZWx0YVkgPSAwLFxyXG4gICAgICAgICAgYWJzRGVsdGEgPSAwLFxyXG4gICAgICAgICAgYWJzRGVsdGFYWSA9IDAsXHJcbiAgICAgICAgICBmbjtcclxuXHJcbiAgICAgICAgb3JnRXZlbnQudHlwZSA9IFwibW91c2V3aGVlbFwiO1xyXG5cclxuICAgICAgICAvLyBPbGQgc2Nob29sIHNjcm9sbHdoZWVsIGRlbHRhXHJcbiAgICAgICAgaWYgKG9yZ0V2ZW50LndoZWVsRGVsdGEpIHtcclxuICAgICAgICAgIGRlbHRhID0gb3JnRXZlbnQud2hlZWxEZWx0YTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChvcmdFdmVudC5kZXRhaWwpIHtcclxuICAgICAgICAgIGRlbHRhID0gb3JnRXZlbnQuZGV0YWlsICogLTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBOZXcgc2Nob29sIHdoZWVsIGRlbHRhICh3aGVlbCBldmVudClcclxuICAgICAgICBpZiAob3JnRXZlbnQuZGVsdGFZKSB7XHJcbiAgICAgICAgICBkZWx0YVkgPSBvcmdFdmVudC5kZWx0YVkgKiAtMTtcclxuICAgICAgICAgIGRlbHRhID0gZGVsdGFZO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gV2Via2l0XHJcbiAgICAgICAgaWYgKG9yZ0V2ZW50LndoZWVsRGVsdGFZICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIGRlbHRhWSA9IG9yZ0V2ZW50LndoZWVsRGVsdGFZO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IGRlbHRhID8gZGVsdGEgOiBkZWx0YVk7XHJcblxyXG4gICAgICAgIHNlbGYubW91c2V3aGVlbEV2ZW50LnggPSBzZWxmLm1vdXNlbW92ZUV2ZW50Lng7XHJcbiAgICAgICAgc2VsZi5tb3VzZXdoZWVsRXZlbnQueSA9IHNlbGYubW91c2Vtb3ZlRXZlbnQueTtcclxuICAgICAgICBzZWxmLm1vdXNld2hlZWxFdmVudC5kZWx0YSA9IHJlc3VsdCAvIE1hdGguYWJzKHJlc3VsdCk7XHJcbiAgICAgICAgc2VsZi5tb3VzZXdoZWVsRXZlbnQub3JpZ2luYWwgPSBvcmdFdmVudDtcclxuXHJcbiAgICAgICAgY2FsbGJhY2soc2VsZi5tb3VzZXdoZWVsRXZlbnQpO1xyXG5cclxuICAgICAgICBvcmdFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgfSwgNDApLCBmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbn07XHJcblxyXG5QTEFZR1JPVU5ELlV0aWxzLmV4dGVuZChQTEFZR1JPVU5ELk1vdXNlLnByb3RvdHlwZSwgUExBWUdST1VORC5FdmVudHMucHJvdG90eXBlKTtcclxuXHJcbi8qIGZpbGU6IHNyYy9Tb3VuZC5qcyAqL1xyXG5cclxuUExBWUdST1VORC5Tb3VuZCA9IGZ1bmN0aW9uKGFwcCkge1xyXG5cclxuICB2YXIgYXVkaW9Db250ZXh0ID0gd2luZG93LkF1ZGlvQ29udGV4dCB8fCB3aW5kb3cud2Via2l0QXVkaW9Db250ZXh0IHx8IHdpbmRvdy5tb3pBdWRpb0NvbnRleHQ7XHJcblxyXG4gIGlmIChhdWRpb0NvbnRleHQpIHtcclxuXHJcbiAgICBpZiAoIVBMQVlHUk9VTkQuYXVkaW9Db250ZXh0KSBQTEFZR1JPVU5ELmF1ZGlvQ29udGV4dCA9IG5ldyBhdWRpb0NvbnRleHQ7XHJcblxyXG4gICAgYXBwLmF1ZGlvQ29udGV4dCA9IFBMQVlHUk9VTkQuYXVkaW9Db250ZXh0O1xyXG4gICAgYXBwLnNvdW5kID0gbmV3IFBMQVlHUk9VTkQuU291bmRXZWJBdWRpb0FQSShhcHAsIGFwcC5hdWRpb0NvbnRleHQpO1xyXG4gICAgYXBwLm11c2ljID0gbmV3IFBMQVlHUk9VTkQuU291bmRXZWJBdWRpb0FQSShhcHAsIGFwcC5hdWRpb0NvbnRleHQpO1xyXG5cclxuICB9IGVsc2Uge1xyXG5cclxuICAgIGFwcC5zb3VuZCA9IG5ldyBQTEFZR1JPVU5ELlNvdW5kQXVkaW8oYXBwKTtcclxuICAgIGFwcC5tdXNpYyA9IG5ldyBQTEFZR1JPVU5ELlNvdW5kQXVkaW8oYXBwKTtcclxuXHJcbiAgfVxyXG5cclxufTtcclxuXHJcblBMQVlHUk9VTkQuQXBwbGljYXRpb24ucHJvdG90eXBlLnBsYXlTb3VuZCA9IGZ1bmN0aW9uKGtleSwgbG9vcCkge1xyXG5cclxuICByZXR1cm4gdGhpcy5zb3VuZC5wbGF5KGtleSwgbG9vcCk7XHJcblxyXG59O1xyXG5cclxuUExBWUdST1VORC5BcHBsaWNhdGlvbi5wcm90b3R5cGUuc3RvcFNvdW5kID0gZnVuY3Rpb24oc291bmQpIHtcclxuXHJcbiAgdGhpcy5zb3VuZC5zdG9wKHNvdW5kKTtcclxuXHJcbn07XHJcblxyXG5QTEFZR1JPVU5ELkFwcGxpY2F0aW9uLnByb3RvdHlwZS5sb2FkU291bmQgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgcmV0dXJuIHRoaXMubG9hZFNvdW5kcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cclxufTtcclxuXHJcblBMQVlHUk9VTkQuQXBwbGljYXRpb24ucHJvdG90eXBlLmxvYWRTb3VuZHMgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICB2YXIgYXJnID0gYXJndW1lbnRzW2ldO1xyXG5cclxuICAgIC8qIHBvbHltb3JwaGlzbSBhdCBpdHMgZmluZXN0ICovXHJcblxyXG4gICAgaWYgKHR5cGVvZiBhcmcgPT09IFwib2JqZWN0XCIpIHtcclxuXHJcbiAgICAgIGZvciAodmFyIGtleSBpbiBhcmcpIHRoaXMubG9hZFNvdW5kcyhhcmdba2V5XSk7XHJcblxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5zb3VuZC5sb2FkKGFyZyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufTtcclxuXHJcbi8qIGZpbGU6IHNyYy9Tb3VuZFdlYkF1ZGlvQVBJLmpzICovXHJcblxyXG5QTEFZR1JPVU5ELlNvdW5kV2ViQXVkaW9BUEkgPSBmdW5jdGlvbihhcHAsIGF1ZGlvQ29udGV4dCkge1xyXG5cclxuICB0aGlzLmFwcCA9IGFwcDtcclxuXHJcbiAgdmFyIGNhblBsYXlNcDMgPSAobmV3IEF1ZGlvKS5jYW5QbGF5VHlwZShcImF1ZGlvL21wM1wiKTtcclxuICB2YXIgY2FuUGxheU9nZyA9IChuZXcgQXVkaW8pLmNhblBsYXlUeXBlKCdhdWRpby9vZ2c7IGNvZGVjcz1cInZvcmJpc1wiJyk7XHJcblxyXG4gIGlmICh0aGlzLmFwcC5wcmVmZXJlZEF1ZGlvRm9ybWF0ID09PSBcIm1wM1wiKSB7XHJcblxyXG4gICAgaWYgKGNhblBsYXlNcDMpIHRoaXMuYXVkaW9Gb3JtYXQgPSBcIm1wM1wiO1xyXG4gICAgZWxzZSB0aGlzLmF1ZGlvRm9ybWF0ID0gXCJvZ2dcIjtcclxuXHJcbiAgfSBlbHNlIHtcclxuXHJcbiAgICBpZiAoY2FuUGxheU9nZykgdGhpcy5hdWRpb0Zvcm1hdCA9IFwib2dnXCI7XHJcbiAgICBlbHNlIHRoaXMuYXVkaW9Gb3JtYXQgPSBcIm1wM1wiO1xyXG5cclxuICB9XHJcblxyXG4gIHRoaXMuY29udGV4dCA9IGF1ZGlvQ29udGV4dDtcclxuXHJcbiAgdGhpcy5nYWluTm9kZSA9IHRoaXMuY29udGV4dC5jcmVhdGVHYWluKClcclxuICB0aGlzLmdhaW5Ob2RlLmNvbm5lY3QodGhpcy5jb250ZXh0LmRlc3RpbmF0aW9uKTtcclxuXHJcbiAgdGhpcy5jb21wcmVzc29yID0gdGhpcy5jb250ZXh0LmNyZWF0ZUR5bmFtaWNzQ29tcHJlc3NvcigpO1xyXG4gIHRoaXMuY29tcHJlc3Nvci5jb25uZWN0KHRoaXMuZ2Fpbk5vZGUpO1xyXG5cclxuICB0aGlzLm91dHB1dCA9IHRoaXMuZ2Fpbk5vZGU7XHJcblxyXG4gIHRoaXMuZ2Fpbk5vZGUuZ2Fpbi52YWx1ZSA9IDEuMDtcclxuXHJcbiAgdGhpcy5wb29sID0gW107XHJcbiAgdGhpcy52b2x1bWUgPSAxLjA7XHJcblxyXG4gIHRoaXMuc2V0TWFzdGVyUG9zaXRpb24oMCwgMCwgMCk7XHJcblxyXG4gIHRoaXMubG9vcHMgPSBbXTtcclxuXHJcbiAgdGhpcy5hcHAub24oXCJzdGVwXCIsIHRoaXMuc3RlcC5iaW5kKHRoaXMpKTtcclxuXHJcbn07XHJcblxyXG5QTEFZR1JPVU5ELlNvdW5kV2ViQXVkaW9BUEkucHJvdG90eXBlID0ge1xyXG5cclxuICBidWZmZXJzOiB7fSxcclxuICBhbGlhc2VzOiB7fSxcclxuXHJcbiAgYWxpYXM6IGZ1bmN0aW9uKGFsaWFzLCBzb3VyY2UsIHZvbHVtZSwgcmF0ZSkge1xyXG5cclxuICAgIHRoaXMuYWxpYXNlc1thbGlhc10gPSB7XHJcbiAgICAgIHNvdXJjZTogc291cmNlLFxyXG4gICAgICB2b2x1bWU6IHZvbHVtZSxcclxuICAgICAgcmF0ZTogcmF0ZVxyXG4gICAgfTtcclxuXHJcbiAgfSxcclxuXHJcbiAgc2V0TWFzdGVyOiBmdW5jdGlvbih2b2x1bWUpIHtcclxuXHJcbiAgICB0aGlzLnZvbHVtZSA9IHZvbHVtZTtcclxuXHJcbiAgICB0aGlzLmdhaW5Ob2RlLmdhaW4udmFsdWUgPSB2b2x1bWU7XHJcblxyXG4gIH0sXHJcblxyXG4gIGxvYWQ6IGZ1bmN0aW9uKGZpbGUpIHtcclxuXHJcbiAgICB2YXIgZW50cnkgPSB0aGlzLmFwcC5nZXRBc3NldEVudHJ5KGZpbGUsIFwic291bmRzXCIsIHRoaXMuYXVkaW9Gb3JtYXQpO1xyXG5cclxuICAgIHZhciBzYW1wbGVyID0gdGhpcztcclxuXHJcbiAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG5cclxuICAgIHJlcXVlc3Qub3BlbihcIkdFVFwiLCBlbnRyeS51cmwsIHRydWUpO1xyXG4gICAgcmVxdWVzdC5yZXNwb25zZVR5cGUgPSBcImFycmF5YnVmZmVyXCI7XHJcblxyXG4gICAgdmFyIGlkID0gdGhpcy5hcHAubG9hZGVyLmFkZChlbnRyeS51cmwpO1xyXG5cclxuICAgIHJlcXVlc3Qub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICBzYW1wbGVyLmNvbnRleHQuZGVjb2RlQXVkaW9EYXRhKHRoaXMucmVzcG9uc2UsIGZ1bmN0aW9uKGRlY29kZWRCdWZmZXIpIHtcclxuICAgICAgICBzYW1wbGVyLmJ1ZmZlcnNbZW50cnkua2V5XSA9IGRlY29kZWRCdWZmZXI7XHJcbiAgICAgICAgc2FtcGxlci5hcHAubG9hZGVyLnN1Y2Nlc3MoZW50cnkudXJsKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJlcXVlc3Quc2VuZCgpO1xyXG5cclxuICB9LFxyXG5cclxuICBjbGVhbkFycmF5OiBmdW5jdGlvbihhcnJheSwgcHJvcGVydHkpIHtcclxuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBhcnJheS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICBpZiAoYXJyYXlbaV0gPT09IG51bGwgfHwgKHByb3BlcnR5ICYmIGFycmF5W2ldW3Byb3BlcnR5XSkpIHtcclxuICAgICAgICBhcnJheS5zcGxpY2UoaS0tLCAxKTtcclxuICAgICAgICBsZW4tLTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIHNldE1hc3RlclBvc2l0aW9uOiBmdW5jdGlvbih4LCB5LCB6KSB7XHJcblxyXG4gICAgdGhpcy5tYXN0ZXJQb3NpdGlvbiA9IHtcclxuICAgICAgeDogeCxcclxuICAgICAgeTogeSxcclxuICAgICAgejogelxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmNvbnRleHQubGlzdGVuZXIuc2V0UG9zaXRpb24oeCwgeSwgeilcclxuICAgICAgLy8gdGhpcy5jb250ZXh0Lmxpc3RlbmVyLnNldE9yaWVudGF0aW9uKDAsIDAsIC0xLCAwLCAxLCAwKTtcclxuICAgICAgLy8gdGhpcy5jb250ZXh0Lmxpc3RlbmVyLmRvcHBsZXJGYWN0b3IgPSAxO1xyXG4gICAgICAvLyB0aGlzLmNvbnRleHQubGlzdGVuZXIuc3BlZWRPZlNvdW5kID0gMzQzLjM7XHJcbiAgfSxcclxuXHJcbiAgZ2V0U291bmRCdWZmZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgaWYgKCF0aGlzLnBvb2wubGVuZ3RoKSB7XHJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcclxuXHJcbiAgICAgICAgdmFyIGJ1ZmZlciwgZ2FpbiwgcGFubmVyO1xyXG5cclxuICAgICAgICB2YXIgbm9kZXMgPSBbXHJcbiAgICAgICAgICBidWZmZXIgPSB0aGlzLmNvbnRleHQuY3JlYXRlQnVmZmVyU291cmNlKCksXHJcbiAgICAgICAgICBnYWluID0gdGhpcy5jb250ZXh0LmNyZWF0ZUdhaW4oKSxcclxuICAgICAgICAgIHBhbm5lciA9IHRoaXMuY29udGV4dC5jcmVhdGVQYW5uZXIoKVxyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIHBhbm5lci5kaXN0YW5jZU1vZGVsID0gXCJsaW5lYXJcIjtcclxuXHJcbiAgICAgICAgLy8gMSAtIHJvbGxvZmZGYWN0b3IgKiAoZGlzdGFuY2UgLSByZWZEaXN0YW5jZSkgLyAobWF4RGlzdGFuY2UgLSByZWZEaXN0YW5jZSlcclxuICAgICAgICAvLyByZWZEaXN0YW5jZSAvIChyZWZEaXN0YW5jZSArIHJvbGxvZmZGYWN0b3IgKiAoZGlzdGFuY2UgLSByZWZEaXN0YW5jZSkpXHJcbiAgICAgICAgcGFubmVyLnJlZkRpc3RhbmNlID0gMTtcclxuICAgICAgICBwYW5uZXIubWF4RGlzdGFuY2UgPSA2MDA7XHJcbiAgICAgICAgcGFubmVyLnJvbGxvZmZGYWN0b3IgPSAxLjA7XHJcblxyXG5cclxuICAgICAgICAvLyBwYW5uZXIuc2V0T3JpZW50YXRpb24oLTEsIC0xLCAwKTtcclxuXHJcbiAgICAgICAgdGhpcy5wb29sLnB1c2gobm9kZXMpO1xyXG5cclxuICAgICAgICBub2Rlc1swXS5jb25uZWN0KG5vZGVzWzFdKTtcclxuICAgICAgICAvLyBub2Rlc1sxXS5jb25uZWN0KG5vZGVzWzJdKTtcclxuICAgICAgICBub2Rlc1sxXS5jb25uZWN0KHRoaXMub3V0cHV0KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLnBvb2wucG9wKCk7XHJcbiAgfSxcclxuXHJcbiAgcGxheTogZnVuY3Rpb24obmFtZSwgbG9vcCkge1xyXG5cclxuICAgIHZhciBhbGlhcyA9IHRoaXMuYWxpYXNlc1tuYW1lXTtcclxuXHJcbiAgICB2YXIgbm9kZXMgPSB0aGlzLmdldFNvdW5kQnVmZmVyKCk7XHJcblxyXG4gICAgaWYgKGFsaWFzKSBuYW1lID0gYWxpYXMuc291cmNlO1xyXG5cclxuICAgIGJ1ZmZlclNvdXJjZSA9IG5vZGVzWzBdO1xyXG4gICAgYnVmZmVyU291cmNlLmdhaW5Ob2RlID0gbm9kZXNbMV07XHJcbiAgICBidWZmZXJTb3VyY2UucGFubmVyTm9kZSA9IG5vZGVzWzJdO1xyXG4gICAgYnVmZmVyU291cmNlLmJ1ZmZlciA9IHRoaXMuYnVmZmVyc1tuYW1lXTtcclxuICAgIGJ1ZmZlclNvdXJjZS5sb29wID0gbG9vcCB8fCBmYWxzZTtcclxuICAgIGJ1ZmZlclNvdXJjZS5rZXkgPSBuYW1lO1xyXG5cclxuICAgIGJ1ZmZlclNvdXJjZS5hbGlhcyA9IGFsaWFzO1xyXG5cclxuICAgIHRoaXMuc2V0Vm9sdW1lKGJ1ZmZlclNvdXJjZSwgMS4wKTtcclxuICAgIHRoaXMuc2V0UGxheWJhY2tSYXRlKGJ1ZmZlclNvdXJjZSwgMS4wKTtcclxuXHJcbiAgICBpZiAodGhpcy5sb29wKSB7XHJcbiAgICAgIC8vICBidWZmZXJTb3VyY2UubG9vcFN0YXJ0ID0gdGhpcy5sb29wU3RhcnQ7XHJcbiAgICAgIC8vIGJ1ZmZlclNvdXJjZS5sb29wRW5kID0gdGhpcy5sb29wRW5kO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBidWZmZXJTb3VyY2Uuc3RhcnQoMCk7XHJcblxyXG4gICAgYnVmZmVyU291cmNlLnZvbHVtZUxpbWl0ID0gMTtcclxuXHJcbiAgICB0aGlzLnNldFBvc2l0aW9uKGJ1ZmZlclNvdXJjZSwgdGhpcy5tYXN0ZXJQb3NpdGlvbi54LCB0aGlzLm1hc3RlclBvc2l0aW9uLnksIHRoaXMubWFzdGVyUG9zaXRpb24ueik7XHJcblxyXG4gICAgcmV0dXJuIGJ1ZmZlclNvdXJjZTtcclxuICB9LFxyXG5cclxuICBzdG9wOiBmdW5jdGlvbih3aGF0KSB7XHJcblxyXG4gICAgaWYgKCF3aGF0KSByZXR1cm47XHJcblxyXG4gICAgd2hhdC5zdG9wKDApO1xyXG5cclxuICB9LFxyXG5cclxuICBzZXRQbGF5YmFja1JhdGU6IGZ1bmN0aW9uKHNvdW5kLCByYXRlKSB7XHJcblxyXG4gICAgaWYgKCFzb3VuZCkgcmV0dXJuO1xyXG5cclxuICAgIGlmIChzb3VuZC5hbGlhcykgcmF0ZSAqPSBzb3VuZC5hbGlhcy5yYXRlO1xyXG5cclxuICAgIHJldHVybiBzb3VuZC5wbGF5YmFja1JhdGUudmFsdWUgPSByYXRlO1xyXG4gIH0sXHJcblxyXG4gIHNldFBvc2l0aW9uOiBmdW5jdGlvbihzb3VuZCwgeCwgeSwgeikge1xyXG5cclxuICAgIGlmICghc291bmQpIHJldHVybjtcclxuXHJcbiAgICBzb3VuZC5wYW5uZXJOb2RlLnNldFBvc2l0aW9uKHgsIHkgfHwgMCwgeiB8fCAwKTtcclxuICB9LFxyXG5cclxuICBzZXRWZWxvY2l0eTogZnVuY3Rpb24oc291bmQsIHgsIHksIHopIHtcclxuXHJcbiAgICBpZiAoIXNvdW5kKSByZXR1cm47XHJcblxyXG4gICAgc291bmQucGFubmVyTm9kZS5zZXRQb3NpdGlvbih4LCB5IHx8IDAsIHogfHwgMCk7XHJcblxyXG4gIH0sXHJcblxyXG4gIGdldFZvbHVtZTogZnVuY3Rpb24oc291bmQpIHtcclxuXHJcbiAgICBpZiAoIXNvdW5kKSByZXR1cm47XHJcblxyXG4gICAgcmV0dXJuIHNvdW5kLmdhaW5Ob2RlLmdhaW4udmFsdWU7XHJcblxyXG4gIH0sXHJcblxyXG4gIHNldFZvbHVtZTogZnVuY3Rpb24oc291bmQsIHZvbHVtZSkge1xyXG5cclxuICAgIGlmICghc291bmQpIHJldHVybjtcclxuXHJcbiAgICBpZiAoc291bmQuYWxpYXMpIHZvbHVtZSAqPSBzb3VuZC5hbGlhcy52b2x1bWU7XHJcblxyXG4gICAgcmV0dXJuIHNvdW5kLmdhaW5Ob2RlLmdhaW4udmFsdWUgPSBNYXRoLm1heCgwLCB2b2x1bWUpO1xyXG4gIH0sXHJcblxyXG4gIGZhZGVPdXQ6IGZ1bmN0aW9uKHNvdW5kKSB7XHJcblxyXG4gICAgaWYgKCFzb3VuZCkgcmV0dXJuO1xyXG5cclxuICAgIHNvdW5kLmZhZGVPdXQgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMubG9vcHMucHVzaChzb3VuZCk7XHJcblxyXG4gICAgcmV0dXJuIHNvdW5kO1xyXG5cclxuICB9LFxyXG5cclxuICBmYWRlSW46IGZ1bmN0aW9uKHNvdW5kKSB7XHJcblxyXG4gICAgaWYgKCFzb3VuZCkgcmV0dXJuO1xyXG5cclxuICAgIHNvdW5kLmZhZGVJbiA9IHRydWU7XHJcblxyXG4gICAgdGhpcy5sb29wcy5wdXNoKHNvdW5kKTtcclxuICAgIHRoaXMuc2V0Vm9sdW1lKHNvdW5kLCAwKTtcclxuXHJcblxyXG4gICAgcmV0dXJuIHNvdW5kO1xyXG5cclxuICB9LFxyXG5cclxuICBzdGVwOiBmdW5jdGlvbihkZWx0YSkge1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sb29wcy5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgdmFyIGxvb3AgPSB0aGlzLmxvb3BzW2ldO1xyXG5cclxuICAgICAgaWYgKGxvb3AuZmFkZUluKSB7XHJcbiAgICAgICAgdmFyIHZvbHVtZSA9IHRoaXMuZ2V0Vm9sdW1lKGxvb3ApO1xyXG4gICAgICAgIHZvbHVtZSA9IHRoaXMuc2V0Vm9sdW1lKGxvb3AsIE1hdGgubWluKDEuMCwgdm9sdW1lICsgZGVsdGEgKiAwLjUpKTtcclxuXHJcbiAgICAgICAgaWYgKHZvbHVtZSA+PSAxLjApIHtcclxuICAgICAgICAgIHRoaXMubG9vcHMuc3BsaWNlKGktLSwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAobG9vcC5mYWRlT3V0KSB7XHJcbiAgICAgICAgdmFyIHZvbHVtZSA9IHRoaXMuZ2V0Vm9sdW1lKGxvb3ApO1xyXG4gICAgICAgIHZvbHVtZSA9IHRoaXMuc2V0Vm9sdW1lKGxvb3AsIE1hdGgubWluKDEuMCwgdm9sdW1lIC0gZGVsdGEgKiAwLjUpKTtcclxuXHJcbiAgICAgICAgaWYgKHZvbHVtZSA8PSAwKSB7XHJcbiAgICAgICAgICB0aGlzLmxvb3BzLnNwbGljZShpLS0sIDEpO1xyXG4gICAgICAgICAgdGhpcy5zdG9wKGxvb3ApO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxufTtcclxuXHJcbi8qIGZpbGU6IHNyYy9Tb3VuZEF1ZGlvLmpzICovXHJcblxyXG5QTEFZR1JPVU5ELlNvdW5kQXVkaW8gPSBmdW5jdGlvbihhcHApIHtcclxuXHJcbiAgdGhpcy5hcHAgPSBhcHA7XHJcblxyXG4gIHZhciBjYW5QbGF5TXAzID0gKG5ldyBBdWRpbykuY2FuUGxheVR5cGUoXCJhdWRpby9tcDNcIik7XHJcbiAgdmFyIGNhblBsYXlPZ2cgPSAobmV3IEF1ZGlvKS5jYW5QbGF5VHlwZSgnYXVkaW8vb2dnOyBjb2RlY3M9XCJ2b3JiaXNcIicpO1xyXG5cclxuICBpZiAodGhpcy5hcHAucHJlZmVyZWRBdWRpb0Zvcm1hdCA9PT0gXCJtcDNcIikge1xyXG5cclxuICAgIGlmIChjYW5QbGF5TXAzKSB0aGlzLmF1ZGlvRm9ybWF0ID0gXCJtcDNcIjtcclxuICAgIGVsc2UgdGhpcy5hdWRpb0Zvcm1hdCA9IFwib2dnXCI7XHJcblxyXG4gIH0gZWxzZSB7XHJcblxyXG4gICAgaWYgKGNhblBsYXlPZ2cpIHRoaXMuYXVkaW9Gb3JtYXQgPSBcIm9nZ1wiO1xyXG4gICAgZWxzZSB0aGlzLmF1ZGlvRm9ybWF0ID0gXCJtcDNcIjtcclxuXHJcbiAgfVxyXG5cclxufTtcclxuXHJcblBMQVlHUk9VTkQuU291bmRBdWRpby5wcm90b3R5cGUgPSB7XHJcblxyXG4gIHNhbXBsZXM6IHt9LFxyXG5cclxuICBzZXRNYXN0ZXI6IGZ1bmN0aW9uKHZvbHVtZSkge1xyXG5cclxuICAgIHRoaXMudm9sdW1lID0gdm9sdW1lO1xyXG5cclxuICB9LFxyXG5cclxuICBzZXRNYXN0ZXJQb3NpdGlvbjogZnVuY3Rpb24oKSB7XHJcblxyXG4gIH0sXHJcblxyXG4gIHNldFBvc2l0aW9uOiBmdW5jdGlvbih4LCB5LCB6KSB7XHJcbiAgICByZXR1cm47XHJcbiAgfSxcclxuXHJcbiAgbG9hZDogZnVuY3Rpb24oZmlsZSkge1xyXG5cclxuICAgIHZhciB1cmwgPSBcInNvdW5kcy9cIiArIGZpbGUgKyBcIi5cIiArIHRoaXMuYXVkaW9Gb3JtYXQ7XHJcblxyXG4gICAgdmFyIGxvYWRlciA9IHRoaXMuYXBwLmxvYWRlcjtcclxuXHJcbiAgICB0aGlzLmFwcC5sb2FkZXIuYWRkKHVybCk7XHJcblxyXG4gICAgdmFyIGF1ZGlvID0gdGhpcy5zYW1wbGVzW2ZpbGVdID0gbmV3IEF1ZGlvO1xyXG5cclxuICAgIGF1ZGlvLmFkZEV2ZW50TGlzdGVuZXIoXCJjYW5wbGF5XCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICBsb2FkZXIuc3VjY2Vzcyh1cmwpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgYXVkaW8uYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICBsb2FkZXIuZXJyb3IodXJsKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGF1ZGlvLnNyYyA9IHVybDtcclxuXHJcbiAgfSxcclxuXHJcbiAgcGxheTogZnVuY3Rpb24oa2V5LCBsb29wKSB7XHJcblxyXG4gICAgdmFyIHNvdW5kID0gdGhpcy5zYW1wbGVzW2tleV07XHJcblxyXG4gICAgc291bmQuY3VycmVudFRpbWUgPSAwO1xyXG4gICAgc291bmQubG9vcCA9IGxvb3A7XHJcbiAgICBzb3VuZC5wbGF5KCk7XHJcblxyXG4gICAgcmV0dXJuIHNvdW5kO1xyXG5cclxuICB9LFxyXG5cclxuICBzdG9wOiBmdW5jdGlvbih3aGF0KSB7XHJcblxyXG4gICAgaWYgKCF3aGF0KSByZXR1cm47XHJcblxyXG4gICAgd2hhdC5wYXVzZSgpO1xyXG5cclxuICB9LFxyXG5cclxuICBzdGVwOiBmdW5jdGlvbihkZWx0YSkge1xyXG5cclxuICB9LFxyXG5cclxuICBzZXRQbGF5YmFja1JhdGU6IGZ1bmN0aW9uKHNvdW5kLCByYXRlKSB7XHJcblxyXG4gICAgcmV0dXJuO1xyXG4gIH0sXHJcblxyXG4gIHNldFZvbHVtZTogZnVuY3Rpb24oc291bmQsIHZvbHVtZSkge1xyXG5cclxuICAgIHNvdW5kLnZvbHVtZSA9IHZvbHVtZSAqIHRoaXMudm9sdW1lO1xyXG5cclxuICB9LFxyXG5cclxuICBzZXRQb3NpdGlvbjogZnVuY3Rpb24oKSB7XHJcblxyXG4gIH1cclxuXHJcbn07XHJcblxyXG4vKiBmaWxlOiBzcmMvVG91Y2guanMgKi9cclxuXHJcblBMQVlHUk9VTkQuVG91Y2ggPSBmdW5jdGlvbihhcHAsIGVsZW1lbnQpIHtcclxuXHJcbiAgUExBWUdST1VORC5FdmVudHMuY2FsbCh0aGlzKTtcclxuXHJcbiAgdGhpcy5hcHAgPSBhcHA7XHJcblxyXG4gIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XHJcblxyXG4gIHRoaXMuYnV0dG9ucyA9IHt9O1xyXG5cclxuICB0aGlzLnRvdWNoZXMgPSB7fTtcclxuXHJcbiAgdGhpcy54ID0gMDtcclxuICB0aGlzLnkgPSAwO1xyXG5cclxuICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgdGhpcy50b3VjaG1vdmUuYmluZCh0aGlzKSk7XHJcbiAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCB0aGlzLnRvdWNoc3RhcnQuYmluZCh0aGlzKSk7XHJcbiAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgdGhpcy50b3VjaGVuZC5iaW5kKHRoaXMpKTtcclxuXHJcbn07XHJcblxyXG5QTEFZR1JPVU5ELlRvdWNoLnByb3RvdHlwZSA9IHtcclxuXHJcbiAgZ2V0RWxlbWVudE9mZnNldDogZnVuY3Rpb24oZWxlbWVudCkge1xyXG5cclxuICAgIHZhciBvZmZzZXRYID0gMDtcclxuICAgIHZhciBvZmZzZXRZID0gMDtcclxuXHJcbiAgICBkbyB7XHJcbiAgICAgIG9mZnNldFggKz0gZWxlbWVudC5vZmZzZXRMZWZ0O1xyXG4gICAgICBvZmZzZXRZICs9IGVsZW1lbnQub2Zmc2V0VG9wO1xyXG4gICAgfVxyXG5cclxuICAgIHdoaWxlICgoZWxlbWVudCA9IGVsZW1lbnQub2Zmc2V0UGFyZW50KSk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgeDogb2Zmc2V0WCxcclxuICAgICAgeTogb2Zmc2V0WVxyXG4gICAgfTtcclxuXHJcbiAgfSxcclxuXHJcbiAgaGFuZGxlUmVzaXplOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB0aGlzLmVsZW1lbnRPZmZzZXQgPSB0aGlzLmdldEVsZW1lbnRPZmZzZXQodGhpcy5lbGVtZW50KTtcclxuXHJcbiAgfSxcclxuXHJcbiAgdG91Y2htb3ZlOiBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlLmNoYW5nZWRUb3VjaGVzLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICB2YXIgdG91Y2ggPSBlLmNoYW5nZWRUb3VjaGVzW2ldO1xyXG5cclxuICAgICAgdG91Y2htb3ZlRXZlbnQgPSB7fVxyXG5cclxuICAgICAgdGhpcy54ID0gdG91Y2htb3ZlRXZlbnQueCA9ICh0b3VjaC5wYWdlWCAtIHRoaXMuZWxlbWVudE9mZnNldC54IC0gdGhpcy5hcHAub2Zmc2V0WCkgLyB0aGlzLmFwcC5zY2FsZSB8IDA7XHJcbiAgICAgIHRoaXMueSA9IHRvdWNobW92ZUV2ZW50LnkgPSAodG91Y2gucGFnZVkgLSB0aGlzLmVsZW1lbnRPZmZzZXQueSAtIHRoaXMuYXBwLm9mZnNldFkpIC8gdGhpcy5hcHAuc2NhbGUgfCAwO1xyXG5cclxuICAgICAgdG91Y2htb3ZlRXZlbnQub3JpZ2luYWwgPSB0b3VjaDtcclxuICAgICAgdG91Y2htb3ZlRXZlbnQuaWQgPSB0b3VjaG1vdmVFdmVudC5pZGVudGlmaWVyID0gdG91Y2guaWRlbnRpZmllcjtcclxuXHJcbiAgICAgIHRoaXMudG91Y2hlc1t0b3VjaC5pZGVudGlmaWVyXS54ID0gdG91Y2htb3ZlRXZlbnQueDtcclxuICAgICAgdGhpcy50b3VjaGVzW3RvdWNoLmlkZW50aWZpZXJdLnkgPSB0b3VjaG1vdmVFdmVudC55O1xyXG5cclxuICAgICAgdGhpcy50cmlnZ2VyKFwidG91Y2htb3ZlXCIsIHRvdWNobW92ZUV2ZW50KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICB9LFxyXG5cclxuICB0b3VjaHN0YXJ0OiBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlLmNoYW5nZWRUb3VjaGVzLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICB2YXIgdG91Y2ggPSBlLmNoYW5nZWRUb3VjaGVzW2ldO1xyXG5cclxuICAgICAgdmFyIHRvdWNoc3RhcnRFdmVudCA9IHt9XHJcblxyXG4gICAgICB0aGlzLnggPSB0b3VjaHN0YXJ0RXZlbnQueCA9ICh0b3VjaC5wYWdlWCAtIHRoaXMuZWxlbWVudE9mZnNldC54IC0gdGhpcy5hcHAub2Zmc2V0WCkgLyB0aGlzLmFwcC5zY2FsZSB8IDA7XHJcbiAgICAgIHRoaXMueSA9IHRvdWNoc3RhcnRFdmVudC55ID0gKHRvdWNoLnBhZ2VZIC0gdGhpcy5lbGVtZW50T2Zmc2V0LnkgLSB0aGlzLmFwcC5vZmZzZXRZKSAvIHRoaXMuYXBwLnNjYWxlIHwgMDtcclxuXHJcbiAgICAgIHRvdWNoc3RhcnRFdmVudC5vcmlnaW5hbCA9IGUudG91Y2g7XHJcbiAgICAgIHRvdWNoc3RhcnRFdmVudC5pZCA9IHRvdWNoc3RhcnRFdmVudC5pZGVudGlmaWVyID0gdG91Y2guaWRlbnRpZmllcjtcclxuXHJcbiAgICAgIHRoaXMudG91Y2hlc1t0b3VjaC5pZGVudGlmaWVyXSA9IHtcclxuICAgICAgICB4OiB0b3VjaHN0YXJ0RXZlbnQueCxcclxuICAgICAgICB5OiB0b3VjaHN0YXJ0RXZlbnQueVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgdGhpcy50cmlnZ2VyKFwidG91Y2hzdGFydFwiLCB0b3VjaHN0YXJ0RXZlbnQpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gIH0sXHJcblxyXG4gIHRvdWNoZW5kOiBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlLmNoYW5nZWRUb3VjaGVzLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICB2YXIgdG91Y2ggPSBlLmNoYW5nZWRUb3VjaGVzW2ldO1xyXG4gICAgICB2YXIgdG91Y2hlbmRFdmVudCA9IHt9O1xyXG5cclxuICAgICAgdG91Y2hlbmRFdmVudC54ID0gKHRvdWNoLnBhZ2VYIC0gdGhpcy5lbGVtZW50T2Zmc2V0LnggLSB0aGlzLmFwcC5vZmZzZXRYKSAvIHRoaXMuYXBwLnNjYWxlIHwgMDtcclxuICAgICAgdG91Y2hlbmRFdmVudC55ID0gKHRvdWNoLnBhZ2VZIC0gdGhpcy5lbGVtZW50T2Zmc2V0LnkgLSB0aGlzLmFwcC5vZmZzZXRZKSAvIHRoaXMuYXBwLnNjYWxlIHwgMDtcclxuXHJcbiAgICAgIHRvdWNoZW5kRXZlbnQub3JpZ2luYWwgPSB0b3VjaDtcclxuICAgICAgdG91Y2hlbmRFdmVudC5pZCA9IHRvdWNoZW5kRXZlbnQuaWRlbnRpZmllciA9IHRvdWNoLmlkZW50aWZpZXI7XHJcblxyXG4gICAgICBkZWxldGUgdGhpcy50b3VjaGVzW3RvdWNoLmlkZW50aWZpZXJdO1xyXG5cclxuICAgICAgdGhpcy50cmlnZ2VyKFwidG91Y2hlbmRcIiwgdG91Y2hlbmRFdmVudCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgfVxyXG5cclxufTtcclxuXHJcblBMQVlHUk9VTkQuVXRpbHMuZXh0ZW5kKFBMQVlHUk9VTkQuVG91Y2gucHJvdG90eXBlLCBQTEFZR1JPVU5ELkV2ZW50cy5wcm90b3R5cGUpO1xyXG5cclxuLyogZmlsZTogc3JjL1R3ZWVuLmpzICovXHJcblxyXG5QTEFZR1JPVU5ELlR3ZWVuID0gZnVuY3Rpb24obWFuYWdlciwgY29udGV4dCkge1xyXG5cclxuICBQTEFZR1JPVU5ELkV2ZW50cy5jYWxsKHRoaXMpO1xyXG5cclxuICB0aGlzLm1hbmFnZXIgPSBtYW5hZ2VyO1xyXG4gIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XHJcblxyXG4gIFBMQVlHUk9VTkQuVXRpbHMuZXh0ZW5kKHRoaXMsIHtcclxuXHJcbiAgICBhY3Rpb25zOiBbXSxcclxuICAgIGluZGV4OiAtMSxcclxuXHJcbiAgICBwcmV2RWFzaW5nOiBcIjA0NVwiLFxyXG4gICAgcHJldkR1cmF0aW9uOiAwLjVcclxuXHJcbiAgfSk7XHJcblxyXG4gIHRoaXMuY3VycmVudCA9IGZhbHNlO1xyXG5cclxufTtcclxuXHJcblBMQVlHUk9VTkQuVHdlZW4ucHJvdG90eXBlID0ge1xyXG5cclxuICBhZGQ6IGZ1bmN0aW9uKHByb3BlcnRpZXMsIGR1cmF0aW9uLCBlYXNpbmcpIHtcclxuXHJcbiAgICBpZiAoZHVyYXRpb24pIHRoaXMucHJldkR1cmF0aW9uID0gZHVyYXRpb247XHJcbiAgICBlbHNlIGR1cmF0aW9uID0gMC41O1xyXG4gICAgaWYgKGVhc2luZykgdGhpcy5wcmV2RWFzaW5nID0gZWFzaW5nO1xyXG4gICAgZWxzZSBlYXNpbmcgPSBcIjA0NVwiO1xyXG5cclxuICAgIHRoaXMuYWN0aW9ucy5wdXNoKFtwcm9wZXJ0aWVzLCBkdXJhdGlvbiwgZWFzaW5nXSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gIH0sXHJcblxyXG4gIGRpc2NhcmQ6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHRoaXMubWFuYWdlci5kaXNjYXJkKHRoaXMuY29udGV4dCwgdGhpcyk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gIH0sXHJcblxyXG4gIHRvOiBmdW5jdGlvbihwcm9wZXJ0aWVzLCBkdXJhdGlvbiwgZWFzaW5nKSB7XHJcbiAgICByZXR1cm4gdGhpcy5hZGQocHJvcGVydGllcywgZHVyYXRpb24sIGVhc2luZyk7XHJcbiAgfSxcclxuXHJcbiAgbG9vcDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdGhpcy5sb29wZWQgPSB0cnVlO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG5cclxuICB9LFxyXG5cclxuICByZXBlYXQ6IGZ1bmN0aW9uKHRpbWVzKSB7XHJcblxyXG4gICAgdGhpcy5hY3Rpb25zLnB1c2goW1wicmVwZWF0XCIsIHRpbWVzXSk7XHJcblxyXG4gIH0sXHJcblxyXG4gIHdhaXQ6IGZ1bmN0aW9uKHRpbWUpIHtcclxuXHJcbiAgICB0aGlzLmFjdGlvbnMucHVzaChbXCJ3YWl0XCIsIHRpbWVdKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgfSxcclxuXHJcbiAgZGVsYXk6IGZ1bmN0aW9uKHRpbWUpIHtcclxuXHJcbiAgICB0aGlzLmFjdGlvbnMucHVzaChbXCJ3YWl0XCIsIHRpbWVdKTtcclxuXHJcbiAgfSxcclxuXHJcbiAgc3RvcDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdGhpcy5tYW5hZ2VyLnJlbW92ZSh0aGlzKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgfSxcclxuXHJcbiAgcGxheTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdGhpcy5tYW5hZ2VyLmFkZCh0aGlzKTtcclxuXHJcbiAgICB0aGlzLmZpbmlzaGVkID0gZmFsc2U7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gIH0sXHJcblxyXG5cclxuICBlbmQ6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHZhciBsYXN0QW5pbWF0aW9uSW5kZXggPSAwO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSB0aGlzLmluZGV4ICsgMTsgaSA8IHRoaXMuYWN0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAodHlwZW9mIHRoaXMuYWN0aW9uc1tpXVswXSA9PT0gXCJvYmplY3RcIikgbGFzdEFuaW1hdGlvbkluZGV4ID0gaTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmluZGV4ID0gbGFzdEFuaW1hdGlvbkluZGV4IC0gMTtcclxuICAgIHRoaXMubmV4dCgpO1xyXG4gICAgdGhpcy5kZWx0YSA9IHRoaXMuZHVyYXRpb247XHJcbiAgICB0aGlzLnN0ZXAoMCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gIH0sXHJcblxyXG4gIGZvcndhcmQ6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHRoaXMuZGVsdGEgPSB0aGlzLmR1cmF0aW9uO1xyXG4gICAgdGhpcy5zdGVwKDApO1xyXG5cclxuICB9LFxyXG5cclxuICByZXdpbmQ6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHRoaXMuZGVsdGEgPSAwO1xyXG4gICAgdGhpcy5zdGVwKDApO1xyXG5cclxuICB9LFxyXG5cclxuICBuZXh0OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB0aGlzLmRlbHRhID0gMDtcclxuXHJcbiAgICB0aGlzLmluZGV4Kys7XHJcblxyXG4gICAgaWYgKHRoaXMuaW5kZXggPj0gdGhpcy5hY3Rpb25zLmxlbmd0aCkge1xyXG5cclxuICAgICAgaWYgKHRoaXMubG9vcGVkKSB7XHJcblxyXG4gICAgICAgIHRoaXMudHJpZ2dlcihcImxvb3BcIiwge1xyXG4gICAgICAgICAgdHdlZW46IHRoaXNcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5pbmRleCA9IDA7XHJcbiAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgIHRoaXMudHJpZ2dlcihcImZpbmlzaGVkXCIsIHtcclxuICAgICAgICAgIHR3ZWVuOiB0aGlzXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuZmluaXNoZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubWFuYWdlci5yZW1vdmUodGhpcyk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jdXJyZW50ID0gdGhpcy5hY3Rpb25zW3RoaXMuaW5kZXhdO1xyXG5cclxuICAgIGlmICh0aGlzLmN1cnJlbnRbMF0gPT09IFwid2FpdFwiKSB7XHJcblxyXG4gICAgICB0aGlzLmR1cmF0aW9uID0gdGhpcy5jdXJyZW50WzFdO1xyXG4gICAgICB0aGlzLmN1cnJlbnRBY3Rpb24gPSBcIndhaXRcIjtcclxuXHJcbiAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgLyogY2FsY3VsYXRlIGNoYW5nZXMgKi9cclxuXHJcbiAgICAgIHZhciBwcm9wZXJ0aWVzID0gdGhpcy5jdXJyZW50WzBdO1xyXG5cclxuICAgICAgLyoga2VlcCBrZXlzIGFzIGFycmF5IGZvciAwLjAwMDElIHBlcmZvcm1hbmNlIGJvb3N0ICovXHJcblxyXG4gICAgICB0aGlzLmtleXMgPSBPYmplY3Qua2V5cyhwcm9wZXJ0aWVzKTtcclxuXHJcbiAgICAgIHRoaXMuY2hhbmdlID0gW107XHJcbiAgICAgIHRoaXMuYmVmb3JlID0gW107XHJcbiAgICAgIHRoaXMudHlwZXMgPSBbXTtcclxuXHJcbiAgICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLmtleXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIga2V5ID0gdGhpcy5rZXlzW2ldO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuY29udGV4dFtrZXldID09PSBcIm51bWJlclwiKSB7XHJcbiAgICAgICAgICB0aGlzLmJlZm9yZS5wdXNoKHRoaXMuY29udGV4dFtrZXldKTtcclxuICAgICAgICAgIHRoaXMuY2hhbmdlLnB1c2gocHJvcGVydGllc1trZXldIC0gdGhpcy5jb250ZXh0W2tleV0pO1xyXG4gICAgICAgICAgdGhpcy50eXBlcy5wdXNoKDApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB2YXIgYmVmb3JlID0gY3EuY29sb3IodGhpcy5jb250ZXh0W2tleV0pO1xyXG5cclxuICAgICAgICAgIHRoaXMuYmVmb3JlLnB1c2goYmVmb3JlKTtcclxuXHJcbiAgICAgICAgICB2YXIgYWZ0ZXIgPSBjcS5jb2xvcihwcm9wZXJ0aWVzW2tleV0pO1xyXG5cclxuICAgICAgICAgIHZhciB0ZW1wID0gW107XHJcblxyXG4gICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCAzOyBqKyspIHtcclxuICAgICAgICAgICAgdGVtcC5wdXNoKGFmdGVyW2pdIC0gYmVmb3JlW2pdKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB0aGlzLmNoYW5nZS5wdXNoKHRlbXApO1xyXG5cclxuICAgICAgICAgIHRoaXMudHlwZXMucHVzaCgxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLmN1cnJlbnRBY3Rpb24gPSBcImFuaW1hdGVcIjtcclxuXHJcbiAgICAgIHRoaXMuZHVyYXRpb24gPSB0aGlzLmN1cnJlbnRbMV07XHJcbiAgICAgIHRoaXMuZWFzaW5nID0gdGhpcy5jdXJyZW50WzJdO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gIH0sXHJcblxyXG4gIHByZXY6IGZ1bmN0aW9uKCkge1xyXG5cclxuICB9LFxyXG5cclxuICBzdGVwOiBmdW5jdGlvbihkZWx0YSkge1xyXG5cclxuICAgIHRoaXMuZGVsdGEgKz0gZGVsdGE7XHJcblxyXG4gICAgaWYgKCF0aGlzLmN1cnJlbnQpIHRoaXMubmV4dCgpO1xyXG5cclxuICAgIHN3aXRjaCAodGhpcy5jdXJyZW50QWN0aW9uKSB7XHJcblxyXG4gICAgICBjYXNlIFwiYW5pbWF0ZVwiOlxyXG4gICAgICAgIHRoaXMuZG9BbmltYXRlKGRlbHRhKTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgXCJ3YWl0XCI6XHJcbiAgICAgICAgdGhpcy5kb1dhaXQoZGVsdGEpO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5vbnN0ZXApIHRoaXMub25zdGVwKHRoaXMuY29udGV4dCk7XHJcblxyXG4gIH0sXHJcblxyXG4gIGRvQW5pbWF0ZTogZnVuY3Rpb24oZGVsdGEpIHtcclxuXHJcbiAgICB0aGlzLnByb2dyZXNzID0gTWF0aC5taW4oMSwgdGhpcy5kZWx0YSAvIHRoaXMuZHVyYXRpb24pO1xyXG5cclxuICAgIHZhciBtb2QgPSBQTEFZR1JPVU5ELlV0aWxzLmVhc2UodGhpcy5wcm9ncmVzcywgdGhpcy5lYXNpbmcpO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5rZXlzLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICB2YXIga2V5ID0gdGhpcy5rZXlzW2ldO1xyXG5cclxuICAgICAgc3dpdGNoICh0aGlzLnR5cGVzW2ldKSB7XHJcblxyXG4gICAgICAgIC8qIG51bWJlciAqL1xyXG5cclxuICAgICAgICBjYXNlIDA6XHJcblxyXG4gICAgICAgICAgdGhpcy5jb250ZXh0W2tleV0gPSB0aGlzLmJlZm9yZVtpXSArIHRoaXMuY2hhbmdlW2ldICogbW9kO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgIC8qIGNvbG9yICovXHJcblxyXG4gICAgICAgIGNhc2UgMTpcclxuXHJcbiAgICAgICAgICB2YXIgY2hhbmdlID0gdGhpcy5jaGFuZ2VbaV07XHJcbiAgICAgICAgICB2YXIgYmVmb3JlID0gdGhpcy5iZWZvcmVbaV07XHJcbiAgICAgICAgICB2YXIgY29sb3IgPSBbXTtcclxuXHJcbiAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IDM7IGorKykge1xyXG4gICAgICAgICAgICBjb2xvci5wdXNoKGJlZm9yZVtqXSArIGNoYW5nZVtqXSAqIG1vZCB8IDApO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHRoaXMuY29udGV4dFtrZXldID0gXCJyZ2IoXCIgKyBjb2xvci5qb2luKFwiLFwiKSArIFwiKVwiO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMucHJvZ3Jlc3MgPj0gMSkge1xyXG4gICAgICB0aGlzLm5leHQoKTtcclxuICAgIH1cclxuXHJcbiAgfSxcclxuXHJcbiAgZG9XYWl0OiBmdW5jdGlvbihkZWx0YSkge1xyXG5cclxuICAgIGlmICh0aGlzLmRlbHRhID49IHRoaXMuZHVyYXRpb24pIHRoaXMubmV4dCgpO1xyXG5cclxuICB9XHJcblxyXG59O1xyXG5cclxuUExBWUdST1VORC5VdGlscy5leHRlbmQoUExBWUdST1VORC5Ud2Vlbi5wcm90b3R5cGUsIFBMQVlHUk9VTkQuRXZlbnRzLnByb3RvdHlwZSk7XHJcblxyXG5QTEFZR1JPVU5ELlR3ZWVuTWFuYWdlciA9IGZ1bmN0aW9uKGFwcCkge1xyXG5cclxuICB0aGlzLnR3ZWVucyA9IFtdO1xyXG5cclxuICBpZiAoYXBwKSB7XHJcbiAgICB0aGlzLmFwcCA9IGFwcDtcclxuICAgIHRoaXMuYXBwLnR3ZWVuID0gdGhpcy50d2Vlbi5iaW5kKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgdGhpcy5kZWx0YSA9IDA7XHJcblxyXG4gIHRoaXMuYXBwLm9uKFwic3RlcFwiLCB0aGlzLnN0ZXAuYmluZCh0aGlzKSk7XHJcblxyXG59O1xyXG5cclxuUExBWUdST1VORC5Ud2Vlbk1hbmFnZXIucHJvdG90eXBlID0ge1xyXG5cclxuICBkZWZhdWx0RWFzaW5nOiBcIjEyOFwiLFxyXG5cclxuICBkaXNjYXJkOiBmdW5jdGlvbihvYmplY3QsIHNhZmUpIHtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMudHdlZW5zLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICB2YXIgdHdlZW4gPSB0aGlzLnR3ZWVuc1tpXTtcclxuXHJcbiAgICAgIGlmICh0d2Vlbi5jb250ZXh0ID09PSBvYmplY3QgJiYgdHdlZW4gIT09IHNhZmUpIHRoaXMucmVtb3ZlKHR3ZWVuKTtcclxuXHJcbiAgICB9XHJcblxyXG4gIH0sXHJcblxyXG4gIHR3ZWVuOiBmdW5jdGlvbihjb250ZXh0KSB7XHJcblxyXG4gICAgdmFyIHR3ZWVuID0gbmV3IFBMQVlHUk9VTkQuVHdlZW4odGhpcywgY29udGV4dCk7XHJcblxyXG4gICAgdGhpcy5hZGQodHdlZW4pO1xyXG5cclxuICAgIHJldHVybiB0d2VlbjtcclxuXHJcbiAgfSxcclxuXHJcbiAgc3RlcDogZnVuY3Rpb24oZGVsdGEpIHtcclxuXHJcbiAgICB0aGlzLmRlbHRhICs9IGRlbHRhO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy50d2VlbnMubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgIHZhciB0d2VlbiA9IHRoaXMudHdlZW5zW2ldO1xyXG5cclxuICAgICAgaWYgKCF0d2Vlbi5fcmVtb3ZlKSB0d2Vlbi5zdGVwKGRlbHRhKTtcclxuXHJcbiAgICAgIGlmICh0d2Vlbi5fcmVtb3ZlKSB0aGlzLnR3ZWVucy5zcGxpY2UoaS0tLCAxKTtcclxuXHJcbiAgICB9XHJcblxyXG4gIH0sXHJcblxyXG4gIGFkZDogZnVuY3Rpb24odHdlZW4pIHtcclxuXHJcbiAgICB0d2Vlbi5fcmVtb3ZlID0gZmFsc2U7XHJcblxyXG4gICAgdmFyIGluZGV4ID0gdGhpcy50d2VlbnMuaW5kZXhPZih0d2Vlbik7XHJcblxyXG4gICAgaWYgKGluZGV4ID09PSAtMSkgdGhpcy50d2VlbnMucHVzaCh0d2Vlbik7XHJcblxyXG4gIH0sXHJcblxyXG4gIHJlbW92ZTogZnVuY3Rpb24odHdlZW4pIHtcclxuXHJcbiAgICB0d2Vlbi5fcmVtb3ZlID0gdHJ1ZTtcclxuXHJcbiAgfVxyXG5cclxufTtcclxuXHJcbi8qIGZpbGU6IHNyYy9BdGxhc2VzLmpzICovXHJcblxyXG5QTEFZR1JPVU5ELkFwcGxpY2F0aW9uLnByb3RvdHlwZS5sb2FkQXRsYXNlcyA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgIHZhciBhcmcgPSBhcmd1bWVudHNbaV07XHJcblxyXG4gICAgLyogcG9seW1vcnBoaXNtIGF0IGl0cyBmaW5lc3QgKi9cclxuXHJcbiAgICBpZiAodHlwZW9mIGFyZyA9PT0gXCJvYmplY3RcIikge1xyXG5cclxuICAgICAgZm9yICh2YXIga2V5IGluIGFyZykgdGhpcy5sb2FkQXRsYXNlcyhhcmdba2V5XSk7XHJcblxyXG4gICAgfSBlbHNlIHtcclxuXHJcbiAgICAgIC8qIGlmIGFyZ3VtZW50IGlzIG5vdCBhbiBvYmplY3QvYXJyYXkgbGV0J3MgdHJ5IHRvIGxvYWQgaXQgKi9cclxuXHJcbiAgICAgIHRoaXMuX2xvYWRBdGxhcyhhcmcpXHJcblxyXG4gICAgfVxyXG4gIH1cclxuXHJcbn07XHJcblxyXG5QTEFZR1JPVU5ELkFwcGxpY2F0aW9uLnByb3RvdHlwZS5sb2FkQXRsYXMgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgcmV0dXJuIHRoaXMubG9hZEF0bGFzZXMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuXHJcbn07XHJcblxyXG5QTEFZR1JPVU5ELkFwcGxpY2F0aW9uLnByb3RvdHlwZS5fbG9hZEF0bGFzID0gZnVuY3Rpb24oZmlsZW5hbWUpIHtcclxuXHJcbiAgdmFyIGVudHJ5ID0gdGhpcy5nZXRBc3NldEVudHJ5KGZpbGVuYW1lLCBcImF0bGFzZXNcIiwgXCJwbmdcIik7XHJcblxyXG4gIHRoaXMubG9hZGVyLmFkZChlbnRyeS51cmwpO1xyXG5cclxuICB2YXIgYXRsYXMgPSB0aGlzLmF0bGFzZXNbZW50cnkua2V5XSA9IHt9O1xyXG5cclxuICB2YXIgaW1hZ2UgPSBhdGxhcy5pbWFnZSA9IG5ldyBJbWFnZTtcclxuXHJcbiAgaW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICBsb2FkZXIuc3VjY2VzcyhlbnRyeS51cmwpO1xyXG4gIH0pO1xyXG5cclxuICBpbWFnZS5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICBsb2FkZXIuZXJyb3IoZW50cnkudXJsKTtcclxuICB9KTtcclxuXHJcbiAgaW1hZ2Uuc3JjID0gZW50cnkudXJsO1xyXG5cclxuICAvKiBkYXRhICovXHJcblxyXG4gIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcblxyXG4gIHJlcXVlc3Qub3BlbihcIkdFVFwiLCBlbnRyeS5wYXRoICsgXCIuanNvblwiLCB0cnVlKTtcclxuXHJcbiAgdGhpcy5sb2FkZXIuYWRkKGVudHJ5LnBhdGggKyBcIi5qc29uXCIpO1xyXG5cclxuICB2YXIgbG9hZGVyID0gdGhpcy5sb2FkZXI7XHJcblxyXG4gIHJlcXVlc3Qub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdmFyIGRhdGEgPSBKU09OLnBhcnNlKHRoaXMucmVzcG9uc2UpO1xyXG5cclxuICAgIGF0bGFzLmZyYW1lcyA9IFtdO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5mcmFtZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgdmFyIGZyYW1lID0gZGF0YS5mcmFtZXNbaV07XHJcblxyXG4gICAgICBhdGxhcy5mcmFtZXMucHVzaCh7XHJcbiAgICAgICAgcmVnaW9uOiBbZnJhbWUuZnJhbWUueCwgZnJhbWUuZnJhbWUueSwgZnJhbWUuZnJhbWUudywgZnJhbWUuZnJhbWUuaF0sXHJcbiAgICAgICAgb2Zmc2V0OiBbZnJhbWUuc3ByaXRlU291cmNlU2l6ZS54IHx8IDAsIGZyYW1lLnNwcml0ZVNvdXJjZVNpemUueSB8fCAwXSxcclxuICAgICAgICB3aWR0aDogZnJhbWUuc291cmNlU2l6ZS53LFxyXG4gICAgICAgIGhlaWdodDogZnJhbWUuc291cmNlU2l6ZS5oXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGxvYWRlci5zdWNjZXNzKGVudHJ5LnBhdGggKyBcIi5qc29uXCIpO1xyXG5cclxuICB9XHJcblxyXG4gIHJlcXVlc3Quc2VuZCgpO1xyXG59O1xyXG5cclxuLyogZmlsZTogc3JjL0ZvbnRzLmpzICovXHJcblxyXG5QTEFZR1JPVU5ELkFwcGxpY2F0aW9uLnByb3RvdHlwZS5sb2FkRm9udCA9IGZ1bmN0aW9uKG5hbWUpIHtcclxuXHJcbiAgdmFyIHN0eWxlTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcclxuICBzdHlsZU5vZGUudHlwZSA9IFwidGV4dC9jc3NcIjtcclxuXHJcbiAgdmFyIGZvcm1hdHMgPSB7XHJcbiAgICBcIndvZmZcIjogXCJ3b2ZmXCIsXHJcbiAgICBcInR0ZlwiOiBcInRydWV0eXBlXCJcclxuICB9O1xyXG5cclxuICB2YXIgc291cmNlcyA9IFwiXCI7XHJcblxyXG4gIGZvciAodmFyIGV4dCBpbiBmb3JtYXRzKSB7XHJcbiAgICB2YXIgdHlwZSA9IGZvcm1hdHNbZXh0XTtcclxuICAgIHNvdXJjZXMgKz0gXCIgdXJsKFxcXCJmb250cy9cIiArIG5hbWUgKyBcIi5cIiArIGV4dCArIFwiXFxcIikgZm9ybWF0KCdcIiArIHR5cGUgKyBcIicpO1wiXHJcbiAgfVxyXG5cclxuICBzdHlsZU5vZGUudGV4dENvbnRlbnQgPSBcIkBmb250LWZhY2UgeyBmb250LWZhbWlseTogJ1wiICsgbmFtZSArIFwiJzsgc3JjOiBcIiArIHNvdXJjZXMgKyBcIiB9XCI7XHJcblxyXG4gIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVOb2RlKTtcclxuXHJcbiAgdmFyIGxheWVyID0gY3EoMzIsIDMyKTtcclxuXHJcbiAgbGF5ZXIuZm9udChcIjEwcHggVGVzdGluZ1wiKTtcclxuICBsYXllci5maWxsVGV4dCgxNiwgMTYsIDE2KS50cmltKCk7XHJcblxyXG4gIHZhciB3aWR0aCA9IGxheWVyLndpZHRoO1xyXG4gIHZhciBoZWlnaHQgPSBsYXllci5oZWlnaHQ7XHJcblxyXG4gIHRoaXMubG9hZGVyLmFkZChcImZvbnQgXCIgKyBuYW1lKTtcclxuXHJcbiAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICBmdW5jdGlvbiBjaGVjaygpIHtcclxuXHJcbiAgICB2YXIgbGF5ZXIgPSBjcSgzMiwgMzIpO1xyXG5cclxuICAgIGxheWVyLmZvbnQoXCIxMHB4IFwiICsgbmFtZSkuZmlsbFRleHQoMTYsIDE2LCAxNik7XHJcbiAgICBsYXllci50cmltKCk7XHJcblxyXG4gICAgaWYgKGxheWVyLndpZHRoICE9PSB3aWR0aCB8fCBsYXllci5oZWlnaHQgIT09IGhlaWdodCkge1xyXG5cclxuICAgICAgc2VsZi5sb2FkZXIucmVhZHkoXCJmb250IFwiICsgbmFtZSk7XHJcblxyXG4gICAgfSBlbHNlIHtcclxuXHJcbiAgICAgIHNldFRpbWVvdXQoY2hlY2ssIDI1MCk7XHJcblxyXG4gICAgfVxyXG5cclxuICB9O1xyXG5cclxuICBjaGVjaygpO1xyXG5cclxufTtcclxuXHJcbi8qIGZpbGU6IHNyYy9EZWZhdWx0U3RhdGUuanMgKi9cclxuXHJcblBMQVlHUk9VTkQuRGVmYXVsdFN0YXRlID0ge1xyXG5cclxufTtcclxuXHJcbi8qIGZpbGU6IHNyYy9Mb2FkaW5nU2NyZWVuLmpzICovXHJcblxyXG5QTEFZR1JPVU5ELkxvYWRpbmdTY3JlZW4gPSB7XHJcblxyXG4gIC8qIGJhc2ljIGxvYWRpbmcgc2NyZWVuIHVzaW5nIERPTSAqL1xyXG5cclxuICBsb2dvUmF3OiBcImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBTm9BQUFBU0JBTUFBQURQaU4weEFBQUFHRkJNVkVVQUFRQXRMaXhIU1VkbmFHYUppb2ltcUtYTXpzdjcvZnI1c2hnVkFBQUFBV0pMUjBRQWlBVWRTQUFBQUFsd1NGbHpBQUFMRXdBQUN4TUJBSnFjR0FBQUFBZDBTVTFGQjk4RUF3a2VBNG9RV0o0QUFBQVpkRVZZZEVOdmJXMWxiblFBUTNKbFlYUmxaQ0IzYVhSb0lFZEpUVkJYZ1E0WEFBQUI5a2xFUVZRNHk3MlV2VytyTUJEQXorRnJwVktyckZtZXNtYXBXTk9scktqU2Uxa1ordW9WQXZqKy9mcnVqRzFTYUpjcUp3VTd2b09mN3hNUXpRbXNJRGk1TlBUTXNMUm50SDNVK0Y2U0FabzNObEN2Y2dCRkp6OG8rdmtEaUU2M2xJOTVZL1VtcGluc1pXa2dKV0ppRGJBVlExNmh0cHR4U1RObG9JbHVnd2F3MDAxRXkzQVNGM3NvNkwxcUxOWHpRUzVTMFVHS0wvQ0k1d1dOcmlFMFVIOVl0eTM3THFJVmcrd3NxdTdJeDBNd1ZCU0YvZFUranYyU05ubWEwMjFMRWRQcVZuTWVVM3hBdTBrWGNTR2ptcTdPeDRFMlduODhMWjIrRUZqM2F2aml4emFpNlZQVnl1WXZlWkxIRjJYZmREbnZBcTI3RElIR3VxKzBESkZzRTMwT3RCMUtxT3dkOERyN1BjTTRiK2pmajJnNWxwNFd5bnRCSzY2cXVhM0p6RUErdVhKcHdIL05sVnV6UlZQWS9rVExCMm1qdU4rS3dkWjhGT3k4ajJnRGJFVVNxdW1uU0NZNGxmNGlicTNJaFZNNHljWlFSbnYrekZxVmRKUVZuNkJ4dlVxZWJHcHVhTm8zc1p4d0J6amFqaU1aT29CaXd5VkYra0NyK25VYUpPYUdwbkFlUlBQSlpUcjRGcW1IUlhjbmVFbzREcVEvZnRmZG5MZURyVUFNRTh4V0tQZUtDd1c2WWtFcFhmczNwMUVXSmhkY1VBWVAwVEkvdVlhVjhjZ2p3Qm92YWV5V3dqaTJUOXJURklkUy9jUC9NbmtUTFJVV3hnTk5aVmluN2JUNWZxVDltaURjVVZKelIxZ1JwZklPTk1tdWxVKzVRcXI2elhBVXFBQUFBQUJKUlU1RXJrSmdnZz09XCIsXHJcblxyXG4gIGNyZWF0ZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgIHRoaXMubG9nbyA9IG5ldyBJbWFnZTtcclxuXHJcbiAgICB0aGlzLmxvZ28uYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgIHNlbGYucmVhZHkgPSB0cnVlO1xyXG4gICAgICBzZWxmLmNyZWF0ZUVsZW1lbnRzKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmxvZ28uc3JjID0gdGhpcy5sb2dvUmF3O1xyXG5cclxuICAgIHRoaXMuYmFja2dyb3VuZCA9IFwiIzAwMFwiO1xyXG5cclxuICAgIGlmICh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSkge1xyXG4gICAgICB0aGlzLmJhY2tncm91bmQgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5ib2R5KS5iYWNrZ3JvdW5kQ29sb3IgfHwgXCIjMDAwXCI7XHJcbiAgICB9XHJcblxyXG5cclxuICB9LFxyXG5cclxuICBlbnRlcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdGhpcy5jdXJyZW50ID0gMDtcclxuXHJcbiAgfSxcclxuXHJcbiAgbGVhdmU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHRoaXMubG9ja2VkID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuYXBwLnR3ZWVuKHRoaXMpXHJcbiAgICAgIC50byh7XHJcbiAgICAgICAgY3VycmVudDogMVxyXG4gICAgICB9LCAwLjUpO1xyXG5cclxuICB9LFxyXG5cclxuICBzdGVwOiBmdW5jdGlvbihkZWx0YSkge1xyXG5cclxuICAgIGlmICh0aGlzLmxvY2tlZCkge1xyXG5cclxuICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmZpbmlzaGVkKSB7XHJcbiAgICAgICAgdGhpcy5sb2NrZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLndyYXBwZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLndyYXBwZXIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgfSBlbHNlIHtcclxuXHJcbiAgICAgIHRoaXMuY3VycmVudCA9IHRoaXMuY3VycmVudCArIE1hdGguYWJzKHRoaXMuYXBwLmxvYWRlci5wcm9ncmVzcyAtIHRoaXMuY3VycmVudCkgKiBkZWx0YTtcclxuICAgIH1cclxuXHJcbiAgfSxcclxuXHJcbiAgY3JlYXRlRWxlbWVudHM6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHRoaXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCAqIDAuNiB8IDA7XHJcbiAgICB0aGlzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCAqIDAuMSB8IDA7XHJcblxyXG4gICAgdGhpcy53cmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIHRoaXMud3JhcHBlci5zdHlsZS53aWR0aCA9IHRoaXMud2lkdGggKyBcInB4XCI7XHJcbiAgICB0aGlzLndyYXBwZXIuc3R5bGUuaGVpZ2h0ID0gdGhpcy5oZWlnaHQgKyBcInB4XCI7XHJcbiAgICB0aGlzLndyYXBwZXIuc3R5bGUuYmFja2dyb3VuZCA9IFwiIzAwMFwiO1xyXG4gICAgdGhpcy53cmFwcGVyLnN0eWxlLmJvcmRlciA9IFwiNHB4IHNvbGlkICNmZmZcIjtcclxuICAgIHRoaXMud3JhcHBlci5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcclxuICAgIHRoaXMud3JhcHBlci5zdHlsZS5sZWZ0ID0gKHdpbmRvdy5pbm5lcldpZHRoIC8gMiAtIHRoaXMud2lkdGggLyAyIHwgMCkgKyBcInB4XCI7XHJcbiAgICB0aGlzLndyYXBwZXIuc3R5bGUudG9wID0gKHdpbmRvdy5pbm5lckhlaWdodCAvIDIgLSB0aGlzLmhlaWdodCAvIDIgfCAwKSArIFwicHhcIjtcclxuICAgIHRoaXMud3JhcHBlci5zdHlsZS56SW5kZXggPSAxMDA7XHJcblxyXG4gICAgdGhpcy5hcHAuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMud3JhcHBlcik7XHJcblxyXG4gICAgdGhpcy5wcm9ncmVzc0JhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICB0aGlzLnByb2dyZXNzQmFyLnN0eWxlLndpZHRoID0gXCIwJVwiO1xyXG4gICAgdGhpcy5wcm9ncmVzc0Jhci5zdHlsZS5oZWlnaHQgPSB0aGlzLmhlaWdodCArIFwicHhcIjtcclxuICAgIHRoaXMucHJvZ3Jlc3NCYXIuc3R5bGUuYmFja2dyb3VuZCA9IFwiI2ZmZlwiO1xyXG5cclxuICAgIHRoaXMud3JhcHBlci5hcHBlbmRDaGlsZCh0aGlzLnByb2dyZXNzQmFyKTtcclxuXHJcbiAgfSxcclxuXHJcblxyXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgaWYgKCF0aGlzLnJlYWR5KSByZXR1cm47XHJcblxyXG4gICAgdGhpcy5wcm9ncmVzc0Jhci5zdHlsZS53aWR0aCA9ICh0aGlzLmN1cnJlbnQgKiAxMDAgfCAwKSArIFwiJVwiO1xyXG5cclxuXHJcbiAgfVxyXG5cclxufTtcclxuXHJcbi8qIGZpbGU6IHNyYy9saWIvQ2FudmFzUXVlcnkuanMgKi9cclxuXHJcbi8qXHJcblxyXG4gIENhbnZhcyBRdWVyeSByMlxyXG5cclxuICBodHRwOi8vY2FudmFzcXVlcnkuY29tXHJcblxyXG4gIChjKSAyMDEyLTIwMTUgaHR0cDovL3Jlem9uZXIubmV0XHJcblxyXG4gIENhbnZhcyBRdWVyeSBtYXkgYmUgZnJlZWx5IGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cclxuXHJcbiAgISBmaXhlZCBjb2xvciBwYXJzZXJzXHJcblxyXG4qL1xyXG5cclxuXHJcbihmdW5jdGlvbigpIHtcclxuXHJcbiAgdmFyIENPQ09PTkpTID0gZmFsc2U7XHJcblxyXG4gIHZhciBDYW52YXMgPSB3aW5kb3cuSFRNTENhbnZhc0VsZW1lbnQ7XHJcbiAgdmFyIEltYWdlID0gd2luZG93LkhUTUxJbWFnZUVsZW1lbnQ7XHJcbiAgdmFyIENPQ09PTkpTID0gbmF2aWdhdG9yLmlzQ29jb29uSlM7XHJcblxyXG4gIHZhciBjcSA9IGZ1bmN0aW9uKHNlbGVjdG9yKSB7XHJcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICB2YXIgY2FudmFzID0gY3EuY3JlYXRlQ2FudmFzKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xyXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyBjYW52YXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICAgICAgICAvLyBjYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHNlbGVjdG9yID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgIHZhciBjYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHNlbGVjdG9yID09PSBcIm51bWJlclwiKSB7XHJcbiAgICAgIHZhciBjYW52YXMgPSBjcS5jcmVhdGVDYW52YXMoYXJndW1lbnRzWzBdLCBhcmd1bWVudHNbMV0pO1xyXG4gICAgfSBlbHNlIGlmIChzZWxlY3RvciBpbnN0YW5jZW9mIEltYWdlKSB7XHJcbiAgICAgIHZhciBjYW52YXMgPSBjcS5jcmVhdGVDYW52YXMoc2VsZWN0b3IpO1xyXG4gICAgfSBlbHNlIGlmIChzZWxlY3RvciBpbnN0YW5jZW9mIGNxLkxheWVyKSB7XHJcbiAgICAgIHJldHVybiBzZWxlY3RvcjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhciBjYW52YXMgPSBzZWxlY3RvcjtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IGNxLkxheWVyKGNhbnZhcyk7XHJcbiAgfTtcclxuXHJcbiAgY3EubGluZVNwYWNpbmcgPSAxLjA7XHJcbiAgY3EuZGVmYXVsdEZvbnQgPSBcIkFyaWFsXCI7XHJcblxyXG4gIGNxLmNvY29vbiA9IGZ1bmN0aW9uKHNlbGVjdG9yKSB7XHJcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICB2YXIgY2FudmFzID0gY3EuY3JlYXRlQ29jb29uQ2FudmFzKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xyXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBmdW5jdGlvbigpIHt9KTtcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHNlbGVjdG9yID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgIHZhciBjYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHNlbGVjdG9yID09PSBcIm51bWJlclwiKSB7XHJcbiAgICAgIHZhciBjYW52YXMgPSBjcS5jcmVhdGVDb2Nvb25DYW52YXMoYXJndW1lbnRzWzBdLCBhcmd1bWVudHNbMV0pO1xyXG4gICAgfSBlbHNlIGlmIChzZWxlY3RvciBpbnN0YW5jZW9mIEltYWdlKSB7XHJcbiAgICAgIHZhciBjYW52YXMgPSBjcS5jcmVhdGVDb2Nvb25DYW52YXMoc2VsZWN0b3IpO1xyXG4gICAgfSBlbHNlIGlmIChzZWxlY3RvciBpbnN0YW5jZW9mIGNxLkxheWVyKSB7XHJcbiAgICAgIHJldHVybiBzZWxlY3RvcjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhciBjYW52YXMgPSBzZWxlY3RvcjtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IGNxLkxheWVyKGNhbnZhcyk7XHJcbiAgfVxyXG5cclxuICAvKiBmYXN0LmpzICovXHJcblxyXG4gIGNxLmZhc3RBcHBseSA9IGZ1bmN0aW9uKHN1YmplY3QsIHRoaXNDb250ZXh0LCBhcmdzKSB7XHJcblxyXG4gICAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xyXG4gICAgICBjYXNlIDA6XHJcbiAgICAgICAgcmV0dXJuIHN1YmplY3QuY2FsbCh0aGlzQ29udGV4dCk7XHJcbiAgICAgIGNhc2UgMTpcclxuICAgICAgICByZXR1cm4gc3ViamVjdC5jYWxsKHRoaXNDb250ZXh0LCBhcmdzWzBdKTtcclxuICAgICAgY2FzZSAyOlxyXG4gICAgICAgIHJldHVybiBzdWJqZWN0LmNhbGwodGhpc0NvbnRleHQsIGFyZ3NbMF0sIGFyZ3NbMV0pO1xyXG4gICAgICBjYXNlIDM6XHJcbiAgICAgICAgcmV0dXJuIHN1YmplY3QuY2FsbCh0aGlzQ29udGV4dCwgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XHJcbiAgICAgIGNhc2UgNDpcclxuICAgICAgICByZXR1cm4gc3ViamVjdC5jYWxsKHRoaXNDb250ZXh0LCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdKTtcclxuICAgICAgY2FzZSA1OlxyXG4gICAgICAgIHJldHVybiBzdWJqZWN0LmNhbGwodGhpc0NvbnRleHQsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10sIGFyZ3NbNF0pO1xyXG4gICAgICBjYXNlIDY6XHJcbiAgICAgICAgcmV0dXJuIHN1YmplY3QuY2FsbCh0aGlzQ29udGV4dCwgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSwgYXJnc1s0XSwgYXJnc1s1XSk7XHJcbiAgICAgIGNhc2UgNzpcclxuICAgICAgICByZXR1cm4gc3ViamVjdC5jYWxsKHRoaXNDb250ZXh0LCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdLCBhcmdzWzRdLCBhcmdzWzVdLCBhcmdzWzZdKTtcclxuICAgICAgY2FzZSA4OlxyXG4gICAgICAgIHJldHVybiBzdWJqZWN0LmNhbGwodGhpc0NvbnRleHQsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10sIGFyZ3NbNF0sIGFyZ3NbNV0sIGFyZ3NbNl0sIGFyZ3NbN10pO1xyXG4gICAgICBjYXNlIDk6XHJcbiAgICAgICAgcmV0dXJuIHN1YmplY3QuY2FsbCh0aGlzQ29udGV4dCwgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSwgYXJnc1s0XSwgYXJnc1s1XSwgYXJnc1s2XSwgYXJnc1s3XSwgYXJnc1s4XSk7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgcmV0dXJuIHN1YmplY3QuYXBwbHkodGhpc0NvbnRleHQsIGFyZ3MpO1xyXG4gICAgfVxyXG5cclxuICB9O1xyXG5cclxuICBjcS5leHRlbmQgPSBmdW5jdGlvbigpIHtcclxuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGZvciAodmFyIGogaW4gYXJndW1lbnRzW2ldKSB7XHJcbiAgICAgICAgYXJndW1lbnRzWzBdW2pdID0gYXJndW1lbnRzW2ldW2pdO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGFyZ3VtZW50c1swXTtcclxuICB9O1xyXG5cclxuICBjcS5hdWdtZW50ID0gZnVuY3Rpb24oKSB7XHJcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBfLmV4dGVuZChhcmd1bWVudHNbMF0sIGFyZ3VtZW50c1tpXSk7XHJcbiAgICAgIGFyZ3VtZW50c1tpXShhcmd1bWVudHNbMF0pO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNxLmRpc3RhbmNlID0gZnVuY3Rpb24oeDEsIHkxLCB4MiwgeTIpIHtcclxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMikge1xyXG4gICAgICB2YXIgZHggPSB4MSAtIHgyO1xyXG4gICAgICB2YXIgZHkgPSB5MSAtIHkyO1xyXG5cclxuICAgICAgcmV0dXJuIE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gTWF0aC5hYnMoeDEgLSB5MSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY3EuZXh0ZW5kKGNxLCB7XHJcblxyXG4gICAgc21vb3RoaW5nOiB0cnVlLFxyXG5cclxuICAgIGJsZW5kOiBmdW5jdGlvbihiZWxvdywgYWJvdmUsIG1vZGUsIG1peCkge1xyXG5cclxuICAgICAgaWYgKHR5cGVvZiBtaXggPT09IFwidW5kZWZpbmVkXCIpIG1peCA9IDE7XHJcblxyXG4gICAgICB2YXIgYmVsb3cgPSBjcShiZWxvdyk7XHJcbiAgICAgIHZhciBtYXNrID0gYmVsb3cuY2xvbmUoKTtcclxuICAgICAgdmFyIGFib3ZlID0gY3EoYWJvdmUpO1xyXG5cclxuICAgICAgYmVsb3cuc2F2ZSgpO1xyXG4gICAgICBiZWxvdy5nbG9iYWxBbHBoYShtaXgpO1xyXG4gICAgICBiZWxvdy5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24obW9kZSk7XHJcbiAgICAgIGJlbG93LmRyYXdJbWFnZShhYm92ZS5jYW52YXMsIDAsIDApO1xyXG4gICAgICBiZWxvdy5yZXN0b3JlKCk7XHJcblxyXG4gICAgICBtYXNrLnNhdmUoKTtcclxuICAgICAgbWFzay5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24oXCJzb3VyY2UtaW5cIik7XHJcbiAgICAgIG1hc2suZHJhd0ltYWdlKGJlbG93LmNhbnZhcywgMCwgMCk7XHJcbiAgICAgIG1hc2sucmVzdG9yZSgpO1xyXG5cclxuICAgICAgcmV0dXJuIG1hc2s7XHJcbiAgICB9LFxyXG5cclxuICAgIG1hdGNoQ29sb3I6IGZ1bmN0aW9uKGNvbG9yLCBwYWxldHRlKSB7XHJcbiAgICAgIHZhciByZ2JQYWxldHRlID0gW107XHJcblxyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhbGV0dGUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICByZ2JQYWxldHRlLnB1c2goY3EuY29sb3IocGFsZXR0ZVtpXSkpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgaW1nRGF0YSA9IGNxLmNvbG9yKGNvbG9yKTtcclxuXHJcbiAgICAgIHZhciBkaWZMaXN0ID0gW107XHJcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgcmdiUGFsZXR0ZS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgIHZhciByZ2JWYWwgPSByZ2JQYWxldHRlW2pdO1xyXG4gICAgICAgIHZhciByRGlmID0gTWF0aC5hYnMoaW1nRGF0YVswXSAtIHJnYlZhbFswXSksXHJcbiAgICAgICAgICBnRGlmID0gTWF0aC5hYnMoaW1nRGF0YVsxXSAtIHJnYlZhbFsxXSksXHJcbiAgICAgICAgICBiRGlmID0gTWF0aC5hYnMoaW1nRGF0YVsyXSAtIHJnYlZhbFsyXSk7XHJcbiAgICAgICAgZGlmTGlzdC5wdXNoKHJEaWYgKyBnRGlmICsgYkRpZik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBjbG9zZXN0TWF0Y2ggPSAwO1xyXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHBhbGV0dGUubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICBpZiAoZGlmTGlzdFtqXSA8IGRpZkxpc3RbY2xvc2VzdE1hdGNoXSkge1xyXG4gICAgICAgICAgY2xvc2VzdE1hdGNoID0gajtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBwYWxldHRlW2Nsb3Nlc3RNYXRjaF07XHJcbiAgICB9LFxyXG5cclxuICAgIHRlbXA6IGZ1bmN0aW9uKHdpZHRoLCBoZWlnaHQpIHtcclxuICAgICAgaWYgKCF0aGlzLnRlbXBMYXllcikge1xyXG4gICAgICAgIHRoaXMudGVtcExheWVyID0gY3EoMSwgMSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh3aWR0aCBpbnN0YW5jZW9mIEltYWdlKSB7XHJcbiAgICAgICAgdGhpcy50ZW1wTGF5ZXIud2lkdGggPSB3aWR0aC53aWR0aDtcclxuICAgICAgICB0aGlzLnRlbXBMYXllci5oZWlnaHQgPSB3aWR0aC5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy50ZW1wTGF5ZXIuY29udGV4dC5kcmF3SW1hZ2Uod2lkdGgsIDAsIDApO1xyXG4gICAgICB9IGVsc2UgaWYgKHdpZHRoIGluc3RhbmNlb2YgQ2FudmFzKSB7XHJcbiAgICAgICAgdGhpcy50ZW1wTGF5ZXIud2lkdGggPSB3aWR0aC53aWR0aDtcclxuICAgICAgICB0aGlzLnRlbXBMYXllci5oZWlnaHQgPSB3aWR0aC5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy50ZW1wTGF5ZXIuY29udGV4dC5kcmF3SW1hZ2Uod2lkdGgsIDAsIDApO1xyXG4gICAgICB9IGVsc2UgaWYgKHdpZHRoIGluc3RhbmNlb2YgQ2FudmFzUXVlcnkuTGF5ZXIpIHtcclxuICAgICAgICB0aGlzLnRlbXBMYXllci53aWR0aCA9IHdpZHRoLndpZHRoO1xyXG4gICAgICAgIHRoaXMudGVtcExheWVyLmhlaWdodCA9IHdpZHRoLmhlaWdodDtcclxuICAgICAgICB0aGlzLnRlbXBMYXllci5jb250ZXh0LmRyYXdJbWFnZSh3aWR0aC5jYW52YXMsIDAsIDApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMudGVtcExheWVyLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgdGhpcy50ZW1wTGF5ZXIuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdGhpcy50ZW1wTGF5ZXI7XHJcbiAgICB9LFxyXG5cclxuICAgIHdyYXBWYWx1ZTogZnVuY3Rpb24odmFsdWUsIG1pbiwgbWF4KSB7XHJcbiAgICAgIGlmICh2YWx1ZSA8IG1pbikgcmV0dXJuIG1heCArICh2YWx1ZSAlIG1heCk7XHJcbiAgICAgIGlmICh2YWx1ZSA+PSBtYXgpIHJldHVybiB2YWx1ZSAlIG1heDtcclxuICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfSxcclxuXHJcbiAgICBsaW1pdFZhbHVlOiBmdW5jdGlvbih2YWx1ZSwgbWluLCBtYXgpIHtcclxuICAgICAgcmV0dXJuIHZhbHVlIDwgbWluID8gbWluIDogdmFsdWUgPiBtYXggPyBtYXggOiB2YWx1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgbWl4OiBmdW5jdGlvbihhLCBiLCBhbW91bnQpIHtcclxuICAgICAgcmV0dXJuIGEgKyAoYiAtIGEpICogYW1vdW50O1xyXG4gICAgfSxcclxuXHJcbiAgICBoZXhUb1JnYjogZnVuY3Rpb24oaGV4KSB7XHJcbiAgICAgIGlmIChoZXgubGVuZ3RoID09PSA3KSByZXR1cm4gWycweCcgKyBoZXhbMV0gKyBoZXhbMl0gfCAwLCAnMHgnICsgaGV4WzNdICsgaGV4WzRdIHwgMCwgJzB4JyArIGhleFs1XSArIGhleFs2XSB8IDBdO1xyXG4gICAgICBlbHNlIHJldHVybiBbJzB4JyArIGhleFsxXSArIGhleFsxXSB8IDAsICcweCcgKyBoZXhbMl0gKyBoZXhbMl0gfCAwLCAnMHgnICsgaGV4WzNdICsgaGV4WzNdIHwgMF07XHJcbiAgICB9LFxyXG5cclxuICAgIHJnYlRvSGV4OiBmdW5jdGlvbihyLCBnLCBiKSB7XHJcbiAgICAgIHJldHVybiBcIiNcIiArICgoMSA8PCAyNCkgKyAociA8PCAxNikgKyAoZyA8PCA4KSArIGIpLnRvU3RyaW5nKDE2KS5zbGljZSgxLCA3KTtcclxuICAgIH0sXHJcblxyXG4gICAgLyogYXV0aG9yOiBodHRwOi8vbWppamFja3Nvbi5jb20vICovXHJcblxyXG4gICAgcmdiVG9Ic2w6IGZ1bmN0aW9uKHIsIGcsIGIpIHtcclxuXHJcbiAgICAgIGlmIChyIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICBiID0gclsyXTtcclxuICAgICAgICBnID0gclsxXTtcclxuICAgICAgICByID0gclswXTtcclxuICAgICAgfVxyXG5cclxuICAgICAgciAvPSAyNTUsIGcgLz0gMjU1LCBiIC89IDI1NTtcclxuICAgICAgdmFyIG1heCA9IE1hdGgubWF4KHIsIGcsIGIpLFxyXG4gICAgICAgIG1pbiA9IE1hdGgubWluKHIsIGcsIGIpO1xyXG4gICAgICB2YXIgaCwgcywgbCA9IChtYXggKyBtaW4pIC8gMjtcclxuXHJcbiAgICAgIGlmIChtYXggPT0gbWluKSB7XHJcbiAgICAgICAgaCA9IHMgPSAwOyAvLyBhY2hyb21hdGljXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIGQgPSBtYXggLSBtaW47XHJcbiAgICAgICAgcyA9IGwgPiAwLjUgPyBkIC8gKDIgLSBtYXggLSBtaW4pIDogZCAvIChtYXggKyBtaW4pO1xyXG4gICAgICAgIHN3aXRjaCAobWF4KSB7XHJcbiAgICAgICAgICBjYXNlIHI6XHJcbiAgICAgICAgICAgIGggPSAoZyAtIGIpIC8gZCArIChnIDwgYiA/IDYgOiAwKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIGc6XHJcbiAgICAgICAgICAgIGggPSAoYiAtIHIpIC8gZCArIDI7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSBiOlxyXG4gICAgICAgICAgICBoID0gKHIgLSBnKSAvIGQgKyA0O1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgaCAvPSA2O1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gW2gsIHMsIGxdO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKiBhdXRob3I6IGh0dHA6Ly9tamlqYWNrc29uLmNvbS8gKi9cclxuXHJcbiAgICBodWUycmdiOiBmdW5jdGlvbihwLCBxLCB0KSB7XHJcbiAgICAgIGlmICh0IDwgMCkgdCArPSAxO1xyXG4gICAgICBpZiAodCA+IDEpIHQgLT0gMTtcclxuICAgICAgaWYgKHQgPCAxIC8gNikgcmV0dXJuIHAgKyAocSAtIHApICogNiAqIHQ7XHJcbiAgICAgIGlmICh0IDwgMSAvIDIpIHJldHVybiBxO1xyXG4gICAgICBpZiAodCA8IDIgLyAzKSByZXR1cm4gcCArIChxIC0gcCkgKiAoMiAvIDMgLSB0KSAqIDY7XHJcbiAgICAgIHJldHVybiBwO1xyXG4gICAgfSxcclxuXHJcbiAgICBoc2xUb1JnYjogZnVuY3Rpb24oaCwgcywgbCkge1xyXG4gICAgICB2YXIgciwgZywgYjtcclxuXHJcbiAgICAgIGlmIChzID09IDApIHtcclxuICAgICAgICByID0gZyA9IGIgPSBsOyAvLyBhY2hyb21hdGljXHJcbiAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgIHZhciBxID0gbCA8IDAuNSA/IGwgKiAoMSArIHMpIDogbCArIHMgLSBsICogcztcclxuICAgICAgICB2YXIgcCA9IDIgKiBsIC0gcTtcclxuICAgICAgICByID0gdGhpcy5odWUycmdiKHAsIHEsIGggKyAxIC8gMyk7XHJcbiAgICAgICAgZyA9IHRoaXMuaHVlMnJnYihwLCBxLCBoKTtcclxuICAgICAgICBiID0gdGhpcy5odWUycmdiKHAsIHEsIGggLSAxIC8gMyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBbciAqIDI1NSB8IDAsIGcgKiAyNTUgfCAwLCBiICogMjU1IHwgMF07XHJcbiAgICB9LFxyXG5cclxuICAgIHJnYlRvSHN2OiBmdW5jdGlvbihyLCBnLCBiKSB7XHJcbiAgICAgIGlmIChyIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICBiID0gclsyXTtcclxuICAgICAgICBnID0gclsxXTtcclxuICAgICAgICByID0gclswXTtcclxuICAgICAgfVxyXG5cclxuICAgICAgciA9IHIgLyAyNTUsIGcgPSBnIC8gMjU1LCBiID0gYiAvIDI1NTtcclxuICAgICAgdmFyIG1heCA9IE1hdGgubWF4KHIsIGcsIGIpLFxyXG4gICAgICAgIG1pbiA9IE1hdGgubWluKHIsIGcsIGIpO1xyXG4gICAgICB2YXIgaCwgcywgdiA9IG1heDtcclxuXHJcbiAgICAgIHZhciBkID0gbWF4IC0gbWluO1xyXG4gICAgICBzID0gbWF4ID09IDAgPyAwIDogZCAvIG1heDtcclxuXHJcbiAgICAgIGlmIChtYXggPT0gbWluKSB7XHJcbiAgICAgICAgaCA9IDA7IC8vIGFjaHJvbWF0aWNcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzd2l0Y2ggKG1heCkge1xyXG4gICAgICAgICAgY2FzZSByOlxyXG4gICAgICAgICAgICBoID0gKGcgLSBiKSAvIGQgKyAoZyA8IGIgPyA2IDogMCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSBnOlxyXG4gICAgICAgICAgICBoID0gKGIgLSByKSAvIGQgKyAyO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgYjpcclxuICAgICAgICAgICAgaCA9IChyIC0gZykgLyBkICsgNDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGggLz0gNjtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIFtoLCBzLCB2XTtcclxuICAgIH0sXHJcblxyXG4gICAgaHN2VG9SZ2I6IGZ1bmN0aW9uKGgsIHMsIHYpIHtcclxuICAgICAgdmFyIHIsIGcsIGI7XHJcblxyXG4gICAgICB2YXIgaSA9IE1hdGguZmxvb3IoaCAqIDYpO1xyXG4gICAgICB2YXIgZiA9IGggKiA2IC0gaTtcclxuICAgICAgdmFyIHAgPSB2ICogKDEgLSBzKTtcclxuICAgICAgdmFyIHEgPSB2ICogKDEgLSBmICogcyk7XHJcbiAgICAgIHZhciB0ID0gdiAqICgxIC0gKDEgLSBmKSAqIHMpO1xyXG5cclxuICAgICAgc3dpdGNoIChpICUgNikge1xyXG4gICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgIHIgPSB2LCBnID0gdCwgYiA9IHA7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICByID0gcSwgZyA9IHYsIGIgPSBwO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgciA9IHAsIGcgPSB2LCBiID0gdDtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgIHIgPSBwLCBnID0gcSwgYiA9IHY7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICByID0gdCwgZyA9IHAsIGIgPSB2O1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgciA9IHYsIGcgPSBwLCBiID0gcTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gW3IgKiAyNTUsIGcgKiAyNTUsIGIgKiAyNTVdO1xyXG4gICAgfSxcclxuXHJcbiAgICBjb2xvcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciByZXN1bHQgPSBuZXcgY3EuQ29sb3IoKTtcclxuICAgICAgcmVzdWx0LnBhcnNlKGFyZ3VtZW50c1swXSwgYXJndW1lbnRzWzFdKTtcclxuICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH0sXHJcblxyXG4gICAgcG9vbEFycmF5OiBbXSxcclxuXHJcbiAgICBwb29sOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgIGlmICghdGhpcy5wb29sQXJyYXkubGVuZ3RoKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xyXG4gICAgICAgICAgdGhpcy5wb29sQXJyYXkucHVzaCh0aGlzLmNyZWF0ZUNhbnZhcygxLCAxKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdGhpcy5wb29sQXJyYXkucG9wKCk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBjcmVhdGVDYW52YXM6IGZ1bmN0aW9uKHdpZHRoLCBoZWlnaHQpIHtcclxuICAgICAgdmFyIHJlc3VsdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XHJcblxyXG4gICAgICBpZiAoYXJndW1lbnRzWzBdIGluc3RhbmNlb2YgSW1hZ2UgfHwgYXJndW1lbnRzWzBdIGluc3RhbmNlb2YgQ2FudmFzKSB7XHJcbiAgICAgICAgdmFyIGltYWdlID0gYXJndW1lbnRzWzBdO1xyXG4gICAgICAgIHJlc3VsdC53aWR0aCA9IGltYWdlLndpZHRoO1xyXG4gICAgICAgIHJlc3VsdC5oZWlnaHQgPSBpbWFnZS5oZWlnaHQ7XHJcbiAgICAgICAgcmVzdWx0LmdldENvbnRleHQoXCIyZFwiKS5kcmF3SW1hZ2UoaW1hZ2UsIDAsIDApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlc3VsdC53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIHJlc3VsdC5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgIH1cclxuXHJcblxyXG4gICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfSxcclxuXHJcbiAgICBjcmVhdGVDb2Nvb25DYW52YXM6IGZ1bmN0aW9uKHdpZHRoLCBoZWlnaHQpIHtcclxuICAgICAgdmFyIHJlc3VsdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JlZW5jYW52YXNcIik7XHJcblxyXG4gICAgICBpZiAoYXJndW1lbnRzWzBdIGluc3RhbmNlb2YgSW1hZ2UpIHtcclxuICAgICAgICB2YXIgaW1hZ2UgPSBhcmd1bWVudHNbMF07XHJcbiAgICAgICAgcmVzdWx0LndpZHRoID0gaW1hZ2Uud2lkdGg7XHJcbiAgICAgICAgcmVzdWx0LmhlaWdodCA9IGltYWdlLmhlaWdodDtcclxuICAgICAgICByZXN1bHQuZ2V0Q29udGV4dChcIjJkXCIpLmRyYXdJbWFnZShpbWFnZSwgMCwgMCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzdWx0LndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgcmVzdWx0LmhlaWdodCA9IGhlaWdodDtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH0sXHJcblxyXG4gICAgY3JlYXRlSW1hZ2VEYXRhOiBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICAgIHJldHVybiBjcS5jcmVhdGVDYW52YXMod2lkdGgsIGhlaWdodCkuZ2V0Q29udGV4dChcIjJkXCIpLmNyZWF0ZUltYWdlRGF0YSh3aWR0aCwgaGVpZ2h0KTtcclxuICAgIH1cclxuXHJcbiAgfSk7XHJcblxyXG4gIGNxLkxheWVyID0gZnVuY3Rpb24oY2FudmFzKSB7XHJcbiAgICB0aGlzLmNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XHJcbiAgICB0aGlzLmFsaWduWCA9IDA7XHJcbiAgICB0aGlzLmFsaWduWSA9IDA7XHJcbiAgICB0aGlzLmFsaWduZWQgPSBmYWxzZTtcclxuICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgfTtcclxuXHJcbiAgY3EuTGF5ZXIucHJvdG90eXBlID0ge1xyXG5cclxuICAgIHVwZGF0ZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICB2YXIgc21vb3RoaW5nID0gY3Euc21vb3RoaW5nO1xyXG5cclxuICAgICAgaWYgKHR5cGVvZiB0aGlzLnNtb290aGluZyAhPT0gXCJ1bmRlZmluZWRcIikgc21vb3RoaW5nID0gdGhpcy5zbW9vdGhpbmc7XHJcblxyXG4gICAgICB0aGlzLmNvbnRleHQubW96SW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gc21vb3RoaW5nO1xyXG4gICAgICB0aGlzLmNvbnRleHQubXNJbWFnZVNtb290aGluZ0VuYWJsZWQgPSBzbW9vdGhpbmc7XHJcbiAgICAgIHRoaXMuY29udGV4dC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBzbW9vdGhpbmc7XHJcblxyXG4gICAgICBpZiAoQ09DT09OSlMpIENvY29vbi5VdGlscy5zZXRBbnRpYWxpYXMoc21vb3RoaW5nKTtcclxuICAgIH0sXHJcblxyXG4gICAgYXBwZW5kVG86IGZ1bmN0aW9uKHNlbGVjdG9yKSB7XHJcbiAgICAgIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICB2YXIgZWxlbWVudCA9IHNlbGVjdG9yO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5jYW52YXMpO1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIGE6IGZ1bmN0aW9uKGEpIHtcclxuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGgpIHtcclxuICAgICAgICB0aGlzLnByZXZpb3VzQWxwaGEgPSB0aGlzLmdsb2JhbEFscGhhKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2xvYmFsQWxwaGEoYSk7XHJcbiAgICAgIH0gZWxzZVxyXG4gICAgICAgIHJldHVybiB0aGlzLmdsb2JhbEFscGhhKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHJhOiBmdW5jdGlvbigpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuYSh0aGlzLnByZXZpb3VzQWxwaGEpO1xyXG4gICAgfSxcclxuICAgIC8qXHJcbiAgICAgICAgZHJhd0ltYWdlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICBpZiAoIXRoaXMuYWxpZ25YICYmICF0aGlzLmFsaWduWSkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuY2FsbFxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcblxyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByZXN0b3JlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHRoaXMuY29udGV4dC5yZXN0b3JlKCk7XHJcbiAgICAgICAgICB0aGlzLmFsaWduWCA9IDA7XHJcbiAgICAgICAgICB0aGlzLmFsaWduWSA9IDA7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAqL1xyXG5cclxuICAgIHJlYWxpZ246IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgdGhpcy5hbGlnblggPSB0aGlzLnByZXZBbGlnblg7XHJcbiAgICAgIHRoaXMuYWxpZ25ZID0gdGhpcy5wcmV2QWxpZ25ZO1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBhbGlnbjogZnVuY3Rpb24oeCwgeSkge1xyXG5cclxuICAgICAgaWYgKHR5cGVvZiB5ID09PSBcInVuZGVmaW5lZFwiKSB5ID0geDtcclxuXHJcbiAgICAgIHRoaXMuYWxpZ25YID0geDtcclxuICAgICAgdGhpcy5hbGlnblkgPSB5O1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKiBzYXZlIHRyYW5zbGF0ZSBhbGlnbiByb3RhdGUgc2NhbGUgKi9cclxuXHJcbiAgICBzdGFyczogZnVuY3Rpb24oeCwgeSwgYWxpZ25YLCBhbGlnblksIHJvdGF0aW9uLCBzY2FsZVgsIHNjYWxlWSkge1xyXG5cclxuICAgICAgaWYgKHR5cGVvZiBhbGlnblggPT09IFwidW5kZWZpbmVkXCIpIGFsaWduWCA9IDAuNTtcclxuICAgICAgaWYgKHR5cGVvZiBhbGlnblkgPT09IFwidW5kZWZpbmVkXCIpIGFsaWduWSA9IDAuNTtcclxuICAgICAgaWYgKHR5cGVvZiByb3RhdGlvbiA9PT0gXCJ1bmRlZmluZWRcIikgcm90YXRpb24gPSAwO1xyXG4gICAgICBpZiAodHlwZW9mIHNjYWxlWCA9PT0gXCJ1bmRlZmluZWRcIikgc2NhbGVYID0gMS4wO1xyXG4gICAgICBpZiAodHlwZW9mIHNjYWxlWSA9PT0gXCJ1bmRlZmluZWRcIikgc2NhbGVZID0gc2NhbGVYO1xyXG5cclxuICAgICAgdGhpcy5zYXZlKCk7XHJcbiAgICAgIHRoaXMudHJhbnNsYXRlKHgsIHkpO1xyXG4gICAgICB0aGlzLmFsaWduKGFsaWduWCwgYWxpZ25ZKTtcclxuICAgICAgdGhpcy5yb3RhdGUocm90YXRpb24pO1xyXG4gICAgICB0aGlzLnNjYWxlKHNjYWxlWCwgc2NhbGVZKTtcclxuXHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICB0YXJzOiBmdW5jdGlvbih4LCB5LCBhbGlnblgsIGFsaWduWSwgcm90YXRpb24sIHNjYWxlWCwgc2NhbGVZKSB7XHJcblxyXG4gICAgICBpZiAodHlwZW9mIGFsaWduWCA9PT0gXCJ1bmRlZmluZWRcIikgYWxpZ25YID0gMC41O1xyXG4gICAgICBpZiAodHlwZW9mIGFsaWduWSA9PT0gXCJ1bmRlZmluZWRcIikgYWxpZ25ZID0gMC41O1xyXG4gICAgICBpZiAodHlwZW9mIHJvdGF0aW9uID09PSBcInVuZGVmaW5lZFwiKSByb3RhdGlvbiA9IDA7XHJcbiAgICAgIGlmICh0eXBlb2Ygc2NhbGVYID09PSBcInVuZGVmaW5lZFwiKSBzY2FsZVggPSAxLjA7XHJcbiAgICAgIGlmICh0eXBlb2Ygc2NhbGVZID09PSBcInVuZGVmaW5lZFwiKSBzY2FsZVkgPSBzY2FsZVg7XHJcblxyXG4gICAgICB0aGlzLnRyYW5zbGF0ZSh4LCB5KTtcclxuICAgICAgdGhpcy5hbGlnbihhbGlnblgsIGFsaWduWSk7XHJcbiAgICAgIHRoaXMucm90YXRlKHJvdGF0aW9uKTtcclxuICAgICAgdGhpcy5zY2FsZShzY2FsZVgsIHNjYWxlWSk7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGZpbGxSZWN0OiBmdW5jdGlvbih4LCB5LCB3LCBoKSB7XHJcblxyXG4gICAgICBpZiAodGhpcy5hbGlnblggfHwgdGhpcy5hbGlnblkpIHtcclxuICAgICAgICB4IC09IHcgKiB0aGlzLmFsaWduWCB8IDA7XHJcbiAgICAgICAgeSAtPSBoICogdGhpcy5hbGlnblkgfCAwO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLmNvbnRleHQuZmlsbFJlY3QoeCwgeSwgdywgaCk7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHN0cm9rZVJlY3Q6IGZ1bmN0aW9uKHgsIHksIHcsIGgpIHtcclxuXHJcbiAgICAgIGlmICh0aGlzLmFsaWduWCB8fCB0aGlzLmFsaWduWSkge1xyXG4gICAgICAgIHggLT0gdyAqIHRoaXMuYWxpZ25YIHwgMDtcclxuICAgICAgICB5IC09IGggKiB0aGlzLmFsaWduWSB8IDA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuY29udGV4dC5zdHJva2VSZWN0KHgsIHksIHcsIGgpO1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBkcmF3SW1hZ2U6IGZ1bmN0aW9uKGltYWdlLCBzeCwgc3ksIHNXaWR0aCwgc0hlaWdodCwgZHgsIGR5LCBkV2lkdGgsIGRIZWlnaHQpIHtcclxuXHJcbiAgICAgIGlmICh0aGlzLmFsaWduWCB8fCB0aGlzLmFsaWduWSkge1xyXG4gICAgICAgIGlmIChzV2lkdGggPT0gbnVsbCkge1xyXG4gICAgICAgICAgc3ggLT0gaW1hZ2Uud2lkdGggKiB0aGlzLmFsaWduWCB8IDA7XHJcbiAgICAgICAgICBzeSAtPSBpbWFnZS5oZWlnaHQgKiB0aGlzLmFsaWduWSB8IDA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGR4IC09IGRXaWR0aCAqIHRoaXMuYWxpZ25YIHwgMDtcclxuICAgICAgICAgIGR5IC09IGRIZWlnaHQgKiB0aGlzLmFsaWduWSB8IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoc1dpZHRoID09IG51bGwpIHtcclxuICAgICAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKGltYWdlLCBzeCwgc3kpO1xyXG4gICAgICB9IGVsc2UgaWYgKGR4ID09IG51bGwpIHtcclxuICAgICAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKGltYWdlLCBzeCwgc3ksIHNXaWR0aCwgc0hlaWdodCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmRyYXdJbWFnZShpbWFnZSwgc3gsIHN5LCBzV2lkdGgsIHNIZWlnaHQsIGR4LCBkeSwgZFdpZHRoLCBkSGVpZ2h0KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gY3EuZmFzdEFwcGx5KHRoaXMuY29udGV4dC5kcmF3SW1hZ2UsIHRoaXMuY29udGV4dCwgYXJndW1lbnRzKTtcclxuXHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgc2F2ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHRoaXMucHJldkFsaWduWCA9IHRoaXMuYWxpZ25YO1xyXG4gICAgICB0aGlzLnByZXZBbGlnblkgPSB0aGlzLmFsaWduWTtcclxuXHJcbiAgICAgIHRoaXMuY29udGV4dC5zYXZlKCk7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgcmVzdG9yZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICB0aGlzLnJlYWxpZ24oKTtcclxuICAgICAgdGhpcy5jb250ZXh0LnJlc3RvcmUoKTtcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIGRyYXdUaWxlOiBmdW5jdGlvbihpbWFnZSwgeCwgeSwgZnJhbWVYLCBmcmFtZVksIGZyYW1lV2lkdGgsIGZyYW1lSGVpZ2h0LCBmcmFtZXMsIGZyYW1lKSB7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBkcmF3QXRsYXNGcmFtZTogZnVuY3Rpb24oYXRsYXMsIGZyYW1lLCB4LCB5KSB7XHJcblxyXG4gICAgICB2YXIgZnJhbWUgPSBhdGxhcy5mcmFtZXNbZnJhbWVdO1xyXG5cclxuICAgICAgdGhpcy5kcmF3UmVnaW9uKFxyXG4gICAgICAgIGF0bGFzLmltYWdlLFxyXG4gICAgICAgIGZyYW1lLnJlZ2lvbixcclxuICAgICAgICB4IC0gZnJhbWUud2lkdGggKiB0aGlzLmFsaWduWCArIGZyYW1lLm9mZnNldFswXSArIGZyYW1lLnJlZ2lvblsyXSAqIHRoaXMuYWxpZ25YLCB5IC0gZnJhbWUuaGVpZ2h0ICogdGhpcy5hbGlnblkgKyBmcmFtZS5vZmZzZXRbMV0gKyBmcmFtZS5yZWdpb25bM10gKiB0aGlzLmFsaWduWVxyXG4gICAgICApO1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgaW1hZ2VGaWxsOiBmdW5jdGlvbihpbWFnZSwgd2lkdGgsIGhlaWdodCkge1xyXG5cclxuICAgICAgdmFyIHNjYWxlID0gTWF0aC5tYXgod2lkdGggLyBpbWFnZS53aWR0aCwgaGVpZ2h0IC8gaW1hZ2UuaGVpZ2h0KTtcclxuXHJcbiAgICAgIHRoaXMuc2F2ZSgpO1xyXG4gICAgICB0aGlzLnNjYWxlKHNjYWxlLCBzY2FsZSk7XHJcbiAgICAgIHRoaXMuZHJhd0ltYWdlKGltYWdlLCAwLCAwKTtcclxuICAgICAgdGhpcy5yZXN0b3JlKCk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBkcmF3UmVnaW9uOiBmdW5jdGlvbihpbWFnZSwgcmVnaW9uLCB4LCB5LCBzY2FsZSkge1xyXG5cclxuICAgICAgc2NhbGUgPSBzY2FsZSB8fCAxO1xyXG5cclxuICAgICAgdmFyIGRXaWR0aCA9IHJlZ2lvblsyXSAqIHNjYWxlIHwgMDtcclxuICAgICAgdmFyIGRIZWlnaHQgPSByZWdpb25bM10gKiBzY2FsZSB8IDA7XHJcblxyXG4gICAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKFxyXG4gICAgICAgIGltYWdlLCByZWdpb25bMF0sIHJlZ2lvblsxXSwgcmVnaW9uWzJdLCByZWdpb25bM10sXHJcbiAgICAgICAgeCAtIGRXaWR0aCAqIHRoaXMuYWxpZ25YIHwgMCwgeSAtIGRIZWlnaHQgKiB0aGlzLmFsaWduWSB8IDAsIGRXaWR0aCwgZEhlaWdodFxyXG4gICAgICApO1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIGNhY2hlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgIHJldHVybiB0aGlzLmNsb25lKCkuY2FudmFzO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgYmxlbmRPbjogZnVuY3Rpb24od2hhdCwgbW9kZSwgbWl4KSB7XHJcblxyXG4gICAgICBjcS5ibGVuZCh3aGF0LCB0aGlzLCBtb2RlLCBtaXgpO1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgIFxyXG4gICAgfSxcclxuXHJcbiAgICBwb3N0ZXJpemU6IGZ1bmN0aW9uKHBjLCBpbmMpIHtcclxuICAgICAgcGMgPSBwYyB8fCAzMjtcclxuICAgICAgaW5jID0gaW5jIHx8IDQ7XHJcbiAgICAgIHZhciBpbWdkYXRhID0gdGhpcy5nZXRJbWFnZURhdGEoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xyXG4gICAgICB2YXIgZGF0YSA9IGltZ2RhdGEuZGF0YTtcclxuXHJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkgKz0gaW5jKSB7XHJcbiAgICAgICAgZGF0YVtpXSAtPSBkYXRhW2ldICUgcGM7IC8vIHNldCB2YWx1ZSB0byBuZWFyZXN0IG9mIDggcG9zc2liaWxpdGllc1xyXG4gICAgICAgIGRhdGFbaSArIDFdIC09IGRhdGFbaSArIDFdICUgcGM7IC8vIHNldCB2YWx1ZSB0byBuZWFyZXN0IG9mIDggcG9zc2liaWxpdGllc1xyXG4gICAgICAgIGRhdGFbaSArIDJdIC09IGRhdGFbaSArIDJdICUgcGM7IC8vIHNldCB2YWx1ZSB0byBuZWFyZXN0IG9mIDggcG9zc2liaWxpdGllc1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLnB1dEltYWdlRGF0YShpbWdkYXRhLCAwLCAwKTsgLy8gcHV0IGltYWdlIGRhdGEgdG8gY2FudmFzXHJcblxyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG5cclxuICAgIGJ3OiBmdW5jdGlvbihwYykge1xyXG4gICAgICBwYyA9IDEyODtcclxuICAgICAgdmFyIGltZ2RhdGEgPSB0aGlzLmdldEltYWdlRGF0YSgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XHJcbiAgICAgIHZhciBkYXRhID0gaW1nZGF0YS5kYXRhO1xyXG4gICAgICAvLyA4LWJpdDogcnJyIGdnZyBiYlxyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpICs9IDQpIHtcclxuICAgICAgICB2YXIgdiA9ICgoZGF0YVtpXSArIGRhdGFbaSArIDFdICsgZGF0YVtpICsgMl0pIC8gMyk7XHJcblxyXG4gICAgICAgIHYgPSAodiAvIDEyOCB8IDApICogMTI4O1xyXG4gICAgICAgIC8vZGF0YVtpXSA9IHY7IC8vIHNldCB2YWx1ZSB0byBuZWFyZXN0IG9mIDggcG9zc2liaWxpdGllc1xyXG4gICAgICAgIC8vZGF0YVtpICsgMV0gPSB2OyAvLyBzZXQgdmFsdWUgdG8gbmVhcmVzdCBvZiA4IHBvc3NpYmlsaXRpZXNcclxuICAgICAgICBkYXRhW2kgKyAyXSA9ICh2IC8gMjU1KSAqIGRhdGFbaV07IC8vIHNldCB2YWx1ZSB0byBuZWFyZXN0IG9mIDggcG9zc2liaWxpdGllc1xyXG5cclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5wdXRJbWFnZURhdGEoaW1nZGF0YSwgMCwgMCk7IC8vIHB1dCBpbWFnZSBkYXRhIHRvIGNhbnZhc1xyXG4gICAgfSxcclxuXHJcbiAgICBibGVuZDogZnVuY3Rpb24od2hhdCwgbW9kZSwgbWl4KSB7XHJcbiAgICAgIGlmICh0eXBlb2Ygd2hhdCA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgIHZhciBjb2xvciA9IHdoYXQ7XHJcbiAgICAgICAgd2hhdCA9IGNxKHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xyXG4gICAgICAgIHdoYXQuZmlsbFN0eWxlKGNvbG9yKS5maWxsUmVjdCgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIHJlc3VsdCA9IGNxLmJsZW5kKHRoaXMsIHdoYXQsIG1vZGUsIG1peCk7XHJcblxyXG4gICAgICB0aGlzLmNhbnZhcyA9IHJlc3VsdC5jYW52YXM7XHJcbiAgICAgIHRoaXMuY29udGV4dCA9IHJlc3VsdC5jb250ZXh0O1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIHRleHRXaXRoQmFja2dyb3VuZDogZnVuY3Rpb24odGV4dCwgeCwgeSwgYmFja2dyb3VuZCwgcGFkZGluZykge1xyXG4gICAgICB2YXIgdyA9IHRoaXMubWVhc3VyZVRleHQodGV4dCkud2lkdGg7XHJcbiAgICAgIHZhciBoID0gdGhpcy5mb250SGVpZ2h0KCkgKiAwLjg7XHJcbiAgICAgIHZhciBmID0gdGhpcy5maWxsU3R5bGUoKTtcclxuICAgICAgdmFyIHBhZGRpbmcgPSBwYWRkaW5nIHx8IDI7XHJcblxyXG4gICAgICB0aGlzLmZpbGxTdHlsZShiYWNrZ3JvdW5kKS5maWxsUmVjdCh4IC0gdyAvIDIgLSBwYWRkaW5nICogMiwgeSAtIHBhZGRpbmcsIHcgKyBwYWRkaW5nICogNCwgaCArIHBhZGRpbmcgKiAyKVxyXG4gICAgICB0aGlzLmZpbGxTdHlsZShmKS50ZXh0QWxpZ24oXCJjZW50ZXJcIikudGV4dEJhc2VsaW5lKFwidG9wXCIpLmZpbGxUZXh0KHRleHQsIHgsIHkpO1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIGZpbGxDaXJjbGU6IGZ1bmN0aW9uKHgsIHksIHIpIHtcclxuICAgICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xyXG4gICAgICB0aGlzLmNvbnRleHQuYXJjKHgsIHksIHIsIDAsIE1hdGguUEkgKiAyKTtcclxuICAgICAgdGhpcy5jb250ZXh0LmZpbGwoKTtcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0cm9rZUNpcmNsZTogZnVuY3Rpb24oeCwgeSwgcikge1xyXG4gICAgICB0aGlzLmNvbnRleHQuYmVnaW5QYXRoKCk7XHJcbiAgICAgIHRoaXMuY29udGV4dC5hcmMoeCwgeSwgciwgMCwgTWF0aC5QSSAqIDIpO1xyXG4gICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlKCk7XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICBjaXJjbGU6IGZ1bmN0aW9uKHgsIHksIHIpIHtcclxuICAgICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xyXG4gICAgICB0aGlzLmNvbnRleHQuYXJjKHgsIHksIHIsIDAsIE1hdGguUEkgKiAyKTtcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIGNyb3A6IGZ1bmN0aW9uKHgsIHksIHcsIGgpIHtcclxuXHJcbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XHJcblxyXG4gICAgICAgIHZhciB5ID0gYXJndW1lbnRzWzBdWzFdO1xyXG4gICAgICAgIHZhciB3ID0gYXJndW1lbnRzWzBdWzJdO1xyXG4gICAgICAgIHZhciBoID0gYXJndW1lbnRzWzBdWzNdO1xyXG4gICAgICAgIHZhciB4ID0gYXJndW1lbnRzWzBdWzBdO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgY2FudmFzID0gY3EuY3JlYXRlQ2FudmFzKHcsIGgpO1xyXG4gICAgICB2YXIgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcblxyXG4gICAgICBjb250ZXh0LmRyYXdJbWFnZSh0aGlzLmNhbnZhcywgeCwgeSwgdywgaCwgMCwgMCwgdywgaCk7XHJcbiAgICAgIHRoaXMuY2FudmFzLndpZHRoID0gdztcclxuICAgICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gaDtcclxuICAgICAgdGhpcy5jbGVhcigpO1xyXG4gICAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKGNhbnZhcywgMCwgMCk7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbihwcm9wZXJ0aWVzKSB7XHJcbiAgICAgIGNxLmV4dGVuZCh0aGlzLmNvbnRleHQsIHByb3BlcnRpZXMpO1xyXG4gICAgfSxcclxuXHJcbiAgICByZXNpemU6IGZ1bmN0aW9uKHdpZHRoLCBoZWlnaHQpIHtcclxuICAgICAgdmFyIHcgPSB3aWR0aCxcclxuICAgICAgICBoID0gaGVpZ2h0O1xyXG5cclxuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICB3ID0gYXJndW1lbnRzWzBdICogdGhpcy5jYW52YXMud2lkdGggfCAwO1xyXG4gICAgICAgIGggPSBhcmd1bWVudHNbMF0gKiB0aGlzLmNhbnZhcy5oZWlnaHQgfCAwO1xyXG4gICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICBpZiAoaGVpZ2h0ID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgaWYgKHRoaXMuY2FudmFzLndpZHRoID4gd2lkdGgpIHtcclxuICAgICAgICAgICAgaCA9IHRoaXMuY2FudmFzLmhlaWdodCAqICh3aWR0aCAvIHRoaXMuY2FudmFzLndpZHRoKSB8IDA7XHJcbiAgICAgICAgICAgIHcgPSB3aWR0aDtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHcgPSB0aGlzLmNhbnZhcy53aWR0aDtcclxuICAgICAgICAgICAgaCA9IHRoaXMuY2FudmFzLmhlaWdodDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKHdpZHRoID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgaWYgKHRoaXMuY2FudmFzLndpZHRoID4gd2lkdGgpIHtcclxuICAgICAgICAgICAgdyA9IHRoaXMuY2FudmFzLndpZHRoICogKGhlaWdodCAvIHRoaXMuY2FudmFzLmhlaWdodCkgfCAwO1xyXG4gICAgICAgICAgICBoID0gaGVpZ2h0O1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdyA9IHRoaXMuY2FudmFzLndpZHRoO1xyXG4gICAgICAgICAgICBoID0gdGhpcy5jYW52YXMuaGVpZ2h0O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIGNxcmVzaXplZCA9IGNxKHcsIGgpLmRyYXdJbWFnZSh0aGlzLmNhbnZhcywgMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCwgMCwgMCwgdywgaCk7XHJcbiAgICAgIHRoaXMuY2FudmFzID0gY3FyZXNpemVkLmNhbnZhcztcclxuICAgICAgdGhpcy5jb250ZXh0ID0gY3FyZXNpemVkLmNvbnRleHQ7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgaW1hZ2VMaW5lOiBmdW5jdGlvbihpbWFnZSwgcmVnaW9uLCB4LCB5LCBleCwgZXksIHNjYWxlKSB7XHJcbiAgICAgIGlmICghcmVnaW9uKSByZWdpb24gPSBbMCwgMCwgaW1hZ2Uud2lkdGgsIGltYWdlLmhlaWdodF07XHJcblxyXG4gICAgICB2YXIgZGlzdGFuY2UgPSBjcS5kaXN0YW5jZSh4LCB5LCBleCwgZXkpO1xyXG4gICAgICB2YXIgY291bnQgPSBkaXN0YW5jZSAvIHJlZ2lvblszXSArIDAuNSB8IDA7XHJcbiAgICAgIHZhciBhbmdsZSA9IE1hdGguYXRhbjIoZXkgLSB5LCBleCAtIHgpICsgTWF0aC5QSSAvIDI7XHJcblxyXG4gICAgICB0aGlzLnNhdmUoKTtcclxuXHJcbiAgICAgIHRoaXMudHJhbnNsYXRlKHgsIHkpO1xyXG4gICAgICB0aGlzLnJvdGF0ZShhbmdsZSk7XHJcblxyXG4gICAgICBpZiAoc2NhbGUpIHRoaXMuc2NhbGUoc2NhbGUsIDEuMCk7XHJcblxyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8PSBjb3VudDsgaSsrKSB7XHJcbiAgICAgICAgdGhpcy5kcmF3UmVnaW9uKGltYWdlLCByZWdpb24sIC1yZWdpb25bMl0gLyAyIHwgMCwgLXJlZ2lvblszXSAqIChpICsgMSkpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLnJlc3RvcmUoKTtcclxuXHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICB0cmltOiBmdW5jdGlvbihjb2xvciwgY2hhbmdlcykge1xyXG4gICAgICB2YXIgdHJhbnNwYXJlbnQ7XHJcblxyXG4gICAgICBpZiAoY29sb3IpIHtcclxuICAgICAgICBjb2xvciA9IGNxLmNvbG9yKGNvbG9yKS50b0FycmF5KCk7XHJcbiAgICAgICAgdHJhbnNwYXJlbnQgPSAhY29sb3JbM107XHJcbiAgICAgIH0gZWxzZSB0cmFuc3BhcmVudCA9IHRydWU7XHJcblxyXG4gICAgICB2YXIgc291cmNlRGF0YSA9IHRoaXMuY29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XHJcbiAgICAgIHZhciBzb3VyY2VQaXhlbHMgPSBzb3VyY2VEYXRhLmRhdGE7XHJcblxyXG4gICAgICB2YXIgYm91bmQgPSBbdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCwgMCwgMF07XHJcblxyXG4gICAgICB2YXIgd2lkdGggPSB0aGlzLmNhbnZhcy53aWR0aDtcclxuICAgICAgdmFyIGhlaWdodCA9IHRoaXMuY2FudmFzLmhlaWdodDtcclxuXHJcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBzb3VyY2VQaXhlbHMubGVuZ3RoOyBpIDwgbGVuOyBpICs9IDQpIHtcclxuICAgICAgICBpZiAodHJhbnNwYXJlbnQpIHtcclxuICAgICAgICAgIGlmICghc291cmNlUGl4ZWxzW2kgKyAzXSkgY29udGludWU7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzb3VyY2VQaXhlbHNbaSArIDBdID09PSBjb2xvclswXSAmJiBzb3VyY2VQaXhlbHNbaSArIDFdID09PSBjb2xvclsxXSAmJiBzb3VyY2VQaXhlbHNbaSArIDJdID09PSBjb2xvclsyXSkgY29udGludWU7XHJcblxyXG4gICAgICAgIHZhciB4ID0gKGkgLyA0IHwgMCkgJSB0aGlzLmNhbnZhcy53aWR0aCB8IDA7XHJcbiAgICAgICAgdmFyIHkgPSAoaSAvIDQgfCAwKSAvIHRoaXMuY2FudmFzLndpZHRoIHwgMDtcclxuXHJcbiAgICAgICAgaWYgKHggPCBib3VuZFswXSkgYm91bmRbMF0gPSB4O1xyXG4gICAgICAgIGlmICh4ID4gYm91bmRbMl0pIGJvdW5kWzJdID0geDtcclxuXHJcbiAgICAgICAgaWYgKHkgPCBib3VuZFsxXSkgYm91bmRbMV0gPSB5O1xyXG4gICAgICAgIGlmICh5ID4gYm91bmRbM10pIGJvdW5kWzNdID0geTtcclxuICAgICAgfVxyXG5cclxuXHJcbiAgICAgIGlmIChib3VuZFsyXSA9PT0gMCAmJiBib3VuZFszXSA9PT0gMCkge30gZWxzZSB7XHJcbiAgICAgICAgaWYgKGNoYW5nZXMpIHtcclxuICAgICAgICAgIGNoYW5nZXMubGVmdCA9IGJvdW5kWzBdO1xyXG4gICAgICAgICAgY2hhbmdlcy50b3AgPSBib3VuZFsxXTtcclxuXHJcbiAgICAgICAgICBjaGFuZ2VzLmJvdHRvbSA9IGhlaWdodCAtIGJvdW5kWzNdO1xyXG4gICAgICAgICAgY2hhbmdlcy5yaWdodCA9IHdpZHRoIC0gYm91bmRbMl0gLSBib3VuZFswXTtcclxuXHJcbiAgICAgICAgICBjaGFuZ2VzLndpZHRoID0gYm91bmRbMl0gLSBib3VuZFswXTtcclxuICAgICAgICAgIGNoYW5nZXMuaGVpZ2h0ID0gYm91bmRbM10gLSBib3VuZFsxXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY3JvcChib3VuZFswXSwgYm91bmRbMV0sIGJvdW5kWzJdIC0gYm91bmRbMF0gKyAxLCBib3VuZFszXSAtIGJvdW5kWzFdICsgMSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICBtYXRjaFBhbGV0dGU6IGZ1bmN0aW9uKHBhbGV0dGUpIHtcclxuICAgICAgdmFyIGltZ0RhdGEgPSB0aGlzLmNvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xyXG5cclxuICAgICAgdmFyIHJnYlBhbGV0dGUgPSBbXTtcclxuXHJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFsZXR0ZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHJnYlBhbGV0dGUucHVzaChjcS5jb2xvcihwYWxldHRlW2ldKSk7XHJcbiAgICAgIH1cclxuXHJcblxyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGltZ0RhdGEuZGF0YS5sZW5ndGg7IGkgKz0gNCkge1xyXG4gICAgICAgIHZhciBkaWZMaXN0ID0gW107XHJcbiAgICAgICAgaWYgKCFpbWdEYXRhLmRhdGFbaSArIDNdKSBjb250aW51ZTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCByZ2JQYWxldHRlLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICB2YXIgcmdiVmFsID0gcmdiUGFsZXR0ZVtqXTtcclxuICAgICAgICAgIHZhciByRGlmID0gTWF0aC5hYnMoaW1nRGF0YS5kYXRhW2ldIC0gcmdiVmFsWzBdKSxcclxuICAgICAgICAgICAgZ0RpZiA9IE1hdGguYWJzKGltZ0RhdGEuZGF0YVtpICsgMV0gLSByZ2JWYWxbMV0pLFxyXG4gICAgICAgICAgICBiRGlmID0gTWF0aC5hYnMoaW1nRGF0YS5kYXRhW2kgKyAyXSAtIHJnYlZhbFsyXSk7XHJcbiAgICAgICAgICBkaWZMaXN0LnB1c2gockRpZiArIGdEaWYgKyBiRGlmKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBjbG9zZXN0TWF0Y2ggPSAwO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHBhbGV0dGUubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgIGlmIChkaWZMaXN0W2pdIDwgZGlmTGlzdFtjbG9zZXN0TWF0Y2hdKSB7XHJcbiAgICAgICAgICAgIGNsb3Nlc3RNYXRjaCA9IGo7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgcGFsZXR0ZVJnYiA9IGNxLmhleFRvUmdiKHBhbGV0dGVbY2xvc2VzdE1hdGNoXSk7XHJcbiAgICAgICAgaW1nRGF0YS5kYXRhW2ldID0gcGFsZXR0ZVJnYlswXTtcclxuICAgICAgICBpbWdEYXRhLmRhdGFbaSArIDFdID0gcGFsZXR0ZVJnYlsxXTtcclxuICAgICAgICBpbWdEYXRhLmRhdGFbaSArIDJdID0gcGFsZXR0ZVJnYlsyXTtcclxuXHJcbiAgICAgICAgLyogZGl0aGVyaW5nICovXHJcbiAgICAgICAgLy9pbWdEYXRhLmRhdGFbaSArIDNdID0gKDI1NSAqIE1hdGgucmFuZG9tKCkgPCBpbWdEYXRhLmRhdGFbaSArIDNdKSA/IDI1NSA6IDA7XHJcblxyXG4gICAgICAgIC8vaW1nRGF0YS5kYXRhW2kgKyAzXSA9IGltZ0RhdGEuZGF0YVtpICsgM10gPiAxMjggPyAyNTUgOiAwO1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgaWYgKGkgJSAzID09PSAwKSB7XHJcbiAgICAgICAgICBpbWdEYXRhLmRhdGFbaV0gLT0gY3EubGltaXRWYWx1ZShpbWdEYXRhLmRhdGFbaV0gLSA1MCwgMCwgMjU1KTtcclxuICAgICAgICAgIGltZ0RhdGEuZGF0YVtpICsgMV0gLT0gY3EubGltaXRWYWx1ZShpbWdEYXRhLmRhdGFbaSArIDFdIC0gNTAsIDAsIDI1NSk7XHJcbiAgICAgICAgICBpbWdEYXRhLmRhdGFbaSArIDJdIC09IGNxLmxpbWl0VmFsdWUoaW1nRGF0YS5kYXRhW2kgKyAyXSAtIDUwLCAwLCAyNTUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAqL1xyXG5cclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5jb250ZXh0LnB1dEltYWdlRGF0YShpbWdEYXRhLCAwLCAwKTtcclxuXHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXRQYWxldHRlOiBmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIHBhbGV0dGUgPSBbXTtcclxuICAgICAgdmFyIHNvdXJjZURhdGEgPSB0aGlzLmNvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xyXG4gICAgICB2YXIgc291cmNlUGl4ZWxzID0gc291cmNlRGF0YS5kYXRhO1xyXG5cclxuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHNvdXJjZVBpeGVscy5sZW5ndGg7IGkgPCBsZW47IGkgKz0gNCkge1xyXG4gICAgICAgIGlmIChzb3VyY2VQaXhlbHNbaSArIDNdKSB7XHJcbiAgICAgICAgICB2YXIgaGV4ID0gY3EucmdiVG9IZXgoc291cmNlUGl4ZWxzW2kgKyAwXSwgc291cmNlUGl4ZWxzW2kgKyAxXSwgc291cmNlUGl4ZWxzW2kgKyAyXSk7XHJcbiAgICAgICAgICBpZiAocGFsZXR0ZS5pbmRleE9mKGhleCkgPT09IC0xKSBwYWxldHRlLnB1c2goaGV4KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBwYWxldHRlO1xyXG4gICAgfSxcclxuXHJcbiAgICBtYXBQYWxldHRlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGJlZ2luUGF0aDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICB0aGlzLmNvbnRleHQuYmVnaW5QYXRoKCk7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIG1vdmVUbzogZnVuY3Rpb24oeCwgeSkge1xyXG5cclxuICAgICAgdGhpcy5jb250ZXh0Lm1vdmVUbyh4LCB5KTtcclxuXHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgZmlsbFRleHQ6IGZ1bmN0aW9uKHRleHQsIHgsIHkpIHtcclxuXHJcbiAgICAgIHRoaXMuY29udGV4dC5maWxsVGV4dCh0ZXh0LCB4LCB5KTtcclxuXHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgc3Ryb2tlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgIHRoaXMuY29udGV4dC5zdHJva2UoKTtcclxuXHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgcG9seWdvbjogZnVuY3Rpb24oYXJyYXkpIHtcclxuXHJcbiAgICAgIHRoaXMuYmVnaW5QYXRoKCk7XHJcblxyXG4gICAgICB0aGlzLm1vdmVUbyhhcnJheVswXVswXSwgYXJyYXlbMF1bMV0pO1xyXG5cclxuICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHRoaXMubGluZVRvKGFycmF5W2ldWzBdLCBhcnJheVtpXVsxXSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuY2xvc2VQYXRoKCk7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgZmlsbFBvbHlnb246IGZ1bmN0aW9uKHBvbHlnb24pIHtcclxuICAgICAgdGhpcy5iZWdpblBhdGgoKTtcclxuICAgICAgdGhpcy5wb2x5Z29uKHBvbHlnb24pO1xyXG4gICAgICB0aGlzLmZpbGwoKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3Ryb2tlUG9seWdvbjogZnVuY3Rpb24ocG9seWdvbikge1xyXG4gICAgICB0aGlzLmJlZ2luUGF0aCgpO1xyXG4gICAgICB0aGlzLnBvbHlnb24ocG9seWdvbik7XHJcbiAgICAgIHRoaXMuc3Ryb2tlKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNvbG9yVG9NYXNrOiBmdW5jdGlvbihjb2xvciwgaW52ZXJ0ZWQpIHtcclxuICAgICAgY29sb3IgPSBjcS5jb2xvcihjb2xvcikudG9BcnJheSgpO1xyXG4gICAgICB2YXIgc291cmNlRGF0YSA9IHRoaXMuY29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XHJcbiAgICAgIHZhciBzb3VyY2VQaXhlbHMgPSBzb3VyY2VEYXRhLmRhdGE7XHJcblxyXG4gICAgICB2YXIgbWFzayA9IFtdO1xyXG5cclxuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHNvdXJjZVBpeGVscy5sZW5ndGg7IGkgPCBsZW47IGkgKz0gNCkge1xyXG4gICAgICAgIGlmIChzb3VyY2VQaXhlbHNbaSArIDNdID4gMCkgbWFzay5wdXNoKGludmVydGVkID8gZmFsc2UgOiB0cnVlKTtcclxuICAgICAgICBlbHNlIG1hc2sucHVzaChpbnZlcnRlZCA/IHRydWUgOiBmYWxzZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBtYXNrO1xyXG4gICAgfSxcclxuXHJcbiAgICBncmF5c2NhbGVUb01hc2s6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgdmFyIHNvdXJjZURhdGEgPSB0aGlzLmNvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xyXG4gICAgICB2YXIgc291cmNlUGl4ZWxzID0gc291cmNlRGF0YS5kYXRhO1xyXG5cclxuICAgICAgdmFyIG1hc2sgPSBbXTtcclxuXHJcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBzb3VyY2VQaXhlbHMubGVuZ3RoOyBpIDwgbGVuOyBpICs9IDQpIHtcclxuICAgICAgICBtYXNrLnB1c2goKChzb3VyY2VQaXhlbHNbaSArIDBdICsgc291cmNlUGl4ZWxzW2kgKyAxXSArIHNvdXJjZVBpeGVsc1tpICsgMl0pIC8gMykgLyAyNTUpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gbWFzaztcclxuICAgIH0sXHJcblxyXG4gICAgYXBwbHlNYXNrOiBmdW5jdGlvbihtYXNrKSB7XHJcbiAgICAgIHZhciBzb3VyY2VEYXRhID0gdGhpcy5jb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcclxuICAgICAgdmFyIHNvdXJjZVBpeGVscyA9IHNvdXJjZURhdGEuZGF0YTtcclxuXHJcbiAgICAgIHZhciBtb2RlID0gdHlwZW9mIG1hc2tbMF0gPT09IFwiYm9vbGVhblwiID8gXCJib29sXCIgOiBcImJ5dGVcIjtcclxuXHJcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBzb3VyY2VQaXhlbHMubGVuZ3RoOyBpIDwgbGVuOyBpICs9IDQpIHtcclxuICAgICAgICB2YXIgdmFsdWUgPSBtYXNrW2kgLyA0XTtcclxuICAgICAgICBzb3VyY2VQaXhlbHNbaSArIDNdID0gdmFsdWUgKiAyNTUgfCAwO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLmNvbnRleHQucHV0SW1hZ2VEYXRhKHNvdXJjZURhdGEsIDAsIDApO1xyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgZmlsbE1hc2s6IGZ1bmN0aW9uKG1hc2spIHtcclxuXHJcbiAgICAgIHZhciBzb3VyY2VEYXRhID0gdGhpcy5jb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcclxuICAgICAgdmFyIHNvdXJjZVBpeGVscyA9IHNvdXJjZURhdGEuZGF0YTtcclxuXHJcbiAgICAgIHZhciBtYXNrVHlwZSA9IHR5cGVvZiBtYXNrWzBdID09PSBcImJvb2xlYW5cIiA/IFwiYm9vbFwiIDogXCJieXRlXCI7XHJcbiAgICAgIHZhciBjb2xvck1vZGUgPSBhcmd1bWVudHMubGVuZ3RoID09PSAyID8gXCJub3JtYWxcIiA6IFwiZ3JhZGllbnRcIjtcclxuXHJcbiAgICAgIHZhciBjb2xvciA9IGNxLmNvbG9yKGFyZ3VtZW50c1sxXSk7XHJcbiAgICAgIGlmIChjb2xvck1vZGUgPT09IFwiZ3JhZGllbnRcIikgY29sb3JCID0gY3EuY29sb3IoYXJndW1lbnRzWzJdKTtcclxuXHJcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBzb3VyY2VQaXhlbHMubGVuZ3RoOyBpIDwgbGVuOyBpICs9IDQpIHtcclxuICAgICAgICB2YXIgdmFsdWUgPSBtYXNrW2kgLyA0XTtcclxuXHJcbiAgICAgICAgaWYgKG1hc2tUeXBlID09PSBcImJ5dGVcIikgdmFsdWUgLz0gMjU1O1xyXG5cclxuICAgICAgICBpZiAoY29sb3JNb2RlID09PSBcIm5vcm1hbFwiKSB7XHJcbiAgICAgICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICAgICAgc291cmNlUGl4ZWxzW2kgKyAwXSA9IGNvbG9yWzBdIHwgMDtcclxuICAgICAgICAgICAgc291cmNlUGl4ZWxzW2kgKyAxXSA9IGNvbG9yWzFdIHwgMDtcclxuICAgICAgICAgICAgc291cmNlUGl4ZWxzW2kgKyAyXSA9IGNvbG9yWzJdIHwgMDtcclxuICAgICAgICAgICAgc291cmNlUGl4ZWxzW2kgKyAzXSA9IHZhbHVlICogMjU1IHwgMDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgc291cmNlUGl4ZWxzW2kgKyAwXSA9IGNvbG9yWzBdICsgKGNvbG9yQlswXSAtIGNvbG9yWzBdKSAqIHZhbHVlIHwgMDtcclxuICAgICAgICAgIHNvdXJjZVBpeGVsc1tpICsgMV0gPSBjb2xvclsxXSArIChjb2xvckJbMV0gLSBjb2xvclsxXSkgKiB2YWx1ZSB8IDA7XHJcbiAgICAgICAgICBzb3VyY2VQaXhlbHNbaSArIDJdID0gY29sb3JbMl0gKyAoY29sb3JCWzJdIC0gY29sb3JbMl0pICogdmFsdWUgfCAwO1xyXG4gICAgICAgICAgc291cmNlUGl4ZWxzW2kgKyAzXSA9IDI1NTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuY29udGV4dC5wdXRJbWFnZURhdGEoc291cmNlRGF0YSwgMCwgMCk7XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICBjbGVhcjogZnVuY3Rpb24oY29sb3IpIHtcclxuICAgICAgaWYgKGNvbG9yKSB7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IGNvbG9yO1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5maWxsUmVjdCgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgY2xvbmU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgLy8gdmFyIHJlc3VsdCA9IGNxLmNyZWF0ZUNhbnZhcyh0aGlzLmNhbnZhcyk7XHJcblxyXG4gICAgICB2YXIgcmVzdWx0ID0gY3EucG9vbCgpO1xyXG4gICAgICByZXN1bHQud2lkdGggPSB0aGlzLndpZHRoO1xyXG4gICAgICByZXN1bHQuaGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XHJcbiAgICAgIHJlc3VsdC5nZXRDb250ZXh0KFwiMmRcIikuZHJhd0ltYWdlKHRoaXMuY2FudmFzLCAwLCAwKTtcclxuXHJcbiAgICAgIHJldHVybiBjcShyZXN1bHQpO1xyXG4gICAgfSxcclxuXHJcbiAgICBncmFkaWVudFRleHQ6IGZ1bmN0aW9uKHRleHQsIHgsIHksIG1heFdpZHRoLCBncmFkaWVudCkge1xyXG5cclxuICAgICAgdmFyIHdvcmRzID0gdGV4dC5zcGxpdChcIiBcIik7XHJcblxyXG4gICAgICB2YXIgaCA9IHRoaXMuZm9udEhlaWdodCgpICogMjtcclxuXHJcbiAgICAgIHZhciBveCA9IDA7XHJcbiAgICAgIHZhciBveSA9IDA7XHJcblxyXG4gICAgICBpZiAobWF4V2lkdGgpIHtcclxuICAgICAgICB2YXIgbGluZSA9IDA7XHJcbiAgICAgICAgdmFyIGxpbmVzID0gW1wiXCJdO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHdvcmRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICB2YXIgd29yZCA9IHdvcmRzW2ldICsgXCIgXCI7XHJcbiAgICAgICAgICB2YXIgd29yZFdpZHRoID0gdGhpcy5jb250ZXh0Lm1lYXN1cmVUZXh0KHdvcmQpLndpZHRoO1xyXG5cclxuICAgICAgICAgIGlmIChveCArIHdvcmRXaWR0aCA+IG1heFdpZHRoKSB7XHJcbiAgICAgICAgICAgIGxpbmVzWysrbGluZV0gPSBcIlwiO1xyXG4gICAgICAgICAgICBveCA9IDA7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgbGluZXNbbGluZV0gKz0gd29yZDtcclxuXHJcbiAgICAgICAgICBveCArPSB3b3JkV2lkdGg7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgdmFyIGxpbmVzID0gW3RleHRdO1xyXG5cclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciBveSA9IHkgKyBpICogaCAqIDAuNiB8IDA7XHJcbiAgICAgICAgdmFyIGxpbmdyYWQgPSB0aGlzLmNvbnRleHQuY3JlYXRlTGluZWFyR3JhZGllbnQoMCwgb3ksIDAsIG95ICsgaCAqIDAuNiB8IDApO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGdyYWRpZW50Lmxlbmd0aDsgaiArPSAyKSB7XHJcbiAgICAgICAgICBsaW5ncmFkLmFkZENvbG9yU3RvcChncmFkaWVudFtqXSwgZ3JhZGllbnRbaiArIDFdKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciB0ZXh0ID0gbGluZXNbaV07XHJcblxyXG4gICAgICAgIHRoaXMuZmlsbFN0eWxlKGxpbmdyYWQpLmZpbGxUZXh0KHRleHQsIHgsIG95KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIHJlbW92ZUNvbG9yOiBmdW5jdGlvbihjb2xvcikge1xyXG5cclxuICAgICAgY29sb3IgPSBjcS5jb2xvcihjb2xvcik7XHJcblxyXG4gICAgICB2YXIgZGF0YSA9IHRoaXMuY29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XHJcbiAgICAgIHZhciBwaXhlbHMgPSBkYXRhLmRhdGE7XHJcblxyXG4gICAgICBmb3IgKHZhciB4ID0gMDsgeCA8IHRoaXMuY2FudmFzLndpZHRoOyB4KyspIHtcclxuICAgICAgICBmb3IgKHZhciB5ID0gMDsgeSA8IHRoaXMuY2FudmFzLmhlaWdodDsgeSsrKSB7XHJcbiAgICAgICAgICB2YXIgaSA9ICh5ICogdGhpcy5jYW52YXMud2lkdGggKyB4KSAqIDQ7XHJcblxyXG4gICAgICAgICAgaWYgKHBpeGVsc1tpICsgMF0gPT09IGNvbG9yWzBdICYmIHBpeGVsc1tpICsgMV0gPT09IGNvbG9yWzFdICYmIHBpeGVsc1tpICsgMl0gPT09IGNvbG9yWzJdKSB7XHJcbiAgICAgICAgICAgIHBpeGVsc1tpICsgM10gPSAwO1xyXG4gICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLmNsZWFyKCk7XHJcbiAgICAgIHRoaXMuY29udGV4dC5wdXRJbWFnZURhdGEoZGF0YSwgMCwgMCk7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgb3V0bGluZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBkYXRhID0gdGhpcy5jb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcclxuICAgICAgdmFyIHBpeGVscyA9IGRhdGEuZGF0YTtcclxuXHJcbiAgICAgIHZhciBuZXdEYXRhID0gdGhpcy5jcmVhdGVJbWFnZURhdGEodGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XHJcbiAgICAgIHZhciBuZXdQaXhlbHMgPSBuZXdEYXRhLmRhdGE7XHJcblxyXG4gICAgICB2YXIgY2FudmFzID0gdGhpcy5jYW52YXM7XHJcblxyXG4gICAgICBmdW5jdGlvbiBjaGVjayh4LCB5KSB7XHJcblxyXG4gICAgICAgIGlmICh4IDwgMCkgcmV0dXJuIDA7XHJcbiAgICAgICAgaWYgKHggPj0gY2FudmFzLndpZHRoKSByZXR1cm4gMDtcclxuICAgICAgICBpZiAoeSA8IDApIHJldHVybiAwO1xyXG4gICAgICAgIGlmICh5ID49IGNhbnZhcy5oZWlnaHQpIHJldHVybiAwO1xyXG5cclxuICAgICAgICB2YXIgaSA9ICh4ICsgeSAqIGNhbnZhcy53aWR0aCkgKiA0O1xyXG5cclxuICAgICAgICByZXR1cm4gcGl4ZWxzW2kgKyAzXSA+IDA7XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgICBmb3IgKHZhciB4ID0gMDsgeCA8IHRoaXMuY2FudmFzLndpZHRoOyB4KyspIHtcclxuICAgICAgICBmb3IgKHZhciB5ID0gMDsgeSA8IHRoaXMuY2FudmFzLmhlaWdodDsgeSsrKSB7XHJcblxyXG4gICAgICAgICAgdmFyIGZ1bGwgPSAwO1xyXG4gICAgICAgICAgdmFyIGkgPSAoeSAqIGNhbnZhcy53aWR0aCArIHgpICogNDtcclxuXHJcbiAgICAgICAgICBpZiAoIXBpeGVsc1tpICsgM10pIGNvbnRpbnVlO1xyXG5cclxuICAgICAgICAgIGZ1bGwgKz0gY2hlY2soeCAtIDEsIHkpO1xyXG4gICAgICAgICAgZnVsbCArPSBjaGVjayh4ICsgMSwgeSk7XHJcbiAgICAgICAgICBmdWxsICs9IGNoZWNrKHgsIHkgLSAxKTtcclxuICAgICAgICAgIGZ1bGwgKz0gY2hlY2soeCwgeSArIDEpO1xyXG5cclxuICAgICAgICAgIGlmIChmdWxsICE9PSA0KSB7XHJcblxyXG4gICAgICAgICAgICBuZXdQaXhlbHNbaV0gPSAyNTU7XHJcbiAgICAgICAgICAgIG5ld1BpeGVsc1tpICsgMV0gPSAyNTU7XHJcbiAgICAgICAgICAgIG5ld1BpeGVsc1tpICsgMl0gPSAyNTU7XHJcbiAgICAgICAgICAgIG5ld1BpeGVsc1tpICsgM10gPSAyNTU7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5jb250ZXh0LnB1dEltYWdlRGF0YShuZXdEYXRhLCAwLCAwKTtcclxuXHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXRIc2w6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICB2YXIgYXJncyA9IGFyZ3VtZW50c1swXTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIGRhdGEgPSB0aGlzLmNvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xyXG4gICAgICB2YXIgcGl4ZWxzID0gZGF0YS5kYXRhO1xyXG4gICAgICB2YXIgciwgZywgYiwgYSwgaCwgcywgbCwgaHNsID0gW10sXHJcbiAgICAgICAgbmV3UGl4ZWwgPSBbXTtcclxuXHJcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBwaXhlbHMubGVuZ3RoOyBpIDwgbGVuOyBpICs9IDQpIHtcclxuICAgICAgICBoc2wgPSBjcS5yZ2JUb0hzbChwaXhlbHNbaSArIDBdLCBwaXhlbHNbaSArIDFdLCBwaXhlbHNbaSArIDJdKTtcclxuXHJcbiAgICAgICAgaCA9IGFyZ3NbMF0gPT09IGZhbHNlID8gaHNsWzBdIDogY3EubGltaXRWYWx1ZShhcmdzWzBdLCAwLCAxKTtcclxuICAgICAgICBzID0gYXJnc1sxXSA9PT0gZmFsc2UgPyBoc2xbMV0gOiBjcS5saW1pdFZhbHVlKGFyZ3NbMV0sIDAsIDEpO1xyXG4gICAgICAgIGwgPSBhcmdzWzJdID09PSBmYWxzZSA/IGhzbFsyXSA6IGNxLmxpbWl0VmFsdWUoYXJnc1syXSwgMCwgMSk7XHJcblxyXG4gICAgICAgIG5ld1BpeGVsID0gY3EuaHNsVG9SZ2IoaCwgcywgbCk7XHJcblxyXG4gICAgICAgIHBpeGVsc1tpICsgMF0gPSBuZXdQaXhlbFswXTtcclxuICAgICAgICBwaXhlbHNbaSArIDFdID0gbmV3UGl4ZWxbMV07XHJcbiAgICAgICAgcGl4ZWxzW2kgKyAyXSA9IG5ld1BpeGVsWzJdO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLmNvbnRleHQucHV0SW1hZ2VEYXRhKGRhdGEsIDAsIDApO1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIHNoaWZ0SHNsOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHNbMF07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBkYXRhID0gdGhpcy5jb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcclxuICAgICAgdmFyIHBpeGVscyA9IGRhdGEuZGF0YTtcclxuICAgICAgdmFyIHIsIGcsIGIsIGEsIGgsIHMsIGwsIGhzbCA9IFtdLFxyXG4gICAgICAgIG5ld1BpeGVsID0gW107XHJcblxyXG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gcGl4ZWxzLmxlbmd0aDsgaSA8IGxlbjsgaSArPSA0KSB7XHJcbiAgICAgICAgaHNsID0gY3EucmdiVG9Ic2wocGl4ZWxzW2kgKyAwXSwgcGl4ZWxzW2kgKyAxXSwgcGl4ZWxzW2kgKyAyXSk7XHJcblxyXG4gICAgICAgIGlmIChwaXhlbHNbaSArIDBdICE9PSBwaXhlbHNbaSArIDFdIHx8IHBpeGVsc1tpICsgMV0gIT09IHBpeGVsc1tpICsgMl0pIHtcclxuICAgICAgICAgIGggPSBhcmdzWzBdID09PSBmYWxzZSA/IGhzbFswXSA6IGNxLndyYXBWYWx1ZShoc2xbMF0gKyBhcmdzWzBdLCAwLCAxKTtcclxuICAgICAgICAgIHMgPSBhcmdzWzFdID09PSBmYWxzZSA/IGhzbFsxXSA6IGNxLmxpbWl0VmFsdWUoaHNsWzFdICsgYXJnc1sxXSwgMCwgMSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGggPSBoc2xbMF07XHJcbiAgICAgICAgICBzID0gaHNsWzFdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbCA9IGFyZ3NbMl0gPT09IGZhbHNlID8gaHNsWzJdIDogY3EubGltaXRWYWx1ZShoc2xbMl0gKyBhcmdzWzJdLCAwLCAxKTtcclxuXHJcbiAgICAgICAgbmV3UGl4ZWwgPSBjcS5oc2xUb1JnYihoLCBzLCBsKTtcclxuXHJcbiAgICAgICAgcGl4ZWxzW2kgKyAwXSA9IG5ld1BpeGVsWzBdO1xyXG4gICAgICAgIHBpeGVsc1tpICsgMV0gPSBuZXdQaXhlbFsxXTtcclxuICAgICAgICBwaXhlbHNbaSArIDJdID0gbmV3UGl4ZWxbMl07XHJcbiAgICAgIH1cclxuXHJcblxyXG4gICAgICB0aGlzLmNvbnRleHQucHV0SW1hZ2VEYXRhKGRhdGEsIDAsIDApO1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIGFwcGx5Q29sb3I6IGZ1bmN0aW9uKGNvbG9yKSB7XHJcblxyXG4gICAgICBpZiAoQ09DT09OSlMpIHJldHVybiB0aGlzO1xyXG4gICAgICB0aGlzLnNhdmUoKTtcclxuXHJcbiAgICAgIHRoaXMuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uKFwic291cmNlLWluXCIpO1xyXG4gICAgICB0aGlzLmNsZWFyKGNvbG9yKTtcclxuXHJcbiAgICAgIHRoaXMucmVzdG9yZSgpO1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIG5lZ2F0aXZlOiBmdW5jdGlvbihzcmMsIGRzdCkge1xyXG5cclxuICAgICAgdmFyIGRhdGEgPSB0aGlzLmNvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xyXG4gICAgICB2YXIgcGl4ZWxzID0gZGF0YS5kYXRhO1xyXG4gICAgICB2YXIgciwgZywgYiwgYSwgaCwgcywgbCwgaHNsID0gW10sXHJcbiAgICAgICAgbmV3UGl4ZWwgPSBbXTtcclxuXHJcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBwaXhlbHMubGVuZ3RoOyBpIDwgbGVuOyBpICs9IDQpIHtcclxuICAgICAgICBwaXhlbHNbaSArIDBdID0gMjU1IC0gcGl4ZWxzW2kgKyAwXTtcclxuICAgICAgICBwaXhlbHNbaSArIDFdID0gMjU1IC0gcGl4ZWxzW2kgKyAxXTtcclxuICAgICAgICBwaXhlbHNbaSArIDJdID0gMjU1IC0gcGl4ZWxzW2kgKyAyXTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5jb250ZXh0LnB1dEltYWdlRGF0YShkYXRhLCAwLCAwKTtcclxuXHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICByb3VuZFJlY3Q6IGZ1bmN0aW9uKHgsIHksIHdpZHRoLCBoZWlnaHQsIHJhZGl1cykge1xyXG5cclxuICAgICAgdGhpcy5iZWdpblBhdGgoKTtcclxuICAgICAgdGhpcy5tb3ZlVG8oeCArIHJhZGl1cywgeSk7XHJcbiAgICAgIHRoaXMubGluZVRvKHggKyB3aWR0aCAtIHJhZGl1cywgeSk7XHJcbiAgICAgIHRoaXMucXVhZHJhdGljQ3VydmVUbyh4ICsgd2lkdGgsIHksIHggKyB3aWR0aCwgeSArIHJhZGl1cyk7XHJcbiAgICAgIHRoaXMubGluZVRvKHggKyB3aWR0aCwgeSArIGhlaWdodCAtIHJhZGl1cyk7XHJcbiAgICAgIHRoaXMucXVhZHJhdGljQ3VydmVUbyh4ICsgd2lkdGgsIHkgKyBoZWlnaHQsIHggKyB3aWR0aCAtIHJhZGl1cywgeSArIGhlaWdodCk7XHJcbiAgICAgIHRoaXMubGluZVRvKHggKyByYWRpdXMsIHkgKyBoZWlnaHQpO1xyXG4gICAgICB0aGlzLnF1YWRyYXRpY0N1cnZlVG8oeCwgeSArIGhlaWdodCwgeCwgeSArIGhlaWdodCAtIHJhZGl1cyk7XHJcbiAgICAgIHRoaXMubGluZVRvKHgsIHkgKyByYWRpdXMpO1xyXG4gICAgICB0aGlzLnF1YWRyYXRpY0N1cnZlVG8oeCwgeSwgeCArIHJhZGl1cywgeSk7XHJcbiAgICAgIHRoaXMuY2xvc2VQYXRoKCk7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgbWFya3VwVGV4dDogZnVuY3Rpb24odGV4dCkge1xyXG5cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHdyYXBwZWRUZXh0OiBmdW5jdGlvbih0ZXh0LCB4LCB5LCBtYXhXaWR0aCwgbGluZUhlaWdodCkge1xyXG5cclxuICAgICAgdmFyIHdvcmRzID0gdGV4dC5zcGxpdChcIiBcIik7XHJcblxyXG4gICAgICB2YXIgbGluZUhlaWdodCA9IGxpbmVIZWlnaHQgfHwgdGhpcy5mb250SGVpZ2h0KCk7XHJcblxyXG4gICAgICB2YXIgb3ggPSAwO1xyXG4gICAgICB2YXIgb3kgPSAwO1xyXG5cclxuICAgICAgaWYgKG1heFdpZHRoKSB7XHJcbiAgICAgICAgdmFyIGxpbmUgPSAwO1xyXG4gICAgICAgIHZhciBsaW5lcyA9IFtcIlwiXTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB3b3Jkcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgdmFyIHdvcmQgPSB3b3Jkc1tpXSArIFwiIFwiO1xyXG4gICAgICAgICAgdmFyIHdvcmRXaWR0aCA9IHRoaXMuY29udGV4dC5tZWFzdXJlVGV4dCh3b3JkKS53aWR0aDtcclxuXHJcbiAgICAgICAgICBpZiAob3ggKyB3b3JkV2lkdGggPiBtYXhXaWR0aCB8fCB3b3Jkc1tpXSA9PT0gXCJcXG5cIikge1xyXG4gICAgICAgICAgICBsaW5lc1srK2xpbmVdID0gXCJcIjtcclxuICAgICAgICAgICAgb3ggPSAwO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHdvcmRzW2ldICE9PSBcIlxcblwiKSB7XHJcbiAgICAgICAgICAgIGxpbmVzW2xpbmVdICs9IHdvcmQ7XHJcblxyXG4gICAgICAgICAgICBveCArPSB3b3JkV2lkdGg7XHJcbiAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIGxpbmVzID0gW3RleHRdO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpbmVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIG95ID0geSArIGkgKiBsaW5lSGVpZ2h0IHwgMDtcclxuXHJcbiAgICAgICAgdmFyIHRleHQgPSBsaW5lc1tpXTtcclxuXHJcbiAgICAgICAgdGhpcy5maWxsVGV4dCh0ZXh0LCB4LCBveSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICBmb250SGVpZ2h0czoge30sXHJcblxyXG4gICAgZm9udEhlaWdodDogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBmb250ID0gdGhpcy5mb250KCk7XHJcblxyXG4gICAgICBpZiAoIXRoaXMuZm9udEhlaWdodHNbZm9udF0pIHtcclxuICAgICAgICB2YXIgdGVtcCA9IGNxKDEwMCwgMTAwKTtcclxuICAgICAgICB2YXIgaGVpZ2h0ID0gMDtcclxuICAgICAgICB2YXIgY2hhbmdlcyA9IHt9O1xyXG4gICAgICAgIHRlbXAuZm9udChmb250KS5maWxsU3R5bGUoXCIjZmZmXCIpO1xyXG4gICAgICAgIHRlbXAudGV4dEJhc2VsaW5lKFwiYm90dG9tXCIpLmZpbGxUZXh0KFwiZ01cIiwgMjUsIDEwMCk7XHJcbiAgICAgICAgdGVtcC50cmltKGZhbHNlLCBjaGFuZ2VzKTtcclxuICAgICAgICBoZWlnaHQgKz0gY2hhbmdlcy5ib3R0b207XHJcblxyXG4gICAgICAgIHZhciB0ZW1wID0gY3EoMTAwLCAxMDApO1xyXG4gICAgICAgIHZhciBjaGFuZ2VzID0ge307XHJcbiAgICAgICAgdGVtcC5mb250KGZvbnQpLmZpbGxTdHlsZShcIiNmZmZcIik7XHJcbiAgICAgICAgdGVtcC50ZXh0QmFzZWxpbmUoXCJ0b3BcIikuZmlsbFRleHQoXCJnTVwiLCAyNSwgMCk7XHJcbiAgICAgICAgdGVtcC50cmltKGZhbHNlLCBjaGFuZ2VzKTtcclxuICAgICAgICBoZWlnaHQgKz0gY2hhbmdlcy50b3A7XHJcblxyXG4gICAgICAgIHZhciB0ZW1wID0gY3EoMTAwLCAxMDApO1xyXG4gICAgICAgIHZhciBjaGFuZ2VzID0ge307XHJcbiAgICAgICAgdGVtcC5mb250KGZvbnQpLmZpbGxTdHlsZShcIiNmZmZcIik7XHJcbiAgICAgICAgdGVtcC50ZXh0QmFzZWxpbmUoXCJhbHBoYWJldGljXCIpLmZpbGxUZXh0KFwiZ01cIiwgNTAsIDUwKTtcclxuICAgICAgICB0ZW1wLnRyaW0oZmFsc2UsIGNoYW5nZXMpO1xyXG4gICAgICAgIGhlaWdodCArPSB0ZW1wLmhlaWdodDtcclxuXHJcbiAgICAgICAgdGhpcy5mb250SGVpZ2h0c1tmb250XSA9IGhlaWdodDtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHRoaXMuZm9udEhlaWdodHNbZm9udF07XHJcbiAgICB9LFxyXG5cclxuICAgIHRleHRCb3VuZGFyaWVzOiBmdW5jdGlvbih0ZXh0LCBtYXhXaWR0aCkge1xyXG4gICAgICB2YXIgd29yZHMgPSB0ZXh0LnNwbGl0KFwiIFwiKTtcclxuXHJcbiAgICAgIHZhciBoID0gdGhpcy5mb250SGVpZ2h0KCk7XHJcblxyXG4gICAgICB2YXIgb3ggPSAwO1xyXG4gICAgICB2YXIgb3kgPSAwO1xyXG5cclxuICAgICAgaWYgKG1heFdpZHRoKSB7XHJcbiAgICAgICAgdmFyIGxpbmUgPSAwO1xyXG4gICAgICAgIHZhciBsaW5lcyA9IFtcIlwiXTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB3b3Jkcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgdmFyIHdvcmQgPSB3b3Jkc1tpXSArIFwiIFwiO1xyXG4gICAgICAgICAgdmFyIHdvcmRXaWR0aCA9IHRoaXMuY29udGV4dC5tZWFzdXJlVGV4dCh3b3JkKS53aWR0aDtcclxuXHJcbiAgICAgICAgICBpZiAob3ggKyB3b3JkV2lkdGggPiBtYXhXaWR0aCB8fCB3b3Jkc1tpXSA9PT0gXCJcXG5cIikge1xyXG4gICAgICAgICAgICBsaW5lc1srK2xpbmVdID0gXCJcIjtcclxuICAgICAgICAgICAgb3ggPSAwO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICh3b3Jkc1tpXSAhPT0gXCJcXG5cIikge1xyXG4gICAgICAgICAgICBsaW5lc1tsaW5lXSArPSB3b3JkO1xyXG4gICAgICAgICAgICBveCArPSB3b3JkV2lkdGg7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBsaW5lcyA9IFt0ZXh0XTtcclxuICAgICAgICBtYXhXaWR0aCA9IHRoaXMubWVhc3VyZVRleHQodGV4dCkud2lkdGg7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgaGVpZ2h0OiBsaW5lcy5sZW5ndGggKiBoLFxyXG4gICAgICAgIHdpZHRoOiBtYXhXaWR0aCxcclxuICAgICAgICBsaW5lczogbGluZXMubGVuZ3RoLFxyXG4gICAgICAgIGxpbmVIZWlnaHQ6IGhcclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICByZXBlYXRJbWFnZVJlZ2lvbjogZnVuY3Rpb24oaW1hZ2UsIHN4LCBzeSwgc3csIHNoLCBkeCwgZHksIGR3LCBkaCkge1xyXG4gICAgICB0aGlzLnNhdmUoKTtcclxuICAgICAgdGhpcy5yZWN0KGR4LCBkeSwgZHcsIGRoKTtcclxuICAgICAgdGhpcy5jbGlwKCk7XHJcblxyXG4gICAgICBmb3IgKHZhciB4ID0gMCwgbGVuID0gTWF0aC5jZWlsKGR3IC8gc3cpOyB4IDwgbGVuOyB4KyspIHtcclxuICAgICAgICBmb3IgKHZhciB5ID0gMCwgbGVueSA9IE1hdGguY2VpbChkaCAvIHNoKTsgeSA8IGxlbnk7IHkrKykge1xyXG4gICAgICAgICAgdGhpcy5kcmF3SW1hZ2UoaW1hZ2UsIHN4LCBzeSwgc3csIHNoLCBkeCArIHggKiBzdywgZHkgKyB5ICogc2gsIHN3LCBzaCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLnJlc3RvcmUoKTtcclxuXHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICByZXBlYXRJbWFnZTogZnVuY3Rpb24oaW1hZ2UsIHgsIHksIHcsIGgpIHtcclxuICAgICAgLy8gaWYgKCFlbnYuZGV0YWlscykgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDkpIHtcclxuICAgICAgICB0aGlzLnJlcGVhdEltYWdlUmVnaW9uKGltYWdlLCAwLCAwLCBpbWFnZS53aWR0aCwgaW1hZ2UuaGVpZ2h0LCB4LCB5LCB3LCBoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnJlcGVhdEltYWdlUmVnaW9uLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICBib3JkZXJJbWFnZTogZnVuY3Rpb24oaW1hZ2UsIHgsIHksIHcsIGgsIHQsIHIsIGIsIGwsIGZpbGwpIHtcclxuXHJcbiAgICAgIC8vIGlmICghZW52LmRldGFpbHMpIHJldHVybiB0aGlzO1xyXG5cclxuICAgICAgaWYgKHR5cGVvZiB0ID09PSBcIm9iamVjdFwiKSB7XHJcblxyXG4gICAgICAgIHZhciBib3R0b21MZWZ0ID0gdC5ib3R0b21MZWZ0IHx8IFswLCAwLCAwLCAwXTtcclxuICAgICAgICB2YXIgYm90dG9tUmlnaHQgPSB0LmJvdHRvbVJpZ2h0IHx8IFswLCAwLCAwLCAwXTtcclxuICAgICAgICB2YXIgdG9wTGVmdCA9IHQudG9wTGVmdCB8fCBbMCwgMCwgMCwgMF07XHJcbiAgICAgICAgdmFyIHRvcFJpZ2h0ID0gdC50b3BSaWdodCB8fCBbMCwgMCwgMCwgMF07XHJcblxyXG4gICAgICAgIHZhciBjbGggPSBib3R0b21MZWZ0WzNdICsgdG9wTGVmdFszXTtcclxuICAgICAgICB2YXIgY3JoID0gYm90dG9tUmlnaHRbM10gKyB0b3BSaWdodFszXTtcclxuICAgICAgICB2YXIgY3R3ID0gdG9wTGVmdFsyXSArIHRvcFJpZ2h0WzJdO1xyXG4gICAgICAgIHZhciBjYncgPSBib3R0b21MZWZ0WzJdICsgYm90dG9tUmlnaHRbMl07XHJcblxyXG4gICAgICAgIHQuZmlsbFBhZGRpbmcgPSBbMCwgMCwgMCwgMF07XHJcblxyXG4gICAgICAgIGlmICh0LmxlZnQpIHQuZmlsbFBhZGRpbmdbMF0gPSB0LmxlZnRbMl07XHJcbiAgICAgICAgaWYgKHQudG9wKSB0LmZpbGxQYWRkaW5nWzFdID0gdC50b3BbM107XHJcbiAgICAgICAgaWYgKHQucmlnaHQpIHQuZmlsbFBhZGRpbmdbMl0gPSB0LnJpZ2h0WzJdO1xyXG4gICAgICAgIGlmICh0LmJvdHRvbSkgdC5maWxsUGFkZGluZ1szXSA9IHQuYm90dG9tWzNdO1xyXG5cclxuICAgICAgICAvLyBpZiAoIXQuZmlsbFBhZGRpbmcpIHQuZmlsbFBhZGRpbmcgPSBbMCwgMCwgMCwgMF07XHJcblxyXG4gICAgICAgIGlmICh0LmZpbGwpIHtcclxuICAgICAgICAgIHRoaXMuZHJhd0ltYWdlKGltYWdlLCB0LmZpbGxbMF0sIHQuZmlsbFsxXSwgdC5maWxsWzJdLCB0LmZpbGxbM10sIHggKyB0LmZpbGxQYWRkaW5nWzBdLCB5ICsgdC5maWxsUGFkZGluZ1sxXSwgdyAtIHQuZmlsbFBhZGRpbmdbMl0gLSB0LmZpbGxQYWRkaW5nWzBdLCBoIC0gdC5maWxsUGFkZGluZ1szXSAtIHQuZmlsbFBhZGRpbmdbMV0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyB0aGlzLmZpbGxSZWN0KHggKyB0LmZpbGxQYWRkaW5nWzBdLCB5ICsgdC5maWxsUGFkZGluZ1sxXSwgdyAtIHQuZmlsbFBhZGRpbmdbMl0gLSB0LmZpbGxQYWRkaW5nWzBdLCBoIC0gdC5maWxsUGFkZGluZ1szXSAtIHQuZmlsbFBhZGRpbmdbMV0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHQubGVmdCkgdGhpc1t0LmxlZnRbNF0gPT09IFwic3RyZXRjaFwiID8gXCJkcmF3SW1hZ2VcIiA6IFwicmVwZWF0SW1hZ2VcIl0oaW1hZ2UsIHQubGVmdFswXSwgdC5sZWZ0WzFdLCB0LmxlZnRbMl0sIHQubGVmdFszXSwgeCwgeSArIHRvcExlZnRbM10sIHQubGVmdFsyXSwgaCAtIGNsaCk7XHJcbiAgICAgICAgaWYgKHQucmlnaHQpIHRoaXNbdC5yaWdodFs0XSA9PT0gXCJzdHJldGNoXCIgPyBcImRyYXdJbWFnZVwiIDogXCJyZXBlYXRJbWFnZVwiXShpbWFnZSwgdC5yaWdodFswXSwgdC5yaWdodFsxXSwgdC5yaWdodFsyXSwgdC5yaWdodFszXSwgeCArIHcgLSB0LnJpZ2h0WzJdLCB5ICsgdG9wUmlnaHRbM10sIHQucmlnaHRbMl0sIGggLSBjcmgpO1xyXG4gICAgICAgIGlmICh0LnRvcCkgdGhpc1t0LnRvcFs0XSA9PT0gXCJzdHJldGNoXCIgPyBcImRyYXdJbWFnZVwiIDogXCJyZXBlYXRJbWFnZVwiXShpbWFnZSwgdC50b3BbMF0sIHQudG9wWzFdLCB0LnRvcFsyXSwgdC50b3BbM10sIHggKyB0b3BMZWZ0WzJdLCB5LCB3IC0gY3R3LCB0LnRvcFszXSk7XHJcbiAgICAgICAgaWYgKHQuYm90dG9tKSB0aGlzW3QuYm90dG9tWzRdID09PSBcInN0cmV0Y2hcIiA/IFwiZHJhd0ltYWdlXCIgOiBcInJlcGVhdEltYWdlXCJdKGltYWdlLCB0LmJvdHRvbVswXSwgdC5ib3R0b21bMV0sIHQuYm90dG9tWzJdLCB0LmJvdHRvbVszXSwgeCArIGJvdHRvbUxlZnRbMl0sIHkgKyBoIC0gdC5ib3R0b21bM10sIHcgLSBjYncsIHQuYm90dG9tWzNdKTtcclxuXHJcbiAgICAgICAgaWYgKHQuYm90dG9tTGVmdCkgdGhpcy5kcmF3SW1hZ2UoaW1hZ2UsIHQuYm90dG9tTGVmdFswXSwgdC5ib3R0b21MZWZ0WzFdLCB0LmJvdHRvbUxlZnRbMl0sIHQuYm90dG9tTGVmdFszXSwgeCwgeSArIGggLSB0LmJvdHRvbUxlZnRbM10sIHQuYm90dG9tTGVmdFsyXSwgdC5ib3R0b21MZWZ0WzNdKTtcclxuICAgICAgICBpZiAodC50b3BMZWZ0KSB0aGlzLmRyYXdJbWFnZShpbWFnZSwgdC50b3BMZWZ0WzBdLCB0LnRvcExlZnRbMV0sIHQudG9wTGVmdFsyXSwgdC50b3BMZWZ0WzNdLCB4LCB5LCB0LnRvcExlZnRbMl0sIHQudG9wTGVmdFszXSk7XHJcbiAgICAgICAgaWYgKHQudG9wUmlnaHQpIHRoaXMuZHJhd0ltYWdlKGltYWdlLCB0LnRvcFJpZ2h0WzBdLCB0LnRvcFJpZ2h0WzFdLCB0LnRvcFJpZ2h0WzJdLCB0LnRvcFJpZ2h0WzNdLCB4ICsgdyAtIHQudG9wUmlnaHRbMl0sIHksIHQudG9wUmlnaHRbMl0sIHQudG9wUmlnaHRbM10pO1xyXG4gICAgICAgIGlmICh0LmJvdHRvbVJpZ2h0KSB0aGlzLmRyYXdJbWFnZShpbWFnZSwgdC5ib3R0b21SaWdodFswXSwgdC5ib3R0b21SaWdodFsxXSwgdC5ib3R0b21SaWdodFsyXSwgdC5ib3R0b21SaWdodFszXSwgeCArIHcgLSB0LmJvdHRvbVJpZ2h0WzJdLCB5ICsgaCAtIHQuYm90dG9tUmlnaHRbM10sIHQuYm90dG9tUmlnaHRbMl0sIHQuYm90dG9tUmlnaHRbM10pO1xyXG5cclxuXHJcbiAgICAgIH0gZWxzZSB7XHJcblxyXG5cclxuICAgICAgICAvKiB0b3AgKi9cclxuICAgICAgICBpZiAodCA+IDAgJiYgdyAtIGwgLSByID4gMCkgdGhpcy5kcmF3SW1hZ2UoaW1hZ2UsIGwsIDAsIGltYWdlLndpZHRoIC0gbCAtIHIsIHQsIHggKyBsLCB5LCB3IC0gbCAtIHIsIHQpO1xyXG5cclxuICAgICAgICAvKiBib3R0b20gKi9cclxuICAgICAgICBpZiAoYiA+IDAgJiYgdyAtIGwgLSByID4gMCkgdGhpcy5kcmF3SW1hZ2UoaW1hZ2UsIGwsIGltYWdlLmhlaWdodCAtIGIsIGltYWdlLndpZHRoIC0gbCAtIHIsIGIsIHggKyBsLCB5ICsgaCAtIGIsIHcgLSBsIC0gciwgYik7XHJcbiAgICAgICAgLy8gICAgICBjb25zb2xlLmxvZyh4LCB5LCB3LCBoLCB0LCByLCBiLCBsKTtcclxuICAgICAgICAvLyAgICAgIGNvbnNvbGUubG9nKGltYWdlLCAwLCB0LCBsLCBpbWFnZS5oZWlnaHQgLSBiIC0gdCwgeCwgeSArIHQsIGwsIGggLSBiIC0gdCk7XHJcbiAgICAgICAgLyogbGVmdCAqL1xyXG4gICAgICAgIGlmIChsID4gMCAmJiBoIC0gYiAtIHQgPiAwKSB0aGlzLmRyYXdJbWFnZShpbWFnZSwgMCwgdCwgbCwgaW1hZ2UuaGVpZ2h0IC0gYiAtIHQsIHgsIHkgKyB0LCBsLCBoIC0gYiAtIHQpO1xyXG5cclxuXHJcbiAgICAgICAgLyogcmlnaHQgKi9cclxuICAgICAgICBpZiAociA+IDAgJiYgaCAtIGIgLSB0ID4gMCkgdGhpcy5kcmF3SW1hZ2UoaW1hZ2UsIGltYWdlLndpZHRoIC0gciwgdCwgciwgaW1hZ2UuaGVpZ2h0IC0gYiAtIHQsIHggKyB3IC0gciwgeSArIHQsIHIsIGggLSBiIC0gdCk7XHJcblxyXG4gICAgICAgIC8qIHRvcC1sZWZ0ICovXHJcbiAgICAgICAgaWYgKGwgPiAwICYmIHQgPiAwKSB0aGlzLmRyYXdJbWFnZShpbWFnZSwgMCwgMCwgbCwgdCwgeCwgeSwgbCwgdCk7XHJcblxyXG4gICAgICAgIC8qIHRvcC1yaWdodCAqL1xyXG4gICAgICAgIGlmIChyID4gMCAmJiB0ID4gMCkgdGhpcy5kcmF3SW1hZ2UoaW1hZ2UsIGltYWdlLndpZHRoIC0gciwgMCwgciwgdCwgeCArIHcgLSByLCB5LCByLCB0KTtcclxuXHJcbiAgICAgICAgLyogYm90dG9tLXJpZ2h0ICovXHJcbiAgICAgICAgaWYgKHIgPiAwICYmIGIgPiAwKSB0aGlzLmRyYXdJbWFnZShpbWFnZSwgaW1hZ2Uud2lkdGggLSByLCBpbWFnZS5oZWlnaHQgLSBiLCByLCBiLCB4ICsgdyAtIHIsIHkgKyBoIC0gYiwgciwgYik7XHJcblxyXG4gICAgICAgIC8qIGJvdHRvbS1sZWZ0ICovXHJcbiAgICAgICAgaWYgKGwgPiAwICYmIGIgPiAwKSB0aGlzLmRyYXdJbWFnZShpbWFnZSwgMCwgaW1hZ2UuaGVpZ2h0IC0gYiwgbCwgYiwgeCwgeSArIGggLSBiLCBsLCBiKTtcclxuXHJcbiAgICAgICAgaWYgKGZpbGwpIHtcclxuICAgICAgICAgIGlmICh0eXBlb2YgZmlsbCA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICB0aGlzLmZpbGxTdHlsZShmaWxsKS5maWxsUmVjdCh4ICsgbCwgeSArIHQsIHcgLSBsIC0gciwgaCAtIHQgLSBiKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh3IC0gbCAtIHIgPiAwICYmIGggLSB0IC0gYiA+IDApXHJcbiAgICAgICAgICAgICAgdGhpcy5kcmF3SW1hZ2UoaW1hZ2UsIGwsIHQsIGltYWdlLndpZHRoIC0gciAtIGwsIGltYWdlLmhlaWdodCAtIGIgLSB0LCB4ICsgbCwgeSArIHQsIHcgLSBsIC0gciwgaCAtIHQgLSBiKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgc2V0UGl4ZWw6IGZ1bmN0aW9uKGNvbG9yLCB4LCB5KSB7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcy5maWxsU3R5bGUoY29sb3IpLmZpbGxSZWN0KHgsIHksIDEsIDEpO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgZ2V0UGl4ZWw6IGZ1bmN0aW9uKHgsIHkpIHtcclxuICAgICAgdmFyIHBpeGVsID0gdGhpcy5jb250ZXh0LmdldEltYWdlRGF0YSh4LCB5LCAxLCAxKS5kYXRhO1xyXG4gICAgICByZXR1cm4gY3EuY29sb3IoW3BpeGVsWzBdLCBwaXhlbFsxXSwgcGl4ZWxbMl0sIHBpeGVsWzNdXSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNyZWF0ZUltYWdlRGF0YTogZnVuY3Rpb24od2lkdGgsIGhlaWdodCkge1xyXG4gICAgICBpZiAoZmFsc2UgJiYgdGhpcy5jb250ZXh0LmNyZWF0ZUltYWdlRGF0YSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRleHQuY3JlYXRlSW1hZ2VEYXRhLmFwcGx5KHRoaXMuY29udGV4dCwgYXJndW1lbnRzKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoIXRoaXMuZW1wdHlDYW52YXMpIHtcclxuICAgICAgICAgIHRoaXMuZW1wdHlDYW52YXMgPSBjcS5jcmVhdGVDYW52YXMod2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgICB0aGlzLmVtcHR5Q2FudmFzQ29udGV4dCA9IHRoaXMuZW1wdHlDYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5lbXB0eUNhbnZhcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIHRoaXMuZW1wdHlDYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVtcHR5Q2FudmFzQ29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgc3Ryb2tlTGluZTogZnVuY3Rpb24oeDEsIHkxLCB4MiwgeTIpIHtcclxuXHJcbiAgICAgIHRoaXMuYmVnaW5QYXRoKCk7XHJcblxyXG4gICAgICBpZiAodHlwZW9mIHgyID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgdGhpcy5tb3ZlVG8oeDEueCwgeDEueSk7XHJcbiAgICAgICAgdGhpcy5saW5lVG8oeTEueCwgeTEueSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5tb3ZlVG8oeDEsIHkxKTtcclxuICAgICAgICB0aGlzLmxpbmVUbyh4MiwgeTIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLnN0cm9rZSgpO1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBzZXRMaW5lRGFzaDogZnVuY3Rpb24oZGFzaCkge1xyXG4gICAgICBpZiAodGhpcy5jb250ZXh0LnNldExpbmVEYXNoKSB7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LnNldExpbmVEYXNoKGRhc2gpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICB9IGVsc2UgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIG1lYXN1cmVUZXh0OiBmdW5jdGlvbigpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5tZWFzdXJlVGV4dC5hcHBseSh0aGlzLmNvbnRleHQsIGFyZ3VtZW50cyk7XHJcbiAgICB9LFxyXG5cclxuICAgIGdldExpbmVEYXNoOiBmdW5jdGlvbigpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5nZXRMaW5lRGFzaCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBjcmVhdGVSYWRpYWxHcmFkaWVudDogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmNvbnRleHQuY3JlYXRlUmFkaWFsR3JhZGllbnQuYXBwbHkodGhpcy5jb250ZXh0LCBhcmd1bWVudHMpO1xyXG4gICAgfSxcclxuXHJcbiAgICBjcmVhdGVMaW5lYXJHcmFkaWVudDogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmNvbnRleHQuY3JlYXRlTGluZWFyR3JhZGllbnQuYXBwbHkodGhpcy5jb250ZXh0LCBhcmd1bWVudHMpO1xyXG4gICAgfSxcclxuXHJcbiAgICBjcmVhdGVQYXR0ZXJuOiBmdW5jdGlvbigpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5jcmVhdGVQYXR0ZXJuLmFwcGx5KHRoaXMuY29udGV4dCwgYXJndW1lbnRzKTtcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0SW1hZ2VEYXRhOiBmdW5jdGlvbigpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5nZXRJbWFnZURhdGEuYXBwbHkodGhpcy5jb250ZXh0LCBhcmd1bWVudHMpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKiBJZiB5b3UgdGhpbmsgdGhhdCBJIGFtIHJldGFyZGVkIGJlY2F1c2UgSSB1c2UgZmlsbFJlY3QgdG8gc2V0XHJcbiAgICAgICBwaXhlbHMgLSByZWFkIGFib3V0IHByZW11bHRpcGxlZCBhbHBoYSBpbiBjYW52YXMgKi9cclxuXHJcbiAgICB3cml0ZU1ldGE6IGZ1bmN0aW9uKGRhdGEpIHtcclxuXHJcbiAgICAgIHZhciBqc29uID0gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XHJcblxyXG4gICAgICBqc29uID0gZW5jb2RlVVJJQ29tcG9uZW50KGpzb24pO1xyXG5cclxuICAgICAgdmFyIGJ5dGVzID0gW107XHJcblxyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGpzb24ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBieXRlcy5wdXNoKGpzb24uY2hhckNvZGVBdChpKSk7XHJcbiAgICAgICAgLy8gICAgICBjb25zb2xlLmxvZyhqc29uW2ldKVxyXG4gICAgICB9XHJcblxyXG4gICAgICBieXRlcy5wdXNoKDEyNyk7XHJcblxyXG4gICAgICB2YXIgeCA9IHRoaXMud2lkdGggLSAxO1xyXG4gICAgICB2YXIgeSA9IHRoaXMuaGVpZ2h0IC0gMTtcclxuXHJcbiAgICAgIHZhciBwaXhlbCA9IFtdO1xyXG5cclxuICAgICAgd2hpbGUgKGJ5dGVzLmxlbmd0aCkge1xyXG5cclxuICAgICAgICB2YXIgYnl0ZSA9IGJ5dGVzLnNoaWZ0KCk7XHJcblxyXG4gICAgICAgIHBpeGVsLnVuc2hpZnQoYnl0ZSAqIDIpO1xyXG4gICAgICAgIC8vICAgICAgICBjb25zb2xlLmxvZyh4ICsgU3RyaW5nLmZyb21DaGFyQ29kZShieXRlKSwgYnl0ZSk7XHJcblxyXG4gICAgICAgIGlmICghYnl0ZXMubGVuZ3RoKVxyXG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAzIC0gcGl4ZWwubGVuZ3RoOyBpKyspIHBpeGVsLnVuc2hpZnQoMjU0KTtcclxuXHJcbiAgICAgICAgaWYgKHBpeGVsLmxlbmd0aCA9PT0gMykge1xyXG4gICAgICAgICAgdGhpcy5maWxsU3R5bGUoY3EuY29sb3IocGl4ZWwpLnRvUmdiKCkpLmZpbGxSZWN0KHgsIHksIDEsIDEpO1xyXG4gICAgICAgICAgcGl4ZWwgPSBbXTtcclxuICAgICAgICAgIHgtLTtcclxuXHJcbiAgICAgICAgICBpZiAoeCA8IDApIHtcclxuICAgICAgICAgICAgeS0tO1xyXG4gICAgICAgICAgICB4ID0gdGhpcy53aWR0aCAtIDE7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHJlYWRNZXRhOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgIHZhciBieXRlcyA9IFtdO1xyXG5cclxuICAgICAgdmFyIHggPSB0aGlzLndpZHRoIC0gMTtcclxuICAgICAgdmFyIHkgPSB0aGlzLmhlaWdodCAtIDE7XHJcblxyXG4gICAgICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgICAgIHZhciBwaXhlbCA9IHRoaXMuZ2V0UGl4ZWwoeCwgeSk7XHJcblxyXG4gICAgICAgIHZhciBzdG9wID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMzsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgaWYgKHBpeGVsWzIgLSBpXSA9PT0gMjU0KSBzdG9wID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICBlbHNlIGJ5dGVzLnB1c2gocGl4ZWxbMiAtIGldIC8gMiB8IDApO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzdG9wKSBicmVhaztcclxuXHJcbiAgICAgICAgeC0tO1xyXG5cclxuICAgICAgICBpZiAoeCA8IDApIHtcclxuICAgICAgICAgIHktLTtcclxuICAgICAgICAgIHggPSB0aGlzLndpZHRoIC0gMTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuXHJcbiAgICAgIHZhciBqc29uID0gXCJcIjtcclxuXHJcbiAgICAgIHdoaWxlIChieXRlcy5sZW5ndGgpIHtcclxuICAgICAgICBqc29uICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnl0ZXMuc2hpZnQoKSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBkYXRhID0gZmFsc2U7XHJcblxyXG4gICAgICBjb25zb2xlLmxvZyhqc29uKTtcclxuXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGVjb2RlVVJJQ29tcG9uZW50KGpzb24pKTtcclxuICAgICAgfSBjYXRjaCAoZSkge1xyXG5cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIGRhdGE7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBnZXQgd2lkdGgoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmNhbnZhcy53aWR0aDtcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0IGhlaWdodCgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuY2FudmFzLmhlaWdodDtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0IHdpZHRoKHcpIHtcclxuICAgICAgdGhpcy5jYW52YXMud2lkdGggPSB3O1xyXG4gICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgICByZXR1cm4gdGhpcy5jYW52YXMud2lkdGg7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldCBoZWlnaHQoaCkge1xyXG4gICAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSBoO1xyXG4gICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgICByZXR1cm4gdGhpcy5jYW52YXMuaGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgfTtcclxuXHJcbiAgLyogZXh0ZW5kIExheWVyIHdpdGggZHJhd2luZyBjb250ZXh0IG1ldGhvZHMgKi9cclxuXHJcbiAgdmFyIG1ldGhvZHMgPSBbXCJhcmNcIiwgXCJhcmNUb1wiLCBcImJlZ2luUGF0aFwiLCBcImJlemllckN1cnZlVG9cIiwgXCJjbGVhclJlY3RcIiwgXCJjbGlwXCIsIFwiY2xvc2VQYXRoXCIsIFwiY3JlYXRlTGluZWFyR3JhZGllbnRcIiwgXCJjcmVhdGVSYWRpYWxHcmFkaWVudFwiLCBcImNyZWF0ZVBhdHRlcm5cIiwgXCJkcmF3Rm9jdXNSaW5nXCIsIFwiZHJhd0ltYWdlXCIsIFwiZmlsbFwiLCBcImZpbGxSZWN0XCIsIFwiZmlsbFRleHRcIiwgXCJnZXRJbWFnZURhdGFcIiwgXCJpc1BvaW50SW5QYXRoXCIsIFwibGluZVRvXCIsIFwibWVhc3VyZVRleHRcIiwgXCJtb3ZlVG9cIiwgXCJwdXRJbWFnZURhdGFcIiwgXCJxdWFkcmF0aWNDdXJ2ZVRvXCIsIFwicmVjdFwiLCBcInJlc3RvcmVcIiwgXCJyb3RhdGVcIiwgXCJzYXZlXCIsIFwic2NhbGVcIiwgXCJzZXRUcmFuc2Zvcm1cIiwgXCJzdHJva2VcIiwgXCJzdHJva2VSZWN0XCIsIFwic3Ryb2tlVGV4dFwiLCBcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZVwiLCBcInNldExpbmVEYXNoXCJdO1xyXG5cclxuICBmb3IgKHZhciBpID0gMDsgaSA8IG1ldGhvZHMubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBuYW1lID0gbWV0aG9kc1tpXTtcclxuXHJcbiAgICBpZiAoY3EuTGF5ZXIucHJvdG90eXBlW25hbWVdKSBjb250aW51ZTtcclxuXHJcbiAgICBjcS5MYXllci5wcm90b3R5cGVbbmFtZV0gPSAoZnVuY3Rpb24obWV0aG9kKSB7XHJcblxyXG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgpO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyArK2kpIHtcclxuXHJcbiAgICAgICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2ldO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNxLmZhc3RBcHBseShtZXRob2QsIHRoaXMuY29udGV4dCwgYXJncyk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICB9XHJcblxyXG4gICAgfSkoQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELnByb3RvdHlwZVtuYW1lXSk7XHJcblxyXG5cclxuICAgIGNvbnRpbnVlO1xyXG5cclxuXHJcbiAgICBpZiAoIXRoaXMuZGVidWcpIHtcclxuICAgICAgLy8gaWYgKCFjcS5MYXllci5wcm90b3R5cGVbbmFtZV0pIGNxLkxheWVyLnByb3RvdHlwZVtuYW1lXSA9IEZ1bmN0aW9uKFwidGhpcy5jb250ZXh0LlwiICsgbmFtZSArIFwiLmFwcGx5KHRoaXMuY29udGV4dCwgYXJndW1lbnRzKTsgcmV0dXJuIHRoaXM7XCIpO1xyXG5cclxuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgKGZ1bmN0aW9uKG5hbWUpIHtcclxuXHJcbiAgICAgICAgY3EuTGF5ZXIucHJvdG90eXBlW25hbWVdID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAvLyB0aGlzLmNvbnRleHRbbmFtZV0uYXBwbHkodGhpcy5jb250ZXh0LCBhcmd1bWVudHMpO1xyXG5cclxuICAgICAgICAgIGNxLmZhc3RBcHBseSh0aGlzLmNvbnRleHRbbmFtZV0sIHRoaXMuY29udGV4dCwgYXJndW1lbnRzKTtcclxuXHJcbiAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICB9KShuYW1lKTtcclxuXHJcbiAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgKGZ1bmN0aW9uKG5hbWUpIHtcclxuXHJcbiAgICAgICAgY3EuTGF5ZXIucHJvdG90eXBlW25hbWVdID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHRbbmFtZV0uYXBwbHkodGhpcy5jb250ZXh0LCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcigpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIuc3RhY2spO1xyXG4gICAgICAgICAgICB0aHJvdyAoZSArIGVyci5zdGFjayk7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlLCBuYW1lLCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH0pKG5hbWUpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgfTtcclxuXHJcbiAgLyogY3JlYXRlIHNldHRlcnMgYW5kIGdldHRlcnMgKi9cclxuXHJcbiAgdmFyIHByb3BlcnRpZXMgPSBbXCJjYW52YXNcIiwgXCJmaWxsU3R5bGVcIiwgXCJmb250XCIsIFwiZ2xvYmFsQWxwaGFcIiwgXCJnbG9iYWxDb21wb3NpdGVPcGVyYXRpb25cIiwgXCJsaW5lQ2FwXCIsIFwibGluZUpvaW5cIiwgXCJsaW5lV2lkdGhcIiwgXCJtaXRlckxpbWl0XCIsIFwic2hhZG93T2Zmc2V0WFwiLCBcInNoYWRvd09mZnNldFlcIiwgXCJzaGFkb3dCbHVyXCIsIFwic2hhZG93Q29sb3JcIiwgXCJzdHJva2VTdHlsZVwiLCBcInRleHRBbGlnblwiLCBcInRleHRCYXNlbGluZVwiLCBcImxpbmVEYXNoT2Zmc2V0XCJdO1xyXG5cclxuICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BlcnRpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBuYW1lID0gcHJvcGVydGllc1tpXTtcclxuICAgIGlmICghY3EuTGF5ZXIucHJvdG90eXBlW25hbWVdKSBjcS5MYXllci5wcm90b3R5cGVbbmFtZV0gPSBGdW5jdGlvbihcImlmKGFyZ3VtZW50cy5sZW5ndGgpIHsgdGhpcy5jb250ZXh0LlwiICsgbmFtZSArIFwiID0gYXJndW1lbnRzWzBdOyByZXR1cm4gdGhpczsgfSBlbHNlIHsgcmV0dXJuIHRoaXMuY29udGV4dC5cIiArIG5hbWUgKyBcIjsgfVwiKTtcclxuICB9O1xyXG5cclxuICAvKiBjb2xvciAqL1xyXG5cclxuICBjcS5Db2xvciA9IGZ1bmN0aW9uKGRhdGEsIHR5cGUpIHtcclxuXHJcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCkgdGhpcy5wYXJzZShkYXRhLCB0eXBlKTtcclxuICB9XHJcblxyXG4gIGNxLkNvbG9yLnByb3RvdHlwZSA9IHtcclxuXHJcbiAgICB0b1N0cmluZzogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnRvUmdiKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHBhcnNlOiBmdW5jdGlvbihhcmdzLCB0eXBlKSB7XHJcbiAgICAgIGlmIChhcmdzWzBdIGluc3RhbmNlb2YgY3EuQ29sb3IpIHtcclxuICAgICAgICB0aGlzWzBdID0gYXJnc1swXVswXTtcclxuICAgICAgICB0aGlzWzFdID0gYXJnc1swXVsxXTtcclxuICAgICAgICB0aGlzWzJdID0gYXJnc1swXVsyXTtcclxuICAgICAgICB0aGlzWzNdID0gYXJnc1swXVszXTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0eXBlb2YgYXJncyA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgIHZhciBtYXRjaCA9IG51bGw7XHJcblxyXG4gICAgICAgIGlmIChhcmdzWzBdID09PSBcIiNcIikge1xyXG4gICAgICAgICAgdmFyIHJnYiA9IGNxLmhleFRvUmdiKGFyZ3MpO1xyXG4gICAgICAgICAgdGhpc1swXSA9IHJnYlswXTtcclxuICAgICAgICAgIHRoaXNbMV0gPSByZ2JbMV07XHJcbiAgICAgICAgICB0aGlzWzJdID0gcmdiWzJdO1xyXG4gICAgICAgICAgdGhpc1szXSA9IDEuMDtcclxuICAgICAgICB9IGVsc2UgaWYgKG1hdGNoID0gYXJncy5tYXRjaCgvcmdiXFwoKC4qKSwoLiopLCguKilcXCkvKSkge1xyXG4gICAgICAgICAgdGhpc1swXSA9IG1hdGNoWzFdIHwgMDtcclxuICAgICAgICAgIHRoaXNbMV0gPSBtYXRjaFsyXSB8IDA7XHJcbiAgICAgICAgICB0aGlzWzJdID0gbWF0Y2hbM10gfCAwO1xyXG4gICAgICAgICAgdGhpc1szXSA9IDEuMDtcclxuICAgICAgICB9IGVsc2UgaWYgKG1hdGNoID0gYXJncy5tYXRjaCgvcmdiYVxcKCguKiksKC4qKSwoLiopXFwpLykpIHtcclxuICAgICAgICAgIHRoaXNbMF0gPSBtYXRjaFsxXSB8IDA7XHJcbiAgICAgICAgICB0aGlzWzFdID0gbWF0Y2hbMl0gfCAwO1xyXG4gICAgICAgICAgdGhpc1syXSA9IG1hdGNoWzNdIHwgMDtcclxuICAgICAgICAgIHRoaXNbM10gPSBtYXRjaFs0XSB8IDA7XHJcbiAgICAgICAgfSBlbHNlIGlmIChtYXRjaCA9IGFyZ3MubWF0Y2goL2hzbFxcKCguKiksKC4qKSwoLiopXFwpLykpIHtcclxuICAgICAgICAgIHRoaXMuZnJvbUhzbChtYXRjaFsxXSwgbWF0Y2hbMl0sIG1hdGNoWzNdKTtcclxuICAgICAgICB9IGVsc2UgaWYgKG1hdGNoID0gYXJncy5tYXRjaCgvaHN2XFwoKC4qKSwoLiopLCguKilcXCkvKSkge1xyXG4gICAgICAgICAgdGhpcy5mcm9tSHN2KG1hdGNoWzFdLCBtYXRjaFsyXSwgbWF0Y2hbM10pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgICAgIGNhc2UgXCJoc2xcIjpcclxuICAgICAgICAgIGNhc2UgXCJoc2xhXCI6XHJcblxyXG4gICAgICAgICAgICB0aGlzLmZyb21Ic2woYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgIGNhc2UgXCJoc3ZcIjpcclxuICAgICAgICAgIGNhc2UgXCJoc3ZhXCI6XHJcblxyXG4gICAgICAgICAgICB0aGlzLmZyb21Ic3YoYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHRoaXNbMF0gPSBhcmdzWzBdO1xyXG4gICAgICAgICAgICB0aGlzWzFdID0gYXJnc1sxXTtcclxuICAgICAgICAgICAgdGhpc1syXSA9IGFyZ3NbMl07XHJcbiAgICAgICAgICAgIHRoaXNbM10gPSB0eXBlb2YgYXJnc1szXSA9PT0gXCJ1bmRlZmluZWRcIiA/IDEuMCA6IGFyZ3NbM107XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBhOiBmdW5jdGlvbihhKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmFscGhhKGEpO1xyXG4gICAgfSxcclxuXHJcbiAgICBhbHBoYTogZnVuY3Rpb24oYSkge1xyXG4gICAgICB0aGlzWzNdID0gYTtcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIGZyb21Ic2w6IGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgY29tcG9uZW50cyA9IGFyZ3VtZW50c1swXSBpbnN0YW5jZW9mIEFycmF5ID8gYXJndW1lbnRzWzBdIDogYXJndW1lbnRzO1xyXG5cclxuICAgICAgdmFyIGNvbG9yID0gY3EuaHNsVG9SZ2IocGFyc2VGbG9hdChjb21wb25lbnRzWzBdKSwgcGFyc2VGbG9hdChjb21wb25lbnRzWzFdKSwgcGFyc2VGbG9hdChjb21wb25lbnRzWzJdKSk7XHJcblxyXG4gICAgICB0aGlzWzBdID0gY29sb3JbMF07XHJcbiAgICAgIHRoaXNbMV0gPSBjb2xvclsxXTtcclxuICAgICAgdGhpc1syXSA9IGNvbG9yWzJdO1xyXG4gICAgICB0aGlzWzNdID0gdHlwZW9mIGFyZ3VtZW50c1szXSA9PT0gXCJ1bmRlZmluZWRcIiA/IDEuMCA6IGFyZ3VtZW50c1szXTtcclxuICAgIH0sXHJcblxyXG4gICAgZnJvbUhzdjogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBjb21wb25lbnRzID0gYXJndW1lbnRzWzBdIGluc3RhbmNlb2YgQXJyYXkgPyBhcmd1bWVudHNbMF0gOiBhcmd1bWVudHM7XHJcbiAgICAgIHZhciBjb2xvciA9IGNxLmhzdlRvUmdiKHBhcnNlRmxvYXQoY29tcG9uZW50c1swXSksIHBhcnNlRmxvYXQoY29tcG9uZW50c1sxXSksIHBhcnNlRmxvYXQoY29tcG9uZW50c1syXSkpO1xyXG5cclxuICAgICAgdGhpc1swXSA9IGNvbG9yWzBdO1xyXG4gICAgICB0aGlzWzFdID0gY29sb3JbMV07XHJcbiAgICAgIHRoaXNbMl0gPSBjb2xvclsyXTtcclxuICAgICAgdGhpc1szXSA9IHR5cGVvZiBhcmd1bWVudHNbM10gPT09IFwidW5kZWZpbmVkXCIgPyAxLjAgOiBhcmd1bWVudHNbM107XHJcbiAgICB9LFxyXG5cclxuICAgIHRvQXJyYXk6IGZ1bmN0aW9uKCkge1xyXG4gICAgICByZXR1cm4gW3RoaXNbMF0sIHRoaXNbMV0sIHRoaXNbMl0sIHRoaXNbM11dO1xyXG4gICAgfSxcclxuXHJcbiAgICB0b1JnYjogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiBcInJnYihcIiArIHRoaXNbMF0gKyBcIiwgXCIgKyB0aGlzWzFdICsgXCIsIFwiICsgdGhpc1syXSArIFwiKVwiO1xyXG4gICAgfSxcclxuXHJcbiAgICB0b1JnYmE6IGZ1bmN0aW9uKCkge1xyXG4gICAgICByZXR1cm4gXCJyZ2JhKFwiICsgdGhpc1swXSArIFwiLCBcIiArIHRoaXNbMV0gKyBcIiwgXCIgKyB0aGlzWzJdICsgXCIsIFwiICsgdGhpc1szXSArIFwiKVwiO1xyXG4gICAgfSxcclxuXHJcbiAgICB0b0hleDogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiBjcS5yZ2JUb0hleCh0aGlzWzBdLCB0aGlzWzFdLCB0aGlzWzJdKTtcclxuICAgIH0sXHJcblxyXG4gICAgdG9Ic2w6IGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgYyA9IGNxLnJnYlRvSHNsKHRoaXNbMF0sIHRoaXNbMV0sIHRoaXNbMl0pO1xyXG4gICAgICBjWzNdID0gdGhpc1szXTtcclxuICAgICAgcmV0dXJuIGM7XHJcbiAgICB9LFxyXG5cclxuICAgIHRvSHN2OiBmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIGMgPSBjcS5yZ2JUb0hzdih0aGlzWzBdLCB0aGlzWzFdLCB0aGlzWzJdKTtcclxuICAgICAgY1szXSA9IHRoaXNbM107XHJcbiAgICAgIHJldHVybiBjO1xyXG4gICAgfSxcclxuXHJcbiAgICBncmFkaWVudDogZnVuY3Rpb24odGFyZ2V0LCBzdGVwcykge1xyXG4gICAgICB2YXIgdGFyZ2V0Q29sb3IgPSBjcS5jb2xvcih0YXJnZXQpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzaGlmdEhzbDogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBoc2wgPSB0aGlzLnRvSHNsKCk7XHJcblxyXG4gICAgICBpZiAodGhpc1swXSAhPT0gdGhpc1sxXSB8fCB0aGlzWzFdICE9PSB0aGlzWzJdKSB7XHJcbiAgICAgICAgdmFyIGggPSBhcmd1bWVudHNbMF0gPT09IGZhbHNlID8gaHNsWzBdIDogY3Eud3JhcFZhbHVlKGhzbFswXSArIGFyZ3VtZW50c1swXSwgMCwgMSk7XHJcbiAgICAgICAgdmFyIHMgPSBhcmd1bWVudHNbMV0gPT09IGZhbHNlID8gaHNsWzFdIDogY3EubGltaXRWYWx1ZShoc2xbMV0gKyBhcmd1bWVudHNbMV0sIDAsIDEpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBoID0gaHNsWzBdO1xyXG4gICAgICAgIHZhciBzID0gaHNsWzFdO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgbCA9IGFyZ3VtZW50c1syXSA9PT0gZmFsc2UgPyBoc2xbMl0gOiBjcS5saW1pdFZhbHVlKGhzbFsyXSArIGFyZ3VtZW50c1syXSwgMCwgMSk7XHJcblxyXG4gICAgICB0aGlzLmZyb21Ic2woaCwgcywgbCk7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgc2V0SHNsOiBmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIGhzbCA9IHRoaXMudG9Ic2woKTtcclxuXHJcbiAgICAgIHZhciBoID0gYXJndW1lbnRzWzBdID09PSBmYWxzZSA/IGhzbFswXSA6IGNxLmxpbWl0VmFsdWUoYXJndW1lbnRzWzBdLCAwLCAxKTtcclxuICAgICAgdmFyIHMgPSBhcmd1bWVudHNbMV0gPT09IGZhbHNlID8gaHNsWzFdIDogY3EubGltaXRWYWx1ZShhcmd1bWVudHNbMV0sIDAsIDEpO1xyXG4gICAgICB2YXIgbCA9IGFyZ3VtZW50c1syXSA9PT0gZmFsc2UgPyBoc2xbMl0gOiBjcS5saW1pdFZhbHVlKGFyZ3VtZW50c1syXSwgMCwgMSk7XHJcblxyXG4gICAgICB0aGlzLmZyb21Ic2woaCwgcywgbCk7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgbWl4OiBmdW5jdGlvbihjb2xvciwgYW1vdW50KSB7XHJcbiAgICAgIGNvbG9yID0gY3EuY29sb3IoY29sb3IpO1xyXG5cclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyBpKyspXHJcbiAgICAgICAgdGhpc1tpXSA9IGNxLm1peCh0aGlzW2ldLCBjb2xvcltpXSwgYW1vdW50KTtcclxuXHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICB9O1xyXG5cclxuICB3aW5kb3dbXCJjcVwiXSA9IHdpbmRvd1tcIkNhbnZhc1F1ZXJ5XCJdID0gY3E7XHJcblxyXG5cclxuICByZXR1cm4gY3E7XHJcblxyXG59KSgpO1xyXG5cclxuLyogZmlsZTogc3JjL2xheWVyL0xheWVyLmpzICovXHJcblxyXG5QTEFZR1JPVU5ELlJlbmRlcmVyID0gZnVuY3Rpb24oYXBwKSB7XHJcblxyXG4gIHRoaXMuYXBwID0gYXBwO1xyXG5cclxuICBhcHAub24oXCJjcmVhdGVcIiwgdGhpcy5jcmVhdGUuYmluZCh0aGlzKSk7XHJcbiAgYXBwLm9uKFwicmVzaXplXCIsIHRoaXMucmVzaXplLmJpbmQodGhpcykpO1xyXG5cclxuICBhcHAucmVuZGVyZXIgPSB0aGlzO1xyXG5cclxufTtcclxuXHJcblBMQVlHUk9VTkQuUmVuZGVyZXIucGx1Z2luID0gdHJ1ZTtcclxuXHJcblBMQVlHUk9VTkQuUmVuZGVyZXIucHJvdG90eXBlID0ge1xyXG5cclxuICBjcmVhdGU6IGZ1bmN0aW9uKGRhdGEpIHtcclxuXHJcbiAgICB0aGlzLmFwcC5sYXllciA9IGNxKCkuYXBwZW5kVG8odGhpcy5hcHAuY29udGFpbmVyKTtcclxuXHJcbiAgICBpZiAoIXRoaXMuYXBwLmN1c3RvbUNvbnRhaW5lcikge1xyXG4gICAgICB0aGlzLmFwcC5jb250YWluZXIuc3R5bGUubWFyZ2luID0gXCIwcHhcIjtcclxuICAgICAgdGhpcy5hcHAuY29udGFpbmVyLnN0eWxlLm92ZXJmbG93ID0gXCJoaWRkZW5cIjtcclxuICAgIH1cclxuXHJcbiAgfSxcclxuXHJcbiAgcmVzaXplOiBmdW5jdGlvbihkYXRhKSB7XHJcblxyXG4gICAgdmFyIGFwcCA9IHRoaXMuYXBwO1xyXG5cclxuICAgIHZhciBsYXllciA9IGFwcC5sYXllcjtcclxuXHJcbiAgICBsYXllci53aWR0aCA9IGFwcC53aWR0aDtcclxuICAgIGxheWVyLmhlaWdodCA9IGFwcC5oZWlnaHQ7XHJcblxyXG4gICAgbGF5ZXIuY2FudmFzLnN0eWxlLnRyYW5zZm9ybU9yaWdpbiA9IFwiMCAwXCI7XHJcbiAgICBsYXllci5jYW52YXMuc3R5bGUudHJhbnNmb3JtID0gXCJ0cmFuc2xhdGUoXCIgKyBhcHAub2Zmc2V0WCArIFwicHgsXCIgKyBhcHAub2Zmc2V0WSArIFwicHgpIHNjYWxlKFwiICsgYXBwLnNjYWxlICsgXCIsIFwiICsgYXBwLnNjYWxlICsgXCIpXCI7XHJcbiAgICBsYXllci5jYW52YXMuc3R5bGUudHJhbnNmb3JtU3R5bGUgPSBcInByZXNlcnZlLTNkXCI7XHJcblxyXG4gICAgbGF5ZXIuY2FudmFzLnN0eWxlLndlYmtpdFRyYW5zZm9ybU9yaWdpbiA9IFwiMCAwXCI7XHJcbiAgICBsYXllci5jYW52YXMuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gXCJ0cmFuc2xhdGUoXCIgKyBhcHAub2Zmc2V0WCArIFwicHgsXCIgKyBhcHAub2Zmc2V0WSArIFwicHgpIHNjYWxlKFwiICsgYXBwLnNjYWxlICsgXCIsIFwiICsgYXBwLnNjYWxlICsgXCIpXCI7XHJcbiAgICBsYXllci5jYW52YXMuc3R5bGUud2Via2l0VHJhbnNmb3JtU3R5bGUgPSBcInByZXNlcnZlLTNkXCI7XHJcblxyXG4gICAgbGF5ZXIuc21vb3RoaW5nID0gdGhpcy5hcHAuc21vb3RoaW5nO1xyXG4gICAgbGF5ZXIudXBkYXRlKCk7XHJcblxyXG4gICAgdGhpcy5zZXRTbW9vdGhpbmcodGhpcy5hcHAuc21vb3RoaW5nKTtcclxuXHJcbiAgfSxcclxuXHJcbiAgc2V0U21vb3RoaW5nOiBmdW5jdGlvbihzbW9vdGhpbmcpIHtcclxuXHJcbiAgICB2YXIgbGF5ZXIgPSB0aGlzLmFwcC5sYXllcjtcclxuXHJcbiAgICB0aGlzLmFwcC5zbW9vdGhpbmcgPSBzbW9vdGhpbmc7XHJcblxyXG5cclxuICAgIGlmIChuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkuaW5kZXhPZignZmlyZWZveCcpID4gLTEpIHtcclxuXHJcbiAgICAgIGxheWVyLmNhbnZhcy5zdHlsZS5pbWFnZVJlbmRlcmluZyA9IHNtb290aGluZyA/IFwiYXV0b1wiIDogXCItbW96LWNyaXNwLWVkZ2VzXCI7XHJcblxyXG4gICAgfSBlbHNlIHtcclxuXHJcbiAgICAgIGxheWVyLmNhbnZhcy5zdHlsZS5pbWFnZVJlbmRlcmluZyA9IHNtb290aGluZyA/IFwiYXV0b1wiIDogXCJwaXhlbGF0ZWRcIjtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgbGF5ZXIuc21vb3RoaW5nID0gc21vb3RoaW5nO1xyXG4gICAgbGF5ZXIudXBkYXRlKCk7XHJcblxyXG4gIH1cclxuXHJcbn07XHJcblxyXG4vKiBmaWxlOiBzcmMvbGF5ZXIvVHJhbnNpdGlvbnMuanMgKi9cclxuXHJcblBMQVlHUk9VTkQuVHJhbnNpdGlvbnMgPSBmdW5jdGlvbihhcHApIHtcclxuXHJcbiAgdGhpcy5hcHAgPSBhcHA7XHJcblxyXG4gIGFwcC5vbihcImVudGVyc3RhdGVcIiwgdGhpcy5lbnRlcnN0YXRlLmJpbmQodGhpcykpO1xyXG4gIGFwcC5vbihcInBvc3RyZW5kZXJcIiwgdGhpcy5wb3N0cmVuZGVyLmJpbmQodGhpcykpO1xyXG4gIGFwcC5vbihcInN0ZXBcIiwgdGhpcy5zdGVwLmJpbmQodGhpcykpO1xyXG5cclxuICB0aGlzLnByb2dyZXNzID0gMTtcclxuICB0aGlzLmxpZmV0aW1lID0gMDtcclxufTtcclxuXHJcblBMQVlHUk9VTkQuVHJhbnNpdGlvbnMucGx1Z2luID0gdHJ1ZTtcclxuXHJcblBMQVlHUk9VTkQuVHJhbnNpdGlvbnMucHJvdG90eXBlID0ge1xyXG5cclxuICBlbnRlcnN0YXRlOiBmdW5jdGlvbihkYXRhKSB7XHJcblxyXG4gICAgdGhpcy5zY3JlZW5zaG90ID0gdGhpcy5hcHAubGF5ZXIuY2FjaGUoKTtcclxuXHJcbiAgICBpZiAoZGF0YS5wcmV2KSB7XHJcbiAgICAgIHRoaXMubGlmZXRpbWUgPSAwO1xyXG4gICAgICB0aGlzLnByb2dyZXNzID0gMDtcclxuICAgIH1cclxuXHJcbiAgfSxcclxuXHJcbiAgcG9zdHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgaWYgKHRoaXMucHJvZ3Jlc3MgPj0gMSkgcmV0dXJuO1xyXG5cclxuICAgIFBMQVlHUk9VTkQuVHJhbnNpdGlvbnMuU3BsaXQodGhpcywgdGhpcy5wcm9ncmVzcyk7XHJcblxyXG4gIH0sXHJcblxyXG4gIHN0ZXA6IGZ1bmN0aW9uKGRlbHRhKSB7XHJcblxyXG4gICAgaWYgKHRoaXMucHJvZ3Jlc3MgPj0gMSkgcmV0dXJuO1xyXG5cclxuICAgIHRoaXMubGlmZXRpbWUgKz0gZGVsdGE7XHJcblxyXG4gICAgdGhpcy5wcm9ncmVzcyA9IE1hdGgubWluKHRoaXMubGlmZXRpbWUgLyAwLjUsIDEpO1xyXG5cclxuICB9XHJcblxyXG59O1xyXG5cclxuUExBWUdST1VORC5UcmFuc2l0aW9ucy5JbXBsb2RlID0gZnVuY3Rpb24obWFuYWdlciwgcHJvZ3Jlc3MpIHtcclxuXHJcbiAgdmFyIGFwcCA9IG1hbmFnZXIuYXBwO1xyXG4gIHZhciBsYXllciA9IGFwcC5sYXllcjtcclxuXHJcbiAgcHJvZ3Jlc3MgPSBhcHAuZWFzZShwcm9ncmVzcywgXCJvdXRDdWJpY1wiKTtcclxuXHJcbiAgdmFyIG5lZ2F0aXZlID0gMSAtIHByb2dyZXNzO1xyXG5cclxuICBsYXllci5zYXZlKCk7XHJcbiAgbGF5ZXIudGFycyhhcHAuY2VudGVyLngsIGFwcC5jZW50ZXIueSwgMC41LCAwLjUsIDAsIDAuNSArIDAuNSAqIG5lZ2F0aXZlLCBuZWdhdGl2ZSk7XHJcbiAgbGF5ZXIuZHJhd0ltYWdlKG1hbmFnZXIuc2NyZWVuc2hvdCwgMCwgMCk7XHJcblxyXG4gIGxheWVyLnJlc3RvcmUoKTtcclxuXHJcbn07XHJcblxyXG5QTEFZR1JPVU5ELlRyYW5zaXRpb25zLlNwbGl0ID0gZnVuY3Rpb24obWFuYWdlciwgcHJvZ3Jlc3MpIHtcclxuXHJcbiAgdmFyIGFwcCA9IG1hbmFnZXIuYXBwO1xyXG4gIHZhciBsYXllciA9IGFwcC5sYXllcjtcclxuXHJcbiAgcHJvZ3Jlc3MgPSBhcHAuZWFzZShwcm9ncmVzcywgXCJpbk91dEN1YmljXCIpO1xyXG5cclxuICB2YXIgbmVnYXRpdmUgPSAxIC0gcHJvZ3Jlc3M7XHJcblxyXG4gIGxheWVyLnNhdmUoKTtcclxuXHJcbiAgbGF5ZXIuYShuZWdhdGl2ZSkuY2xlYXIoXCIjZmZmXCIpLnJhKCk7XHJcblxyXG4gIGxheWVyLmRyYXdJbWFnZShtYW5hZ2VyLnNjcmVlbnNob3QsIDAsIDAsIGFwcC53aWR0aCwgYXBwLmhlaWdodCAvIDIgfCAwLCAwLCAwLCBhcHAud2lkdGgsIG5lZ2F0aXZlICogYXBwLmhlaWdodCAvIDIgfCAwKTtcclxuICBsYXllci5kcmF3SW1hZ2UobWFuYWdlci5zY3JlZW5zaG90LCAwLCBhcHAuaGVpZ2h0IC8gMiB8IDAsIGFwcC53aWR0aCwgYXBwLmhlaWdodCAvIDIgfCAwLCAwLCBhcHAuaGVpZ2h0IC8gMiArIHByb2dyZXNzICogYXBwLmhlaWdodCAvIDIgKyAxIHwgMCwgYXBwLndpZHRoLCBNYXRoLm1heCgxLCBuZWdhdGl2ZSAqIGFwcC5oZWlnaHQgKiAwLjUgfCAwKSk7XHJcblxyXG4gIGxheWVyLnJlc3RvcmUoKTtcclxuXHJcbn07XHJcblxyXG4vKiBmaWxlOiBzcmMvbGF5ZXIvTG9hZGluZ1NjcmVlbi5qcyAqL1xyXG5cclxuUExBWUdST1VORC5Mb2FkaW5nU2NyZWVuID0ge1xyXG5cclxuICBsb2dvUmF3OiBcImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBTm9BQUFBU0JBTUFBQURQaU4weEFBQUFHRkJNVkVVQUFRQXRMaXhIU1VkbmFHYUppb2ltcUtYTXpzdjcvZnI1c2hnVkFBQUFBV0pMUjBRQWlBVWRTQUFBQUFsd1NGbHpBQUFMRXdBQUN4TUJBSnFjR0FBQUFBZDBTVTFGQjk4RUF3a2VBNG9RV0o0QUFBQVpkRVZZZEVOdmJXMWxiblFBUTNKbFlYUmxaQ0IzYVhSb0lFZEpUVkJYZ1E0WEFBQUI5a2xFUVZRNHk3MlV2VytyTUJEQXorRnJwVktyckZtZXNtYXBXTk9scktqU2Uxa1ordW9WQXZqKy9mcnVqRzFTYUpjcUp3VTd2b09mN3hNUXpRbXNJRGk1TlBUTXNMUm50SDNVK0Y2U0FabzNObEN2Y2dCRkp6OG8rdmtEaUU2M2xJOTVZL1VtcGluc1pXa2dKV0ppRGJBVlExNmh0cHR4U1RObG9JbHVnd2F3MDAxRXkzQVNGM3NvNkwxcUxOWHpRUzVTMFVHS0wvQ0k1d1dOcmlFMFVIOVl0eTM3THFJVmcrd3NxdTdJeDBNd1ZCU0YvZFUranYyU05ubWEwMjFMRWRQcVZuTWVVM3hBdTBrWGNTR2ptcTdPeDRFMlduODhMWjIrRUZqM2F2aml4emFpNlZQVnl1WXZlWkxIRjJYZmREbnZBcTI3RElIR3VxKzBESkZzRTMwT3RCMUtxT3dkOERyN1BjTTRiK2pmajJnNWxwNFd5bnRCSzY2cXVhM0p6RUErdVhKcHdIL05sVnV6UlZQWS9rVExCMm1qdU4rS3dkWjhGT3k4ajJnRGJFVVNxdW1uU0NZNGxmNGlicTNJaFZNNHljWlFSbnYrekZxVmRKUVZuNkJ4dlVxZWJHcHVhTm8zc1p4d0J6amFqaU1aT29CaXd5VkYra0NyK25VYUpPYUdwbkFlUlBQSlpUcjRGcW1IUlhjbmVFbzREcVEvZnRmZG5MZURyVUFNRTh4V0tQZUtDd1c2WWtFcFhmczNwMUVXSmhkY1VBWVAwVEkvdVlhVjhjZ2p3Qm92YWV5V3dqaTJUOXJURklkUy9jUC9NbmtUTFJVV3hnTk5aVmluN2JUNWZxVDltaURjVVZKelIxZ1JwZklPTk1tdWxVKzVRcXI2elhBVXFBQUFBQUJKUlU1RXJrSmdnZz09XCIsXHJcblxyXG4gIGNyZWF0ZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgIHRoaXMubG9nbyA9IG5ldyBJbWFnZTtcclxuXHJcbiAgICB0aGlzLmxvZ28uYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgIHNlbGYucmVhZHkgPSB0cnVlO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5sb2dvLnNyYyA9IHRoaXMubG9nb1JhdztcclxuXHJcbiAgICB0aGlzLmJhY2tncm91bmQgPSBcIiMyODIyNDVcIjtcclxuXHJcbiAgICBpZiAod2luZG93LmdldENvbXB1dGVkU3R5bGUpIHtcclxuICAgICAgLy8gdGhpcy5iYWNrZ3JvdW5kID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuYm9keSkuYmFja2dyb3VuZENvbG9yIHx8IFwiIzAwMFwiO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgfSxcclxuXHJcbiAgZW50ZXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHRoaXMuY3VycmVudCA9IDA7XHJcblxyXG4gIH0sXHJcblxyXG4gIGxlYXZlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB0aGlzLmxvY2tlZCA9IHRydWU7XHJcblxyXG4gICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFwcC50d2Vlbih0aGlzKVxyXG4gICAgICAudG8oe1xyXG4gICAgICAgIGN1cnJlbnQ6IDFcclxuICAgICAgfSwgMC41KTtcclxuXHJcbiAgfSxcclxuXHJcbiAgc3RlcDogZnVuY3Rpb24oZGVsdGEpIHtcclxuXHJcbiAgICBpZiAodGhpcy5sb2NrZWQpIHtcclxuICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLmZpbmlzaGVkKSB0aGlzLmxvY2tlZCA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jdXJyZW50ID0gdGhpcy5jdXJyZW50ICsgTWF0aC5hYnModGhpcy5hcHAubG9hZGVyLnByb2dyZXNzIC0gdGhpcy5jdXJyZW50KSAqIGRlbHRhO1xyXG4gICAgfVxyXG5cclxuICB9LFxyXG5cclxuICByZWFkeTogZnVuY3Rpb24oKSB7XHJcblxyXG5cclxuICB9LFxyXG5cclxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIGlmICghdGhpcy5yZWFkeSkgcmV0dXJuO1xyXG5cclxuICAgIHRoaXMuYXBwLmxheWVyLmNsZWFyKHRoaXMuYmFja2dyb3VuZCk7XHJcblxyXG4gICAgdGhpcy5hcHAubGF5ZXIuZmlsbFN0eWxlKFwiI2ZmZlwiKTtcclxuXHJcbiAgICB0aGlzLmFwcC5sYXllci5zYXZlKCk7XHJcbiAgICB0aGlzLmFwcC5sYXllci5hbGlnbigwLjUsIDAuNSk7XHJcbiAgICB0aGlzLmFwcC5sYXllci5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24oXCJsaWdodGVyXCIpO1xyXG4gICAgdGhpcy5hcHAubGF5ZXIuZHJhd0ltYWdlKHRoaXMubG9nbywgdGhpcy5hcHAuY2VudGVyLngsIHRoaXMuYXBwLmNlbnRlci55KTtcclxuXHJcbiAgICB2YXIgdyA9IHRoaXMuY3VycmVudCAqIHRoaXMubG9nby53aWR0aDtcclxuXHJcbiAgICB0aGlzLmFwcC5sYXllci5maWxsU3R5bGUoXCIjZmZmXCIpO1xyXG5cclxuICAgIHRoaXMuYXBwLmxheWVyLmZpbGxSZWN0KHRoaXMuYXBwLmNlbnRlci54LCB0aGlzLmFwcC5jZW50ZXIueSArIDMyLCB3LCAxMik7XHJcbiAgICB0aGlzLmFwcC5sYXllci5maWxsUmVjdCh0aGlzLmFwcC5jZW50ZXIueCwgdGhpcy5hcHAuY2VudGVyLnkgKyAzMiwgdGhpcy5sb2dvLndpZHRoLCA0KTtcclxuXHJcbiAgICB0aGlzLmFwcC5sYXllci5yZXN0b3JlKCk7XHJcblxyXG4gIH1cclxuXHJcbn07IiwiLyogc2NhbmxpbmVzIHBsdWdpbiBmb3IgcGxheWdyb3VuZCdzIGRlZmF1bHQgcmVuZGVyZXIgKi9cclxuXHJcblBMQVlHUk9VTkQuU2NhbmxpbmVzID0gZnVuY3Rpb24oYXBwKSB7XHJcblxyXG4gIHRoaXMuYXBwID0gYXBwO1xyXG5cclxuICBhcHAub24oXCJyZXNpemVcIiwgdGhpcy5yZXNpemUuYmluZCh0aGlzKSk7XHJcbiAgYXBwLm9uKFwicG9zdHJlbmRlclwiLCB0aGlzLnBvc3RyZW5kZXIuYmluZCh0aGlzKSk7XHJcblxyXG59O1xyXG5cclxuUExBWUdST1VORC5TY2FubGluZXMucGx1Z2luID0gdHJ1ZTtcclxuXHJcblBMQVlHUk9VTkQuU2NhbmxpbmVzLnByb3RvdHlwZSA9IHtcclxuXHJcbiAgcmVzaXplOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB0aGlzLmltYWdlID0gY3EodGhpcy5hcHAud2lkdGgsIHRoaXMuYXBwLmhlaWdodCk7XHJcblxyXG4gICAgdGhpcy5pbWFnZS5nbG9iYWxBbHBoYSgwLjEpO1xyXG4gICAgdGhpcy5pbWFnZS5maWxsU3R5bGUoXCIjMDA4XCIpO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgdGhpcy5pbWFnZS5jYW52YXMuaGVpZ2h0OyBpICs9IDgpe1xyXG4gICAgICBcclxuICAgICAgdGhpcy5pbWFnZS5maWxsUmVjdCgwLCBpLCB0aGlzLmltYWdlLmNhbnZhcy53aWR0aCwgNCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuaW1hZ2UgPSB0aGlzLmltYWdlLmNhY2hlKCk7XHJcblxyXG4gIH0sXHJcblxyXG4gIHBvc3RyZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIGlmICh0aGlzLmltYWdlKSB7XHJcblxyXG4gICAgICAvLyB0aGlzLmFwcC5sYXllci5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgMCwgMCk7XHJcblxyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG59OyIsIi8qXHJcblxyXG4gIFNvdW5kT25EZW1hbmQgcjFcclxuXHJcbiAgKGMpIDIwMTItMjAxNSBodHRwOi8vcmV6b25lci5uZXRcclxuXHJcbiAgVGhpcyBsaWJyYXJ5IG1heSBiZSBmcmVlbHkgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxyXG5cclxuKi9cclxuXHJcbi8qIG9wdGlvbnMgKi9cclxuXHJcbi8qIG91dHB1dDogb3V0cHV0IG5vZGUsIGRlZmF1bHQgKi9cclxuLyogYXVkaW9Db250ZXh0OiBhdWRpb0NvbnRleHQgKi9cclxuXHJcblNvdW5kT25EZW1hbmQgPSBmdW5jdGlvbihvcHRpb25zKSB7XHJcblxyXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG5cclxuICB2YXIgY2FuUGxheU1wMyA9IChuZXcgQXVkaW8pLmNhblBsYXlUeXBlKFwiYXVkaW8vbXAzXCIpO1xyXG4gIHZhciBjYW5QbGF5T2dnID0gKG5ldyBBdWRpbykuY2FuUGxheVR5cGUoJ2F1ZGlvL29nZzsgY29kZWNzPVwidm9yYmlzXCInKTtcclxuXHJcbiAgaWYgKHRoaXMucHJlZmVyZWRBdWRpb0Zvcm1hdCA9PT0gXCJtcDNcIikge1xyXG5cclxuICAgIGlmIChjYW5QbGF5TXAzKSB0aGlzLmF1ZGlvRm9ybWF0ID0gXCJtcDNcIjtcclxuICAgIGVsc2UgdGhpcy5hdWRpb0Zvcm1hdCA9IFwib2dnXCI7XHJcblxyXG4gIH0gZWxzZSB7XHJcblxyXG4gICAgaWYgKGNhblBsYXlPZ2cpIHRoaXMuYXVkaW9Gb3JtYXQgPSBcIm9nZ1wiO1xyXG4gICAgZWxzZSB0aGlzLmF1ZGlvRm9ybWF0ID0gXCJtcDNcIjtcclxuXHJcbiAgfVxyXG5cclxuICBpZiAoIW9wdGlvbnMuYXVkaW9Db250ZXh0KSB7XHJcbiAgICBjb25zb2xlLndhcm4oJ1Bvc3NpYmxlIGR1cGxpY2F0ZWQgQXVkaW9Db250ZXh0LCB1c2Ugb3B0aW9ucy5hdWRpb0NvbnRleHQnKTtcclxuICB9XHJcbiAgdGhpcy5hdWRpb0NvbnRleHQgPSBvcHRpb25zLmF1ZGlvQ29udGV4dCB8fCBuZXcgQXVkaW9Db250ZXh0O1xyXG5cclxuICB0aGlzLmNvbXByZXNzb3IgPSB0aGlzLmF1ZGlvQ29udGV4dC5jcmVhdGVEeW5hbWljc0NvbXByZXNzb3IoKTtcclxuICB0aGlzLmNvbXByZXNzb3IuY29ubmVjdCh0aGlzLmF1ZGlvQ29udGV4dC5kZXN0aW5hdGlvbik7XHJcblxyXG4gIHRoaXMuZ2Fpbk5vZGUgPSB0aGlzLmF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKClcclxuICB0aGlzLmdhaW5Ob2RlLmNvbm5lY3QodGhpcy5jb21wcmVzc29yKTtcclxuXHJcbiAgdGhpcy5pbnB1dCA9IHRoaXMuZ2Fpbk5vZGU7XHJcblxyXG4gIHRoaXMuZ2Fpbk5vZGUuZ2Fpbi52YWx1ZSA9IDEuMDtcclxuXHJcbiAgdGhpcy5idWZmZXJzID0ge307XHJcblxyXG4gIHRoaXMuY2hhbm5lbHMgPSB7fTtcclxuICB0aGlzLmFsaWFzZXMgPSB7fTtcclxuXHJcbiAgdmFyIGxhc3RUaWNrID0gRGF0ZS5ub3coKTtcclxuICB2YXIgZW5naW5lID0gdGhpcztcclxuXHJcbiAgc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdmFyIGRlbHRhID0gKERhdGUubm93KCkgLSBsYXN0VGljaykgLyAxMDAwO1xyXG5cclxuICAgIGxhc3RUaWNrID0gRGF0ZS5ub3coKTtcclxuXHJcbiAgICBlbmdpbmUuc3RlcChkZWx0YSk7XHJcblxyXG4gIH0sIDEwMDAgLyA2MCk7XHJcblxyXG59O1xyXG5cclxuU291bmRPbkRlbWFuZC5tb3ZlVG8gPSBmdW5jdGlvbih2YWx1ZSwgdGFyZ2V0LCBzdGVwKSB7XHJcblxyXG4gIGlmICh2YWx1ZSA8IHRhcmdldCkge1xyXG4gICAgdmFsdWUgKz0gc3RlcDtcclxuICAgIGlmICh2YWx1ZSA+IHRhcmdldCkgdmFsdWUgPSB0YXJnZXQ7XHJcbiAgfVxyXG5cclxuICBpZiAodmFsdWUgPiB0YXJnZXQpIHtcclxuICAgIHZhbHVlIC09IHN0ZXA7XHJcbiAgICBpZiAodmFsdWUgPCB0YXJnZXQpIHZhbHVlID0gdGFyZ2V0O1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHZhbHVlO1xyXG5cclxufTtcclxuXHJcblNvdW5kT25EZW1hbmQucHJvdG90eXBlID0ge1xyXG5cclxuICBjb25zdHJ1Y3RvcjogU291bmRPbkRlbWFuZCxcclxuXHJcbiAgcGF0aDogXCJzb3VuZHMvXCIsXHJcblxyXG4gIGNoYW5uZWw6IGZ1bmN0aW9uKG5hbWUpIHtcclxuXHJcbiAgICBpZiAoIXRoaXMuY2hhbm5lbHNbbmFtZV0pIHRoaXMuY2hhbm5lbHNbbmFtZV0gPSBuZXcgU291bmRPbkRlbWFuZC5DaGFubmVsKHRoaXMpO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmNoYW5uZWxzW25hbWVdO1xyXG5cclxuICB9LFxyXG5cclxuICBnZXRBc3NldEVudHJ5OiBmdW5jdGlvbihwYXRoLCBkZWZhdWx0RXh0ZW5zaW9uKSB7XHJcblxyXG4gICAgLyogdHJhbnNsYXRlIGZvbGRlciBhY2NvcmRpbmcgdG8gdXNlciBwcm92aWRlZCBwYXRoc1xyXG4gICAgICAgb3IgbGVhdmUgYXMgaXMgKi9cclxuXHJcbiAgICB2YXIgZmlsZWluZm8gPSBwYXRoLm1hdGNoKC8oLiopXFwuLiovKTtcclxuICAgIHZhciBrZXkgPSBmaWxlaW5mbyA/IGZpbGVpbmZvWzFdIDogcGF0aDtcclxuXHJcbiAgICB2YXIgdGVtcCA9IHBhdGguc3BsaXQoXCIuXCIpO1xyXG4gICAgdmFyIGJhc2VuYW1lID0gcGF0aDtcclxuXHJcbiAgICBpZiAodGVtcC5sZW5ndGggPiAxKSB7XHJcbiAgICAgIHZhciBleHQgPSB0ZW1wLnBvcCgpO1xyXG4gICAgICBwYXRoID0gdGVtcC5qb2luKFwiLlwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhciBleHQgPSBkZWZhdWx0RXh0ZW5zaW9uO1xyXG4gICAgICBiYXNlbmFtZSArPSBcIi5cIiArIGRlZmF1bHRFeHRlbnNpb247XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAga2V5OiBrZXksXHJcbiAgICAgIHVybDogdGhpcy5wYXRoICsgYmFzZW5hbWUsXHJcbiAgICAgIHBhdGg6IHRoaXMucGF0aCArIHBhdGgsXHJcbiAgICAgIGV4dDogZXh0XHJcbiAgICB9O1xyXG5cclxuICB9LFxyXG5cclxuICBsb2FkZXJzOiB7fSxcclxuXHJcbiAgbG9hZDogZnVuY3Rpb24oa2V5KSB7XHJcblxyXG4gICAgdmFyIGVuZ2luZSA9IHRoaXM7XHJcbiAgICB2YXIgZW50cnkgPSBlbmdpbmUuZ2V0QXNzZXRFbnRyeShrZXksIGVuZ2luZS5hdWRpb0Zvcm1hdCk7XHJcblxyXG4gICAgaWYgKCF0aGlzLmxvYWRlcnNba2V5XSkge1xyXG5cclxuICAgICAgdGhpcy5sb2FkZXJzW2tleV0gPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcbiAgICAgICAgaWYgKGVuZ2luZS5idWZmZXJzW2VudHJ5LmtleV0pIHJldHVybiByZXNvbHZlKGVuZ2luZS5idWZmZXJzW2VudHJ5LmtleV0pO1xyXG5cclxuICAgICAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG5cclxuICAgICAgICByZXF1ZXN0Lm9wZW4oXCJHRVRcIiwgZW50cnkudXJsLCB0cnVlKTtcclxuICAgICAgICByZXF1ZXN0LnJlc3BvbnNlVHlwZSA9IFwiYXJyYXlidWZmZXJcIjtcclxuXHJcbiAgICAgICAgcmVxdWVzdC5vbmxvYWQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIGVuZ2luZS5hdWRpb0NvbnRleHQuZGVjb2RlQXVkaW9EYXRhKHRoaXMucmVzcG9uc2UsIGZ1bmN0aW9uKGRlY29kZWRCdWZmZXIpIHtcclxuXHJcbiAgICAgICAgICAgIGVuZ2luZS5idWZmZXJzW2VudHJ5LmtleV0gPSBkZWNvZGVkQnVmZmVyO1xyXG4gICAgICAgICAgICByZXNvbHZlKGRlY29kZWRCdWZmZXIpO1xyXG5cclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlcXVlc3Quc2VuZCgpO1xyXG5cclxuICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLmxvYWRlcnNba2V5XTtcclxuXHJcbiAgfSxcclxuXHJcbiAgc3RlcDogZnVuY3Rpb24oZGVsdGEpIHtcclxuXHJcbiAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5jaGFubmVscykge1xyXG5cclxuICAgICAgdGhpcy5jaGFubmVsc1trZXldLnN0ZXAoZGVsdGEpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgfSxcclxuXHJcbiAgZHVwbGljYXRlOiBmdW5jdGlvbihzb3VyY2UsIGFzLCB2b2x1bWUsIHJhdGUpIHtcclxuXHJcbiAgICB2YXIgZW5naW5lID0gdGhpcztcclxuXHJcbiAgICB0aGlzLmxvYWQoc291cmNlKS50aGVuKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgZW5naW5lLmJ1ZmZlcnNbc291cmNlXTtcclxuXHJcbiAgICAgIGVuZ2luZS5idWZmZXJzW2FzXSA9IGVuZ2luZS5idWZmZXJzW3NvdXJjZV07XHJcblxyXG4gICAgfSk7XHJcblxyXG4gIH0sXHJcblxyXG4gIGFsaWFzOiBmdW5jdGlvbihuYW1lLCBzb3VyY2UsIHJhdGUsIHZvbHVtZSkge1xyXG5cclxuICAgIHRoaXMuYWxpYXNlc1tuYW1lXSA9IHtcclxuICAgICAgc291cmNlOiBzb3VyY2UsXHJcbiAgICAgIHJhdGU6IHJhdGUsXHJcbiAgICAgIHZvbHVtZTogdm9sdW1lXHJcbiAgICB9O1xyXG5cclxuICB9XHJcblxyXG59O1xyXG5Tb3VuZE9uRGVtYW5kLkV2ZW50cyA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICB0aGlzLmxpc3RlbmVycyA9IHt9O1xyXG5cclxufTtcclxuXHJcblNvdW5kT25EZW1hbmQuRXZlbnRzLnByb3RvdHlwZSA9IHtcclxuXHJcbiAgb246IGZ1bmN0aW9uKGV2ZW50LCBjYWxsYmFjaykge1xyXG5cclxuICAgIGlmICh0eXBlb2YgZXZlbnQgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgICBmb3IgKHZhciBrZXkgaW4gZXZlbnQpIHtcclxuICAgICAgICByZXN1bHRba2V5XSA9IHRoaXMub24oa2V5LCBldmVudFtrZXldKVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLmxpc3RlbmVyc1tldmVudF0pIHRoaXMubGlzdGVuZXJzW2V2ZW50XSA9IFtdO1xyXG5cclxuICAgIHRoaXMubGlzdGVuZXJzW2V2ZW50XS5wdXNoKGNhbGxiYWNrKTtcclxuXHJcbiAgICByZXR1cm4gY2FsbGJhY2s7XHJcbiAgfSxcclxuXHJcbiAgb25jZTogZnVuY3Rpb24oZXZlbnQsIGNhbGxiYWNrKSB7XHJcblxyXG4gICAgY2FsbGJhY2sub25jZSA9IHRydWU7XHJcblxyXG4gICAgaWYgKCF0aGlzLmxpc3RlbmVyc1tldmVudF0pIHRoaXMubGlzdGVuZXJzW2V2ZW50XSA9IFtdO1xyXG5cclxuICAgIHRoaXMubGlzdGVuZXJzW2V2ZW50XS5wdXNoKGNhbGxiYWNrKTtcclxuXHJcbiAgICByZXR1cm4gY2FsbGJhY2s7XHJcblxyXG4gIH0sXHJcblxyXG4gIG9mZjogZnVuY3Rpb24oZXZlbnQsIGNhbGxiYWNrKSB7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHRoaXMubGlzdGVuZXJzW2V2ZW50XS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICBpZiAodGhpcy5saXN0ZW5lcnNbZXZlbnRdW2ldLl9yZW1vdmUpIHtcclxuICAgICAgICB0aGlzLmxpc3RlbmVyc1tldmVudF0uc3BsaWNlKGktLSwgMSk7XHJcbiAgICAgICAgbGVuLS07XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgfSxcclxuXHJcbiAgdHJpZ2dlcjogZnVuY3Rpb24oZXZlbnQsIGRhdGEpIHtcclxuXHJcbiAgICAvKiBpZiB5b3UgcHJlZmVyIGV2ZW50cyBwaXBlICovXHJcblxyXG4gICAgaWYgKHRoaXMubGlzdGVuZXJzW1wiZXZlbnRcIl0pIHtcclxuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHRoaXMubGlzdGVuZXJzW1wiZXZlbnRcIl0ubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICB0aGlzLmxpc3RlbmVyc1tcImV2ZW50XCJdW2ldKGV2ZW50LCBkYXRhKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qIG9yIHN1YnNjcmliZWQgdG8gc2luZ2xlIGV2ZW50ICovXHJcblxyXG4gICAgaWYgKHRoaXMubGlzdGVuZXJzW2V2ZW50XSkge1xyXG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gdGhpcy5saXN0ZW5lcnNbZXZlbnRdLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgdmFyIGxpc3RlbmVyID0gdGhpcy5saXN0ZW5lcnNbZXZlbnRdW2ldO1xyXG4gICAgICAgIGxpc3RlbmVyLmNhbGwodGhpcywgZGF0YSk7XHJcblxyXG4gICAgICAgIGlmIChsaXN0ZW5lci5vbmNlKSB7XHJcbiAgICAgICAgICB0aGlzLmxpc3RlbmVyc1tldmVudF0uc3BsaWNlKGktLSwgMSk7XHJcbiAgICAgICAgICBsZW4tLTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxufTtcclxuU291bmRPbkRlbWFuZC5DaGFubmVsID0gZnVuY3Rpb24oZW5naW5lKSB7XHJcblxyXG4gIHRoaXMuZW5naW5lID0gZW5naW5lO1xyXG4gIHRoaXMuYXVkaW9Db250ZXh0ID0gZW5naW5lLmF1ZGlvQ29udGV4dDtcclxuXHJcbiAgLyogY29ubmVjdGlvbiBvcmRlciBnb2VzIGZyb20gYm90dG9tIHRvIHRvcCAqL1xyXG5cclxuICAvKiBnYWluIG5vZGUgKi9cclxuXHJcbiAgdGhpcy5nYWluTm9kZSA9IHRoaXMuYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKTtcclxuXHJcbiAgLyogY29udm9sdmVyICovXHJcblxyXG4gIHRoaXMuY29udm9sdmVyV2V0Tm9kZSA9IHRoaXMuYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKTtcclxuICB0aGlzLmNvbnZvbHZlckRyeU5vZGUgPSB0aGlzLmF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKCk7XHJcbiAgdGhpcy5jb252b2x2ZXJOb2RlID0gdGhpcy5hdWRpb0NvbnRleHQuY3JlYXRlQ29udm9sdmVyKCk7XHJcbiAgdGhpcy5jb252b2x2ZXJFbmFibGVkID0gZmFsc2U7XHJcblxyXG4gIHRoaXMucm91dGUoKTtcclxuXHJcbiAgdGhpcy5xdWV1ZSA9IFtdO1xyXG4gIHRoaXMubG9vcHMgPSBbXTtcclxuXHJcbn07XHJcblxyXG5Tb3VuZE9uRGVtYW5kLkNoYW5uZWwucHJvdG90eXBlID0ge1xyXG5cclxuICBjb25zdHJ1Y3RvcjogU291bmRPbkRlbWFuZC5DaGFubmVsLFxyXG5cclxuICAvKiBnZXQgYSBzb3VuZCBmb3IgZnVydGhlciB1c2FnZSAqL1xyXG5cclxuICB4cm91dGU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIGlmICh0aGlzLmN1cnJlbnRSb3V0ZSkge1xyXG5cclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmN1cnJlbnRSb3V0ZS5sZW5ndGggLSAxOyBpKyspIHtcclxuXHJcbiAgICAgICAgdGhpcy5jdXJyZW50Um91dGVbaV0uZGlzY29ubmVjdCgpO1xyXG5cclxuICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmN1cnJlbnRSb3V0ZSA9IFtdO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICBpZiAoaSA8IGFyZ3VtZW50cy5sZW5ndGggLSAxKSB7XHJcblxyXG4gICAgICAgIHZhciBub2RlID0gYXJndW1lbnRzW2ldO1xyXG5cclxuICAgICAgICBub2RlLmNvbm5lY3QoYXJndW1lbnRzW2kgKyAxXSk7XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLmN1cnJlbnRSb3V0ZS5wdXNoKG5vZGUpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmlucHV0ID0gYXJndW1lbnRzWzBdO1xyXG5cclxuICB9LFxyXG5cclxuICBnZXQ6IGZ1bmN0aW9uKGtleSkge1xyXG5cclxuICAgIHJldHVybiBuZXcgU291bmRPbkRlbWFuZC5Tb3VuZChrZXksIHRoaXMpO1xyXG5cclxuICB9LFxyXG5cclxuICBwbGF5OiBmdW5jdGlvbihrZXkpIHtcclxuXHJcbiAgICB2YXIgc291bmQgPSB0aGlzLmdldChrZXkpO1xyXG5cclxuICAgIHRoaXMuYWRkKHNvdW5kKTtcclxuXHJcbiAgICByZXR1cm4gc291bmQ7XHJcblxyXG4gIH0sXHJcblxyXG4gIHJlbW92ZTogZnVuY3Rpb24oc291bmQpIHtcclxuXHJcbiAgICBzb3VuZC5fcmVtb3ZlID0gdHJ1ZTtcclxuXHJcbiAgfSxcclxuXHJcbiAgYWRkOiBmdW5jdGlvbihzb3VuZCkge1xyXG5cclxuICAgIHNvdW5kLl9yZW1vdmUgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLnF1ZXVlLnB1c2goc291bmQpO1xyXG5cclxuICB9LFxyXG5cclxuICBzdGVwOiBmdW5jdGlvbihkZWx0YSkge1xyXG5cclxuICAgIC8qIHByb2Nlc3MgcXVldWUgKi9cclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucXVldWUubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgIHZhciBzb3VuZCA9IHRoaXMucXVldWVbaV07XHJcblxyXG4gICAgICBzb3VuZC5zdGVwKGRlbHRhKTtcclxuXHJcbiAgICAgIGlmIChzb3VuZC5fcmVtb3ZlKSB0aGlzLnF1ZXVlLnNwbGljZShpLS0sIDEpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKiBwcm9jZXNzIHNvdW5kcyBiZWluZyBwbGF5ZWQgKi9cclxuXHJcbiAgfSxcclxuXHJcbiAgdm9sdW1lOiBmdW5jdGlvbih2YWx1ZSkge1xyXG5cclxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoKSB7XHJcblxyXG4gICAgICB0aGlzLmdhaW5Ob2RlLmdhaW4udmFsdWUgPSB2YWx1ZTtcclxuXHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG5cclxuICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcy5nYWluTm9kZS5nYWluLnZhbHVlO1xyXG5cclxuICAgIH1cclxuXHJcbiAgfSxcclxuXHJcbiAgc3dhcENvbnZvbHZlcjogZnVuY3Rpb24oa2V5KSB7XHJcblxyXG4gICAgdmFyIGVuZ2luZSA9IHRoaXMuZW5naW5lO1xyXG4gICAgdmFyIGNoYW5uZWwgPSB0aGlzO1xyXG5cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCBmYWlsKSB7XHJcblxyXG4gICAgICBpZiAoY2hhbm5lbC5jdXJyZW50Q29udm9sdmVySW1wdWxzZSA9PT0ga2V5KSB7XHJcblxyXG4gICAgICAgIHJlc29sdmUoKTtcclxuXHJcbiAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgIGVuZ2luZS5sb2FkKGtleSkudGhlbihmdW5jdGlvbihidWZmZXIpIHtcclxuICAgICAgICAgIGNoYW5uZWwuY3VycmVudENvbnZvbHZlckltcHVsc2UgPSBrZXk7XHJcbiAgICAgICAgICBjaGFubmVsLmNvbnZvbHZlck5vZGUuYnVmZmVyID0gYnVmZmVyO1xyXG4gICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG5cclxuICB9LFxyXG5cclxuICB1cGRhdGVDb252b3ZsZXJTdGF0ZTogZnVuY3Rpb24oZW5hYmxlZCkge1xyXG5cclxuICAgIHRoaXMuY29udm9sdmVyRW5hYmxlZCA9IGVuYWJsZWQ7XHJcbiAgICB0aGlzLnJvdXRlKCk7XHJcblxyXG4gIH0sXHJcblxyXG4gIHN1YnJvdXRlOiBmdW5jdGlvbihub2Rlcykge1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgIGlmIChpIDwgbm9kZXMubGVuZ3RoIC0gMSkge1xyXG5cclxuICAgICAgICB2YXIgbm9kZSA9IG5vZGVzW2ldO1xyXG4gICAgICAgIG5vZGUuZGlzY29ubmVjdCgpO1xyXG4gICAgICAgIG5vZGUuY29ubmVjdChub2Rlc1tpICsgMV0pO1xyXG5cclxuICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmlucHV0ID0gbm9kZXNbMF07XHJcblxyXG4gIH0sXHJcblxyXG4gIHJvdXRlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB0aGlzLmdhaW5Ob2RlLmRpc2Nvbm5lY3QoKTtcclxuXHJcbiAgICBpZiAodGhpcy5jb252b2x2ZXJFbmFibGVkKSB7XHJcblxyXG4gICAgICB0aGlzLmdhaW5Ob2RlLmNvbm5lY3QodGhpcy5jb252b2x2ZXJEcnlOb2RlKTtcclxuXHJcbiAgICAgIHRoaXMuZ2Fpbk5vZGUuY29ubmVjdCh0aGlzLmNvbnZvbHZlck5vZGUpO1xyXG4gICAgICB0aGlzLmNvbnZvbHZlck5vZGUuY29ubmVjdCh0aGlzLmNvbnZvbHZlcldldE5vZGUpO1xyXG5cclxuICAgICAgdGhpcy5jb252b2x2ZXJXZXROb2RlLmNvbm5lY3QodGhpcy5lbmdpbmUuaW5wdXQpO1xyXG4gICAgICB0aGlzLmNvbnZvbHZlckRyeU5vZGUuY29ubmVjdCh0aGlzLmVuZ2luZS5pbnB1dCk7XHJcblxyXG4gICAgfSBlbHNlIHtcclxuXHJcbiAgICAgIHRoaXMuZ2Fpbk5vZGUuY29ubmVjdCh0aGlzLmVuZ2luZS5pbnB1dCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuaW5wdXQgPSB0aGlzLmdhaW5Ob2RlO1xyXG5cclxuICB9LFxyXG5cclxuICBjb252b2x2ZXI6IGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcclxuXHJcbiAgICB2YXIgZW5hYmxlZCA9IHZhbHVlID4gMDtcclxuICAgIHZhciBjaGFubmVsID0gdGhpcztcclxuXHJcbiAgICB0aGlzLnN3YXBDb252b2x2ZXIoa2V5KS50aGVuKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgaWYgKGVuYWJsZWQgIT09IGNoYW5uZWwuY29udm9sdmVyRW5hYmxlZCkgY2hhbm5lbC51cGRhdGVDb252b3ZsZXJTdGF0ZShlbmFibGVkKTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmNvbnZvbHZlcldldE5vZGUuZ2Fpbi52YWx1ZSA9IHZhbHVlO1xyXG4gICAgdGhpcy5jb252b2x2ZXJEcnlOb2RlLmdhaW4udmFsdWUgPSAxIC0gdmFsdWU7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gIH1cclxuXHJcbn07XHJcblNvdW5kT25EZW1hbmQuU291bmQgPSBmdW5jdGlvbihrZXksIGNoYW5uZWwpIHtcclxuXHJcbiAgdGhpcy5rZXkgPSBrZXk7XHJcbiAgdGhpcy5idWZmZXJLZXkgPSBrZXk7XHJcblxyXG4gIGlmIChjaGFubmVsLmVuZ2luZS5hbGlhc2VzW2tleV0pIHtcclxuXHJcbiAgICB0aGlzLmFsaWFzID0gY2hhbm5lbC5lbmdpbmUuYWxpYXNlc1trZXldO1xyXG5cclxuICAgIHRoaXMuYnVmZmVyS2V5ID0gdGhpcy5hbGlhcy5zb3VyY2U7XHJcblxyXG4gIH1cclxuXHJcbiAgaWYgKCFjaGFubmVsLmVuZ2luZS5idWZmZXJzW3RoaXMuYnVmZmVyS2V5XSkgY2hhbm5lbC5lbmdpbmUubG9hZCh0aGlzLmJ1ZmZlcktleSk7XHJcblxyXG4gIHRoaXMuY2hhbm5lbCA9IGNoYW5uZWw7XHJcbiAgdGhpcy5hdWRpb0NvbnRleHQgPSB0aGlzLmNoYW5uZWwuZW5naW5lLmF1ZGlvQ29udGV4dDtcclxuXHJcbiAgdGhpcy5jdXJyZW50ID0ge1xyXG4gICAgdm9sdW1lOiAxLjAsXHJcbiAgICByYXRlOiAxLjBcclxuICB9O1xyXG5cclxuICB0aGlzLmZhZGVNb2QgPSAxLjA7XHJcblxyXG4gIHRoaXMuY3JlYXRlTm9kZXMoKTtcclxuXHJcbn07XHJcblxyXG5Tb3VuZE9uRGVtYW5kLlNvdW5kLnByb3RvdHlwZSA9IHtcclxuXHJcbiAgY29uc3RydWN0b3I6IFNvdW5kT25EZW1hbmQuU291bmQsXHJcblxyXG4gIGFsaWFzOiB7XHJcbiAgICB2b2x1bWU6IDEuMCxcclxuICAgIHJhdGU6IDEuMFxyXG4gIH0sXHJcblxyXG4gIGNyZWF0ZU5vZGVzOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB2YXIgYnVmZmVyU291cmNlID0gdGhpcy5hdWRpb0NvbnRleHQuY3JlYXRlQnVmZmVyU291cmNlKCk7XHJcbiAgICB2YXIgZ2Fpbk5vZGUgPSB0aGlzLmF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKCk7XHJcbiAgICB2YXIgcGFuTm9kZSA9IHRoaXMuYXVkaW9Db250ZXh0LmNyZWF0ZVN0ZXJlb1Bhbm5lcigpO1xyXG5cclxuICAgIGJ1ZmZlclNvdXJjZS5jb25uZWN0KHBhbk5vZGUpO1xyXG4gICAgcGFuTm9kZS5jb25uZWN0KGdhaW5Ob2RlKTtcclxuICAgIGdhaW5Ob2RlLmNvbm5lY3QodGhpcy5jaGFubmVsLmlucHV0KTtcclxuXHJcbiAgICB0aGlzLmJ1ZmZlclNvdXJjZSA9IGJ1ZmZlclNvdXJjZTtcclxuICAgIHRoaXMuZ2Fpbk5vZGUgPSBnYWluTm9kZTtcclxuICAgIHRoaXMucGFuTm9kZSA9IHBhbk5vZGU7XHJcblxyXG4gIH0sXHJcblxyXG4gIHZvbHVtZTogZnVuY3Rpb24odm9sdW1lKSB7XHJcblxyXG4gICAgdm9sdW1lICo9IHRoaXMuYWxpYXMudm9sdW1lO1xyXG5cclxuICAgIHRoaXMuY3VycmVudC52b2x1bWUgPSB2b2x1bWU7XHJcblxyXG4gICAgdGhpcy51cGRhdGVWb2x1bWUoKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgfSxcclxuXHJcbiAgdXBkYXRlVm9sdW1lOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB0aGlzLmdhaW5Ob2RlLmdhaW4udmFsdWUgPSB0aGlzLmN1cnJlbnQudm9sdW1lICogdGhpcy5mYWRlTW9kO1xyXG5cclxuICB9LFxyXG5cclxuICBwYW46IGZ1bmN0aW9uKHBhbikge1xyXG5cclxuICAgIHRoaXMuY3VycmVudC5wYW4gPSBwYW47XHJcblxyXG4gICAgdGhpcy51cGRhdGVQYW5uaW5nKCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gIH0sXHJcblxyXG4gIHVwZGF0ZVBhbm5pbmc6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHRoaXMucGFuTm9kZS5wYW4udmFsdWUgPSB0aGlzLmN1cnJlbnQucGFuO1xyXG5cclxuICB9LFxyXG5cclxuICBsb29wOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB0aGlzLmJ1ZmZlclNvdXJjZS5sb29wID0gdHJ1ZTtcclxuICAgIHRoaXMuY3VycmVudC5sb29wID0gdHJ1ZTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgfSxcclxuXHJcbiAgcnJhdGU6IGZ1bmN0aW9uKHJhbmdlKSB7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMucmF0ZSh0aGlzLmN1cnJlbnQucmF0ZSArICgtMSArIE1hdGgucmFuZG9tKCkgKiAyKSAqIHJhbmdlKTtcclxuXHJcbiAgfSxcclxuXHJcbiAgcmF0ZTogZnVuY3Rpb24ocmF0ZSkge1xyXG5cclxuICAgIHJhdGUgKj0gdGhpcy5hbGlhcy5yYXRlO1xyXG5cclxuICAgIHRoaXMuYnVmZmVyU291cmNlLnBsYXliYWNrUmF0ZS52YWx1ZSA9IHJhdGU7XHJcblxyXG4gICAgdGhpcy5jdXJyZW50LnJhdGUgPSByYXRlO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG5cclxuICB9LFxyXG5cclxuICBvbmVuZGVkOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICBpZiAoIXRoaXMuY3VycmVudC5sb29wKSB0aGlzLnN0b3AoKTtcclxuXHJcbiAgfSxcclxuXHJcbiAgc3RlcDogZnVuY3Rpb24oZGVsdGEpIHtcclxuXHJcbiAgICBpZiAoIXRoaXMucmVhZHkpIHtcclxuXHJcbiAgICAgIGlmICghdGhpcy5jaGFubmVsLmVuZ2luZS5idWZmZXJzW3RoaXMuYnVmZmVyS2V5XSkgcmV0dXJuO1xyXG5cclxuICAgICAgdGhpcy5yZWFkeSA9IHRydWU7XHJcbiAgICAgIHRoaXMucGxheWluZyA9IHRydWU7XHJcblxyXG4gICAgICB0aGlzLmJ1ZmZlciA9IHRoaXMuY2hhbm5lbC5lbmdpbmUuYnVmZmVyc1t0aGlzLmJ1ZmZlcktleV07XHJcblxyXG4gICAgICB0aGlzLmJ1ZmZlclNvdXJjZS5idWZmZXIgPSB0aGlzLmJ1ZmZlcjtcclxuXHJcbiAgICAgIHRoaXMuYnVmZmVyU291cmNlLnN0YXJ0KDApO1xyXG4gICAgICB0aGlzLmJ1ZmZlclNvdXJjZS5vbmVuZGVkID0gdGhpcy5vbmVuZGVkLmJpbmQodGhpcyk7XHJcblxyXG4gICAgICB0aGlzLmN1cnJlbnRUaW1lID0gMDtcclxuXHJcbiAgICAgIHRoaXMuY3VycmVudFRpbWUgKz0gdGhpcy5idWZmZXJTb3VyY2UucGxheWJhY2tSYXRlLnZhbHVlICogZGVsdGE7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuZmFkZVRhcmdldCAhPT0gdGhpcy5mYWRlTW9kKSB7XHJcblxyXG4gICAgICB0aGlzLmZhZGVNb2QgPSBTb3VuZE9uRGVtYW5kLm1vdmVUbyh0aGlzLmZhZGVNb2QsIHRoaXMuZmFkZVRhcmdldCwgZGVsdGEgKiB0aGlzLmZhZGVTcGVlZCk7XHJcblxyXG4gICAgICB0aGlzLnVwZGF0ZVZvbHVtZSgpO1xyXG5cclxuICAgIH0gZWxzZSBpZiAodGhpcy5mYWRlVGFyZ2V0ID09PSAwKSB7XHJcblxyXG4gICAgICB0aGlzLnBhdXNlKCk7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gIH0sXHJcblxyXG4gIHBhdXNlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB0aGlzLmNoYW5uZWwucmVtb3ZlKHRoaXMpO1xyXG5cclxuICAgIHRoaXMuYnVmZmVyU291cmNlLnN0b3AoMCk7XHJcblxyXG4gICAgdGhpcy5wbGF5aW5nID0gZmFsc2U7XHJcblxyXG4gIH0sXHJcblxyXG4gIHN0b3A6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHRoaXMuY2hhbm5lbC5yZW1vdmUodGhpcyk7XHJcblxyXG4gICAgdGhpcy5idWZmZXJTb3VyY2Uuc3RvcCgwKTtcclxuXHJcbiAgICB0aGlzLnBsYXlpbmcgPSBmYWxzZTtcclxuXHJcbiAgfSxcclxuXHJcbiAgcmVzdW1lOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB0aGlzLmNyZWF0ZU5vZGVzKCk7XHJcblxyXG4gICAgdGhpcy5idWZmZXJTb3VyY2UuYnVmZmVyID0gdGhpcy5idWZmZXI7XHJcblxyXG4gICAgdGhpcy5jdXJyZW50VGltZSA9IHRoaXMuY3VycmVudFRpbWUgJSB0aGlzLmJ1ZmZlci5kdXJhdGlvbjtcclxuICAgIHRoaXMuYnVmZmVyU291cmNlLnN0YXJ0KDAsIHRoaXMuY3VycmVudFRpbWUpO1xyXG5cclxuICAgIHRoaXMucmF0ZSh0aGlzLmN1cnJlbnQucmF0ZSk7XHJcbiAgICB0aGlzLnZvbHVtZSh0aGlzLmN1cnJlbnQudm9sdW1lKTtcclxuICAgIHRoaXMubG9vcCh0aGlzLmN1cnJlbnQubG9vcCk7XHJcblxyXG4gICAgdGhpcy5jaGFubmVsLmFkZCh0aGlzKTtcclxuXHJcbiAgICB0aGlzLnBsYXlpbmcgPSB0cnVlO1xyXG5cclxuICB9LFxyXG5cclxuICBmYWRlVG86IGZ1bmN0aW9uKHRhcmdldCwgZHVyYXRpb24pIHtcclxuXHJcbiAgICBpZiAoIXRoaXMucGxheWluZyAmJiB0aGlzLnJlYWR5KSB0aGlzLnJlc3VtZSgpO1xyXG5cclxuICAgIGR1cmF0aW9uID0gZHVyYXRpb24gfHwgMS4wO1xyXG5cclxuICAgIHRoaXMuZmFkZVRpbWUgPSAwO1xyXG4gICAgdGhpcy5mYWRlVGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgdGhpcy5mYWRlRHVyYXRpb24gPSBkdXJhdGlvbjtcclxuXHJcbiAgICB0aGlzLmZhZGVTcGVlZCA9IE1hdGguYWJzKHRhcmdldCAtIHRoaXMuZmFkZU1vZCkgLyBkdXJhdGlvbjtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgfSxcclxuXHJcbiAgZmFkZUluOiBmdW5jdGlvbihkdXJhdGlvbikge1xyXG5cclxuICAgIGlmICghdGhpcy5wbGF5aW5nICYmIHRoaXMucmVhZHkpIHRoaXMucmVzdW1lKCk7XHJcblxyXG4gICAgdGhpcy5mYWRlTW9kID0gMDtcclxuICAgIHRoaXMuZmFkZVRvKDEuMCwgZHVyYXRpb24pO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG5cclxuICB9LFxyXG5cclxuICBmYWRlT3V0OiBmdW5jdGlvbihkdXJhdGlvbikge1xyXG5cclxuICAgIHRoaXMuZmFkZVRvKDAsIGR1cmF0aW9uIHx8IDEuMCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gIH0sXHJcblxyXG5cclxuXHJcbn07XHJcblxyXG5QTEFZR1JPVU5ELlNvdW5kT25EZW1hbmQgPSBmdW5jdGlvbihhcHApIHtcclxuICBhcHAuYXVkaW8gPSBuZXcgU291bmRPbkRlbWFuZCh7XHJcbiAgICBhdWRpb0NvbnRleHQ6IGFwcC5hdWRpb0NvbnRleHRcclxuICB9KTtcclxuXHJcbiAgYXBwLmF1ZGlvLnBhdGggPSBhcHAuZ2V0UGF0aChcInNvdW5kc1wiKTtcclxuXHJcbiAgYXBwLmxvYWRTb3VuZHMgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgdmFyIGtleSA9IGFyZ3VtZW50c1tpXTtcclxuXHJcbiAgICAgIHRoaXMubG9hZGVyLmFkZCgpO1xyXG5cclxuICAgICAgdGhpcy5hdWRpby5sb2FkKGtleSkudGhlbihcclxuICAgICAgICB0aGlzLmxvYWRlci5zdWNjZXNzLmJpbmQodGhpcy5sb2FkZXIpLFxyXG4gICAgICAgIHRoaXMubG9hZGVyLmVycm9yLmJpbmQodGhpcy5sb2FkZXIpXHJcbiAgICAgICk7XHJcblxyXG4gICAgfVxyXG5cclxuICB9O1xyXG5cclxufTtcclxuXHJcblBMQVlHUk9VTkQuU291bmRPbkRlbWFuZC5wbHVnaW4gPSB0cnVlOyIsIkVOR0lORSA9IHsgfTsiLCJFTkdJTkUuQmVuY2htYXJrID0ge1xyXG5cclxuICBjcmVhdGU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHRoaXMubXVzaWMgPSBhcHAubXVzaWMucGxheShcImdhbWVvdmVyXCIpLmZhZGVJbig0KS5sb29wKCk7XHJcblxyXG4gICAgdGhpcy5yZWFkeSA9IGZhbHNlO1xyXG5cclxuICAgIC8vIHRoaXMuZ3JhZGllbnQgPSBhcHAubGF5ZXIuY3JlYXRlUmFkaWFsR3JhZGllbnQoYXBwLmNlbnRlci54LCBhcHAuY2VudGVyLnksIDAsIGFwcC5jZW50ZXIueCwgYXBwLmNlbnRlci55LCBhcHAuY2VudGVyLngpO1xyXG4gICAgLy8gdGhpcy5ncmFkaWVudC5hZGRDb2xvclN0b3AoMC4wLCBcInRyYW5zcGFyZW50XCIpO1xyXG4gICAgLy8gdGhpcy5ncmFkaWVudC5hZGRDb2xvclN0b3AoMS4wLCBcIiMwMDBcIik7XHJcblxyXG4gICAgLy8gSklUIHdhcm11cFxyXG4gICAgdGhpcy5kaWRXYXJtdXAgPSBmYWxzZTtcclxuICAgIHRoaXMuc3RlcHMgPSAwO1xyXG4gICAgdGhpcy5pb3RhTGlzdCA9IFtdO1xyXG4gICAgdGhpcy5mcmFtZVRpbWVzID0gW107XHJcbiAgICB0aGlzLnNjb3JlcyA9IFtdO1xyXG4gICAgdGhpcy5ydW5Db3VudCA9IDA7XHJcbiAgICB0aGlzLnNraXBDb3VudCA9IDA7XHJcbiAgICB0aGlzLnNraXBSZXNldENvdW50ID0gMDtcclxuICAgIHRoaXMucmVzZXRDb3VudCA9IDA7XHJcbiAgICB0aGlzLnNjb3JlU3RhY2sgPSBbXTtcclxuICAgIHRoaXMuZnJhbWVUaW1lID0gMC4wO1xyXG4gICAgdGhpcy5zdGFydFRpbWUgPSBEYXRlLm5vdygpO1xyXG4gIH0sXHJcblxyXG5cclxuICBwb2ludGVyZG93bjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgaWYgKHRoaXMucmVhZHkpIHtcclxuICAgICAgaWYgKHdpbmRvdy5nYSkge1xyXG4gICAgICAgIGdhKCdzZW5kJywge1xyXG4gICAgICAgICAgJ2hpdFR5cGUnOiAnZXZlbnQnLFxyXG4gICAgICAgICAgJ2V2ZW50Q2F0ZWdvcnknOiAnZ2FtZScsXHJcbiAgICAgICAgICAnZXZlbnRBY3Rpb24nOiAnc3RhcnQnXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMubXVzaWMuZmFkZU91dCgpO1xyXG5cclxuICAgICAgYXBwLnNldFN0YXRlKEVOR0lORS5HYW1lKTtcclxuICAgIH1cclxuXHJcbiAgfSxcclxuXHJcbiAgZW50ZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgaWYgKHdpbmRvdy5nYSkge1xyXG4gICAgICBnYSgnc2VuZCcsICdzY3JlZW52aWV3Jywge1xyXG4gICAgICAgICdhcHBOYW1lJzogJ1Bvd2VyU3VyZ2UnLFxyXG4gICAgICAgICdzY3JlZW5OYW1lJzogJ1NwbGFzaHBhZ2UnXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc3RhcnRNb2QgPSAwO1xyXG5cclxuICAgIHRoaXMuaW90YUNvdW50ID0gdGhpcy5hcHAuYmFzZWxpbmUgPyBNYXRoLmZsb29yKHRoaXMuYXBwLmJhc2VsaW5lICogMC43KSA6IDE7XHJcblxyXG4gICAgdGhpcy5hcHAuYmFzZWxpbmUgPSAwO1xyXG5cclxuICAgIHRoaXMucmVzZXQoKTtcclxuXHJcbiAgfSxcclxuXHJcbiAgLy8gQ2FsbGVkIGJldHdlZW4gYmVuY2htYXJrIGxvb3BzXHJcbiAgcmVzZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5zdGVwcyA9IDA7XHJcbiAgICB0aGlzLmZyYW1lVGltZXMubGVuZ3RoID0gMDtcclxuICAgIHRoaXMuc2tpcENvdW50ID0gMDtcclxuICAgIC8vIEpJVCB3YXJtdXAgc2V0dGluZ3MgKHJ1biB1bmJvdW5kIGxvb3BzKVxyXG4gICAgaWYgKCF0aGlzLmRpZFdhcm11cCkge1xyXG4gICAgICAvLyBjb25zb2xlLnRpbWUoJ1dhcm11cCcpO1xyXG4gICAgICB0aGlzLmFwcC51bmJvdW5kID0gdHJ1ZTtcclxuICAgICAgdGhpcy5hcHAuaW1taWRpYXRlID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmFwcC51bmJvdW5kID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuYXBwLmltbWlkaWF0ZSA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5pb3RhTGlzdC5sZW5ndGggPT0gMCkge1xyXG4gICAgICB0aGlzLmFkZElvdGFzKHRoaXMuZGlkV2FybXVwID8gdGhpcy5pb3RhQ291bnQgOiAxKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBzdGVwOiBmdW5jdGlvbihkdCkge1xyXG4gICAgaWYgKHRoaXMucmVhZHkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBiZWZvcmUgPSBwZXJmb3JtYW5jZS5ub3coKTtcclxuXHJcbiAgICB0aGlzLmlvdGFMaXN0LmZvckVhY2goZnVuY3Rpb24oaW90YSkge1xyXG4gICAgICBpb3RhLnN0ZXAoZHQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5mcmFtZVRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKSAtIGJlZm9yZTtcclxuXHJcbiAgICBpZiAoIXRoaXMuZGlkV2FybXVwKSB7XHJcbiAgICAgIC8vIFN0YXRlOiBKSVQgV2FybXVwXHJcbiAgICAgIHRoaXMuc3RlcFdhcm1VcCgpO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLmZyYW1lVGltZSkge1xyXG4gICAgICAvLyBTdHJlc3N0ZXN0aW5nXHJcbiAgICAgIHRoaXMuc3RlcFN0cmVzc1Rlc3QoKVxyXG4gICAgfVxyXG5cclxuICB9LFxyXG5cclxuICBzdGVwV2FybVVwOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB0aGlzLnN0ZXBzKys7XHJcblxyXG4gICAgaWYgKHRoaXMuc3RlcHMgPiAxMTAwKSB7XHJcbiAgICAgIHRoaXMuZGlkV2FybXVwID0gdHJ1ZTtcclxuICAgICAgLy8gY29uc29sZS50aW1lRW5kKCdXYXJtdXAnKTtcclxuICAgICAgLy8gY29uc29sZS5sb2coJ1dhcm11cCB3aXRoICVkIGlvdGFzJywgdGhpcy5pb3RhTGlzdC5sZW5ndGgpO1xyXG4gICAgICB0aGlzLnJlc2V0KCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgc3RlcFN0cmVzc1Rlc3Q6IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGFkZCA9IDE7XHJcbiAgICB2YXIgZnJhbWVUaW1lcyA9IHRoaXMuZnJhbWVUaW1lcztcclxuICAgIHZhciBNQVhfRlJBTUVTID0gNDU7XHJcbiAgICB2YXIgTUlOX0ZSQU1FUyA9IDE1O1xyXG4gICAgdmFyIENPU1QgPSA4O1xyXG4gICAgdmFyIEVSUk9SID0gMC4yNTtcclxuICAgIHZhciBmcmFtZVRpbWUgPSB0aGlzLmZyYW1lVGltZTtcclxuICAgIGlmIChmcmFtZVRpbWVzLnVuc2hpZnQoZnJhbWVUaW1lKSA+IE1BWF9GUkFNRVMpIHtcclxuICAgICAgZnJhbWVUaW1lcy5sZW5ndGggPSBNQVhfRlJBTUVTO1xyXG4gICAgfVxyXG4gICAgaWYgKGZyYW1lVGltZXMubGVuZ3RoID49IE1JTl9GUkFNRVMpIHtcclxuICAgICAgdmFyIHNhbXBsZSA9IHRoaXMuYW5hbHl6ZShmcmFtZVRpbWVzKTtcclxuICAgICAgdmFyIHNjb3JlID0gdGhpcy5pb3RhTGlzdC5sZW5ndGg7XHJcbiAgICAgIGlmIChzYW1wbGUucnNlIDw9IEVSUk9SICYmIHNhbXBsZS5tZWFuID4gQ09TVCkge1xyXG4gICAgICAgIHRoaXMucHVzaFNjb3JlKHNjb3JlKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHNhbXBsZS5yc2UgPiBFUlJPUiB8fCBzYW1wbGUubWVhbiA+IENPU1QpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZygnU2tpcCAjJyArIHRoaXMuc2tpcENvdW50KTtcclxuICAgICAgICB0aGlzLnNraXBDb3VudCsrO1xyXG4gICAgICAgIGlmICh0aGlzLnNraXBDb3VudCA+IDYwKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICAgICAgJ1tSRVNFVCBTVEVQXSBIaWdoIHNhbXBsaW5nIGVycm9yICVmJSUgb3IgbWVhbiAlZm1zIGZvciAlZCBlbnRpdGllcy4nLFxyXG4gICAgICAgICAgICBzYW1wbGUucnNlICogMTAwLCBzYW1wbGUubWVhbiwgc2NvcmVcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICB0aGlzLmlvdGFDb3VudCA9IE1hdGguZmxvb3IodGhpcy5sYXN0U2NvcmUgKiAwLjcpO1xyXG4gICAgICAgICAgdGhpcy5za2lwUmVzZXRDb3VudCsrO1xyXG4gICAgICAgICAgaWYgKHRoaXMuc2tpcFJlc2V0Q291bnQgPiAxMCkge1xyXG4gICAgICAgICAgICB0aGlzLmZpbmFsaXplKGZhbHNlKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5maW5hbGl6ZSh0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuc2tpcENvdW50ID0gMDtcclxuICAgICAgYWRkID0gTWF0aC5yb3VuZChDT1NUIC8gc2FtcGxlLm1lYW4pO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYWRkSW90YXMoYWRkKTtcclxuICB9LFxyXG5cclxuICBwdXNoU2NvcmU6IGZ1bmN0aW9uKHNjb3JlKSB7XHJcbiAgICB2YXIgU0FWRV9TQ09SRVMgPSAzO1xyXG4gICAgdmFyIE1JTl9TQ09SRVMgPSA1O1xyXG4gICAgdmFyIE1BWF9TQ09SRVMgPSAxMDtcclxuICAgIHZhciBFUlJPUiA9IDAuMTU7XHJcblxyXG4gICAgdGhpcy5za2lwUmVzZXRDb3VudCA9IDA7XHJcbiAgICB2YXIgc2NvcmVzID0gdGhpcy5zY29yZXM7XHJcbiAgICB0aGlzLnJ1bkNvdW50Kys7XHJcbiAgICBpZiAoc2NvcmVzLnVuc2hpZnQoc2NvcmUpID4gTUFYX1NDT1JFUykge1xyXG4gICAgICBzY29yZXMubGVuZ3RoID0gTUFYX1NDT1JFUztcclxuICAgIH1cclxuICAgIHRoaXMuaW90YUNvdW50ID0gTWF0aC5jZWlsKHNjb3JlICogMC43KTtcclxuICAgIHZhciBsID0gc2NvcmVzLmxlbmd0aDtcclxuICAgIGlmIChsID49IE1JTl9TQ09SRVMpIHtcclxuICAgICAgdmFyIHNhbXBsZSA9IHRoaXMuYW5hbHl6ZShzY29yZXMpO1xyXG4gICAgICBpZiAoc2FtcGxlLnJzZSA8IEVSUk9SKSB7XHJcbiAgICAgICAgdGhpcy5yZXNldENvdW50ID0gMDtcclxuICAgICAgICB0aGlzLmFwcC5iYXNlbGluZSA9IE1hdGgucm91bmQoc2FtcGxlLm1lYW4pO1xyXG4gICAgICAgIGlmICh3aW5kb3cuZ2EpIHtcclxuICAgICAgICAgIGdhKCdzZW5kJywge1xyXG4gICAgICAgICAgICAnaGl0VHlwZSc6ICdldmVudCcsXHJcbiAgICAgICAgICAgICdldmVudENhdGVnb3J5JzogJ2dhbWUnLFxyXG4gICAgICAgICAgICAnZXZlbnRBY3Rpb24nOiAnYmFzZWxpbmVkJyxcclxuICAgICAgICAgICAgJ2V2ZW50VmFsdWUnOiB0aGlzLmFwcC5iYXNlbGluZSxcclxuICAgICAgICAgICAgJ25vbkludGVyYWN0aW9uJzogdHJ1ZVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYXBwLmJhc2VsaW5lRXJyID0gc2FtcGxlLnJzZTtcclxuICAgICAgICB0aGlzLnNjb3Jlcy5zcGxpY2UoU0FWRV9TQ09SRVMpO1xyXG4gICAgICAgIHRoaXMuZmluYWxpemUoZmFsc2UpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICAgICdbU0NPUkUgUkVTRVRdIFN0YW5kYXJkIGVycm9yICVmJSUgdG9vIGhpZ2ggaW4gc2NvcmUgc2FtcGxlcy4nLFxyXG4gICAgICAgICAgc2FtcGxlLnJzZSAqIDEwMFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5yZXNldENvdW50Kys7XHJcbiAgICAgICAgaWYgKHRoaXMucmVzZXRDb3VudCA+IDEwKSB7XHJcbiAgICAgICAgICB0aGlzLnNjb3Jlcy5zcGxpY2UoMCk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygnW0JBSUxdIFRvbyBtYW55IFtSRVNFVCBTQ09SRV0uJyk7XHJcbiAgICAgICAgICBpZiAod2luZG93LmdhKSB7XHJcbiAgICAgICAgICAgIGdhKCdzZW5kJywgJ2V4Y2VwdGlvbicsIHtcclxuICAgICAgICAgICAgICAnZXhEZXNjcmlwdGlvbic6ICdCZW5jaG1hcmtSZXNldE92ZXJmbG93JyxcclxuICAgICAgICAgICAgICAnZXhGYXRhbCc6IGZhbHNlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5maW5hbGl6ZShmYWxzZSk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLmZpbmFsaXplKHRydWUpO1xyXG4gIH0sXHJcblxyXG4gIGZpbmFsaXplOiBmdW5jdGlvbihyZXN0YXJ0KSB7XHJcblxyXG4gICAgaWYgKCFyZXN0YXJ0KSB7XHJcbiAgICAgIC8vIFJlbW92ZSBpb3Rhc1xyXG4gICAgICB0aGlzLmlvdGFDb3VudCA9IDA7XHJcbiAgICAgIHRoaXMucnVuQ291bnQgPSAwO1xyXG4gICAgICAvLyBSZXNldCBiZW5jaG1hcmsgZW5naW5lIHNldHRpbmdzXHJcbiAgICAgIHRoaXMuYXBwLnVuYm91bmQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5hcHAuaW1taWRpYXRlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICAvLyBSZWR1Y2UgaW90YUxpc3QgdG8gaW90YUNvdW50XHJcbiAgICB0aGlzLmlvdGFMaXN0LnNwbGljZSh0aGlzLmlvdGFDb3VudCkuZm9yRWFjaChmdW5jdGlvbihpb3RhKSB7XHJcbiAgICAgIGlvdGEuZGVzdHJveSgpO1xyXG4gICAgfSk7XHJcbiAgICBpZiAocmVzdGFydCkge1xyXG4gICAgICB0aGlzLnJlc2V0KCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAod2luZG93LmdhKSB7XHJcbiAgICAgICAgZ2EoJ3NlbmQnLCB7XHJcbiAgICAgICAgICAnaGl0VHlwZSc6ICd0aW1pbmcnLFxyXG4gICAgICAgICAgJ3RpbWluZ0NhdGVnb3J5JzogJ0JlbmNobWFyaycsXHJcbiAgICAgICAgICAndGltaW5nVmFyJzogJ0xvYWRpbmcnLFxyXG4gICAgICAgICAgJ3RpbWluZ1ZhbHVlJzogRGF0ZS5ub3coKSAtIHRoaXMuc3RhcnRUaW1lXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5yZWFkeSA9IHRydWU7XHJcbiAgICAgIGFwcC50d2Vlbih0aGlzKS50byh7XHJcbiAgICAgICAgc3RhcnRNb2Q6IDEuMFxyXG4gICAgICB9LCAxLjAsIFwib3V0RWxhc3RpY1wiKTtcclxuICAgIH1cclxuXHJcbiAgfSxcclxuXHJcbiAgYWRkSW90YXM6IGZ1bmN0aW9uKGNvdW50KSB7XHJcblxyXG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBjb3VudDsgaisrKSB7XHJcblxyXG4gICAgICB0aGlzLmlvdGFMaXN0LnB1c2gobmV3IElvdGEodGhpcy5hcHAsIHRoaXMpKTtcclxuXHJcbiAgICB9XHJcblxyXG4gIH0sXHJcblxyXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgLyogZ2V0IHJlZmVyZW5jZSB0byB0aGUgYXBwbGljYXRpb24gKi9cclxuXHJcbiAgICB2YXIgYXBwID0gdGhpcy5hcHA7XHJcblxyXG4gICAgLyogZ2V0IHJlZmVyZW5jZSB0byBkcmF3aW5nIHN1cmZhY2UgKi9cclxuXHJcbiAgICB2YXIgbGF5ZXIgPSB0aGlzLmFwcC5sYXllcjtcclxuXHJcbiAgICAvKiBjbGVhciBzY3JlZW4gKi9cclxuXHJcbiAgICBsYXllci5jbGVhcihcIiMyODIyNDVcIik7XHJcblxyXG5cclxuICAgIGxheWVyLmRyYXdJbWFnZShhcHAuaW1hZ2VzLnNwbGFzaCwgYXBwLmNlbnRlci54IC0gYXBwLmltYWdlcy5zcGxhc2gud2lkdGggLyAyIHwgMCwgYXBwLmNlbnRlci55IC0gYXBwLmltYWdlcy5zcGxhc2guaGVpZ2h0IC8gMiB8IDApXHJcblxyXG4gICAgbGF5ZXIuc2F2ZSgpO1xyXG4gICAgbGF5ZXIudHJhbnNsYXRlKDYwMCwgMjkwKTtcclxuXHJcbiAgICBsYXllci5hbGlnbigwLjUsIDAuNSk7XHJcbiAgICBsYXllci5zY2FsZSg0LCA0KTtcclxuICAgIGxheWVyLmdsb2JhbEFscGhhKDAuNCk7XHJcbiAgICBsYXllci5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24oXCJsaWdodGVyXCIpO1xyXG4gICAgbGF5ZXIuZHJhd0ltYWdlKGFwcC5pbWFnZXMuZmxhcmUsIDEyOCAqICgzMiAqIChhcHAubGlmZXRpbWUgJSAxLjUgLyAxLjUpIHwgMCksIDAsIDEyOCwgMTI4LCAwLCAwLCAxMjgsIDEyOCk7XHJcbiAgICBsYXllci5yZXN0b3JlKCk7XHJcblxyXG5cclxuICAgIGFwcC5mb250U2l6ZSg0OCk7XHJcblxyXG5cclxuXHJcbiAgICBpZiAoIXRoaXMucmVhZHkpIHtcclxuICAgICAgdmFyIHRleHRYID0gYXBwLmNlbnRlci54O1xyXG4gICAgICB2YXIgdGV4dFkgPSBhcHAuY2VudGVyLnkgLSAxNjtcclxuXHJcbiAgICAgIGxheWVyLmZpbGxTdHlsZShcInJnYmEoMCwwLDAsMC41XCIpLmZpbGxSZWN0KDAsIHRleHRZIC0gNTQsIGFwcC53aWR0aCwgNzQpO1xyXG5cclxuICAgICAgbGF5ZXIuZmlsbFN0eWxlKFwiIzAwMFwiKS50ZXh0QWxpZ24oXCJjZW50ZXJcIikuZmlsbFRleHQoXCJMT0FESU5HLi4uIHBsZWFzZSB3YWl0XCIsIHRleHRYLCB0ZXh0WSAtIDQpO1xyXG4gICAgICBsYXllci5maWxsU3R5bGUoXCIjZmZmXCIpLnRleHRBbGlnbihcImNlbnRlclwiKS5maWxsVGV4dChcIkxPQURJTkcuLi4gcGxlYXNlIHdhaXRcIiwgdGV4dFgsIHRleHRZKTtcclxuXHJcbiAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgdmFyIHRleHRYID0gYXBwLmNlbnRlci54ICsgMTAwICsgKDEgLSB0aGlzLnN0YXJ0TW9kKSAqIDEwMDA7XHJcbiAgICAgIHZhciB0ZXh0WSA9IGFwcC5jZW50ZXIueSAtIDEwO1xyXG5cclxuICAgICAgbGF5ZXIuYSgwLjUgKyBVdGlscy5vc2MoYXBwLmxpZmV0aW1lLCAxKSAqIDAuNSk7XHJcbiAgICAgIGxheWVyLmZpbGxTdHlsZShcIiMwMDBcIikudGV4dEFsaWduKFwiY2VudGVyXCIpLmZpbGxUZXh0KFwiQ0xJQ0sgVE8gU1RBUlQhXCIsIHRleHRYLCB0ZXh0WSAtIDQpO1xyXG4gICAgICBsYXllci5maWxsU3R5bGUoXCIjZmEwXCIpLnRleHRBbGlnbihcImNlbnRlclwiKS5maWxsVGV4dChcIkNMSUNLIFRPIFNUQVJUIVwiLCB0ZXh0WCwgdGV4dFkpO1xyXG4gICAgICBsYXllci5hKDEuMCk7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyBhcHAuY3R4LmZpbGxTdHlsZSA9IHRoaXMuZ3JhZGllbnQ7XHJcbiAgICAvLyBhcHAuY3R4LmZpbGxSZWN0KDAsIDAsIGFwcC53aWR0aCwgYXBwLmhlaWdodCk7XHJcblxyXG4gICAgLy8gdGhpcy5pb3RhTGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGlvdGEpIHtcclxuICAgIC8vICAgaW90YS5yZW5kZXIobGF5ZXIpO1xyXG4gICAgLy8gfSk7XHJcblxyXG4gICAgLy8gbGF5ZXJcclxuICAgIC8vICAgLmZpbGxTdHlsZSgnI2ZmZicpXHJcbiAgICAvLyAgIC5mb250KFwiMTRweCAnYXJpYWwnXCIpXHJcbiAgICAvLyAgIC5maWxsVGV4dCgnU3RyZXNzIHRlc3QgIycgKyB0aGlzLnJ1bkNvdW50LCA1LCAxNSlcclxuICAgIC8vICAgLmZpbGxUZXh0KCdFbnRpdGllczogJyArIHRoaXMuaW90YUxpc3QubGVuZ3RoLCA1LCAzMClcclxuICAgIC8vICAgLmZpbGxUZXh0KCdGcmFtZXRpbWU6JyArIHRoaXMuZnJhbWVUaW1lLnRvRml4ZWQoMSksIDUsIDQ1KTtcclxuICB9LFxyXG5cclxuICBhbmFseXplOiBmdW5jdGlvbihwb3B1bGF0aW9uKSB7XHJcblxyXG4gICAgdmFyIGwgPSBwb3B1bGF0aW9uLmxlbmd0aDtcclxuICAgIHZhciBzdW0gPSAwLjA7XHJcbiAgICB2YXIgc3Vtc3EgPSAwLjA7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGw7IGkrKykge1xyXG4gICAgICBzdW0gKz0gcG9wdWxhdGlvbltpXTtcclxuICAgICAgc3Vtc3EgKz0gcG9wdWxhdGlvbltpXSAqIHBvcHVsYXRpb25baV07XHJcbiAgICB9XHJcbiAgICB2YXIgbWVhbiA9IHN1bSAvIGw7XHJcbiAgICB2YXIgc2QgPSBNYXRoLnNxcnQoc3Vtc3EgLyBsIC0gc3VtICogc3VtIC8gKGwgKiBsKSk7XHJcbiAgICB2YXIgc2UgPSBzZCAvIE1hdGguc3FydChsKTtcclxuICAgIC8vIHN0YW5kYXJkIGVycm9yIGF0IDk1JSBjb25maWRlbmNlXHJcbiAgICB2YXIgc2U5NSA9IDEuOTYgKiBzZTtcclxuICAgIHZhciByc2UgPSBzZSAvIG1lYW47XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBtZWFuOiBtZWFuLFxyXG4gICAgICBzZDogc2QsXHJcbiAgICAgIHNlOiBzZSxcclxuICAgICAgc2U5NTogc2U5NSxcclxuICAgICAgcnNlOiByc2VcclxuICAgIH1cclxuXHJcbiAgfSxcclxuXHJcbiAgbmVhcmVzdDogZnVuY3Rpb24oZnJvbSwgZW50aXRpZXMpIHtcclxuXHJcbiAgICB2YXIgbWluID0gLTE7XHJcbiAgICB2YXIgcmVzdWx0ID0gbnVsbDtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVudGl0aWVzLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICB2YXIgdG8gPSBlbnRpdGllc1tpXTtcclxuXHJcbiAgICAgIGlmIChmcm9tID09PSB0bykgY29udGludWU7XHJcblxyXG4gICAgICB2YXIgZGlzdGFuY2UgPSB0aGlzLmRpc3RhbmNlKGZyb20sIHRvKTtcclxuXHJcbiAgICAgIGlmIChkaXN0YW5jZSA8IG1pbiB8fCBtaW4gPCAwKSB7XHJcbiAgICAgICAgbWluID0gZGlzdGFuY2U7XHJcbiAgICAgICAgcmVzdWx0ID0gdG87XHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9LFxyXG5cclxuICBkaXN0YW5jZTogZnVuY3Rpb24oYSwgYikge1xyXG5cclxuICAgIHZhciBkeCA9IGEueCAtIGIueDtcclxuICAgIHZhciBkeSA9IGEueSAtIGIueTtcclxuXHJcbiAgICByZXR1cm4gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcclxuXHJcbiAgfVxyXG59O1xyXG5cclxudmFyIGltYWdlcyA9IFsnZmlyZWZveCcsICdmaXJlZm94X2JldGEnLCAnZmlyZWZveF9kZXZlbG9wZXJfZWRpdGlvbicsICdmaXJlZm94X25pZ2h0bHknXTtcclxuXHJcbmZ1bmN0aW9uIElvdGEoYXBwLCBwYXJlbnQpIHtcclxuICB0aGlzLnggPSAwLjA7XHJcbiAgdGhpcy55ID0gMC4wO1xyXG4gIHRoaXMudnggPSAwLjA7XHJcbiAgdGhpcy52eSA9IDAuMDtcclxuICB0aGlzLnZyID0gMC4wO1xyXG4gIHRoaXMuYWxwaGEgPSAwLjA7XHJcbiAgdGhpcy5hbmdsZSA9IDAuMDtcclxuICB0aGlzLmFwcCA9IGFwcDtcclxuICB0aGlzLnBhcmVudCA9IHBhcmVudDtcclxuICB0aGlzLnggPSBNYXRoLnJhbmRvbSgpICogYXBwLndpZHRoO1xyXG4gIHRoaXMueSA9IE1hdGgucmFuZG9tKCkgKiBhcHAuaGVpZ2h0O1xyXG4gIHRoaXMubWF4VmVsID0gMTAwLjA7XHJcbiAgdGhpcy5tYXhUb3JxID0gTWF0aC5QSSAqIDEwO1xyXG4gIHRoaXMudnggPSBNYXRoLnJhbmRvbSgpICogdGhpcy5tYXhWZWwgKiAyIC0gdGhpcy5tYXhWZWw7XHJcbiAgdGhpcy52eSA9IE1hdGgucmFuZG9tKCkgKiB0aGlzLm1heFZlbCAqIDIgLSB0aGlzLm1heFZlbDtcclxuICB0aGlzLnZyID0gTWF0aC5yYW5kb20oKSAqIHRoaXMubWF4VG9ycSAqIDIgLSB0aGlzLm1heFRvcnE7XHJcbiAgdGhpcy5pbWFnZSA9IGFwcC5pbWFnZXNbaW1hZ2VzW01hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDMpXV07XHJcbiAgdGhpcy5yZWdpb24gPSBVdGlscy5yYW5kb20oW1xyXG4gICAgWzU0OCwgODgsIDQ2LCA0N10sXHJcbiAgICBbNTQ0LCAxNDIsIDQ2LCA0OF0sXHJcbiAgICBbNTQ0LCAyMDAsIDQ2LCA0N10sXHJcbiAgICBbNTQ1LCAyNTMsIDQ0LCA0OF1cclxuICBdKTtcclxuICB0aGlzLm1heEZvcmNlID0gMTAwLjA7XHJcbiAgdGhpcy5hbHBoYSA9IDAuMiArIE1hdGgucmFuZG9tKCkgKiAwLjg7XHJcbiAgdGhpcy5hbmdsZSA9IE1hdGgucmFuZG9tKCkgKiBNYXRoLlBJO1xyXG59XHJcblxyXG5Jb3RhLnByb3RvdHlwZSA9IHtcclxuXHJcbiAgc3RlcDogZnVuY3Rpb24oZHQpIHtcclxuXHJcbiAgICBhcHAuc3RhdGUubmVhcmVzdCh0aGlzLCB0aGlzLnBhcmVudC5pb3RhTGlzdCk7XHJcblxyXG4gICAgdmFyIGlvdGFMaXN0ID0gdGhpcy5wYXJlbnQuaW90YUxpc3Q7XHJcbiAgICB2YXIgZm9yY2V4ID0gMC4wO1xyXG4gICAgdmFyIGZvcmNleSA9IDAuMDtcclxuICAgIHZhciBmb3JjZXMgPSAwO1xyXG4gICAgdmFyIG1heERpc3QgPSA2MC4wO1xyXG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBpb3RhTGlzdC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgdmFyIGRpc3R4ID0gKHRoaXMueCAtIGlvdGFMaXN0W2ldLngpIC8gbWF4RGlzdDtcclxuICAgICAgdmFyIGRpc3R5ID0gKHRoaXMueSAtIGlvdGFMaXN0W2ldLnkpIC8gbWF4RGlzdDtcclxuICAgICAgdmFyIHNpZ254ID0gTWF0aC5zaWduKGRpc3R4KTtcclxuICAgICAgdmFyIHNpZ255ID0gTWF0aC5zaWduKGRpc3R5KTtcclxuICAgICAgdmFyIGFic3ggPSBNYXRoLmFicyhkaXN0eCk7XHJcbiAgICAgIHZhciBhYnN5ID0gTWF0aC5hYnMoZGlzdHkpO1xyXG4gICAgICBpZiAoYWJzeCA8IDEgJiYgYWJzeSA8IDEpIHtcclxuICAgICAgICBmb3JjZXggKz0gc2lnbnggKyBhYnN4ICogc2lnbng7XHJcbiAgICAgICAgZm9yY2V5ICs9IHNpZ255ICsgYWJzeSAqIHNpZ255O1xyXG4gICAgICAgIGZvcmNlcysrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGZvcmNlcyA9PSAwKSB7XHJcbiAgICAgIGZvcmNlcyA9IDE7XHJcbiAgICB9XHJcbiAgICBmb3JjZXggPSBNYXRoLm1heCgtdGhpcy5tYXhGb3JjZSwgTWF0aC5taW4odGhpcy5tYXhGb3JjZSwgZm9yY2V4IC8gZm9yY2VzKSkgKiA1MDA7XHJcbiAgICBmb3JjZXkgPSBNYXRoLm1heCgtdGhpcy5tYXhGb3JjZSwgTWF0aC5taW4odGhpcy5tYXhGb3JjZSwgZm9yY2V5IC8gZm9yY2VzKSkgKiA1MDA7XHJcbiAgICB0aGlzLnZ4ID0gdGhpcy52eCAqIDAuOTkgKyBmb3JjZXggKiAwLjAxO1xyXG4gICAgdGhpcy52eSA9IHRoaXMudnkgKiAwLjk5ICsgZm9yY2V5ICogMC4wMTtcclxuXHJcbiAgICB2YXIgeCA9IHRoaXMueCArIHRoaXMudnggKiBkdDtcclxuICAgIGlmICh4IDwgMCB8fCB4ID4gdGhpcy5hcHAud2lkdGgpIHtcclxuICAgICAgeCA9IE1hdGgucmFuZG9tKCkgKiB0aGlzLmFwcC53aWR0aDtcclxuICAgIH1cclxuICAgIHRoaXMueCA9IHg7XHJcblxyXG4gICAgdmFyIHkgPSB0aGlzLnkgKyB0aGlzLnZ5ICogZHQ7XHJcbiAgICBpZiAoeSA8IDAgfHwgeSA+IHRoaXMuYXBwLmhlaWdodCkge1xyXG4gICAgICB5ID0gTWF0aC5yYW5kb20oKSAqIHRoaXMuYXBwLmhlaWdodDtcclxuICAgIH1cclxuICAgIHRoaXMueSA9IHk7XHJcbiAgICB0aGlzLmFuZ2xlICs9IHRoaXMudnIgKiBkdDtcclxuICB9LFxyXG5cclxuICAvLyByZW5kZXI6IGZ1bmN0aW9uKGxheWVyKSB7XHJcblxyXG4gIC8vICAgcmV0dXJuO1xyXG5cclxuICAvLyAgIGxheWVyLmNvbnRleHQuc2F2ZSgpO1xyXG4gIC8vICAgbGF5ZXIuY29udGV4dC50cmFuc2xhdGUodGhpcy54IHwgMCwgdGhpcy55IHwgMCk7XHJcbiAgLy8gICAvLyBsYXllci5hKHRoaXMuYWxwaGEpO1xyXG4gIC8vICAgbGF5ZXIuY29udGV4dC5maWxsU3R5bGUgPSBcIiNmMDBcIjtcclxuICAvLyAgIGxheWVyLmNvbnRleHQuZmlsbFJlY3QodGhpcy54LCB0aGlzLnksIDY0LCA2NCk7XHJcbiAgLy8gICBsYXllci5jb250ZXh0LmZpbGxTdHlsZSA9IFwiI2ZmZlwiO1xyXG4gIC8vICAgbGF5ZXIuY29udGV4dC5iZWdpblBhdGgoKTtcclxuICAvLyAgIGxheWVyLmNvbnRleHQubW92ZVRvKHRoaXMueCwgdGhpcy55KTtcclxuICAvLyAgIGxheWVyLmNvbnRleHQuYXJjKHRoaXMueCwgdGhpcy55LCA2NCwgMCwgTWF0aC5QSSAqIDIpO1xyXG4gIC8vICAgbGF5ZXIuY29udGV4dC5yb3RhdGUodGhpcy5hbmdsZSk7XHJcbiAgLy8gICBsYXllci5kcmF3UmVnaW9uKGFwcC5pbWFnZXMuc3ByaXRlc2hlZXQsIHRoaXMucmVnaW9uLCAwLCAwKTtcclxuICAvLyAgIGxheWVyLmNvbnRleHQucmVzdG9yZSgpO1xyXG4gIC8vIH0sXHJcblxyXG4gIGRlc3Ryb3k6IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5hcHAgPSBudWxsO1xyXG4gICAgdGhpcy5wYXJlbnQgPSBudWxsO1xyXG4gIH1cclxuXHJcbn0iLCJFTkdJTkUuQmFja2dyb3VuZFN0YXJzID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gIHRoaXMuY29sb3IgPSBcIiMwYWZcIjtcclxuXHJcbiAgdGhpcy5jb3VudCA9IE1hdGgubWF4KGFwcC5oZWlnaHQsIGFwcC53aWR0aCkgLyAxNiB8IDA7XHJcblxyXG4gIHRoaXMueCA9IDA7XHJcbiAgdGhpcy55ID0gMDtcclxuXHJcbiAgdGhpcy5wb3B1bGF0ZWQgPSBmYWxzZTtcclxuICB0aGlzLmltYWdlID0gYXBwLmdldENvbG9yZWRJbWFnZShhcHAuaW1hZ2VzLnBhcnRpY2xlcywgdGhpcy5jb2xvcik7XHJcblxyXG59O1xyXG5cclxuRU5HSU5FLkJhY2tncm91bmRTdGFycy5wcm90b3R5cGUgPSB7XHJcblxyXG4gIGltYWdlczoge30sXHJcblxyXG4gIGNvbG9yczogW1wiI2FmY1wiLCBcIiNmYTBcIl0sXHJcblxyXG4gIHNwcml0ZXM6IFtcclxuICAgIFswLCAxMywgNSwgNV0sXHJcbiAgICBbMSwgMTksIDMsIDNdXHJcbiAgXSxcclxuXHJcbiAgcXVvdGE6IDAuNSxcclxuXHJcbiAgcG9wdWxhdGU6IGZ1bmN0aW9uKGZpbGwpIHtcclxuXHJcbiAgICB0aGlzLnN0YXJzID0gW107XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmNvdW50OyBpKyspIHtcclxuICAgICAgdGhpcy5zcGF3blN0YXIoZmlsbCk7XHJcbiAgICB9XHJcblxyXG4gIH0sXHJcblxyXG4gIHNwYXduU3RhcjogZnVuY3Rpb24oZmlsbCkge1xyXG5cclxuICAgIHZhciBzdGFyID0ge1xyXG4gICAgICB4OiBNYXRoLnJhbmRvbSgpICogYXBwLndpZHRoLFxyXG4gICAgICB5OiBNYXRoLnJhbmRvbSgpICogYXBwLmhlaWdodCxcclxuICAgICAgejogMC4xICsgMC45ICogTWF0aC5yYW5kb20oKSxcclxuICAgICAgczogVXRpbHMucmFuZG9tKFsxLCAyLCAzXSksXHJcbiAgICAgIHNwcml0ZUluZGV4OiBNYXRoLnJhbmRvbSgpICogdGhpcy5zcHJpdGVzLmxlbmd0aCB8IDBcclxuICAgIH07XHJcblxyXG4gICAgc3Rhci5seCA9IHN0YXIueDtcclxuICAgIHN0YXIubHkgPSBzdGFyLnk7XHJcblxyXG4gICAgdGhpcy5zdGFycy5wdXNoKHN0YXIpO1xyXG5cclxuICB9LFxyXG5cclxuICB3cmFwOiBmdW5jdGlvbihzdGFyKSB7XHJcblxyXG4gICAgaWYgKHN0YXIueCA+IGFwcC53aWR0aCkgc3Rhci54ID0gMDtcclxuICAgIGlmIChzdGFyLnkgPiBhcHAuaGVpZ2h0KSBzdGFyLnkgPSAwO1xyXG5cclxuICAgIGlmIChzdGFyLnggPCAwKSBzdGFyLnggPSBhcHAud2lkdGg7XHJcbiAgICBpZiAoc3Rhci55IDwgMCkgc3Rhci55ID0gYXBwLmhlaWdodDtcclxuXHJcbiAgfSxcclxuXHJcbiAgc3RlcDogZnVuY3Rpb24oZHQpIHtcclxuXHJcbiAgICBpZiAoIXRoaXMucG9wdWxhdGVkKSB7XHJcbiAgICAgIHRoaXMucG9wdWxhdGVkID0gdHJ1ZTtcclxuICAgICAgdGhpcy5wb3B1bGF0ZSh0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgZGlmZlggPSAoMTAgKyBhcHAuZ2FtZS5zY29yZSkgKiBkdDtcclxuICAgIHZhciBkaWZmWSA9ICgxMCArIGFwcC5nYW1lLnNjb3JlKSAqIGR0O1xyXG5cclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuc3RhcnMubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgIHZhciBzdGFyID0gdGhpcy5zdGFyc1tpXTtcclxuXHJcbiAgICAgIHRoaXMud3JhcChzdGFyKTtcclxuXHJcbiAgICAgIHN0YXIueCArPSBkaWZmWCAqIHN0YXIuejtcclxuICAgICAgc3Rhci55ICs9IGRpZmZZICogc3Rhci56O1xyXG5cclxuICAgIH1cclxuXHJcbiAgfSxcclxuXHJcbiAgcmVuZGVyOiBmdW5jdGlvbihkdCkge1xyXG5cclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuc3RhcnMubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgIHZhciBzdGFyID0gdGhpcy5zdGFyc1tpXTtcclxuXHJcbiAgICAgIHZhciBzcHJpdGUgPSB0aGlzLnNwcml0ZXNbc3Rhci5zcHJpdGVJbmRleF07XHJcblxyXG4gICAgICBhcHAuY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCBzcHJpdGVbMF0sIHNwcml0ZVsxXSwgc3ByaXRlWzJdLCBzcHJpdGVbM10sXHJcbiAgICAgICAgc3Rhci54LCBzdGFyLnksIHNwcml0ZVsyXSwgc3ByaXRlWzNdKTtcclxuXHJcblxyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG59OyIsIkVOR0lORS5DaXJjbGVFeHBsb3Npb24gPSBmdW5jdGlvbihhcmdzKSB7XHJcblxyXG4gIFV0aWxzLmV4dGVuZCh0aGlzLCB7XHJcblxyXG4gICAgYXR0YWNoZWRUbzogZmFsc2UsXHJcbiAgICByYWRpdXM6IDAsXHJcbiAgICBhbHBoYTogMS4wLFxyXG4gICAgZHVyYXRpb246IDAuNVxyXG5cclxuICB9LCBhcmdzKTtcclxuXHJcbiAgdGhpcy5yYWRpdXMgPSAwO1xyXG5cclxuICB0aGlzLnR3ZWVuID0gYXBwLnR3ZWVuKHRoaXMpLmRpc2NhcmQoKS50byh7XHJcbiAgICByYWRpdXM6IGFyZ3MucmFkaXVzXHJcbiAgfSwgdGhpcy5kdXJhdGlvbiwgXCJvdXRFbGFzdGljXCIpLnRvKHtcclxuICAgIHJhZGl1czogMFxyXG4gIH0sIHRoaXMuZHVyYXRpb24sIFwib3V0RWxhc3RpY1wiKTtcclxuXHJcbn07XHJcblxyXG5FTkdJTkUuQ2lyY2xlRXhwbG9zaW9uLnByb3RvdHlwZSA9IHtcclxuXHJcbiAgY29uc3RydWN0b3I6IEVOR0lORS5DaXJjbGVFeHBsb3Npb24sXHJcblxyXG4gIHR5cGU6IFwiY2lyY2xlRXhwbG9zaW9uXCIsXHJcblxyXG4gIGFjdGlvbjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgYXBwLnNvdW5kLnBsYXkoXCJsYXNlclwiKTtcclxuXHJcbiAgfSxcclxuXHJcbiAgc3RlcDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgaWYodGhpcy5hdHRhY2hlZFRvKSB7XHJcbiAgICAgIHRoaXMueCA9IHRoaXMuYXR0YWNoZWRUby54O1xyXG4gICAgICB0aGlzLnkgPSB0aGlzLmF0dGFjaGVkVG8ueTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy50d2Vlbi5maW5pc2hlZCkgdGhpcy5kZWFkID0gdHJ1ZTtcclxuXHJcbiAgfSxcclxuXHJcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICBpZiAodGhpcy5yYWRpdXMgPiAwKSB7XHJcbiAgICAgIFxyXG4gICAgICBhcHAuY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICBhcHAuY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XHJcbiAgICAgIGFwcC5jdHguZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJsaWdodGVyXCI7XHJcbiAgICAgIGFwcC5jdHguYXJjKHRoaXMueCwgdGhpcy55LCB0aGlzLnJhZGl1cywgMCwgTWF0aC5QSSAqIDIpO1xyXG4gICAgICBhcHAuY3R4LmZpbGwoKTtcclxuICAgICAgYXBwLmN0eC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBcInNvdXJjZS1vdmVyXCI7XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxufTsiLCJFTkdJTkUuU2hpcCA9IGZ1bmN0aW9uKGFyZ3MpIHtcclxuXHJcbiAgVXRpbHMuZXh0ZW5kKHRoaXMsIHtcclxuXHJcbiAgICBkYW1hZ2U6IDEsXHJcbiAgICBmaXJlcmF0ZTogMC41LFxyXG4gICAgc3BlZWQ6IDE2MCxcclxuICAgIHJhZGl1czogMTYsXHJcbiAgICByb3RhdGlvblNwZWVkOiA1LFxyXG4gICAgaHA6IDEwLFxyXG4gICAgcmFuZ2U6IDIwMCxcclxuICAgIGZvcmNlOiAwLFxyXG4gICAgZm9yY2VEaXJlY3Rpb246IDAsXHJcbiAgICB0YXJnZXRUaW1lb3V0OiAwLFxyXG4gICAgaGl0TGlmZXNwYW46IDAsXHJcbiAgICBzY2FsZTogMS4wLFxyXG4gICAgcmFuazogMCxcclxuICAgIGtpbGxzOiAwXHJcblxyXG4gIH0sIGRlZnMuc2hpcHNbYXJncy50eXBlXSwgYXJncyk7XHJcblxyXG4gIHRoaXMucmFuZG9tID0gdGhpcy5nYW1lLnJhbmRvbSgpO1xyXG5cclxuICB0aGlzLm1heEhwID0gdGhpcy5ocDtcclxuXHJcbiAgdGhpcy5saWZldGltZSA9IHRoaXMuZ2FtZS5yYW5kb20oKSAqIDEwO1xyXG4gIHRoaXMuY29vbGRvd24gPSB0aGlzLmZpcmVyYXRlO1xyXG4gIHRoaXMuZGVzaXJlZERpcmVjdGlvbiA9IHRoaXMuZGlyZWN0aW9uID0gdGhpcy5nYW1lLnJhbmRvbSgpICogNjtcclxuXHJcbiAgdGhpcy5jb2xvciA9IGRlZnMudGVhbUNvbG9yW3RoaXMudGVhbV07XHJcblxyXG4gIHRoaXMuaW1hZ2UgPSBhcHAuaW1hZ2VzLnNwcml0ZXNoZWV0O1xyXG5cclxuICBpZiAodGhpcy50ZWFtKSB0aGlzLmFwcGx5VXBncmFkZXModGhpcy5nYW1lLnVwZ3JhZGVzKTtcclxuICBlbHNlIHRoaXMuYXBwbHlEaWZmaWN1bHR5KCk7XHJcblxyXG59O1xyXG5cclxuRU5HSU5FLlNoaXAucHJvdG90eXBlID0ge1xyXG5cclxuICBjb25zdHJ1Y3RvcjogRU5HSU5FLlNoaXAsXHJcblxyXG4gIGhvdmVyYWJsZTogdHJ1ZSxcclxuXHJcbiAgZnJvemVuU3ByaXRlOiBbMTkzLCA4NiwgMTEsIDE5XSxcclxuXHJcbiAgcXVvdGE6IDIsXHJcblxyXG4gIHBvaW50ZXJlbnRlcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdGhpcy5yZXBhaXIoKTtcclxuXHJcbiAgfSxcclxuXHJcbiAgcmFua3M6IFtcclxuICAgIFszMTgsIDEzMSwgMTAsIDVdLFxyXG4gICAgWzMzMywgMTMxLCAxMCwgMTBdLFxyXG4gICAgWzM0OCwgMTMxLCAxMCwgMTVdLFxyXG4gICAgWzM2MCwgMTMxLCAxMCwgOF0sXHJcbiAgICBbMzcyLCAxMzEsIDEwLCAxM10sXHJcbiAgICBbMzg0LCAxMzEsIDEwLCAxOF0sXHJcbiAgICBbMzk2LCAxMzEsIDE1LCAxNl1cclxuICBdLFxyXG5cclxuICBhcHBseURpZmZpY3VsdHk6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHZhciBkaWZmaWN1bHR5ID0gdGhpcy5nYW1lLndhdmUgLyAzMDtcclxuXHJcbiAgICB0aGlzLnNwZWVkICo9IDEgKyBkaWZmaWN1bHR5O1xyXG4gICAgdGhpcy5kYW1hZ2UgKj0gMSArIGRpZmZpY3VsdHk7XHJcblxyXG4gIH0sXHJcblxyXG4gIGFwcGx5VXBncmFkZXM6IGZ1bmN0aW9uKHVwZ3JhZGVzKSB7XHJcblxyXG4gICAgdmFyIGhwbW9kID0gdGhpcy5ocCAvIHRoaXMubWF4SHA7XHJcblxyXG4gICAgdGhpcy5kYW1hZ2UgPSAxICsgdXBncmFkZXMuZGFtYWdlICogMC4yNTtcclxuICAgIHRoaXMubWF4SHAgPSB1cGdyYWRlcy5saWZlICogMTA7XHJcbiAgICB0aGlzLmhwID0gaHBtb2QgKiB0aGlzLm1heEhwO1xyXG4gICAgdGhpcy5zcGVlZCA9IDgwICsgMTAgKiB1cGdyYWRlcy5zcGVlZDtcclxuXHJcblxyXG4gICAgaWYgKHRoaXMuZnJlZSkge1xyXG4gICAgICB0aGlzLmRhbWFnZSAqPSAyO1xyXG4gICAgICB0aGlzLm1heEhwICo9IDI7XHJcbiAgICAgIHRoaXMuaHAgKj0gMjtcclxuICAgIH1cclxuXHJcbiAgfSxcclxuXHJcbiAgZGllOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICBpZiAoIXRoaXMudGVhbSkgdGhpcy5nYW1lLnNjb3JlKys7XHJcblxyXG4gICAgaWYgKHRoaXMuZ2FtZS5iZW5jaG1hcmspIHtcclxuXHJcbiAgICAgIHRoaXMuaHAgPSB0aGlzLm1heEhwO1xyXG5cclxuICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICB0aGlzLmRlYWQgPSB0cnVlO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5ib3NzKSB7XHJcblxyXG4gICAgICB0aGlzLmdhbWUuc2hha2UoKTtcclxuXHJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTY7IGkrKykge1xyXG5cclxuICAgICAgICB0aGlzLmdhbWUuYWRkKEVOR0lORS5SZXNvdXJjZSwge1xyXG4gICAgICAgICAgeDogdGhpcy54LFxyXG4gICAgICAgICAgeTogdGhpcy55XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZ2FtZS5leHBsb3Npb24odGhpcy54LCB0aGlzLnksIDE2LCB0aGlzLmNvbG9yKTtcclxuXHJcbiAgICB0aGlzLmdhbWUuYWRkKEVOR0lORS5SZXNvdXJjZSwge1xyXG4gICAgICB4OiB0aGlzLngsXHJcbiAgICAgIHk6IHRoaXMueSxcclxuICAgICAgcGFyZW50OiB0aGlzXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAodGhpcy5wbGFuZXQpIHRoaXMucGxhbmV0LnNoaXBzLS07XHJcblxyXG4gICAgaWYgKCF0aGlzLnRlYW0pIHRoaXMuZ2FtZS5vbmVuZW15ZGVhdGgodGhpcyk7XHJcblxyXG4gICAgYXBwLnNvdW5kLnBsYXkoXCJleHBsb3Npb25cIikucnJhdGUoMC4yKTtcclxuXHJcbiAgfSxcclxuXHJcbiAgYXBwbHlEYW1hZ2U6IGZ1bmN0aW9uKGRhbWFnZSwgYXR0YWNrZXIpIHtcclxuXHJcbiAgICBpZiAodGhpcy5kZWFkKSByZXR1cm47XHJcblxyXG4gICAgdGhpcy5oaXRMaWZlc3BhbiA9IDAuMTtcclxuXHJcbiAgICB0aGlzLmhwIC09IGRhbWFnZTtcclxuXHJcbiAgICBpZiAodGhpcy5ocCA8PSAwKSB7XHJcbiAgICAgIHRoaXMuZGllKCk7XHJcbiAgICAgIGlmIChhdHRhY2tlcikgYXR0YWNrZXIub25zY29yZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZ2FtZS5leHBsb3Npb24odGhpcy54LCB0aGlzLnksIDMsIHRoaXMuY29sb3IpO1xyXG5cclxuXHJcbiAgfSxcclxuXHJcbiAgc3RlcDogZnVuY3Rpb24oZHQpIHtcclxuXHJcbiAgICBkdCAqPSB0aGlzLmdhbWUudGltZUZhY3RvcjtcclxuXHJcbiAgICAvLyBpZiAoIXRoaXMudGVhbSkgZHQgKj0gTWF0aC5zaW4oKGFwcC5saWZldGltZSAlIDIgLyAyKSAqIE1hdGguUEkpO1xyXG5cclxuICAgIHRoaXMubGlmZXRpbWUgKz0gZHQ7XHJcblxyXG4gICAgaWYgKCh0aGlzLnRhcmdldFRpbWVvdXQgLT0gZHQpIDw9IDApIHtcclxuXHJcbiAgICAgIHRoaXMudGFyZ2V0ID0gZmFsc2U7XHJcbiAgICAgIHRoaXMudGFyZ2V0VGltZW91dCA9IDAuMjU7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy50YXJnZXQpIHtcclxuXHJcbiAgICAgIHRoaXMudGFyZ2V0ID0gdGhpcy5nZXRUYXJnZXQodGhpcy5nYW1lLmVudGl0aWVzKTtcclxuXHJcbiAgICB9IGVsc2UgaWYgKHRoaXMudGFyZ2V0LmRlYWQpIHtcclxuXHJcbiAgICAgIHRoaXMudGFyZ2V0ID0gbnVsbDtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHRoaXMuZm9yZXNpZ2h0Q29sbGlzaW9uKCk7XHJcblxyXG4gICAgdmFyIGRlc3RpbmF0aW9uID0gZmFsc2U7XHJcbiAgICB2YXIgc3BlZWQgPSB0aGlzLnNwZWVkO1xyXG5cclxuICAgIHZhciBveCA9IDA7XHJcbiAgICB2YXIgb3kgPSAwO1xyXG5cclxuICAgIGlmICh0aGlzLnRlYW0gJiYgdGhpcy50YXJnZXQpIHtcclxuXHJcbiAgICAgIG94ID0gTWF0aC5jb3ModGhpcy5yYW5kb20gKiA2LjI4KSAqIDEwMDtcclxuICAgICAgb3kgPSBNYXRoLnNpbih0aGlzLnJhbmRvbSAqIDYuMjgpICogMTAwO1xyXG5cclxuICAgICAgZGVzdGluYXRpb24gPSB0aGlzLnRhcmdldDtcclxuXHJcbiAgICB9IGVsc2UgZGVzdGluYXRpb24gPSB0aGlzLmdhbWUucGxheWVyLnBsYW5ldDtcclxuXHJcbiAgICBpZiAodGhpcy50ZWFtICYmIFV0aWxzLmRpc3RhbmNlKHRoaXMsIGFwcC5jZW50ZXIpID4gYXBwLmNlbnRlci55KSB7XHJcblxyXG4gICAgICBkZXN0aW5hdGlvbiA9IGFwcC5jZW50ZXI7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmNvbGxpc2lvbkRhbmdlcikge1xyXG5cclxuICAgICAgLypcclxuXHJcbiAgICAgICAgdmFyIGFuZ2xlID0gTWF0aC5hdGFuMih0aGlzLmNvbGxpc2lvbkRhbmdlci55IC0gdGhpcy55LCB0aGlzLmNvbGxpc2lvbkRhbmdlci54IC0gdGhpcy54KSAtIE1hdGguUEkgLyAyO1xyXG5cclxuICAgICAgICBkZXN0aW5hdGlvbiA9IHtcclxuICAgICAgICAgIHg6IHRoaXMuY29sbGlzaW9uRGFuZ2VyLnggKyBNYXRoLmNvcyhhbmdsZSkgKiAxNTAsXHJcbiAgICAgICAgICB5OiB0aGlzLmNvbGxpc2lvbkRhbmdlci55ICsgTWF0aC5jb3MoYW5nbGUpICogMTUwXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzcGVlZCAqPSAxIC0gMC41ICogTWF0aC5hYnMoVXRpbHMuY2lyY0Rpc3RhbmNlKHRoaXMuZGlyZWN0aW9uLCBhbmdsZSkgLyAoTWF0aC5QSSkpO1xyXG5cclxuICAgICAgKi9cclxuXHJcbiAgICAgIGlmICh0aGlzLmNvbGxpc2lvbkRpc3RhbmNlIDwgNTApIHtcclxuXHJcbiAgICAgICAgdmFyIGFuZ2xlID0gTWF0aC5hdGFuMih0aGlzLmNvbGxpc2lvbkRhbmdlci55IC0gdGhpcy55LCB0aGlzLmNvbGxpc2lvbkRhbmdlci54IC0gdGhpcy54KSAtIE1hdGguUEk7XHJcblxyXG4gICAgICAgIHRoaXMueCA9IHRoaXMuY29sbGlzaW9uRGFuZ2VyLnggKyBNYXRoLmNvcyhhbmdsZSkgKiA1MDtcclxuICAgICAgICB0aGlzLnkgPSB0aGlzLmNvbGxpc2lvbkRhbmdlci55ICsgTWF0aC5zaW4oYW5nbGUpICogNTA7XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBzcGVlZCAqPSB0aGlzLmNvbGxpc2lvbkRpc3RhbmNlIC8gMjAwO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgaWYgKGRlc3RpbmF0aW9uKSB7XHJcblxyXG4gICAgICB0aGlzLmRlc2lyZWREaXJlY3Rpb24gPSBNYXRoLmF0YW4yKGRlc3RpbmF0aW9uLnkgLSB0aGlzLnkgKyBveCwgZGVzdGluYXRpb24ueCAtIHRoaXMueCArIG95KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLmZyb3plbikge1xyXG5cclxuICAgICAgdGhpcy5kaXJlY3Rpb24gPSBVdGlscy5jaXJjV3JhcFRvKHRoaXMuZGlyZWN0aW9uLCB0aGlzLmRlc2lyZWREaXJlY3Rpb24sIGR0ICogdGhpcy5yb3RhdGlvblNwZWVkKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5tb3ZlKGR0KTtcclxuXHJcbiAgICAvKiBmaXJpbmcgbWVjaGFuaWNzICovXHJcblxyXG4gICAgdGhpcy5jb29sZG93biAtPSBkdDtcclxuXHJcbiAgICBpZiAodGhpcy5jYW5GaXJlKCkpIHtcclxuXHJcbiAgICAgIHRoaXMuZmlyZSgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMudGVhbSAmJiBVdGlscy5kaXN0YW5jZSh0aGlzLCB0aGlzLmdhbWUucGxheWVyUGxhbmV0KSA8IHRoaXMuZ2FtZS5wbGF5ZXJQbGFuZXQucmFkaXVzKSB7XHJcblxyXG4gICAgICBpZiAoIXRoaXMuZ2FtZS5iZW5jaG1hcmspIHtcclxuXHJcbiAgICAgICAgdGhpcy5nYW1lLnBsYXllci5wbGFuZXQuYXBwbHlEYW1hZ2UoMSwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5kaWUoKTtcclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5oaXRMaWZlc3BhbiAtPSBkdDtcclxuXHJcbiAgfSxcclxuXHJcblxyXG4gIG1vdmU6IGZ1bmN0aW9uKGR0KSB7XHJcblxyXG4gICAgaWYgKCF0aGlzLmZyb3plbikge1xyXG5cclxuICAgICAgVXRpbHMubW92ZUluRGlyZWN0aW9uLmNhbGwodGhpcywgdGhpcy5kaXJlY3Rpb24sIHRoaXMuc3BlZWQgKiBkdCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmZvcmNlID4gMCkge1xyXG5cclxuICAgICAgdGhpcy5mb3JjZSAtPSAyMDAgKiBkdDtcclxuXHJcbiAgICAgIFV0aWxzLm1vdmVJbkRpcmVjdGlvbi5jYWxsKHRoaXMsIHRoaXMuZm9yY2VEaXJlY3Rpb24sIHRoaXMuZm9yY2UgKiBkdCk7XHJcblxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGNhbkZpcmU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIGlmICh0aGlzLmZyb3plbikgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgIGlmICh0aGlzLmNvb2xkb3duID4gMCkgcmV0dXJuO1xyXG4gICAgaWYgKCF0aGlzLnRhcmdldCkgcmV0dXJuO1xyXG4gICAgaWYgKFV0aWxzLmRpc3RhbmNlKHRoaXMsIHRoaXMudGFyZ2V0KSA+IHRoaXMucmFuZ2UpIHJldHVybjtcclxuXHJcbiAgICB0aGlzLmNvb2xkb3duID0gdGhpcy5maXJlcmF0ZTtcclxuXHJcbiAgICB0aGlzLmZpcmUoKTtcclxuXHJcbiAgfSxcclxuXHJcbiAgZmlyZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdGhpcy5nYW1lLmFkZChFTkdJTkUuQnVsbGV0LCB7XHJcbiAgICAgIHg6IHRoaXMueCxcclxuICAgICAgeTogdGhpcy55LFxyXG4gICAgICB0ZWFtOiB0aGlzLnRlYW0sXHJcbiAgICAgIHRhcmdldDogdGhpcy50YXJnZXQsXHJcbiAgICAgIGRhbWFnZTogdGhpcy5kYW1hZ2UsXHJcbiAgICAgIHBhcmVudDogdGhpc1xyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKCF0aGlzLmdhbWUuYmVuY2htYXJrKSBhcHAuc291bmQucGxheShcImxhc2VyXCIpO1xyXG5cclxuICB9LFxyXG5cclxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIC8qIHNwcml0ZSAqL1xyXG5cclxuICAgIGFwcC5jdHguc2F2ZSgpO1xyXG4gICAgYXBwLmN0eC50cmFuc2xhdGUodGhpcy54LCB0aGlzLnkpO1xyXG5cclxuICAgIHRoaXMucmVuZGVySFVEKCk7XHJcblxyXG4gICAgaWYgKHRoaXMuaGl0TGlmZXNwYW4gPiAwKSB7XHJcblxyXG4gICAgICB2YXIgaW1hZ2UgPSBhcHAuZ2V0Q29sb3JlZEltYWdlKHRoaXMuaW1hZ2UsIFwiI2ZmZlwiLCBcInNvdXJjZS1pblwiKTtcclxuXHJcbiAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgdmFyIGltYWdlID0gdGhpcy5pbWFnZTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgYXBwLmN0eC5yb3RhdGUodGhpcy5kaXJlY3Rpb24gLSBNYXRoLlBJIC8gMik7XHJcbiAgICBhcHAuY3R4LnNjYWxlKHRoaXMuc2NhbGUsIHRoaXMuc2NhbGUpO1xyXG4gICAgYXBwLmN0eC5kcmF3SW1hZ2UoaW1hZ2UsIHRoaXMuc3ByaXRlWzBdLCB0aGlzLnNwcml0ZVsxXSwgdGhpcy5zcHJpdGVbMl0sIHRoaXMuc3ByaXRlWzNdLCAtdGhpcy5zcHJpdGVbMl0gLyAyLCAtdGhpcy5zcHJpdGVbM10gLyAyLCB0aGlzLnNwcml0ZVsyXSwgdGhpcy5zcHJpdGVbM10pO1xyXG4gICAgYXBwLmN0eC5yZXN0b3JlKCk7XHJcblxyXG4gICAgaWYgKHRoaXMuZnJvemVuKSB7XHJcblxyXG4gICAgICBhcHAuY3R4LmRyYXdJbWFnZShhcHAuaW1hZ2VzLnNwcml0ZXNoZWV0LFxyXG4gICAgICAgIHRoaXMuZnJvemVuU3ByaXRlWzBdLCB0aGlzLmZyb3plblNwcml0ZVsxXSwgdGhpcy5mcm96ZW5TcHJpdGVbMl0sIHRoaXMuZnJvemVuU3ByaXRlWzNdLFxyXG4gICAgICAgIHRoaXMueCAtIHRoaXMuZnJvemVuU3ByaXRlWzJdIC8gMiwgdGhpcy55IC0gdGhpcy5mcm96ZW5TcHJpdGVbM10gLyAyLCB0aGlzLmZyb3plblNwcml0ZVsyXSwgdGhpcy5mcm96ZW5TcHJpdGVbM10pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy50ZWFtKSB7XHJcblxyXG4gICAgICB2YXIgcmFua1Nwcml0ZSA9IHRoaXMucmFua3NbdGhpcy5yYW5rXTtcclxuXHJcbiAgICAgIGFwcC5jdHguZHJhd0ltYWdlKGFwcC5pbWFnZXMuc3ByaXRlc2hlZXQsXHJcbiAgICAgICAgcmFua1Nwcml0ZVswXSwgcmFua1Nwcml0ZVsxXSwgcmFua1Nwcml0ZVsyXSwgcmFua1Nwcml0ZVszXSxcclxuICAgICAgICB0aGlzLnggKyAyNCwgdGhpcy55IC0gMjQsIHJhbmtTcHJpdGVbMl0sIHJhbmtTcHJpdGVbM10pO1xyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gIH0sXHJcblxyXG4gIHJlbmRlckhVRDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgaWYgKHRoaXMuZnJvemVuKSByZXR1cm47XHJcblxyXG4gICAgdmFyIHcgPSBNYXRoLm1pbigxMDAsICh0aGlzLm1heEhwIC8gMTYwKSAqIDEwMCB8IDApO1xyXG5cclxuICAgIHZhciBtb2QgPSB0aGlzLmhwIC8gdGhpcy5tYXhIcDtcclxuXHJcbiAgICBhcHAuY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XHJcbiAgICBhcHAuY3R4LnN0cm9rZVN0eWxlID0gdGhpcy5jb2xvcjtcclxuICAgIGFwcC5jdHgubGluZVdpZHRoID0gMjtcclxuICAgIGFwcC5jdHguZmlsbFJlY3QoLXcgKiBtb2QgLyAyIHwgMCwgMzIsIHcgKiBtb2QsIDUpO1xyXG4gICAgYXBwLmN0eC5zdHJva2VSZWN0KC13ICogMC41IHwgMCwgMzIsIHcsIDUpO1xyXG5cclxuICB9LFxyXG5cclxuICBjb2xsaXNpb25SYW5nZTogMTAwLFxyXG5cclxuICBmb3Jlc2lnaHRDb2xsaXNpb246IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHRoaXMuY29sbGlzaW9uRGFuZ2VyID0gZmFsc2U7XHJcblxyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgIHZhciBwb29sID0gVXRpbHMuZmlsdGVyKHRoaXMuZ2FtZS5lbnRpdGllcywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgaWYgKGUudHlwZSAhPT0gXCJhc3Rlcm9pZFwiKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICBpZiAoVXRpbHMuZGlzdGFuY2Uoc2VsZiwgZSkgPiBzZWxmLmNvbGxpc2lvblJhbmdlKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmNvbGxpc2lvbkRhbmdlciA9IFV0aWxzLm5lYXJlc3QodGhpcywgcG9vbCk7XHJcblxyXG4gICAgaWYgKHRoaXMuY29sbGlzaW9uRGFuZ2VyKSB0aGlzLmNvbGxpc2lvbkRpc3RhbmNlID0gVXRpbHMuZGlzdGFuY2UodGhpcywgdGhpcy5jb2xsaXNpb25EYW5nZXIpO1xyXG5cclxuICB9LFxyXG5cclxuICBnZXRUYXJnZXQ6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHZhciBwb29sID0gW107XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmdhbWUuZW50aXRpZXMubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgIHZhciBlbnRpdHkgPSB0aGlzLmdhbWUuZW50aXRpZXNbaV07XHJcblxyXG4gICAgICBpZiAoIShlbnRpdHkgaW5zdGFuY2VvZiBFTkdJTkUuU2hpcCkpIGNvbnRpbnVlO1xyXG5cclxuICAgICAgaWYgKGVudGl0eS50ZWFtICE9PSB0aGlzLnRlYW0pIHBvb2wucHVzaChlbnRpdHkpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gVXRpbHMubmVhcmVzdCh0aGlzLCBwb29sKTtcclxuXHJcbiAgfSxcclxuXHJcbiAgcmVwYWlyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICBpZiAodGhpcy5ocCA+PSB0aGlzLm1heEhwKSByZXR1cm47XHJcblxyXG4gICAgdGhpcy5nYW1lLmFkZChFTkdJTkUuQ2lyY2xlRXhwbG9zaW9uLCB7XHJcbiAgICAgIGNvbG9yOiBcIiNhMDRcIixcclxuICAgICAgcmFkaXVzOiAzMixcclxuICAgICAgYXR0YWNoZWRUbzogdGhpc1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5ocCA9IHRoaXMubWF4SHA7XHJcblxyXG4gIH0sXHJcblxyXG4gIG9uc2NvcmU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHRoaXMua2lsbHMrKztcclxuXHJcbiAgICB0aGlzLnJhbmsgPSBNYXRoLm1pbih0aGlzLnJhbmtzLmxlbmd0aCAtIDEsIHRoaXMua2lsbHMgLyAzIHwgMCk7XHJcblxyXG4gIH1cclxuXHJcbn07IiwiRU5HSU5FLkJ1bGxldCA9IGZ1bmN0aW9uKGFyZ3MpIHtcclxuXHJcbiAgVXRpbHMuZXh0ZW5kKHRoaXMsIHtcclxuICAgIHNwZWVkOiA0MDBcclxuICB9LCBhcmdzKTtcclxuXHJcbiAgdGhpcy5jb2xvciA9IGRlZnMudGVhbUNvbG9yW3RoaXMudGVhbV07XHJcbiAgdGhpcy5yYWRpdXMgPSA0O1xyXG4gIHRoaXMuZGlyZWN0aW9uID0gMDtcclxuXHJcbiAgdGhpcy5zcHJpdGUgPSB0aGlzLnNwcml0ZXNbdGhpcy50ZWFtXTtcclxuXHJcbn07XHJcblxyXG5FTkdJTkUuQnVsbGV0LnByb3RvdHlwZSA9IHtcclxuXHJcbiAgc3ByaXRlczogW1xyXG4gICAgWzEyNiwgMjUsIDQsIDM3XSxcclxuICAgIFsxMzMsIDI1LCA0LCAzN11cclxuICBdLFxyXG5cclxuICBxdW90YTogMC41LFxyXG5cclxuICBjb25zdHJ1Y3RvcjogRU5HSU5FLkJ1bGxldCxcclxuXHJcbiAgc3RlcDogZnVuY3Rpb24oZHQpIHtcclxuXHJcbiAgICBkdCAqPSB0aGlzLmdhbWUudGltZUZhY3RvcjtcclxuXHJcbiAgICB0aGlzLmRpcmVjdGlvbiA9IE1hdGguYXRhbjIodGhpcy50YXJnZXQueSAtIHRoaXMueSwgdGhpcy50YXJnZXQueCAtIHRoaXMueCk7XHJcblxyXG4gICAgdGhpcy54ICs9IE1hdGguY29zKHRoaXMuZGlyZWN0aW9uKSAqIHRoaXMuc3BlZWQgKiBkdDtcclxuICAgIHRoaXMueSArPSBNYXRoLnNpbih0aGlzLmRpcmVjdGlvbikgKiB0aGlzLnNwZWVkICogZHQ7XHJcblxyXG4gICAgaWYgKFV0aWxzLmRpc3RhbmNlKHRoaXMsIHRoaXMudGFyZ2V0KSA8IHRoaXMucmFkaXVzICsgdGhpcy50YXJnZXQucmFkaXVzKSB7XHJcblxyXG4gICAgICB0aGlzLmhpdCh0aGlzLnRhcmdldCk7XHJcblxyXG4gICAgfVxyXG5cclxuICB9LFxyXG5cclxuICBoaXQ6IGZ1bmN0aW9uKHRhcmdldCkge1xyXG5cclxuICAgIHRhcmdldC5hcHBseURhbWFnZSh0aGlzLmRhbWFnZSwgdGhpcy5wYXJlbnQpO1xyXG5cclxuICAgIHRoaXMuZGllKCk7XHJcblxyXG4gIH0sXHJcblxyXG4gIGRpZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdGhpcy5kZWFkID0gdHJ1ZTtcclxuXHJcbiAgfSxcclxuXHJcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICBhcHAuY3R4LnNhdmUoKTtcclxuXHJcbiAgICBhcHAuY3R4LnRyYW5zbGF0ZSh0aGlzLngsIHRoaXMueSk7XHJcbiAgICBhcHAuY3R4LnJvdGF0ZSh0aGlzLmRpcmVjdGlvbiArIE1hdGguUEkgLyAyKTtcclxuICAgIGFwcC5jdHguZHJhd0ltYWdlKGFwcC5pbWFnZXMuc3ByaXRlc2hlZXQsXHJcbiAgICAgIHRoaXMuc3ByaXRlWzBdLCB0aGlzLnNwcml0ZVsxXSwgdGhpcy5zcHJpdGVbMl0sIHRoaXMuc3ByaXRlWzNdLCAtdGhpcy5zcHJpdGVbMl0gLyAyLCAtdGhpcy5zcHJpdGVbM10gLyAyLCB0aGlzLnNwcml0ZVsyXSwgdGhpcy5zcHJpdGVbM11cclxuICAgICk7XHJcblxyXG4gICAgYXBwLmN0eC5yZXN0b3JlKCk7XHJcblxyXG4gIH1cclxuXHJcbn07IiwiRU5HSU5FLkFzdGVyb2lkID0gZnVuY3Rpb24oYXJncykge1xyXG5cclxuICB0aGlzLm1heCA9IHRoaXMucmVzb3VyY2VzID0gNTtcclxuXHJcbiAgVXRpbHMuZXh0ZW5kKHRoaXMsIHtcclxuXHJcbiAgICBoaXRMaWZlc3BhbjogMFxyXG5cclxuICB9LCBhcmdzKTtcclxuXHJcbiAgdGhpcy5yYWRpdXMgPSAzMjtcclxuXHJcbiAgdGhpcy5kaXJlY3Rpb24gPSBNYXRoLmF0YW4yKGFwcC5jZW50ZXIueSAtIHRoaXMueSwgYXBwLmNlbnRlci54IC0gdGhpcy54KTtcclxuICB0aGlzLnNwZWVkID0gOCArIHRoaXMuZ2FtZS5yYW5kb20oKSAqIDMyO1xyXG5cclxuICB0aGlzLmxpZmV0aW1lID0gMDtcclxuXHJcbiAgdGhpcy5raW5kID0gdGhpcy5nYW1lLnJhbmRvbSgpID4gMC44ID8gXCJnb2xkXCIgOiBcIm5vcm1hbFwiO1xyXG5cclxuICB0aGlzLnNwcml0ZUluZGV4ID0gVXRpbHMucmFuZG9tKDAsIDIpO1xyXG5cclxuICB0aGlzLmNvbGxlY3RpYmxlcyA9IDA7XHJcblxyXG5cclxufTtcclxuXHJcbkVOR0lORS5Bc3Rlcm9pZC5wcm90b3R5cGUgPSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yOiBFTkdJTkUuQXN0ZXJvaWQsXHJcblxyXG4gIHF1b3RhOiAwLjUsXHJcblxyXG4gIGhvdmVyYWJsZTogXCJtaW5pbmdcIixcclxuICBzaWxlbnQ6IHRydWUsXHJcbiAgaW5zdGFudDogdHJ1ZSxcclxuXHJcbiAgdHlwZTogXCJhc3Rlcm9pZFwiLFxyXG5cclxuXHJcbiAgc3ByaXRlczoge1xyXG5cclxuICAgIG5vcm1hbDogW1xyXG4gICAgICBbMzQxLCAyMzksIDUyLCAzOV0sXHJcbiAgICAgIFszMzcsIDI4OCwgNjEsIDYxXSxcclxuICAgICAgWzMzOCwgMzU0LCA1NywgNThdXHJcbiAgICBdLFxyXG5cclxuICAgIGdvbGQ6IFtcclxuICAgICAgWzQwOCwgMjM4LCA1MiwgMzldLFxyXG4gICAgICBbNDA0LCAyODcsIDU5LCA2MV0sXHJcbiAgICAgIFs0MDMsIDM1MywgNTksIDU4XVxyXG4gICAgXSxcclxuXHJcbiAgICBoaXQ6IFtcclxuICAgICAgWzQ3NiwgMTI3LCA1MiwgMzldLFxyXG4gICAgICBbNDcyLCAxNzYsIDYxLCA2MV0sXHJcbiAgICAgIFs0NzMsIDI0MiwgNTcsIDU4XVxyXG4gICAgXVxyXG5cclxuICB9LFxyXG5cclxuICBwb2ludGVyZW50ZXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHRoaXMuc2xvd2Rvd24gPSB0cnVlO1xyXG5cclxuICB9LFxyXG5cclxuICBwb2ludGVybGVhdmU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHRoaXMuc2xvd2Rvd24gPSBmYWxzZTtcclxuXHJcbiAgfSxcclxuXHJcbiAgZGllOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICBhcHAuc291bmQucGxheShcImV4cGxvc2lvblwiKS5yYXRlKDAuNik7XHJcblxyXG4gICAgaWYgKE1hdGgucmFuZG9tKCkgPiAwLjcpIHtcclxuXHJcbiAgICAgIHRoaXMuZ2FtZS5hZGQoRU5HSU5FLlBvd2VydXAsIHtcclxuICAgICAgICB4OiB0aGlzLngsXHJcbiAgICAgICAgeTogdGhpcy55XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmdhbWUucmVtb3ZlKHRoaXMpO1xyXG4gICAgdGhpcy5nYW1lLmV4cGxvc2lvbih0aGlzLngsIHRoaXMueSwgMTYsIFwiI2FhYVwiKTtcclxuICAgIHRoaXMuZ2FtZS5zcGF3bkFzdGVyb2lkKCk7XHJcblxyXG4gIH0sXHJcblxyXG4gIGRpZzogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdGhpcy5oaXRMaWZlc3BhbiA9IDAuMTtcclxuXHJcbiAgICB0aGlzLnJlc291cmNlcy0tO1xyXG5cclxuICAgIGlmICh0aGlzLnJlc291cmNlcyA8PSAwKSB7XHJcbiAgICAgIHRoaXMuZGllKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGNvdW50ID0gdGhpcy5raW5kID09PSBcImdvbGRcIiA/IDIgOiAxO1xyXG5cclxuICAgIHRoaXMuc3Bhd25SZXNvdXJjZXMoY291bnQpO1xyXG5cclxuICAgIHRoaXMuZ2FtZS5leHBsb3Npb24odGhpcy54LCB0aGlzLnksIDQsIFwiI2ZhMFwiKTtcclxuXHJcbiAgICBpZiAoIXRoaXMuZ2FtZS5iZW5jaG1hcmspIGFwcC5zb3VuZC5wbGF5KFwiZGlnXCIpO1xyXG5cclxuICB9LFxyXG5cclxuICBzcGF3blJlc291cmNlczogZnVuY3Rpb24oY291bnQpIHtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcclxuXHJcbiAgICAgIHRoaXMuZ2FtZS5hZGQoRU5HSU5FLlJlc291cmNlLCB7XHJcbiAgICAgICAgeDogdGhpcy54LFxyXG4gICAgICAgIHk6IHRoaXMueSxcclxuICAgICAgICBwYXJlbnQ6IHRoaXNcclxuICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICB9LFxyXG5cclxuICBzdGVwOiBmdW5jdGlvbihkdCkge1xyXG5cclxuICAgIGR0ICo9IHRoaXMuZ2FtZS50aW1lRmFjdG9yO1xyXG5cclxuICAgIHRoaXMubGlmZXRpbWUgKz0gZHQ7XHJcblxyXG4gICAgdGhpcy5oaXRMaWZlc3BhbiAtPSBkdDtcclxuXHJcbiAgICB2YXIgc3BlZWQgPSB0aGlzLnNwZWVkICogKHRoaXMuc2xvd2Rvd24gPyAwLjI1IDogMS4wKTtcclxuXHJcbiAgICB0aGlzLnggKz0gTWF0aC5jb3ModGhpcy5kaXJlY3Rpb24pICogc3BlZWQgKiBkdDtcclxuICAgIHRoaXMueSArPSBNYXRoLnNpbih0aGlzLmRpcmVjdGlvbikgKiBzcGVlZCAqIGR0O1xyXG5cclxuICAgIHRoaXMuZ2FtZS53cmFwKHRoaXMpO1xyXG5cclxuICAgIGlmIChVdGlscy5kaXN0YW5jZSh0aGlzLCBhcHAuY2VudGVyKSA8IHRoaXMuZ2FtZS5wbGF5ZXIucGxhbmV0LnJhZGl1cyArIHRoaXMucmFkaXVzKSB7XHJcblxyXG4gICAgICBpZiAodGhpcy5nYW1lLnBsYXllci5wbGFuZXQuYXN0ZXJvaWRzU2hpZWxkKSB7XHJcblxyXG4gICAgICAgIHRoaXMuc3Bhd25SZXNvdXJjZXMoNSk7XHJcblxyXG4gICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICB0aGlzLmdhbWUucGxheWVyLnBsYW5ldC5hcHBseURhbWFnZSgxLCB0aGlzKTtcclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuZGllKCk7XHJcblxyXG4gICAgfVxyXG5cclxuICB9LFxyXG5cclxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIGlmICh0aGlzLmhpdExpZmVzcGFuID4gMCkge1xyXG4gICAgXHJcbiAgICAgIHZhciBzcHJpdGUgPSB0aGlzLnNwcml0ZXMuaGl0W3RoaXMuc3ByaXRlSW5kZXhdO1xyXG4gICAgXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBcclxuICAgICAgdmFyIHNwcml0ZSA9IHRoaXMuc3ByaXRlc1t0aGlzLmtpbmRdW3RoaXMuc3ByaXRlSW5kZXhdO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICB2YXIgc2NhbGUgPSAwLjUgKyAwLjUgKiB0aGlzLnJlc291cmNlcyAvIHRoaXMubWF4O1xyXG5cclxuICAgIGFwcC5jdHguc2F2ZSgpO1xyXG5cclxuICAgIGFwcC5jdHgudHJhbnNsYXRlKHRoaXMueCwgdGhpcy55KVxyXG4gICAgYXBwLmN0eC5yb3RhdGUodGhpcy5saWZldGltZSlcclxuICAgIGFwcC5jdHguc2NhbGUoc2NhbGUsIHNjYWxlKVxyXG4gICAgYXBwLmN0eC5kcmF3SW1hZ2UoYXBwLmltYWdlcy5zcHJpdGVzaGVldCxcclxuICAgICAgc3ByaXRlWzBdLCBzcHJpdGVbMV0sIHNwcml0ZVsyXSwgc3ByaXRlWzNdLCAtc3ByaXRlWzJdIC8gMiwgLXNwcml0ZVszXSAvIDIsIHNwcml0ZVsyXSwgc3ByaXRlWzNdXHJcbiAgICApO1xyXG4gICAgYXBwLmN0eC5yZXN0b3JlKCk7XHJcblxyXG4gIH1cclxuXHJcbn07IiwiRU5HSU5FLkN1cnNvciA9IGZ1bmN0aW9uKGdhbWUsIHRlYW0sIHBsYW5ldCkge1xyXG5cclxuICB0aGlzLmdhbWUgPSBnYW1lO1xyXG5cclxuICB0aGlzLmFjdGlvblRpbWVvdXQgPSAwO1xyXG5cclxuICB0aGlzLmRvdFJhZGl1cyA9IDg7XHJcbiAgdGhpcy5jYXBhY2l0eSA9IDEwO1xyXG4gIHRoaXMucmVzb3VyY2VzID0gNDtcclxuICB0aGlzLnggPSAwO1xyXG4gIHRoaXMueSA9IDA7XHJcbiAgdGhpcy5ob3ZlclRpbWUgPSAwO1xyXG4gIHRoaXMudGVhbSA9IHRlYW07XHJcbiAgdGhpcy5jb2xvciA9IGRlZnMudGVhbUNvbG9yW3RlYW1dO1xyXG4gIHRoaXMucGxhbmV0ID0gcGxhbmV0O1xyXG5cclxuICB0aGlzLnRhcmdldFRpbWVvdXQgPSB0aGlzLnRhcmdldEludGVydmFsID0gMC4yNTtcclxuICB0aGlzLmZpcmVDb29sZG93biA9IHRoaXMuZmlyZUludGVydmFsID0gMC4yNTtcclxuXHJcbiAgLyogdGltZXJzICovXHJcblxyXG4gIHRoaXMudGltZXMgPSB7XHJcbiAgICBtaW5pbmc6IDAuNSxcclxuICAgIGNvbGxlY3Q6IDAuMDUsXHJcbiAgICBidWlsZDogMC41LFxyXG4gICAgcmVwYWlyOiAyXHJcbiAgfTtcclxuXHJcblxyXG4gIHRoaXMudHdlZW4gPSBhcHAudHdlZW4odGhpcyk7XHJcblxyXG4gIGlmICghdGhpcy50ZWFtKSB7XHJcblxyXG4gICAgdGhpcy5haSA9IG5ldyBFTkdJTkUuQWkodGhpcyk7XHJcbiAgICB0aGlzLmFpLnNldChcImlkbGVcIik7XHJcblxyXG4gIH1cclxuXHJcbiAgdGhpcy50cmFpbCA9IG5ldyBFTkdJTkUuVHJhaWwodGhpcywge1xyXG4gICAgaW50ZXJ2YWw6IDAuMDUsXHJcbiAgICBtYXhQb2ludHM6IDEwLFxyXG4gICAgY29sb3I6IHRoaXMuY29sb3JcclxuICB9KTtcclxuXHJcblxyXG59O1xyXG5cclxuRU5HSU5FLkN1cnNvci5wcm90b3R5cGUgPSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yOiBFTkdJTkUuQ3Vyc29yLFxyXG5cclxuICBwb2tlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB0aGlzLnR3ZWVuID0gYXBwLnR3ZWVuKHRoaXMpLmRpc2NhcmQoKVxyXG5cclxuICAgIC50byh7XHJcbiAgICAgIGRvdFJhZGl1czogMTZcclxuICAgIH0sIDAuMSwgXCJvdXRTaW5lXCIpXHJcblxyXG4gICAgLnRvKHtcclxuICAgICAgZG90UmFkaXVzOiA4XHJcbiAgICB9LCAwLjA1LCBcImluU2luZVwiKTtcclxuXHJcbiAgfSxcclxuXHJcbiAgc3RlcDogZnVuY3Rpb24oZHQpIHtcclxuXHJcbiAgICB2YXIgcHJldkVudGl0eSA9IHRoaXMuZW50aXR5O1xyXG5cclxuICAgIHRoaXMuZW50aXR5ID0gdGhpcy5nZXRIb3ZlcmVkRW50aXR5KCk7XHJcblxyXG4gICAgaWYgKHRoaXMuZW50aXR5ICE9PSBwcmV2RW50aXR5KSB7XHJcblxyXG4gICAgICBpZiAocHJldkVudGl0eSAmJiBwcmV2RW50aXR5LnBvaW50ZXJsZWF2ZSkgcHJldkVudGl0eS5wb2ludGVybGVhdmUodGhpcyk7XHJcbiAgICAgIGlmICh0aGlzLmVudGl0eSAmJiB0aGlzLmVudGl0eS5wb2ludGVyZW50ZXIpIHRoaXMuZW50aXR5LnBvaW50ZXJlbnRlcih0aGlzKTtcclxuXHJcbiAgICAgIHRoaXMub25lbnRpdHljaGFuZ2UoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuYWN0aW9uKSB7XHJcblxyXG4gICAgICB0aGlzLmhvdmVyVGltZSArPSBkdDtcclxuXHJcbiAgICAgIHRoaXMucHJvZ3Jlc3NBY3Rpb24oZHQpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKiBmaXJpbmcgbWVjaGFuaWNzICovXHJcblxyXG4gICAgaWYgKHRoaXMudGFyZ2V0ICYmIHRoaXMudGFyZ2V0LmRlYWQpIHRoaXMudGFyZ2V0ID0gZmFsc2U7XHJcblxyXG4gICAgaWYgKCh0aGlzLnRhcmdldFRpbWVvdXQgLT0gZHQpIDw9IDApIHtcclxuXHJcbiAgICAgIHRoaXMudGFyZ2V0VGltZW91dCA9IDAuNTtcclxuXHJcbiAgICAgIHRoaXMudGFyZ2V0ID0gdGhpcy5nZXRUYXJnZXQoKTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHRoaXMuZmlyZUNvb2xkb3duIC09IGR0O1xyXG5cclxuICAgIGlmICh0aGlzLmNhbkZpcmUoKSkge1xyXG5cclxuICAgICAgdGhpcy5maXJlKCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudHJhaWwuc3RlcChkdCk7XHJcblxyXG5cclxuICB9LFxyXG5cclxuICBnZXRUYXJnZXQ6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHZhciBwb29sID0gW107XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmdhbWUuZW50aXRpZXMubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgIHZhciBlbnRpdHkgPSB0aGlzLmdhbWUuZW50aXRpZXNbaV07XHJcblxyXG4gICAgICBpZiAoIShlbnRpdHkgaW5zdGFuY2VvZiBFTkdJTkUuU2hpcCkpIGNvbnRpbnVlO1xyXG5cclxuICAgICAgaWYgKFV0aWxzLmRpc3RhbmNlKGVudGl0eSwgdGhpcykgPiAyMDApIGNvbnRpbnVlO1xyXG4gICAgICBpZiAoZW50aXR5LnRlYW0gIT09IHRoaXMudGVhbSkgcG9vbC5wdXNoKGVudGl0eSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBVdGlscy5uZWFyZXN0KHRoaXMsIHBvb2wpO1xyXG5cclxuICB9LFxyXG5cclxuICBvbmVudGl0eWNoYW5nZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdGhpcy5hY3Rpb25Db21wbGV0ZSA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuaG92ZXJUaW1lID0gMDtcclxuXHJcbiAgICBpZiAodGhpcy5lbnRpdHkpIHtcclxuXHJcbiAgICAgIHRoaXMuYWN0aW9uID0gdGhpcy5lbnRpdHkuaG92ZXJhYmxlO1xyXG4gICAgICB0aGlzLnJlc2V0QWN0aW9uKCk7XHJcblxyXG4gICAgICBpZiAodGhpcy5lbnRpdHkuaW5zdGFudCkgdGhpcy5hY3Rpb25UaW1lb3V0ID0gMDtcclxuXHJcblxyXG4gICAgfSBlbHNlIHRoaXMuYWN0aW9uID0gZmFsc2U7XHJcblxyXG4gICAgLypcclxuICAgICAgICBpZiAoIXRoaXMuYWN0aW9uU291bmQpIHRoaXMuYWN0aW9uU291bmQgPSBhcHAuc291bmQucGxheShcImFjdGlvblwiKS5sb29wKCkucmF0ZSgwLjUpO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuYWN0aW9uKSB7XHJcbiAgICAgICAgICB0aGlzLmFjdGlvblNvdW5kLnN0b3AoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5hY3Rpb25Tb3VuZC5mYWRlSW4oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgKi9cclxuICAgIHRoaXMudXBkYXRlVG9vbHRpcCgpO1xyXG5cclxuXHJcbiAgfSxcclxuXHJcbiAgcmVzZXRBY3Rpb246IGZ1bmN0aW9uKCkge1xyXG5cclxuXHJcbiAgICB0aGlzLmFjdGlvblRpbWVvdXQgPSB0aGlzLnRpbWVzW3RoaXMuYWN0aW9uXTtcclxuXHJcbiAgICB0aGlzLmFjdGlvbkR1cmF0aW9uID0gdGhpcy5hY3Rpb25UaW1lb3V0O1xyXG5cclxuICB9LFxyXG5cclxuICB1cGdyYWRlOiBmdW5jdGlvbihrZXkpIHtcclxuXHJcbiAgICB0aGlzLmdhbWUudXBncmFkZXNba2V5XSArKztcclxuXHJcbiAgICB0aGlzLmdhbWUuYnV0dG9uc1trZXldLmNvdW50ID0gdGhpcy5nZXRQcmljZShrZXkpO1xyXG5cclxuICAgIHZhciBzaGlwcyA9IFV0aWxzLmZpbHRlcih0aGlzLmdhbWUuZW50aXRpZXMsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgIHJldHVybiAoZSBpbnN0YW5jZW9mIEVOR0lORS5TaGlwKSAmJiBlLnRlYW07XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaGlwcy5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgdmFyIHNoaXAgPSBzaGlwc1tpXTtcclxuXHJcbiAgICAgIHRoaXMuZ2FtZS5hZGQoRU5HSU5FLkNpcmNsZUV4cGxvc2lvbiwge1xyXG4gICAgICAgIGNvbG9yOiBcIiMwYWZcIixcclxuICAgICAgICByYWRpdXM6IDMyLFxyXG4gICAgICAgIGF0dGFjaGVkVG86IHNoaXBcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBzaGlwLmFwcGx5VXBncmFkZXModGhpcy5nYW1lLnVwZ3JhZGVzKVxyXG5cclxuICAgIH1cclxuXHJcbiAgfSxcclxuXHJcbiAgZ2V0UHJpY2U6IGZ1bmN0aW9uKGtleSkge1xyXG5cclxuICAgIHJldHVybiBNYXRoLnBvdygyLCB0aGlzLmdhbWUudXBncmFkZXNba2V5XSk7XHJcblxyXG4gIH0sXHJcblxyXG4gIGNhblByb2dyZXNzOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICBzd2l0Y2ggKHRoaXMuYWN0aW9uKSB7XHJcblxyXG4gICAgICBjYXNlIFwicmVwYWlyXCI6XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLnBsYW5ldC5ocCA8IHRoaXMucGxhbmV0Lm1heEhQO1xyXG5cclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgXCJidWlsZFwiOlxyXG5cclxuICAgICAgICBpZiAodGhpcy5lbnRpdHkua2V5ID09PSBcImZpZ2h0ZXJcIikge1xyXG5cclxuICAgICAgICAgIGlmICh0aGlzLmdhbWUucGxheWVyUGxhbmV0Lm1heCAtIHRoaXMuZ2FtZS5wbGF5ZXJQbGFuZXQuc2hpcHMgPD0gMCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICAgIHJldHVybiB0aGlzLnJlc291cmNlcyA+IDA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5yZXNvdXJjZXMgPj0gdGhpcy5nZXRQcmljZSh0aGlzLmVudGl0eS5rZXkpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgZGVmYXVsdDpcclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBwcm9ncmVzc0FjdGlvbjogZnVuY3Rpb24oZHQpIHtcclxuXHJcbiAgICBpZiAodGhpcy5jYW5Qcm9ncmVzcygpICYmICh0aGlzLmFjdGlvblRpbWVvdXQgLT0gZHQpIDwgMCkge1xyXG5cclxuICAgICAgdGhpcy5maW5hbGl6ZUFjdGlvbigpO1xyXG4gICAgICB0aGlzLnJlc2V0QWN0aW9uKCk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLnByb2dyZXNzID0gMSAtIHRoaXMuYWN0aW9uVGltZW91dCAvIHRoaXMuYWN0aW9uRHVyYXRpb247XHJcblxyXG5cclxuICB9LFxyXG5cclxuICBmaW5hbGl6ZUFjdGlvbjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdGhpcy5hY3Rpb25Db21wbGV0ZSA9IHRydWU7XHJcblxyXG4gICAgc3dpdGNoICh0aGlzLmFjdGlvbikge1xyXG5cclxuICAgICAgY2FzZSBcInJlcGFpclwiOlxyXG5cclxuICAgICAgICB0aGlzLnBsYW5ldC5yZXBhaXIoKTtcclxuXHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIFwibWluaW5nXCI6XHJcblxyXG4gICAgICAgIHRoaXMuZW50aXR5LmRpZygpO1xyXG5cclxuICAgICAgICBicmVhaztcclxuXHJcblxyXG4gICAgICBjYXNlIFwiYnVpbGRcIjpcclxuXHJcbiAgICAgICAgc3dpdGNoICh0aGlzLmVudGl0eS5rZXkpIHtcclxuXHJcbiAgICAgICAgICBjYXNlIFwiZmlnaHRlclwiOlxyXG5cclxuICAgICAgICAgICAgdGhpcy5wbGFuZXQuc3Bhd25TaGlwKFwiZmlnaHRlclwiKTtcclxuICAgICAgICAgICAgdGhpcy5yZXNvdXJjZXMgLT0gMTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmdhbWUuYmVuY2htYXJrKSBhcHAuc291bmQucGxheShcImJ1aWxkXCIpO1xyXG5cclxuICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgY2FzZSBcImxpZmVcIjpcclxuICAgICAgICAgIGNhc2UgXCJkYW1hZ2VcIjpcclxuICAgICAgICAgIGNhc2UgXCJzcGVlZFwiOlxyXG5cclxuICAgICAgICAgICAgdGhpcy5yZXNvdXJjZXMgLT0gdGhpcy5nZXRQcmljZSh0aGlzLmVudGl0eS5rZXkpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy51cGdyYWRlKHRoaXMuZW50aXR5LmtleSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuZ2FtZS5iZW5jaG1hcmspIGFwcC5zb3VuZC5wbGF5KFwidXBncmFkZVwiKTtcclxuXHJcblxyXG4gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgfSxcclxuXHJcbiAgaGl0OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB0aGlzLmdhbWUuc2hha2UoKTtcclxuXHJcbiAgICB0aGlzLnBsYW5ldC5hcHBseURhbWFnZSgxLCB0aGlzLnBsYW5ldCk7XHJcblxyXG4gICAgdGhpcy5nYW1lLmFkZChFTkdJTkUuQ2lyY2xlRXhwbG9zaW9uLCB7XHJcbiAgICAgIHg6IHRoaXMueCxcclxuICAgICAgeTogdGhpcy55LFxyXG4gICAgICBjb2xvcjogXCIjYzAyXCIsXHJcbiAgICAgIHJhZGl1czogMzJcclxuICAgIH0pXHJcblxyXG4gIH0sXHJcblxyXG4gIGdldEhvdmVyZWRFbnRpdHk6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5nYW1lLmVudGl0aWVzLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICB2YXIgZW50aXR5ID0gdGhpcy5nYW1lLmVudGl0aWVzW2ldO1xyXG5cclxuICAgICAgaWYgKGVudGl0eS5ob3ZlcmFibGUgJiYgVXRpbHMuZGlzdGFuY2UoZW50aXR5LCB0aGlzKSA8IGVudGl0eS5yYWRpdXMpIHJldHVybiBlbnRpdHk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG5cclxuICB9LFxyXG5cclxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHRoaXMudHJhaWwucmVuZGVyKCk7XHJcblxyXG4gICAgYXBwLmxheWVyLmZpbGxTdHlsZSh0aGlzLmNvbG9yKS5maWxsQ2lyY2xlKHRoaXMueCwgdGhpcy55LCB0aGlzLmRvdFJhZGl1cyk7XHJcblxyXG4gICAgaWYgKHRoaXMuYWN0aW9uICYmICF0aGlzLmVudGl0eS5zaWxlbnQpIHtcclxuXHJcbiAgICAgIHZhciBtb2QgPSBNYXRoLm1pbigxLCBhcHAuZWFzZSgyICogdGhpcy5ob3ZlclRpbWUsIFwib3V0Qm91bmNlXCIpKTtcclxuXHJcbiAgICAgIGFwcC5jdHguc2F2ZSgpO1xyXG4gICAgICBhcHAuY3R4LnRyYW5zbGF0ZSh0aGlzLmVudGl0eS54LCB0aGlzLmVudGl0eS55KTtcclxuXHJcbiAgICAgIGFwcC5jdHguc3Ryb2tlU3R5bGUgPSB0aGlzLmNvbG9yO1xyXG4gICAgICBhcHAuY3R4LmxpbmVXaWR0aCA9IDI7XHJcbiAgICAgIGFwcC5jdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgIGFwcC5jdHguYXJjKDAsIDAsICh0aGlzLmVudGl0eS5yYWRpdXMgKyAyKSAqIG1vZCwgMCwgTWF0aC5QSSAqIDIpO1xyXG4gICAgICBhcHAuY3R4LnN0cm9rZSgpO1xyXG5cclxuICAgICAgYXBwLmN0eC5saW5lV2lkdGggPSA4O1xyXG4gICAgICBhcHAuY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICBhcHAuY3R4Lmdsb2JhbEFscGhhID0gMC4yNTtcclxuICAgICAgYXBwLmN0eC5hcmMoMCwgMCwgdGhpcy5lbnRpdHkucmFkaXVzICsgOCwgMCwgTWF0aC5QSSAqIDIpXHJcbiAgICAgIGFwcC5jdHguc3Ryb2tlKClcclxuICAgICAgYXBwLmN0eC5nbG9iYWxBbHBoYSA9IDEuMDtcclxuXHJcbiAgICAgIGFwcC5jdHgubGluZVdpZHRoID0gODtcclxuICAgICAgYXBwLmN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgYXBwLmN0eC5hcmMoMCwgMCwgdGhpcy5lbnRpdHkucmFkaXVzICsgOCwgMCwgdGhpcy5wcm9ncmVzcyAqIE1hdGguUEkgKiAyKVxyXG4gICAgICBhcHAuY3R4LnN0cm9rZSgpO1xyXG5cclxuICAgICAgYXBwLmN0eC5yZXN0b3JlKCk7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gIH0sXHJcblxyXG4gIGNhbkZpcmU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIGlmICghdGhpcy5nYW1lLmNoZWNrQm9udXMoXCJsYXNlclwiKSkgcmV0dXJuO1xyXG5cclxuICAgIGlmICh0aGlzLmZpcmVDb29sZG93biA+IDApIHJldHVybjtcclxuICAgIGlmICghdGhpcy50YXJnZXQpIHJldHVybjtcclxuICAgIGlmIChVdGlscy5kaXN0YW5jZSh0aGlzLCB0aGlzLnRhcmdldCkgPiB0aGlzLnJhbmdlKSByZXR1cm47XHJcblxyXG4gICAgdGhpcy5maXJlQ29vbGRvd24gPSB0aGlzLmZpcmVJbnRlcnZhbDtcclxuXHJcbiAgICB0aGlzLmZpcmUoKTtcclxuXHJcbiAgfSxcclxuXHJcbiAgZmlyZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdGhpcy5nYW1lLmFkZChFTkdJTkUuQnVsbGV0LCB7XHJcbiAgICAgIHg6IHRoaXMueCxcclxuICAgICAgeTogdGhpcy55LFxyXG4gICAgICB0ZWFtOiB0aGlzLnRlYW0sXHJcbiAgICAgIHRhcmdldDogdGhpcy50YXJnZXQsXHJcbiAgICAgIGRhbWFnZTogMixcclxuICAgICAgc3BlZWQ6IDEwMDBcclxuICAgIH0pO1xyXG5cclxuICAgIGlmICghdGhpcy5nYW1lLmJlbmNobWFyaykgYXBwLnNvdW5kLnBsYXkoXCJsYXNlclwiKTtcclxuXHJcbiAgfSxcclxuXHJcbiAgbW92ZVRvOiBmdW5jdGlvbihkZXN0aW5hdGlvbikge1xyXG5cclxuICAgIHRoaXMuZGVzdGluYXRpb24gPSBkZXN0aW5hdGlvbjtcclxuXHJcbiAgfSxcclxuXHJcbiAgdXBkYXRlVG9vbHRpcDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgaWYgKHRoaXMuZW50aXR5KSB7XHJcbiAgICAgIGlmICh0aGlzLmVudGl0eS50b29sdGlwKSB0aGlzLmdhbWUudG9vbHRpcCA9IHRoaXMuZW50aXR5LnRvb2x0aXA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmdhbWUudG9vbHRpcCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG59IiwiRU5HSU5FLlJlc291cmNlID0gZnVuY3Rpb24oYXJncykge1xyXG5cclxuICBVdGlscy5leHRlbmQodGhpcywgYXJncyk7XHJcblxyXG4gIHRoaXMucmFkaXVzID0gMzI7XHJcblxyXG4gIHRoaXMuZGlyZWN0aW9uID0gTWF0aC5yYW5kb20oKSAqIDYuMjg7XHJcbiAgdGhpcy5zcGVlZCA9IDMyO1xyXG5cclxuICB0aGlzLmZvcmNlRGlyZWN0aW9uID0gTWF0aC5yYW5kb20oKSAqIDYuMjg7XHJcbiAgdGhpcy5mb3JjZSA9IDY0ICsgTWF0aC5yYW5kb20oKSAqIDEyODtcclxuXHJcbiAgdGhpcy5mb3JjZSAqPSAzO1xyXG4gIHRoaXMuZm9yY2VEYW1waW5nID0gdGhpcy5mb3JjZTtcclxuXHJcbiAgdGhpcy5saWZldGltZSA9IDA7XHJcbiAgdGhpcy5kdXJhdGlvbiA9IDEwO1xyXG5cclxuICB0aGlzLnZhbHVlID0gTWF0aC5yYW5kb20oKSAqIDMgfCAwO1xyXG5cclxuICB0aGlzLnNwcml0ZSA9IHRoaXMuc3ByaXRlc1t0aGlzLnZhbHVlXTtcclxufTtcclxuXHJcbkVOR0lORS5SZXNvdXJjZS5wcm90b3R5cGUgPSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yOiBFTkdJTkUuUmVzb3VyY2UsXHJcblxyXG4gIHF1b3RhOiAwLjcsXHJcblxyXG4gIHNwcml0ZXM6IFtcclxuICAgIFszMzMsIDEwNSwgMTAsIDEwXSxcclxuICAgIFszMjAsIDEwNCwgMTIsIDEyXSxcclxuICAgIFszMDMsIDEwMiwgMTYsIDE2XVxyXG4gIF0sXHJcblxyXG4gIHR5cGU6IFwicmVzb3VyY2VcIixcclxuXHJcblxyXG4gIGNvbGxlY3Q6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHRoaXMuZ2FtZS5yZW1vdmUodGhpcyk7XHJcblxyXG4gICAgaWYgKCF0aGlzLmdhbWUuYmVuY2htYXJrKSBhcHAuc291bmQucGxheShcImNvaW5cIik7XHJcblxyXG4gICAgdGhpcy5nYW1lLnBsYXllci5wb2tlKCk7XHJcblxyXG4gICAgdGhpcy5nYW1lLmFkZChFTkdJTkUuQ2lyY2xlRXhwbG9zaW9uLCB7XHJcbiAgICAgIGNvbG9yOiBcIiNmYzBcIixcclxuICAgICAgcmFkaXVzOiA4LFxyXG4gICAgICBhdHRhY2hlZFRvOiB0aGlzLFxyXG4gICAgICBkdXJhdGlvbjogMC4yNVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5nYW1lLnBsYXllci5yZXNvdXJjZXMgKz0gdGhpcy52YWx1ZTtcclxuXHJcbiAgfSxcclxuXHJcbiAgc3RlcDogZnVuY3Rpb24oZHQpIHtcclxuXHJcbiAgICB0aGlzLmxpZmV0aW1lICs9IGR0O1xyXG5cclxuICAgIHZhciBwbGF5ZXJEaXN0YW5jZSA9IFV0aWxzLmRpc3RhbmNlKHRoaXMsIHRoaXMuZ2FtZS5wbGF5ZXIpO1xyXG5cclxuICAgIGlmICh0aGlzLmZvcmNlKSB7XHJcblxyXG4gICAgICB0aGlzLnggKz0gTWF0aC5jb3ModGhpcy5mb3JjZURpcmVjdGlvbikgKiB0aGlzLmZvcmNlICogZHQ7XHJcbiAgICAgIHRoaXMueSArPSBNYXRoLnNpbih0aGlzLmZvcmNlRGlyZWN0aW9uKSAqIHRoaXMuZm9yY2UgKiBkdDtcclxuXHJcbiAgICAgIHRoaXMuZm9yY2UgPSBNYXRoLm1heCgwLCB0aGlzLmZvcmNlIC0gdGhpcy5mb3JjZURhbXBpbmcgKiBkdCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnBva2VkICYmIHRoaXMuZ2FtZS5jaGVja0JvbnVzKFwibWFnbmV0XCIpKSB7XHJcblxyXG4gICAgICB0aGlzLmRpcmVjdGlvbiA9IE1hdGguYXRhbjIodGhpcy5nYW1lLnBsYXllci55IC0gdGhpcy55LCB0aGlzLmdhbWUucGxheWVyLnggLSB0aGlzLngpO1xyXG5cclxuICAgICAgdGhpcy54ICs9IE1hdGguY29zKHRoaXMuZGlyZWN0aW9uKSAqIHRoaXMuc3BlZWQgKiBkdDtcclxuICAgICAgdGhpcy55ICs9IE1hdGguc2luKHRoaXMuZGlyZWN0aW9uKSAqIHRoaXMuc3BlZWQgKiBkdDtcclxuXHJcblxyXG4gICAgICBpZiAoIXRoaXMuZm9yY2UpIHtcclxuICAgICAgICB0aGlzLnNwZWVkICs9IDI1NiAqIGR0O1xyXG4gICAgICB9XHJcblxyXG4gICAgfSBlbHNlIHtcclxuXHJcbiAgICAgIGlmIChwbGF5ZXJEaXN0YW5jZSA8IDEwMCkge1xyXG4gICAgICAgIHRoaXMucG9rZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc3BlZWQgPSAxMjg7XHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIGlmICh0aGlzLmxpZmV0aW1lID4gMC41KSB7XHJcbiAgICAgIGlmIChwbGF5ZXJEaXN0YW5jZSA8IDMyKSB7XHJcbiAgICAgICAgdGhpcy5jb2xsZWN0KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5saWZldGltZSA+IHRoaXMuZHVyYXRpb24pIHRoaXMuZ2FtZS5yZW1vdmUodGhpcyk7XHJcblxyXG4gIH0sXHJcblxyXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdmFyIHNjYWxlID0gMC4yICsgMC44ICogTWF0aC5zaW4oTWF0aC5QSSAqIChhcHAubGlmZXRpbWUgJSAwLjIgLyAwLjIpKTtcclxuXHJcbiAgICBhcHAuY3R4LnNhdmUoKTtcclxuXHJcbiAgICBhcHAuY3R4LnRyYW5zbGF0ZSh0aGlzLngsIHRoaXMueSk7XHJcblxyXG4gICAgYXBwLmN0eC5zY2FsZShzY2FsZSwgMS4wKTtcclxuXHJcbiAgICBhcHAuY3R4LmRyYXdJbWFnZShhcHAuaW1hZ2VzLnNwcml0ZXNoZWV0LFxyXG4gICAgICB0aGlzLnNwcml0ZVswXSwgdGhpcy5zcHJpdGVbMV0sIHRoaXMuc3ByaXRlWzJdLCB0aGlzLnNwcml0ZVszXSwgLXRoaXMuc3ByaXRlWzJdIC8gMiwgLXRoaXMuc3ByaXRlWzNdIC8gMiwgdGhpcy5zcHJpdGVbMl0sIHRoaXMuc3ByaXRlWzNdXHJcbiAgICApO1xyXG5cclxuICAgIGFwcC5jdHgucmVzdG9yZSgpO1xyXG5cclxuICB9XHJcblxyXG59OyIsIkVOR0lORS5CdXR0b24gPSBmdW5jdGlvbihhcmdzKSB7XHJcblxyXG4gIFV0aWxzLmV4dGVuZCh0aGlzLCB7XHJcblxyXG4gICAgcmFkaXVzOiAzMlxyXG5cclxuICB9LCBhcmdzKTtcclxuXHJcblxyXG4gIHRoaXMuaW1hZ2UgPSBhcHAuaW1hZ2VzLnNwcml0ZXNoZWV0O1xyXG5cclxufTtcclxuXHJcbkVOR0lORS5CdXR0b24ucHJvdG90eXBlID0ge1xyXG5cclxuICBjb25zdHJ1Y3RvcjogRU5HSU5FLkJ1dHRvbixcclxuXHJcbiAgdHlwZTogXCJidXR0b25cIixcclxuXHJcbiAgcG9pbnRlcmVudGVyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICBhcHAudHdlZW4odGhpcykuZGlzY2FyZCgpLnRvKHtcclxuICAgICAgcmFkaXVzOiAyNFxyXG4gICAgfSwgMC4xKS50byh7XHJcbiAgICAgIHJhZGl1czogMzJcclxuICAgIH0sIDAuMiwgXCJvdXRTaW5lXCIpO1xyXG5cclxuICB9LFxyXG5cclxuICBhY3Rpb246IGZ1bmN0aW9uKCkge1xyXG5cclxuXHJcbiAgICBhcHAuc291bmQucGxheShcImxhc2VyXCIpO1xyXG5cclxuICB9LFxyXG5cclxuICBzdGVwOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgfSxcclxuXHJcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuXHJcblxyXG4gICAgaWYgKHRoaXMuc3ByaXRlKSB7XHJcbiAgICAgIHZhciBzY2FsZSA9IHRoaXMucmFkaXVzIC8gMzI7XHJcblxyXG4gICAgICBhcHAuY3R4LnNhdmUoKTtcclxuXHJcbiAgICAgIGFwcC5jdHgudHJhbnNsYXRlKHRoaXMueCwgdGhpcy55KTtcclxuICAgICAgYXBwLmN0eC5kcmF3SW1hZ2UodGhpcy5pbWFnZSxcclxuICAgICAgICB0aGlzLnNwcml0ZVswXSwgdGhpcy5zcHJpdGVbMV0sIHRoaXMuc3ByaXRlWzJdLCB0aGlzLnNwcml0ZVszXSwgLXRoaXMuc3ByaXRlWzJdIC8gMiwgLXRoaXMuc3ByaXRlWzNdIC8gMiwgdGhpcy5zcHJpdGVbMl0sIHRoaXMuc3ByaXRlWzNdXHJcbiAgICAgICk7XHJcblxyXG4gICAgICBhcHAuY3R4LnJlc3RvcmUoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuY291bnQpIHtcclxuICAgICAgYXBwLmxheWVyLnRleHRBbGlnbihcImNlbnRlclwiKS5mb250KFwiYm9sZCAzMnB4IEFyaWFsXCIpLmZpbGxTdHlsZSh0aGlzLmNvbG9yKS5maWxsVGV4dCh0aGlzLmNvdW50LCB0aGlzLngsIHRoaXMueSAtIHRoaXMucmFkaXVzIC0gNDgpO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG59OyIsIkVOR0lORS5QYXJ0aWNsZSA9IGZ1bmN0aW9uKGFyZ3MpIHtcclxuXHJcbiAgVXRpbHMuZXh0ZW5kKHRoaXMsIHtcclxuICAgIGNvbG9yOiBcIiMwZmFcIixcclxuICAgIHJhZGl1czogNFxyXG4gIH0sIGFyZ3MpXHJcblxyXG4gIHRoaXMuc3ByaXRlSW5kZXggPSAwO1xyXG5cclxuICB0aGlzLnJlc2V0KCk7XHJcblxyXG59O1xyXG5cclxuRU5HSU5FLlBhcnRpY2xlLnByb3RvdHlwZSA9IHtcclxuXHJcbiAgY29uc3RydWN0b3I6IEVOR0lORS5QYXJ0aWNsZSxcclxuXHJcbiAgcXVvdGE6IDAuNSxcclxuXHJcbiAgc3ByaXRlczogW1xyXG4gICAgWzAsIDAsIDYsIDZdLFxyXG4gICAgWzAsIDcsIDUsIDVdLFxyXG4gICAgWzAsIDEzLCA1LCA1XSxcclxuICAgIFsxLCAxOSwgMywgM11cclxuICBdLFxyXG5cclxuICByZXNldDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdGhpcy5saWZldGltZSA9IDA7XHJcbiAgICB0aGlzLmR1cmF0aW9uID0gMC41O1xyXG5cclxuICAgIHRoaXMuZGlyZWN0aW9uID0gdGhpcy5nYW1lLnJhbmRvbSgpICogNi4yODtcclxuICAgIHRoaXMuc3BlZWQgPSAzMiArIHRoaXMuZ2FtZS5yYW5kb20oKSAqIDEyODtcclxuXHJcbiAgICB0aGlzLnNwZWVkICo9IDM7XHJcblxyXG4gICAgdGhpcy5kYW1waW5nID0gdGhpcy5zcGVlZCAqIDI7XHJcblxyXG4gIH0sXHJcblxyXG4gIHN0ZXA6IGZ1bmN0aW9uKGR0KSB7XHJcblxyXG4gICAgdGhpcy5saWZldGltZSArPSBkdDtcclxuXHJcbiAgICB0aGlzLnggKz0gTWF0aC5jb3ModGhpcy5kaXJlY3Rpb24pICogdGhpcy5zcGVlZCAqIGR0O1xyXG4gICAgdGhpcy55ICs9IE1hdGguc2luKHRoaXMuZGlyZWN0aW9uKSAqIHRoaXMuc3BlZWQgKiBkdDtcclxuXHJcbiAgICB0aGlzLnNwZWVkID0gTWF0aC5tYXgoMCwgdGhpcy5zcGVlZCAtIHRoaXMuZGFtcGluZyAqIGR0KTtcclxuXHJcbiAgICB0aGlzLnByb2dyZXNzID0gTWF0aC5taW4odGhpcy5saWZldGltZSAvIHRoaXMuZHVyYXRpb24sIDEuMCk7XHJcblxyXG4gICAgaWYgKHRoaXMucHJvZ3Jlc3MgPj0gMS4wKSB7XHJcbiAgICAgIHRoaXMueCA9IDA7XHJcbiAgICAgIHRoaXMueSA9IDA7XHJcbiAgICAgIHRoaXMucHJvZ3Jlc3MgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc3ByaXRlSW5kZXggPSB0aGlzLnByb2dyZXNzICogdGhpcy5zcHJpdGVzLmxlbmd0aCB8IDA7XHJcblxyXG4gIH0sXHJcblxyXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcblxyXG5cclxuICAgIC8vIHZhciBzID0gdGhpcy5zaXplICogKDEgLSB0aGlzLnByb2dyZXNzKTtcclxuXHJcbiAgICAvLyBpZiAocyA+IDApIHtcclxuICAgIGlmICh0aGlzLnByb2dyZXNzID49IDEuMCkgcmV0dXJuO1xyXG5cclxuICAgIHRoaXMuaW1hZ2UgPSBhcHAuZ2V0Q29sb3JlZEltYWdlKGFwcC5pbWFnZXMucGFydGljbGVzLCB0aGlzLmNvbG9yIHx8IFwiIzBmYVwiKTtcclxuXHJcbiAgICAvLyBhcHAuY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XHJcbiAgICAvLyBhcHAuY3R4LmZpbGxSZWN0KHRoaXMueCAtIHMgLyAyLCB0aGlzLnkgLSBzIC8gMiwgcywgcylcclxuXHJcbiAgICB2YXIgc3ByaXRlID0gdGhpcy5zcHJpdGVzW3RoaXMuc3ByaXRlSW5kZXhdO1xyXG5cclxuICAgIGFwcC5jdHguZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIHNwcml0ZVswXSwgc3ByaXRlWzFdLCBzcHJpdGVbMl0sIHNwcml0ZVszXSxcclxuICAgICAgdGhpcy54LCB0aGlzLnksIHNwcml0ZVsyXSwgc3ByaXRlWzNdKVxyXG5cclxuICAgIC8vIH1cclxuXHJcbiAgfVxyXG5cclxufTsiLCJFTkdJTkUuUGxhbmV0ID0gZnVuY3Rpb24oYXJncykge1xyXG5cclxuICBVdGlscy5leHRlbmQodGhpcywge1xyXG5cclxuICAgIHJhZGl1czogNDgsXHJcbiAgICBocDogMjAsXHJcbiAgICBtYXg6IDEwMCxcclxuICAgIHNoaXBzOiAwLFxyXG4gICAgcmVwYWlyUHJvZ3Jlc3M6IDAsXHJcbiAgICByZXBhaXJUaW1lOiA0LFxyXG4gICAgYXN0ZXJvaWRzU2hpZWxkOiB0cnVlLFxyXG4gICAgc2hpZWxkU2NhbGU6IDAuMFxyXG5cclxuICB9LCBhcmdzKTtcclxuXHJcbiAgdGhpcy5tYXhIUCA9IHRoaXMuaHA7XHJcblxyXG4gIHRoaXMubGlmZXRpbWUgPSAwO1xyXG5cclxufTtcclxuXHJcbkVOR0lORS5QbGFuZXQucHJvdG90eXBlID0ge1xyXG5cclxuICBjb25zdHJ1Y3RvcjogRU5HSU5FLlBsYW5ldCxcclxuXHJcbiAgdHlwZTogXCJwbGFuZXRcIixcclxuXHJcbiAgaG92ZXJhYmxlOiBcInJlcGFpclwiLFxyXG5cclxuICBzcHJpdGU6IFsyMDEsIDIxNSwgMTA0LCAxMDRdLFxyXG5cclxuICBzaGllbGRTcHJpdGU6IFs0OTIsIDMyMCwgMTI0LCAxMjRdLFxyXG5cclxuICByZXBhaXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHRoaXMuaHArKztcclxuXHJcbiAgfSxcclxuXHJcbiAgYXBwbHlEYW1hZ2U6IGZ1bmN0aW9uKGRhbWFnZSwgYXR0YWNrZXIpIHtcclxuXHJcbiAgICB0aGlzLmdhbWUuc2hha2UoKTtcclxuXHJcbiAgICB0aGlzLmhwLS07XHJcblxyXG4gICAgaWYgKHRoaXMuaHAgPD0gMCAmJiAhdGhpcy5nYW1lLmJlbmNobWFyaykgdGhpcy5nYW1lLmdhbWVvdmVyKCk7XHJcblxyXG4gICAgaWYgKCF0aGlzLmdhbWUuYmVuY2htYXJrKSBhcHAuc291bmQucGxheShcInBsYW5ldEhpdFwiKTtcclxuXHJcbiAgICB0aGlzLmdhbWUuYWRkKEVOR0lORS5DaXJjbGVFeHBsb3Npb24sIHtcclxuICAgICAgeDogYXR0YWNrZXIueCxcclxuICAgICAgeTogYXR0YWNrZXIueSxcclxuICAgICAgY29sb3I6IFwiI2EwNFwiLFxyXG4gICAgICByYWRpdXM6IDMyXHJcbiAgICB9KVxyXG5cclxuICB9LFxyXG5cclxuICBzdGVwOiBmdW5jdGlvbihkdCkge1xyXG5cclxuICAgIHRoaXMubGlmZXRpbWUgKz0gZHQ7XHJcblxyXG4gICAgdmFyIHByZXZTaGllbGQgPSB0aGlzLmFzdGVyb2lkc1NoaWVsZDtcclxuICAgIHRoaXMuYXN0ZXJvaWRzU2hpZWxkID0gZmFsc2U7dGhpcy5nYW1lLmNoZWNrQm9udXMoXCJzaGllbGRcIik7XHJcblxyXG4gICAgaWYgKHByZXZTaGllbGQgIT09IHRoaXMuYXN0ZXJvaWRzU2hpZWxkKSB7XHJcblxyXG4gICAgICBhcHAudHdlZW4odGhpcykuZGlzY2FyZCgpLnRvKHtcclxuICAgICAgICBzaGllbGRTY2FsZTogdGhpcy5hc3Rlcm9pZHNTaGllbGQgPyAxLjAgOiAwLjBcclxuICAgICAgfSwgMC41LCBcIm91dEVsYXN0aWNcIik7XHJcblxyXG4gICAgfVxyXG5cclxuICB9LFxyXG5cclxuICBzcGF3blNoaXA6IGZ1bmN0aW9uKHR5cGUpIHtcclxuXHJcbiAgICB2YXIgc2hpcCA9IHRoaXMuZ2FtZS5hZGQoRU5HSU5FLlNoaXAsIHtcclxuICAgICAgeDogdGhpcy54LFxyXG4gICAgICB5OiB0aGlzLnksXHJcbiAgICAgIHR5cGU6IHR5cGUsXHJcbiAgICAgIHRlYW06IDEsXHJcbiAgICAgIHBsYW5ldDogdGhpc1xyXG4gICAgfSk7XHJcblxyXG4gICAgc2hpcC5mb3JjZURpcmVjdGlvbiA9IE1hdGgucmFuZG9tKCkgKiA2O1xyXG4gICAgc2hpcC5mb3JjZSA9IDIwMDtcclxuXHJcbiAgICB0aGlzLnNoaXBzKys7XHJcblxyXG4gIH0sXHJcblxyXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgYXBwLmxheWVyLmFsaWduKDAuNSwgMC41KTtcclxuICAgIGFwcC5sYXllci5kcmF3UmVnaW9uKGFwcC5pbWFnZXMuc3ByaXRlc2hlZXQsIHRoaXMuc3ByaXRlLCB0aGlzLngsIHRoaXMueSk7XHJcbiAgICBhcHAubGF5ZXIudGV4dEFsaWduKFwiY2VudGVyXCIpLmZvbnQoXCJib2xkIDQ4cHggQXJpYWxcIikuZmlsbFN0eWxlKFwiI2ZmZlwiKS5maWxsVGV4dCh0aGlzLmhwLCB0aGlzLngsIHRoaXMueSAtIDI0KTtcclxuICAgIGFwcC5sYXllci5yZWFsaWduKCk7XHJcblxyXG4gICAgaWYgKHRoaXMuYXN0ZXJvaWRzU2hpZWxkICYmIHRoaXMuc2hpZWxkU2NhbGUgPiAwKSB7XHJcbiAgICAgIHZhciBzY2FsZSA9IHRoaXMuc2hpZWxkU2NhbGU7XHJcbiAgICAgIGFwcC5jdHguc2F2ZSgpO1xyXG4gICAgICBhcHAuY3R4Lmdsb2JhbEFscGhhID0gMC41O1xyXG4gICAgICBhcHAuY3R4Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IFwibGlnaHRlclwiO1xyXG4gICAgICBhcHAuY3R4LnRyYW5zbGF0ZSh0aGlzLngsIHRoaXMueSk7XHJcbiAgICAgIGFwcC5jdHguc2NhbGUoc2NhbGUsIHNjYWxlKTtcclxuICAgICAgYXBwLmN0eC5kcmF3SW1hZ2UoYXBwLmltYWdlcy5zcHJpdGVzaGVldCwgdGhpcy5zaGllbGRTcHJpdGVbMF0sIHRoaXMuc2hpZWxkU3ByaXRlWzFdLCB0aGlzLnNoaWVsZFNwcml0ZVsyXSwgdGhpcy5zaGllbGRTcHJpdGVbM10sIC10aGlzLnNoaWVsZFNwcml0ZVsyXSAvIDIsIC10aGlzLnNoaWVsZFNwcml0ZVszXSAvIDIsIHRoaXMuc2hpZWxkU3ByaXRlWzJdLCB0aGlzLnNoaWVsZFNwcml0ZVszXSk7XHJcbiAgICAgIGFwcC5jdHgucmVzdG9yZSgpO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG59OyIsIi8qIFRoZSBjb3VudGVyIGluIHRoZSB0b3AtbGVmdCBjb3JuZXIgaXM6XHJcblxyXG5BVkVSQUdFIEZSQU1FIFRJTUUgfCAgREVWSUNFICBQT1dFUiAgIHwgRU5USVRJRVMgQ09VTlRcclxuICAgICAgICAgICAgICAgICAgICAgKGJhc2VsaW5lRmFjdG9yKVxyXG4qL1xyXG5cclxuXHJcbi8qIFJlZmVyZW5jZSBiYXNlbGluZSB0byBjYWxjdWxhdGUgZGV2aWNlIHBvd2VyICovXHJcblxyXG5SRUZFUkVOQ0VfQkFTRUxJTkUgPSAzNzg7XHJcblxyXG4vKiBSZWZlcmVuY2UgZnJhbWUgdGltZSB0byB0ZWxsIGhvdyB3ZWxsIHRoZSBnYW1lIGhhcyBiZWVuIG9wdGltaXplZCAqL1xyXG4vKiBNYWtlIGl0IGhpZ2hlciB0byBnaXZlIHVzZXIgbW9yZSBDUFUgcG93ZXIgKi9cclxuXHJcblJFRkVSRU5DRV9GUkFNRV9USU1FID0gMC44O1xyXG5cclxuLyogSG93IG11Y2ggb3B0aW1pemF0aW9uIHZhbHVlIG9uZSBzaGlwIGRyYWlucyAqL1xyXG5cclxuU0hJUF9DUFVfQ09TVCA9IDAuMTtcclxuXHJcbkVOR0lORS5HYW1lID0ge1xyXG5cclxuICBib251c2VzOiB7XHJcblxyXG4gICAgbWFnbmV0OiAwLjEsXHJcbiAgICBsYXNlcjogMC4yLFxyXG4gICAgc2hpZWxkOiAwLjRcclxuXHJcbiAgfSxcclxuXHJcbiAgZXhwbG9zaW9uOiBmdW5jdGlvbih4LCB5LCBjb3VudCwgY29sb3IpIHtcclxuXHJcbiAgICBpZiAoIXRoaXMucGFydGljbGVzUG9vbCkge1xyXG5cclxuICAgICAgdGhpcy5wYXJ0aWNsZXNQb29sID0gW107XHJcblxyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XHJcblxyXG4gICAgICAgIHZhciBwYXJ0aWNsZSA9IHRoaXMuYWRkKEVOR0lORS5QYXJ0aWNsZSwge1xyXG4gICAgICAgICAgeDogeCxcclxuICAgICAgICAgIHk6IHlcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5wYXJ0aWNsZXNQb29sLnB1c2gocGFydGljbGUpO1xyXG5cclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5wYXJ0aWNsZUluZGV4ID0gMDtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPD0gY291bnQ7IGkrKykge1xyXG5cclxuICAgICAgaWYgKCsrdGhpcy5wYXJ0aWNsZUluZGV4ID49IHRoaXMucGFydGljbGVzUG9vbC5sZW5ndGgpIHRoaXMucGFydGljbGVJbmRleCA9IDA7O1xyXG5cclxuICAgICAgdmFyIHBhcnRpY2xlID0gdGhpcy5wYXJ0aWNsZXNQb29sW3RoaXMucGFydGljbGVJbmRleF07XHJcblxyXG4gICAgICBwYXJ0aWNsZS54ID0geDtcclxuICAgICAgcGFydGljbGUueSA9IHk7XHJcbiAgICAgIHBhcnRpY2xlLmNvbG9yID0gY29sb3I7XHJcblxyXG4gICAgICBwYXJ0aWNsZS5yZXNldCgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgfSxcclxuXHJcbiAgcmFuZG9tOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5iZW5jaG1hcmsgPyAwLjUgOiBNYXRoLnJhbmRvbSgpO1xyXG5cclxuICB9LFxyXG5cclxuICBhZGQ6IGZ1bmN0aW9uKGNvbnN0cnVjdG9yLCBhcmdzKSB7XHJcblxyXG4gICAgYXJncyA9IGFyZ3MgfHwge307XHJcblxyXG4gICAgYXJncy5nYW1lID0gdGhpcztcclxuXHJcbiAgICB2YXIgZW50aXR5ID0gbmV3IGNvbnN0cnVjdG9yKGFyZ3MpO1xyXG5cclxuICAgIHRoaXMuZW50aXRpZXMucHVzaChlbnRpdHkpO1xyXG5cclxuICAgIHJldHVybiBlbnRpdHk7XHJcblxyXG4gIH0sXHJcblxyXG4gIHJlbW92ZTogZnVuY3Rpb24oZW50aXR5KSB7XHJcblxyXG4gICAgZW50aXR5LmRlYWQgPSB0cnVlO1xyXG5cclxuICB9LFxyXG5cclxuICBzY2FsZUNvbWljQnViYmxlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB0aGlzLmNvbWljU2NhbGUgPSAxLjA7XHJcblxyXG4gICAgJGNvbWljYnViYmxlID0gZG9jdW1lbnQuYm9keS5xdWVyeVNlbGVjdG9yKFwiI2NvbWljYnViYmxlXCIpO1xyXG5cclxuICAgIHZhciB0d2VlbiA9IGFwcC50d2Vlbih0aGlzKS50byh7XHJcbiAgICAgIGNvbWljU2NhbGU6IDAuNVxyXG4gICAgfSk7XHJcblxyXG4gICAgdHdlZW4ub25zdGVwID0gZnVuY3Rpb24oYXBwKSB7XHJcblxyXG4gICAgICAkY29taWNidWJibGUuc3R5bGUudHJhbnNmb3JtID0gXCJzY2FsZShcIiArIGFwcC5jb21pY1NjYWxlICsgXCIsXCIgKyBhcHAuY29taWNTY2FsZSArIFwiKVwiO1xyXG5cclxuICAgIH1cclxuXHJcbiAgfSxcclxuXHJcbiAgZW50ZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgaWYgKHdpbmRvdy5nYSkge1xyXG4gICAgICBnYSgnc2VuZCcsICdzY3JlZW52aWV3Jywge1xyXG4gICAgICAgICdhcHBOYW1lJzogJ1Bvd2VyU3VyZ2UnLFxyXG4gICAgICAgICdzY3JlZW5OYW1lJzogJ0dhbWUnXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGFwcC5yZW5kZXJlci5zZXRTbW9vdGhpbmcoZmFsc2UpO1xyXG5cclxuICAgIHRoaXMuc2NhbGVDb21pY0J1YmJsZSgpO1xyXG5cclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiYmFzZWxpbmVcIiwgYXBwLmJhc2VsaW5lKTtcclxuXHJcbiAgICB0aGlzLm11c2ljID0gYXBwLm11c2ljLnBsYXkoXCJkdXN0XCIpLnZvbHVtZSgwLjUpLmZhZGVJbig0KS5sb29wKCk7XHJcblxyXG4gICAgdGhpcy5ncmFkaWVudCA9IGFwcC5jdHguY3JlYXRlUmFkaWFsR3JhZGllbnQoYXBwLmNlbnRlci54LCBhcHAuY2VudGVyLnksIDAsIGFwcC5jZW50ZXIueCwgYXBwLmNlbnRlci55LCBhcHAuY2VudGVyLngpO1xyXG5cclxuICAgIHRoaXMuZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAuMCwgXCJ0cmFuc3BhcmVudFwiKTtcclxuICAgIHRoaXMuZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDEuMCwgXCIjMDAwXCIpO1xyXG5cclxuICAgIHRoaXMucmVzZXQoKTtcclxuXHJcbiAgfSxcclxuXHJcbiAgbGVhdmU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHRoaXMubXVzaWMuZmFkZU91dCgyKTtcclxuXHJcbiAgfSxcclxuXHJcbiAgZ2V0U2NhbGU6IGZ1bmN0aW9uKGVudGl0eSkge1xyXG5cclxuICAgIHJldHVybiAxIC0gTWF0aC5taW4oMS4wLCBVdGlscy5kaXN0YW5jZShlbnRpdHksIGFwcC5jZW50ZXIpIC8gKGFwcC53aWR0aCAqIDAuNSkpICogMC43NTtcclxuXHJcbiAgfSxcclxuXHJcbiAgc3Bhd25Bc3Rlcm9pZDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdmFyIGFuZ2xlID0gTWF0aC5yYW5kb20oKSAqIE1hdGguUEkgKiAyO1xyXG4gICAgdmFyIHJhZGl1cyA9IGFwcC53aWR0aCAvIDI7XHJcbiAgICB2YXIgb3ggPSBNYXRoLmNvcyhhbmdsZSkgKiByYWRpdXM7XHJcbiAgICB2YXIgb3kgPSBNYXRoLnNpbihhbmdsZSkgKiByYWRpdXM7XHJcblxyXG4gICAgdGhpcy5hZGQoRU5HSU5FLkFzdGVyb2lkLCB7XHJcbiAgICAgIHg6IGFwcC5jZW50ZXIueCArIG94LFxyXG4gICAgICB5OiBhcHAuY2VudGVyLnkgKyBveVxyXG4gICAgfSk7XHJcblxyXG4gIH0sXHJcblxyXG4gIHJlc2V0OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB0aGlzLnNwYXduVGltZW91dCA9IDA7XHJcbiAgICB0aGlzLmNwdVVzYWdlID0gMDtcclxuICAgIHRoaXMuY3B1QmFyUHJvZ3Jlc3MgPSAwO1xyXG5cclxuICAgIHRoaXMudXBncmFkZXMgPSB7XHJcblxyXG4gICAgICBzcGVlZDogMSxcclxuICAgICAgZGFtYWdlOiAxLFxyXG4gICAgICBsaWZlOiAxXHJcblxyXG4gICAgfTtcclxuXHJcbiAgICBkZWxldGUgdGhpcy5wYXJ0aWNsZXNQb29sO1xyXG5cclxuICAgIHRoaXMuc2NvcmUgPSAwO1xyXG5cclxuICAgIHRoaXMud2F2ZSA9IDA7XHJcblxyXG4gICAgdGhpcy50b29sdGlwID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5lbnRpdGllcyA9IFtdO1xyXG5cclxuICAgIHRoaXMuc3RhcnMgPSB0aGlzLmFkZChFTkdJTkUuQmFja2dyb3VuZFN0YXJzKTtcclxuXHJcbiAgICB0aGlzLnBsYXllclBsYW5ldCA9IHRoaXMuYWRkKEVOR0lORS5QbGFuZXQsIHtcclxuICAgICAgeDogYXBwLmNlbnRlci54LFxyXG4gICAgICB5OiBhcHAuY2VudGVyLnksXHJcbiAgICAgIHRlYW06IDFcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMucGxheWVyID0gbmV3IEVOR0lORS5DdXJzb3IodGhpcywgMSwgdGhpcy5wbGF5ZXJQbGFuZXQpO1xyXG5cclxuICAgIHRoaXMucGxheWVyLnggPSBhcHAuY2VudGVyLng7XHJcbiAgICB0aGlzLnBsYXllci55ID0gYXBwLmNlbnRlci55O1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgODsgaSsrKSB7XHJcblxyXG4gICAgICB0aGlzLnNwYXduQXN0ZXJvaWQoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGJ1dHRvbnMgPSBbXCJzcGVlZFwiLCBcImxpZmVcIiwgXCJkYW1hZ2VcIl07XHJcblxyXG4gICAgdGhpcy5idXR0b25zID0ge307XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBidXR0b25zLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICB2YXIga2V5ID0gYnV0dG9uc1tpXTtcclxuXHJcbiAgICAgIHRoaXMuYnV0dG9uc1trZXldID0gdGhpcy5hZGQoRU5HSU5FLkJ1dHRvbiwge1xyXG4gICAgICAgIGNvbG9yOiBkZWZzLnRlYW1Db2xvclsxXSxcclxuICAgICAgICB4OiBhcHAuY2VudGVyLnggLSA4MCArIGkgKiAxMDAsXHJcbiAgICAgICAgeTogYXBwLmhlaWdodCAtIDcwLFxyXG4gICAgICAgIHNwcml0ZTogZGVmcy5idXR0b25zW2tleV0sXHJcbiAgICAgICAga2V5OiBrZXksXHJcbiAgICAgICAgY291bnQ6IDEsXHJcbiAgICAgICAgaG92ZXJhYmxlOiBcImJ1aWxkXCIsXHJcbiAgICAgICAgdG9vbHRpcDogZGVmcy50b29sdGlwc1trZXldXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5uZXh0V2F2ZSgpO1xyXG5cclxuICAgIHRoaXMuZXhwbG9zaW9uKGFwcC5jZW50ZXIueCwgYXBwLmNlbnRlci55LCAxKTtcclxuXHJcbiAgfSxcclxuXHJcbiAgY3B1SGlzdG9yeTogW10sXHJcblxyXG4gIHN0ZXA6IGZ1bmN0aW9uKGR0KSB7XHJcblxyXG4gICAgdmFyIGJlZm9yZSA9IHBlcmZvcm1hbmNlLm5vdygpO1xyXG5cclxuICAgIC8qIHNsb3cgbW90aW9uIC0gd2hlbiB5b3UgY29sbGVjdCBmcmVlemUgcG93ZXJ1cCAqL1xyXG5cclxuICAgIHRoaXMudGltZUZhY3RvciA9IDEuMDtcclxuXHJcbiAgICBpZiAodGhpcy5mcmVlemVMaWZlc3BhbiA+IDApIHtcclxuXHJcbiAgICAgIHRoaXMuZnJlZXplTGlmZXNwYW4gLT0gZHQ7XHJcbiAgICAgIHRoaXMudGltZUZhY3RvciA9IDAuMTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyogdXBkYXRlIHRoZSBnYW1lIDEwIHRpbWVzIHRvIG1hZ25pdHVkZSByZXN1bHRzIGluIHByb2ZpbGVyICovXHJcblxyXG4gICAgdmFyIE1BR05JRlkgPSA1O1xyXG5cclxuICAgIHZhciBxdW90YSA9IDAuMDtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZW50aXRpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgdmFyIGVudGl0eSA9IHRoaXMuZW50aXRpZXNbaV07XHJcbiAgICAgIHF1b3RhICs9IGVudGl0eS5xdW90YSB8fCAwLjc7XHJcblxyXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IE1BR05JRlk7IGorKykge1xyXG4gICAgICAgIGVudGl0eS5zdGVwKGR0IC8gTUFHTklGWSk7XHJcblxyXG4gICAgICAgIGlmIChlbnRpdHkuZGVhZCkge1xyXG4gICAgICAgICAgdGhpcy5lbnRpdGllcy5zcGxpY2UoaS0tLCAxKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucXVvdGEgPSBxdW90YTtcclxuXHJcbiAgICB2YXIgZnJhbWVUaW1lID0gKHBlcmZvcm1hbmNlLm5vdygpIC0gYmVmb3JlKSAvIE1BR05JRlk7XHJcblxyXG4gICAgLyogbWVhc3VyZSBvcHRpbWl6YXRpb24gKi9cclxuXHJcbiAgICAvKiBJdCdzIHRoZSBhdmVyYWdlIG9mIDEwMCBmcmFtZSB0aW1lcyAqL1xyXG5cclxuICAgIC8qXHJcblxyXG4gICAgICBiYXNlbGluZUZhY3RvciAgICAgIC0gYmFzZWxpbmUgdnMgcmVmZXJlbmNlIHNhbXBsZSB0byBnZXQgZGV2aWNlIHBvd2VyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiB0aGUgZGV2aWNlIGlzIG92ZXItcG93ZXJlZCB3ZSBhcnRpZmljaWFseVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFrZSBmcmFtZVRpbWUgaGlnaGVyIHRvIG1ha2UgaXQgbW9yZSBmYWlyIGFtb25nIHRoZSBwbGF5ZXJzXHJcblxyXG4gICAgICBvcHRpbWl6YXRpb25SYXRpbmcgIC0gcmVmZXJlbmNlIGZyYW1lIHRpbWUgZGl2aWRlZCBieSAoY3VycmVudCkgYXZlcmFnZSBmcmFtZSB0aW1lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kaWNhcGVkIGJ5IGJhc2VsaW5lRmFjdG9yIC0gdGhpcyBnaXZlcyBhIGZhY3RvciBvZlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaG93IHdlbGwgdXNlciBvcHRpbWl6ZWQgdGhlIGdhbWVcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYWtlIFJFRkVSRU5DRV9GUkFNRV9USU1FIGhpZ2hlciB0byBnaXZlIHBsYXllciBNT1JFIGNwdSBvdXRwdXRcclxuXHJcbiAgICAqL1xyXG5cclxuXHJcbiAgICB0aGlzLmNwdUhpc3RvcnkucHVzaChmcmFtZVRpbWUgLyBxdW90YSk7XHJcblxyXG4gICAgaWYgKHRoaXMuY3B1SGlzdG9yeS5sZW5ndGggPiA2MCkgdGhpcy5jcHVIaXN0b3J5LnNoaWZ0KCk7XHJcblxyXG4gICAgdGhpcy5hdmVyYWdlRnJhbWVUaW1lID0gdGhpcy5hdmVyYWdlKHRoaXMuY3B1SGlzdG9yeSk7XHJcblxyXG4gICAgdGhpcy5vcHRpbWl6YXRpb25SYXRpbmcgPSAoKDAuOCAvIGFwcC5iYXNlbGluZSkgLyAodGhpcy5hdmVyYWdlRnJhbWVUaW1lKSk7XHJcblxyXG4gICAgdGhpcy5wbGF5ZXIuc3RlcChkdCk7XHJcblxyXG4gICAgLyogdXNlIG9wdGltaXphdGlvbiByZXN1bHRzIHRvIGFmZmVjdCB0aGUgZ2FtZSAqL1xyXG5cclxuICAgIHRoaXMuYXBwbHlPcHRpbWl6YXRpb24oZHQpO1xyXG5cclxuXHJcbiAgfSxcclxuXHJcbiAgYXZlcmFnZTogZnVuY3Rpb24oYXJyYXkpIHtcclxuXHJcbiAgICBpZiAoIWFycmF5Lmxlbmd0aCkgcmV0dXJuIDA7XHJcblxyXG4gICAgdmFyIHN1bSA9IDA7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICBzdW0gKz0gYXJyYXlbaV07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHN1bSAvIGFycmF5Lmxlbmd0aDtcclxuXHJcbiAgfSxcclxuXHJcbiAgYXBwbHlPcHRpbWl6YXRpb246IGZ1bmN0aW9uKGR0KSB7XHJcblxyXG4gICAgdmFyIGNwdVVzYWdlID0gMDtcclxuXHJcbiAgICAvKiBjYWxjdWxhdGUgKGFydGlmaWNpYWwpIGNwdVVzYWdlIG9mIHNoaXBzXHJcbiAgICAgICBpZiBjcHVVc2FnZSBpcyBncmVhdGVyIHRoYW4gb3B0aW1pemF0aW9uUmF0aW5nXHJcbiAgICAgICBmcmVlemUgYSBzaGlwXHJcbiAgICAqL1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5lbnRpdGllcy5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgdmFyIGVudGl0eSA9IHRoaXMuZW50aXRpZXNbaV07XHJcblxyXG4gICAgICBpZiAoIShlbnRpdHkgaW5zdGFuY2VvZiBFTkdJTkUuU2hpcCkpIGNvbnRpbnVlO1xyXG4gICAgICBpZiAoIWVudGl0eS50ZWFtKSBjb250aW51ZTtcclxuICAgICAgaWYgKGVudGl0eS5mcmVlKSBjb250aW51ZTtcclxuXHJcbiAgICAgIGNwdVVzYWdlICs9IFNISVBfQ1BVX0NPU1Q7XHJcblxyXG4gICAgICBpZiAoY3B1VXNhZ2UgPCB0aGlzLm9wdGltaXphdGlvblJhdGluZykge1xyXG5cclxuICAgICAgICBlbnRpdHkuZnJvemVuID0gZmFsc2U7XHJcblxyXG4gICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICBlbnRpdHkuZnJvemVuID0gdHJ1ZTtcclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyogdHdlZW4gY3B1VXNhZ2UgaW5zdGVhZCBvZiBzZXR0aW5nIGl0IGluc3RhbnRseSAobGVzcyBqaXR0ZXJpbmcpICovXHJcblxyXG4gICAgdGhpcy5jcHVVc2FnZSA9IFV0aWxzLm1vdmVUbyh0aGlzLmNwdVVzYWdlLCBjcHVVc2FnZSwgTWF0aC5hYnModGhpcy5jcHVVc2FnZSAtIGNwdVVzYWdlKSAqIDAuMjUgKiBkdCk7XHJcbiAgICB0aGlzLnJlYWxDcHVVc2FnZSA9IGNwdVVzYWdlO1xyXG5cclxuICAgIC8qIHRoYXQncyB0aGUgdmFsdWUgMC4wIC0gMS4wIHRoYXQgY29yZXNwb25kcyB3aXRoIHRoZSB5ZWxsb3cgcG93ZXIgYmFyICovXHJcblxyXG4gICAgdGhpcy5jcHVSYXRpbyA9IDEgLSBNYXRoLm1pbigxLjAsIHRoaXMuY3B1VXNhZ2UgLyB0aGlzLm9wdGltaXphdGlvblJhdGluZyk7XHJcbiAgICB0aGlzLmNwdUJhclByb2dyZXNzID0gVXRpbHMubW92ZVRvKHRoaXMuY3B1QmFyUHJvZ3Jlc3MsIHRoaXMuY3B1UmF0aW8sIDAuMiAqIGR0KTtcclxuXHJcbiAgICAvKiBzcGF3biBzaGlwcyBpZiB0aGVyZSBpcyBlbm91Z2ggcG93ZXIgKi9cclxuXHJcbiAgICBpZiAoKHRoaXMuc3Bhd25UaW1lb3V0IC09IGR0KSA8PSAwKSB7XHJcblxyXG4gICAgICB0aGlzLnNwYXduVGltZW91dCA9IDAuNTtcclxuXHJcbiAgICAgIC8vaWYgKHRoaXMuY3B1UmF0aW8gPiAwLjUpIHRoaXMucGxheWVyUGxhbmV0LnNwYXduU2hpcChcImZpZ2h0ZXJcIik7XHJcbiAgICAgIGlmICh0aGlzLm9wdGltaXphdGlvblJhdGluZyA+IHRoaXMucmVhbENwdVVzYWdlICsgMC4xKSB0aGlzLnBsYXllclBsYW5ldC5zcGF3blNoaXAoXCJmaWdodGVyXCIpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgfSxcclxuXHJcbiAgc2hha2U6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHRoaXMuc2hha2VMaWZlc3BhbiA9IDAuNDtcclxuXHJcbiAgfSxcclxuXHJcbiAgcmVuZGVyOiBmdW5jdGlvbihkdCkge1xyXG5cclxuICAgIGlmICghdGhpcy5hdmVyYWdlRnJhbWVUaW1lKSByZXR1cm47XHJcblxyXG4gICAgYXBwLmN0eC50ZXh0QmFzZWxpbmUgPSBcInRvcFwiO1xyXG4gICAgYXBwLmN0eC5zYXZlKCk7XHJcblxyXG4gICAgYXBwLmN0eC5maWxsU3R5bGUgPSBcIiMyODIyNDVcIjtcclxuICAgIGFwcC5jdHguZmlsbFJlY3QoMCwgMCwgYXBwLndpZHRoLCBhcHAuaGVpZ2h0KTtcclxuXHJcbiAgICAvLyBhcHAuY3R4LmZpbGxTdHlsZSA9IHRoaXMuZ3JhZGllbnQ7XHJcbiAgICAvL2FwcC5jdHguZmlsbFJlY3QoMCwgMCwgYXBwLndpZHRoLCBhcHAuaGVpZ2h0KTtcclxuXHJcbiAgICBpZiAodGhpcy5zaGFrZUxpZmVzcGFuID4gMCkge1xyXG4gICAgICB0aGlzLnNoYWtlTGlmZXNwYW4gLT0gZHQ7XHJcbiAgICAgIHZhciBjaGFvcyA9IFV0aWxzLnJhbmRvbSgtNiwgNik7XHJcbiAgICAgIGFwcC5jdHgudHJhbnNsYXRlKGNoYW9zLCBjaGFvcylcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZW50aXRpZXMubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgIHRoaXMuZW50aXRpZXNbaV0ucmVuZGVyKCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucGxheWVyLnJlbmRlcigpO1xyXG5cclxuICAgIHRoaXMucmVuZGVyVG9vbHRpcCgpO1xyXG5cclxuICAgIGFwcC5jdHgudGV4dEFsaWduID0gXCJyaWdodFwiO1xyXG4gICAgYXBwLmN0eC5mb250ID0gXCJib2xkIDE2cHggQXJpYWxcIjtcclxuICAgIGFwcC5jdHguZmlsbFN0eWxlID0gXCIjZmZmXCI7XHJcbiAgICBhcHAuY3R4LmZpbGxUZXh0KFwiU0NPUkU6IFwiICsgdGhpcy5zY29yZSwgYXBwLndpZHRoIC0gMjAsIDIwKTtcclxuXHJcbiAgICB0aGlzLnJlbmRlckNQVUJhcigpO1xyXG4gICAgLy8gdGhpcy5yZW5kZXJCb251c2VzKCk7XHJcblxyXG4gICAgYXBwLmN0eC50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xyXG4gICAgYXBwLmN0eC5mb250ID0gXCJib2xkIDY0cHggQXJpYWxcIjtcclxuICAgIGFwcC5jdHguZmlsbFN0eWxlID0gXCIjZmEwXCI7XHJcbiAgICBhcHAuY3R4LmZpbGxUZXh0KHRoaXMucGxheWVyLnJlc291cmNlcywgYXBwLmNlbnRlci54IC0gMTgwLCBhcHAuaGVpZ2h0IC0gMTA0KTtcclxuXHJcbiAgICAvLyBhcHAuY3R4LnRleHRBbGlnbiA9IFwibGVmdFwiO1xyXG4gICAgLy8gYXBwLmN0eC5mb250ID0gXCJib2xkIDE2cHggQXJpYWxcIjtcclxuICAgIC8vIGFwcC5jdHguZmlsbFN0eWxlID0gXCIjZmZmXCI7XHJcbiAgICAvLyBhcHAuY3R4LmZpbGxUZXh0KFxyXG4gICAgLy8gICB0aGlzLm9wdGltaXphdGlvblJhdGluZy50b0ZpeGVkKDIpICsgXCIgfCBcIiArXHJcbiAgICAvLyAgIC8vIHRoaXMuYmFzZWxpbmVGYWN0b3IudG9GaXhlZCgyKSArIFwiIHwgXCIgK1xyXG4gICAgLy8gICB0aGlzLmVudGl0aWVzLmxlbmd0aCArICcgKyAnICtcclxuICAgIC8vICAgdGhpcy5xdW90YS50b0ZpeGVkKDEpLCAxNiwgMTYpO1xyXG5cclxuICAgIGFwcC5jdHgucmVzdG9yZSgpO1xyXG5cclxuICB9LFxyXG5cclxuICBiYXJXaWR0aDogMjAwLFxyXG5cclxuICByZW5kZXJDUFVCYXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuXHJcbiAgICB2YXIgd2lkdGggPSAyMDA7XHJcbiAgICB2YXIgY3VycmVudFdpZHRoID0gdGhpcy5iYXJXaWR0aCAqIHRoaXMuY3B1QmFyUHJvZ3Jlc3M7XHJcblxyXG4gICAgYXBwLmN0eC5kcmF3SW1hZ2UoYXBwLmltYWdlcy5zcHJpdGVzaGVldCxcclxuICAgICAgZGVmcy5mcm96ZW5TcHJpdGVbMF0sIGRlZnMuZnJvemVuU3ByaXRlWzFdLCBkZWZzLmZyb3plblNwcml0ZVsyXSwgZGVmcy5mcm96ZW5TcHJpdGVbM10sXHJcbiAgICAgIGFwcC5jZW50ZXIueCAtIHRoaXMuYmFyV2lkdGggLyAyIC0gMzIsIDI0LCBkZWZzLmZyb3plblNwcml0ZVsyXSwgZGVmcy5mcm96ZW5TcHJpdGVbM10pO1xyXG5cclxuXHJcbiAgICBhcHAuY3R4LnN0cm9rZVN0eWxlID0gXCIjZmEwXCI7XHJcbiAgICBhcHAuY3R4LmZpbGxTdHlsZSA9IFwiI2ZhMFwiO1xyXG4gICAgYXBwLmN0eC5saW5lV2lkdGggPSAyO1xyXG5cclxuICAgIGFwcC5jdHguc3Ryb2tlUmVjdChhcHAuY2VudGVyLnggLSB0aGlzLmJhcldpZHRoIC8gMiwgMTYsIHRoaXMuYmFyV2lkdGgsIDMyKVxyXG4gICAgYXBwLmN0eC5maWxsUmVjdChhcHAuY2VudGVyLnggLSB0aGlzLmJhcldpZHRoIC8gMiwgMTYsIGN1cnJlbnRXaWR0aCwgMzIpXHJcblxyXG4gICAgYXBwLmN0eC5maWxsU3R5bGUgPSBcIiNmZmZcIjtcclxuICAgIGFwcC5jdHgudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcclxuICAgIGFwcC5mb250U2l6ZSgxNik7XHJcbiAgICBhcHAuY3R4LmZpbGxUZXh0KFwiQVZBSUxBQkxFIENQVVwiLCBhcHAuY2VudGVyLngsIDI0KTtcclxuXHJcbiAgICBhcHAuY3R4LnRleHRBbGlnbiA9IFwibGVmdFwiO1xyXG4gICAgYXBwLmN0eC5maWxsU3R5bGUgPSBcIiNmYTBcIjtcclxuXHJcbiAgICBhcHAuY3R4LmZpbGxUZXh0KFwiKyBcIiArIHRoaXMub3B0aW1pemF0aW9uUmF0aW5nLnRvRml4ZWQoMiksIGFwcC5jZW50ZXIueCArIHdpZHRoIC8gMiArIDE2LCAxNik7XHJcblxyXG4gICAgYXBwLmN0eC5maWxsU3R5bGUgPSBcIiNjNDBcIjtcclxuICAgIGFwcC5jdHguZmlsbFRleHQoXCItIFwiICsgdGhpcy5yZWFsQ3B1VXNhZ2UudG9GaXhlZCgyKSwgYXBwLmNlbnRlci54ICsgd2lkdGggLyAyICsgMTYsIDMyKTtcclxuXHJcbiAgfSxcclxuXHJcblxyXG4gIHJlbmRlckJvbnVzZXM6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIGFwcC5jdHguc2F2ZSgpO1xyXG4gICAgYXBwLmN0eC50cmFuc2xhdGUoYXBwLmNlbnRlci54IC0gdGhpcy5iYXJXaWR0aCAvIDIsIDU0KTtcclxuICAgIGFwcC5jdHgudGV4dEFsaWduID0gXCJsZWZ0XCI7XHJcbiAgICBhcHAuY3R4LnRleHRCYXNlbGluZSA9IFwidG9wXCI7XHJcblxyXG4gICAgdmFyIGkgPSBPYmplY3Qua2V5cyh0aGlzLmJvbnVzZXMpLmxlbmd0aDtcclxuXHJcbiAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5ib251c2VzKSB7XHJcblxyXG4gICAgICB2YXIgdGhyZXNob2xkID0gdGhpcy5ib251c2VzW2tleV07XHJcblxyXG4gICAgICB2YXIgeCA9IHRoaXMuYmFyV2lkdGggKiB0aHJlc2hvbGQ7XHJcbiAgICAgIHZhciB5ID0gaSAqIDE2O1xyXG5cclxuICAgICAgYXBwLmN0eC5nbG9iYWxBbHBoYSA9IHRoaXMuY2hlY2tCb251cyhrZXkpID8gMS4wIDogMC40O1xyXG5cclxuICAgICAgYXBwLmN0eC5maWxsU3R5bGUgPSBcIiNmZmZcIjtcclxuICAgICAgYXBwLmN0eC5maWxsUmVjdCh4LCAwLCAyLCB5KTtcclxuICAgICAgYXBwLmN0eC5maWxsUmVjdCh4LCB5LCAxNiwgMik7XHJcblxyXG4gICAgICBhcHAuY3R4LmZpbGxTdHlsZSA9IFwiI2ZmZlwiO1xyXG4gICAgICBhcHAuZm9udFNpemUoMTIpO1xyXG4gICAgICBhcHAuY3R4LmZpbGxUZXh0KGRlZnMuYm9udXNlc1trZXldLnRvVXBwZXJDYXNlKCksIHggKyAyMCwgeSAtIDYpO1xyXG5cclxuICAgICAgaS0tO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBhcHAuY3R4LnJlc3RvcmUoKTtcclxuXHJcbiAgfSxcclxuXHJcblxyXG4gIHJlbmRlclRvb2x0aXA6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIGlmICghdGhpcy50b29sdGlwKSByZXR1cm47XHJcblxyXG4gICAgYXBwLmxheWVyLnRleHRBbGlnbihcImNlbnRlclwiKS5maWxsU3R5bGUoXCIjZmZmXCIpLmZvbnQoXCIxNnB4IEFyaWFsXCIpLnRleHRXaXRoQmFja2dyb3VuZCh0aGlzLnRvb2x0aXAsIGFwcC5jZW50ZXIueCwgYXBwLmhlaWdodCAtIDY0LCBcInJnYmEoMCwwLDAsMC42KVwiLCAxNik7XHJcblxyXG4gIH0sXHJcblxyXG4gIHBvaW50ZXJtb3ZlOiBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgdGhpcy5wbGF5ZXIueCA9IGUueDtcclxuICAgIHRoaXMucGxheWVyLnkgPSBlLnk7XHJcblxyXG4gIH0sXHJcblxyXG4gIHdyYXA6IGZ1bmN0aW9uKGVudGl0eSkge1xyXG5cclxuICAgIGlmIChlbnRpdHkueCArIGVudGl0eS5yYWRpdXMgPCAwKSBlbnRpdHkueCA9IGFwcC53aWR0aCArIGVudGl0eS5yYWRpdXM7XHJcbiAgICBpZiAoZW50aXR5LnggLSBlbnRpdHkucmFkaXVzID4gYXBwLndpZHRoKSBlbnRpdHkueCA9IC1lbnRpdHkucmFkaXVzO1xyXG4gICAgaWYgKGVudGl0eS55ICsgZW50aXR5LnJhZGl1cyA8IDApIGVudGl0eS55ID0gYXBwLmhlaWdodCArIGVudGl0eS5yYWRpdXM7XHJcbiAgICBpZiAoZW50aXR5LnkgLSBlbnRpdHkucmFkaXVzID4gYXBwLmhlaWdodCkgZW50aXR5LnkgPSAtZW50aXR5LnJhZGl1cztcclxuXHJcbiAgfSxcclxuXHJcbiAga2V5ZG93bjogZnVuY3Rpb24oZSkge1xyXG5cclxuICB9LFxyXG5cclxuICBuZXh0V2F2ZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgaWYgKHRoaXMuYmVuY2htYXJrKSByZXR1cm47XHJcblxyXG4gICAgdGhpcy53YXZlKys7XHJcblxyXG4gICAgdGhpcy5zaGlwc0xlZnQgPSAwO1xyXG5cclxuICAgIHZhciBzdHJlYW1zUG9zaXRpb25zID0gW1xyXG4gICAgICBbMC4wLCAxLjBdLFxyXG4gICAgICBbMC4wLCAwLjVdLFxyXG4gICAgICBbMC4wLCAwLjBdLFxyXG4gICAgICBbMS4wLCAwLjBdLFxyXG4gICAgICBbMS4wLCAwLjVdLFxyXG4gICAgICBbMS4wLCAxLjBdXHJcbiAgICBdO1xyXG5cclxuICAgIHZhciBkaWZmaWN1bHR5ID0gdGhpcy53YXZlIC8gMjA7XHJcblxyXG4gICAgVXRpbHMuc2h1ZmZsZShzdHJlYW1zUG9zaXRpb25zKTtcclxuXHJcbiAgICB2YXIgc3RyZWFtc0NvdW50ID0gTWF0aC5taW4oMywgMSArIGRpZmZpY3VsdHkpICsgMC4zIHwgMDtcclxuICAgIHZhciBzaGlwc1BlclN0cmVhbSA9IE1hdGgubWluKDE2LCA0ICsgZGlmZmljdWx0eSAqIDQpIHwgMDtcclxuXHJcbiAgICB2YXIgcG9zc2libGVTaGlwcyA9IFtdO1xyXG5cclxuICAgIGlmICh0aGlzLndhdmUgPiAwKSBwb3NzaWJsZVNoaXBzLnB1c2goXCJjcmVlcDFcIik7XHJcbiAgICBpZiAodGhpcy53YXZlID4gMykgcG9zc2libGVTaGlwcy5wdXNoKFwiY3JlZXAyXCIpO1xyXG4gICAgaWYgKHRoaXMud2F2ZSA+IDYpIHBvc3NpYmxlU2hpcHMucHVzaChcImNyZWVwM1wiKTtcclxuICAgIGlmICh0aGlzLndhdmUgPiAxMCkgcG9zc2libGVTaGlwcy5wdXNoKFwiY3JlZXA0XCIpO1xyXG5cclxuICAgIGlmICh0aGlzLndhdmUgJSA1ID09PSAwKSBwb3NzaWJsZVNoaXBzID0gW1wiYm9zc1wiXTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0cmVhbXNDb3VudDsgaSsrKSB7XHJcblxyXG4gICAgICB2YXIgc3RyZWFtID0gc3RyZWFtc1Bvc2l0aW9ucy5wb3AoKTtcclxuXHJcbiAgICAgIHZhciB4ID0gc3RyZWFtWzBdICogYXBwLndpZHRoO1xyXG4gICAgICB2YXIgeSA9IHN0cmVhbVsxXSAqIGFwcC5oZWlnaHQ7XHJcblxyXG4gICAgICB2YXIgc2hpcCA9IFV0aWxzLnJhbmRvbShwb3NzaWJsZVNoaXBzKTtcclxuICAgICAgdmFyIHNoaXBEYXRhID0gZGVmcy5zaGlwc1tzaGlwXTtcclxuICAgICAgdmFyIGFuZ2xlID0gTWF0aC5hdGFuMih5IC0gYXBwLmNlbnRlci55LCB4IC0gYXBwLmNlbnRlci54KTtcclxuXHJcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgc2hpcHNQZXJTdHJlYW07IGorKykge1xyXG5cclxuICAgICAgICB2YXIgZW50aXR5ID0gdGhpcy5hZGQoRU5HSU5FLlNoaXAsIHtcclxuICAgICAgICAgIHR5cGU6IHNoaXAsXHJcbiAgICAgICAgICB4OiB4ICsgTWF0aC5jb3MoYW5nbGUpICogaiAqIDEwMCxcclxuICAgICAgICAgIHk6IHkgKyBNYXRoLnNpbihhbmdsZSkgKiBqICogMTAwLFxyXG4gICAgICAgICAgdGVhbTogMFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnNoaXBzTGVmdCsrO1xyXG5cclxuICAgICAgICBpZiAoc2hpcERhdGEuYm9zcykge1xyXG5cclxuICAgICAgICAgIGVudGl0eS5ocCA9IGVudGl0eS5tYXhIcCA9IHRoaXMuc2NvcmU7XHJcbiAgICAgICAgICBlbnRpdHkuZGFtYWdlID0gdGhpcy5zY29yZSAvIDUwIHwgMDtcclxuICAgICAgICAgIGVudGl0eS5zY2FsZSA9IDAuNSArIHRoaXMuc2NvcmUgLyAyMDA7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gIH0sXHJcblxyXG4gIHJlcGFpclNoaXBzOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB2YXIgc2hpcHMgPSBVdGlscy5maWx0ZXIodGhpcy5lbnRpdGllcywgZnVuY3Rpb24oZSkge1xyXG4gICAgICByZXR1cm4gKGUgaW5zdGFuY2VvZiBFTkdJTkUuU2hpcCkgJiYgZS50ZWFtO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaGlwcy5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgc2hpcHNbaV0ucmVwYWlyKCk7XHJcblxyXG4gICAgfVxyXG5cclxuICB9LFxyXG5cclxuICBvbmVuZW15ZGVhdGg6IGZ1bmN0aW9uKHNoaXApIHtcclxuXHJcbiAgICB0aGlzLnNoaXBzTGVmdC0tO1xyXG5cclxuICAgIGlmICh0aGlzLnNoaXBzTGVmdCA8PSAwKSB0aGlzLm5leHRXYXZlKCk7XHJcblxyXG4gIH0sXHJcblxyXG4gIHBvaW50ZXJkb3duOiBmdW5jdGlvbihlKSB7XHJcblxyXG4gIH0sXHJcblxyXG4gIGdhbWVvdmVyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICBFTkdJTkUuR2FtZW92ZXIuc2NvcmUgPSB0aGlzLnNjb3JlO1xyXG5cclxuICAgIGlmICh3aW5kb3cuZ2EpIHtcclxuICAgICAgZ2EoJ3NlbmQnLCB7XHJcbiAgICAgICAgJ2hpdFR5cGUnOiAnZXZlbnQnLFxyXG4gICAgICAgICdldmVudENhdGVnb3J5JzogJ2dhbWUnLFxyXG4gICAgICAgICdldmVudEFjdGlvbic6ICdvdmVyJyxcclxuICAgICAgICAnZXZlbnRWYWx1ZSc6IHRoaXMuc2NvcmUsXHJcbiAgICAgICAgJ25vbkludGVyYWN0aW9uJzogdHJ1ZVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBhcHAuc2V0U3RhdGUoRU5HSU5FLkdhbWVvdmVyKTtcclxuXHJcbiAgfSxcclxuXHJcbiAgY2hlY2tCb251czogZnVuY3Rpb24oa2V5KSB7XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcblxyXG4gIH1cclxuXHJcbn07IiwiRU5HSU5FLlBvd2VydXAgPSBmdW5jdGlvbihhcmdzKSB7XHJcblxyXG4gIFV0aWxzLmV4dGVuZCh0aGlzLCBhcmdzKTtcclxuXHJcbiAgdGhpcy5yYWRpdXMgPSAzMjtcclxuXHJcbiAgdGhpcy5kaXJlY3Rpb24gPSBNYXRoLnJhbmRvbSgpICogNi4yODtcclxuICB0aGlzLnNwZWVkID0gMzI7XHJcblxyXG4gIHRoaXMuZm9yY2VEaXJlY3Rpb24gPSBNYXRoLnJhbmRvbSgpICogNi4yODtcclxuICB0aGlzLmZvcmNlID0gNjQgKyBNYXRoLnJhbmRvbSgpICogMTI4O1xyXG5cclxuICB0aGlzLmZvcmNlICo9IDM7XHJcbiAgdGhpcy5mb3JjZURhbXBpbmcgPSB0aGlzLmZvcmNlO1xyXG5cclxuICB0aGlzLmxpZmV0aW1lID0gMDtcclxuICB0aGlzLmR1cmF0aW9uID0gMTA7XHJcblxyXG4gIHZhciBrZXlzID0gW1wicmVwYWlyXCIsIFwibWlzc2lsZXNcIiwgXCJmcmVlemVcIl07XHJcblxyXG4gIHZhciBmcmVlbGFuZXJzQ291bnQgPSBVdGlscy5maWx0ZXIodGhpcy5nYW1lLmVudGl0aWVzLCBmdW5jdGlvbihlKSB7XHJcbiAgICByZXR1cm4gZS5mcmVlICYmIGUgaW5zdGFuY2VvZiBFTkdJTkUuU2hpcDtcclxuICB9KS5sZW5ndGg7XHJcblxyXG4gIGlmIChmcmVlbGFuZXJzQ291bnQgPCAyKSBrZXlzLnB1c2goXCJmcmVlbGFuY2VyXCIpO1xyXG5cclxuICB0aGlzLmtleSA9IFV0aWxzLnJhbmRvbShrZXlzKTtcclxuICB0aGlzLnNwcml0ZSA9IHRoaXMuc3ByaXRlc1t0aGlzLmtleV07XHJcblxyXG59O1xyXG5cclxuRU5HSU5FLlBvd2VydXAucHJvdG90eXBlID0ge1xyXG5cclxuICBjb25zdHJ1Y3RvcjogRU5HSU5FLlBvd2VydXAsXHJcblxyXG4gIHNwcml0ZTogWzIxNiwgMTU5LCAxNCwgMTRdLFxyXG5cclxuICB0eXBlOiBcInBvd2VydXBcIixcclxuXHJcbiAgc3ByaXRlczoge1xyXG5cclxuICAgIFwicmVwYWlyXCI6IFsyNDUsIDg5LCAyMywgMjVdLFxyXG4gICAgXCJmcmVlbGFuY2VyXCI6IFsyNzYsIDUxLCAzMiwgMzJdLFxyXG4gICAgXCJmcmVlemVcIjogWzI0MiwgMTE5LCAxOSwgMjFdLFxyXG4gICAgXCJtaXNzaWxlc1wiOiBbMzExLCAxMywgMjgsIDMyXVxyXG5cclxuICB9LFxyXG5cclxuICBjb2xsZWN0OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB0aGlzLmdhbWUuZXhwbG9zaW9uKHRoaXMueCwgdGhpcy55LCAxNiwgXCIjZmZmXCIpO1xyXG5cclxuICAgIHRoaXMuZ2FtZS5yZW1vdmUodGhpcyk7XHJcblxyXG4gICAgYXBwLnNvdW5kLnBsYXkoXCJwb3dlcnVwXCIpO1xyXG5cclxuICAgIHRoaXMuZ2FtZS5wbGF5ZXIucG9rZSgpO1xyXG5cclxuICAgIHRoaXMuZ2FtZS5hZGQoRU5HSU5FLlRleHRPdXQsIHtcclxuICAgICAgeDogdGhpcy54LFxyXG4gICAgICB5OiB0aGlzLnksXHJcbiAgICAgIHRleHQ6IHRoaXMua2V5XHJcbiAgICB9KTtcclxuXHJcbiAgICBzd2l0Y2ggKHRoaXMua2V5KSB7XHJcblxyXG4gICAgICBjYXNlIFwiZnJlZXplXCI6XHJcblxyXG4gICAgICAgIHRoaXMuZ2FtZS5mcmVlemVMaWZlc3BhbiA9IDQuMDtcclxuXHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIFwibWlzc2lsZXNcIjpcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyBpKyspIHRoaXMuZ2FtZS5hZGQoRU5HSU5FLk1pc3NpbGUsIHtcclxuICAgICAgICAgIHg6IHRoaXMueCxcclxuICAgICAgICAgIHk6IHRoaXMueSxcclxuICAgICAgICAgIHRlYW06IDFcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIFwicmVwYWlyXCI6XHJcblxyXG4gICAgICAgIHRoaXMuZ2FtZS5yZXBhaXJTaGlwcygpO1xyXG5cclxuICAgICAgICBicmVhaztcclxuXHJcblxyXG4gICAgICBjYXNlIFwiZnJlZWxhbmNlclwiOlxyXG5cclxuICAgICAgICB2YXIgc2hpcCA9IHRoaXMuZ2FtZS5hZGQoRU5HSU5FLlNoaXAsIHtcclxuICAgICAgICAgIHg6IHRoaXMueCxcclxuICAgICAgICAgIHk6IHRoaXMueSxcclxuICAgICAgICAgIHR5cGU6IFwiZnJlZWxhbmNlclwiLFxyXG4gICAgICAgICAgdGVhbTogMSxcclxuICAgICAgICAgIGZyZWU6IHRydWUsXHJcbiAgICAgICAgICBwbGFuZXQ6IHRoaXMuZ2FtZS5wbGF5ZXJQbGFuZXRcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgc2hpcC5mb3JjZURpcmVjdGlvbiA9IE1hdGgucmFuZG9tKCkgKiA2O1xyXG4gICAgICAgIHNoaXAuZm9yY2UgPSAyMDA7XHJcblxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICB9LFxyXG5cclxuICBzdGVwOiBmdW5jdGlvbihkdCkge1xyXG5cclxuICAgIHRoaXMubGlmZXRpbWUgKz0gZHQ7XHJcblxyXG4gICAgdmFyIHBsYXllckRpc3RhbmNlID0gVXRpbHMuZGlzdGFuY2UodGhpcywgdGhpcy5nYW1lLnBsYXllcik7XHJcblxyXG4gICAgaWYgKHRoaXMuZm9yY2UpIHtcclxuXHJcbiAgICAgIHRoaXMueCArPSBNYXRoLmNvcyh0aGlzLmZvcmNlRGlyZWN0aW9uKSAqIHRoaXMuZm9yY2UgKiBkdDtcclxuICAgICAgdGhpcy55ICs9IE1hdGguc2luKHRoaXMuZm9yY2VEaXJlY3Rpb24pICogdGhpcy5mb3JjZSAqIGR0O1xyXG5cclxuICAgICAgdGhpcy5mb3JjZSA9IE1hdGgubWF4KDAsIHRoaXMuZm9yY2UgLSB0aGlzLmZvcmNlRGFtcGluZyAqIGR0KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMubGlmZXRpbWUgPiAwLjUpIHtcclxuICAgICAgaWYgKHBsYXllckRpc3RhbmNlIDwgMzIpIHtcclxuICAgICAgICB0aGlzLmNvbGxlY3QoKTtcclxuICAgICAgICB0aGlzLmdhbWUucGxheWVyLnJlc291cmNlcysrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMubGlmZXRpbWUgPiB0aGlzLmR1cmF0aW9uKSB0aGlzLmdhbWUucmVtb3ZlKHRoaXMpO1xyXG5cclxuICB9LFxyXG5cclxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHZhciBsaW5lYXIgPSBhcHAubGlmZXRpbWUgJSAwLjUgLyAwLjU7XHJcbiAgICB2YXIgc2NhbGUgPSAwLjggKyBNYXRoLnNpbihNYXRoLlBJICogbGluZWFyKSAqIDAuNDtcclxuXHJcbiAgICBhcHAuY3R4LnNhdmUoKTtcclxuXHJcbiAgICBhcHAuY3R4LnRyYW5zbGF0ZSh0aGlzLngsIHRoaXMueSk7XHJcblxyXG4gICAgYXBwLmN0eC5zY2FsZShzY2FsZSwgc2NhbGUpO1xyXG5cclxuICAgIGFwcC5jdHguZHJhd0ltYWdlKGFwcC5pbWFnZXMuc3ByaXRlc2hlZXQsXHJcbiAgICAgIHRoaXMuc3ByaXRlWzBdLCB0aGlzLnNwcml0ZVsxXSwgdGhpcy5zcHJpdGVbMl0sIHRoaXMuc3ByaXRlWzNdLCAtdGhpcy5zcHJpdGVbMl0gLyAyLCAtdGhpcy5zcHJpdGVbM10gLyAyLCB0aGlzLnNwcml0ZVsyXSwgdGhpcy5zcHJpdGVbM11cclxuICAgICk7XHJcblxyXG4gICAgYXBwLmN0eC5yZXN0b3JlKCk7XHJcblxyXG4gIH1cclxuXHJcbn07IiwiRU5HSU5FLlRleHRPdXQgPSBmdW5jdGlvbihhcmdzKSB7XHJcblxyXG4gIFV0aWxzLmV4dGVuZCh0aGlzLCB7XHJcbiAgICBiYWNrZ3JvdW5kOiBcInJnYmEoMCwwLDAsMC41KVwiLFxyXG4gICAgY29sb3I6IFwiI2ZmZlwiLFxyXG4gICAgZm9udFNpemU6IDI0LFxyXG4gICAgc2NhbGVYOiAwLFxyXG4gICAgc2NhbGVZOiAxLjAsXHJcbiAgICB0ZXh0OiBcInZvaWRcIixcclxuICAgIGR1cmF0aW9uOiAyLjBcclxuICB9LCBhcmdzKTtcclxuXHJcbiAgdmFyIHRleHRvdXQgPSB0aGlzO1xyXG5cclxuICBhcHAudHdlZW4odGhpcylcclxuICAgIC50byh7XHJcbiAgICAgIHNjYWxlWDogMS4wXHJcbiAgICB9LCB0aGlzLmR1cmF0aW9uICogMC4yNSwgXCJvdXRFbGFzdGljXCIpXHJcbiAgICAud2FpdCh0aGlzLmR1cmF0aW9uICogMC41KVxyXG4gICAgLnRvKHtcclxuICAgICAgc2NhbGVZOiAwLjBcclxuICAgIH0sIHRoaXMuZHVyYXRpb24gKiAwLjI1LCBcIm91dENpcmNcIilcclxuICAgIC5vbihcImZpbmlzaFwiLCBmdW5jdGlvbigpIHtcclxuICAgICAgdGV4dG91dC5nYW1lLnJlbW92ZSh0ZXh0b3V0KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHR0dCA9IHRoaXM7XHJcblxyXG59O1xyXG5cclxuRU5HSU5FLlRleHRPdXQucHJvdG90eXBlID0ge1xyXG5cclxuICBjb25zdHJ1Y3RvcjogRU5HSU5FLlRleHRPdXQsXHJcblxyXG4gIHNwcml0ZTogWzIxNiwgMTU5LCAxNCwgMTRdLFxyXG5cclxuICB0eXBlOiBcInRleHRvdXRcIixcclxuXHJcbiAgc3RlcDogZnVuY3Rpb24oZHQpIHtcclxuXHJcbiAgfSxcclxuXHJcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICBpZiAoIXRoaXMuc2NhbGVYIHx8ICF0aGlzLnNjYWxlWSkgcmV0dXJuO1xyXG5cclxuICAgIGFwcC5jdHguc2F2ZSgpO1xyXG5cclxuICAgIGFwcC5jdHgudHJhbnNsYXRlKHRoaXMueCwgdGhpcy55KTtcclxuXHJcbiAgICBhcHAuZm9udFNpemUodGhpcy5mb250U2l6ZSk7XHJcblxyXG4gICAgYXBwLmN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xyXG4gICAgYXBwLmN0eC50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xyXG5cclxuICAgIGFwcC5jdHguc2NhbGUodGhpcy5zY2FsZVgsIHRoaXMuc2NhbGVZKTtcclxuICAgIGFwcC5jdHguZmlsbFRleHQodGhpcy50ZXh0LCAwLCAwKVxyXG5cclxuICAgIGFwcC5jdHgucmVzdG9yZSgpO1xyXG5cclxuICB9XHJcblxyXG59OyIsIkVOR0lORS5UcmFpbCA9IGZ1bmN0aW9uKHBhcmVudCwgYXJncykge1xyXG5cclxuICB0aGlzLnBhcmVudCA9IHBhcmVudDtcclxuXHJcbiAgVXRpbHMuZXh0ZW5kKHRoaXMsIHtcclxuICAgIGNvbG9yOiBcIiMwZmNcIixcclxuICAgIHBvaW50czogW10sXHJcbiAgICBtYXhQb2ludHM6IDUsXHJcbiAgICB3aWR0aDogMTAsXHJcbiAgICBsaWZldGltZTogMCxcclxuICAgIGxpZmVzcGFuOiAwLFxyXG4gICAgcGF1c2VkOiBmYWxzZSxcclxuICAgIGludGVydmFsOiAwLjE1LFxyXG4gICAgc3Ryb2tlOiB0cnVlXHJcbiAgfSwgYXJncyk7XHJcblxyXG59O1xyXG5cclxuRU5HSU5FLlRyYWlsLnByb3RvdHlwZSA9IHtcclxuXHJcbiAgekluZGV4OiAyMDAsXHJcblxyXG4gIHF1b3RhOiAwLjMsXHJcblxyXG4gIHJlYWN0aW9uOiA4LFxyXG5cclxuICBjbGVhcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdGhpcy5wb2ludHMgPSBbXTtcclxuXHJcbiAgfSxcclxuXHJcbiAgc3RlcDogZnVuY3Rpb24oZGVsdGEpIHtcclxuXHJcbiAgICB0aGlzLmxpZmV0aW1lICs9IGRlbHRhO1xyXG5cclxuICAgIGlmIChVdGlscy5pbnRlcnZhbChcInBvaW50XCIsIHRoaXMuaW50ZXJ2YWwsIHRoaXMpKSB7XHJcblxyXG4gICAgICBpZiAoIXRoaXMucGF1c2VkKSB0aGlzLnBvaW50cy5wdXNoKHRoaXMucGFyZW50LngsIHRoaXMucGFyZW50LnkpO1xyXG5cclxuICAgICAgaWYgKFxyXG4gICAgICAgICh0aGlzLnBvaW50cy5sZW5ndGggPiB0aGlzLm1heFBvaW50cyAqIDIpIHx8XHJcbiAgICAgICAgKHRoaXMucGF1c2VkICYmIHRoaXMucG9pbnRzLmxlbmd0aCA+IDApXHJcbiAgICAgICkge1xyXG4gICAgICAgIHRoaXMucG9pbnRzLnNoaWZ0KCk7XHJcbiAgICAgICAgdGhpcy5wb2ludHMuc2hpZnQoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucG9pbnRzW3RoaXMucG9pbnRzLmxlbmd0aCAtIDJdID0gdGhpcy5wYXJlbnQueDtcclxuICAgIHRoaXMucG9pbnRzW3RoaXMucG9pbnRzLmxlbmd0aCAtIDFdID0gdGhpcy5wYXJlbnQueTtcclxuXHJcbiAgICBpZih0aGlzLmxpZmVzcGFuICYmIHRoaXMubGlmZXRpbWUgPiB0aGlzLmxpZmVzcGFuKSB7XHJcbiAgICAgIHRoaXMucGF1c2VkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgfSxcclxuXHJcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICBpZih0aGlzLnBvaW50cy5sZW5ndGggPD0gMCkgcmV0dXJuO1xyXG5cclxuICAgIGFwcC5sYXllci5zYXZlKCk7XHJcbiAgICBhcHAubGF5ZXIuc3Ryb2tlU3R5bGUodGhpcy5jb2xvcik7XHJcbiAgICBhcHAubGF5ZXIubGluZUNhcChcInNxdWFyZVwiKTtcclxuXHJcbiAgICAvLyBpZiAoIXRoaXMuc3Ryb2tlKSBhcHAubGF5ZXIuc3Ryb2tlU3R5bGUoXCJyZ2JhKDAsMCwwLDAuMSlcIik7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDI7IGkgPCB0aGlzLnBvaW50cy5sZW5ndGg7IGkgKz0gMikge1xyXG5cclxuICAgICAgdmFyIHJhdGlvID0gaSAvICgyICogdGhpcy5tYXhQb2ludHMpO1xyXG4gICAgICB2YXIgcHggPSB0aGlzLnBvaW50c1tpIC0gMl07XHJcbiAgICAgIHZhciBweSA9IHRoaXMucG9pbnRzW2kgLSAxXTtcclxuICAgICAgdmFyIG54ID0gdGhpcy5wb2ludHNbaV07XHJcbiAgICAgIHZhciBueSA9IHRoaXMucG9pbnRzW2kgKyAxXTtcclxuICAgICAgYXBwLmxheWVyLmJlZ2luUGF0aCgpO1xyXG4gICAgICBhcHAubGF5ZXIubW92ZVRvKHB4IHwgMCwgcHkgfCAwKTtcclxuICAgICAgYXBwLmxheWVyLmxpbmVUbyhueCB8IDAsIG55IHwgMCk7XHJcbiAgICAgIGFwcC5sYXllci5hKHJhdGlvKS5saW5lV2lkdGgocmF0aW8gKiB0aGlzLndpZHRoKTtcclxuICAgICAgYXBwLmxheWVyLnN0cm9rZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGFwcC5sYXllci5yZXN0b3JlKCk7XHJcblxyXG5cclxuICB9XHJcblxyXG59OyIsIkVOR0lORS5NaXNzaWxlID0gZnVuY3Rpb24oYXJncykge1xyXG5cclxuICBVdGlscy5leHRlbmQodGhpcywge1xyXG4gICAgc3BlZWQ6IDQwMFxyXG4gIH0sIGFyZ3MpO1xyXG5cclxuICB0aGlzLmNvbG9yID0gZGVmcy50ZWFtQ29sb3JbdGhpcy50ZWFtXTtcclxuICB0aGlzLnJhZGl1cyA9IDQ7XHJcbiAgdGhpcy5kaXJlY3Rpb24gPSAwO1xyXG5cclxuICB0aGlzLmZvcmNlID0gNDAwO1xyXG4gIHRoaXMuZm9yY2VEaXJlY3Rpb24gPSBNYXRoLnJhbmRvbSgpICogNjtcclxuXHJcbiAgdGhpcy50cmFpbCA9IG5ldyBFTkdJTkUuVHJhaWwodGhpcywge1xyXG4gICAgaW50ZXJ2YWw6IDAuMDUsXHJcbiAgICBtYXhQb2ludHM6IDEwLFxyXG4gICAgY29sb3I6IFwiI2ZhMFwiXHJcbiAgfSk7XHJcblxyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5nYW1lLmVudGl0aWVzLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgdmFyIGUgPSB0aGlzLmdhbWUuZW50aXRpZXNbaV07XHJcblxyXG4gICAgaWYgKCEoZSBpbnN0YW5jZW9mIEVOR0lORS5TaGlwKSkgY29udGludWU7XHJcblxyXG4gICAgaWYgKGUubWlzc2lsZVRhcmdldCkgY29udGludWU7XHJcbiAgICBpZiAoZS50ZWFtID09PSB0aGlzLnRlYW0pIGNvbnRpbnVlO1xyXG5cclxuICAgIGUubWlzc2lsZVRhcmdldCA9IHRoaXM7XHJcbiAgICB0aGlzLnRhcmdldCA9IGU7XHJcblxyXG4gICAgYnJlYWs7XHJcblxyXG4gIH1cclxuXHJcbn07XHJcblxyXG5FTkdJTkUuTWlzc2lsZS5wcm90b3R5cGUgPSB7XHJcblxyXG4gIHNwcml0ZTogWzE0NSwgMjUsIDYsIDM5XSxcclxuXHJcbiAgcXVvdGE6IDAuNSxcclxuXHJcbiAgY29uc3RydWN0b3I6IEVOR0lORS5NaXNzaWxlLFxyXG5cclxuICBzdGVwOiBmdW5jdGlvbihkdCkge1xyXG5cclxuICAgIGlmKCF0aGlzLnRhcmdldCkgcmV0dXJuIHRoaXMuZGllKCk7XHJcblxyXG4gICAgdGhpcy5kaXJlY3Rpb24gPSBNYXRoLmF0YW4yKHRoaXMudGFyZ2V0LnkgLSB0aGlzLnksIHRoaXMudGFyZ2V0LnggLSB0aGlzLngpO1xyXG5cclxuICAgIHRoaXMueCArPSBNYXRoLmNvcyh0aGlzLmRpcmVjdGlvbikgKiB0aGlzLnNwZWVkICogZHQ7XHJcbiAgICB0aGlzLnkgKz0gTWF0aC5zaW4odGhpcy5kaXJlY3Rpb24pICogdGhpcy5zcGVlZCAqIGR0O1xyXG5cclxuICAgIHRoaXMuZm9yY2UgPSBNYXRoLm1heCh0aGlzLmZvcmNlIC0gZHQgKiA0MDAsIDApO1xyXG5cclxuICAgIHRoaXMueCArPSBNYXRoLmNvcyh0aGlzLmZvcmNlRGlyZWN0aW9uKSAqIHRoaXMuZm9yY2UgKiBkdDtcclxuICAgIHRoaXMueSArPSBNYXRoLnNpbih0aGlzLmZvcmNlRGlyZWN0aW9uKSAqIHRoaXMuZm9yY2UgKiBkdDtcclxuXHJcblxyXG4gICAgaWYgKFV0aWxzLmRpc3RhbmNlKHRoaXMsIHRoaXMudGFyZ2V0KSA8IHRoaXMucmFkaXVzICsgdGhpcy50YXJnZXQucmFkaXVzKSB7XHJcblxyXG4gICAgICB0aGlzLmhpdCh0aGlzLnRhcmdldCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudHJhaWwuc3RlcChkdCk7XHJcblxyXG5cclxuICB9LFxyXG5cclxuICBoaXQ6IGZ1bmN0aW9uKHRhcmdldCkge1xyXG5cclxuICAgIHRhcmdldC5hcHBseURhbWFnZSgxMCArIHRoaXMuZ2FtZS5zY29yZSAvIDEwKTtcclxuXHJcbiAgICB0aGlzLmRpZSgpO1xyXG5cclxuICB9LFxyXG5cclxuICBkaWU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHRoaXMuZGVhZCA9IHRydWU7XHJcblxyXG4gIH0sXHJcblxyXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdGhpcy50cmFpbC5yZW5kZXIoKTtcclxuXHJcbiAgfVxyXG5cclxufTsiLCJFTkdJTkUuR2FtZW92ZXIgPSB7XHJcblxyXG4gIHNjb3JlOiA3MzcsXHJcbiAgaGlzY29yZTogMCxcclxuXHJcbiAgc3Rhck9mZjogWzM4MiwgMTc3LCAxNSwgMTZdLFxyXG4gIHN0YXJPbjogWzMzOSwgMTY5LCAzNywgMzddLFxyXG5cclxuICBlbnRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICBpZiAod2luZG93LmdhKSB7XHJcbiAgICAgIGdhKCdzZW5kJywgJ3NjcmVlbnZpZXcnLCB7XHJcbiAgICAgICAgJ2FwcE5hbWUnOiAnUG93ZXJTdXJnZScsXHJcbiAgICAgICAgJ3NjcmVlbk5hbWUnOiAnR2FtZW92ZXInXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZG9uZSA9IGZhbHNlO1xyXG5cclxuICAgIGFwcC5yZW5kZXJlci5zZXRTbW9vdGhpbmcodHJ1ZSk7XHJcblxyXG4gICAgdmFyIGhpc2NvcmUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImhpc2NvcmVcIikgfCAwO1xyXG5cclxuICAgIGlmIChoaXNjb3JlIDwgdGhpcy5zY29yZSkge1xyXG5cclxuICAgICAgdGhpcy5oaXNjb3JlID0gdGhpcy5zY29yZTtcclxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJoaXNjb3JlXCIsIGhpc2NvcmUpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm11c2ljID0gYXBwLm11c2ljLnBsYXkoXCJnYW1lb3ZlclwiKS5mYWRlSW4oMykubG9vcCgpO1xyXG5cclxuICAgIHRoaXMuY3VycmVudFNjb3JlID0gMDtcclxuICAgIHRoaXMuc3RhcnMgPSBbXTtcclxuICAgIHRoaXMuc2NvcmVPZmZzZXQgPSAtYXBwLndpZHRoO1xyXG4gICAgdGhpcy5hY2hpZXZlZFN0YXJzID0gTWF0aC5taW4oMTAsICh0aGlzLnNjb3JlIC8gNTAwKSAqIDEwIHwgMCk7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XHJcblxyXG4gICAgICB0aGlzLnN0YXJzLnB1c2goe1xyXG4gICAgICAgIHg6IGkgKiA2NCxcclxuICAgICAgICB5OiA2NCxcclxuICAgICAgICBzY2FsZTogMFxyXG4gICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmFjaGlldmVkU3RhcnM7IGkrKykge1xyXG5cclxuICAgICAgdmFyIHN0YXIgPSB0aGlzLnN0YXJzW2ldO1xyXG5cclxuICAgICAgYXBwLnR3ZWVuKHN0YXIpLndhaXQoaSAqIDAuMSkudG8oe1xyXG4gICAgICAgIHNjYWxlOiAxLjAsXHJcbiAgICAgICAgeTogNjRcclxuICAgICAgfSwgMi41LCBcIm91dEVsYXN0aWNcIik7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGFwcC50d2Vlbih0aGlzKS50byh7XHJcblxyXG4gICAgICBjdXJyZW50U2NvcmU6IHRoaXMuc2NvcmUsXHJcbiAgICAgIHNjb3JlT2Zmc2V0OiAwXHJcblxyXG4gICAgfSwgMi41LCBcIm91dEVsYXN0aWNcIikub24oXCJmaW5pc2hlZFwiLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgIGFwcC5zdGF0ZS5kb25lID0gdHJ1ZTtcclxuXHJcbiAgICB9KTtcclxuXHJcblxyXG4gIH0sXHJcblxyXG4gIHN0ZXA6IGZ1bmN0aW9uKCkge1xyXG5cclxuICB9LFxyXG5cclxuICByZW5kZXJTdGFyczogZnVuY3Rpb24oeCwgeSkge1xyXG5cclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDEwOyBpKyspIHtcclxuXHJcbiAgICAgIHZhciBzdGFyID0gdGhpcy5zdGFyc1tpXTtcclxuXHJcbiAgICAgIGFwcC5sYXllci5zYXZlKCk7XHJcblxyXG4gICAgICBhcHAubGF5ZXIudHJhbnNsYXRlKHN0YXIueCArIHgsIHN0YXIueSArIHkpO1xyXG5cclxuICAgICAgYXBwLmxheWVyLmFsaWduKDAuNSwgMC41KTtcclxuXHJcbiAgICAgIGFwcC5sYXllci5kcmF3UmVnaW9uKGFwcC5pbWFnZXMuc3ByaXRlc2hlZXQsIHRoaXMuc3Rhck9mZiwgMCwgMCk7XHJcblxyXG4gICAgICBpZiAoc3Rhci5zY2FsZSA+IDApIHtcclxuXHJcbiAgICAgICAgYXBwLmxheWVyLnJvdGF0ZShhcHAubGlmZXRpbWUpO1xyXG4gICAgICAgIGFwcC5sYXllci5zY2FsZShzdGFyLnNjYWxlLCBzdGFyLnNjYWxlKTtcclxuICAgICAgICBhcHAubGF5ZXIuZHJhd1JlZ2lvbihhcHAuaW1hZ2VzLnNwcml0ZXNoZWV0LCB0aGlzLnN0YXJPbiwgMCwgMCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGFwcC5sYXllci5yZXN0b3JlKCk7XHJcblxyXG4gICAgfVxyXG5cclxuICB9LFxyXG5cclxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIGFwcC5jdHguZmlsbFN0eWxlID0gXCIjMjgyMjQ1XCI7XHJcblxyXG4gICAgYXBwLmN0eC5maWxsUmVjdCgwLCAwLCBhcHAud2lkdGgsIGFwcC5oZWlnaHQpO1xyXG5cclxuICAgIGFwcC5jdHguZHJhd0ltYWdlKGFwcC5pbWFnZXMuaGVscCwgYXBwLmNlbnRlci54IC0gYXBwLmltYWdlcy5oZWxwLndpZHRoICogMC41IHwgMCwgLTUwKVxyXG5cclxuICAgIHRoaXMucmVuZGVyU3RhcnMoYXBwLmNlbnRlci54IC0gMzIwLCAwKTtcclxuXHJcbiAgICBhcHAuZm9udFNpemUoNDgpO1xyXG5cclxuICAgIGFwcC5jdHguZmlsbFN0eWxlID0gXCIjZmEwXCI7XHJcbiAgICBhcHAuY3R4LnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XHJcblxyXG4gICAgYXBwLmN0eC5maWxsVGV4dChcIlNDT1JFOiBcIiArICh0aGlzLmN1cnJlbnRTY29yZSB8IDApLCBhcHAuY2VudGVyLnggKyB0aGlzLnNjb3JlT2Zmc2V0LCAxODApXHJcblxyXG4gICAgYXBwLmZvbnRTaXplKDMyKTtcclxuXHJcbiAgICBhcHAuY3R4LmZpbGxTdHlsZSA9IFwiI2Y0MFwiO1xyXG4gICAgYXBwLmN0eC50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xyXG5cclxuICAgIGFwcC5jdHguZmlsbFRleHQoXCJISS1TQ09SRTogXCIgKyAodGhpcy5oaXNjb3JlIHwgMCksIGFwcC5jZW50ZXIueCAtIHRoaXMuc2NvcmVPZmZzZXQsIDIyMCk7XHJcblxyXG4gICAgaWYgKHRoaXMuZG9uZSkge1xyXG5cclxuICAgICAgYXBwLmN0eC5maWxsU3R5bGUgPSBcIiNjZWZcIjtcclxuICAgICAgYXBwLmN0eC50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xyXG5cclxuICAgICAgaWYgKGFwcC5saWZldGltZSAlIDEgPCAwLjUpIHtcclxuXHJcbiAgICAgICAgYXBwLmN0eC5maWxsVGV4dChcIkNMSUNLIFRPIFRSWSBBR0FJTiBcIiwgYXBwLmNlbnRlci54IC0gdGhpcy5zY29yZU9mZnNldCwgMjYwKVxyXG5cclxuICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgfSxcclxuXHJcbiAgcG9pbnRlcmRvd246IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIGlmICh0aGlzLmRvbmUpIHtcclxuICAgICAgaWYgKHdpbmRvdy5nYSkge1xyXG4gICAgICAgIGdhKCdzZW5kJywge1xyXG4gICAgICAgICAgJ2hpdFR5cGUnOiAnZXZlbnQnLFxyXG4gICAgICAgICAgJ2V2ZW50Q2F0ZWdvcnknOiAnZ2FtZScsXHJcbiAgICAgICAgICAnZXZlbnRBY3Rpb24nOiAncmVzdGFydCdcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgYXBwLnNldFN0YXRlKEVOR0lORS5HYW1lKTtcclxuXHJcbiAgICAgIEVOR0lORS5HYW1lLnJlc2V0KCk7XHJcblxyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG59OyIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblxyXG4gIGFwcCA9IHBsYXlncm91bmQoe1xyXG5cclxuICAgIHdpZHRoOiAxMDI0LFxyXG4gICAgaGVpZ2h0OiA2NDAsXHJcblxyXG4gICAgc21vb3RoaW5nOiB0cnVlLFxyXG5cclxuICAgIHBhdGhzOiB7XHJcblxyXG4gICAgICBiYXNlOiBcIi8vbW96aWxsYS5naXRodWIuaW8vZGV2dG9vbHMtcGVyZi1nYW1lL1wiXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGVEb3dubG9hZFRleHQ6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgaWYgKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIkZpcmVmb3gvNDBcIikgPiAtMSkge1xyXG5cclxuICAgICAgICB2YXIgdGV4dCA9IGRlZnMuZG93bmxvYWRMaW5rc1tcImZmZGV2XCJdWzBdO1xyXG4gICAgICAgIHZhciBsaW5rID0gZGVmcy5kb3dubG9hZExpbmtzW1wiZmZkZXZcIl1bMV07XHJcblxyXG4gICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICB2YXIgdGV4dCA9IGRlZnMuZG93bmxvYWRMaW5rc1tcImRlZmF1bHRcIl1bMF07XHJcbiAgICAgICAgdmFyIGxpbmsgPSBkZWZzLmRvd25sb2FkTGlua3NbXCJkZWZhdWx0XCJdWzFdO1xyXG5cclxuICAgICAgfVxyXG5cclxuICAgICAgZG9jdW1lbnQuYm9keS5xdWVyeVNlbGVjdG9yKFwiI2NvbWljYnViYmxlXCIpLmlubmVySFRNTCA9IHRleHQ7XHJcbiAgICAgIGRvY3VtZW50LmJvZHkucXVlcnlTZWxlY3RvcihcIiNjb21pY2J1YmJsZVwiKS5zZXRBdHRyaWJ1dGUoXCJocmVmXCIsIGxpbmspO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLyogc2V0IGNvbnRleHQgZm9udCBzaXplIHdpdGggZGVmYXVsdCBmb250ICovXHJcblxyXG4gICAgZm9udFNpemU6IGZ1bmN0aW9uKHNpemUpIHtcclxuXHJcbiAgICAgIHJldHVybiB0aGlzLmN0eC5mb250ID0gc2l6ZSArIFwicHggJ1NxdWFkYSBPbmUnXCI7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBjcmVhdGU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgdGhpcy5sb2FkSW1hZ2VzKFwic3ByaXRlc2hlZXRcIiwgXCJoZWxwXCIsIFwic3BsYXNoXCIsIFwiZmxhcmVcIiwgXCJwYXJ0aWNsZXNcIik7XHJcblxyXG4gICAgICB0aGlzLmtleWJvYXJkLnByZXZlbnREZWZhdWx0ID0gZmFsc2U7XHJcblxyXG4gICAgICB0aGlzLnNvdW5kID0gdGhpcy5hdWRpby5jaGFubmVsKFwic291bmRcIikudm9sdW1lKDAuNSk7XHJcbiAgICAgIHRoaXMubXVzaWMgPSB0aGlzLmF1ZGlvLmNoYW5uZWwoXCJtdXNpY1wiKS52b2x1bWUoMC41KTtcclxuXHJcbiAgICAgIHRoaXMuY3R4ID0gYXBwLmxheWVyLmNvbnRleHQ7XHJcblxyXG4gICAgICB0aGlzLmdhbWUgPSBFTkdJTkUuR2FtZTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8qIGFsbCBpbWFnZXMgbG9hZGVkICovXHJcblxyXG4gICAgcmVhZHk6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgdGhpcy51cGRhdGVEb3dubG9hZFRleHQoKTtcclxuXHJcbiAgICAgIC8qIGNhY2hlIHNvbWUga25vd24gY29sb3JzIGZvciBzcHJpdGVzaGVldCAqL1xyXG5cclxuICAgICAgdGhpcy5nZXRDb2xvcmVkSW1hZ2UodGhpcy5pbWFnZXMuc3ByaXRlc2hlZXQsIFwiI2ZmZlwiKTtcclxuXHJcbiAgICAgIC8qIHN0YXJ0IHRoZSBiZW5jaG1hcmsgKi9cclxuXHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoRU5HSU5FLkJlbmNobWFyayk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICByZXNpemU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgdGhpcy5zdGF0ZS5yZW5kZXIoMCk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBnZXRDb2xvcmVkSW1hZ2U6IGZ1bmN0aW9uKGtleSwgY29sb3IsIG1vZGUpIHtcclxuXHJcbiAgICAgIGlmICh0eXBlb2YgbW9kZSA9PT0gXCJ1bmRlZmluZWRcIikgbW9kZSA9IFwiaGFyZC1saWdodFwiO1xyXG5cclxuICAgICAgaWYgKHR5cGVvZiBrZXkgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICB2YXIgaW1hZ2UgPSB0aGlzLmltYWdlc1trZXldO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBpbWFnZSA9IGtleTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIHN0b3Jla2V5ID0gXCJjb2xvci1cIiArIGNvbG9yO1xyXG5cclxuICAgICAgaWYgKCFpbWFnZVtzdG9yZWtleV0pIHtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBtaXggPT09IFwidW5kZWZpbmVkXCIpIG1peCA9IDE7XHJcblxyXG4gICAgICAgIHZhciBiZWxvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XHJcbiAgICAgICAgYmVsb3dDdHggPSBiZWxvdy5nZXRDb250ZXh0KFwiMmRcIik7XHJcblxyXG4gICAgICAgIGJlbG93LndpZHRoID0gaW1hZ2Uud2lkdGg7XHJcbiAgICAgICAgYmVsb3cuaGVpZ2h0ID0gaW1hZ2UuaGVpZ2h0O1xyXG5cclxuICAgICAgICBiZWxvd0N0eC5kcmF3SW1hZ2UoaW1hZ2UsIDAsIDApO1xyXG4gICAgICAgIGJlbG93Q3R4Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IFwic291cmNlLWF0b3BcIjtcclxuICAgICAgICBiZWxvd0N0eC5maWxsU3R5bGUgPSBjb2xvcjtcclxuICAgICAgICBiZWxvd0N0eC5maWxsUmVjdCgwLCAwLCBpbWFnZS53aWR0aCwgaW1hZ2UuaGVpZ2h0KTtcclxuXHJcbiAgICAgICAgaW1hZ2Vbc3RvcmVrZXldID0gYmVsb3c7XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gaW1hZ2Vbc3RvcmVrZXldO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgcm91bmRBbmdsZTogZnVuY3Rpb24oYW5nbGUpIHtcclxuXHJcbiAgICAgIHJldHVybiBVdGlscy5ncm91bmQoYW5nbGUgLSBNYXRoLlBJIC8gMTYsIE1hdGguUEkgLyA4KTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHZpc2liaWxpdHljaGFuZ2U6IGZ1bmN0aW9uKGhpZGRlbikge1xyXG5cclxuICAgICAgaWYgKGhpZGRlbikge1xyXG4gICAgICAgIGlmICghdGhpcy5zdG9yZWRTb3VuZFZvbHVtZSkge1xyXG4gICAgICAgICAgdGhpcy5zdG9yZWRTb3VuZFZvbHVtZSA9IHRoaXMuc291bmQudm9sdW1lKCk7XHJcbiAgICAgICAgICB0aGlzLnN0b3JlZE11c2ljVm9sdW1lID0gdGhpcy5tdXNpYy52b2x1bWUoKTtcclxuICAgICAgICAgIHRoaXMuc291bmQudm9sdW1lKDApO1xyXG4gICAgICAgICAgdGhpcy5tdXNpYy52b2x1bWUoMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmICh0aGlzLnN0b3JlZFNvdW5kVm9sdW1lKSB7XHJcbiAgICAgICAgICB0aGlzLnNvdW5kLnZvbHVtZSh0aGlzLnN0b3JlZFNvdW5kVm9sdW1lKTtcclxuICAgICAgICAgIHRoaXMubXVzaWMudm9sdW1lKHRoaXMuc3RvcmVkTXVzaWNWb2x1bWUpO1xyXG4gICAgICAgICAgdGhpcy5zdG9yZWRTb3VuZFZvbHVtZSA9IDA7XHJcbiAgICAgICAgICB0aGlzLnN0b3JlZE11c2ljVm9sdW1lID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gIH0pO1xyXG5cclxufSk7XHJcblxyXG52YXIgcGVyZm9ybWFuY2UgPSB3aW5kb3cucGVyZm9ybWFuY2UgfHwgd2luZG93LndlYmtpdFBlcmZvcm1hbmNlIHx8IERhdGU7XHJcblxyXG5NYXRoLnNpZ24gPSBNYXRoLnNpZ24gfHwgZnVuY3Rpb24oeCkge1xyXG5cclxuICB4ID0gK3g7IC8vIGNvbnZlcnQgdG8gYSBudW1iZXJcclxuXHJcbiAgaWYgKHggPT09IDAgfHwgaXNOYU4oeCkpIHtcclxuXHJcbiAgICByZXR1cm4geDtcclxuXHJcbiAgfVxyXG5cclxuICByZXR1cm4geCA+IDAgPyAxIDogLTE7XHJcblxyXG59OyIsIi8qKlxyXG4gKiBUaGlzIGlzIGJhZCBhbmQgdW5vcHRpbWl6ZWQgY29kZSBqdXN0IGZvciB5b3UgdG8gZml4IDopXHJcbiAqXHJcbiAqIEdldCBGaXJlZm94IERldmVsb3BlciBFZGl0aW9uIHRvIHRyeSB0aGUgbmV3IFBlcmZvcm1hbmNlIFRvb2xzOlxyXG4gKiAgIGh0dHBzOi8vd3d3Lm1vemlsbGEub3JnL2ZpcmVmb3gvZGV2ZWxvcGVyL1xyXG4gKlxyXG4gKiAxLiBPcGVuIHRoZSBgUGVyZm9ybWFuY2VgIHRvb2wgaW4gRmlyZWZveCBEZXZlbG9wZXIgRWRpdGlvblxyXG4gKiAyLiBTdGFydCByZWNvcmRpbmcgYSBwZXJmb3JtYW5jZSBwcm9maWxlXHJcbiAqIDMuIFBsYXkgdGhlIGdhbWVcclxuICogNC4gU3RvcCBwcm9maWxpbmcgYW5kIGNoZWNrIHRoZSBDYWxsIFRyZWUgb3IgRmxhbWUgQ2hhcnQgZm9yIHRoZSBtYWxlZmljZW50XHJcbiAqXHJcbiAqIEdvdCBpZGVhcyBmb3IgYmV0dGVyIGJvdHRsZW5lY2tzIG9yIGV2ZW4gZmFzdGVyIGNvZGUsIGZpbGVcclxuICogYW4gaXNzdWUgb3Igc2VuZCB1cyBhIHB1bGwgcmVxdWVzdDpcclxuICogICBodHRwczovL2dpdGh1Yi5jb20vbW96aWxsYS9kZXZ0b29scy1wZXJmLWdhbWUvaXNzdWVzXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgYSBuZXcgYXJyYXkgd2l0aCBhbGwgZWxlbWVudHMgdGhhdCBwYXNzIHRoZSBgdGVzdGAgZnVuY3Rpb25cclxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGZpbHRlclxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0ZXN0IEZ1bmN0aW9uIHRvIHRlc3QgZWFjaCBlbGVtZW50LCBpbnZva2VkIHdpdGggKGVsZW1lbnQpXHJcbiAqIEByZXR1cm4ge0FycmF5fSBBIG5ldyBhcnJheSB3aXRoIG9ubHkgcGFzc2VkIGVsZW1lbnRzXHJcbiAqL1xyXG5VdGlscy5maWx0ZXIgPSBmdW5jdGlvbihhcnJheSwgdGVzdCkge1xyXG4gIHZhciByZXN1bHQgPSBhcnJheS5zbGljZSgpOyAvLyBDbG9uZSBhcnJheVxyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcmVzdWx0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICBpZiAoIXRlc3QocmVzdWx0W2ldKSkge1xyXG4gICAgICByZXN1bHQuc3BsaWNlKGksIDEpOyAvLyBSZW1vdmUgZWxlbWVudFxyXG4gICAgICBpLS07XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiByZXN1bHQ7XHJcbn07XHJcblxyXG4vKipcclxuICogRmluZCBuZWFyZXN0IGVudGl0eSBmcm9tIGEgbGlzdCBvZiBlbnRpdGllc1xyXG4gKiBAcGFyYW0ge0VudGl0eX0gZnJvbSBFbnRpdHlcclxuICogQHBhcmFtIHtFbnRpdHlbXX0gZW50aXRpZXMgTGlzdCBvZiBlbnRpdGllcyB0byBjb21wYXJlXHJcbiAqIEByZXR1cm4ge0VudGl0eX0gTmVhcmVzdCBFbnRpdHlcclxuICovXHJcblV0aWxzLm5lYXJlc3QgPSBmdW5jdGlvbihmcm9tLCBlbnRpdGllcykge1xyXG4gIHZhciBkaXN0YW5jZXMgPSBbXTtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IGVudGl0aWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgdG8gPSBlbnRpdGllc1tpXTtcclxuICAgIGlmIChmcm9tID09PSB0bykgY29udGludWU7XHJcbiAgICB2YXIgZGlzdGFuY2UgPSB0aGlzLmRpc3RhbmNlKGZyb20sIHRvKTtcclxuICAgIGRpc3RhbmNlcy5wdXNoKHtcclxuICAgICAgdGFyZ2V0OiB0byxcclxuICAgICAgZGlzdGFuY2U6IGRpc3RhbmNlXHJcbiAgICB9KTtcclxuICB9XHJcbiAgaWYgKCFkaXN0YW5jZXMubGVuZ3RoKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbiAgdmFyIHNvcnRlZERpc3RhbmNlcyA9IGRpc3RhbmNlcy5zb3J0KFxyXG4gICAgZnVuY3Rpb24gc29ydERpc3RhbmNlcyhhLCBiKSB7XHJcbiAgICAgIHJldHVybiBhLmRpc3RhbmNlIC0gYi5kaXN0YW5jZTtcclxuICAgIH1cclxuICApO1xyXG4gIHJldHVybiBzb3J0ZWREaXN0YW5jZXNbMF0udGFyZ2V0O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgbmVhcmVzdCBzaGlwIG9mIG9wcG9zaXRlIHRlYW1cclxuICogQHJldHVybiB7U2hpcH0gTmVhcmVzdCBlbmVteSBzaGlwXHJcbiAqL1xyXG5FTkdJTkUuU2hpcC5wcm90b3R5cGUuZ2V0VGFyZ2V0ID0gZnVuY3Rpb24oKSB7XHJcbiAgdmFyIHBvb2wgPSBbXTtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZ2FtZS5lbnRpdGllcy5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGVudGl0eSA9IHRoaXMuZ2FtZS5lbnRpdGllc1tpXTtcclxuICAgIGlmICghKGVudGl0eSBpbnN0YW5jZW9mIEVOR0lORS5TaGlwKSkgY29udGludWU7XHJcbiAgICBpZiAoZW50aXR5LnRlYW0gIT09IHRoaXMudGVhbSkgcG9vbC5wdXNoKGVudGl0eSk7XHJcbiAgfVxyXG4gIC8vIElzIFV0aWxzLm5lYXJlc3QgZmFzdCBlbm91Z2g/XHJcbiAgcmV0dXJuIFV0aWxzLm5lYXJlc3QodGhpcywgcG9vbCk7XHJcbn07XHJcblxyXG4vLyBXZSB1cGRhdGUgdGhvc2UgZm9yIHBvc2l0aW9ucywgbWF5YmUgd2UgZG9uJ3QgbmVlZCBpdD9cclxudmFyIGF4ZXMgPSB7XHJcbiAgeDogTWF0aC5jb3MsXHJcbiAgeTogTWF0aC5zaW5cclxufTtcclxuXHJcbi8qKlxyXG4gKiBVcGRhdGUgcG9zaXRpb24gZm9yIGFuIGVudGl0eSB0aGF0IGhhcyBzcGVlZCBhbmQgZGlyZWN0aW9uLlxyXG4gKiBAcGFyYW0ge051bWJlcn0gZGlyZWN0aW9uIEFuZ2xlIGdpdmVuIGluIHJhZGlhbnNcclxuICogQHBhcmFtIHtOdW1iZXJ9IHZhbHVlIERpc3RhbmNlIHRvIG1vdmVcclxuICovXHJcblV0aWxzLm1vdmVJbkRpcmVjdGlvbiA9IGZ1bmN0aW9uKGRpcmVjdGlvbiwgdmFsdWUpIHtcclxuICBVdGlscy5qdXN0QW5FeHBlbnNpdmVMb29wKCk7XHJcbiAgdmFsdWUgLz0gMTAwO1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcclxuICAgIGZvciAodmFyIGF4aXMgaW4gYXhlcykge1xyXG4gICAgICB0aGlzW2F4aXNdICs9IGF4ZXNbYXhpc10odGhpcy5kaXJlY3Rpb24pICogdmFsdWU7XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEkgYW0gcmVhbGx5IGp1c3QgYW4gZXhwZW5zaXZlIGxvb3AgOylcclxuICogUmVtb3ZlIG1lIGFuZCBhbGwgcmVmZXJlbmNlcyBjYWxsaW5nIG1lIVxyXG4gKi9cclxuVXRpbHMuanVzdEFuRXhwZW5zaXZlTG9vcCA9IGZ1bmN0aW9uKCkge1xyXG4gIC8vIFRoaXMgaXNuJ3QgZXZlbiBkb2luZyBhbnl0aGluZ1xyXG4gIHZhciBvb3BzID0gQXJyYXkoMTAwMCk7XHJcbiAgb29wcy5tYXAoZnVuY3Rpb24odmFsLCBpKSB7XHJcbiAgICByZXR1cm4gTWF0aC5QSSAvIDI1MDAgKiBpO1xyXG4gIH0pLmZpbHRlcihmdW5jdGlvbihyYWQpIHtcclxuICAgIHJldHVybiBNYXRoLnNpbihyYWQpID4gMDtcclxuICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFVwZGF0ZSBzaGlwIHBvc2l0aW9uIHdpdGggY3VycmVudCBkaXJlY3Rpb24gYW5kIHNwZWVkXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBkdCBUaW1lIGRlbHRhIGZvciBjdXJyZW50IGZyYW1lIGluIHNlY29uZHNcclxuICovXHJcbkVOR0lORS5TaGlwLnByb3RvdHlwZS5tb3ZlID0gZnVuY3Rpb24oZHQpIHtcclxuICBpZiAoIXRoaXMuZnJvemVuKSB7XHJcbiAgICBVdGlscy5tb3ZlSW5EaXJlY3Rpb24uYXBwbHkodGhpcywgW3RoaXMuZGlyZWN0aW9uLCB0aGlzLnNwZWVkICogZHRdKTtcclxuICB9XHJcblxyXG4gIGlmICh0aGlzLmZvcmNlID4gMCkge1xyXG4gICAgdGhpcy5mb3JjZSAtPSAyMDAgKiBkdDtcclxuICAgIFV0aWxzLm1vdmVJbkRpcmVjdGlvbi5hcHBseSh0aGlzLCBbdGhpcy5mb3JjZURpcmVjdGlvbiwgdGhpcy5mb3JjZSAqIGR0XSk7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEZyYW1lIHN0ZXAgZm9yIGEgcGFydGljbGVcclxuICogQHBhcmFtIHtOdW1iZXJ9IGR0IFRpbWUgZGVsdGEgZm9yIGN1cnJlbnQgZnJhbWUgaW4gc2Vjb25kc1xyXG4gKi9cclxuRU5HSU5FLlBhcnRpY2xlLnByb3RvdHlwZS5zdGVwID0gZnVuY3Rpb24oZHQpIHtcclxuICB0aGlzLmxpZmV0aW1lICs9IGR0O1xyXG4gIC8vIFVwZGF0ZSBwb3NpdGlvblxyXG4gIGZvciAodmFyIGF4aXMgaW4gYXhlcykge1xyXG4gICAgdGhpc1theGlzXSArPSBheGVzW2F4aXNdKHRoaXMuZGlyZWN0aW9uKSAqIHRoaXMuc3BlZWQgKiBkdDtcclxuICB9XHJcbiAgdGhpcy5zcGVlZCA9IE1hdGgubWF4KDAsIHRoaXMuc3BlZWQgLSB0aGlzLmRhbXBpbmcgKiBkdCk7XHJcblxyXG4gIHRoaXMucHJvZ3Jlc3MgPSBNYXRoLm1pbih0aGlzLmxpZmV0aW1lIC8gdGhpcy5kdXJhdGlvbiwgMS4wKTtcclxuICAvLyBQdXQgcGFydGljbGUgb2Zmc2NyZWVuIGZvciBwb29saW5nIGFuZCB0byBrZWVwIHJlbmRlciB0aW1lIGNvbnN0YW50XHJcbiAgaWYgKHRoaXMucHJvZ3Jlc3MgPj0gMS4wKSB7XHJcbiAgICB0aGlzLnggPSAwO1xyXG4gICAgdGhpcy55ID0gMDtcclxuICAgIHRoaXMucHJvZ3Jlc3MgPSAwO1xyXG4gIH1cclxuICAvLyBVcGRhdGUgaW5kZXggZm9yIGN1cnJlbnQgc3ByaXRlIHRvIHJlbmRlclxyXG4gIHRoaXMuc3ByaXRlSW5kZXggPSBNYXRoLmZsb29yKHRoaXMucHJvZ3Jlc3MgKiB0aGlzLnNwcml0ZXMubGVuZ3RoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENoZWNrIGlmIHN0YXIgaXMgaW4gc2NyZWVuIGJvdW5kYXJpZXMuXHJcbiAqIE90aGVyd2lzZSB3cmFwIGl0IHRvIHRoZSBvcHBvc2l0ZSBzaWRlIG9mIHNjcmVlbi5cclxuICogQHBhcmFtIHtTdGFyfSBzdGFyIFByb2JlZCBzdGFyXHJcbiAqL1xyXG5FTkdJTkUuQmFja2dyb3VuZFN0YXJzLnByb3RvdHlwZS53cmFwID0gZnVuY3Rpb24oc3Rhcikge1xyXG4gIHZhciBwb3MgPSBbc3Rhci54LCBzdGFyLnksIDEsIDFdO1xyXG4gIHZhciBib3VuZHMgPSBbMCwgMCwgYXBwLndpZHRoLCBhcHAuaGVpZ2h0XTtcclxuXHJcbiAgaWYgKHBvc1swXSA8IGJvdW5kc1swXSkgc3Rhci54ID0gYXBwLndpZHRoO1xyXG4gIGlmIChwb3NbMV0gPCBib3VuZHNbMV0pIHN0YXIueSA9IGFwcC5oZWlnaHQ7XHJcblxyXG4gIGlmIChwb3NbMF0gPiBib3VuZHNbMl0pIHN0YXIueCA9IDA7XHJcbiAgaWYgKHBvc1sxXSA+IGJvdW5kc1szXSkgc3Rhci55ID0gMDtcclxufTtcclxuXHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==