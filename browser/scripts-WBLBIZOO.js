/*!
 * jQuery JavaScript Library v3.7.1
 * https://jquery.com/
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2023-08-28T13:37Z
 */
(function(global, factory) {
  "use strict";
  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = global.document ? factory(global, true) : function(w) {
      if (!w.document) {
        throw new Error("jQuery requires a window with a document");
      }
      return factory(w);
    };
  } else {
    factory(global);
  }
})(typeof window !== "undefined" ? window : this, function(window2, noGlobal) {
  "use strict";
  var arr = [];
  var getProto = Object.getPrototypeOf;
  var slice = arr.slice;
  var flat = arr.flat ? function(array) {
    return arr.flat.call(array);
  } : function(array) {
    return arr.concat.apply([], array);
  };
  var push = arr.push;
  var indexOf = arr.indexOf;
  var class2type = {};
  var toString = class2type.toString;
  var hasOwn = class2type.hasOwnProperty;
  var fnToString = hasOwn.toString;
  var ObjectFunctionString = fnToString.call(Object);
  var support = {};
  var isFunction = function isFunction2(obj) {
    return typeof obj === "function" && typeof obj.nodeType !== "number" && typeof obj.item !== "function";
  };
  var isWindow = function isWindow2(obj) {
    return obj != null && obj === obj.window;
  };
  var document2 = window2.document;
  var preservedScriptAttributes = {
    type: true,
    src: true,
    nonce: true,
    noModule: true
  };
  function DOMEval(code, node, doc) {
    doc = doc || document2;
    var i, val, script = doc.createElement("script");
    script.text = code;
    if (node) {
      for (i in preservedScriptAttributes) {
        val = node[i] || node.getAttribute && node.getAttribute(i);
        if (val) {
          script.setAttribute(i, val);
        }
      }
    }
    doc.head.appendChild(script).parentNode.removeChild(script);
  }
  function toType(obj) {
    if (obj == null) {
      return obj + "";
    }
    return typeof obj === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj;
  }
  var version = "3.7.1", rhtmlSuffix = /HTML$/i, jQuery2 = function(selector, context) {
    return new jQuery2.fn.init(selector, context);
  };
  jQuery2.fn = jQuery2.prototype = {
    // The current version of jQuery being used
    jquery: version,
    constructor: jQuery2,
    // The default length of a jQuery object is 0
    length: 0,
    toArray: function() {
      return slice.call(this);
    },
    // Get the Nth element in the matched element set OR
    // Get the whole matched element set as a clean array
    get: function(num) {
      if (num == null) {
        return slice.call(this);
      }
      return num < 0 ? this[num + this.length] : this[num];
    },
    // Take an array of elements and push it onto the stack
    // (returning the new matched element set)
    pushStack: function(elems) {
      var ret = jQuery2.merge(this.constructor(), elems);
      ret.prevObject = this;
      return ret;
    },
    // Execute a callback for every element in the matched set.
    each: function(callback) {
      return jQuery2.each(this, callback);
    },
    map: function(callback) {
      return this.pushStack(jQuery2.map(this, function(elem, i) {
        return callback.call(elem, i, elem);
      }));
    },
    slice: function() {
      return this.pushStack(slice.apply(this, arguments));
    },
    first: function() {
      return this.eq(0);
    },
    last: function() {
      return this.eq(-1);
    },
    even: function() {
      return this.pushStack(jQuery2.grep(this, function(_elem, i) {
        return (i + 1) % 2;
      }));
    },
    odd: function() {
      return this.pushStack(jQuery2.grep(this, function(_elem, i) {
        return i % 2;
      }));
    },
    eq: function(i) {
      var len = this.length, j = +i + (i < 0 ? len : 0);
      return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
    },
    end: function() {
      return this.prevObject || this.constructor();
    },
    // For internal use only.
    // Behaves like an Array's method, not like a jQuery method.
    push,
    sort: arr.sort,
    splice: arr.splice
  };
  jQuery2.extend = jQuery2.fn.extend = function() {
    var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
    if (typeof target === "boolean") {
      deep = target;
      target = arguments[i] || {};
      i++;
    }
    if (typeof target !== "object" && !isFunction(target)) {
      target = {};
    }
    if (i === length) {
      target = this;
      i--;
    }
    for (; i < length; i++) {
      if ((options = arguments[i]) != null) {
        for (name in options) {
          copy = options[name];
          if (name === "__proto__" || target === copy) {
            continue;
          }
          if (deep && copy && (jQuery2.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
            src = target[name];
            if (copyIsArray && !Array.isArray(src)) {
              clone = [];
            } else if (!copyIsArray && !jQuery2.isPlainObject(src)) {
              clone = {};
            } else {
              clone = src;
            }
            copyIsArray = false;
            target[name] = jQuery2.extend(deep, clone, copy);
          } else if (copy !== void 0) {
            target[name] = copy;
          }
        }
      }
    }
    return target;
  };
  jQuery2.extend({
    // Unique for each copy of jQuery on the page
    expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
    // Assume jQuery is ready without the ready module
    isReady: true,
    error: function(msg) {
      throw new Error(msg);
    },
    noop: function() {
    },
    isPlainObject: function(obj) {
      var proto, Ctor;
      if (!obj || toString.call(obj) !== "[object Object]") {
        return false;
      }
      proto = getProto(obj);
      if (!proto) {
        return true;
      }
      Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
      return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
    },
    isEmptyObject: function(obj) {
      var name;
      for (name in obj) {
        return false;
      }
      return true;
    },
    // Evaluates a script in a provided context; falls back to the global one
    // if not specified.
    globalEval: function(code, options, doc) {
      DOMEval(code, { nonce: options && options.nonce }, doc);
    },
    each: function(obj, callback) {
      var length, i = 0;
      if (isArrayLike(obj)) {
        length = obj.length;
        for (; i < length; i++) {
          if (callback.call(obj[i], i, obj[i]) === false) {
            break;
          }
        }
      } else {
        for (i in obj) {
          if (callback.call(obj[i], i, obj[i]) === false) {
            break;
          }
        }
      }
      return obj;
    },
    // Retrieve the text value of an array of DOM nodes
    text: function(elem) {
      var node, ret = "", i = 0, nodeType = elem.nodeType;
      if (!nodeType) {
        while (node = elem[i++]) {
          ret += jQuery2.text(node);
        }
      }
      if (nodeType === 1 || nodeType === 11) {
        return elem.textContent;
      }
      if (nodeType === 9) {
        return elem.documentElement.textContent;
      }
      if (nodeType === 3 || nodeType === 4) {
        return elem.nodeValue;
      }
      return ret;
    },
    // results is for internal usage only
    makeArray: function(arr2, results) {
      var ret = results || [];
      if (arr2 != null) {
        if (isArrayLike(Object(arr2))) {
          jQuery2.merge(
            ret,
            typeof arr2 === "string" ? [arr2] : arr2
          );
        } else {
          push.call(ret, arr2);
        }
      }
      return ret;
    },
    inArray: function(elem, arr2, i) {
      return arr2 == null ? -1 : indexOf.call(arr2, elem, i);
    },
    isXMLDoc: function(elem) {
      var namespace = elem && elem.namespaceURI, docElem = elem && (elem.ownerDocument || elem).documentElement;
      return !rhtmlSuffix.test(namespace || docElem && docElem.nodeName || "HTML");
    },
    // Support: Android <=4.0 only, PhantomJS 1 only
    // push.apply(_, arraylike) throws on ancient WebKit
    merge: function(first, second) {
      var len = +second.length, j = 0, i = first.length;
      for (; j < len; j++) {
        first[i++] = second[j];
      }
      first.length = i;
      return first;
    },
    grep: function(elems, callback, invert) {
      var callbackInverse, matches = [], i = 0, length = elems.length, callbackExpect = !invert;
      for (; i < length; i++) {
        callbackInverse = !callback(elems[i], i);
        if (callbackInverse !== callbackExpect) {
          matches.push(elems[i]);
        }
      }
      return matches;
    },
    // arg is for internal usage only
    map: function(elems, callback, arg) {
      var length, value, i = 0, ret = [];
      if (isArrayLike(elems)) {
        length = elems.length;
        for (; i < length; i++) {
          value = callback(elems[i], i, arg);
          if (value != null) {
            ret.push(value);
          }
        }
      } else {
        for (i in elems) {
          value = callback(elems[i], i, arg);
          if (value != null) {
            ret.push(value);
          }
        }
      }
      return flat(ret);
    },
    // A global GUID counter for objects
    guid: 1,
    // jQuery.support is not used in Core but other projects attach their
    // properties to it so it needs to exist.
    support
  });
  if (typeof Symbol === "function") {
    jQuery2.fn[Symbol.iterator] = arr[Symbol.iterator];
  }
  jQuery2.each(
    "Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),
    function(_i, name) {
      class2type["[object " + name + "]"] = name.toLowerCase();
    }
  );
  function isArrayLike(obj) {
    var length = !!obj && "length" in obj && obj.length, type = toType(obj);
    if (isFunction(obj) || isWindow(obj)) {
      return false;
    }
    return type === "array" || length === 0 || typeof length === "number" && length > 0 && length - 1 in obj;
  }
  function nodeName(elem, name) {
    return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
  }
  var pop = arr.pop;
  var sort = arr.sort;
  var splice = arr.splice;
  var whitespace = "[\\x20\\t\\r\\n\\f]";
  var rtrimCSS = new RegExp(
    "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$",
    "g"
  );
  jQuery2.contains = function(a, b) {
    var bup = b && b.parentNode;
    return a === bup || !!(bup && bup.nodeType === 1 && // Support: IE 9 - 11+
    // IE doesn't have `contains` on SVG.
    (a.contains ? a.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
  };
  var rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;
  function fcssescape(ch, asCodePoint) {
    if (asCodePoint) {
      if (ch === "\0") {
        return "\uFFFD";
      }
      return ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " ";
    }
    return "\\" + ch;
  }
  jQuery2.escapeSelector = function(sel) {
    return (sel + "").replace(rcssescape, fcssescape);
  };
  var preferredDoc = document2, pushNative = push;
  (function() {
    var i, Expr, outermostContext, sortInput, hasDuplicate, push2 = pushNative, document3, documentElement2, documentIsHTML, rbuggyQSA, matches, expando = jQuery2.expando, dirruns = 0, done = 0, classCache = createCache(), tokenCache = createCache(), compilerCache = createCache(), nonnativeSelectorCache = createCache(), sortOrder = function(a, b) {
      if (a === b) {
        hasDuplicate = true;
      }
      return 0;
    }, booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", identifier = "(?:\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+", attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace + // Operator (capture 2)
    "*([*^$|!~]?=)" + whitespace + // "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
    `*(?:'((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)"|(` + identifier + "))|)" + whitespace + "*\\]", pseudos = ":(" + identifier + `)(?:\\((('((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|` + attributes + ")*)|.*)\\)|)", rwhitespace = new RegExp(whitespace + "+", "g"), rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"), rleadingCombinator = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"), rdescend = new RegExp(whitespace + "|>"), rpseudo = new RegExp(pseudos), ridentifier = new RegExp("^" + identifier + "$"), matchExpr = {
      ID: new RegExp("^#(" + identifier + ")"),
      CLASS: new RegExp("^\\.(" + identifier + ")"),
      TAG: new RegExp("^(" + identifier + "|[*])"),
      ATTR: new RegExp("^" + attributes),
      PSEUDO: new RegExp("^" + pseudos),
      CHILD: new RegExp(
        "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)",
        "i"
      ),
      bool: new RegExp("^(?:" + booleans + ")$", "i"),
      // For use in libraries implementing .is()
      // We use this for POS matching in `select`
      needsContext: new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
    }, rinputs = /^(?:input|select|textarea|button)$/i, rheader = /^h\d$/i, rquickExpr2 = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, rsibling = /[+~]/, runescape = new RegExp("\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\([^\\r\\n\\f])", "g"), funescape = function(escape, nonHex) {
      var high = "0x" + escape.slice(1) - 65536;
      if (nonHex) {
        return nonHex;
      }
      return high < 0 ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, high & 1023 | 56320);
    }, unloadHandler = function() {
      setDocument();
    }, inDisabledFieldset = addCombinator(
      function(elem) {
        return elem.disabled === true && nodeName(elem, "fieldset");
      },
      { dir: "parentNode", next: "legend" }
    );
    function safeActiveElement() {
      try {
        return document3.activeElement;
      } catch (err) {
      }
    }
    try {
      push2.apply(
        arr = slice.call(preferredDoc.childNodes),
        preferredDoc.childNodes
      );
      arr[preferredDoc.childNodes.length].nodeType;
    } catch (e) {
      push2 = {
        apply: function(target, els) {
          pushNative.apply(target, slice.call(els));
        },
        call: function(target) {
          pushNative.apply(target, slice.call(arguments, 1));
        }
      };
    }
    function find(selector, context, results, seed) {
      var m, i2, elem, nid, match, groups, newSelector, newContext = context && context.ownerDocument, nodeType = context ? context.nodeType : 9;
      results = results || [];
      if (typeof selector !== "string" || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {
        return results;
      }
      if (!seed) {
        setDocument(context);
        context = context || document3;
        if (documentIsHTML) {
          if (nodeType !== 11 && (match = rquickExpr2.exec(selector))) {
            if (m = match[1]) {
              if (nodeType === 9) {
                if (elem = context.getElementById(m)) {
                  if (elem.id === m) {
                    push2.call(results, elem);
                    return results;
                  }
                } else {
                  return results;
                }
              } else {
                if (newContext && (elem = newContext.getElementById(m)) && find.contains(context, elem) && elem.id === m) {
                  push2.call(results, elem);
                  return results;
                }
              }
            } else if (match[2]) {
              push2.apply(results, context.getElementsByTagName(selector));
              return results;
            } else if ((m = match[3]) && context.getElementsByClassName) {
              push2.apply(results, context.getElementsByClassName(m));
              return results;
            }
          }
          if (!nonnativeSelectorCache[selector + " "] && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
            newSelector = selector;
            newContext = context;
            if (nodeType === 1 && (rdescend.test(selector) || rleadingCombinator.test(selector))) {
              newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
              if (newContext != context || !support.scope) {
                if (nid = context.getAttribute("id")) {
                  nid = jQuery2.escapeSelector(nid);
                } else {
                  context.setAttribute("id", nid = expando);
                }
              }
              groups = tokenize(selector);
              i2 = groups.length;
              while (i2--) {
                groups[i2] = (nid ? "#" + nid : ":scope") + " " + toSelector(groups[i2]);
              }
              newSelector = groups.join(",");
            }
            try {
              push2.apply(
                results,
                newContext.querySelectorAll(newSelector)
              );
              return results;
            } catch (qsaError) {
              nonnativeSelectorCache(selector, true);
            } finally {
              if (nid === expando) {
                context.removeAttribute("id");
              }
            }
          }
        }
      }
      return select(selector.replace(rtrimCSS, "$1"), context, results, seed);
    }
    function createCache() {
      var keys = [];
      function cache(key, value) {
        if (keys.push(key + " ") > Expr.cacheLength) {
          delete cache[keys.shift()];
        }
        return cache[key + " "] = value;
      }
      return cache;
    }
    function markFunction(fn) {
      fn[expando] = true;
      return fn;
    }
    function assert(fn) {
      var el = document3.createElement("fieldset");
      try {
        return !!fn(el);
      } catch (e) {
        return false;
      } finally {
        if (el.parentNode) {
          el.parentNode.removeChild(el);
        }
        el = null;
      }
    }
    function createInputPseudo(type) {
      return function(elem) {
        return nodeName(elem, "input") && elem.type === type;
      };
    }
    function createButtonPseudo(type) {
      return function(elem) {
        return (nodeName(elem, "input") || nodeName(elem, "button")) && elem.type === type;
      };
    }
    function createDisabledPseudo(disabled) {
      return function(elem) {
        if ("form" in elem) {
          if (elem.parentNode && elem.disabled === false) {
            if ("label" in elem) {
              if ("label" in elem.parentNode) {
                return elem.parentNode.disabled === disabled;
              } else {
                return elem.disabled === disabled;
              }
            }
            return elem.isDisabled === disabled || // Where there is no isDisabled, check manually
            elem.isDisabled !== !disabled && inDisabledFieldset(elem) === disabled;
          }
          return elem.disabled === disabled;
        } else if ("label" in elem) {
          return elem.disabled === disabled;
        }
        return false;
      };
    }
    function createPositionalPseudo(fn) {
      return markFunction(function(argument) {
        argument = +argument;
        return markFunction(function(seed, matches2) {
          var j, matchIndexes = fn([], seed.length, argument), i2 = matchIndexes.length;
          while (i2--) {
            if (seed[j = matchIndexes[i2]]) {
              seed[j] = !(matches2[j] = seed[j]);
            }
          }
        });
      });
    }
    function testContext(context) {
      return context && typeof context.getElementsByTagName !== "undefined" && context;
    }
    function setDocument(node) {
      var subWindow, doc = node ? node.ownerDocument || node : preferredDoc;
      if (doc == document3 || doc.nodeType !== 9 || !doc.documentElement) {
        return document3;
      }
      document3 = doc;
      documentElement2 = document3.documentElement;
      documentIsHTML = !jQuery2.isXMLDoc(document3);
      matches = documentElement2.matches || documentElement2.webkitMatchesSelector || documentElement2.msMatchesSelector;
      if (documentElement2.msMatchesSelector && // Support: IE 11+, Edge 17 - 18+
      // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
      // two documents; shallow comparisons work.
      // eslint-disable-next-line eqeqeq
      preferredDoc != document3 && (subWindow = document3.defaultView) && subWindow.top !== subWindow) {
        subWindow.addEventListener("unload", unloadHandler);
      }
      support.getById = assert(function(el) {
        documentElement2.appendChild(el).id = jQuery2.expando;
        return !document3.getElementsByName || !document3.getElementsByName(jQuery2.expando).length;
      });
      support.disconnectedMatch = assert(function(el) {
        return matches.call(el, "*");
      });
      support.scope = assert(function() {
        return document3.querySelectorAll(":scope");
      });
      support.cssHas = assert(function() {
        try {
          document3.querySelector(":has(*,:jqfake)");
          return false;
        } catch (e) {
          return true;
        }
      });
      if (support.getById) {
        Expr.filter.ID = function(id2) {
          var attrId = id2.replace(runescape, funescape);
          return function(elem) {
            return elem.getAttribute("id") === attrId;
          };
        };
        Expr.find.ID = function(id2, context) {
          if (typeof context.getElementById !== "undefined" && documentIsHTML) {
            var elem = context.getElementById(id2);
            return elem ? [elem] : [];
          }
        };
      } else {
        Expr.filter.ID = function(id2) {
          var attrId = id2.replace(runescape, funescape);
          return function(elem) {
            var node2 = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
            return node2 && node2.value === attrId;
          };
        };
        Expr.find.ID = function(id2, context) {
          if (typeof context.getElementById !== "undefined" && documentIsHTML) {
            var node2, i2, elems, elem = context.getElementById(id2);
            if (elem) {
              node2 = elem.getAttributeNode("id");
              if (node2 && node2.value === id2) {
                return [elem];
              }
              elems = context.getElementsByName(id2);
              i2 = 0;
              while (elem = elems[i2++]) {
                node2 = elem.getAttributeNode("id");
                if (node2 && node2.value === id2) {
                  return [elem];
                }
              }
            }
            return [];
          }
        };
      }
      Expr.find.TAG = function(tag, context) {
        if (typeof context.getElementsByTagName !== "undefined") {
          return context.getElementsByTagName(tag);
        } else {
          return context.querySelectorAll(tag);
        }
      };
      Expr.find.CLASS = function(className, context) {
        if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
          return context.getElementsByClassName(className);
        }
      };
      rbuggyQSA = [];
      assert(function(el) {
        var input;
        documentElement2.appendChild(el).innerHTML = "<a id='" + expando + "' href='' disabled='disabled'></a><select id='" + expando + "-\r\\' disabled='disabled'><option selected=''></option></select>";
        if (!el.querySelectorAll("[selected]").length) {
          rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
        }
        if (!el.querySelectorAll("[id~=" + expando + "-]").length) {
          rbuggyQSA.push("~=");
        }
        if (!el.querySelectorAll("a#" + expando + "+*").length) {
          rbuggyQSA.push(".#.+[+~]");
        }
        if (!el.querySelectorAll(":checked").length) {
          rbuggyQSA.push(":checked");
        }
        input = document3.createElement("input");
        input.setAttribute("type", "hidden");
        el.appendChild(input).setAttribute("name", "D");
        documentElement2.appendChild(el).disabled = true;
        if (el.querySelectorAll(":disabled").length !== 2) {
          rbuggyQSA.push(":enabled", ":disabled");
        }
        input = document3.createElement("input");
        input.setAttribute("name", "");
        el.appendChild(input);
        if (!el.querySelectorAll("[name='']").length) {
          rbuggyQSA.push("\\[" + whitespace + "*name" + whitespace + "*=" + whitespace + `*(?:''|"")`);
        }
      });
      if (!support.cssHas) {
        rbuggyQSA.push(":has");
      }
      rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
      sortOrder = function(a, b) {
        if (a === b) {
          hasDuplicate = true;
          return 0;
        }
        var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
        if (compare) {
          return compare;
        }
        compare = (a.ownerDocument || a) == (b.ownerDocument || b) ? a.compareDocumentPosition(b) : (
          // Otherwise we know they are disconnected
          1
        );
        if (compare & 1 || !support.sortDetached && b.compareDocumentPosition(a) === compare) {
          if (a === document3 || a.ownerDocument == preferredDoc && find.contains(preferredDoc, a)) {
            return -1;
          }
          if (b === document3 || b.ownerDocument == preferredDoc && find.contains(preferredDoc, b)) {
            return 1;
          }
          return sortInput ? indexOf.call(sortInput, a) - indexOf.call(sortInput, b) : 0;
        }
        return compare & 4 ? -1 : 1;
      };
      return document3;
    }
    find.matches = function(expr, elements) {
      return find(expr, null, null, elements);
    };
    find.matchesSelector = function(elem, expr) {
      setDocument(elem);
      if (documentIsHTML && !nonnativeSelectorCache[expr + " "] && (!rbuggyQSA || !rbuggyQSA.test(expr))) {
        try {
          var ret = matches.call(elem, expr);
          if (ret || support.disconnectedMatch || // As well, disconnected nodes are said to be in a document
          // fragment in IE 9
          elem.document && elem.document.nodeType !== 11) {
            return ret;
          }
        } catch (e) {
          nonnativeSelectorCache(expr, true);
        }
      }
      return find(expr, document3, null, [elem]).length > 0;
    };
    find.contains = function(context, elem) {
      if ((context.ownerDocument || context) != document3) {
        setDocument(context);
      }
      return jQuery2.contains(context, elem);
    };
    find.attr = function(elem, name) {
      if ((elem.ownerDocument || elem) != document3) {
        setDocument(elem);
      }
      var fn = Expr.attrHandle[name.toLowerCase()], val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : void 0;
      if (val !== void 0) {
        return val;
      }
      return elem.getAttribute(name);
    };
    find.error = function(msg) {
      throw new Error("Syntax error, unrecognized expression: " + msg);
    };
    jQuery2.uniqueSort = function(results) {
      var elem, duplicates = [], j = 0, i2 = 0;
      hasDuplicate = !support.sortStable;
      sortInput = !support.sortStable && slice.call(results, 0);
      sort.call(results, sortOrder);
      if (hasDuplicate) {
        while (elem = results[i2++]) {
          if (elem === results[i2]) {
            j = duplicates.push(i2);
          }
        }
        while (j--) {
          splice.call(results, duplicates[j], 1);
        }
      }
      sortInput = null;
      return results;
    };
    jQuery2.fn.uniqueSort = function() {
      return this.pushStack(jQuery2.uniqueSort(slice.apply(this)));
    };
    Expr = jQuery2.expr = {
      // Can be adjusted by the user
      cacheLength: 50,
      createPseudo: markFunction,
      match: matchExpr,
      attrHandle: {},
      find: {},
      relative: {
        ">": { dir: "parentNode", first: true },
        " ": { dir: "parentNode" },
        "+": { dir: "previousSibling", first: true },
        "~": { dir: "previousSibling" }
      },
      preFilter: {
        ATTR: function(match) {
          match[1] = match[1].replace(runescape, funescape);
          match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);
          if (match[2] === "~=") {
            match[3] = " " + match[3] + " ";
          }
          return match.slice(0, 4);
        },
        CHILD: function(match) {
          match[1] = match[1].toLowerCase();
          if (match[1].slice(0, 3) === "nth") {
            if (!match[3]) {
              find.error(match[0]);
            }
            match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
            match[5] = +(match[7] + match[8] || match[3] === "odd");
          } else if (match[3]) {
            find.error(match[0]);
          }
          return match;
        },
        PSEUDO: function(match) {
          var excess, unquoted = !match[6] && match[2];
          if (matchExpr.CHILD.test(match[0])) {
            return null;
          }
          if (match[3]) {
            match[2] = match[4] || match[5] || "";
          } else if (unquoted && rpseudo.test(unquoted) && // Get excess from tokenize (recursively)
          (excess = tokenize(unquoted, true)) && // advance to the next closing parenthesis
          (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
            match[0] = match[0].slice(0, excess);
            match[2] = unquoted.slice(0, excess);
          }
          return match.slice(0, 3);
        }
      },
      filter: {
        TAG: function(nodeNameSelector) {
          var expectedNodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
          return nodeNameSelector === "*" ? function() {
            return true;
          } : function(elem) {
            return nodeName(elem, expectedNodeName);
          };
        },
        CLASS: function(className) {
          var pattern = classCache[className + " "];
          return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
            return pattern.test(
              typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || ""
            );
          });
        },
        ATTR: function(name, operator, check) {
          return function(elem) {
            var result = find.attr(elem, name);
            if (result == null) {
              return operator === "!=";
            }
            if (!operator) {
              return true;
            }
            result += "";
            if (operator === "=") {
              return result === check;
            }
            if (operator === "!=") {
              return result !== check;
            }
            if (operator === "^=") {
              return check && result.indexOf(check) === 0;
            }
            if (operator === "*=") {
              return check && result.indexOf(check) > -1;
            }
            if (operator === "$=") {
              return check && result.slice(-check.length) === check;
            }
            if (operator === "~=") {
              return (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1;
            }
            if (operator === "|=") {
              return result === check || result.slice(0, check.length + 1) === check + "-";
            }
            return false;
          };
        },
        CHILD: function(type, what, _argument, first, last) {
          var simple = type.slice(0, 3) !== "nth", forward = type.slice(-4) !== "last", ofType = what === "of-type";
          return first === 1 && last === 0 ? (
            // Shortcut for :nth-*(n)
            function(elem) {
              return !!elem.parentNode;
            }
          ) : function(elem, _context, xml) {
            var cache, outerCache, node, nodeIndex, start, dir2 = simple !== forward ? "nextSibling" : "previousSibling", parent = elem.parentNode, name = ofType && elem.nodeName.toLowerCase(), useCache = !xml && !ofType, diff = false;
            if (parent) {
              if (simple) {
                while (dir2) {
                  node = elem;
                  while (node = node[dir2]) {
                    if (ofType ? nodeName(node, name) : node.nodeType === 1) {
                      return false;
                    }
                  }
                  start = dir2 = type === "only" && !start && "nextSibling";
                }
                return true;
              }
              start = [forward ? parent.firstChild : parent.lastChild];
              if (forward && useCache) {
                outerCache = parent[expando] || (parent[expando] = {});
                cache = outerCache[type] || [];
                nodeIndex = cache[0] === dirruns && cache[1];
                diff = nodeIndex && cache[2];
                node = nodeIndex && parent.childNodes[nodeIndex];
                while (node = ++nodeIndex && node && node[dir2] || // Fallback to seeking `elem` from the start
                (diff = nodeIndex = 0) || start.pop()) {
                  if (node.nodeType === 1 && ++diff && node === elem) {
                    outerCache[type] = [dirruns, nodeIndex, diff];
                    break;
                  }
                }
              } else {
                if (useCache) {
                  outerCache = elem[expando] || (elem[expando] = {});
                  cache = outerCache[type] || [];
                  nodeIndex = cache[0] === dirruns && cache[1];
                  diff = nodeIndex;
                }
                if (diff === false) {
                  while (node = ++nodeIndex && node && node[dir2] || (diff = nodeIndex = 0) || start.pop()) {
                    if ((ofType ? nodeName(node, name) : node.nodeType === 1) && ++diff) {
                      if (useCache) {
                        outerCache = node[expando] || (node[expando] = {});
                        outerCache[type] = [dirruns, diff];
                      }
                      if (node === elem) {
                        break;
                      }
                    }
                  }
                }
              }
              diff -= last;
              return diff === first || diff % first === 0 && diff / first >= 0;
            }
          };
        },
        PSEUDO: function(pseudo, argument) {
          var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || find.error("unsupported pseudo: " + pseudo);
          if (fn[expando]) {
            return fn(argument);
          }
          if (fn.length > 1) {
            args = [pseudo, pseudo, "", argument];
            return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches2) {
              var idx, matched = fn(seed, argument), i2 = matched.length;
              while (i2--) {
                idx = indexOf.call(seed, matched[i2]);
                seed[idx] = !(matches2[idx] = matched[i2]);
              }
            }) : function(elem) {
              return fn(elem, 0, args);
            };
          }
          return fn;
        }
      },
      pseudos: {
        // Potentially complex pseudos
        not: markFunction(function(selector) {
          var input = [], results = [], matcher = compile(selector.replace(rtrimCSS, "$1"));
          return matcher[expando] ? markFunction(function(seed, matches2, _context, xml) {
            var elem, unmatched = matcher(seed, null, xml, []), i2 = seed.length;
            while (i2--) {
              if (elem = unmatched[i2]) {
                seed[i2] = !(matches2[i2] = elem);
              }
            }
          }) : function(elem, _context, xml) {
            input[0] = elem;
            matcher(input, null, xml, results);
            input[0] = null;
            return !results.pop();
          };
        }),
        has: markFunction(function(selector) {
          return function(elem) {
            return find(selector, elem).length > 0;
          };
        }),
        contains: markFunction(function(text) {
          text = text.replace(runescape, funescape);
          return function(elem) {
            return (elem.textContent || jQuery2.text(elem)).indexOf(text) > -1;
          };
        }),
        // "Whether an element is represented by a :lang() selector
        // is based solely on the element's language value
        // being equal to the identifier C,
        // or beginning with the identifier C immediately followed by "-".
        // The matching of C against the element's language value is performed case-insensitively.
        // The identifier C does not have to be a valid language name."
        // https://www.w3.org/TR/selectors/#lang-pseudo
        lang: markFunction(function(lang) {
          if (!ridentifier.test(lang || "")) {
            find.error("unsupported lang: " + lang);
          }
          lang = lang.replace(runescape, funescape).toLowerCase();
          return function(elem) {
            var elemLang;
            do {
              if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) {
                elemLang = elemLang.toLowerCase();
                return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
              }
            } while ((elem = elem.parentNode) && elem.nodeType === 1);
            return false;
          };
        }),
        // Miscellaneous
        target: function(elem) {
          var hash = window2.location && window2.location.hash;
          return hash && hash.slice(1) === elem.id;
        },
        root: function(elem) {
          return elem === documentElement2;
        },
        focus: function(elem) {
          return elem === safeActiveElement() && document3.hasFocus() && !!(elem.type || elem.href || ~elem.tabIndex);
        },
        // Boolean properties
        enabled: createDisabledPseudo(false),
        disabled: createDisabledPseudo(true),
        checked: function(elem) {
          return nodeName(elem, "input") && !!elem.checked || nodeName(elem, "option") && !!elem.selected;
        },
        selected: function(elem) {
          if (elem.parentNode) {
            elem.parentNode.selectedIndex;
          }
          return elem.selected === true;
        },
        // Contents
        empty: function(elem) {
          for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
            if (elem.nodeType < 6) {
              return false;
            }
          }
          return true;
        },
        parent: function(elem) {
          return !Expr.pseudos.empty(elem);
        },
        // Element/input types
        header: function(elem) {
          return rheader.test(elem.nodeName);
        },
        input: function(elem) {
          return rinputs.test(elem.nodeName);
        },
        button: function(elem) {
          return nodeName(elem, "input") && elem.type === "button" || nodeName(elem, "button");
        },
        text: function(elem) {
          var attr;
          return nodeName(elem, "input") && elem.type === "text" && // Support: IE <10 only
          // New HTML5 attribute values (e.g., "search") appear
          // with elem.type === "text"
          ((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
        },
        // Position-in-collection
        first: createPositionalPseudo(function() {
          return [0];
        }),
        last: createPositionalPseudo(function(_matchIndexes, length) {
          return [length - 1];
        }),
        eq: createPositionalPseudo(function(_matchIndexes, length, argument) {
          return [argument < 0 ? argument + length : argument];
        }),
        even: createPositionalPseudo(function(matchIndexes, length) {
          var i2 = 0;
          for (; i2 < length; i2 += 2) {
            matchIndexes.push(i2);
          }
          return matchIndexes;
        }),
        odd: createPositionalPseudo(function(matchIndexes, length) {
          var i2 = 1;
          for (; i2 < length; i2 += 2) {
            matchIndexes.push(i2);
          }
          return matchIndexes;
        }),
        lt: createPositionalPseudo(function(matchIndexes, length, argument) {
          var i2;
          if (argument < 0) {
            i2 = argument + length;
          } else if (argument > length) {
            i2 = length;
          } else {
            i2 = argument;
          }
          for (; --i2 >= 0; ) {
            matchIndexes.push(i2);
          }
          return matchIndexes;
        }),
        gt: createPositionalPseudo(function(matchIndexes, length, argument) {
          var i2 = argument < 0 ? argument + length : argument;
          for (; ++i2 < length; ) {
            matchIndexes.push(i2);
          }
          return matchIndexes;
        })
      }
    };
    Expr.pseudos.nth = Expr.pseudos.eq;
    for (i in { radio: true, checkbox: true, file: true, password: true, image: true }) {
      Expr.pseudos[i] = createInputPseudo(i);
    }
    for (i in { submit: true, reset: true }) {
      Expr.pseudos[i] = createButtonPseudo(i);
    }
    function setFilters() {
    }
    setFilters.prototype = Expr.filters = Expr.pseudos;
    Expr.setFilters = new setFilters();
    function tokenize(selector, parseOnly) {
      var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + " "];
      if (cached) {
        return parseOnly ? 0 : cached.slice(0);
      }
      soFar = selector;
      groups = [];
      preFilters = Expr.preFilter;
      while (soFar) {
        if (!matched || (match = rcomma.exec(soFar))) {
          if (match) {
            soFar = soFar.slice(match[0].length) || soFar;
          }
          groups.push(tokens = []);
        }
        matched = false;
        if (match = rleadingCombinator.exec(soFar)) {
          matched = match.shift();
          tokens.push({
            value: matched,
            // Cast descendant combinators to space
            type: match[0].replace(rtrimCSS, " ")
          });
          soFar = soFar.slice(matched.length);
        }
        for (type in Expr.filter) {
          if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
            matched = match.shift();
            tokens.push({
              value: matched,
              type,
              matches: match
            });
            soFar = soFar.slice(matched.length);
          }
        }
        if (!matched) {
          break;
        }
      }
      if (parseOnly) {
        return soFar.length;
      }
      return soFar ? find.error(selector) : (
        // Cache the tokens
        tokenCache(selector, groups).slice(0)
      );
    }
    function toSelector(tokens) {
      var i2 = 0, len = tokens.length, selector = "";
      for (; i2 < len; i2++) {
        selector += tokens[i2].value;
      }
      return selector;
    }
    function addCombinator(matcher, combinator, base) {
      var dir2 = combinator.dir, skip = combinator.next, key = skip || dir2, checkNonElements = base && key === "parentNode", doneName = done++;
      return combinator.first ? (
        // Check against closest ancestor/preceding element
        function(elem, context, xml) {
          while (elem = elem[dir2]) {
            if (elem.nodeType === 1 || checkNonElements) {
              return matcher(elem, context, xml);
            }
          }
          return false;
        }
      ) : (
        // Check against all ancestor/preceding elements
        function(elem, context, xml) {
          var oldCache, outerCache, newCache = [dirruns, doneName];
          if (xml) {
            while (elem = elem[dir2]) {
              if (elem.nodeType === 1 || checkNonElements) {
                if (matcher(elem, context, xml)) {
                  return true;
                }
              }
            }
          } else {
            while (elem = elem[dir2]) {
              if (elem.nodeType === 1 || checkNonElements) {
                outerCache = elem[expando] || (elem[expando] = {});
                if (skip && nodeName(elem, skip)) {
                  elem = elem[dir2] || elem;
                } else if ((oldCache = outerCache[key]) && oldCache[0] === dirruns && oldCache[1] === doneName) {
                  return newCache[2] = oldCache[2];
                } else {
                  outerCache[key] = newCache;
                  if (newCache[2] = matcher(elem, context, xml)) {
                    return true;
                  }
                }
              }
            }
          }
          return false;
        }
      );
    }
    function elementMatcher(matchers) {
      return matchers.length > 1 ? function(elem, context, xml) {
        var i2 = matchers.length;
        while (i2--) {
          if (!matchers[i2](elem, context, xml)) {
            return false;
          }
        }
        return true;
      } : matchers[0];
    }
    function multipleContexts(selector, contexts, results) {
      var i2 = 0, len = contexts.length;
      for (; i2 < len; i2++) {
        find(selector, contexts[i2], results);
      }
      return results;
    }
    function condense(unmatched, map, filter, context, xml) {
      var elem, newUnmatched = [], i2 = 0, len = unmatched.length, mapped = map != null;
      for (; i2 < len; i2++) {
        if (elem = unmatched[i2]) {
          if (!filter || filter(elem, context, xml)) {
            newUnmatched.push(elem);
            if (mapped) {
              map.push(i2);
            }
          }
        }
      }
      return newUnmatched;
    }
    function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
      if (postFilter && !postFilter[expando]) {
        postFilter = setMatcher(postFilter);
      }
      if (postFinder && !postFinder[expando]) {
        postFinder = setMatcher(postFinder, postSelector);
      }
      return markFunction(function(seed, results, context, xml) {
        var temp, i2, elem, matcherOut, preMap = [], postMap = [], preexisting = results.length, elems = seed || multipleContexts(
          selector || "*",
          context.nodeType ? [context] : context,
          []
        ), matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems;
        if (matcher) {
          matcherOut = postFinder || (seed ? preFilter : preexisting || postFilter) ? (
            // ...intermediate processing is necessary
            []
          ) : (
            // ...otherwise use results directly
            results
          );
          matcher(matcherIn, matcherOut, context, xml);
        } else {
          matcherOut = matcherIn;
        }
        if (postFilter) {
          temp = condense(matcherOut, postMap);
          postFilter(temp, [], context, xml);
          i2 = temp.length;
          while (i2--) {
            if (elem = temp[i2]) {
              matcherOut[postMap[i2]] = !(matcherIn[postMap[i2]] = elem);
            }
          }
        }
        if (seed) {
          if (postFinder || preFilter) {
            if (postFinder) {
              temp = [];
              i2 = matcherOut.length;
              while (i2--) {
                if (elem = matcherOut[i2]) {
                  temp.push(matcherIn[i2] = elem);
                }
              }
              postFinder(null, matcherOut = [], temp, xml);
            }
            i2 = matcherOut.length;
            while (i2--) {
              if ((elem = matcherOut[i2]) && (temp = postFinder ? indexOf.call(seed, elem) : preMap[i2]) > -1) {
                seed[temp] = !(results[temp] = elem);
              }
            }
          }
        } else {
          matcherOut = condense(
            matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut
          );
          if (postFinder) {
            postFinder(null, results, matcherOut, xml);
          } else {
            push2.apply(results, matcherOut);
          }
        }
      });
    }
    function matcherFromTokens(tokens) {
      var checkContext, matcher, j, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[" "], i2 = leadingRelative ? 1 : 0, matchContext = addCombinator(function(elem) {
        return elem === checkContext;
      }, implicitRelative, true), matchAnyContext = addCombinator(function(elem) {
        return indexOf.call(checkContext, elem) > -1;
      }, implicitRelative, true), matchers = [function(elem, context, xml) {
        var ret = !leadingRelative && (xml || context != outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
        checkContext = null;
        return ret;
      }];
      for (; i2 < len; i2++) {
        if (matcher = Expr.relative[tokens[i2].type]) {
          matchers = [addCombinator(elementMatcher(matchers), matcher)];
        } else {
          matcher = Expr.filter[tokens[i2].type].apply(null, tokens[i2].matches);
          if (matcher[expando]) {
            j = ++i2;
            for (; j < len; j++) {
              if (Expr.relative[tokens[j].type]) {
                break;
              }
            }
            return setMatcher(
              i2 > 1 && elementMatcher(matchers),
              i2 > 1 && toSelector(
                // If the preceding token was a descendant combinator, insert an implicit any-element `*`
                tokens.slice(0, i2 - 1).concat({ value: tokens[i2 - 2].type === " " ? "*" : "" })
              ).replace(rtrimCSS, "$1"),
              matcher,
              i2 < j && matcherFromTokens(tokens.slice(i2, j)),
              j < len && matcherFromTokens(tokens = tokens.slice(j)),
              j < len && toSelector(tokens)
            );
          }
          matchers.push(matcher);
        }
      }
      return elementMatcher(matchers);
    }
    function matcherFromGroupMatchers(elementMatchers, setMatchers) {
      var bySet = setMatchers.length > 0, byElement = elementMatchers.length > 0, superMatcher = function(seed, context, xml, results, outermost) {
        var elem, j, matcher, matchedCount = 0, i2 = "0", unmatched = seed && [], setMatched = [], contextBackup = outermostContext, elems = seed || byElement && Expr.find.TAG("*", outermost), dirrunsUnique = dirruns += contextBackup == null ? 1 : Math.random() || 0.1, len = elems.length;
        if (outermost) {
          outermostContext = context == document3 || context || outermost;
        }
        for (; i2 !== len && (elem = elems[i2]) != null; i2++) {
          if (byElement && elem) {
            j = 0;
            if (!context && elem.ownerDocument != document3) {
              setDocument(elem);
              xml = !documentIsHTML;
            }
            while (matcher = elementMatchers[j++]) {
              if (matcher(elem, context || document3, xml)) {
                push2.call(results, elem);
                break;
              }
            }
            if (outermost) {
              dirruns = dirrunsUnique;
            }
          }
          if (bySet) {
            if (elem = !matcher && elem) {
              matchedCount--;
            }
            if (seed) {
              unmatched.push(elem);
            }
          }
        }
        matchedCount += i2;
        if (bySet && i2 !== matchedCount) {
          j = 0;
          while (matcher = setMatchers[j++]) {
            matcher(unmatched, setMatched, context, xml);
          }
          if (seed) {
            if (matchedCount > 0) {
              while (i2--) {
                if (!(unmatched[i2] || setMatched[i2])) {
                  setMatched[i2] = pop.call(results);
                }
              }
            }
            setMatched = condense(setMatched);
          }
          push2.apply(results, setMatched);
          if (outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1) {
            jQuery2.uniqueSort(results);
          }
        }
        if (outermost) {
          dirruns = dirrunsUnique;
          outermostContext = contextBackup;
        }
        return unmatched;
      };
      return bySet ? markFunction(superMatcher) : superMatcher;
    }
    function compile(selector, match) {
      var i2, setMatchers = [], elementMatchers = [], cached = compilerCache[selector + " "];
      if (!cached) {
        if (!match) {
          match = tokenize(selector);
        }
        i2 = match.length;
        while (i2--) {
          cached = matcherFromTokens(match[i2]);
          if (cached[expando]) {
            setMatchers.push(cached);
          } else {
            elementMatchers.push(cached);
          }
        }
        cached = compilerCache(
          selector,
          matcherFromGroupMatchers(elementMatchers, setMatchers)
        );
        cached.selector = selector;
      }
      return cached;
    }
    function select(selector, context, results, seed) {
      var i2, tokens, token, type, find2, compiled = typeof selector === "function" && selector, match = !seed && tokenize(selector = compiled.selector || selector);
      results = results || [];
      if (match.length === 1) {
        tokens = match[0] = match[0].slice(0);
        if (tokens.length > 2 && (token = tokens[0]).type === "ID" && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {
          context = (Expr.find.ID(
            token.matches[0].replace(runescape, funescape),
            context
          ) || [])[0];
          if (!context) {
            return results;
          } else if (compiled) {
            context = context.parentNode;
          }
          selector = selector.slice(tokens.shift().value.length);
        }
        i2 = matchExpr.needsContext.test(selector) ? 0 : tokens.length;
        while (i2--) {
          token = tokens[i2];
          if (Expr.relative[type = token.type]) {
            break;
          }
          if (find2 = Expr.find[type]) {
            if (seed = find2(
              token.matches[0].replace(runescape, funescape),
              rsibling.test(tokens[0].type) && testContext(context.parentNode) || context
            )) {
              tokens.splice(i2, 1);
              selector = seed.length && toSelector(tokens);
              if (!selector) {
                push2.apply(results, seed);
                return results;
              }
              break;
            }
          }
        }
      }
      (compiled || compile(selector, match))(
        seed,
        context,
        !documentIsHTML,
        results,
        !context || rsibling.test(selector) && testContext(context.parentNode) || context
      );
      return results;
    }
    support.sortStable = expando.split("").sort(sortOrder).join("") === expando;
    setDocument();
    support.sortDetached = assert(function(el) {
      return el.compareDocumentPosition(document3.createElement("fieldset")) & 1;
    });
    jQuery2.find = find;
    jQuery2.expr[":"] = jQuery2.expr.pseudos;
    jQuery2.unique = jQuery2.uniqueSort;
    find.compile = compile;
    find.select = select;
    find.setDocument = setDocument;
    find.tokenize = tokenize;
    find.escape = jQuery2.escapeSelector;
    find.getText = jQuery2.text;
    find.isXML = jQuery2.isXMLDoc;
    find.selectors = jQuery2.expr;
    find.support = jQuery2.support;
    find.uniqueSort = jQuery2.uniqueSort;
  })();
  var dir = function(elem, dir2, until) {
    var matched = [], truncate = until !== void 0;
    while ((elem = elem[dir2]) && elem.nodeType !== 9) {
      if (elem.nodeType === 1) {
        if (truncate && jQuery2(elem).is(until)) {
          break;
        }
        matched.push(elem);
      }
    }
    return matched;
  };
  var siblings = function(n, elem) {
    var matched = [];
    for (; n; n = n.nextSibling) {
      if (n.nodeType === 1 && n !== elem) {
        matched.push(n);
      }
    }
    return matched;
  };
  var rneedsContext = jQuery2.expr.match.needsContext;
  var rsingleTag = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
  function winnow(elements, qualifier, not) {
    if (isFunction(qualifier)) {
      return jQuery2.grep(elements, function(elem, i) {
        return !!qualifier.call(elem, i, elem) !== not;
      });
    }
    if (qualifier.nodeType) {
      return jQuery2.grep(elements, function(elem) {
        return elem === qualifier !== not;
      });
    }
    if (typeof qualifier !== "string") {
      return jQuery2.grep(elements, function(elem) {
        return indexOf.call(qualifier, elem) > -1 !== not;
      });
    }
    return jQuery2.filter(qualifier, elements, not);
  }
  jQuery2.filter = function(expr, elems, not) {
    var elem = elems[0];
    if (not) {
      expr = ":not(" + expr + ")";
    }
    if (elems.length === 1 && elem.nodeType === 1) {
      return jQuery2.find.matchesSelector(elem, expr) ? [elem] : [];
    }
    return jQuery2.find.matches(expr, jQuery2.grep(elems, function(elem2) {
      return elem2.nodeType === 1;
    }));
  };
  jQuery2.fn.extend({
    find: function(selector) {
      var i, ret, len = this.length, self = this;
      if (typeof selector !== "string") {
        return this.pushStack(jQuery2(selector).filter(function() {
          for (i = 0; i < len; i++) {
            if (jQuery2.contains(self[i], this)) {
              return true;
            }
          }
        }));
      }
      ret = this.pushStack([]);
      for (i = 0; i < len; i++) {
        jQuery2.find(selector, self[i], ret);
      }
      return len > 1 ? jQuery2.uniqueSort(ret) : ret;
    },
    filter: function(selector) {
      return this.pushStack(winnow(this, selector || [], false));
    },
    not: function(selector) {
      return this.pushStack(winnow(this, selector || [], true));
    },
    is: function(selector) {
      return !!winnow(
        this,
        // If this is a positional/relative selector, check membership in the returned set
        // so $("p:first").is("p:last") won't return true for a doc with two "p".
        typeof selector === "string" && rneedsContext.test(selector) ? jQuery2(selector) : selector || [],
        false
      ).length;
    }
  });
  var rootjQuery, rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/, init = jQuery2.fn.init = function(selector, context, root) {
    var match, elem;
    if (!selector) {
      return this;
    }
    root = root || rootjQuery;
    if (typeof selector === "string") {
      if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {
        match = [null, selector, null];
      } else {
        match = rquickExpr.exec(selector);
      }
      if (match && (match[1] || !context)) {
        if (match[1]) {
          context = context instanceof jQuery2 ? context[0] : context;
          jQuery2.merge(this, jQuery2.parseHTML(
            match[1],
            context && context.nodeType ? context.ownerDocument || context : document2,
            true
          ));
          if (rsingleTag.test(match[1]) && jQuery2.isPlainObject(context)) {
            for (match in context) {
              if (isFunction(this[match])) {
                this[match](context[match]);
              } else {
                this.attr(match, context[match]);
              }
            }
          }
          return this;
        } else {
          elem = document2.getElementById(match[2]);
          if (elem) {
            this[0] = elem;
            this.length = 1;
          }
          return this;
        }
      } else if (!context || context.jquery) {
        return (context || root).find(selector);
      } else {
        return this.constructor(context).find(selector);
      }
    } else if (selector.nodeType) {
      this[0] = selector;
      this.length = 1;
      return this;
    } else if (isFunction(selector)) {
      return root.ready !== void 0 ? root.ready(selector) : (
        // Execute immediately if ready is not present
        selector(jQuery2)
      );
    }
    return jQuery2.makeArray(selector, this);
  };
  init.prototype = jQuery2.fn;
  rootjQuery = jQuery2(document2);
  var rparentsprev = /^(?:parents|prev(?:Until|All))/, guaranteedUnique = {
    children: true,
    contents: true,
    next: true,
    prev: true
  };
  jQuery2.fn.extend({
    has: function(target) {
      var targets = jQuery2(target, this), l = targets.length;
      return this.filter(function() {
        var i = 0;
        for (; i < l; i++) {
          if (jQuery2.contains(this, targets[i])) {
            return true;
          }
        }
      });
    },
    closest: function(selectors, context) {
      var cur, i = 0, l = this.length, matched = [], targets = typeof selectors !== "string" && jQuery2(selectors);
      if (!rneedsContext.test(selectors)) {
        for (; i < l; i++) {
          for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
            if (cur.nodeType < 11 && (targets ? targets.index(cur) > -1 : (
              // Don't pass non-elements to jQuery#find
              cur.nodeType === 1 && jQuery2.find.matchesSelector(cur, selectors)
            ))) {
              matched.push(cur);
              break;
            }
          }
        }
      }
      return this.pushStack(matched.length > 1 ? jQuery2.uniqueSort(matched) : matched);
    },
    // Determine the position of an element within the set
    index: function(elem) {
      if (!elem) {
        return this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
      }
      if (typeof elem === "string") {
        return indexOf.call(jQuery2(elem), this[0]);
      }
      return indexOf.call(
        this,
        // If it receives a jQuery object, the first element is used
        elem.jquery ? elem[0] : elem
      );
    },
    add: function(selector, context) {
      return this.pushStack(
        jQuery2.uniqueSort(
          jQuery2.merge(this.get(), jQuery2(selector, context))
        )
      );
    },
    addBack: function(selector) {
      return this.add(
        selector == null ? this.prevObject : this.prevObject.filter(selector)
      );
    }
  });
  function sibling(cur, dir2) {
    while ((cur = cur[dir2]) && cur.nodeType !== 1) {
    }
    return cur;
  }
  jQuery2.each({
    parent: function(elem) {
      var parent = elem.parentNode;
      return parent && parent.nodeType !== 11 ? parent : null;
    },
    parents: function(elem) {
      return dir(elem, "parentNode");
    },
    parentsUntil: function(elem, _i, until) {
      return dir(elem, "parentNode", until);
    },
    next: function(elem) {
      return sibling(elem, "nextSibling");
    },
    prev: function(elem) {
      return sibling(elem, "previousSibling");
    },
    nextAll: function(elem) {
      return dir(elem, "nextSibling");
    },
    prevAll: function(elem) {
      return dir(elem, "previousSibling");
    },
    nextUntil: function(elem, _i, until) {
      return dir(elem, "nextSibling", until);
    },
    prevUntil: function(elem, _i, until) {
      return dir(elem, "previousSibling", until);
    },
    siblings: function(elem) {
      return siblings((elem.parentNode || {}).firstChild, elem);
    },
    children: function(elem) {
      return siblings(elem.firstChild);
    },
    contents: function(elem) {
      if (elem.contentDocument != null && // Support: IE 11+
      // <object> elements with no `data` attribute has an object
      // `contentDocument` with a `null` prototype.
      getProto(elem.contentDocument)) {
        return elem.contentDocument;
      }
      if (nodeName(elem, "template")) {
        elem = elem.content || elem;
      }
      return jQuery2.merge([], elem.childNodes);
    }
  }, function(name, fn) {
    jQuery2.fn[name] = function(until, selector) {
      var matched = jQuery2.map(this, fn, until);
      if (name.slice(-5) !== "Until") {
        selector = until;
      }
      if (selector && typeof selector === "string") {
        matched = jQuery2.filter(selector, matched);
      }
      if (this.length > 1) {
        if (!guaranteedUnique[name]) {
          jQuery2.uniqueSort(matched);
        }
        if (rparentsprev.test(name)) {
          matched.reverse();
        }
      }
      return this.pushStack(matched);
    };
  });
  var rnothtmlwhite = /[^\x20\t\r\n\f]+/g;
  function createOptions(options) {
    var object = {};
    jQuery2.each(options.match(rnothtmlwhite) || [], function(_, flag) {
      object[flag] = true;
    });
    return object;
  }
  jQuery2.Callbacks = function(options) {
    options = typeof options === "string" ? createOptions(options) : jQuery2.extend({}, options);
    var firing, memory, fired, locked, list = [], queue = [], firingIndex = -1, fire = function() {
      locked = locked || options.once;
      fired = firing = true;
      for (; queue.length; firingIndex = -1) {
        memory = queue.shift();
        while (++firingIndex < list.length) {
          if (list[firingIndex].apply(memory[0], memory[1]) === false && options.stopOnFalse) {
            firingIndex = list.length;
            memory = false;
          }
        }
      }
      if (!options.memory) {
        memory = false;
      }
      firing = false;
      if (locked) {
        if (memory) {
          list = [];
        } else {
          list = "";
        }
      }
    }, self = {
      // Add a callback or a collection of callbacks to the list
      add: function() {
        if (list) {
          if (memory && !firing) {
            firingIndex = list.length - 1;
            queue.push(memory);
          }
          (function add(args) {
            jQuery2.each(args, function(_, arg) {
              if (isFunction(arg)) {
                if (!options.unique || !self.has(arg)) {
                  list.push(arg);
                }
              } else if (arg && arg.length && toType(arg) !== "string") {
                add(arg);
              }
            });
          })(arguments);
          if (memory && !firing) {
            fire();
          }
        }
        return this;
      },
      // Remove a callback from the list
      remove: function() {
        jQuery2.each(arguments, function(_, arg) {
          var index;
          while ((index = jQuery2.inArray(arg, list, index)) > -1) {
            list.splice(index, 1);
            if (index <= firingIndex) {
              firingIndex--;
            }
          }
        });
        return this;
      },
      // Check if a given callback is in the list.
      // If no argument is given, return whether or not list has callbacks attached.
      has: function(fn) {
        return fn ? jQuery2.inArray(fn, list) > -1 : list.length > 0;
      },
      // Remove all callbacks from the list
      empty: function() {
        if (list) {
          list = [];
        }
        return this;
      },
      // Disable .fire and .add
      // Abort any current/pending executions
      // Clear all callbacks and values
      disable: function() {
        locked = queue = [];
        list = memory = "";
        return this;
      },
      disabled: function() {
        return !list;
      },
      // Disable .fire
      // Also disable .add unless we have memory (since it would have no effect)
      // Abort any pending executions
      lock: function() {
        locked = queue = [];
        if (!memory && !firing) {
          list = memory = "";
        }
        return this;
      },
      locked: function() {
        return !!locked;
      },
      // Call all callbacks with the given context and arguments
      fireWith: function(context, args) {
        if (!locked) {
          args = args || [];
          args = [context, args.slice ? args.slice() : args];
          queue.push(args);
          if (!firing) {
            fire();
          }
        }
        return this;
      },
      // Call all the callbacks with the given arguments
      fire: function() {
        self.fireWith(this, arguments);
        return this;
      },
      // To know if the callbacks have already been called at least once
      fired: function() {
        return !!fired;
      }
    };
    return self;
  };
  function Identity(v) {
    return v;
  }
  function Thrower(ex) {
    throw ex;
  }
  function adoptValue(value, resolve, reject, noValue) {
    var method;
    try {
      if (value && isFunction(method = value.promise)) {
        method.call(value).done(resolve).fail(reject);
      } else if (value && isFunction(method = value.then)) {
        method.call(value, resolve, reject);
      } else {
        resolve.apply(void 0, [value].slice(noValue));
      }
    } catch (value2) {
      reject.apply(void 0, [value2]);
    }
  }
  jQuery2.extend({
    Deferred: function(func) {
      var tuples = [
        // action, add listener, callbacks,
        // ... .then handlers, argument index, [final state]
        [
          "notify",
          "progress",
          jQuery2.Callbacks("memory"),
          jQuery2.Callbacks("memory"),
          2
        ],
        [
          "resolve",
          "done",
          jQuery2.Callbacks("once memory"),
          jQuery2.Callbacks("once memory"),
          0,
          "resolved"
        ],
        [
          "reject",
          "fail",
          jQuery2.Callbacks("once memory"),
          jQuery2.Callbacks("once memory"),
          1,
          "rejected"
        ]
      ], state = "pending", promise = {
        state: function() {
          return state;
        },
        always: function() {
          deferred.done(arguments).fail(arguments);
          return this;
        },
        "catch": function(fn) {
          return promise.then(null, fn);
        },
        // Keep pipe for back-compat
        pipe: function() {
          var fns = arguments;
          return jQuery2.Deferred(function(newDefer) {
            jQuery2.each(tuples, function(_i, tuple) {
              var fn = isFunction(fns[tuple[4]]) && fns[tuple[4]];
              deferred[tuple[1]](function() {
                var returned = fn && fn.apply(this, arguments);
                if (returned && isFunction(returned.promise)) {
                  returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject);
                } else {
                  newDefer[tuple[0] + "With"](
                    this,
                    fn ? [returned] : arguments
                  );
                }
              });
            });
            fns = null;
          }).promise();
        },
        then: function(onFulfilled, onRejected, onProgress) {
          var maxDepth = 0;
          function resolve(depth, deferred2, handler, special) {
            return function() {
              var that = this, args = arguments, mightThrow = function() {
                var returned, then;
                if (depth < maxDepth) {
                  return;
                }
                returned = handler.apply(that, args);
                if (returned === deferred2.promise()) {
                  throw new TypeError("Thenable self-resolution");
                }
                then = returned && // Support: Promises/A+ section 2.3.4
                // https://promisesaplus.com/#point-64
                // Only check objects and functions for thenability
                (typeof returned === "object" || typeof returned === "function") && returned.then;
                if (isFunction(then)) {
                  if (special) {
                    then.call(
                      returned,
                      resolve(maxDepth, deferred2, Identity, special),
                      resolve(maxDepth, deferred2, Thrower, special)
                    );
                  } else {
                    maxDepth++;
                    then.call(
                      returned,
                      resolve(maxDepth, deferred2, Identity, special),
                      resolve(maxDepth, deferred2, Thrower, special),
                      resolve(
                        maxDepth,
                        deferred2,
                        Identity,
                        deferred2.notifyWith
                      )
                    );
                  }
                } else {
                  if (handler !== Identity) {
                    that = void 0;
                    args = [returned];
                  }
                  (special || deferred2.resolveWith)(that, args);
                }
              }, process = special ? mightThrow : function() {
                try {
                  mightThrow();
                } catch (e) {
                  if (jQuery2.Deferred.exceptionHook) {
                    jQuery2.Deferred.exceptionHook(
                      e,
                      process.error
                    );
                  }
                  if (depth + 1 >= maxDepth) {
                    if (handler !== Thrower) {
                      that = void 0;
                      args = [e];
                    }
                    deferred2.rejectWith(that, args);
                  }
                }
              };
              if (depth) {
                process();
              } else {
                if (jQuery2.Deferred.getErrorHook) {
                  process.error = jQuery2.Deferred.getErrorHook();
                } else if (jQuery2.Deferred.getStackHook) {
                  process.error = jQuery2.Deferred.getStackHook();
                }
                window2.setTimeout(process);
              }
            };
          }
          return jQuery2.Deferred(function(newDefer) {
            tuples[0][3].add(
              resolve(
                0,
                newDefer,
                isFunction(onProgress) ? onProgress : Identity,
                newDefer.notifyWith
              )
            );
            tuples[1][3].add(
              resolve(
                0,
                newDefer,
                isFunction(onFulfilled) ? onFulfilled : Identity
              )
            );
            tuples[2][3].add(
              resolve(
                0,
                newDefer,
                isFunction(onRejected) ? onRejected : Thrower
              )
            );
          }).promise();
        },
        // Get a promise for this deferred
        // If obj is provided, the promise aspect is added to the object
        promise: function(obj) {
          return obj != null ? jQuery2.extend(obj, promise) : promise;
        }
      }, deferred = {};
      jQuery2.each(tuples, function(i, tuple) {
        var list = tuple[2], stateString = tuple[5];
        promise[tuple[1]] = list.add;
        if (stateString) {
          list.add(
            function() {
              state = stateString;
            },
            // rejected_callbacks.disable
            // fulfilled_callbacks.disable
            tuples[3 - i][2].disable,
            // rejected_handlers.disable
            // fulfilled_handlers.disable
            tuples[3 - i][3].disable,
            // progress_callbacks.lock
            tuples[0][2].lock,
            // progress_handlers.lock
            tuples[0][3].lock
          );
        }
        list.add(tuple[3].fire);
        deferred[tuple[0]] = function() {
          deferred[tuple[0] + "With"](this === deferred ? void 0 : this, arguments);
          return this;
        };
        deferred[tuple[0] + "With"] = list.fireWith;
      });
      promise.promise(deferred);
      if (func) {
        func.call(deferred, deferred);
      }
      return deferred;
    },
    // Deferred helper
    when: function(singleValue) {
      var remaining = arguments.length, i = remaining, resolveContexts = Array(i), resolveValues = slice.call(arguments), primary = jQuery2.Deferred(), updateFunc = function(i2) {
        return function(value) {
          resolveContexts[i2] = this;
          resolveValues[i2] = arguments.length > 1 ? slice.call(arguments) : value;
          if (!--remaining) {
            primary.resolveWith(resolveContexts, resolveValues);
          }
        };
      };
      if (remaining <= 1) {
        adoptValue(
          singleValue,
          primary.done(updateFunc(i)).resolve,
          primary.reject,
          !remaining
        );
        if (primary.state() === "pending" || isFunction(resolveValues[i] && resolveValues[i].then)) {
          return primary.then();
        }
      }
      while (i--) {
        adoptValue(resolveValues[i], updateFunc(i), primary.reject);
      }
      return primary.promise();
    }
  });
  var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
  jQuery2.Deferred.exceptionHook = function(error, asyncError) {
    if (window2.console && window2.console.warn && error && rerrorNames.test(error.name)) {
      window2.console.warn(
        "jQuery.Deferred exception: " + error.message,
        error.stack,
        asyncError
      );
    }
  };
  jQuery2.readyException = function(error) {
    window2.setTimeout(function() {
      throw error;
    });
  };
  var readyList = jQuery2.Deferred();
  jQuery2.fn.ready = function(fn) {
    readyList.then(fn).catch(function(error) {
      jQuery2.readyException(error);
    });
    return this;
  };
  jQuery2.extend({
    // Is the DOM ready to be used? Set to true once it occurs.
    isReady: false,
    // A counter to track how many items to wait for before
    // the ready event fires. See trac-6781
    readyWait: 1,
    // Handle when the DOM is ready
    ready: function(wait) {
      if (wait === true ? --jQuery2.readyWait : jQuery2.isReady) {
        return;
      }
      jQuery2.isReady = true;
      if (wait !== true && --jQuery2.readyWait > 0) {
        return;
      }
      readyList.resolveWith(document2, [jQuery2]);
    }
  });
  jQuery2.ready.then = readyList.then;
  function completed() {
    document2.removeEventListener("DOMContentLoaded", completed);
    window2.removeEventListener("load", completed);
    jQuery2.ready();
  }
  if (document2.readyState === "complete" || document2.readyState !== "loading" && !document2.documentElement.doScroll) {
    window2.setTimeout(jQuery2.ready);
  } else {
    document2.addEventListener("DOMContentLoaded", completed);
    window2.addEventListener("load", completed);
  }
  var access = function(elems, fn, key, value, chainable, emptyGet, raw) {
    var i = 0, len = elems.length, bulk = key == null;
    if (toType(key) === "object") {
      chainable = true;
      for (i in key) {
        access(elems, fn, i, key[i], true, emptyGet, raw);
      }
    } else if (value !== void 0) {
      chainable = true;
      if (!isFunction(value)) {
        raw = true;
      }
      if (bulk) {
        if (raw) {
          fn.call(elems, value);
          fn = null;
        } else {
          bulk = fn;
          fn = function(elem, _key, value2) {
            return bulk.call(jQuery2(elem), value2);
          };
        }
      }
      if (fn) {
        for (; i < len; i++) {
          fn(
            elems[i],
            key,
            raw ? value : value.call(elems[i], i, fn(elems[i], key))
          );
        }
      }
    }
    if (chainable) {
      return elems;
    }
    if (bulk) {
      return fn.call(elems);
    }
    return len ? fn(elems[0], key) : emptyGet;
  };
  var rmsPrefix = /^-ms-/, rdashAlpha = /-([a-z])/g;
  function fcamelCase(_all, letter) {
    return letter.toUpperCase();
  }
  function camelCase(string) {
    return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
  }
  var acceptData = function(owner) {
    return owner.nodeType === 1 || owner.nodeType === 9 || !+owner.nodeType;
  };
  function Data() {
    this.expando = jQuery2.expando + Data.uid++;
  }
  Data.uid = 1;
  Data.prototype = {
    cache: function(owner) {
      var value = owner[this.expando];
      if (!value) {
        value = {};
        if (acceptData(owner)) {
          if (owner.nodeType) {
            owner[this.expando] = value;
          } else {
            Object.defineProperty(owner, this.expando, {
              value,
              configurable: true
            });
          }
        }
      }
      return value;
    },
    set: function(owner, data, value) {
      var prop, cache = this.cache(owner);
      if (typeof data === "string") {
        cache[camelCase(data)] = value;
      } else {
        for (prop in data) {
          cache[camelCase(prop)] = data[prop];
        }
      }
      return cache;
    },
    get: function(owner, key) {
      return key === void 0 ? this.cache(owner) : (
        // Always use camelCase key (gh-2257)
        owner[this.expando] && owner[this.expando][camelCase(key)]
      );
    },
    access: function(owner, key, value) {
      if (key === void 0 || key && typeof key === "string" && value === void 0) {
        return this.get(owner, key);
      }
      this.set(owner, key, value);
      return value !== void 0 ? value : key;
    },
    remove: function(owner, key) {
      var i, cache = owner[this.expando];
      if (cache === void 0) {
        return;
      }
      if (key !== void 0) {
        if (Array.isArray(key)) {
          key = key.map(camelCase);
        } else {
          key = camelCase(key);
          key = key in cache ? [key] : key.match(rnothtmlwhite) || [];
        }
        i = key.length;
        while (i--) {
          delete cache[key[i]];
        }
      }
      if (key === void 0 || jQuery2.isEmptyObject(cache)) {
        if (owner.nodeType) {
          owner[this.expando] = void 0;
        } else {
          delete owner[this.expando];
        }
      }
    },
    hasData: function(owner) {
      var cache = owner[this.expando];
      return cache !== void 0 && !jQuery2.isEmptyObject(cache);
    }
  };
  var dataPriv = new Data();
  var dataUser = new Data();
  var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, rmultiDash = /[A-Z]/g;
  function getData(data) {
    if (data === "true") {
      return true;
    }
    if (data === "false") {
      return false;
    }
    if (data === "null") {
      return null;
    }
    if (data === +data + "") {
      return +data;
    }
    if (rbrace.test(data)) {
      return JSON.parse(data);
    }
    return data;
  }
  function dataAttr(elem, key, data) {
    var name;
    if (data === void 0 && elem.nodeType === 1) {
      name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
      data = elem.getAttribute(name);
      if (typeof data === "string") {
        try {
          data = getData(data);
        } catch (e) {
        }
        dataUser.set(elem, key, data);
      } else {
        data = void 0;
      }
    }
    return data;
  }
  jQuery2.extend({
    hasData: function(elem) {
      return dataUser.hasData(elem) || dataPriv.hasData(elem);
    },
    data: function(elem, name, data) {
      return dataUser.access(elem, name, data);
    },
    removeData: function(elem, name) {
      dataUser.remove(elem, name);
    },
    // TODO: Now that all calls to _data and _removeData have been replaced
    // with direct calls to dataPriv methods, these can be deprecated.
    _data: function(elem, name, data) {
      return dataPriv.access(elem, name, data);
    },
    _removeData: function(elem, name) {
      dataPriv.remove(elem, name);
    }
  });
  jQuery2.fn.extend({
    data: function(key, value) {
      var i, name, data, elem = this[0], attrs = elem && elem.attributes;
      if (key === void 0) {
        if (this.length) {
          data = dataUser.get(elem);
          if (elem.nodeType === 1 && !dataPriv.get(elem, "hasDataAttrs")) {
            i = attrs.length;
            while (i--) {
              if (attrs[i]) {
                name = attrs[i].name;
                if (name.indexOf("data-") === 0) {
                  name = camelCase(name.slice(5));
                  dataAttr(elem, name, data[name]);
                }
              }
            }
            dataPriv.set(elem, "hasDataAttrs", true);
          }
        }
        return data;
      }
      if (typeof key === "object") {
        return this.each(function() {
          dataUser.set(this, key);
        });
      }
      return access(this, function(value2) {
        var data2;
        if (elem && value2 === void 0) {
          data2 = dataUser.get(elem, key);
          if (data2 !== void 0) {
            return data2;
          }
          data2 = dataAttr(elem, key);
          if (data2 !== void 0) {
            return data2;
          }
          return;
        }
        this.each(function() {
          dataUser.set(this, key, value2);
        });
      }, null, value, arguments.length > 1, null, true);
    },
    removeData: function(key) {
      return this.each(function() {
        dataUser.remove(this, key);
      });
    }
  });
  jQuery2.extend({
    queue: function(elem, type, data) {
      var queue;
      if (elem) {
        type = (type || "fx") + "queue";
        queue = dataPriv.get(elem, type);
        if (data) {
          if (!queue || Array.isArray(data)) {
            queue = dataPriv.access(elem, type, jQuery2.makeArray(data));
          } else {
            queue.push(data);
          }
        }
        return queue || [];
      }
    },
    dequeue: function(elem, type) {
      type = type || "fx";
      var queue = jQuery2.queue(elem, type), startLength = queue.length, fn = queue.shift(), hooks = jQuery2._queueHooks(elem, type), next = function() {
        jQuery2.dequeue(elem, type);
      };
      if (fn === "inprogress") {
        fn = queue.shift();
        startLength--;
      }
      if (fn) {
        if (type === "fx") {
          queue.unshift("inprogress");
        }
        delete hooks.stop;
        fn.call(elem, next, hooks);
      }
      if (!startLength && hooks) {
        hooks.empty.fire();
      }
    },
    // Not public - generate a queueHooks object, or return the current one
    _queueHooks: function(elem, type) {
      var key = type + "queueHooks";
      return dataPriv.get(elem, key) || dataPriv.access(elem, key, {
        empty: jQuery2.Callbacks("once memory").add(function() {
          dataPriv.remove(elem, [type + "queue", key]);
        })
      });
    }
  });
  jQuery2.fn.extend({
    queue: function(type, data) {
      var setter = 2;
      if (typeof type !== "string") {
        data = type;
        type = "fx";
        setter--;
      }
      if (arguments.length < setter) {
        return jQuery2.queue(this[0], type);
      }
      return data === void 0 ? this : this.each(function() {
        var queue = jQuery2.queue(this, type, data);
        jQuery2._queueHooks(this, type);
        if (type === "fx" && queue[0] !== "inprogress") {
          jQuery2.dequeue(this, type);
        }
      });
    },
    dequeue: function(type) {
      return this.each(function() {
        jQuery2.dequeue(this, type);
      });
    },
    clearQueue: function(type) {
      return this.queue(type || "fx", []);
    },
    // Get a promise resolved when queues of a certain type
    // are emptied (fx is the type by default)
    promise: function(type, obj) {
      var tmp, count = 1, defer = jQuery2.Deferred(), elements = this, i = this.length, resolve = function() {
        if (!--count) {
          defer.resolveWith(elements, [elements]);
        }
      };
      if (typeof type !== "string") {
        obj = type;
        type = void 0;
      }
      type = type || "fx";
      while (i--) {
        tmp = dataPriv.get(elements[i], type + "queueHooks");
        if (tmp && tmp.empty) {
          count++;
          tmp.empty.add(resolve);
        }
      }
      resolve();
      return defer.promise(obj);
    }
  });
  var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;
  var rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");
  var cssExpand = ["Top", "Right", "Bottom", "Left"];
  var documentElement = document2.documentElement;
  var isAttached = function(elem) {
    return jQuery2.contains(elem.ownerDocument, elem);
  }, composed = { composed: true };
  if (documentElement.getRootNode) {
    isAttached = function(elem) {
      return jQuery2.contains(elem.ownerDocument, elem) || elem.getRootNode(composed) === elem.ownerDocument;
    };
  }
  var isHiddenWithinTree = function(elem, el) {
    elem = el || elem;
    return elem.style.display === "none" || elem.style.display === "" && // Otherwise, check computed style
    // Support: Firefox <=43 - 45
    // Disconnected elements can have computed display: none, so first confirm that elem is
    // in the document.
    isAttached(elem) && jQuery2.css(elem, "display") === "none";
  };
  function adjustCSS(elem, prop, valueParts, tween) {
    var adjusted, scale, maxIterations = 20, currentValue = tween ? function() {
      return tween.cur();
    } : function() {
      return jQuery2.css(elem, prop, "");
    }, initial = currentValue(), unit = valueParts && valueParts[3] || (jQuery2.cssNumber[prop] ? "" : "px"), initialInUnit = elem.nodeType && (jQuery2.cssNumber[prop] || unit !== "px" && +initial) && rcssNum.exec(jQuery2.css(elem, prop));
    if (initialInUnit && initialInUnit[3] !== unit) {
      initial = initial / 2;
      unit = unit || initialInUnit[3];
      initialInUnit = +initial || 1;
      while (maxIterations--) {
        jQuery2.style(elem, prop, initialInUnit + unit);
        if ((1 - scale) * (1 - (scale = currentValue() / initial || 0.5)) <= 0) {
          maxIterations = 0;
        }
        initialInUnit = initialInUnit / scale;
      }
      initialInUnit = initialInUnit * 2;
      jQuery2.style(elem, prop, initialInUnit + unit);
      valueParts = valueParts || [];
    }
    if (valueParts) {
      initialInUnit = +initialInUnit || +initial || 0;
      adjusted = valueParts[1] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2];
      if (tween) {
        tween.unit = unit;
        tween.start = initialInUnit;
        tween.end = adjusted;
      }
    }
    return adjusted;
  }
  var defaultDisplayMap = {};
  function getDefaultDisplay(elem) {
    var temp, doc = elem.ownerDocument, nodeName2 = elem.nodeName, display = defaultDisplayMap[nodeName2];
    if (display) {
      return display;
    }
    temp = doc.body.appendChild(doc.createElement(nodeName2));
    display = jQuery2.css(temp, "display");
    temp.parentNode.removeChild(temp);
    if (display === "none") {
      display = "block";
    }
    defaultDisplayMap[nodeName2] = display;
    return display;
  }
  function showHide(elements, show) {
    var display, elem, values = [], index = 0, length = elements.length;
    for (; index < length; index++) {
      elem = elements[index];
      if (!elem.style) {
        continue;
      }
      display = elem.style.display;
      if (show) {
        if (display === "none") {
          values[index] = dataPriv.get(elem, "display") || null;
          if (!values[index]) {
            elem.style.display = "";
          }
        }
        if (elem.style.display === "" && isHiddenWithinTree(elem)) {
          values[index] = getDefaultDisplay(elem);
        }
      } else {
        if (display !== "none") {
          values[index] = "none";
          dataPriv.set(elem, "display", display);
        }
      }
    }
    for (index = 0; index < length; index++) {
      if (values[index] != null) {
        elements[index].style.display = values[index];
      }
    }
    return elements;
  }
  jQuery2.fn.extend({
    show: function() {
      return showHide(this, true);
    },
    hide: function() {
      return showHide(this);
    },
    toggle: function(state) {
      if (typeof state === "boolean") {
        return state ? this.show() : this.hide();
      }
      return this.each(function() {
        if (isHiddenWithinTree(this)) {
          jQuery2(this).show();
        } else {
          jQuery2(this).hide();
        }
      });
    }
  });
  var rcheckableType = /^(?:checkbox|radio)$/i;
  var rtagName = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i;
  var rscriptType = /^$|^module$|\/(?:java|ecma)script/i;
  (function() {
    var fragment = document2.createDocumentFragment(), div = fragment.appendChild(document2.createElement("div")), input = document2.createElement("input");
    input.setAttribute("type", "radio");
    input.setAttribute("checked", "checked");
    input.setAttribute("name", "t");
    div.appendChild(input);
    support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;
    div.innerHTML = "<textarea>x</textarea>";
    support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
    div.innerHTML = "<option></option>";
    support.option = !!div.lastChild;
  })();
  var wrapMap = {
    // XHTML parsers do not magically insert elements in the
    // same way that tag soup parsers do. So we cannot shorten
    // this by omitting <tbody> or other required elements.
    thead: [1, "<table>", "</table>"],
    col: [2, "<table><colgroup>", "</colgroup></table>"],
    tr: [2, "<table><tbody>", "</tbody></table>"],
    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
    _default: [0, "", ""]
  };
  wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
  wrapMap.th = wrapMap.td;
  if (!support.option) {
    wrapMap.optgroup = wrapMap.option = [1, "<select multiple='multiple'>", "</select>"];
  }
  function getAll(context, tag) {
    var ret;
    if (typeof context.getElementsByTagName !== "undefined") {
      ret = context.getElementsByTagName(tag || "*");
    } else if (typeof context.querySelectorAll !== "undefined") {
      ret = context.querySelectorAll(tag || "*");
    } else {
      ret = [];
    }
    if (tag === void 0 || tag && nodeName(context, tag)) {
      return jQuery2.merge([context], ret);
    }
    return ret;
  }
  function setGlobalEval(elems, refElements) {
    var i = 0, l = elems.length;
    for (; i < l; i++) {
      dataPriv.set(
        elems[i],
        "globalEval",
        !refElements || dataPriv.get(refElements[i], "globalEval")
      );
    }
  }
  var rhtml = /<|&#?\w+;/;
  function buildFragment(elems, context, scripts, selection, ignored) {
    var elem, tmp, tag, wrap, attached, j, fragment = context.createDocumentFragment(), nodes = [], i = 0, l = elems.length;
    for (; i < l; i++) {
      elem = elems[i];
      if (elem || elem === 0) {
        if (toType(elem) === "object") {
          jQuery2.merge(nodes, elem.nodeType ? [elem] : elem);
        } else if (!rhtml.test(elem)) {
          nodes.push(context.createTextNode(elem));
        } else {
          tmp = tmp || fragment.appendChild(context.createElement("div"));
          tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
          wrap = wrapMap[tag] || wrapMap._default;
          tmp.innerHTML = wrap[1] + jQuery2.htmlPrefilter(elem) + wrap[2];
          j = wrap[0];
          while (j--) {
            tmp = tmp.lastChild;
          }
          jQuery2.merge(nodes, tmp.childNodes);
          tmp = fragment.firstChild;
          tmp.textContent = "";
        }
      }
    }
    fragment.textContent = "";
    i = 0;
    while (elem = nodes[i++]) {
      if (selection && jQuery2.inArray(elem, selection) > -1) {
        if (ignored) {
          ignored.push(elem);
        }
        continue;
      }
      attached = isAttached(elem);
      tmp = getAll(fragment.appendChild(elem), "script");
      if (attached) {
        setGlobalEval(tmp);
      }
      if (scripts) {
        j = 0;
        while (elem = tmp[j++]) {
          if (rscriptType.test(elem.type || "")) {
            scripts.push(elem);
          }
        }
      }
    }
    return fragment;
  }
  var rtypenamespace = /^([^.]*)(?:\.(.+)|)/;
  function returnTrue() {
    return true;
  }
  function returnFalse() {
    return false;
  }
  function on(elem, types, selector, data, fn, one) {
    var origFn, type;
    if (typeof types === "object") {
      if (typeof selector !== "string") {
        data = data || selector;
        selector = void 0;
      }
      for (type in types) {
        on(elem, type, selector, data, types[type], one);
      }
      return elem;
    }
    if (data == null && fn == null) {
      fn = selector;
      data = selector = void 0;
    } else if (fn == null) {
      if (typeof selector === "string") {
        fn = data;
        data = void 0;
      } else {
        fn = data;
        data = selector;
        selector = void 0;
      }
    }
    if (fn === false) {
      fn = returnFalse;
    } else if (!fn) {
      return elem;
    }
    if (one === 1) {
      origFn = fn;
      fn = function(event) {
        jQuery2().off(event);
        return origFn.apply(this, arguments);
      };
      fn.guid = origFn.guid || (origFn.guid = jQuery2.guid++);
    }
    return elem.each(function() {
      jQuery2.event.add(this, types, fn, data, selector);
    });
  }
  jQuery2.event = {
    global: {},
    add: function(elem, types, handler, data, selector) {
      var handleObjIn, eventHandle, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = dataPriv.get(elem);
      if (!acceptData(elem)) {
        return;
      }
      if (handler.handler) {
        handleObjIn = handler;
        handler = handleObjIn.handler;
        selector = handleObjIn.selector;
      }
      if (selector) {
        jQuery2.find.matchesSelector(documentElement, selector);
      }
      if (!handler.guid) {
        handler.guid = jQuery2.guid++;
      }
      if (!(events = elemData.events)) {
        events = elemData.events = /* @__PURE__ */ Object.create(null);
      }
      if (!(eventHandle = elemData.handle)) {
        eventHandle = elemData.handle = function(e) {
          return typeof jQuery2 !== "undefined" && jQuery2.event.triggered !== e.type ? jQuery2.event.dispatch.apply(elem, arguments) : void 0;
        };
      }
      types = (types || "").match(rnothtmlwhite) || [""];
      t = types.length;
      while (t--) {
        tmp = rtypenamespace.exec(types[t]) || [];
        type = origType = tmp[1];
        namespaces = (tmp[2] || "").split(".").sort();
        if (!type) {
          continue;
        }
        special = jQuery2.event.special[type] || {};
        type = (selector ? special.delegateType : special.bindType) || type;
        special = jQuery2.event.special[type] || {};
        handleObj = jQuery2.extend({
          type,
          origType,
          data,
          handler,
          guid: handler.guid,
          selector,
          needsContext: selector && jQuery2.expr.match.needsContext.test(selector),
          namespace: namespaces.join(".")
        }, handleObjIn);
        if (!(handlers = events[type])) {
          handlers = events[type] = [];
          handlers.delegateCount = 0;
          if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
            if (elem.addEventListener) {
              elem.addEventListener(type, eventHandle);
            }
          }
        }
        if (special.add) {
          special.add.call(elem, handleObj);
          if (!handleObj.handler.guid) {
            handleObj.handler.guid = handler.guid;
          }
        }
        if (selector) {
          handlers.splice(handlers.delegateCount++, 0, handleObj);
        } else {
          handlers.push(handleObj);
        }
        jQuery2.event.global[type] = true;
      }
    },
    // Detach an event or set of events from an element
    remove: function(elem, types, handler, selector, mappedTypes) {
      var j, origCount, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = dataPriv.hasData(elem) && dataPriv.get(elem);
      if (!elemData || !(events = elemData.events)) {
        return;
      }
      types = (types || "").match(rnothtmlwhite) || [""];
      t = types.length;
      while (t--) {
        tmp = rtypenamespace.exec(types[t]) || [];
        type = origType = tmp[1];
        namespaces = (tmp[2] || "").split(".").sort();
        if (!type) {
          for (type in events) {
            jQuery2.event.remove(elem, type + types[t], handler, selector, true);
          }
          continue;
        }
        special = jQuery2.event.special[type] || {};
        type = (selector ? special.delegateType : special.bindType) || type;
        handlers = events[type] || [];
        tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");
        origCount = j = handlers.length;
        while (j--) {
          handleObj = handlers[j];
          if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
            handlers.splice(j, 1);
            if (handleObj.selector) {
              handlers.delegateCount--;
            }
            if (special.remove) {
              special.remove.call(elem, handleObj);
            }
          }
        }
        if (origCount && !handlers.length) {
          if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
            jQuery2.removeEvent(elem, type, elemData.handle);
          }
          delete events[type];
        }
      }
      if (jQuery2.isEmptyObject(events)) {
        dataPriv.remove(elem, "handle events");
      }
    },
    dispatch: function(nativeEvent) {
      var i, j, ret, matched, handleObj, handlerQueue, args = new Array(arguments.length), event = jQuery2.event.fix(nativeEvent), handlers = (dataPriv.get(this, "events") || /* @__PURE__ */ Object.create(null))[event.type] || [], special = jQuery2.event.special[event.type] || {};
      args[0] = event;
      for (i = 1; i < arguments.length; i++) {
        args[i] = arguments[i];
      }
      event.delegateTarget = this;
      if (special.preDispatch && special.preDispatch.call(this, event) === false) {
        return;
      }
      handlerQueue = jQuery2.event.handlers.call(this, event, handlers);
      i = 0;
      while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
        event.currentTarget = matched.elem;
        j = 0;
        while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {
          if (!event.rnamespace || handleObj.namespace === false || event.rnamespace.test(handleObj.namespace)) {
            event.handleObj = handleObj;
            event.data = handleObj.data;
            ret = ((jQuery2.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
            if (ret !== void 0) {
              if ((event.result = ret) === false) {
                event.preventDefault();
                event.stopPropagation();
              }
            }
          }
        }
      }
      if (special.postDispatch) {
        special.postDispatch.call(this, event);
      }
      return event.result;
    },
    handlers: function(event, handlers) {
      var i, handleObj, sel, matchedHandlers, matchedSelectors, handlerQueue = [], delegateCount = handlers.delegateCount, cur = event.target;
      if (delegateCount && // Support: IE <=9
      // Black-hole SVG <use> instance trees (trac-13180)
      cur.nodeType && // Support: Firefox <=42
      // Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
      // https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
      // Support: IE 11 only
      // ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
      !(event.type === "click" && event.button >= 1)) {
        for (; cur !== this; cur = cur.parentNode || this) {
          if (cur.nodeType === 1 && !(event.type === "click" && cur.disabled === true)) {
            matchedHandlers = [];
            matchedSelectors = {};
            for (i = 0; i < delegateCount; i++) {
              handleObj = handlers[i];
              sel = handleObj.selector + " ";
              if (matchedSelectors[sel] === void 0) {
                matchedSelectors[sel] = handleObj.needsContext ? jQuery2(sel, this).index(cur) > -1 : jQuery2.find(sel, this, null, [cur]).length;
              }
              if (matchedSelectors[sel]) {
                matchedHandlers.push(handleObj);
              }
            }
            if (matchedHandlers.length) {
              handlerQueue.push({ elem: cur, handlers: matchedHandlers });
            }
          }
        }
      }
      cur = this;
      if (delegateCount < handlers.length) {
        handlerQueue.push({ elem: cur, handlers: handlers.slice(delegateCount) });
      }
      return handlerQueue;
    },
    addProp: function(name, hook) {
      Object.defineProperty(jQuery2.Event.prototype, name, {
        enumerable: true,
        configurable: true,
        get: isFunction(hook) ? function() {
          if (this.originalEvent) {
            return hook(this.originalEvent);
          }
        } : function() {
          if (this.originalEvent) {
            return this.originalEvent[name];
          }
        },
        set: function(value) {
          Object.defineProperty(this, name, {
            enumerable: true,
            configurable: true,
            writable: true,
            value
          });
        }
      });
    },
    fix: function(originalEvent) {
      return originalEvent[jQuery2.expando] ? originalEvent : new jQuery2.Event(originalEvent);
    },
    special: {
      load: {
        // Prevent triggered image.load events from bubbling to window.load
        noBubble: true
      },
      click: {
        // Utilize native event to ensure correct state for checkable inputs
        setup: function(data) {
          var el = this || data;
          if (rcheckableType.test(el.type) && el.click && nodeName(el, "input")) {
            leverageNative(el, "click", true);
          }
          return false;
        },
        trigger: function(data) {
          var el = this || data;
          if (rcheckableType.test(el.type) && el.click && nodeName(el, "input")) {
            leverageNative(el, "click");
          }
          return true;
        },
        // For cross-browser consistency, suppress native .click() on links
        // Also prevent it if we're currently inside a leveraged native-event stack
        _default: function(event) {
          var target = event.target;
          return rcheckableType.test(target.type) && target.click && nodeName(target, "input") && dataPriv.get(target, "click") || nodeName(target, "a");
        }
      },
      beforeunload: {
        postDispatch: function(event) {
          if (event.result !== void 0 && event.originalEvent) {
            event.originalEvent.returnValue = event.result;
          }
        }
      }
    }
  };
  function leverageNative(el, type, isSetup) {
    if (!isSetup) {
      if (dataPriv.get(el, type) === void 0) {
        jQuery2.event.add(el, type, returnTrue);
      }
      return;
    }
    dataPriv.set(el, type, false);
    jQuery2.event.add(el, type, {
      namespace: false,
      handler: function(event) {
        var result, saved = dataPriv.get(this, type);
        if (event.isTrigger & 1 && this[type]) {
          if (!saved) {
            saved = slice.call(arguments);
            dataPriv.set(this, type, saved);
            this[type]();
            result = dataPriv.get(this, type);
            dataPriv.set(this, type, false);
            if (saved !== result) {
              event.stopImmediatePropagation();
              event.preventDefault();
              return result;
            }
          } else if ((jQuery2.event.special[type] || {}).delegateType) {
            event.stopPropagation();
          }
        } else if (saved) {
          dataPriv.set(this, type, jQuery2.event.trigger(
            saved[0],
            saved.slice(1),
            this
          ));
          event.stopPropagation();
          event.isImmediatePropagationStopped = returnTrue;
        }
      }
    });
  }
  jQuery2.removeEvent = function(elem, type, handle) {
    if (elem.removeEventListener) {
      elem.removeEventListener(type, handle);
    }
  };
  jQuery2.Event = function(src, props) {
    if (!(this instanceof jQuery2.Event)) {
      return new jQuery2.Event(src, props);
    }
    if (src && src.type) {
      this.originalEvent = src;
      this.type = src.type;
      this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === void 0 && // Support: Android <=2.3 only
      src.returnValue === false ? returnTrue : returnFalse;
      this.target = src.target && src.target.nodeType === 3 ? src.target.parentNode : src.target;
      this.currentTarget = src.currentTarget;
      this.relatedTarget = src.relatedTarget;
    } else {
      this.type = src;
    }
    if (props) {
      jQuery2.extend(this, props);
    }
    this.timeStamp = src && src.timeStamp || Date.now();
    this[jQuery2.expando] = true;
  };
  jQuery2.Event.prototype = {
    constructor: jQuery2.Event,
    isDefaultPrevented: returnFalse,
    isPropagationStopped: returnFalse,
    isImmediatePropagationStopped: returnFalse,
    isSimulated: false,
    preventDefault: function() {
      var e = this.originalEvent;
      this.isDefaultPrevented = returnTrue;
      if (e && !this.isSimulated) {
        e.preventDefault();
      }
    },
    stopPropagation: function() {
      var e = this.originalEvent;
      this.isPropagationStopped = returnTrue;
      if (e && !this.isSimulated) {
        e.stopPropagation();
      }
    },
    stopImmediatePropagation: function() {
      var e = this.originalEvent;
      this.isImmediatePropagationStopped = returnTrue;
      if (e && !this.isSimulated) {
        e.stopImmediatePropagation();
      }
      this.stopPropagation();
    }
  };
  jQuery2.each({
    altKey: true,
    bubbles: true,
    cancelable: true,
    changedTouches: true,
    ctrlKey: true,
    detail: true,
    eventPhase: true,
    metaKey: true,
    pageX: true,
    pageY: true,
    shiftKey: true,
    view: true,
    "char": true,
    code: true,
    charCode: true,
    key: true,
    keyCode: true,
    button: true,
    buttons: true,
    clientX: true,
    clientY: true,
    offsetX: true,
    offsetY: true,
    pointerId: true,
    pointerType: true,
    screenX: true,
    screenY: true,
    targetTouches: true,
    toElement: true,
    touches: true,
    which: true
  }, jQuery2.event.addProp);
  jQuery2.each({ focus: "focusin", blur: "focusout" }, function(type, delegateType) {
    function focusMappedHandler(nativeEvent) {
      if (document2.documentMode) {
        var handle = dataPriv.get(this, "handle"), event = jQuery2.event.fix(nativeEvent);
        event.type = nativeEvent.type === "focusin" ? "focus" : "blur";
        event.isSimulated = true;
        handle(nativeEvent);
        if (event.target === event.currentTarget) {
          handle(event);
        }
      } else {
        jQuery2.event.simulate(
          delegateType,
          nativeEvent.target,
          jQuery2.event.fix(nativeEvent)
        );
      }
    }
    jQuery2.event.special[type] = {
      // Utilize native event if possible so blur/focus sequence is correct
      setup: function() {
        var attaches;
        leverageNative(this, type, true);
        if (document2.documentMode) {
          attaches = dataPriv.get(this, delegateType);
          if (!attaches) {
            this.addEventListener(delegateType, focusMappedHandler);
          }
          dataPriv.set(this, delegateType, (attaches || 0) + 1);
        } else {
          return false;
        }
      },
      trigger: function() {
        leverageNative(this, type);
        return true;
      },
      teardown: function() {
        var attaches;
        if (document2.documentMode) {
          attaches = dataPriv.get(this, delegateType) - 1;
          if (!attaches) {
            this.removeEventListener(delegateType, focusMappedHandler);
            dataPriv.remove(this, delegateType);
          } else {
            dataPriv.set(this, delegateType, attaches);
          }
        } else {
          return false;
        }
      },
      // Suppress native focus or blur if we're currently inside
      // a leveraged native-event stack
      _default: function(event) {
        return dataPriv.get(event.target, type);
      },
      delegateType
    };
    jQuery2.event.special[delegateType] = {
      setup: function() {
        var doc = this.ownerDocument || this.document || this, dataHolder = document2.documentMode ? this : doc, attaches = dataPriv.get(dataHolder, delegateType);
        if (!attaches) {
          if (document2.documentMode) {
            this.addEventListener(delegateType, focusMappedHandler);
          } else {
            doc.addEventListener(type, focusMappedHandler, true);
          }
        }
        dataPriv.set(dataHolder, delegateType, (attaches || 0) + 1);
      },
      teardown: function() {
        var doc = this.ownerDocument || this.document || this, dataHolder = document2.documentMode ? this : doc, attaches = dataPriv.get(dataHolder, delegateType) - 1;
        if (!attaches) {
          if (document2.documentMode) {
            this.removeEventListener(delegateType, focusMappedHandler);
          } else {
            doc.removeEventListener(type, focusMappedHandler, true);
          }
          dataPriv.remove(dataHolder, delegateType);
        } else {
          dataPriv.set(dataHolder, delegateType, attaches);
        }
      }
    };
  });
  jQuery2.each({
    mouseenter: "mouseover",
    mouseleave: "mouseout",
    pointerenter: "pointerover",
    pointerleave: "pointerout"
  }, function(orig, fix) {
    jQuery2.event.special[orig] = {
      delegateType: fix,
      bindType: fix,
      handle: function(event) {
        var ret, target = this, related = event.relatedTarget, handleObj = event.handleObj;
        if (!related || related !== target && !jQuery2.contains(target, related)) {
          event.type = handleObj.origType;
          ret = handleObj.handler.apply(this, arguments);
          event.type = fix;
        }
        return ret;
      }
    };
  });
  jQuery2.fn.extend({
    on: function(types, selector, data, fn) {
      return on(this, types, selector, data, fn);
    },
    one: function(types, selector, data, fn) {
      return on(this, types, selector, data, fn, 1);
    },
    off: function(types, selector, fn) {
      var handleObj, type;
      if (types && types.preventDefault && types.handleObj) {
        handleObj = types.handleObj;
        jQuery2(types.delegateTarget).off(
          handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
          handleObj.selector,
          handleObj.handler
        );
        return this;
      }
      if (typeof types === "object") {
        for (type in types) {
          this.off(type, selector, types[type]);
        }
        return this;
      }
      if (selector === false || typeof selector === "function") {
        fn = selector;
        selector = void 0;
      }
      if (fn === false) {
        fn = returnFalse;
      }
      return this.each(function() {
        jQuery2.event.remove(this, types, fn, selector);
      });
    }
  });
  var rnoInnerhtml = /<script|<style|<link/i, rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i, rcleanScript = /^\s*<!\[CDATA\[|\]\]>\s*$/g;
  function manipulationTarget(elem, content) {
    if (nodeName(elem, "table") && nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr")) {
      return jQuery2(elem).children("tbody")[0] || elem;
    }
    return elem;
  }
  function disableScript(elem) {
    elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
    return elem;
  }
  function restoreScript(elem) {
    if ((elem.type || "").slice(0, 5) === "true/") {
      elem.type = elem.type.slice(5);
    } else {
      elem.removeAttribute("type");
    }
    return elem;
  }
  function cloneCopyEvent(src, dest) {
    var i, l, type, pdataOld, udataOld, udataCur, events;
    if (dest.nodeType !== 1) {
      return;
    }
    if (dataPriv.hasData(src)) {
      pdataOld = dataPriv.get(src);
      events = pdataOld.events;
      if (events) {
        dataPriv.remove(dest, "handle events");
        for (type in events) {
          for (i = 0, l = events[type].length; i < l; i++) {
            jQuery2.event.add(dest, type, events[type][i]);
          }
        }
      }
    }
    if (dataUser.hasData(src)) {
      udataOld = dataUser.access(src);
      udataCur = jQuery2.extend({}, udataOld);
      dataUser.set(dest, udataCur);
    }
  }
  function fixInput(src, dest) {
    var nodeName2 = dest.nodeName.toLowerCase();
    if (nodeName2 === "input" && rcheckableType.test(src.type)) {
      dest.checked = src.checked;
    } else if (nodeName2 === "input" || nodeName2 === "textarea") {
      dest.defaultValue = src.defaultValue;
    }
  }
  function domManip(collection, args, callback, ignored) {
    args = flat(args);
    var fragment, first, scripts, hasScripts, node, doc, i = 0, l = collection.length, iNoClone = l - 1, value = args[0], valueIsFunction = isFunction(value);
    if (valueIsFunction || l > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value)) {
      return collection.each(function(index) {
        var self = collection.eq(index);
        if (valueIsFunction) {
          args[0] = value.call(this, index, self.html());
        }
        domManip(self, args, callback, ignored);
      });
    }
    if (l) {
      fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
      first = fragment.firstChild;
      if (fragment.childNodes.length === 1) {
        fragment = first;
      }
      if (first || ignored) {
        scripts = jQuery2.map(getAll(fragment, "script"), disableScript);
        hasScripts = scripts.length;
        for (; i < l; i++) {
          node = fragment;
          if (i !== iNoClone) {
            node = jQuery2.clone(node, true, true);
            if (hasScripts) {
              jQuery2.merge(scripts, getAll(node, "script"));
            }
          }
          callback.call(collection[i], node, i);
        }
        if (hasScripts) {
          doc = scripts[scripts.length - 1].ownerDocument;
          jQuery2.map(scripts, restoreScript);
          for (i = 0; i < hasScripts; i++) {
            node = scripts[i];
            if (rscriptType.test(node.type || "") && !dataPriv.access(node, "globalEval") && jQuery2.contains(doc, node)) {
              if (node.src && (node.type || "").toLowerCase() !== "module") {
                if (jQuery2._evalUrl && !node.noModule) {
                  jQuery2._evalUrl(node.src, {
                    nonce: node.nonce || node.getAttribute("nonce")
                  }, doc);
                }
              } else {
                DOMEval(node.textContent.replace(rcleanScript, ""), node, doc);
              }
            }
          }
        }
      }
    }
    return collection;
  }
  function remove(elem, selector, keepData) {
    var node, nodes = selector ? jQuery2.filter(selector, elem) : elem, i = 0;
    for (; (node = nodes[i]) != null; i++) {
      if (!keepData && node.nodeType === 1) {
        jQuery2.cleanData(getAll(node));
      }
      if (node.parentNode) {
        if (keepData && isAttached(node)) {
          setGlobalEval(getAll(node, "script"));
        }
        node.parentNode.removeChild(node);
      }
    }
    return elem;
  }
  jQuery2.extend({
    htmlPrefilter: function(html) {
      return html;
    },
    clone: function(elem, dataAndEvents, deepDataAndEvents) {
      var i, l, srcElements, destElements, clone = elem.cloneNode(true), inPage = isAttached(elem);
      if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery2.isXMLDoc(elem)) {
        destElements = getAll(clone);
        srcElements = getAll(elem);
        for (i = 0, l = srcElements.length; i < l; i++) {
          fixInput(srcElements[i], destElements[i]);
        }
      }
      if (dataAndEvents) {
        if (deepDataAndEvents) {
          srcElements = srcElements || getAll(elem);
          destElements = destElements || getAll(clone);
          for (i = 0, l = srcElements.length; i < l; i++) {
            cloneCopyEvent(srcElements[i], destElements[i]);
          }
        } else {
          cloneCopyEvent(elem, clone);
        }
      }
      destElements = getAll(clone, "script");
      if (destElements.length > 0) {
        setGlobalEval(destElements, !inPage && getAll(elem, "script"));
      }
      return clone;
    },
    cleanData: function(elems) {
      var data, elem, type, special = jQuery2.event.special, i = 0;
      for (; (elem = elems[i]) !== void 0; i++) {
        if (acceptData(elem)) {
          if (data = elem[dataPriv.expando]) {
            if (data.events) {
              for (type in data.events) {
                if (special[type]) {
                  jQuery2.event.remove(elem, type);
                } else {
                  jQuery2.removeEvent(elem, type, data.handle);
                }
              }
            }
            elem[dataPriv.expando] = void 0;
          }
          if (elem[dataUser.expando]) {
            elem[dataUser.expando] = void 0;
          }
        }
      }
    }
  });
  jQuery2.fn.extend({
    detach: function(selector) {
      return remove(this, selector, true);
    },
    remove: function(selector) {
      return remove(this, selector);
    },
    text: function(value) {
      return access(this, function(value2) {
        return value2 === void 0 ? jQuery2.text(this) : this.empty().each(function() {
          if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
            this.textContent = value2;
          }
        });
      }, null, value, arguments.length);
    },
    append: function() {
      return domManip(this, arguments, function(elem) {
        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
          var target = manipulationTarget(this, elem);
          target.appendChild(elem);
        }
      });
    },
    prepend: function() {
      return domManip(this, arguments, function(elem) {
        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
          var target = manipulationTarget(this, elem);
          target.insertBefore(elem, target.firstChild);
        }
      });
    },
    before: function() {
      return domManip(this, arguments, function(elem) {
        if (this.parentNode) {
          this.parentNode.insertBefore(elem, this);
        }
      });
    },
    after: function() {
      return domManip(this, arguments, function(elem) {
        if (this.parentNode) {
          this.parentNode.insertBefore(elem, this.nextSibling);
        }
      });
    },
    empty: function() {
      var elem, i = 0;
      for (; (elem = this[i]) != null; i++) {
        if (elem.nodeType === 1) {
          jQuery2.cleanData(getAll(elem, false));
          elem.textContent = "";
        }
      }
      return this;
    },
    clone: function(dataAndEvents, deepDataAndEvents) {
      dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
      deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
      return this.map(function() {
        return jQuery2.clone(this, dataAndEvents, deepDataAndEvents);
      });
    },
    html: function(value) {
      return access(this, function(value2) {
        var elem = this[0] || {}, i = 0, l = this.length;
        if (value2 === void 0 && elem.nodeType === 1) {
          return elem.innerHTML;
        }
        if (typeof value2 === "string" && !rnoInnerhtml.test(value2) && !wrapMap[(rtagName.exec(value2) || ["", ""])[1].toLowerCase()]) {
          value2 = jQuery2.htmlPrefilter(value2);
          try {
            for (; i < l; i++) {
              elem = this[i] || {};
              if (elem.nodeType === 1) {
                jQuery2.cleanData(getAll(elem, false));
                elem.innerHTML = value2;
              }
            }
            elem = 0;
          } catch (e) {
          }
        }
        if (elem) {
          this.empty().append(value2);
        }
      }, null, value, arguments.length);
    },
    replaceWith: function() {
      var ignored = [];
      return domManip(this, arguments, function(elem) {
        var parent = this.parentNode;
        if (jQuery2.inArray(this, ignored) < 0) {
          jQuery2.cleanData(getAll(this));
          if (parent) {
            parent.replaceChild(elem, this);
          }
        }
      }, ignored);
    }
  });
  jQuery2.each({
    appendTo: "append",
    prependTo: "prepend",
    insertBefore: "before",
    insertAfter: "after",
    replaceAll: "replaceWith"
  }, function(name, original) {
    jQuery2.fn[name] = function(selector) {
      var elems, ret = [], insert = jQuery2(selector), last = insert.length - 1, i = 0;
      for (; i <= last; i++) {
        elems = i === last ? this : this.clone(true);
        jQuery2(insert[i])[original](elems);
        push.apply(ret, elems.get());
      }
      return this.pushStack(ret);
    };
  });
  var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");
  var rcustomProp = /^--/;
  var getStyles = function(elem) {
    var view = elem.ownerDocument.defaultView;
    if (!view || !view.opener) {
      view = window2;
    }
    return view.getComputedStyle(elem);
  };
  var swap = function(elem, options, callback) {
    var ret, name, old = {};
    for (name in options) {
      old[name] = elem.style[name];
      elem.style[name] = options[name];
    }
    ret = callback.call(elem);
    for (name in options) {
      elem.style[name] = old[name];
    }
    return ret;
  };
  var rboxStyle = new RegExp(cssExpand.join("|"), "i");
  (function() {
    function computeStyleTests() {
      if (!div) {
        return;
      }
      container.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0";
      div.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%";
      documentElement.appendChild(container).appendChild(div);
      var divStyle = window2.getComputedStyle(div);
      pixelPositionVal = divStyle.top !== "1%";
      reliableMarginLeftVal = roundPixelMeasures(divStyle.marginLeft) === 12;
      div.style.right = "60%";
      pixelBoxStylesVal = roundPixelMeasures(divStyle.right) === 36;
      boxSizingReliableVal = roundPixelMeasures(divStyle.width) === 36;
      div.style.position = "absolute";
      scrollboxSizeVal = roundPixelMeasures(div.offsetWidth / 3) === 12;
      documentElement.removeChild(container);
      div = null;
    }
    function roundPixelMeasures(measure) {
      return Math.round(parseFloat(measure));
    }
    var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal, reliableTrDimensionsVal, reliableMarginLeftVal, container = document2.createElement("div"), div = document2.createElement("div");
    if (!div.style) {
      return;
    }
    div.style.backgroundClip = "content-box";
    div.cloneNode(true).style.backgroundClip = "";
    support.clearCloneStyle = div.style.backgroundClip === "content-box";
    jQuery2.extend(support, {
      boxSizingReliable: function() {
        computeStyleTests();
        return boxSizingReliableVal;
      },
      pixelBoxStyles: function() {
        computeStyleTests();
        return pixelBoxStylesVal;
      },
      pixelPosition: function() {
        computeStyleTests();
        return pixelPositionVal;
      },
      reliableMarginLeft: function() {
        computeStyleTests();
        return reliableMarginLeftVal;
      },
      scrollboxSize: function() {
        computeStyleTests();
        return scrollboxSizeVal;
      },
      // Support: IE 9 - 11+, Edge 15 - 18+
      // IE/Edge misreport `getComputedStyle` of table rows with width/height
      // set in CSS while `offset*` properties report correct values.
      // Behavior in IE 9 is more subtle than in newer versions & it passes
      // some versions of this test; make sure not to make it pass there!
      //
      // Support: Firefox 70+
      // Only Firefox includes border widths
      // in computed dimensions. (gh-4529)
      reliableTrDimensions: function() {
        var table, tr, trChild, trStyle;
        if (reliableTrDimensionsVal == null) {
          table = document2.createElement("table");
          tr = document2.createElement("tr");
          trChild = document2.createElement("div");
          table.style.cssText = "position:absolute;left:-11111px;border-collapse:separate";
          tr.style.cssText = "box-sizing:content-box;border:1px solid";
          tr.style.height = "1px";
          trChild.style.height = "9px";
          trChild.style.display = "block";
          documentElement.appendChild(table).appendChild(tr).appendChild(trChild);
          trStyle = window2.getComputedStyle(tr);
          reliableTrDimensionsVal = parseInt(trStyle.height, 10) + parseInt(trStyle.borderTopWidth, 10) + parseInt(trStyle.borderBottomWidth, 10) === tr.offsetHeight;
          documentElement.removeChild(table);
        }
        return reliableTrDimensionsVal;
      }
    });
  })();
  function curCSS(elem, name, computed) {
    var width, minWidth, maxWidth, ret, isCustomProp = rcustomProp.test(name), style = elem.style;
    computed = computed || getStyles(elem);
    if (computed) {
      ret = computed.getPropertyValue(name) || computed[name];
      if (isCustomProp && ret) {
        ret = ret.replace(rtrimCSS, "$1") || void 0;
      }
      if (ret === "" && !isAttached(elem)) {
        ret = jQuery2.style(elem, name);
      }
      if (!support.pixelBoxStyles() && rnumnonpx.test(ret) && rboxStyle.test(name)) {
        width = style.width;
        minWidth = style.minWidth;
        maxWidth = style.maxWidth;
        style.minWidth = style.maxWidth = style.width = ret;
        ret = computed.width;
        style.width = width;
        style.minWidth = minWidth;
        style.maxWidth = maxWidth;
      }
    }
    return ret !== void 0 ? (
      // Support: IE <=9 - 11 only
      // IE returns zIndex value as an integer.
      ret + ""
    ) : ret;
  }
  function addGetHookIf(conditionFn, hookFn) {
    return {
      get: function() {
        if (conditionFn()) {
          delete this.get;
          return;
        }
        return (this.get = hookFn).apply(this, arguments);
      }
    };
  }
  var cssPrefixes = ["Webkit", "Moz", "ms"], emptyStyle = document2.createElement("div").style, vendorProps = {};
  function vendorPropName(name) {
    var capName = name[0].toUpperCase() + name.slice(1), i = cssPrefixes.length;
    while (i--) {
      name = cssPrefixes[i] + capName;
      if (name in emptyStyle) {
        return name;
      }
    }
  }
  function finalPropName(name) {
    var final = jQuery2.cssProps[name] || vendorProps[name];
    if (final) {
      return final;
    }
    if (name in emptyStyle) {
      return name;
    }
    return vendorProps[name] = vendorPropName(name) || name;
  }
  var rdisplayswap = /^(none|table(?!-c[ea]).+)/, cssShow = { position: "absolute", visibility: "hidden", display: "block" }, cssNormalTransform = {
    letterSpacing: "0",
    fontWeight: "400"
  };
  function setPositiveNumber(_elem, value, subtract) {
    var matches = rcssNum.exec(value);
    return matches ? (
      // Guard against undefined "subtract", e.g., when used as in cssHooks
      Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px")
    ) : value;
  }
  function boxModelAdjustment(elem, dimension, box, isBorderBox, styles, computedVal) {
    var i = dimension === "width" ? 1 : 0, extra = 0, delta = 0, marginDelta = 0;
    if (box === (isBorderBox ? "border" : "content")) {
      return 0;
    }
    for (; i < 4; i += 2) {
      if (box === "margin") {
        marginDelta += jQuery2.css(elem, box + cssExpand[i], true, styles);
      }
      if (!isBorderBox) {
        delta += jQuery2.css(elem, "padding" + cssExpand[i], true, styles);
        if (box !== "padding") {
          delta += jQuery2.css(elem, "border" + cssExpand[i] + "Width", true, styles);
        } else {
          extra += jQuery2.css(elem, "border" + cssExpand[i] + "Width", true, styles);
        }
      } else {
        if (box === "content") {
          delta -= jQuery2.css(elem, "padding" + cssExpand[i], true, styles);
        }
        if (box !== "margin") {
          delta -= jQuery2.css(elem, "border" + cssExpand[i] + "Width", true, styles);
        }
      }
    }
    if (!isBorderBox && computedVal >= 0) {
      delta += Math.max(0, Math.ceil(
        elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)] - computedVal - delta - extra - 0.5
        // If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
        // Use an explicit zero to avoid NaN (gh-3964)
      )) || 0;
    }
    return delta + marginDelta;
  }
  function getWidthOrHeight(elem, dimension, extra) {
    var styles = getStyles(elem), boxSizingNeeded = !support.boxSizingReliable() || extra, isBorderBox = boxSizingNeeded && jQuery2.css(elem, "boxSizing", false, styles) === "border-box", valueIsBorderBox = isBorderBox, val = curCSS(elem, dimension, styles), offsetProp = "offset" + dimension[0].toUpperCase() + dimension.slice(1);
    if (rnumnonpx.test(val)) {
      if (!extra) {
        return val;
      }
      val = "auto";
    }
    if ((!support.boxSizingReliable() && isBorderBox || // Support: IE 10 - 11+, Edge 15 - 18+
    // IE/Edge misreport `getComputedStyle` of table rows with width/height
    // set in CSS while `offset*` properties report correct values.
    // Interestingly, in some cases IE 9 doesn't suffer from this issue.
    !support.reliableTrDimensions() && nodeName(elem, "tr") || // Fall back to offsetWidth/offsetHeight when value is "auto"
    // This happens for inline elements with no explicit setting (gh-3571)
    val === "auto" || // Support: Android <=4.1 - 4.3 only
    // Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
    !parseFloat(val) && jQuery2.css(elem, "display", false, styles) === "inline") && // Make sure the element is visible & connected
    elem.getClientRects().length) {
      isBorderBox = jQuery2.css(elem, "boxSizing", false, styles) === "border-box";
      valueIsBorderBox = offsetProp in elem;
      if (valueIsBorderBox) {
        val = elem[offsetProp];
      }
    }
    val = parseFloat(val) || 0;
    return val + boxModelAdjustment(
      elem,
      dimension,
      extra || (isBorderBox ? "border" : "content"),
      valueIsBorderBox,
      styles,
      // Provide the current computed size to request scroll gutter calculation (gh-3589)
      val
    ) + "px";
  }
  jQuery2.extend({
    // Add in style property hooks for overriding the default
    // behavior of getting and setting a style property
    cssHooks: {
      opacity: {
        get: function(elem, computed) {
          if (computed) {
            var ret = curCSS(elem, "opacity");
            return ret === "" ? "1" : ret;
          }
        }
      }
    },
    // Don't automatically add "px" to these possibly-unitless properties
    cssNumber: {
      animationIterationCount: true,
      aspectRatio: true,
      borderImageSlice: true,
      columnCount: true,
      flexGrow: true,
      flexShrink: true,
      fontWeight: true,
      gridArea: true,
      gridColumn: true,
      gridColumnEnd: true,
      gridColumnStart: true,
      gridRow: true,
      gridRowEnd: true,
      gridRowStart: true,
      lineHeight: true,
      opacity: true,
      order: true,
      orphans: true,
      scale: true,
      widows: true,
      zIndex: true,
      zoom: true,
      // SVG-related
      fillOpacity: true,
      floodOpacity: true,
      stopOpacity: true,
      strokeMiterlimit: true,
      strokeOpacity: true
    },
    // Add in properties whose names you wish to fix before
    // setting or getting the value
    cssProps: {},
    // Get and set the style property on a DOM Node
    style: function(elem, name, value, extra) {
      if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
        return;
      }
      var ret, type, hooks, origName = camelCase(name), isCustomProp = rcustomProp.test(name), style = elem.style;
      if (!isCustomProp) {
        name = finalPropName(origName);
      }
      hooks = jQuery2.cssHooks[name] || jQuery2.cssHooks[origName];
      if (value !== void 0) {
        type = typeof value;
        if (type === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
          value = adjustCSS(elem, name, ret);
          type = "number";
        }
        if (value == null || value !== value) {
          return;
        }
        if (type === "number" && !isCustomProp) {
          value += ret && ret[3] || (jQuery2.cssNumber[origName] ? "" : "px");
        }
        if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
          style[name] = "inherit";
        }
        if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== void 0) {
          if (isCustomProp) {
            style.setProperty(name, value);
          } else {
            style[name] = value;
          }
        }
      } else {
        if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== void 0) {
          return ret;
        }
        return style[name];
      }
    },
    css: function(elem, name, extra, styles) {
      var val, num, hooks, origName = camelCase(name), isCustomProp = rcustomProp.test(name);
      if (!isCustomProp) {
        name = finalPropName(origName);
      }
      hooks = jQuery2.cssHooks[name] || jQuery2.cssHooks[origName];
      if (hooks && "get" in hooks) {
        val = hooks.get(elem, true, extra);
      }
      if (val === void 0) {
        val = curCSS(elem, name, styles);
      }
      if (val === "normal" && name in cssNormalTransform) {
        val = cssNormalTransform[name];
      }
      if (extra === "" || extra) {
        num = parseFloat(val);
        return extra === true || isFinite(num) ? num || 0 : val;
      }
      return val;
    }
  });
  jQuery2.each(["height", "width"], function(_i, dimension) {
    jQuery2.cssHooks[dimension] = {
      get: function(elem, computed, extra) {
        if (computed) {
          return rdisplayswap.test(jQuery2.css(elem, "display")) && // Support: Safari 8+
          // Table columns in Safari have non-zero offsetWidth & zero
          // getBoundingClientRect().width unless display is changed.
          // Support: IE <=11 only
          // Running getBoundingClientRect on a disconnected node
          // in IE throws an error.
          (!elem.getClientRects().length || !elem.getBoundingClientRect().width) ? swap(elem, cssShow, function() {
            return getWidthOrHeight(elem, dimension, extra);
          }) : getWidthOrHeight(elem, dimension, extra);
        }
      },
      set: function(elem, value, extra) {
        var matches, styles = getStyles(elem), scrollboxSizeBuggy = !support.scrollboxSize() && styles.position === "absolute", boxSizingNeeded = scrollboxSizeBuggy || extra, isBorderBox = boxSizingNeeded && jQuery2.css(elem, "boxSizing", false, styles) === "border-box", subtract = extra ? boxModelAdjustment(
          elem,
          dimension,
          extra,
          isBorderBox,
          styles
        ) : 0;
        if (isBorderBox && scrollboxSizeBuggy) {
          subtract -= Math.ceil(
            elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)] - parseFloat(styles[dimension]) - boxModelAdjustment(elem, dimension, "border", false, styles) - 0.5
          );
        }
        if (subtract && (matches = rcssNum.exec(value)) && (matches[3] || "px") !== "px") {
          elem.style[dimension] = value;
          value = jQuery2.css(elem, dimension);
        }
        return setPositiveNumber(elem, value, subtract);
      }
    };
  });
  jQuery2.cssHooks.marginLeft = addGetHookIf(
    support.reliableMarginLeft,
    function(elem, computed) {
      if (computed) {
        return (parseFloat(curCSS(elem, "marginLeft")) || elem.getBoundingClientRect().left - swap(elem, { marginLeft: 0 }, function() {
          return elem.getBoundingClientRect().left;
        })) + "px";
      }
    }
  );
  jQuery2.each({
    margin: "",
    padding: "",
    border: "Width"
  }, function(prefix, suffix) {
    jQuery2.cssHooks[prefix + suffix] = {
      expand: function(value) {
        var i = 0, expanded = {}, parts = typeof value === "string" ? value.split(" ") : [value];
        for (; i < 4; i++) {
          expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
        }
        return expanded;
      }
    };
    if (prefix !== "margin") {
      jQuery2.cssHooks[prefix + suffix].set = setPositiveNumber;
    }
  });
  jQuery2.fn.extend({
    css: function(name, value) {
      return access(this, function(elem, name2, value2) {
        var styles, len, map = {}, i = 0;
        if (Array.isArray(name2)) {
          styles = getStyles(elem);
          len = name2.length;
          for (; i < len; i++) {
            map[name2[i]] = jQuery2.css(elem, name2[i], false, styles);
          }
          return map;
        }
        return value2 !== void 0 ? jQuery2.style(elem, name2, value2) : jQuery2.css(elem, name2);
      }, name, value, arguments.length > 1);
    }
  });
  function Tween(elem, options, prop, end, easing) {
    return new Tween.prototype.init(elem, options, prop, end, easing);
  }
  jQuery2.Tween = Tween;
  Tween.prototype = {
    constructor: Tween,
    init: function(elem, options, prop, end, easing, unit) {
      this.elem = elem;
      this.prop = prop;
      this.easing = easing || jQuery2.easing._default;
      this.options = options;
      this.start = this.now = this.cur();
      this.end = end;
      this.unit = unit || (jQuery2.cssNumber[prop] ? "" : "px");
    },
    cur: function() {
      var hooks = Tween.propHooks[this.prop];
      return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
    },
    run: function(percent) {
      var eased, hooks = Tween.propHooks[this.prop];
      if (this.options.duration) {
        this.pos = eased = jQuery2.easing[this.easing](
          percent,
          this.options.duration * percent,
          0,
          1,
          this.options.duration
        );
      } else {
        this.pos = eased = percent;
      }
      this.now = (this.end - this.start) * eased + this.start;
      if (this.options.step) {
        this.options.step.call(this.elem, this.now, this);
      }
      if (hooks && hooks.set) {
        hooks.set(this);
      } else {
        Tween.propHooks._default.set(this);
      }
      return this;
    }
  };
  Tween.prototype.init.prototype = Tween.prototype;
  Tween.propHooks = {
    _default: {
      get: function(tween) {
        var result;
        if (tween.elem.nodeType !== 1 || tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
          return tween.elem[tween.prop];
        }
        result = jQuery2.css(tween.elem, tween.prop, "");
        return !result || result === "auto" ? 0 : result;
      },
      set: function(tween) {
        if (jQuery2.fx.step[tween.prop]) {
          jQuery2.fx.step[tween.prop](tween);
        } else if (tween.elem.nodeType === 1 && (jQuery2.cssHooks[tween.prop] || tween.elem.style[finalPropName(tween.prop)] != null)) {
          jQuery2.style(tween.elem, tween.prop, tween.now + tween.unit);
        } else {
          tween.elem[tween.prop] = tween.now;
        }
      }
    }
  };
  Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
    set: function(tween) {
      if (tween.elem.nodeType && tween.elem.parentNode) {
        tween.elem[tween.prop] = tween.now;
      }
    }
  };
  jQuery2.easing = {
    linear: function(p) {
      return p;
    },
    swing: function(p) {
      return 0.5 - Math.cos(p * Math.PI) / 2;
    },
    _default: "swing"
  };
  jQuery2.fx = Tween.prototype.init;
  jQuery2.fx.step = {};
  var fxNow, inProgress, rfxtypes = /^(?:toggle|show|hide)$/, rrun = /queueHooks$/;
  function schedule() {
    if (inProgress) {
      if (document2.hidden === false && window2.requestAnimationFrame) {
        window2.requestAnimationFrame(schedule);
      } else {
        window2.setTimeout(schedule, jQuery2.fx.interval);
      }
      jQuery2.fx.tick();
    }
  }
  function createFxNow() {
    window2.setTimeout(function() {
      fxNow = void 0;
    });
    return fxNow = Date.now();
  }
  function genFx(type, includeWidth) {
    var which, i = 0, attrs = { height: type };
    includeWidth = includeWidth ? 1 : 0;
    for (; i < 4; i += 2 - includeWidth) {
      which = cssExpand[i];
      attrs["margin" + which] = attrs["padding" + which] = type;
    }
    if (includeWidth) {
      attrs.opacity = attrs.width = type;
    }
    return attrs;
  }
  function createTween(value, prop, animation) {
    var tween, collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]), index = 0, length = collection.length;
    for (; index < length; index++) {
      if (tween = collection[index].call(animation, prop, value)) {
        return tween;
      }
    }
  }
  function defaultPrefilter(elem, props, opts) {
    var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display, isBox = "width" in props || "height" in props, anim = this, orig = {}, style = elem.style, hidden = elem.nodeType && isHiddenWithinTree(elem), dataShow = dataPriv.get(elem, "fxshow");
    if (!opts.queue) {
      hooks = jQuery2._queueHooks(elem, "fx");
      if (hooks.unqueued == null) {
        hooks.unqueued = 0;
        oldfire = hooks.empty.fire;
        hooks.empty.fire = function() {
          if (!hooks.unqueued) {
            oldfire();
          }
        };
      }
      hooks.unqueued++;
      anim.always(function() {
        anim.always(function() {
          hooks.unqueued--;
          if (!jQuery2.queue(elem, "fx").length) {
            hooks.empty.fire();
          }
        });
      });
    }
    for (prop in props) {
      value = props[prop];
      if (rfxtypes.test(value)) {
        delete props[prop];
        toggle = toggle || value === "toggle";
        if (value === (hidden ? "hide" : "show")) {
          if (value === "show" && dataShow && dataShow[prop] !== void 0) {
            hidden = true;
          } else {
            continue;
          }
        }
        orig[prop] = dataShow && dataShow[prop] || jQuery2.style(elem, prop);
      }
    }
    propTween = !jQuery2.isEmptyObject(props);
    if (!propTween && jQuery2.isEmptyObject(orig)) {
      return;
    }
    if (isBox && elem.nodeType === 1) {
      opts.overflow = [style.overflow, style.overflowX, style.overflowY];
      restoreDisplay = dataShow && dataShow.display;
      if (restoreDisplay == null) {
        restoreDisplay = dataPriv.get(elem, "display");
      }
      display = jQuery2.css(elem, "display");
      if (display === "none") {
        if (restoreDisplay) {
          display = restoreDisplay;
        } else {
          showHide([elem], true);
          restoreDisplay = elem.style.display || restoreDisplay;
          display = jQuery2.css(elem, "display");
          showHide([elem]);
        }
      }
      if (display === "inline" || display === "inline-block" && restoreDisplay != null) {
        if (jQuery2.css(elem, "float") === "none") {
          if (!propTween) {
            anim.done(function() {
              style.display = restoreDisplay;
            });
            if (restoreDisplay == null) {
              display = style.display;
              restoreDisplay = display === "none" ? "" : display;
            }
          }
          style.display = "inline-block";
        }
      }
    }
    if (opts.overflow) {
      style.overflow = "hidden";
      anim.always(function() {
        style.overflow = opts.overflow[0];
        style.overflowX = opts.overflow[1];
        style.overflowY = opts.overflow[2];
      });
    }
    propTween = false;
    for (prop in orig) {
      if (!propTween) {
        if (dataShow) {
          if ("hidden" in dataShow) {
            hidden = dataShow.hidden;
          }
        } else {
          dataShow = dataPriv.access(elem, "fxshow", { display: restoreDisplay });
        }
        if (toggle) {
          dataShow.hidden = !hidden;
        }
        if (hidden) {
          showHide([elem], true);
        }
        anim.done(function() {
          if (!hidden) {
            showHide([elem]);
          }
          dataPriv.remove(elem, "fxshow");
          for (prop in orig) {
            jQuery2.style(elem, prop, orig[prop]);
          }
        });
      }
      propTween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
      if (!(prop in dataShow)) {
        dataShow[prop] = propTween.start;
        if (hidden) {
          propTween.end = propTween.start;
          propTween.start = 0;
        }
      }
    }
  }
  function propFilter(props, specialEasing) {
    var index, name, easing, value, hooks;
    for (index in props) {
      name = camelCase(index);
      easing = specialEasing[name];
      value = props[index];
      if (Array.isArray(value)) {
        easing = value[1];
        value = props[index] = value[0];
      }
      if (index !== name) {
        props[name] = value;
        delete props[index];
      }
      hooks = jQuery2.cssHooks[name];
      if (hooks && "expand" in hooks) {
        value = hooks.expand(value);
        delete props[name];
        for (index in value) {
          if (!(index in props)) {
            props[index] = value[index];
            specialEasing[index] = easing;
          }
        }
      } else {
        specialEasing[name] = easing;
      }
    }
  }
  function Animation(elem, properties, options) {
    var result, stopped, index = 0, length = Animation.prefilters.length, deferred = jQuery2.Deferred().always(function() {
      delete tick.elem;
    }), tick = function() {
      if (stopped) {
        return false;
      }
      var currentTime = fxNow || createFxNow(), remaining = Math.max(0, animation.startTime + animation.duration - currentTime), temp = remaining / animation.duration || 0, percent = 1 - temp, index2 = 0, length2 = animation.tweens.length;
      for (; index2 < length2; index2++) {
        animation.tweens[index2].run(percent);
      }
      deferred.notifyWith(elem, [animation, percent, remaining]);
      if (percent < 1 && length2) {
        return remaining;
      }
      if (!length2) {
        deferred.notifyWith(elem, [animation, 1, 0]);
      }
      deferred.resolveWith(elem, [animation]);
      return false;
    }, animation = deferred.promise({
      elem,
      props: jQuery2.extend({}, properties),
      opts: jQuery2.extend(true, {
        specialEasing: {},
        easing: jQuery2.easing._default
      }, options),
      originalProperties: properties,
      originalOptions: options,
      startTime: fxNow || createFxNow(),
      duration: options.duration,
      tweens: [],
      createTween: function(prop, end) {
        var tween = jQuery2.Tween(
          elem,
          animation.opts,
          prop,
          end,
          animation.opts.specialEasing[prop] || animation.opts.easing
        );
        animation.tweens.push(tween);
        return tween;
      },
      stop: function(gotoEnd) {
        var index2 = 0, length2 = gotoEnd ? animation.tweens.length : 0;
        if (stopped) {
          return this;
        }
        stopped = true;
        for (; index2 < length2; index2++) {
          animation.tweens[index2].run(1);
        }
        if (gotoEnd) {
          deferred.notifyWith(elem, [animation, 1, 0]);
          deferred.resolveWith(elem, [animation, gotoEnd]);
        } else {
          deferred.rejectWith(elem, [animation, gotoEnd]);
        }
        return this;
      }
    }), props = animation.props;
    propFilter(props, animation.opts.specialEasing);
    for (; index < length; index++) {
      result = Animation.prefilters[index].call(animation, elem, props, animation.opts);
      if (result) {
        if (isFunction(result.stop)) {
          jQuery2._queueHooks(animation.elem, animation.opts.queue).stop = result.stop.bind(result);
        }
        return result;
      }
    }
    jQuery2.map(props, createTween, animation);
    if (isFunction(animation.opts.start)) {
      animation.opts.start.call(elem, animation);
    }
    animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
    jQuery2.fx.timer(
      jQuery2.extend(tick, {
        elem,
        anim: animation,
        queue: animation.opts.queue
      })
    );
    return animation;
  }
  jQuery2.Animation = jQuery2.extend(Animation, {
    tweeners: {
      "*": [function(prop, value) {
        var tween = this.createTween(prop, value);
        adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
        return tween;
      }]
    },
    tweener: function(props, callback) {
      if (isFunction(props)) {
        callback = props;
        props = ["*"];
      } else {
        props = props.match(rnothtmlwhite);
      }
      var prop, index = 0, length = props.length;
      for (; index < length; index++) {
        prop = props[index];
        Animation.tweeners[prop] = Animation.tweeners[prop] || [];
        Animation.tweeners[prop].unshift(callback);
      }
    },
    prefilters: [defaultPrefilter],
    prefilter: function(callback, prepend) {
      if (prepend) {
        Animation.prefilters.unshift(callback);
      } else {
        Animation.prefilters.push(callback);
      }
    }
  });
  jQuery2.speed = function(speed, easing, fn) {
    var opt = speed && typeof speed === "object" ? jQuery2.extend({}, speed) : {
      complete: fn || !fn && easing || isFunction(speed) && speed,
      duration: speed,
      easing: fn && easing || easing && !isFunction(easing) && easing
    };
    if (jQuery2.fx.off) {
      opt.duration = 0;
    } else {
      if (typeof opt.duration !== "number") {
        if (opt.duration in jQuery2.fx.speeds) {
          opt.duration = jQuery2.fx.speeds[opt.duration];
        } else {
          opt.duration = jQuery2.fx.speeds._default;
        }
      }
    }
    if (opt.queue == null || opt.queue === true) {
      opt.queue = "fx";
    }
    opt.old = opt.complete;
    opt.complete = function() {
      if (isFunction(opt.old)) {
        opt.old.call(this);
      }
      if (opt.queue) {
        jQuery2.dequeue(this, opt.queue);
      }
    };
    return opt;
  };
  jQuery2.fn.extend({
    fadeTo: function(speed, to, easing, callback) {
      return this.filter(isHiddenWithinTree).css("opacity", 0).show().end().animate({ opacity: to }, speed, easing, callback);
    },
    animate: function(prop, speed, easing, callback) {
      var empty = jQuery2.isEmptyObject(prop), optall = jQuery2.speed(speed, easing, callback), doAnimation = function() {
        var anim = Animation(this, jQuery2.extend({}, prop), optall);
        if (empty || dataPriv.get(this, "finish")) {
          anim.stop(true);
        }
      };
      doAnimation.finish = doAnimation;
      return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
    },
    stop: function(type, clearQueue, gotoEnd) {
      var stopQueue = function(hooks) {
        var stop = hooks.stop;
        delete hooks.stop;
        stop(gotoEnd);
      };
      if (typeof type !== "string") {
        gotoEnd = clearQueue;
        clearQueue = type;
        type = void 0;
      }
      if (clearQueue) {
        this.queue(type || "fx", []);
      }
      return this.each(function() {
        var dequeue = true, index = type != null && type + "queueHooks", timers = jQuery2.timers, data = dataPriv.get(this);
        if (index) {
          if (data[index] && data[index].stop) {
            stopQueue(data[index]);
          }
        } else {
          for (index in data) {
            if (data[index] && data[index].stop && rrun.test(index)) {
              stopQueue(data[index]);
            }
          }
        }
        for (index = timers.length; index--; ) {
          if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
            timers[index].anim.stop(gotoEnd);
            dequeue = false;
            timers.splice(index, 1);
          }
        }
        if (dequeue || !gotoEnd) {
          jQuery2.dequeue(this, type);
        }
      });
    },
    finish: function(type) {
      if (type !== false) {
        type = type || "fx";
      }
      return this.each(function() {
        var index, data = dataPriv.get(this), queue = data[type + "queue"], hooks = data[type + "queueHooks"], timers = jQuery2.timers, length = queue ? queue.length : 0;
        data.finish = true;
        jQuery2.queue(this, type, []);
        if (hooks && hooks.stop) {
          hooks.stop.call(this, true);
        }
        for (index = timers.length; index--; ) {
          if (timers[index].elem === this && timers[index].queue === type) {
            timers[index].anim.stop(true);
            timers.splice(index, 1);
          }
        }
        for (index = 0; index < length; index++) {
          if (queue[index] && queue[index].finish) {
            queue[index].finish.call(this);
          }
        }
        delete data.finish;
      });
    }
  });
  jQuery2.each(["toggle", "show", "hide"], function(_i, name) {
    var cssFn = jQuery2.fn[name];
    jQuery2.fn[name] = function(speed, easing, callback) {
      return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
    };
  });
  jQuery2.each({
    slideDown: genFx("show"),
    slideUp: genFx("hide"),
    slideToggle: genFx("toggle"),
    fadeIn: { opacity: "show" },
    fadeOut: { opacity: "hide" },
    fadeToggle: { opacity: "toggle" }
  }, function(name, props) {
    jQuery2.fn[name] = function(speed, easing, callback) {
      return this.animate(props, speed, easing, callback);
    };
  });
  jQuery2.timers = [];
  jQuery2.fx.tick = function() {
    var timer, i = 0, timers = jQuery2.timers;
    fxNow = Date.now();
    for (; i < timers.length; i++) {
      timer = timers[i];
      if (!timer() && timers[i] === timer) {
        timers.splice(i--, 1);
      }
    }
    if (!timers.length) {
      jQuery2.fx.stop();
    }
    fxNow = void 0;
  };
  jQuery2.fx.timer = function(timer) {
    jQuery2.timers.push(timer);
    jQuery2.fx.start();
  };
  jQuery2.fx.interval = 13;
  jQuery2.fx.start = function() {
    if (inProgress) {
      return;
    }
    inProgress = true;
    schedule();
  };
  jQuery2.fx.stop = function() {
    inProgress = null;
  };
  jQuery2.fx.speeds = {
    slow: 600,
    fast: 200,
    // Default speed
    _default: 400
  };
  jQuery2.fn.delay = function(time, type) {
    time = jQuery2.fx ? jQuery2.fx.speeds[time] || time : time;
    type = type || "fx";
    return this.queue(type, function(next, hooks) {
      var timeout = window2.setTimeout(next, time);
      hooks.stop = function() {
        window2.clearTimeout(timeout);
      };
    });
  };
  (function() {
    var input = document2.createElement("input"), select = document2.createElement("select"), opt = select.appendChild(document2.createElement("option"));
    input.type = "checkbox";
    support.checkOn = input.value !== "";
    support.optSelected = opt.selected;
    input = document2.createElement("input");
    input.value = "t";
    input.type = "radio";
    support.radioValue = input.value === "t";
  })();
  var boolHook, attrHandle = jQuery2.expr.attrHandle;
  jQuery2.fn.extend({
    attr: function(name, value) {
      return access(this, jQuery2.attr, name, value, arguments.length > 1);
    },
    removeAttr: function(name) {
      return this.each(function() {
        jQuery2.removeAttr(this, name);
      });
    }
  });
  jQuery2.extend({
    attr: function(elem, name, value) {
      var ret, hooks, nType = elem.nodeType;
      if (nType === 3 || nType === 8 || nType === 2) {
        return;
      }
      if (typeof elem.getAttribute === "undefined") {
        return jQuery2.prop(elem, name, value);
      }
      if (nType !== 1 || !jQuery2.isXMLDoc(elem)) {
        hooks = jQuery2.attrHooks[name.toLowerCase()] || (jQuery2.expr.match.bool.test(name) ? boolHook : void 0);
      }
      if (value !== void 0) {
        if (value === null) {
          jQuery2.removeAttr(elem, name);
          return;
        }
        if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== void 0) {
          return ret;
        }
        elem.setAttribute(name, value + "");
        return value;
      }
      if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
        return ret;
      }
      ret = jQuery2.find.attr(elem, name);
      return ret == null ? void 0 : ret;
    },
    attrHooks: {
      type: {
        set: function(elem, value) {
          if (!support.radioValue && value === "radio" && nodeName(elem, "input")) {
            var val = elem.value;
            elem.setAttribute("type", value);
            if (val) {
              elem.value = val;
            }
            return value;
          }
        }
      }
    },
    removeAttr: function(elem, value) {
      var name, i = 0, attrNames = value && value.match(rnothtmlwhite);
      if (attrNames && elem.nodeType === 1) {
        while (name = attrNames[i++]) {
          elem.removeAttribute(name);
        }
      }
    }
  });
  boolHook = {
    set: function(elem, value, name) {
      if (value === false) {
        jQuery2.removeAttr(elem, name);
      } else {
        elem.setAttribute(name, name);
      }
      return name;
    }
  };
  jQuery2.each(jQuery2.expr.match.bool.source.match(/\w+/g), function(_i, name) {
    var getter = attrHandle[name] || jQuery2.find.attr;
    attrHandle[name] = function(elem, name2, isXML) {
      var ret, handle, lowercaseName = name2.toLowerCase();
      if (!isXML) {
        handle = attrHandle[lowercaseName];
        attrHandle[lowercaseName] = ret;
        ret = getter(elem, name2, isXML) != null ? lowercaseName : null;
        attrHandle[lowercaseName] = handle;
      }
      return ret;
    };
  });
  var rfocusable = /^(?:input|select|textarea|button)$/i, rclickable = /^(?:a|area)$/i;
  jQuery2.fn.extend({
    prop: function(name, value) {
      return access(this, jQuery2.prop, name, value, arguments.length > 1);
    },
    removeProp: function(name) {
      return this.each(function() {
        delete this[jQuery2.propFix[name] || name];
      });
    }
  });
  jQuery2.extend({
    prop: function(elem, name, value) {
      var ret, hooks, nType = elem.nodeType;
      if (nType === 3 || nType === 8 || nType === 2) {
        return;
      }
      if (nType !== 1 || !jQuery2.isXMLDoc(elem)) {
        name = jQuery2.propFix[name] || name;
        hooks = jQuery2.propHooks[name];
      }
      if (value !== void 0) {
        if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== void 0) {
          return ret;
        }
        return elem[name] = value;
      }
      if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
        return ret;
      }
      return elem[name];
    },
    propHooks: {
      tabIndex: {
        get: function(elem) {
          var tabindex = jQuery2.find.attr(elem, "tabindex");
          if (tabindex) {
            return parseInt(tabindex, 10);
          }
          if (rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href) {
            return 0;
          }
          return -1;
        }
      }
    },
    propFix: {
      "for": "htmlFor",
      "class": "className"
    }
  });
  if (!support.optSelected) {
    jQuery2.propHooks.selected = {
      get: function(elem) {
        var parent = elem.parentNode;
        if (parent && parent.parentNode) {
          parent.parentNode.selectedIndex;
        }
        return null;
      },
      set: function(elem) {
        var parent = elem.parentNode;
        if (parent) {
          parent.selectedIndex;
          if (parent.parentNode) {
            parent.parentNode.selectedIndex;
          }
        }
      }
    };
  }
  jQuery2.each([
    "tabIndex",
    "readOnly",
    "maxLength",
    "cellSpacing",
    "cellPadding",
    "rowSpan",
    "colSpan",
    "useMap",
    "frameBorder",
    "contentEditable"
  ], function() {
    jQuery2.propFix[this.toLowerCase()] = this;
  });
  function stripAndCollapse(value) {
    var tokens = value.match(rnothtmlwhite) || [];
    return tokens.join(" ");
  }
  function getClass(elem) {
    return elem.getAttribute && elem.getAttribute("class") || "";
  }
  function classesToArray(value) {
    if (Array.isArray(value)) {
      return value;
    }
    if (typeof value === "string") {
      return value.match(rnothtmlwhite) || [];
    }
    return [];
  }
  jQuery2.fn.extend({
    addClass: function(value) {
      var classNames, cur, curValue, className, i, finalValue;
      if (isFunction(value)) {
        return this.each(function(j) {
          jQuery2(this).addClass(value.call(this, j, getClass(this)));
        });
      }
      classNames = classesToArray(value);
      if (classNames.length) {
        return this.each(function() {
          curValue = getClass(this);
          cur = this.nodeType === 1 && " " + stripAndCollapse(curValue) + " ";
          if (cur) {
            for (i = 0; i < classNames.length; i++) {
              className = classNames[i];
              if (cur.indexOf(" " + className + " ") < 0) {
                cur += className + " ";
              }
            }
            finalValue = stripAndCollapse(cur);
            if (curValue !== finalValue) {
              this.setAttribute("class", finalValue);
            }
          }
        });
      }
      return this;
    },
    removeClass: function(value) {
      var classNames, cur, curValue, className, i, finalValue;
      if (isFunction(value)) {
        return this.each(function(j) {
          jQuery2(this).removeClass(value.call(this, j, getClass(this)));
        });
      }
      if (!arguments.length) {
        return this.attr("class", "");
      }
      classNames = classesToArray(value);
      if (classNames.length) {
        return this.each(function() {
          curValue = getClass(this);
          cur = this.nodeType === 1 && " " + stripAndCollapse(curValue) + " ";
          if (cur) {
            for (i = 0; i < classNames.length; i++) {
              className = classNames[i];
              while (cur.indexOf(" " + className + " ") > -1) {
                cur = cur.replace(" " + className + " ", " ");
              }
            }
            finalValue = stripAndCollapse(cur);
            if (curValue !== finalValue) {
              this.setAttribute("class", finalValue);
            }
          }
        });
      }
      return this;
    },
    toggleClass: function(value, stateVal) {
      var classNames, className, i, self, type = typeof value, isValidValue = type === "string" || Array.isArray(value);
      if (isFunction(value)) {
        return this.each(function(i2) {
          jQuery2(this).toggleClass(
            value.call(this, i2, getClass(this), stateVal),
            stateVal
          );
        });
      }
      if (typeof stateVal === "boolean" && isValidValue) {
        return stateVal ? this.addClass(value) : this.removeClass(value);
      }
      classNames = classesToArray(value);
      return this.each(function() {
        if (isValidValue) {
          self = jQuery2(this);
          for (i = 0; i < classNames.length; i++) {
            className = classNames[i];
            if (self.hasClass(className)) {
              self.removeClass(className);
            } else {
              self.addClass(className);
            }
          }
        } else if (value === void 0 || type === "boolean") {
          className = getClass(this);
          if (className) {
            dataPriv.set(this, "__className__", className);
          }
          if (this.setAttribute) {
            this.setAttribute(
              "class",
              className || value === false ? "" : dataPriv.get(this, "__className__") || ""
            );
          }
        }
      });
    },
    hasClass: function(selector) {
      var className, elem, i = 0;
      className = " " + selector + " ";
      while (elem = this[i++]) {
        if (elem.nodeType === 1 && (" " + stripAndCollapse(getClass(elem)) + " ").indexOf(className) > -1) {
          return true;
        }
      }
      return false;
    }
  });
  var rreturn = /\r/g;
  jQuery2.fn.extend({
    val: function(value) {
      var hooks, ret, valueIsFunction, elem = this[0];
      if (!arguments.length) {
        if (elem) {
          hooks = jQuery2.valHooks[elem.type] || jQuery2.valHooks[elem.nodeName.toLowerCase()];
          if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== void 0) {
            return ret;
          }
          ret = elem.value;
          if (typeof ret === "string") {
            return ret.replace(rreturn, "");
          }
          return ret == null ? "" : ret;
        }
        return;
      }
      valueIsFunction = isFunction(value);
      return this.each(function(i) {
        var val;
        if (this.nodeType !== 1) {
          return;
        }
        if (valueIsFunction) {
          val = value.call(this, i, jQuery2(this).val());
        } else {
          val = value;
        }
        if (val == null) {
          val = "";
        } else if (typeof val === "number") {
          val += "";
        } else if (Array.isArray(val)) {
          val = jQuery2.map(val, function(value2) {
            return value2 == null ? "" : value2 + "";
          });
        }
        hooks = jQuery2.valHooks[this.type] || jQuery2.valHooks[this.nodeName.toLowerCase()];
        if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === void 0) {
          this.value = val;
        }
      });
    }
  });
  jQuery2.extend({
    valHooks: {
      option: {
        get: function(elem) {
          var val = jQuery2.find.attr(elem, "value");
          return val != null ? val : (
            // Support: IE <=10 - 11 only
            // option.text throws exceptions (trac-14686, trac-14858)
            // Strip and collapse whitespace
            // https://html.spec.whatwg.org/#strip-and-collapse-whitespace
            stripAndCollapse(jQuery2.text(elem))
          );
        }
      },
      select: {
        get: function(elem) {
          var value, option, i, options = elem.options, index = elem.selectedIndex, one = elem.type === "select-one", values = one ? null : [], max = one ? index + 1 : options.length;
          if (index < 0) {
            i = max;
          } else {
            i = one ? index : 0;
          }
          for (; i < max; i++) {
            option = options[i];
            if ((option.selected || i === index) && // Don't return options that are disabled or in a disabled optgroup
            !option.disabled && (!option.parentNode.disabled || !nodeName(option.parentNode, "optgroup"))) {
              value = jQuery2(option).val();
              if (one) {
                return value;
              }
              values.push(value);
            }
          }
          return values;
        },
        set: function(elem, value) {
          var optionSet, option, options = elem.options, values = jQuery2.makeArray(value), i = options.length;
          while (i--) {
            option = options[i];
            if (option.selected = jQuery2.inArray(jQuery2.valHooks.option.get(option), values) > -1) {
              optionSet = true;
            }
          }
          if (!optionSet) {
            elem.selectedIndex = -1;
          }
          return values;
        }
      }
    }
  });
  jQuery2.each(["radio", "checkbox"], function() {
    jQuery2.valHooks[this] = {
      set: function(elem, value) {
        if (Array.isArray(value)) {
          return elem.checked = jQuery2.inArray(jQuery2(elem).val(), value) > -1;
        }
      }
    };
    if (!support.checkOn) {
      jQuery2.valHooks[this].get = function(elem) {
        return elem.getAttribute("value") === null ? "on" : elem.value;
      };
    }
  });
  var location2 = window2.location;
  var nonce = { guid: Date.now() };
  var rquery = /\?/;
  jQuery2.parseXML = function(data) {
    var xml, parserErrorElem;
    if (!data || typeof data !== "string") {
      return null;
    }
    try {
      xml = new window2.DOMParser().parseFromString(data, "text/xml");
    } catch (e) {
    }
    parserErrorElem = xml && xml.getElementsByTagName("parsererror")[0];
    if (!xml || parserErrorElem) {
      jQuery2.error("Invalid XML: " + (parserErrorElem ? jQuery2.map(parserErrorElem.childNodes, function(el) {
        return el.textContent;
      }).join("\n") : data));
    }
    return xml;
  };
  var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/, stopPropagationCallback = function(e) {
    e.stopPropagation();
  };
  jQuery2.extend(jQuery2.event, {
    trigger: function(event, data, elem, onlyHandlers) {
      var i, cur, tmp, bubbleType, ontype, handle, special, lastElement, eventPath = [elem || document2], type = hasOwn.call(event, "type") ? event.type : event, namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
      cur = lastElement = tmp = elem = elem || document2;
      if (elem.nodeType === 3 || elem.nodeType === 8) {
        return;
      }
      if (rfocusMorph.test(type + jQuery2.event.triggered)) {
        return;
      }
      if (type.indexOf(".") > -1) {
        namespaces = type.split(".");
        type = namespaces.shift();
        namespaces.sort();
      }
      ontype = type.indexOf(":") < 0 && "on" + type;
      event = event[jQuery2.expando] ? event : new jQuery2.Event(type, typeof event === "object" && event);
      event.isTrigger = onlyHandlers ? 2 : 3;
      event.namespace = namespaces.join(".");
      event.rnamespace = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
      event.result = void 0;
      if (!event.target) {
        event.target = elem;
      }
      data = data == null ? [event] : jQuery2.makeArray(data, [event]);
      special = jQuery2.event.special[type] || {};
      if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
        return;
      }
      if (!onlyHandlers && !special.noBubble && !isWindow(elem)) {
        bubbleType = special.delegateType || type;
        if (!rfocusMorph.test(bubbleType + type)) {
          cur = cur.parentNode;
        }
        for (; cur; cur = cur.parentNode) {
          eventPath.push(cur);
          tmp = cur;
        }
        if (tmp === (elem.ownerDocument || document2)) {
          eventPath.push(tmp.defaultView || tmp.parentWindow || window2);
        }
      }
      i = 0;
      while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
        lastElement = cur;
        event.type = i > 1 ? bubbleType : special.bindType || type;
        handle = (dataPriv.get(cur, "events") || /* @__PURE__ */ Object.create(null))[event.type] && dataPriv.get(cur, "handle");
        if (handle) {
          handle.apply(cur, data);
        }
        handle = ontype && cur[ontype];
        if (handle && handle.apply && acceptData(cur)) {
          event.result = handle.apply(cur, data);
          if (event.result === false) {
            event.preventDefault();
          }
        }
      }
      event.type = type;
      if (!onlyHandlers && !event.isDefaultPrevented()) {
        if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && acceptData(elem)) {
          if (ontype && isFunction(elem[type]) && !isWindow(elem)) {
            tmp = elem[ontype];
            if (tmp) {
              elem[ontype] = null;
            }
            jQuery2.event.triggered = type;
            if (event.isPropagationStopped()) {
              lastElement.addEventListener(type, stopPropagationCallback);
            }
            elem[type]();
            if (event.isPropagationStopped()) {
              lastElement.removeEventListener(type, stopPropagationCallback);
            }
            jQuery2.event.triggered = void 0;
            if (tmp) {
              elem[ontype] = tmp;
            }
          }
        }
      }
      return event.result;
    },
    // Piggyback on a donor event to simulate a different one
    // Used only for `focus(in | out)` events
    simulate: function(type, elem, event) {
      var e = jQuery2.extend(
        new jQuery2.Event(),
        event,
        {
          type,
          isSimulated: true
        }
      );
      jQuery2.event.trigger(e, null, elem);
    }
  });
  jQuery2.fn.extend({
    trigger: function(type, data) {
      return this.each(function() {
        jQuery2.event.trigger(type, data, this);
      });
    },
    triggerHandler: function(type, data) {
      var elem = this[0];
      if (elem) {
        return jQuery2.event.trigger(type, data, elem, true);
      }
    }
  });
  var rbracket = /\[\]$/, rCRLF = /\r?\n/g, rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i, rsubmittable = /^(?:input|select|textarea|keygen)/i;
  function buildParams(prefix, obj, traditional, add) {
    var name;
    if (Array.isArray(obj)) {
      jQuery2.each(obj, function(i, v) {
        if (traditional || rbracket.test(prefix)) {
          add(prefix, v);
        } else {
          buildParams(
            prefix + "[" + (typeof v === "object" && v != null ? i : "") + "]",
            v,
            traditional,
            add
          );
        }
      });
    } else if (!traditional && toType(obj) === "object") {
      for (name in obj) {
        buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
      }
    } else {
      add(prefix, obj);
    }
  }
  jQuery2.param = function(a, traditional) {
    var prefix, s = [], add = function(key, valueOrFunction) {
      var value = isFunction(valueOrFunction) ? valueOrFunction() : valueOrFunction;
      s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value == null ? "" : value);
    };
    if (a == null) {
      return "";
    }
    if (Array.isArray(a) || a.jquery && !jQuery2.isPlainObject(a)) {
      jQuery2.each(a, function() {
        add(this.name, this.value);
      });
    } else {
      for (prefix in a) {
        buildParams(prefix, a[prefix], traditional, add);
      }
    }
    return s.join("&");
  };
  jQuery2.fn.extend({
    serialize: function() {
      return jQuery2.param(this.serializeArray());
    },
    serializeArray: function() {
      return this.map(function() {
        var elements = jQuery2.prop(this, "elements");
        return elements ? jQuery2.makeArray(elements) : this;
      }).filter(function() {
        var type = this.type;
        return this.name && !jQuery2(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
      }).map(function(_i, elem) {
        var val = jQuery2(this).val();
        if (val == null) {
          return null;
        }
        if (Array.isArray(val)) {
          return jQuery2.map(val, function(val2) {
            return { name: elem.name, value: val2.replace(rCRLF, "\r\n") };
          });
        }
        return { name: elem.name, value: val.replace(rCRLF, "\r\n") };
      }).get();
    }
  });
  var r20 = /%20/g, rhash = /#.*$/, rantiCache = /([?&])_=[^&]*/, rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg, rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, rnoContent = /^(?:GET|HEAD)$/, rprotocol = /^\/\//, prefilters = {}, transports = {}, allTypes = "*/".concat("*"), originAnchor = document2.createElement("a");
  originAnchor.href = location2.href;
  function addToPrefiltersOrTransports(structure) {
    return function(dataTypeExpression, func) {
      if (typeof dataTypeExpression !== "string") {
        func = dataTypeExpression;
        dataTypeExpression = "*";
      }
      var dataType, i = 0, dataTypes = dataTypeExpression.toLowerCase().match(rnothtmlwhite) || [];
      if (isFunction(func)) {
        while (dataType = dataTypes[i++]) {
          if (dataType[0] === "+") {
            dataType = dataType.slice(1) || "*";
            (structure[dataType] = structure[dataType] || []).unshift(func);
          } else {
            (structure[dataType] = structure[dataType] || []).push(func);
          }
        }
      }
    };
  }
  function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
    var inspected = {}, seekingTransport = structure === transports;
    function inspect(dataType) {
      var selected;
      inspected[dataType] = true;
      jQuery2.each(structure[dataType] || [], function(_, prefilterOrFactory) {
        var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
        if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {
          options.dataTypes.unshift(dataTypeOrTransport);
          inspect(dataTypeOrTransport);
          return false;
        } else if (seekingTransport) {
          return !(selected = dataTypeOrTransport);
        }
      });
      return selected;
    }
    return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
  }
  function ajaxExtend(target, src) {
    var key, deep, flatOptions = jQuery2.ajaxSettings.flatOptions || {};
    for (key in src) {
      if (src[key] !== void 0) {
        (flatOptions[key] ? target : deep || (deep = {}))[key] = src[key];
      }
    }
    if (deep) {
      jQuery2.extend(true, target, deep);
    }
    return target;
  }
  function ajaxHandleResponses(s, jqXHR, responses) {
    var ct, type, finalDataType, firstDataType, contents = s.contents, dataTypes = s.dataTypes;
    while (dataTypes[0] === "*") {
      dataTypes.shift();
      if (ct === void 0) {
        ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
      }
    }
    if (ct) {
      for (type in contents) {
        if (contents[type] && contents[type].test(ct)) {
          dataTypes.unshift(type);
          break;
        }
      }
    }
    if (dataTypes[0] in responses) {
      finalDataType = dataTypes[0];
    } else {
      for (type in responses) {
        if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
          finalDataType = type;
          break;
        }
        if (!firstDataType) {
          firstDataType = type;
        }
      }
      finalDataType = finalDataType || firstDataType;
    }
    if (finalDataType) {
      if (finalDataType !== dataTypes[0]) {
        dataTypes.unshift(finalDataType);
      }
      return responses[finalDataType];
    }
  }
  function ajaxConvert(s, response, jqXHR, isSuccess) {
    var conv2, current, conv, tmp, prev, converters = {}, dataTypes = s.dataTypes.slice();
    if (dataTypes[1]) {
      for (conv in s.converters) {
        converters[conv.toLowerCase()] = s.converters[conv];
      }
    }
    current = dataTypes.shift();
    while (current) {
      if (s.responseFields[current]) {
        jqXHR[s.responseFields[current]] = response;
      }
      if (!prev && isSuccess && s.dataFilter) {
        response = s.dataFilter(response, s.dataType);
      }
      prev = current;
      current = dataTypes.shift();
      if (current) {
        if (current === "*") {
          current = prev;
        } else if (prev !== "*" && prev !== current) {
          conv = converters[prev + " " + current] || converters["* " + current];
          if (!conv) {
            for (conv2 in converters) {
              tmp = conv2.split(" ");
              if (tmp[1] === current) {
                conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
                if (conv) {
                  if (conv === true) {
                    conv = converters[conv2];
                  } else if (converters[conv2] !== true) {
                    current = tmp[0];
                    dataTypes.unshift(tmp[1]);
                  }
                  break;
                }
              }
            }
          }
          if (conv !== true) {
            if (conv && s.throws) {
              response = conv(response);
            } else {
              try {
                response = conv(response);
              } catch (e) {
                return {
                  state: "parsererror",
                  error: conv ? e : "No conversion from " + prev + " to " + current
                };
              }
            }
          }
        }
      }
    }
    return { state: "success", data: response };
  }
  jQuery2.extend({
    // Counter for holding the number of active queries
    active: 0,
    // Last-Modified header cache for next request
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: location2.href,
      type: "GET",
      isLocal: rlocalProtocol.test(location2.protocol),
      global: true,
      processData: true,
      async: true,
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      /*
      timeout: 0,
      data: null,
      dataType: null,
      username: null,
      password: null,
      cache: null,
      throws: false,
      traditional: false,
      headers: {},
      */
      accepts: {
        "*": allTypes,
        text: "text/plain",
        html: "text/html",
        xml: "application/xml, text/xml",
        json: "application/json, text/javascript"
      },
      contents: {
        xml: /\bxml\b/,
        html: /\bhtml/,
        json: /\bjson\b/
      },
      responseFields: {
        xml: "responseXML",
        text: "responseText",
        json: "responseJSON"
      },
      // Data converters
      // Keys separate source (or catchall "*") and destination types with a single space
      converters: {
        // Convert anything to text
        "* text": String,
        // Text to html (true = no transformation)
        "text html": true,
        // Evaluate text as a json expression
        "text json": JSON.parse,
        // Parse text as xml
        "text xml": jQuery2.parseXML
      },
      // For options that shouldn't be deep extended:
      // you can add your own custom options here if
      // and when you create one that shouldn't be
      // deep extended (see ajaxExtend)
      flatOptions: {
        url: true,
        context: true
      }
    },
    // Creates a full fledged settings object into target
    // with both ajaxSettings and settings fields.
    // If target is omitted, writes into ajaxSettings.
    ajaxSetup: function(target, settings) {
      return settings ? (
        // Building a settings object
        ajaxExtend(ajaxExtend(target, jQuery2.ajaxSettings), settings)
      ) : (
        // Extending ajaxSettings
        ajaxExtend(jQuery2.ajaxSettings, target)
      );
    },
    ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
    ajaxTransport: addToPrefiltersOrTransports(transports),
    // Main method
    ajax: function(url, options) {
      if (typeof url === "object") {
        options = url;
        url = void 0;
      }
      options = options || {};
      var transport, cacheURL, responseHeadersString, responseHeaders, timeoutTimer, urlAnchor, completed2, fireGlobals, i, uncached, s = jQuery2.ajaxSetup({}, options), callbackContext = s.context || s, globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery2(callbackContext) : jQuery2.event, deferred = jQuery2.Deferred(), completeDeferred = jQuery2.Callbacks("once memory"), statusCode = s.statusCode || {}, requestHeaders = {}, requestHeadersNames = {}, strAbort = "canceled", jqXHR = {
        readyState: 0,
        // Builds headers hashtable if needed
        getResponseHeader: function(key) {
          var match;
          if (completed2) {
            if (!responseHeaders) {
              responseHeaders = {};
              while (match = rheaders.exec(responseHeadersString)) {
                responseHeaders[match[1].toLowerCase() + " "] = (responseHeaders[match[1].toLowerCase() + " "] || []).concat(match[2]);
              }
            }
            match = responseHeaders[key.toLowerCase() + " "];
          }
          return match == null ? null : match.join(", ");
        },
        // Raw string
        getAllResponseHeaders: function() {
          return completed2 ? responseHeadersString : null;
        },
        // Caches the header
        setRequestHeader: function(name, value) {
          if (completed2 == null) {
            name = requestHeadersNames[name.toLowerCase()] = requestHeadersNames[name.toLowerCase()] || name;
            requestHeaders[name] = value;
          }
          return this;
        },
        // Overrides response content-type header
        overrideMimeType: function(type) {
          if (completed2 == null) {
            s.mimeType = type;
          }
          return this;
        },
        // Status-dependent callbacks
        statusCode: function(map) {
          var code;
          if (map) {
            if (completed2) {
              jqXHR.always(map[jqXHR.status]);
            } else {
              for (code in map) {
                statusCode[code] = [statusCode[code], map[code]];
              }
            }
          }
          return this;
        },
        // Cancel the request
        abort: function(statusText) {
          var finalText = statusText || strAbort;
          if (transport) {
            transport.abort(finalText);
          }
          done(0, finalText);
          return this;
        }
      };
      deferred.promise(jqXHR);
      s.url = ((url || s.url || location2.href) + "").replace(rprotocol, location2.protocol + "//");
      s.type = options.method || options.type || s.method || s.type;
      s.dataTypes = (s.dataType || "*").toLowerCase().match(rnothtmlwhite) || [""];
      if (s.crossDomain == null) {
        urlAnchor = document2.createElement("a");
        try {
          urlAnchor.href = s.url;
          urlAnchor.href = urlAnchor.href;
          s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !== urlAnchor.protocol + "//" + urlAnchor.host;
        } catch (e) {
          s.crossDomain = true;
        }
      }
      if (s.data && s.processData && typeof s.data !== "string") {
        s.data = jQuery2.param(s.data, s.traditional);
      }
      inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
      if (completed2) {
        return jqXHR;
      }
      fireGlobals = jQuery2.event && s.global;
      if (fireGlobals && jQuery2.active++ === 0) {
        jQuery2.event.trigger("ajaxStart");
      }
      s.type = s.type.toUpperCase();
      s.hasContent = !rnoContent.test(s.type);
      cacheURL = s.url.replace(rhash, "");
      if (!s.hasContent) {
        uncached = s.url.slice(cacheURL.length);
        if (s.data && (s.processData || typeof s.data === "string")) {
          cacheURL += (rquery.test(cacheURL) ? "&" : "?") + s.data;
          delete s.data;
        }
        if (s.cache === false) {
          cacheURL = cacheURL.replace(rantiCache, "$1");
          uncached = (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce.guid++ + uncached;
        }
        s.url = cacheURL + uncached;
      } else if (s.data && s.processData && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0) {
        s.data = s.data.replace(r20, "+");
      }
      if (s.ifModified) {
        if (jQuery2.lastModified[cacheURL]) {
          jqXHR.setRequestHeader("If-Modified-Since", jQuery2.lastModified[cacheURL]);
        }
        if (jQuery2.etag[cacheURL]) {
          jqXHR.setRequestHeader("If-None-Match", jQuery2.etag[cacheURL]);
        }
      }
      if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
        jqXHR.setRequestHeader("Content-Type", s.contentType);
      }
      jqXHR.setRequestHeader(
        "Accept",
        s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]
      );
      for (i in s.headers) {
        jqXHR.setRequestHeader(i, s.headers[i]);
      }
      if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || completed2)) {
        return jqXHR.abort();
      }
      strAbort = "abort";
      completeDeferred.add(s.complete);
      jqXHR.done(s.success);
      jqXHR.fail(s.error);
      transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
      if (!transport) {
        done(-1, "No Transport");
      } else {
        jqXHR.readyState = 1;
        if (fireGlobals) {
          globalEventContext.trigger("ajaxSend", [jqXHR, s]);
        }
        if (completed2) {
          return jqXHR;
        }
        if (s.async && s.timeout > 0) {
          timeoutTimer = window2.setTimeout(function() {
            jqXHR.abort("timeout");
          }, s.timeout);
        }
        try {
          completed2 = false;
          transport.send(requestHeaders, done);
        } catch (e) {
          if (completed2) {
            throw e;
          }
          done(-1, e);
        }
      }
      function done(status, nativeStatusText, responses, headers) {
        var isSuccess, success, error, response, modified, statusText = nativeStatusText;
        if (completed2) {
          return;
        }
        completed2 = true;
        if (timeoutTimer) {
          window2.clearTimeout(timeoutTimer);
        }
        transport = void 0;
        responseHeadersString = headers || "";
        jqXHR.readyState = status > 0 ? 4 : 0;
        isSuccess = status >= 200 && status < 300 || status === 304;
        if (responses) {
          response = ajaxHandleResponses(s, jqXHR, responses);
        }
        if (!isSuccess && jQuery2.inArray("script", s.dataTypes) > -1 && jQuery2.inArray("json", s.dataTypes) < 0) {
          s.converters["text script"] = function() {
          };
        }
        response = ajaxConvert(s, response, jqXHR, isSuccess);
        if (isSuccess) {
          if (s.ifModified) {
            modified = jqXHR.getResponseHeader("Last-Modified");
            if (modified) {
              jQuery2.lastModified[cacheURL] = modified;
            }
            modified = jqXHR.getResponseHeader("etag");
            if (modified) {
              jQuery2.etag[cacheURL] = modified;
            }
          }
          if (status === 204 || s.type === "HEAD") {
            statusText = "nocontent";
          } else if (status === 304) {
            statusText = "notmodified";
          } else {
            statusText = response.state;
            success = response.data;
            error = response.error;
            isSuccess = !error;
          }
        } else {
          error = statusText;
          if (status || !statusText) {
            statusText = "error";
            if (status < 0) {
              status = 0;
            }
          }
        }
        jqXHR.status = status;
        jqXHR.statusText = (nativeStatusText || statusText) + "";
        if (isSuccess) {
          deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
        } else {
          deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
        }
        jqXHR.statusCode(statusCode);
        statusCode = void 0;
        if (fireGlobals) {
          globalEventContext.trigger(
            isSuccess ? "ajaxSuccess" : "ajaxError",
            [jqXHR, s, isSuccess ? success : error]
          );
        }
        completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);
        if (fireGlobals) {
          globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
          if (!--jQuery2.active) {
            jQuery2.event.trigger("ajaxStop");
          }
        }
      }
      return jqXHR;
    },
    getJSON: function(url, data, callback) {
      return jQuery2.get(url, data, callback, "json");
    },
    getScript: function(url, callback) {
      return jQuery2.get(url, void 0, callback, "script");
    }
  });
  jQuery2.each(["get", "post"], function(_i, method) {
    jQuery2[method] = function(url, data, callback, type) {
      if (isFunction(data)) {
        type = type || callback;
        callback = data;
        data = void 0;
      }
      return jQuery2.ajax(jQuery2.extend({
        url,
        type: method,
        dataType: type,
        data,
        success: callback
      }, jQuery2.isPlainObject(url) && url));
    };
  });
  jQuery2.ajaxPrefilter(function(s) {
    var i;
    for (i in s.headers) {
      if (i.toLowerCase() === "content-type") {
        s.contentType = s.headers[i] || "";
      }
    }
  });
  jQuery2._evalUrl = function(url, options, doc) {
    return jQuery2.ajax({
      url,
      // Make this explicit, since user can override this through ajaxSetup (trac-11264)
      type: "GET",
      dataType: "script",
      cache: true,
      async: false,
      global: false,
      // Only evaluate the response if it is successful (gh-4126)
      // dataFilter is not invoked for failure responses, so using it instead
      // of the default converter is kludgy but it works.
      converters: {
        "text script": function() {
        }
      },
      dataFilter: function(response) {
        jQuery2.globalEval(response, options, doc);
      }
    });
  };
  jQuery2.fn.extend({
    wrapAll: function(html) {
      var wrap;
      if (this[0]) {
        if (isFunction(html)) {
          html = html.call(this[0]);
        }
        wrap = jQuery2(html, this[0].ownerDocument).eq(0).clone(true);
        if (this[0].parentNode) {
          wrap.insertBefore(this[0]);
        }
        wrap.map(function() {
          var elem = this;
          while (elem.firstElementChild) {
            elem = elem.firstElementChild;
          }
          return elem;
        }).append(this);
      }
      return this;
    },
    wrapInner: function(html) {
      if (isFunction(html)) {
        return this.each(function(i) {
          jQuery2(this).wrapInner(html.call(this, i));
        });
      }
      return this.each(function() {
        var self = jQuery2(this), contents = self.contents();
        if (contents.length) {
          contents.wrapAll(html);
        } else {
          self.append(html);
        }
      });
    },
    wrap: function(html) {
      var htmlIsFunction = isFunction(html);
      return this.each(function(i) {
        jQuery2(this).wrapAll(htmlIsFunction ? html.call(this, i) : html);
      });
    },
    unwrap: function(selector) {
      this.parent(selector).not("body").each(function() {
        jQuery2(this).replaceWith(this.childNodes);
      });
      return this;
    }
  });
  jQuery2.expr.pseudos.hidden = function(elem) {
    return !jQuery2.expr.pseudos.visible(elem);
  };
  jQuery2.expr.pseudos.visible = function(elem) {
    return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
  };
  jQuery2.ajaxSettings.xhr = function() {
    try {
      return new window2.XMLHttpRequest();
    } catch (e) {
    }
  };
  var xhrSuccessStatus = {
    // File protocol always yields status code 0, assume 200
    0: 200,
    // Support: IE <=9 only
    // trac-1450: sometimes IE returns 1223 when it should be 204
    1223: 204
  }, xhrSupported = jQuery2.ajaxSettings.xhr();
  support.cors = !!xhrSupported && "withCredentials" in xhrSupported;
  support.ajax = xhrSupported = !!xhrSupported;
  jQuery2.ajaxTransport(function(options) {
    var callback, errorCallback;
    if (support.cors || xhrSupported && !options.crossDomain) {
      return {
        send: function(headers, complete) {
          var i, xhr = options.xhr();
          xhr.open(
            options.type,
            options.url,
            options.async,
            options.username,
            options.password
          );
          if (options.xhrFields) {
            for (i in options.xhrFields) {
              xhr[i] = options.xhrFields[i];
            }
          }
          if (options.mimeType && xhr.overrideMimeType) {
            xhr.overrideMimeType(options.mimeType);
          }
          if (!options.crossDomain && !headers["X-Requested-With"]) {
            headers["X-Requested-With"] = "XMLHttpRequest";
          }
          for (i in headers) {
            xhr.setRequestHeader(i, headers[i]);
          }
          callback = function(type) {
            return function() {
              if (callback) {
                callback = errorCallback = xhr.onload = xhr.onerror = xhr.onabort = xhr.ontimeout = xhr.onreadystatechange = null;
                if (type === "abort") {
                  xhr.abort();
                } else if (type === "error") {
                  if (typeof xhr.status !== "number") {
                    complete(0, "error");
                  } else {
                    complete(
                      // File: protocol always yields status 0; see trac-8605, trac-14207
                      xhr.status,
                      xhr.statusText
                    );
                  }
                } else {
                  complete(
                    xhrSuccessStatus[xhr.status] || xhr.status,
                    xhr.statusText,
                    // Support: IE <=9 only
                    // IE9 has no XHR2 but throws on binary (trac-11426)
                    // For XHR2 non-text, let the caller handle it (gh-2498)
                    (xhr.responseType || "text") !== "text" || typeof xhr.responseText !== "string" ? { binary: xhr.response } : { text: xhr.responseText },
                    xhr.getAllResponseHeaders()
                  );
                }
              }
            };
          };
          xhr.onload = callback();
          errorCallback = xhr.onerror = xhr.ontimeout = callback("error");
          if (xhr.onabort !== void 0) {
            xhr.onabort = errorCallback;
          } else {
            xhr.onreadystatechange = function() {
              if (xhr.readyState === 4) {
                window2.setTimeout(function() {
                  if (callback) {
                    errorCallback();
                  }
                });
              }
            };
          }
          callback = callback("abort");
          try {
            xhr.send(options.hasContent && options.data || null);
          } catch (e) {
            if (callback) {
              throw e;
            }
          }
        },
        abort: function() {
          if (callback) {
            callback();
          }
        }
      };
    }
  });
  jQuery2.ajaxPrefilter(function(s) {
    if (s.crossDomain) {
      s.contents.script = false;
    }
  });
  jQuery2.ajaxSetup({
    accepts: {
      script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
    },
    contents: {
      script: /\b(?:java|ecma)script\b/
    },
    converters: {
      "text script": function(text) {
        jQuery2.globalEval(text);
        return text;
      }
    }
  });
  jQuery2.ajaxPrefilter("script", function(s) {
    if (s.cache === void 0) {
      s.cache = false;
    }
    if (s.crossDomain) {
      s.type = "GET";
    }
  });
  jQuery2.ajaxTransport("script", function(s) {
    if (s.crossDomain || s.scriptAttrs) {
      var script, callback;
      return {
        send: function(_, complete) {
          script = jQuery2("<script>").attr(s.scriptAttrs || {}).prop({ charset: s.scriptCharset, src: s.url }).on("load error", callback = function(evt) {
            script.remove();
            callback = null;
            if (evt) {
              complete(evt.type === "error" ? 404 : 200, evt.type);
            }
          });
          document2.head.appendChild(script[0]);
        },
        abort: function() {
          if (callback) {
            callback();
          }
        }
      };
    }
  });
  var oldCallbacks = [], rjsonp = /(=)\?(?=&|$)|\?\?/;
  jQuery2.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function() {
      var callback = oldCallbacks.pop() || jQuery2.expando + "_" + nonce.guid++;
      this[callback] = true;
      return callback;
    }
  });
  jQuery2.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
    var callbackName, overwritten, responseContainer, jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && rjsonp.test(s.data) && "data");
    if (jsonProp || s.dataTypes[0] === "jsonp") {
      callbackName = s.jsonpCallback = isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;
      if (jsonProp) {
        s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
      } else if (s.jsonp !== false) {
        s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
      }
      s.converters["script json"] = function() {
        if (!responseContainer) {
          jQuery2.error(callbackName + " was not called");
        }
        return responseContainer[0];
      };
      s.dataTypes[0] = "json";
      overwritten = window2[callbackName];
      window2[callbackName] = function() {
        responseContainer = arguments;
      };
      jqXHR.always(function() {
        if (overwritten === void 0) {
          jQuery2(window2).removeProp(callbackName);
        } else {
          window2[callbackName] = overwritten;
        }
        if (s[callbackName]) {
          s.jsonpCallback = originalSettings.jsonpCallback;
          oldCallbacks.push(callbackName);
        }
        if (responseContainer && isFunction(overwritten)) {
          overwritten(responseContainer[0]);
        }
        responseContainer = overwritten = void 0;
      });
      return "script";
    }
  });
  support.createHTMLDocument = function() {
    var body = document2.implementation.createHTMLDocument("").body;
    body.innerHTML = "<form></form><form></form>";
    return body.childNodes.length === 2;
  }();
  jQuery2.parseHTML = function(data, context, keepScripts) {
    if (typeof data !== "string") {
      return [];
    }
    if (typeof context === "boolean") {
      keepScripts = context;
      context = false;
    }
    var base, parsed, scripts;
    if (!context) {
      if (support.createHTMLDocument) {
        context = document2.implementation.createHTMLDocument("");
        base = context.createElement("base");
        base.href = document2.location.href;
        context.head.appendChild(base);
      } else {
        context = document2;
      }
    }
    parsed = rsingleTag.exec(data);
    scripts = !keepScripts && [];
    if (parsed) {
      return [context.createElement(parsed[1])];
    }
    parsed = buildFragment([data], context, scripts);
    if (scripts && scripts.length) {
      jQuery2(scripts).remove();
    }
    return jQuery2.merge([], parsed.childNodes);
  };
  jQuery2.fn.load = function(url, params, callback) {
    var selector, type, response, self = this, off = url.indexOf(" ");
    if (off > -1) {
      selector = stripAndCollapse(url.slice(off));
      url = url.slice(0, off);
    }
    if (isFunction(params)) {
      callback = params;
      params = void 0;
    } else if (params && typeof params === "object") {
      type = "POST";
    }
    if (self.length > 0) {
      jQuery2.ajax({
        url,
        // If "type" variable is undefined, then "GET" method will be used.
        // Make value of this field explicit since
        // user can override it through ajaxSetup method
        type: type || "GET",
        dataType: "html",
        data: params
      }).done(function(responseText) {
        response = arguments;
        self.html(selector ? (
          // If a selector was specified, locate the right elements in a dummy div
          // Exclude scripts to avoid IE 'Permission Denied' errors
          jQuery2("<div>").append(jQuery2.parseHTML(responseText)).find(selector)
        ) : (
          // Otherwise use the full result
          responseText
        ));
      }).always(callback && function(jqXHR, status) {
        self.each(function() {
          callback.apply(this, response || [jqXHR.responseText, status, jqXHR]);
        });
      });
    }
    return this;
  };
  jQuery2.expr.pseudos.animated = function(elem) {
    return jQuery2.grep(jQuery2.timers, function(fn) {
      return elem === fn.elem;
    }).length;
  };
  jQuery2.offset = {
    setOffset: function(elem, options, i) {
      var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition, position = jQuery2.css(elem, "position"), curElem = jQuery2(elem), props = {};
      if (position === "static") {
        elem.style.position = "relative";
      }
      curOffset = curElem.offset();
      curCSSTop = jQuery2.css(elem, "top");
      curCSSLeft = jQuery2.css(elem, "left");
      calculatePosition = (position === "absolute" || position === "fixed") && (curCSSTop + curCSSLeft).indexOf("auto") > -1;
      if (calculatePosition) {
        curPosition = curElem.position();
        curTop = curPosition.top;
        curLeft = curPosition.left;
      } else {
        curTop = parseFloat(curCSSTop) || 0;
        curLeft = parseFloat(curCSSLeft) || 0;
      }
      if (isFunction(options)) {
        options = options.call(elem, i, jQuery2.extend({}, curOffset));
      }
      if (options.top != null) {
        props.top = options.top - curOffset.top + curTop;
      }
      if (options.left != null) {
        props.left = options.left - curOffset.left + curLeft;
      }
      if ("using" in options) {
        options.using.call(elem, props);
      } else {
        curElem.css(props);
      }
    }
  };
  jQuery2.fn.extend({
    // offset() relates an element's border box to the document origin
    offset: function(options) {
      if (arguments.length) {
        return options === void 0 ? this : this.each(function(i) {
          jQuery2.offset.setOffset(this, options, i);
        });
      }
      var rect, win, elem = this[0];
      if (!elem) {
        return;
      }
      if (!elem.getClientRects().length) {
        return { top: 0, left: 0 };
      }
      rect = elem.getBoundingClientRect();
      win = elem.ownerDocument.defaultView;
      return {
        top: rect.top + win.pageYOffset,
        left: rect.left + win.pageXOffset
      };
    },
    // position() relates an element's margin box to its offset parent's padding box
    // This corresponds to the behavior of CSS absolute positioning
    position: function() {
      if (!this[0]) {
        return;
      }
      var offsetParent, offset, doc, elem = this[0], parentOffset = { top: 0, left: 0 };
      if (jQuery2.css(elem, "position") === "fixed") {
        offset = elem.getBoundingClientRect();
      } else {
        offset = this.offset();
        doc = elem.ownerDocument;
        offsetParent = elem.offsetParent || doc.documentElement;
        while (offsetParent && (offsetParent === doc.body || offsetParent === doc.documentElement) && jQuery2.css(offsetParent, "position") === "static") {
          offsetParent = offsetParent.parentNode;
        }
        if (offsetParent && offsetParent !== elem && offsetParent.nodeType === 1) {
          parentOffset = jQuery2(offsetParent).offset();
          parentOffset.top += jQuery2.css(offsetParent, "borderTopWidth", true);
          parentOffset.left += jQuery2.css(offsetParent, "borderLeftWidth", true);
        }
      }
      return {
        top: offset.top - parentOffset.top - jQuery2.css(elem, "marginTop", true),
        left: offset.left - parentOffset.left - jQuery2.css(elem, "marginLeft", true)
      };
    },
    // This method will return documentElement in the following cases:
    // 1) For the element inside the iframe without offsetParent, this method will return
    //    documentElement of the parent window
    // 2) For the hidden or detached element
    // 3) For body or html element, i.e. in case of the html node - it will return itself
    //
    // but those exceptions were never presented as a real life use-cases
    // and might be considered as more preferable results.
    //
    // This logic, however, is not guaranteed and can change at any point in the future
    offsetParent: function() {
      return this.map(function() {
        var offsetParent = this.offsetParent;
        while (offsetParent && jQuery2.css(offsetParent, "position") === "static") {
          offsetParent = offsetParent.offsetParent;
        }
        return offsetParent || documentElement;
      });
    }
  });
  jQuery2.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function(method, prop) {
    var top = "pageYOffset" === prop;
    jQuery2.fn[method] = function(val) {
      return access(this, function(elem, method2, val2) {
        var win;
        if (isWindow(elem)) {
          win = elem;
        } else if (elem.nodeType === 9) {
          win = elem.defaultView;
        }
        if (val2 === void 0) {
          return win ? win[prop] : elem[method2];
        }
        if (win) {
          win.scrollTo(
            !top ? val2 : win.pageXOffset,
            top ? val2 : win.pageYOffset
          );
        } else {
          elem[method2] = val2;
        }
      }, method, val, arguments.length);
    };
  });
  jQuery2.each(["top", "left"], function(_i, prop) {
    jQuery2.cssHooks[prop] = addGetHookIf(
      support.pixelPosition,
      function(elem, computed) {
        if (computed) {
          computed = curCSS(elem, prop);
          return rnumnonpx.test(computed) ? jQuery2(elem).position()[prop] + "px" : computed;
        }
      }
    );
  });
  jQuery2.each({ Height: "height", Width: "width" }, function(name, type) {
    jQuery2.each({
      padding: "inner" + name,
      content: type,
      "": "outer" + name
    }, function(defaultExtra, funcName) {
      jQuery2.fn[funcName] = function(margin, value) {
        var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"), extra = defaultExtra || (margin === true || value === true ? "margin" : "border");
        return access(this, function(elem, type2, value2) {
          var doc;
          if (isWindow(elem)) {
            return funcName.indexOf("outer") === 0 ? elem["inner" + name] : elem.document.documentElement["client" + name];
          }
          if (elem.nodeType === 9) {
            doc = elem.documentElement;
            return Math.max(
              elem.body["scroll" + name],
              doc["scroll" + name],
              elem.body["offset" + name],
              doc["offset" + name],
              doc["client" + name]
            );
          }
          return value2 === void 0 ? (
            // Get width or height on the element, requesting but not forcing parseFloat
            jQuery2.css(elem, type2, extra)
          ) : (
            // Set width or height on the element
            jQuery2.style(elem, type2, value2, extra)
          );
        }, type, chainable ? margin : void 0, chainable);
      };
    });
  });
  jQuery2.each([
    "ajaxStart",
    "ajaxStop",
    "ajaxComplete",
    "ajaxError",
    "ajaxSuccess",
    "ajaxSend"
  ], function(_i, type) {
    jQuery2.fn[type] = function(fn) {
      return this.on(type, fn);
    };
  });
  jQuery2.fn.extend({
    bind: function(types, data, fn) {
      return this.on(types, null, data, fn);
    },
    unbind: function(types, fn) {
      return this.off(types, null, fn);
    },
    delegate: function(selector, types, data, fn) {
      return this.on(types, selector, data, fn);
    },
    undelegate: function(selector, types, fn) {
      return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
    },
    hover: function(fnOver, fnOut) {
      return this.on("mouseenter", fnOver).on("mouseleave", fnOut || fnOver);
    }
  });
  jQuery2.each(
    "blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),
    function(_i, name) {
      jQuery2.fn[name] = function(data, fn) {
        return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
      };
    }
  );
  var rtrim = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;
  jQuery2.proxy = function(fn, context) {
    var tmp, args, proxy;
    if (typeof context === "string") {
      tmp = fn[context];
      context = fn;
      fn = tmp;
    }
    if (!isFunction(fn)) {
      return void 0;
    }
    args = slice.call(arguments, 2);
    proxy = function() {
      return fn.apply(context || this, args.concat(slice.call(arguments)));
    };
    proxy.guid = fn.guid = fn.guid || jQuery2.guid++;
    return proxy;
  };
  jQuery2.holdReady = function(hold) {
    if (hold) {
      jQuery2.readyWait++;
    } else {
      jQuery2.ready(true);
    }
  };
  jQuery2.isArray = Array.isArray;
  jQuery2.parseJSON = JSON.parse;
  jQuery2.nodeName = nodeName;
  jQuery2.isFunction = isFunction;
  jQuery2.isWindow = isWindow;
  jQuery2.camelCase = camelCase;
  jQuery2.type = toType;
  jQuery2.now = Date.now;
  jQuery2.isNumeric = function(obj) {
    var type = jQuery2.type(obj);
    return (type === "number" || type === "string") && // parseFloat NaNs numeric-cast false positives ("")
    // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
    // subtraction forces infinities to NaN
    !isNaN(obj - parseFloat(obj));
  };
  jQuery2.trim = function(text) {
    return text == null ? "" : (text + "").replace(rtrim, "$1");
  };
  if (typeof define === "function" && define.amd) {
    define("jquery", [], function() {
      return jQuery2;
    });
  }
  var _jQuery = window2.jQuery, _$ = window2.$;
  jQuery2.noConflict = function(deep) {
    if (window2.$ === jQuery2) {
      window2.$ = _$;
    }
    if (deep && window2.jQuery === jQuery2) {
      window2.jQuery = _jQuery;
    }
    return jQuery2;
  };
  if (typeof noGlobal === "undefined") {
    window2.jQuery = window2.$ = jQuery2;
  }
  return jQuery2;
});
/*!
 * Materialize v0.100.2 (http://materializecss.com)
 * Copyright 2014-2017 Materialize
 * MIT License (https://raw.githubusercontent.com/Dogfalo/materialize/master/LICENSE)
 */
var _createClass = /* @__PURE__ */ function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
if (typeof jQuery === "undefined") {
  if (typeof require === "function") {
    jQuery = $ = require("jquery");
  } else {
    jQuery = $;
  }
}
;
(function(factory) {
  if (typeof define === "function" && define.amd) {
    define(["jquery"], function($2) {
      return factory($2);
    });
  } else if (typeof module === "object" && typeof module.exports === "object") {
    exports = factory(require("jquery"));
  } else {
    factory(jQuery);
  }
})(function($2) {
  $2.easing["jswing"] = $2.easing["swing"];
  var pow = Math.pow, sqrt = Math.sqrt, sin = Math.sin, cos = Math.cos, PI = Math.PI, c1 = 1.70158, c2 = c1 * 1.525, c3 = c1 + 1, c4 = 2 * PI / 3, c5 = 2 * PI / 4.5;
  function bounceOut(x) {
    var n1 = 7.5625, d1 = 2.75;
    if (x < 1 / d1) {
      return n1 * x * x;
    } else if (x < 2 / d1) {
      return n1 * (x -= 1.5 / d1) * x + 0.75;
    } else if (x < 2.5 / d1) {
      return n1 * (x -= 2.25 / d1) * x + 0.9375;
    } else {
      return n1 * (x -= 2.625 / d1) * x + 0.984375;
    }
  }
  $2.extend($2.easing, {
    def: "easeOutQuad",
    swing: function(x) {
      return $2.easing[$2.easing.def](x);
    },
    easeInQuad: function(x) {
      return x * x;
    },
    easeOutQuad: function(x) {
      return 1 - (1 - x) * (1 - x);
    },
    easeInOutQuad: function(x) {
      return x < 0.5 ? 2 * x * x : 1 - pow(-2 * x + 2, 2) / 2;
    },
    easeInCubic: function(x) {
      return x * x * x;
    },
    easeOutCubic: function(x) {
      return 1 - pow(1 - x, 3);
    },
    easeInOutCubic: function(x) {
      return x < 0.5 ? 4 * x * x * x : 1 - pow(-2 * x + 2, 3) / 2;
    },
    easeInQuart: function(x) {
      return x * x * x * x;
    },
    easeOutQuart: function(x) {
      return 1 - pow(1 - x, 4);
    },
    easeInOutQuart: function(x) {
      return x < 0.5 ? 8 * x * x * x * x : 1 - pow(-2 * x + 2, 4) / 2;
    },
    easeInQuint: function(x) {
      return x * x * x * x * x;
    },
    easeOutQuint: function(x) {
      return 1 - pow(1 - x, 5);
    },
    easeInOutQuint: function(x) {
      return x < 0.5 ? 16 * x * x * x * x * x : 1 - pow(-2 * x + 2, 5) / 2;
    },
    easeInSine: function(x) {
      return 1 - cos(x * PI / 2);
    },
    easeOutSine: function(x) {
      return sin(x * PI / 2);
    },
    easeInOutSine: function(x) {
      return -(cos(PI * x) - 1) / 2;
    },
    easeInExpo: function(x) {
      return x === 0 ? 0 : pow(2, 10 * x - 10);
    },
    easeOutExpo: function(x) {
      return x === 1 ? 1 : 1 - pow(2, -10 * x);
    },
    easeInOutExpo: function(x) {
      return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? pow(2, 20 * x - 10) / 2 : (2 - pow(2, -20 * x + 10)) / 2;
    },
    easeInCirc: function(x) {
      return 1 - sqrt(1 - pow(x, 2));
    },
    easeOutCirc: function(x) {
      return sqrt(1 - pow(x - 1, 2));
    },
    easeInOutCirc: function(x) {
      return x < 0.5 ? (1 - sqrt(1 - pow(2 * x, 2))) / 2 : (sqrt(1 - pow(-2 * x + 2, 2)) + 1) / 2;
    },
    easeInElastic: function(x) {
      return x === 0 ? 0 : x === 1 ? 1 : -pow(2, 10 * x - 10) * sin((x * 10 - 10.75) * c4);
    },
    easeOutElastic: function(x) {
      return x === 0 ? 0 : x === 1 ? 1 : pow(2, -10 * x) * sin((x * 10 - 0.75) * c4) + 1;
    },
    easeInOutElastic: function(x) {
      return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? -(pow(2, 20 * x - 10) * sin((20 * x - 11.125) * c5)) / 2 : pow(2, -20 * x + 10) * sin((20 * x - 11.125) * c5) / 2 + 1;
    },
    easeInBack: function(x) {
      return c3 * x * x * x - c1 * x * x;
    },
    easeOutBack: function(x) {
      return 1 + c3 * pow(x - 1, 3) + c1 * pow(x - 1, 2);
    },
    easeInOutBack: function(x) {
      return x < 0.5 ? pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2) / 2 : (pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
    },
    easeInBounce: function(x) {
      return 1 - bounceOut(1 - x);
    },
    easeOutBounce: bounceOut,
    easeInOutBounce: function(x) {
      return x < 0.5 ? (1 - bounceOut(1 - 2 * x)) / 2 : (1 + bounceOut(2 * x - 1)) / 2;
    }
  });
});
;
jQuery.extend(jQuery.easing, {
  easeInOutMaterial: function(x, t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t + b;
    return c / 4 * ((t -= 2) * t * t + 2) + b;
  }
});
;
/*! VelocityJS.org (1.2.3). (C) 2014 Julian Shapiro. MIT @license: en.wikipedia.org/wiki/MIT_License */
/*! VelocityJS.org jQuery Shim (1.0.1). (C) 2014 The jQuery Foundation. MIT @license: en.wikipedia.org/wiki/MIT_License. */
/*! Note that this has been modified by Materialize to confirm that Velocity is not already being imported. */
jQuery.Velocity ? console.log("Velocity is already loaded. You may be needlessly importing Velocity again; note that Materialize includes Velocity.") : (!function(e) {
  function t(e2) {
    var t2 = e2.length, a2 = r.type(e2);
    return "function" === a2 || r.isWindow(e2) ? false : 1 === e2.nodeType && t2 ? true : "array" === a2 || 0 === t2 || "number" == typeof t2 && t2 > 0 && t2 - 1 in e2;
  }
  if (!e.jQuery) {
    var r = function(e2, t2) {
      return new r.fn.init(e2, t2);
    };
    r.isWindow = function(e2) {
      return null != e2 && e2 == e2.window;
    }, r.type = function(e2) {
      return null == e2 ? e2 + "" : "object" == typeof e2 || "function" == typeof e2 ? n[i.call(e2)] || "object" : typeof e2;
    }, r.isArray = Array.isArray || function(e2) {
      return "array" === r.type(e2);
    }, r.isPlainObject = function(e2) {
      var t2;
      if (!e2 || "object" !== r.type(e2) || e2.nodeType || r.isWindow(e2)) return false;
      try {
        if (e2.constructor && !o.call(e2, "constructor") && !o.call(e2.constructor.prototype, "isPrototypeOf")) return false;
      } catch (a2) {
        return false;
      }
      for (t2 in e2) {
      }
      return void 0 === t2 || o.call(e2, t2);
    }, r.each = function(e2, r2, a2) {
      var n2, o2 = 0, i2 = e2.length, s2 = t(e2);
      if (a2) {
        if (s2) for (; i2 > o2 && (n2 = r2.apply(e2[o2], a2), n2 !== false); o2++) {
        }
        else for (o2 in e2) {
          if (n2 = r2.apply(e2[o2], a2), n2 === false) break;
        }
      } else if (s2) for (; i2 > o2 && (n2 = r2.call(e2[o2], o2, e2[o2]), n2 !== false); o2++) {
      }
      else for (o2 in e2) {
        if (n2 = r2.call(e2[o2], o2, e2[o2]), n2 === false) break;
      }
      return e2;
    }, r.data = function(e2, t2, n2) {
      if (void 0 === n2) {
        var o2 = e2[r.expando], i2 = o2 && a[o2];
        if (void 0 === t2) return i2;
        if (i2 && t2 in i2) return i2[t2];
      } else if (void 0 !== t2) {
        var o2 = e2[r.expando] || (e2[r.expando] = ++r.uuid);
        return a[o2] = a[o2] || {}, a[o2][t2] = n2, n2;
      }
    }, r.removeData = function(e2, t2) {
      var n2 = e2[r.expando], o2 = n2 && a[n2];
      o2 && r.each(t2, function(e3, t3) {
        delete o2[t3];
      });
    }, r.extend = function() {
      var e2, t2, a2, n2, o2, i2, s2 = arguments[0] || {}, l2 = 1, u = arguments.length, c = false;
      for ("boolean" == typeof s2 && (c = s2, s2 = arguments[l2] || {}, l2++), "object" != typeof s2 && "function" !== r.type(s2) && (s2 = {}), l2 === u && (s2 = this, l2--); u > l2; l2++) {
        if (null != (o2 = arguments[l2])) for (n2 in o2) {
          e2 = s2[n2], a2 = o2[n2], s2 !== a2 && (c && a2 && (r.isPlainObject(a2) || (t2 = r.isArray(a2))) ? (t2 ? (t2 = false, i2 = e2 && r.isArray(e2) ? e2 : []) : i2 = e2 && r.isPlainObject(e2) ? e2 : {}, s2[n2] = r.extend(c, i2, a2)) : void 0 !== a2 && (s2[n2] = a2));
        }
      }
      return s2;
    }, r.queue = function(e2, a2, n2) {
      function o2(e3, r2) {
        var a3 = r2 || [];
        return null != e3 && (t(Object(e3)) ? !function(e4, t2) {
          for (var r3 = +t2.length, a4 = 0, n3 = e4.length; r3 > a4; ) {
            e4[n3++] = t2[a4++];
          }
          if (r3 !== r3) for (; void 0 !== t2[a4]; ) {
            e4[n3++] = t2[a4++];
          }
          return e4.length = n3, e4;
        }(a3, "string" == typeof e3 ? [e3] : e3) : [].push.call(a3, e3)), a3;
      }
      if (e2) {
        a2 = (a2 || "fx") + "queue";
        var i2 = r.data(e2, a2);
        return n2 ? (!i2 || r.isArray(n2) ? i2 = r.data(e2, a2, o2(n2)) : i2.push(n2), i2) : i2 || [];
      }
    }, r.dequeue = function(e2, t2) {
      r.each(e2.nodeType ? [e2] : e2, function(e3, a2) {
        t2 = t2 || "fx";
        var n2 = r.queue(a2, t2), o2 = n2.shift();
        "inprogress" === o2 && (o2 = n2.shift()), o2 && ("fx" === t2 && n2.unshift("inprogress"), o2.call(a2, function() {
          r.dequeue(a2, t2);
        }));
      });
    }, r.fn = r.prototype = { init: function(e2) {
      if (e2.nodeType) return this[0] = e2, this;
      throw new Error("Not a DOM node.");
    }, offset: function() {
      var t2 = this[0].getBoundingClientRect ? this[0].getBoundingClientRect() : { top: 0, left: 0 };
      return { top: t2.top + (e.pageYOffset || document.scrollTop || 0) - (document.clientTop || 0), left: t2.left + (e.pageXOffset || document.scrollLeft || 0) - (document.clientLeft || 0) };
    }, position: function() {
      function e2() {
        for (var e3 = this.offsetParent || document; e3 && "html" === !e3.nodeType.toLowerCase && "static" === e3.style.position; ) {
          e3 = e3.offsetParent;
        }
        return e3 || document;
      }
      var t2 = this[0], e2 = e2.apply(t2), a2 = this.offset(), n2 = /^(?:body|html)$/i.test(e2.nodeName) ? { top: 0, left: 0 } : r(e2).offset();
      return a2.top -= parseFloat(t2.style.marginTop) || 0, a2.left -= parseFloat(t2.style.marginLeft) || 0, e2.style && (n2.top += parseFloat(e2.style.borderTopWidth) || 0, n2.left += parseFloat(e2.style.borderLeftWidth) || 0), { top: a2.top - n2.top, left: a2.left - n2.left };
    } };
    var a = {};
    r.expando = "velocity" + (/* @__PURE__ */ new Date()).getTime(), r.uuid = 0;
    for (var n = {}, o = n.hasOwnProperty, i = n.toString, s = "Boolean Number String Function Array Date RegExp Object Error".split(" "), l = 0; l < s.length; l++) {
      n["[object " + s[l] + "]"] = s[l].toLowerCase();
    }
    r.fn.init.prototype = r.fn, e.Velocity = { Utilities: r };
  }
}(window), function(e) {
  "object" == typeof module && "object" == typeof module.exports ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : e();
}(function() {
  return function(e, t, r, a) {
    function n(e2) {
      for (var t2 = -1, r2 = e2 ? e2.length : 0, a2 = []; ++t2 < r2; ) {
        var n2 = e2[t2];
        n2 && a2.push(n2);
      }
      return a2;
    }
    function o(e2) {
      return m.isWrapped(e2) ? e2 = [].slice.call(e2) : m.isNode(e2) && (e2 = [e2]), e2;
    }
    function i(e2) {
      var t2 = f.data(e2, "velocity");
      return null === t2 ? a : t2;
    }
    function s(e2) {
      return function(t2) {
        return Math.round(t2 * e2) * (1 / e2);
      };
    }
    function l(e2, r2, a2, n2) {
      function o2(e3, t2) {
        return 1 - 3 * t2 + 3 * e3;
      }
      function i2(e3, t2) {
        return 3 * t2 - 6 * e3;
      }
      function s2(e3) {
        return 3 * e3;
      }
      function l2(e3, t2, r3) {
        return ((o2(t2, r3) * e3 + i2(t2, r3)) * e3 + s2(t2)) * e3;
      }
      function u2(e3, t2, r3) {
        return 3 * o2(t2, r3) * e3 * e3 + 2 * i2(t2, r3) * e3 + s2(t2);
      }
      function c2(t2, r3) {
        for (var n3 = 0; m2 > n3; ++n3) {
          var o3 = u2(r3, e2, a2);
          if (0 === o3) return r3;
          var i3 = l2(r3, e2, a2) - t2;
          r3 -= i3 / o3;
        }
        return r3;
      }
      function p2() {
        for (var t2 = 0; b2 > t2; ++t2) {
          w2[t2] = l2(t2 * x2, e2, a2);
        }
      }
      function f2(t2, r3, n3) {
        var o3, i3, s3 = 0;
        do {
          i3 = r3 + (n3 - r3) / 2, o3 = l2(i3, e2, a2) - t2, o3 > 0 ? n3 = i3 : r3 = i3;
        } while (Math.abs(o3) > h2 && ++s3 < v2);
        return i3;
      }
      function d2(t2) {
        for (var r3 = 0, n3 = 1, o3 = b2 - 1; n3 != o3 && w2[n3] <= t2; ++n3) {
          r3 += x2;
        }
        --n3;
        var i3 = (t2 - w2[n3]) / (w2[n3 + 1] - w2[n3]), s3 = r3 + i3 * x2, l3 = u2(s3, e2, a2);
        return l3 >= y3 ? c2(t2, s3) : 0 == l3 ? s3 : f2(t2, r3, r3 + x2);
      }
      function g2() {
        V = true, (e2 != r2 || a2 != n2) && p2();
      }
      var m2 = 4, y3 = 1e-3, h2 = 1e-7, v2 = 10, b2 = 11, x2 = 1 / (b2 - 1), S2 = "Float32Array" in t;
      if (4 !== arguments.length) return false;
      for (var P2 = 0; 4 > P2; ++P2) {
        if ("number" != typeof arguments[P2] || isNaN(arguments[P2]) || !isFinite(arguments[P2])) return false;
      }
      e2 = Math.min(e2, 1), a2 = Math.min(a2, 1), e2 = Math.max(e2, 0), a2 = Math.max(a2, 0);
      var w2 = S2 ? new Float32Array(b2) : new Array(b2), V = false, C = function(t2) {
        return V || g2(), e2 === r2 && a2 === n2 ? t2 : 0 === t2 ? 0 : 1 === t2 ? 1 : l2(d2(t2), r2, n2);
      };
      C.getControlPoints = function() {
        return [{ x: e2, y: r2 }, { x: a2, y: n2 }];
      };
      var T = "generateBezier(" + [e2, r2, a2, n2] + ")";
      return C.toString = function() {
        return T;
      }, C;
    }
    function u(e2, t2) {
      var r2 = e2;
      return m.isString(e2) ? b.Easings[e2] || (r2 = false) : r2 = m.isArray(e2) && 1 === e2.length ? s.apply(null, e2) : m.isArray(e2) && 2 === e2.length ? x.apply(null, e2.concat([t2])) : m.isArray(e2) && 4 === e2.length ? l.apply(null, e2) : false, r2 === false && (r2 = b.Easings[b.defaults.easing] ? b.defaults.easing : v), r2;
    }
    function c(e2) {
      if (e2) {
        var t2 = (/* @__PURE__ */ new Date()).getTime(), r2 = b.State.calls.length;
        r2 > 1e4 && (b.State.calls = n(b.State.calls));
        for (var o2 = 0; r2 > o2; o2++) {
          if (b.State.calls[o2]) {
            var s2 = b.State.calls[o2], l2 = s2[0], u2 = s2[2], d2 = s2[3], g2 = !!d2, y3 = null;
            d2 || (d2 = b.State.calls[o2][3] = t2 - 16);
            for (var h2 = Math.min((t2 - d2) / u2.duration, 1), v2 = 0, x2 = l2.length; x2 > v2; v2++) {
              var P2 = l2[v2], V = P2.element;
              if (i(V)) {
                var C = false;
                if (u2.display !== a && null !== u2.display && "none" !== u2.display) {
                  if ("flex" === u2.display) {
                    var T = ["-webkit-box", "-moz-box", "-ms-flexbox", "-webkit-flex"];
                    f.each(T, function(e3, t3) {
                      S.setPropertyValue(V, "display", t3);
                    });
                  }
                  S.setPropertyValue(V, "display", u2.display);
                }
                u2.visibility !== a && "hidden" !== u2.visibility && S.setPropertyValue(V, "visibility", u2.visibility);
                for (var k in P2) {
                  if ("element" !== k) {
                    var A, F = P2[k], j = m.isString(F.easing) ? b.Easings[F.easing] : F.easing;
                    if (1 === h2) A = F.endValue;
                    else {
                      var E = F.endValue - F.startValue;
                      if (A = F.startValue + E * j(h2, u2, E), !g2 && A === F.currentValue) continue;
                    }
                    if (F.currentValue = A, "tween" === k) y3 = A;
                    else {
                      if (S.Hooks.registered[k]) {
                        var H = S.Hooks.getRoot(k), N = i(V).rootPropertyValueCache[H];
                        N && (F.rootPropertyValue = N);
                      }
                      var L = S.setPropertyValue(V, k, F.currentValue + (0 === parseFloat(A) ? "" : F.unitType), F.rootPropertyValue, F.scrollData);
                      S.Hooks.registered[k] && (i(V).rootPropertyValueCache[H] = S.Normalizations.registered[H] ? S.Normalizations.registered[H]("extract", null, L[1]) : L[1]), "transform" === L[0] && (C = true);
                    }
                  }
                }
                u2.mobileHA && i(V).transformCache.translate3d === a && (i(V).transformCache.translate3d = "(0px, 0px, 0px)", C = true), C && S.flushTransformCache(V);
              }
            }
            u2.display !== a && "none" !== u2.display && (b.State.calls[o2][2].display = false), u2.visibility !== a && "hidden" !== u2.visibility && (b.State.calls[o2][2].visibility = false), u2.progress && u2.progress.call(s2[1], s2[1], h2, Math.max(0, d2 + u2.duration - t2), d2, y3), 1 === h2 && p(o2);
          }
        }
      }
      b.State.isTicking && w(c);
    }
    function p(e2, t2) {
      if (!b.State.calls[e2]) return false;
      for (var r2 = b.State.calls[e2][0], n2 = b.State.calls[e2][1], o2 = b.State.calls[e2][2], s2 = b.State.calls[e2][4], l2 = false, u2 = 0, c2 = r2.length; c2 > u2; u2++) {
        var p2 = r2[u2].element;
        if (t2 || o2.loop || ("none" === o2.display && S.setPropertyValue(p2, "display", o2.display), "hidden" === o2.visibility && S.setPropertyValue(p2, "visibility", o2.visibility)), o2.loop !== true && (f.queue(p2)[1] === a || !/\.velocityQueueEntryFlag/i.test(f.queue(p2)[1])) && i(p2)) {
          i(p2).isAnimating = false, i(p2).rootPropertyValueCache = {};
          var d2 = false;
          f.each(S.Lists.transforms3D, function(e3, t3) {
            var r3 = /^scale/.test(t3) ? 1 : 0, n3 = i(p2).transformCache[t3];
            i(p2).transformCache[t3] !== a && new RegExp("^\\(" + r3 + "[^.]").test(n3) && (d2 = true, delete i(p2).transformCache[t3]);
          }), o2.mobileHA && (d2 = true, delete i(p2).transformCache.translate3d), d2 && S.flushTransformCache(p2), S.Values.removeClass(p2, "velocity-animating");
        }
        if (!t2 && o2.complete && !o2.loop && u2 === c2 - 1) try {
          o2.complete.call(n2, n2);
        } catch (g2) {
          setTimeout(function() {
            throw g2;
          }, 1);
        }
        s2 && o2.loop !== true && s2(n2), i(p2) && o2.loop === true && !t2 && (f.each(i(p2).tweensContainer, function(e3, t3) {
          /^rotate/.test(e3) && 360 === parseFloat(t3.endValue) && (t3.endValue = 0, t3.startValue = 360), /^backgroundPosition/.test(e3) && 100 === parseFloat(t3.endValue) && "%" === t3.unitType && (t3.endValue = 0, t3.startValue = 100);
        }), b(p2, "reverse", { loop: true, delay: o2.delay })), o2.queue !== false && f.dequeue(p2, o2.queue);
      }
      b.State.calls[e2] = false;
      for (var m2 = 0, y3 = b.State.calls.length; y3 > m2; m2++) {
        if (b.State.calls[m2] !== false) {
          l2 = true;
          break;
        }
      }
      l2 === false && (b.State.isTicking = false, delete b.State.calls, b.State.calls = []);
    }
    var f, d = function() {
      if (r.documentMode) return r.documentMode;
      for (var e2 = 7; e2 > 4; e2--) {
        var t2 = r.createElement("div");
        if (t2.innerHTML = "<!--[if IE " + e2 + "]><span></span><![endif]-->", t2.getElementsByTagName("span").length) return t2 = null, e2;
      }
      return a;
    }(), g = function() {
      var e2 = 0;
      return t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || function(t2) {
        var r2, a2 = (/* @__PURE__ */ new Date()).getTime();
        return r2 = Math.max(0, 16 - (a2 - e2)), e2 = a2 + r2, setTimeout(function() {
          t2(a2 + r2);
        }, r2);
      };
    }(), m = { isString: function(e2) {
      return "string" == typeof e2;
    }, isArray: Array.isArray || function(e2) {
      return "[object Array]" === Object.prototype.toString.call(e2);
    }, isFunction: function(e2) {
      return "[object Function]" === Object.prototype.toString.call(e2);
    }, isNode: function(e2) {
      return e2 && e2.nodeType;
    }, isNodeList: function(e2) {
      return "object" == typeof e2 && /^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(e2)) && e2.length !== a && (0 === e2.length || "object" == typeof e2[0] && e2[0].nodeType > 0);
    }, isWrapped: function(e2) {
      return e2 && (e2.jquery || t.Zepto && t.Zepto.zepto.isZ(e2));
    }, isSVG: function(e2) {
      return t.SVGElement && e2 instanceof t.SVGElement;
    }, isEmptyObject: function(e2) {
      for (var t2 in e2) {
        return false;
      }
      return true;
    } }, y2 = false;
    if (e.fn && e.fn.jquery ? (f = e, y2 = true) : f = t.Velocity.Utilities, 8 >= d && !y2) throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");
    if (7 >= d) return void (jQuery.fn.velocity = jQuery.fn.animate);
    var h = 400, v = "swing", b = { State: { isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), isAndroid: /Android/i.test(navigator.userAgent), isGingerbread: /Android 2\.3\.[3-7]/i.test(navigator.userAgent), isChrome: t.chrome, isFirefox: /Firefox/i.test(navigator.userAgent), prefixElement: r.createElement("div"), prefixMatches: {}, scrollAnchor: null, scrollPropertyLeft: null, scrollPropertyTop: null, isTicking: false, calls: [] }, CSS: {}, Utilities: f, Redirects: {}, Easings: {}, Promise: t.Promise, defaults: { queue: "", duration: h, easing: v, begin: a, complete: a, progress: a, display: a, visibility: a, loop: false, delay: false, mobileHA: true, _cacheValues: true }, init: function(e2) {
      f.data(e2, "velocity", { isSVG: m.isSVG(e2), isAnimating: false, computedStyle: null, tweensContainer: null, rootPropertyValueCache: {}, transformCache: {} });
    }, hook: null, mock: false, version: { major: 1, minor: 2, patch: 2 }, debug: false };
    t.pageYOffset !== a ? (b.State.scrollAnchor = t, b.State.scrollPropertyLeft = "pageXOffset", b.State.scrollPropertyTop = "pageYOffset") : (b.State.scrollAnchor = r.documentElement || r.body.parentNode || r.body, b.State.scrollPropertyLeft = "scrollLeft", b.State.scrollPropertyTop = "scrollTop");
    var x = /* @__PURE__ */ function() {
      function e2(e3) {
        return -e3.tension * e3.x - e3.friction * e3.v;
      }
      function t2(t3, r3, a2) {
        var n2 = { x: t3.x + a2.dx * r3, v: t3.v + a2.dv * r3, tension: t3.tension, friction: t3.friction };
        return { dx: n2.v, dv: e2(n2) };
      }
      function r2(r3, a2) {
        var n2 = { dx: r3.v, dv: e2(r3) }, o2 = t2(r3, 0.5 * a2, n2), i2 = t2(r3, 0.5 * a2, o2), s2 = t2(r3, a2, i2), l2 = 1 / 6 * (n2.dx + 2 * (o2.dx + i2.dx) + s2.dx), u2 = 1 / 6 * (n2.dv + 2 * (o2.dv + i2.dv) + s2.dv);
        return r3.x = r3.x + l2 * a2, r3.v = r3.v + u2 * a2, r3;
      }
      return function a2(e3, t3, n2) {
        var o2, i2, s2, l2 = { x: -1, v: 0, tension: null, friction: null }, u2 = [0], c2 = 0, p2 = 1e-4, f2 = 0.016;
        for (e3 = parseFloat(e3) || 500, t3 = parseFloat(t3) || 20, n2 = n2 || null, l2.tension = e3, l2.friction = t3, o2 = null !== n2, o2 ? (c2 = a2(e3, t3), i2 = c2 / n2 * f2) : i2 = f2; s2 = r2(s2 || l2, i2), u2.push(1 + s2.x), c2 += 16, Math.abs(s2.x) > p2 && Math.abs(s2.v) > p2; ) {
        }
        return o2 ? function(e4) {
          return u2[e4 * (u2.length - 1) | 0];
        } : c2;
      };
    }();
    b.Easings = { linear: function(e2) {
      return e2;
    }, swing: function(e2) {
      return 0.5 - Math.cos(e2 * Math.PI) / 2;
    }, spring: function(e2) {
      return 1 - Math.cos(4.5 * e2 * Math.PI) * Math.exp(6 * -e2);
    } }, f.each([["ease", [0.25, 0.1, 0.25, 1]], ["ease-in", [0.42, 0, 1, 1]], ["ease-out", [0, 0, 0.58, 1]], ["ease-in-out", [0.42, 0, 0.58, 1]], ["easeInSine", [0.47, 0, 0.745, 0.715]], ["easeOutSine", [0.39, 0.575, 0.565, 1]], ["easeInOutSine", [0.445, 0.05, 0.55, 0.95]], ["easeInQuad", [0.55, 0.085, 0.68, 0.53]], ["easeOutQuad", [0.25, 0.46, 0.45, 0.94]], ["easeInOutQuad", [0.455, 0.03, 0.515, 0.955]], ["easeInCubic", [0.55, 0.055, 0.675, 0.19]], ["easeOutCubic", [0.215, 0.61, 0.355, 1]], ["easeInOutCubic", [0.645, 0.045, 0.355, 1]], ["easeInQuart", [0.895, 0.03, 0.685, 0.22]], ["easeOutQuart", [0.165, 0.84, 0.44, 1]], ["easeInOutQuart", [0.77, 0, 0.175, 1]], ["easeInQuint", [0.755, 0.05, 0.855, 0.06]], ["easeOutQuint", [0.23, 1, 0.32, 1]], ["easeInOutQuint", [0.86, 0, 0.07, 1]], ["easeInExpo", [0.95, 0.05, 0.795, 0.035]], ["easeOutExpo", [0.19, 1, 0.22, 1]], ["easeInOutExpo", [1, 0, 0, 1]], ["easeInCirc", [0.6, 0.04, 0.98, 0.335]], ["easeOutCirc", [0.075, 0.82, 0.165, 1]], ["easeInOutCirc", [0.785, 0.135, 0.15, 0.86]]], function(e2, t2) {
      b.Easings[t2[0]] = l.apply(null, t2[1]);
    });
    var S = b.CSS = { RegEx: { isHex: /^#([A-f\d]{3}){1,2}$/i, valueUnwrap: /^[A-z]+\((.*)\)$/i, wrappedValueAlreadyExtracted: /[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/, valueSplit: /([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi }, Lists: { colors: ["fill", "stroke", "stopColor", "color", "backgroundColor", "borderColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "outlineColor"], transformsBase: ["translateX", "translateY", "scale", "scaleX", "scaleY", "skewX", "skewY", "rotateZ"], transforms3D: ["transformPerspective", "translateZ", "scaleZ", "rotateX", "rotateY"] }, Hooks: { templates: { textShadow: ["Color X Y Blur", "black 0px 0px 0px"], boxShadow: ["Color X Y Blur Spread", "black 0px 0px 0px 0px"], clip: ["Top Right Bottom Left", "0px 0px 0px 0px"], backgroundPosition: ["X Y", "0% 0%"], transformOrigin: ["X Y Z", "50% 50% 0px"], perspectiveOrigin: ["X Y", "50% 50%"] }, registered: {}, register: function() {
      for (var e2 = 0; e2 < S.Lists.colors.length; e2++) {
        var t2 = "color" === S.Lists.colors[e2] ? "0 0 0 1" : "255 255 255 1";
        S.Hooks.templates[S.Lists.colors[e2]] = ["Red Green Blue Alpha", t2];
      }
      var r2, a2, n2;
      if (d) for (r2 in S.Hooks.templates) {
        a2 = S.Hooks.templates[r2], n2 = a2[0].split(" ");
        var o2 = a2[1].match(S.RegEx.valueSplit);
        "Color" === n2[0] && (n2.push(n2.shift()), o2.push(o2.shift()), S.Hooks.templates[r2] = [n2.join(" "), o2.join(" ")]);
      }
      for (r2 in S.Hooks.templates) {
        a2 = S.Hooks.templates[r2], n2 = a2[0].split(" ");
        for (var e2 in n2) {
          var i2 = r2 + n2[e2], s2 = e2;
          S.Hooks.registered[i2] = [r2, s2];
        }
      }
    }, getRoot: function(e2) {
      var t2 = S.Hooks.registered[e2];
      return t2 ? t2[0] : e2;
    }, cleanRootPropertyValue: function(e2, t2) {
      return S.RegEx.valueUnwrap.test(t2) && (t2 = t2.match(S.RegEx.valueUnwrap)[1]), S.Values.isCSSNullValue(t2) && (t2 = S.Hooks.templates[e2][1]), t2;
    }, extractValue: function(e2, t2) {
      var r2 = S.Hooks.registered[e2];
      if (r2) {
        var a2 = r2[0], n2 = r2[1];
        return t2 = S.Hooks.cleanRootPropertyValue(a2, t2), t2.toString().match(S.RegEx.valueSplit)[n2];
      }
      return t2;
    }, injectValue: function(e2, t2, r2) {
      var a2 = S.Hooks.registered[e2];
      if (a2) {
        var n2, o2, i2 = a2[0], s2 = a2[1];
        return r2 = S.Hooks.cleanRootPropertyValue(i2, r2), n2 = r2.toString().match(S.RegEx.valueSplit), n2[s2] = t2, o2 = n2.join(" ");
      }
      return r2;
    } }, Normalizations: { registered: { clip: function(e2, t2, r2) {
      switch (e2) {
        case "name":
          return "clip";
        case "extract":
          var a2;
          return S.RegEx.wrappedValueAlreadyExtracted.test(r2) ? a2 = r2 : (a2 = r2.toString().match(S.RegEx.valueUnwrap), a2 = a2 ? a2[1].replace(/,(\s+)?/g, " ") : r2), a2;
        case "inject":
          return "rect(" + r2 + ")";
      }
    }, blur: function(e2, t2, r2) {
      switch (e2) {
        case "name":
          return b.State.isFirefox ? "filter" : "-webkit-filter";
        case "extract":
          var a2 = parseFloat(r2);
          if (!a2 && 0 !== a2) {
            var n2 = r2.toString().match(/blur\(([0-9]+[A-z]+)\)/i);
            a2 = n2 ? n2[1] : 0;
          }
          return a2;
        case "inject":
          return parseFloat(r2) ? "blur(" + r2 + ")" : "none";
      }
    }, opacity: function(e2, t2, r2) {
      if (8 >= d) switch (e2) {
        case "name":
          return "filter";
        case "extract":
          var a2 = r2.toString().match(/alpha\(opacity=(.*)\)/i);
          return r2 = a2 ? a2[1] / 100 : 1;
        case "inject":
          return t2.style.zoom = 1, parseFloat(r2) >= 1 ? "" : "alpha(opacity=" + parseInt(100 * parseFloat(r2), 10) + ")";
      }
      else switch (e2) {
        case "name":
          return "opacity";
        case "extract":
          return r2;
        case "inject":
          return r2;
      }
    } }, register: function() {
      9 >= d || b.State.isGingerbread || (S.Lists.transformsBase = S.Lists.transformsBase.concat(S.Lists.transforms3D));
      for (var e2 = 0; e2 < S.Lists.transformsBase.length; e2++) {
        !function() {
          var t2 = S.Lists.transformsBase[e2];
          S.Normalizations.registered[t2] = function(e3, r2, n2) {
            switch (e3) {
              case "name":
                return "transform";
              case "extract":
                return i(r2) === a || i(r2).transformCache[t2] === a ? /^scale/i.test(t2) ? 1 : 0 : i(r2).transformCache[t2].replace(/[()]/g, "");
              case "inject":
                var o2 = false;
                switch (t2.substr(0, t2.length - 1)) {
                  case "translate":
                    o2 = !/(%|px|em|rem|vw|vh|\d)$/i.test(n2);
                    break;
                  case "scal":
                  case "scale":
                    b.State.isAndroid && i(r2).transformCache[t2] === a && 1 > n2 && (n2 = 1), o2 = !/(\d)$/i.test(n2);
                    break;
                  case "skew":
                    o2 = !/(deg|\d)$/i.test(n2);
                    break;
                  case "rotate":
                    o2 = !/(deg|\d)$/i.test(n2);
                }
                return o2 || (i(r2).transformCache[t2] = "(" + n2 + ")"), i(r2).transformCache[t2];
            }
          };
        }();
      }
      for (var e2 = 0; e2 < S.Lists.colors.length; e2++) {
        !function() {
          var t2 = S.Lists.colors[e2];
          S.Normalizations.registered[t2] = function(e3, r2, n2) {
            switch (e3) {
              case "name":
                return t2;
              case "extract":
                var o2;
                if (S.RegEx.wrappedValueAlreadyExtracted.test(n2)) o2 = n2;
                else {
                  var i2, s2 = { black: "rgb(0, 0, 0)", blue: "rgb(0, 0, 255)", gray: "rgb(128, 128, 128)", green: "rgb(0, 128, 0)", red: "rgb(255, 0, 0)", white: "rgb(255, 255, 255)" };
                  /^[A-z]+$/i.test(n2) ? i2 = s2[n2] !== a ? s2[n2] : s2.black : S.RegEx.isHex.test(n2) ? i2 = "rgb(" + S.Values.hexToRgb(n2).join(" ") + ")" : /^rgba?\(/i.test(n2) || (i2 = s2.black), o2 = (i2 || n2).toString().match(S.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g, " ");
                }
                return 8 >= d || 3 !== o2.split(" ").length || (o2 += " 1"), o2;
              case "inject":
                return 8 >= d ? 4 === n2.split(" ").length && (n2 = n2.split(/\s+/).slice(0, 3).join(" ")) : 3 === n2.split(" ").length && (n2 += " 1"), (8 >= d ? "rgb" : "rgba") + "(" + n2.replace(/\s+/g, ",").replace(/\.(\d)+(?=,)/g, "") + ")";
            }
          };
        }();
      }
    } }, Names: { camelCase: function(e2) {
      return e2.replace(/-(\w)/g, function(e3, t2) {
        return t2.toUpperCase();
      });
    }, SVGAttribute: function(e2) {
      var t2 = "width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";
      return (d || b.State.isAndroid && !b.State.isChrome) && (t2 += "|transform"), new RegExp("^(" + t2 + ")$", "i").test(e2);
    }, prefixCheck: function(e2) {
      if (b.State.prefixMatches[e2]) return [b.State.prefixMatches[e2], true];
      for (var t2 = ["", "Webkit", "Moz", "ms", "O"], r2 = 0, a2 = t2.length; a2 > r2; r2++) {
        var n2;
        if (n2 = 0 === r2 ? e2 : t2[r2] + e2.replace(/^\w/, function(e3) {
          return e3.toUpperCase();
        }), m.isString(b.State.prefixElement.style[n2])) return b.State.prefixMatches[e2] = n2, [n2, true];
      }
      return [e2, false];
    } }, Values: { hexToRgb: function(e2) {
      var t2, r2 = /^#?([a-f\d])([a-f\d])([a-f\d])$/i, a2 = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
      return e2 = e2.replace(r2, function(e3, t3, r3, a3) {
        return t3 + t3 + r3 + r3 + a3 + a3;
      }), t2 = a2.exec(e2), t2 ? [parseInt(t2[1], 16), parseInt(t2[2], 16), parseInt(t2[3], 16)] : [0, 0, 0];
    }, isCSSNullValue: function(e2) {
      return 0 == e2 || /^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(e2);
    }, getUnitType: function(e2) {
      return /^(rotate|skew)/i.test(e2) ? "deg" : /(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(e2) ? "" : "px";
    }, getDisplayType: function(e2) {
      var t2 = e2 && e2.tagName.toString().toLowerCase();
      return /^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(t2) ? "inline" : /^(li)$/i.test(t2) ? "list-item" : /^(tr)$/i.test(t2) ? "table-row" : /^(table)$/i.test(t2) ? "table" : /^(tbody)$/i.test(t2) ? "table-row-group" : "block";
    }, addClass: function(e2, t2) {
      e2.classList ? e2.classList.add(t2) : e2.className += (e2.className.length ? " " : "") + t2;
    }, removeClass: function(e2, t2) {
      e2.classList ? e2.classList.remove(t2) : e2.className = e2.className.toString().replace(new RegExp("(^|\\s)" + t2.split(" ").join("|") + "(\\s|$)", "gi"), " ");
    } }, getPropertyValue: function(e2, r2, n2, o2) {
      function s2(e3, r3) {
        function n3() {
          u3 && S.setPropertyValue(e3, "display", "none");
        }
        var l3 = 0;
        if (8 >= d) l3 = f.css(e3, r3);
        else {
          var u3 = false;
          if (/^(width|height)$/.test(r3) && 0 === S.getPropertyValue(e3, "display") && (u3 = true, S.setPropertyValue(e3, "display", S.Values.getDisplayType(e3))), !o2) {
            if ("height" === r3 && "border-box" !== S.getPropertyValue(e3, "boxSizing").toString().toLowerCase()) {
              var c3 = e3.offsetHeight - (parseFloat(S.getPropertyValue(e3, "borderTopWidth")) || 0) - (parseFloat(S.getPropertyValue(e3, "borderBottomWidth")) || 0) - (parseFloat(S.getPropertyValue(e3, "paddingTop")) || 0) - (parseFloat(S.getPropertyValue(e3, "paddingBottom")) || 0);
              return n3(), c3;
            }
            if ("width" === r3 && "border-box" !== S.getPropertyValue(e3, "boxSizing").toString().toLowerCase()) {
              var p3 = e3.offsetWidth - (parseFloat(S.getPropertyValue(e3, "borderLeftWidth")) || 0) - (parseFloat(S.getPropertyValue(e3, "borderRightWidth")) || 0) - (parseFloat(S.getPropertyValue(e3, "paddingLeft")) || 0) - (parseFloat(S.getPropertyValue(e3, "paddingRight")) || 0);
              return n3(), p3;
            }
          }
          var g3;
          g3 = i(e3) === a ? t.getComputedStyle(e3, null) : i(e3).computedStyle ? i(e3).computedStyle : i(e3).computedStyle = t.getComputedStyle(e3, null), "borderColor" === r3 && (r3 = "borderTopColor"), l3 = 9 === d && "filter" === r3 ? g3.getPropertyValue(r3) : g3[r3], ("" === l3 || null === l3) && (l3 = e3.style[r3]), n3();
        }
        if ("auto" === l3 && /^(top|right|bottom|left)$/i.test(r3)) {
          var m2 = s2(e3, "position");
          ("fixed" === m2 || "absolute" === m2 && /top|left/i.test(r3)) && (l3 = f(e3).position()[r3] + "px");
        }
        return l3;
      }
      var l2;
      if (S.Hooks.registered[r2]) {
        var u2 = r2, c2 = S.Hooks.getRoot(u2);
        n2 === a && (n2 = S.getPropertyValue(e2, S.Names.prefixCheck(c2)[0])), S.Normalizations.registered[c2] && (n2 = S.Normalizations.registered[c2]("extract", e2, n2)), l2 = S.Hooks.extractValue(u2, n2);
      } else if (S.Normalizations.registered[r2]) {
        var p2, g2;
        p2 = S.Normalizations.registered[r2]("name", e2), "transform" !== p2 && (g2 = s2(e2, S.Names.prefixCheck(p2)[0]), S.Values.isCSSNullValue(g2) && S.Hooks.templates[r2] && (g2 = S.Hooks.templates[r2][1])), l2 = S.Normalizations.registered[r2]("extract", e2, g2);
      }
      if (!/^[\d-]/.test(l2)) if (i(e2) && i(e2).isSVG && S.Names.SVGAttribute(r2)) {
        if (/^(height|width)$/i.test(r2)) try {
          l2 = e2.getBBox()[r2];
        } catch (m2) {
          l2 = 0;
        }
        else l2 = e2.getAttribute(r2);
      } else l2 = s2(e2, S.Names.prefixCheck(r2)[0]);
      return S.Values.isCSSNullValue(l2) && (l2 = 0), b.debug >= 2 && console.log("Get " + r2 + ": " + l2), l2;
    }, setPropertyValue: function(e2, r2, a2, n2, o2) {
      var s2 = r2;
      if ("scroll" === r2) o2.container ? o2.container["scroll" + o2.direction] = a2 : "Left" === o2.direction ? t.scrollTo(a2, o2.alternateValue) : t.scrollTo(o2.alternateValue, a2);
      else if (S.Normalizations.registered[r2] && "transform" === S.Normalizations.registered[r2]("name", e2)) S.Normalizations.registered[r2]("inject", e2, a2), s2 = "transform", a2 = i(e2).transformCache[r2];
      else {
        if (S.Hooks.registered[r2]) {
          var l2 = r2, u2 = S.Hooks.getRoot(r2);
          n2 = n2 || S.getPropertyValue(e2, u2), a2 = S.Hooks.injectValue(l2, a2, n2), r2 = u2;
        }
        if (S.Normalizations.registered[r2] && (a2 = S.Normalizations.registered[r2]("inject", e2, a2), r2 = S.Normalizations.registered[r2]("name", e2)), s2 = S.Names.prefixCheck(r2)[0], 8 >= d) try {
          e2.style[s2] = a2;
        } catch (c2) {
          b.debug && console.log("Browser does not support [" + a2 + "] for [" + s2 + "]");
        }
        else i(e2) && i(e2).isSVG && S.Names.SVGAttribute(r2) ? e2.setAttribute(r2, a2) : e2.style[s2] = a2;
        b.debug >= 2 && console.log("Set " + r2 + " (" + s2 + "): " + a2);
      }
      return [s2, a2];
    }, flushTransformCache: function(e2) {
      function t2(t3) {
        return parseFloat(S.getPropertyValue(e2, t3));
      }
      var r2 = "";
      if ((d || b.State.isAndroid && !b.State.isChrome) && i(e2).isSVG) {
        var a2 = { translate: [t2("translateX"), t2("translateY")], skewX: [t2("skewX")], skewY: [t2("skewY")], scale: 1 !== t2("scale") ? [t2("scale"), t2("scale")] : [t2("scaleX"), t2("scaleY")], rotate: [t2("rotateZ"), 0, 0] };
        f.each(i(e2).transformCache, function(e3) {
          /^translate/i.test(e3) ? e3 = "translate" : /^scale/i.test(e3) ? e3 = "scale" : /^rotate/i.test(e3) && (e3 = "rotate"), a2[e3] && (r2 += e3 + "(" + a2[e3].join(" ") + ") ", delete a2[e3]);
        });
      } else {
        var n2, o2;
        f.each(i(e2).transformCache, function(t3) {
          return n2 = i(e2).transformCache[t3], "transformPerspective" === t3 ? (o2 = n2, true) : (9 === d && "rotateZ" === t3 && (t3 = "rotate"), void (r2 += t3 + n2 + " "));
        }), o2 && (r2 = "perspective" + o2 + " " + r2);
      }
      S.setPropertyValue(e2, "transform", r2);
    } };
    S.Hooks.register(), S.Normalizations.register(), b.hook = function(e2, t2, r2) {
      var n2 = a;
      return e2 = o(e2), f.each(e2, function(e3, o2) {
        if (i(o2) === a && b.init(o2), r2 === a) n2 === a && (n2 = b.CSS.getPropertyValue(o2, t2));
        else {
          var s2 = b.CSS.setPropertyValue(o2, t2, r2);
          "transform" === s2[0] && b.CSS.flushTransformCache(o2), n2 = s2;
        }
      }), n2;
    };
    var P = function() {
      function e2() {
        return s2 ? k.promise || null : l2;
      }
      function n2() {
        function e3(e4) {
          function p2(e5, t2) {
            var r2 = a, n4 = a, i2 = a;
            return m.isArray(e5) ? (r2 = e5[0], !m.isArray(e5[1]) && /^[\d-]/.test(e5[1]) || m.isFunction(e5[1]) || S.RegEx.isHex.test(e5[1]) ? i2 = e5[1] : (m.isString(e5[1]) && !S.RegEx.isHex.test(e5[1]) || m.isArray(e5[1])) && (n4 = t2 ? e5[1] : u(e5[1], s3.duration), e5[2] !== a && (i2 = e5[2]))) : r2 = e5, t2 || (n4 = n4 || s3.easing), m.isFunction(r2) && (r2 = r2.call(o2, V, w2)), m.isFunction(i2) && (i2 = i2.call(o2, V, w2)), [r2 || 0, n4, i2];
          }
          function d3(e5, t2) {
            var r2, a2;
            return a2 = (t2 || "0").toString().toLowerCase().replace(/[%A-z]+$/, function(e6) {
              return r2 = e6, "";
            }), r2 || (r2 = S.Values.getUnitType(e5)), [a2, r2];
          }
          function h2() {
            var e5 = { myParent: o2.parentNode || r.body, position: S.getPropertyValue(o2, "position"), fontSize: S.getPropertyValue(o2, "fontSize") }, a2 = e5.position === L.lastPosition && e5.myParent === L.lastParent, n4 = e5.fontSize === L.lastFontSize;
            L.lastParent = e5.myParent, L.lastPosition = e5.position, L.lastFontSize = e5.fontSize;
            var s4 = 100, l4 = {};
            if (n4 && a2) l4.emToPx = L.lastEmToPx, l4.percentToPxWidth = L.lastPercentToPxWidth, l4.percentToPxHeight = L.lastPercentToPxHeight;
            else {
              var u2 = i(o2).isSVG ? r.createElementNS("http://www.w3.org/2000/svg", "rect") : r.createElement("div");
              b.init(u2), e5.myParent.appendChild(u2), f.each(["overflow", "overflowX", "overflowY"], function(e6, t2) {
                b.CSS.setPropertyValue(u2, t2, "hidden");
              }), b.CSS.setPropertyValue(u2, "position", e5.position), b.CSS.setPropertyValue(u2, "fontSize", e5.fontSize), b.CSS.setPropertyValue(u2, "boxSizing", "content-box"), f.each(["minWidth", "maxWidth", "width", "minHeight", "maxHeight", "height"], function(e6, t2) {
                b.CSS.setPropertyValue(u2, t2, s4 + "%");
              }), b.CSS.setPropertyValue(u2, "paddingLeft", s4 + "em"), l4.percentToPxWidth = L.lastPercentToPxWidth = (parseFloat(S.getPropertyValue(u2, "width", null, true)) || 1) / s4, l4.percentToPxHeight = L.lastPercentToPxHeight = (parseFloat(S.getPropertyValue(u2, "height", null, true)) || 1) / s4, l4.emToPx = L.lastEmToPx = (parseFloat(S.getPropertyValue(u2, "paddingLeft")) || 1) / s4, e5.myParent.removeChild(u2);
            }
            return null === L.remToPx && (L.remToPx = parseFloat(S.getPropertyValue(r.body, "fontSize")) || 16), null === L.vwToPx && (L.vwToPx = parseFloat(t.innerWidth) / 100, L.vhToPx = parseFloat(t.innerHeight) / 100), l4.remToPx = L.remToPx, l4.vwToPx = L.vwToPx, l4.vhToPx = L.vhToPx, b.debug >= 1 && console.log("Unit ratios: " + JSON.stringify(l4), o2), l4;
          }
          if (s3.begin && 0 === V) try {
            s3.begin.call(g2, g2);
          } catch (x3) {
            setTimeout(function() {
              throw x3;
            }, 1);
          }
          if ("scroll" === A) {
            var P2, C2, T2, F2 = /^x$/i.test(s3.axis) ? "Left" : "Top", j2 = parseFloat(s3.offset) || 0;
            s3.container ? m.isWrapped(s3.container) || m.isNode(s3.container) ? (s3.container = s3.container[0] || s3.container, P2 = s3.container["scroll" + F2], T2 = P2 + f(o2).position()[F2.toLowerCase()] + j2) : s3.container = null : (P2 = b.State.scrollAnchor[b.State["scrollProperty" + F2]], C2 = b.State.scrollAnchor[b.State["scrollProperty" + ("Left" === F2 ? "Top" : "Left")]], T2 = f(o2).offset()[F2.toLowerCase()] + j2), l3 = { scroll: { rootPropertyValue: false, startValue: P2, currentValue: P2, endValue: T2, unitType: "", easing: s3.easing, scrollData: { container: s3.container, direction: F2, alternateValue: C2 } }, element: o2 }, b.debug && console.log("tweensContainer (scroll): ", l3.scroll, o2);
          } else if ("reverse" === A) {
            if (!i(o2).tweensContainer) return void f.dequeue(o2, s3.queue);
            "none" === i(o2).opts.display && (i(o2).opts.display = "auto"), "hidden" === i(o2).opts.visibility && (i(o2).opts.visibility = "visible"), i(o2).opts.loop = false, i(o2).opts.begin = null, i(o2).opts.complete = null, v2.easing || delete s3.easing, v2.duration || delete s3.duration, s3 = f.extend({}, i(o2).opts, s3);
            var E2 = f.extend(true, {}, i(o2).tweensContainer);
            for (var H2 in E2) {
              if ("element" !== H2) {
                var N2 = E2[H2].startValue;
                E2[H2].startValue = E2[H2].currentValue = E2[H2].endValue, E2[H2].endValue = N2, m.isEmptyObject(v2) || (E2[H2].easing = s3.easing), b.debug && console.log("reverse tweensContainer (" + H2 + "): " + JSON.stringify(E2[H2]), o2);
              }
            }
            l3 = E2;
          } else if ("start" === A) {
            var E2;
            i(o2).tweensContainer && i(o2).isAnimating === true && (E2 = i(o2).tweensContainer), f.each(y3, function(e5, t2) {
              if (RegExp("^" + S.Lists.colors.join("$|^") + "$").test(e5)) {
                var r2 = p2(t2, true), n4 = r2[0], o3 = r2[1], i2 = r2[2];
                if (S.RegEx.isHex.test(n4)) {
                  for (var s4 = ["Red", "Green", "Blue"], l4 = S.Values.hexToRgb(n4), u2 = i2 ? S.Values.hexToRgb(i2) : a, c2 = 0; c2 < s4.length; c2++) {
                    var f2 = [l4[c2]];
                    o3 && f2.push(o3), u2 !== a && f2.push(u2[c2]), y3[e5 + s4[c2]] = f2;
                  }
                  delete y3[e5];
                }
              }
            });
            for (var z2 in y3) {
              var O2 = p2(y3[z2]), q2 = O2[0], $2 = O2[1], M = O2[2];
              z2 = S.Names.camelCase(z2);
              var I = S.Hooks.getRoot(z2), B = false;
              if (i(o2).isSVG || "tween" === I || S.Names.prefixCheck(I)[1] !== false || S.Normalizations.registered[I] !== a) {
                (s3.display !== a && null !== s3.display && "none" !== s3.display || s3.visibility !== a && "hidden" !== s3.visibility) && /opacity|filter/.test(z2) && !M && 0 !== q2 && (M = 0), s3._cacheValues && E2 && E2[z2] ? (M === a && (M = E2[z2].endValue + E2[z2].unitType), B = i(o2).rootPropertyValueCache[I]) : S.Hooks.registered[z2] ? M === a ? (B = S.getPropertyValue(o2, I), M = S.getPropertyValue(o2, z2, B)) : B = S.Hooks.templates[I][1] : M === a && (M = S.getPropertyValue(o2, z2));
                var W, G, Y, D = false;
                if (W = d3(z2, M), M = W[0], Y = W[1], W = d3(z2, q2), q2 = W[0].replace(/^([+-\/*])=/, function(e5, t2) {
                  return D = t2, "";
                }), G = W[1], M = parseFloat(M) || 0, q2 = parseFloat(q2) || 0, "%" === G && (/^(fontSize|lineHeight)$/.test(z2) ? (q2 /= 100, G = "em") : /^scale/.test(z2) ? (q2 /= 100, G = "") : /(Red|Green|Blue)$/i.test(z2) && (q2 = q2 / 100 * 255, G = "")), /[\/*]/.test(D)) G = Y;
                else if (Y !== G && 0 !== M) if (0 === q2) G = Y;
                else {
                  n3 = n3 || h2();
                  var Q = /margin|padding|left|right|width|text|word|letter/i.test(z2) || /X$/.test(z2) || "x" === z2 ? "x" : "y";
                  switch (Y) {
                    case "%":
                      M *= "x" === Q ? n3.percentToPxWidth : n3.percentToPxHeight;
                      break;
                    case "px":
                      break;
                    default:
                      M *= n3[Y + "ToPx"];
                  }
                  switch (G) {
                    case "%":
                      M *= 1 / ("x" === Q ? n3.percentToPxWidth : n3.percentToPxHeight);
                      break;
                    case "px":
                      break;
                    default:
                      M *= 1 / n3[G + "ToPx"];
                  }
                }
                switch (D) {
                  case "+":
                    q2 = M + q2;
                    break;
                  case "-":
                    q2 = M - q2;
                    break;
                  case "*":
                    q2 = M * q2;
                    break;
                  case "/":
                    q2 = M / q2;
                }
                l3[z2] = { rootPropertyValue: B, startValue: M, currentValue: M, endValue: q2, unitType: G, easing: $2 }, b.debug && console.log("tweensContainer (" + z2 + "): " + JSON.stringify(l3[z2]), o2);
              } else b.debug && console.log("Skipping [" + I + "] due to a lack of browser support.");
            }
            l3.element = o2;
          }
          l3.element && (S.Values.addClass(o2, "velocity-animating"), R.push(l3), "" === s3.queue && (i(o2).tweensContainer = l3, i(o2).opts = s3), i(o2).isAnimating = true, V === w2 - 1 ? (b.State.calls.push([R, g2, s3, null, k.resolver]), b.State.isTicking === false && (b.State.isTicking = true, c())) : V++);
        }
        var n3, o2 = this, s3 = f.extend({}, b.defaults, v2), l3 = {};
        switch (i(o2) === a && b.init(o2), parseFloat(s3.delay) && s3.queue !== false && f.queue(o2, s3.queue, function(e4) {
          b.velocityQueueEntryFlag = true, i(o2).delayTimer = { setTimeout: setTimeout(e4, parseFloat(s3.delay)), next: e4 };
        }), s3.duration.toString().toLowerCase()) {
          case "fast":
            s3.duration = 200;
            break;
          case "normal":
            s3.duration = h;
            break;
          case "slow":
            s3.duration = 600;
            break;
          default:
            s3.duration = parseFloat(s3.duration) || 1;
        }
        b.mock !== false && (b.mock === true ? s3.duration = s3.delay = 1 : (s3.duration *= parseFloat(b.mock) || 1, s3.delay *= parseFloat(b.mock) || 1)), s3.easing = u(s3.easing, s3.duration), s3.begin && !m.isFunction(s3.begin) && (s3.begin = null), s3.progress && !m.isFunction(s3.progress) && (s3.progress = null), s3.complete && !m.isFunction(s3.complete) && (s3.complete = null), s3.display !== a && null !== s3.display && (s3.display = s3.display.toString().toLowerCase(), "auto" === s3.display && (s3.display = b.CSS.Values.getDisplayType(o2))), s3.visibility !== a && null !== s3.visibility && (s3.visibility = s3.visibility.toString().toLowerCase()), s3.mobileHA = s3.mobileHA && b.State.isMobile && !b.State.isGingerbread, s3.queue === false ? s3.delay ? setTimeout(e3, s3.delay) : e3() : f.queue(o2, s3.queue, function(t2, r2) {
          return r2 === true ? (k.promise && k.resolver(g2), true) : (b.velocityQueueEntryFlag = true, void e3(t2));
        }), "" !== s3.queue && "fx" !== s3.queue || "inprogress" === f.queue(o2)[0] || f.dequeue(o2);
      }
      var s2, l2, d2, g2, y3, v2, x2 = arguments[0] && (arguments[0].p || f.isPlainObject(arguments[0].properties) && !arguments[0].properties.names || m.isString(arguments[0].properties));
      if (m.isWrapped(this) ? (s2 = false, d2 = 0, g2 = this, l2 = this) : (s2 = true, d2 = 1, g2 = x2 ? arguments[0].elements || arguments[0].e : arguments[0]), g2 = o(g2)) {
        x2 ? (y3 = arguments[0].properties || arguments[0].p, v2 = arguments[0].options || arguments[0].o) : (y3 = arguments[d2], v2 = arguments[d2 + 1]);
        var w2 = g2.length, V = 0;
        if (!/^(stop|finish)$/i.test(y3) && !f.isPlainObject(v2)) {
          var C = d2 + 1;
          v2 = {};
          for (var T = C; T < arguments.length; T++) {
            m.isArray(arguments[T]) || !/^(fast|normal|slow)$/i.test(arguments[T]) && !/^\d/.test(arguments[T]) ? m.isString(arguments[T]) || m.isArray(arguments[T]) ? v2.easing = arguments[T] : m.isFunction(arguments[T]) && (v2.complete = arguments[T]) : v2.duration = arguments[T];
          }
        }
        var k = { promise: null, resolver: null, rejecter: null };
        s2 && b.Promise && (k.promise = new b.Promise(function(e3, t2) {
          k.resolver = e3, k.rejecter = t2;
        }));
        var A;
        switch (y3) {
          case "scroll":
            A = "scroll";
            break;
          case "reverse":
            A = "reverse";
            break;
          case "finish":
          case "stop":
            f.each(g2, function(e3, t2) {
              i(t2) && i(t2).delayTimer && (clearTimeout(i(t2).delayTimer.setTimeout), i(t2).delayTimer.next && i(t2).delayTimer.next(), delete i(t2).delayTimer);
            });
            var F = [];
            return f.each(b.State.calls, function(e3, t2) {
              t2 && f.each(t2[1], function(r2, n3) {
                var o2 = v2 === a ? "" : v2;
                return o2 === true || t2[2].queue === o2 || v2 === a && t2[2].queue === false ? void f.each(g2, function(r3, a2) {
                  a2 === n3 && ((v2 === true || m.isString(v2)) && (f.each(f.queue(a2, m.isString(v2) ? v2 : ""), function(e4, t3) {
                    m.isFunction(t3) && t3(null, true);
                  }), f.queue(a2, m.isString(v2) ? v2 : "", [])), "stop" === y3 ? (i(a2) && i(a2).tweensContainer && o2 !== false && f.each(i(a2).tweensContainer, function(e4, t3) {
                    t3.endValue = t3.currentValue;
                  }), F.push(e3)) : "finish" === y3 && (t2[2].duration = 1));
                }) : true;
              });
            }), "stop" === y3 && (f.each(F, function(e3, t2) {
              p(t2, true);
            }), k.promise && k.resolver(g2)), e2();
          default:
            if (!f.isPlainObject(y3) || m.isEmptyObject(y3)) {
              if (m.isString(y3) && b.Redirects[y3]) {
                var j = f.extend({}, v2), E = j.duration, H = j.delay || 0;
                return j.backwards === true && (g2 = f.extend(true, [], g2).reverse()), f.each(g2, function(e3, t2) {
                  parseFloat(j.stagger) ? j.delay = H + parseFloat(j.stagger) * e3 : m.isFunction(j.stagger) && (j.delay = H + j.stagger.call(t2, e3, w2)), j.drag && (j.duration = parseFloat(E) || (/^(callout|transition)/.test(y3) ? 1e3 : h), j.duration = Math.max(j.duration * (j.backwards ? 1 - e3 / w2 : (e3 + 1) / w2), 0.75 * j.duration, 200)), b.Redirects[y3].call(t2, t2, j || {}, e3, w2, g2, k.promise ? k : a);
                }), e2();
              }
              var N = "Velocity: First argument (" + y3 + ") was not a property map, a known action, or a registered redirect. Aborting.";
              return k.promise ? k.rejecter(new Error(N)) : console.log(N), e2();
            }
            A = "start";
        }
        var L = { lastParent: null, lastPosition: null, lastFontSize: null, lastPercentToPxWidth: null, lastPercentToPxHeight: null, lastEmToPx: null, remToPx: null, vwToPx: null, vhToPx: null }, R = [];
        f.each(g2, function(e3, t2) {
          m.isNode(t2) && n2.call(t2);
        });
        var z, j = f.extend({}, b.defaults, v2);
        if (j.loop = parseInt(j.loop), z = 2 * j.loop - 1, j.loop) for (var O = 0; z > O; O++) {
          var q = { delay: j.delay, progress: j.progress };
          O === z - 1 && (q.display = j.display, q.visibility = j.visibility, q.complete = j.complete), P(g2, "reverse", q);
        }
        return e2();
      }
    };
    b = f.extend(P, b), b.animate = P;
    var w = t.requestAnimationFrame || g;
    return b.State.isMobile || r.hidden === a || r.addEventListener("visibilitychange", function() {
      r.hidden ? (w = function(e2) {
        return setTimeout(function() {
          e2(true);
        }, 16);
      }, c()) : w = t.requestAnimationFrame || g;
    }), e.Velocity = b, e !== t && (e.fn.velocity = P, e.fn.velocity.defaults = b.defaults), f.each(["Down", "Up"], function(e2, t2) {
      b.Redirects["slide" + t2] = function(e3, r2, n2, o2, i2, s2) {
        var l2 = f.extend({}, r2), u2 = l2.begin, c2 = l2.complete, p2 = { height: "", marginTop: "", marginBottom: "", paddingTop: "", paddingBottom: "" }, d2 = {};
        l2.display === a && (l2.display = "Down" === t2 ? "inline" === b.CSS.Values.getDisplayType(e3) ? "inline-block" : "block" : "none"), l2.begin = function() {
          u2 && u2.call(i2, i2);
          for (var r3 in p2) {
            d2[r3] = e3.style[r3];
            var a2 = b.CSS.getPropertyValue(e3, r3);
            p2[r3] = "Down" === t2 ? [a2, 0] : [0, a2];
          }
          d2.overflow = e3.style.overflow, e3.style.overflow = "hidden";
        }, l2.complete = function() {
          for (var t3 in d2) {
            e3.style[t3] = d2[t3];
          }
          c2 && c2.call(i2, i2), s2 && s2.resolver(i2);
        }, b(e3, p2, l2);
      };
    }), f.each(["In", "Out"], function(e2, t2) {
      b.Redirects["fade" + t2] = function(e3, r2, n2, o2, i2, s2) {
        var l2 = f.extend({}, r2), u2 = { opacity: "In" === t2 ? 1 : 0 }, c2 = l2.complete;
        l2.complete = n2 !== o2 - 1 ? l2.begin = null : function() {
          c2 && c2.call(i2, i2), s2 && s2.resolver(i2);
        }, l2.display === a && (l2.display = "In" === t2 ? "auto" : "none"), b(this, u2, l2);
      };
    }), b;
  }(window.jQuery || window.Zepto || window, window, document);
}));
;
!function(a, b, c, d) {
  "use strict";
  function k(a2, b2, c2) {
    return setTimeout(q(a2, c2), b2);
  }
  function l(a2, b2, c2) {
    return Array.isArray(a2) ? (m(a2, c2[b2], c2), true) : false;
  }
  function m(a2, b2, c2) {
    var e2;
    if (a2) if (a2.forEach) a2.forEach(b2, c2);
    else if (a2.length !== d) for (e2 = 0; e2 < a2.length; ) {
      b2.call(c2, a2[e2], e2, a2), e2++;
    }
    else for (e2 in a2) {
      a2.hasOwnProperty(e2) && b2.call(c2, a2[e2], e2, a2);
    }
  }
  function n(a2, b2, c2) {
    for (var e2 = Object.keys(b2), f2 = 0; f2 < e2.length; ) {
      (!c2 || c2 && a2[e2[f2]] === d) && (a2[e2[f2]] = b2[e2[f2]]), f2++;
    }
    return a2;
  }
  function o(a2, b2) {
    return n(a2, b2, true);
  }
  function p(a2, b2, c2) {
    var e2, d2 = b2.prototype;
    e2 = a2.prototype = Object.create(d2), e2.constructor = a2, e2._super = d2, c2 && n(e2, c2);
  }
  function q(a2, b2) {
    return function() {
      return a2.apply(b2, arguments);
    };
  }
  function r(a2, b2) {
    return typeof a2 == g ? a2.apply(b2 ? b2[0] || d : d, b2) : a2;
  }
  function s(a2, b2) {
    return a2 === d ? b2 : a2;
  }
  function t(a2, b2, c2) {
    m(x(b2), function(b3) {
      a2.addEventListener(b3, c2, false);
    });
  }
  function u(a2, b2, c2) {
    m(x(b2), function(b3) {
      a2.removeEventListener(b3, c2, false);
    });
  }
  function v(a2, b2) {
    for (; a2; ) {
      if (a2 == b2) return true;
      a2 = a2.parentNode;
    }
    return false;
  }
  function w(a2, b2) {
    return a2.indexOf(b2) > -1;
  }
  function x(a2) {
    return a2.trim().split(/\s+/g);
  }
  function y2(a2, b2, c2) {
    if (a2.indexOf && !c2) return a2.indexOf(b2);
    for (var d2 = 0; d2 < a2.length; ) {
      if (c2 && a2[d2][c2] == b2 || !c2 && a2[d2] === b2) return d2;
      d2++;
    }
    return -1;
  }
  function z(a2) {
    return Array.prototype.slice.call(a2, 0);
  }
  function A(a2, b2, c2) {
    for (var d2 = [], e2 = [], f2 = 0; f2 < a2.length; ) {
      var g2 = b2 ? a2[f2][b2] : a2[f2];
      y2(e2, g2) < 0 && d2.push(a2[f2]), e2[f2] = g2, f2++;
    }
    return c2 && (d2 = b2 ? d2.sort(function(a3, c3) {
      return a3[b2] > c3[b2];
    }) : d2.sort()), d2;
  }
  function B(a2, b2) {
    for (var c2, f2, g2 = b2[0].toUpperCase() + b2.slice(1), h2 = 0; h2 < e.length; ) {
      if (c2 = e[h2], f2 = c2 ? c2 + g2 : b2, f2 in a2) return f2;
      h2++;
    }
    return d;
  }
  function D() {
    return C++;
  }
  function E(a2) {
    var b2 = a2.ownerDocument;
    return b2.defaultView || b2.parentWindow;
  }
  function ab(a2, b2) {
    var c2 = this;
    this.manager = a2, this.callback = b2, this.element = a2.element, this.target = a2.options.inputTarget, this.domHandler = function(b3) {
      r(a2.options.enable, [a2]) && c2.handler(b3);
    }, this.init();
  }
  function bb(a2) {
    var b2, c2 = a2.options.inputClass;
    return b2 = c2 ? c2 : H ? wb : I ? Eb : G ? Gb : rb, new b2(a2, cb);
  }
  function cb(a2, b2, c2) {
    var d2 = c2.pointers.length, e2 = c2.changedPointers.length, f2 = b2 & O && 0 === d2 - e2, g2 = b2 & (Q | R) && 0 === d2 - e2;
    c2.isFirst = !!f2, c2.isFinal = !!g2, f2 && (a2.session = {}), c2.eventType = b2, db(a2, c2), a2.emit("hammer.input", c2), a2.recognize(c2), a2.session.prevInput = c2;
  }
  function db(a2, b2) {
    var c2 = a2.session, d2 = b2.pointers, e2 = d2.length;
    c2.firstInput || (c2.firstInput = gb(b2)), e2 > 1 && !c2.firstMultiple ? c2.firstMultiple = gb(b2) : 1 === e2 && (c2.firstMultiple = false);
    var f2 = c2.firstInput, g2 = c2.firstMultiple, h2 = g2 ? g2.center : f2.center, i2 = b2.center = hb(d2);
    b2.timeStamp = j(), b2.deltaTime = b2.timeStamp - f2.timeStamp, b2.angle = lb(h2, i2), b2.distance = kb(h2, i2), eb(c2, b2), b2.offsetDirection = jb(b2.deltaX, b2.deltaY), b2.scale = g2 ? nb(g2.pointers, d2) : 1, b2.rotation = g2 ? mb(g2.pointers, d2) : 0, fb(c2, b2);
    var k2 = a2.element;
    v(b2.srcEvent.target, k2) && (k2 = b2.srcEvent.target), b2.target = k2;
  }
  function eb(a2, b2) {
    var c2 = b2.center, d2 = a2.offsetDelta || {}, e2 = a2.prevDelta || {}, f2 = a2.prevInput || {};
    (b2.eventType === O || f2.eventType === Q) && (e2 = a2.prevDelta = { x: f2.deltaX || 0, y: f2.deltaY || 0 }, d2 = a2.offsetDelta = { x: c2.x, y: c2.y }), b2.deltaX = e2.x + (c2.x - d2.x), b2.deltaY = e2.y + (c2.y - d2.y);
  }
  function fb(a2, b2) {
    var f2, g2, h2, j2, c2 = a2.lastInterval || b2, e2 = b2.timeStamp - c2.timeStamp;
    if (b2.eventType != R && (e2 > N || c2.velocity === d)) {
      var k2 = c2.deltaX - b2.deltaX, l2 = c2.deltaY - b2.deltaY, m2 = ib(e2, k2, l2);
      g2 = m2.x, h2 = m2.y, f2 = i(m2.x) > i(m2.y) ? m2.x : m2.y, j2 = jb(k2, l2), a2.lastInterval = b2;
    } else f2 = c2.velocity, g2 = c2.velocityX, h2 = c2.velocityY, j2 = c2.direction;
    b2.velocity = f2, b2.velocityX = g2, b2.velocityY = h2, b2.direction = j2;
  }
  function gb(a2) {
    for (var b2 = [], c2 = 0; c2 < a2.pointers.length; ) {
      b2[c2] = { clientX: h(a2.pointers[c2].clientX), clientY: h(a2.pointers[c2].clientY) }, c2++;
    }
    return { timeStamp: j(), pointers: b2, center: hb(b2), deltaX: a2.deltaX, deltaY: a2.deltaY };
  }
  function hb(a2) {
    var b2 = a2.length;
    if (1 === b2) return { x: h(a2[0].clientX), y: h(a2[0].clientY) };
    for (var c2 = 0, d2 = 0, e2 = 0; b2 > e2; ) {
      c2 += a2[e2].clientX, d2 += a2[e2].clientY, e2++;
    }
    return { x: h(c2 / b2), y: h(d2 / b2) };
  }
  function ib(a2, b2, c2) {
    return { x: b2 / a2 || 0, y: c2 / a2 || 0 };
  }
  function jb(a2, b2) {
    return a2 === b2 ? S : i(a2) >= i(b2) ? a2 > 0 ? T : U : b2 > 0 ? V : W;
  }
  function kb(a2, b2, c2) {
    c2 || (c2 = $2);
    var d2 = b2[c2[0]] - a2[c2[0]], e2 = b2[c2[1]] - a2[c2[1]];
    return Math.sqrt(d2 * d2 + e2 * e2);
  }
  function lb(a2, b2, c2) {
    c2 || (c2 = $2);
    var d2 = b2[c2[0]] - a2[c2[0]], e2 = b2[c2[1]] - a2[c2[1]];
    return 180 * Math.atan2(e2, d2) / Math.PI;
  }
  function mb(a2, b2) {
    return lb(b2[1], b2[0], _) - lb(a2[1], a2[0], _);
  }
  function nb(a2, b2) {
    return kb(b2[0], b2[1], _) / kb(a2[0], a2[1], _);
  }
  function rb() {
    this.evEl = pb, this.evWin = qb, this.allow = true, this.pressed = false, ab.apply(this, arguments);
  }
  function wb() {
    this.evEl = ub, this.evWin = vb, ab.apply(this, arguments), this.store = this.manager.session.pointerEvents = [];
  }
  function Ab() {
    this.evTarget = yb, this.evWin = zb, this.started = false, ab.apply(this, arguments);
  }
  function Bb(a2, b2) {
    var c2 = z(a2.touches), d2 = z(a2.changedTouches);
    return b2 & (Q | R) && (c2 = A(c2.concat(d2), "identifier", true)), [c2, d2];
  }
  function Eb() {
    this.evTarget = Db, this.targetIds = {}, ab.apply(this, arguments);
  }
  function Fb(a2, b2) {
    var c2 = z(a2.touches), d2 = this.targetIds;
    if (b2 & (O | P) && 1 === c2.length) return d2[c2[0].identifier] = true, [c2, c2];
    var e2, f2, g2 = z(a2.changedTouches), h2 = [], i2 = this.target;
    if (f2 = c2.filter(function(a3) {
      return v(a3.target, i2);
    }), b2 === O) for (e2 = 0; e2 < f2.length; ) {
      d2[f2[e2].identifier] = true, e2++;
    }
    for (e2 = 0; e2 < g2.length; ) {
      d2[g2[e2].identifier] && h2.push(g2[e2]), b2 & (Q | R) && delete d2[g2[e2].identifier], e2++;
    }
    return h2.length ? [A(f2.concat(h2), "identifier", true), h2] : void 0;
  }
  function Gb() {
    ab.apply(this, arguments);
    var a2 = q(this.handler, this);
    this.touch = new Eb(this.manager, a2), this.mouse = new rb(this.manager, a2);
  }
  function Pb(a2, b2) {
    this.manager = a2, this.set(b2);
  }
  function Qb(a2) {
    if (w(a2, Mb)) return Mb;
    var b2 = w(a2, Nb), c2 = w(a2, Ob);
    return b2 && c2 ? Nb + " " + Ob : b2 || c2 ? b2 ? Nb : Ob : w(a2, Lb) ? Lb : Kb;
  }
  function Yb(a2) {
    this.id = D(), this.manager = null, this.options = o(a2 || {}, this.defaults), this.options.enable = s(this.options.enable, true), this.state = Rb, this.simultaneous = {}, this.requireFail = [];
  }
  function Zb(a2) {
    return a2 & Wb ? "cancel" : a2 & Ub ? "end" : a2 & Tb ? "move" : a2 & Sb ? "start" : "";
  }
  function $b(a2) {
    return a2 == W ? "down" : a2 == V ? "up" : a2 == T ? "left" : a2 == U ? "right" : "";
  }
  function _b(a2, b2) {
    var c2 = b2.manager;
    return c2 ? c2.get(a2) : a2;
  }
  function ac() {
    Yb.apply(this, arguments);
  }
  function bc() {
    ac.apply(this, arguments), this.pX = null, this.pY = null;
  }
  function cc() {
    ac.apply(this, arguments);
  }
  function dc() {
    Yb.apply(this, arguments), this._timer = null, this._input = null;
  }
  function ec() {
    ac.apply(this, arguments);
  }
  function fc() {
    ac.apply(this, arguments);
  }
  function gc() {
    Yb.apply(this, arguments), this.pTime = false, this.pCenter = false, this._timer = null, this._input = null, this.count = 0;
  }
  function hc(a2, b2) {
    return b2 = b2 || {}, b2.recognizers = s(b2.recognizers, hc.defaults.preset), new kc(a2, b2);
  }
  function kc(a2, b2) {
    b2 = b2 || {}, this.options = o(b2, hc.defaults), this.options.inputTarget = this.options.inputTarget || a2, this.handlers = {}, this.session = {}, this.recognizers = [], this.element = a2, this.input = bb(this), this.touchAction = new Pb(this, this.options.touchAction), lc(this, true), m(b2.recognizers, function(a3) {
      var b3 = this.add(new a3[0](a3[1]));
      a3[2] && b3.recognizeWith(a3[2]), a3[3] && b3.requireFailure(a3[3]);
    }, this);
  }
  function lc(a2, b2) {
    var c2 = a2.element;
    m(a2.options.cssProps, function(a3, d2) {
      c2.style[B(c2.style, d2)] = b2 ? a3 : "";
    });
  }
  function mc(a2, c2) {
    var d2 = b.createEvent("Event");
    d2.initEvent(a2, true, true), d2.gesture = c2, c2.target.dispatchEvent(d2);
  }
  var e = ["", "webkit", "moz", "MS", "ms", "o"], f = b.createElement("div"), g = "function", h = Math.round, i = Math.abs, j = Date.now, C = 1, F = /mobile|tablet|ip(ad|hone|od)|android/i, G = "ontouchstart" in a, H = B(a, "PointerEvent") !== d, I = G && F.test(navigator.userAgent), J = "touch", K = "pen", L = "mouse", M = "kinect", N = 25, O = 1, P = 2, Q = 4, R = 8, S = 1, T = 2, U = 4, V = 8, W = 16, X = T | U, Y = V | W, Z = X | Y, $2 = ["x", "y"], _ = ["clientX", "clientY"];
  ab.prototype = { handler: function() {
  }, init: function() {
    this.evEl && t(this.element, this.evEl, this.domHandler), this.evTarget && t(this.target, this.evTarget, this.domHandler), this.evWin && t(E(this.element), this.evWin, this.domHandler);
  }, destroy: function() {
    this.evEl && u(this.element, this.evEl, this.domHandler), this.evTarget && u(this.target, this.evTarget, this.domHandler), this.evWin && u(E(this.element), this.evWin, this.domHandler);
  } };
  var ob = { mousedown: O, mousemove: P, mouseup: Q }, pb = "mousedown", qb = "mousemove mouseup";
  p(rb, ab, { handler: function(a2) {
    var b2 = ob[a2.type];
    b2 & O && 0 === a2.button && (this.pressed = true), b2 & P && 1 !== a2.which && (b2 = Q), this.pressed && this.allow && (b2 & Q && (this.pressed = false), this.callback(this.manager, b2, { pointers: [a2], changedPointers: [a2], pointerType: L, srcEvent: a2 }));
  } });
  var sb = { pointerdown: O, pointermove: P, pointerup: Q, pointercancel: R, pointerout: R }, tb = { 2: J, 3: K, 4: L, 5: M }, ub = "pointerdown", vb = "pointermove pointerup pointercancel";
  a.MSPointerEvent && (ub = "MSPointerDown", vb = "MSPointerMove MSPointerUp MSPointerCancel"), p(wb, ab, { handler: function(a2) {
    var b2 = this.store, c2 = false, d2 = a2.type.toLowerCase().replace("ms", ""), e2 = sb[d2], f2 = tb[a2.pointerType] || a2.pointerType, g2 = f2 == J, h2 = y2(b2, a2.pointerId, "pointerId");
    e2 & O && (0 === a2.button || g2) ? 0 > h2 && (b2.push(a2), h2 = b2.length - 1) : e2 & (Q | R) && (c2 = true), 0 > h2 || (b2[h2] = a2, this.callback(this.manager, e2, { pointers: b2, changedPointers: [a2], pointerType: f2, srcEvent: a2 }), c2 && b2.splice(h2, 1));
  } });
  var xb = { touchstart: O, touchmove: P, touchend: Q, touchcancel: R }, yb = "touchstart", zb = "touchstart touchmove touchend touchcancel";
  p(Ab, ab, { handler: function(a2) {
    var b2 = xb[a2.type];
    if (b2 === O && (this.started = true), this.started) {
      var c2 = Bb.call(this, a2, b2);
      b2 & (Q | R) && 0 === c2[0].length - c2[1].length && (this.started = false), this.callback(this.manager, b2, { pointers: c2[0], changedPointers: c2[1], pointerType: J, srcEvent: a2 });
    }
  } });
  var Cb = { touchstart: O, touchmove: P, touchend: Q, touchcancel: R }, Db = "touchstart touchmove touchend touchcancel";
  p(Eb, ab, { handler: function(a2) {
    var b2 = Cb[a2.type], c2 = Fb.call(this, a2, b2);
    c2 && this.callback(this.manager, b2, { pointers: c2[0], changedPointers: c2[1], pointerType: J, srcEvent: a2 });
  } }), p(Gb, ab, { handler: function(a2, b2, c2) {
    var d2 = c2.pointerType == J, e2 = c2.pointerType == L;
    if (d2) this.mouse.allow = false;
    else if (e2 && !this.mouse.allow) return;
    b2 & (Q | R) && (this.mouse.allow = true), this.callback(a2, b2, c2);
  }, destroy: function() {
    this.touch.destroy(), this.mouse.destroy();
  } });
  var Hb = B(f.style, "touchAction"), Ib = Hb !== d, Jb = "compute", Kb = "auto", Lb = "manipulation", Mb = "none", Nb = "pan-x", Ob = "pan-y";
  Pb.prototype = { set: function(a2) {
    a2 == Jb && (a2 = this.compute()), Ib && (this.manager.element.style[Hb] = a2), this.actions = a2.toLowerCase().trim();
  }, update: function() {
    this.set(this.manager.options.touchAction);
  }, compute: function() {
    var a2 = [];
    return m(this.manager.recognizers, function(b2) {
      r(b2.options.enable, [b2]) && (a2 = a2.concat(b2.getTouchAction()));
    }), Qb(a2.join(" "));
  }, preventDefaults: function(a2) {
    if (!Ib) {
      var b2 = a2.srcEvent, c2 = a2.offsetDirection;
      if (this.manager.session.prevented) return b2.preventDefault(), void 0;
      var d2 = this.actions, e2 = w(d2, Mb), f2 = w(d2, Ob), g2 = w(d2, Nb);
      return e2 || f2 && c2 & X || g2 && c2 & Y ? this.preventSrc(b2) : void 0;
    }
  }, preventSrc: function(a2) {
    this.manager.session.prevented = true, a2.preventDefault();
  } };
  var Rb = 1, Sb = 2, Tb = 4, Ub = 8, Vb = Ub, Wb = 16, Xb = 32;
  Yb.prototype = { defaults: {}, set: function(a2) {
    return n(this.options, a2), this.manager && this.manager.touchAction.update(), this;
  }, recognizeWith: function(a2) {
    if (l(a2, "recognizeWith", this)) return this;
    var b2 = this.simultaneous;
    return a2 = _b(a2, this), b2[a2.id] || (b2[a2.id] = a2, a2.recognizeWith(this)), this;
  }, dropRecognizeWith: function(a2) {
    return l(a2, "dropRecognizeWith", this) ? this : (a2 = _b(a2, this), delete this.simultaneous[a2.id], this);
  }, requireFailure: function(a2) {
    if (l(a2, "requireFailure", this)) return this;
    var b2 = this.requireFail;
    return a2 = _b(a2, this), -1 === y2(b2, a2) && (b2.push(a2), a2.requireFailure(this)), this;
  }, dropRequireFailure: function(a2) {
    if (l(a2, "dropRequireFailure", this)) return this;
    a2 = _b(a2, this);
    var b2 = y2(this.requireFail, a2);
    return b2 > -1 && this.requireFail.splice(b2, 1), this;
  }, hasRequireFailures: function() {
    return this.requireFail.length > 0;
  }, canRecognizeWith: function(a2) {
    return !!this.simultaneous[a2.id];
  }, emit: function(a2) {
    function d2(d3) {
      b2.manager.emit(b2.options.event + (d3 ? Zb(c2) : ""), a2);
    }
    var b2 = this, c2 = this.state;
    Ub > c2 && d2(true), d2(), c2 >= Ub && d2(true);
  }, tryEmit: function(a2) {
    return this.canEmit() ? this.emit(a2) : (this.state = Xb, void 0);
  }, canEmit: function() {
    for (var a2 = 0; a2 < this.requireFail.length; ) {
      if (!(this.requireFail[a2].state & (Xb | Rb))) return false;
      a2++;
    }
    return true;
  }, recognize: function(a2) {
    var b2 = n({}, a2);
    return r(this.options.enable, [this, b2]) ? (this.state & (Vb | Wb | Xb) && (this.state = Rb), this.state = this.process(b2), this.state & (Sb | Tb | Ub | Wb) && this.tryEmit(b2), void 0) : (this.reset(), this.state = Xb, void 0);
  }, process: function() {
  }, getTouchAction: function() {
  }, reset: function() {
  } }, p(ac, Yb, { defaults: { pointers: 1 }, attrTest: function(a2) {
    var b2 = this.options.pointers;
    return 0 === b2 || a2.pointers.length === b2;
  }, process: function(a2) {
    var b2 = this.state, c2 = a2.eventType, d2 = b2 & (Sb | Tb), e2 = this.attrTest(a2);
    return d2 && (c2 & R || !e2) ? b2 | Wb : d2 || e2 ? c2 & Q ? b2 | Ub : b2 & Sb ? b2 | Tb : Sb : Xb;
  } }), p(bc, ac, { defaults: { event: "pan", threshold: 10, pointers: 1, direction: Z }, getTouchAction: function() {
    var a2 = this.options.direction, b2 = [];
    return a2 & X && b2.push(Ob), a2 & Y && b2.push(Nb), b2;
  }, directionTest: function(a2) {
    var b2 = this.options, c2 = true, d2 = a2.distance, e2 = a2.direction, f2 = a2.deltaX, g2 = a2.deltaY;
    return e2 & b2.direction || (b2.direction & X ? (e2 = 0 === f2 ? S : 0 > f2 ? T : U, c2 = f2 != this.pX, d2 = Math.abs(a2.deltaX)) : (e2 = 0 === g2 ? S : 0 > g2 ? V : W, c2 = g2 != this.pY, d2 = Math.abs(a2.deltaY))), a2.direction = e2, c2 && d2 > b2.threshold && e2 & b2.direction;
  }, attrTest: function(a2) {
    return ac.prototype.attrTest.call(this, a2) && (this.state & Sb || !(this.state & Sb) && this.directionTest(a2));
  }, emit: function(a2) {
    this.pX = a2.deltaX, this.pY = a2.deltaY;
    var b2 = $b(a2.direction);
    b2 && this.manager.emit(this.options.event + b2, a2), this._super.emit.call(this, a2);
  } }), p(cc, ac, { defaults: { event: "pinch", threshold: 0, pointers: 2 }, getTouchAction: function() {
    return [Mb];
  }, attrTest: function(a2) {
    return this._super.attrTest.call(this, a2) && (Math.abs(a2.scale - 1) > this.options.threshold || this.state & Sb);
  }, emit: function(a2) {
    if (this._super.emit.call(this, a2), 1 !== a2.scale) {
      var b2 = a2.scale < 1 ? "in" : "out";
      this.manager.emit(this.options.event + b2, a2);
    }
  } }), p(dc, Yb, { defaults: { event: "press", pointers: 1, time: 500, threshold: 5 }, getTouchAction: function() {
    return [Kb];
  }, process: function(a2) {
    var b2 = this.options, c2 = a2.pointers.length === b2.pointers, d2 = a2.distance < b2.threshold, e2 = a2.deltaTime > b2.time;
    if (this._input = a2, !d2 || !c2 || a2.eventType & (Q | R) && !e2) this.reset();
    else if (a2.eventType & O) this.reset(), this._timer = k(function() {
      this.state = Vb, this.tryEmit();
    }, b2.time, this);
    else if (a2.eventType & Q) return Vb;
    return Xb;
  }, reset: function() {
    clearTimeout(this._timer);
  }, emit: function(a2) {
    this.state === Vb && (a2 && a2.eventType & Q ? this.manager.emit(this.options.event + "up", a2) : (this._input.timeStamp = j(), this.manager.emit(this.options.event, this._input)));
  } }), p(ec, ac, { defaults: { event: "rotate", threshold: 0, pointers: 2 }, getTouchAction: function() {
    return [Mb];
  }, attrTest: function(a2) {
    return this._super.attrTest.call(this, a2) && (Math.abs(a2.rotation) > this.options.threshold || this.state & Sb);
  } }), p(fc, ac, { defaults: { event: "swipe", threshold: 10, velocity: 0.65, direction: X | Y, pointers: 1 }, getTouchAction: function() {
    return bc.prototype.getTouchAction.call(this);
  }, attrTest: function(a2) {
    var c2, b2 = this.options.direction;
    return b2 & (X | Y) ? c2 = a2.velocity : b2 & X ? c2 = a2.velocityX : b2 & Y && (c2 = a2.velocityY), this._super.attrTest.call(this, a2) && b2 & a2.direction && a2.distance > this.options.threshold && i(c2) > this.options.velocity && a2.eventType & Q;
  }, emit: function(a2) {
    var b2 = $b(a2.direction);
    b2 && this.manager.emit(this.options.event + b2, a2), this.manager.emit(this.options.event, a2);
  } }), p(gc, Yb, { defaults: { event: "tap", pointers: 1, taps: 1, interval: 300, time: 250, threshold: 2, posThreshold: 10 }, getTouchAction: function() {
    return [Lb];
  }, process: function(a2) {
    var b2 = this.options, c2 = a2.pointers.length === b2.pointers, d2 = a2.distance < b2.threshold, e2 = a2.deltaTime < b2.time;
    if (this.reset(), a2.eventType & O && 0 === this.count) return this.failTimeout();
    if (d2 && e2 && c2) {
      if (a2.eventType != Q) return this.failTimeout();
      var f2 = this.pTime ? a2.timeStamp - this.pTime < b2.interval : true, g2 = !this.pCenter || kb(this.pCenter, a2.center) < b2.posThreshold;
      this.pTime = a2.timeStamp, this.pCenter = a2.center, g2 && f2 ? this.count += 1 : this.count = 1, this._input = a2;
      var h2 = this.count % b2.taps;
      if (0 === h2) return this.hasRequireFailures() ? (this._timer = k(function() {
        this.state = Vb, this.tryEmit();
      }, b2.interval, this), Sb) : Vb;
    }
    return Xb;
  }, failTimeout: function() {
    return this._timer = k(function() {
      this.state = Xb;
    }, this.options.interval, this), Xb;
  }, reset: function() {
    clearTimeout(this._timer);
  }, emit: function() {
    this.state == Vb && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input));
  } }), hc.VERSION = "2.0.4", hc.defaults = { domEvents: false, touchAction: Jb, enable: true, inputTarget: null, inputClass: null, preset: [[ec, { enable: false }], [cc, { enable: false }, ["rotate"]], [fc, { direction: X }], [bc, { direction: X }, ["swipe"]], [gc], [gc, { event: "doubletap", taps: 2 }, ["tap"]], [dc]], cssProps: { userSelect: "default", touchSelect: "none", touchCallout: "none", contentZooming: "none", userDrag: "none", tapHighlightColor: "rgba(0,0,0,0)" } };
  var ic = 1, jc = 2;
  kc.prototype = { set: function(a2) {
    return n(this.options, a2), a2.touchAction && this.touchAction.update(), a2.inputTarget && (this.input.destroy(), this.input.target = a2.inputTarget, this.input.init()), this;
  }, stop: function(a2) {
    this.session.stopped = a2 ? jc : ic;
  }, recognize: function(a2) {
    var b2 = this.session;
    if (!b2.stopped) {
      this.touchAction.preventDefaults(a2);
      var c2, d2 = this.recognizers, e2 = b2.curRecognizer;
      (!e2 || e2 && e2.state & Vb) && (e2 = b2.curRecognizer = null);
      for (var f2 = 0; f2 < d2.length; ) {
        c2 = d2[f2], b2.stopped === jc || e2 && c2 != e2 && !c2.canRecognizeWith(e2) ? c2.reset() : c2.recognize(a2), !e2 && c2.state & (Sb | Tb | Ub) && (e2 = b2.curRecognizer = c2), f2++;
      }
    }
  }, get: function(a2) {
    if (a2 instanceof Yb) return a2;
    for (var b2 = this.recognizers, c2 = 0; c2 < b2.length; c2++) {
      if (b2[c2].options.event == a2) return b2[c2];
    }
    return null;
  }, add: function(a2) {
    if (l(a2, "add", this)) return this;
    var b2 = this.get(a2.options.event);
    return b2 && this.remove(b2), this.recognizers.push(a2), a2.manager = this, this.touchAction.update(), a2;
  }, remove: function(a2) {
    if (l(a2, "remove", this)) return this;
    var b2 = this.recognizers;
    return a2 = this.get(a2), b2.splice(y2(b2, a2), 1), this.touchAction.update(), this;
  }, on: function(a2, b2) {
    var c2 = this.handlers;
    return m(x(a2), function(a3) {
      c2[a3] = c2[a3] || [], c2[a3].push(b2);
    }), this;
  }, off: function(a2, b2) {
    var c2 = this.handlers;
    return m(x(a2), function(a3) {
      b2 ? c2[a3].splice(y2(c2[a3], b2), 1) : delete c2[a3];
    }), this;
  }, emit: function(a2, b2) {
    this.options.domEvents && mc(a2, b2);
    var c2 = this.handlers[a2] && this.handlers[a2].slice();
    if (c2 && c2.length) {
      b2.type = a2, b2.preventDefault = function() {
        b2.srcEvent.preventDefault();
      };
      for (var d2 = 0; d2 < c2.length; ) {
        c2[d2](b2), d2++;
      }
    }
  }, destroy: function() {
    this.element && lc(this, false), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null;
  } }, n(hc, { INPUT_START: O, INPUT_MOVE: P, INPUT_END: Q, INPUT_CANCEL: R, STATE_POSSIBLE: Rb, STATE_BEGAN: Sb, STATE_CHANGED: Tb, STATE_ENDED: Ub, STATE_RECOGNIZED: Vb, STATE_CANCELLED: Wb, STATE_FAILED: Xb, DIRECTION_NONE: S, DIRECTION_LEFT: T, DIRECTION_RIGHT: U, DIRECTION_UP: V, DIRECTION_DOWN: W, DIRECTION_HORIZONTAL: X, DIRECTION_VERTICAL: Y, DIRECTION_ALL: Z, Manager: kc, Input: ab, TouchAction: Pb, TouchInput: Eb, MouseInput: rb, PointerEventInput: wb, TouchMouseInput: Gb, SingleTouchInput: Ab, Recognizer: Yb, AttrRecognizer: ac, Tap: gc, Pan: bc, Swipe: fc, Pinch: cc, Rotate: ec, Press: dc, on: t, off: u, each: m, merge: o, extend: n, inherit: p, bindFn: q, prefixed: B }), typeof define == g && define.amd ? define(function() {
    return hc;
  }) : "undefined" != typeof module && module.exports ? module.exports = hc : a[c] = hc;
}(window, document, "Hammer");
;
(function(factory) {
  if (typeof define === "function" && define.amd) {
    define(["jquery", "hammerjs"], factory);
  } else if (typeof exports === "object") {
    factory(require("jquery"), require("hammerjs"));
  } else {
    factory(jQuery, Hammer);
  }
})(function($2, Hammer2) {
  function hammerify(el, options) {
    var $el = $2(el);
    if (!$el.data("hammer")) {
      $el.data("hammer", new Hammer2($el[0], options));
    }
  }
  $2.fn.hammer = function(options) {
    return this.each(function() {
      hammerify(this, options);
    });
  };
  Hammer2.Manager.prototype.emit = /* @__PURE__ */ function(originalEmit) {
    return function(type, data) {
      originalEmit.call(this, type, data);
      $2(this.element).trigger({
        type,
        gesture: data
      });
    };
  }(Hammer2.Manager.prototype.emit);
});
;
(function(window2) {
  if (window2.Package) {
    Materialize = {};
  } else {
    window2.Materialize = {};
  }
})(window);
if (typeof exports !== "undefined" && !exports.nodeType) {
  if (typeof module !== "undefined" && !module.nodeType && module.exports) {
    exports = module.exports = Materialize;
  }
  exports.default = Materialize;
}
(function(window2) {
  var lastTime = 0, vendors = ["webkit", "moz"], requestAnimationFrame2 = window2.requestAnimationFrame, cancelAnimationFrame = window2.cancelAnimationFrame, i = vendors.length;
  while (--i >= 0 && !requestAnimationFrame2) {
    requestAnimationFrame2 = window2[vendors[i] + "RequestAnimationFrame"];
    cancelAnimationFrame = window2[vendors[i] + "CancelRequestAnimationFrame"];
  }
  if (!requestAnimationFrame2 || !cancelAnimationFrame) {
    requestAnimationFrame2 = function(callback) {
      var now = +Date.now(), nextTime = Math.max(lastTime + 16, now);
      return setTimeout(function() {
        callback(lastTime = nextTime);
      }, nextTime - now);
    };
    cancelAnimationFrame = clearTimeout;
  }
  window2.requestAnimationFrame = requestAnimationFrame2;
  window2.cancelAnimationFrame = cancelAnimationFrame;
})(window);
Materialize.objectSelectorString = function(obj) {
  var tagStr = obj.prop("tagName") || "";
  var idStr = obj.attr("id") || "";
  var classStr = obj.attr("class") || "";
  return (tagStr + idStr + classStr).replace(/\s/g, "");
};
Materialize.guid = /* @__PURE__ */ function() {
  function s4() {
    return Math.floor((1 + Math.random()) * 65536).toString(16).substring(1);
  }
  return function() {
    return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
  };
}();
Materialize.escapeHash = function(hash) {
  return hash.replace(/(:|\.|\[|\]|,|=)/g, "\\$1");
};
Materialize.elementOrParentIsFixed = function(element) {
  var $element = $(element);
  var $checkElements = $element.add($element.parents());
  var isFixed = false;
  $checkElements.each(function() {
    if ($(this).css("position") === "fixed") {
      isFixed = true;
      return false;
    }
  });
  return isFixed;
};
/**
 * Get time in ms
 * @license https://raw.github.com/jashkenas/underscore/master/LICENSE
 * @type {function}
 * @return {number}
 */
var getTime = Date.now || function() {
  return (/* @__PURE__ */ new Date()).getTime();
};
/**
 * Returns a function, that, when invoked, will only be triggered at most once
 * during a given window of time. Normally, the throttled function will run
 * as much as it can, without ever going more than once per `wait` duration;
 * but if you'd like to disable the execution on the leading edge, pass
 * `{leading: false}`. To disable execution on the trailing edge, ditto.
 * @license https://raw.github.com/jashkenas/underscore/master/LICENSE
 * @param {function} func
 * @param {number} wait
 * @param {Object=} options
 * @returns {Function}
 */
Materialize.throttle = function(func, wait, options) {
  var context, args, result;
  var timeout = null;
  var previous = 0;
  options || (options = {});
  var later = function() {
    previous = options.leading === false ? 0 : getTime();
    timeout = null;
    result = func.apply(context, args);
    context = args = null;
  };
  return function() {
    var now = getTime();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0) {
      clearTimeout(timeout);
      timeout = null;
      previous = now;
      result = func.apply(context, args);
      context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
};
var Vel;
if (jQuery) {
  Vel = jQuery.Velocity;
} else if ($) {
  Vel = $.Velocity;
} else {
  Vel = Velocity;
}
if (Vel) {
  Materialize.Vel = Vel;
} else {
  Materialize.Vel = Velocity;
}
;
(function($2) {
  $2.fn.collapsible = function(options, methodParam) {
    var defaults = {
      accordion: void 0,
      onOpen: void 0,
      onClose: void 0
    };
    var methodName = options;
    options = $2.extend(defaults, options);
    return this.each(function() {
      var $this = $2(this);
      var $panel_headers = $2(this).find("> li > .collapsible-header");
      var collapsible_type = $this.data("collapsible");
      function accordionOpen(object) {
        $panel_headers = $this.find("> li > .collapsible-header");
        if (object.hasClass("active")) {
          object.parent().addClass("active");
        } else {
          object.parent().removeClass("active");
        }
        if (object.parent().hasClass("active")) {
          object.siblings(".collapsible-body").stop(true, false).slideDown({ duration: 350, easing: "easeOutQuart", queue: false, complete: function() {
            $2(this).css("height", "");
          } });
        } else {
          object.siblings(".collapsible-body").stop(true, false).slideUp({ duration: 350, easing: "easeOutQuart", queue: false, complete: function() {
            $2(this).css("height", "");
          } });
        }
        $panel_headers.not(object).removeClass("active").parent().removeClass("active");
        $panel_headers.not(object).parent().children(".collapsible-body").stop(true, false).each(function() {
          if ($2(this).is(":visible")) {
            $2(this).slideUp({
              duration: 350,
              easing: "easeOutQuart",
              queue: false,
              complete: function() {
                $2(this).css("height", "");
                execCallbacks($2(this).siblings(".collapsible-header"));
              }
            });
          }
        });
      }
      function expandableOpen(object) {
        if (object.hasClass("active")) {
          object.parent().addClass("active");
        } else {
          object.parent().removeClass("active");
        }
        if (object.parent().hasClass("active")) {
          object.siblings(".collapsible-body").stop(true, false).slideDown({ duration: 350, easing: "easeOutQuart", queue: false, complete: function() {
            $2(this).css("height", "");
          } });
        } else {
          object.siblings(".collapsible-body").stop(true, false).slideUp({ duration: 350, easing: "easeOutQuart", queue: false, complete: function() {
            $2(this).css("height", "");
          } });
        }
      }
      function collapsibleOpen(object, noToggle) {
        if (!noToggle) {
          object.toggleClass("active");
        }
        if (options.accordion || collapsible_type === "accordion" || collapsible_type === void 0) {
          accordionOpen(object);
        } else {
          expandableOpen(object);
        }
        execCallbacks(object);
      }
      function execCallbacks(object) {
        if (object.hasClass("active")) {
          if (typeof options.onOpen === "function") {
            options.onOpen.call(this, object.parent());
          }
        } else {
          if (typeof options.onClose === "function") {
            options.onClose.call(this, object.parent());
          }
        }
      }
      function isChildrenOfPanelHeader(object) {
        var panelHeader = getPanelHeader(object);
        return panelHeader.length > 0;
      }
      function getPanelHeader(object) {
        return object.closest("li > .collapsible-header");
      }
      function removeEventHandlers() {
        $this.off("click.collapse", "> li > .collapsible-header");
      }
      if (methodName === "destroy") {
        removeEventHandlers();
        return;
      } else if (methodParam >= 0 && methodParam < $panel_headers.length) {
        var $curr_header = $panel_headers.eq(methodParam);
        if ($curr_header.length && (methodName === "open" || methodName === "close" && $curr_header.hasClass("active"))) {
          collapsibleOpen($curr_header);
        }
        return;
      }
      removeEventHandlers();
      $this.on("click.collapse", "> li > .collapsible-header", function(e) {
        var element = $2(e.target);
        if (isChildrenOfPanelHeader(element)) {
          element = getPanelHeader(element);
        }
        collapsibleOpen(element);
      });
      if (options.accordion || collapsible_type === "accordion" || collapsible_type === void 0) {
        collapsibleOpen($panel_headers.filter(".active").first(), true);
      } else {
        $panel_headers.filter(".active").each(function() {
          collapsibleOpen($2(this), true);
        });
      }
    });
  };
  $2(document).ready(function() {
    $2(".collapsible").collapsible();
  });
})(jQuery);
;
(function($2) {
  $2.fn.scrollTo = function(elem) {
    $2(this).scrollTop($2(this).scrollTop() - $2(this).offset().top + $2(elem).offset().top);
    return this;
  };
  $2.fn.dropdown = function(options) {
    var defaults = {
      inDuration: 300,
      outDuration: 225,
      constrainWidth: true,
      // Constrains width of dropdown to the activator
      hover: false,
      gutter: 0,
      // Spacing from edge
      belowOrigin: false,
      alignment: "left",
      stopPropagation: false
    };
    if (options === "open") {
      this.each(function() {
        $2(this).trigger("open");
      });
      return false;
    }
    if (options === "close") {
      this.each(function() {
        $2(this).trigger("close");
      });
      return false;
    }
    this.each(function() {
      var origin = $2(this);
      var curr_options = $2.extend({}, defaults, options);
      var isFocused = false;
      var activates = $2("#" + origin.attr("data-activates"));
      function updateOptions() {
        if (origin.data("induration") !== void 0) curr_options.inDuration = origin.data("induration");
        if (origin.data("outduration") !== void 0) curr_options.outDuration = origin.data("outduration");
        if (origin.data("constrainwidth") !== void 0) curr_options.constrainWidth = origin.data("constrainwidth");
        if (origin.data("hover") !== void 0) curr_options.hover = origin.data("hover");
        if (origin.data("gutter") !== void 0) curr_options.gutter = origin.data("gutter");
        if (origin.data("beloworigin") !== void 0) curr_options.belowOrigin = origin.data("beloworigin");
        if (origin.data("alignment") !== void 0) curr_options.alignment = origin.data("alignment");
        if (origin.data("stoppropagation") !== void 0) curr_options.stopPropagation = origin.data("stoppropagation");
      }
      updateOptions();
      origin.after(activates);
      function placeDropdown(eventType) {
        if (eventType === "focus") {
          isFocused = true;
        }
        updateOptions();
        activates.addClass("active");
        origin.addClass("active");
        var originWidth = origin[0].getBoundingClientRect().width;
        if (curr_options.constrainWidth === true) {
          activates.css("width", originWidth);
        } else {
          activates.css("white-space", "nowrap");
        }
        var windowHeight = window.innerHeight;
        var originHeight = origin.innerHeight();
        var offsetLeft = origin.offset().left;
        var offsetTop = origin.offset().top - $2(window).scrollTop();
        var currAlignment = curr_options.alignment;
        var gutterSpacing = 0;
        var leftPosition = 0;
        var verticalOffset = 0;
        if (curr_options.belowOrigin === true) {
          verticalOffset = originHeight;
        }
        var scrollYOffset = 0;
        var scrollXOffset = 0;
        var wrapper = origin.parent();
        if (!wrapper.is("body")) {
          if (wrapper[0].scrollHeight > wrapper[0].clientHeight) {
            scrollYOffset = wrapper[0].scrollTop;
          }
          if (wrapper[0].scrollWidth > wrapper[0].clientWidth) {
            scrollXOffset = wrapper[0].scrollLeft;
          }
        }
        if (offsetLeft + activates.innerWidth() > $2(window).width()) {
          currAlignment = "right";
        } else if (offsetLeft - activates.innerWidth() + origin.innerWidth() < 0) {
          currAlignment = "left";
        }
        if (offsetTop + activates.innerHeight() > windowHeight) {
          if (offsetTop + originHeight - activates.innerHeight() < 0) {
            var adjustedHeight = windowHeight - offsetTop - verticalOffset;
            activates.css("max-height", adjustedHeight);
          } else {
            if (!verticalOffset) {
              verticalOffset += originHeight;
            }
            verticalOffset -= activates.innerHeight();
          }
        }
        if (currAlignment === "left") {
          gutterSpacing = curr_options.gutter;
          leftPosition = origin.position().left + gutterSpacing;
        } else if (currAlignment === "right") {
          activates.stop(true, true).css({
            opacity: 0,
            left: 0
          });
          var offsetRight = origin.position().left + originWidth - activates.width();
          gutterSpacing = -curr_options.gutter;
          leftPosition = offsetRight + gutterSpacing;
        }
        activates.css({
          position: "absolute",
          top: origin.position().top + verticalOffset + scrollYOffset,
          left: leftPosition + scrollXOffset
        });
        activates.slideDown({
          queue: false,
          duration: curr_options.inDuration,
          easing: "easeOutCubic",
          complete: function() {
            $2(this).css("height", "");
          }
        }).animate({ opacity: 1 }, { queue: false, duration: curr_options.inDuration, easing: "easeOutSine" });
        setTimeout(function() {
          $2(document).on("click." + activates.attr("id"), function(e) {
            hideDropdown();
            $2(document).off("click." + activates.attr("id"));
          });
        }, 0);
      }
      function hideDropdown() {
        isFocused = false;
        activates.fadeOut(curr_options.outDuration);
        activates.removeClass("active");
        origin.removeClass("active");
        $2(document).off("click." + activates.attr("id"));
        setTimeout(function() {
          activates.css("max-height", "");
        }, curr_options.outDuration);
      }
      if (curr_options.hover) {
        var open = false;
        origin.off("click." + origin.attr("id"));
        origin.on("mouseenter", function(e) {
          if (open === false) {
            placeDropdown();
            open = true;
          }
        });
        origin.on("mouseleave", function(e) {
          var toEl = e.toElement || e.relatedTarget;
          if (!$2(toEl).closest(".dropdown-content").is(activates)) {
            activates.stop(true, true);
            hideDropdown();
            open = false;
          }
        });
        activates.on("mouseleave", function(e) {
          var toEl = e.toElement || e.relatedTarget;
          if (!$2(toEl).closest(".dropdown-button").is(origin)) {
            activates.stop(true, true);
            hideDropdown();
            open = false;
          }
        });
      } else {
        origin.off("click." + origin.attr("id"));
        origin.on("click." + origin.attr("id"), function(e) {
          if (!isFocused) {
            if (origin[0] == e.currentTarget && !origin.hasClass("active") && $2(e.target).closest(".dropdown-content").length === 0) {
              e.preventDefault();
              if (curr_options.stopPropagation) {
                e.stopPropagation();
              }
              placeDropdown("click");
            } else if (origin.hasClass("active")) {
              hideDropdown();
              $2(document).off("click." + activates.attr("id"));
            }
          }
        });
      }
      origin.on("open", function(e, eventType) {
        placeDropdown(eventType);
      });
      origin.on("close", hideDropdown);
    });
  };
  $2(document).ready(function() {
    $2(".dropdown-button").dropdown();
  });
})(jQuery);
;
(function($2, Vel2) {
  "use strict";
  var _defaults = {
    opacity: 0.5,
    inDuration: 250,
    outDuration: 250,
    ready: void 0,
    complete: void 0,
    dismissible: true,
    startingTop: "4%",
    endingTop: "10%"
  };
  var Modal = function() {
    function Modal2($el, options) {
      _classCallCheck(this, Modal2);
      if (!!$el[0].M_Modal) {
        $el[0].M_Modal.destroy();
      }
      this.$el = $el;
      this.options = $2.extend({}, Modal2.defaults, options);
      this.isOpen = false;
      this.$el[0].M_Modal = this;
      this.id = $el.attr("id");
      this.openingTrigger = void 0;
      this.$overlay = $2('<div class="modal-overlay"></div>');
      Modal2._increment++;
      Modal2._count++;
      this.$overlay[0].style.zIndex = 1e3 + Modal2._increment * 2;
      this.$el[0].style.zIndex = 1e3 + Modal2._increment * 2 + 1;
      this.setupEventHandlers();
    }
    _createClass(Modal2, [{
      key: "getInstance",
      /**
       * Get Instance
       */
      value: function getInstance() {
        return this;
      }
      /**
       * Teardown component
       */
    }, {
      key: "destroy",
      value: function destroy() {
        this.removeEventHandlers();
        this.$el[0].removeAttribute("style");
        if (!!this.$overlay[0].parentNode) {
          this.$overlay[0].parentNode.removeChild(this.$overlay[0]);
        }
        this.$el[0].M_Modal = void 0;
        Modal2._count--;
      }
      /**
       * Setup Event Handlers
       */
    }, {
      key: "setupEventHandlers",
      value: function setupEventHandlers() {
        this.handleOverlayClickBound = this.handleOverlayClick.bind(this);
        this.handleModalCloseClickBound = this.handleModalCloseClick.bind(this);
        if (Modal2._count === 1) {
          document.body.addEventListener("click", this.handleTriggerClick);
        }
        this.$overlay[0].addEventListener("click", this.handleOverlayClickBound);
        this.$el[0].addEventListener("click", this.handleModalCloseClickBound);
      }
      /**
       * Remove Event Handlers
       */
    }, {
      key: "removeEventHandlers",
      value: function removeEventHandlers() {
        if (Modal2._count === 0) {
          document.body.removeEventListener("click", this.handleTriggerClick);
        }
        this.$overlay[0].removeEventListener("click", this.handleOverlayClickBound);
        this.$el[0].removeEventListener("click", this.handleModalCloseClickBound);
      }
      /**
       * Handle Trigger Click
       * @param {Event} e
       */
    }, {
      key: "handleTriggerClick",
      value: function handleTriggerClick(e) {
        var $trigger = $2(e.target).closest(".modal-trigger");
        if (e.target && $trigger.length) {
          var modalId = $trigger[0].getAttribute("href");
          if (modalId) {
            modalId = modalId.slice(1);
          } else {
            modalId = $trigger[0].getAttribute("data-target");
          }
          var modalInstance = document.getElementById(modalId).M_Modal;
          if (modalInstance) {
            modalInstance.open($trigger);
          }
          e.preventDefault();
        }
      }
      /**
       * Handle Overlay Click
       */
    }, {
      key: "handleOverlayClick",
      value: function handleOverlayClick() {
        if (this.options.dismissible) {
          this.close();
        }
      }
      /**
       * Handle Modal Close Click
       * @param {Event} e
       */
    }, {
      key: "handleModalCloseClick",
      value: function handleModalCloseClick(e) {
        var $closeTrigger = $2(e.target).closest(".modal-close");
        if (e.target && $closeTrigger.length) {
          this.close();
        }
      }
      /**
       * Handle Keydown
       * @param {Event} e
       */
    }, {
      key: "handleKeydown",
      value: function handleKeydown(e) {
        if (e.keyCode === 27 && this.options.dismissible) {
          this.close();
        }
      }
      /**
       * Animate in modal
       */
    }, {
      key: "animateIn",
      value: function animateIn() {
        var _this = this;
        $2.extend(this.$el[0].style, {
          display: "block",
          opacity: 0
        });
        $2.extend(this.$overlay[0].style, {
          display: "block",
          opacity: 0
        });
        Vel2(this.$overlay[0], { opacity: this.options.opacity }, { duration: this.options.inDuration, queue: false, ease: "easeOutCubic" });
        var enterVelocityOptions = {
          duration: this.options.inDuration,
          queue: false,
          ease: "easeOutCubic",
          // Handle modal ready callback
          complete: function() {
            if (typeof _this.options.ready === "function") {
              _this.options.ready.call(_this, _this.$el, _this.openingTrigger);
            }
          }
        };
        if (this.$el[0].classList.contains("bottom-sheet")) {
          Vel2(this.$el[0], { bottom: 0, opacity: 1 }, enterVelocityOptions);
        } else {
          Vel2.hook(this.$el[0], "scaleX", 0.7);
          this.$el[0].style.top = this.options.startingTop;
          Vel2(this.$el[0], { top: this.options.endingTop, opacity: 1, scaleX: 1 }, enterVelocityOptions);
        }
      }
      /**
       * Animate out modal
       */
    }, {
      key: "animateOut",
      value: function animateOut() {
        var _this2 = this;
        Vel2(this.$overlay[0], { opacity: 0 }, { duration: this.options.outDuration, queue: false, ease: "easeOutQuart" });
        var exitVelocityOptions = {
          duration: this.options.outDuration,
          queue: false,
          ease: "easeOutCubic",
          // Handle modal ready callback
          complete: function() {
            _this2.$el[0].style.display = "none";
            if (typeof _this2.options.complete === "function") {
              _this2.options.complete.call(_this2, _this2.$el);
            }
            _this2.$overlay[0].parentNode.removeChild(_this2.$overlay[0]);
          }
        };
        if (this.$el[0].classList.contains("bottom-sheet")) {
          Vel2(this.$el[0], { bottom: "-100%", opacity: 0 }, exitVelocityOptions);
        } else {
          Vel2(this.$el[0], { top: this.options.startingTop, opacity: 0, scaleX: 0.7 }, exitVelocityOptions);
        }
      }
      /**
       * Open Modal
       * @param {jQuery} [$trigger]
       */
    }, {
      key: "open",
      value: function open($trigger) {
        if (this.isOpen) {
          return;
        }
        this.isOpen = true;
        var body = document.body;
        body.style.overflow = "hidden";
        this.$el[0].classList.add("open");
        body.appendChild(this.$overlay[0]);
        this.openingTrigger = !!$trigger ? $trigger : void 0;
        if (this.options.dismissible) {
          this.handleKeydownBound = this.handleKeydown.bind(this);
          document.addEventListener("keydown", this.handleKeydownBound);
        }
        this.animateIn();
        return this;
      }
      /**
       * Close Modal
       */
    }, {
      key: "close",
      value: function close() {
        if (!this.isOpen) {
          return;
        }
        this.isOpen = false;
        this.$el[0].classList.remove("open");
        document.body.style.overflow = "";
        if (this.options.dismissible) {
          document.removeEventListener("keydown", this.handleKeydownBound);
        }
        this.animateOut();
        return this;
      }
    }], [{
      key: "init",
      value: function init($els, options) {
        var arr = [];
        $els.each(function() {
          arr.push(new Modal2($2(this), options));
        });
        return arr;
      }
    }, {
      key: "defaults",
      get: function() {
        return _defaults;
      }
    }]);
    return Modal2;
  }();
  Modal._increment = 0;
  Modal._count = 0;
  Materialize.Modal = Modal;
  $2.fn.modal = function(methodOrOptions) {
    if (Modal.prototype[methodOrOptions]) {
      if (methodOrOptions.slice(0, 3) === "get") {
        return this.first()[0].M_Modal[methodOrOptions]();
      } else {
        return this.each(function() {
          this.M_Modal[methodOrOptions]();
        });
      }
    } else if (typeof methodOrOptions === "object" || !methodOrOptions) {
      Modal.init(this, arguments[0]);
      return this;
    } else {
      $2.error("Method " + methodOrOptions + " does not exist on jQuery.modal");
    }
  };
})(jQuery, Materialize.Vel);
;
(function($2) {
  $2.fn.materialbox = function() {
    return this.each(function() {
      if ($2(this).hasClass("initialized")) {
        return;
      }
      $2(this).addClass("initialized");
      var overlayActive = false;
      var doneAnimating = true;
      var inDuration = 275;
      var outDuration = 200;
      var origin = $2(this);
      var placeholder = $2("<div></div>").addClass("material-placeholder");
      var originalWidth = 0;
      var originalHeight = 0;
      var ancestorsChanged;
      var ancestor;
      var originInlineStyles = origin.attr("style");
      origin.wrap(placeholder);
      origin.on("click", function() {
        var placeholder2 = origin.parent(".material-placeholder");
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var originalWidth2 = origin.width();
        var originalHeight2 = origin.height();
        if (doneAnimating === false) {
          returnToOriginal();
          return false;
        } else if (overlayActive && doneAnimating === true) {
          returnToOriginal();
          return false;
        }
        doneAnimating = false;
        origin.addClass("active");
        overlayActive = true;
        placeholder2.css({
          width: placeholder2[0].getBoundingClientRect().width,
          height: placeholder2[0].getBoundingClientRect().height,
          position: "relative",
          top: 0,
          left: 0
        });
        ancestorsChanged = void 0;
        ancestor = placeholder2[0].parentNode;
        var count = 0;
        while (ancestor !== null && !$2(ancestor).is(document)) {
          var curr = $2(ancestor);
          if (curr.css("overflow") !== "visible") {
            curr.css("overflow", "visible");
            if (ancestorsChanged === void 0) {
              ancestorsChanged = curr;
            } else {
              ancestorsChanged = ancestorsChanged.add(curr);
            }
          }
          ancestor = ancestor.parentNode;
        }
        origin.css({
          position: "absolute",
          "z-index": 1e3,
          "will-change": "left, top, width, height"
        }).data("width", originalWidth2).data("height", originalHeight2);
        var overlay = $2('<div id="materialbox-overlay"></div>').css({
          opacity: 0
        }).click(function() {
          if (doneAnimating === true) returnToOriginal();
        });
        origin.before(overlay);
        var overlayOffset = overlay[0].getBoundingClientRect();
        overlay.css({
          width: windowWidth,
          height: windowHeight,
          left: -1 * overlayOffset.left,
          top: -1 * overlayOffset.top
        });
        overlay.velocity({ opacity: 1 }, { duration: inDuration, queue: false, easing: "easeOutQuad" });
        if (origin.data("caption") !== "") {
          var $photo_caption = $2('<div class="materialbox-caption"></div>');
          $photo_caption.text(origin.data("caption"));
          $2("body").append($photo_caption);
          $photo_caption.css({ "display": "inline" });
          $photo_caption.velocity({ opacity: 1 }, { duration: inDuration, queue: false, easing: "easeOutQuad" });
        }
        var ratio = 0;
        var widthPercent = originalWidth2 / windowWidth;
        var heightPercent = originalHeight2 / windowHeight;
        var newWidth = 0;
        var newHeight = 0;
        if (widthPercent > heightPercent) {
          ratio = originalHeight2 / originalWidth2;
          newWidth = windowWidth * 0.9;
          newHeight = windowWidth * 0.9 * ratio;
        } else {
          ratio = originalWidth2 / originalHeight2;
          newWidth = windowHeight * 0.9 * ratio;
          newHeight = windowHeight * 0.9;
        }
        if (origin.hasClass("responsive-img")) {
          origin.velocity({ "max-width": newWidth, "width": originalWidth2 }, {
            duration: 0,
            queue: false,
            complete: function() {
              origin.css({ left: 0, top: 0 }).velocity({
                height: newHeight,
                width: newWidth,
                left: $2(document).scrollLeft() + windowWidth / 2 - origin.parent(".material-placeholder").offset().left - newWidth / 2,
                top: $2(document).scrollTop() + windowHeight / 2 - origin.parent(".material-placeholder").offset().top - newHeight / 2
              }, {
                duration: inDuration,
                queue: false,
                easing: "easeOutQuad",
                complete: function() {
                  doneAnimating = true;
                }
              });
            }
            // End Complete
          });
        } else {
          origin.css("left", 0).css("top", 0).velocity({
            height: newHeight,
            width: newWidth,
            left: $2(document).scrollLeft() + windowWidth / 2 - origin.parent(".material-placeholder").offset().left - newWidth / 2,
            top: $2(document).scrollTop() + windowHeight / 2 - origin.parent(".material-placeholder").offset().top - newHeight / 2
          }, {
            duration: inDuration,
            queue: false,
            easing: "easeOutQuad",
            complete: function() {
              doneAnimating = true;
            }
          });
        }
        $2(window).on("scroll.materialbox", function() {
          if (overlayActive) {
            returnToOriginal();
          }
        });
        $2(window).on("resize.materialbox", function() {
          if (overlayActive) {
            returnToOriginal();
          }
        });
        $2(document).on("keyup.materialbox", function(e) {
          if (e.keyCode === 27 && doneAnimating === true && overlayActive) {
            returnToOriginal();
          }
        });
      });
      function returnToOriginal() {
        doneAnimating = false;
        var placeholder2 = origin.parent(".material-placeholder");
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var originalWidth2 = origin.data("width");
        var originalHeight2 = origin.data("height");
        origin.velocity("stop", true);
        $2("#materialbox-overlay").velocity("stop", true);
        $2(".materialbox-caption").velocity("stop", true);
        $2(window).off("scroll.materialbox");
        $2(document).off("keyup.materialbox");
        $2(window).off("resize.materialbox");
        $2("#materialbox-overlay").velocity({ opacity: 0 }, {
          duration: outDuration,
          // Delay prevents animation overlapping
          queue: false,
          easing: "easeOutQuad",
          complete: function() {
            overlayActive = false;
            $2(this).remove();
          }
        });
        origin.velocity({
          width: originalWidth2,
          height: originalHeight2,
          left: 0,
          top: 0
        }, {
          duration: outDuration,
          queue: false,
          easing: "easeOutQuad",
          complete: function() {
            placeholder2.css({
              height: "",
              width: "",
              position: "",
              top: "",
              left: ""
            });
            origin.removeAttr("style");
            origin.attr("style", originInlineStyles);
            origin.removeClass("active");
            doneAnimating = true;
            if (ancestorsChanged) {
              ancestorsChanged.css("overflow", "");
            }
          }
        });
        $2(".materialbox-caption").velocity({ opacity: 0 }, {
          duration: outDuration,
          // Delay prevents animation overlapping
          queue: false,
          easing: "easeOutQuad",
          complete: function() {
            $2(this).remove();
          }
        });
      }
    });
  };
  $2(document).ready(function() {
    $2(".materialboxed").materialbox();
  });
})(jQuery);
;
(function($2) {
  $2.fn.parallax = function() {
    var window_width = $2(window).width();
    return this.each(function(i) {
      var $this = $2(this);
      $this.addClass("parallax");
      function updateParallax(initial) {
        var container_height;
        if (window_width < 601) {
          container_height = $this.height() > 0 ? $this.height() : $this.children("img").height();
        } else {
          container_height = $this.height() > 0 ? $this.height() : 500;
        }
        var $img = $this.children("img").first();
        var img_height = $img.height();
        var parallax_dist = img_height - container_height;
        var bottom = $this.offset().top + container_height;
        var top = $this.offset().top;
        var scrollTop = $2(window).scrollTop();
        var windowHeight = window.innerHeight;
        var windowBottom = scrollTop + windowHeight;
        var percentScrolled = (windowBottom - top) / (container_height + windowHeight);
        var parallax = Math.round(parallax_dist * percentScrolled);
        if (initial) {
          $img.css("display", "block");
        }
        if (bottom > scrollTop && top < scrollTop + windowHeight) {
          $img.css("transform", "translate3D(-50%," + parallax + "px, 0)");
        }
      }
      $this.children("img").one("load", function() {
        updateParallax(true);
      }).each(function() {
        if (this.complete) $2(this).trigger("load");
      });
      $2(window).scroll(function() {
        window_width = $2(window).width();
        updateParallax(false);
      });
      $2(window).resize(function() {
        window_width = $2(window).width();
        updateParallax(false);
      });
    });
  };
})(jQuery);
;
(function($2) {
  var methods = {
    init: function(options) {
      var defaults = {
        onShow: null,
        swipeable: false,
        responsiveThreshold: Infinity
        // breakpoint for swipeable
      };
      options = $2.extend(defaults, options);
      var namespace = Materialize.objectSelectorString($2(this));
      return this.each(function(i) {
        var uniqueNamespace = namespace + i;
        var $this = $2(this), window_width = $2(window).width();
        var $active, $content, $links = $this.find("li.tab a"), $tabs_width = $this.width(), $tabs_content = $2(), $tabs_wrapper, $tab_width = Math.max($tabs_width, $this[0].scrollWidth) / $links.length, $indicator, index = 0, prev_index = 0, clicked = false, clickedTimeout, transition = 300;
        var calcRightPos = function(el) {
          return Math.ceil($tabs_width - el.position().left - el[0].getBoundingClientRect().width - $this.scrollLeft());
        };
        var calcLeftPos = function(el) {
          return Math.floor(el.position().left + $this.scrollLeft());
        };
        var animateIndicator = function(prev_index2) {
          if (index - prev_index2 >= 0) {
            $indicator.velocity({ "right": calcRightPos($active) }, { duration: transition, queue: false, easing: "easeOutQuad" });
            $indicator.velocity({ "left": calcLeftPos($active) }, { duration: transition, queue: false, easing: "easeOutQuad", delay: 90 });
          } else {
            $indicator.velocity({ "left": calcLeftPos($active) }, { duration: transition, queue: false, easing: "easeOutQuad" });
            $indicator.velocity({ "right": calcRightPos($active) }, { duration: transition, queue: false, easing: "easeOutQuad", delay: 90 });
          }
        };
        if (options.swipeable) {
          if (window_width > options.responsiveThreshold) {
            options.swipeable = false;
          }
        }
        $active = $2($links.filter('[href="' + location.hash + '"]'));
        if ($active.length === 0) {
          $active = $2(this).find("li.tab a.active").first();
        }
        if ($active.length === 0) {
          $active = $2(this).find("li.tab a").first();
        }
        $active.addClass("active");
        index = $links.index($active);
        if (index < 0) {
          index = 0;
        }
        if ($active[0] !== void 0) {
          $content = $2($active[0].hash);
          $content.addClass("active");
        }
        if (!$this.find(".indicator").length) {
          $this.append('<li class="indicator"></li>');
        }
        $indicator = $this.find(".indicator");
        $this.append($indicator);
        if ($this.is(":visible")) {
          setTimeout(function() {
            $indicator.css({ "right": calcRightPos($active) });
            $indicator.css({ "left": calcLeftPos($active) });
          }, 0);
        }
        $2(window).off("resize.tabs-" + uniqueNamespace).on("resize.tabs-" + uniqueNamespace, function() {
          $tabs_width = $this.width();
          $tab_width = Math.max($tabs_width, $this[0].scrollWidth) / $links.length;
          if (index < 0) {
            index = 0;
          }
          if ($tab_width !== 0 && $tabs_width !== 0) {
            $indicator.css({ "right": calcRightPos($active) });
            $indicator.css({ "left": calcLeftPos($active) });
          }
        });
        if (options.swipeable) {
          $links.each(function() {
            var $curr_content = $2(Materialize.escapeHash(this.hash));
            $curr_content.addClass("carousel-item");
            $tabs_content = $tabs_content.add($curr_content);
          });
          $tabs_wrapper = $tabs_content.wrapAll('<div class="tabs-content carousel"></div>');
          $tabs_content.css("display", "");
          $2(".tabs-content.carousel").carousel({
            fullWidth: true,
            noWrap: true,
            onCycleTo: function(item) {
              if (!clicked) {
                var prev_index2 = index;
                index = $tabs_wrapper.index(item);
                $active.removeClass("active");
                $active = $links.eq(index);
                $active.addClass("active");
                animateIndicator(prev_index2);
                if (typeof options.onShow === "function") {
                  options.onShow.call($this[0], $content);
                }
              }
            }
          });
        } else {
          $links.not($active).each(function() {
            $2(Materialize.escapeHash(this.hash)).hide();
          });
        }
        $this.off("click.tabs").on("click.tabs", "a", function(e) {
          if ($2(this).parent().hasClass("disabled")) {
            e.preventDefault();
            return;
          }
          if (!!$2(this).attr("target")) {
            return;
          }
          clicked = true;
          $tabs_width = $this.width();
          $tab_width = Math.max($tabs_width, $this[0].scrollWidth) / $links.length;
          $active.removeClass("active");
          var $oldContent = $content;
          $active = $2(this);
          $content = $2(Materialize.escapeHash(this.hash));
          $links = $this.find("li.tab a");
          var activeRect = $active.position();
          $active.addClass("active");
          prev_index = index;
          index = $links.index($2(this));
          if (index < 0) {
            index = 0;
          }
          if (options.swipeable) {
            if ($tabs_content.length) {
              $tabs_content.carousel("set", index, function() {
                if (typeof options.onShow === "function") {
                  options.onShow.call($this[0], $content);
                }
              });
            }
          } else {
            if ($content !== void 0) {
              $content.show();
              $content.addClass("active");
              if (typeof options.onShow === "function") {
                options.onShow.call(this, $content);
              }
            }
            if ($oldContent !== void 0 && !$oldContent.is($content)) {
              $oldContent.hide();
              $oldContent.removeClass("active");
            }
          }
          clickedTimeout = setTimeout(function() {
            clicked = false;
          }, transition);
          animateIndicator(prev_index);
          e.preventDefault();
        });
      });
    },
    select_tab: function(id2) {
      this.find('a[href="#' + id2 + '"]').trigger("click");
    }
  };
  $2.fn.tabs = function(methodOrOptions) {
    if (methods[methodOrOptions]) {
      return methods[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof methodOrOptions === "object" || !methodOrOptions) {
      return methods.init.apply(this, arguments);
    } else {
      $2.error("Method " + methodOrOptions + " does not exist on jQuery.tabs");
    }
  };
  $2(document).ready(function() {
    $2("ul.tabs").tabs();
  });
})(jQuery);
;
(function($2) {
  $2.fn.tooltip = function(options) {
    var timeout = null, margin = 5;
    var defaults = {
      delay: 350,
      tooltip: "",
      position: "bottom",
      html: false
    };
    if (options === "remove") {
      this.each(function() {
        $2("#" + $2(this).attr("data-tooltip-id")).remove();
        $2(this).removeAttr("data-tooltip-id");
        $2(this).off("mouseenter.tooltip mouseleave.tooltip");
      });
      return false;
    }
    options = $2.extend(defaults, options);
    return this.each(function() {
      var tooltipId = Materialize.guid();
      var origin = $2(this);
      if (origin.attr("data-tooltip-id")) {
        $2("#" + origin.attr("data-tooltip-id")).remove();
      }
      origin.attr("data-tooltip-id", tooltipId);
      var allowHtml, tooltipDelay, tooltipPosition, tooltipText, tooltipEl, backdrop;
      var setAttributes = function() {
        allowHtml = origin.attr("data-html") ? origin.attr("data-html") === "true" : options.html;
        tooltipDelay = origin.attr("data-delay");
        tooltipDelay = tooltipDelay === void 0 || tooltipDelay === "" ? options.delay : tooltipDelay;
        tooltipPosition = origin.attr("data-position");
        tooltipPosition = tooltipPosition === void 0 || tooltipPosition === "" ? options.position : tooltipPosition;
        tooltipText = origin.attr("data-tooltip");
        tooltipText = tooltipText === void 0 || tooltipText === "" ? options.tooltip : tooltipText;
      };
      setAttributes();
      var renderTooltipEl = function() {
        var tooltip = $2('<div class="material-tooltip"></div>');
        if (allowHtml) {
          tooltipText = $2("<span></span>").html(tooltipText);
        } else {
          tooltipText = $2("<span></span>").text(tooltipText);
        }
        tooltip.append(tooltipText).appendTo($2("body")).attr("id", tooltipId);
        backdrop = $2('<div class="backdrop"></div>');
        backdrop.appendTo(tooltip);
        return tooltip;
      };
      tooltipEl = renderTooltipEl();
      origin.off("mouseenter.tooltip mouseleave.tooltip");
      var started = false, timeoutRef;
      origin.on({
        "mouseenter.tooltip": function(e) {
          var showTooltip = function() {
            setAttributes();
            started = true;
            tooltipEl.velocity("stop");
            backdrop.velocity("stop");
            tooltipEl.css({ visibility: "visible", left: "0px", top: "0px" });
            var originWidth = origin.outerWidth();
            var originHeight = origin.outerHeight();
            var tooltipHeight = tooltipEl.outerHeight();
            var tooltipWidth = tooltipEl.outerWidth();
            var tooltipVerticalMovement = "0px";
            var tooltipHorizontalMovement = "0px";
            var backdropOffsetWidth = backdrop[0].offsetWidth;
            var backdropOffsetHeight = backdrop[0].offsetHeight;
            var scaleXFactor = 8;
            var scaleYFactor = 8;
            var scaleFactor = 0;
            var targetTop, targetLeft, newCoordinates;
            if (tooltipPosition === "top") {
              targetTop = origin.offset().top - tooltipHeight - margin;
              targetLeft = origin.offset().left + originWidth / 2 - tooltipWidth / 2;
              newCoordinates = repositionWithinScreen(targetLeft, targetTop, tooltipWidth, tooltipHeight);
              tooltipVerticalMovement = "-10px";
              backdrop.css({
                bottom: 0,
                left: 0,
                borderRadius: "14px 14px 0 0",
                transformOrigin: "50% 100%",
                marginTop: tooltipHeight,
                marginLeft: tooltipWidth / 2 - backdropOffsetWidth / 2
              });
            } else if (tooltipPosition === "left") {
              targetTop = origin.offset().top + originHeight / 2 - tooltipHeight / 2;
              targetLeft = origin.offset().left - tooltipWidth - margin;
              newCoordinates = repositionWithinScreen(targetLeft, targetTop, tooltipWidth, tooltipHeight);
              tooltipHorizontalMovement = "-10px";
              backdrop.css({
                top: "-7px",
                right: 0,
                width: "14px",
                height: "14px",
                borderRadius: "14px 0 0 14px",
                transformOrigin: "95% 50%",
                marginTop: tooltipHeight / 2,
                marginLeft: tooltipWidth
              });
            } else if (tooltipPosition === "right") {
              targetTop = origin.offset().top + originHeight / 2 - tooltipHeight / 2;
              targetLeft = origin.offset().left + originWidth + margin;
              newCoordinates = repositionWithinScreen(targetLeft, targetTop, tooltipWidth, tooltipHeight);
              tooltipHorizontalMovement = "+10px";
              backdrop.css({
                top: "-7px",
                left: 0,
                width: "14px",
                height: "14px",
                borderRadius: "0 14px 14px 0",
                transformOrigin: "5% 50%",
                marginTop: tooltipHeight / 2,
                marginLeft: "0px"
              });
            } else {
              targetTop = origin.offset().top + origin.outerHeight() + margin;
              targetLeft = origin.offset().left + originWidth / 2 - tooltipWidth / 2;
              newCoordinates = repositionWithinScreen(targetLeft, targetTop, tooltipWidth, tooltipHeight);
              tooltipVerticalMovement = "+10px";
              backdrop.css({
                top: 0,
                left: 0,
                marginLeft: tooltipWidth / 2 - backdropOffsetWidth / 2
              });
            }
            tooltipEl.css({
              top: newCoordinates.y,
              left: newCoordinates.x
            });
            scaleXFactor = Math.SQRT2 * tooltipWidth / parseInt(backdropOffsetWidth);
            scaleYFactor = Math.SQRT2 * tooltipHeight / parseInt(backdropOffsetHeight);
            scaleFactor = Math.max(scaleXFactor, scaleYFactor);
            tooltipEl.velocity({ translateY: tooltipVerticalMovement, translateX: tooltipHorizontalMovement }, { duration: 350, queue: false }).velocity({ opacity: 1 }, { duration: 300, delay: 50, queue: false });
            backdrop.css({ visibility: "visible" }).velocity({ opacity: 1 }, { duration: 55, delay: 0, queue: false }).velocity({ scaleX: scaleFactor, scaleY: scaleFactor }, { duration: 300, delay: 0, queue: false, easing: "easeInOutQuad" });
          };
          timeoutRef = setTimeout(showTooltip, tooltipDelay);
        },
        "mouseleave.tooltip": function() {
          started = false;
          clearTimeout(timeoutRef);
          setTimeout(function() {
            if (started !== true) {
              tooltipEl.velocity({
                opacity: 0,
                translateY: 0,
                translateX: 0
              }, { duration: 225, queue: false });
              backdrop.velocity({ opacity: 0, scaleX: 1, scaleY: 1 }, {
                duration: 225,
                queue: false,
                complete: function() {
                  backdrop.css({ visibility: "hidden" });
                  tooltipEl.css({ visibility: "hidden" });
                  started = false;
                }
              });
            }
          }, 225);
        }
      });
    });
  };
  var repositionWithinScreen = function(x, y2, width, height) {
    var newX = x;
    var newY = y2;
    if (newX < 0) {
      newX = 4;
    } else if (newX + width > window.innerWidth) {
      newX -= newX + width - window.innerWidth;
    }
    if (newY < 0) {
      newY = 4;
    } else if (newY + height > window.innerHeight + $2(window).scrollTop) {
      newY -= newY + height - window.innerHeight;
    }
    return { x: newX, y: newY };
  };
  $2(document).ready(function() {
    $2(".tooltipped").tooltip();
  });
})(jQuery);
;
/*!
* Waves v0.6.4
* http://fian.my.id/Waves
*
* Copyright 2014 Alfiana E. Sibuea and other contributors
* Released under the MIT license
* https://github.com/fians/Waves/blob/master/LICENSE
*/
;
(function(window2) {
  "use strict";
  var Waves = Waves || {};
  var $$ = document.querySelectorAll.bind(document);
  function isWindow(obj) {
    return obj !== null && obj === obj.window;
  }
  function getWindow(elem) {
    return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
  }
  function offset(elem) {
    var docElem, win, box = { top: 0, left: 0 }, doc = elem && elem.ownerDocument;
    docElem = doc.documentElement;
    if (typeof elem.getBoundingClientRect !== "undefined") {
      box = elem.getBoundingClientRect();
    }
    win = getWindow(doc);
    return {
      top: box.top + win.pageYOffset - docElem.clientTop,
      left: box.left + win.pageXOffset - docElem.clientLeft
    };
  }
  function convertStyle(obj) {
    var style = "";
    for (var a in obj) {
      if (obj.hasOwnProperty(a)) {
        style += a + ":" + obj[a] + ";";
      }
    }
    return style;
  }
  var Effect = {
    // Effect delay
    duration: 750,
    show: function(e, element) {
      if (e.button === 2) {
        return false;
      }
      var el = element || this;
      var ripple = document.createElement("div");
      ripple.className = "waves-ripple";
      el.appendChild(ripple);
      var pos = offset(el);
      var relativeY = e.pageY - pos.top;
      var relativeX = e.pageX - pos.left;
      var scale = "scale(" + el.clientWidth / 100 * 10 + ")";
      if ("touches" in e) {
        relativeY = e.touches[0].pageY - pos.top;
        relativeX = e.touches[0].pageX - pos.left;
      }
      ripple.setAttribute("data-hold", Date.now());
      ripple.setAttribute("data-scale", scale);
      ripple.setAttribute("data-x", relativeX);
      ripple.setAttribute("data-y", relativeY);
      var rippleStyle = {
        "top": relativeY + "px",
        "left": relativeX + "px"
      };
      ripple.className = ripple.className + " waves-notransition";
      ripple.setAttribute("style", convertStyle(rippleStyle));
      ripple.className = ripple.className.replace("waves-notransition", "");
      rippleStyle["-webkit-transform"] = scale;
      rippleStyle["-moz-transform"] = scale;
      rippleStyle["-ms-transform"] = scale;
      rippleStyle["-o-transform"] = scale;
      rippleStyle.transform = scale;
      rippleStyle.opacity = "1";
      rippleStyle["-webkit-transition-duration"] = Effect.duration + "ms";
      rippleStyle["-moz-transition-duration"] = Effect.duration + "ms";
      rippleStyle["-o-transition-duration"] = Effect.duration + "ms";
      rippleStyle["transition-duration"] = Effect.duration + "ms";
      rippleStyle["-webkit-transition-timing-function"] = "cubic-bezier(0.250, 0.460, 0.450, 0.940)";
      rippleStyle["-moz-transition-timing-function"] = "cubic-bezier(0.250, 0.460, 0.450, 0.940)";
      rippleStyle["-o-transition-timing-function"] = "cubic-bezier(0.250, 0.460, 0.450, 0.940)";
      rippleStyle["transition-timing-function"] = "cubic-bezier(0.250, 0.460, 0.450, 0.940)";
      ripple.setAttribute("style", convertStyle(rippleStyle));
    },
    hide: function(e) {
      TouchHandler.touchup(e);
      var el = this;
      var width = el.clientWidth * 1.4;
      var ripple = null;
      var ripples = el.getElementsByClassName("waves-ripple");
      if (ripples.length > 0) {
        ripple = ripples[ripples.length - 1];
      } else {
        return false;
      }
      var relativeX = ripple.getAttribute("data-x");
      var relativeY = ripple.getAttribute("data-y");
      var scale = ripple.getAttribute("data-scale");
      var diff = Date.now() - Number(ripple.getAttribute("data-hold"));
      var delay = 350 - diff;
      if (delay < 0) {
        delay = 0;
      }
      setTimeout(function() {
        var style = {
          "top": relativeY + "px",
          "left": relativeX + "px",
          "opacity": "0",
          // Duration
          "-webkit-transition-duration": Effect.duration + "ms",
          "-moz-transition-duration": Effect.duration + "ms",
          "-o-transition-duration": Effect.duration + "ms",
          "transition-duration": Effect.duration + "ms",
          "-webkit-transform": scale,
          "-moz-transform": scale,
          "-ms-transform": scale,
          "-o-transform": scale,
          "transform": scale
        };
        ripple.setAttribute("style", convertStyle(style));
        setTimeout(function() {
          try {
            el.removeChild(ripple);
          } catch (e2) {
            return false;
          }
        }, Effect.duration);
      }, delay);
    },
    // Little hack to make <input> can perform waves effect
    wrapInput: function(elements) {
      for (var a = 0; a < elements.length; a++) {
        var el = elements[a];
        if (el.tagName.toLowerCase() === "input") {
          var parent = el.parentNode;
          if (parent.tagName.toLowerCase() === "i" && parent.className.indexOf("waves-effect") !== -1) {
            continue;
          }
          var wrapper = document.createElement("i");
          wrapper.className = el.className + " waves-input-wrapper";
          var elementStyle = el.getAttribute("style");
          if (!elementStyle) {
            elementStyle = "";
          }
          wrapper.setAttribute("style", elementStyle);
          el.className = "waves-button-input";
          el.removeAttribute("style");
          parent.replaceChild(wrapper, el);
          wrapper.appendChild(el);
        }
      }
    }
  };
  var TouchHandler = {
    /* uses an integer rather than bool so there's no issues with
     * needing to clear timeouts if another touch event occurred
     * within the 500ms. Cannot mouseup between touchstart and
     * touchend, nor in the 500ms after touchend. */
    touches: 0,
    allowEvent: function(e) {
      var allow = true;
      if (e.type === "touchstart") {
        TouchHandler.touches += 1;
      } else if (e.type === "touchend" || e.type === "touchcancel") {
        setTimeout(function() {
          if (TouchHandler.touches > 0) {
            TouchHandler.touches -= 1;
          }
        }, 500);
      } else if (e.type === "mousedown" && TouchHandler.touches > 0) {
        allow = false;
      }
      return allow;
    },
    touchup: function(e) {
      TouchHandler.allowEvent(e);
    }
  };
  function getWavesEffectElement(e) {
    if (TouchHandler.allowEvent(e) === false) {
      return null;
    }
    var element = null;
    var target = e.target || e.srcElement;
    while (target.parentNode !== null) {
      if (!(target instanceof SVGElement) && target.className.indexOf("waves-effect") !== -1) {
        element = target;
        break;
      }
      target = target.parentNode;
    }
    return element;
  }
  function showEffect(e) {
    var element = getWavesEffectElement(e);
    if (element !== null) {
      Effect.show(e, element);
      if ("ontouchstart" in window2) {
        element.addEventListener("touchend", Effect.hide, false);
        element.addEventListener("touchcancel", Effect.hide, false);
      }
      element.addEventListener("mouseup", Effect.hide, false);
      element.addEventListener("mouseleave", Effect.hide, false);
      element.addEventListener("dragend", Effect.hide, false);
    }
  }
  Waves.displayEffect = function(options) {
    options = options || {};
    if ("duration" in options) {
      Effect.duration = options.duration;
    }
    Effect.wrapInput($$(".waves-effect"));
    if ("ontouchstart" in window2) {
      document.body.addEventListener("touchstart", showEffect, false);
    }
    document.body.addEventListener("mousedown", showEffect, false);
  };
  Waves.attach = function(element) {
    if (element.tagName.toLowerCase() === "input") {
      Effect.wrapInput([element]);
      element = element.parentNode;
    }
    if ("ontouchstart" in window2) {
      element.addEventListener("touchstart", showEffect, false);
    }
    element.addEventListener("mousedown", showEffect, false);
  };
  window2.Waves = Waves;
  document.addEventListener("DOMContentLoaded", function() {
    Waves.displayEffect();
  }, false);
})(window);
;
(function($2, Vel2) {
  "use strict";
  var _defaults = {
    displayLength: Infinity,
    inDuration: 300,
    outDuration: 375,
    className: void 0,
    completeCallback: void 0,
    activationPercent: 0.8
  };
  var Toast = function() {
    function Toast2(message, displayLength, className, completeCallback) {
      _classCallCheck(this, Toast2);
      if (!message) {
        return;
      }
      this.options = {
        displayLength,
        className,
        completeCallback
      };
      this.options = $2.extend({}, Toast2.defaults, this.options);
      this.message = message;
      this.panning = false;
      this.timeRemaining = this.options.displayLength;
      if (Toast2._toasts.length === 0) {
        Toast2._createContainer();
      }
      Toast2._toasts.push(this);
      var toastElement = this.createToast();
      toastElement.M_Toast = this;
      this.el = toastElement;
      this._animateIn();
      this.setTimer();
    }
    _createClass(Toast2, [{
      key: "createToast",
      /**
       * Create toast and append it to toast container
       */
      value: function createToast() {
        var toast = document.createElement("div");
        toast.classList.add("toast");
        if (this.options.className) {
          var classes = this.options.className.split(" ");
          var i = void 0, count = void 0;
          for (i = 0, count = classes.length; i < count; i++) {
            toast.classList.add(classes[i]);
          }
        }
        if (typeof HTMLElement === "object" ? this.message instanceof HTMLElement : this.message && typeof this.message === "object" && this.message !== null && this.message.nodeType === 1 && typeof this.message.nodeName === "string") {
          toast.appendChild(this.message);
        } else if (this.message instanceof jQuery) {
          $2(toast).append(this.message);
        } else {
          toast.innerHTML = this.message;
        }
        Toast2._container.appendChild(toast);
        return toast;
      }
      /**
       * Animate in toast
       */
    }, {
      key: "_animateIn",
      value: function _animateIn() {
        Vel2(this.el, { top: 0, opacity: 1 }, {
          duration: 300,
          easing: "easeOutCubic",
          queue: false
        });
      }
      /**
       * Create setInterval which automatically removes toast when timeRemaining >= 0
       * has been reached
       */
    }, {
      key: "setTimer",
      value: function setTimer() {
        var _this3 = this;
        if (this.timeRemaining !== Infinity) {
          this.counterInterval = setInterval(function() {
            if (!_this3.panning) {
              _this3.timeRemaining -= 20;
            }
            if (_this3.timeRemaining <= 0) {
              _this3.remove();
            }
          }, 20);
        }
      }
      /**
       * Dismiss toast with animation
       */
    }, {
      key: "remove",
      value: function remove() {
        var _this4 = this;
        window.clearInterval(this.counterInterval);
        var activationDistance = this.el.offsetWidth * this.options.activationPercent;
        if (this.wasSwiped) {
          this.el.style.transition = "transform .05s, opacity .05s";
          this.el.style.transform = "translateX(" + activationDistance + "px)";
          this.el.style.opacity = 0;
        }
        Vel2(this.el, { opacity: 0, marginTop: "-40px" }, {
          duration: this.options.outDuration,
          easing: "easeOutExpo",
          queue: false,
          complete: function() {
            if (typeof _this4.options.completeCallback === "function") {
              _this4.options.completeCallback();
            }
            _this4.el.parentNode.removeChild(_this4.el);
            Toast2._toasts.splice(Toast2._toasts.indexOf(_this4), 1);
            if (Toast2._toasts.length === 0) {
              Toast2._removeContainer();
            }
          }
        });
      }
    }], [{
      key: "_createContainer",
      /**
       * Append toast container and add event handlers
       */
      value: function _createContainer() {
        var container = document.createElement("div");
        container.setAttribute("id", "toast-container");
        container.addEventListener("touchstart", Toast2._onDragStart);
        container.addEventListener("touchmove", Toast2._onDragMove);
        container.addEventListener("touchend", Toast2._onDragEnd);
        container.addEventListener("mousedown", Toast2._onDragStart);
        document.addEventListener("mousemove", Toast2._onDragMove);
        document.addEventListener("mouseup", Toast2._onDragEnd);
        document.body.appendChild(container);
        Toast2._container = container;
      }
      /**
       * Remove toast container and event handlers
       */
    }, {
      key: "_removeContainer",
      value: function _removeContainer() {
        document.removeEventListener("mousemove", Toast2._onDragMove);
        document.removeEventListener("mouseup", Toast2._onDragEnd);
        Toast2._container.parentNode.removeChild(Toast2._container);
        Toast2._container = null;
      }
      /**
       * Begin drag handler
       * @param {Event} e
       */
    }, {
      key: "_onDragStart",
      value: function _onDragStart(e) {
        if (e.target && $2(e.target).closest(".toast").length) {
          var $toast = $2(e.target).closest(".toast");
          var toast = $toast[0].M_Toast;
          toast.panning = true;
          Toast2._draggedToast = toast;
          toast.el.classList.add("panning");
          toast.el.style.transition = "";
          toast.startingXPos = Toast2._xPos(e);
          toast.time = Date.now();
          toast.xPos = Toast2._xPos(e);
        }
      }
      /**
       * Drag move handler
       * @param {Event} e
       */
    }, {
      key: "_onDragMove",
      value: function _onDragMove(e) {
        if (!!Toast2._draggedToast) {
          e.preventDefault();
          var toast = Toast2._draggedToast;
          toast.deltaX = Math.abs(toast.xPos - Toast2._xPos(e));
          toast.xPos = Toast2._xPos(e);
          toast.velocityX = toast.deltaX / (Date.now() - toast.time);
          toast.time = Date.now();
          var totalDeltaX = toast.xPos - toast.startingXPos;
          var activationDistance = toast.el.offsetWidth * toast.options.activationPercent;
          toast.el.style.transform = "translateX(" + totalDeltaX + "px)";
          toast.el.style.opacity = 1 - Math.abs(totalDeltaX / activationDistance);
        }
      }
      /**
       * End drag handler
       * @param {Event} e
       */
    }, {
      key: "_onDragEnd",
      value: function _onDragEnd(e) {
        if (!!Toast2._draggedToast) {
          var toast = Toast2._draggedToast;
          toast.panning = false;
          toast.el.classList.remove("panning");
          var totalDeltaX = toast.xPos - toast.startingXPos;
          var activationDistance = toast.el.offsetWidth * toast.options.activationPercent;
          var shouldBeDismissed = Math.abs(totalDeltaX) > activationDistance || toast.velocityX > 1;
          if (shouldBeDismissed) {
            toast.wasSwiped = true;
            toast.remove();
          } else {
            toast.el.style.transition = "transform .2s, opacity .2s";
            toast.el.style.transform = "";
            toast.el.style.opacity = "";
          }
          Toast2._draggedToast = null;
        }
      }
      /**
       * Get x position of mouse or touch event
       * @param {Event} e
       */
    }, {
      key: "_xPos",
      value: function _xPos(e) {
        if (e.targetTouches && e.targetTouches.length >= 1) {
          return e.targetTouches[0].clientX;
        }
        return e.clientX;
      }
      /**
       * Remove all toasts
       */
    }, {
      key: "removeAll",
      value: function removeAll() {
        for (var toastIndex in Toast2._toasts) {
          Toast2._toasts[toastIndex].remove();
        }
      }
    }, {
      key: "defaults",
      get: function() {
        return _defaults;
      }
    }]);
    return Toast2;
  }();
  Toast._toasts = [];
  Toast._container = null;
  Toast._draggedToast = null;
  Materialize.Toast = Toast;
  Materialize.toast = function(message, displayLength, className, completeCallback) {
    return new Toast(message, displayLength, className, completeCallback);
  };
})(jQuery, Materialize.Vel);
;
(function($2) {
  var methods = {
    init: function(options) {
      var defaults = {
        menuWidth: 300,
        edge: "left",
        closeOnClick: false,
        draggable: true,
        onOpen: null,
        onClose: null
      };
      options = $2.extend(defaults, options);
      $2(this).each(function() {
        var $this = $2(this);
        var menuId = $this.attr("data-activates");
        var menu = $2("#" + menuId);
        if (options.menuWidth != 300) {
          menu.css("width", options.menuWidth);
        }
        var $dragTarget = $2('.drag-target[data-sidenav="' + menuId + '"]');
        if (options.draggable) {
          if ($dragTarget.length) {
            $dragTarget.remove();
          }
          $dragTarget = $2('<div class="drag-target"></div>').attr("data-sidenav", menuId);
          $2("body").append($dragTarget);
        } else {
          $dragTarget = $2();
        }
        if (options.edge == "left") {
          menu.css("transform", "translateX(-100%)");
          $dragTarget.css({ "left": 0 });
        } else {
          menu.addClass("right-aligned").css("transform", "translateX(100%)");
          $dragTarget.css({ "right": 0 });
        }
        if (menu.hasClass("fixed")) {
          if (window.innerWidth > 992) {
            menu.css("transform", "translateX(0)");
          }
        }
        if (menu.hasClass("fixed")) {
          $2(window).resize(function() {
            if (window.innerWidth > 992) {
              if ($2("#sidenav-overlay").length !== 0 && menuOut) {
                removeMenu(true);
              } else {
                menu.css("transform", "translateX(0%)");
              }
            } else if (menuOut === false) {
              if (options.edge === "left") {
                menu.css("transform", "translateX(-100%)");
              } else {
                menu.css("transform", "translateX(100%)");
              }
            }
          });
        }
        if (options.closeOnClick === true) {
          menu.on("click.itemclick", "a:not(.collapsible-header)", function() {
            if (!(window.innerWidth > 992 && menu.hasClass("fixed"))) {
              removeMenu();
            }
          });
        }
        var removeMenu = function(restoreNav) {
          panning = false;
          menuOut = false;
          $2("body").css({
            overflow: "",
            width: ""
          });
          $2("#sidenav-overlay").velocity({ opacity: 0 }, {
            duration: 200,
            queue: false,
            easing: "easeOutQuad",
            complete: function() {
              $2(this).remove();
            }
          });
          if (options.edge === "left") {
            $dragTarget.css({ width: "", right: "", left: "0" });
            menu.velocity({ "translateX": "-100%" }, {
              duration: 200,
              queue: false,
              easing: "easeOutCubic",
              complete: function() {
                if (restoreNav === true) {
                  menu.removeAttr("style");
                  menu.css("width", options.menuWidth);
                }
              }
            });
          } else {
            $dragTarget.css({ width: "", right: "0", left: "" });
            menu.velocity({ "translateX": "100%" }, {
              duration: 200,
              queue: false,
              easing: "easeOutCubic",
              complete: function() {
                if (restoreNav === true) {
                  menu.removeAttr("style");
                  menu.css("width", options.menuWidth);
                }
              }
            });
          }
          if (typeof options.onClose === "function") {
            options.onClose.call(this, menu);
          }
        };
        var panning = false;
        var menuOut = false;
        if (options.draggable) {
          $dragTarget.on("click", function() {
            if (menuOut) {
              removeMenu();
            }
          });
          $dragTarget.hammer({
            prevent_default: false
          }).on("pan", function(e) {
            if (e.gesture.pointerType == "touch") {
              var direction = e.gesture.direction;
              var x = e.gesture.center.x;
              var y2 = e.gesture.center.y;
              var velocityX = e.gesture.velocityX;
              if (x === 0 && y2 === 0) {
                return;
              }
              var $body = $2("body");
              var $overlay = $2("#sidenav-overlay");
              var oldWidth = $body.innerWidth();
              $body.css("overflow", "hidden");
              $body.width(oldWidth);
              if ($overlay.length === 0) {
                $overlay = $2('<div id="sidenav-overlay"></div>');
                $overlay.css("opacity", 0).click(function() {
                  removeMenu();
                });
                if (typeof options.onOpen === "function") {
                  options.onOpen.call(this, menu);
                }
                $2("body").append($overlay);
              }
              if (options.edge === "left") {
                if (x > options.menuWidth) {
                  x = options.menuWidth;
                } else if (x < 0) {
                  x = 0;
                }
              }
              if (options.edge === "left") {
                if (x < options.menuWidth / 2) {
                  menuOut = false;
                } else if (x >= options.menuWidth / 2) {
                  menuOut = true;
                }
                menu.css("transform", "translateX(" + (x - options.menuWidth) + "px)");
              } else {
                if (x < window.innerWidth - options.menuWidth / 2) {
                  menuOut = true;
                } else if (x >= window.innerWidth - options.menuWidth / 2) {
                  menuOut = false;
                }
                var rightPos = x - options.menuWidth / 2;
                if (rightPos < 0) {
                  rightPos = 0;
                }
                menu.css("transform", "translateX(" + rightPos + "px)");
              }
              var overlayPerc;
              if (options.edge === "left") {
                overlayPerc = x / options.menuWidth;
                $overlay.velocity({ opacity: overlayPerc }, { duration: 10, queue: false, easing: "easeOutQuad" });
              } else {
                overlayPerc = Math.abs((x - window.innerWidth) / options.menuWidth);
                $overlay.velocity({ opacity: overlayPerc }, { duration: 10, queue: false, easing: "easeOutQuad" });
              }
            }
          }).on("panend", function(e) {
            if (e.gesture.pointerType == "touch") {
              var $overlay = $2("#sidenav-overlay");
              var velocityX = e.gesture.velocityX;
              var x = e.gesture.center.x;
              var leftPos = x - options.menuWidth;
              var rightPos = x - options.menuWidth / 2;
              if (leftPos > 0) {
                leftPos = 0;
              }
              if (rightPos < 0) {
                rightPos = 0;
              }
              panning = false;
              if (options.edge === "left") {
                if (menuOut && velocityX <= 0.3 || velocityX < -0.5) {
                  if (leftPos !== 0) {
                    menu.velocity({ "translateX": [0, leftPos] }, { duration: 300, queue: false, easing: "easeOutQuad" });
                  }
                  $overlay.velocity({ opacity: 1 }, { duration: 50, queue: false, easing: "easeOutQuad" });
                  $dragTarget.css({ width: "50%", right: 0, left: "" });
                  menuOut = true;
                } else if (!menuOut || velocityX > 0.3) {
                  $2("body").css({
                    overflow: "",
                    width: ""
                  });
                  menu.velocity({ "translateX": [-1 * options.menuWidth - 10, leftPos] }, { duration: 200, queue: false, easing: "easeOutQuad" });
                  $overlay.velocity({ opacity: 0 }, {
                    duration: 200,
                    queue: false,
                    easing: "easeOutQuad",
                    complete: function() {
                      if (typeof options.onClose === "function") {
                        options.onClose.call(this, menu);
                      }
                      $2(this).remove();
                    }
                  });
                  $dragTarget.css({ width: "10px", right: "", left: 0 });
                }
              } else {
                if (menuOut && velocityX >= -0.3 || velocityX > 0.5) {
                  if (rightPos !== 0) {
                    menu.velocity({ "translateX": [0, rightPos] }, { duration: 300, queue: false, easing: "easeOutQuad" });
                  }
                  $overlay.velocity({ opacity: 1 }, { duration: 50, queue: false, easing: "easeOutQuad" });
                  $dragTarget.css({ width: "50%", right: "", left: 0 });
                  menuOut = true;
                } else if (!menuOut || velocityX < -0.3) {
                  $2("body").css({
                    overflow: "",
                    width: ""
                  });
                  menu.velocity({ "translateX": [options.menuWidth + 10, rightPos] }, { duration: 200, queue: false, easing: "easeOutQuad" });
                  $overlay.velocity({ opacity: 0 }, {
                    duration: 200,
                    queue: false,
                    easing: "easeOutQuad",
                    complete: function() {
                      if (typeof options.onClose === "function") {
                        options.onClose.call(this, menu);
                      }
                      $2(this).remove();
                    }
                  });
                  $dragTarget.css({ width: "10px", right: 0, left: "" });
                }
              }
            }
          });
        }
        $this.off("click.sidenav").on("click.sidenav", function() {
          if (menuOut === true) {
            menuOut = false;
            panning = false;
            removeMenu();
          } else {
            var $body = $2("body");
            var $overlay = $2('<div id="sidenav-overlay"></div>');
            var oldWidth = $body.innerWidth();
            $body.css("overflow", "hidden");
            $body.width(oldWidth);
            $2("body").append($dragTarget);
            if (options.edge === "left") {
              $dragTarget.css({ width: "50%", right: 0, left: "" });
              menu.velocity({ "translateX": [0, -1 * options.menuWidth] }, { duration: 300, queue: false, easing: "easeOutQuad" });
            } else {
              $dragTarget.css({ width: "50%", right: "", left: 0 });
              menu.velocity({ "translateX": [0, options.menuWidth] }, { duration: 300, queue: false, easing: "easeOutQuad" });
            }
            $overlay.css("opacity", 0).click(function() {
              menuOut = false;
              panning = false;
              removeMenu();
              $overlay.velocity({ opacity: 0 }, {
                duration: 300,
                queue: false,
                easing: "easeOutQuad",
                complete: function() {
                  $2(this).remove();
                }
              });
            });
            $2("body").append($overlay);
            $overlay.velocity({ opacity: 1 }, {
              duration: 300,
              queue: false,
              easing: "easeOutQuad",
              complete: function() {
                menuOut = true;
                panning = false;
              }
            });
            if (typeof options.onOpen === "function") {
              options.onOpen.call(this, menu);
            }
          }
          return false;
        });
      });
    },
    destroy: function() {
      var $overlay = $2("#sidenav-overlay");
      var $dragTarget = $2('.drag-target[data-sidenav="' + $2(this).attr("data-activates") + '"]');
      $overlay.trigger("click");
      $dragTarget.remove();
      $2(this).off("click");
      $overlay.remove();
    },
    show: function() {
      this.trigger("click");
    },
    hide: function() {
      $2("#sidenav-overlay").trigger("click");
    }
  };
  $2.fn.sideNav = function(methodOrOptions) {
    if (methods[methodOrOptions]) {
      return methods[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof methodOrOptions === "object" || !methodOrOptions) {
      return methods.init.apply(this, arguments);
    } else {
      $2.error("Method " + methodOrOptions + " does not exist on jQuery.sideNav");
    }
  };
})(jQuery);
;
/**
* Extend jquery with a scrollspy plugin.
* This watches the window scroll and fires events when elements are scrolled into viewport.
*
* throttle() and getTime() taken from Underscore.js
* https://github.com/jashkenas/underscore
*
* @author Copyright 2013 John Smart
* @license https://raw.github.com/thesmart/jquery-scrollspy/master/LICENSE
* @see https://github.com/thesmart
* @version 0.1.2
*/
(function($2) {
  var jWindow = $2(window);
  var elements = [];
  var elementsInView = [];
  var isSpying = false;
  var ticks = 0;
  var unique_id = 1;
  var offset = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
    /**
     * Find elements that are within the boundary
     * @param {number} top
     * @param {number} right
     * @param {number} bottom
     * @param {number} left
     * @return {jQuery}		A collection of elements
     */
  };
  function findElements(top, right, bottom, left) {
    var hits = $2();
    $2.each(elements, function(i, element) {
      if (element.height() > 0) {
        var elTop = element.offset().top, elLeft = element.offset().left, elRight = elLeft + element.width(), elBottom = elTop + element.height();
        var isIntersect = !(elLeft > right || elRight < left || elTop > bottom || elBottom < top);
        if (isIntersect) {
          hits.push(element);
        }
      }
    });
    return hits;
  }
  function onScroll(scrollOffset) {
    ++ticks;
    var top = jWindow.scrollTop(), left = jWindow.scrollLeft(), right = left + jWindow.width(), bottom = top + jWindow.height();
    var intersections = findElements(top + offset.top + scrollOffset || 200, right + offset.right, bottom + offset.bottom, left + offset.left);
    $2.each(intersections, function(i, element) {
      var lastTick = element.data("scrollSpy:ticks");
      if (typeof lastTick != "number") {
        element.triggerHandler("scrollSpy:enter");
      }
      element.data("scrollSpy:ticks", ticks);
    });
    $2.each(elementsInView, function(i, element) {
      var lastTick = element.data("scrollSpy:ticks");
      if (typeof lastTick == "number" && lastTick !== ticks) {
        element.triggerHandler("scrollSpy:exit");
        element.data("scrollSpy:ticks", null);
      }
    });
    elementsInView = intersections;
  }
  function onWinSize() {
    jWindow.trigger("scrollSpy:winSize");
  }
  $2.scrollSpy = function(selector, options) {
    var defaults = {
      throttle: 100,
      scrollOffset: 200,
      // offset - 200 allows elements near bottom of page to scroll
      activeClass: "active",
      getActiveElement: function(id2) {
        return 'a[href="#' + id2 + '"]';
      }
    };
    options = $2.extend(defaults, options);
    var visible = [];
    selector = $2(selector);
    selector.each(function(i, element) {
      elements.push($2(element));
      $2(element).data("scrollSpy:id", i);
      $2('a[href="#' + $2(element).attr("id") + '"]').click(function(e) {
        e.preventDefault();
        var offset2 = $2(Materialize.escapeHash(this.hash)).offset().top + 1;
        $2("html, body").animate({ scrollTop: offset2 - options.scrollOffset }, { duration: 400, queue: false, easing: "easeOutCubic" });
      });
    });
    offset.top = options.offsetTop || 0;
    offset.right = options.offsetRight || 0;
    offset.bottom = options.offsetBottom || 0;
    offset.left = options.offsetLeft || 0;
    var throttledScroll = Materialize.throttle(function() {
      onScroll(options.scrollOffset);
    }, options.throttle || 100);
    var readyScroll = function() {
      $2(document).ready(throttledScroll);
    };
    if (!isSpying) {
      jWindow.on("scroll", readyScroll);
      jWindow.on("resize", readyScroll);
      isSpying = true;
    }
    setTimeout(readyScroll, 0);
    selector.on("scrollSpy:enter", function() {
      visible = $2.grep(visible, function(value) {
        return value.height() != 0;
      });
      var $this = $2(this);
      if (visible[0]) {
        $2(options.getActiveElement(visible[0].attr("id"))).removeClass(options.activeClass);
        if ($this.data("scrollSpy:id") < visible[0].data("scrollSpy:id")) {
          visible.unshift($2(this));
        } else {
          visible.push($2(this));
        }
      } else {
        visible.push($2(this));
      }
      $2(options.getActiveElement(visible[0].attr("id"))).addClass(options.activeClass);
    });
    selector.on("scrollSpy:exit", function() {
      visible = $2.grep(visible, function(value) {
        return value.height() != 0;
      });
      if (visible[0]) {
        $2(options.getActiveElement(visible[0].attr("id"))).removeClass(options.activeClass);
        var $this = $2(this);
        visible = $2.grep(visible, function(value) {
          return value.attr("id") != $this.attr("id");
        });
        if (visible[0]) {
          $2(options.getActiveElement(visible[0].attr("id"))).addClass(options.activeClass);
        }
      }
    });
    return selector;
  };
  $2.winSizeSpy = function(options) {
    $2.winSizeSpy = function() {
      return jWindow;
    };
    options = options || {
      throttle: 100
    };
    return jWindow.on("resize", Materialize.throttle(onWinSize, options.throttle || 100));
  };
  $2.fn.scrollSpy = function(options) {
    return $2.scrollSpy($2(this), options);
  };
})(jQuery);
;
(function($2) {
  $2(document).ready(function() {
    Materialize.updateTextFields = function() {
      var input_selector2 = "input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea";
      $2(input_selector2).each(function(index, element) {
        var $this = $2(this);
        if ($2(element).val().length > 0 || $2(element).is(":focus") || element.autofocus || $this.attr("placeholder") !== void 0) {
          $this.siblings("label").addClass("active");
        } else if ($2(element)[0].validity) {
          $this.siblings("label").toggleClass("active", $2(element)[0].validity.badInput === true);
        } else {
          $this.siblings("label").removeClass("active");
        }
      });
    };
    var input_selector = "input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea";
    $2(document).on("change", input_selector, function() {
      if ($2(this).val().length !== 0 || $2(this).attr("placeholder") !== void 0) {
        $2(this).siblings("label").addClass("active");
      }
      validate_field($2(this));
    });
    $2(document).ready(function() {
      Materialize.updateTextFields();
    });
    $2(document).on("reset", function(e) {
      var formReset = $2(e.target);
      if (formReset.is("form")) {
        formReset.find(input_selector).removeClass("valid").removeClass("invalid");
        formReset.find(input_selector).each(function() {
          if ($2(this).attr("value") === "") {
            $2(this).siblings("label").removeClass("active");
          }
        });
        formReset.find("select.initialized").each(function() {
          var reset_text = formReset.find("option[selected]").text();
          formReset.siblings("input.select-dropdown").val(reset_text);
        });
      }
    });
    $2(document).on("focus", input_selector, function() {
      $2(this).siblings("label, .prefix").addClass("active");
    });
    $2(document).on("blur", input_selector, function() {
      var $inputElement = $2(this);
      var selector = ".prefix";
      if ($inputElement.val().length === 0 && $inputElement[0].validity.badInput !== true && $inputElement.attr("placeholder") === void 0) {
        selector += ", label";
      }
      $inputElement.siblings(selector).removeClass("active");
      validate_field($inputElement);
    });
    window.validate_field = function(object) {
      var hasLength = object.attr("data-length") !== void 0;
      var lenAttr = parseInt(object.attr("data-length"));
      var len = object.val().length;
      if (object.val().length === 0 && object[0].validity.badInput === false && !object.is(":required")) {
        if (object.hasClass("validate")) {
          object.removeClass("valid");
          object.removeClass("invalid");
        }
      } else {
        if (object.hasClass("validate")) {
          if (object.is(":valid") && hasLength && len <= lenAttr || object.is(":valid") && !hasLength) {
            object.removeClass("invalid");
            object.addClass("valid");
          } else {
            object.removeClass("valid");
            object.addClass("invalid");
          }
        }
      }
    };
    var radio_checkbox = "input[type=radio], input[type=checkbox]";
    $2(document).on("keyup.radio", radio_checkbox, function(e) {
      if (e.which === 9) {
        $2(this).addClass("tabbed");
        var $this = $2(this);
        $this.one("blur", function(e2) {
          $2(this).removeClass("tabbed");
        });
        return;
      }
    });
    var hiddenDiv = $2(".hiddendiv").first();
    if (!hiddenDiv.length) {
      hiddenDiv = $2('<div class="hiddendiv common"></div>');
      $2("body").append(hiddenDiv);
    }
    var text_area_selector = ".materialize-textarea";
    function textareaAutoResize($textarea) {
      var fontFamily = $textarea.css("font-family");
      var fontSize = $textarea.css("font-size");
      var lineHeight = $textarea.css("line-height");
      var padding = $textarea.css("padding");
      if (fontSize) {
        hiddenDiv.css("font-size", fontSize);
      }
      if (fontFamily) {
        hiddenDiv.css("font-family", fontFamily);
      }
      if (lineHeight) {
        hiddenDiv.css("line-height", lineHeight);
      }
      if (padding) {
        hiddenDiv.css("padding", padding);
      }
      if (!$textarea.data("original-height")) {
        $textarea.data("original-height", $textarea.height());
      }
      if ($textarea.attr("wrap") === "off") {
        hiddenDiv.css("overflow-wrap", "normal").css("white-space", "pre");
      }
      hiddenDiv.text($textarea.val() + "\n");
      var content = hiddenDiv.html().replace(/\n/g, "<br>");
      hiddenDiv.html(content);
      if ($textarea.is(":visible")) {
        hiddenDiv.css("width", $textarea.width());
      } else {
        hiddenDiv.css("width", $2(window).width() / 2);
      }
      if ($textarea.data("original-height") <= hiddenDiv.height()) {
        $textarea.css("height", hiddenDiv.height());
      } else if ($textarea.val().length < $textarea.data("previous-length")) {
        $textarea.css("height", $textarea.data("original-height"));
      }
      $textarea.data("previous-length", $textarea.val().length);
    }
    $2(text_area_selector).each(function() {
      var $textarea = $2(this);
      $textarea.data("original-height", $textarea.height());
      $textarea.data("previous-length", $textarea.val().length);
    });
    $2("body").on("keyup keydown autoresize", text_area_selector, function() {
      textareaAutoResize($2(this));
    });
    $2(document).on("change", '.file-field input[type="file"]', function() {
      var file_field = $2(this).closest(".file-field");
      var path_input = file_field.find("input.file-path");
      var files = $2(this)[0].files;
      var file_names = [];
      for (var i = 0; i < files.length; i++) {
        file_names.push(files[i].name);
      }
      path_input.val(file_names.join(", "));
      path_input.trigger("change");
    });
    var range_type = "input[type=range]";
    var range_mousedown = false;
    var left;
    $2(range_type).each(function() {
      var thumb = $2('<span class="thumb"><span class="value"></span></span>');
      $2(this).after(thumb);
    });
    var showRangeBubble = function(thumb) {
      var paddingLeft = parseInt(thumb.parent().css("padding-left"));
      var marginLeft = -7 + paddingLeft + "px";
      thumb.velocity({ height: "30px", width: "30px", top: "-30px", marginLeft }, { duration: 300, easing: "easeOutExpo" });
    };
    var calcRangeOffset = function(range) {
      var width = range.width() - 15;
      var max = parseFloat(range.attr("max"));
      var min = parseFloat(range.attr("min"));
      var percent = (parseFloat(range.val()) - min) / (max - min);
      return percent * width;
    };
    var range_wrapper = ".range-field";
    $2(document).on("change", range_type, function(e) {
      var thumb = $2(this).siblings(".thumb");
      thumb.find(".value").html($2(this).val());
      if (!thumb.hasClass("active")) {
        showRangeBubble(thumb);
      }
      var offsetLeft = calcRangeOffset($2(this));
      thumb.addClass("active").css("left", offsetLeft);
    });
    $2(document).on("mousedown touchstart", range_type, function(e) {
      var thumb = $2(this).siblings(".thumb");
      if (thumb.length <= 0) {
        thumb = $2('<span class="thumb"><span class="value"></span></span>');
        $2(this).after(thumb);
      }
      thumb.find(".value").html($2(this).val());
      range_mousedown = true;
      $2(this).addClass("active");
      if (!thumb.hasClass("active")) {
        showRangeBubble(thumb);
      }
      if (e.type !== "input") {
        var offsetLeft = calcRangeOffset($2(this));
        thumb.addClass("active").css("left", offsetLeft);
      }
    });
    $2(document).on("mouseup touchend", range_wrapper, function() {
      range_mousedown = false;
      $2(this).removeClass("active");
    });
    $2(document).on("input mousemove touchmove", range_wrapper, function(e) {
      var thumb = $2(this).children(".thumb");
      var left2;
      var input = $2(this).find(range_type);
      if (range_mousedown) {
        if (!thumb.hasClass("active")) {
          showRangeBubble(thumb);
        }
        var offsetLeft = calcRangeOffset(input);
        thumb.addClass("active").css("left", offsetLeft);
        thumb.find(".value").html(thumb.siblings(range_type).val());
      }
    });
    $2(document).on("mouseout touchleave", range_wrapper, function() {
      if (!range_mousedown) {
        var thumb = $2(this).children(".thumb");
        var paddingLeft = parseInt($2(this).css("padding-left"));
        var marginLeft = 7 + paddingLeft + "px";
        if (thumb.hasClass("active")) {
          thumb.velocity({ height: "0", width: "0", top: "10px", marginLeft }, { duration: 100 });
        }
        thumb.removeClass("active");
      }
    });
    $2.fn.autocomplete = function(options) {
      var defaults = {
        data: {},
        limit: Infinity,
        onAutocomplete: null,
        minLength: 1
      };
      options = $2.extend(defaults, options);
      return this.each(function() {
        var $input = $2(this);
        var data = options.data, count = 0, activeIndex = -1, oldVal, $inputDiv = $input.closest(".input-field");
        if (!$2.isEmptyObject(data)) {
          var $autocomplete = $2('<ul class="autocomplete-content dropdown-content"></ul>');
          var $oldAutocomplete;
          if ($inputDiv.length) {
            $oldAutocomplete = $inputDiv.children(".autocomplete-content.dropdown-content").first();
            if (!$oldAutocomplete.length) {
              $inputDiv.append($autocomplete);
            }
          } else {
            $oldAutocomplete = $input.next(".autocomplete-content.dropdown-content");
            if (!$oldAutocomplete.length) {
              $input.after($autocomplete);
            }
          }
          if ($oldAutocomplete.length) {
            $autocomplete = $oldAutocomplete;
          }
          var highlight = function(string, $el) {
            var img = $el.find("img");
            var matchStart = $el.text().toLowerCase().indexOf("" + string.toLowerCase()), matchEnd = matchStart + string.length - 1, beforeMatch = $el.text().slice(0, matchStart), matchText = $el.text().slice(matchStart, matchEnd + 1), afterMatch = $el.text().slice(matchEnd + 1);
            $el.html("<span>" + beforeMatch + "<span class='highlight'>" + matchText + "</span>" + afterMatch + "</span>");
            if (img.length) {
              $el.prepend(img);
            }
          };
          var resetCurrentElement = function() {
            activeIndex = -1;
            $autocomplete.find(".active").removeClass("active");
          };
          var removeAutocomplete = function() {
            $autocomplete.empty();
            resetCurrentElement();
            oldVal = void 0;
          };
          $input.off("blur.autocomplete").on("blur.autocomplete", function() {
            removeAutocomplete();
          });
          $input.off("keyup.autocomplete focus.autocomplete").on("keyup.autocomplete focus.autocomplete", function(e) {
            count = 0;
            var val = $input.val().toLowerCase();
            if (e.which === 13 || e.which === 38 || e.which === 40) {
              return;
            }
            if (oldVal !== val) {
              removeAutocomplete();
              if (val.length >= options.minLength) {
                for (var key in data) {
                  if (data.hasOwnProperty(key) && key.toLowerCase().indexOf(val) !== -1) {
                    if (count >= options.limit) {
                      break;
                    }
                    var autocompleteOption = $2("<li></li>");
                    if (!!data[key]) {
                      autocompleteOption.append('<img src="' + data[key] + '" class="right circle"><span>' + key + "</span>");
                    } else {
                      autocompleteOption.append("<span>" + key + "</span>");
                    }
                    $autocomplete.append(autocompleteOption);
                    highlight(val, autocompleteOption);
                    count++;
                  }
                }
              }
            }
            oldVal = val;
          });
          $input.off("keydown.autocomplete").on("keydown.autocomplete", function(e) {
            var keyCode = e.which, liElement, numItems = $autocomplete.children("li").length, $active = $autocomplete.children(".active").first();
            if (keyCode === 13 && activeIndex >= 0) {
              liElement = $autocomplete.children("li").eq(activeIndex);
              if (liElement.length) {
                liElement.trigger("mousedown.autocomplete");
                e.preventDefault();
              }
              return;
            }
            if (keyCode === 38 || keyCode === 40) {
              e.preventDefault();
              if (keyCode === 38 && activeIndex > 0) {
                activeIndex--;
              }
              if (keyCode === 40 && activeIndex < numItems - 1) {
                activeIndex++;
              }
              $active.removeClass("active");
              if (activeIndex >= 0) {
                $autocomplete.children("li").eq(activeIndex).addClass("active");
              }
            }
          });
          $autocomplete.off("mousedown.autocomplete touchstart.autocomplete").on("mousedown.autocomplete touchstart.autocomplete", "li", function() {
            var text = $2(this).text().trim();
            $input.val(text);
            $input.trigger("change");
            removeAutocomplete();
            if (typeof options.onAutocomplete === "function") {
              options.onAutocomplete.call(this, text);
            }
          });
        } else {
          $input.off("keyup.autocomplete focus.autocomplete");
        }
      });
    };
  });
  $2.fn.material_select = function(callback) {
    $2(this).each(function() {
      var $select = $2(this);
      if ($select.hasClass("browser-default")) {
        return;
      }
      var multiple = $select.attr("multiple") ? true : false, lastID = $select.attr("data-select-id");
      if (lastID) {
        $select.parent().find("span.caret").remove();
        $select.parent().find("input").remove();
        $select.unwrap();
        $2("ul#select-options-" + lastID).remove();
      }
      if (callback === "destroy") {
        $select.removeAttr("data-select-id").removeClass("initialized");
        $2(window).off("click.select");
        return;
      }
      var uniqueID = Materialize.guid();
      $select.attr("data-select-id", uniqueID);
      var wrapper = $2('<div class="select-wrapper"></div>');
      wrapper.addClass($select.attr("class"));
      if ($select.is(":disabled")) wrapper.addClass("disabled");
      var options = $2('<ul id="select-options-' + uniqueID + '" class="dropdown-content select-dropdown ' + (multiple ? "multiple-select-dropdown" : "") + '"></ul>'), selectChildren = $select.children("option, optgroup"), valuesSelected = [], optionsHover = false;
      var label = $select.find("option:selected").html() || $select.find("option:first").html() || "";
      var appendOptionWithIcon = function(select, option, type) {
        var disabledClass = option.is(":disabled") ? "disabled " : "";
        var optgroupClass = type === "optgroup-option" ? "optgroup-option " : "";
        var multipleCheckbox = multiple ? '<input type="checkbox"' + disabledClass + "/><label></label>" : "";
        var icon_url = option.data("icon");
        var classes = option.attr("class");
        if (!!icon_url) {
          var classString = "";
          if (!!classes) classString = ' class="' + classes + '"';
          options.append($2('<li class="' + disabledClass + optgroupClass + '"><img alt="" src="' + icon_url + '"' + classString + "><span>" + multipleCheckbox + option.html() + "</span></li>"));
          return true;
        }
        options.append($2('<li class="' + disabledClass + optgroupClass + '"><span>' + multipleCheckbox + option.html() + "</span></li>"));
      };
      if (selectChildren.length) {
        selectChildren.each(function() {
          if ($2(this).is("option")) {
            if (multiple) {
              appendOptionWithIcon($select, $2(this), "multiple");
            } else {
              appendOptionWithIcon($select, $2(this));
            }
          } else if ($2(this).is("optgroup")) {
            var selectOptions = $2(this).children("option");
            options.append($2('<li class="optgroup"><span>' + $2(this).attr("label") + "</span></li>"));
            selectOptions.each(function() {
              appendOptionWithIcon($select, $2(this), "optgroup-option");
            });
          }
        });
      }
      options.find("li:not(.optgroup)").each(function(i) {
        $2(this).click(function(e) {
          if (!$2(this).hasClass("disabled") && !$2(this).hasClass("optgroup")) {
            var selected = true;
            if (multiple) {
              $2('input[type="checkbox"]', this).prop("checked", function(i2, v) {
                return !v;
              });
              selected = toggleEntryFromArray(valuesSelected, i, $select);
              $newSelect.trigger("focus");
            } else {
              options.find("li").removeClass("active");
              $2(this).toggleClass("active");
              $newSelect.val($2(this).text());
            }
            activateOption(options, $2(this));
            $select.find("option").eq(i).prop("selected", selected);
            $select.trigger("change");
            if (typeof callback !== "undefined") callback();
          }
          e.stopPropagation();
        });
      });
      $select.wrap(wrapper);
      var dropdownIcon = $2('<span class="caret">&#9660;</span>');
      var sanitizedLabelHtml = label.replace(/"/g, "&quot;");
      var $newSelect = $2('<input type="text" class="select-dropdown" readonly="true" ' + ($select.is(":disabled") ? "disabled" : "") + ' data-activates="select-options-' + uniqueID + '" value="' + sanitizedLabelHtml + '"/>');
      $select.before($newSelect);
      $newSelect.before(dropdownIcon);
      $newSelect.after(options);
      if (!$select.is(":disabled")) {
        $newSelect.dropdown({ "hover": false });
      }
      if ($select.attr("tabindex")) {
        $2($newSelect[0]).attr("tabindex", $select.attr("tabindex"));
      }
      $select.addClass("initialized");
      $newSelect.on({
        "focus": function() {
          if ($2("ul.select-dropdown").not(options[0]).is(":visible")) {
            $2("input.select-dropdown").trigger("close");
            $2(window).off("click.select");
          }
          if (!options.is(":visible")) {
            $2(this).trigger("open", ["focus"]);
            var label2 = $2(this).val();
            if (multiple && label2.indexOf(",") >= 0) {
              label2 = label2.split(",")[0];
            }
            var selectedOption = options.find("li").filter(function() {
              return $2(this).text().toLowerCase() === label2.toLowerCase();
            })[0];
            activateOption(options, selectedOption, true);
            $2(window).off("click.select").on("click.select", function() {
              multiple && (optionsHover || $newSelect.trigger("close"));
              $2(window).off("click.select");
            });
          }
        },
        "click": function(e) {
          e.stopPropagation();
        }
      });
      $newSelect.on("blur", function() {
        if (!multiple) {
          $2(this).trigger("close");
          $2(window).off("click.select");
        }
        options.find("li.selected").removeClass("selected");
      });
      options.hover(function() {
        optionsHover = true;
      }, function() {
        optionsHover = false;
      });
      if (multiple) {
        $select.find("option:selected:not(:disabled)").each(function() {
          var index = this.index;
          toggleEntryFromArray(valuesSelected, index, $select);
          options.find("li:not(.optgroup)").eq(index).find(":checkbox").prop("checked", true);
        });
      }
      var activateOption = function(collection, newOption, firstActivation) {
        if (newOption) {
          collection.find("li.selected").removeClass("selected");
          var option = $2(newOption);
          option.addClass("selected");
          if (!multiple || !!firstActivation) {
            options.scrollTo(option);
          }
        }
      };
      var filterQuery = [], onKeyDown = function(e) {
        if (e.which == 9) {
          $newSelect.trigger("close");
          return;
        }
        if (e.which == 40 && !options.is(":visible")) {
          $newSelect.trigger("open");
          return;
        }
        if (e.which == 13 && !options.is(":visible")) {
          return;
        }
        e.preventDefault();
        var letter = String.fromCharCode(e.which).toLowerCase(), nonLetters = [9, 13, 27, 38, 40];
        if (letter && nonLetters.indexOf(e.which) === -1) {
          filterQuery.push(letter);
          var string = filterQuery.join(""), newOption = options.find("li").filter(function() {
            return $2(this).text().toLowerCase().indexOf(string) === 0;
          })[0];
          if (newOption) {
            activateOption(options, newOption);
          }
        }
        if (e.which == 13) {
          var activeOption = options.find("li.selected:not(.disabled)")[0];
          if (activeOption) {
            $2(activeOption).trigger("click");
            if (!multiple) {
              $newSelect.trigger("close");
            }
          }
        }
        if (e.which == 40) {
          if (options.find("li.selected").length) {
            newOption = options.find("li.selected").next("li:not(.disabled)")[0];
          } else {
            newOption = options.find("li:not(.disabled)")[0];
          }
          activateOption(options, newOption);
        }
        if (e.which == 27) {
          $newSelect.trigger("close");
        }
        if (e.which == 38) {
          newOption = options.find("li.selected").prev("li:not(.disabled)")[0];
          if (newOption) activateOption(options, newOption);
        }
        setTimeout(function() {
          filterQuery = [];
        }, 1e3);
      };
      $newSelect.on("keydown", onKeyDown);
    });
    function toggleEntryFromArray(entriesArray, entryIndex, select) {
      var index = entriesArray.indexOf(entryIndex), notAdded = index === -1;
      if (notAdded) {
        entriesArray.push(entryIndex);
      } else {
        entriesArray.splice(index, 1);
      }
      select.siblings("ul.dropdown-content").find("li:not(.optgroup)").eq(entryIndex).toggleClass("active");
      select.find("option").eq(entryIndex).prop("selected", notAdded);
      setValueToInput(entriesArray, select);
      return notAdded;
    }
    function setValueToInput(entriesArray, select) {
      var value = "";
      for (var i = 0, count = entriesArray.length; i < count; i++) {
        var text = select.find("option").eq(entriesArray[i]).text();
        i === 0 ? value += text : value += ", " + text;
      }
      if (value === "") {
        value = select.find("option:disabled").eq(0).text();
      }
      select.siblings("input.select-dropdown").val(value);
    }
  };
})(jQuery);
;
(function($2) {
  var methods = {
    init: function(options) {
      var defaults = {
        indicators: true,
        height: 400,
        transition: 500,
        interval: 6e3
      };
      options = $2.extend(defaults, options);
      return this.each(function() {
        var $this = $2(this);
        var $slider = $this.find("ul.slides").first();
        var $slides = $slider.find("> li");
        var $active_index = $slider.find(".active").index();
        var $active, $indicators, $interval;
        if ($active_index != -1) {
          $active = $slides.eq($active_index);
        }
        function captionTransition(caption, duration) {
          if (caption.hasClass("center-align")) {
            caption.velocity({ opacity: 0, translateY: -100 }, { duration, queue: false });
          } else if (caption.hasClass("right-align")) {
            caption.velocity({ opacity: 0, translateX: 100 }, { duration, queue: false });
          } else if (caption.hasClass("left-align")) {
            caption.velocity({ opacity: 0, translateX: -100 }, { duration, queue: false });
          }
        }
        function moveToSlide(index) {
          if (index >= $slides.length) index = 0;
          else if (index < 0) index = $slides.length - 1;
          $active_index = $slider.find(".active").index();
          if ($active_index != index) {
            $active = $slides.eq($active_index);
            $caption = $active.find(".caption");
            $active.removeClass("active");
            $active.velocity({ opacity: 0 }, {
              duration: options.transition,
              queue: false,
              easing: "easeOutQuad",
              complete: function() {
                $slides.not(".active").velocity({ opacity: 0, translateX: 0, translateY: 0 }, { duration: 0, queue: false });
              }
            });
            captionTransition($caption, options.transition);
            if (options.indicators) {
              $indicators.eq($active_index).removeClass("active");
            }
            $slides.eq(index).velocity({ opacity: 1 }, { duration: options.transition, queue: false, easing: "easeOutQuad" });
            $slides.eq(index).find(".caption").velocity({ opacity: 1, translateX: 0, translateY: 0 }, { duration: options.transition, delay: options.transition, queue: false, easing: "easeOutQuad" });
            $slides.eq(index).addClass("active");
            if (options.indicators) {
              $indicators.eq(index).addClass("active");
            }
          }
        }
        if (!$this.hasClass("fullscreen")) {
          if (options.indicators) {
            $this.height(options.height + 40);
          } else {
            $this.height(options.height);
          }
          $slider.height(options.height);
        }
        $slides.find(".caption").each(function() {
          captionTransition($2(this), 0);
        });
        $slides.find("img").each(function() {
          var placeholderBase64 = "data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
          if ($2(this).attr("src") !== placeholderBase64) {
            $2(this).css("background-image", 'url("' + $2(this).attr("src") + '")');
            $2(this).attr("src", placeholderBase64);
          }
        });
        if (options.indicators) {
          $indicators = $2('<ul class="indicators"></ul>');
          $slides.each(function(index) {
            var $indicator = $2('<li class="indicator-item"></li>');
            $indicator.click(function() {
              var $parent = $slider.parent();
              var curr_index2 = $parent.find($2(this)).index();
              moveToSlide(curr_index2);
              clearInterval($interval);
              $interval = setInterval(function() {
                $active_index = $slider.find(".active").index();
                if ($slides.length == $active_index + 1) $active_index = 0;
                else $active_index += 1;
                moveToSlide($active_index);
              }, options.transition + options.interval);
            });
            $indicators.append($indicator);
          });
          $this.append($indicators);
          $indicators = $this.find("ul.indicators").find("li.indicator-item");
        }
        if ($active) {
          $active.show();
        } else {
          $slides.first().addClass("active").velocity({ opacity: 1 }, { duration: options.transition, queue: false, easing: "easeOutQuad" });
          $active_index = 0;
          $active = $slides.eq($active_index);
          if (options.indicators) {
            $indicators.eq($active_index).addClass("active");
          }
        }
        $active.find("img").each(function() {
          $active.find(".caption").velocity({ opacity: 1, translateX: 0, translateY: 0 }, { duration: options.transition, queue: false, easing: "easeOutQuad" });
        });
        $interval = setInterval(function() {
          $active_index = $slider.find(".active").index();
          moveToSlide($active_index + 1);
        }, options.transition + options.interval);
        var panning = false;
        var swipeLeft = false;
        var swipeRight = false;
        $this.hammer({
          prevent_default: false
        }).on("pan", function(e) {
          if (e.gesture.pointerType === "touch") {
            clearInterval($interval);
            var direction = e.gesture.direction;
            var x = e.gesture.deltaX;
            var velocityX = e.gesture.velocityX;
            var velocityY = e.gesture.velocityY;
            $curr_slide = $slider.find(".active");
            if (Math.abs(velocityX) > Math.abs(velocityY)) {
              $curr_slide.velocity({
                translateX: x
              }, { duration: 50, queue: false, easing: "easeOutQuad" });
            }
            if (direction === 4 && (x > $this.innerWidth() / 2 || velocityX < -0.65)) {
              swipeRight = true;
            } else if (direction === 2 && (x < -1 * $this.innerWidth() / 2 || velocityX > 0.65)) {
              swipeLeft = true;
            }
            var next_slide;
            if (swipeLeft) {
              next_slide = $curr_slide.next();
              if (next_slide.length === 0) {
                next_slide = $slides.first();
              }
              next_slide.velocity({
                opacity: 1
              }, { duration: 300, queue: false, easing: "easeOutQuad" });
            }
            if (swipeRight) {
              next_slide = $curr_slide.prev();
              if (next_slide.length === 0) {
                next_slide = $slides.last();
              }
              next_slide.velocity({
                opacity: 1
              }, { duration: 300, queue: false, easing: "easeOutQuad" });
            }
          }
        }).on("panend", function(e) {
          if (e.gesture.pointerType === "touch") {
            $curr_slide = $slider.find(".active");
            panning = false;
            curr_index = $slider.find(".active").index();
            if (!swipeRight && !swipeLeft || $slides.length <= 1) {
              $curr_slide.velocity({
                translateX: 0
              }, { duration: 300, queue: false, easing: "easeOutQuad" });
            } else if (swipeLeft) {
              moveToSlide(curr_index + 1);
              $curr_slide.velocity({ translateX: -1 * $this.innerWidth() }, {
                duration: 300,
                queue: false,
                easing: "easeOutQuad",
                complete: function() {
                  $curr_slide.velocity({ opacity: 0, translateX: 0 }, { duration: 0, queue: false });
                }
              });
            } else if (swipeRight) {
              moveToSlide(curr_index - 1);
              $curr_slide.velocity({ translateX: $this.innerWidth() }, {
                duration: 300,
                queue: false,
                easing: "easeOutQuad",
                complete: function() {
                  $curr_slide.velocity({ opacity: 0, translateX: 0 }, { duration: 0, queue: false });
                }
              });
            }
            swipeLeft = false;
            swipeRight = false;
            clearInterval($interval);
            $interval = setInterval(function() {
              $active_index = $slider.find(".active").index();
              if ($slides.length == $active_index + 1) $active_index = 0;
              else $active_index += 1;
              moveToSlide($active_index);
            }, options.transition + options.interval);
          }
        });
        $this.on("sliderPause", function() {
          clearInterval($interval);
        });
        $this.on("sliderStart", function() {
          clearInterval($interval);
          $interval = setInterval(function() {
            $active_index = $slider.find(".active").index();
            if ($slides.length == $active_index + 1) $active_index = 0;
            else $active_index += 1;
            moveToSlide($active_index);
          }, options.transition + options.interval);
        });
        $this.on("sliderNext", function() {
          $active_index = $slider.find(".active").index();
          moveToSlide($active_index + 1);
        });
        $this.on("sliderPrev", function() {
          $active_index = $slider.find(".active").index();
          moveToSlide($active_index - 1);
        });
      });
    },
    pause: function() {
      $2(this).trigger("sliderPause");
    },
    start: function() {
      $2(this).trigger("sliderStart");
    },
    next: function() {
      $2(this).trigger("sliderNext");
    },
    prev: function() {
      $2(this).trigger("sliderPrev");
    }
  };
  $2.fn.slider = function(methodOrOptions) {
    if (methods[methodOrOptions]) {
      return methods[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof methodOrOptions === "object" || !methodOrOptions) {
      return methods.init.apply(this, arguments);
    } else {
      $2.error("Method " + methodOrOptions + " does not exist on jQuery.tooltip");
    }
  };
})(jQuery);
;
(function($2) {
  $2(document).ready(function() {
    $2(document).on("click.card", ".card", function(e) {
      if ($2(this).find("> .card-reveal").length) {
        var $card = $2(e.target).closest(".card");
        if ($card.data("initialOverflow") === void 0) {
          $card.data("initialOverflow", $card.css("overflow") === void 0 ? "" : $card.css("overflow"));
        }
        if ($2(e.target).is($2(".card-reveal .card-title")) || $2(e.target).is($2(".card-reveal .card-title i"))) {
          $2(this).find(".card-reveal").velocity({ translateY: 0 }, {
            duration: 225,
            queue: false,
            easing: "easeInOutQuad",
            complete: function() {
              $2(this).css({ display: "none" });
              $card.css("overflow", $card.data("initialOverflow"));
            }
          });
        } else if ($2(e.target).is($2(".card .activator")) || $2(e.target).is($2(".card .activator i"))) {
          $card.css("overflow", "hidden");
          $2(this).find(".card-reveal").css({ display: "block" }).velocity("stop", false).velocity({ translateY: "-100%" }, { duration: 300, queue: false, easing: "easeInOutQuad" });
        }
      }
    });
  });
})(jQuery);
;
(function($2) {
  var materialChipsDefaults = {
    data: [],
    placeholder: "",
    secondaryPlaceholder: "",
    autocompleteOptions: {}
  };
  $2(document).ready(function() {
    $2(document).on("click", ".chip .close", function(e) {
      var $chips = $2(this).closest(".chips");
      if ($chips.attr("data-initialized")) {
        return;
      }
      $2(this).closest(".chip").remove();
    });
  });
  $2.fn.material_chip = function(options) {
    var self = this;
    this.$el = $2(this);
    this.$document = $2(document);
    this.SELS = {
      CHIPS: ".chips",
      CHIP: ".chip",
      INPUT: "input",
      DELETE: ".material-icons",
      SELECTED_CHIP: ".selected"
    };
    if ("data" === options) {
      return this.$el.data("chips");
    }
    var curr_options = $2.extend({}, materialChipsDefaults, options);
    self.hasAutocomplete = !$2.isEmptyObject(curr_options.autocompleteOptions.data);
    this.init = function() {
      var i = 0;
      var chips;
      self.$el.each(function() {
        var $chips = $2(this);
        var chipId = Materialize.guid();
        self.chipId = chipId;
        if (!curr_options.data || !(curr_options.data instanceof Array)) {
          curr_options.data = [];
        }
        $chips.data("chips", curr_options.data);
        $chips.attr("data-index", i);
        $chips.attr("data-initialized", true);
        if (!$chips.hasClass(self.SELS.CHIPS)) {
          $chips.addClass("chips");
        }
        self.chips($chips, chipId);
        i++;
      });
    };
    this.handleEvents = function() {
      var SELS = self.SELS;
      self.$document.off("click.chips-focus", SELS.CHIPS).on("click.chips-focus", SELS.CHIPS, function(e) {
        $2(e.target).find(SELS.INPUT).focus();
      });
      self.$document.off("click.chips-select", SELS.CHIP).on("click.chips-select", SELS.CHIP, function(e) {
        var $chip = $2(e.target);
        if ($chip.length) {
          var wasSelected = $chip.hasClass("selected");
          var $chips = $chip.closest(SELS.CHIPS);
          $2(SELS.CHIP).removeClass("selected");
          if (!wasSelected) {
            self.selectChip($chip.index(), $chips);
          }
        }
      });
      self.$document.off("keydown.chips").on("keydown.chips", function(e) {
        if ($2(e.target).is("input, textarea")) {
          return;
        }
        var $chip = self.$document.find(SELS.CHIP + SELS.SELECTED_CHIP);
        var $chips = $chip.closest(SELS.CHIPS);
        var length = $chip.siblings(SELS.CHIP).length;
        var index;
        if (!$chip.length) {
          return;
        }
        if (e.which === 8 || e.which === 46) {
          e.preventDefault();
          index = $chip.index();
          self.deleteChip(index, $chips);
          var selectIndex = null;
          if (index + 1 < length) {
            selectIndex = index;
          } else if (index === length || index + 1 === length) {
            selectIndex = length - 1;
          }
          if (selectIndex < 0) selectIndex = null;
          if (null !== selectIndex) {
            self.selectChip(selectIndex, $chips);
          }
          if (!length) $chips.find("input").focus();
        } else if (e.which === 37) {
          index = $chip.index() - 1;
          if (index < 0) {
            return;
          }
          $2(SELS.CHIP).removeClass("selected");
          self.selectChip(index, $chips);
        } else if (e.which === 39) {
          index = $chip.index() + 1;
          $2(SELS.CHIP).removeClass("selected");
          if (index > length) {
            $chips.find("input").focus();
            return;
          }
          self.selectChip(index, $chips);
        }
      });
      self.$document.off("focusin.chips", SELS.CHIPS + " " + SELS.INPUT).on("focusin.chips", SELS.CHIPS + " " + SELS.INPUT, function(e) {
        var $currChips = $2(e.target).closest(SELS.CHIPS);
        $currChips.addClass("focus");
        $currChips.siblings("label, .prefix").addClass("active");
        $2(SELS.CHIP).removeClass("selected");
      });
      self.$document.off("focusout.chips", SELS.CHIPS + " " + SELS.INPUT).on("focusout.chips", SELS.CHIPS + " " + SELS.INPUT, function(e) {
        var $currChips = $2(e.target).closest(SELS.CHIPS);
        $currChips.removeClass("focus");
        if ($currChips.data("chips") === void 0 || !$currChips.data("chips").length) {
          $currChips.siblings("label").removeClass("active");
        }
        $currChips.siblings(".prefix").removeClass("active");
      });
      self.$document.off("keydown.chips-add", SELS.CHIPS + " " + SELS.INPUT).on("keydown.chips-add", SELS.CHIPS + " " + SELS.INPUT, function(e) {
        var $target = $2(e.target);
        var $chips = $target.closest(SELS.CHIPS);
        var chipsLength = $chips.children(SELS.CHIP).length;
        if (13 === e.which) {
          if (self.hasAutocomplete && $chips.find(".autocomplete-content.dropdown-content").length && $chips.find(".autocomplete-content.dropdown-content").children().length) {
            return;
          }
          e.preventDefault();
          self.addChip({ tag: $target.val() }, $chips);
          $target.val("");
          return;
        }
        if ((8 === e.keyCode || 37 === e.keyCode) && "" === $target.val() && chipsLength) {
          e.preventDefault();
          self.selectChip(chipsLength - 1, $chips);
          $target.blur();
          return;
        }
      });
      self.$document.off("click.chips-delete", SELS.CHIPS + " " + SELS.DELETE).on("click.chips-delete", SELS.CHIPS + " " + SELS.DELETE, function(e) {
        var $target = $2(e.target);
        var $chips = $target.closest(SELS.CHIPS);
        var $chip = $target.closest(SELS.CHIP);
        e.stopPropagation();
        self.deleteChip($chip.index(), $chips);
        $chips.find("input").focus();
      });
    };
    this.chips = function($chips, chipId) {
      $chips.empty();
      $chips.data("chips").forEach(function(elem) {
        $chips.append(self.renderChip(elem));
      });
      $chips.append($2('<input id="' + chipId + '" class="input" placeholder="">'));
      self.setPlaceholder($chips);
      var label = $chips.next("label");
      if (label.length) {
        label.attr("for", chipId);
        if ($chips.data("chips") !== void 0 && $chips.data("chips").length) {
          label.addClass("active");
        }
      }
      var input = $2("#" + chipId);
      if (self.hasAutocomplete) {
        curr_options.autocompleteOptions.onAutocomplete = function(val) {
          self.addChip({ tag: val }, $chips);
          input.val("");
          input.focus();
        };
        input.autocomplete(curr_options.autocompleteOptions);
      }
    };
    this.renderChip = function(elem) {
      if (!elem.tag) return;
      var $renderedChip = $2('<div class="chip"></div>');
      $renderedChip.text(elem.tag);
      if (elem.image) {
        $renderedChip.prepend($2("<img />").attr("src", elem.image));
      }
      $renderedChip.append($2('<i class="material-icons close">close</i>'));
      return $renderedChip;
    };
    this.setPlaceholder = function($chips) {
      if ($chips.data("chips") !== void 0 && !$chips.data("chips").length && curr_options.placeholder) {
        $chips.find("input").prop("placeholder", curr_options.placeholder);
      } else if (($chips.data("chips") === void 0 || !!$chips.data("chips").length) && curr_options.secondaryPlaceholder) {
        $chips.find("input").prop("placeholder", curr_options.secondaryPlaceholder);
      }
    };
    this.isValid = function($chips, elem) {
      var chips = $chips.data("chips");
      var exists = false;
      for (var i = 0; i < chips.length; i++) {
        if (chips[i].tag === elem.tag) {
          exists = true;
          return;
        }
      }
      return "" !== elem.tag && !exists;
    };
    this.addChip = function(elem, $chips) {
      if (!self.isValid($chips, elem)) {
        return;
      }
      var $renderedChip = self.renderChip(elem);
      var newData = [];
      var oldData = $chips.data("chips");
      for (var i = 0; i < oldData.length; i++) {
        newData.push(oldData[i]);
      }
      newData.push(elem);
      $chips.data("chips", newData);
      $renderedChip.insertBefore($chips.find("input"));
      $chips.trigger("chip.add", elem);
      self.setPlaceholder($chips);
    };
    this.deleteChip = function(chipIndex, $chips) {
      var chip = $chips.data("chips")[chipIndex];
      $chips.find(".chip").eq(chipIndex).remove();
      var newData = [];
      var oldData = $chips.data("chips");
      for (var i = 0; i < oldData.length; i++) {
        if (i !== chipIndex) {
          newData.push(oldData[i]);
        }
      }
      $chips.data("chips", newData);
      $chips.trigger("chip.delete", chip);
      self.setPlaceholder($chips);
    };
    this.selectChip = function(chipIndex, $chips) {
      var $chip = $chips.find(".chip").eq(chipIndex);
      if ($chip && false === $chip.hasClass("selected")) {
        $chip.addClass("selected");
        $chips.trigger("chip.select", $chips.data("chips")[chipIndex]);
      }
    };
    this.getChipsElement = function(index, $chips) {
      return $chips.eq(index);
    };
    this.init();
    this.handleEvents();
  };
})(jQuery);
;
(function($2) {
  $2.fn.pushpin = function(options) {
    var defaults = {
      top: 0,
      bottom: Infinity,
      offset: 0
    };
    if (options === "remove") {
      this.each(function() {
        if (id = $2(this).data("pushpin-id")) {
          $2(window).off("scroll." + id);
          $2(this).removeData("pushpin-id").removeClass("pin-top pinned pin-bottom").removeAttr("style");
        }
      });
      return false;
    }
    options = $2.extend(defaults, options);
    $index = 0;
    return this.each(function() {
      var $uniqueId = Materialize.guid(), $this = $2(this), $original_offset = $2(this).offset().top;
      function removePinClasses(object) {
        object.removeClass("pin-top");
        object.removeClass("pinned");
        object.removeClass("pin-bottom");
      }
      function updateElements(objects, scrolled) {
        objects.each(function() {
          if (options.top <= scrolled && options.bottom >= scrolled && !$2(this).hasClass("pinned")) {
            removePinClasses($2(this));
            $2(this).css("top", options.offset);
            $2(this).addClass("pinned");
          }
          if (scrolled < options.top && !$2(this).hasClass("pin-top")) {
            removePinClasses($2(this));
            $2(this).css("top", 0);
            $2(this).addClass("pin-top");
          }
          if (scrolled > options.bottom && !$2(this).hasClass("pin-bottom")) {
            removePinClasses($2(this));
            $2(this).addClass("pin-bottom");
            $2(this).css("top", options.bottom - $original_offset);
          }
        });
      }
      $2(this).data("pushpin-id", $uniqueId);
      updateElements($this, $2(window).scrollTop());
      $2(window).on("scroll." + $uniqueId, function() {
        var $scrolled = $2(window).scrollTop() + options.offset;
        updateElements($this, $scrolled);
      });
    });
  };
})(jQuery);
;
(function($2) {
  $2(document).ready(function() {
    $2.fn.reverse = [].reverse;
    $2(document).on("mouseenter.fixedActionBtn", ".fixed-action-btn:not(.click-to-toggle):not(.toolbar)", function(e) {
      var $this = $2(this);
      openFABMenu($this);
    });
    $2(document).on("mouseleave.fixedActionBtn", ".fixed-action-btn:not(.click-to-toggle):not(.toolbar)", function(e) {
      var $this = $2(this);
      closeFABMenu($this);
    });
    $2(document).on("click.fabClickToggle", ".fixed-action-btn.click-to-toggle > a", function(e) {
      var $this = $2(this);
      var $menu = $this.parent();
      if ($menu.hasClass("active")) {
        closeFABMenu($menu);
      } else {
        openFABMenu($menu);
      }
    });
    $2(document).on("click.fabToolbar", ".fixed-action-btn.toolbar > a", function(e) {
      var $this = $2(this);
      var $menu = $this.parent();
      FABtoToolbar($menu);
    });
  });
  $2.fn.extend({
    openFAB: function() {
      openFABMenu($2(this));
    },
    closeFAB: function() {
      closeFABMenu($2(this));
    },
    openToolbar: function() {
      FABtoToolbar($2(this));
    },
    closeToolbar: function() {
      toolbarToFAB($2(this));
    }
  });
  var openFABMenu = function(btn) {
    var $this = btn;
    if ($this.hasClass("active") === false) {
      var horizontal = $this.hasClass("horizontal");
      var offsetY, offsetX;
      if (horizontal === true) {
        offsetX = 40;
      } else {
        offsetY = 40;
      }
      $this.addClass("active");
      $this.find("ul .btn-floating").velocity({ scaleY: ".4", scaleX: ".4", translateY: offsetY + "px", translateX: offsetX + "px" }, { duration: 0 });
      var time = 0;
      $this.find("ul .btn-floating").reverse().each(function() {
        $2(this).velocity({ opacity: "1", scaleX: "1", scaleY: "1", translateY: "0", translateX: "0" }, { duration: 80, delay: time });
        time += 40;
      });
    }
  };
  var closeFABMenu = function(btn) {
    var $this = btn;
    var horizontal = $this.hasClass("horizontal");
    var offsetY, offsetX;
    if (horizontal === true) {
      offsetX = 40;
    } else {
      offsetY = 40;
    }
    $this.removeClass("active");
    var time = 0;
    $this.find("ul .btn-floating").velocity("stop", true);
    $this.find("ul .btn-floating").velocity({ opacity: "0", scaleX: ".4", scaleY: ".4", translateY: offsetY + "px", translateX: offsetX + "px" }, { duration: 80 });
  };
  var FABtoToolbar = function(btn) {
    if (btn.attr("data-open") === "true") {
      return;
    }
    var offsetX, offsetY, scaleFactor;
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var btnRect = btn[0].getBoundingClientRect();
    var anchor = btn.find("> a").first();
    var menu = btn.find("> ul").first();
    var backdrop = $2('<div class="fab-backdrop"></div>');
    var fabColor = anchor.css("background-color");
    anchor.append(backdrop);
    offsetX = btnRect.left - windowWidth / 2 + btnRect.width / 2;
    offsetY = windowHeight - btnRect.bottom;
    scaleFactor = windowWidth / backdrop.width();
    btn.attr("data-origin-bottom", btnRect.bottom);
    btn.attr("data-origin-left", btnRect.left);
    btn.attr("data-origin-width", btnRect.width);
    btn.addClass("active");
    btn.attr("data-open", true);
    btn.css({
      "text-align": "center",
      width: "100%",
      bottom: 0,
      left: 0,
      transform: "translateX(" + offsetX + "px)",
      transition: "none"
    });
    anchor.css({
      transform: "translateY(" + -offsetY + "px)",
      transition: "none"
    });
    backdrop.css({
      "background-color": fabColor
    });
    setTimeout(function() {
      btn.css({
        transform: "",
        transition: "transform .2s cubic-bezier(0.550, 0.085, 0.680, 0.530), background-color 0s linear .2s"
      });
      anchor.css({
        overflow: "visible",
        transform: "",
        transition: "transform .2s"
      });
      setTimeout(function() {
        btn.css({
          overflow: "hidden",
          "background-color": fabColor
        });
        backdrop.css({
          transform: "scale(" + scaleFactor + ")",
          transition: "transform .2s cubic-bezier(0.550, 0.055, 0.675, 0.190)"
        });
        menu.find("> li > a").css({
          opacity: 1
        });
        $2(window).on("scroll.fabToolbarClose", function() {
          toolbarToFAB(btn);
          $2(window).off("scroll.fabToolbarClose");
          $2(document).off("click.fabToolbarClose");
        });
        $2(document).on("click.fabToolbarClose", function(e) {
          if (!$2(e.target).closest(menu).length) {
            toolbarToFAB(btn);
            $2(window).off("scroll.fabToolbarClose");
            $2(document).off("click.fabToolbarClose");
          }
        });
      }, 100);
    }, 0);
  };
  var toolbarToFAB = function(btn) {
    if (btn.attr("data-open") !== "true") {
      return;
    }
    var offsetX, offsetY, scaleFactor;
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var btnWidth = btn.attr("data-origin-width");
    var btnBottom = btn.attr("data-origin-bottom");
    var btnLeft = btn.attr("data-origin-left");
    var anchor = btn.find("> .btn-floating").first();
    var menu = btn.find("> ul").first();
    var backdrop = btn.find(".fab-backdrop");
    var fabColor = anchor.css("background-color");
    offsetX = btnLeft - windowWidth / 2 + btnWidth / 2;
    offsetY = windowHeight - btnBottom;
    scaleFactor = windowWidth / backdrop.width();
    btn.removeClass("active");
    btn.attr("data-open", false);
    btn.css({
      "background-color": "transparent",
      transition: "none"
    });
    anchor.css({
      transition: "none"
    });
    backdrop.css({
      transform: "scale(0)",
      "background-color": fabColor
    });
    menu.find("> li > a").css({
      opacity: ""
    });
    setTimeout(function() {
      backdrop.remove();
      btn.css({
        "text-align": "",
        width: "",
        bottom: "",
        left: "",
        overflow: "",
        "background-color": "",
        transform: "translate3d(" + -offsetX + "px,0,0)"
      });
      anchor.css({
        overflow: "",
        transform: "translate3d(0," + offsetY + "px,0)"
      });
      setTimeout(function() {
        btn.css({
          transform: "translate3d(0,0,0)",
          transition: "transform .2s"
        });
        anchor.css({
          transform: "translate3d(0,0,0)",
          transition: "transform .2s cubic-bezier(0.550, 0.055, 0.675, 0.190)"
        });
      }, 20);
    }, 200);
  };
})(jQuery);
;
(function($2) {
  Materialize.fadeInImage = function(selectorOrEl) {
    var element;
    if (typeof selectorOrEl === "string") {
      element = $2(selectorOrEl);
    } else if (typeof selectorOrEl === "object") {
      element = selectorOrEl;
    } else {
      return;
    }
    element.css({ opacity: 0 });
    $2(element).velocity({ opacity: 1 }, {
      duration: 650,
      queue: false,
      easing: "easeOutSine"
    });
    $2(element).velocity({ opacity: 1 }, {
      duration: 1300,
      queue: false,
      easing: "swing",
      step: function(now, fx) {
        fx.start = 100;
        var grayscale_setting = now / 100;
        var brightness_setting = 150 - (100 - now) / 1.75;
        if (brightness_setting < 100) {
          brightness_setting = 100;
        }
        if (now >= 0) {
          $2(this).css({
            "-webkit-filter": "grayscale(" + grayscale_setting + ")brightness(" + brightness_setting + "%)",
            "filter": "grayscale(" + grayscale_setting + ")brightness(" + brightness_setting + "%)"
          });
        }
      }
    });
  };
  Materialize.showStaggeredList = function(selectorOrEl) {
    var element;
    if (typeof selectorOrEl === "string") {
      element = $2(selectorOrEl);
    } else if (typeof selectorOrEl === "object") {
      element = selectorOrEl;
    } else {
      return;
    }
    var time = 0;
    element.find("li").velocity({ translateX: "-100px" }, { duration: 0 });
    element.find("li").each(function() {
      $2(this).velocity({ opacity: "1", translateX: "0" }, { duration: 800, delay: time, easing: [60, 10] });
      time += 120;
    });
  };
  $2(document).ready(function() {
    var swipeLeft = false;
    var swipeRight = false;
    $2(".dismissable").each(function() {
      $2(this).hammer({
        prevent_default: false
      }).on("pan", function(e) {
        if (e.gesture.pointerType === "touch") {
          var $this = $2(this);
          var direction = e.gesture.direction;
          var x = e.gesture.deltaX;
          var velocityX = e.gesture.velocityX;
          $this.velocity({
            translateX: x
          }, { duration: 50, queue: false, easing: "easeOutQuad" });
          if (direction === 4 && (x > $this.innerWidth() / 2 || velocityX < -0.75)) {
            swipeLeft = true;
          }
          if (direction === 2 && (x < -1 * $this.innerWidth() / 2 || velocityX > 0.75)) {
            swipeRight = true;
          }
        }
      }).on("panend", function(e) {
        if (Math.abs(e.gesture.deltaX) < $2(this).innerWidth() / 2) {
          swipeRight = false;
          swipeLeft = false;
        }
        if (e.gesture.pointerType === "touch") {
          var $this = $2(this);
          if (swipeLeft || swipeRight) {
            var fullWidth;
            if (swipeLeft) {
              fullWidth = $this.innerWidth();
            } else {
              fullWidth = -1 * $this.innerWidth();
            }
            $this.velocity({
              translateX: fullWidth
            }, {
              duration: 100,
              queue: false,
              easing: "easeOutQuad",
              complete: function() {
                $this.css("border", "none");
                $this.velocity({
                  height: 0,
                  padding: 0
                }, {
                  duration: 200,
                  queue: false,
                  easing: "easeOutQuad",
                  complete: function() {
                    $this.remove();
                  }
                });
              }
            });
          } else {
            $this.velocity({
              translateX: 0
            }, { duration: 100, queue: false, easing: "easeOutQuad" });
          }
          swipeLeft = false;
          swipeRight = false;
        }
      });
    });
  });
})(jQuery);
;
(function($2) {
  var scrollFireEventsHandled = false;
  Materialize.scrollFire = function(options) {
    var onScroll = function() {
      var windowScroll = window.pageYOffset + window.innerHeight;
      for (var i = 0; i < options.length; i++) {
        var value = options[i];
        var selector = value.selector, offset = value.offset, callback = value.callback;
        var currentElement = document.querySelector(selector);
        if (currentElement !== null) {
          var elementOffset = currentElement.getBoundingClientRect().top + window.pageYOffset;
          if (windowScroll > elementOffset + offset) {
            if (value.done !== true) {
              if (typeof callback === "function") {
                callback.call(this, currentElement);
              } else if (typeof callback === "string") {
                var callbackFunc = new Function(callback);
                callbackFunc(currentElement);
              }
              value.done = true;
            }
          }
        }
      }
    };
    var throttledScroll = Materialize.throttle(function() {
      onScroll();
    }, options.throttle || 100);
    if (!scrollFireEventsHandled) {
      window.addEventListener("scroll", throttledScroll);
      window.addEventListener("resize", throttledScroll);
      scrollFireEventsHandled = true;
    }
    setTimeout(throttledScroll, 0);
  };
})(jQuery);
;
/*!
* pickadate.js v3.5.0, 2014/04/13
* By Amsul, http://amsul.ca
* Hosted on http://amsul.github.io/pickadate.js
* Licensed under MIT
*/
(function(factory) {
  Materialize.Picker = factory(jQuery);
})(function($2) {
  var $window = $2(window);
  var $document = $2(document);
  var $html = $2(document.documentElement);
  function PickerConstructor(ELEMENT, NAME, COMPONENT, OPTIONS) {
    if (!ELEMENT) return PickerConstructor;
    var IS_DEFAULT_THEME = false, STATE = {
      id: ELEMENT.id || "P" + Math.abs(~~(Math.random() * /* @__PURE__ */ new Date()))
    }, SETTINGS = COMPONENT ? $2.extend(true, {}, COMPONENT.defaults, OPTIONS) : OPTIONS || {}, CLASSES = $2.extend({}, PickerConstructor.klasses(), SETTINGS.klass), $ELEMENT = $2(ELEMENT), PickerInstance = function() {
      return this.start();
    }, P = PickerInstance.prototype = {
      constructor: PickerInstance,
      $node: $ELEMENT,
      /**
       * Initialize everything
       */
      start: function() {
        if (STATE && STATE.start) return P;
        STATE.methods = {};
        STATE.start = true;
        STATE.open = false;
        STATE.type = ELEMENT.type;
        ELEMENT.autofocus = ELEMENT == getActiveElement();
        ELEMENT.readOnly = !SETTINGS.editable;
        ELEMENT.id = ELEMENT.id || STATE.id;
        if (ELEMENT.type != "text") {
          ELEMENT.type = "text";
        }
        P.component = new COMPONENT(P, SETTINGS);
        P.$root = $2(PickerConstructor._.node("div", createWrappedComponent(), CLASSES.picker, 'id="' + ELEMENT.id + '_root" tabindex="0"'));
        prepareElementRoot();
        if (SETTINGS.formatSubmit) {
          prepareElementHidden();
        }
        prepareElement();
        if (SETTINGS.container) $2(SETTINGS.container).append(P.$root);
        else $ELEMENT.before(P.$root);
        P.on({
          start: P.component.onStart,
          render: P.component.onRender,
          stop: P.component.onStop,
          open: P.component.onOpen,
          close: P.component.onClose,
          set: P.component.onSet
        }).on({
          start: SETTINGS.onStart,
          render: SETTINGS.onRender,
          stop: SETTINGS.onStop,
          open: SETTINGS.onOpen,
          close: SETTINGS.onClose,
          set: SETTINGS.onSet
        });
        IS_DEFAULT_THEME = isUsingDefaultTheme(P.$root.children()[0]);
        if (ELEMENT.autofocus) {
          P.open();
        }
        return P.trigger("start").trigger("render");
      },
      //start
      /**
       * Render a new picker
       */
      render: function(entireComponent) {
        if (entireComponent) P.$root.html(createWrappedComponent());
        else P.$root.find("." + CLASSES.box).html(P.component.nodes(STATE.open));
        return P.trigger("render");
      },
      //render
      /**
       * Destroy everything
       */
      stop: function() {
        if (!STATE.start) return P;
        P.close();
        if (P._hidden) {
          P._hidden.parentNode.removeChild(P._hidden);
        }
        P.$root.remove();
        $ELEMENT.removeClass(CLASSES.input).removeData(NAME);
        setTimeout(function() {
          $ELEMENT.off("." + STATE.id);
        }, 0);
        ELEMENT.type = STATE.type;
        ELEMENT.readOnly = false;
        P.trigger("stop");
        STATE.methods = {};
        STATE.start = false;
        return P;
      },
      //stop
      /**
       * Open up the picker
       */
      open: function(dontGiveFocus) {
        if (STATE.open) return P;
        $ELEMENT.addClass(CLASSES.active);
        aria(ELEMENT, "expanded", true);
        setTimeout(function() {
          P.$root.addClass(CLASSES.opened);
          aria(P.$root[0], "hidden", false);
        }, 0);
        if (dontGiveFocus !== false) {
          STATE.open = true;
          if (IS_DEFAULT_THEME) {
            $html.css("overflow", "hidden").css("padding-right", "+=" + getScrollbarWidth());
          }
          P.$root.eq(0).focus();
          $document.on("click." + STATE.id + " focusin." + STATE.id, function(event) {
            var target = event.target;
            if (target != ELEMENT && target != document && event.which != 3) {
              P.close(target === P.$root.children()[0]);
            }
          }).on("keydown." + STATE.id, function(event) {
            var keycode = event.keyCode, keycodeToMove = P.component.key[keycode], target = event.target;
            if (keycode == 27) {
              P.close(true);
            } else if (target == P.$root[0] && (keycodeToMove || keycode == 13)) {
              event.preventDefault();
              if (keycodeToMove) {
                PickerConstructor._.trigger(P.component.key.go, P, [PickerConstructor._.trigger(keycodeToMove)]);
              } else if (!P.$root.find("." + CLASSES.highlighted).hasClass(CLASSES.disabled)) {
                P.set("select", P.component.item.highlight);
                if (SETTINGS.closeOnSelect) {
                  P.close(true);
                }
              }
            } else if ($2.contains(P.$root[0], target) && keycode == 13) {
              event.preventDefault();
              target.click();
            }
          });
        }
        return P.trigger("open");
      },
      //open
      /**
       * Close the picker
       */
      close: function(giveFocus) {
        if (giveFocus) {
          P.$root.off("focus.toOpen").eq(0).focus();
          setTimeout(function() {
            P.$root.on("focus.toOpen", handleFocusToOpenEvent);
          }, 0);
        }
        $ELEMENT.removeClass(CLASSES.active);
        aria(ELEMENT, "expanded", false);
        setTimeout(function() {
          P.$root.removeClass(CLASSES.opened + " " + CLASSES.focused);
          aria(P.$root[0], "hidden", true);
        }, 0);
        if (!STATE.open) return P;
        STATE.open = false;
        if (IS_DEFAULT_THEME) {
          $html.css("overflow", "").css("padding-right", "-=" + getScrollbarWidth());
        }
        $document.off("." + STATE.id);
        return P.trigger("close");
      },
      //close
      /**
       * Clear the values
       */
      clear: function(options) {
        return P.set("clear", null, options);
      },
      //clear
      /**
       * Set something
       */
      set: function(thing, value, options) {
        var thingItem, thingValue, thingIsObject = $2.isPlainObject(thing), thingObject = thingIsObject ? thing : {};
        options = thingIsObject && $2.isPlainObject(value) ? value : options || {};
        if (thing) {
          if (!thingIsObject) {
            thingObject[thing] = value;
          }
          for (thingItem in thingObject) {
            thingValue = thingObject[thingItem];
            if (thingItem in P.component.item) {
              if (thingValue === void 0) thingValue = null;
              P.component.set(thingItem, thingValue, options);
            }
            if (thingItem == "select" || thingItem == "clear") {
              $ELEMENT.val(thingItem == "clear" ? "" : P.get(thingItem, SETTINGS.format)).trigger("change");
            }
          }
          P.render();
        }
        return options.muted ? P : P.trigger("set", thingObject);
      },
      //set
      /**
       * Get something
       */
      get: function(thing, format) {
        thing = thing || "value";
        if (STATE[thing] != null) {
          return STATE[thing];
        }
        if (thing == "valueSubmit") {
          if (P._hidden) {
            return P._hidden.value;
          }
          thing = "value";
        }
        if (thing == "value") {
          return ELEMENT.value;
        }
        if (thing in P.component.item) {
          if (typeof format == "string") {
            var thingValue = P.component.get(thing);
            return thingValue ? PickerConstructor._.trigger(P.component.formats.toString, P.component, [format, thingValue]) : "";
          }
          return P.component.get(thing);
        }
      },
      //get
      /**
       * Bind events on the things.
       */
      on: function(thing, method, internal) {
        var thingName, thingMethod, thingIsObject = $2.isPlainObject(thing), thingObject = thingIsObject ? thing : {};
        if (thing) {
          if (!thingIsObject) {
            thingObject[thing] = method;
          }
          for (thingName in thingObject) {
            thingMethod = thingObject[thingName];
            if (internal) {
              thingName = "_" + thingName;
            }
            STATE.methods[thingName] = STATE.methods[thingName] || [];
            STATE.methods[thingName].push(thingMethod);
          }
        }
        return P;
      },
      //on
      /**
       * Unbind events on the things.
       */
      off: function() {
        var i, thingName, names = arguments;
        for (i = 0, namesCount = names.length; i < namesCount; i += 1) {
          thingName = names[i];
          if (thingName in STATE.methods) {
            delete STATE.methods[thingName];
          }
        }
        return P;
      },
      /**
       * Fire off method events.
       */
      trigger: function(name, data) {
        var _trigger = function(name2) {
          var methodList = STATE.methods[name2];
          if (methodList) {
            methodList.map(function(method) {
              PickerConstructor._.trigger(method, P, [data]);
            });
          }
        };
        _trigger("_" + name);
        _trigger(name);
        return P;
      }
      //trigger
      //PickerInstance.prototype
      /**
       * Wrap the picker holder components together.
       */
    };
    function createWrappedComponent() {
      return PickerConstructor._.node(
        "div",
        // Create a picker wrapper node
        PickerConstructor._.node(
          "div",
          // Create a picker frame
          PickerConstructor._.node(
            "div",
            // Create a picker box node
            PickerConstructor._.node(
              "div",
              // Create the components nodes.
              P.component.nodes(STATE.open),
              // The picker box class
              CLASSES.box
            ),
            // Picker wrap class
            CLASSES.wrap
          ),
          // Picker frame class
          CLASSES.frame
        ),
        // Picker holder class
        CLASSES.holder
      );
    }
    function prepareElement() {
      $ELEMENT.data(NAME, P).addClass(CLASSES.input).attr("tabindex", -1).val($ELEMENT.data("value") ? P.get("select", SETTINGS.format) : ELEMENT.value);
      if (!SETTINGS.editable) {
        $ELEMENT.on("focus." + STATE.id + " click." + STATE.id, function(event) {
          event.preventDefault();
          P.$root.eq(0).focus();
        }).on("keydown." + STATE.id, handleKeydownEvent);
      }
      aria(ELEMENT, {
        haspopup: true,
        expanded: false,
        readonly: false,
        owns: ELEMENT.id + "_root"
      });
    }
    function prepareElementRoot() {
      P.$root.on({
        // For iOS8.
        keydown: handleKeydownEvent,
        // When something within the root is focused, stop from bubbling
        // to the doc and remove the “focused” state from the root.
        focusin: function(event) {
          P.$root.removeClass(CLASSES.focused);
          event.stopPropagation();
        },
        // When something within the root holder is clicked, stop it
        // from bubbling to the doc.
        "mousedown click": function(event) {
          var target = event.target;
          if (target != P.$root.children()[0]) {
            event.stopPropagation();
            if (event.type == "mousedown" && !$2(target).is("input, select, textarea, button, option")) {
              event.preventDefault();
              P.$root.eq(0).focus();
            }
          }
        }
      }).on({
        focus: function() {
          $ELEMENT.addClass(CLASSES.target);
        },
        blur: function() {
          $ELEMENT.removeClass(CLASSES.target);
        }
      }).on("focus.toOpen", handleFocusToOpenEvent).on("click", "[data-pick], [data-nav], [data-clear], [data-close]", function() {
        var $target = $2(this), targetData = $target.data(), targetDisabled = $target.hasClass(CLASSES.navDisabled) || $target.hasClass(CLASSES.disabled), activeElement = getActiveElement();
        activeElement = activeElement && (activeElement.type || activeElement.href) && activeElement;
        if (targetDisabled || activeElement && !$2.contains(P.$root[0], activeElement)) {
          P.$root.eq(0).focus();
        }
        if (!targetDisabled && targetData.nav) {
          P.set("highlight", P.component.item.highlight, { nav: targetData.nav });
        } else if (!targetDisabled && "pick" in targetData) {
          P.set("select", targetData.pick);
          if (SETTINGS.closeOnSelect) {
            P.close(true);
          }
        } else if (targetData.clear) {
          P.clear();
          if (SETTINGS.closeOnSelect) {
            P.close(true);
          }
        } else if (targetData.close) {
          P.close(true);
        }
      });
      aria(P.$root[0], "hidden", true);
    }
    function prepareElementHidden() {
      var name;
      if (SETTINGS.hiddenName === true) {
        name = ELEMENT.name;
        ELEMENT.name = "";
      } else {
        name = [typeof SETTINGS.hiddenPrefix == "string" ? SETTINGS.hiddenPrefix : "", typeof SETTINGS.hiddenSuffix == "string" ? SETTINGS.hiddenSuffix : "_submit"];
        name = name[0] + ELEMENT.name + name[1];
      }
      P._hidden = $2('<input type=hidden name="' + name + '"' + // If the element has a value, set the hidden value as well.
      ($ELEMENT.data("value") || ELEMENT.value ? ' value="' + P.get("select", SETTINGS.formatSubmit) + '"' : "") + ">")[0];
      $ELEMENT.on("change." + STATE.id, function() {
        P._hidden.value = ELEMENT.value ? P.get("select", SETTINGS.formatSubmit) : "";
      });
      if (SETTINGS.container) $2(SETTINGS.container).append(P._hidden);
      else $ELEMENT.before(P._hidden);
    }
    function handleKeydownEvent(event) {
      var keycode = event.keyCode, isKeycodeDelete = /^(8|46)$/.test(keycode);
      if (keycode == 27) {
        P.close();
        return false;
      }
      if (keycode == 32 || isKeycodeDelete || !STATE.open && P.component.key[keycode]) {
        event.preventDefault();
        event.stopPropagation();
        if (isKeycodeDelete) {
          P.clear().close();
        } else {
          P.open();
        }
      }
    }
    function handleFocusToOpenEvent(event) {
      event.stopPropagation();
      if (event.type == "focus") {
        P.$root.addClass(CLASSES.focused);
      }
      P.open();
    }
    return new PickerInstance();
  }
  PickerConstructor.klasses = function(prefix) {
    prefix = prefix || "picker";
    return {
      picker: prefix,
      opened: prefix + "--opened",
      focused: prefix + "--focused",
      input: prefix + "__input",
      active: prefix + "__input--active",
      target: prefix + "__input--target",
      holder: prefix + "__holder",
      frame: prefix + "__frame",
      wrap: prefix + "__wrap",
      box: prefix + "__box"
    };
  };
  function isUsingDefaultTheme(element) {
    var theme, prop = "position";
    if (element.currentStyle) {
      theme = element.currentStyle[prop];
    } else if (window.getComputedStyle) {
      theme = getComputedStyle(element)[prop];
    }
    return theme == "fixed";
  }
  function getScrollbarWidth() {
    if ($html.height() <= $window.height()) {
      return 0;
    }
    var $outer = $2('<div style="visibility:hidden;width:100px" />').appendTo("body");
    var widthWithoutScroll = $outer[0].offsetWidth;
    $outer.css("overflow", "scroll");
    var $inner = $2('<div style="width:100%" />').appendTo($outer);
    var widthWithScroll = $inner[0].offsetWidth;
    $outer.remove();
    return widthWithoutScroll - widthWithScroll;
  }
  PickerConstructor._ = {
    /**
     * Create a group of nodes. Expects:
     * `
        {
            min:    {Integer},
            max:    {Integer},
            i:      {Integer},
            node:   {String},
            item:   {Function}
        }
     * `
     */
    group: function(groupObject) {
      var loopObjectScope, nodesList = "", counter = PickerConstructor._.trigger(groupObject.min, groupObject);
      for (; counter <= PickerConstructor._.trigger(groupObject.max, groupObject, [counter]); counter += groupObject.i) {
        loopObjectScope = PickerConstructor._.trigger(groupObject.item, groupObject, [counter]);
        nodesList += PickerConstructor._.node(
          groupObject.node,
          loopObjectScope[0],
          // the node
          loopObjectScope[1],
          // the classes
          loopObjectScope[2]
          // the attributes
        );
      }
      return nodesList;
    },
    //group
    /**
     * Create a dom node string
     */
    node: function(wrapper, item, klass, attribute) {
      if (!item) return "";
      item = $2.isArray(item) ? item.join("") : item;
      klass = klass ? ' class="' + klass + '"' : "";
      attribute = attribute ? " " + attribute : "";
      return "<" + wrapper + klass + attribute + ">" + item + "</" + wrapper + ">";
    },
    //node
    /**
     * Lead numbers below 10 with a zero.
     */
    lead: function(number) {
      return (number < 10 ? "0" : "") + number;
    },
    /**
     * Trigger a function otherwise return the value.
     */
    trigger: function(callback, scope, args) {
      return typeof callback == "function" ? callback.apply(scope, args || []) : callback;
    },
    /**
     * If the second character is a digit, length is 2 otherwise 1.
     */
    digits: function(string) {
      return /\d/.test(string[1]) ? 2 : 1;
    },
    /**
     * Tell if something is a date object.
     */
    isDate: function(value) {
      return {}.toString.call(value).indexOf("Date") > -1 && this.isInteger(value.getDate());
    },
    /**
     * Tell if something is an integer.
     */
    isInteger: function(value) {
      return {}.toString.call(value).indexOf("Number") > -1 && value % 1 === 0;
    },
    /**
     * Create ARIA attribute strings.
     */
    ariaAttr
    //PickerConstructor._
    /**
     * Extend the picker with a component and defaults.
     */
  };
  PickerConstructor.extend = function(name, Component) {
    $2.fn[name] = function(options, action) {
      var componentData = this.data(name);
      if (options == "picker") {
        return componentData;
      }
      if (componentData && typeof options == "string") {
        return PickerConstructor._.trigger(componentData[options], componentData, [action]);
      }
      return this.each(function() {
        var $this = $2(this);
        if (!$this.data(name)) {
          new PickerConstructor(this, name, Component, options);
        }
      });
    };
    $2.fn[name].defaults = Component.defaults;
  };
  function aria(element, attribute, value) {
    if ($2.isPlainObject(attribute)) {
      for (var key in attribute) {
        ariaSet(element, key, attribute[key]);
      }
    } else {
      ariaSet(element, attribute, value);
    }
  }
  function ariaSet(element, attribute, value) {
    element.setAttribute((attribute == "role" ? "" : "aria-") + attribute, value);
  }
  function ariaAttr(attribute, data) {
    if (!$2.isPlainObject(attribute)) {
      attribute = { attribute: data };
    }
    data = "";
    for (var key in attribute) {
      var attr = (key == "role" ? "" : "aria-") + key, attrVal = attribute[key];
      data += attrVal == null ? "" : attr + '="' + attribute[key] + '"';
    }
    return data;
  }
  function getActiveElement() {
    try {
      return document.activeElement;
    } catch (err) {
    }
  }
  return PickerConstructor;
});
;
/*!
* Date picker for pickadate.js v3.5.0
* http://amsul.github.io/pickadate.js/date.htm
*/
(function(factory) {
  factory(Materialize.Picker, jQuery);
})(function(Picker, $2) {
  var DAYS_IN_WEEK = 7, WEEKS_IN_CALENDAR = 6, _ = Picker._;
  function DatePicker(picker, settings) {
    var calendar = this, element = picker.$node[0], elementValue = element.value, elementDataValue = picker.$node.data("value"), valueString = elementDataValue || elementValue, formatString = elementDataValue ? settings.formatSubmit : settings.format, isRTL = function() {
      return element.currentStyle ? (
        // For IE.
        element.currentStyle.direction == "rtl"
      ) : (
        // For normal browsers.
        getComputedStyle(picker.$root[0]).direction == "rtl"
      );
    };
    calendar.settings = settings;
    calendar.$node = picker.$node;
    calendar.queue = {
      min: "measure create",
      max: "measure create",
      now: "now create",
      select: "parse create validate",
      highlight: "parse navigate create validate",
      view: "parse create validate viewset",
      disable: "deactivate",
      enable: "activate"
      // The component's item object.
    };
    calendar.item = {};
    calendar.item.clear = null;
    calendar.item.disable = (settings.disable || []).slice(0);
    calendar.item.enable = -function(collectionDisabled) {
      return collectionDisabled[0] === true ? collectionDisabled.shift() : -1;
    }(calendar.item.disable);
    calendar.set("min", settings.min).set("max", settings.max).set("now");
    if (valueString) {
      calendar.set("select", valueString, { format: formatString });
    } else {
      calendar.set("select", null).set("highlight", calendar.item.now);
    }
    calendar.key = {
      40: 7,
      // Down
      38: -7,
      // Up
      39: function() {
        return isRTL() ? -1 : 1;
      },
      // Right
      37: function() {
        return isRTL() ? 1 : -1;
      },
      // Left
      go: function(timeChange) {
        var highlightedObject = calendar.item.highlight, targetDate = new Date(highlightedObject.year, highlightedObject.month, highlightedObject.date + timeChange);
        calendar.set("highlight", targetDate, { interval: timeChange });
        this.render();
      }
      // Bind some picker events.
    };
    picker.on("render", function() {
      picker.$root.find("." + settings.klass.selectMonth).on("change", function() {
        var value = this.value;
        if (value) {
          picker.set("highlight", [picker.get("view").year, value, picker.get("highlight").date]);
          picker.$root.find("." + settings.klass.selectMonth).trigger("focus");
        }
      });
      picker.$root.find("." + settings.klass.selectYear).on("change", function() {
        var value = this.value;
        if (value) {
          picker.set("highlight", [value, picker.get("view").month, picker.get("highlight").date]);
          picker.$root.find("." + settings.klass.selectYear).trigger("focus");
        }
      });
    }, 1).on("open", function() {
      var includeToday = "";
      if (calendar.disabled(calendar.get("now"))) {
        includeToday = ":not(." + settings.klass.buttonToday + ")";
      }
      picker.$root.find("button" + includeToday + ", select").attr("disabled", false);
    }, 1).on("close", function() {
      picker.$root.find("button, select").attr("disabled", true);
    }, 1);
  }
  DatePicker.prototype.set = function(type, value, options) {
    var calendar = this, calendarItem = calendar.item;
    if (value === null) {
      if (type == "clear") type = "select";
      calendarItem[type] = value;
      return calendar;
    }
    calendarItem[type == "enable" ? "disable" : type == "flip" ? "enable" : type] = calendar.queue[type].split(" ").map(function(method) {
      value = calendar[method](type, value, options);
      return value;
    }).pop();
    if (type == "select") {
      calendar.set("highlight", calendarItem.select, options);
    } else if (type == "highlight") {
      calendar.set("view", calendarItem.highlight, options);
    } else if (type.match(/^(flip|min|max|disable|enable)$/)) {
      if (calendarItem.select && calendar.disabled(calendarItem.select)) {
        calendar.set("select", calendarItem.select, options);
      }
      if (calendarItem.highlight && calendar.disabled(calendarItem.highlight)) {
        calendar.set("highlight", calendarItem.highlight, options);
      }
    }
    return calendar;
  };
  DatePicker.prototype.get = function(type) {
    return this.item[type];
  };
  DatePicker.prototype.create = function(type, value, options) {
    var isInfiniteValue, calendar = this;
    value = value === void 0 ? type : value;
    if (value == -Infinity || value == Infinity) {
      isInfiniteValue = value;
    } else if ($2.isPlainObject(value) && _.isInteger(value.pick)) {
      value = value.obj;
    } else if ($2.isArray(value)) {
      value = new Date(value[0], value[1], value[2]);
      value = _.isDate(value) ? value : calendar.create().obj;
    } else if (_.isInteger(value) || _.isDate(value)) {
      value = calendar.normalize(new Date(value), options);
    } else {
      value = calendar.now(type, value, options);
    }
    return {
      year: isInfiniteValue || value.getFullYear(),
      month: isInfiniteValue || value.getMonth(),
      date: isInfiniteValue || value.getDate(),
      day: isInfiniteValue || value.getDay(),
      obj: isInfiniteValue || value,
      pick: isInfiniteValue || value.getTime()
    };
  };
  DatePicker.prototype.createRange = function(from, to) {
    var calendar = this, createDate = function(date) {
      if (date === true || $2.isArray(date) || _.isDate(date)) {
        return calendar.create(date);
      }
      return date;
    };
    if (!_.isInteger(from)) {
      from = createDate(from);
    }
    if (!_.isInteger(to)) {
      to = createDate(to);
    }
    if (_.isInteger(from) && $2.isPlainObject(to)) {
      from = [to.year, to.month, to.date + from];
    } else if (_.isInteger(to) && $2.isPlainObject(from)) {
      to = [from.year, from.month, from.date + to];
    }
    return {
      from: createDate(from),
      to: createDate(to)
    };
  };
  DatePicker.prototype.withinRange = function(range, dateUnit) {
    range = this.createRange(range.from, range.to);
    return dateUnit.pick >= range.from.pick && dateUnit.pick <= range.to.pick;
  };
  DatePicker.prototype.overlapRanges = function(one, two) {
    var calendar = this;
    one = calendar.createRange(one.from, one.to);
    two = calendar.createRange(two.from, two.to);
    return calendar.withinRange(one, two.from) || calendar.withinRange(one, two.to) || calendar.withinRange(two, one.from) || calendar.withinRange(two, one.to);
  };
  DatePicker.prototype.now = function(type, value, options) {
    value = /* @__PURE__ */ new Date();
    if (options && options.rel) {
      value.setDate(value.getDate() + options.rel);
    }
    return this.normalize(value, options);
  };
  DatePicker.prototype.navigate = function(type, value, options) {
    var targetDateObject, targetYear, targetMonth, targetDate, isTargetArray = $2.isArray(value), isTargetObject = $2.isPlainObject(value), viewsetObject = this.item.view;
    if (isTargetArray || isTargetObject) {
      if (isTargetObject) {
        targetYear = value.year;
        targetMonth = value.month;
        targetDate = value.date;
      } else {
        targetYear = +value[0];
        targetMonth = +value[1];
        targetDate = +value[2];
      }
      if (options && options.nav && viewsetObject && viewsetObject.month !== targetMonth) {
        targetYear = viewsetObject.year;
        targetMonth = viewsetObject.month;
      }
      targetDateObject = new Date(targetYear, targetMonth + (options && options.nav ? options.nav : 0), 1);
      targetYear = targetDateObject.getFullYear();
      targetMonth = targetDateObject.getMonth();
      while (
        /*safety &&*/
        new Date(targetYear, targetMonth, targetDate).getMonth() !== targetMonth
      ) {
        targetDate -= 1;
      }
      value = [targetYear, targetMonth, targetDate];
    }
    return value;
  };
  DatePicker.prototype.normalize = function(value) {
    value.setHours(0, 0, 0, 0);
    return value;
  };
  DatePicker.prototype.measure = function(type, value) {
    var calendar = this;
    if (!value) {
      value = type == "min" ? -Infinity : Infinity;
    } else if (typeof value == "string") {
      value = calendar.parse(type, value);
    } else if (_.isInteger(value)) {
      value = calendar.now(type, value, { rel: value });
    }
    return value;
  };
  DatePicker.prototype.viewset = function(type, dateObject) {
    return this.create([dateObject.year, dateObject.month, 1]);
  };
  DatePicker.prototype.validate = function(type, dateObject, options) {
    var calendar = this, originalDateObject = dateObject, interval = options && options.interval ? options.interval : 1, isFlippedBase = calendar.item.enable === -1, hasEnabledBeforeTarget, hasEnabledAfterTarget, minLimitObject = calendar.item.min, maxLimitObject = calendar.item.max, reachedMin, reachedMax, hasEnabledWeekdays = isFlippedBase && calendar.item.disable.filter(function(value) {
      if ($2.isArray(value)) {
        var dateTime = calendar.create(value).pick;
        if (dateTime < dateObject.pick) hasEnabledBeforeTarget = true;
        else if (dateTime > dateObject.pick) hasEnabledAfterTarget = true;
      }
      return _.isInteger(value);
    }).length;
    if (!options || !options.nav) {
      if (
        /* 1 */
        !isFlippedBase && calendar.disabled(dateObject) || /* 2 */
        isFlippedBase && calendar.disabled(dateObject) && (hasEnabledWeekdays || hasEnabledBeforeTarget || hasEnabledAfterTarget) || /* 3 */
        !isFlippedBase && (dateObject.pick <= minLimitObject.pick || dateObject.pick >= maxLimitObject.pick)
      ) {
        if (isFlippedBase && !hasEnabledWeekdays && (!hasEnabledAfterTarget && interval > 0 || !hasEnabledBeforeTarget && interval < 0)) {
          interval *= -1;
        }
        while (
          /*safety &&*/
          calendar.disabled(dateObject)
        ) {
          if (Math.abs(interval) > 1 && (dateObject.month < originalDateObject.month || dateObject.month > originalDateObject.month)) {
            dateObject = originalDateObject;
            interval = interval > 0 ? 1 : -1;
          }
          if (dateObject.pick <= minLimitObject.pick) {
            reachedMin = true;
            interval = 1;
            dateObject = calendar.create([minLimitObject.year, minLimitObject.month, minLimitObject.date + (dateObject.pick === minLimitObject.pick ? 0 : -1)]);
          } else if (dateObject.pick >= maxLimitObject.pick) {
            reachedMax = true;
            interval = -1;
            dateObject = calendar.create([maxLimitObject.year, maxLimitObject.month, maxLimitObject.date + (dateObject.pick === maxLimitObject.pick ? 0 : 1)]);
          }
          if (reachedMin && reachedMax) {
            break;
          }
          dateObject = calendar.create([dateObject.year, dateObject.month, dateObject.date + interval]);
        }
      }
    }
    return dateObject;
  };
  DatePicker.prototype.disabled = function(dateToVerify) {
    var calendar = this, isDisabledMatch = calendar.item.disable.filter(function(dateToDisable) {
      if (_.isInteger(dateToDisable)) {
        return dateToVerify.day === (calendar.settings.firstDay ? dateToDisable : dateToDisable - 1) % 7;
      }
      if ($2.isArray(dateToDisable) || _.isDate(dateToDisable)) {
        return dateToVerify.pick === calendar.create(dateToDisable).pick;
      }
      if ($2.isPlainObject(dateToDisable)) {
        return calendar.withinRange(dateToDisable, dateToVerify);
      }
    });
    isDisabledMatch = isDisabledMatch.length && !isDisabledMatch.filter(function(dateToDisable) {
      return $2.isArray(dateToDisable) && dateToDisable[3] == "inverted" || $2.isPlainObject(dateToDisable) && dateToDisable.inverted;
    }).length;
    return calendar.item.enable === -1 ? !isDisabledMatch : isDisabledMatch || dateToVerify.pick < calendar.item.min.pick || dateToVerify.pick > calendar.item.max.pick;
  };
  DatePicker.prototype.parse = function(type, value, options) {
    var calendar = this, parsingObject = {};
    if (!value || typeof value != "string") {
      return value;
    }
    if (!(options && options.format)) {
      options = options || {};
      options.format = calendar.settings.format;
    }
    calendar.formats.toArray(options.format).map(function(label) {
      var formattingLabel = calendar.formats[label], formatLength = formattingLabel ? _.trigger(formattingLabel, calendar, [value, parsingObject]) : label.replace(/^!/, "").length;
      if (formattingLabel) {
        parsingObject[label] = value.substr(0, formatLength);
      }
      value = value.substr(formatLength);
    });
    return [parsingObject.yyyy || parsingObject.yy, +(parsingObject.mm || parsingObject.m) - 1, parsingObject.dd || parsingObject.d];
  };
  DatePicker.prototype.formats = /* @__PURE__ */ function() {
    function getWordLengthFromCollection(string, collection, dateObject) {
      var word = string.match(/\w+/)[0];
      if (!dateObject.mm && !dateObject.m) {
        dateObject.m = collection.indexOf(word) + 1;
      }
      return word.length;
    }
    function getFirstWordLength(string) {
      return string.match(/\w+/)[0].length;
    }
    return {
      d: function(string, dateObject) {
        return string ? _.digits(string) : dateObject.date;
      },
      dd: function(string, dateObject) {
        return string ? 2 : _.lead(dateObject.date);
      },
      ddd: function(string, dateObject) {
        return string ? getFirstWordLength(string) : this.settings.weekdaysShort[dateObject.day];
      },
      dddd: function(string, dateObject) {
        return string ? getFirstWordLength(string) : this.settings.weekdaysFull[dateObject.day];
      },
      m: function(string, dateObject) {
        return string ? _.digits(string) : dateObject.month + 1;
      },
      mm: function(string, dateObject) {
        return string ? 2 : _.lead(dateObject.month + 1);
      },
      mmm: function(string, dateObject) {
        var collection = this.settings.monthsShort;
        return string ? getWordLengthFromCollection(string, collection, dateObject) : collection[dateObject.month];
      },
      mmmm: function(string, dateObject) {
        var collection = this.settings.monthsFull;
        return string ? getWordLengthFromCollection(string, collection, dateObject) : collection[dateObject.month];
      },
      yy: function(string, dateObject) {
        return string ? 2 : ("" + dateObject.year).slice(2);
      },
      yyyy: function(string, dateObject) {
        return string ? 4 : dateObject.year;
      },
      // Create an array by splitting the formatting string passed.
      toArray: function(formatString) {
        return formatString.split(/(d{1,4}|m{1,4}|y{4}|yy|!.)/g);
      },
      // Format an object into a string using the formatting options.
      toString: function(formatString, itemObject) {
        var calendar = this;
        return calendar.formats.toArray(formatString).map(function(label) {
          return _.trigger(calendar.formats[label], calendar, [0, itemObject]) || label.replace(/^!/, "");
        }).join("");
      }
    };
  }();
  DatePicker.prototype.isDateExact = function(one, two) {
    var calendar = this;
    if (_.isInteger(one) && _.isInteger(two) || typeof one == "boolean" && typeof two == "boolean") {
      return one === two;
    }
    if ((_.isDate(one) || $2.isArray(one)) && (_.isDate(two) || $2.isArray(two))) {
      return calendar.create(one).pick === calendar.create(two).pick;
    }
    if ($2.isPlainObject(one) && $2.isPlainObject(two)) {
      return calendar.isDateExact(one.from, two.from) && calendar.isDateExact(one.to, two.to);
    }
    return false;
  };
  DatePicker.prototype.isDateOverlap = function(one, two) {
    var calendar = this, firstDay = calendar.settings.firstDay ? 1 : 0;
    if (_.isInteger(one) && (_.isDate(two) || $2.isArray(two))) {
      one = one % 7 + firstDay;
      return one === calendar.create(two).day + 1;
    }
    if (_.isInteger(two) && (_.isDate(one) || $2.isArray(one))) {
      two = two % 7 + firstDay;
      return two === calendar.create(one).day + 1;
    }
    if ($2.isPlainObject(one) && $2.isPlainObject(two)) {
      return calendar.overlapRanges(one, two);
    }
    return false;
  };
  DatePicker.prototype.flipEnable = function(val) {
    var itemObject = this.item;
    itemObject.enable = val || (itemObject.enable == -1 ? 1 : -1);
  };
  DatePicker.prototype.deactivate = function(type, datesToDisable) {
    var calendar = this, disabledItems = calendar.item.disable.slice(0);
    if (datesToDisable == "flip") {
      calendar.flipEnable();
    } else if (datesToDisable === false) {
      calendar.flipEnable(1);
      disabledItems = [];
    } else if (datesToDisable === true) {
      calendar.flipEnable(-1);
      disabledItems = [];
    } else {
      datesToDisable.map(function(unitToDisable) {
        var matchFound;
        for (var index = 0; index < disabledItems.length; index += 1) {
          if (calendar.isDateExact(unitToDisable, disabledItems[index])) {
            matchFound = true;
            break;
          }
        }
        if (!matchFound) {
          if (_.isInteger(unitToDisable) || _.isDate(unitToDisable) || $2.isArray(unitToDisable) || $2.isPlainObject(unitToDisable) && unitToDisable.from && unitToDisable.to) {
            disabledItems.push(unitToDisable);
          }
        }
      });
    }
    return disabledItems;
  };
  DatePicker.prototype.activate = function(type, datesToEnable) {
    var calendar = this, disabledItems = calendar.item.disable, disabledItemsCount = disabledItems.length;
    if (datesToEnable == "flip") {
      calendar.flipEnable();
    } else if (datesToEnable === true) {
      calendar.flipEnable(1);
      disabledItems = [];
    } else if (datesToEnable === false) {
      calendar.flipEnable(-1);
      disabledItems = [];
    } else {
      datesToEnable.map(function(unitToEnable) {
        var matchFound, disabledUnit, index, isExactRange;
        for (index = 0; index < disabledItemsCount; index += 1) {
          disabledUnit = disabledItems[index];
          if (calendar.isDateExact(disabledUnit, unitToEnable)) {
            matchFound = disabledItems[index] = null;
            isExactRange = true;
            break;
          } else if (calendar.isDateOverlap(disabledUnit, unitToEnable)) {
            if ($2.isPlainObject(unitToEnable)) {
              unitToEnable.inverted = true;
              matchFound = unitToEnable;
            } else if ($2.isArray(unitToEnable)) {
              matchFound = unitToEnable;
              if (!matchFound[3]) matchFound.push("inverted");
            } else if (_.isDate(unitToEnable)) {
              matchFound = [unitToEnable.getFullYear(), unitToEnable.getMonth(), unitToEnable.getDate(), "inverted"];
            }
            break;
          }
        }
        if (matchFound) for (index = 0; index < disabledItemsCount; index += 1) {
          if (calendar.isDateExact(disabledItems[index], unitToEnable)) {
            disabledItems[index] = null;
            break;
          }
        }
        if (isExactRange) for (index = 0; index < disabledItemsCount; index += 1) {
          if (calendar.isDateOverlap(disabledItems[index], unitToEnable)) {
            disabledItems[index] = null;
            break;
          }
        }
        if (matchFound) {
          disabledItems.push(matchFound);
        }
      });
    }
    return disabledItems.filter(function(val) {
      return val != null;
    });
  };
  DatePicker.prototype.nodes = function(isOpen) {
    var calendar = this, settings = calendar.settings, calendarItem = calendar.item, nowObject = calendarItem.now, selectedObject = calendarItem.select, highlightedObject = calendarItem.highlight, viewsetObject = calendarItem.view, disabledCollection = calendarItem.disable, minLimitObject = calendarItem.min, maxLimitObject = calendarItem.max, tableHead = function(collection, fullCollection) {
      if (settings.firstDay) {
        collection.push(collection.shift());
        fullCollection.push(fullCollection.shift());
      }
      return _.node("thead", _.node("tr", _.group({
        min: 0,
        max: DAYS_IN_WEEK - 1,
        i: 1,
        node: "th",
        item: function(counter) {
          return [collection[counter], settings.klass.weekdays, 'scope=col title="' + fullCollection[counter] + '"'];
        }
      })));
    }((settings.showWeekdaysFull ? settings.weekdaysFull : settings.weekdaysLetter).slice(0), settings.weekdaysFull.slice(0)), createMonthNav = function(next) {
      return _.node("div", " ", settings.klass["nav" + (next ? "Next" : "Prev")] + // If the focused month is outside the range, disabled the button.
      (next && viewsetObject.year >= maxLimitObject.year && viewsetObject.month >= maxLimitObject.month || !next && viewsetObject.year <= minLimitObject.year && viewsetObject.month <= minLimitObject.month ? " " + settings.klass.navDisabled : ""), "data-nav=" + (next || -1) + " " + _.ariaAttr({
        role: "button",
        controls: calendar.$node[0].id + "_table"
      }) + ' title="' + (next ? settings.labelMonthNext : settings.labelMonthPrev) + '"');
    }, createMonthLabel = function(override) {
      var monthsCollection = settings.showMonthsShort ? settings.monthsShort : settings.monthsFull;
      if (override == "short_months") {
        monthsCollection = settings.monthsShort;
      }
      if (settings.selectMonths && override == void 0) {
        return _.node("select", _.group({
          min: 0,
          max: 11,
          i: 1,
          node: "option",
          item: function(loopedMonth) {
            return [
              // The looped month and no classes.
              monthsCollection[loopedMonth],
              0,
              // Set the value and selected index.
              "value=" + loopedMonth + (viewsetObject.month == loopedMonth ? " selected" : "") + (viewsetObject.year == minLimitObject.year && loopedMonth < minLimitObject.month || viewsetObject.year == maxLimitObject.year && loopedMonth > maxLimitObject.month ? " disabled" : "")
            ];
          }
        }), settings.klass.selectMonth + " browser-default", (isOpen ? "" : "disabled") + " " + _.ariaAttr({ controls: calendar.$node[0].id + "_table" }) + ' title="' + settings.labelMonthSelect + '"');
      }
      if (override == "short_months") if (selectedObject != null) return monthsCollection[selectedObject.month];
      else return monthsCollection[viewsetObject.month];
      return _.node("div", monthsCollection[viewsetObject.month], settings.klass.month);
    }, createYearLabel = function(override) {
      var focusedYear = viewsetObject.year, numberYears = settings.selectYears === true ? 5 : ~~(settings.selectYears / 2);
      if (numberYears) {
        var minYear = minLimitObject.year, maxYear = maxLimitObject.year, lowestYear = focusedYear - numberYears, highestYear = focusedYear + numberYears;
        if (minYear > lowestYear) {
          highestYear += minYear - lowestYear;
          lowestYear = minYear;
        }
        if (maxYear < highestYear) {
          var availableYears = lowestYear - minYear, neededYears = highestYear - maxYear;
          lowestYear -= availableYears > neededYears ? neededYears : availableYears;
          highestYear = maxYear;
        }
        if (settings.selectYears && override == void 0) {
          return _.node("select", _.group({
            min: lowestYear,
            max: highestYear,
            i: 1,
            node: "option",
            item: function(loopedYear) {
              return [
                // The looped year and no classes.
                loopedYear,
                0,
                // Set the value and selected index.
                "value=" + loopedYear + (focusedYear == loopedYear ? " selected" : "")
              ];
            }
          }), settings.klass.selectYear + " browser-default", (isOpen ? "" : "disabled") + " " + _.ariaAttr({ controls: calendar.$node[0].id + "_table" }) + ' title="' + settings.labelYearSelect + '"');
        }
      }
      if (override === "raw" && selectedObject != null) {
        return _.node("div", selectedObject.year);
      }
      return _.node("div", focusedYear, settings.klass.year);
    };
    createDayLabel = function() {
      if (selectedObject != null) return selectedObject.date;
      else return nowObject.date;
    };
    createWeekdayLabel = function() {
      var display_day;
      if (selectedObject != null) display_day = selectedObject.day;
      else display_day = nowObject.day;
      var weekday = settings.weekdaysShort[display_day];
      return weekday;
    };
    return _.node(
      // Date presentation View
      "div",
      _.node(
        // Div for Year
        "div",
        createYearLabel("raw"),
        settings.klass.year_display
      ) + _.node("span", createWeekdayLabel() + ", ", "picker__weekday-display") + _.node(
        // Div for short Month
        "span",
        createMonthLabel("short_months") + " ",
        settings.klass.month_display
      ) + _.node(
        // Div for Day
        "span",
        createDayLabel(),
        settings.klass.day_display
      ),
      settings.klass.date_display
    ) + // Calendar container
    _.node("div", _.node("div", _.node("div", (settings.selectYears ? createMonthLabel() + createYearLabel() : createMonthLabel() + createYearLabel()) + createMonthNav() + createMonthNav(1), settings.klass.header) + _.node("table", tableHead + _.node("tbody", _.group({
      min: 0,
      max: WEEKS_IN_CALENDAR - 1,
      i: 1,
      node: "tr",
      item: function(rowCounter) {
        var shiftDateBy = settings.firstDay && calendar.create([viewsetObject.year, viewsetObject.month, 1]).day === 0 ? -7 : 0;
        return [_.group({
          min: DAYS_IN_WEEK * rowCounter - viewsetObject.day + shiftDateBy + 1,
          // Add 1 for weekday 0index
          max: function() {
            return this.min + DAYS_IN_WEEK - 1;
          },
          i: 1,
          node: "td",
          item: function(targetDate) {
            targetDate = calendar.create([viewsetObject.year, viewsetObject.month, targetDate + (settings.firstDay ? 1 : 0)]);
            var isSelected = selectedObject && selectedObject.pick == targetDate.pick, isHighlighted = highlightedObject && highlightedObject.pick == targetDate.pick, isDisabled = disabledCollection && calendar.disabled(targetDate) || targetDate.pick < minLimitObject.pick || targetDate.pick > maxLimitObject.pick, formattedDate = _.trigger(calendar.formats.toString, calendar, [settings.format, targetDate]);
            return [_.node("div", targetDate.date, function(klasses) {
              klasses.push(viewsetObject.month == targetDate.month ? settings.klass.infocus : settings.klass.outfocus);
              if (nowObject.pick == targetDate.pick) {
                klasses.push(settings.klass.now);
              }
              if (isSelected) {
                klasses.push(settings.klass.selected);
              }
              if (isHighlighted) {
                klasses.push(settings.klass.highlighted);
              }
              if (isDisabled) {
                klasses.push(settings.klass.disabled);
              }
              return klasses.join(" ");
            }([settings.klass.day]), "data-pick=" + targetDate.pick + " " + _.ariaAttr({
              role: "gridcell",
              label: formattedDate,
              selected: isSelected && calendar.$node.val() === formattedDate ? true : null,
              activedescendant: isHighlighted ? true : null,
              disabled: isDisabled ? true : null
            }) + " " + (isDisabled ? "" : 'tabindex="0"')), "", _.ariaAttr({ role: "presentation" })];
          }
        })];
      }
    })), settings.klass.table, 'id="' + calendar.$node[0].id + '_table" ' + _.ariaAttr({
      role: "grid",
      controls: calendar.$node[0].id,
      readonly: true
    })), settings.klass.calendar_container) + // * For Firefox forms to submit, make sure to set the buttons’ `type` attributes as “button”.
    _.node("div", _.node("button", settings.today, "btn-flat picker__today waves-effect", "type=button data-pick=" + nowObject.pick + (isOpen && !calendar.disabled(nowObject) ? "" : " disabled") + " " + _.ariaAttr({ controls: calendar.$node[0].id })) + _.node("button", settings.clear, "btn-flat picker__clear waves-effect", "type=button data-clear=1" + (isOpen ? "" : " disabled") + " " + _.ariaAttr({ controls: calendar.$node[0].id })) + _.node("button", settings.close, "btn-flat picker__close waves-effect", "type=button data-close=true " + (isOpen ? "" : " disabled") + " " + _.ariaAttr({ controls: calendar.$node[0].id })), settings.klass.footer), "picker__container__wrapper");
  };
  DatePicker.defaults = function(prefix) {
    return {
      // The title label to use for the month nav buttons
      labelMonthNext: "Next month",
      labelMonthPrev: "Previous month",
      // The title label to use for the dropdown selectors
      labelMonthSelect: "Select a month",
      labelYearSelect: "Select a year",
      // Months and weekdays
      monthsFull: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      weekdaysFull: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      weekdaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      // Materialize modified
      weekdaysLetter: ["S", "M", "T", "W", "T", "F", "S"],
      // Today and clear
      today: "Today",
      clear: "Clear",
      close: "Ok",
      // Picker close behavior (Prevent a change in behaviour for backwards compatibility)
      closeOnSelect: false,
      // The format to show on the `input` element
      format: "d mmmm, yyyy",
      // Classes
      klass: {
        table: prefix + "table",
        header: prefix + "header",
        // Materialize Added klasses
        date_display: prefix + "date-display",
        day_display: prefix + "day-display",
        month_display: prefix + "month-display",
        year_display: prefix + "year-display",
        calendar_container: prefix + "calendar-container",
        // end
        navPrev: prefix + "nav--prev",
        navNext: prefix + "nav--next",
        navDisabled: prefix + "nav--disabled",
        month: prefix + "month",
        year: prefix + "year",
        selectMonth: prefix + "select--month",
        selectYear: prefix + "select--year",
        weekdays: prefix + "weekday",
        day: prefix + "day",
        disabled: prefix + "day--disabled",
        selected: prefix + "day--selected",
        highlighted: prefix + "day--highlighted",
        now: prefix + "day--today",
        infocus: prefix + "day--infocus",
        outfocus: prefix + "day--outfocus",
        footer: prefix + "footer",
        buttonClear: prefix + "button--clear",
        buttonToday: prefix + "button--today",
        buttonClose: prefix + "button--close"
      }
    };
  }(Picker.klasses().picker + "__");
  Picker.extend("pickadate", DatePicker);
});
;
/*!
* ClockPicker v0.0.7 (http://weareoutman.github.io/clockpicker/)
* Copyright 2014 Wang Shenwei.
* Licensed under MIT (https://github.com/weareoutman/clockpicker/blob/gh-pages/LICENSE)
*
* Further modified
* Copyright 2015 Ching Yaw Hao.
*/
(function($2) {
  var $win = $2(window), $doc = $2(document);
  var svgNS = "http://www.w3.org/2000/svg", svgSupported = "SVGAngle" in window && function() {
    var supported, el = document.createElement("div");
    el.innerHTML = "<svg/>";
    supported = (el.firstChild && el.firstChild.namespaceURI) == svgNS;
    el.innerHTML = "";
    return supported;
  }();
  var transitionSupported = function() {
    var style = document.createElement("div").style;
    return "transition" in style || "WebkitTransition" in style || "MozTransition" in style || "msTransition" in style || "OTransition" in style;
  }();
  var touchSupported = "ontouchstart" in window, mousedownEvent = "mousedown" + (touchSupported ? " touchstart" : ""), mousemoveEvent = "mousemove.clockpicker" + (touchSupported ? " touchmove.clockpicker" : ""), mouseupEvent = "mouseup.clockpicker" + (touchSupported ? " touchend.clockpicker" : "");
  var vibrate = navigator.vibrate ? "vibrate" : navigator.webkitVibrate ? "webkitVibrate" : null;
  function createSvgElement(name) {
    return document.createElementNS(svgNS, name);
  }
  function leadingZero(num) {
    return (num < 10 ? "0" : "") + num;
  }
  var idCounter = 0;
  function uniqueId(prefix) {
    var id2 = ++idCounter + "";
    return prefix ? prefix + id2 : id2;
  }
  var dialRadius = 135, outerRadius = 105, innerRadius = 70, tickRadius = 20, diameter = dialRadius * 2, duration = transitionSupported ? 350 : 1;
  var tpl = ['<div class="clockpicker picker">', '<div class="picker__holder">', '<div class="picker__frame">', '<div class="picker__wrap">', '<div class="picker__box">', '<div class="picker__date-display">', '<div class="clockpicker-display">', '<div class="clockpicker-display-column">', '<span class="clockpicker-span-hours text-primary"></span>', ":", '<span class="clockpicker-span-minutes"></span>', "</div>", '<div class="clockpicker-display-column clockpicker-display-am-pm">', '<div class="clockpicker-span-am-pm"></div>', "</div>", "</div>", "</div>", '<div class="picker__container__wrapper">', '<div class="picker__calendar-container">', '<div class="clockpicker-plate">', '<div class="clockpicker-canvas"></div>', '<div class="clockpicker-dial clockpicker-hours"></div>', '<div class="clockpicker-dial clockpicker-minutes clockpicker-dial-out"></div>', "</div>", '<div class="clockpicker-am-pm-block">', "</div>", "</div>", '<div class="picker__footer">', "</div>", "</div>", "</div>", "</div>", "</div>", "</div>", "</div>"].join("");
  function ClockPicker(element, options) {
    var popover = $2(tpl), plate = popover.find(".clockpicker-plate"), holder = popover.find(".picker__holder"), hoursView = popover.find(".clockpicker-hours"), minutesView = popover.find(".clockpicker-minutes"), amPmBlock = popover.find(".clockpicker-am-pm-block"), isInput = element.prop("tagName") === "INPUT", input = isInput ? element : element.find("input"), label = $2("label[for=" + input.attr("id") + "]"), self = this;
    this.id = uniqueId("cp");
    this.element = element;
    this.holder = holder;
    this.options = options;
    this.isAppended = false;
    this.isShown = false;
    this.currentView = "hours";
    this.isInput = isInput;
    this.input = input;
    this.label = label;
    this.popover = popover;
    this.plate = plate;
    this.hoursView = hoursView;
    this.minutesView = minutesView;
    this.amPmBlock = amPmBlock;
    this.spanHours = popover.find(".clockpicker-span-hours");
    this.spanMinutes = popover.find(".clockpicker-span-minutes");
    this.spanAmPm = popover.find(".clockpicker-span-am-pm");
    this.footer = popover.find(".picker__footer");
    this.amOrPm = "PM";
    if (options.twelvehour) {
      if (!options.ampmclickable) {
        this.spanAmPm.empty();
        $2('<div id="click-am">AM</div>').appendTo(this.spanAmPm);
        $2('<div id="click-pm">PM</div>').appendTo(this.spanAmPm);
      } else {
        this.spanAmPm.empty();
        $2('<div id="click-am">AM</div>').on("click", function() {
          self.spanAmPm.children("#click-am").addClass("text-primary");
          self.spanAmPm.children("#click-pm").removeClass("text-primary");
          self.amOrPm = "AM";
        }).appendTo(this.spanAmPm);
        $2('<div id="click-pm">PM</div>').on("click", function() {
          self.spanAmPm.children("#click-pm").addClass("text-primary");
          self.spanAmPm.children("#click-am").removeClass("text-primary");
          self.amOrPm = "PM";
        }).appendTo(this.spanAmPm);
      }
    }
    $2('<button type="button" class="btn-flat picker__clear" tabindex="' + (options.twelvehour ? "3" : "1") + '">' + options.cleartext + "</button>").click($2.proxy(this.clear, this)).appendTo(this.footer);
    $2('<button type="button" class="btn-flat picker__close" tabindex="' + (options.twelvehour ? "3" : "1") + '">' + options.canceltext + "</button>").click($2.proxy(this.hide, this)).appendTo(this.footer);
    $2('<button type="button" class="btn-flat picker__close" tabindex="' + (options.twelvehour ? "3" : "1") + '">' + options.donetext + "</button>").click($2.proxy(this.done, this)).appendTo(this.footer);
    this.spanHours.click($2.proxy(this.toggleView, this, "hours"));
    this.spanMinutes.click($2.proxy(this.toggleView, this, "minutes"));
    input.on("focus.clockpicker click.clockpicker", $2.proxy(this.show, this));
    var tickTpl = $2('<div class="clockpicker-tick"></div>'), i, tick, radian, radius;
    if (options.twelvehour) {
      for (i = 1; i < 13; i += 1) {
        tick = tickTpl.clone();
        radian = i / 6 * Math.PI;
        radius = outerRadius;
        tick.css({
          left: dialRadius + Math.sin(radian) * radius - tickRadius,
          top: dialRadius - Math.cos(radian) * radius - tickRadius
        });
        tick.html(i === 0 ? "00" : i);
        hoursView.append(tick);
        tick.on(mousedownEvent, mousedown);
      }
    } else {
      for (i = 0; i < 24; i += 1) {
        tick = tickTpl.clone();
        radian = i / 6 * Math.PI;
        var inner = i > 0 && i < 13;
        radius = inner ? innerRadius : outerRadius;
        tick.css({
          left: dialRadius + Math.sin(radian) * radius - tickRadius,
          top: dialRadius - Math.cos(radian) * radius - tickRadius
        });
        tick.html(i === 0 ? "00" : i);
        hoursView.append(tick);
        tick.on(mousedownEvent, mousedown);
      }
    }
    for (i = 0; i < 60; i += 5) {
      tick = tickTpl.clone();
      radian = i / 30 * Math.PI;
      tick.css({
        left: dialRadius + Math.sin(radian) * outerRadius - tickRadius,
        top: dialRadius - Math.cos(radian) * outerRadius - tickRadius
      });
      tick.html(leadingZero(i));
      minutesView.append(tick);
      tick.on(mousedownEvent, mousedown);
    }
    plate.on(mousedownEvent, function(e) {
      if ($2(e.target).closest(".clockpicker-tick").length === 0) {
        mousedown(e, true);
      }
    });
    function mousedown(e, space) {
      var offset = plate.offset(), isTouch = /^touch/.test(e.type), x0 = offset.left + dialRadius, y0 = offset.top + dialRadius, dx = (isTouch ? e.originalEvent.touches[0] : e).pageX - x0, dy = (isTouch ? e.originalEvent.touches[0] : e).pageY - y0, z = Math.sqrt(dx * dx + dy * dy), moved = false;
      if (space && (z < outerRadius - tickRadius || z > outerRadius + tickRadius)) {
        return;
      }
      e.preventDefault();
      var movingTimer = setTimeout(function() {
        self.popover.addClass("clockpicker-moving");
      }, 200);
      self.setHand(dx, dy, !space, true);
      $doc.off(mousemoveEvent).on(mousemoveEvent, function(e2) {
        e2.preventDefault();
        var isTouch2 = /^touch/.test(e2.type), x = (isTouch2 ? e2.originalEvent.touches[0] : e2).pageX - x0, y2 = (isTouch2 ? e2.originalEvent.touches[0] : e2).pageY - y0;
        if (!moved && x === dx && y2 === dy) {
          return;
        }
        moved = true;
        self.setHand(x, y2, false, true);
      });
      $doc.off(mouseupEvent).on(mouseupEvent, function(e2) {
        $doc.off(mouseupEvent);
        e2.preventDefault();
        var isTouch2 = /^touch/.test(e2.type), x = (isTouch2 ? e2.originalEvent.changedTouches[0] : e2).pageX - x0, y2 = (isTouch2 ? e2.originalEvent.changedTouches[0] : e2).pageY - y0;
        if ((space || moved) && x === dx && y2 === dy) {
          self.setHand(x, y2);
        }
        if (self.currentView === "hours") {
          self.toggleView("minutes", duration / 2);
        } else if (options.autoclose) {
          self.minutesView.addClass("clockpicker-dial-out");
          setTimeout(function() {
            self.done();
          }, duration / 2);
        }
        plate.prepend(canvas);
        clearTimeout(movingTimer);
        self.popover.removeClass("clockpicker-moving");
        $doc.off(mousemoveEvent);
      });
    }
    if (svgSupported) {
      var canvas = popover.find(".clockpicker-canvas"), svg = createSvgElement("svg");
      svg.setAttribute("class", "clockpicker-svg");
      svg.setAttribute("width", diameter);
      svg.setAttribute("height", diameter);
      var g = createSvgElement("g");
      g.setAttribute("transform", "translate(" + dialRadius + "," + dialRadius + ")");
      var bearing = createSvgElement("circle");
      bearing.setAttribute("class", "clockpicker-canvas-bearing");
      bearing.setAttribute("cx", 0);
      bearing.setAttribute("cy", 0);
      bearing.setAttribute("r", 4);
      var hand = createSvgElement("line");
      hand.setAttribute("x1", 0);
      hand.setAttribute("y1", 0);
      var bg = createSvgElement("circle");
      bg.setAttribute("class", "clockpicker-canvas-bg");
      bg.setAttribute("r", tickRadius);
      g.appendChild(hand);
      g.appendChild(bg);
      g.appendChild(bearing);
      svg.appendChild(g);
      canvas.append(svg);
      this.hand = hand;
      this.bg = bg;
      this.bearing = bearing;
      this.g = g;
      this.canvas = canvas;
    }
    raiseCallback(this.options.init);
  }
  function raiseCallback(callbackFunction) {
    if (callbackFunction && typeof callbackFunction === "function") callbackFunction();
  }
  ClockPicker.DEFAULTS = {
    "default": "",
    // default time, 'now' or '13:14' e.g.
    fromnow: 0,
    // set default time to * milliseconds from now (using with default = 'now')
    donetext: "Ok",
    // done button text
    cleartext: "Clear",
    canceltext: "Cancel",
    autoclose: false,
    // auto close when minute is selected
    ampmclickable: true,
    // set am/pm button on itself
    darktheme: false,
    // set to dark theme
    twelvehour: true,
    // change to 12 hour AM/PM clock from 24 hour
    vibrate: true
    // vibrate the device when dragging clock hand
  };
  ClockPicker.prototype.toggle = function() {
    this[this.isShown ? "hide" : "show"]();
  };
  ClockPicker.prototype.locate = function() {
    var element = this.element, popover = this.popover, offset = element.offset(), width = element.outerWidth(), height = element.outerHeight(), align = this.options.align, self = this;
    popover.show();
  };
  ClockPicker.prototype.show = function(e) {
    if (this.isShown) {
      return;
    }
    raiseCallback(this.options.beforeShow);
    $2(":input").each(function() {
      $2(this).attr("tabindex", -1);
    });
    var self = this;
    this.input.blur();
    this.popover.addClass("picker--opened");
    this.input.addClass("picker__input picker__input--active");
    $2(document.body).css("overflow", "hidden");
    var value = ((this.input.prop("value") || this.options["default"] || "") + "").split(":");
    if (this.options.twelvehour && !(typeof value[1] === "undefined")) {
      if (value[1].indexOf("AM") > 0) {
        this.amOrPm = "AM";
      } else {
        this.amOrPm = "PM";
      }
      value[1] = value[1].replace("AM", "").replace("PM", "");
    }
    if (value[0] === "now") {
      var now = new Date(+/* @__PURE__ */ new Date() + this.options.fromnow);
      value = [now.getHours(), now.getMinutes()];
      if (this.options.twelvehour) {
        this.amOrPm = value[0] >= 12 && value[0] < 24 ? "PM" : "AM";
      }
    }
    this.hours = +value[0] || 0;
    this.minutes = +value[1] || 0;
    this.spanHours.html(this.hours);
    this.spanMinutes.html(leadingZero(this.minutes));
    if (!this.isAppended) {
      var containerEl = document.querySelector(this.options.container);
      if (this.options.container && containerEl) {
        containerEl.appendChild(this.popover[0]);
      } else {
        this.popover.insertAfter(this.input);
      }
      if (this.options.twelvehour) {
        if (this.amOrPm === "PM") {
          this.spanAmPm.children("#click-pm").addClass("text-primary");
          this.spanAmPm.children("#click-am").removeClass("text-primary");
        } else {
          this.spanAmPm.children("#click-am").addClass("text-primary");
          this.spanAmPm.children("#click-pm").removeClass("text-primary");
        }
      }
      $win.on("resize.clockpicker" + this.id, function() {
        if (self.isShown) {
          self.locate();
        }
      });
      this.isAppended = true;
    }
    this.toggleView("hours");
    this.locate();
    this.isShown = true;
    $doc.on("click.clockpicker." + this.id + " focusin.clockpicker." + this.id, function(e2) {
      var target = $2(e2.target);
      if (target.closest(self.popover.find(".picker__wrap")).length === 0 && target.closest(self.input).length === 0) {
        self.hide();
      }
    });
    $doc.on("keyup.clockpicker." + this.id, function(e2) {
      if (e2.keyCode === 27) {
        self.hide();
      }
    });
    raiseCallback(this.options.afterShow);
  };
  ClockPicker.prototype.hide = function() {
    raiseCallback(this.options.beforeHide);
    this.input.removeClass("picker__input picker__input--active");
    this.popover.removeClass("picker--opened");
    $2(document.body).css("overflow", "visible");
    this.isShown = false;
    $2(":input").each(function(index) {
      $2(this).attr("tabindex", index + 1);
    });
    $doc.off("click.clockpicker." + this.id + " focusin.clockpicker." + this.id);
    $doc.off("keyup.clockpicker." + this.id);
    this.popover.hide();
    raiseCallback(this.options.afterHide);
  };
  ClockPicker.prototype.toggleView = function(view, delay) {
    var raiseAfterHourSelect = false;
    if (view === "minutes" && $2(this.hoursView).css("visibility") === "visible") {
      raiseCallback(this.options.beforeHourSelect);
      raiseAfterHourSelect = true;
    }
    var isHours = view === "hours", nextView = isHours ? this.hoursView : this.minutesView, hideView = isHours ? this.minutesView : this.hoursView;
    this.currentView = view;
    this.spanHours.toggleClass("text-primary", isHours);
    this.spanMinutes.toggleClass("text-primary", !isHours);
    hideView.addClass("clockpicker-dial-out");
    nextView.css("visibility", "visible").removeClass("clockpicker-dial-out");
    this.resetClock(delay);
    clearTimeout(this.toggleViewTimer);
    this.toggleViewTimer = setTimeout(function() {
      hideView.css("visibility", "hidden");
    }, duration);
    if (raiseAfterHourSelect) {
      raiseCallback(this.options.afterHourSelect);
    }
  };
  ClockPicker.prototype.resetClock = function(delay) {
    var view = this.currentView, value = this[view], isHours = view === "hours", unit = Math.PI / (isHours ? 6 : 30), radian = value * unit, radius = isHours && value > 0 && value < 13 ? innerRadius : outerRadius, x = Math.sin(radian) * radius, y2 = -Math.cos(radian) * radius, self = this;
    if (svgSupported && delay) {
      self.canvas.addClass("clockpicker-canvas-out");
      setTimeout(function() {
        self.canvas.removeClass("clockpicker-canvas-out");
        self.setHand(x, y2);
      }, delay);
    } else this.setHand(x, y2);
  };
  ClockPicker.prototype.setHand = function(x, y2, roundBy5, dragging) {
    var radian = Math.atan2(x, -y2), isHours = this.currentView === "hours", unit = Math.PI / (isHours || roundBy5 ? 6 : 30), z = Math.sqrt(x * x + y2 * y2), options = this.options, inner = isHours && z < (outerRadius + innerRadius) / 2, radius = inner ? innerRadius : outerRadius, value;
    if (options.twelvehour) {
      radius = outerRadius;
    }
    if (radian < 0) {
      radian = Math.PI * 2 + radian;
    }
    value = Math.round(radian / unit);
    radian = value * unit;
    if (options.twelvehour) {
      if (isHours) {
        if (value === 0) value = 12;
      } else {
        if (roundBy5) value *= 5;
        if (value === 60) value = 0;
      }
    } else {
      if (isHours) {
        if (value === 12) value = 0;
        value = inner ? value === 0 ? 12 : value : value === 0 ? 0 : value + 12;
      } else {
        if (roundBy5) value *= 5;
        if (value === 60) value = 0;
      }
    }
    if (this[this.currentView] !== value) {
      if (vibrate && this.options.vibrate) {
        if (!this.vibrateTimer) {
          navigator[vibrate](10);
          this.vibrateTimer = setTimeout($2.proxy(function() {
            this.vibrateTimer = null;
          }, this), 100);
        }
      }
    }
    this[this.currentView] = value;
    if (isHours) {
      this["spanHours"].html(value);
    } else {
      this["spanMinutes"].html(leadingZero(value));
    }
    if (!svgSupported) {
      this[isHours ? "hoursView" : "minutesView"].find(".clockpicker-tick").each(function() {
        var tick = $2(this);
        tick.toggleClass("active", value === +tick.html());
      });
      return;
    }
    var cx1 = Math.sin(radian) * (radius - tickRadius), cy1 = -Math.cos(radian) * (radius - tickRadius), cx2 = Math.sin(radian) * radius, cy2 = -Math.cos(radian) * radius;
    this.hand.setAttribute("x2", cx1);
    this.hand.setAttribute("y2", cy1);
    this.bg.setAttribute("cx", cx2);
    this.bg.setAttribute("cy", cy2);
  };
  ClockPicker.prototype.done = function() {
    raiseCallback(this.options.beforeDone);
    this.hide();
    this.label.addClass("active");
    var last = this.input.prop("value"), value = leadingZero(this.hours) + ":" + leadingZero(this.minutes);
    if (this.options.twelvehour) {
      value = value + this.amOrPm;
    }
    this.input.prop("value", value);
    if (value !== last) {
      this.input.triggerHandler("change");
      if (!this.isInput) {
        this.element.trigger("change");
      }
    }
    if (this.options.autoclose) this.input.trigger("blur");
    raiseCallback(this.options.afterDone);
  };
  ClockPicker.prototype.clear = function() {
    this.hide();
    this.label.removeClass("active");
    var last = this.input.prop("value"), value = "";
    this.input.prop("value", value);
    if (value !== last) {
      this.input.triggerHandler("change");
      if (!this.isInput) {
        this.element.trigger("change");
      }
    }
    if (this.options.autoclose) {
      this.input.trigger("blur");
    }
  };
  ClockPicker.prototype.remove = function() {
    this.element.removeData("clockpicker");
    this.input.off("focus.clockpicker click.clockpicker");
    if (this.isShown) {
      this.hide();
    }
    if (this.isAppended) {
      $win.off("resize.clockpicker" + this.id);
      this.popover.remove();
    }
  };
  $2.fn.pickatime = function(option) {
    var args = Array.prototype.slice.call(arguments, 1);
    return this.each(function() {
      var $this = $2(this), data = $this.data("clockpicker");
      if (!data) {
        var options = $2.extend({}, ClockPicker.DEFAULTS, $this.data(), typeof option == "object" && option);
        $this.data("clockpicker", new ClockPicker($this, options));
      } else {
        if (typeof data[option] === "function") {
          data[option].apply(data, args);
        }
      }
    });
  };
})(jQuery);
;
(function($2) {
  $2.fn.characterCounter = function() {
    return this.each(function() {
      var $input = $2(this);
      var $counterElement = $input.parent().find('span[class="character-counter"]');
      if ($counterElement.length) {
        return;
      }
      var itHasLengthAttribute = $input.attr("data-length") !== void 0;
      if (itHasLengthAttribute) {
        $input.on("input", updateCounter);
        $input.on("focus", updateCounter);
        $input.on("blur", removeCounterElement);
        addCounterElement($input);
      }
    });
  };
  function updateCounter() {
    var maxLength = +$2(this).attr("data-length"), actualLength = +$2(this).val().length, isValidLength = actualLength <= maxLength;
    $2(this).parent().find('span[class="character-counter"]').html(actualLength + "/" + maxLength);
    addInputStyle(isValidLength, $2(this));
  }
  function addCounterElement($input) {
    var $counterElement = $input.parent().find('span[class="character-counter"]');
    if ($counterElement.length) {
      return;
    }
    $counterElement = $2("<span/>").addClass("character-counter").css("float", "right").css("font-size", "12px").css("height", 1);
    $input.parent().append($counterElement);
  }
  function removeCounterElement() {
    $2(this).parent().find('span[class="character-counter"]').html("");
  }
  function addInputStyle(isValidLength, $input) {
    var inputHasInvalidClass = $input.hasClass("invalid");
    if (isValidLength && inputHasInvalidClass) {
      $input.removeClass("invalid");
    } else if (!isValidLength && !inputHasInvalidClass) {
      $input.removeClass("valid");
      $input.addClass("invalid");
    }
  }
  $2(document).ready(function() {
    $2("input, textarea").characterCounter();
  });
})(jQuery);
;
(function($2) {
  var methods = {
    init: function(options) {
      var defaults = {
        duration: 200,
        // ms
        dist: -100,
        // zoom scale TODO: make this more intuitive as an option
        shift: 0,
        // spacing for center image
        padding: 0,
        // Padding between non center items
        fullWidth: false,
        // Change to full width styles
        indicators: false,
        // Toggle indicators
        noWrap: false,
        // Don't wrap around and cycle through items.
        onCycleTo: null
        // Callback for when a new slide is cycled to.
      };
      options = $2.extend(defaults, options);
      var namespace = Materialize.objectSelectorString($2(this));
      return this.each(function(i) {
        var images, item_width, item_height, offset, center, pressed, dim, count, reference, referenceY, amplitude, target, velocity, scrolling, xform, frame, timestamp, ticker, dragged, vertical_dragged;
        var $indicators = $2('<ul class="indicators"></ul>');
        var scrollingTimeout = null;
        var oneTimeCallback = null;
        var view = $2(this);
        var hasMultipleSlides = view.find(".carousel-item").length > 1;
        var showIndicators = (view.attr("data-indicators") || options.indicators) && hasMultipleSlides;
        var noWrap = view.attr("data-no-wrap") || options.noWrap || !hasMultipleSlides;
        var uniqueNamespace = view.attr("data-namespace") || namespace + i;
        view.attr("data-namespace", uniqueNamespace);
        var setCarouselHeight = function(imageOnly) {
          var firstSlide = view.find(".carousel-item.active").length ? view.find(".carousel-item.active").first() : view.find(".carousel-item").first();
          var firstImage = firstSlide.find("img").first();
          if (firstImage.length) {
            if (firstImage[0].complete) {
              var imageHeight = firstImage.height();
              if (imageHeight > 0) {
                view.css("height", firstImage.height());
              } else {
                var naturalWidth = firstImage[0].naturalWidth;
                var naturalHeight = firstImage[0].naturalHeight;
                var adjustedHeight = view.width() / naturalWidth * naturalHeight;
                view.css("height", adjustedHeight);
              }
            } else {
              firstImage.on("load", function() {
                view.css("height", $2(this).height());
              });
            }
          } else if (!imageOnly) {
            var slideHeight = firstSlide.height();
            view.css("height", slideHeight);
          }
        };
        if (options.fullWidth) {
          options.dist = 0;
          setCarouselHeight();
          if (showIndicators) {
            view.find(".carousel-fixed-item").addClass("with-indicators");
          }
        }
        if (view.hasClass("initialized")) {
          $2(window).trigger("resize");
          view.trigger("carouselNext", [1e-6]);
          return true;
        }
        view.addClass("initialized");
        pressed = false;
        offset = target = 0;
        images = [];
        item_width = view.find(".carousel-item").first().innerWidth();
        item_height = view.find(".carousel-item").first().innerHeight();
        dim = item_width * 2 + options.padding;
        view.find(".carousel-item").each(function(i2) {
          images.push($2(this)[0]);
          if (showIndicators) {
            var $indicator = $2('<li class="indicator-item"></li>');
            if (i2 === 0) {
              $indicator.addClass("active");
            }
            $indicator.click(function(e) {
              e.stopPropagation();
              var index = $2(this).index();
              cycleTo(index);
            });
            $indicators.append($indicator);
          }
        });
        if (showIndicators) {
          view.append($indicators);
        }
        count = images.length;
        function setupEvents() {
          if (typeof window.ontouchstart !== "undefined") {
            view.on("touchstart.carousel", tap);
            view.on("touchmove.carousel", drag);
            view.on("touchend.carousel", release);
          }
          view.on("mousedown.carousel", tap);
          view.on("mousemove.carousel", drag);
          view.on("mouseup.carousel", release);
          view.on("mouseleave.carousel", release);
          view.on("click.carousel", click);
        }
        function xpos(e) {
          if (e.targetTouches && e.targetTouches.length >= 1) {
            return e.targetTouches[0].clientX;
          }
          return e.clientX;
        }
        function ypos(e) {
          if (e.targetTouches && e.targetTouches.length >= 1) {
            return e.targetTouches[0].clientY;
          }
          return e.clientY;
        }
        function wrap(x) {
          return x >= count ? x % count : x < 0 ? wrap(count + x % count) : x;
        }
        function scroll(x) {
          scrolling = true;
          if (!view.hasClass("scrolling")) {
            view.addClass("scrolling");
          }
          if (scrollingTimeout != null) {
            window.clearTimeout(scrollingTimeout);
          }
          scrollingTimeout = window.setTimeout(function() {
            scrolling = false;
            view.removeClass("scrolling");
          }, options.duration);
          var i2, half, delta, dir, tween, el, alignment, xTranslation;
          var lastCenter = center;
          offset = typeof x === "number" ? x : offset;
          center = Math.floor((offset + dim / 2) / dim);
          delta = offset - center * dim;
          dir = delta < 0 ? 1 : -1;
          tween = -dir * delta * 2 / dim;
          half = count >> 1;
          if (!options.fullWidth) {
            alignment = "translateX(" + (view[0].clientWidth - item_width) / 2 + "px) ";
            alignment += "translateY(" + (view[0].clientHeight - item_height) / 2 + "px)";
          } else {
            alignment = "translateX(0)";
          }
          if (showIndicators) {
            var diff = center % count;
            var activeIndicator = $indicators.find(".indicator-item.active");
            if (activeIndicator.index() !== diff) {
              activeIndicator.removeClass("active");
              $indicators.find(".indicator-item").eq(diff).addClass("active");
            }
          }
          if (!noWrap || center >= 0 && center < count) {
            el = images[wrap(center)];
            if (!$2(el).hasClass("active")) {
              view.find(".carousel-item").removeClass("active");
              $2(el).addClass("active");
            }
            el.style[xform] = alignment + " translateX(" + -delta / 2 + "px) translateX(" + dir * options.shift * tween * i2 + "px) translateZ(" + options.dist * tween + "px)";
            el.style.zIndex = 0;
            if (options.fullWidth) {
              tweenedOpacity = 1;
            } else {
              tweenedOpacity = 1 - 0.2 * tween;
            }
            el.style.opacity = tweenedOpacity;
            el.style.display = "block";
          }
          for (i2 = 1; i2 <= half; ++i2) {
            if (options.fullWidth) {
              zTranslation = options.dist;
              tweenedOpacity = i2 === half && delta < 0 ? 1 - tween : 1;
            } else {
              zTranslation = options.dist * (i2 * 2 + tween * dir);
              tweenedOpacity = 1 - 0.2 * (i2 * 2 + tween * dir);
            }
            if (!noWrap || center + i2 < count) {
              el = images[wrap(center + i2)];
              el.style[xform] = alignment + " translateX(" + (options.shift + (dim * i2 - delta) / 2) + "px) translateZ(" + zTranslation + "px)";
              el.style.zIndex = -i2;
              el.style.opacity = tweenedOpacity;
              el.style.display = "block";
            }
            if (options.fullWidth) {
              zTranslation = options.dist;
              tweenedOpacity = i2 === half && delta > 0 ? 1 - tween : 1;
            } else {
              zTranslation = options.dist * (i2 * 2 - tween * dir);
              tweenedOpacity = 1 - 0.2 * (i2 * 2 - tween * dir);
            }
            if (!noWrap || center - i2 >= 0) {
              el = images[wrap(center - i2)];
              el.style[xform] = alignment + " translateX(" + (-options.shift + (-dim * i2 - delta) / 2) + "px) translateZ(" + zTranslation + "px)";
              el.style.zIndex = -i2;
              el.style.opacity = tweenedOpacity;
              el.style.display = "block";
            }
          }
          if (!noWrap || center >= 0 && center < count) {
            el = images[wrap(center)];
            el.style[xform] = alignment + " translateX(" + -delta / 2 + "px) translateX(" + dir * options.shift * tween + "px) translateZ(" + options.dist * tween + "px)";
            el.style.zIndex = 0;
            if (options.fullWidth) {
              tweenedOpacity = 1;
            } else {
              tweenedOpacity = 1 - 0.2 * tween;
            }
            el.style.opacity = tweenedOpacity;
            el.style.display = "block";
          }
          if (lastCenter !== center && typeof options.onCycleTo === "function") {
            var $curr_item = view.find(".carousel-item").eq(wrap(center));
            options.onCycleTo.call(this, $curr_item, dragged);
          }
          if (typeof oneTimeCallback === "function") {
            oneTimeCallback.call(this, $curr_item, dragged);
            oneTimeCallback = null;
          }
        }
        function track() {
          var now, elapsed, delta, v;
          now = Date.now();
          elapsed = now - timestamp;
          timestamp = now;
          delta = offset - frame;
          frame = offset;
          v = 1e3 * delta / (1 + elapsed);
          velocity = 0.8 * v + 0.2 * velocity;
        }
        function autoScroll() {
          var elapsed, delta;
          if (amplitude) {
            elapsed = Date.now() - timestamp;
            delta = amplitude * Math.exp(-elapsed / options.duration);
            if (delta > 2 || delta < -2) {
              scroll(target - delta);
              requestAnimationFrame(autoScroll);
            } else {
              scroll(target);
            }
          }
        }
        function click(e) {
          if (dragged) {
            e.preventDefault();
            e.stopPropagation();
            return false;
          } else if (!options.fullWidth) {
            var clickedIndex = $2(e.target).closest(".carousel-item").index();
            var diff = wrap(center) - clickedIndex;
            if (diff !== 0) {
              e.preventDefault();
              e.stopPropagation();
            }
            cycleTo(clickedIndex);
          }
        }
        function cycleTo(n) {
          var diff = center % count - n;
          if (!noWrap) {
            if (diff < 0) {
              if (Math.abs(diff + count) < Math.abs(diff)) {
                diff += count;
              }
            } else if (diff > 0) {
              if (Math.abs(diff - count) < diff) {
                diff -= count;
              }
            }
          }
          if (diff < 0) {
            view.trigger("carouselNext", [Math.abs(diff)]);
          } else if (diff > 0) {
            view.trigger("carouselPrev", [diff]);
          }
        }
        function tap(e) {
          if (e.type === "mousedown" && $2(e.target).is("img")) {
            e.preventDefault();
          }
          pressed = true;
          dragged = false;
          vertical_dragged = false;
          reference = xpos(e);
          referenceY = ypos(e);
          velocity = amplitude = 0;
          frame = offset;
          timestamp = Date.now();
          clearInterval(ticker);
          ticker = setInterval(track, 100);
        }
        function drag(e) {
          var x, delta, deltaY;
          if (pressed) {
            x = xpos(e);
            y = ypos(e);
            delta = reference - x;
            deltaY = Math.abs(referenceY - y);
            if (deltaY < 30 && !vertical_dragged) {
              if (delta > 2 || delta < -2) {
                dragged = true;
                reference = x;
                scroll(offset + delta);
              }
            } else if (dragged) {
              e.preventDefault();
              e.stopPropagation();
              return false;
            } else {
              vertical_dragged = true;
            }
          }
          if (dragged) {
            e.preventDefault();
            e.stopPropagation();
            return false;
          }
        }
        function release(e) {
          if (pressed) {
            pressed = false;
          } else {
            return;
          }
          clearInterval(ticker);
          target = offset;
          if (velocity > 10 || velocity < -10) {
            amplitude = 0.9 * velocity;
            target = offset + amplitude;
          }
          target = Math.round(target / dim) * dim;
          if (noWrap) {
            if (target >= dim * (count - 1)) {
              target = dim * (count - 1);
            } else if (target < 0) {
              target = 0;
            }
          }
          amplitude = target - offset;
          timestamp = Date.now();
          requestAnimationFrame(autoScroll);
          if (dragged) {
            e.preventDefault();
            e.stopPropagation();
          }
          return false;
        }
        xform = "transform";
        ["webkit", "Moz", "O", "ms"].every(function(prefix) {
          var e = prefix + "Transform";
          if (typeof document.body.style[e] !== "undefined") {
            xform = e;
            return false;
          }
          return true;
        });
        var throttledResize = Materialize.throttle(function() {
          if (options.fullWidth) {
            item_width = view.find(".carousel-item").first().innerWidth();
            var imageHeight = view.find(".carousel-item.active").height();
            dim = item_width * 2 + options.padding;
            offset = center * 2 * item_width;
            target = offset;
            setCarouselHeight(true);
          } else {
            scroll();
          }
        }, 200);
        $2(window).off("resize.carousel-" + uniqueNamespace).on("resize.carousel-" + uniqueNamespace, throttledResize);
        setupEvents();
        scroll(offset);
        $2(this).on("carouselNext", function(e, n, callback) {
          if (n === void 0) {
            n = 1;
          }
          if (typeof callback === "function") {
            oneTimeCallback = callback;
          }
          target = dim * Math.round(offset / dim) + dim * n;
          if (offset !== target) {
            amplitude = target - offset;
            timestamp = Date.now();
            requestAnimationFrame(autoScroll);
          }
        });
        $2(this).on("carouselPrev", function(e, n, callback) {
          if (n === void 0) {
            n = 1;
          }
          if (typeof callback === "function") {
            oneTimeCallback = callback;
          }
          target = dim * Math.round(offset / dim) - dim * n;
          if (offset !== target) {
            amplitude = target - offset;
            timestamp = Date.now();
            requestAnimationFrame(autoScroll);
          }
        });
        $2(this).on("carouselSet", function(e, n, callback) {
          if (n === void 0) {
            n = 0;
          }
          if (typeof callback === "function") {
            oneTimeCallback = callback;
          }
          cycleTo(n);
        });
      });
    },
    next: function(n, callback) {
      $2(this).trigger("carouselNext", [n, callback]);
    },
    prev: function(n, callback) {
      $2(this).trigger("carouselPrev", [n, callback]);
    },
    set: function(n, callback) {
      $2(this).trigger("carouselSet", [n, callback]);
    },
    destroy: function() {
      var uniqueNamespace = $2(this).attr("data-namespace");
      $2(this).removeAttr("data-namespace");
      $2(this).removeClass("initialized");
      $2(this).find(".indicators").remove();
      $2(this).off("carouselNext carouselPrev carouselSet");
      $2(window).off("resize.carousel-" + uniqueNamespace);
      if (typeof window.ontouchstart !== "undefined") {
        $2(this).off("touchstart.carousel touchmove.carousel touchend.carousel");
      }
      $2(this).off("mousedown.carousel mousemove.carousel mouseup.carousel mouseleave.carousel click.carousel");
    }
  };
  $2.fn.carousel = function(methodOrOptions) {
    if (methods[methodOrOptions]) {
      return methods[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof methodOrOptions === "object" || !methodOrOptions) {
      return methods.init.apply(this, arguments);
    } else {
      $2.error("Method " + methodOrOptions + " does not exist on jQuery.carousel");
    }
  };
})(jQuery);
;
(function($2) {
  var methods = {
    init: function(options) {
      return this.each(function() {
        var origin = $2("#" + $2(this).attr("data-activates"));
        var screen = $2("body");
        var tapTargetEl = $2(this);
        var tapTargetWrapper = tapTargetEl.parent(".tap-target-wrapper");
        var tapTargetWave = tapTargetWrapper.find(".tap-target-wave");
        var tapTargetOriginEl = tapTargetWrapper.find(".tap-target-origin");
        var tapTargetContentEl = tapTargetEl.find(".tap-target-content");
        if (!tapTargetWrapper.length) {
          tapTargetWrapper = tapTargetEl.wrap($2('<div class="tap-target-wrapper"></div>')).parent();
        }
        if (!tapTargetContentEl.length) {
          tapTargetContentEl = $2('<div class="tap-target-content"></div>');
          tapTargetEl.append(tapTargetContentEl);
        }
        if (!tapTargetWave.length) {
          tapTargetWave = $2('<div class="tap-target-wave"></div>');
          if (!tapTargetOriginEl.length) {
            tapTargetOriginEl = origin.clone(true, true);
            tapTargetOriginEl.addClass("tap-target-origin");
            tapTargetOriginEl.removeAttr("id");
            tapTargetOriginEl.removeAttr("style");
            tapTargetWave.append(tapTargetOriginEl);
          }
          tapTargetWrapper.append(tapTargetWave);
        }
        var openTapTarget = function() {
          if (tapTargetWrapper.is(".open")) {
            return;
          }
          tapTargetWrapper.addClass("open");
          setTimeout(function() {
            tapTargetOriginEl.off("click.tapTarget").on("click.tapTarget", function(e) {
              closeTapTarget();
              tapTargetOriginEl.off("click.tapTarget");
            });
            $2(document).off("click.tapTarget").on("click.tapTarget", function(e) {
              closeTapTarget();
              $2(document).off("click.tapTarget");
            });
            var throttledCalc = Materialize.throttle(function() {
              calculateTapTarget();
            }, 200);
            $2(window).off("resize.tapTarget").on("resize.tapTarget", throttledCalc);
          }, 0);
        };
        var closeTapTarget = function() {
          if (!tapTargetWrapper.is(".open")) {
            return;
          }
          tapTargetWrapper.removeClass("open");
          tapTargetOriginEl.off("click.tapTarget");
          $2(document).off("click.tapTarget");
          $2(window).off("resize.tapTarget");
        };
        var calculateTapTarget = function() {
          var isFixed = origin.css("position") === "fixed";
          if (!isFixed) {
            var parents = origin.parents();
            for (var i = 0; i < parents.length; i++) {
              isFixed = $2(parents[i]).css("position") == "fixed";
              if (isFixed) {
                break;
              }
            }
          }
          var originWidth = origin.outerWidth();
          var originHeight = origin.outerHeight();
          var originTop = isFixed ? origin.offset().top - $2(document).scrollTop() : origin.offset().top;
          var originLeft = isFixed ? origin.offset().left - $2(document).scrollLeft() : origin.offset().left;
          var windowWidth = $2(window).width();
          var windowHeight = $2(window).height();
          var centerX = windowWidth / 2;
          var centerY = windowHeight / 2;
          var isLeft = originLeft <= centerX;
          var isRight = originLeft > centerX;
          var isTop = originTop <= centerY;
          var isBottom = originTop > centerY;
          var isCenterX = originLeft >= windowWidth * 0.25 && originLeft <= windowWidth * 0.75;
          var isCenterY = originTop >= windowHeight * 0.25 && originTop <= windowHeight * 0.75;
          var tapTargetWidth = tapTargetEl.outerWidth();
          var tapTargetHeight = tapTargetEl.outerHeight();
          var tapTargetTop = originTop + originHeight / 2 - tapTargetHeight / 2;
          var tapTargetLeft = originLeft + originWidth / 2 - tapTargetWidth / 2;
          var tapTargetPosition = isFixed ? "fixed" : "absolute";
          var tapTargetTextWidth = isCenterX ? tapTargetWidth : tapTargetWidth / 2 + originWidth;
          var tapTargetTextHeight = tapTargetHeight / 2;
          var tapTargetTextTop = isTop ? tapTargetHeight / 2 : 0;
          var tapTargetTextBottom = 0;
          var tapTargetTextLeft = isLeft && !isCenterX ? tapTargetWidth / 2 - originWidth : 0;
          var tapTargetTextRight = 0;
          var tapTargetTextPadding = originWidth;
          var tapTargetTextAlign = isBottom ? "bottom" : "top";
          var tapTargetWaveWidth = originWidth > originHeight ? originWidth * 2 : originWidth * 2;
          var tapTargetWaveHeight = tapTargetWaveWidth;
          var tapTargetWaveTop = tapTargetHeight / 2 - tapTargetWaveHeight / 2;
          var tapTargetWaveLeft = tapTargetWidth / 2 - tapTargetWaveWidth / 2;
          var tapTargetWrapperCssObj = {};
          tapTargetWrapperCssObj.top = isTop ? tapTargetTop : "";
          tapTargetWrapperCssObj.right = isRight ? windowWidth - tapTargetLeft - tapTargetWidth : "";
          tapTargetWrapperCssObj.bottom = isBottom ? windowHeight - tapTargetTop - tapTargetHeight : "";
          tapTargetWrapperCssObj.left = isLeft ? tapTargetLeft : "";
          tapTargetWrapperCssObj.position = tapTargetPosition;
          tapTargetWrapper.css(tapTargetWrapperCssObj);
          tapTargetContentEl.css({
            width: tapTargetTextWidth,
            height: tapTargetTextHeight,
            top: tapTargetTextTop,
            right: tapTargetTextRight,
            bottom: tapTargetTextBottom,
            left: tapTargetTextLeft,
            padding: tapTargetTextPadding,
            verticalAlign: tapTargetTextAlign
          });
          tapTargetWave.css({
            top: tapTargetWaveTop,
            left: tapTargetWaveLeft,
            width: tapTargetWaveWidth,
            height: tapTargetWaveHeight
          });
        };
        if (options == "open") {
          calculateTapTarget();
          openTapTarget();
        }
        if (options == "close") closeTapTarget();
      });
    },
    open: function() {
    },
    close: function() {
    }
  };
  $2.fn.tapTarget = function(methodOrOptions) {
    if (methods[methodOrOptions] || typeof methodOrOptions === "object") return methods.init.apply(this, arguments);
    $2.error("Method " + methodOrOptions + " does not exist on jQuery.tap-target");
  };
})(jQuery);
