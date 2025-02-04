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
(function(global2, factory) {
  "use strict";
  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = global2.document ? factory(global2, true) : function(w) {
      if (!w.document) {
        throw new Error("jQuery requires a window with a document");
      }
      return factory(w);
    };
  } else {
    factory(global2);
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
    var options, name2, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
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
        for (name2 in options) {
          copy = options[name2];
          if (name2 === "__proto__" || target === copy) {
            continue;
          }
          if (deep && copy && (jQuery2.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
            src = target[name2];
            if (copyIsArray && !Array.isArray(src)) {
              clone = [];
            } else if (!copyIsArray && !jQuery2.isPlainObject(src)) {
              clone = {};
            } else {
              clone = src;
            }
            copyIsArray = false;
            target[name2] = jQuery2.extend(deep, clone, copy);
          } else if (copy !== void 0) {
            target[name2] = copy;
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
      var name2;
      for (name2 in obj) {
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
    function(_i, name2) {
      class2type["[object " + name2 + "]"] = name2.toLowerCase();
    }
  );
  function isArrayLike(obj) {
    var length = !!obj && "length" in obj && obj.length, type = toType(obj);
    if (isFunction(obj) || isWindow(obj)) {
      return false;
    }
    return type === "array" || length === 0 || typeof length === "number" && length > 0 && length - 1 in obj;
  }
  function nodeName(elem, name2) {
    return elem.nodeName && elem.nodeName.toLowerCase() === name2.toLowerCase();
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
        Expr.filter.ID = function(id) {
          var attrId = id.replace(runescape, funescape);
          return function(elem) {
            return elem.getAttribute("id") === attrId;
          };
        };
        Expr.find.ID = function(id, context) {
          if (typeof context.getElementById !== "undefined" && documentIsHTML) {
            var elem = context.getElementById(id);
            return elem ? [elem] : [];
          }
        };
      } else {
        Expr.filter.ID = function(id) {
          var attrId = id.replace(runescape, funescape);
          return function(elem) {
            var node2 = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
            return node2 && node2.value === attrId;
          };
        };
        Expr.find.ID = function(id, context) {
          if (typeof context.getElementById !== "undefined" && documentIsHTML) {
            var node2, i2, elems, elem = context.getElementById(id);
            if (elem) {
              node2 = elem.getAttributeNode("id");
              if (node2 && node2.value === id) {
                return [elem];
              }
              elems = context.getElementsByName(id);
              i2 = 0;
              while (elem = elems[i2++]) {
                node2 = elem.getAttributeNode("id");
                if (node2 && node2.value === id) {
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
    find.attr = function(elem, name2) {
      if ((elem.ownerDocument || elem) != document3) {
        setDocument(elem);
      }
      var fn = Expr.attrHandle[name2.toLowerCase()], val = fn && hasOwn.call(Expr.attrHandle, name2.toLowerCase()) ? fn(elem, name2, !documentIsHTML) : void 0;
      if (val !== void 0) {
        return val;
      }
      return elem.getAttribute(name2);
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
        ATTR: function(name2, operator, check) {
          return function(elem) {
            var result = find.attr(elem, name2);
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
            var cache, outerCache, node, nodeIndex, start, dir2 = simple !== forward ? "nextSibling" : "previousSibling", parent = elem.parentNode, name2 = ofType && elem.nodeName.toLowerCase(), useCache = !xml && !ofType, diff = false;
            if (parent) {
              if (simple) {
                while (dir2) {
                  node = elem;
                  while (node = node[dir2]) {
                    if (ofType ? nodeName(node, name2) : node.nodeType === 1) {
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
                    if ((ofType ? nodeName(node, name2) : node.nodeType === 1) && ++diff) {
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
  }, function(name2, fn) {
    jQuery2.fn[name2] = function(until, selector) {
      var matched = jQuery2.map(this, fn, until);
      if (name2.slice(-5) !== "Until") {
        selector = until;
      }
      if (selector && typeof selector === "string") {
        matched = jQuery2.filter(selector, matched);
      }
      if (this.length > 1) {
        if (!guaranteedUnique[name2]) {
          jQuery2.uniqueSort(matched);
        }
        if (rparentsprev.test(name2)) {
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
    var name2;
    if (data === void 0 && elem.nodeType === 1) {
      name2 = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
      data = elem.getAttribute(name2);
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
    data: function(elem, name2, data) {
      return dataUser.access(elem, name2, data);
    },
    removeData: function(elem, name2) {
      dataUser.remove(elem, name2);
    },
    // TODO: Now that all calls to _data and _removeData have been replaced
    // with direct calls to dataPriv methods, these can be deprecated.
    _data: function(elem, name2, data) {
      return dataPriv.access(elem, name2, data);
    },
    _removeData: function(elem, name2) {
      dataPriv.remove(elem, name2);
    }
  });
  jQuery2.fn.extend({
    data: function(key, value) {
      var i, name2, data, elem = this[0], attrs = elem && elem.attributes;
      if (key === void 0) {
        if (this.length) {
          data = dataUser.get(elem);
          if (elem.nodeType === 1 && !dataPriv.get(elem, "hasDataAttrs")) {
            i = attrs.length;
            while (i--) {
              if (attrs[i]) {
                name2 = attrs[i].name;
                if (name2.indexOf("data-") === 0) {
                  name2 = camelCase(name2.slice(5));
                  dataAttr(elem, name2, data[name2]);
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
    addProp: function(name2, hook) {
      Object.defineProperty(jQuery2.Event.prototype, name2, {
        enumerable: true,
        configurable: true,
        get: isFunction(hook) ? function() {
          if (this.originalEvent) {
            return hook(this.originalEvent);
          }
        } : function() {
          if (this.originalEvent) {
            return this.originalEvent[name2];
          }
        },
        set: function(value) {
          Object.defineProperty(this, name2, {
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
  }, function(name2, original) {
    jQuery2.fn[name2] = function(selector) {
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
    var ret, name2, old = {};
    for (name2 in options) {
      old[name2] = elem.style[name2];
      elem.style[name2] = options[name2];
    }
    ret = callback.call(elem);
    for (name2 in options) {
      elem.style[name2] = old[name2];
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
  function curCSS(elem, name2, computed) {
    var width, minWidth, maxWidth, ret, isCustomProp = rcustomProp.test(name2), style = elem.style;
    computed = computed || getStyles(elem);
    if (computed) {
      ret = computed.getPropertyValue(name2) || computed[name2];
      if (isCustomProp && ret) {
        ret = ret.replace(rtrimCSS, "$1") || void 0;
      }
      if (ret === "" && !isAttached(elem)) {
        ret = jQuery2.style(elem, name2);
      }
      if (!support.pixelBoxStyles() && rnumnonpx.test(ret) && rboxStyle.test(name2)) {
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
  function vendorPropName(name2) {
    var capName = name2[0].toUpperCase() + name2.slice(1), i = cssPrefixes.length;
    while (i--) {
      name2 = cssPrefixes[i] + capName;
      if (name2 in emptyStyle) {
        return name2;
      }
    }
  }
  function finalPropName(name2) {
    var final = jQuery2.cssProps[name2] || vendorProps[name2];
    if (final) {
      return final;
    }
    if (name2 in emptyStyle) {
      return name2;
    }
    return vendorProps[name2] = vendorPropName(name2) || name2;
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
    style: function(elem, name2, value, extra) {
      if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
        return;
      }
      var ret, type, hooks, origName = camelCase(name2), isCustomProp = rcustomProp.test(name2), style = elem.style;
      if (!isCustomProp) {
        name2 = finalPropName(origName);
      }
      hooks = jQuery2.cssHooks[name2] || jQuery2.cssHooks[origName];
      if (value !== void 0) {
        type = typeof value;
        if (type === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
          value = adjustCSS(elem, name2, ret);
          type = "number";
        }
        if (value == null || value !== value) {
          return;
        }
        if (type === "number" && !isCustomProp) {
          value += ret && ret[3] || (jQuery2.cssNumber[origName] ? "" : "px");
        }
        if (!support.clearCloneStyle && value === "" && name2.indexOf("background") === 0) {
          style[name2] = "inherit";
        }
        if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== void 0) {
          if (isCustomProp) {
            style.setProperty(name2, value);
          } else {
            style[name2] = value;
          }
        }
      } else {
        if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== void 0) {
          return ret;
        }
        return style[name2];
      }
    },
    css: function(elem, name2, extra, styles) {
      var val, num, hooks, origName = camelCase(name2), isCustomProp = rcustomProp.test(name2);
      if (!isCustomProp) {
        name2 = finalPropName(origName);
      }
      hooks = jQuery2.cssHooks[name2] || jQuery2.cssHooks[origName];
      if (hooks && "get" in hooks) {
        val = hooks.get(elem, true, extra);
      }
      if (val === void 0) {
        val = curCSS(elem, name2, styles);
      }
      if (val === "normal" && name2 in cssNormalTransform) {
        val = cssNormalTransform[name2];
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
    css: function(name2, value) {
      return access(this, function(elem, name3, value2) {
        var styles, len, map = {}, i = 0;
        if (Array.isArray(name3)) {
          styles = getStyles(elem);
          len = name3.length;
          for (; i < len; i++) {
            map[name3[i]] = jQuery2.css(elem, name3[i], false, styles);
          }
          return map;
        }
        return value2 !== void 0 ? jQuery2.style(elem, name3, value2) : jQuery2.css(elem, name3);
      }, name2, value, arguments.length > 1);
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
    var index, name2, easing, value, hooks;
    for (index in props) {
      name2 = camelCase(index);
      easing = specialEasing[name2];
      value = props[index];
      if (Array.isArray(value)) {
        easing = value[1];
        value = props[index] = value[0];
      }
      if (index !== name2) {
        props[name2] = value;
        delete props[index];
      }
      hooks = jQuery2.cssHooks[name2];
      if (hooks && "expand" in hooks) {
        value = hooks.expand(value);
        delete props[name2];
        for (index in value) {
          if (!(index in props)) {
            props[index] = value[index];
            specialEasing[index] = easing;
          }
        }
      } else {
        specialEasing[name2] = easing;
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
  jQuery2.each(["toggle", "show", "hide"], function(_i, name2) {
    var cssFn = jQuery2.fn[name2];
    jQuery2.fn[name2] = function(speed, easing, callback) {
      return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name2, true), speed, easing, callback);
    };
  });
  jQuery2.each({
    slideDown: genFx("show"),
    slideUp: genFx("hide"),
    slideToggle: genFx("toggle"),
    fadeIn: { opacity: "show" },
    fadeOut: { opacity: "hide" },
    fadeToggle: { opacity: "toggle" }
  }, function(name2, props) {
    jQuery2.fn[name2] = function(speed, easing, callback) {
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
    attr: function(name2, value) {
      return access(this, jQuery2.attr, name2, value, arguments.length > 1);
    },
    removeAttr: function(name2) {
      return this.each(function() {
        jQuery2.removeAttr(this, name2);
      });
    }
  });
  jQuery2.extend({
    attr: function(elem, name2, value) {
      var ret, hooks, nType = elem.nodeType;
      if (nType === 3 || nType === 8 || nType === 2) {
        return;
      }
      if (typeof elem.getAttribute === "undefined") {
        return jQuery2.prop(elem, name2, value);
      }
      if (nType !== 1 || !jQuery2.isXMLDoc(elem)) {
        hooks = jQuery2.attrHooks[name2.toLowerCase()] || (jQuery2.expr.match.bool.test(name2) ? boolHook : void 0);
      }
      if (value !== void 0) {
        if (value === null) {
          jQuery2.removeAttr(elem, name2);
          return;
        }
        if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name2)) !== void 0) {
          return ret;
        }
        elem.setAttribute(name2, value + "");
        return value;
      }
      if (hooks && "get" in hooks && (ret = hooks.get(elem, name2)) !== null) {
        return ret;
      }
      ret = jQuery2.find.attr(elem, name2);
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
      var name2, i = 0, attrNames = value && value.match(rnothtmlwhite);
      if (attrNames && elem.nodeType === 1) {
        while (name2 = attrNames[i++]) {
          elem.removeAttribute(name2);
        }
      }
    }
  });
  boolHook = {
    set: function(elem, value, name2) {
      if (value === false) {
        jQuery2.removeAttr(elem, name2);
      } else {
        elem.setAttribute(name2, name2);
      }
      return name2;
    }
  };
  jQuery2.each(jQuery2.expr.match.bool.source.match(/\w+/g), function(_i, name2) {
    var getter = attrHandle[name2] || jQuery2.find.attr;
    attrHandle[name2] = function(elem, name3, isXML) {
      var ret, handle, lowercaseName = name3.toLowerCase();
      if (!isXML) {
        handle = attrHandle[lowercaseName];
        attrHandle[lowercaseName] = ret;
        ret = getter(elem, name3, isXML) != null ? lowercaseName : null;
        attrHandle[lowercaseName] = handle;
      }
      return ret;
    };
  });
  var rfocusable = /^(?:input|select|textarea|button)$/i, rclickable = /^(?:a|area)$/i;
  jQuery2.fn.extend({
    prop: function(name2, value) {
      return access(this, jQuery2.prop, name2, value, arguments.length > 1);
    },
    removeProp: function(name2) {
      return this.each(function() {
        delete this[jQuery2.propFix[name2] || name2];
      });
    }
  });
  jQuery2.extend({
    prop: function(elem, name2, value) {
      var ret, hooks, nType = elem.nodeType;
      if (nType === 3 || nType === 8 || nType === 2) {
        return;
      }
      if (nType !== 1 || !jQuery2.isXMLDoc(elem)) {
        name2 = jQuery2.propFix[name2] || name2;
        hooks = jQuery2.propHooks[name2];
      }
      if (value !== void 0) {
        if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name2)) !== void 0) {
          return ret;
        }
        return elem[name2] = value;
      }
      if (hooks && "get" in hooks && (ret = hooks.get(elem, name2)) !== null) {
        return ret;
      }
      return elem[name2];
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
    var name2;
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
      for (name2 in obj) {
        buildParams(prefix + "[" + name2 + "]", obj[name2], traditional, add);
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
        setRequestHeader: function(name2, value) {
          if (completed2 == null) {
            name2 = requestHeadersNames[name2.toLowerCase()] = requestHeadersNames[name2.toLowerCase()] || name2;
            requestHeaders[name2] = value;
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
  jQuery2.each({ Height: "height", Width: "width" }, function(name2, type) {
    jQuery2.each({
      padding: "inner" + name2,
      content: type,
      "": "outer" + name2
    }, function(defaultExtra, funcName) {
      jQuery2.fn[funcName] = function(margin, value) {
        var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"), extra = defaultExtra || (margin === true || value === true ? "margin" : "border");
        return access(this, function(elem, type2, value2) {
          var doc;
          if (isWindow(elem)) {
            return funcName.indexOf("outer") === 0 ? elem["inner" + name2] : elem.document.documentElement["client" + name2];
          }
          if (elem.nodeType === 9) {
            doc = elem.documentElement;
            return Math.max(
              elem.body["scroll" + name2],
              doc["scroll" + name2],
              elem.body["offset" + name2],
              doc["offset" + name2],
              doc["client" + name2]
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
    function(_i, name2) {
      jQuery2.fn[name2] = function(data, fn) {
        return arguments.length > 0 ? this.on(name2, null, data, fn) : this.trigger(name2);
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
 * Materialize v1.0.0 (http://materializecss.com)
 * Copyright 2014-2017 Materialize
 * MIT License (https://raw.githubusercontent.com/Dogfalo/materialize/master/LICENSE)
 */
var _get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);
  if (desc === void 0) {
    var parent = Object.getPrototypeOf(object);
    if (parent === null) {
      return void 0;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;
    if (getter === void 0) {
      return void 0;
    }
    return getter.call(receiver);
  }
};
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
function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
/*! cash-dom 1.3.5, https://github.com/kenwheeler/cash @license MIT */
(function(factory) {
  window.cash = factory();
})(function() {
  var doc = document, win = window, ArrayProto = Array.prototype, slice = ArrayProto.slice, filter = ArrayProto.filter, push = ArrayProto.push;
  var noop = function() {
  }, isFunction = function(item) {
    return typeof item === typeof noop && item.call;
  }, isString = function(item) {
    return typeof item === "string";
  };
  var idMatch = /^#[\w-]*$/, classMatch = /^\.[\w-]*$/, htmlMatch = /<.+>/, singlet = /^\w+$/;
  function find(selector, context) {
    context = context || doc;
    var elems = classMatch.test(selector) ? context.getElementsByClassName(selector.slice(1)) : singlet.test(selector) ? context.getElementsByTagName(selector) : context.querySelectorAll(selector);
    return elems;
  }
  var frag;
  function parseHTML(str) {
    if (!frag) {
      frag = doc.implementation.createHTMLDocument(null);
      var base = frag.createElement("base");
      base.href = doc.location.href;
      frag.head.appendChild(base);
    }
    frag.body.innerHTML = str;
    return frag.body.childNodes;
  }
  function onReady(fn2) {
    if (doc.readyState !== "loading") {
      fn2();
    } else {
      doc.addEventListener("DOMContentLoaded", fn2);
    }
  }
  function Init(selector, context) {
    if (!selector) {
      return this;
    }
    if (selector.cash && selector !== win) {
      return selector;
    }
    var elems = selector, i = 0, length;
    if (isString(selector)) {
      elems = idMatch.test(selector) ? (
        // If an ID use the faster getElementById check
        doc.getElementById(selector.slice(1))
      ) : htmlMatch.test(selector) ? (
        // If HTML, parse it into real elements
        parseHTML(selector)
      ) : (
        // else use `find`
        find(selector, context)
      );
    } else if (isFunction(selector)) {
      onReady(selector);
      return this;
    }
    if (!elems) {
      return this;
    }
    if (elems.nodeType || elems === win) {
      this[0] = elems;
      this.length = 1;
    } else {
      length = this.length = elems.length;
      for (; i < length; i++) {
        this[i] = elems[i];
      }
    }
    return this;
  }
  function cash2(selector, context) {
    return new Init(selector, context);
  }
  var fn = cash2.fn = cash2.prototype = Init.prototype = {
    // jshint ignore:line
    cash: true,
    length: 0,
    push,
    splice: ArrayProto.splice,
    map: ArrayProto.map,
    init: Init
  };
  Object.defineProperty(fn, "constructor", { value: cash2 });
  cash2.parseHTML = parseHTML;
  cash2.noop = noop;
  cash2.isFunction = isFunction;
  cash2.isString = isString;
  cash2.extend = fn.extend = function(target) {
    target = target || {};
    var args = slice.call(arguments), length = args.length, i = 1;
    if (args.length === 1) {
      target = this;
      i = 0;
    }
    for (; i < length; i++) {
      if (!args[i]) {
        continue;
      }
      for (var key in args[i]) {
        if (args[i].hasOwnProperty(key)) {
          target[key] = args[i][key];
        }
      }
    }
    return target;
  };
  function each(collection, callback) {
    var l = collection.length, i = 0;
    for (; i < l; i++) {
      if (callback.call(collection[i], collection[i], i, collection) === false) {
        break;
      }
    }
  }
  function matches(el, selector) {
    var m = el && (el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector || el.oMatchesSelector);
    return !!m && m.call(el, selector);
  }
  function getCompareFunction(selector) {
    return (
      /* Use browser's `matches` function if string */
      isString(selector) ? matches : (
        /* Match a cash element */
        selector.cash ? function(el) {
          return selector.is(el);
        } : (
          /* Direct comparison */
          function(el, selector2) {
            return el === selector2;
          }
        )
      )
    );
  }
  function unique(collection) {
    return cash2(slice.call(collection).filter(function(item, index, self) {
      return self.indexOf(item) === index;
    }));
  }
  cash2.extend({
    merge: function(first, second) {
      var len = +second.length, i = first.length, j = 0;
      for (; j < len; i++, j++) {
        first[i] = second[j];
      }
      first.length = i;
      return first;
    },
    each,
    matches,
    unique,
    isArray: Array.isArray,
    isNumeric: function(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }
  });
  var uid = cash2.uid = "_cash" + Date.now();
  function getDataCache(node) {
    return node[uid] = node[uid] || {};
  }
  function setData(node, key, value) {
    return getDataCache(node)[key] = value;
  }
  function getData(node, key) {
    var c = getDataCache(node);
    if (c[key] === void 0) {
      c[key] = node.dataset ? node.dataset[key] : cash2(node).attr("data-" + key);
    }
    return c[key];
  }
  function removeData(node, key) {
    var c = getDataCache(node);
    if (c) {
      delete c[key];
    } else if (node.dataset) {
      delete node.dataset[key];
    } else {
      cash2(node).removeAttr("data-" + name);
    }
  }
  fn.extend({
    data: function(name2, value) {
      if (isString(name2)) {
        return value === void 0 ? getData(this[0], name2) : this.each(function(v) {
          return setData(v, name2, value);
        });
      }
      for (var key in name2) {
        this.data(key, name2[key]);
      }
      return this;
    },
    removeData: function(key) {
      return this.each(function(v) {
        return removeData(v, key);
      });
    }
  });
  var notWhiteMatch = /\S+/g;
  function getClasses(c) {
    return isString(c) && c.match(notWhiteMatch);
  }
  function hasClass(v, c) {
    return v.classList ? v.classList.contains(c) : new RegExp("(^| )" + c + "( |$)", "gi").test(v.className);
  }
  function addClass(v, c, spacedName) {
    if (v.classList) {
      v.classList.add(c);
    } else if (spacedName.indexOf(" " + c + " ")) {
      v.className += " " + c;
    }
  }
  function removeClass(v, c) {
    if (v.classList) {
      v.classList.remove(c);
    } else {
      v.className = v.className.replace(c, "");
    }
  }
  fn.extend({
    addClass: function(c) {
      var classes = getClasses(c);
      return classes ? this.each(function(v) {
        var spacedName = " " + v.className + " ";
        each(classes, function(c2) {
          addClass(v, c2, spacedName);
        });
      }) : this;
    },
    attr: function(name2, value) {
      if (!name2) {
        return void 0;
      }
      if (isString(name2)) {
        if (value === void 0) {
          return this[0] ? this[0].getAttribute ? this[0].getAttribute(name2) : this[0][name2] : void 0;
        }
        return this.each(function(v) {
          if (v.setAttribute) {
            v.setAttribute(name2, value);
          } else {
            v[name2] = value;
          }
        });
      }
      for (var key in name2) {
        this.attr(key, name2[key]);
      }
      return this;
    },
    hasClass: function(c) {
      var check = false, classes = getClasses(c);
      if (classes && classes.length) {
        this.each(function(v) {
          check = hasClass(v, classes[0]);
          return !check;
        });
      }
      return check;
    },
    prop: function(name2, value) {
      if (isString(name2)) {
        return value === void 0 ? this[0][name2] : this.each(function(v) {
          v[name2] = value;
        });
      }
      for (var key in name2) {
        this.prop(key, name2[key]);
      }
      return this;
    },
    removeAttr: function(name2) {
      return this.each(function(v) {
        if (v.removeAttribute) {
          v.removeAttribute(name2);
        } else {
          delete v[name2];
        }
      });
    },
    removeClass: function(c) {
      if (!arguments.length) {
        return this.attr("class", "");
      }
      var classes = getClasses(c);
      return classes ? this.each(function(v) {
        each(classes, function(c2) {
          removeClass(v, c2);
        });
      }) : this;
    },
    removeProp: function(name2) {
      return this.each(function(v) {
        delete v[name2];
      });
    },
    toggleClass: function(c, state) {
      if (state !== void 0) {
        return this[state ? "addClass" : "removeClass"](c);
      }
      var classes = getClasses(c);
      return classes ? this.each(function(v) {
        var spacedName = " " + v.className + " ";
        each(classes, function(c2) {
          if (hasClass(v, c2)) {
            removeClass(v, c2);
          } else {
            addClass(v, c2, spacedName);
          }
        });
      }) : this;
    }
  });
  fn.extend({
    add: function(selector, context) {
      return unique(cash2.merge(this, cash2(selector, context)));
    },
    each: function(callback) {
      each(this, callback);
      return this;
    },
    eq: function(index) {
      return cash2(this.get(index));
    },
    filter: function(selector) {
      if (!selector) {
        return this;
      }
      var comparator = isFunction(selector) ? selector : getCompareFunction(selector);
      return cash2(filter.call(this, function(e) {
        return comparator(e, selector);
      }));
    },
    first: function() {
      return this.eq(0);
    },
    get: function(index) {
      if (index === void 0) {
        return slice.call(this);
      }
      return index < 0 ? this[index + this.length] : this[index];
    },
    index: function(elem) {
      var child = elem ? cash2(elem)[0] : this[0], collection = elem ? this : cash2(child).parent().children();
      return slice.call(collection).indexOf(child);
    },
    last: function() {
      return this.eq(-1);
    }
  });
  var camelCase = /* @__PURE__ */ function() {
    var camelRegex = /(?:^\w|[A-Z]|\b\w)/g, whiteSpace = /[\s-_]+/g;
    return function(str) {
      return str.replace(camelRegex, function(letter, index) {
        return letter[index === 0 ? "toLowerCase" : "toUpperCase"]();
      }).replace(whiteSpace, "");
    };
  }();
  var getPrefixedProp = function() {
    var cache = {}, doc2 = document, div = doc2.createElement("div"), style = div.style;
    return function(prop) {
      prop = camelCase(prop);
      if (cache[prop]) {
        return cache[prop];
      }
      var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1), prefixes = ["webkit", "moz", "ms", "o"], props = (prop + " " + prefixes.join(ucProp + " ") + ucProp).split(" ");
      each(props, function(p) {
        if (p in style) {
          cache[p] = prop = cache[prop] = p;
          return false;
        }
      });
      return cache[prop];
    };
  }();
  cash2.prefixedProp = getPrefixedProp;
  cash2.camelCase = camelCase;
  fn.extend({
    css: function(prop, value) {
      if (isString(prop)) {
        prop = getPrefixedProp(prop);
        return arguments.length > 1 ? this.each(function(v) {
          return v.style[prop] = value;
        }) : win.getComputedStyle(this[0])[prop];
      }
      for (var key in prop) {
        this.css(key, prop[key]);
      }
      return this;
    }
  });
  function compute(el, prop) {
    return parseInt(win.getComputedStyle(el[0], null)[prop], 10) || 0;
  }
  each(["Width", "Height"], function(v) {
    var lower = v.toLowerCase();
    fn[lower] = function() {
      return this[0].getBoundingClientRect()[lower];
    };
    fn["inner" + v] = function() {
      return this[0]["client" + v];
    };
    fn["outer" + v] = function(margins) {
      return this[0]["offset" + v] + (margins ? compute(this, "margin" + (v === "Width" ? "Left" : "Top")) + compute(this, "margin" + (v === "Width" ? "Right" : "Bottom")) : 0);
    };
  });
  function registerEvent(node, eventName, callback) {
    var eventCache = getData(node, "_cashEvents") || setData(node, "_cashEvents", {});
    eventCache[eventName] = eventCache[eventName] || [];
    eventCache[eventName].push(callback);
    node.addEventListener(eventName, callback);
  }
  function removeEvent(node, eventName, callback) {
    var events = getData(node, "_cashEvents"), eventCache = events && events[eventName], index;
    if (!eventCache) {
      return;
    }
    if (callback) {
      node.removeEventListener(eventName, callback);
      index = eventCache.indexOf(callback);
      if (index >= 0) {
        eventCache.splice(index, 1);
      }
    } else {
      each(eventCache, function(event) {
        node.removeEventListener(eventName, event);
      });
      eventCache = [];
    }
  }
  fn.extend({
    off: function(eventName, callback) {
      return this.each(function(v) {
        return removeEvent(v, eventName, callback);
      });
    },
    on: function(eventName, delegate, callback, runOnce) {
      var originalCallback;
      if (!isString(eventName)) {
        for (var key in eventName) {
          this.on(key, delegate, eventName[key]);
        }
        return this;
      }
      if (isFunction(delegate)) {
        callback = delegate;
        delegate = null;
      }
      if (eventName === "ready") {
        onReady(callback);
        return this;
      }
      if (delegate) {
        originalCallback = callback;
        callback = function(e) {
          var t = e.target;
          while (!matches(t, delegate)) {
            if (t === this || t === null) {
              return t = false;
            }
            t = t.parentNode;
          }
          if (t) {
            originalCallback.call(t, e);
          }
        };
      }
      return this.each(function(v) {
        var finalCallback = callback;
        if (runOnce) {
          finalCallback = function() {
            callback.apply(this, arguments);
            removeEvent(v, eventName, finalCallback);
          };
        }
        registerEvent(v, eventName, finalCallback);
      });
    },
    one: function(eventName, delegate, callback) {
      return this.on(eventName, delegate, callback, true);
    },
    ready: onReady,
    /**
     * Modified
     * Triggers browser event
     * @param String eventName
     * @param Object data - Add properties to event object
     */
    trigger: function(eventName, data) {
      if (document.createEvent) {
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent(eventName, true, false);
        evt = this.extend(evt, data);
        return this.each(function(v) {
          return v.dispatchEvent(evt);
        });
      }
    }
  });
  function encode(name2, value) {
    return "&" + encodeURIComponent(name2) + "=" + encodeURIComponent(value).replace(/%20/g, "+");
  }
  function getSelectMultiple_(el) {
    var values = [];
    each(el.options, function(o) {
      if (o.selected) {
        values.push(o.value);
      }
    });
    return values.length ? values : null;
  }
  function getSelectSingle_(el) {
    var selectedIndex = el.selectedIndex;
    return selectedIndex >= 0 ? el.options[selectedIndex].value : null;
  }
  function getValue(el) {
    var type = el.type;
    if (!type) {
      return null;
    }
    switch (type.toLowerCase()) {
      case "select-one":
        return getSelectSingle_(el);
      case "select-multiple":
        return getSelectMultiple_(el);
      case "radio":
        return el.checked ? el.value : null;
      case "checkbox":
        return el.checked ? el.value : null;
      default:
        return el.value ? el.value : null;
    }
  }
  fn.extend({
    serialize: function() {
      var query = "";
      each(this[0].elements || this, function(el) {
        if (el.disabled || el.tagName === "FIELDSET") {
          return;
        }
        var name2 = el.name;
        switch (el.type.toLowerCase()) {
          case "file":
          case "reset":
          case "submit":
          case "button":
            break;
          case "select-multiple":
            var values = getValue(el);
            if (values !== null) {
              each(values, function(value2) {
                query += encode(name2, value2);
              });
            }
            break;
          default:
            var value = getValue(el);
            if (value !== null) {
              query += encode(name2, value);
            }
        }
      });
      return query.substr(1);
    },
    val: function(value) {
      if (value === void 0) {
        return getValue(this[0]);
      }
      return this.each(function(v) {
        return v.value = value;
      });
    }
  });
  function insertElement(el, child, prepend) {
    if (prepend) {
      var first = el.childNodes[0];
      el.insertBefore(child, first);
    } else {
      el.appendChild(child);
    }
  }
  function insertContent(parent, child, prepend) {
    var str = isString(child);
    if (!str && child.length) {
      each(child, function(v) {
        return insertContent(parent, v, prepend);
      });
      return;
    }
    each(parent, str ? function(v) {
      return v.insertAdjacentHTML(prepend ? "afterbegin" : "beforeend", child);
    } : function(v, i) {
      return insertElement(v, i === 0 ? child : child.cloneNode(true), prepend);
    });
  }
  fn.extend({
    after: function(selector) {
      cash2(selector).insertAfter(this);
      return this;
    },
    append: function(content) {
      insertContent(this, content);
      return this;
    },
    appendTo: function(parent) {
      insertContent(cash2(parent), this);
      return this;
    },
    before: function(selector) {
      cash2(selector).insertBefore(this);
      return this;
    },
    clone: function() {
      return cash2(this.map(function(v) {
        return v.cloneNode(true);
      }));
    },
    empty: function() {
      this.html("");
      return this;
    },
    html: function(content) {
      if (content === void 0) {
        return this[0].innerHTML;
      }
      var source = content.nodeType ? content[0].outerHTML : content;
      return this.each(function(v) {
        return v.innerHTML = source;
      });
    },
    insertAfter: function(selector) {
      var _this = this;
      cash2(selector).each(function(el, i) {
        var parent = el.parentNode, sibling = el.nextSibling;
        _this.each(function(v) {
          parent.insertBefore(i === 0 ? v : v.cloneNode(true), sibling);
        });
      });
      return this;
    },
    insertBefore: function(selector) {
      var _this2 = this;
      cash2(selector).each(function(el, i) {
        var parent = el.parentNode;
        _this2.each(function(v) {
          parent.insertBefore(i === 0 ? v : v.cloneNode(true), el);
        });
      });
      return this;
    },
    prepend: function(content) {
      insertContent(this, content, true);
      return this;
    },
    prependTo: function(parent) {
      insertContent(cash2(parent), this, true);
      return this;
    },
    remove: function() {
      return this.each(function(v) {
        if (!!v.parentNode) {
          return v.parentNode.removeChild(v);
        }
      });
    },
    text: function(content) {
      if (content === void 0) {
        return this[0].textContent;
      }
      return this.each(function(v) {
        return v.textContent = content;
      });
    }
  });
  var docEl = doc.documentElement;
  fn.extend({
    position: function() {
      var el = this[0];
      return {
        left: el.offsetLeft,
        top: el.offsetTop
      };
    },
    offset: function() {
      var rect = this[0].getBoundingClientRect();
      return {
        top: rect.top + win.pageYOffset - docEl.clientTop,
        left: rect.left + win.pageXOffset - docEl.clientLeft
      };
    },
    offsetParent: function() {
      return cash2(this[0].offsetParent);
    }
  });
  fn.extend({
    children: function(selector) {
      var elems = [];
      this.each(function(el) {
        push.apply(elems, el.children);
      });
      elems = unique(elems);
      return !selector ? elems : elems.filter(function(v) {
        return matches(v, selector);
      });
    },
    closest: function(selector) {
      if (!selector || this.length < 1) {
        return cash2();
      }
      if (this.is(selector)) {
        return this.filter(selector);
      }
      return this.parent().closest(selector);
    },
    is: function(selector) {
      if (!selector) {
        return false;
      }
      var match = false, comparator = getCompareFunction(selector);
      this.each(function(el) {
        match = comparator(el, selector);
        return !match;
      });
      return match;
    },
    find: function(selector) {
      if (!selector || selector.nodeType) {
        return cash2(selector && this.has(selector).length ? selector : null);
      }
      var elems = [];
      this.each(function(el) {
        push.apply(elems, find(selector, el));
      });
      return unique(elems);
    },
    has: function(selector) {
      var comparator = isString(selector) ? function(el) {
        return find(selector, el).length !== 0;
      } : function(el) {
        return el.contains(selector);
      };
      return this.filter(comparator);
    },
    next: function() {
      return cash2(this[0].nextElementSibling);
    },
    not: function(selector) {
      if (!selector) {
        return this;
      }
      var comparator = getCompareFunction(selector);
      return this.filter(function(el) {
        return !comparator(el, selector);
      });
    },
    parent: function() {
      var result = [];
      this.each(function(item) {
        if (item && item.parentNode) {
          result.push(item.parentNode);
        }
      });
      return unique(result);
    },
    parents: function(selector) {
      var last, result = [];
      this.each(function(item) {
        last = item;
        while (last && last.parentNode && last !== doc.body.parentNode) {
          last = last.parentNode;
          if (!selector || selector && matches(last, selector)) {
            result.push(last);
          }
        }
      });
      return unique(result);
    },
    prev: function() {
      return cash2(this[0].previousElementSibling);
    },
    siblings: function(selector) {
      var collection = this.parent().children(selector), el = this[0];
      return collection.filter(function(i) {
        return i !== el;
      });
    }
  });
  return cash2;
});
;
var Component = function() {
  function Component2(classDef, el, options) {
    _classCallCheck(this, Component2);
    if (!(el instanceof Element)) {
      console.error(Error(el + " is not an HTML Element"));
    }
    var ins = classDef.getInstance(el);
    if (!!ins) {
      ins.destroy();
    }
    this.el = el;
    this.$el = cash(el);
  }
  _createClass(Component2, null, [{
    key: "init",
    value: function init(classDef, els, options) {
      var instances = null;
      if (els instanceof Element) {
        instances = new classDef(els, options);
      } else if (!!els && (els.jquery || els.cash || els instanceof NodeList)) {
        var instancesArr = [];
        for (var i = 0; i < els.length; i++) {
          instancesArr.push(new classDef(els[i], options));
        }
        instances = instancesArr;
      }
      return instances;
    }
  }]);
  return Component2;
}();
;
(function(window2) {
  if (window2.Package) {
    M = {};
  } else {
    window2.M = {};
  }
  M.jQueryLoaded = !!window2.jQuery;
})(window);
if (typeof define === "function" && define.amd) {
  define("M", [], function() {
    return M;
  });
} else if (typeof exports !== "undefined" && !exports.nodeType) {
  if (typeof module !== "undefined" && !module.nodeType && module.exports) {
    exports = module.exports = M;
  }
  exports.default = M;
}
M.version = "1.0.0";
M.keys = {
  TAB: 9,
  ENTER: 13,
  ESC: 27,
  ARROW_UP: 38,
  ARROW_DOWN: 40
};
M.tabPressed = false;
M.keyDown = false;
var docHandleKeydown = function(e) {
  M.keyDown = true;
  if (e.which === M.keys.TAB || e.which === M.keys.ARROW_DOWN || e.which === M.keys.ARROW_UP) {
    M.tabPressed = true;
  }
};
var docHandleKeyup = function(e) {
  M.keyDown = false;
  if (e.which === M.keys.TAB || e.which === M.keys.ARROW_DOWN || e.which === M.keys.ARROW_UP) {
    M.tabPressed = false;
  }
};
var docHandleFocus = function(e) {
  if (M.keyDown) {
    document.body.classList.add("keyboard-focused");
  }
};
var docHandleBlur = function(e) {
  document.body.classList.remove("keyboard-focused");
};
document.addEventListener("keydown", docHandleKeydown, true);
document.addEventListener("keyup", docHandleKeyup, true);
document.addEventListener("focus", docHandleFocus, true);
document.addEventListener("blur", docHandleBlur, true);
M.initializeJqueryWrapper = function(plugin, pluginName, classRef) {
  jQuery.fn[pluginName] = function(methodOrOptions) {
    if (plugin.prototype[methodOrOptions]) {
      var params = Array.prototype.slice.call(arguments, 1);
      if (methodOrOptions.slice(0, 3) === "get") {
        var instance = this.first()[0][classRef];
        return instance[methodOrOptions].apply(instance, params);
      }
      return this.each(function() {
        var instance2 = this[classRef];
        instance2[methodOrOptions].apply(instance2, params);
      });
    } else if (typeof methodOrOptions === "object" || !methodOrOptions) {
      plugin.init(this, arguments[0]);
      return this;
    }
    jQuery.error("Method " + methodOrOptions + " does not exist on jQuery." + pluginName);
  };
};
M.AutoInit = function(context) {
  var root = !!context ? context : document.body;
  var registry = {
    Autocomplete: root.querySelectorAll(".autocomplete:not(.no-autoinit)"),
    Carousel: root.querySelectorAll(".carousel:not(.no-autoinit)"),
    Chips: root.querySelectorAll(".chips:not(.no-autoinit)"),
    Collapsible: root.querySelectorAll(".collapsible:not(.no-autoinit)"),
    Datepicker: root.querySelectorAll(".datepicker:not(.no-autoinit)"),
    Dropdown: root.querySelectorAll(".dropdown-trigger:not(.no-autoinit)"),
    Materialbox: root.querySelectorAll(".materialboxed:not(.no-autoinit)"),
    Modal: root.querySelectorAll(".modal:not(.no-autoinit)"),
    Parallax: root.querySelectorAll(".parallax:not(.no-autoinit)"),
    Pushpin: root.querySelectorAll(".pushpin:not(.no-autoinit)"),
    ScrollSpy: root.querySelectorAll(".scrollspy:not(.no-autoinit)"),
    FormSelect: root.querySelectorAll("select:not(.no-autoinit)"),
    Sidenav: root.querySelectorAll(".sidenav:not(.no-autoinit)"),
    Tabs: root.querySelectorAll(".tabs:not(.no-autoinit)"),
    TapTarget: root.querySelectorAll(".tap-target:not(.no-autoinit)"),
    Timepicker: root.querySelectorAll(".timepicker:not(.no-autoinit)"),
    Tooltip: root.querySelectorAll(".tooltipped:not(.no-autoinit)"),
    FloatingActionButton: root.querySelectorAll(".fixed-action-btn:not(.no-autoinit)")
  };
  for (var pluginName in registry) {
    var plugin = M[pluginName];
    plugin.init(registry[pluginName]);
  }
};
M.objectSelectorString = function(obj) {
  var tagStr = obj.prop("tagName") || "";
  var idStr = obj.attr("id") || "";
  var classStr = obj.attr("class") || "";
  return (tagStr + idStr + classStr).replace(/\s/g, "");
};
M.guid = /* @__PURE__ */ function() {
  function s4() {
    return Math.floor((1 + Math.random()) * 65536).toString(16).substring(1);
  }
  return function() {
    return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
  };
}();
M.escapeHash = function(hash) {
  return hash.replace(/(:|\.|\[|\]|,|=|\/)/g, "\\$1");
};
M.elementOrParentIsFixed = function(element) {
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
M.checkWithinContainer = function(container, bounding, offset) {
  var edges = {
    top: false,
    right: false,
    bottom: false,
    left: false
  };
  var containerRect = container.getBoundingClientRect();
  var containerBottom = container === document.body ? Math.max(containerRect.bottom, window.innerHeight) : containerRect.bottom;
  var scrollLeft = container.scrollLeft;
  var scrollTop = container.scrollTop;
  var scrolledX = bounding.left - scrollLeft;
  var scrolledY = bounding.top - scrollTop;
  if (scrolledX < containerRect.left + offset || scrolledX < offset) {
    edges.left = true;
  }
  if (scrolledX + bounding.width > containerRect.right - offset || scrolledX + bounding.width > window.innerWidth - offset) {
    edges.right = true;
  }
  if (scrolledY < containerRect.top + offset || scrolledY < offset) {
    edges.top = true;
  }
  if (scrolledY + bounding.height > containerBottom - offset || scrolledY + bounding.height > window.innerHeight - offset) {
    edges.bottom = true;
  }
  return edges;
};
M.checkPossibleAlignments = function(el, container, bounding, offset) {
  var canAlign = {
    top: true,
    right: true,
    bottom: true,
    left: true,
    spaceOnTop: null,
    spaceOnRight: null,
    spaceOnBottom: null,
    spaceOnLeft: null
  };
  var containerAllowsOverflow = getComputedStyle(container).overflow === "visible";
  var containerRect = container.getBoundingClientRect();
  var containerHeight = Math.min(containerRect.height, window.innerHeight);
  var containerWidth = Math.min(containerRect.width, window.innerWidth);
  var elOffsetRect = el.getBoundingClientRect();
  var scrollLeft = container.scrollLeft;
  var scrollTop = container.scrollTop;
  var scrolledX = bounding.left - scrollLeft;
  var scrolledYTopEdge = bounding.top - scrollTop;
  var scrolledYBottomEdge = bounding.top + elOffsetRect.height - scrollTop;
  canAlign.spaceOnRight = !containerAllowsOverflow ? containerWidth - (scrolledX + bounding.width) : window.innerWidth - (elOffsetRect.left + bounding.width);
  if (canAlign.spaceOnRight < 0) {
    canAlign.left = false;
  }
  canAlign.spaceOnLeft = !containerAllowsOverflow ? scrolledX - bounding.width + elOffsetRect.width : elOffsetRect.right - bounding.width;
  if (canAlign.spaceOnLeft < 0) {
    canAlign.right = false;
  }
  canAlign.spaceOnBottom = !containerAllowsOverflow ? containerHeight - (scrolledYTopEdge + bounding.height + offset) : window.innerHeight - (elOffsetRect.top + bounding.height + offset);
  if (canAlign.spaceOnBottom < 0) {
    canAlign.top = false;
  }
  canAlign.spaceOnTop = !containerAllowsOverflow ? scrolledYBottomEdge - (bounding.height - offset) : elOffsetRect.bottom - (bounding.height + offset);
  if (canAlign.spaceOnTop < 0) {
    canAlign.bottom = false;
  }
  return canAlign;
};
M.getOverflowParent = function(element) {
  if (element == null) {
    return null;
  }
  if (element === document.body || getComputedStyle(element).overflow !== "visible") {
    return element;
  }
  return M.getOverflowParent(element.parentElement);
};
M.getIdFromTrigger = function(trigger) {
  var id = trigger.getAttribute("data-target");
  if (!id) {
    id = trigger.getAttribute("href");
    if (id) {
      id = id.slice(1);
    } else {
      id = "";
    }
  }
  return id;
};
M.getDocumentScrollTop = function() {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
};
M.getDocumentScrollLeft = function() {
  return window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
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
M.throttle = function(func, wait, options) {
  var context = void 0, args = void 0, result = void 0;
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
;
var $jscomp = { scope: {} };
$jscomp.defineProperty = "function" == typeof Object.defineProperties ? Object.defineProperty : function(e, r, p) {
  if (p.get || p.set) throw new TypeError("ES3 does not support getters and setters.");
  e != Array.prototype && e != Object.prototype && (e[r] = p.value);
};
$jscomp.getGlobal = function(e) {
  return "undefined" != typeof window && window === e ? e : "undefined" != typeof global && null != global ? global : e;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function() {
  $jscomp.initSymbol = function() {
  };
  $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol);
};
$jscomp.symbolCounter_ = 0;
$jscomp.Symbol = function(e) {
  return $jscomp.SYMBOL_PREFIX + (e || "") + $jscomp.symbolCounter_++;
};
$jscomp.initSymbolIterator = function() {
  $jscomp.initSymbol();
  var e = $jscomp.global.Symbol.iterator;
  e || (e = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
  "function" != typeof Array.prototype[e] && $jscomp.defineProperty(Array.prototype, e, { configurable: true, writable: true, value: function() {
    return $jscomp.arrayIterator(this);
  } });
  $jscomp.initSymbolIterator = function() {
  };
};
$jscomp.arrayIterator = function(e) {
  var r = 0;
  return $jscomp.iteratorPrototype(function() {
    return r < e.length ? { done: false, value: e[r++] } : { done: true };
  });
};
$jscomp.iteratorPrototype = function(e) {
  $jscomp.initSymbolIterator();
  e = { next: e };
  e[$jscomp.global.Symbol.iterator] = function() {
    return this;
  };
  return e;
};
$jscomp.array = $jscomp.array || {};
$jscomp.iteratorFromArray = function(e, r) {
  $jscomp.initSymbolIterator();
  e instanceof String && (e += "");
  var p = 0, m = { next: function() {
    if (p < e.length) {
      var u = p++;
      return { value: r(u, e[u]), done: false };
    }
    m.next = function() {
      return { done: true, value: void 0 };
    };
    return m.next();
  } };
  m[Symbol.iterator] = function() {
    return m;
  };
  return m;
};
$jscomp.polyfill = function(e, r, p, m) {
  if (r) {
    p = $jscomp.global;
    e = e.split(".");
    for (m = 0; m < e.length - 1; m++) {
      var u = e[m];
      u in p || (p[u] = {});
      p = p[u];
    }
    e = e[e.length - 1];
    m = p[e];
    r = r(m);
    r != m && null != r && $jscomp.defineProperty(p, e, { configurable: true, writable: true, value: r });
  }
};
$jscomp.polyfill("Array.prototype.keys", function(e) {
  return e ? e : function() {
    return $jscomp.iteratorFromArray(this, function(e2) {
      return e2;
    });
  };
}, "es6-impl", "es3");
var $jscomp$this = this;
(function(r) {
  M.anime = r();
})(function() {
  function e(a) {
    if (!h.col(a)) try {
      return document.querySelectorAll(a);
    } catch (c) {
    }
  }
  function r(a, c) {
    for (var d = a.length, b = 2 <= arguments.length ? arguments[1] : void 0, f = [], n = 0; n < d; n++) {
      if (n in a) {
        var k = a[n];
        c.call(b, k, n, a) && f.push(k);
      }
    }
    return f;
  }
  function p(a) {
    return a.reduce(function(a2, d) {
      return a2.concat(h.arr(d) ? p(d) : d);
    }, []);
  }
  function m(a) {
    if (h.arr(a)) return a;
    h.str(a) && (a = e(a) || a);
    return a instanceof NodeList || a instanceof HTMLCollection ? [].slice.call(a) : [a];
  }
  function u(a, c) {
    return a.some(function(a2) {
      return a2 === c;
    });
  }
  function C(a) {
    var c = {}, d;
    for (d in a) {
      c[d] = a[d];
    }
    return c;
  }
  function D(a, c) {
    var d = C(a), b;
    for (b in a) {
      d[b] = c.hasOwnProperty(b) ? c[b] : a[b];
    }
    return d;
  }
  function z(a, c) {
    var d = C(a), b;
    for (b in c) {
      d[b] = h.und(a[b]) ? c[b] : a[b];
    }
    return d;
  }
  function T(a) {
    a = a.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function(a2, c2, d2, k) {
      return c2 + c2 + d2 + d2 + k + k;
    });
    var c = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);
    a = parseInt(c[1], 16);
    var d = parseInt(c[2], 16), c = parseInt(c[3], 16);
    return "rgba(" + a + "," + d + "," + c + ",1)";
  }
  function U(a) {
    function c(a2, c2, b2) {
      0 > b2 && (b2 += 1);
      1 < b2 && --b2;
      return b2 < 1 / 6 ? a2 + 6 * (c2 - a2) * b2 : 0.5 > b2 ? c2 : b2 < 2 / 3 ? a2 + (c2 - a2) * (2 / 3 - b2) * 6 : a2;
    }
    var d = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(a) || /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(a);
    a = parseInt(d[1]) / 360;
    var b = parseInt(d[2]) / 100, f = parseInt(d[3]) / 100, d = d[4] || 1;
    if (0 == b) f = b = a = f;
    else {
      var n = 0.5 > f ? f * (1 + b) : f + b - f * b, k = 2 * f - n, f = c(k, n, a + 1 / 3), b = c(k, n, a);
      a = c(k, n, a - 1 / 3);
    }
    return "rgba(" + 255 * f + "," + 255 * b + "," + 255 * a + "," + d + ")";
  }
  function y(a) {
    if (a = /([\+\-]?[0-9#\.]+)(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(a)) return a[2];
  }
  function V(a) {
    if (-1 < a.indexOf("translate") || "perspective" === a) return "px";
    if (-1 < a.indexOf("rotate") || -1 < a.indexOf("skew")) return "deg";
  }
  function I(a, c) {
    return h.fnc(a) ? a(c.target, c.id, c.total) : a;
  }
  function E(a, c) {
    if (c in a.style) return getComputedStyle(a).getPropertyValue(c.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()) || "0";
  }
  function J(a, c) {
    if (h.dom(a) && u(W, c)) return "transform";
    if (h.dom(a) && (a.getAttribute(c) || h.svg(a) && a[c])) return "attribute";
    if (h.dom(a) && "transform" !== c && E(a, c)) return "css";
    if (null != a[c]) return "object";
  }
  function X(a, c) {
    var d = V(c), d = -1 < c.indexOf("scale") ? 1 : 0 + d;
    a = a.style.transform;
    if (!a) return d;
    for (var b = [], f = [], n = [], k = /(\w+)\((.+?)\)/g; b = k.exec(a); ) {
      f.push(b[1]), n.push(b[2]);
    }
    a = r(n, function(a2, b2) {
      return f[b2] === c;
    });
    return a.length ? a[0] : d;
  }
  function K(a, c) {
    switch (J(a, c)) {
      case "transform":
        return X(a, c);
      case "css":
        return E(a, c);
      case "attribute":
        return a.getAttribute(c);
    }
    return a[c] || 0;
  }
  function L(a, c) {
    var d = /^(\*=|\+=|-=)/.exec(a);
    if (!d) return a;
    var b = y(a) || 0;
    c = parseFloat(c);
    a = parseFloat(a.replace(d[0], ""));
    switch (d[0][0]) {
      case "+":
        return c + a + b;
      case "-":
        return c - a + b;
      case "*":
        return c * a + b;
    }
  }
  function F(a, c) {
    return Math.sqrt(Math.pow(c.x - a.x, 2) + Math.pow(c.y - a.y, 2));
  }
  function M2(a) {
    a = a.points;
    for (var c = 0, d, b = 0; b < a.numberOfItems; b++) {
      var f = a.getItem(b);
      0 < b && (c += F(d, f));
      d = f;
    }
    return c;
  }
  function N(a) {
    if (a.getTotalLength) return a.getTotalLength();
    switch (a.tagName.toLowerCase()) {
      case "circle":
        return 2 * Math.PI * a.getAttribute("r");
      case "rect":
        return 2 * a.getAttribute("width") + 2 * a.getAttribute("height");
      case "line":
        return F({ x: a.getAttribute("x1"), y: a.getAttribute("y1") }, { x: a.getAttribute("x2"), y: a.getAttribute("y2") });
      case "polyline":
        return M2(a);
      case "polygon":
        var c = a.points;
        return M2(a) + F(c.getItem(c.numberOfItems - 1), c.getItem(0));
    }
  }
  function Y(a, c) {
    function d(b2) {
      b2 = void 0 === b2 ? 0 : b2;
      return a.el.getPointAtLength(1 <= c + b2 ? c + b2 : 0);
    }
    var b = d(), f = d(-1), n = d(1);
    switch (a.property) {
      case "x":
        return b.x;
      case "y":
        return b.y;
      case "angle":
        return 180 * Math.atan2(n.y - f.y, n.x - f.x) / Math.PI;
    }
  }
  function O(a, c) {
    var d = /-?\d*\.?\d+/g, b;
    b = h.pth(a) ? a.totalLength : a;
    if (h.col(b)) {
      if (h.rgb(b)) {
        var f = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(b);
        b = f ? "rgba(" + f[1] + ",1)" : b;
      } else b = h.hex(b) ? T(b) : h.hsl(b) ? U(b) : void 0;
    } else f = (f = y(b)) ? b.substr(0, b.length - f.length) : b, b = c && !/\s/g.test(b) ? f + c : f;
    b += "";
    return { original: b, numbers: b.match(d) ? b.match(d).map(Number) : [0], strings: h.str(a) || c ? b.split(d) : [] };
  }
  function P(a) {
    a = a ? p(h.arr(a) ? a.map(m) : m(a)) : [];
    return r(a, function(a2, d, b) {
      return b.indexOf(a2) === d;
    });
  }
  function Z(a) {
    var c = P(a);
    return c.map(function(a2, b) {
      return { target: a2, id: b, total: c.length };
    });
  }
  function aa(a, c) {
    var d = C(c);
    if (h.arr(a)) {
      var b = a.length;
      2 !== b || h.obj(a[0]) ? h.fnc(c.duration) || (d.duration = c.duration / b) : a = { value: a };
    }
    return m(a).map(function(a2, b2) {
      b2 = b2 ? 0 : c.delay;
      a2 = h.obj(a2) && !h.pth(a2) ? a2 : { value: a2 };
      h.und(a2.delay) && (a2.delay = b2);
      return a2;
    }).map(function(a2) {
      return z(a2, d);
    });
  }
  function ba(a, c) {
    var d = {}, b;
    for (b in a) {
      var f = I(a[b], c);
      h.arr(f) && (f = f.map(function(a2) {
        return I(a2, c);
      }), 1 === f.length && (f = f[0]));
      d[b] = f;
    }
    d.duration = parseFloat(d.duration);
    d.delay = parseFloat(d.delay);
    return d;
  }
  function ca(a) {
    return h.arr(a) ? A.apply(this, a) : Q[a];
  }
  function da(a, c) {
    var d;
    return a.tweens.map(function(b) {
      b = ba(b, c);
      var f = b.value, e2 = K(c.target, a.name), k = d ? d.to.original : e2, k = h.arr(f) ? f[0] : k, w = L(h.arr(f) ? f[1] : f, k), e2 = y(w) || y(k) || y(e2);
      b.from = O(k, e2);
      b.to = O(w, e2);
      b.start = d ? d.end : a.offset;
      b.end = b.start + b.delay + b.duration;
      b.easing = ca(b.easing);
      b.elasticity = (1e3 - Math.min(Math.max(b.elasticity, 1), 999)) / 1e3;
      b.isPath = h.pth(f);
      b.isColor = h.col(b.from.original);
      b.isColor && (b.round = 1);
      return d = b;
    });
  }
  function ea(a, c) {
    return r(p(a.map(function(a2) {
      return c.map(function(b) {
        var c2 = J(a2.target, b.name);
        if (c2) {
          var d = da(b, a2);
          b = { type: c2, property: b.name, animatable: a2, tweens: d, duration: d[d.length - 1].end, delay: d[0].delay };
        } else b = void 0;
        return b;
      });
    })), function(a2) {
      return !h.und(a2);
    });
  }
  function R(a, c, d, b) {
    var f = "delay" === a;
    return c.length ? (f ? Math.min : Math.max).apply(Math, c.map(function(b2) {
      return b2[a];
    })) : f ? b.delay : d.offset + b.delay + b.duration;
  }
  function fa(a) {
    var c = D(ga, a), d = D(S, a), b = Z(a.targets), f = [], e2 = z(c, d), k;
    for (k in a) {
      e2.hasOwnProperty(k) || "targets" === k || f.push({ name: k, offset: e2.offset, tweens: aa(a[k], d) });
    }
    a = ea(b, f);
    return z(c, { children: [], animatables: b, animations: a, duration: R("duration", a, c, d), delay: R("delay", a, c, d) });
  }
  function q(a) {
    function c() {
      return window.Promise && new Promise(function(a2) {
        return p2 = a2;
      });
    }
    function d(a2) {
      return g.reversed ? g.duration - a2 : a2;
    }
    function b(a2) {
      for (var b2 = 0, c2 = {}, d2 = g.animations, f2 = d2.length; b2 < f2; ) {
        var e3 = d2[b2], k2 = e3.animatable, h3 = e3.tweens, n = h3.length - 1, l2 = h3[n];
        n && (l2 = r(h3, function(b3) {
          return a2 < b3.end;
        })[0] || l2);
        for (var h3 = Math.min(Math.max(a2 - l2.start - l2.delay, 0), l2.duration) / l2.duration, w = isNaN(h3) ? 1 : l2.easing(h3, l2.elasticity), h3 = l2.to.strings, p3 = l2.round, n = [], m3 = void 0, m3 = l2.to.numbers.length, t2 = 0; t2 < m3; t2++) {
          var x = void 0, x = l2.to.numbers[t2], q2 = l2.from.numbers[t2], x = l2.isPath ? Y(l2.value, w * x) : q2 + w * (x - q2);
          p3 && (l2.isColor && 2 < t2 || (x = Math.round(x * p3) / p3));
          n.push(x);
        }
        if (l2 = h3.length) for (m3 = h3[0], w = 0; w < l2; w++) {
          p3 = h3[w + 1], t2 = n[w], isNaN(t2) || (m3 = p3 ? m3 + (t2 + p3) : m3 + (t2 + " "));
        }
        else m3 = n[0];
        ha[e3.type](k2.target, e3.property, m3, c2, k2.id);
        e3.currentValue = m3;
        b2++;
      }
      if (b2 = Object.keys(c2).length) for (d2 = 0; d2 < b2; d2++) {
        H || (H = E(document.body, "transform") ? "transform" : "-webkit-transform"), g.animatables[d2].target.style[H] = c2[d2].join(" ");
      }
      g.currentTime = a2;
      g.progress = a2 / g.duration * 100;
    }
    function f(a2) {
      if (g[a2]) g[a2](g);
    }
    function e2() {
      g.remaining && true !== g.remaining && g.remaining--;
    }
    function k(a2) {
      var k2 = g.duration, n = g.offset, w = n + g.delay, r2 = g.currentTime, x = g.reversed, q2 = d(a2);
      if (g.children.length) {
        var u2 = g.children, v2 = u2.length;
        if (q2 >= g.currentTime) for (var G = 0; G < v2; G++) {
          u2[G].seek(q2);
        }
        else for (; v2--; ) {
          u2[v2].seek(q2);
        }
      }
      if (q2 >= w || !k2) g.began || (g.began = true, f("begin")), f("run");
      if (q2 > n && q2 < k2) b(q2);
      else if (q2 <= n && 0 !== r2 && (b(0), x && e2()), q2 >= k2 && r2 !== k2 || !k2) b(k2), x || e2();
      f("update");
      a2 >= k2 && (g.remaining ? (t = h2, "alternate" === g.direction && (g.reversed = !g.reversed)) : (g.pause(), g.completed || (g.completed = true, f("complete"), "Promise" in window && (p2(), m2 = c()))), l = 0);
    }
    a = void 0 === a ? {} : a;
    var h2, t, l = 0, p2 = null, m2 = c(), g = fa(a);
    g.reset = function() {
      var a2 = g.direction, c2 = g.loop;
      g.currentTime = 0;
      g.progress = 0;
      g.paused = true;
      g.began = false;
      g.completed = false;
      g.reversed = "reverse" === a2;
      g.remaining = "alternate" === a2 && 1 === c2 ? 2 : c2;
      b(0);
      for (a2 = g.children.length; a2--; ) {
        g.children[a2].reset();
      }
    };
    g.tick = function(a2) {
      h2 = a2;
      t || (t = h2);
      k((l + h2 - t) * q.speed);
    };
    g.seek = function(a2) {
      k(d(a2));
    };
    g.pause = function() {
      var a2 = v.indexOf(g);
      -1 < a2 && v.splice(a2, 1);
      g.paused = true;
    };
    g.play = function() {
      g.paused && (g.paused = false, t = 0, l = d(g.currentTime), v.push(g), B || ia());
    };
    g.reverse = function() {
      g.reversed = !g.reversed;
      t = 0;
      l = d(g.currentTime);
    };
    g.restart = function() {
      g.pause();
      g.reset();
      g.play();
    };
    g.finished = m2;
    g.reset();
    g.autoplay && g.play();
    return g;
  }
  var ga = { update: void 0, begin: void 0, run: void 0, complete: void 0, loop: 1, direction: "normal", autoplay: true, offset: 0 }, S = { duration: 1e3, delay: 0, easing: "easeOutElastic", elasticity: 500, round: 0 }, W = "translateX translateY translateZ rotate rotateX rotateY rotateZ scale scaleX scaleY scaleZ skewX skewY perspective".split(" "), H, h = {
    arr: function(a) {
      return Array.isArray(a);
    },
    obj: function(a) {
      return -1 < Object.prototype.toString.call(a).indexOf("Object");
    },
    pth: function(a) {
      return h.obj(a) && a.hasOwnProperty("totalLength");
    },
    svg: function(a) {
      return a instanceof SVGElement;
    },
    dom: function(a) {
      return a.nodeType || h.svg(a);
    },
    str: function(a) {
      return "string" === typeof a;
    },
    fnc: function(a) {
      return "function" === typeof a;
    },
    und: function(a) {
      return "undefined" === typeof a;
    },
    hex: function(a) {
      return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a);
    },
    rgb: function(a) {
      return /^rgb/.test(a);
    },
    hsl: function(a) {
      return /^hsl/.test(a);
    },
    col: function(a) {
      return h.hex(a) || h.rgb(a) || h.hsl(a);
    }
  }, A = /* @__PURE__ */ function() {
    function a(a2, d, b) {
      return (((1 - 3 * b + 3 * d) * a2 + (3 * b - 6 * d)) * a2 + 3 * d) * a2;
    }
    return function(c, d, b, f) {
      if (0 <= c && 1 >= c && 0 <= b && 1 >= b) {
        var e2 = new Float32Array(11);
        if (c !== d || b !== f) for (var k = 0; 11 > k; ++k) {
          e2[k] = a(0.1 * k, c, b);
        }
        return function(k2) {
          if (c === d && b === f) return k2;
          if (0 === k2) return 0;
          if (1 === k2) return 1;
          for (var h2 = 0, l = 1; 10 !== l && e2[l] <= k2; ++l) {
            h2 += 0.1;
          }
          --l;
          var l = h2 + (k2 - e2[l]) / (e2[l + 1] - e2[l]) * 0.1, n = 3 * (1 - 3 * b + 3 * c) * l * l + 2 * (3 * b - 6 * c) * l + 3 * c;
          if (1e-3 <= n) {
            for (h2 = 0; 4 > h2; ++h2) {
              n = 3 * (1 - 3 * b + 3 * c) * l * l + 2 * (3 * b - 6 * c) * l + 3 * c;
              if (0 === n) break;
              var m2 = a(l, c, b) - k2, l = l - m2 / n;
            }
            k2 = l;
          } else if (0 === n) k2 = l;
          else {
            var l = h2, h2 = h2 + 0.1, g = 0;
            do {
              m2 = l + (h2 - l) / 2, n = a(m2, c, b) - k2, 0 < n ? h2 = m2 : l = m2;
            } while (1e-7 < Math.abs(n) && 10 > ++g);
            k2 = m2;
          }
          return a(k2, d, f);
        };
      }
    };
  }(), Q = function() {
    function a(a2, b2) {
      return 0 === a2 || 1 === a2 ? a2 : -Math.pow(2, 10 * (a2 - 1)) * Math.sin(2 * (a2 - 1 - b2 / (2 * Math.PI) * Math.asin(1)) * Math.PI / b2);
    }
    var c = "Quad Cubic Quart Quint Sine Expo Circ Back Elastic".split(" "), d = { In: [[0.55, 0.085, 0.68, 0.53], [0.55, 0.055, 0.675, 0.19], [0.895, 0.03, 0.685, 0.22], [0.755, 0.05, 0.855, 0.06], [0.47, 0, 0.745, 0.715], [0.95, 0.05, 0.795, 0.035], [0.6, 0.04, 0.98, 0.335], [0.6, -0.28, 0.735, 0.045], a], Out: [[0.25, 0.46, 0.45, 0.94], [0.215, 0.61, 0.355, 1], [0.165, 0.84, 0.44, 1], [0.23, 1, 0.32, 1], [0.39, 0.575, 0.565, 1], [0.19, 1, 0.22, 1], [0.075, 0.82, 0.165, 1], [0.175, 0.885, 0.32, 1.275], function(b2, c2) {
      return 1 - a(1 - b2, c2);
    }], InOut: [[0.455, 0.03, 0.515, 0.955], [0.645, 0.045, 0.355, 1], [0.77, 0, 0.175, 1], [0.86, 0, 0.07, 1], [0.445, 0.05, 0.55, 0.95], [1, 0, 0, 1], [0.785, 0.135, 0.15, 0.86], [0.68, -0.55, 0.265, 1.55], function(b2, c2) {
      return 0.5 > b2 ? a(2 * b2, c2) / 2 : 1 - a(-2 * b2 + 2, c2) / 2;
    }] }, b = { linear: A(0.25, 0.25, 0.75, 0.75) }, f = {}, e2;
    for (e2 in d) {
      f.type = e2, d[f.type].forEach(/* @__PURE__ */ function(a2) {
        return function(d2, f2) {
          b["ease" + a2.type + c[f2]] = h.fnc(d2) ? d2 : A.apply($jscomp$this, d2);
        };
      }(f)), f = { type: f.type };
    }
    return b;
  }(), ha = { css: function(a, c, d) {
    return a.style[c] = d;
  }, attribute: function(a, c, d) {
    return a.setAttribute(c, d);
  }, object: function(a, c, d) {
    return a[c] = d;
  }, transform: function(a, c, d, b, f) {
    b[f] || (b[f] = []);
    b[f].push(c + "(" + d + ")");
  } }, v = [], B = 0, ia = /* @__PURE__ */ function() {
    function a() {
      B = requestAnimationFrame(c);
    }
    function c(c2) {
      var b = v.length;
      if (b) {
        for (var d = 0; d < b; ) {
          v[d] && v[d].tick(c2), d++;
        }
        a();
      } else cancelAnimationFrame(B), B = 0;
    }
    return a;
  }();
  q.version = "2.2.0";
  q.speed = 1;
  q.running = v;
  q.remove = function(a) {
    a = P(a);
    for (var c = v.length; c--; ) {
      for (var d = v[c], b = d.animations, f = b.length; f--; ) {
        u(a, b[f].animatable.target) && (b.splice(f, 1), b.length || d.pause());
      }
    }
  };
  q.getValue = K;
  q.path = function(a, c) {
    var d = h.str(a) ? e(a)[0] : a, b = c || 100;
    return function(a2) {
      return { el: d, property: a2, totalLength: N(d) * (b / 100) };
    };
  };
  q.setDashoffset = function(a) {
    var c = N(a);
    a.setAttribute("stroke-dasharray", c);
    return c;
  };
  q.bezier = A;
  q.easings = Q;
  q.timeline = function(a) {
    var c = q(a);
    c.pause();
    c.duration = 0;
    c.add = function(d) {
      c.children.forEach(function(a2) {
        a2.began = true;
        a2.completed = true;
      });
      m(d).forEach(function(b) {
        var d2 = z(b, D(S, a || {}));
        d2.targets = d2.targets || a.targets;
        b = c.duration;
        var e2 = d2.offset;
        d2.autoplay = false;
        d2.direction = c.direction;
        d2.offset = h.und(e2) ? b : L(e2, b);
        c.began = true;
        c.completed = true;
        c.seek(d2.offset);
        d2 = q(d2);
        d2.began = true;
        d2.completed = true;
        d2.duration > b && (c.duration = d2.duration);
        c.children.push(d2);
      });
      c.seek(0);
      c.reset();
      c.autoplay && c.restart();
      return c;
    };
    return c;
  };
  q.random = function(a, c) {
    return Math.floor(Math.random() * (c - a + 1)) + a;
  };
  return q;
});
;
(function($2, anim) {
  "use strict";
  var _defaults = {
    accordion: true,
    onOpenStart: void 0,
    onOpenEnd: void 0,
    onCloseStart: void 0,
    onCloseEnd: void 0,
    inDuration: 300,
    outDuration: 300
  };
  var Collapsible = function(_Component) {
    _inherits(Collapsible2, _Component);
    function Collapsible2(el, options) {
      _classCallCheck(this, Collapsible2);
      var _this3 = _possibleConstructorReturn(this, (Collapsible2.__proto__ || Object.getPrototypeOf(Collapsible2)).call(this, Collapsible2, el, options));
      _this3.el.M_Collapsible = _this3;
      _this3.options = $2.extend({}, Collapsible2.defaults, options);
      _this3.$headers = _this3.$el.children("li").children(".collapsible-header");
      _this3.$headers.attr("tabindex", 0);
      _this3._setupEventHandlers();
      var $activeBodies = _this3.$el.children("li.active").children(".collapsible-body");
      if (_this3.options.accordion) {
        $activeBodies.first().css("display", "block");
      } else {
        $activeBodies.css("display", "block");
      }
      return _this3;
    }
    _createClass(Collapsible2, [{
      key: "destroy",
      /**
       * Teardown component
       */
      value: function destroy() {
        this._removeEventHandlers();
        this.el.M_Collapsible = void 0;
      }
      /**
       * Setup Event Handlers
       */
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        var _this4 = this;
        this._handleCollapsibleClickBound = this._handleCollapsibleClick.bind(this);
        this._handleCollapsibleKeydownBound = this._handleCollapsibleKeydown.bind(this);
        this.el.addEventListener("click", this._handleCollapsibleClickBound);
        this.$headers.each(function(header) {
          header.addEventListener("keydown", _this4._handleCollapsibleKeydownBound);
        });
      }
      /**
       * Remove Event Handlers
       */
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        var _this5 = this;
        this.el.removeEventListener("click", this._handleCollapsibleClickBound);
        this.$headers.each(function(header) {
          header.removeEventListener("keydown", _this5._handleCollapsibleKeydownBound);
        });
      }
      /**
       * Handle Collapsible Click
       * @param {Event} e
       */
    }, {
      key: "_handleCollapsibleClick",
      value: function _handleCollapsibleClick(e) {
        var $header = $2(e.target).closest(".collapsible-header");
        if (e.target && $header.length) {
          var $collapsible = $header.closest(".collapsible");
          if ($collapsible[0] === this.el) {
            var $collapsibleLi = $header.closest("li");
            var $collapsibleLis = $collapsible.children("li");
            var isActive = $collapsibleLi[0].classList.contains("active");
            var index = $collapsibleLis.index($collapsibleLi);
            if (isActive) {
              this.close(index);
            } else {
              this.open(index);
            }
          }
        }
      }
      /**
       * Handle Collapsible Keydown
       * @param {Event} e
       */
    }, {
      key: "_handleCollapsibleKeydown",
      value: function _handleCollapsibleKeydown(e) {
        if (e.keyCode === 13) {
          this._handleCollapsibleClickBound(e);
        }
      }
      /**
       * Animate in collapsible slide
       * @param {Number} index - 0th index of slide
       */
    }, {
      key: "_animateIn",
      value: function _animateIn(index) {
        var _this6 = this;
        var $collapsibleLi = this.$el.children("li").eq(index);
        if ($collapsibleLi.length) {
          var $body = $collapsibleLi.children(".collapsible-body");
          anim.remove($body[0]);
          $body.css({
            display: "block",
            overflow: "hidden",
            height: 0,
            paddingTop: "",
            paddingBottom: ""
          });
          var pTop = $body.css("padding-top");
          var pBottom = $body.css("padding-bottom");
          var finalHeight = $body[0].scrollHeight;
          $body.css({
            paddingTop: 0,
            paddingBottom: 0
          });
          anim({
            targets: $body[0],
            height: finalHeight,
            paddingTop: pTop,
            paddingBottom: pBottom,
            duration: this.options.inDuration,
            easing: "easeInOutCubic",
            complete: function(anim2) {
              $body.css({
                overflow: "",
                paddingTop: "",
                paddingBottom: "",
                height: ""
              });
              if (typeof _this6.options.onOpenEnd === "function") {
                _this6.options.onOpenEnd.call(_this6, $collapsibleLi[0]);
              }
            }
          });
        }
      }
      /**
       * Animate out collapsible slide
       * @param {Number} index - 0th index of slide to open
       */
    }, {
      key: "_animateOut",
      value: function _animateOut(index) {
        var _this7 = this;
        var $collapsibleLi = this.$el.children("li").eq(index);
        if ($collapsibleLi.length) {
          var $body = $collapsibleLi.children(".collapsible-body");
          anim.remove($body[0]);
          $body.css("overflow", "hidden");
          anim({
            targets: $body[0],
            height: 0,
            paddingTop: 0,
            paddingBottom: 0,
            duration: this.options.outDuration,
            easing: "easeInOutCubic",
            complete: function() {
              $body.css({
                height: "",
                overflow: "",
                padding: "",
                display: ""
              });
              if (typeof _this7.options.onCloseEnd === "function") {
                _this7.options.onCloseEnd.call(_this7, $collapsibleLi[0]);
              }
            }
          });
        }
      }
      /**
       * Open Collapsible
       * @param {Number} index - 0th index of slide
       */
    }, {
      key: "open",
      value: function open(index) {
        var _this8 = this;
        var $collapsibleLi = this.$el.children("li").eq(index);
        if ($collapsibleLi.length && !$collapsibleLi[0].classList.contains("active")) {
          if (typeof this.options.onOpenStart === "function") {
            this.options.onOpenStart.call(this, $collapsibleLi[0]);
          }
          if (this.options.accordion) {
            var $collapsibleLis = this.$el.children("li");
            var $activeLis = this.$el.children("li.active");
            $activeLis.each(function(el) {
              var index2 = $collapsibleLis.index($2(el));
              _this8.close(index2);
            });
          }
          $collapsibleLi[0].classList.add("active");
          this._animateIn(index);
        }
      }
      /**
       * Close Collapsible
       * @param {Number} index - 0th index of slide
       */
    }, {
      key: "close",
      value: function close(index) {
        var $collapsibleLi = this.$el.children("li").eq(index);
        if ($collapsibleLi.length && $collapsibleLi[0].classList.contains("active")) {
          if (typeof this.options.onCloseStart === "function") {
            this.options.onCloseStart.call(this, $collapsibleLi[0]);
          }
          $collapsibleLi[0].classList.remove("active");
          this._animateOut(index);
        }
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Collapsible2.__proto__ || Object.getPrototypeOf(Collapsible2), "init", this).call(this, this, els, options);
      }
      /**
       * Get Instance
       */
    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Collapsible;
      }
    }, {
      key: "defaults",
      get: function() {
        return _defaults;
      }
    }]);
    return Collapsible2;
  }(Component);
  M.Collapsible = Collapsible;
  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Collapsible, "collapsible", "M_Collapsible");
  }
})(cash, M.anime);
;
(function($2, anim) {
  "use strict";
  var _defaults = {
    alignment: "left",
    autoFocus: true,
    constrainWidth: true,
    container: null,
    coverTrigger: true,
    closeOnClick: true,
    hover: false,
    inDuration: 150,
    outDuration: 250,
    onOpenStart: null,
    onOpenEnd: null,
    onCloseStart: null,
    onCloseEnd: null,
    onItemClick: null
  };
  var Dropdown = function(_Component2) {
    _inherits(Dropdown2, _Component2);
    function Dropdown2(el, options) {
      _classCallCheck(this, Dropdown2);
      var _this9 = _possibleConstructorReturn(this, (Dropdown2.__proto__ || Object.getPrototypeOf(Dropdown2)).call(this, Dropdown2, el, options));
      _this9.el.M_Dropdown = _this9;
      Dropdown2._dropdowns.push(_this9);
      _this9.id = M.getIdFromTrigger(el);
      _this9.dropdownEl = document.getElementById(_this9.id);
      _this9.$dropdownEl = $2(_this9.dropdownEl);
      _this9.options = $2.extend({}, Dropdown2.defaults, options);
      _this9.isOpen = false;
      _this9.isScrollable = false;
      _this9.isTouchMoving = false;
      _this9.focusedIndex = -1;
      _this9.filterQuery = [];
      if (!!_this9.options.container) {
        $2(_this9.options.container).append(_this9.dropdownEl);
      } else {
        _this9.$el.after(_this9.dropdownEl);
      }
      _this9._makeDropdownFocusable();
      _this9._resetFilterQueryBound = _this9._resetFilterQuery.bind(_this9);
      _this9._handleDocumentClickBound = _this9._handleDocumentClick.bind(_this9);
      _this9._handleDocumentTouchmoveBound = _this9._handleDocumentTouchmove.bind(_this9);
      _this9._handleDropdownClickBound = _this9._handleDropdownClick.bind(_this9);
      _this9._handleDropdownKeydownBound = _this9._handleDropdownKeydown.bind(_this9);
      _this9._handleTriggerKeydownBound = _this9._handleTriggerKeydown.bind(_this9);
      _this9._setupEventHandlers();
      return _this9;
    }
    _createClass(Dropdown2, [{
      key: "destroy",
      /**
       * Teardown component
       */
      value: function destroy() {
        this._resetDropdownStyles();
        this._removeEventHandlers();
        Dropdown2._dropdowns.splice(Dropdown2._dropdowns.indexOf(this), 1);
        this.el.M_Dropdown = void 0;
      }
      /**
       * Setup Event Handlers
       */
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this.el.addEventListener("keydown", this._handleTriggerKeydownBound);
        this.dropdownEl.addEventListener("click", this._handleDropdownClickBound);
        if (this.options.hover) {
          this._handleMouseEnterBound = this._handleMouseEnter.bind(this);
          this.el.addEventListener("mouseenter", this._handleMouseEnterBound);
          this._handleMouseLeaveBound = this._handleMouseLeave.bind(this);
          this.el.addEventListener("mouseleave", this._handleMouseLeaveBound);
          this.dropdownEl.addEventListener("mouseleave", this._handleMouseLeaveBound);
        } else {
          this._handleClickBound = this._handleClick.bind(this);
          this.el.addEventListener("click", this._handleClickBound);
        }
      }
      /**
       * Remove Event Handlers
       */
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        this.el.removeEventListener("keydown", this._handleTriggerKeydownBound);
        this.dropdownEl.removeEventListener("click", this._handleDropdownClickBound);
        if (this.options.hover) {
          this.el.removeEventListener("mouseenter", this._handleMouseEnterBound);
          this.el.removeEventListener("mouseleave", this._handleMouseLeaveBound);
          this.dropdownEl.removeEventListener("mouseleave", this._handleMouseLeaveBound);
        } else {
          this.el.removeEventListener("click", this._handleClickBound);
        }
      }
    }, {
      key: "_setupTemporaryEventHandlers",
      value: function _setupTemporaryEventHandlers() {
        document.body.addEventListener("click", this._handleDocumentClickBound, true);
        document.body.addEventListener("touchend", this._handleDocumentClickBound);
        document.body.addEventListener("touchmove", this._handleDocumentTouchmoveBound);
        this.dropdownEl.addEventListener("keydown", this._handleDropdownKeydownBound);
      }
    }, {
      key: "_removeTemporaryEventHandlers",
      value: function _removeTemporaryEventHandlers() {
        document.body.removeEventListener("click", this._handleDocumentClickBound, true);
        document.body.removeEventListener("touchend", this._handleDocumentClickBound);
        document.body.removeEventListener("touchmove", this._handleDocumentTouchmoveBound);
        this.dropdownEl.removeEventListener("keydown", this._handleDropdownKeydownBound);
      }
    }, {
      key: "_handleClick",
      value: function _handleClick(e) {
        e.preventDefault();
        this.open();
      }
    }, {
      key: "_handleMouseEnter",
      value: function _handleMouseEnter() {
        this.open();
      }
    }, {
      key: "_handleMouseLeave",
      value: function _handleMouseLeave(e) {
        var toEl = e.toElement || e.relatedTarget;
        var leaveToDropdownContent = !!$2(toEl).closest(".dropdown-content").length;
        var leaveToActiveDropdownTrigger = false;
        var $closestTrigger = $2(toEl).closest(".dropdown-trigger");
        if ($closestTrigger.length && !!$closestTrigger[0].M_Dropdown && $closestTrigger[0].M_Dropdown.isOpen) {
          leaveToActiveDropdownTrigger = true;
        }
        if (!leaveToActiveDropdownTrigger && !leaveToDropdownContent) {
          this.close();
        }
      }
    }, {
      key: "_handleDocumentClick",
      value: function _handleDocumentClick(e) {
        var _this10 = this;
        var $target = $2(e.target);
        if (this.options.closeOnClick && $target.closest(".dropdown-content").length && !this.isTouchMoving) {
          setTimeout(function() {
            _this10.close();
          }, 0);
        } else if ($target.closest(".dropdown-trigger").length || !$target.closest(".dropdown-content").length) {
          setTimeout(function() {
            _this10.close();
          }, 0);
        }
        this.isTouchMoving = false;
      }
    }, {
      key: "_handleTriggerKeydown",
      value: function _handleTriggerKeydown(e) {
        if ((e.which === M.keys.ARROW_DOWN || e.which === M.keys.ENTER) && !this.isOpen) {
          e.preventDefault();
          this.open();
        }
      }
      /**
       * Handle Document Touchmove
       * @param {Event} e
       */
    }, {
      key: "_handleDocumentTouchmove",
      value: function _handleDocumentTouchmove(e) {
        var $target = $2(e.target);
        if ($target.closest(".dropdown-content").length) {
          this.isTouchMoving = true;
        }
      }
      /**
       * Handle Dropdown Click
       * @param {Event} e
       */
    }, {
      key: "_handleDropdownClick",
      value: function _handleDropdownClick(e) {
        if (typeof this.options.onItemClick === "function") {
          var itemEl = $2(e.target).closest("li")[0];
          this.options.onItemClick.call(this, itemEl);
        }
      }
      /**
       * Handle Dropdown Keydown
       * @param {Event} e
       */
    }, {
      key: "_handleDropdownKeydown",
      value: function _handleDropdownKeydown(e) {
        if (e.which === M.keys.TAB) {
          e.preventDefault();
          this.close();
        } else if ((e.which === M.keys.ARROW_DOWN || e.which === M.keys.ARROW_UP) && this.isOpen) {
          e.preventDefault();
          var direction = e.which === M.keys.ARROW_DOWN ? 1 : -1;
          var newFocusedIndex = this.focusedIndex;
          var foundNewIndex = false;
          do {
            newFocusedIndex = newFocusedIndex + direction;
            if (!!this.dropdownEl.children[newFocusedIndex] && this.dropdownEl.children[newFocusedIndex].tabIndex !== -1) {
              foundNewIndex = true;
              break;
            }
          } while (newFocusedIndex < this.dropdownEl.children.length && newFocusedIndex >= 0);
          if (foundNewIndex) {
            this.focusedIndex = newFocusedIndex;
            this._focusFocusedItem();
          }
        } else if (e.which === M.keys.ENTER && this.isOpen) {
          var focusedElement = this.dropdownEl.children[this.focusedIndex];
          var $activatableElement = $2(focusedElement).find("a, button").first();
          if (!!$activatableElement.length) {
            $activatableElement[0].click();
          } else if (!!focusedElement) {
            focusedElement.click();
          }
        } else if (e.which === M.keys.ESC && this.isOpen) {
          e.preventDefault();
          this.close();
        }
        var letter = String.fromCharCode(e.which).toLowerCase(), nonLetters = [9, 13, 27, 38, 40];
        if (letter && nonLetters.indexOf(e.which) === -1) {
          this.filterQuery.push(letter);
          var string = this.filterQuery.join(""), newOptionEl = $2(this.dropdownEl).find("li").filter(function(el) {
            return $2(el).text().toLowerCase().indexOf(string) === 0;
          })[0];
          if (newOptionEl) {
            this.focusedIndex = $2(newOptionEl).index();
            this._focusFocusedItem();
          }
        }
        this.filterTimeout = setTimeout(this._resetFilterQueryBound, 1e3);
      }
      /**
       * Setup dropdown
       */
    }, {
      key: "_resetFilterQuery",
      value: function _resetFilterQuery() {
        this.filterQuery = [];
      }
    }, {
      key: "_resetDropdownStyles",
      value: function _resetDropdownStyles() {
        this.$dropdownEl.css({
          display: "",
          width: "",
          height: "",
          left: "",
          top: "",
          "transform-origin": "",
          transform: "",
          opacity: ""
        });
      }
    }, {
      key: "_makeDropdownFocusable",
      value: function _makeDropdownFocusable() {
        this.dropdownEl.tabIndex = 0;
        $2(this.dropdownEl).children().each(function(el) {
          if (!el.getAttribute("tabindex")) {
            el.setAttribute("tabindex", 0);
          }
        });
      }
    }, {
      key: "_focusFocusedItem",
      value: function _focusFocusedItem() {
        if (this.focusedIndex >= 0 && this.focusedIndex < this.dropdownEl.children.length && this.options.autoFocus) {
          this.dropdownEl.children[this.focusedIndex].focus();
        }
      }
    }, {
      key: "_getDropdownPosition",
      value: function _getDropdownPosition() {
        var offsetParentBRect = this.el.offsetParent.getBoundingClientRect();
        var triggerBRect = this.el.getBoundingClientRect();
        var dropdownBRect = this.dropdownEl.getBoundingClientRect();
        var idealHeight = dropdownBRect.height;
        var idealWidth = dropdownBRect.width;
        var idealXPos = triggerBRect.left - dropdownBRect.left;
        var idealYPos = triggerBRect.top - dropdownBRect.top;
        var dropdownBounds = {
          left: idealXPos,
          top: idealYPos,
          height: idealHeight,
          width: idealWidth
        };
        var closestOverflowParent = !!this.dropdownEl.offsetParent ? this.dropdownEl.offsetParent : this.dropdownEl.parentNode;
        var alignments = M.checkPossibleAlignments(this.el, closestOverflowParent, dropdownBounds, this.options.coverTrigger ? 0 : triggerBRect.height);
        var verticalAlignment = "top";
        var horizontalAlignment = this.options.alignment;
        idealYPos += this.options.coverTrigger ? 0 : triggerBRect.height;
        this.isScrollable = false;
        if (!alignments.top) {
          if (alignments.bottom) {
            verticalAlignment = "bottom";
          } else {
            this.isScrollable = true;
            if (alignments.spaceOnTop > alignments.spaceOnBottom) {
              verticalAlignment = "bottom";
              idealHeight += alignments.spaceOnTop;
              idealYPos -= alignments.spaceOnTop;
            } else {
              idealHeight += alignments.spaceOnBottom;
            }
          }
        }
        if (!alignments[horizontalAlignment]) {
          var oppositeAlignment = horizontalAlignment === "left" ? "right" : "left";
          if (alignments[oppositeAlignment]) {
            horizontalAlignment = oppositeAlignment;
          } else {
            if (alignments.spaceOnLeft > alignments.spaceOnRight) {
              horizontalAlignment = "right";
              idealWidth += alignments.spaceOnLeft;
              idealXPos -= alignments.spaceOnLeft;
            } else {
              horizontalAlignment = "left";
              idealWidth += alignments.spaceOnRight;
            }
          }
        }
        if (verticalAlignment === "bottom") {
          idealYPos = idealYPos - dropdownBRect.height + (this.options.coverTrigger ? triggerBRect.height : 0);
        }
        if (horizontalAlignment === "right") {
          idealXPos = idealXPos - dropdownBRect.width + triggerBRect.width;
        }
        return {
          x: idealXPos,
          y: idealYPos,
          verticalAlignment,
          horizontalAlignment,
          height: idealHeight,
          width: idealWidth
        };
      }
      /**
       * Animate in dropdown
       */
    }, {
      key: "_animateIn",
      value: function _animateIn() {
        var _this11 = this;
        anim.remove(this.dropdownEl);
        anim({
          targets: this.dropdownEl,
          opacity: {
            value: [0, 1],
            easing: "easeOutQuad"
          },
          scaleX: [0.3, 1],
          scaleY: [0.3, 1],
          duration: this.options.inDuration,
          easing: "easeOutQuint",
          complete: function(anim2) {
            if (_this11.options.autoFocus) {
              _this11.dropdownEl.focus();
            }
            if (typeof _this11.options.onOpenEnd === "function") {
              _this11.options.onOpenEnd.call(_this11, _this11.el);
            }
          }
        });
      }
      /**
       * Animate out dropdown
       */
    }, {
      key: "_animateOut",
      value: function _animateOut() {
        var _this12 = this;
        anim.remove(this.dropdownEl);
        anim({
          targets: this.dropdownEl,
          opacity: {
            value: 0,
            easing: "easeOutQuint"
          },
          scaleX: 0.3,
          scaleY: 0.3,
          duration: this.options.outDuration,
          easing: "easeOutQuint",
          complete: function(anim2) {
            _this12._resetDropdownStyles();
            if (typeof _this12.options.onCloseEnd === "function") {
              _this12.options.onCloseEnd.call(_this12, _this12.el);
            }
          }
        });
      }
      /**
       * Place dropdown
       */
    }, {
      key: "_placeDropdown",
      value: function _placeDropdown() {
        var idealWidth = this.options.constrainWidth ? this.el.getBoundingClientRect().width : this.dropdownEl.getBoundingClientRect().width;
        this.dropdownEl.style.width = idealWidth + "px";
        var positionInfo = this._getDropdownPosition();
        this.dropdownEl.style.left = positionInfo.x + "px";
        this.dropdownEl.style.top = positionInfo.y + "px";
        this.dropdownEl.style.height = positionInfo.height + "px";
        this.dropdownEl.style.width = positionInfo.width + "px";
        this.dropdownEl.style.transformOrigin = (positionInfo.horizontalAlignment === "left" ? "0" : "100%") + " " + (positionInfo.verticalAlignment === "top" ? "0" : "100%");
      }
      /**
       * Open Dropdown
       */
    }, {
      key: "open",
      value: function open() {
        if (this.isOpen) {
          return;
        }
        this.isOpen = true;
        if (typeof this.options.onOpenStart === "function") {
          this.options.onOpenStart.call(this, this.el);
        }
        this._resetDropdownStyles();
        this.dropdownEl.style.display = "block";
        this._placeDropdown();
        this._animateIn();
        this._setupTemporaryEventHandlers();
      }
      /**
       * Close Dropdown
       */
    }, {
      key: "close",
      value: function close() {
        if (!this.isOpen) {
          return;
        }
        this.isOpen = false;
        this.focusedIndex = -1;
        if (typeof this.options.onCloseStart === "function") {
          this.options.onCloseStart.call(this, this.el);
        }
        this._animateOut();
        this._removeTemporaryEventHandlers();
        if (this.options.autoFocus) {
          this.el.focus();
        }
      }
      /**
       * Recalculate dimensions
       */
    }, {
      key: "recalculateDimensions",
      value: function recalculateDimensions() {
        if (this.isOpen) {
          this.$dropdownEl.css({
            width: "",
            height: "",
            left: "",
            top: "",
            "transform-origin": ""
          });
          this._placeDropdown();
        }
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Dropdown2.__proto__ || Object.getPrototypeOf(Dropdown2), "init", this).call(this, this, els, options);
      }
      /**
       * Get Instance
       */
    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Dropdown;
      }
    }, {
      key: "defaults",
      get: function() {
        return _defaults;
      }
    }]);
    return Dropdown2;
  }(Component);
  Dropdown._dropdowns = [];
  M.Dropdown = Dropdown;
  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Dropdown, "dropdown", "M_Dropdown");
  }
})(cash, M.anime);
;
(function($2, anim) {
  "use strict";
  var _defaults = {
    opacity: 0.5,
    inDuration: 250,
    outDuration: 250,
    onOpenStart: null,
    onOpenEnd: null,
    onCloseStart: null,
    onCloseEnd: null,
    preventScrolling: true,
    dismissible: true,
    startingTop: "4%",
    endingTop: "10%"
  };
  var Modal = function(_Component3) {
    _inherits(Modal2, _Component3);
    function Modal2(el, options) {
      _classCallCheck(this, Modal2);
      var _this13 = _possibleConstructorReturn(this, (Modal2.__proto__ || Object.getPrototypeOf(Modal2)).call(this, Modal2, el, options));
      _this13.el.M_Modal = _this13;
      _this13.options = $2.extend({}, Modal2.defaults, options);
      _this13.isOpen = false;
      _this13.id = _this13.$el.attr("id");
      _this13._openingTrigger = void 0;
      _this13.$overlay = $2('<div class="modal-overlay"></div>');
      _this13.el.tabIndex = 0;
      _this13._nthModalOpened = 0;
      Modal2._count++;
      _this13._setupEventHandlers();
      return _this13;
    }
    _createClass(Modal2, [{
      key: "destroy",
      /**
       * Teardown component
       */
      value: function destroy() {
        Modal2._count--;
        this._removeEventHandlers();
        this.el.removeAttribute("style");
        this.$overlay.remove();
        this.el.M_Modal = void 0;
      }
      /**
       * Setup Event Handlers
       */
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleOverlayClickBound = this._handleOverlayClick.bind(this);
        this._handleModalCloseClickBound = this._handleModalCloseClick.bind(this);
        if (Modal2._count === 1) {
          document.body.addEventListener("click", this._handleTriggerClick);
        }
        this.$overlay[0].addEventListener("click", this._handleOverlayClickBound);
        this.el.addEventListener("click", this._handleModalCloseClickBound);
      }
      /**
       * Remove Event Handlers
       */
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        if (Modal2._count === 0) {
          document.body.removeEventListener("click", this._handleTriggerClick);
        }
        this.$overlay[0].removeEventListener("click", this._handleOverlayClickBound);
        this.el.removeEventListener("click", this._handleModalCloseClickBound);
      }
      /**
       * Handle Trigger Click
       * @param {Event} e
       */
    }, {
      key: "_handleTriggerClick",
      value: function _handleTriggerClick(e) {
        var $trigger = $2(e.target).closest(".modal-trigger");
        if ($trigger.length) {
          var modalId = M.getIdFromTrigger($trigger[0]);
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
      key: "_handleOverlayClick",
      value: function _handleOverlayClick() {
        if (this.options.dismissible) {
          this.close();
        }
      }
      /**
       * Handle Modal Close Click
       * @param {Event} e
       */
    }, {
      key: "_handleModalCloseClick",
      value: function _handleModalCloseClick(e) {
        var $closeTrigger = $2(e.target).closest(".modal-close");
        if ($closeTrigger.length) {
          this.close();
        }
      }
      /**
       * Handle Keydown
       * @param {Event} e
       */
    }, {
      key: "_handleKeydown",
      value: function _handleKeydown(e) {
        if (e.keyCode === 27 && this.options.dismissible) {
          this.close();
        }
      }
      /**
       * Handle Focus
       * @param {Event} e
       */
    }, {
      key: "_handleFocus",
      value: function _handleFocus(e) {
        if (!this.el.contains(e.target) && this._nthModalOpened === Modal2._modalsOpen) {
          this.el.focus();
        }
      }
      /**
       * Animate in modal
       */
    }, {
      key: "_animateIn",
      value: function _animateIn() {
        var _this14 = this;
        $2.extend(this.el.style, {
          display: "block",
          opacity: 0
        });
        $2.extend(this.$overlay[0].style, {
          display: "block",
          opacity: 0
        });
        anim({
          targets: this.$overlay[0],
          opacity: this.options.opacity,
          duration: this.options.inDuration,
          easing: "easeOutQuad"
        });
        var enterAnimOptions = {
          targets: this.el,
          duration: this.options.inDuration,
          easing: "easeOutCubic",
          // Handle modal onOpenEnd callback
          complete: function() {
            if (typeof _this14.options.onOpenEnd === "function") {
              _this14.options.onOpenEnd.call(_this14, _this14.el, _this14._openingTrigger);
            }
          }
        };
        if (this.el.classList.contains("bottom-sheet")) {
          $2.extend(enterAnimOptions, {
            bottom: 0,
            opacity: 1
          });
          anim(enterAnimOptions);
        } else {
          $2.extend(enterAnimOptions, {
            top: [this.options.startingTop, this.options.endingTop],
            opacity: 1,
            scaleX: [0.8, 1],
            scaleY: [0.8, 1]
          });
          anim(enterAnimOptions);
        }
      }
      /**
       * Animate out modal
       */
    }, {
      key: "_animateOut",
      value: function _animateOut() {
        var _this15 = this;
        anim({
          targets: this.$overlay[0],
          opacity: 0,
          duration: this.options.outDuration,
          easing: "easeOutQuart"
        });
        var exitAnimOptions = {
          targets: this.el,
          duration: this.options.outDuration,
          easing: "easeOutCubic",
          // Handle modal ready callback
          complete: function() {
            _this15.el.style.display = "none";
            _this15.$overlay.remove();
            if (typeof _this15.options.onCloseEnd === "function") {
              _this15.options.onCloseEnd.call(_this15, _this15.el);
            }
          }
        };
        if (this.el.classList.contains("bottom-sheet")) {
          $2.extend(exitAnimOptions, {
            bottom: "-100%",
            opacity: 0
          });
          anim(exitAnimOptions);
        } else {
          $2.extend(exitAnimOptions, {
            top: [this.options.endingTop, this.options.startingTop],
            opacity: 0,
            scaleX: 0.8,
            scaleY: 0.8
          });
          anim(exitAnimOptions);
        }
      }
      /**
       * Open Modal
       * @param {cash} [$trigger]
       */
    }, {
      key: "open",
      value: function open($trigger) {
        if (this.isOpen) {
          return;
        }
        this.isOpen = true;
        Modal2._modalsOpen++;
        this._nthModalOpened = Modal2._modalsOpen;
        this.$overlay[0].style.zIndex = 1e3 + Modal2._modalsOpen * 2;
        this.el.style.zIndex = 1e3 + Modal2._modalsOpen * 2 + 1;
        this._openingTrigger = !!$trigger ? $trigger[0] : void 0;
        if (typeof this.options.onOpenStart === "function") {
          this.options.onOpenStart.call(this, this.el, this._openingTrigger);
        }
        if (this.options.preventScrolling) {
          document.body.style.overflow = "hidden";
        }
        this.el.classList.add("open");
        this.el.insertAdjacentElement("afterend", this.$overlay[0]);
        if (this.options.dismissible) {
          this._handleKeydownBound = this._handleKeydown.bind(this);
          this._handleFocusBound = this._handleFocus.bind(this);
          document.addEventListener("keydown", this._handleKeydownBound);
          document.addEventListener("focus", this._handleFocusBound, true);
        }
        anim.remove(this.el);
        anim.remove(this.$overlay[0]);
        this._animateIn();
        this.el.focus();
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
        Modal2._modalsOpen--;
        this._nthModalOpened = 0;
        if (typeof this.options.onCloseStart === "function") {
          this.options.onCloseStart.call(this, this.el);
        }
        this.el.classList.remove("open");
        if (Modal2._modalsOpen === 0) {
          document.body.style.overflow = "";
        }
        if (this.options.dismissible) {
          document.removeEventListener("keydown", this._handleKeydownBound);
          document.removeEventListener("focus", this._handleFocusBound, true);
        }
        anim.remove(this.el);
        anim.remove(this.$overlay[0]);
        this._animateOut();
        return this;
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Modal2.__proto__ || Object.getPrototypeOf(Modal2), "init", this).call(this, this, els, options);
      }
      /**
       * Get Instance
       */
    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Modal;
      }
    }, {
      key: "defaults",
      get: function() {
        return _defaults;
      }
    }]);
    return Modal2;
  }(Component);
  Modal._modalsOpen = 0;
  Modal._count = 0;
  M.Modal = Modal;
  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Modal, "modal", "M_Modal");
  }
})(cash, M.anime);
;
(function($2, anim) {
  "use strict";
  var _defaults = {
    inDuration: 275,
    outDuration: 200,
    onOpenStart: null,
    onOpenEnd: null,
    onCloseStart: null,
    onCloseEnd: null
  };
  var Materialbox = function(_Component4) {
    _inherits(Materialbox2, _Component4);
    function Materialbox2(el, options) {
      _classCallCheck(this, Materialbox2);
      var _this16 = _possibleConstructorReturn(this, (Materialbox2.__proto__ || Object.getPrototypeOf(Materialbox2)).call(this, Materialbox2, el, options));
      _this16.el.M_Materialbox = _this16;
      _this16.options = $2.extend({}, Materialbox2.defaults, options);
      _this16.overlayActive = false;
      _this16.doneAnimating = true;
      _this16.placeholder = $2("<div></div>").addClass("material-placeholder");
      _this16.originalWidth = 0;
      _this16.originalHeight = 0;
      _this16.originInlineStyles = _this16.$el.attr("style");
      _this16.caption = _this16.el.getAttribute("data-caption") || "";
      _this16.$el.before(_this16.placeholder);
      _this16.placeholder.append(_this16.$el);
      _this16._setupEventHandlers();
      return _this16;
    }
    _createClass(Materialbox2, [{
      key: "destroy",
      /**
       * Teardown component
       */
      value: function destroy() {
        this._removeEventHandlers();
        this.el.M_Materialbox = void 0;
        $2(this.placeholder).after(this.el).remove();
        this.$el.removeAttr("style");
      }
      /**
       * Setup Event Handlers
       */
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleMaterialboxClickBound = this._handleMaterialboxClick.bind(this);
        this.el.addEventListener("click", this._handleMaterialboxClickBound);
      }
      /**
       * Remove Event Handlers
       */
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        this.el.removeEventListener("click", this._handleMaterialboxClickBound);
      }
      /**
       * Handle Materialbox Click
       * @param {Event} e
       */
    }, {
      key: "_handleMaterialboxClick",
      value: function _handleMaterialboxClick(e) {
        if (this.doneAnimating === false || this.overlayActive && this.doneAnimating) {
          this.close();
        } else {
          this.open();
        }
      }
      /**
       * Handle Window Scroll
       */
    }, {
      key: "_handleWindowScroll",
      value: function _handleWindowScroll() {
        if (this.overlayActive) {
          this.close();
        }
      }
      /**
       * Handle Window Resize
       */
    }, {
      key: "_handleWindowResize",
      value: function _handleWindowResize() {
        if (this.overlayActive) {
          this.close();
        }
      }
      /**
       * Handle Window Resize
       * @param {Event} e
       */
    }, {
      key: "_handleWindowEscape",
      value: function _handleWindowEscape(e) {
        if (e.keyCode === 27 && this.doneAnimating && this.overlayActive) {
          this.close();
        }
      }
      /**
       * Find ancestors with overflow: hidden; and make visible
       */
    }, {
      key: "_makeAncestorsOverflowVisible",
      value: function _makeAncestorsOverflowVisible() {
        this.ancestorsChanged = $2();
        var ancestor = this.placeholder[0].parentNode;
        while (ancestor !== null && !$2(ancestor).is(document)) {
          var curr = $2(ancestor);
          if (curr.css("overflow") !== "visible") {
            curr.css("overflow", "visible");
            if (this.ancestorsChanged === void 0) {
              this.ancestorsChanged = curr;
            } else {
              this.ancestorsChanged = this.ancestorsChanged.add(curr);
            }
          }
          ancestor = ancestor.parentNode;
        }
      }
      /**
       * Animate image in
       */
    }, {
      key: "_animateImageIn",
      value: function _animateImageIn() {
        var _this17 = this;
        var animOptions = {
          targets: this.el,
          height: [this.originalHeight, this.newHeight],
          width: [this.originalWidth, this.newWidth],
          left: M.getDocumentScrollLeft() + this.windowWidth / 2 - this.placeholder.offset().left - this.newWidth / 2,
          top: M.getDocumentScrollTop() + this.windowHeight / 2 - this.placeholder.offset().top - this.newHeight / 2,
          duration: this.options.inDuration,
          easing: "easeOutQuad",
          complete: function() {
            _this17.doneAnimating = true;
            if (typeof _this17.options.onOpenEnd === "function") {
              _this17.options.onOpenEnd.call(_this17, _this17.el);
            }
          }
        };
        this.maxWidth = this.$el.css("max-width");
        this.maxHeight = this.$el.css("max-height");
        if (this.maxWidth !== "none") {
          animOptions.maxWidth = this.newWidth;
        }
        if (this.maxHeight !== "none") {
          animOptions.maxHeight = this.newHeight;
        }
        anim(animOptions);
      }
      /**
       * Animate image out
       */
    }, {
      key: "_animateImageOut",
      value: function _animateImageOut() {
        var _this18 = this;
        var animOptions = {
          targets: this.el,
          width: this.originalWidth,
          height: this.originalHeight,
          left: 0,
          top: 0,
          duration: this.options.outDuration,
          easing: "easeOutQuad",
          complete: function() {
            _this18.placeholder.css({
              height: "",
              width: "",
              position: "",
              top: "",
              left: ""
            });
            if (_this18.attrWidth) {
              _this18.$el.attr("width", _this18.attrWidth);
            }
            if (_this18.attrHeight) {
              _this18.$el.attr("height", _this18.attrHeight);
            }
            _this18.$el.removeAttr("style");
            _this18.originInlineStyles && _this18.$el.attr("style", _this18.originInlineStyles);
            _this18.$el.removeClass("active");
            _this18.doneAnimating = true;
            if (_this18.ancestorsChanged.length) {
              _this18.ancestorsChanged.css("overflow", "");
            }
            if (typeof _this18.options.onCloseEnd === "function") {
              _this18.options.onCloseEnd.call(_this18, _this18.el);
            }
          }
        };
        anim(animOptions);
      }
      /**
       * Update open and close vars
       */
    }, {
      key: "_updateVars",
      value: function _updateVars() {
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
        this.caption = this.el.getAttribute("data-caption") || "";
      }
      /**
       * Open Materialbox
       */
    }, {
      key: "open",
      value: function open() {
        var _this19 = this;
        this._updateVars();
        this.originalWidth = this.el.getBoundingClientRect().width;
        this.originalHeight = this.el.getBoundingClientRect().height;
        this.doneAnimating = false;
        this.$el.addClass("active");
        this.overlayActive = true;
        if (typeof this.options.onOpenStart === "function") {
          this.options.onOpenStart.call(this, this.el);
        }
        this.placeholder.css({
          width: this.placeholder[0].getBoundingClientRect().width + "px",
          height: this.placeholder[0].getBoundingClientRect().height + "px",
          position: "relative",
          top: 0,
          left: 0
        });
        this._makeAncestorsOverflowVisible();
        this.$el.css({
          position: "absolute",
          "z-index": 1e3,
          "will-change": "left, top, width, height"
        });
        this.attrWidth = this.$el.attr("width");
        this.attrHeight = this.$el.attr("height");
        if (this.attrWidth) {
          this.$el.css("width", this.attrWidth + "px");
          this.$el.removeAttr("width");
        }
        if (this.attrHeight) {
          this.$el.css("width", this.attrHeight + "px");
          this.$el.removeAttr("height");
        }
        this.$overlay = $2('<div id="materialbox-overlay"></div>').css({
          opacity: 0
        }).one("click", function() {
          if (_this19.doneAnimating) {
            _this19.close();
          }
        });
        this.$el.before(this.$overlay);
        var overlayOffset = this.$overlay[0].getBoundingClientRect();
        this.$overlay.css({
          width: this.windowWidth + "px",
          height: this.windowHeight + "px",
          left: -1 * overlayOffset.left + "px",
          top: -1 * overlayOffset.top + "px"
        });
        anim.remove(this.el);
        anim.remove(this.$overlay[0]);
        anim({
          targets: this.$overlay[0],
          opacity: 1,
          duration: this.options.inDuration,
          easing: "easeOutQuad"
        });
        if (this.caption !== "") {
          if (this.$photocaption) {
            anim.remove(this.$photoCaption[0]);
          }
          this.$photoCaption = $2('<div class="materialbox-caption"></div>');
          this.$photoCaption.text(this.caption);
          $2("body").append(this.$photoCaption);
          this.$photoCaption.css({ display: "inline" });
          anim({
            targets: this.$photoCaption[0],
            opacity: 1,
            duration: this.options.inDuration,
            easing: "easeOutQuad"
          });
        }
        var ratio = 0;
        var widthPercent = this.originalWidth / this.windowWidth;
        var heightPercent = this.originalHeight / this.windowHeight;
        this.newWidth = 0;
        this.newHeight = 0;
        if (widthPercent > heightPercent) {
          ratio = this.originalHeight / this.originalWidth;
          this.newWidth = this.windowWidth * 0.9;
          this.newHeight = this.windowWidth * 0.9 * ratio;
        } else {
          ratio = this.originalWidth / this.originalHeight;
          this.newWidth = this.windowHeight * 0.9 * ratio;
          this.newHeight = this.windowHeight * 0.9;
        }
        this._animateImageIn();
        this._handleWindowScrollBound = this._handleWindowScroll.bind(this);
        this._handleWindowResizeBound = this._handleWindowResize.bind(this);
        this._handleWindowEscapeBound = this._handleWindowEscape.bind(this);
        window.addEventListener("scroll", this._handleWindowScrollBound);
        window.addEventListener("resize", this._handleWindowResizeBound);
        window.addEventListener("keyup", this._handleWindowEscapeBound);
      }
      /**
       * Close Materialbox
       */
    }, {
      key: "close",
      value: function close() {
        var _this20 = this;
        this._updateVars();
        this.doneAnimating = false;
        if (typeof this.options.onCloseStart === "function") {
          this.options.onCloseStart.call(this, this.el);
        }
        anim.remove(this.el);
        anim.remove(this.$overlay[0]);
        if (this.caption !== "") {
          anim.remove(this.$photoCaption[0]);
        }
        window.removeEventListener("scroll", this._handleWindowScrollBound);
        window.removeEventListener("resize", this._handleWindowResizeBound);
        window.removeEventListener("keyup", this._handleWindowEscapeBound);
        anim({
          targets: this.$overlay[0],
          opacity: 0,
          duration: this.options.outDuration,
          easing: "easeOutQuad",
          complete: function() {
            _this20.overlayActive = false;
            _this20.$overlay.remove();
          }
        });
        this._animateImageOut();
        if (this.caption !== "") {
          anim({
            targets: this.$photoCaption[0],
            opacity: 0,
            duration: this.options.outDuration,
            easing: "easeOutQuad",
            complete: function() {
              _this20.$photoCaption.remove();
            }
          });
        }
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Materialbox2.__proto__ || Object.getPrototypeOf(Materialbox2), "init", this).call(this, this, els, options);
      }
      /**
       * Get Instance
       */
    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Materialbox;
      }
    }, {
      key: "defaults",
      get: function() {
        return _defaults;
      }
    }]);
    return Materialbox2;
  }(Component);
  M.Materialbox = Materialbox;
  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Materialbox, "materialbox", "M_Materialbox");
  }
})(cash, M.anime);
;
(function($2) {
  "use strict";
  var _defaults = {
    responsiveThreshold: 0
    // breakpoint for swipeable
  };
  var Parallax = function(_Component5) {
    _inherits(Parallax2, _Component5);
    function Parallax2(el, options) {
      _classCallCheck(this, Parallax2);
      var _this21 = _possibleConstructorReturn(this, (Parallax2.__proto__ || Object.getPrototypeOf(Parallax2)).call(this, Parallax2, el, options));
      _this21.el.M_Parallax = _this21;
      _this21.options = $2.extend({}, Parallax2.defaults, options);
      _this21._enabled = window.innerWidth > _this21.options.responsiveThreshold;
      _this21.$img = _this21.$el.find("img").first();
      _this21.$img.each(function() {
        var el2 = this;
        if (el2.complete) $2(el2).trigger("load");
      });
      _this21._updateParallax();
      _this21._setupEventHandlers();
      _this21._setupStyles();
      Parallax2._parallaxes.push(_this21);
      return _this21;
    }
    _createClass(Parallax2, [{
      key: "destroy",
      /**
       * Teardown component
       */
      value: function destroy() {
        Parallax2._parallaxes.splice(Parallax2._parallaxes.indexOf(this), 1);
        this.$img[0].style.transform = "";
        this._removeEventHandlers();
        this.$el[0].M_Parallax = void 0;
      }
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleImageLoadBound = this._handleImageLoad.bind(this);
        this.$img[0].addEventListener("load", this._handleImageLoadBound);
        if (Parallax2._parallaxes.length === 0) {
          Parallax2._handleScrollThrottled = M.throttle(Parallax2._handleScroll, 5);
          window.addEventListener("scroll", Parallax2._handleScrollThrottled);
          Parallax2._handleWindowResizeThrottled = M.throttle(Parallax2._handleWindowResize, 5);
          window.addEventListener("resize", Parallax2._handleWindowResizeThrottled);
        }
      }
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        this.$img[0].removeEventListener("load", this._handleImageLoadBound);
        if (Parallax2._parallaxes.length === 0) {
          window.removeEventListener("scroll", Parallax2._handleScrollThrottled);
          window.removeEventListener("resize", Parallax2._handleWindowResizeThrottled);
        }
      }
    }, {
      key: "_setupStyles",
      value: function _setupStyles() {
        this.$img[0].style.opacity = 1;
      }
    }, {
      key: "_handleImageLoad",
      value: function _handleImageLoad() {
        this._updateParallax();
      }
    }, {
      key: "_updateParallax",
      value: function _updateParallax() {
        var containerHeight = this.$el.height() > 0 ? this.el.parentNode.offsetHeight : 500;
        var imgHeight = this.$img[0].offsetHeight;
        var parallaxDist = imgHeight - containerHeight;
        var bottom = this.$el.offset().top + containerHeight;
        var top = this.$el.offset().top;
        var scrollTop = M.getDocumentScrollTop();
        var windowHeight = window.innerHeight;
        var windowBottom = scrollTop + windowHeight;
        var percentScrolled = (windowBottom - top) / (containerHeight + windowHeight);
        var parallax = parallaxDist * percentScrolled;
        if (!this._enabled) {
          this.$img[0].style.transform = "";
        } else if (bottom > scrollTop && top < scrollTop + windowHeight) {
          this.$img[0].style.transform = "translate3D(-50%, " + parallax + "px, 0)";
        }
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Parallax2.__proto__ || Object.getPrototypeOf(Parallax2), "init", this).call(this, this, els, options);
      }
      /**
       * Get Instance
       */
    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Parallax;
      }
    }, {
      key: "_handleScroll",
      value: function _handleScroll() {
        for (var i = 0; i < Parallax2._parallaxes.length; i++) {
          var parallaxInstance = Parallax2._parallaxes[i];
          parallaxInstance._updateParallax.call(parallaxInstance);
        }
      }
    }, {
      key: "_handleWindowResize",
      value: function _handleWindowResize() {
        for (var i = 0; i < Parallax2._parallaxes.length; i++) {
          var parallaxInstance = Parallax2._parallaxes[i];
          parallaxInstance._enabled = window.innerWidth > parallaxInstance.options.responsiveThreshold;
        }
      }
    }, {
      key: "defaults",
      get: function() {
        return _defaults;
      }
    }]);
    return Parallax2;
  }(Component);
  Parallax._parallaxes = [];
  M.Parallax = Parallax;
  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Parallax, "parallax", "M_Parallax");
  }
})(cash);
;
(function($2, anim) {
  "use strict";
  var _defaults = {
    duration: 300,
    onShow: null,
    swipeable: false,
    responsiveThreshold: Infinity
    // breakpoint for swipeable
  };
  var Tabs = function(_Component6) {
    _inherits(Tabs2, _Component6);
    function Tabs2(el, options) {
      _classCallCheck(this, Tabs2);
      var _this22 = _possibleConstructorReturn(this, (Tabs2.__proto__ || Object.getPrototypeOf(Tabs2)).call(this, Tabs2, el, options));
      _this22.el.M_Tabs = _this22;
      _this22.options = $2.extend({}, Tabs2.defaults, options);
      _this22.$tabLinks = _this22.$el.children("li.tab").children("a");
      _this22.index = 0;
      _this22._setupActiveTabLink();
      if (_this22.options.swipeable) {
        _this22._setupSwipeableTabs();
      } else {
        _this22._setupNormalTabs();
      }
      _this22._setTabsAndTabWidth();
      _this22._createIndicator();
      _this22._setupEventHandlers();
      return _this22;
    }
    _createClass(Tabs2, [{
      key: "destroy",
      /**
       * Teardown component
       */
      value: function destroy() {
        this._removeEventHandlers();
        this._indicator.parentNode.removeChild(this._indicator);
        if (this.options.swipeable) {
          this._teardownSwipeableTabs();
        } else {
          this._teardownNormalTabs();
        }
        this.$el[0].M_Tabs = void 0;
      }
      /**
       * Setup Event Handlers
       */
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleWindowResizeBound = this._handleWindowResize.bind(this);
        window.addEventListener("resize", this._handleWindowResizeBound);
        this._handleTabClickBound = this._handleTabClick.bind(this);
        this.el.addEventListener("click", this._handleTabClickBound);
      }
      /**
       * Remove Event Handlers
       */
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        window.removeEventListener("resize", this._handleWindowResizeBound);
        this.el.removeEventListener("click", this._handleTabClickBound);
      }
      /**
       * Handle window Resize
       */
    }, {
      key: "_handleWindowResize",
      value: function _handleWindowResize() {
        this._setTabsAndTabWidth();
        if (this.tabWidth !== 0 && this.tabsWidth !== 0) {
          this._indicator.style.left = this._calcLeftPos(this.$activeTabLink) + "px";
          this._indicator.style.right = this._calcRightPos(this.$activeTabLink) + "px";
        }
      }
      /**
       * Handle tab click
       * @param {Event} e
       */
    }, {
      key: "_handleTabClick",
      value: function _handleTabClick(e) {
        var _this23 = this;
        var tab = $2(e.target).closest("li.tab");
        var tabLink = $2(e.target).closest("a");
        if (!tabLink.length || !tabLink.parent().hasClass("tab")) {
          return;
        }
        if (tab.hasClass("disabled")) {
          e.preventDefault();
          return;
        }
        if (!!tabLink.attr("target")) {
          return;
        }
        this.$activeTabLink.removeClass("active");
        var $oldContent = this.$content;
        this.$activeTabLink = tabLink;
        this.$content = $2(M.escapeHash(tabLink[0].hash));
        this.$tabLinks = this.$el.children("li.tab").children("a");
        this.$activeTabLink.addClass("active");
        var prevIndex = this.index;
        this.index = Math.max(this.$tabLinks.index(tabLink), 0);
        if (this.options.swipeable) {
          if (this._tabsCarousel) {
            this._tabsCarousel.set(this.index, function() {
              if (typeof _this23.options.onShow === "function") {
                _this23.options.onShow.call(_this23, _this23.$content[0]);
              }
            });
          }
        } else {
          if (this.$content.length) {
            this.$content[0].style.display = "block";
            this.$content.addClass("active");
            if (typeof this.options.onShow === "function") {
              this.options.onShow.call(this, this.$content[0]);
            }
            if ($oldContent.length && !$oldContent.is(this.$content)) {
              $oldContent[0].style.display = "none";
              $oldContent.removeClass("active");
            }
          }
        }
        this._setTabsAndTabWidth();
        this._animateIndicator(prevIndex);
        e.preventDefault();
      }
      /**
       * Generate elements for tab indicator.
       */
    }, {
      key: "_createIndicator",
      value: function _createIndicator() {
        var _this24 = this;
        var indicator = document.createElement("li");
        indicator.classList.add("indicator");
        this.el.appendChild(indicator);
        this._indicator = indicator;
        setTimeout(function() {
          _this24._indicator.style.left = _this24._calcLeftPos(_this24.$activeTabLink) + "px";
          _this24._indicator.style.right = _this24._calcRightPos(_this24.$activeTabLink) + "px";
        }, 0);
      }
      /**
       * Setup first active tab link.
       */
    }, {
      key: "_setupActiveTabLink",
      value: function _setupActiveTabLink() {
        this.$activeTabLink = $2(this.$tabLinks.filter('[href="' + location.hash + '"]'));
        if (this.$activeTabLink.length === 0) {
          this.$activeTabLink = this.$el.children("li.tab").children("a.active").first();
        }
        if (this.$activeTabLink.length === 0) {
          this.$activeTabLink = this.$el.children("li.tab").children("a").first();
        }
        this.$tabLinks.removeClass("active");
        this.$activeTabLink[0].classList.add("active");
        this.index = Math.max(this.$tabLinks.index(this.$activeTabLink), 0);
        if (this.$activeTabLink.length) {
          this.$content = $2(M.escapeHash(this.$activeTabLink[0].hash));
          this.$content.addClass("active");
        }
      }
      /**
       * Setup swipeable tabs
       */
    }, {
      key: "_setupSwipeableTabs",
      value: function _setupSwipeableTabs() {
        var _this25 = this;
        if (window.innerWidth > this.options.responsiveThreshold) {
          this.options.swipeable = false;
        }
        var $tabsContent = $2();
        this.$tabLinks.each(function(link) {
          var $currContent = $2(M.escapeHash(link.hash));
          $currContent.addClass("carousel-item");
          $tabsContent = $tabsContent.add($currContent);
        });
        var $tabsWrapper = $2('<div class="tabs-content carousel carousel-slider"></div>');
        $tabsContent.first().before($tabsWrapper);
        $tabsWrapper.append($tabsContent);
        $tabsContent[0].style.display = "";
        var activeTabIndex = this.$activeTabLink.closest(".tab").index();
        this._tabsCarousel = M.Carousel.init($tabsWrapper[0], {
          fullWidth: true,
          noWrap: true,
          onCycleTo: function(item) {
            var prevIndex = _this25.index;
            _this25.index = $2(item).index();
            _this25.$activeTabLink.removeClass("active");
            _this25.$activeTabLink = _this25.$tabLinks.eq(_this25.index);
            _this25.$activeTabLink.addClass("active");
            _this25._animateIndicator(prevIndex);
            if (typeof _this25.options.onShow === "function") {
              _this25.options.onShow.call(_this25, _this25.$content[0]);
            }
          }
        });
        this._tabsCarousel.set(activeTabIndex);
      }
      /**
       * Teardown normal tabs.
       */
    }, {
      key: "_teardownSwipeableTabs",
      value: function _teardownSwipeableTabs() {
        var $tabsWrapper = this._tabsCarousel.$el;
        this._tabsCarousel.destroy();
        $tabsWrapper.after($tabsWrapper.children());
        $tabsWrapper.remove();
      }
      /**
       * Setup normal tabs.
       */
    }, {
      key: "_setupNormalTabs",
      value: function _setupNormalTabs() {
        this.$tabLinks.not(this.$activeTabLink).each(function(link) {
          if (!!link.hash) {
            var $currContent = $2(M.escapeHash(link.hash));
            if ($currContent.length) {
              $currContent[0].style.display = "none";
            }
          }
        });
      }
      /**
       * Teardown normal tabs.
       */
    }, {
      key: "_teardownNormalTabs",
      value: function _teardownNormalTabs() {
        this.$tabLinks.each(function(link) {
          if (!!link.hash) {
            var $currContent = $2(M.escapeHash(link.hash));
            if ($currContent.length) {
              $currContent[0].style.display = "";
            }
          }
        });
      }
      /**
       * set tabs and tab width
       */
    }, {
      key: "_setTabsAndTabWidth",
      value: function _setTabsAndTabWidth() {
        this.tabsWidth = this.$el.width();
        this.tabWidth = Math.max(this.tabsWidth, this.el.scrollWidth) / this.$tabLinks.length;
      }
      /**
       * Finds right attribute for indicator based on active tab.
       * @param {cash} el
       */
    }, {
      key: "_calcRightPos",
      value: function _calcRightPos(el) {
        return Math.ceil(this.tabsWidth - el.position().left - el[0].getBoundingClientRect().width);
      }
      /**
       * Finds left attribute for indicator based on active tab.
       * @param {cash} el
       */
    }, {
      key: "_calcLeftPos",
      value: function _calcLeftPos(el) {
        return Math.floor(el.position().left);
      }
    }, {
      key: "updateTabIndicator",
      value: function updateTabIndicator() {
        this._setTabsAndTabWidth();
        this._animateIndicator(this.index);
      }
      /**
       * Animates Indicator to active tab.
       * @param {Number} prevIndex
       */
    }, {
      key: "_animateIndicator",
      value: function _animateIndicator(prevIndex) {
        var leftDelay = 0, rightDelay = 0;
        if (this.index - prevIndex >= 0) {
          leftDelay = 90;
        } else {
          rightDelay = 90;
        }
        var animOptions = {
          targets: this._indicator,
          left: {
            value: this._calcLeftPos(this.$activeTabLink),
            delay: leftDelay
          },
          right: {
            value: this._calcRightPos(this.$activeTabLink),
            delay: rightDelay
          },
          duration: this.options.duration,
          easing: "easeOutQuad"
        };
        anim.remove(this._indicator);
        anim(animOptions);
      }
      /**
       * Select tab.
       * @param {String} tabId
       */
    }, {
      key: "select",
      value: function select(tabId) {
        var tab = this.$tabLinks.filter('[href="#' + tabId + '"]');
        if (tab.length) {
          tab.trigger("click");
        }
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Tabs2.__proto__ || Object.getPrototypeOf(Tabs2), "init", this).call(this, this, els, options);
      }
      /**
       * Get Instance
       */
    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Tabs;
      }
    }, {
      key: "defaults",
      get: function() {
        return _defaults;
      }
    }]);
    return Tabs2;
  }(Component);
  M.Tabs = Tabs;
  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Tabs, "tabs", "M_Tabs");
  }
})(cash, M.anime);
;
(function($2, anim) {
  "use strict";
  var _defaults = {
    exitDelay: 200,
    enterDelay: 0,
    html: null,
    margin: 5,
    inDuration: 250,
    outDuration: 200,
    position: "bottom",
    transitionMovement: 10
  };
  var Tooltip = function(_Component7) {
    _inherits(Tooltip2, _Component7);
    function Tooltip2(el, options) {
      _classCallCheck(this, Tooltip2);
      var _this26 = _possibleConstructorReturn(this, (Tooltip2.__proto__ || Object.getPrototypeOf(Tooltip2)).call(this, Tooltip2, el, options));
      _this26.el.M_Tooltip = _this26;
      _this26.options = $2.extend({}, Tooltip2.defaults, options);
      _this26.isOpen = false;
      _this26.isHovered = false;
      _this26.isFocused = false;
      _this26._appendTooltipEl();
      _this26._setupEventHandlers();
      return _this26;
    }
    _createClass(Tooltip2, [{
      key: "destroy",
      /**
       * Teardown component
       */
      value: function destroy() {
        $2(this.tooltipEl).remove();
        this._removeEventHandlers();
        this.el.M_Tooltip = void 0;
      }
    }, {
      key: "_appendTooltipEl",
      value: function _appendTooltipEl() {
        var tooltipEl = document.createElement("div");
        tooltipEl.classList.add("material-tooltip");
        this.tooltipEl = tooltipEl;
        var tooltipContentEl = document.createElement("div");
        tooltipContentEl.classList.add("tooltip-content");
        tooltipContentEl.innerHTML = this.options.html;
        tooltipEl.appendChild(tooltipContentEl);
        document.body.appendChild(tooltipEl);
      }
    }, {
      key: "_updateTooltipContent",
      value: function _updateTooltipContent() {
        this.tooltipEl.querySelector(".tooltip-content").innerHTML = this.options.html;
      }
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleMouseEnterBound = this._handleMouseEnter.bind(this);
        this._handleMouseLeaveBound = this._handleMouseLeave.bind(this);
        this._handleFocusBound = this._handleFocus.bind(this);
        this._handleBlurBound = this._handleBlur.bind(this);
        this.el.addEventListener("mouseenter", this._handleMouseEnterBound);
        this.el.addEventListener("mouseleave", this._handleMouseLeaveBound);
        this.el.addEventListener("focus", this._handleFocusBound, true);
        this.el.addEventListener("blur", this._handleBlurBound, true);
      }
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        this.el.removeEventListener("mouseenter", this._handleMouseEnterBound);
        this.el.removeEventListener("mouseleave", this._handleMouseLeaveBound);
        this.el.removeEventListener("focus", this._handleFocusBound, true);
        this.el.removeEventListener("blur", this._handleBlurBound, true);
      }
    }, {
      key: "open",
      value: function open(isManual) {
        if (this.isOpen) {
          return;
        }
        isManual = isManual === void 0 ? true : void 0;
        this.isOpen = true;
        this.options = $2.extend({}, this.options, this._getAttributeOptions());
        this._updateTooltipContent();
        this._setEnterDelayTimeout(isManual);
      }
    }, {
      key: "close",
      value: function close() {
        if (!this.isOpen) {
          return;
        }
        this.isHovered = false;
        this.isFocused = false;
        this.isOpen = false;
        this._setExitDelayTimeout();
      }
      /**
       * Create timeout which delays when the tooltip closes
       */
    }, {
      key: "_setExitDelayTimeout",
      value: function _setExitDelayTimeout() {
        var _this27 = this;
        clearTimeout(this._exitDelayTimeout);
        this._exitDelayTimeout = setTimeout(function() {
          if (_this27.isHovered || _this27.isFocused) {
            return;
          }
          _this27._animateOut();
        }, this.options.exitDelay);
      }
      /**
       * Create timeout which delays when the toast closes
       */
    }, {
      key: "_setEnterDelayTimeout",
      value: function _setEnterDelayTimeout(isManual) {
        var _this28 = this;
        clearTimeout(this._enterDelayTimeout);
        this._enterDelayTimeout = setTimeout(function() {
          if (!_this28.isHovered && !_this28.isFocused && !isManual) {
            return;
          }
          _this28._animateIn();
        }, this.options.enterDelay);
      }
    }, {
      key: "_positionTooltip",
      value: function _positionTooltip() {
        var origin = this.el, tooltip = this.tooltipEl, originHeight = origin.offsetHeight, originWidth = origin.offsetWidth, tooltipHeight = tooltip.offsetHeight, tooltipWidth = tooltip.offsetWidth, newCoordinates = void 0, margin = this.options.margin, targetTop = void 0, targetLeft = void 0;
        this.xMovement = 0, this.yMovement = 0;
        targetTop = origin.getBoundingClientRect().top + M.getDocumentScrollTop();
        targetLeft = origin.getBoundingClientRect().left + M.getDocumentScrollLeft();
        if (this.options.position === "top") {
          targetTop += -tooltipHeight - margin;
          targetLeft += originWidth / 2 - tooltipWidth / 2;
          this.yMovement = -this.options.transitionMovement;
        } else if (this.options.position === "right") {
          targetTop += originHeight / 2 - tooltipHeight / 2;
          targetLeft += originWidth + margin;
          this.xMovement = this.options.transitionMovement;
        } else if (this.options.position === "left") {
          targetTop += originHeight / 2 - tooltipHeight / 2;
          targetLeft += -tooltipWidth - margin;
          this.xMovement = -this.options.transitionMovement;
        } else {
          targetTop += originHeight + margin;
          targetLeft += originWidth / 2 - tooltipWidth / 2;
          this.yMovement = this.options.transitionMovement;
        }
        newCoordinates = this._repositionWithinScreen(targetLeft, targetTop, tooltipWidth, tooltipHeight);
        $2(tooltip).css({
          top: newCoordinates.y + "px",
          left: newCoordinates.x + "px"
        });
      }
    }, {
      key: "_repositionWithinScreen",
      value: function _repositionWithinScreen(x, y, width, height) {
        var scrollLeft = M.getDocumentScrollLeft();
        var scrollTop = M.getDocumentScrollTop();
        var newX = x - scrollLeft;
        var newY = y - scrollTop;
        var bounding = {
          left: newX,
          top: newY,
          width,
          height
        };
        var offset = this.options.margin + this.options.transitionMovement;
        var edges = M.checkWithinContainer(document.body, bounding, offset);
        if (edges.left) {
          newX = offset;
        } else if (edges.right) {
          newX -= newX + width - window.innerWidth;
        }
        if (edges.top) {
          newY = offset;
        } else if (edges.bottom) {
          newY -= newY + height - window.innerHeight;
        }
        return {
          x: newX + scrollLeft,
          y: newY + scrollTop
        };
      }
    }, {
      key: "_animateIn",
      value: function _animateIn() {
        this._positionTooltip();
        this.tooltipEl.style.visibility = "visible";
        anim.remove(this.tooltipEl);
        anim({
          targets: this.tooltipEl,
          opacity: 1,
          translateX: this.xMovement,
          translateY: this.yMovement,
          duration: this.options.inDuration,
          easing: "easeOutCubic"
        });
      }
    }, {
      key: "_animateOut",
      value: function _animateOut() {
        anim.remove(this.tooltipEl);
        anim({
          targets: this.tooltipEl,
          opacity: 0,
          translateX: 0,
          translateY: 0,
          duration: this.options.outDuration,
          easing: "easeOutCubic"
        });
      }
    }, {
      key: "_handleMouseEnter",
      value: function _handleMouseEnter() {
        this.isHovered = true;
        this.isFocused = false;
        this.open(false);
      }
    }, {
      key: "_handleMouseLeave",
      value: function _handleMouseLeave() {
        this.isHovered = false;
        this.isFocused = false;
        this.close();
      }
    }, {
      key: "_handleFocus",
      value: function _handleFocus() {
        if (M.tabPressed) {
          this.isFocused = true;
          this.open(false);
        }
      }
    }, {
      key: "_handleBlur",
      value: function _handleBlur() {
        this.isFocused = false;
        this.close();
      }
    }, {
      key: "_getAttributeOptions",
      value: function _getAttributeOptions() {
        var attributeOptions = {};
        var tooltipTextOption = this.el.getAttribute("data-tooltip");
        var positionOption = this.el.getAttribute("data-position");
        if (tooltipTextOption) {
          attributeOptions.html = tooltipTextOption;
        }
        if (positionOption) {
          attributeOptions.position = positionOption;
        }
        return attributeOptions;
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Tooltip2.__proto__ || Object.getPrototypeOf(Tooltip2), "init", this).call(this, this, els, options);
      }
      /**
       * Get Instance
       */
    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Tooltip;
      }
    }, {
      key: "defaults",
      get: function() {
        return _defaults;
      }
    }]);
    return Tooltip2;
  }(Component);
  M.Tooltip = Tooltip;
  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Tooltip, "tooltip", "M_Tooltip");
  }
})(cash, M.anime);
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
(function($2, anim) {
  "use strict";
  var _defaults = {
    html: "",
    displayLength: 4e3,
    inDuration: 300,
    outDuration: 375,
    classes: "",
    completeCallback: null,
    activationPercent: 0.8
  };
  var Toast = function() {
    function Toast2(options) {
      _classCallCheck(this, Toast2);
      this.options = $2.extend({}, Toast2.defaults, options);
      this.message = this.options.html;
      this.panning = false;
      this.timeRemaining = this.options.displayLength;
      if (Toast2._toasts.length === 0) {
        Toast2._createContainer();
      }
      Toast2._toasts.push(this);
      var toastElement = this._createToast();
      toastElement.M_Toast = this;
      this.el = toastElement;
      this.$el = $2(toastElement);
      this._animateIn();
      this._setTimer();
    }
    _createClass(Toast2, [{
      key: "_createToast",
      /**
       * Create toast and append it to toast container
       */
      value: function _createToast() {
        var toast = document.createElement("div");
        toast.classList.add("toast");
        if (!!this.options.classes.length) {
          $2(toast).addClass(this.options.classes);
        }
        if (typeof HTMLElement === "object" ? this.message instanceof HTMLElement : this.message && typeof this.message === "object" && this.message !== null && this.message.nodeType === 1 && typeof this.message.nodeName === "string") {
          toast.appendChild(this.message);
        } else if (!!this.message.jquery) {
          $2(toast).append(this.message[0]);
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
        anim({
          targets: this.el,
          top: 0,
          opacity: 1,
          duration: this.options.inDuration,
          easing: "easeOutCubic"
        });
      }
      /**
       * Create setInterval which automatically removes toast when timeRemaining >= 0
       * has been reached
       */
    }, {
      key: "_setTimer",
      value: function _setTimer() {
        var _this29 = this;
        if (this.timeRemaining !== Infinity) {
          this.counterInterval = setInterval(function() {
            if (!_this29.panning) {
              _this29.timeRemaining -= 20;
            }
            if (_this29.timeRemaining <= 0) {
              _this29.dismiss();
            }
          }, 20);
        }
      }
      /**
       * Dismiss toast with animation
       */
    }, {
      key: "dismiss",
      value: function dismiss() {
        var _this30 = this;
        window.clearInterval(this.counterInterval);
        var activationDistance = this.el.offsetWidth * this.options.activationPercent;
        if (this.wasSwiped) {
          this.el.style.transition = "transform .05s, opacity .05s";
          this.el.style.transform = "translateX(" + activationDistance + "px)";
          this.el.style.opacity = 0;
        }
        anim({
          targets: this.el,
          opacity: 0,
          marginTop: -40,
          duration: this.options.outDuration,
          easing: "easeOutExpo",
          complete: function() {
            if (typeof _this30.options.completeCallback === "function") {
              _this30.options.completeCallback();
            }
            _this30.$el.remove();
            Toast2._toasts.splice(Toast2._toasts.indexOf(_this30), 1);
            if (Toast2._toasts.length === 0) {
              Toast2._removeContainer();
            }
          }
        });
      }
    }], [{
      key: "getInstance",
      /**
       * Get Instance
       */
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Toast;
      }
      /**
       * Append toast container and add event handlers
       */
    }, {
      key: "_createContainer",
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
        $2(Toast2._container).remove();
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
       */
    }, {
      key: "_onDragEnd",
      value: function _onDragEnd() {
        if (!!Toast2._draggedToast) {
          var toast = Toast2._draggedToast;
          toast.panning = false;
          toast.el.classList.remove("panning");
          var totalDeltaX = toast.xPos - toast.startingXPos;
          var activationDistance = toast.el.offsetWidth * toast.options.activationPercent;
          var shouldBeDismissed = Math.abs(totalDeltaX) > activationDistance || toast.velocityX > 1;
          if (shouldBeDismissed) {
            toast.wasSwiped = true;
            toast.dismiss();
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
      key: "dismissAll",
      value: function dismissAll() {
        for (var toastIndex in Toast2._toasts) {
          Toast2._toasts[toastIndex].dismiss();
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
  M.Toast = Toast;
  M.toast = function(options) {
    return new Toast(options);
  };
})(cash, M.anime);
;
(function($2, anim) {
  "use strict";
  var _defaults = {
    edge: "left",
    draggable: true,
    inDuration: 250,
    outDuration: 200,
    onOpenStart: null,
    onOpenEnd: null,
    onCloseStart: null,
    onCloseEnd: null,
    preventScrolling: true
  };
  var Sidenav = function(_Component8) {
    _inherits(Sidenav2, _Component8);
    function Sidenav2(el, options) {
      _classCallCheck(this, Sidenav2);
      var _this31 = _possibleConstructorReturn(this, (Sidenav2.__proto__ || Object.getPrototypeOf(Sidenav2)).call(this, Sidenav2, el, options));
      _this31.el.M_Sidenav = _this31;
      _this31.id = _this31.$el.attr("id");
      _this31.options = $2.extend({}, Sidenav2.defaults, options);
      _this31.isOpen = false;
      _this31.isFixed = _this31.el.classList.contains("sidenav-fixed");
      _this31.isDragged = false;
      _this31.lastWindowWidth = window.innerWidth;
      _this31.lastWindowHeight = window.innerHeight;
      _this31._createOverlay();
      _this31._createDragTarget();
      _this31._setupEventHandlers();
      _this31._setupClasses();
      _this31._setupFixed();
      Sidenav2._sidenavs.push(_this31);
      return _this31;
    }
    _createClass(Sidenav2, [{
      key: "destroy",
      /**
       * Teardown component
       */
      value: function destroy() {
        this._removeEventHandlers();
        this._enableBodyScrolling();
        this._overlay.parentNode.removeChild(this._overlay);
        this.dragTarget.parentNode.removeChild(this.dragTarget);
        this.el.M_Sidenav = void 0;
        this.el.style.transform = "";
        var index = Sidenav2._sidenavs.indexOf(this);
        if (index >= 0) {
          Sidenav2._sidenavs.splice(index, 1);
        }
      }
    }, {
      key: "_createOverlay",
      value: function _createOverlay() {
        var overlay = document.createElement("div");
        this._closeBound = this.close.bind(this);
        overlay.classList.add("sidenav-overlay");
        overlay.addEventListener("click", this._closeBound);
        document.body.appendChild(overlay);
        this._overlay = overlay;
      }
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        if (Sidenav2._sidenavs.length === 0) {
          document.body.addEventListener("click", this._handleTriggerClick);
        }
        this._handleDragTargetDragBound = this._handleDragTargetDrag.bind(this);
        this._handleDragTargetReleaseBound = this._handleDragTargetRelease.bind(this);
        this._handleCloseDragBound = this._handleCloseDrag.bind(this);
        this._handleCloseReleaseBound = this._handleCloseRelease.bind(this);
        this._handleCloseTriggerClickBound = this._handleCloseTriggerClick.bind(this);
        this.dragTarget.addEventListener("touchmove", this._handleDragTargetDragBound);
        this.dragTarget.addEventListener("touchend", this._handleDragTargetReleaseBound);
        this._overlay.addEventListener("touchmove", this._handleCloseDragBound);
        this._overlay.addEventListener("touchend", this._handleCloseReleaseBound);
        this.el.addEventListener("touchmove", this._handleCloseDragBound);
        this.el.addEventListener("touchend", this._handleCloseReleaseBound);
        this.el.addEventListener("click", this._handleCloseTriggerClickBound);
        if (this.isFixed) {
          this._handleWindowResizeBound = this._handleWindowResize.bind(this);
          window.addEventListener("resize", this._handleWindowResizeBound);
        }
      }
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        if (Sidenav2._sidenavs.length === 1) {
          document.body.removeEventListener("click", this._handleTriggerClick);
        }
        this.dragTarget.removeEventListener("touchmove", this._handleDragTargetDragBound);
        this.dragTarget.removeEventListener("touchend", this._handleDragTargetReleaseBound);
        this._overlay.removeEventListener("touchmove", this._handleCloseDragBound);
        this._overlay.removeEventListener("touchend", this._handleCloseReleaseBound);
        this.el.removeEventListener("touchmove", this._handleCloseDragBound);
        this.el.removeEventListener("touchend", this._handleCloseReleaseBound);
        this.el.removeEventListener("click", this._handleCloseTriggerClickBound);
        if (this.isFixed) {
          window.removeEventListener("resize", this._handleWindowResizeBound);
        }
      }
      /**
       * Handle Trigger Click
       * @param {Event} e
       */
    }, {
      key: "_handleTriggerClick",
      value: function _handleTriggerClick(e) {
        var $trigger = $2(e.target).closest(".sidenav-trigger");
        if (e.target && $trigger.length) {
          var sidenavId = M.getIdFromTrigger($trigger[0]);
          var sidenavInstance = document.getElementById(sidenavId).M_Sidenav;
          if (sidenavInstance) {
            sidenavInstance.open($trigger);
          }
          e.preventDefault();
        }
      }
      /**
       * Set variables needed at the beggining of drag
       * and stop any current transition.
       * @param {Event} e
       */
    }, {
      key: "_startDrag",
      value: function _startDrag(e) {
        var clientX = e.targetTouches[0].clientX;
        this.isDragged = true;
        this._startingXpos = clientX;
        this._xPos = this._startingXpos;
        this._time = Date.now();
        this._width = this.el.getBoundingClientRect().width;
        this._overlay.style.display = "block";
        this._initialScrollTop = this.isOpen ? this.el.scrollTop : M.getDocumentScrollTop();
        this._verticallyScrolling = false;
        anim.remove(this.el);
        anim.remove(this._overlay);
      }
      /**
       * Set variables needed at each drag move update tick
       * @param {Event} e
       */
    }, {
      key: "_dragMoveUpdate",
      value: function _dragMoveUpdate(e) {
        var clientX = e.targetTouches[0].clientX;
        var currentScrollTop = this.isOpen ? this.el.scrollTop : M.getDocumentScrollTop();
        this.deltaX = Math.abs(this._xPos - clientX);
        this._xPos = clientX;
        this.velocityX = this.deltaX / (Date.now() - this._time);
        this._time = Date.now();
        if (this._initialScrollTop !== currentScrollTop) {
          this._verticallyScrolling = true;
        }
      }
      /**
       * Handles Dragging of Sidenav
       * @param {Event} e
       */
    }, {
      key: "_handleDragTargetDrag",
      value: function _handleDragTargetDrag(e) {
        if (!this.options.draggable || this._isCurrentlyFixed() || this._verticallyScrolling) {
          return;
        }
        if (!this.isDragged) {
          this._startDrag(e);
        }
        this._dragMoveUpdate(e);
        var totalDeltaX = this._xPos - this._startingXpos;
        var dragDirection = totalDeltaX > 0 ? "right" : "left";
        totalDeltaX = Math.min(this._width, Math.abs(totalDeltaX));
        if (this.options.edge === dragDirection) {
          totalDeltaX = 0;
        }
        var transformX = totalDeltaX;
        var transformPrefix = "translateX(-100%)";
        if (this.options.edge === "right") {
          transformPrefix = "translateX(100%)";
          transformX = -transformX;
        }
        this.percentOpen = Math.min(1, totalDeltaX / this._width);
        this.el.style.transform = transformPrefix + " translateX(" + transformX + "px)";
        this._overlay.style.opacity = this.percentOpen;
      }
      /**
       * Handle Drag Target Release
       */
    }, {
      key: "_handleDragTargetRelease",
      value: function _handleDragTargetRelease() {
        if (this.isDragged) {
          if (this.percentOpen > 0.2) {
            this.open();
          } else {
            this._animateOut();
          }
          this.isDragged = false;
          this._verticallyScrolling = false;
        }
      }
      /**
       * Handle Close Drag
       * @param {Event} e
       */
    }, {
      key: "_handleCloseDrag",
      value: function _handleCloseDrag(e) {
        if (this.isOpen) {
          if (!this.options.draggable || this._isCurrentlyFixed() || this._verticallyScrolling) {
            return;
          }
          if (!this.isDragged) {
            this._startDrag(e);
          }
          this._dragMoveUpdate(e);
          var totalDeltaX = this._xPos - this._startingXpos;
          var dragDirection = totalDeltaX > 0 ? "right" : "left";
          totalDeltaX = Math.min(this._width, Math.abs(totalDeltaX));
          if (this.options.edge !== dragDirection) {
            totalDeltaX = 0;
          }
          var transformX = -totalDeltaX;
          if (this.options.edge === "right") {
            transformX = -transformX;
          }
          this.percentOpen = Math.min(1, 1 - totalDeltaX / this._width);
          this.el.style.transform = "translateX(" + transformX + "px)";
          this._overlay.style.opacity = this.percentOpen;
        }
      }
      /**
       * Handle Close Release
       */
    }, {
      key: "_handleCloseRelease",
      value: function _handleCloseRelease() {
        if (this.isOpen && this.isDragged) {
          if (this.percentOpen > 0.8) {
            this._animateIn();
          } else {
            this.close();
          }
          this.isDragged = false;
          this._verticallyScrolling = false;
        }
      }
      /**
       * Handles closing of Sidenav when element with class .sidenav-close
       */
    }, {
      key: "_handleCloseTriggerClick",
      value: function _handleCloseTriggerClick(e) {
        var $closeTrigger = $2(e.target).closest(".sidenav-close");
        if ($closeTrigger.length && !this._isCurrentlyFixed()) {
          this.close();
        }
      }
      /**
       * Handle Window Resize
       */
    }, {
      key: "_handleWindowResize",
      value: function _handleWindowResize() {
        if (this.lastWindowWidth !== window.innerWidth) {
          if (window.innerWidth > 992) {
            this.open();
          } else {
            this.close();
          }
        }
        this.lastWindowWidth = window.innerWidth;
        this.lastWindowHeight = window.innerHeight;
      }
    }, {
      key: "_setupClasses",
      value: function _setupClasses() {
        if (this.options.edge === "right") {
          this.el.classList.add("right-aligned");
          this.dragTarget.classList.add("right-aligned");
        }
      }
    }, {
      key: "_removeClasses",
      value: function _removeClasses() {
        this.el.classList.remove("right-aligned");
        this.dragTarget.classList.remove("right-aligned");
      }
    }, {
      key: "_setupFixed",
      value: function _setupFixed() {
        if (this._isCurrentlyFixed()) {
          this.open();
        }
      }
    }, {
      key: "_isCurrentlyFixed",
      value: function _isCurrentlyFixed() {
        return this.isFixed && window.innerWidth > 992;
      }
    }, {
      key: "_createDragTarget",
      value: function _createDragTarget() {
        var dragTarget = document.createElement("div");
        dragTarget.classList.add("drag-target");
        document.body.appendChild(dragTarget);
        this.dragTarget = dragTarget;
      }
    }, {
      key: "_preventBodyScrolling",
      value: function _preventBodyScrolling() {
        var body = document.body;
        body.style.overflow = "hidden";
      }
    }, {
      key: "_enableBodyScrolling",
      value: function _enableBodyScrolling() {
        var body = document.body;
        body.style.overflow = "";
      }
    }, {
      key: "open",
      value: function open() {
        if (this.isOpen === true) {
          return;
        }
        this.isOpen = true;
        if (typeof this.options.onOpenStart === "function") {
          this.options.onOpenStart.call(this, this.el);
        }
        if (this._isCurrentlyFixed()) {
          anim.remove(this.el);
          anim({
            targets: this.el,
            translateX: 0,
            duration: 0,
            easing: "easeOutQuad"
          });
          this._enableBodyScrolling();
          this._overlay.style.display = "none";
        } else {
          if (this.options.preventScrolling) {
            this._preventBodyScrolling();
          }
          if (!this.isDragged || this.percentOpen != 1) {
            this._animateIn();
          }
        }
      }
    }, {
      key: "close",
      value: function close() {
        if (this.isOpen === false) {
          return;
        }
        this.isOpen = false;
        if (typeof this.options.onCloseStart === "function") {
          this.options.onCloseStart.call(this, this.el);
        }
        if (this._isCurrentlyFixed()) {
          var transformX = this.options.edge === "left" ? "-105%" : "105%";
          this.el.style.transform = "translateX(" + transformX + ")";
        } else {
          this._enableBodyScrolling();
          if (!this.isDragged || this.percentOpen != 0) {
            this._animateOut();
          } else {
            this._overlay.style.display = "none";
          }
        }
      }
    }, {
      key: "_animateIn",
      value: function _animateIn() {
        this._animateSidenavIn();
        this._animateOverlayIn();
      }
    }, {
      key: "_animateSidenavIn",
      value: function _animateSidenavIn() {
        var _this32 = this;
        var slideOutPercent = this.options.edge === "left" ? -1 : 1;
        if (this.isDragged) {
          slideOutPercent = this.options.edge === "left" ? slideOutPercent + this.percentOpen : slideOutPercent - this.percentOpen;
        }
        anim.remove(this.el);
        anim({
          targets: this.el,
          translateX: [slideOutPercent * 100 + "%", 0],
          duration: this.options.inDuration,
          easing: "easeOutQuad",
          complete: function() {
            if (typeof _this32.options.onOpenEnd === "function") {
              _this32.options.onOpenEnd.call(_this32, _this32.el);
            }
          }
        });
      }
    }, {
      key: "_animateOverlayIn",
      value: function _animateOverlayIn() {
        var start = 0;
        if (this.isDragged) {
          start = this.percentOpen;
        } else {
          $2(this._overlay).css({
            display: "block"
          });
        }
        anim.remove(this._overlay);
        anim({
          targets: this._overlay,
          opacity: [start, 1],
          duration: this.options.inDuration,
          easing: "easeOutQuad"
        });
      }
    }, {
      key: "_animateOut",
      value: function _animateOut() {
        this._animateSidenavOut();
        this._animateOverlayOut();
      }
    }, {
      key: "_animateSidenavOut",
      value: function _animateSidenavOut() {
        var _this33 = this;
        var endPercent = this.options.edge === "left" ? -1 : 1;
        var slideOutPercent = 0;
        if (this.isDragged) {
          slideOutPercent = this.options.edge === "left" ? endPercent + this.percentOpen : endPercent - this.percentOpen;
        }
        anim.remove(this.el);
        anim({
          targets: this.el,
          translateX: [slideOutPercent * 100 + "%", endPercent * 105 + "%"],
          duration: this.options.outDuration,
          easing: "easeOutQuad",
          complete: function() {
            if (typeof _this33.options.onCloseEnd === "function") {
              _this33.options.onCloseEnd.call(_this33, _this33.el);
            }
          }
        });
      }
    }, {
      key: "_animateOverlayOut",
      value: function _animateOverlayOut() {
        var _this34 = this;
        anim.remove(this._overlay);
        anim({
          targets: this._overlay,
          opacity: 0,
          duration: this.options.outDuration,
          easing: "easeOutQuad",
          complete: function() {
            $2(_this34._overlay).css("display", "none");
          }
        });
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Sidenav2.__proto__ || Object.getPrototypeOf(Sidenav2), "init", this).call(this, this, els, options);
      }
      /**
       * Get Instance
       */
    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Sidenav;
      }
    }, {
      key: "defaults",
      get: function() {
        return _defaults;
      }
    }]);
    return Sidenav2;
  }(Component);
  Sidenav._sidenavs = [];
  M.Sidenav = Sidenav;
  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Sidenav, "sidenav", "M_Sidenav");
  }
})(cash, M.anime);
;
(function($2, anim) {
  "use strict";
  var _defaults = {
    throttle: 100,
    scrollOffset: 200,
    // offset - 200 allows elements near bottom of page to scroll
    activeClass: "active",
    getActiveElement: function(id) {
      return 'a[href="#' + id + '"]';
    }
  };
  var ScrollSpy = function(_Component9) {
    _inherits(ScrollSpy2, _Component9);
    function ScrollSpy2(el, options) {
      _classCallCheck(this, ScrollSpy2);
      var _this35 = _possibleConstructorReturn(this, (ScrollSpy2.__proto__ || Object.getPrototypeOf(ScrollSpy2)).call(this, ScrollSpy2, el, options));
      _this35.el.M_ScrollSpy = _this35;
      _this35.options = $2.extend({}, ScrollSpy2.defaults, options);
      ScrollSpy2._elements.push(_this35);
      ScrollSpy2._count++;
      ScrollSpy2._increment++;
      _this35.tickId = -1;
      _this35.id = ScrollSpy2._increment;
      _this35._setupEventHandlers();
      _this35._handleWindowScroll();
      return _this35;
    }
    _createClass(ScrollSpy2, [{
      key: "destroy",
      /**
       * Teardown component
       */
      value: function destroy() {
        ScrollSpy2._elements.splice(ScrollSpy2._elements.indexOf(this), 1);
        ScrollSpy2._elementsInView.splice(ScrollSpy2._elementsInView.indexOf(this), 1);
        ScrollSpy2._visibleElements.splice(ScrollSpy2._visibleElements.indexOf(this.$el), 1);
        ScrollSpy2._count--;
        this._removeEventHandlers();
        $2(this.options.getActiveElement(this.$el.attr("id"))).removeClass(this.options.activeClass);
        this.el.M_ScrollSpy = void 0;
      }
      /**
       * Setup Event Handlers
       */
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        var throttledResize = M.throttle(this._handleWindowScroll, 200);
        this._handleThrottledResizeBound = throttledResize.bind(this);
        this._handleWindowScrollBound = this._handleWindowScroll.bind(this);
        if (ScrollSpy2._count === 1) {
          window.addEventListener("scroll", this._handleWindowScrollBound);
          window.addEventListener("resize", this._handleThrottledResizeBound);
          document.body.addEventListener("click", this._handleTriggerClick);
        }
      }
      /**
       * Remove Event Handlers
       */
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        if (ScrollSpy2._count === 0) {
          window.removeEventListener("scroll", this._handleWindowScrollBound);
          window.removeEventListener("resize", this._handleThrottledResizeBound);
          document.body.removeEventListener("click", this._handleTriggerClick);
        }
      }
      /**
       * Handle Trigger Click
       * @param {Event} e
       */
    }, {
      key: "_handleTriggerClick",
      value: function _handleTriggerClick(e) {
        var $trigger = $2(e.target);
        for (var i = ScrollSpy2._elements.length - 1; i >= 0; i--) {
          var scrollspy = ScrollSpy2._elements[i];
          if ($trigger.is('a[href="#' + scrollspy.$el.attr("id") + '"]')) {
            e.preventDefault();
            var offset = scrollspy.$el.offset().top + 1;
            anim({
              targets: [document.documentElement, document.body],
              scrollTop: offset - scrollspy.options.scrollOffset,
              duration: 400,
              easing: "easeOutCubic"
            });
            break;
          }
        }
      }
      /**
       * Handle Window Scroll
       */
    }, {
      key: "_handleWindowScroll",
      value: function _handleWindowScroll() {
        ScrollSpy2._ticks++;
        var top = M.getDocumentScrollTop(), left = M.getDocumentScrollLeft(), right = left + window.innerWidth, bottom = top + window.innerHeight;
        var intersections = ScrollSpy2._findElements(top, right, bottom, left);
        for (var i = 0; i < intersections.length; i++) {
          var scrollspy = intersections[i];
          var lastTick = scrollspy.tickId;
          if (lastTick < 0) {
            scrollspy._enter();
          }
          scrollspy.tickId = ScrollSpy2._ticks;
        }
        for (var _i = 0; _i < ScrollSpy2._elementsInView.length; _i++) {
          var _scrollspy = ScrollSpy2._elementsInView[_i];
          var _lastTick = _scrollspy.tickId;
          if (_lastTick >= 0 && _lastTick !== ScrollSpy2._ticks) {
            _scrollspy._exit();
            _scrollspy.tickId = -1;
          }
        }
        ScrollSpy2._elementsInView = intersections;
      }
      /**
       * Find elements that are within the boundary
       * @param {number} top
       * @param {number} right
       * @param {number} bottom
       * @param {number} left
       * @return {Array.<ScrollSpy>}   A collection of elements
       */
    }, {
      key: "_enter",
      value: function _enter() {
        ScrollSpy2._visibleElements = ScrollSpy2._visibleElements.filter(function(value) {
          return value.height() != 0;
        });
        if (ScrollSpy2._visibleElements[0]) {
          $2(this.options.getActiveElement(ScrollSpy2._visibleElements[0].attr("id"))).removeClass(this.options.activeClass);
          if (ScrollSpy2._visibleElements[0][0].M_ScrollSpy && this.id < ScrollSpy2._visibleElements[0][0].M_ScrollSpy.id) {
            ScrollSpy2._visibleElements.unshift(this.$el);
          } else {
            ScrollSpy2._visibleElements.push(this.$el);
          }
        } else {
          ScrollSpy2._visibleElements.push(this.$el);
        }
        $2(this.options.getActiveElement(ScrollSpy2._visibleElements[0].attr("id"))).addClass(this.options.activeClass);
      }
    }, {
      key: "_exit",
      value: function _exit() {
        var _this36 = this;
        ScrollSpy2._visibleElements = ScrollSpy2._visibleElements.filter(function(value) {
          return value.height() != 0;
        });
        if (ScrollSpy2._visibleElements[0]) {
          $2(this.options.getActiveElement(ScrollSpy2._visibleElements[0].attr("id"))).removeClass(this.options.activeClass);
          ScrollSpy2._visibleElements = ScrollSpy2._visibleElements.filter(function(el) {
            return el.attr("id") != _this36.$el.attr("id");
          });
          if (ScrollSpy2._visibleElements[0]) {
            $2(this.options.getActiveElement(ScrollSpy2._visibleElements[0].attr("id"))).addClass(this.options.activeClass);
          }
        }
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(ScrollSpy2.__proto__ || Object.getPrototypeOf(ScrollSpy2), "init", this).call(this, this, els, options);
      }
      /**
       * Get Instance
       */
    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_ScrollSpy;
      }
    }, {
      key: "_findElements",
      value: function _findElements(top, right, bottom, left) {
        var hits = [];
        for (var i = 0; i < ScrollSpy2._elements.length; i++) {
          var scrollspy = ScrollSpy2._elements[i];
          var currTop = top + scrollspy.options.scrollOffset || 200;
          if (scrollspy.$el.height() > 0) {
            var elTop = scrollspy.$el.offset().top, elLeft = scrollspy.$el.offset().left, elRight = elLeft + scrollspy.$el.width(), elBottom = elTop + scrollspy.$el.height();
            var isIntersect = !(elLeft > right || elRight < left || elTop > bottom || elBottom < currTop);
            if (isIntersect) {
              hits.push(scrollspy);
            }
          }
        }
        return hits;
      }
    }, {
      key: "defaults",
      get: function() {
        return _defaults;
      }
    }]);
    return ScrollSpy2;
  }(Component);
  ScrollSpy._elements = [];
  ScrollSpy._elementsInView = [];
  ScrollSpy._visibleElements = [];
  ScrollSpy._count = 0;
  ScrollSpy._increment = 0;
  ScrollSpy._ticks = 0;
  M.ScrollSpy = ScrollSpy;
  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(ScrollSpy, "scrollSpy", "M_ScrollSpy");
  }
})(cash, M.anime);
;
(function($2) {
  "use strict";
  var _defaults = {
    data: {},
    // Autocomplete data set
    limit: Infinity,
    // Limit of results the autocomplete shows
    onAutocomplete: null,
    // Callback for when autocompleted
    minLength: 1,
    // Min characters before autocomplete starts
    sortFunction: function(a, b, inputString) {
      return a.indexOf(inputString) - b.indexOf(inputString);
    }
  };
  var Autocomplete = function(_Component10) {
    _inherits(Autocomplete2, _Component10);
    function Autocomplete2(el, options) {
      _classCallCheck(this, Autocomplete2);
      var _this37 = _possibleConstructorReturn(this, (Autocomplete2.__proto__ || Object.getPrototypeOf(Autocomplete2)).call(this, Autocomplete2, el, options));
      _this37.el.M_Autocomplete = _this37;
      _this37.options = $2.extend({}, Autocomplete2.defaults, options);
      _this37.isOpen = false;
      _this37.count = 0;
      _this37.activeIndex = -1;
      _this37.oldVal;
      _this37.$inputField = _this37.$el.closest(".input-field");
      _this37.$active = $2();
      _this37._mousedown = false;
      _this37._setupDropdown();
      _this37._setupEventHandlers();
      return _this37;
    }
    _createClass(Autocomplete2, [{
      key: "destroy",
      /**
       * Teardown component
       */
      value: function destroy() {
        this._removeEventHandlers();
        this._removeDropdown();
        this.el.M_Autocomplete = void 0;
      }
      /**
       * Setup Event Handlers
       */
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleInputBlurBound = this._handleInputBlur.bind(this);
        this._handleInputKeyupAndFocusBound = this._handleInputKeyupAndFocus.bind(this);
        this._handleInputKeydownBound = this._handleInputKeydown.bind(this);
        this._handleInputClickBound = this._handleInputClick.bind(this);
        this._handleContainerMousedownAndTouchstartBound = this._handleContainerMousedownAndTouchstart.bind(this);
        this._handleContainerMouseupAndTouchendBound = this._handleContainerMouseupAndTouchend.bind(this);
        this.el.addEventListener("blur", this._handleInputBlurBound);
        this.el.addEventListener("keyup", this._handleInputKeyupAndFocusBound);
        this.el.addEventListener("focus", this._handleInputKeyupAndFocusBound);
        this.el.addEventListener("keydown", this._handleInputKeydownBound);
        this.el.addEventListener("click", this._handleInputClickBound);
        this.container.addEventListener("mousedown", this._handleContainerMousedownAndTouchstartBound);
        this.container.addEventListener("mouseup", this._handleContainerMouseupAndTouchendBound);
        if (typeof window.ontouchstart !== "undefined") {
          this.container.addEventListener("touchstart", this._handleContainerMousedownAndTouchstartBound);
          this.container.addEventListener("touchend", this._handleContainerMouseupAndTouchendBound);
        }
      }
      /**
       * Remove Event Handlers
       */
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        this.el.removeEventListener("blur", this._handleInputBlurBound);
        this.el.removeEventListener("keyup", this._handleInputKeyupAndFocusBound);
        this.el.removeEventListener("focus", this._handleInputKeyupAndFocusBound);
        this.el.removeEventListener("keydown", this._handleInputKeydownBound);
        this.el.removeEventListener("click", this._handleInputClickBound);
        this.container.removeEventListener("mousedown", this._handleContainerMousedownAndTouchstartBound);
        this.container.removeEventListener("mouseup", this._handleContainerMouseupAndTouchendBound);
        if (typeof window.ontouchstart !== "undefined") {
          this.container.removeEventListener("touchstart", this._handleContainerMousedownAndTouchstartBound);
          this.container.removeEventListener("touchend", this._handleContainerMouseupAndTouchendBound);
        }
      }
      /**
       * Setup dropdown
       */
    }, {
      key: "_setupDropdown",
      value: function _setupDropdown() {
        var _this38 = this;
        this.container = document.createElement("ul");
        this.container.id = "autocomplete-options-" + M.guid();
        $2(this.container).addClass("autocomplete-content dropdown-content");
        this.$inputField.append(this.container);
        this.el.setAttribute("data-target", this.container.id);
        this.dropdown = M.Dropdown.init(this.el, {
          autoFocus: false,
          closeOnClick: false,
          coverTrigger: false,
          onItemClick: function(itemEl) {
            _this38.selectOption($2(itemEl));
          }
        });
        this.el.removeEventListener("click", this.dropdown._handleClickBound);
      }
      /**
       * Remove dropdown
       */
    }, {
      key: "_removeDropdown",
      value: function _removeDropdown() {
        this.container.parentNode.removeChild(this.container);
      }
      /**
       * Handle Input Blur
       */
    }, {
      key: "_handleInputBlur",
      value: function _handleInputBlur() {
        if (!this._mousedown) {
          this.close();
          this._resetAutocomplete();
        }
      }
      /**
       * Handle Input Keyup and Focus
       * @param {Event} e
       */
    }, {
      key: "_handleInputKeyupAndFocus",
      value: function _handleInputKeyupAndFocus(e) {
        if (e.type === "keyup") {
          Autocomplete2._keydown = false;
        }
        this.count = 0;
        var val = this.el.value.toLowerCase();
        if (e.keyCode === 13 || e.keyCode === 38 || e.keyCode === 40) {
          return;
        }
        if (this.oldVal !== val && (M.tabPressed || e.type !== "focus")) {
          this.open();
        }
        this.oldVal = val;
      }
      /**
       * Handle Input Keydown
       * @param {Event} e
       */
    }, {
      key: "_handleInputKeydown",
      value: function _handleInputKeydown(e) {
        Autocomplete2._keydown = true;
        var keyCode = e.keyCode, liElement = void 0, numItems = $2(this.container).children("li").length;
        if (keyCode === M.keys.ENTER && this.activeIndex >= 0) {
          liElement = $2(this.container).children("li").eq(this.activeIndex);
          if (liElement.length) {
            this.selectOption(liElement);
            e.preventDefault();
          }
          return;
        }
        if (keyCode === M.keys.ARROW_UP || keyCode === M.keys.ARROW_DOWN) {
          e.preventDefault();
          if (keyCode === M.keys.ARROW_UP && this.activeIndex > 0) {
            this.activeIndex--;
          }
          if (keyCode === M.keys.ARROW_DOWN && this.activeIndex < numItems - 1) {
            this.activeIndex++;
          }
          this.$active.removeClass("active");
          if (this.activeIndex >= 0) {
            this.$active = $2(this.container).children("li").eq(this.activeIndex);
            this.$active.addClass("active");
          }
        }
      }
      /**
       * Handle Input Click
       * @param {Event} e
       */
    }, {
      key: "_handleInputClick",
      value: function _handleInputClick(e) {
        this.open();
      }
      /**
       * Handle Container Mousedown and Touchstart
       * @param {Event} e
       */
    }, {
      key: "_handleContainerMousedownAndTouchstart",
      value: function _handleContainerMousedownAndTouchstart(e) {
        this._mousedown = true;
      }
      /**
       * Handle Container Mouseup and Touchend
       * @param {Event} e
       */
    }, {
      key: "_handleContainerMouseupAndTouchend",
      value: function _handleContainerMouseupAndTouchend(e) {
        this._mousedown = false;
      }
      /**
       * Highlight partial match
       */
    }, {
      key: "_highlight",
      value: function _highlight(string, $el) {
        var img = $el.find("img");
        var matchStart = $el.text().toLowerCase().indexOf("" + string.toLowerCase()), matchEnd = matchStart + string.length - 1, beforeMatch = $el.text().slice(0, matchStart), matchText = $el.text().slice(matchStart, matchEnd + 1), afterMatch = $el.text().slice(matchEnd + 1);
        $el.html("<span>" + beforeMatch + "<span class='highlight'>" + matchText + "</span>" + afterMatch + "</span>");
        if (img.length) {
          $el.prepend(img);
        }
      }
      /**
       * Reset current element position
       */
    }, {
      key: "_resetCurrentElement",
      value: function _resetCurrentElement() {
        this.activeIndex = -1;
        this.$active.removeClass("active");
      }
      /**
       * Reset autocomplete elements
       */
    }, {
      key: "_resetAutocomplete",
      value: function _resetAutocomplete() {
        $2(this.container).empty();
        this._resetCurrentElement();
        this.oldVal = null;
        this.isOpen = false;
        this._mousedown = false;
      }
      /**
       * Select autocomplete option
       * @param {Element} el  Autocomplete option list item element
       */
    }, {
      key: "selectOption",
      value: function selectOption(el) {
        var text = el.text().trim();
        this.el.value = text;
        this.$el.trigger("change");
        this._resetAutocomplete();
        this.close();
        if (typeof this.options.onAutocomplete === "function") {
          this.options.onAutocomplete.call(this, text);
        }
      }
      /**
       * Render dropdown content
       * @param {Object} data  data set
       * @param {String} val  current input value
       */
    }, {
      key: "_renderDropdown",
      value: function _renderDropdown(data, val) {
        var _this39 = this;
        this._resetAutocomplete();
        var matchingData = [];
        for (var key in data) {
          if (data.hasOwnProperty(key) && key.toLowerCase().indexOf(val) !== -1) {
            if (this.count >= this.options.limit) {
              break;
            }
            var entry = {
              data: data[key],
              key
            };
            matchingData.push(entry);
            this.count++;
          }
        }
        if (this.options.sortFunction) {
          var sortFunctionBound = function(a, b) {
            return _this39.options.sortFunction(a.key.toLowerCase(), b.key.toLowerCase(), val.toLowerCase());
          };
          matchingData.sort(sortFunctionBound);
        }
        for (var i = 0; i < matchingData.length; i++) {
          var _entry = matchingData[i];
          var $autocompleteOption = $2("<li></li>");
          if (!!_entry.data) {
            $autocompleteOption.append('<img src="' + _entry.data + '" class="right circle"><span>' + _entry.key + "</span>");
          } else {
            $autocompleteOption.append("<span>" + _entry.key + "</span>");
          }
          $2(this.container).append($autocompleteOption);
          this._highlight(val, $autocompleteOption);
        }
      }
      /**
       * Open Autocomplete Dropdown
       */
    }, {
      key: "open",
      value: function open() {
        var val = this.el.value.toLowerCase();
        this._resetAutocomplete();
        if (val.length >= this.options.minLength) {
          this.isOpen = true;
          this._renderDropdown(this.options.data, val);
        }
        if (!this.dropdown.isOpen) {
          this.dropdown.open();
        } else {
          this.dropdown.recalculateDimensions();
        }
      }
      /**
       * Close Autocomplete Dropdown
       */
    }, {
      key: "close",
      value: function close() {
        this.dropdown.close();
      }
      /**
       * Update Data
       * @param {Object} data
       */
    }, {
      key: "updateData",
      value: function updateData(data) {
        var val = this.el.value.toLowerCase();
        this.options.data = data;
        if (this.isOpen) {
          this._renderDropdown(data, val);
        }
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Autocomplete2.__proto__ || Object.getPrototypeOf(Autocomplete2), "init", this).call(this, this, els, options);
      }
      /**
       * Get Instance
       */
    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Autocomplete;
      }
    }, {
      key: "defaults",
      get: function() {
        return _defaults;
      }
    }]);
    return Autocomplete2;
  }(Component);
  Autocomplete._keydown = false;
  M.Autocomplete = Autocomplete;
  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Autocomplete, "autocomplete", "M_Autocomplete");
  }
})(cash);
;
(function($2) {
  M.updateTextFields = function() {
    var input_selector = "input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], input[type=date], input[type=time], textarea";
    $2(input_selector).each(function(element, index) {
      var $this = $2(this);
      if (element.value.length > 0 || $2(element).is(":focus") || element.autofocus || $this.attr("placeholder") !== null) {
        $this.siblings("label").addClass("active");
      } else if (element.validity) {
        $this.siblings("label").toggleClass("active", element.validity.badInput === true);
      } else {
        $this.siblings("label").removeClass("active");
      }
    });
  };
  M.validate_field = function(object) {
    var hasLength = object.attr("data-length") !== null;
    var lenAttr = parseInt(object.attr("data-length"));
    var len = object[0].value.length;
    if (len === 0 && object[0].validity.badInput === false && !object.is(":required")) {
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
  M.textareaAutoResize = function($textarea) {
    if ($textarea instanceof Element) {
      $textarea = $2($textarea);
    }
    if (!$textarea.length) {
      console.error("No textarea element found");
      return;
    }
    var hiddenDiv = $2(".hiddendiv").first();
    if (!hiddenDiv.length) {
      hiddenDiv = $2('<div class="hiddendiv common"></div>');
      $2("body").append(hiddenDiv);
    }
    var fontFamily = $textarea.css("font-family");
    var fontSize = $textarea.css("font-size");
    var lineHeight = $textarea.css("line-height");
    var paddingTop = $textarea.css("padding-top");
    var paddingRight = $textarea.css("padding-right");
    var paddingBottom = $textarea.css("padding-bottom");
    var paddingLeft = $textarea.css("padding-left");
    if (fontSize) {
      hiddenDiv.css("font-size", fontSize);
    }
    if (fontFamily) {
      hiddenDiv.css("font-family", fontFamily);
    }
    if (lineHeight) {
      hiddenDiv.css("line-height", lineHeight);
    }
    if (paddingTop) {
      hiddenDiv.css("padding-top", paddingTop);
    }
    if (paddingRight) {
      hiddenDiv.css("padding-right", paddingRight);
    }
    if (paddingBottom) {
      hiddenDiv.css("padding-bottom", paddingBottom);
    }
    if (paddingLeft) {
      hiddenDiv.css("padding-left", paddingLeft);
    }
    if (!$textarea.data("original-height")) {
      $textarea.data("original-height", $textarea.height());
    }
    if ($textarea.attr("wrap") === "off") {
      hiddenDiv.css("overflow-wrap", "normal").css("white-space", "pre");
    }
    hiddenDiv.text($textarea[0].value + "\n");
    var content = hiddenDiv.html().replace(/\n/g, "<br>");
    hiddenDiv.html(content);
    if ($textarea[0].offsetWidth > 0 && $textarea[0].offsetHeight > 0) {
      hiddenDiv.css("width", $textarea.width() + "px");
    } else {
      hiddenDiv.css("width", window.innerWidth / 2 + "px");
    }
    if ($textarea.data("original-height") <= hiddenDiv.innerHeight()) {
      $textarea.css("height", hiddenDiv.innerHeight() + "px");
    } else if ($textarea[0].value.length < $textarea.data("previous-length")) {
      $textarea.css("height", $textarea.data("original-height") + "px");
    }
    $textarea.data("previous-length", $textarea[0].value.length);
  };
  $2(document).ready(function() {
    var input_selector = "input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], input[type=date], input[type=time], textarea";
    $2(document).on("change", input_selector, function() {
      if (this.value.length !== 0 || $2(this).attr("placeholder") !== null) {
        $2(this).siblings("label").addClass("active");
      }
      M.validate_field($2(this));
    });
    $2(document).ready(function() {
      M.updateTextFields();
    });
    $2(document).on("reset", function(e) {
      var formReset = $2(e.target);
      if (formReset.is("form")) {
        formReset.find(input_selector).removeClass("valid").removeClass("invalid");
        formReset.find(input_selector).each(function(e2) {
          if (this.value.length) {
            $2(this).siblings("label").removeClass("active");
          }
        });
        setTimeout(function() {
          formReset.find("select").each(function() {
            if (this.M_FormSelect) {
              $2(this).trigger("change");
            }
          });
        }, 0);
      }
    });
    document.addEventListener("focus", function(e) {
      if ($2(e.target).is(input_selector)) {
        $2(e.target).siblings("label, .prefix").addClass("active");
      }
    }, true);
    document.addEventListener("blur", function(e) {
      var $inputElement = $2(e.target);
      if ($inputElement.is(input_selector)) {
        var selector = ".prefix";
        if ($inputElement[0].value.length === 0 && $inputElement[0].validity.badInput !== true && $inputElement.attr("placeholder") === null) {
          selector += ", label";
        }
        $inputElement.siblings(selector).removeClass("active");
        M.validate_field($inputElement);
      }
    }, true);
    var radio_checkbox = "input[type=radio], input[type=checkbox]";
    $2(document).on("keyup", radio_checkbox, function(e) {
      if (e.which === M.keys.TAB) {
        $2(this).addClass("tabbed");
        var $this = $2(this);
        $this.one("blur", function(e2) {
          $2(this).removeClass("tabbed");
        });
        return;
      }
    });
    var text_area_selector = ".materialize-textarea";
    $2(text_area_selector).each(function() {
      var $textarea = $2(this);
      $textarea.data("original-height", $textarea.height());
      $textarea.data("previous-length", this.value.length);
      M.textareaAutoResize($textarea);
    });
    $2(document).on("keyup", text_area_selector, function() {
      M.textareaAutoResize($2(this));
    });
    $2(document).on("keydown", text_area_selector, function() {
      M.textareaAutoResize($2(this));
    });
    $2(document).on("change", '.file-field input[type="file"]', function() {
      var file_field = $2(this).closest(".file-field");
      var path_input = file_field.find("input.file-path");
      var files = $2(this)[0].files;
      var file_names = [];
      for (var i = 0; i < files.length; i++) {
        file_names.push(files[i].name);
      }
      path_input[0].value = file_names.join(", ");
      path_input.trigger("change");
    });
  });
})(cash);
;
(function($2, anim) {
  "use strict";
  var _defaults = {
    indicators: true,
    height: 400,
    duration: 500,
    interval: 6e3
  };
  var Slider = function(_Component11) {
    _inherits(Slider2, _Component11);
    function Slider2(el, options) {
      _classCallCheck(this, Slider2);
      var _this40 = _possibleConstructorReturn(this, (Slider2.__proto__ || Object.getPrototypeOf(Slider2)).call(this, Slider2, el, options));
      _this40.el.M_Slider = _this40;
      _this40.options = $2.extend({}, Slider2.defaults, options);
      _this40.$slider = _this40.$el.find(".slides");
      _this40.$slides = _this40.$slider.children("li");
      _this40.activeIndex = _this40.$slides.filter(function(item) {
        return $2(item).hasClass("active");
      }).first().index();
      if (_this40.activeIndex != -1) {
        _this40.$active = _this40.$slides.eq(_this40.activeIndex);
      }
      _this40._setSliderHeight();
      _this40.$slides.find(".caption").each(function(el2) {
        _this40._animateCaptionIn(el2, 0);
      });
      _this40.$slides.find("img").each(function(el2) {
        var placeholderBase64 = "data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
        if ($2(el2).attr("src") !== placeholderBase64) {
          $2(el2).css("background-image", 'url("' + $2(el2).attr("src") + '")');
          $2(el2).attr("src", placeholderBase64);
        }
      });
      _this40._setupIndicators();
      if (_this40.$active) {
        _this40.$active.css("display", "block");
      } else {
        _this40.$slides.first().addClass("active");
        anim({
          targets: _this40.$slides.first()[0],
          opacity: 1,
          duration: _this40.options.duration,
          easing: "easeOutQuad"
        });
        _this40.activeIndex = 0;
        _this40.$active = _this40.$slides.eq(_this40.activeIndex);
        if (_this40.options.indicators) {
          _this40.$indicators.eq(_this40.activeIndex).addClass("active");
        }
      }
      _this40.$active.find("img").each(function(el2) {
        anim({
          targets: _this40.$active.find(".caption")[0],
          opacity: 1,
          translateX: 0,
          translateY: 0,
          duration: _this40.options.duration,
          easing: "easeOutQuad"
        });
      });
      _this40._setupEventHandlers();
      _this40.start();
      return _this40;
    }
    _createClass(Slider2, [{
      key: "destroy",
      /**
       * Teardown component
       */
      value: function destroy() {
        this.pause();
        this._removeIndicators();
        this._removeEventHandlers();
        this.el.M_Slider = void 0;
      }
      /**
       * Setup Event Handlers
       */
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        var _this41 = this;
        this._handleIntervalBound = this._handleInterval.bind(this);
        this._handleIndicatorClickBound = this._handleIndicatorClick.bind(this);
        if (this.options.indicators) {
          this.$indicators.each(function(el) {
            el.addEventListener("click", _this41._handleIndicatorClickBound);
          });
        }
      }
      /**
       * Remove Event Handlers
       */
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        var _this42 = this;
        if (this.options.indicators) {
          this.$indicators.each(function(el) {
            el.removeEventListener("click", _this42._handleIndicatorClickBound);
          });
        }
      }
      /**
       * Handle indicator click
       * @param {Event} e
       */
    }, {
      key: "_handleIndicatorClick",
      value: function _handleIndicatorClick(e) {
        var currIndex = $2(e.target).index();
        this.set(currIndex);
      }
      /**
       * Handle Interval
       */
    }, {
      key: "_handleInterval",
      value: function _handleInterval() {
        var newActiveIndex = this.$slider.find(".active").index();
        if (this.$slides.length === newActiveIndex + 1) newActiveIndex = 0;
        else newActiveIndex += 1;
        this.set(newActiveIndex);
      }
      /**
       * Animate in caption
       * @param {Element} caption
       * @param {Number} duration
       */
    }, {
      key: "_animateCaptionIn",
      value: function _animateCaptionIn(caption, duration) {
        var animOptions = {
          targets: caption,
          opacity: 0,
          duration,
          easing: "easeOutQuad"
        };
        if ($2(caption).hasClass("center-align")) {
          animOptions.translateY = -100;
        } else if ($2(caption).hasClass("right-align")) {
          animOptions.translateX = 100;
        } else if ($2(caption).hasClass("left-align")) {
          animOptions.translateX = -100;
        }
        anim(animOptions);
      }
      /**
       * Set height of slider
       */
    }, {
      key: "_setSliderHeight",
      value: function _setSliderHeight() {
        if (!this.$el.hasClass("fullscreen")) {
          if (this.options.indicators) {
            this.$el.css("height", this.options.height + 40 + "px");
          } else {
            this.$el.css("height", this.options.height + "px");
          }
          this.$slider.css("height", this.options.height + "px");
        }
      }
      /**
       * Setup indicators
       */
    }, {
      key: "_setupIndicators",
      value: function _setupIndicators() {
        var _this43 = this;
        if (this.options.indicators) {
          this.$indicators = $2('<ul class="indicators"></ul>');
          this.$slides.each(function(el, index) {
            var $indicator = $2('<li class="indicator-item"></li>');
            _this43.$indicators.append($indicator[0]);
          });
          this.$el.append(this.$indicators[0]);
          this.$indicators = this.$indicators.children("li.indicator-item");
        }
      }
      /**
       * Remove indicators
       */
    }, {
      key: "_removeIndicators",
      value: function _removeIndicators() {
        this.$el.find("ul.indicators").remove();
      }
      /**
       * Cycle to nth item
       * @param {Number} index
       */
    }, {
      key: "set",
      value: function set(index) {
        var _this44 = this;
        if (index >= this.$slides.length) index = 0;
        else if (index < 0) index = this.$slides.length - 1;
        if (this.activeIndex != index) {
          this.$active = this.$slides.eq(this.activeIndex);
          var $caption = this.$active.find(".caption");
          this.$active.removeClass("active");
          anim({
            targets: this.$active[0],
            opacity: 0,
            duration: this.options.duration,
            easing: "easeOutQuad",
            complete: function() {
              _this44.$slides.not(".active").each(function(el) {
                anim({
                  targets: el,
                  opacity: 0,
                  translateX: 0,
                  translateY: 0,
                  duration: 0,
                  easing: "easeOutQuad"
                });
              });
            }
          });
          this._animateCaptionIn($caption[0], this.options.duration);
          if (this.options.indicators) {
            this.$indicators.eq(this.activeIndex).removeClass("active");
            this.$indicators.eq(index).addClass("active");
          }
          anim({
            targets: this.$slides.eq(index)[0],
            opacity: 1,
            duration: this.options.duration,
            easing: "easeOutQuad"
          });
          anim({
            targets: this.$slides.eq(index).find(".caption")[0],
            opacity: 1,
            translateX: 0,
            translateY: 0,
            duration: this.options.duration,
            delay: this.options.duration,
            easing: "easeOutQuad"
          });
          this.$slides.eq(index).addClass("active");
          this.activeIndex = index;
          this.start();
        }
      }
      /**
       * Pause slider interval
       */
    }, {
      key: "pause",
      value: function pause() {
        clearInterval(this.interval);
      }
      /**
       * Start slider interval
       */
    }, {
      key: "start",
      value: function start() {
        clearInterval(this.interval);
        this.interval = setInterval(this._handleIntervalBound, this.options.duration + this.options.interval);
      }
      /**
       * Move to next slide
       */
    }, {
      key: "next",
      value: function next() {
        var newIndex = this.activeIndex + 1;
        if (newIndex >= this.$slides.length) newIndex = 0;
        else if (newIndex < 0) newIndex = this.$slides.length - 1;
        this.set(newIndex);
      }
      /**
       * Move to previous slide
       */
    }, {
      key: "prev",
      value: function prev() {
        var newIndex = this.activeIndex - 1;
        if (newIndex >= this.$slides.length) newIndex = 0;
        else if (newIndex < 0) newIndex = this.$slides.length - 1;
        this.set(newIndex);
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Slider2.__proto__ || Object.getPrototypeOf(Slider2), "init", this).call(this, this, els, options);
      }
      /**
       * Get Instance
       */
    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Slider;
      }
    }, {
      key: "defaults",
      get: function() {
        return _defaults;
      }
    }]);
    return Slider2;
  }(Component);
  M.Slider = Slider;
  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Slider, "slider", "M_Slider");
  }
})(cash, M.anime);
;
(function($2, anim) {
  $2(document).on("click", ".card", function(e) {
    if ($2(this).children(".card-reveal").length) {
      var $card = $2(e.target).closest(".card");
      if ($card.data("initialOverflow") === void 0) {
        $card.data("initialOverflow", $card.css("overflow") === void 0 ? "" : $card.css("overflow"));
      }
      var $cardReveal = $2(this).find(".card-reveal");
      if ($2(e.target).is($2(".card-reveal .card-title")) || $2(e.target).is($2(".card-reveal .card-title i"))) {
        anim({
          targets: $cardReveal[0],
          translateY: 0,
          duration: 225,
          easing: "easeInOutQuad",
          complete: function(anim2) {
            var el = anim2.animatables[0].target;
            $2(el).css({ display: "none" });
            $card.css("overflow", $card.data("initialOverflow"));
          }
        });
      } else if ($2(e.target).is($2(".card .activator")) || $2(e.target).is($2(".card .activator i"))) {
        $card.css("overflow", "hidden");
        $cardReveal.css({ display: "block" });
        anim({
          targets: $cardReveal[0],
          translateY: "-100%",
          duration: 300,
          easing: "easeInOutQuad"
        });
      }
    }
  });
})(cash, M.anime);
;
(function($2) {
  "use strict";
  var _defaults = {
    data: [],
    placeholder: "",
    secondaryPlaceholder: "",
    autocompleteOptions: {},
    limit: Infinity,
    onChipAdd: null,
    onChipSelect: null,
    onChipDelete: null
  };
  var Chips = function(_Component12) {
    _inherits(Chips2, _Component12);
    function Chips2(el, options) {
      _classCallCheck(this, Chips2);
      var _this45 = _possibleConstructorReturn(this, (Chips2.__proto__ || Object.getPrototypeOf(Chips2)).call(this, Chips2, el, options));
      _this45.el.M_Chips = _this45;
      _this45.options = $2.extend({}, Chips2.defaults, options);
      _this45.$el.addClass("chips input-field");
      _this45.chipsData = [];
      _this45.$chips = $2();
      _this45._setupInput();
      _this45.hasAutocomplete = Object.keys(_this45.options.autocompleteOptions).length > 0;
      if (!_this45.$input.attr("id")) {
        _this45.$input.attr("id", M.guid());
      }
      if (_this45.options.data.length) {
        _this45.chipsData = _this45.options.data;
        _this45._renderChips(_this45.chipsData);
      }
      if (_this45.hasAutocomplete) {
        _this45._setupAutocomplete();
      }
      _this45._setPlaceholder();
      _this45._setupLabel();
      _this45._setupEventHandlers();
      return _this45;
    }
    _createClass(Chips2, [{
      key: "getData",
      /**
       * Get Chips Data
       */
      value: function getData() {
        return this.chipsData;
      }
      /**
       * Teardown component
       */
    }, {
      key: "destroy",
      value: function destroy() {
        this._removeEventHandlers();
        this.$chips.remove();
        this.el.M_Chips = void 0;
      }
      /**
       * Setup Event Handlers
       */
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleChipClickBound = this._handleChipClick.bind(this);
        this._handleInputKeydownBound = this._handleInputKeydown.bind(this);
        this._handleInputFocusBound = this._handleInputFocus.bind(this);
        this._handleInputBlurBound = this._handleInputBlur.bind(this);
        this.el.addEventListener("click", this._handleChipClickBound);
        document.addEventListener("keydown", Chips2._handleChipsKeydown);
        document.addEventListener("keyup", Chips2._handleChipsKeyup);
        this.el.addEventListener("blur", Chips2._handleChipsBlur, true);
        this.$input[0].addEventListener("focus", this._handleInputFocusBound);
        this.$input[0].addEventListener("blur", this._handleInputBlurBound);
        this.$input[0].addEventListener("keydown", this._handleInputKeydownBound);
      }
      /**
       * Remove Event Handlers
       */
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        this.el.removeEventListener("click", this._handleChipClickBound);
        document.removeEventListener("keydown", Chips2._handleChipsKeydown);
        document.removeEventListener("keyup", Chips2._handleChipsKeyup);
        this.el.removeEventListener("blur", Chips2._handleChipsBlur, true);
        this.$input[0].removeEventListener("focus", this._handleInputFocusBound);
        this.$input[0].removeEventListener("blur", this._handleInputBlurBound);
        this.$input[0].removeEventListener("keydown", this._handleInputKeydownBound);
      }
      /**
       * Handle Chip Click
       * @param {Event} e
       */
    }, {
      key: "_handleChipClick",
      value: function _handleChipClick(e) {
        var $chip = $2(e.target).closest(".chip");
        var clickedClose = $2(e.target).is(".close");
        if ($chip.length) {
          var index = $chip.index();
          if (clickedClose) {
            this.deleteChip(index);
            this.$input[0].focus();
          } else {
            this.selectChip(index);
          }
        } else {
          this.$input[0].focus();
        }
      }
      /**
       * Handle Chips Keydown
       * @param {Event} e
       */
    }, {
      key: "_handleInputFocus",
      /**
       * Handle Input Focus
       */
      value: function _handleInputFocus() {
        this.$el.addClass("focus");
      }
      /**
       * Handle Input Blur
       */
    }, {
      key: "_handleInputBlur",
      value: function _handleInputBlur() {
        this.$el.removeClass("focus");
      }
      /**
       * Handle Input Keydown
       * @param {Event} e
       */
    }, {
      key: "_handleInputKeydown",
      value: function _handleInputKeydown(e) {
        Chips2._keydown = true;
        if (e.keyCode === 13) {
          if (this.hasAutocomplete && this.autocomplete && this.autocomplete.isOpen) {
            return;
          }
          e.preventDefault();
          this.addChip({
            tag: this.$input[0].value
          });
          this.$input[0].value = "";
        } else if ((e.keyCode === 8 || e.keyCode === 37) && this.$input[0].value === "" && this.chipsData.length) {
          e.preventDefault();
          this.selectChip(this.chipsData.length - 1);
        }
      }
      /**
       * Render Chip
       * @param {chip} chip
       * @return {Element}
       */
    }, {
      key: "_renderChip",
      value: function _renderChip(chip) {
        if (!chip.tag) {
          return;
        }
        var renderedChip = document.createElement("div");
        var closeIcon = document.createElement("i");
        renderedChip.classList.add("chip");
        renderedChip.textContent = chip.tag;
        renderedChip.setAttribute("tabindex", 0);
        $2(closeIcon).addClass("material-icons close");
        closeIcon.textContent = "close";
        if (chip.image) {
          var img = document.createElement("img");
          img.setAttribute("src", chip.image);
          renderedChip.insertBefore(img, renderedChip.firstChild);
        }
        renderedChip.appendChild(closeIcon);
        return renderedChip;
      }
      /**
       * Render Chips
       */
    }, {
      key: "_renderChips",
      value: function _renderChips() {
        this.$chips.remove();
        for (var i = 0; i < this.chipsData.length; i++) {
          var chipEl = this._renderChip(this.chipsData[i]);
          this.$el.append(chipEl);
          this.$chips.add(chipEl);
        }
        this.$el.append(this.$input[0]);
      }
      /**
       * Setup Autocomplete
       */
    }, {
      key: "_setupAutocomplete",
      value: function _setupAutocomplete() {
        var _this46 = this;
        this.options.autocompleteOptions.onAutocomplete = function(val) {
          _this46.addChip({
            tag: val
          });
          _this46.$input[0].value = "";
          _this46.$input[0].focus();
        };
        this.autocomplete = M.Autocomplete.init(this.$input[0], this.options.autocompleteOptions);
      }
      /**
       * Setup Input
       */
    }, {
      key: "_setupInput",
      value: function _setupInput() {
        this.$input = this.$el.find("input");
        if (!this.$input.length) {
          this.$input = $2("<input></input>");
          this.$el.append(this.$input);
        }
        this.$input.addClass("input");
      }
      /**
       * Setup Label
       */
    }, {
      key: "_setupLabel",
      value: function _setupLabel() {
        this.$label = this.$el.find("label");
        if (this.$label.length) {
          this.$label.setAttribute("for", this.$input.attr("id"));
        }
      }
      /**
       * Set placeholder
       */
    }, {
      key: "_setPlaceholder",
      value: function _setPlaceholder() {
        if (this.chipsData !== void 0 && !this.chipsData.length && this.options.placeholder) {
          $2(this.$input).prop("placeholder", this.options.placeholder);
        } else if ((this.chipsData === void 0 || !!this.chipsData.length) && this.options.secondaryPlaceholder) {
          $2(this.$input).prop("placeholder", this.options.secondaryPlaceholder);
        }
      }
      /**
       * Check if chip is valid
       * @param {chip} chip
       */
    }, {
      key: "_isValid",
      value: function _isValid(chip) {
        if (chip.hasOwnProperty("tag") && chip.tag !== "") {
          var exists = false;
          for (var i = 0; i < this.chipsData.length; i++) {
            if (this.chipsData[i].tag === chip.tag) {
              exists = true;
              break;
            }
          }
          return !exists;
        }
        return false;
      }
      /**
       * Add chip
       * @param {chip} chip
       */
    }, {
      key: "addChip",
      value: function addChip(chip) {
        if (!this._isValid(chip) || this.chipsData.length >= this.options.limit) {
          return;
        }
        var renderedChip = this._renderChip(chip);
        this.$chips.add(renderedChip);
        this.chipsData.push(chip);
        $2(this.$input).before(renderedChip);
        this._setPlaceholder();
        if (typeof this.options.onChipAdd === "function") {
          this.options.onChipAdd.call(this, this.$el, renderedChip);
        }
      }
      /**
       * Delete chip
       * @param {Number} chip
       */
    }, {
      key: "deleteChip",
      value: function deleteChip(chipIndex) {
        var $chip = this.$chips.eq(chipIndex);
        this.$chips.eq(chipIndex).remove();
        this.$chips = this.$chips.filter(function(el) {
          return $2(el).index() >= 0;
        });
        this.chipsData.splice(chipIndex, 1);
        this._setPlaceholder();
        if (typeof this.options.onChipDelete === "function") {
          this.options.onChipDelete.call(this, this.$el, $chip[0]);
        }
      }
      /**
       * Select chip
       * @param {Number} chip
       */
    }, {
      key: "selectChip",
      value: function selectChip(chipIndex) {
        var $chip = this.$chips.eq(chipIndex);
        this._selectedChip = $chip;
        $chip[0].focus();
        if (typeof this.options.onChipSelect === "function") {
          this.options.onChipSelect.call(this, this.$el, $chip[0]);
        }
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Chips2.__proto__ || Object.getPrototypeOf(Chips2), "init", this).call(this, this, els, options);
      }
      /**
       * Get Instance
       */
    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Chips;
      }
    }, {
      key: "_handleChipsKeydown",
      value: function _handleChipsKeydown(e) {
        Chips2._keydown = true;
        var $chips = $2(e.target).closest(".chips");
        var chipsKeydown = e.target && $chips.length;
        if ($2(e.target).is("input, textarea") || !chipsKeydown) {
          return;
        }
        var currChips = $chips[0].M_Chips;
        if (e.keyCode === 8 || e.keyCode === 46) {
          e.preventDefault();
          var selectIndex = currChips.chipsData.length;
          if (currChips._selectedChip) {
            var index = currChips._selectedChip.index();
            currChips.deleteChip(index);
            currChips._selectedChip = null;
            selectIndex = Math.max(index - 1, 0);
          }
          if (currChips.chipsData.length) {
            currChips.selectChip(selectIndex);
          }
        } else if (e.keyCode === 37) {
          if (currChips._selectedChip) {
            var _selectIndex = currChips._selectedChip.index() - 1;
            if (_selectIndex < 0) {
              return;
            }
            currChips.selectChip(_selectIndex);
          }
        } else if (e.keyCode === 39) {
          if (currChips._selectedChip) {
            var _selectIndex2 = currChips._selectedChip.index() + 1;
            if (_selectIndex2 >= currChips.chipsData.length) {
              currChips.$input[0].focus();
            } else {
              currChips.selectChip(_selectIndex2);
            }
          }
        }
      }
      /**
       * Handle Chips Keyup
       * @param {Event} e
       */
    }, {
      key: "_handleChipsKeyup",
      value: function _handleChipsKeyup(e) {
        Chips2._keydown = false;
      }
      /**
       * Handle Chips Blur
       * @param {Event} e
       */
    }, {
      key: "_handleChipsBlur",
      value: function _handleChipsBlur(e) {
        if (!Chips2._keydown) {
          var $chips = $2(e.target).closest(".chips");
          var currChips = $chips[0].M_Chips;
          currChips._selectedChip = null;
        }
      }
    }, {
      key: "defaults",
      get: function() {
        return _defaults;
      }
    }]);
    return Chips2;
  }(Component);
  Chips._keydown = false;
  M.Chips = Chips;
  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Chips, "chips", "M_Chips");
  }
  $2(document).ready(function() {
    $2(document.body).on("click", ".chip .close", function() {
      var $chips = $2(this).closest(".chips");
      if ($chips.length && $chips[0].M_Chips) {
        return;
      }
      $2(this).closest(".chip").remove();
    });
  });
})(cash);
;
(function($2) {
  "use strict";
  var _defaults = {
    top: 0,
    bottom: Infinity,
    offset: 0,
    onPositionChange: null
  };
  var Pushpin = function(_Component13) {
    _inherits(Pushpin2, _Component13);
    function Pushpin2(el, options) {
      _classCallCheck(this, Pushpin2);
      var _this47 = _possibleConstructorReturn(this, (Pushpin2.__proto__ || Object.getPrototypeOf(Pushpin2)).call(this, Pushpin2, el, options));
      _this47.el.M_Pushpin = _this47;
      _this47.options = $2.extend({}, Pushpin2.defaults, options);
      _this47.originalOffset = _this47.el.offsetTop;
      Pushpin2._pushpins.push(_this47);
      _this47._setupEventHandlers();
      _this47._updatePosition();
      return _this47;
    }
    _createClass(Pushpin2, [{
      key: "destroy",
      /**
       * Teardown component
       */
      value: function destroy() {
        this.el.style.top = null;
        this._removePinClasses();
        this._removeEventHandlers();
        var index = Pushpin2._pushpins.indexOf(this);
        Pushpin2._pushpins.splice(index, 1);
      }
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        document.addEventListener("scroll", Pushpin2._updateElements);
      }
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        document.removeEventListener("scroll", Pushpin2._updateElements);
      }
    }, {
      key: "_updatePosition",
      value: function _updatePosition() {
        var scrolled = M.getDocumentScrollTop() + this.options.offset;
        if (this.options.top <= scrolled && this.options.bottom >= scrolled && !this.el.classList.contains("pinned")) {
          this._removePinClasses();
          this.el.style.top = this.options.offset + "px";
          this.el.classList.add("pinned");
          if (typeof this.options.onPositionChange === "function") {
            this.options.onPositionChange.call(this, "pinned");
          }
        }
        if (scrolled < this.options.top && !this.el.classList.contains("pin-top")) {
          this._removePinClasses();
          this.el.style.top = 0;
          this.el.classList.add("pin-top");
          if (typeof this.options.onPositionChange === "function") {
            this.options.onPositionChange.call(this, "pin-top");
          }
        }
        if (scrolled > this.options.bottom && !this.el.classList.contains("pin-bottom")) {
          this._removePinClasses();
          this.el.classList.add("pin-bottom");
          this.el.style.top = this.options.bottom - this.originalOffset + "px";
          if (typeof this.options.onPositionChange === "function") {
            this.options.onPositionChange.call(this, "pin-bottom");
          }
        }
      }
    }, {
      key: "_removePinClasses",
      value: function _removePinClasses() {
        this.el.classList.remove("pin-top");
        this.el.classList.remove("pinned");
        this.el.classList.remove("pin-bottom");
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Pushpin2.__proto__ || Object.getPrototypeOf(Pushpin2), "init", this).call(this, this, els, options);
      }
      /**
       * Get Instance
       */
    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Pushpin;
      }
    }, {
      key: "_updateElements",
      value: function _updateElements() {
        for (var elIndex in Pushpin2._pushpins) {
          var pInstance = Pushpin2._pushpins[elIndex];
          pInstance._updatePosition();
        }
      }
    }, {
      key: "defaults",
      get: function() {
        return _defaults;
      }
    }]);
    return Pushpin2;
  }(Component);
  Pushpin._pushpins = [];
  M.Pushpin = Pushpin;
  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Pushpin, "pushpin", "M_Pushpin");
  }
})(cash);
;
(function($2, anim) {
  "use strict";
  var _defaults = {
    direction: "top",
    hoverEnabled: true,
    toolbarEnabled: false
  };
  $2.fn.reverse = [].reverse;
  var FloatingActionButton = function(_Component14) {
    _inherits(FloatingActionButton2, _Component14);
    function FloatingActionButton2(el, options) {
      _classCallCheck(this, FloatingActionButton2);
      var _this48 = _possibleConstructorReturn(this, (FloatingActionButton2.__proto__ || Object.getPrototypeOf(FloatingActionButton2)).call(this, FloatingActionButton2, el, options));
      _this48.el.M_FloatingActionButton = _this48;
      _this48.options = $2.extend({}, FloatingActionButton2.defaults, options);
      _this48.isOpen = false;
      _this48.$anchor = _this48.$el.children("a").first();
      _this48.$menu = _this48.$el.children("ul").first();
      _this48.$floatingBtns = _this48.$el.find("ul .btn-floating");
      _this48.$floatingBtnsReverse = _this48.$el.find("ul .btn-floating").reverse();
      _this48.offsetY = 0;
      _this48.offsetX = 0;
      _this48.$el.addClass("direction-" + _this48.options.direction);
      if (_this48.options.direction === "top") {
        _this48.offsetY = 40;
      } else if (_this48.options.direction === "right") {
        _this48.offsetX = -40;
      } else if (_this48.options.direction === "bottom") {
        _this48.offsetY = -40;
      } else {
        _this48.offsetX = 40;
      }
      _this48._setupEventHandlers();
      return _this48;
    }
    _createClass(FloatingActionButton2, [{
      key: "destroy",
      /**
       * Teardown component
       */
      value: function destroy() {
        this._removeEventHandlers();
        this.el.M_FloatingActionButton = void 0;
      }
      /**
       * Setup Event Handlers
       */
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleFABClickBound = this._handleFABClick.bind(this);
        this._handleOpenBound = this.open.bind(this);
        this._handleCloseBound = this.close.bind(this);
        if (this.options.hoverEnabled && !this.options.toolbarEnabled) {
          this.el.addEventListener("mouseenter", this._handleOpenBound);
          this.el.addEventListener("mouseleave", this._handleCloseBound);
        } else {
          this.el.addEventListener("click", this._handleFABClickBound);
        }
      }
      /**
       * Remove Event Handlers
       */
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        if (this.options.hoverEnabled && !this.options.toolbarEnabled) {
          this.el.removeEventListener("mouseenter", this._handleOpenBound);
          this.el.removeEventListener("mouseleave", this._handleCloseBound);
        } else {
          this.el.removeEventListener("click", this._handleFABClickBound);
        }
      }
      /**
       * Handle FAB Click
       */
    }, {
      key: "_handleFABClick",
      value: function _handleFABClick() {
        if (this.isOpen) {
          this.close();
        } else {
          this.open();
        }
      }
      /**
       * Handle Document Click
       * @param {Event} e
       */
    }, {
      key: "_handleDocumentClick",
      value: function _handleDocumentClick(e) {
        if (!$2(e.target).closest(this.$menu).length) {
          this.close();
        }
      }
      /**
       * Open FAB
       */
    }, {
      key: "open",
      value: function open() {
        if (this.isOpen) {
          return;
        }
        if (this.options.toolbarEnabled) {
          this._animateInToolbar();
        } else {
          this._animateInFAB();
        }
        this.isOpen = true;
      }
      /**
       * Close FAB
       */
    }, {
      key: "close",
      value: function close() {
        if (!this.isOpen) {
          return;
        }
        if (this.options.toolbarEnabled) {
          window.removeEventListener("scroll", this._handleCloseBound, true);
          document.body.removeEventListener("click", this._handleDocumentClickBound, true);
          this._animateOutToolbar();
        } else {
          this._animateOutFAB();
        }
        this.isOpen = false;
      }
      /**
       * Classic FAB Menu open
       */
    }, {
      key: "_animateInFAB",
      value: function _animateInFAB() {
        var _this49 = this;
        this.$el.addClass("active");
        var time = 0;
        this.$floatingBtnsReverse.each(function(el) {
          anim({
            targets: el,
            opacity: 1,
            scale: [0.4, 1],
            translateY: [_this49.offsetY, 0],
            translateX: [_this49.offsetX, 0],
            duration: 275,
            delay: time,
            easing: "easeInOutQuad"
          });
          time += 40;
        });
      }
      /**
       * Classic FAB Menu close
       */
    }, {
      key: "_animateOutFAB",
      value: function _animateOutFAB() {
        var _this50 = this;
        this.$floatingBtnsReverse.each(function(el) {
          anim.remove(el);
          anim({
            targets: el,
            opacity: 0,
            scale: 0.4,
            translateY: _this50.offsetY,
            translateX: _this50.offsetX,
            duration: 175,
            easing: "easeOutQuad",
            complete: function() {
              _this50.$el.removeClass("active");
            }
          });
        });
      }
      /**
       * Toolbar transition Menu open
       */
    }, {
      key: "_animateInToolbar",
      value: function _animateInToolbar() {
        var _this51 = this;
        var scaleFactor = void 0;
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var btnRect = this.el.getBoundingClientRect();
        var backdrop = $2('<div class="fab-backdrop"></div>');
        var fabColor = this.$anchor.css("background-color");
        this.$anchor.append(backdrop);
        this.offsetX = btnRect.left - windowWidth / 2 + btnRect.width / 2;
        this.offsetY = windowHeight - btnRect.bottom;
        scaleFactor = windowWidth / backdrop[0].clientWidth;
        this.btnBottom = btnRect.bottom;
        this.btnLeft = btnRect.left;
        this.btnWidth = btnRect.width;
        this.$el.addClass("active");
        this.$el.css({
          "text-align": "center",
          width: "100%",
          bottom: 0,
          left: 0,
          transform: "translateX(" + this.offsetX + "px)",
          transition: "none"
        });
        this.$anchor.css({
          transform: "translateY(" + -this.offsetY + "px)",
          transition: "none"
        });
        backdrop.css({
          "background-color": fabColor
        });
        setTimeout(function() {
          _this51.$el.css({
            transform: "",
            transition: "transform .2s cubic-bezier(0.550, 0.085, 0.680, 0.530), background-color 0s linear .2s"
          });
          _this51.$anchor.css({
            overflow: "visible",
            transform: "",
            transition: "transform .2s"
          });
          setTimeout(function() {
            _this51.$el.css({
              overflow: "hidden",
              "background-color": fabColor
            });
            backdrop.css({
              transform: "scale(" + scaleFactor + ")",
              transition: "transform .2s cubic-bezier(0.550, 0.055, 0.675, 0.190)"
            });
            _this51.$menu.children("li").children("a").css({
              opacity: 1
            });
            _this51._handleDocumentClickBound = _this51._handleDocumentClick.bind(_this51);
            window.addEventListener("scroll", _this51._handleCloseBound, true);
            document.body.addEventListener("click", _this51._handleDocumentClickBound, true);
          }, 100);
        }, 0);
      }
      /**
       * Toolbar transition Menu close
       */
    }, {
      key: "_animateOutToolbar",
      value: function _animateOutToolbar() {
        var _this52 = this;
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var backdrop = this.$el.find(".fab-backdrop");
        var fabColor = this.$anchor.css("background-color");
        this.offsetX = this.btnLeft - windowWidth / 2 + this.btnWidth / 2;
        this.offsetY = windowHeight - this.btnBottom;
        this.$el.removeClass("active");
        this.$el.css({
          "background-color": "transparent",
          transition: "none"
        });
        this.$anchor.css({
          transition: "none"
        });
        backdrop.css({
          transform: "scale(0)",
          "background-color": fabColor
        });
        this.$menu.children("li").children("a").css({
          opacity: ""
        });
        setTimeout(function() {
          backdrop.remove();
          _this52.$el.css({
            "text-align": "",
            width: "",
            bottom: "",
            left: "",
            overflow: "",
            "background-color": "",
            transform: "translate3d(" + -_this52.offsetX + "px,0,0)"
          });
          _this52.$anchor.css({
            overflow: "",
            transform: "translate3d(0," + _this52.offsetY + "px,0)"
          });
          setTimeout(function() {
            _this52.$el.css({
              transform: "translate3d(0,0,0)",
              transition: "transform .2s"
            });
            _this52.$anchor.css({
              transform: "translate3d(0,0,0)",
              transition: "transform .2s cubic-bezier(0.550, 0.055, 0.675, 0.190)"
            });
          }, 20);
        }, 200);
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(FloatingActionButton2.__proto__ || Object.getPrototypeOf(FloatingActionButton2), "init", this).call(this, this, els, options);
      }
      /**
       * Get Instance
       */
    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_FloatingActionButton;
      }
    }, {
      key: "defaults",
      get: function() {
        return _defaults;
      }
    }]);
    return FloatingActionButton2;
  }(Component);
  M.FloatingActionButton = FloatingActionButton;
  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(FloatingActionButton, "floatingActionButton", "M_FloatingActionButton");
  }
})(cash, M.anime);
;
(function($2) {
  "use strict";
  var _defaults = {
    // Close when date is selected
    autoClose: false,
    // the default output format for the input field value
    format: "mmm dd, yyyy",
    // Used to create date object from current input string
    parse: null,
    // The initial date to view when first opened
    defaultDate: null,
    // Make the `defaultDate` the initial selected value
    setDefaultDate: false,
    disableWeekends: false,
    disableDayFn: null,
    // First day of week (0: Sunday, 1: Monday etc)
    firstDay: 0,
    // The earliest date that can be selected
    minDate: null,
    // Thelatest date that can be selected
    maxDate: null,
    // Number of years either side, or array of upper/lower range
    yearRange: 10,
    // used internally (don't config outside)
    minYear: 0,
    maxYear: 9999,
    minMonth: void 0,
    maxMonth: void 0,
    startRange: null,
    endRange: null,
    isRTL: false,
    // Render the month after year in the calendar title
    showMonthAfterYear: false,
    // Render days of the calendar grid that fall in the next or previous month
    showDaysInNextAndPreviousMonths: false,
    // Specify a DOM element to render the calendar in
    container: null,
    // Show clear button
    showClearBtn: false,
    // internationalization
    i18n: {
      cancel: "Cancel",
      clear: "Clear",
      done: "Ok",
      previousMonth: "\u2039",
      nextMonth: "\u203A",
      months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      weekdays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      weekdaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      weekdaysAbbrev: ["S", "M", "T", "W", "T", "F", "S"]
    },
    // events array
    events: [],
    // callback function
    onSelect: null,
    onOpen: null,
    onClose: null,
    onDraw: null
  };
  var Datepicker = function(_Component15) {
    _inherits(Datepicker2, _Component15);
    function Datepicker2(el, options) {
      _classCallCheck(this, Datepicker2);
      var _this53 = _possibleConstructorReturn(this, (Datepicker2.__proto__ || Object.getPrototypeOf(Datepicker2)).call(this, Datepicker2, el, options));
      _this53.el.M_Datepicker = _this53;
      _this53.options = $2.extend({}, Datepicker2.defaults, options);
      if (!!options && options.hasOwnProperty("i18n") && typeof options.i18n === "object") {
        _this53.options.i18n = $2.extend({}, Datepicker2.defaults.i18n, options.i18n);
      }
      if (_this53.options.minDate) _this53.options.minDate.setHours(0, 0, 0, 0);
      if (_this53.options.maxDate) _this53.options.maxDate.setHours(0, 0, 0, 0);
      _this53.id = M.guid();
      _this53._setupVariables();
      _this53._insertHTMLIntoDOM();
      _this53._setupModal();
      _this53._setupEventHandlers();
      if (!_this53.options.defaultDate) {
        _this53.options.defaultDate = new Date(Date.parse(_this53.el.value));
      }
      var defDate = _this53.options.defaultDate;
      if (Datepicker2._isDate(defDate)) {
        if (_this53.options.setDefaultDate) {
          _this53.setDate(defDate, true);
          _this53.setInputValue();
        } else {
          _this53.gotoDate(defDate);
        }
      } else {
        _this53.gotoDate(/* @__PURE__ */ new Date());
      }
      _this53.isOpen = false;
      return _this53;
    }
    _createClass(Datepicker2, [{
      key: "destroy",
      /**
       * Teardown component
       */
      value: function destroy() {
        this._removeEventHandlers();
        this.modal.destroy();
        $2(this.modalEl).remove();
        this.destroySelects();
        this.el.M_Datepicker = void 0;
      }
    }, {
      key: "destroySelects",
      value: function destroySelects() {
        var oldYearSelect = this.calendarEl.querySelector(".orig-select-year");
        if (oldYearSelect) {
          M.FormSelect.getInstance(oldYearSelect).destroy();
        }
        var oldMonthSelect = this.calendarEl.querySelector(".orig-select-month");
        if (oldMonthSelect) {
          M.FormSelect.getInstance(oldMonthSelect).destroy();
        }
      }
    }, {
      key: "_insertHTMLIntoDOM",
      value: function _insertHTMLIntoDOM() {
        if (this.options.showClearBtn) {
          $2(this.clearBtn).css({ visibility: "" });
          this.clearBtn.innerHTML = this.options.i18n.clear;
        }
        this.doneBtn.innerHTML = this.options.i18n.done;
        this.cancelBtn.innerHTML = this.options.i18n.cancel;
        if (this.options.container) {
          this.$modalEl.appendTo(this.options.container);
        } else {
          this.$modalEl.insertBefore(this.el);
        }
      }
    }, {
      key: "_setupModal",
      value: function _setupModal() {
        var _this54 = this;
        this.modalEl.id = "modal-" + this.id;
        this.modal = M.Modal.init(this.modalEl, {
          onCloseEnd: function() {
            _this54.isOpen = false;
          }
        });
      }
    }, {
      key: "toString",
      value: function toString(format) {
        var _this55 = this;
        format = format || this.options.format;
        if (!Datepicker2._isDate(this.date)) {
          return "";
        }
        var formatArray = format.split(/(d{1,4}|m{1,4}|y{4}|yy|!.)/g);
        var formattedDate = formatArray.map(function(label) {
          if (_this55.formats[label]) {
            return _this55.formats[label]();
          }
          return label;
        }).join("");
        return formattedDate;
      }
    }, {
      key: "setDate",
      value: function setDate(date, preventOnSelect) {
        if (!date) {
          this.date = null;
          this._renderDateDisplay();
          return this.draw();
        }
        if (typeof date === "string") {
          date = new Date(Date.parse(date));
        }
        if (!Datepicker2._isDate(date)) {
          return;
        }
        var min = this.options.minDate, max = this.options.maxDate;
        if (Datepicker2._isDate(min) && date < min) {
          date = min;
        } else if (Datepicker2._isDate(max) && date > max) {
          date = max;
        }
        this.date = new Date(date.getTime());
        this._renderDateDisplay();
        Datepicker2._setToStartOfDay(this.date);
        this.gotoDate(this.date);
        if (!preventOnSelect && typeof this.options.onSelect === "function") {
          this.options.onSelect.call(this, this.date);
        }
      }
    }, {
      key: "setInputValue",
      value: function setInputValue() {
        this.el.value = this.toString();
        this.$el.trigger("change", { firedBy: this });
      }
    }, {
      key: "_renderDateDisplay",
      value: function _renderDateDisplay() {
        var displayDate = Datepicker2._isDate(this.date) ? this.date : /* @__PURE__ */ new Date();
        var i18n = this.options.i18n;
        var day = i18n.weekdaysShort[displayDate.getDay()];
        var month = i18n.monthsShort[displayDate.getMonth()];
        var date = displayDate.getDate();
        this.yearTextEl.innerHTML = displayDate.getFullYear();
        this.dateTextEl.innerHTML = day + ", " + month + " " + date;
      }
      /**
       * change view to a specific date
       */
    }, {
      key: "gotoDate",
      value: function gotoDate(date) {
        var newCalendar = true;
        if (!Datepicker2._isDate(date)) {
          return;
        }
        if (this.calendars) {
          var firstVisibleDate = new Date(this.calendars[0].year, this.calendars[0].month, 1), lastVisibleDate = new Date(this.calendars[this.calendars.length - 1].year, this.calendars[this.calendars.length - 1].month, 1), visibleDate = date.getTime();
          lastVisibleDate.setMonth(lastVisibleDate.getMonth() + 1);
          lastVisibleDate.setDate(lastVisibleDate.getDate() - 1);
          newCalendar = visibleDate < firstVisibleDate.getTime() || lastVisibleDate.getTime() < visibleDate;
        }
        if (newCalendar) {
          this.calendars = [{
            month: date.getMonth(),
            year: date.getFullYear()
          }];
        }
        this.adjustCalendars();
      }
    }, {
      key: "adjustCalendars",
      value: function adjustCalendars() {
        this.calendars[0] = this.adjustCalendar(this.calendars[0]);
        this.draw();
      }
    }, {
      key: "adjustCalendar",
      value: function adjustCalendar(calendar) {
        if (calendar.month < 0) {
          calendar.year -= Math.ceil(Math.abs(calendar.month) / 12);
          calendar.month += 12;
        }
        if (calendar.month > 11) {
          calendar.year += Math.floor(Math.abs(calendar.month) / 12);
          calendar.month -= 12;
        }
        return calendar;
      }
    }, {
      key: "nextMonth",
      value: function nextMonth() {
        this.calendars[0].month++;
        this.adjustCalendars();
      }
    }, {
      key: "prevMonth",
      value: function prevMonth() {
        this.calendars[0].month--;
        this.adjustCalendars();
      }
    }, {
      key: "render",
      value: function render(year, month, randId) {
        var opts = this.options, now = /* @__PURE__ */ new Date(), days = Datepicker2._getDaysInMonth(year, month), before = new Date(year, month, 1).getDay(), data = [], row = [];
        Datepicker2._setToStartOfDay(now);
        if (opts.firstDay > 0) {
          before -= opts.firstDay;
          if (before < 0) {
            before += 7;
          }
        }
        var previousMonth = month === 0 ? 11 : month - 1, nextMonth = month === 11 ? 0 : month + 1, yearOfPreviousMonth = month === 0 ? year - 1 : year, yearOfNextMonth = month === 11 ? year + 1 : year, daysInPreviousMonth = Datepicker2._getDaysInMonth(yearOfPreviousMonth, previousMonth);
        var cells = days + before, after = cells;
        while (after > 7) {
          after -= 7;
        }
        cells += 7 - after;
        var isWeekSelected = false;
        for (var i = 0, r = 0; i < cells; i++) {
          var day = new Date(year, month, 1 + (i - before)), isSelected = Datepicker2._isDate(this.date) ? Datepicker2._compareDates(day, this.date) : false, isToday = Datepicker2._compareDates(day, now), hasEvent = opts.events.indexOf(day.toDateString()) !== -1 ? true : false, isEmpty = i < before || i >= days + before, dayNumber = 1 + (i - before), monthNumber = month, yearNumber = year, isStartRange = opts.startRange && Datepicker2._compareDates(opts.startRange, day), isEndRange = opts.endRange && Datepicker2._compareDates(opts.endRange, day), isInRange = opts.startRange && opts.endRange && opts.startRange < day && day < opts.endRange, isDisabled = opts.minDate && day < opts.minDate || opts.maxDate && day > opts.maxDate || opts.disableWeekends && Datepicker2._isWeekend(day) || opts.disableDayFn && opts.disableDayFn(day);
          if (isEmpty) {
            if (i < before) {
              dayNumber = daysInPreviousMonth + dayNumber;
              monthNumber = previousMonth;
              yearNumber = yearOfPreviousMonth;
            } else {
              dayNumber = dayNumber - days;
              monthNumber = nextMonth;
              yearNumber = yearOfNextMonth;
            }
          }
          var dayConfig = {
            day: dayNumber,
            month: monthNumber,
            year: yearNumber,
            hasEvent,
            isSelected,
            isToday,
            isDisabled,
            isEmpty,
            isStartRange,
            isEndRange,
            isInRange,
            showDaysInNextAndPreviousMonths: opts.showDaysInNextAndPreviousMonths
          };
          row.push(this.renderDay(dayConfig));
          if (++r === 7) {
            data.push(this.renderRow(row, opts.isRTL, isWeekSelected));
            row = [];
            r = 0;
            isWeekSelected = false;
          }
        }
        return this.renderTable(opts, data, randId);
      }
    }, {
      key: "renderDay",
      value: function renderDay(opts) {
        var arr = [];
        var ariaSelected = "false";
        if (opts.isEmpty) {
          if (opts.showDaysInNextAndPreviousMonths) {
            arr.push("is-outside-current-month");
            arr.push("is-selection-disabled");
          } else {
            return '<td class="is-empty"></td>';
          }
        }
        if (opts.isDisabled) {
          arr.push("is-disabled");
        }
        if (opts.isToday) {
          arr.push("is-today");
        }
        if (opts.isSelected) {
          arr.push("is-selected");
          ariaSelected = "true";
        }
        if (opts.hasEvent) {
          arr.push("has-event");
        }
        if (opts.isInRange) {
          arr.push("is-inrange");
        }
        if (opts.isStartRange) {
          arr.push("is-startrange");
        }
        if (opts.isEndRange) {
          arr.push("is-endrange");
        }
        return '<td data-day="' + opts.day + '" class="' + arr.join(" ") + '" aria-selected="' + ariaSelected + '">' + ('<button class="datepicker-day-button" type="button" data-year="' + opts.year + '" data-month="' + opts.month + '" data-day="' + opts.day + '">' + opts.day + "</button>") + "</td>";
      }
    }, {
      key: "renderRow",
      value: function renderRow(days, isRTL, isRowSelected) {
        return '<tr class="datepicker-row' + (isRowSelected ? " is-selected" : "") + '">' + (isRTL ? days.reverse() : days).join("") + "</tr>";
      }
    }, {
      key: "renderTable",
      value: function renderTable(opts, data, randId) {
        return '<div class="datepicker-table-wrapper"><table cellpadding="0" cellspacing="0" class="datepicker-table" role="grid" aria-labelledby="' + randId + '">' + this.renderHead(opts) + this.renderBody(data) + "</table></div>";
      }
    }, {
      key: "renderHead",
      value: function renderHead(opts) {
        var i = void 0, arr = [];
        for (i = 0; i < 7; i++) {
          arr.push('<th scope="col"><abbr title="' + this.renderDayName(opts, i) + '">' + this.renderDayName(opts, i, true) + "</abbr></th>");
        }
        return "<thead><tr>" + (opts.isRTL ? arr.reverse() : arr).join("") + "</tr></thead>";
      }
    }, {
      key: "renderBody",
      value: function renderBody(rows) {
        return "<tbody>" + rows.join("") + "</tbody>";
      }
    }, {
      key: "renderTitle",
      value: function renderTitle(instance, c, year, month, refYear, randId) {
        var i = void 0, j = void 0, arr = void 0, opts = this.options, isMinYear = year === opts.minYear, isMaxYear = year === opts.maxYear, html = '<div id="' + randId + '" class="datepicker-controls" role="heading" aria-live="assertive">', monthHtml = void 0, yearHtml = void 0, prev = true, next = true;
        for (arr = [], i = 0; i < 12; i++) {
          arr.push('<option value="' + (year === refYear ? i - c : 12 + i - c) + '"' + (i === month ? ' selected="selected"' : "") + (isMinYear && i < opts.minMonth || isMaxYear && i > opts.maxMonth ? 'disabled="disabled"' : "") + ">" + opts.i18n.months[i] + "</option>");
        }
        monthHtml = '<select class="datepicker-select orig-select-month" tabindex="-1">' + arr.join("") + "</select>";
        if ($2.isArray(opts.yearRange)) {
          i = opts.yearRange[0];
          j = opts.yearRange[1] + 1;
        } else {
          i = year - opts.yearRange;
          j = 1 + year + opts.yearRange;
        }
        for (arr = []; i < j && i <= opts.maxYear; i++) {
          if (i >= opts.minYear) {
            arr.push('<option value="' + i + '" ' + (i === year ? 'selected="selected"' : "") + ">" + i + "</option>");
          }
        }
        yearHtml = '<select class="datepicker-select orig-select-year" tabindex="-1">' + arr.join("") + "</select>";
        var leftArrow = '<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"/><path d="M0-.5h24v24H0z" fill="none"/></svg>';
        html += '<button class="month-prev' + (prev ? "" : " is-disabled") + '" type="button">' + leftArrow + "</button>";
        html += '<div class="selects-container">';
        if (opts.showMonthAfterYear) {
          html += yearHtml + monthHtml;
        } else {
          html += monthHtml + yearHtml;
        }
        html += "</div>";
        if (isMinYear && (month === 0 || opts.minMonth >= month)) {
          prev = false;
        }
        if (isMaxYear && (month === 11 || opts.maxMonth <= month)) {
          next = false;
        }
        var rightArrow = '<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/><path d="M0-.25h24v24H0z" fill="none"/></svg>';
        html += '<button class="month-next' + (next ? "" : " is-disabled") + '" type="button">' + rightArrow + "</button>";
        return html += "</div>";
      }
      /**
       * refresh the HTML
       */
    }, {
      key: "draw",
      value: function draw(force) {
        if (!this.isOpen && !force) {
          return;
        }
        var opts = this.options, minYear = opts.minYear, maxYear = opts.maxYear, minMonth = opts.minMonth, maxMonth = opts.maxMonth, html = "", randId = void 0;
        if (this._y <= minYear) {
          this._y = minYear;
          if (!isNaN(minMonth) && this._m < minMonth) {
            this._m = minMonth;
          }
        }
        if (this._y >= maxYear) {
          this._y = maxYear;
          if (!isNaN(maxMonth) && this._m > maxMonth) {
            this._m = maxMonth;
          }
        }
        randId = "datepicker-title-" + Math.random().toString(36).replace(/[^a-z]+/g, "").substr(0, 2);
        for (var c = 0; c < 1; c++) {
          this._renderDateDisplay();
          html += this.renderTitle(this, c, this.calendars[c].year, this.calendars[c].month, this.calendars[0].year, randId) + this.render(this.calendars[c].year, this.calendars[c].month, randId);
        }
        this.destroySelects();
        this.calendarEl.innerHTML = html;
        var yearSelect = this.calendarEl.querySelector(".orig-select-year");
        var monthSelect = this.calendarEl.querySelector(".orig-select-month");
        M.FormSelect.init(yearSelect, {
          classes: "select-year",
          dropdownOptions: { container: document.body, constrainWidth: false }
        });
        M.FormSelect.init(monthSelect, {
          classes: "select-month",
          dropdownOptions: { container: document.body, constrainWidth: false }
        });
        yearSelect.addEventListener("change", this._handleYearChange.bind(this));
        monthSelect.addEventListener("change", this._handleMonthChange.bind(this));
        if (typeof this.options.onDraw === "function") {
          this.options.onDraw(this);
        }
      }
      /**
       * Setup Event Handlers
       */
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleInputKeydownBound = this._handleInputKeydown.bind(this);
        this._handleInputClickBound = this._handleInputClick.bind(this);
        this._handleInputChangeBound = this._handleInputChange.bind(this);
        this._handleCalendarClickBound = this._handleCalendarClick.bind(this);
        this._finishSelectionBound = this._finishSelection.bind(this);
        this._handleMonthChange = this._handleMonthChange.bind(this);
        this._closeBound = this.close.bind(this);
        this.el.addEventListener("click", this._handleInputClickBound);
        this.el.addEventListener("keydown", this._handleInputKeydownBound);
        this.el.addEventListener("change", this._handleInputChangeBound);
        this.calendarEl.addEventListener("click", this._handleCalendarClickBound);
        this.doneBtn.addEventListener("click", this._finishSelectionBound);
        this.cancelBtn.addEventListener("click", this._closeBound);
        if (this.options.showClearBtn) {
          this._handleClearClickBound = this._handleClearClick.bind(this);
          this.clearBtn.addEventListener("click", this._handleClearClickBound);
        }
      }
    }, {
      key: "_setupVariables",
      value: function _setupVariables() {
        var _this56 = this;
        this.$modalEl = $2(Datepicker2._template);
        this.modalEl = this.$modalEl[0];
        this.calendarEl = this.modalEl.querySelector(".datepicker-calendar");
        this.yearTextEl = this.modalEl.querySelector(".year-text");
        this.dateTextEl = this.modalEl.querySelector(".date-text");
        if (this.options.showClearBtn) {
          this.clearBtn = this.modalEl.querySelector(".datepicker-clear");
        }
        this.doneBtn = this.modalEl.querySelector(".datepicker-done");
        this.cancelBtn = this.modalEl.querySelector(".datepicker-cancel");
        this.formats = {
          d: function() {
            return _this56.date.getDate();
          },
          dd: function() {
            var d = _this56.date.getDate();
            return (d < 10 ? "0" : "") + d;
          },
          ddd: function() {
            return _this56.options.i18n.weekdaysShort[_this56.date.getDay()];
          },
          dddd: function() {
            return _this56.options.i18n.weekdays[_this56.date.getDay()];
          },
          m: function() {
            return _this56.date.getMonth() + 1;
          },
          mm: function() {
            var m = _this56.date.getMonth() + 1;
            return (m < 10 ? "0" : "") + m;
          },
          mmm: function() {
            return _this56.options.i18n.monthsShort[_this56.date.getMonth()];
          },
          mmmm: function() {
            return _this56.options.i18n.months[_this56.date.getMonth()];
          },
          yy: function() {
            return ("" + _this56.date.getFullYear()).slice(2);
          },
          yyyy: function() {
            return _this56.date.getFullYear();
          }
        };
      }
      /**
       * Remove Event Handlers
       */
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        this.el.removeEventListener("click", this._handleInputClickBound);
        this.el.removeEventListener("keydown", this._handleInputKeydownBound);
        this.el.removeEventListener("change", this._handleInputChangeBound);
        this.calendarEl.removeEventListener("click", this._handleCalendarClickBound);
      }
    }, {
      key: "_handleInputClick",
      value: function _handleInputClick() {
        this.open();
      }
    }, {
      key: "_handleInputKeydown",
      value: function _handleInputKeydown(e) {
        if (e.which === M.keys.ENTER) {
          e.preventDefault();
          this.open();
        }
      }
    }, {
      key: "_handleCalendarClick",
      value: function _handleCalendarClick(e) {
        if (!this.isOpen) {
          return;
        }
        var $target = $2(e.target);
        if (!$target.hasClass("is-disabled")) {
          if ($target.hasClass("datepicker-day-button") && !$target.hasClass("is-empty") && !$target.parent().hasClass("is-disabled")) {
            this.setDate(new Date(e.target.getAttribute("data-year"), e.target.getAttribute("data-month"), e.target.getAttribute("data-day")));
            if (this.options.autoClose) {
              this._finishSelection();
            }
          } else if ($target.closest(".month-prev").length) {
            this.prevMonth();
          } else if ($target.closest(".month-next").length) {
            this.nextMonth();
          }
        }
      }
    }, {
      key: "_handleClearClick",
      value: function _handleClearClick() {
        this.date = null;
        this.setInputValue();
        this.close();
      }
    }, {
      key: "_handleMonthChange",
      value: function _handleMonthChange(e) {
        this.gotoMonth(e.target.value);
      }
    }, {
      key: "_handleYearChange",
      value: function _handleYearChange(e) {
        this.gotoYear(e.target.value);
      }
      /**
       * change view to a specific month (zero-index, e.g. 0: January)
       */
    }, {
      key: "gotoMonth",
      value: function gotoMonth(month) {
        if (!isNaN(month)) {
          this.calendars[0].month = parseInt(month, 10);
          this.adjustCalendars();
        }
      }
      /**
       * change view to a specific full year (e.g. "2012")
       */
    }, {
      key: "gotoYear",
      value: function gotoYear(year) {
        if (!isNaN(year)) {
          this.calendars[0].year = parseInt(year, 10);
          this.adjustCalendars();
        }
      }
    }, {
      key: "_handleInputChange",
      value: function _handleInputChange(e) {
        var date = void 0;
        if (e.firedBy === this) {
          return;
        }
        if (this.options.parse) {
          date = this.options.parse(this.el.value, this.options.format);
        } else {
          date = new Date(Date.parse(this.el.value));
        }
        if (Datepicker2._isDate(date)) {
          this.setDate(date);
        }
      }
    }, {
      key: "renderDayName",
      value: function renderDayName(opts, day, abbr) {
        day += opts.firstDay;
        while (day >= 7) {
          day -= 7;
        }
        return abbr ? opts.i18n.weekdaysAbbrev[day] : opts.i18n.weekdays[day];
      }
      /**
       * Set input value to the selected date and close Datepicker
       */
    }, {
      key: "_finishSelection",
      value: function _finishSelection() {
        this.setInputValue();
        this.close();
      }
      /**
       * Open Datepicker
       */
    }, {
      key: "open",
      value: function open() {
        if (this.isOpen) {
          return;
        }
        this.isOpen = true;
        if (typeof this.options.onOpen === "function") {
          this.options.onOpen.call(this);
        }
        this.draw();
        this.modal.open();
        return this;
      }
      /**
       * Close Datepicker
       */
    }, {
      key: "close",
      value: function close() {
        if (!this.isOpen) {
          return;
        }
        this.isOpen = false;
        if (typeof this.options.onClose === "function") {
          this.options.onClose.call(this);
        }
        this.modal.close();
        return this;
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Datepicker2.__proto__ || Object.getPrototypeOf(Datepicker2), "init", this).call(this, this, els, options);
      }
    }, {
      key: "_isDate",
      value: function _isDate(obj) {
        return /Date/.test(Object.prototype.toString.call(obj)) && !isNaN(obj.getTime());
      }
    }, {
      key: "_isWeekend",
      value: function _isWeekend(date) {
        var day = date.getDay();
        return day === 0 || day === 6;
      }
    }, {
      key: "_setToStartOfDay",
      value: function _setToStartOfDay(date) {
        if (Datepicker2._isDate(date)) date.setHours(0, 0, 0, 0);
      }
    }, {
      key: "_getDaysInMonth",
      value: function _getDaysInMonth(year, month) {
        return [31, Datepicker2._isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
      }
    }, {
      key: "_isLeapYear",
      value: function _isLeapYear(year) {
        return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
      }
    }, {
      key: "_compareDates",
      value: function _compareDates(a, b) {
        return a.getTime() === b.getTime();
      }
    }, {
      key: "_setToStartOfDay",
      value: function _setToStartOfDay(date) {
        if (Datepicker2._isDate(date)) date.setHours(0, 0, 0, 0);
      }
      /**
       * Get Instance
       */
    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Datepicker;
      }
    }, {
      key: "defaults",
      get: function() {
        return _defaults;
      }
    }]);
    return Datepicker2;
  }(Component);
  Datepicker._template = ['<div class= "modal datepicker-modal">', '<div class="modal-content datepicker-container">', '<div class="datepicker-date-display">', '<span class="year-text"></span>', '<span class="date-text"></span>', "</div>", '<div class="datepicker-calendar-container">', '<div class="datepicker-calendar"></div>', '<div class="datepicker-footer">', '<button class="btn-flat datepicker-clear waves-effect" style="visibility: hidden;" type="button"></button>', '<div class="confirmation-btns">', '<button class="btn-flat datepicker-cancel waves-effect" type="button"></button>', '<button class="btn-flat datepicker-done waves-effect" type="button"></button>', "</div>", "</div>", "</div>", "</div>", "</div>"].join("");
  M.Datepicker = Datepicker;
  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Datepicker, "datepicker", "M_Datepicker");
  }
})(cash);
;
(function($2) {
  "use strict";
  var _defaults = {
    dialRadius: 135,
    outerRadius: 105,
    innerRadius: 70,
    tickRadius: 20,
    duration: 350,
    container: null,
    defaultTime: "now",
    // default time, 'now' or '13:14' e.g.
    fromNow: 0,
    // Millisecond offset from the defaultTime
    showClearBtn: false,
    // internationalization
    i18n: {
      cancel: "Cancel",
      clear: "Clear",
      done: "Ok"
    },
    autoClose: false,
    // auto close when minute is selected
    twelveHour: true,
    // change to 12 hour AM/PM clock from 24 hour
    vibrate: true,
    // vibrate the device when dragging clock hand
    // Callbacks
    onOpenStart: null,
    onOpenEnd: null,
    onCloseStart: null,
    onCloseEnd: null,
    onSelect: null
  };
  var Timepicker = function(_Component16) {
    _inherits(Timepicker2, _Component16);
    function Timepicker2(el, options) {
      _classCallCheck(this, Timepicker2);
      var _this57 = _possibleConstructorReturn(this, (Timepicker2.__proto__ || Object.getPrototypeOf(Timepicker2)).call(this, Timepicker2, el, options));
      _this57.el.M_Timepicker = _this57;
      _this57.options = $2.extend({}, Timepicker2.defaults, options);
      _this57.id = M.guid();
      _this57._insertHTMLIntoDOM();
      _this57._setupModal();
      _this57._setupVariables();
      _this57._setupEventHandlers();
      _this57._clockSetup();
      _this57._pickerSetup();
      return _this57;
    }
    _createClass(Timepicker2, [{
      key: "destroy",
      /**
       * Teardown component
       */
      value: function destroy() {
        this._removeEventHandlers();
        this.modal.destroy();
        $2(this.modalEl).remove();
        this.el.M_Timepicker = void 0;
      }
      /**
       * Setup Event Handlers
       */
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleInputKeydownBound = this._handleInputKeydown.bind(this);
        this._handleInputClickBound = this._handleInputClick.bind(this);
        this._handleClockClickStartBound = this._handleClockClickStart.bind(this);
        this._handleDocumentClickMoveBound = this._handleDocumentClickMove.bind(this);
        this._handleDocumentClickEndBound = this._handleDocumentClickEnd.bind(this);
        this.el.addEventListener("click", this._handleInputClickBound);
        this.el.addEventListener("keydown", this._handleInputKeydownBound);
        this.plate.addEventListener("mousedown", this._handleClockClickStartBound);
        this.plate.addEventListener("touchstart", this._handleClockClickStartBound);
        $2(this.spanHours).on("click", this.showView.bind(this, "hours"));
        $2(this.spanMinutes).on("click", this.showView.bind(this, "minutes"));
      }
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        this.el.removeEventListener("click", this._handleInputClickBound);
        this.el.removeEventListener("keydown", this._handleInputKeydownBound);
      }
    }, {
      key: "_handleInputClick",
      value: function _handleInputClick() {
        this.open();
      }
    }, {
      key: "_handleInputKeydown",
      value: function _handleInputKeydown(e) {
        if (e.which === M.keys.ENTER) {
          e.preventDefault();
          this.open();
        }
      }
    }, {
      key: "_handleClockClickStart",
      value: function _handleClockClickStart(e) {
        e.preventDefault();
        var clockPlateBR = this.plate.getBoundingClientRect();
        var offset = { x: clockPlateBR.left, y: clockPlateBR.top };
        this.x0 = offset.x + this.options.dialRadius;
        this.y0 = offset.y + this.options.dialRadius;
        this.moved = false;
        var clickPos = Timepicker2._Pos(e);
        this.dx = clickPos.x - this.x0;
        this.dy = clickPos.y - this.y0;
        this.setHand(this.dx, this.dy, false);
        document.addEventListener("mousemove", this._handleDocumentClickMoveBound);
        document.addEventListener("touchmove", this._handleDocumentClickMoveBound);
        document.addEventListener("mouseup", this._handleDocumentClickEndBound);
        document.addEventListener("touchend", this._handleDocumentClickEndBound);
      }
    }, {
      key: "_handleDocumentClickMove",
      value: function _handleDocumentClickMove(e) {
        e.preventDefault();
        var clickPos = Timepicker2._Pos(e);
        var x = clickPos.x - this.x0;
        var y = clickPos.y - this.y0;
        this.moved = true;
        this.setHand(x, y, false, true);
      }
    }, {
      key: "_handleDocumentClickEnd",
      value: function _handleDocumentClickEnd(e) {
        var _this58 = this;
        e.preventDefault();
        document.removeEventListener("mouseup", this._handleDocumentClickEndBound);
        document.removeEventListener("touchend", this._handleDocumentClickEndBound);
        var clickPos = Timepicker2._Pos(e);
        var x = clickPos.x - this.x0;
        var y = clickPos.y - this.y0;
        if (this.moved && x === this.dx && y === this.dy) {
          this.setHand(x, y);
        }
        if (this.currentView === "hours") {
          this.showView("minutes", this.options.duration / 2);
        } else if (this.options.autoClose) {
          $2(this.minutesView).addClass("timepicker-dial-out");
          setTimeout(function() {
            _this58.done();
          }, this.options.duration / 2);
        }
        if (typeof this.options.onSelect === "function") {
          this.options.onSelect.call(this, this.hours, this.minutes);
        }
        document.removeEventListener("mousemove", this._handleDocumentClickMoveBound);
        document.removeEventListener("touchmove", this._handleDocumentClickMoveBound);
      }
    }, {
      key: "_insertHTMLIntoDOM",
      value: function _insertHTMLIntoDOM() {
        this.$modalEl = $2(Timepicker2._template);
        this.modalEl = this.$modalEl[0];
        this.modalEl.id = "modal-" + this.id;
        var containerEl = document.querySelector(this.options.container);
        if (this.options.container && !!containerEl) {
          this.$modalEl.appendTo(containerEl);
        } else {
          this.$modalEl.insertBefore(this.el);
        }
      }
    }, {
      key: "_setupModal",
      value: function _setupModal() {
        var _this59 = this;
        this.modal = M.Modal.init(this.modalEl, {
          onOpenStart: this.options.onOpenStart,
          onOpenEnd: this.options.onOpenEnd,
          onCloseStart: this.options.onCloseStart,
          onCloseEnd: function() {
            if (typeof _this59.options.onCloseEnd === "function") {
              _this59.options.onCloseEnd.call(_this59);
            }
            _this59.isOpen = false;
          }
        });
      }
    }, {
      key: "_setupVariables",
      value: function _setupVariables() {
        this.currentView = "hours";
        this.vibrate = navigator.vibrate ? "vibrate" : navigator.webkitVibrate ? "webkitVibrate" : null;
        this._canvas = this.modalEl.querySelector(".timepicker-canvas");
        this.plate = this.modalEl.querySelector(".timepicker-plate");
        this.hoursView = this.modalEl.querySelector(".timepicker-hours");
        this.minutesView = this.modalEl.querySelector(".timepicker-minutes");
        this.spanHours = this.modalEl.querySelector(".timepicker-span-hours");
        this.spanMinutes = this.modalEl.querySelector(".timepicker-span-minutes");
        this.spanAmPm = this.modalEl.querySelector(".timepicker-span-am-pm");
        this.footer = this.modalEl.querySelector(".timepicker-footer");
        this.amOrPm = "PM";
      }
    }, {
      key: "_pickerSetup",
      value: function _pickerSetup() {
        var $clearBtn = $2('<button class="btn-flat timepicker-clear waves-effect" style="visibility: hidden;" type="button" tabindex="' + (this.options.twelveHour ? "3" : "1") + '">' + this.options.i18n.clear + "</button>").appendTo(this.footer).on("click", this.clear.bind(this));
        if (this.options.showClearBtn) {
          $clearBtn.css({ visibility: "" });
        }
        var confirmationBtnsContainer = $2('<div class="confirmation-btns"></div>');
        $2('<button class="btn-flat timepicker-close waves-effect" type="button" tabindex="' + (this.options.twelveHour ? "3" : "1") + '">' + this.options.i18n.cancel + "</button>").appendTo(confirmationBtnsContainer).on("click", this.close.bind(this));
        $2('<button class="btn-flat timepicker-close waves-effect" type="button" tabindex="' + (this.options.twelveHour ? "3" : "1") + '">' + this.options.i18n.done + "</button>").appendTo(confirmationBtnsContainer).on("click", this.done.bind(this));
        confirmationBtnsContainer.appendTo(this.footer);
      }
    }, {
      key: "_clockSetup",
      value: function _clockSetup() {
        if (this.options.twelveHour) {
          this.$amBtn = $2('<div class="am-btn">AM</div>');
          this.$pmBtn = $2('<div class="pm-btn">PM</div>');
          this.$amBtn.on("click", this._handleAmPmClick.bind(this)).appendTo(this.spanAmPm);
          this.$pmBtn.on("click", this._handleAmPmClick.bind(this)).appendTo(this.spanAmPm);
        }
        this._buildHoursView();
        this._buildMinutesView();
        this._buildSVGClock();
      }
    }, {
      key: "_buildSVGClock",
      value: function _buildSVGClock() {
        var dialRadius = this.options.dialRadius;
        var tickRadius = this.options.tickRadius;
        var diameter = dialRadius * 2;
        var svg = Timepicker2._createSVGEl("svg");
        svg.setAttribute("class", "timepicker-svg");
        svg.setAttribute("width", diameter);
        svg.setAttribute("height", diameter);
        var g = Timepicker2._createSVGEl("g");
        g.setAttribute("transform", "translate(" + dialRadius + "," + dialRadius + ")");
        var bearing = Timepicker2._createSVGEl("circle");
        bearing.setAttribute("class", "timepicker-canvas-bearing");
        bearing.setAttribute("cx", 0);
        bearing.setAttribute("cy", 0);
        bearing.setAttribute("r", 4);
        var hand = Timepicker2._createSVGEl("line");
        hand.setAttribute("x1", 0);
        hand.setAttribute("y1", 0);
        var bg = Timepicker2._createSVGEl("circle");
        bg.setAttribute("class", "timepicker-canvas-bg");
        bg.setAttribute("r", tickRadius);
        g.appendChild(hand);
        g.appendChild(bg);
        g.appendChild(bearing);
        svg.appendChild(g);
        this._canvas.appendChild(svg);
        this.hand = hand;
        this.bg = bg;
        this.bearing = bearing;
        this.g = g;
      }
    }, {
      key: "_buildHoursView",
      value: function _buildHoursView() {
        var $tick = $2('<div class="timepicker-tick"></div>');
        if (this.options.twelveHour) {
          for (var i = 1; i < 13; i += 1) {
            var tick = $tick.clone();
            var radian = i / 6 * Math.PI;
            var radius = this.options.outerRadius;
            tick.css({
              left: this.options.dialRadius + Math.sin(radian) * radius - this.options.tickRadius + "px",
              top: this.options.dialRadius - Math.cos(radian) * radius - this.options.tickRadius + "px"
            });
            tick.html(i === 0 ? "00" : i);
            this.hoursView.appendChild(tick[0]);
          }
        } else {
          for (var _i2 = 0; _i2 < 24; _i2 += 1) {
            var _tick = $tick.clone();
            var _radian = _i2 / 6 * Math.PI;
            var inner = _i2 > 0 && _i2 < 13;
            var _radius = inner ? this.options.innerRadius : this.options.outerRadius;
            _tick.css({
              left: this.options.dialRadius + Math.sin(_radian) * _radius - this.options.tickRadius + "px",
              top: this.options.dialRadius - Math.cos(_radian) * _radius - this.options.tickRadius + "px"
            });
            _tick.html(_i2 === 0 ? "00" : _i2);
            this.hoursView.appendChild(_tick[0]);
          }
        }
      }
    }, {
      key: "_buildMinutesView",
      value: function _buildMinutesView() {
        var $tick = $2('<div class="timepicker-tick"></div>');
        for (var i = 0; i < 60; i += 5) {
          var tick = $tick.clone();
          var radian = i / 30 * Math.PI;
          tick.css({
            left: this.options.dialRadius + Math.sin(radian) * this.options.outerRadius - this.options.tickRadius + "px",
            top: this.options.dialRadius - Math.cos(radian) * this.options.outerRadius - this.options.tickRadius + "px"
          });
          tick.html(Timepicker2._addLeadingZero(i));
          this.minutesView.appendChild(tick[0]);
        }
      }
    }, {
      key: "_handleAmPmClick",
      value: function _handleAmPmClick(e) {
        var $btnClicked = $2(e.target);
        this.amOrPm = $btnClicked.hasClass("am-btn") ? "AM" : "PM";
        this._updateAmPmView();
      }
    }, {
      key: "_updateAmPmView",
      value: function _updateAmPmView() {
        if (this.options.twelveHour) {
          this.$amBtn.toggleClass("text-primary", this.amOrPm === "AM");
          this.$pmBtn.toggleClass("text-primary", this.amOrPm === "PM");
        }
      }
    }, {
      key: "_updateTimeFromInput",
      value: function _updateTimeFromInput() {
        var value = ((this.el.value || this.options.defaultTime || "") + "").split(":");
        if (this.options.twelveHour && !(typeof value[1] === "undefined")) {
          if (value[1].toUpperCase().indexOf("AM") > 0) {
            this.amOrPm = "AM";
          } else {
            this.amOrPm = "PM";
          }
          value[1] = value[1].replace("AM", "").replace("PM", "");
        }
        if (value[0] === "now") {
          var now = new Date(+/* @__PURE__ */ new Date() + this.options.fromNow);
          value = [now.getHours(), now.getMinutes()];
          if (this.options.twelveHour) {
            this.amOrPm = value[0] >= 12 && value[0] < 24 ? "PM" : "AM";
          }
        }
        this.hours = +value[0] || 0;
        this.minutes = +value[1] || 0;
        this.spanHours.innerHTML = this.hours;
        this.spanMinutes.innerHTML = Timepicker2._addLeadingZero(this.minutes);
        this._updateAmPmView();
      }
    }, {
      key: "showView",
      value: function showView(view, delay) {
        if (view === "minutes" && $2(this.hoursView).css("visibility") === "visible") {
        }
        var isHours = view === "hours", nextView = isHours ? this.hoursView : this.minutesView, hideView = isHours ? this.minutesView : this.hoursView;
        this.currentView = view;
        $2(this.spanHours).toggleClass("text-primary", isHours);
        $2(this.spanMinutes).toggleClass("text-primary", !isHours);
        hideView.classList.add("timepicker-dial-out");
        $2(nextView).css("visibility", "visible").removeClass("timepicker-dial-out");
        this.resetClock(delay);
        clearTimeout(this.toggleViewTimer);
        this.toggleViewTimer = setTimeout(function() {
          $2(hideView).css("visibility", "hidden");
        }, this.options.duration);
      }
    }, {
      key: "resetClock",
      value: function resetClock(delay) {
        var view = this.currentView, value = this[view], isHours = view === "hours", unit = Math.PI / (isHours ? 6 : 30), radian = value * unit, radius = isHours && value > 0 && value < 13 ? this.options.innerRadius : this.options.outerRadius, x = Math.sin(radian) * radius, y = -Math.cos(radian) * radius, self = this;
        if (delay) {
          $2(this.canvas).addClass("timepicker-canvas-out");
          setTimeout(function() {
            $2(self.canvas).removeClass("timepicker-canvas-out");
            self.setHand(x, y);
          }, delay);
        } else {
          this.setHand(x, y);
        }
      }
    }, {
      key: "setHand",
      value: function setHand(x, y, roundBy5) {
        var _this60 = this;
        var radian = Math.atan2(x, -y), isHours = this.currentView === "hours", unit = Math.PI / (isHours || roundBy5 ? 6 : 30), z = Math.sqrt(x * x + y * y), inner = isHours && z < (this.options.outerRadius + this.options.innerRadius) / 2, radius = inner ? this.options.innerRadius : this.options.outerRadius;
        if (this.options.twelveHour) {
          radius = this.options.outerRadius;
        }
        if (radian < 0) {
          radian = Math.PI * 2 + radian;
        }
        var value = Math.round(radian / unit);
        radian = value * unit;
        if (this.options.twelveHour) {
          if (isHours) {
            if (value === 0) value = 12;
          } else {
            if (roundBy5) value *= 5;
            if (value === 60) value = 0;
          }
        } else {
          if (isHours) {
            if (value === 12) {
              value = 0;
            }
            value = inner ? value === 0 ? 12 : value : value === 0 ? 0 : value + 12;
          } else {
            if (roundBy5) {
              value *= 5;
            }
            if (value === 60) {
              value = 0;
            }
          }
        }
        if (this[this.currentView] !== value) {
          if (this.vibrate && this.options.vibrate) {
            if (!this.vibrateTimer) {
              navigator[this.vibrate](10);
              this.vibrateTimer = setTimeout(function() {
                _this60.vibrateTimer = null;
              }, 100);
            }
          }
        }
        this[this.currentView] = value;
        if (isHours) {
          this["spanHours"].innerHTML = value;
        } else {
          this["spanMinutes"].innerHTML = Timepicker2._addLeadingZero(value);
        }
        var cx1 = Math.sin(radian) * (radius - this.options.tickRadius), cy1 = -Math.cos(radian) * (radius - this.options.tickRadius), cx2 = Math.sin(radian) * radius, cy2 = -Math.cos(radian) * radius;
        this.hand.setAttribute("x2", cx1);
        this.hand.setAttribute("y2", cy1);
        this.bg.setAttribute("cx", cx2);
        this.bg.setAttribute("cy", cy2);
      }
    }, {
      key: "open",
      value: function open() {
        if (this.isOpen) {
          return;
        }
        this.isOpen = true;
        this._updateTimeFromInput();
        this.showView("hours");
        this.modal.open();
      }
    }, {
      key: "close",
      value: function close() {
        if (!this.isOpen) {
          return;
        }
        this.isOpen = false;
        this.modal.close();
      }
      /**
       * Finish timepicker selection.
       */
    }, {
      key: "done",
      value: function done(e, clearValue) {
        var last = this.el.value;
        var value = clearValue ? "" : Timepicker2._addLeadingZero(this.hours) + ":" + Timepicker2._addLeadingZero(this.minutes);
        this.time = value;
        if (!clearValue && this.options.twelveHour) {
          value = value + " " + this.amOrPm;
        }
        this.el.value = value;
        if (value !== last) {
          this.$el.trigger("change");
        }
        this.close();
        this.el.focus();
      }
    }, {
      key: "clear",
      value: function clear() {
        this.done(null, true);
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Timepicker2.__proto__ || Object.getPrototypeOf(Timepicker2), "init", this).call(this, this, els, options);
      }
    }, {
      key: "_addLeadingZero",
      value: function _addLeadingZero(num) {
        return (num < 10 ? "0" : "") + num;
      }
    }, {
      key: "_createSVGEl",
      value: function _createSVGEl(name2) {
        var svgNS = "http://www.w3.org/2000/svg";
        return document.createElementNS(svgNS, name2);
      }
      /**
       * @typedef {Object} Point
       * @property {number} x The X Coordinate
       * @property {number} y The Y Coordinate
       */
      /**
       * Get x position of mouse or touch event
       * @param {Event} e
       * @return {Point} x and y location
       */
    }, {
      key: "_Pos",
      value: function _Pos(e) {
        if (e.targetTouches && e.targetTouches.length >= 1) {
          return { x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY };
        }
        return { x: e.clientX, y: e.clientY };
      }
      /**
       * Get Instance
       */
    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Timepicker;
      }
    }, {
      key: "defaults",
      get: function() {
        return _defaults;
      }
    }]);
    return Timepicker2;
  }(Component);
  Timepicker._template = ['<div class= "modal timepicker-modal">', '<div class="modal-content timepicker-container">', '<div class="timepicker-digital-display">', '<div class="timepicker-text-container">', '<div class="timepicker-display-column">', '<span class="timepicker-span-hours text-primary"></span>', ":", '<span class="timepicker-span-minutes"></span>', "</div>", '<div class="timepicker-display-column timepicker-display-am-pm">', '<div class="timepicker-span-am-pm"></div>', "</div>", "</div>", "</div>", '<div class="timepicker-analog-display">', '<div class="timepicker-plate">', '<div class="timepicker-canvas"></div>', '<div class="timepicker-dial timepicker-hours"></div>', '<div class="timepicker-dial timepicker-minutes timepicker-dial-out"></div>', "</div>", '<div class="timepicker-footer"></div>', "</div>", "</div>", "</div>"].join("");
  M.Timepicker = Timepicker;
  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Timepicker, "timepicker", "M_Timepicker");
  }
})(cash);
;
(function($2) {
  "use strict";
  var _defaults = {};
  var CharacterCounter = function(_Component17) {
    _inherits(CharacterCounter2, _Component17);
    function CharacterCounter2(el, options) {
      _classCallCheck(this, CharacterCounter2);
      var _this61 = _possibleConstructorReturn(this, (CharacterCounter2.__proto__ || Object.getPrototypeOf(CharacterCounter2)).call(this, CharacterCounter2, el, options));
      _this61.el.M_CharacterCounter = _this61;
      _this61.options = $2.extend({}, CharacterCounter2.defaults, options);
      _this61.isInvalid = false;
      _this61.isValidLength = false;
      _this61._setupCounter();
      _this61._setupEventHandlers();
      return _this61;
    }
    _createClass(CharacterCounter2, [{
      key: "destroy",
      /**
       * Teardown component
       */
      value: function destroy() {
        this._removeEventHandlers();
        this.el.CharacterCounter = void 0;
        this._removeCounter();
      }
      /**
       * Setup Event Handlers
       */
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleUpdateCounterBound = this.updateCounter.bind(this);
        this.el.addEventListener("focus", this._handleUpdateCounterBound, true);
        this.el.addEventListener("input", this._handleUpdateCounterBound, true);
      }
      /**
       * Remove Event Handlers
       */
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        this.el.removeEventListener("focus", this._handleUpdateCounterBound, true);
        this.el.removeEventListener("input", this._handleUpdateCounterBound, true);
      }
      /**
       * Setup counter element
       */
    }, {
      key: "_setupCounter",
      value: function _setupCounter() {
        this.counterEl = document.createElement("span");
        $2(this.counterEl).addClass("character-counter").css({
          float: "right",
          "font-size": "12px",
          height: 1
        });
        this.$el.parent().append(this.counterEl);
      }
      /**
       * Remove counter element
       */
    }, {
      key: "_removeCounter",
      value: function _removeCounter() {
        $2(this.counterEl).remove();
      }
      /**
       * Update counter
       */
    }, {
      key: "updateCounter",
      value: function updateCounter() {
        var maxLength = +this.$el.attr("data-length"), actualLength = this.el.value.length;
        this.isValidLength = actualLength <= maxLength;
        var counterString = actualLength;
        if (maxLength) {
          counterString += "/" + maxLength;
          this._validateInput();
        }
        $2(this.counterEl).html(counterString);
      }
      /**
       * Add validation classes
       */
    }, {
      key: "_validateInput",
      value: function _validateInput() {
        if (this.isValidLength && this.isInvalid) {
          this.isInvalid = false;
          this.$el.removeClass("invalid");
        } else if (!this.isValidLength && !this.isInvalid) {
          this.isInvalid = true;
          this.$el.removeClass("valid");
          this.$el.addClass("invalid");
        }
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(CharacterCounter2.__proto__ || Object.getPrototypeOf(CharacterCounter2), "init", this).call(this, this, els, options);
      }
      /**
       * Get Instance
       */
    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_CharacterCounter;
      }
    }, {
      key: "defaults",
      get: function() {
        return _defaults;
      }
    }]);
    return CharacterCounter2;
  }(Component);
  M.CharacterCounter = CharacterCounter;
  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(CharacterCounter, "characterCounter", "M_CharacterCounter");
  }
})(cash);
;
(function($2) {
  "use strict";
  var _defaults = {
    duration: 200,
    // ms
    dist: -100,
    // zoom scale TODO: make this more intuitive as an option
    shift: 0,
    // spacing for center image
    padding: 0,
    // Padding between non center items
    numVisible: 5,
    // Number of visible items in carousel
    fullWidth: false,
    // Change to full width styles
    indicators: false,
    // Toggle indicators
    noWrap: false,
    // Don't wrap around and cycle through items.
    onCycleTo: null
    // Callback for when a new slide is cycled to.
  };
  var Carousel = function(_Component18) {
    _inherits(Carousel2, _Component18);
    function Carousel2(el, options) {
      _classCallCheck(this, Carousel2);
      var _this62 = _possibleConstructorReturn(this, (Carousel2.__proto__ || Object.getPrototypeOf(Carousel2)).call(this, Carousel2, el, options));
      _this62.el.M_Carousel = _this62;
      _this62.options = $2.extend({}, Carousel2.defaults, options);
      _this62.hasMultipleSlides = _this62.$el.find(".carousel-item").length > 1;
      _this62.showIndicators = _this62.options.indicators && _this62.hasMultipleSlides;
      _this62.noWrap = _this62.options.noWrap || !_this62.hasMultipleSlides;
      _this62.pressed = false;
      _this62.dragged = false;
      _this62.offset = _this62.target = 0;
      _this62.images = [];
      _this62.itemWidth = _this62.$el.find(".carousel-item").first().innerWidth();
      _this62.itemHeight = _this62.$el.find(".carousel-item").first().innerHeight();
      _this62.dim = _this62.itemWidth * 2 + _this62.options.padding || 1;
      _this62._autoScrollBound = _this62._autoScroll.bind(_this62);
      _this62._trackBound = _this62._track.bind(_this62);
      if (_this62.options.fullWidth) {
        _this62.options.dist = 0;
        _this62._setCarouselHeight();
        if (_this62.showIndicators) {
          _this62.$el.find(".carousel-fixed-item").addClass("with-indicators");
        }
      }
      _this62.$indicators = $2('<ul class="indicators"></ul>');
      _this62.$el.find(".carousel-item").each(function(el2, i) {
        _this62.images.push(el2);
        if (_this62.showIndicators) {
          var $indicator = $2('<li class="indicator-item"></li>');
          if (i === 0) {
            $indicator[0].classList.add("active");
          }
          _this62.$indicators.append($indicator);
        }
      });
      if (_this62.showIndicators) {
        _this62.$el.append(_this62.$indicators);
      }
      _this62.count = _this62.images.length;
      _this62.options.numVisible = Math.min(_this62.count, _this62.options.numVisible);
      _this62.xform = "transform";
      ["webkit", "Moz", "O", "ms"].every(function(prefix) {
        var e = prefix + "Transform";
        if (typeof document.body.style[e] !== "undefined") {
          _this62.xform = e;
          return false;
        }
        return true;
      });
      _this62._setupEventHandlers();
      _this62._scroll(_this62.offset);
      return _this62;
    }
    _createClass(Carousel2, [{
      key: "destroy",
      /**
       * Teardown component
       */
      value: function destroy() {
        this._removeEventHandlers();
        this.el.M_Carousel = void 0;
      }
      /**
       * Setup Event Handlers
       */
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        var _this63 = this;
        this._handleCarouselTapBound = this._handleCarouselTap.bind(this);
        this._handleCarouselDragBound = this._handleCarouselDrag.bind(this);
        this._handleCarouselReleaseBound = this._handleCarouselRelease.bind(this);
        this._handleCarouselClickBound = this._handleCarouselClick.bind(this);
        if (typeof window.ontouchstart !== "undefined") {
          this.el.addEventListener("touchstart", this._handleCarouselTapBound);
          this.el.addEventListener("touchmove", this._handleCarouselDragBound);
          this.el.addEventListener("touchend", this._handleCarouselReleaseBound);
        }
        this.el.addEventListener("mousedown", this._handleCarouselTapBound);
        this.el.addEventListener("mousemove", this._handleCarouselDragBound);
        this.el.addEventListener("mouseup", this._handleCarouselReleaseBound);
        this.el.addEventListener("mouseleave", this._handleCarouselReleaseBound);
        this.el.addEventListener("click", this._handleCarouselClickBound);
        if (this.showIndicators && this.$indicators) {
          this._handleIndicatorClickBound = this._handleIndicatorClick.bind(this);
          this.$indicators.find(".indicator-item").each(function(el, i) {
            el.addEventListener("click", _this63._handleIndicatorClickBound);
          });
        }
        var throttledResize = M.throttle(this._handleResize, 200);
        this._handleThrottledResizeBound = throttledResize.bind(this);
        window.addEventListener("resize", this._handleThrottledResizeBound);
      }
      /**
       * Remove Event Handlers
       */
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        var _this64 = this;
        if (typeof window.ontouchstart !== "undefined") {
          this.el.removeEventListener("touchstart", this._handleCarouselTapBound);
          this.el.removeEventListener("touchmove", this._handleCarouselDragBound);
          this.el.removeEventListener("touchend", this._handleCarouselReleaseBound);
        }
        this.el.removeEventListener("mousedown", this._handleCarouselTapBound);
        this.el.removeEventListener("mousemove", this._handleCarouselDragBound);
        this.el.removeEventListener("mouseup", this._handleCarouselReleaseBound);
        this.el.removeEventListener("mouseleave", this._handleCarouselReleaseBound);
        this.el.removeEventListener("click", this._handleCarouselClickBound);
        if (this.showIndicators && this.$indicators) {
          this.$indicators.find(".indicator-item").each(function(el, i) {
            el.removeEventListener("click", _this64._handleIndicatorClickBound);
          });
        }
        window.removeEventListener("resize", this._handleThrottledResizeBound);
      }
      /**
       * Handle Carousel Tap
       * @param {Event} e
       */
    }, {
      key: "_handleCarouselTap",
      value: function _handleCarouselTap(e) {
        if (e.type === "mousedown" && $2(e.target).is("img")) {
          e.preventDefault();
        }
        this.pressed = true;
        this.dragged = false;
        this.verticalDragged = false;
        this.reference = this._xpos(e);
        this.referenceY = this._ypos(e);
        this.velocity = this.amplitude = 0;
        this.frame = this.offset;
        this.timestamp = Date.now();
        clearInterval(this.ticker);
        this.ticker = setInterval(this._trackBound, 100);
      }
      /**
       * Handle Carousel Drag
       * @param {Event} e
       */
    }, {
      key: "_handleCarouselDrag",
      value: function _handleCarouselDrag(e) {
        var x = void 0, y = void 0, delta = void 0, deltaY = void 0;
        if (this.pressed) {
          x = this._xpos(e);
          y = this._ypos(e);
          delta = this.reference - x;
          deltaY = Math.abs(this.referenceY - y);
          if (deltaY < 30 && !this.verticalDragged) {
            if (delta > 2 || delta < -2) {
              this.dragged = true;
              this.reference = x;
              this._scroll(this.offset + delta);
            }
          } else if (this.dragged) {
            e.preventDefault();
            e.stopPropagation();
            return false;
          } else {
            this.verticalDragged = true;
          }
        }
        if (this.dragged) {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
      }
      /**
       * Handle Carousel Release
       * @param {Event} e
       */
    }, {
      key: "_handleCarouselRelease",
      value: function _handleCarouselRelease(e) {
        if (this.pressed) {
          this.pressed = false;
        } else {
          return;
        }
        clearInterval(this.ticker);
        this.target = this.offset;
        if (this.velocity > 10 || this.velocity < -10) {
          this.amplitude = 0.9 * this.velocity;
          this.target = this.offset + this.amplitude;
        }
        this.target = Math.round(this.target / this.dim) * this.dim;
        if (this.noWrap) {
          if (this.target >= this.dim * (this.count - 1)) {
            this.target = this.dim * (this.count - 1);
          } else if (this.target < 0) {
            this.target = 0;
          }
        }
        this.amplitude = this.target - this.offset;
        this.timestamp = Date.now();
        requestAnimationFrame(this._autoScrollBound);
        if (this.dragged) {
          e.preventDefault();
          e.stopPropagation();
        }
        return false;
      }
      /**
       * Handle Carousel CLick
       * @param {Event} e
       */
    }, {
      key: "_handleCarouselClick",
      value: function _handleCarouselClick(e) {
        if (this.dragged) {
          e.preventDefault();
          e.stopPropagation();
          return false;
        } else if (!this.options.fullWidth) {
          var clickedIndex = $2(e.target).closest(".carousel-item").index();
          var diff = this._wrap(this.center) - clickedIndex;
          if (diff !== 0) {
            e.preventDefault();
            e.stopPropagation();
          }
          this._cycleTo(clickedIndex);
        }
      }
      /**
       * Handle Indicator CLick
       * @param {Event} e
       */
    }, {
      key: "_handleIndicatorClick",
      value: function _handleIndicatorClick(e) {
        e.stopPropagation();
        var indicator = $2(e.target).closest(".indicator-item");
        if (indicator.length) {
          this._cycleTo(indicator.index());
        }
      }
      /**
       * Handle Throttle Resize
       * @param {Event} e
       */
    }, {
      key: "_handleResize",
      value: function _handleResize(e) {
        if (this.options.fullWidth) {
          this.itemWidth = this.$el.find(".carousel-item").first().innerWidth();
          this.imageHeight = this.$el.find(".carousel-item.active").height();
          this.dim = this.itemWidth * 2 + this.options.padding;
          this.offset = this.center * 2 * this.itemWidth;
          this.target = this.offset;
          this._setCarouselHeight(true);
        } else {
          this._scroll();
        }
      }
      /**
       * Set carousel height based on first slide
       * @param {Booleam} imageOnly - true for image slides
       */
    }, {
      key: "_setCarouselHeight",
      value: function _setCarouselHeight(imageOnly) {
        var _this65 = this;
        var firstSlide = this.$el.find(".carousel-item.active").length ? this.$el.find(".carousel-item.active").first() : this.$el.find(".carousel-item").first();
        var firstImage = firstSlide.find("img").first();
        if (firstImage.length) {
          if (firstImage[0].complete) {
            var imageHeight = firstImage.height();
            if (imageHeight > 0) {
              this.$el.css("height", imageHeight + "px");
            } else {
              var naturalWidth = firstImage[0].naturalWidth;
              var naturalHeight = firstImage[0].naturalHeight;
              var adjustedHeight = this.$el.width() / naturalWidth * naturalHeight;
              this.$el.css("height", adjustedHeight + "px");
            }
          } else {
            firstImage.one("load", function(el, i) {
              _this65.$el.css("height", el.offsetHeight + "px");
            });
          }
        } else if (!imageOnly) {
          var slideHeight = firstSlide.height();
          this.$el.css("height", slideHeight + "px");
        }
      }
      /**
       * Get x position from event
       * @param {Event} e
       */
    }, {
      key: "_xpos",
      value: function _xpos(e) {
        if (e.targetTouches && e.targetTouches.length >= 1) {
          return e.targetTouches[0].clientX;
        }
        return e.clientX;
      }
      /**
       * Get y position from event
       * @param {Event} e
       */
    }, {
      key: "_ypos",
      value: function _ypos(e) {
        if (e.targetTouches && e.targetTouches.length >= 1) {
          return e.targetTouches[0].clientY;
        }
        return e.clientY;
      }
      /**
       * Wrap index
       * @param {Number} x
       */
    }, {
      key: "_wrap",
      value: function _wrap(x) {
        return x >= this.count ? x % this.count : x < 0 ? this._wrap(this.count + x % this.count) : x;
      }
      /**
       * Tracks scrolling information
       */
    }, {
      key: "_track",
      value: function _track() {
        var now = void 0, elapsed = void 0, delta = void 0, v = void 0;
        now = Date.now();
        elapsed = now - this.timestamp;
        this.timestamp = now;
        delta = this.offset - this.frame;
        this.frame = this.offset;
        v = 1e3 * delta / (1 + elapsed);
        this.velocity = 0.8 * v + 0.2 * this.velocity;
      }
      /**
       * Auto scrolls to nearest carousel item.
       */
    }, {
      key: "_autoScroll",
      value: function _autoScroll() {
        var elapsed = void 0, delta = void 0;
        if (this.amplitude) {
          elapsed = Date.now() - this.timestamp;
          delta = this.amplitude * Math.exp(-elapsed / this.options.duration);
          if (delta > 2 || delta < -2) {
            this._scroll(this.target - delta);
            requestAnimationFrame(this._autoScrollBound);
          } else {
            this._scroll(this.target);
          }
        }
      }
      /**
       * Scroll to target
       * @param {Number} x
       */
    }, {
      key: "_scroll",
      value: function _scroll(x) {
        var _this66 = this;
        if (!this.$el.hasClass("scrolling")) {
          this.el.classList.add("scrolling");
        }
        if (this.scrollingTimeout != null) {
          window.clearTimeout(this.scrollingTimeout);
        }
        this.scrollingTimeout = window.setTimeout(function() {
          _this66.$el.removeClass("scrolling");
        }, this.options.duration);
        var i = void 0, half = void 0, delta = void 0, dir = void 0, tween = void 0, el = void 0, alignment = void 0, zTranslation = void 0, tweenedOpacity = void 0, centerTweenedOpacity = void 0;
        var lastCenter = this.center;
        var numVisibleOffset = 1 / this.options.numVisible;
        this.offset = typeof x === "number" ? x : this.offset;
        this.center = Math.floor((this.offset + this.dim / 2) / this.dim);
        delta = this.offset - this.center * this.dim;
        dir = delta < 0 ? 1 : -1;
        tween = -dir * delta * 2 / this.dim;
        half = this.count >> 1;
        if (this.options.fullWidth) {
          alignment = "translateX(0)";
          centerTweenedOpacity = 1;
        } else {
          alignment = "translateX(" + (this.el.clientWidth - this.itemWidth) / 2 + "px) ";
          alignment += "translateY(" + (this.el.clientHeight - this.itemHeight) / 2 + "px)";
          centerTweenedOpacity = 1 - numVisibleOffset * tween;
        }
        if (this.showIndicators) {
          var diff = this.center % this.count;
          var activeIndicator = this.$indicators.find(".indicator-item.active");
          if (activeIndicator.index() !== diff) {
            activeIndicator.removeClass("active");
            this.$indicators.find(".indicator-item").eq(diff)[0].classList.add("active");
          }
        }
        if (!this.noWrap || this.center >= 0 && this.center < this.count) {
          el = this.images[this._wrap(this.center)];
          if (!$2(el).hasClass("active")) {
            this.$el.find(".carousel-item").removeClass("active");
            el.classList.add("active");
          }
          var transformString = alignment + " translateX(" + -delta / 2 + "px) translateX(" + dir * this.options.shift * tween * i + "px) translateZ(" + this.options.dist * tween + "px)";
          this._updateItemStyle(el, centerTweenedOpacity, 0, transformString);
        }
        for (i = 1; i <= half; ++i) {
          if (this.options.fullWidth) {
            zTranslation = this.options.dist;
            tweenedOpacity = i === half && delta < 0 ? 1 - tween : 1;
          } else {
            zTranslation = this.options.dist * (i * 2 + tween * dir);
            tweenedOpacity = 1 - numVisibleOffset * (i * 2 + tween * dir);
          }
          if (!this.noWrap || this.center + i < this.count) {
            el = this.images[this._wrap(this.center + i)];
            var _transformString = alignment + " translateX(" + (this.options.shift + (this.dim * i - delta) / 2) + "px) translateZ(" + zTranslation + "px)";
            this._updateItemStyle(el, tweenedOpacity, -i, _transformString);
          }
          if (this.options.fullWidth) {
            zTranslation = this.options.dist;
            tweenedOpacity = i === half && delta > 0 ? 1 - tween : 1;
          } else {
            zTranslation = this.options.dist * (i * 2 - tween * dir);
            tweenedOpacity = 1 - numVisibleOffset * (i * 2 - tween * dir);
          }
          if (!this.noWrap || this.center - i >= 0) {
            el = this.images[this._wrap(this.center - i)];
            var _transformString2 = alignment + " translateX(" + (-this.options.shift + (-this.dim * i - delta) / 2) + "px) translateZ(" + zTranslation + "px)";
            this._updateItemStyle(el, tweenedOpacity, -i, _transformString2);
          }
        }
        if (!this.noWrap || this.center >= 0 && this.center < this.count) {
          el = this.images[this._wrap(this.center)];
          var _transformString3 = alignment + " translateX(" + -delta / 2 + "px) translateX(" + dir * this.options.shift * tween + "px) translateZ(" + this.options.dist * tween + "px)";
          this._updateItemStyle(el, centerTweenedOpacity, 0, _transformString3);
        }
        var $currItem = this.$el.find(".carousel-item").eq(this._wrap(this.center));
        if (lastCenter !== this.center && typeof this.options.onCycleTo === "function") {
          this.options.onCycleTo.call(this, $currItem[0], this.dragged);
        }
        if (typeof this.oneTimeCallback === "function") {
          this.oneTimeCallback.call(this, $currItem[0], this.dragged);
          this.oneTimeCallback = null;
        }
      }
      /**
       * Cycle to target
       * @param {Element} el
       * @param {Number} opacity
       * @param {Number} zIndex
       * @param {String} transform
       */
    }, {
      key: "_updateItemStyle",
      value: function _updateItemStyle(el, opacity, zIndex, transform) {
        el.style[this.xform] = transform;
        el.style.zIndex = zIndex;
        el.style.opacity = opacity;
        el.style.visibility = "visible";
      }
      /**
       * Cycle to target
       * @param {Number} n
       * @param {Function} callback
       */
    }, {
      key: "_cycleTo",
      value: function _cycleTo(n, callback) {
        var diff = this.center % this.count - n;
        if (!this.noWrap) {
          if (diff < 0) {
            if (Math.abs(diff + this.count) < Math.abs(diff)) {
              diff += this.count;
            }
          } else if (diff > 0) {
            if (Math.abs(diff - this.count) < diff) {
              diff -= this.count;
            }
          }
        }
        this.target = this.dim * Math.round(this.offset / this.dim);
        if (diff < 0) {
          this.target += this.dim * Math.abs(diff);
        } else if (diff > 0) {
          this.target -= this.dim * diff;
        }
        if (typeof callback === "function") {
          this.oneTimeCallback = callback;
        }
        if (this.offset !== this.target) {
          this.amplitude = this.target - this.offset;
          this.timestamp = Date.now();
          requestAnimationFrame(this._autoScrollBound);
        }
      }
      /**
       * Cycle to next item
       * @param {Number} [n]
       */
    }, {
      key: "next",
      value: function next(n) {
        if (n === void 0 || isNaN(n)) {
          n = 1;
        }
        var index = this.center + n;
        if (index >= this.count || index < 0) {
          if (this.noWrap) {
            return;
          }
          index = this._wrap(index);
        }
        this._cycleTo(index);
      }
      /**
       * Cycle to previous item
       * @param {Number} [n]
       */
    }, {
      key: "prev",
      value: function prev(n) {
        if (n === void 0 || isNaN(n)) {
          n = 1;
        }
        var index = this.center - n;
        if (index >= this.count || index < 0) {
          if (this.noWrap) {
            return;
          }
          index = this._wrap(index);
        }
        this._cycleTo(index);
      }
      /**
       * Cycle to nth item
       * @param {Number} [n]
       * @param {Function} callback
       */
    }, {
      key: "set",
      value: function set(n, callback) {
        if (n === void 0 || isNaN(n)) {
          n = 0;
        }
        if (n > this.count || n < 0) {
          if (this.noWrap) {
            return;
          }
          n = this._wrap(n);
        }
        this._cycleTo(n, callback);
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Carousel2.__proto__ || Object.getPrototypeOf(Carousel2), "init", this).call(this, this, els, options);
      }
      /**
       * Get Instance
       */
    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Carousel;
      }
    }, {
      key: "defaults",
      get: function() {
        return _defaults;
      }
    }]);
    return Carousel2;
  }(Component);
  M.Carousel = Carousel;
  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Carousel, "carousel", "M_Carousel");
  }
})(cash);
;
(function($2) {
  "use strict";
  var _defaults = {
    onOpen: void 0,
    onClose: void 0
  };
  var TapTarget = function(_Component19) {
    _inherits(TapTarget2, _Component19);
    function TapTarget2(el, options) {
      _classCallCheck(this, TapTarget2);
      var _this67 = _possibleConstructorReturn(this, (TapTarget2.__proto__ || Object.getPrototypeOf(TapTarget2)).call(this, TapTarget2, el, options));
      _this67.el.M_TapTarget = _this67;
      _this67.options = $2.extend({}, TapTarget2.defaults, options);
      _this67.isOpen = false;
      _this67.$origin = $2("#" + _this67.$el.attr("data-target"));
      _this67._setup();
      _this67._calculatePositioning();
      _this67._setupEventHandlers();
      return _this67;
    }
    _createClass(TapTarget2, [{
      key: "destroy",
      /**
       * Teardown component
       */
      value: function destroy() {
        this._removeEventHandlers();
        this.el.TapTarget = void 0;
      }
      /**
       * Setup Event Handlers
       */
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleDocumentClickBound = this._handleDocumentClick.bind(this);
        this._handleTargetClickBound = this._handleTargetClick.bind(this);
        this._handleOriginClickBound = this._handleOriginClick.bind(this);
        this.el.addEventListener("click", this._handleTargetClickBound);
        this.originEl.addEventListener("click", this._handleOriginClickBound);
        var throttledResize = M.throttle(this._handleResize, 200);
        this._handleThrottledResizeBound = throttledResize.bind(this);
        window.addEventListener("resize", this._handleThrottledResizeBound);
      }
      /**
       * Remove Event Handlers
       */
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        this.el.removeEventListener("click", this._handleTargetClickBound);
        this.originEl.removeEventListener("click", this._handleOriginClickBound);
        window.removeEventListener("resize", this._handleThrottledResizeBound);
      }
      /**
       * Handle Target Click
       * @param {Event} e
       */
    }, {
      key: "_handleTargetClick",
      value: function _handleTargetClick(e) {
        this.open();
      }
      /**
       * Handle Origin Click
       * @param {Event} e
       */
    }, {
      key: "_handleOriginClick",
      value: function _handleOriginClick(e) {
        this.close();
      }
      /**
       * Handle Resize
       * @param {Event} e
       */
    }, {
      key: "_handleResize",
      value: function _handleResize(e) {
        this._calculatePositioning();
      }
      /**
       * Handle Resize
       * @param {Event} e
       */
    }, {
      key: "_handleDocumentClick",
      value: function _handleDocumentClick(e) {
        if (!$2(e.target).closest(".tap-target-wrapper").length) {
          this.close();
          e.preventDefault();
          e.stopPropagation();
        }
      }
      /**
       * Setup Tap Target
       */
    }, {
      key: "_setup",
      value: function _setup() {
        this.wrapper = this.$el.parent()[0];
        this.waveEl = $2(this.wrapper).find(".tap-target-wave")[0];
        this.originEl = $2(this.wrapper).find(".tap-target-origin")[0];
        this.contentEl = this.$el.find(".tap-target-content")[0];
        if (!$2(this.wrapper).hasClass(".tap-target-wrapper")) {
          this.wrapper = document.createElement("div");
          this.wrapper.classList.add("tap-target-wrapper");
          this.$el.before($2(this.wrapper));
          this.wrapper.append(this.el);
        }
        if (!this.contentEl) {
          this.contentEl = document.createElement("div");
          this.contentEl.classList.add("tap-target-content");
          this.$el.append(this.contentEl);
        }
        if (!this.waveEl) {
          this.waveEl = document.createElement("div");
          this.waveEl.classList.add("tap-target-wave");
          if (!this.originEl) {
            this.originEl = this.$origin.clone(true, true);
            this.originEl.addClass("tap-target-origin");
            this.originEl.removeAttr("id");
            this.originEl.removeAttr("style");
            this.originEl = this.originEl[0];
            this.waveEl.append(this.originEl);
          }
          this.wrapper.append(this.waveEl);
        }
      }
      /**
       * Calculate positioning
       */
    }, {
      key: "_calculatePositioning",
      value: function _calculatePositioning() {
        var isFixed = this.$origin.css("position") === "fixed";
        if (!isFixed) {
          var parents = this.$origin.parents();
          for (var i = 0; i < parents.length; i++) {
            isFixed = $2(parents[i]).css("position") == "fixed";
            if (isFixed) {
              break;
            }
          }
        }
        var originWidth = this.$origin.outerWidth();
        var originHeight = this.$origin.outerHeight();
        var originTop = isFixed ? this.$origin.offset().top - M.getDocumentScrollTop() : this.$origin.offset().top;
        var originLeft = isFixed ? this.$origin.offset().left - M.getDocumentScrollLeft() : this.$origin.offset().left;
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var centerX = windowWidth / 2;
        var centerY = windowHeight / 2;
        var isLeft = originLeft <= centerX;
        var isRight = originLeft > centerX;
        var isTop = originTop <= centerY;
        var isBottom = originTop > centerY;
        var isCenterX = originLeft >= windowWidth * 0.25 && originLeft <= windowWidth * 0.75;
        var tapTargetWidth = this.$el.outerWidth();
        var tapTargetHeight = this.$el.outerHeight();
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
        tapTargetWrapperCssObj.top = isTop ? tapTargetTop + "px" : "";
        tapTargetWrapperCssObj.right = isRight ? windowWidth - tapTargetLeft - tapTargetWidth + "px" : "";
        tapTargetWrapperCssObj.bottom = isBottom ? windowHeight - tapTargetTop - tapTargetHeight + "px" : "";
        tapTargetWrapperCssObj.left = isLeft ? tapTargetLeft + "px" : "";
        tapTargetWrapperCssObj.position = tapTargetPosition;
        $2(this.wrapper).css(tapTargetWrapperCssObj);
        $2(this.contentEl).css({
          width: tapTargetTextWidth + "px",
          height: tapTargetTextHeight + "px",
          top: tapTargetTextTop + "px",
          right: tapTargetTextRight + "px",
          bottom: tapTargetTextBottom + "px",
          left: tapTargetTextLeft + "px",
          padding: tapTargetTextPadding + "px",
          verticalAlign: tapTargetTextAlign
        });
        $2(this.waveEl).css({
          top: tapTargetWaveTop + "px",
          left: tapTargetWaveLeft + "px",
          width: tapTargetWaveWidth + "px",
          height: tapTargetWaveHeight + "px"
        });
      }
      /**
       * Open TapTarget
       */
    }, {
      key: "open",
      value: function open() {
        if (this.isOpen) {
          return;
        }
        if (typeof this.options.onOpen === "function") {
          this.options.onOpen.call(this, this.$origin[0]);
        }
        this.isOpen = true;
        this.wrapper.classList.add("open");
        document.body.addEventListener("click", this._handleDocumentClickBound, true);
        document.body.addEventListener("touchend", this._handleDocumentClickBound);
      }
      /**
       * Close Tap Target
       */
    }, {
      key: "close",
      value: function close() {
        if (!this.isOpen) {
          return;
        }
        if (typeof this.options.onClose === "function") {
          this.options.onClose.call(this, this.$origin[0]);
        }
        this.isOpen = false;
        this.wrapper.classList.remove("open");
        document.body.removeEventListener("click", this._handleDocumentClickBound, true);
        document.body.removeEventListener("touchend", this._handleDocumentClickBound);
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(TapTarget2.__proto__ || Object.getPrototypeOf(TapTarget2), "init", this).call(this, this, els, options);
      }
      /**
       * Get Instance
       */
    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_TapTarget;
      }
    }, {
      key: "defaults",
      get: function() {
        return _defaults;
      }
    }]);
    return TapTarget2;
  }(Component);
  M.TapTarget = TapTarget;
  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(TapTarget, "tapTarget", "M_TapTarget");
  }
})(cash);
;
(function($2) {
  "use strict";
  var _defaults = {
    classes: "",
    dropdownOptions: {}
  };
  var FormSelect = function(_Component20) {
    _inherits(FormSelect2, _Component20);
    function FormSelect2(el, options) {
      _classCallCheck(this, FormSelect2);
      var _this68 = _possibleConstructorReturn(this, (FormSelect2.__proto__ || Object.getPrototypeOf(FormSelect2)).call(this, FormSelect2, el, options));
      if (_this68.$el.hasClass("browser-default")) {
        return _possibleConstructorReturn(_this68);
      }
      _this68.el.M_FormSelect = _this68;
      _this68.options = $2.extend({}, FormSelect2.defaults, options);
      _this68.isMultiple = _this68.$el.prop("multiple");
      _this68.el.tabIndex = -1;
      _this68._keysSelected = {};
      _this68._valueDict = {};
      _this68._setupDropdown();
      _this68._setupEventHandlers();
      return _this68;
    }
    _createClass(FormSelect2, [{
      key: "destroy",
      /**
       * Teardown component
       */
      value: function destroy() {
        this._removeEventHandlers();
        this._removeDropdown();
        this.el.M_FormSelect = void 0;
      }
      /**
       * Setup Event Handlers
       */
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        var _this69 = this;
        this._handleSelectChangeBound = this._handleSelectChange.bind(this);
        this._handleOptionClickBound = this._handleOptionClick.bind(this);
        this._handleInputClickBound = this._handleInputClick.bind(this);
        $2(this.dropdownOptions).find("li:not(.optgroup)").each(function(el) {
          el.addEventListener("click", _this69._handleOptionClickBound);
        });
        this.el.addEventListener("change", this._handleSelectChangeBound);
        this.input.addEventListener("click", this._handleInputClickBound);
      }
      /**
       * Remove Event Handlers
       */
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        var _this70 = this;
        $2(this.dropdownOptions).find("li:not(.optgroup)").each(function(el) {
          el.removeEventListener("click", _this70._handleOptionClickBound);
        });
        this.el.removeEventListener("change", this._handleSelectChangeBound);
        this.input.removeEventListener("click", this._handleInputClickBound);
      }
      /**
       * Handle Select Change
       * @param {Event} e
       */
    }, {
      key: "_handleSelectChange",
      value: function _handleSelectChange(e) {
        this._setValueToInput();
      }
      /**
       * Handle Option Click
       * @param {Event} e
       */
    }, {
      key: "_handleOptionClick",
      value: function _handleOptionClick(e) {
        e.preventDefault();
        var option = $2(e.target).closest("li")[0];
        var key = option.id;
        if (!$2(option).hasClass("disabled") && !$2(option).hasClass("optgroup") && key.length) {
          var selected = true;
          if (this.isMultiple) {
            var placeholderOption = $2(this.dropdownOptions).find("li.disabled.selected");
            if (placeholderOption.length) {
              placeholderOption.removeClass("selected");
              placeholderOption.find('input[type="checkbox"]').prop("checked", false);
              this._toggleEntryFromArray(placeholderOption[0].id);
            }
            selected = this._toggleEntryFromArray(key);
          } else {
            $2(this.dropdownOptions).find("li").removeClass("selected");
            $2(option).toggleClass("selected", selected);
          }
          var prevSelected = $2(this._valueDict[key].el).prop("selected");
          if (prevSelected !== selected) {
            $2(this._valueDict[key].el).prop("selected", selected);
            this.$el.trigger("change");
          }
        }
        e.stopPropagation();
      }
      /**
       * Handle Input Click
       */
    }, {
      key: "_handleInputClick",
      value: function _handleInputClick() {
        if (this.dropdown && this.dropdown.isOpen) {
          this._setValueToInput();
          this._setSelectedStates();
        }
      }
      /**
       * Setup dropdown
       */
    }, {
      key: "_setupDropdown",
      value: function _setupDropdown() {
        var _this71 = this;
        this.wrapper = document.createElement("div");
        $2(this.wrapper).addClass("select-wrapper " + this.options.classes);
        this.$el.before($2(this.wrapper));
        this.wrapper.appendChild(this.el);
        if (this.el.disabled) {
          this.wrapper.classList.add("disabled");
        }
        this.$selectOptions = this.$el.children("option, optgroup");
        this.dropdownOptions = document.createElement("ul");
        this.dropdownOptions.id = "select-options-" + M.guid();
        $2(this.dropdownOptions).addClass("dropdown-content select-dropdown " + (this.isMultiple ? "multiple-select-dropdown" : ""));
        if (this.$selectOptions.length) {
          this.$selectOptions.each(function(el) {
            if ($2(el).is("option")) {
              var optionEl = void 0;
              if (_this71.isMultiple) {
                optionEl = _this71._appendOptionWithIcon(_this71.$el, el, "multiple");
              } else {
                optionEl = _this71._appendOptionWithIcon(_this71.$el, el);
              }
              _this71._addOptionToValueDict(el, optionEl);
            } else if ($2(el).is("optgroup")) {
              var selectOptions = $2(el).children("option");
              $2(_this71.dropdownOptions).append($2('<li class="optgroup"><span>' + el.getAttribute("label") + "</span></li>")[0]);
              selectOptions.each(function(el2) {
                var optionEl2 = _this71._appendOptionWithIcon(_this71.$el, el2, "optgroup-option");
                _this71._addOptionToValueDict(el2, optionEl2);
              });
            }
          });
        }
        this.$el.after(this.dropdownOptions);
        this.input = document.createElement("input");
        $2(this.input).addClass("select-dropdown dropdown-trigger");
        this.input.setAttribute("type", "text");
        this.input.setAttribute("readonly", "true");
        this.input.setAttribute("data-target", this.dropdownOptions.id);
        if (this.el.disabled) {
          $2(this.input).prop("disabled", "true");
        }
        this.$el.before(this.input);
        this._setValueToInput();
        var dropdownIcon = $2('<svg class="caret" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>');
        this.$el.before(dropdownIcon[0]);
        if (!this.el.disabled) {
          var dropdownOptions = $2.extend({}, this.options.dropdownOptions);
          dropdownOptions.onOpenEnd = function(el) {
            var selectedOption = $2(_this71.dropdownOptions).find(".selected").first();
            if (selectedOption.length) {
              M.keyDown = true;
              _this71.dropdown.focusedIndex = selectedOption.index();
              _this71.dropdown._focusFocusedItem();
              M.keyDown = false;
              if (_this71.dropdown.isScrollable) {
                var scrollOffset = selectedOption[0].getBoundingClientRect().top - _this71.dropdownOptions.getBoundingClientRect().top;
                scrollOffset -= _this71.dropdownOptions.clientHeight / 2;
                _this71.dropdownOptions.scrollTop = scrollOffset;
              }
            }
          };
          if (this.isMultiple) {
            dropdownOptions.closeOnClick = false;
          }
          this.dropdown = M.Dropdown.init(this.input, dropdownOptions);
        }
        this._setSelectedStates();
      }
      /**
       * Add option to value dict
       * @param {Element} el  original option element
       * @param {Element} optionEl  generated option element
       */
    }, {
      key: "_addOptionToValueDict",
      value: function _addOptionToValueDict(el, optionEl) {
        var index = Object.keys(this._valueDict).length;
        var key = this.dropdownOptions.id + index;
        var obj = {};
        optionEl.id = key;
        obj.el = el;
        obj.optionEl = optionEl;
        this._valueDict[key] = obj;
      }
      /**
       * Remove dropdown
       */
    }, {
      key: "_removeDropdown",
      value: function _removeDropdown() {
        $2(this.wrapper).find(".caret").remove();
        $2(this.input).remove();
        $2(this.dropdownOptions).remove();
        $2(this.wrapper).before(this.$el);
        $2(this.wrapper).remove();
      }
      /**
       * Setup dropdown
       * @param {Element} select  select element
       * @param {Element} option  option element from select
       * @param {String} type
       * @return {Element}  option element added
       */
    }, {
      key: "_appendOptionWithIcon",
      value: function _appendOptionWithIcon(select, option, type) {
        var disabledClass = option.disabled ? "disabled " : "";
        var optgroupClass = type === "optgroup-option" ? "optgroup-option " : "";
        var multipleCheckbox = this.isMultiple ? '<label><input type="checkbox"' + disabledClass + '"/><span>' + option.innerHTML + "</span></label>" : option.innerHTML;
        var liEl = $2("<li></li>");
        var spanEl = $2("<span></span>");
        spanEl.html(multipleCheckbox);
        liEl.addClass(disabledClass + " " + optgroupClass);
        liEl.append(spanEl);
        var iconUrl = option.getAttribute("data-icon");
        if (!!iconUrl) {
          var imgEl = $2('<img alt="" src="' + iconUrl + '">');
          liEl.prepend(imgEl);
        }
        $2(this.dropdownOptions).append(liEl[0]);
        return liEl[0];
      }
      /**
       * Toggle entry from option
       * @param {String} key  Option key
       * @return {Boolean}  if entry was added or removed
       */
    }, {
      key: "_toggleEntryFromArray",
      value: function _toggleEntryFromArray(key) {
        var notAdded = !this._keysSelected.hasOwnProperty(key);
        var $optionLi = $2(this._valueDict[key].optionEl);
        if (notAdded) {
          this._keysSelected[key] = true;
        } else {
          delete this._keysSelected[key];
        }
        $optionLi.toggleClass("selected", notAdded);
        $optionLi.find('input[type="checkbox"]').prop("checked", notAdded);
        $optionLi.prop("selected", notAdded);
        return notAdded;
      }
      /**
       * Set text value to input
       */
    }, {
      key: "_setValueToInput",
      value: function _setValueToInput() {
        var values = [];
        var options = this.$el.find("option");
        options.each(function(el) {
          if ($2(el).prop("selected")) {
            var text = $2(el).text();
            values.push(text);
          }
        });
        if (!values.length) {
          var firstDisabled = this.$el.find("option:disabled").eq(0);
          if (firstDisabled.length && firstDisabled[0].value === "") {
            values.push(firstDisabled.text());
          }
        }
        this.input.value = values.join(", ");
      }
      /**
       * Set selected state of dropdown to match actual select element
       */
    }, {
      key: "_setSelectedStates",
      value: function _setSelectedStates() {
        this._keysSelected = {};
        for (var key in this._valueDict) {
          var option = this._valueDict[key];
          var optionIsSelected = $2(option.el).prop("selected");
          $2(option.optionEl).find('input[type="checkbox"]').prop("checked", optionIsSelected);
          if (optionIsSelected) {
            this._activateOption($2(this.dropdownOptions), $2(option.optionEl));
            this._keysSelected[key] = true;
          } else {
            $2(option.optionEl).removeClass("selected");
          }
        }
      }
      /**
       * Make option as selected and scroll to selected position
       * @param {jQuery} collection  Select options jQuery element
       * @param {Element} newOption  element of the new option
       */
    }, {
      key: "_activateOption",
      value: function _activateOption(collection, newOption) {
        if (newOption) {
          if (!this.isMultiple) {
            collection.find("li.selected").removeClass("selected");
          }
          var option = $2(newOption);
          option.addClass("selected");
        }
      }
      /**
       * Get Selected Values
       * @return {Array}  Array of selected values
       */
    }, {
      key: "getSelectedValues",
      value: function getSelectedValues() {
        var selectedValues = [];
        for (var key in this._keysSelected) {
          selectedValues.push(this._valueDict[key].el.value);
        }
        return selectedValues;
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(FormSelect2.__proto__ || Object.getPrototypeOf(FormSelect2), "init", this).call(this, this, els, options);
      }
      /**
       * Get Instance
       */
    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_FormSelect;
      }
    }, {
      key: "defaults",
      get: function() {
        return _defaults;
      }
    }]);
    return FormSelect2;
  }(Component);
  M.FormSelect = FormSelect;
  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(FormSelect, "formSelect", "M_FormSelect");
  }
})(cash);
;
(function($2, anim) {
  "use strict";
  var _defaults = {};
  var Range = function(_Component21) {
    _inherits(Range2, _Component21);
    function Range2(el, options) {
      _classCallCheck(this, Range2);
      var _this72 = _possibleConstructorReturn(this, (Range2.__proto__ || Object.getPrototypeOf(Range2)).call(this, Range2, el, options));
      _this72.el.M_Range = _this72;
      _this72.options = $2.extend({}, Range2.defaults, options);
      _this72._mousedown = false;
      _this72._setupThumb();
      _this72._setupEventHandlers();
      return _this72;
    }
    _createClass(Range2, [{
      key: "destroy",
      /**
       * Teardown component
       */
      value: function destroy() {
        this._removeEventHandlers();
        this._removeThumb();
        this.el.M_Range = void 0;
      }
      /**
       * Setup Event Handlers
       */
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleRangeChangeBound = this._handleRangeChange.bind(this);
        this._handleRangeMousedownTouchstartBound = this._handleRangeMousedownTouchstart.bind(this);
        this._handleRangeInputMousemoveTouchmoveBound = this._handleRangeInputMousemoveTouchmove.bind(this);
        this._handleRangeMouseupTouchendBound = this._handleRangeMouseupTouchend.bind(this);
        this._handleRangeBlurMouseoutTouchleaveBound = this._handleRangeBlurMouseoutTouchleave.bind(this);
        this.el.addEventListener("change", this._handleRangeChangeBound);
        this.el.addEventListener("mousedown", this._handleRangeMousedownTouchstartBound);
        this.el.addEventListener("touchstart", this._handleRangeMousedownTouchstartBound);
        this.el.addEventListener("input", this._handleRangeInputMousemoveTouchmoveBound);
        this.el.addEventListener("mousemove", this._handleRangeInputMousemoveTouchmoveBound);
        this.el.addEventListener("touchmove", this._handleRangeInputMousemoveTouchmoveBound);
        this.el.addEventListener("mouseup", this._handleRangeMouseupTouchendBound);
        this.el.addEventListener("touchend", this._handleRangeMouseupTouchendBound);
        this.el.addEventListener("blur", this._handleRangeBlurMouseoutTouchleaveBound);
        this.el.addEventListener("mouseout", this._handleRangeBlurMouseoutTouchleaveBound);
        this.el.addEventListener("touchleave", this._handleRangeBlurMouseoutTouchleaveBound);
      }
      /**
       * Remove Event Handlers
       */
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        this.el.removeEventListener("change", this._handleRangeChangeBound);
        this.el.removeEventListener("mousedown", this._handleRangeMousedownTouchstartBound);
        this.el.removeEventListener("touchstart", this._handleRangeMousedownTouchstartBound);
        this.el.removeEventListener("input", this._handleRangeInputMousemoveTouchmoveBound);
        this.el.removeEventListener("mousemove", this._handleRangeInputMousemoveTouchmoveBound);
        this.el.removeEventListener("touchmove", this._handleRangeInputMousemoveTouchmoveBound);
        this.el.removeEventListener("mouseup", this._handleRangeMouseupTouchendBound);
        this.el.removeEventListener("touchend", this._handleRangeMouseupTouchendBound);
        this.el.removeEventListener("blur", this._handleRangeBlurMouseoutTouchleaveBound);
        this.el.removeEventListener("mouseout", this._handleRangeBlurMouseoutTouchleaveBound);
        this.el.removeEventListener("touchleave", this._handleRangeBlurMouseoutTouchleaveBound);
      }
      /**
       * Handle Range Change
       * @param {Event} e
       */
    }, {
      key: "_handleRangeChange",
      value: function _handleRangeChange() {
        $2(this.value).html(this.$el.val());
        if (!$2(this.thumb).hasClass("active")) {
          this._showRangeBubble();
        }
        var offsetLeft = this._calcRangeOffset();
        $2(this.thumb).addClass("active").css("left", offsetLeft + "px");
      }
      /**
       * Handle Range Mousedown and Touchstart
       * @param {Event} e
       */
    }, {
      key: "_handleRangeMousedownTouchstart",
      value: function _handleRangeMousedownTouchstart(e) {
        $2(this.value).html(this.$el.val());
        this._mousedown = true;
        this.$el.addClass("active");
        if (!$2(this.thumb).hasClass("active")) {
          this._showRangeBubble();
        }
        if (e.type !== "input") {
          var offsetLeft = this._calcRangeOffset();
          $2(this.thumb).addClass("active").css("left", offsetLeft + "px");
        }
      }
      /**
       * Handle Range Input, Mousemove and Touchmove
       */
    }, {
      key: "_handleRangeInputMousemoveTouchmove",
      value: function _handleRangeInputMousemoveTouchmove() {
        if (this._mousedown) {
          if (!$2(this.thumb).hasClass("active")) {
            this._showRangeBubble();
          }
          var offsetLeft = this._calcRangeOffset();
          $2(this.thumb).addClass("active").css("left", offsetLeft + "px");
          $2(this.value).html(this.$el.val());
        }
      }
      /**
       * Handle Range Mouseup and Touchend
       */
    }, {
      key: "_handleRangeMouseupTouchend",
      value: function _handleRangeMouseupTouchend() {
        this._mousedown = false;
        this.$el.removeClass("active");
      }
      /**
       * Handle Range Blur, Mouseout and Touchleave
       */
    }, {
      key: "_handleRangeBlurMouseoutTouchleave",
      value: function _handleRangeBlurMouseoutTouchleave() {
        if (!this._mousedown) {
          var paddingLeft = parseInt(this.$el.css("padding-left"));
          var marginLeft = 7 + paddingLeft + "px";
          if ($2(this.thumb).hasClass("active")) {
            anim.remove(this.thumb);
            anim({
              targets: this.thumb,
              height: 0,
              width: 0,
              top: 10,
              easing: "easeOutQuad",
              marginLeft,
              duration: 100
            });
          }
          $2(this.thumb).removeClass("active");
        }
      }
      /**
       * Setup dropdown
       */
    }, {
      key: "_setupThumb",
      value: function _setupThumb() {
        this.thumb = document.createElement("span");
        this.value = document.createElement("span");
        $2(this.thumb).addClass("thumb");
        $2(this.value).addClass("value");
        $2(this.thumb).append(this.value);
        this.$el.after(this.thumb);
      }
      /**
       * Remove dropdown
       */
    }, {
      key: "_removeThumb",
      value: function _removeThumb() {
        $2(this.thumb).remove();
      }
      /**
       * morph thumb into bubble
       */
    }, {
      key: "_showRangeBubble",
      value: function _showRangeBubble() {
        var paddingLeft = parseInt($2(this.thumb).parent().css("padding-left"));
        var marginLeft = -7 + paddingLeft + "px";
        anim.remove(this.thumb);
        anim({
          targets: this.thumb,
          height: 30,
          width: 30,
          top: -30,
          marginLeft,
          duration: 300,
          easing: "easeOutQuint"
        });
      }
      /**
       * Calculate the offset of the thumb
       * @return {Number}  offset in pixels
       */
    }, {
      key: "_calcRangeOffset",
      value: function _calcRangeOffset() {
        var width = this.$el.width() - 15;
        var max = parseFloat(this.$el.attr("max")) || 100;
        var min = parseFloat(this.$el.attr("min")) || 0;
        var percent = (parseFloat(this.$el.val()) - min) / (max - min);
        return percent * width;
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Range2.__proto__ || Object.getPrototypeOf(Range2), "init", this).call(this, this, els, options);
      }
      /**
       * Get Instance
       */
    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Range;
      }
    }, {
      key: "defaults",
      get: function() {
        return _defaults;
      }
    }]);
    return Range2;
  }(Component);
  M.Range = Range;
  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Range, "range", "M_Range");
  }
  Range.init($2("input[type=range]"));
})(cash, M.anime);
