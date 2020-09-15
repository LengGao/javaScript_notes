/*! jQuery UI - v1.11.4 - 2015-10-29
 * http://jqueryui.com
 * Includes: core.js, widget.js, mouse.js, position.js, draggable.js, droppable.js, resizable.js, selectable.js, sortable.js, accordion.js, autocomplete.js, button.js, datepicker.js, dialog.js, menu.js, progressbar.js, selectmenu.js, slider.js, spinner.js, tabs.js, tooltip.js, effect.js, effect-blind.js, effect-bounce.js, effect-clip.js, effect-drop.js, effect-explode.js, effect-fade.js, effect-fold.js, effect-highlight.js, effect-puff.js, effect-pulsate.js, effect-scale.js, effect-shake.js, effect-size.js, effect-slide.js, effect-transfer.js
 * Copyright jQuery Foundation and other contributors; Licensed MIT */
(function(a) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], a)
    } else {
        a(jQuery)
    }
} (function(z) {
    /*!
     * jQuery UI Core 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/category/ui-core/
     */
    ;
    z.ui = z.ui || {};
    z.extend(z.ui, {
        version: "1.11.4",
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    });
    z.fn.extend({
        scrollParent: function(R) {
            var Q = this.css("position"),
            P = Q === "absolute",
            S = R ? /(auto|scroll|hidden)/: /(auto|scroll)/,
            T = this.parents().filter(function() {
                var U = z(this);
                if (P && U.css("position") === "static") {
                    return false
                }
                return S.test(U.css("overflow") + U.css("overflow-y") + U.css("overflow-x"))
            }).eq(0);
            return Q === "fixed" || !T.length ? z(this[0].ownerDocument || document) : T
        },
        uniqueId: (function() {
            var P = 0;
            return function() {
                return this.each(function() {
                    if (!this.id) {
                        this.id = "ui-id-" + (++P)
                    }
                })
            }
        })(),
        removeUniqueId: function() {
            return this.each(function() {
                if (/^ui-id-\d+$/.test(this.id)) {
                    z(this).removeAttr("id")
                }
            })
        }
    });
    function o(R, P) {
        var T, S, Q, U = R.nodeName.toLowerCase();
        if ("area" === U) {
            T = R.parentNode;
            S = T.name;
            if (!R.href || !S || T.nodeName.toLowerCase() !== "map") {
                return false
            }
            Q = z("img[usemap='#" + S + "']")[0];
            return !! Q && p(Q)
        }
        return (/^(input|select|textarea|button|object)$/.test(U) ? !R.disabled: "a" === U ? R.href || P: P) && p(R)
    }
    function p(P) {
        return z.expr.filters.visible(P) && !z(P).parents().addBack().filter(function() {
            return z.css(this, "visibility") === "hidden"
        }).length
    }
    z.extend(z.expr[":"], {
        data: z.expr.createPseudo ? z.expr.createPseudo(function(P) {
            return function(Q) {
                return !! z.data(Q, P)
            }
        }) : function(R, Q, P) {
            return !! z.data(R, P[3])
        },
        focusable: function(P) {
            return o(P, !isNaN(z.attr(P, "tabindex")))
        },
        tabbable: function(R) {
            var P = z.attr(R, "tabindex"),
            Q = isNaN(P);
            return (Q || P >= 0) && o(R, !Q)
        }
    });
    z.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());
    z.fn.extend({
        focus: (function(P) {
            return function(Q, R) {
                return typeof Q === "number" ? this.each(function() {
                    var S = this;
                    setTimeout(function() {
                        z(S).focus();
                        if (R) {
                            R.call(S)
                        }
                    },
                    Q)
                }) : P.apply(this, arguments)
            }
        })(z.fn.focus),
        disableSelection: (function() {
            var P = "onselectstart" in document.createElement("div") ? "selectstart": "mousedown";
            return function() {
                return this.bind(P + ".ui-disableSelection",
                function(Q) {
                    Q.preventDefault()
                })
            }
        })(),
        enableSelection: function() {
            return this.unbind(".ui-disableSelection")
        },
        zIndex: function(S) {
            if (S !== undefined) {
                return this.css("zIndex", S)
            }
            if (this.length) {
                var Q = z(this[0]),
                P,
                R;
                while (Q.length && Q[0] !== document) {
                    P = Q.css("position");
                    if (P === "absolute" || P === "relative" || P === "fixed") {
                        R = parseInt(Q.css("zIndex"), 10);
                        if (!isNaN(R) && R !== 0) {
                            return R
                        }
                    }
                    Q = Q.parent()
                }
            }
            return 0
        }
    });
    z.ui.plugin = {
        add: function(Q, R, T) {
            var P, S = z.ui[Q].prototype;
            for (P in T) {
                S.plugins[P] = S.plugins[P] || [];
                S.plugins[P].push([R, T[P]])
            }
        },
        call: function(P, S, R, Q) {
            var T, U = P.plugins[S];
            if (!U) {
                return
            }
            if (!Q && (!P.element[0].parentNode || P.element[0].parentNode.nodeType === 11)) {
                return
            }
            for (T = 0; T < U.length; T++) {
                if (P.options[U[T][0]]) {
                    U[T][1].apply(P.element, R)
                }
            }
        }
    };
    /*!
     * jQuery UI Widget 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/jQuery.widget/
     */
    ;
    var D = 0,
    g = Array.prototype.slice;
    z.cleanData = (function(P) {
        return function(Q) {
            var S, T, R;
            for (R = 0; (T = Q[R]) != null; R++) {
                try {
                    S = z._data(T, "events");
                    if (S && S.remove) {
                        z(T).triggerHandler("remove")
                    }
                } catch(U) {}
            }
            P(Q)
        }
    })(z.cleanData);
    z.widget = function(P, Q, X) {
        var U, V, S, W, R = {},
        T = P.split(".")[0];
        P = P.split(".")[1];
        U = T + "-" + P;
        if (!X) {
            X = Q;
            Q = z.Widget
        }
        z.expr[":"][U.toLowerCase()] = function(Y) {
            return !! z.data(Y, U)
        };
        z[T] = z[T] || {};
        V = z[T][P];
        S = z[T][P] = function(Y, Z) {
            if (!this._createWidget) {
                return new S(Y, Z)
            }
            if (arguments.length) {
                this._createWidget(Y, Z)
            }
        };
        z.extend(S, V, {
            version: X.version,
            _proto: z.extend({},
            X),
            _childConstructors: []
        });
        W = new Q();
        W.options = z.widget.extend({},
        W.options);
        z.each(X,
        function(Z, Y) {
            if (!z.isFunction(Y)) {
                R[Z] = Y;
                return
            }
            R[Z] = (function() {
                var aa = function() {
                    return Q.prototype[Z].apply(this, arguments)
                },
                ab = function(ac) {
                    return Q.prototype[Z].apply(this, ac)
                };
                return function() {
                    var ae = this._super,
                    ac = this._superApply,
                    ad;
                    this._super = aa;
                    this._superApply = ab;
                    ad = Y.apply(this, arguments);
                    this._super = ae;
                    this._superApply = ac;
                    return ad
                }
            })()
        });
        S.prototype = z.widget.extend(W, {
            widgetEventPrefix: V ? (W.widgetEventPrefix || P) : P
        },
        R, {
            constructor: S,
            namespace: T,
            widgetName: P,
            widgetFullName: U
        });
        if (V) {
            z.each(V._childConstructors,
            function(Z, aa) {
                var Y = aa.prototype;
                z.widget(Y.namespace + "." + Y.widgetName, S, aa._proto)
            });
            delete V._childConstructors
        } else {
            Q._childConstructors.push(S)
        }
        z.widget.bridge(P, S);
        return S
    };
    z.widget.extend = function(U) {
        var Q = g.call(arguments, 1),
        T = 0,
        P = Q.length,
        R,
        S;
        for (; T < P; T++) {
            for (R in Q[T]) {
                S = Q[T][R];
                if (Q[T].hasOwnProperty(R) && S !== undefined) {
                    if (z.isPlainObject(S)) {
                        U[R] = z.isPlainObject(U[R]) ? z.widget.extend({},
                        U[R], S) : z.widget.extend({},
                        S)
                    } else {
                        U[R] = S
                    }
                }
            }
        }
        return U
    };
    z.widget.bridge = function(Q, P) {
        var R = P.prototype.widgetFullName || Q;
        z.fn[Q] = function(U) {
            var S = typeof U === "string",
            T = g.call(arguments, 1),
            V = this;
            if (S) {
                this.each(function() {
                    var X, W = z.data(this, R);
                    if (U === "instance") {
                        V = W;
                        return false
                    }
                    if (!W) {
                        return z.error("cannot call methods on " + Q + " prior to initialization; attempted to call method '" + U + "'")
                    }
                    if (!z.isFunction(W[U]) || U.charAt(0) === "_") {
                        return z.error("no such method '" + U + "' for " + Q + " widget instance")
                    }
                    X = W[U].apply(W, T);
                    if (X !== W && X !== undefined) {
                        V = X && X.jquery ? V.pushStack(X.get()) : X;
                        return false
                    }
                })
            } else {
                if (T.length) {
                    U = z.widget.extend.apply(null, [U].concat(T))
                }
                this.each(function() {
                    var W = z.data(this, R);
                    if (W) {
                        W.option(U || {});
                        if (W._init) {
                            W._init()
                        }
                    } else {
                        z.data(this, R, new P(U, this))
                    }
                })
            }
            return V
        }
    };
    z.Widget = function() {};
    z.Widget._childConstructors = [];
    z.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            disabled: false,
            create: null
        },
        _createWidget: function(P, Q) {
            Q = z(Q || this.defaultElement || this)[0];
            this.element = z(Q);
            this.uuid = D++;
            this.eventNamespace = "." + this.widgetName + this.uuid;
            this.bindings = z();
            this.hoverable = z();
            this.focusable = z();
            if (Q !== this) {
                z.data(Q, this.widgetFullName, this);
                this._on(true, this.element, {
                    remove: function(R) {
                        if (R.target === Q) {
                            this.destroy()
                        }
                    }
                });
                this.document = z(Q.style ? Q.ownerDocument: Q.document || Q);
                this.window = z(this.document[0].defaultView || this.document[0].parentWindow)
            }
            this.options = z.widget.extend({},
            this.options, this._getCreateOptions(), P);
            this._create();
            this._trigger("create", null, this._getCreateEventData());
            this._init()
        },
        _getCreateOptions: z.noop,
        _getCreateEventData: z.noop,
        _create: z.noop,
        _init: z.noop,
        destroy: function() {
            this._destroy();
            this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(z.camelCase(this.widgetFullName));
            this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled");
            this.bindings.unbind(this.eventNamespace);
            this.hoverable.removeClass("ui-state-hover");
            this.focusable.removeClass("ui-state-focus")
        },
        _destroy: z.noop,
        widget: function() {
            return this.element
        },
        option: function(S, T) {
            var P = S,
            U, R, Q;
            if (arguments.length === 0) {
                return z.widget.extend({},
                this.options)
            }
            if (typeof S === "string") {
                P = {};
                U = S.split(".");
                S = U.shift();
                if (U.length) {
                    R = P[S] = z.widget.extend({},
                    this.options[S]);
                    for (Q = 0; Q < U.length - 1; Q++) {
                        R[U[Q]] = R[U[Q]] || {};
                        R = R[U[Q]]
                    }
                    S = U.pop();
                    if (arguments.length === 1) {
                        return R[S] === undefined ? null: R[S]
                    }
                    R[S] = T
                } else {
                    if (arguments.length === 1) {
                        return this.options[S] === undefined ? null: this.options[S]
                    }
                    P[S] = T
                }
            }
            this._setOptions(P);
            return this
        },
        _setOptions: function(P) {
            var Q;
            for (Q in P) {
                this._setOption(Q, P[Q])
            }
            return this
        },
        _setOption: function(P, Q) {
            this.options[P] = Q;
            if (P === "disabled") {
                this.widget().toggleClass(this.widgetFullName + "-disabled", !!Q);
                if (Q) {
                    this.hoverable.removeClass("ui-state-hover");
                    this.focusable.removeClass("ui-state-focus")
                }
            }
            return this
        },
        enable: function() {
            return this._setOptions({
                disabled: false
            })
        },
        disable: function() {
            return this._setOptions({
                disabled: true
            })
        },
        _on: function(S, R, Q) {
            var T, P = this;
            if (typeof S !== "boolean") {
                Q = R;
                R = S;
                S = false
            }
            if (!Q) {
                Q = R;
                R = this.element;
                T = this.widget()
            } else {
                R = T = z(R);
                this.bindings = this.bindings.add(R)
            }
            z.each(Q,
            function(Z, Y) {
                function W() {
                    if (!S && (P.options.disabled === true || z(this).hasClass("ui-state-disabled"))) {
                        return
                    }
                    return (typeof Y === "string" ? P[Y] : Y).apply(P, arguments)
                }
                if (typeof Y !== "string") {
                    W.guid = Y.guid = Y.guid || W.guid || z.guid++
                }
                var X = Z.match(/^([\w:-]*)\s*(.*)$/),
                V = X[1] + P.eventNamespace,
                U = X[2];
                if (U) {
                    T.delegate(U, V, W)
                } else {
                    R.bind(V, W)
                }
            })
        },
        _off: function(Q, P) {
            P = (P || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace;
            Q.unbind(P).undelegate(P);
            this.bindings = z(this.bindings.not(Q).get());
            this.focusable = z(this.focusable.not(Q).get());
            this.hoverable = z(this.hoverable.not(Q).get())
        },
        _delay: function(S, R) {
            function Q() {
                return (typeof S === "string" ? P[S] : S).apply(P, arguments)
            }
            var P = this;
            return setTimeout(Q, R || 0)
        },
        _hoverable: function(P) {
            this.hoverable = this.hoverable.add(P);
            this._on(P, {
                mouseenter: function(Q) {
                    z(Q.currentTarget).addClass("ui-state-hover")
                },
                mouseleave: function(Q) {
                    z(Q.currentTarget).removeClass("ui-state-hover")
                }
            })
        },
        _focusable: function(P) {
            this.focusable = this.focusable.add(P);
            this._on(P, {
                focusin: function(Q) {
                    z(Q.currentTarget).addClass("ui-state-focus")
                },
                focusout: function(Q) {
                    z(Q.currentTarget).removeClass("ui-state-focus")
                }
            })
        },
        _trigger: function(P, Q, R) {
            var U, T, S = this.options[P];
            R = R || {};
            Q = z.Event(Q);
            Q.type = (P === this.widgetEventPrefix ? P: this.widgetEventPrefix + P).toLowerCase();
            Q.target = this.element[0];
            T = Q.originalEvent;
            if (T) {
                for (U in T) {
                    if (! (U in Q)) {
                        Q[U] = T[U]
                    }
                }
            }
            this.element.trigger(Q, R);
            return ! (z.isFunction(S) && S.apply(this.element[0], [Q].concat(R)) === false || Q.isDefaultPrevented())
        }
    };
    z.each({
        show: "fadeIn",
        hide: "fadeOut"
    },
    function(Q, P) {
        z.Widget.prototype["_" + Q] = function(T, S, V) {
            if (typeof S === "string") {
                S = {
                    effect: S
                }
            }
            var U, R = !S ? Q: S === true || typeof S === "number" ? P: S.effect || P;
            S = S || {};
            if (typeof S === "number") {
                S = {
                    duration: S
                }
            }
            U = !z.isEmptyObject(S);
            S.complete = V;
            if (S.delay) {
                T.delay(S.delay)
            }
            if (U && z.effects && z.effects.effect[R]) {
                T[Q](S)
            } else {
                if (R !== Q && T[R]) {
                    T[R](S.duration, S.easing, V)
                } else {
                    T.queue(function(W) {
                        z(this)[Q]();
                        if (V) {
                            V.call(T[0])
                        }
                        W()
                    })
                }
            }
        }
    });
    var A = z.widget;
    /*!
     * jQuery UI Mouse 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/mouse/
     */
    ;
    var b = false;
    z(document).mouseup(function() {
        b = false
    });
    var x = z.widget("ui.mouse", {
        version: "1.11.4",
        options: {
            cancel: "input,textarea,button,select,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function() {
            var P = this;
            this.element.bind("mousedown." + this.widgetName,
            function(Q) {
                return P._mouseDown(Q)
            }).bind("click." + this.widgetName,
            function(Q) {
                if (true === z.data(Q.target, P.widgetName + ".preventClickEvent")) {
                    z.removeData(Q.target, P.widgetName + ".preventClickEvent");
                    Q.stopImmediatePropagation();
                    return false
                }
            });
            this.started = false
        },
        _mouseDestroy: function() {
            this.element.unbind("." + this.widgetName);
            if (this._mouseMoveDelegate) {
                this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
            }
        },
        _mouseDown: function(R) {
            if (b) {
                return
            }
            this._mouseMoved = false; (this._mouseStarted && this._mouseUp(R));
            this._mouseDownEvent = R;
            var Q = this,
            S = (R.which === 1),
            P = (typeof this.options.cancel === "string" && R.target.nodeName ? z(R.target).closest(this.options.cancel).length: false);
            if (!S || P || !this._mouseCapture(R)) {
                return true
            }
            this.mouseDelayMet = !this.options.delay;
            if (!this.mouseDelayMet) {
                this._mouseDelayTimer = setTimeout(function() {
                    Q.mouseDelayMet = true
                },
                this.options.delay)
            }
            if (this._mouseDistanceMet(R) && this._mouseDelayMet(R)) {
                this._mouseStarted = (this._mouseStart(R) !== false);
                if (!this._mouseStarted) {
                    R.preventDefault();
                    return true
                }
            }
            if (true === z.data(R.target, this.widgetName + ".preventClickEvent")) {
                z.removeData(R.target, this.widgetName + ".preventClickEvent")
            }
            this._mouseMoveDelegate = function(T) {
                return Q._mouseMove(T)
            };
            this._mouseUpDelegate = function(T) {
                return Q._mouseUp(T)
            };
            this.document.bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate);
            R.preventDefault();
            b = true;
            return true
        },
        _mouseMove: function(P) {
            if (this._mouseMoved) {
                if (z.ui.ie && (!document.documentMode || document.documentMode < 9) && !P.button) {
                    return this._mouseUp(P)
                } else {
                    if (!P.which) {
                        return this._mouseUp(P)
                    }
                }
            }
            if (P.which || P.button) {
                this._mouseMoved = true
            }
            if (this._mouseStarted) {
                this._mouseDrag(P);
                return P.preventDefault()
            }
            if (this._mouseDistanceMet(P) && this._mouseDelayMet(P)) {
                this._mouseStarted = (this._mouseStart(this._mouseDownEvent, P) !== false); (this._mouseStarted ? this._mouseDrag(P) : this._mouseUp(P))
            }
            return ! this._mouseStarted
        },
        _mouseUp: function(P) {
            this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
            if (this._mouseStarted) {
                this._mouseStarted = false;
                if (P.target === this._mouseDownEvent.target) {
                    z.data(P.target, this.widgetName + ".preventClickEvent", true)
                }
                this._mouseStop(P)
            }
            b = false;
            return false
        },
        _mouseDistanceMet: function(P) {
            return (Math.max(Math.abs(this._mouseDownEvent.pageX - P.pageX), Math.abs(this._mouseDownEvent.pageY - P.pageY)) >= this.options.distance)
        },
        _mouseDelayMet: function() {
            return this.mouseDelayMet
        },
        _mouseStart: function() {},
        _mouseDrag: function() {},
        _mouseStop: function() {},
        _mouseCapture: function() {
            return true
        }
    });
    /*!
     * jQuery UI Position 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/position/
     */
    (function() {
        z.ui = z.ui || {};
        var W, Z, X = Math.max,
        ac = Math.abs,
        aa = Math.round,
        R = /left|center|right/,
        U = /top|center|bottom/,
        P = /[\+\-]\d+(\.[\d]+)?%?/,
        Y = /^\w+/,
        Q = /%$/,
        T = z.fn.position;
        function ab(af, ae, ad) {
            return [parseFloat(af[0]) * (Q.test(af[0]) ? ae / 100 : 1), parseFloat(af[1]) * (Q.test(af[1]) ? ad / 100 : 1)]
        }
        function V(ad, ae) {
            return parseInt(z.css(ad, ae), 10) || 0
        }
        function S(ae) {
            var ad = ae[0];
            if (ad.nodeType === 9) {
                return {
                    width: ae.width(),
                    height: ae.height(),
                    offset: {
                        top: 0,
                        left: 0
                    }
                }
            }
            if (z.isWindow(ad)) {
                return {
                    width: ae.width(),
                    height: ae.height(),
                    offset: {
                        top: ae.scrollTop(),
                        left: ae.scrollLeft()
                    }
                }
            }
            if (ad.preventDefault) {
                return {
                    width: 0,
                    height: 0,
                    offset: {
                        top: ad.pageY,
                        left: ad.pageX
                    }
                }
            }
            return {
                width: ae.outerWidth(),
                height: ae.outerHeight(),
                offset: ae.offset()
            }
        }
        z.position = {
            scrollbarWidth: function() {
                if (W !== undefined) {
                    return W
                }
                var ae, ad, ag = z("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
                af = ag.children()[0];
                z("body").append(ag);
                ae = af.offsetWidth;
                ag.css("overflow", "scroll");
                ad = af.offsetWidth;
                if (ae === ad) {
                    ad = ag[0].clientWidth
                }
                ag.remove();
                return (W = ae - ad)
            },
            getScrollInfo: function(ah) {
                var ag = ah.isWindow || ah.isDocument ? "": ah.element.css("overflow-x"),
                af = ah.isWindow || ah.isDocument ? "": ah.element.css("overflow-y"),
                ae = ag === "scroll" || (ag === "auto" && ah.width < ah.element[0].scrollWidth),
                ad = af === "scroll" || (af === "auto" && ah.height < ah.element[0].scrollHeight);
                return {
                    width: ad ? z.position.scrollbarWidth() : 0,
                    height: ae ? z.position.scrollbarWidth() : 0
                }
            },
            getWithinInfo: function(ae) {
                var af = z(ae || window),
                ad = z.isWindow(af[0]),
                ag = !!af[0] && af[0].nodeType === 9;
                return {
                    element: af,
                    isWindow: ad,
                    isDocument: ag,
                    offset: af.offset() || {
                        left: 0,
                        top: 0
                    },
                    scrollLeft: af.scrollLeft(),
                    scrollTop: af.scrollTop(),
                    width: ad || ag ? af.width() : af.outerWidth(),
                    height: ad || ag ? af.height() : af.outerHeight()
                }
            }
        };
        z.fn.position = function(an) {
            if (!an || !an.of) {
                return T.apply(this, arguments)
            }
            an = z.extend({},
            an);
            var ao, ak, ai, am, ah, ad, aj = z(an.of),
            ag = z.position.getWithinInfo(an.within),
            ae = z.position.getScrollInfo(ag),
            al = (an.collision || "flip").split(" "),
            af = {};
            ad = S(aj);
            if (aj[0].preventDefault) {
                an.at = "left top"
            }
            ak = ad.width;
            ai = ad.height;
            am = ad.offset;
            ah = z.extend({},
            am);
            z.each(["my", "at"],
            function() {
                var ar = (an[this] || "").split(" "),
                aq,
                ap;
                if (ar.length === 1) {
                    ar = R.test(ar[0]) ? ar.concat(["center"]) : U.test(ar[0]) ? ["center"].concat(ar) : ["center", "center"]
                }
                ar[0] = R.test(ar[0]) ? ar[0] : "center";
                ar[1] = U.test(ar[1]) ? ar[1] : "center";
                aq = P.exec(ar[0]);
                ap = P.exec(ar[1]);
                af[this] = [aq ? aq[0] : 0, ap ? ap[0] : 0];
                an[this] = [Y.exec(ar[0])[0], Y.exec(ar[1])[0]]
            });
            if (al.length === 1) {
                al[1] = al[0]
            }
            if (an.at[0] === "right") {
                ah.left += ak
            } else {
                if (an.at[0] === "center") {
                    ah.left += ak / 2
                }
            }
            if (an.at[1] === "bottom") {
                ah.top += ai
            } else {
                if (an.at[1] === "center") {
                    ah.top += ai / 2
                }
            }
            ao = ab(af.at, ak, ai);
            ah.left += ao[0];
            ah.top += ao[1];
            return this.each(function() {
                var aq, aA, at = z(this),
                av = at.outerWidth(),
                ar = at.outerHeight(),
                au = V(this, "marginLeft"),
                ap = V(this, "marginTop"),
                az = av + au + V(this, "marginRight") + ae.width,
                ay = ar + ap + V(this, "marginBottom") + ae.height,
                aw = z.extend({},
                ah),
                ax = ab(af.my, at.outerWidth(), at.outerHeight());
                if (an.my[0] === "right") {
                    aw.left -= av
                } else {
                    if (an.my[0] === "center") {
                        aw.left -= av / 2
                    }
                }
                if (an.my[1] === "bottom") {
                    aw.top -= ar
                } else {
                    if (an.my[1] === "center") {
                        aw.top -= ar / 2
                    }
                }
                aw.left += ax[0];
                aw.top += ax[1];
                if (!Z) {
                    aw.left = aa(aw.left);
                    aw.top = aa(aw.top)
                }
                aq = {
                    marginLeft: au,
                    marginTop: ap
                };
                z.each(["left", "top"],
                function(aC, aB) {
                    if (z.ui.position[al[aC]]) {
                        z.ui.position[al[aC]][aB](aw, {
                            targetWidth: ak,
                            targetHeight: ai,
                            elemWidth: av,
                            elemHeight: ar,
                            collisionPosition: aq,
                            collisionWidth: az,
                            collisionHeight: ay,
                            offset: [ao[0] + ax[0], ao[1] + ax[1]],
                            my: an.my,
                            at: an.at,
                            within: ag,
                            elem: at
                        })
                    }
                });
                if (an.using) {
                    aA = function(aE) {
                        var aG = am.left - aw.left,
                        aD = aG + ak - av,
                        aF = am.top - aw.top,
                        aC = aF + ai - ar,
                        aB = {
                            target: {
                                element: aj,
                                left: am.left,
                                top: am.top,
                                width: ak,
                                height: ai
                            },
                            element: {
                                element: at,
                                left: aw.left,
                                top: aw.top,
                                width: av,
                                height: ar
                            },
                            horizontal: aD < 0 ? "left": aG > 0 ? "right": "center",
                            vertical: aC < 0 ? "top": aF > 0 ? "bottom": "middle"
                        };
                        if (ak < av && ac(aG + aD) < ak) {
                            aB.horizontal = "center"
                        }
                        if (ai < ar && ac(aF + aC) < ai) {
                            aB.vertical = "middle"
                        }
                        if (X(ac(aG), ac(aD)) > X(ac(aF), ac(aC))) {
                            aB.important = "horizontal"
                        } else {
                            aB.important = "vertical"
                        }
                        an.using.call(this, aE, aB)
                    }
                }
                at.offset(z.extend(aw, {
                    using: aA
                }))
            })
        };
        z.ui.position = {
            fit: {
                left: function(ah, ag) {
                    var af = ag.within,
                    aj = af.isWindow ? af.scrollLeft: af.offset.left,
                    al = af.width,
                    ai = ah.left - ag.collisionPosition.marginLeft,
                    ak = aj - ai,
                    ae = ai + ag.collisionWidth - al - aj,
                    ad;
                    if (ag.collisionWidth > al) {
                        if (ak > 0 && ae <= 0) {
                            ad = ah.left + ak + ag.collisionWidth - al - aj;
                            ah.left += ak - ad
                        } else {
                            if (ae > 0 && ak <= 0) {
                                ah.left = aj
                            } else {
                                if (ak > ae) {
                                    ah.left = aj + al - ag.collisionWidth
                                } else {
                                    ah.left = aj
                                }
                            }
                        }
                    } else {
                        if (ak > 0) {
                            ah.left += ak
                        } else {
                            if (ae > 0) {
                                ah.left -= ae
                            } else {
                                ah.left = X(ah.left - ai, ah.left)
                            }
                        }
                    }
                },
                top: function(ag, af) {
                    var ae = af.within,
                    ak = ae.isWindow ? ae.scrollTop: ae.offset.top,
                    al = af.within.height,
                    ai = ag.top - af.collisionPosition.marginTop,
                    aj = ak - ai,
                    ah = ai + af.collisionHeight - al - ak,
                    ad;
                    if (af.collisionHeight > al) {
                        if (aj > 0 && ah <= 0) {
                            ad = ag.top + aj + af.collisionHeight - al - ak;
                            ag.top += aj - ad
                        } else {
                            if (ah > 0 && aj <= 0) {
                                ag.top = ak
                            } else {
                                if (aj > ah) {
                                    ag.top = ak + al - af.collisionHeight
                                } else {
                                    ag.top = ak
                                }
                            }
                        }
                    } else {
                        if (aj > 0) {
                            ag.top += aj
                        } else {
                            if (ah > 0) {
                                ag.top -= ah
                            } else {
                                ag.top = X(ag.top - ai, ag.top)
                            }
                        }
                    }
                }
            },
            flip: {
                left: function(aj, ai) {
                    var ah = ai.within,
                    an = ah.offset.left + ah.scrollLeft,
                    aq = ah.width,
                    af = ah.isWindow ? ah.scrollLeft: ah.offset.left,
                    ak = aj.left - ai.collisionPosition.marginLeft,
                    ao = ak - af,
                    ae = ak + ai.collisionWidth - aq - af,
                    am = ai.my[0] === "left" ? -ai.elemWidth: ai.my[0] === "right" ? ai.elemWidth: 0,
                    ap = ai.at[0] === "left" ? ai.targetWidth: ai.at[0] === "right" ? -ai.targetWidth: 0,
                    ag = -2 * ai.offset[0],
                    ad,
                    al;
                    if (ao < 0) {
                        ad = aj.left + am + ap + ag + ai.collisionWidth - aq - an;
                        if (ad < 0 || ad < ac(ao)) {
                            aj.left += am + ap + ag
                        }
                    } else {
                        if (ae > 0) {
                            al = aj.left - ai.collisionPosition.marginLeft + am + ap + ag - af;
                            if (al > 0 || ac(al) < ae) {
                                aj.left += am + ap + ag
                            }
                        }
                    }
                },
                top: function(ai, ah) {
                    var ag = ah.within,
                    ap = ag.offset.top + ag.scrollTop,
                    aq = ag.height,
                    ad = ag.isWindow ? ag.scrollTop: ag.offset.top,
                    ak = ai.top - ah.collisionPosition.marginTop,
                    am = ak - ad,
                    aj = ak + ah.collisionHeight - aq - ad,
                    an = ah.my[1] === "top",
                    al = an ? -ah.elemHeight: ah.my[1] === "bottom" ? ah.elemHeight: 0,
                    ar = ah.at[1] === "top" ? ah.targetHeight: ah.at[1] === "bottom" ? -ah.targetHeight: 0,
                    af = -2 * ah.offset[1],
                    ao,
                    ae;
                    if (am < 0) {
                        ae = ai.top + al + ar + af + ah.collisionHeight - aq - ap;
                        if (ae < 0 || ae < ac(am)) {
                            ai.top += al + ar + af
                        }
                    } else {
                        if (aj > 0) {
                            ao = ai.top - ah.collisionPosition.marginTop + al + ar + af - ad;
                            if (ao > 0 || ac(ao) < aj) {
                                ai.top += al + ar + af
                            }
                        }
                    }
                }
            },
            flipfit: {
                left: function() {
                    z.ui.position.flip.left.apply(this, arguments);
                    z.ui.position.fit.left.apply(this, arguments)
                },
                top: function() {
                    z.ui.position.flip.top.apply(this, arguments);
                    z.ui.position.fit.top.apply(this, arguments)
                }
            }
        }; (function() {
            var ah, aj, ae, ag, af, ad = document.getElementsByTagName("body")[0],
            ai = document.createElement("div");
            ah = document.createElement(ad ? "div": "body");
            ae = {
                visibility: "hidden",
                width: 0,
                height: 0,
                border: 0,
                margin: 0,
                background: "none"
            };
            if (ad) {
                z.extend(ae, {
                    position: "absolute",
                    left: "-1000px",
                    top: "-1000px"
                })
            }
            for (af in ae) {
                ah.style[af] = ae[af]
            }
            ah.appendChild(ai);
            aj = ad || document.documentElement;
            aj.insertBefore(ah, aj.firstChild);
            ai.style.cssText = "position: absolute; left: 10.7432222px;";
            ag = z(ai).offset().left;
            Z = ag > 10 && ag < 11;
            ah.innerHTML = "";
            aj.removeChild(ah)
        })()
    })();
    var E = z.ui.position;
    /*!
     * jQuery UI Draggable 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/draggable/
     */
    ;
    z.widget("ui.draggable", z.ui.mouse, {
        version: "1.11.4",
        widgetEventPrefix: "drag",
        options: {
            addClasses: true,
            appendTo: "parent",
            axis: false,
            connectToSortable: false,
            containment: false,
            cursor: "auto",
            cursorAt: false,
            grid: false,
            handle: false,
            helper: "original",
            iframeFix: false,
            opacity: false,
            refreshPositions: false,
            revert: false,
            revertDuration: 500,
            scope: "default",
            scroll: true,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: false,
            snapMode: "both",
            snapTolerance: 20,
            stack: false,
            zIndex: false,
            drag: null,
            start: null,
            stop: null
        },
        _create: function() {
            if (this.options.helper === "original") {
                this._setPositionRelative()
            }
            if (this.options.addClasses) {
                this.element.addClass("ui-draggable")
            }
            if (this.options.disabled) {
                this.element.addClass("ui-draggable-disabled")
            }
            this._setHandleClassName();
            this._mouseInit()
        },
        _setOption: function(P, Q) {
            this._super(P, Q);
            if (P === "handle") {
                this._removeHandleClassName();
                this._setHandleClassName()
            }
        },
        _destroy: function() {
            if ((this.helper || this.element).is(".ui-draggable-dragging")) {
                this.destroyOnClear = true;
                return
            }
            this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");
            this._removeHandleClassName();
            this._mouseDestroy()
        },
        _mouseCapture: function(P) {
            var Q = this.options;
            this._blurActiveElement(P);
            if (this.helper || Q.disabled || z(P.target).closest(".ui-resizable-handle").length > 0) {
                return false
            }
            this.handle = this._getHandle(P);
            if (!this.handle) {
                return false
            }
            this._blockFrames(Q.iframeFix === true ? "iframe": Q.iframeFix);
            return true
        },
        _blockFrames: function(P) {
            this.iframeBlocks = this.document.find(P).map(function() {
                var Q = z(this);
                return z("<div>").css("position", "absolute").appendTo(Q.parent()).outerWidth(Q.outerWidth()).outerHeight(Q.outerHeight()).offset(Q.offset())[0]
            })
        },
        _unblockFrames: function() {
            if (this.iframeBlocks) {
                this.iframeBlocks.remove();
                delete this.iframeBlocks
            }
        },
        _blurActiveElement: function(R) {
            var P = this.document[0];
            if (!this.handleElement.is(R.target)) {
                return
            }
            try {
                if (P.activeElement && P.activeElement.nodeName.toLowerCase() !== "body") {
                    z(P.activeElement).blur()
                }
            } catch(Q) {}
        },
        _mouseStart: function(P) {
            var Q = this.options;
            this.helper = this._createHelper(P);
            this.helper.addClass("ui-draggable-dragging");
            this._cacheHelperProportions();
            if (z.ui.ddmanager) {
                z.ui.ddmanager.current = this
            }
            this._cacheMargins();
            this.cssPosition = this.helper.css("position");
            this.scrollParent = this.helper.scrollParent(true);
            this.offsetParent = this.helper.offsetParent();
            this.hasFixedAncestor = this.helper.parents().filter(function() {
                return z(this).css("position") === "fixed"
            }).length > 0;
            this.positionAbs = this.element.offset();
            this._refreshOffsets(P);
            this.originalPosition = this.position = this._generatePosition(P, false);
            this.originalPageX = P.pageX;
            this.originalPageY = P.pageY; (Q.cursorAt && this._adjustOffsetFromHelper(Q.cursorAt));
            this._setContainment();
            if (this._trigger("start", P) === false) {
                this._clear();
                return false
            }
            this._cacheHelperProportions();
            if (z.ui.ddmanager && !Q.dropBehaviour) {
                z.ui.ddmanager.prepareOffsets(this, P)
            }
            this._normalizeRightBottom();
            this._mouseDrag(P, true);
            if (z.ui.ddmanager) {
                z.ui.ddmanager.dragStart(this, P)
            }
            return true
        },
        _refreshOffsets: function(P) {
            this.offset = {
                top: this.positionAbs.top - this.margins.top,
                left: this.positionAbs.left - this.margins.left,
                scroll: false,
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            };
            this.offset.click = {
                left: P.pageX - this.offset.left,
                top: P.pageY - this.offset.top
            }
        },
        _mouseDrag: function(P, R) {
            if (this.hasFixedAncestor) {
                this.offset.parent = this._getParentOffset()
            }
            this.position = this._generatePosition(P, true);
            this.positionAbs = this._convertPositionTo("absolute");
            if (!R) {
                var Q = this._uiHash();
                if (this._trigger("drag", P, Q) === false) {
                    this._mouseUp({});
                    return false
                }
                this.position = Q.position
            }
            this.helper[0].style.left = this.position.left + "px";
            this.helper[0].style.top = this.position.top + "px";
            if (z.ui.ddmanager) {
                z.ui.ddmanager.drag(this, P)
            }
            return false
        },
        _mouseStop: function(Q) {
            var P = this,
            R = false;
            if (z.ui.ddmanager && !this.options.dropBehaviour) {
                R = z.ui.ddmanager.drop(this, Q)
            }
            if (this.dropped) {
                R = this.dropped;
                this.dropped = false
            }
            if ((this.options.revert === "invalid" && !R) || (this.options.revert === "valid" && R) || this.options.revert === true || (z.isFunction(this.options.revert) && this.options.revert.call(this.element, R))) {
                z(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10),
                function() {
                    if (P._trigger("stop", Q) !== false) {
                        P._clear()
                    }
                })
            } else {
                if (this._trigger("stop", Q) !== false) {
                    this._clear()
                }
            }
            return false
        },
        _mouseUp: function(P) {
            this._unblockFrames();
            if (z.ui.ddmanager) {
                z.ui.ddmanager.dragStop(this, P)
            }
            if (this.handleElement.is(P.target)) {
                this.element.focus()
            }
            return z.ui.mouse.prototype._mouseUp.call(this, P)
        },
        cancel: function() {
            if (this.helper.is(".ui-draggable-dragging")) {
                this._mouseUp({})
            } else {
                this._clear()
            }
            return this
        },
        _getHandle: function(P) {
            return this.options.handle ? !!z(P.target).closest(this.element.find(this.options.handle)).length: true
        },
        _setHandleClassName: function() {
            this.handleElement = this.options.handle ? this.element.find(this.options.handle) : this.element;
            this.handleElement.addClass("ui-draggable-handle")
        },
        _removeHandleClassName: function() {
            this.handleElement.removeClass("ui-draggable-handle")
        },
        _createHelper: function(Q) {
            var S = this.options,
            R = z.isFunction(S.helper),
            P = R ? z(S.helper.apply(this.element[0], [Q])) : (S.helper === "clone" ? this.element.clone().removeAttr("id") : this.element);
            if (!P.parents("body").length) {
                P.appendTo((S.appendTo === "parent" ? this.element[0].parentNode: S.appendTo))
            }
            if (R && P[0] === this.element[0]) {
                this._setPositionRelative()
            }
            if (P[0] !== this.element[0] && !(/(fixed|absolute)/).test(P.css("position"))) {
                P.css("position", "absolute")
            }
            return P
        },
        _setPositionRelative: function() {
            if (! (/^(?:r|a|f)/).test(this.element.css("position"))) {
                this.element[0].style.position = "relative"
            }
        },
        _adjustOffsetFromHelper: function(P) {
            if (typeof P === "string") {
                P = P.split(" ")
            }
            if (z.isArray(P)) {
                P = {
                    left: +P[0],
                    top: +P[1] || 0
                }
            }
            if ("left" in P) {
                this.offset.click.left = P.left + this.margins.left
            }
            if ("right" in P) {
                this.offset.click.left = this.helperProportions.width - P.right + this.margins.left
            }
            if ("top" in P) {
                this.offset.click.top = P.top + this.margins.top
            }
            if ("bottom" in P) {
                this.offset.click.top = this.helperProportions.height - P.bottom + this.margins.top
            }
        },
        _isRootNode: function(P) {
            return (/(html|body)/i).test(P.tagName) || P === this.document[0]
        },
        _getParentOffset: function() {
            var Q = this.offsetParent.offset(),
            P = this.document[0];
            if (this.cssPosition === "absolute" && this.scrollParent[0] !== P && z.contains(this.scrollParent[0], this.offsetParent[0])) {
                Q.left += this.scrollParent.scrollLeft();
                Q.top += this.scrollParent.scrollTop()
            }
            if (this._isRootNode(this.offsetParent[0])) {
                Q = {
                    top: 0,
                    left: 0
                }
            }
            return {
                top: Q.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: Q.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function() {
            if (this.cssPosition !== "relative") {
                return {
                    top: 0,
                    left: 0
                }
            }
            var P = this.element.position(),
            Q = this._isRootNode(this.scrollParent[0]);
            return {
                top: P.top - (parseInt(this.helper.css("top"), 10) || 0) + (!Q ? this.scrollParent.scrollTop() : 0),
                left: P.left - (parseInt(this.helper.css("left"), 10) || 0) + (!Q ? this.scrollParent.scrollLeft() : 0)
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: (parseInt(this.element.css("marginLeft"), 10) || 0),
                top: (parseInt(this.element.css("marginTop"), 10) || 0),
                right: (parseInt(this.element.css("marginRight"), 10) || 0),
                bottom: (parseInt(this.element.css("marginBottom"), 10) || 0)
            }
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function() {
            var Q, T, R, S = this.options,
            P = this.document[0];
            this.relativeContainer = null;
            if (!S.containment) {
                this.containment = null;
                return
            }
            if (S.containment === "window") {
                this.containment = [z(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, z(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, z(window).scrollLeft() + z(window).width() - this.helperProportions.width - this.margins.left, z(window).scrollTop() + (z(window).height() || P.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
                return
            }
            if (S.containment === "document") {
                this.containment = [0, 0, z(P).width() - this.helperProportions.width - this.margins.left, (z(P).height() || P.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
                return
            }
            if (S.containment.constructor === Array) {
                this.containment = S.containment;
                return
            }
            if (S.containment === "parent") {
                S.containment = this.helper[0].parentNode
            }
            T = z(S.containment);
            R = T[0];
            if (!R) {
                return
            }
            Q = /(scroll|auto)/.test(T.css("overflow"));
            this.containment = [(parseInt(T.css("borderLeftWidth"), 10) || 0) + (parseInt(T.css("paddingLeft"), 10) || 0), (parseInt(T.css("borderTopWidth"), 10) || 0) + (parseInt(T.css("paddingTop"), 10) || 0), (Q ? Math.max(R.scrollWidth, R.offsetWidth) : R.offsetWidth) - (parseInt(T.css("borderRightWidth"), 10) || 0) - (parseInt(T.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (Q ? Math.max(R.scrollHeight, R.offsetHeight) : R.offsetHeight) - (parseInt(T.css("borderBottomWidth"), 10) || 0) - (parseInt(T.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom];
            this.relativeContainer = T
        },
        _convertPositionTo: function(Q, S) {
            if (!S) {
                S = this.position
            }
            var P = Q === "absolute" ? 1 : -1,
            R = this._isRootNode(this.scrollParent[0]);
            return {
                top: (S.top + this.offset.relative.top * P + this.offset.parent.top * P - ((this.cssPosition === "fixed" ? -this.offset.scroll.top: (R ? 0 : this.offset.scroll.top)) * P)),
                left: (S.left + this.offset.relative.left * P + this.offset.parent.left * P - ((this.cssPosition === "fixed" ? -this.offset.scroll.left: (R ? 0 : this.offset.scroll.left)) * P))
            }
        },
        _generatePosition: function(Q, W) {
            var P, X, Y, S, R = this.options,
            V = this._isRootNode(this.scrollParent[0]),
            U = Q.pageX,
            T = Q.pageY;
            if (!V || !this.offset.scroll) {
                this.offset.scroll = {
                    top: this.scrollParent.scrollTop(),
                    left: this.scrollParent.scrollLeft()
                }
            }
            if (W) {
                if (this.containment) {
                    if (this.relativeContainer) {
                        X = this.relativeContainer.offset();
                        P = [this.containment[0] + X.left, this.containment[1] + X.top, this.containment[2] + X.left, this.containment[3] + X.top]
                    } else {
                        P = this.containment
                    }
                    if (Q.pageX - this.offset.click.left < P[0]) {
                        U = P[0] + this.offset.click.left
                    }
                    if (Q.pageY - this.offset.click.top < P[1]) {
                        T = P[1] + this.offset.click.top
                    }
                    if (Q.pageX - this.offset.click.left > P[2]) {
                        U = P[2] + this.offset.click.left
                    }
                    if (Q.pageY - this.offset.click.top > P[3]) {
                        T = P[3] + this.offset.click.top
                    }
                }
                if (R.grid) {
                    Y = R.grid[1] ? this.originalPageY + Math.round((T - this.originalPageY) / R.grid[1]) * R.grid[1] : this.originalPageY;
                    T = P ? ((Y - this.offset.click.top >= P[1] || Y - this.offset.click.top > P[3]) ? Y: ((Y - this.offset.click.top >= P[1]) ? Y - R.grid[1] : Y + R.grid[1])) : Y;
                    S = R.grid[0] ? this.originalPageX + Math.round((U - this.originalPageX) / R.grid[0]) * R.grid[0] : this.originalPageX;
                    U = P ? ((S - this.offset.click.left >= P[0] || S - this.offset.click.left > P[2]) ? S: ((S - this.offset.click.left >= P[0]) ? S - R.grid[0] : S + R.grid[0])) : S
                }
                if (R.axis === "y") {
                    U = this.originalPageX
                }
                if (R.axis === "x") {
                    T = this.originalPageY
                }
            }
            return {
                top: (T - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (this.cssPosition === "fixed" ? -this.offset.scroll.top: (V ? 0 : this.offset.scroll.top))),
                left: (U - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (this.cssPosition === "fixed" ? -this.offset.scroll.left: (V ? 0 : this.offset.scroll.left)))
            }
        },
        _clear: function() {
            this.helper.removeClass("ui-draggable-dragging");
            if (this.helper[0] !== this.element[0] && !this.cancelHelperRemoval) {
                this.helper.remove()
            }
            this.helper = null;
            this.cancelHelperRemoval = false;
            if (this.destroyOnClear) {
                this.destroy()
            }
        },
        _normalizeRightBottom: function() {
            if (this.options.axis !== "y" && this.helper.css("right") !== "auto") {
                this.helper.width(this.helper.width());
                this.helper.css("right", "auto")
            }
            if (this.options.axis !== "x" && this.helper.css("bottom") !== "auto") {
                this.helper.height(this.helper.height());
                this.helper.css("bottom", "auto")
            }
        },
        _trigger: function(P, Q, R) {
            R = R || this._uiHash();
            z.ui.plugin.call(this, P, [Q, R, this], true);
            if (/^(drag|start|stop)/.test(P)) {
                this.positionAbs = this._convertPositionTo("absolute");
                R.offset = this.positionAbs
            }
            return z.Widget.prototype._trigger.call(this, P, Q, R)
        },
        plugins: {},
        _uiHash: function() {
            return {
                helper: this.helper,
                position: this.position,
                originalPosition: this.originalPosition,
                offset: this.positionAbs
            }
        }
    });
    z.ui.plugin.add("draggable", "connectToSortable", {
        start: function(R, S, P) {
            var Q = z.extend({},
            S, {
                item: P.element
            });
            P.sortables = [];
            z(P.options.connectToSortable).each(function() {
                var T = z(this).sortable("instance");
                if (T && !T.options.disabled) {
                    P.sortables.push(T);
                    T.refreshPositions();
                    T._trigger("activate", R, Q)
                }
            })
        },
        stop: function(R, S, P) {
            var Q = z.extend({},
            S, {
                item: P.element
            });
            P.cancelHelperRemoval = false;
            z.each(P.sortables,
            function() {
                var T = this;
                if (T.isOver) {
                    T.isOver = 0;
                    P.cancelHelperRemoval = true;
                    T.cancelHelperRemoval = false;
                    T._storedCSS = {
                        position: T.placeholder.css("position"),
                        top: T.placeholder.css("top"),
                        left: T.placeholder.css("left")
                    };
                    T._mouseStop(R);
                    T.options.helper = T.options._helper
                } else {
                    T.cancelHelperRemoval = true;
                    T._trigger("deactivate", R, Q)
                }
            })
        },
        drag: function(Q, R, P) {
            z.each(P.sortables,
            function() {
                var S = false,
                T = this;
                T.positionAbs = P.positionAbs;
                T.helperProportions = P.helperProportions;
                T.offset.click = P.offset.click;
                if (T._intersectsWith(T.containerCache)) {
                    S = true;
                    z.each(P.sortables,
                    function() {
                        this.positionAbs = P.positionAbs;
                        this.helperProportions = P.helperProportions;
                        this.offset.click = P.offset.click;
                        if (this !== T && this._intersectsWith(this.containerCache) && z.contains(T.element[0], this.element[0])) {
                            S = false
                        }
                        return S
                    })
                }
                if (S) {
                    if (!T.isOver) {
                        T.isOver = 1;
                        P._parent = R.helper.parent();
                        T.currentItem = R.helper.appendTo(T.element).data("ui-sortable-item", true);
                        T.options._helper = T.options.helper;
                        T.options.helper = function() {
                            return R.helper[0]
                        };
                        Q.target = T.currentItem[0];
                        T._mouseCapture(Q, true);
                        T._mouseStart(Q, true, true);
                        T.offset.click.top = P.offset.click.top;
                        T.offset.click.left = P.offset.click.left;
                        T.offset.parent.left -= P.offset.parent.left - T.offset.parent.left;
                        T.offset.parent.top -= P.offset.parent.top - T.offset.parent.top;
                        P._trigger("toSortable", Q);
                        P.dropped = T.element;
                        z.each(P.sortables,
                        function() {
                            this.refreshPositions()
                        });
                        P.currentItem = P.element;
                        T.fromOutside = P
                    }
                    if (T.currentItem) {
                        T._mouseDrag(Q);
                        R.position = T.position
                    }
                } else {
                    if (T.isOver) {
                        T.isOver = 0;
                        T.cancelHelperRemoval = true;
                        T.options._revert = T.options.revert;
                        T.options.revert = false;
                        T._trigger("out", Q, T._uiHash(T));
                        T._mouseStop(Q, true);
                        T.options.revert = T.options._revert;
                        T.options.helper = T.options._helper;
                        if (T.placeholder) {
                            T.placeholder.remove()
                        }
                        R.helper.appendTo(P._parent);
                        P._refreshOffsets(Q);
                        R.position = P._generatePosition(Q, true);
                        P._trigger("fromSortable", Q);
                        P.dropped = false;
                        z.each(P.sortables,
                        function() {
                            this.refreshPositions()
                        })
                    }
                }
            })
        }
    });
    z.ui.plugin.add("draggable", "cursor", {
        start: function(R, S, P) {
            var Q = z("body"),
            T = P.options;
            if (Q.css("cursor")) {
                T._cursor = Q.css("cursor")
            }
            Q.css("cursor", T.cursor)
        },
        stop: function(Q, R, P) {
            var S = P.options;
            if (S._cursor) {
                z("body").css("cursor", S._cursor)
            }
        }
    });
    z.ui.plugin.add("draggable", "opacity", {
        start: function(R, S, P) {
            var Q = z(S.helper),
            T = P.options;
            if (Q.css("opacity")) {
                T._opacity = Q.css("opacity")
            }
            Q.css("opacity", T.opacity)
        },
        stop: function(Q, R, P) {
            var S = P.options;
            if (S._opacity) {
                z(R.helper).css("opacity", S._opacity)
            }
        }
    });
    z.ui.plugin.add("draggable", "scroll", {
        start: function(Q, R, P) {
            if (!P.scrollParentNotHidden) {
                P.scrollParentNotHidden = P.helper.scrollParent(false)
            }
            if (P.scrollParentNotHidden[0] !== P.document[0] && P.scrollParentNotHidden[0].tagName !== "HTML") {
                P.overflowOffset = P.scrollParentNotHidden.offset()
            }
        },
        drag: function(S, T, R) {
            var U = R.options,
            Q = false,
            V = R.scrollParentNotHidden[0],
            P = R.document[0];
            if (V !== P && V.tagName !== "HTML") {
                if (!U.axis || U.axis !== "x") {
                    if ((R.overflowOffset.top + V.offsetHeight) - S.pageY < U.scrollSensitivity) {
                        V.scrollTop = Q = V.scrollTop + U.scrollSpeed
                    } else {
                        if (S.pageY - R.overflowOffset.top < U.scrollSensitivity) {
                            V.scrollTop = Q = V.scrollTop - U.scrollSpeed
                        }
                    }
                }
                if (!U.axis || U.axis !== "y") {
                    if ((R.overflowOffset.left + V.offsetWidth) - S.pageX < U.scrollSensitivity) {
                        V.scrollLeft = Q = V.scrollLeft + U.scrollSpeed
                    } else {
                        if (S.pageX - R.overflowOffset.left < U.scrollSensitivity) {
                            V.scrollLeft = Q = V.scrollLeft - U.scrollSpeed
                        }
                    }
                }
            } else {
                if (!U.axis || U.axis !== "x") {
                    if (S.pageY - z(P).scrollTop() < U.scrollSensitivity) {
                        Q = z(P).scrollTop(z(P).scrollTop() - U.scrollSpeed)
                    } else {
                        if (z(window).height() - (S.pageY - z(P).scrollTop()) < U.scrollSensitivity) {
                            Q = z(P).scrollTop(z(P).scrollTop() + U.scrollSpeed)
                        }
                    }
                }
                if (!U.axis || U.axis !== "y") {
                    if (S.pageX - z(P).scrollLeft() < U.scrollSensitivity) {
                        Q = z(P).scrollLeft(z(P).scrollLeft() - U.scrollSpeed)
                    } else {
                        if (z(window).width() - (S.pageX - z(P).scrollLeft()) < U.scrollSensitivity) {
                            Q = z(P).scrollLeft(z(P).scrollLeft() + U.scrollSpeed)
                        }
                    }
                }
            }
            if (Q !== false && z.ui.ddmanager && !U.dropBehaviour) {
                z.ui.ddmanager.prepareOffsets(R, S)
            }
        }
    });
    z.ui.plugin.add("draggable", "snap", {
        start: function(Q, R, P) {
            var S = P.options;
            P.snapElements = [];
            z(S.snap.constructor !== String ? (S.snap.items || ":data(ui-draggable)") : S.snap).each(function() {
                var U = z(this),
                T = U.offset();
                if (this !== P.element[0]) {
                    P.snapElements.push({
                        item: this,
                        width: U.outerWidth(),
                        height: U.outerHeight(),
                        top: T.top,
                        left: T.left
                    })
                }
            })
        },
        drag: function(ab, Y, S) {
            var P, ag, U, V, aa, X, W, ah, ac, T, Z = S.options,
            af = Z.snapTolerance,
            ae = Y.offset.left,
            ad = ae + S.helperProportions.width,
            R = Y.offset.top,
            Q = R + S.helperProportions.height;
            for (ac = S.snapElements.length - 1; ac >= 0; ac--) {
                aa = S.snapElements[ac].left - S.margins.left;
                X = aa + S.snapElements[ac].width;
                W = S.snapElements[ac].top - S.margins.top;
                ah = W + S.snapElements[ac].height;
                if (ad < aa - af || ae > X + af || Q < W - af || R > ah + af || !z.contains(S.snapElements[ac].item.ownerDocument, S.snapElements[ac].item)) {
                    if (S.snapElements[ac].snapping) { (S.options.snap.release && S.options.snap.release.call(S.element, ab, z.extend(S._uiHash(), {
                            snapItem: S.snapElements[ac].item
                        })))
                    }
                    S.snapElements[ac].snapping = false;
                    continue
                }
                if (Z.snapMode !== "inner") {
                    P = Math.abs(W - Q) <= af;
                    ag = Math.abs(ah - R) <= af;
                    U = Math.abs(aa - ad) <= af;
                    V = Math.abs(X - ae) <= af;
                    if (P) {
                        Y.position.top = S._convertPositionTo("relative", {
                            top: W - S.helperProportions.height,
                            left: 0
                        }).top
                    }
                    if (ag) {
                        Y.position.top = S._convertPositionTo("relative", {
                            top: ah,
                            left: 0
                        }).top
                    }
                    if (U) {
                        Y.position.left = S._convertPositionTo("relative", {
                            top: 0,
                            left: aa - S.helperProportions.width
                        }).left
                    }
                    if (V) {
                        Y.position.left = S._convertPositionTo("relative", {
                            top: 0,
                            left: X
                        }).left
                    }
                }
                T = (P || ag || U || V);
                if (Z.snapMode !== "outer") {
                    P = Math.abs(W - R) <= af;
                    ag = Math.abs(ah - Q) <= af;
                    U = Math.abs(aa - ae) <= af;
                    V = Math.abs(X - ad) <= af;
                    if (P) {
                        Y.position.top = S._convertPositionTo("relative", {
                            top: W,
                            left: 0
                        }).top
                    }
                    if (ag) {
                        Y.position.top = S._convertPositionTo("relative", {
                            top: ah - S.helperProportions.height,
                            left: 0
                        }).top
                    }
                    if (U) {
                        Y.position.left = S._convertPositionTo("relative", {
                            top: 0,
                            left: aa
                        }).left
                    }
                    if (V) {
                        Y.position.left = S._convertPositionTo("relative", {
                            top: 0,
                            left: X - S.helperProportions.width
                        }).left
                    }
                }
                if (!S.snapElements[ac].snapping && (P || ag || U || V || T)) { (S.options.snap.snap && S.options.snap.snap.call(S.element, ab, z.extend(S._uiHash(), {
                        snapItem: S.snapElements[ac].item
                    })))
                }
                S.snapElements[ac].snapping = (P || ag || U || V || T)
            }
        }
    });
    z.ui.plugin.add("draggable", "stack", {
        start: function(R, S, P) {
            var Q, U = P.options,
            T = z.makeArray(z(U.stack)).sort(function(W, V) {
                return (parseInt(z(W).css("zIndex"), 10) || 0) - (parseInt(z(V).css("zIndex"), 10) || 0)
            });
            if (!T.length) {
                return
            }
            Q = parseInt(z(T[0]).css("zIndex"), 10) || 0;
            z(T).each(function(V) {
                z(this).css("zIndex", Q + V)
            });
            this.css("zIndex", (Q + T.length))
        }
    });
    z.ui.plugin.add("draggable", "zIndex", {
        start: function(R, S, P) {
            var Q = z(S.helper),
            T = P.options;
            if (Q.css("zIndex")) {
                T._zIndex = Q.css("zIndex")
            }
            Q.css("zIndex", T.zIndex)
        },
        stop: function(Q, R, P) {
            var S = P.options;
            if (S._zIndex) {
                z(R.helper).css("zIndex", S._zIndex)
            }
        }
    });
    var K = z.ui.draggable;
    /*!
     * jQuery UI Droppable 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/droppable/
     */
    ;
    z.widget("ui.droppable", {
        version: "1.11.4",
        widgetEventPrefix: "drop",
        options: {
            accept: "*",
            activeClass: false,
            addClasses: true,
            greedy: false,
            hoverClass: false,
            scope: "default",
            tolerance: "intersect",
            activate: null,
            deactivate: null,
            drop: null,
            out: null,
            over: null
        },
        _create: function() {
            var Q, R = this.options,
            P = R.accept;
            this.isover = false;
            this.isout = true;
            this.accept = z.isFunction(P) ? P: function(S) {
                return S.is(P)
            };
            this.proportions = function() {
                if (arguments.length) {
                    Q = arguments[0]
                } else {
                    return Q ? Q: Q = {
                        width: this.element[0].offsetWidth,
                        height: this.element[0].offsetHeight
                    }
                }
            };
            this._addToManager(R.scope);
            R.addClasses && this.element.addClass("ui-droppable")
        },
        _addToManager: function(P) {
            z.ui.ddmanager.droppables[P] = z.ui.ddmanager.droppables[P] || [];
            z.ui.ddmanager.droppables[P].push(this)
        },
        _splice: function(P) {
            var Q = 0;
            for (; Q < P.length; Q++) {
                if (P[Q] === this) {
                    P.splice(Q, 1)
                }
            }
        },
        _destroy: function() {
            var P = z.ui.ddmanager.droppables[this.options.scope];
            this._splice(P);
            this.element.removeClass("ui-droppable ui-droppable-disabled")
        },
        _setOption: function(Q, R) {
            if (Q === "accept") {
                this.accept = z.isFunction(R) ? R: function(S) {
                    return S.is(R)
                }
            } else {
                if (Q === "scope") {
                    var P = z.ui.ddmanager.droppables[this.options.scope];
                    this._splice(P);
                    this._addToManager(R)
                }
            }
            this._super(Q, R)
        },
        _activate: function(Q) {
            var P = z.ui.ddmanager.current;
            if (this.options.activeClass) {
                this.element.addClass(this.options.activeClass)
            }
            if (P) {
                this._trigger("activate", Q, this.ui(P))
            }
        },
        _deactivate: function(Q) {
            var P = z.ui.ddmanager.current;
            if (this.options.activeClass) {
                this.element.removeClass(this.options.activeClass)
            }
            if (P) {
                this._trigger("deactivate", Q, this.ui(P))
            }
        },
        _over: function(Q) {
            var P = z.ui.ddmanager.current;
            if (!P || (P.currentItem || P.element)[0] === this.element[0]) {
                return
            }
            if (this.accept.call(this.element[0], (P.currentItem || P.element))) {
                if (this.options.hoverClass) {
                    this.element.addClass(this.options.hoverClass)
                }
                this._trigger("over", Q, this.ui(P))
            }
        },
        _out: function(Q) {
            var P = z.ui.ddmanager.current;
            if (!P || (P.currentItem || P.element)[0] === this.element[0]) {
                return
            }
            if (this.accept.call(this.element[0], (P.currentItem || P.element))) {
                if (this.options.hoverClass) {
                    this.element.removeClass(this.options.hoverClass)
                }
                this._trigger("out", Q, this.ui(P))
            }
        },
        _drop: function(Q, R) {
            var P = R || z.ui.ddmanager.current,
            S = false;
            if (!P || (P.currentItem || P.element)[0] === this.element[0]) {
                return false
            }
            this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function() {
                var T = z(this).droppable("instance");
                if (T.options.greedy && !T.options.disabled && T.options.scope === P.options.scope && T.accept.call(T.element[0], (P.currentItem || P.element)) && z.ui.intersect(P, z.extend(T, {
                    offset: T.element.offset()
                }), T.options.tolerance, Q)) {
                    S = true;
                    return false
                }
            });
            if (S) {
                return false
            }
            if (this.accept.call(this.element[0], (P.currentItem || P.element))) {
                if (this.options.activeClass) {
                    this.element.removeClass(this.options.activeClass)
                }
                if (this.options.hoverClass) {
                    this.element.removeClass(this.options.hoverClass)
                }
                this._trigger("drop", Q, this.ui(P));
                return this.element
            }
            return false
        },
        ui: function(P) {
            return {
                draggable: (P.currentItem || P.element),
                helper: P.helper,
                position: P.position,
                offset: P.positionAbs
            }
        }
    });
    z.ui.intersect = (function() {
        function P(R, Q, S) {
            return (R >= Q) && (R < (Q + S))
        }
        return function(ab, V, Z, R) {
            if (!V.offset) {
                return false
            }
            var T = (ab.positionAbs || ab.position.absolute).left + ab.margins.left,
            Y = (ab.positionAbs || ab.position.absolute).top + ab.margins.top,
            S = T + ab.helperProportions.width,
            X = Y + ab.helperProportions.height,
            U = V.offset.left,
            aa = V.offset.top,
            Q = U + V.proportions().width,
            W = aa + V.proportions().height;
            switch (Z) {
            case "fit":
                return (U <= T && S <= Q && aa <= Y && X <= W);
            case "intersect":
                return (U < T + (ab.helperProportions.width / 2) && S - (ab.helperProportions.width / 2) < Q && aa < Y + (ab.helperProportions.height / 2) && X - (ab.helperProportions.height / 2) < W);
            case "pointer":
                return P(R.pageY, aa, V.proportions().height) && P(R.pageX, U, V.proportions().width);
            case "touch":
                return ((Y >= aa && Y <= W) || (X >= aa && X <= W) || (Y < aa && X > W)) && ((T >= U && T <= Q) || (S >= U && S <= Q) || (T < U && S > Q));
            default:
                return false
            }
        }
    })();
    z.ui.ddmanager = {
        current: null,
        droppables: {
            "default": []
        },
        prepareOffsets: function(S, U) {
            var R, Q, P = z.ui.ddmanager.droppables[S.options.scope] || [],
            T = U ? U.type: null,
            V = (S.currentItem || S.element).find(":data(ui-droppable)").addBack();
            droppablesLoop: for (R = 0; R < P.length; R++) {
                if (P[R].options.disabled || (S && !P[R].accept.call(P[R].element[0], (S.currentItem || S.element)))) {
                    continue
                }
                for (Q = 0; Q < V.length; Q++) {
                    if (V[Q] === P[R].element[0]) {
                        P[R].proportions().height = 0;
                        continue droppablesLoop
                    }
                }
                P[R].visible = P[R].element.css("display") !== "none";
                if (!P[R].visible) {
                    continue
                }
                if (T === "mousedown") {
                    P[R]._activate.call(P[R], U)
                }
                P[R].offset = P[R].element.offset();
                P[R].proportions({
                    width: P[R].element[0].offsetWidth,
                    height: P[R].element[0].offsetHeight
                })
            }
        },
        drop: function(P, Q) {
            var R = false;
            z.each((z.ui.ddmanager.droppables[P.options.scope] || []).slice(),
            function() {
                if (!this.options) {
                    return
                }
                if (!this.options.disabled && this.visible && z.ui.intersect(P, this, this.options.tolerance, Q)) {
                    R = this._drop.call(this, Q) || R
                }
                if (!this.options.disabled && this.visible && this.accept.call(this.element[0], (P.currentItem || P.element))) {
                    this.isout = true;
                    this.isover = false;
                    this._deactivate.call(this, Q)
                }
            });
            return R
        },
        dragStart: function(P, Q) {
            P.element.parentsUntil("body").bind("scroll.droppable",
            function() {
                if (!P.options.refreshPositions) {
                    z.ui.ddmanager.prepareOffsets(P, Q)
                }
            })
        },
        drag: function(P, Q) {
            if (P.options.refreshPositions) {
                z.ui.ddmanager.prepareOffsets(P, Q)
            }
            z.each(z.ui.ddmanager.droppables[P.options.scope] || [],
            function() {
                if (this.options.disabled || this.greedyChild || !this.visible) {
                    return
                }
                var U, S, R, T = z.ui.intersect(P, this, this.options.tolerance, Q),
                V = !T && this.isover ? "isout": (T && !this.isover ? "isover": null);
                if (!V) {
                    return
                }
                if (this.options.greedy) {
                    S = this.options.scope;
                    R = this.element.parents(":data(ui-droppable)").filter(function() {
                        return z(this).droppable("instance").options.scope === S
                    });
                    if (R.length) {
                        U = z(R[0]).droppable("instance");
                        U.greedyChild = (V === "isover")
                    }
                }
                if (U && V === "isover") {
                    U.isover = false;
                    U.isout = true;
                    U._out.call(U, Q)
                }
                this[V] = true;
                this[V === "isout" ? "isover": "isout"] = false;
                this[V === "isover" ? "_over": "_out"].call(this, Q);
                if (U && V === "isout") {
                    U.isout = false;
                    U.isover = true;
                    U._over.call(U, Q)
                }
            })
        },
        dragStop: function(P, Q) {
            P.element.parentsUntil("body").unbind("scroll.droppable");
            if (!P.options.refreshPositions) {
                z.ui.ddmanager.prepareOffsets(P, Q)
            }
        }
    };
    var d = z.ui.droppable;
    /*!
     * jQuery UI Resizable 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/resizable/
     */
    ;
    z.widget("ui.resizable", z.ui.mouse, {
        version: "1.11.4",
        widgetEventPrefix: "resize",
        options: {
            alsoResize: false,
            animate: false,
            animateDuration: "slow",
            animateEasing: "swing",
            aspectRatio: false,
            autoHide: false,
            containment: false,
            ghost: false,
            grid: false,
            handles: "e,s,se",
            helper: false,
            maxHeight: null,
            maxWidth: null,
            minHeight: 10,
            minWidth: 10,
            zIndex: 90,
            resize: null,
            start: null,
            stop: null
        },
        _num: function(P) {
            return parseInt(P, 10) || 0
        },
        _isNumber: function(P) {
            return ! isNaN(parseInt(P, 10))
        },
        _hasScroll: function(S, Q) {
            if (z(S).css("overflow") === "hidden") {
                return false
            }
            var P = (Q && Q === "left") ? "scrollLeft": "scrollTop",
            R = false;
            if (S[P] > 0) {
                return true
            }
            S[P] = 1;
            R = (S[P] > 0);
            S[P] = 0;
            return R
        },
        _create: function() {
            var V, Q, T, R, P, S = this,
            U = this.options;
            this.element.addClass("ui-resizable");
            z.extend(this, {
                _aspectRatio: !!(U.aspectRatio),
                aspectRatio: U.aspectRatio,
                originalElement: this.element,
                _proportionallyResizeElements: [],
                _helper: U.helper || U.ghost || U.animate ? U.helper || "ui-resizable-helper": null
            });
            if (this.element[0].nodeName.match(/^(canvas|textarea|input|select|button|img)$/i)) {
                this.element.wrap(z("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({
                    position: this.element.css("position"),
                    width: this.element.outerWidth(),
                    height: this.element.outerHeight(),
                    top: this.element.css("top"),
                    left: this.element.css("left")
                }));
                this.element = this.element.parent().data("ui-resizable", this.element.resizable("instance"));
                this.elementIsWrapper = true;
                this.element.css({
                    marginLeft: this.originalElement.css("marginLeft"),
                    marginTop: this.originalElement.css("marginTop"),
                    marginRight: this.originalElement.css("marginRight"),
                    marginBottom: this.originalElement.css("marginBottom")
                });
                this.originalElement.css({
                    marginLeft: 0,
                    marginTop: 0,
                    marginRight: 0,
                    marginBottom: 0
                });
                this.originalResizeStyle = this.originalElement.css("resize");
                this.originalElement.css("resize", "none");
                this._proportionallyResizeElements.push(this.originalElement.css({
                    position: "static",
                    zoom: 1,
                    display: "block"
                }));
                this.originalElement.css({
                    margin: this.originalElement.css("margin")
                });
                this._proportionallyResize()
            }
            this.handles = U.handles || (!z(".ui-resizable-handle", this.element).length ? "e,s,se": {
                n: ".ui-resizable-n",
                e: ".ui-resizable-e",
                s: ".ui-resizable-s",
                w: ".ui-resizable-w",
                se: ".ui-resizable-se",
                sw: ".ui-resizable-sw",
                ne: ".ui-resizable-ne",
                nw: ".ui-resizable-nw"
            });
            this._handles = z();
            if (this.handles.constructor === String) {
                if (this.handles === "all") {
                    this.handles = "n,e,s,w,se,sw,ne,nw"
                }
                V = this.handles.split(",");
                this.handles = {};
                for (Q = 0; Q < V.length; Q++) {
                    T = z.trim(V[Q]);
                    P = "ui-resizable-" + T;
                    R = z("<div class='ui-resizable-handle " + P + "'></div>");
                    R.css({
                        zIndex: U.zIndex
                    });
                    if ("se" === T) {
                        R.addClass("ui-icon ui-icon-gripsmall-diagonal-se")
                    }
                    this.handles[T] = ".ui-resizable-" + T;
                    this.element.append(R)
                }
            }
            this._renderAxis = function(aa) {
                var X, Y, W, Z;
                aa = aa || this.element;
                for (X in this.handles) {
                    if (this.handles[X].constructor === String) {
                        this.handles[X] = this.element.children(this.handles[X]).first().show()
                    } else {
                        if (this.handles[X].jquery || this.handles[X].nodeType) {
                            this.handles[X] = z(this.handles[X]);
                            this._on(this.handles[X], {
                                mousedown: S._mouseDown
                            })
                        }
                    }
                    if (this.elementIsWrapper && this.originalElement[0].nodeName.match(/^(textarea|input|select|button)$/i)) {
                        Y = z(this.handles[X], this.element);
                        Z = /sw|ne|nw|se|n|s/.test(X) ? Y.outerHeight() : Y.outerWidth();
                        W = ["padding", /ne|nw|n/.test(X) ? "Top": /se|sw|s/.test(X) ? "Bottom": /^e$/.test(X) ? "Right": "Left"].join("");
                        aa.css(W, Z);
                        this._proportionallyResize()
                    }
                    this._handles = this._handles.add(this.handles[X])
                }
            };
            this._renderAxis(this.element);
            this._handles = this._handles.add(this.element.find(".ui-resizable-handle"));
            this._handles.disableSelection();
            this._handles.mouseover(function() {
                if (!S.resizing) {
                    if (this.className) {
                        R = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)
                    }
                    S.axis = R && R[1] ? R[1] : "se"
                }
            });
            if (U.autoHide) {
                this._handles.hide();
                z(this.element).addClass("ui-resizable-autohide").mouseenter(function() {
                    if (U.disabled) {
                        return
                    }
                    z(this).removeClass("ui-resizable-autohide");
                    S._handles.show()
                }).mouseleave(function() {
                    if (U.disabled) {
                        return
                    }
                    if (!S.resizing) {
                        z(this).addClass("ui-resizable-autohide");
                        S._handles.hide()
                    }
                })
            }
            this._mouseInit()
        },
        _destroy: function() {
            this._mouseDestroy();
            var Q, P = function(R) {
                z(R).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
            };
            if (this.elementIsWrapper) {
                P(this.element);
                Q = this.element;
                this.originalElement.css({
                    position: Q.css("position"),
                    width: Q.outerWidth(),
                    height: Q.outerHeight(),
                    top: Q.css("top"),
                    left: Q.css("left")
                }).insertAfter(Q);
                Q.remove()
            }
            this.originalElement.css("resize", this.originalResizeStyle);
            P(this.originalElement);
            return this
        },
        _mouseCapture: function(R) {
            var Q, S, P = false;
            for (Q in this.handles) {
                S = z(this.handles[Q])[0];
                if (S === R.target || z.contains(S, R.target)) {
                    P = true
                }
            }
            return ! this.options.disabled && P
        },
        _mouseStart: function(Q) {
            var U, R, T, S = this.options,
            P = this.element;
            this.resizing = true;
            this._renderProxy();
            U = this._num(this.helper.css("left"));
            R = this._num(this.helper.css("top"));
            if (S.containment) {
                U += z(S.containment).scrollLeft() || 0;
                R += z(S.containment).scrollTop() || 0
            }
            this.offset = this.helper.offset();
            this.position = {
                left: U,
                top: R
            };
            this.size = this._helper ? {
                width: this.helper.width(),
                height: this.helper.height()
            }: {
                width: P.width(),
                height: P.height()
            };
            this.originalSize = this._helper ? {
                width: P.outerWidth(),
                height: P.outerHeight()
            }: {
                width: P.width(),
                height: P.height()
            };
            this.sizeDiff = {
                width: P.outerWidth() - P.width(),
                height: P.outerHeight() - P.height()
            };
            this.originalPosition = {
                left: U,
                top: R
            };
            this.originalMousePosition = {
                left: Q.pageX,
                top: Q.pageY
            };
            this.aspectRatio = (typeof S.aspectRatio === "number") ? S.aspectRatio: ((this.originalSize.width / this.originalSize.height) || 1);
            T = z(".ui-resizable-" + this.axis).css("cursor");
            z("body").css("cursor", T === "auto" ? this.axis + "-resize": T);
            P.addClass("ui-resizable-resizing");
            this._propagate("start", Q);
            return true
        },
        _mouseDrag: function(U) {
            var V, T, W = this.originalMousePosition,
            Q = this.axis,
            R = (U.pageX - W.left) || 0,
            P = (U.pageY - W.top) || 0,
            S = this._change[Q];
            this._updatePrevProperties();
            if (!S) {
                return false
            }
            V = S.apply(this, [U, R, P]);
            this._updateVirtualBoundaries(U.shiftKey);
            if (this._aspectRatio || U.shiftKey) {
                V = this._updateRatio(V, U)
            }
            V = this._respectSize(V, U);
            this._updateCache(V);
            this._propagate("resize", U);
            T = this._applyChanges();
            if (!this._helper && this._proportionallyResizeElements.length) {
                this._proportionallyResize()
            }
            if (!z.isEmptyObject(T)) {
                this._updatePrevProperties();
                this._trigger("resize", U, this.ui());
                this._applyChanges()
            }
            return false
        },
        _mouseStop: function(S) {
            this.resizing = false;
            var R, P, Q, V, Y, U, X, T = this.options,
            W = this;
            if (this._helper) {
                R = this._proportionallyResizeElements;
                P = R.length && (/textarea/i).test(R[0].nodeName);
                Q = P && this._hasScroll(R[0], "left") ? 0 : W.sizeDiff.height;
                V = P ? 0 : W.sizeDiff.width;
                Y = {
                    width: (W.helper.width() - V),
                    height: (W.helper.height() - Q)
                };
                U = (parseInt(W.element.css("left"), 10) + (W.position.left - W.originalPosition.left)) || null;
                X = (parseInt(W.element.css("top"), 10) + (W.position.top - W.originalPosition.top)) || null;
                if (!T.animate) {
                    this.element.css(z.extend(Y, {
                        top: X,
                        left: U
                    }))
                }
                W.helper.height(W.size.height);
                W.helper.width(W.size.width);
                if (this._helper && !T.animate) {
                    this._proportionallyResize()
                }
            }
            z("body").css("cursor", "auto");
            this.element.removeClass("ui-resizable-resizing");
            this._propagate("stop", S);
            if (this._helper) {
                this.helper.remove()
            }
            return false
        },
        _updatePrevProperties: function() {
            this.prevPosition = {
                top: this.position.top,
                left: this.position.left
            };
            this.prevSize = {
                width: this.size.width,
                height: this.size.height
            }
        },
        _applyChanges: function() {
            var P = {};
            if (this.position.top !== this.prevPosition.top) {
                P.top = this.position.top + "px"
            }
            if (this.position.left !== this.prevPosition.left) {
                P.left = this.position.left + "px"
            }
            if (this.size.width !== this.prevSize.width) {
                P.width = this.size.width + "px"
            }
            if (this.size.height !== this.prevSize.height) {
                P.height = this.size.height + "px"
            }
            this.helper.css(P);
            return P
        },
        _updateVirtualBoundaries: function(R) {
            var T, S, Q, V, P, U = this.options;
            P = {
                minWidth: this._isNumber(U.minWidth) ? U.minWidth: 0,
                maxWidth: this._isNumber(U.maxWidth) ? U.maxWidth: Infinity,
                minHeight: this._isNumber(U.minHeight) ? U.minHeight: 0,
                maxHeight: this._isNumber(U.maxHeight) ? U.maxHeight: Infinity
            };
            if (this._aspectRatio || R) {
                T = P.minHeight * this.aspectRatio;
                Q = P.minWidth / this.aspectRatio;
                S = P.maxHeight * this.aspectRatio;
                V = P.maxWidth / this.aspectRatio;
                if (T > P.minWidth) {
                    P.minWidth = T
                }
                if (Q > P.minHeight) {
                    P.minHeight = Q
                }
                if (S < P.maxWidth) {
                    P.maxWidth = S
                }
                if (V < P.maxHeight) {
                    P.maxHeight = V
                }
            }
            this._vBoundaries = P
        },
        _updateCache: function(P) {
            this.offset = this.helper.offset();
            if (this._isNumber(P.left)) {
                this.position.left = P.left
            }
            if (this._isNumber(P.top)) {
                this.position.top = P.top
            }
            if (this._isNumber(P.height)) {
                this.size.height = P.height
            }
            if (this._isNumber(P.width)) {
                this.size.width = P.width
            }
        },
        _updateRatio: function(R) {
            var S = this.position,
            Q = this.size,
            P = this.axis;
            if (this._isNumber(R.height)) {
                R.width = (R.height * this.aspectRatio)
            } else {
                if (this._isNumber(R.width)) {
                    R.height = (R.width / this.aspectRatio)
                }
            }
            if (P === "sw") {
                R.left = S.left + (Q.width - R.width);
                R.top = null
            }
            if (P === "nw") {
                R.top = S.top + (Q.height - R.height);
                R.left = S.left + (Q.width - R.width)
            }
            return R
        },
        _respectSize: function(U) {
            var R = this._vBoundaries,
            X = this.axis,
            Z = this._isNumber(U.width) && R.maxWidth && (R.maxWidth < U.width),
            V = this._isNumber(U.height) && R.maxHeight && (R.maxHeight < U.height),
            S = this._isNumber(U.width) && R.minWidth && (R.minWidth > U.width),
            Y = this._isNumber(U.height) && R.minHeight && (R.minHeight > U.height),
            Q = this.originalPosition.left + this.originalSize.width,
            W = this.position.top + this.size.height,
            T = /sw|nw|w/.test(X),
            P = /nw|ne|n/.test(X);
            if (S) {
                U.width = R.minWidth
            }
            if (Y) {
                U.height = R.minHeight
            }
            if (Z) {
                U.width = R.maxWidth
            }
            if (V) {
                U.height = R.maxHeight
            }
            if (S && T) {
                U.left = Q - R.minWidth
            }
            if (Z && T) {
                U.left = Q - R.maxWidth
            }
            if (Y && P) {
                U.top = W - R.minHeight
            }
            if (V && P) {
                U.top = W - R.maxHeight
            }
            if (!U.width && !U.height && !U.left && U.top) {
                U.top = null
            } else {
                if (!U.width && !U.height && !U.top && U.left) {
                    U.left = null
                }
            }
            return U
        },
        _getPaddingPlusBorderDimensions: function(R) {
            var Q = 0,
            S = [],
            T = [R.css("borderTopWidth"), R.css("borderRightWidth"), R.css("borderBottomWidth"), R.css("borderLeftWidth")],
            P = [R.css("paddingTop"), R.css("paddingRight"), R.css("paddingBottom"), R.css("paddingLeft")];
            for (; Q < 4; Q++) {
                S[Q] = (parseInt(T[Q], 10) || 0);
                S[Q] += (parseInt(P[Q], 10) || 0)
            }
            return {
                height: S[0] + S[2],
                width: S[1] + S[3]
            }
        },
        _proportionallyResize: function() {
            if (!this._proportionallyResizeElements.length) {
                return
            }
            var R, Q = 0,
            P = this.helper || this.element;
            for (; Q < this._proportionallyResizeElements.length; Q++) {
                R = this._proportionallyResizeElements[Q];
                if (!this.outerDimensions) {
                    this.outerDimensions = this._getPaddingPlusBorderDimensions(R)
                }
                R.css({
                    height: (P.height() - this.outerDimensions.height) || 0,
                    width: (P.width() - this.outerDimensions.width) || 0
                })
            }
        },
        _renderProxy: function() {
            var P = this.element,
            Q = this.options;
            this.elementOffset = P.offset();
            if (this._helper) {
                this.helper = this.helper || z("<div style='overflow:hidden;'></div>");
                this.helper.addClass(this._helper).css({
                    width: this.element.outerWidth() - 1,
                    height: this.element.outerHeight() - 1,
                    position: "absolute",
                    left: this.elementOffset.left + "px",
                    top: this.elementOffset.top + "px",
                    zIndex: ++Q.zIndex
                });
                this.helper.appendTo("body").disableSelection()
            } else {
                this.helper = this.element
            }
        },
        _change: {
            e: function(Q, P) {
                return {
                    width: this.originalSize.width + P
                }
            },
            w: function(R, P) {
                var Q = this.originalSize,
                S = this.originalPosition;
                return {
                    left: S.left + P,
                    width: Q.width - P
                }
            },
            n: function(S, Q, P) {
                var R = this.originalSize,
                T = this.originalPosition;
                return {
                    top: T.top + P,
                    height: R.height - P
                }
            },
            s: function(R, Q, P) {
                return {
                    height: this.originalSize.height + P
                }
            },
            se: function(R, Q, P) {
                return z.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [R, Q, P]))
            },
            sw: function(R, Q, P) {
                return z.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [R, Q, P]))
            },
            ne: function(R, Q, P) {
                return z.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [R, Q, P]))
            },
            nw: function(R, Q, P) {
                return z.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [R, Q, P]))
            }
        },
        _propagate: function(Q, P) {
            z.ui.plugin.call(this, Q, [P, this.ui()]); (Q !== "resize" && this._trigger(Q, P, this.ui()))
        },
        plugins: {},
        ui: function() {
            return {
                originalElement: this.originalElement,
                element: this.element,
                helper: this.helper,
                position: this.position,
                size: this.size,
                originalSize: this.originalSize,
                originalPosition: this.originalPosition
            }
        }
    });
    /*!
     * jQuery UI Progressbar 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/progressbar/
     */
    ;
    var J = z.widget("ui.progressbar", {
        version: "1.11.4",
        options: {
            max: 100,
            value: 0,
            change: null,
            complete: null
        },
        min: 0,
        _create: function() {
            this.oldValue = this.options.value = this._constrainedValue();
            this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({
                role: "progressbar",
                "aria-valuemin": this.min
            });
            this.valueDiv = z("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element);
            this._refreshValue()
        },
        _destroy: function() {
            this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow");
            this.valueDiv.remove()
        },
        value: function(P) {
            if (P === undefined) {
                return this.options.value
            }
            this.options.value = this._constrainedValue(P);
            this._refreshValue()
        },
        _constrainedValue: function(P) {
            if (P === undefined) {
                P = this.options.value
            }
            this.indeterminate = P === false;
            if (typeof P !== "number") {
                P = 0
            }
            return this.indeterminate ? false: Math.min(this.options.max, Math.max(this.min, P))
        },
        _setOptions: function(P) {
            var Q = P.value;
            delete P.value;
            this._super(P);
            this.options.value = this._constrainedValue(Q);
            this._refreshValue()
        },
        _setOption: function(P, Q) {
            if (P === "max") {
                Q = Math.max(this.min, Q)
            }
            if (P === "disabled") {
                this.element.toggleClass("ui-state-disabled", !!Q).attr("aria-disabled", Q)
            }
            this._super(P, Q)
        },
        _percentage: function() {
            return this.indeterminate ? 100 : 100 * (this.options.value - this.min) / (this.options.max - this.min)
        },
        _refreshValue: function() {
            var Q = this.options.value,
            P = this._percentage();
            this.valueDiv.toggle(this.indeterminate || Q > this.min).toggleClass("ui-corner-right", Q === this.options.max).width(P.toFixed(0) + "%");
            this.element.toggleClass("ui-progressbar-indeterminate", this.indeterminate);
            if (this.indeterminate) {
                this.element.removeAttr("aria-valuenow");
                if (!this.overlayDiv) {
                    this.overlayDiv = z("<div class='ui-progressbar-overlay'></div>").appendTo(this.valueDiv)
                }
            } else {
                this.element.attr({
                    "aria-valuemax": this.options.max,
                    "aria-valuenow": Q
                });
                if (this.overlayDiv) {
                    this.overlayDiv.remove();
                    this.overlayDiv = null
                }
            }
            if (this.oldValue !== Q) {
                this.oldValue = Q;
                this._trigger("change")
            }
            if (Q === this.options.max) {
                this._trigger("complete")
            }
        }
    });
    z.ui.plugin.add("resizable", "animate", {
        stop: function(S) {
            var X = z(this).resizable("instance"),
            U = X.options,
            R = X._proportionallyResizeElements,
            P = R.length && (/textarea/i).test(R[0].nodeName),
            Q = P && X._hasScroll(R[0], "left") ? 0 : X.sizeDiff.height,
            W = P ? 0 : X.sizeDiff.width,
            T = {
                width: (X.size.width - W),
                height: (X.size.height - Q)
            },
            V = (parseInt(X.element.css("left"), 10) + (X.position.left - X.originalPosition.left)) || null,
            Y = (parseInt(X.element.css("top"), 10) + (X.position.top - X.originalPosition.top)) || null;
            X.element.animate(z.extend(T, Y && V ? {
                top: Y,
                left: V
            }: {}), {
                duration: U.animateDuration,
                easing: U.animateEasing,
                step: function() {
                    var Z = {
                        width: parseInt(X.element.css("width"), 10),
                        height: parseInt(X.element.css("height"), 10),
                        top: parseInt(X.element.css("top"), 10),
                        left: parseInt(X.element.css("left"), 10)
                    };
                    if (R && R.length) {
                        z(R[0]).css({
                            width: Z.width,
                            height: Z.height
                        })
                    }
                    X._updateCache(Z);
                    X._propagate("resize", S)
                }
            })
        }
    });
    z.ui.plugin.add("resizable", "containment", {
        start: function() {
            var X, R, Z, P, W, S, aa, Y = z(this).resizable("instance"),
            V = Y.options,
            U = Y.element,
            Q = V.containment,
            T = (Q instanceof z) ? Q.get(0) : (/parent/.test(Q)) ? U.parent().get(0) : Q;
            if (!T) {
                return
            }
            Y.containerElement = z(T);
            if (/document/.test(Q) || Q === document) {
                Y.containerOffset = {
                    left: 0,
                    top: 0
                };
                Y.containerPosition = {
                    left: 0,
                    top: 0
                };
                Y.parentData = {
                    element: z(document),
                    left: 0,
                    top: 0,
                    width: z(document).width(),
                    height: z(document).height() || document.body.parentNode.scrollHeight
                }
            } else {
                X = z(T);
                R = [];
                z(["Top", "Right", "Left", "Bottom"]).each(function(ac, ab) {
                    R[ac] = Y._num(X.css("padding" + ab))
                });
                Y.containerOffset = X.offset();
                Y.containerPosition = X.position();
                Y.containerSize = {
                    height: (X.innerHeight() - R[3]),
                    width: (X.innerWidth() - R[1])
                };
                Z = Y.containerOffset;
                P = Y.containerSize.height;
                W = Y.containerSize.width;
                S = (Y._hasScroll(T, "left") ? T.scrollWidth: W);
                aa = (Y._hasScroll(T) ? T.scrollHeight: P);
                Y.parentData = {
                    element: T,
                    left: Z.left,
                    top: Z.top,
                    width: S,
                    height: aa
                }
            }
        },
        resize: function(Q) {
            var W, ab, V, T, X = z(this).resizable("instance"),
            S = X.options,
            Z = X.containerOffset,
            Y = X.position,
            aa = X._aspectRatio || Q.shiftKey,
            P = {
                top: 0,
                left: 0
            },
            R = X.containerElement,
            U = true;
            if (R[0] !== document && (/static/).test(R.css("position"))) {
                P = Z
            }
            if (Y.left < (X._helper ? Z.left: 0)) {
                X.size.width = X.size.width + (X._helper ? (X.position.left - Z.left) : (X.position.left - P.left));
                if (aa) {
                    X.size.height = X.size.width / X.aspectRatio;
                    U = false
                }
                X.position.left = S.helper ? Z.left: 0
            }
            if (Y.top < (X._helper ? Z.top: 0)) {
                X.size.height = X.size.height + (X._helper ? (X.position.top - Z.top) : X.position.top);
                if (aa) {
                    X.size.width = X.size.height * X.aspectRatio;
                    U = false
                }
                X.position.top = X._helper ? Z.top: 0
            }
            V = X.containerElement.get(0) === X.element.parent().get(0);
            T = /relative|absolute/.test(X.containerElement.css("position"));
            if (V && T) {
                X.offset.left = X.parentData.left + X.position.left;
                X.offset.top = X.parentData.top + X.position.top
            } else {
                X.offset.left = X.element.offset().left;
                X.offset.top = X.element.offset().top
            }
            W = Math.abs(X.sizeDiff.width + (X._helper ? X.offset.left - P.left: (X.offset.left - Z.left)));
            ab = Math.abs(X.sizeDiff.height + (X._helper ? X.offset.top - P.top: (X.offset.top - Z.top)));
            if (W + X.size.width >= X.parentData.width) {
                X.size.width = X.parentData.width - W;
                if (aa) {
                    X.size.height = X.size.width / X.aspectRatio;
                    U = false
                }
            }
            if (ab + X.size.height >= X.parentData.height) {
                X.size.height = X.parentData.height - ab;
                if (aa) {
                    X.size.width = X.size.height * X.aspectRatio;
                    U = false
                }
            }
            if (!U) {
                X.position.left = X.prevPosition.left;
                X.position.top = X.prevPosition.top;
                X.size.width = X.prevSize.width;
                X.size.height = X.prevSize.height
            }
        },
        stop: function() {
            var U = z(this).resizable("instance"),
            Q = U.options,
            V = U.containerOffset,
            P = U.containerPosition,
            R = U.containerElement,
            S = z(U.helper),
            X = S.offset(),
            W = S.outerWidth() - U.sizeDiff.width,
            T = S.outerHeight() - U.sizeDiff.height;
            if (U._helper && !Q.animate && (/relative/).test(R.css("position"))) {
                z(this).css({
                    left: X.left - P.left - V.left,
                    width: W,
                    height: T
                })
            }
            if (U._helper && !Q.animate && (/static/).test(R.css("position"))) {
                z(this).css({
                    left: X.left - P.left - V.left,
                    width: W,
                    height: T
                })
            }
        }
    });
    z.ui.plugin.add("resizable", "alsoResize", {
        start: function() {
            var P = z(this).resizable("instance"),
            Q = P.options;
            z(Q.alsoResize).each(function() {
                var R = z(this);
                R.data("ui-resizable-alsoresize", {
                    width: parseInt(R.width(), 10),
                    height: parseInt(R.height(), 10),
                    left: parseInt(R.css("left"), 10),
                    top: parseInt(R.css("top"), 10)
                })
            })
        },
        resize: function(Q, S) {
            var P = z(this).resizable("instance"),
            T = P.options,
            R = P.originalSize,
            V = P.originalPosition,
            U = {
                height: (P.size.height - R.height) || 0,
                width: (P.size.width - R.width) || 0,
                top: (P.position.top - V.top) || 0,
                left: (P.position.left - V.left) || 0
            };
            z(T.alsoResize).each(function() {
                var Y = z(this),
                Z = z(this).data("ui-resizable-alsoresize"),
                X = {},
                W = Y.parents(S.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                z.each(W,
                function(aa, ac) {
                    var ab = (Z[ac] || 0) + (U[ac] || 0);
                    if (ab && ab >= 0) {
                        X[ac] = ab || null
                    }
                });
                Y.css(X)
            })
        },
        stop: function() {
            z(this).removeData("resizable-alsoresize")
        }
    });
    z.ui.plugin.add("resizable", "ghost", {
        start: function() {
            var Q = z(this).resizable("instance"),
            R = Q.options,
            P = Q.size;
            Q.ghost = Q.originalElement.clone();
            Q.ghost.css({
                opacity: 0.25,
                display: "block",
                position: "relative",
                height: P.height,
                width: P.width,
                margin: 0,
                left: 0,
                top: 0
            }).addClass("ui-resizable-ghost").addClass(typeof R.ghost === "string" ? R.ghost: "");
            Q.ghost.appendTo(Q.helper)
        },
        resize: function() {
            var P = z(this).resizable("instance");
            if (P.ghost) {
                P.ghost.css({
                    position: "relative",
                    height: P.size.height,
                    width: P.size.width
                })
            }
        },
        stop: function() {
            var P = z(this).resizable("instance");
            if (P.ghost && P.helper) {
                P.helper.get(0).removeChild(P.ghost.get(0))
            }
        }
    });
    z.ui.plugin.add("resizable", "grid", {
        resize: function() {
            var S, X = z(this).resizable("instance"),
            ab = X.options,
            V = X.size,
            W = X.originalSize,
            Y = X.originalPosition,
            ag = X.axis,
            P = typeof ab.grid === "number" ? [ab.grid, ab.grid] : ab.grid,
            ae = (P[0] || 1),
            ad = (P[1] || 1),
            U = Math.round((V.width - W.width) / ae) * ae,
            T = Math.round((V.height - W.height) / ad) * ad,
            Z = W.width + U,
            ac = W.height + T,
            R = ab.maxWidth && (ab.maxWidth < Z),
            aa = ab.maxHeight && (ab.maxHeight < ac),
            af = ab.minWidth && (ab.minWidth > Z),
            Q = ab.minHeight && (ab.minHeight > ac);
            ab.grid = P;
            if (af) {
                Z += ae
            }
            if (Q) {
                ac += ad
            }
            if (R) {
                Z -= ae
            }
            if (aa) {
                ac -= ad
            }
            if (/^(se|s|e)$/.test(ag)) {
                X.size.width = Z;
                X.size.height = ac
            } else {
                if (/^(ne)$/.test(ag)) {
                    X.size.width = Z;
                    X.size.height = ac;
                    X.position.top = Y.top - T
                } else {
                    if (/^(sw)$/.test(ag)) {
                        X.size.width = Z;
                        X.size.height = ac;
                        X.position.left = Y.left - U
                    } else {
                        if (ac - ad <= 0 || Z - ae <= 0) {
                            S = X._getPaddingPlusBorderDimensions(this)
                        }
                        if (ac - ad > 0) {
                            X.size.height = ac;
                            X.position.top = Y.top - T
                        } else {
                            ac = ad - S.height;
                            X.size.height = ac;
                            X.position.top = Y.top + W.height - ac
                        }
                        if (Z - ae > 0) {
                            X.size.width = Z;
                            X.position.left = Y.left - U
                        } else {
                            Z = ae - S.width;
                            X.size.width = Z;
                            X.position.left = Y.left + W.width - Z
                        }
                    }
                }
            }
        }
    });
    var C = z.ui.resizable;
    /*!
     * jQuery UI Sortable 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/sortable/
     */
    ;
    var t = z.widget("ui.sortable", z.ui.mouse, {
        version: "1.11.4",
        widgetEventPrefix: "sort",
        ready: false,
        options: {
            appendTo: "parent",
            axis: false,
            connectWith: false,
            containment: false,
            cursor: "auto",
            cursorAt: false,
            dropOnEmpty: true,
            forcePlaceholderSize: false,
            forceHelperSize: false,
            grid: false,
            handle: false,
            helper: "original",
            items: "> *",
            opacity: false,
            placeholder: false,
            revert: false,
            scroll: true,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            scope: "default",
            tolerance: "intersect",
            zIndex: 1000,
            activate: null,
            beforeStop: null,
            change: null,
            deactivate: null,
            out: null,
            over: null,
            receive: null,
            remove: null,
            sort: null,
            start: null,
            stop: null,
            update: null
        },
        _isOverAxis: function(Q, P, R) {
            return (Q >= P) && (Q < (P + R))
        },
        _isFloating: function(P) {
            return (/left|right/).test(P.css("float")) || (/inline|table-cell/).test(P.css("display"))
        },
        _create: function() {
            this.containerCache = {};
            this.element.addClass("ui-sortable");
            this.refresh();
            this.offset = this.element.offset();
            this._mouseInit();
            this._setHandleClassName();
            this.ready = true
        },
        _setOption: function(P, Q) {
            this._super(P, Q);
            if (P === "handle") {
                this._setHandleClassName()
            }
        },
        _setHandleClassName: function() {
            this.element.find(".ui-sortable-handle").removeClass("ui-sortable-handle");
            z.each(this.items,
            function() { (this.instance.options.handle ? this.item.find(this.instance.options.handle) : this.item).addClass("ui-sortable-handle")
            })
        },
        _destroy: function() {
            this.element.removeClass("ui-sortable ui-sortable-disabled").find(".ui-sortable-handle").removeClass("ui-sortable-handle");
            this._mouseDestroy();
            for (var P = this.items.length - 1; P >= 0; P--) {
                this.items[P].item.removeData(this.widgetName + "-item")
            }
            return this
        },
        _mouseCapture: function(R, S) {
            var P = null,
            T = false,
            Q = this;
            if (this.reverting) {
                return false
            }
            if (this.options.disabled || this.options.type === "static") {
                return false
            }
            this._refreshItems(R);
            z(R.target).parents().each(function() {
                if (z.data(this, Q.widgetName + "-item") === Q) {
                    P = z(this);
                    return false
                }
            });
            if (z.data(R.target, Q.widgetName + "-item") === Q) {
                P = z(R.target)
            }
            if (!P) {
                return false
            }
            if (this.options.handle && !S) {
                z(this.options.handle, P).find("*").addBack().each(function() {
                    if (this === R.target) {
                        T = true
                    }
                });
                if (!T) {
                    return false
                }
            }
            this.currentItem = P;
            this._removeCurrentsFromItems();
            return true
        },
        _mouseStart: function(S, T, Q) {
            var R, P, U = this.options;
            this.currentContainer = this;
            this.refreshPositions();
            this.helper = this._createHelper(S);
            this._cacheHelperProportions();
            this._cacheMargins();
            this.scrollParent = this.helper.scrollParent();
            this.offset = this.currentItem.offset();
            this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            };
            z.extend(this.offset, {
                click: {
                    left: S.pageX - this.offset.left,
                    top: S.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            });
            this.helper.css("position", "absolute");
            this.cssPosition = this.helper.css("position");
            this.originalPosition = this._generatePosition(S);
            this.originalPageX = S.pageX;
            this.originalPageY = S.pageY; (U.cursorAt && this._adjustOffsetFromHelper(U.cursorAt));
            this.domPosition = {
                prev: this.currentItem.prev()[0],
                parent: this.currentItem.parent()[0]
            };
            if (this.helper[0] !== this.currentItem[0]) {
                this.currentItem.hide()
            }
            this._createPlaceholder();
            if (U.containment) {
                this._setContainment()
            }
            if (U.cursor && U.cursor !== "auto") {
                P = this.document.find("body");
                this.storedCursor = P.css("cursor");
                P.css("cursor", U.cursor);
                this.storedStylesheet = z("<style>*{ cursor: " + U.cursor + " !important; }</style>").appendTo(P)
            }
            if (U.opacity) {
                if (this.helper.css("opacity")) {
                    this._storedOpacity = this.helper.css("opacity")
                }
                this.helper.css("opacity", U.opacity)
            }
            if (U.zIndex) {
                if (this.helper.css("zIndex")) {
                    this._storedZIndex = this.helper.css("zIndex")
                }
                this.helper.css("zIndex", U.zIndex)
            }
            if (this.scrollParent[0] !== this.document[0] && this.scrollParent[0].tagName !== "HTML") {
                this.overflowOffset = this.scrollParent.offset()
            }
            this._trigger("start", S, this._uiHash());
            if (!this._preserveHelperProportions) {
                this._cacheHelperProportions()
            }
            if (!Q) {
                for (R = this.containers.length - 1; R >= 0; R--) {
                    this.containers[R]._trigger("activate", S, this._uiHash(this))
                }
            }
            if (z.ui.ddmanager) {
                z.ui.ddmanager.current = this
            }
            if (z.ui.ddmanager && !U.dropBehaviour) {
                z.ui.ddmanager.prepareOffsets(this, S)
            }
            this.dragging = true;
            this.helper.addClass("ui-sortable-helper");
            this._mouseDrag(S);
            return true
        },
        _mouseDrag: function(T) {
            var R, S, Q, V, U = this.options,
            P = false;
            this.position = this._generatePosition(T);
            this.positionAbs = this._convertPositionTo("absolute");
            if (!this.lastPositionAbs) {
                this.lastPositionAbs = this.positionAbs
            }
            if (this.options.scroll) {
                if (this.scrollParent[0] !== this.document[0] && this.scrollParent[0].tagName !== "HTML") {
                    if ((this.overflowOffset.top + this.scrollParent[0].offsetHeight) - T.pageY < U.scrollSensitivity) {
                        this.scrollParent[0].scrollTop = P = this.scrollParent[0].scrollTop + U.scrollSpeed
                    } else {
                        if (T.pageY - this.overflowOffset.top < U.scrollSensitivity) {
                            this.scrollParent[0].scrollTop = P = this.scrollParent[0].scrollTop - U.scrollSpeed
                        }
                    }
                    if ((this.overflowOffset.left + this.scrollParent[0].offsetWidth) - T.pageX < U.scrollSensitivity) {
                        this.scrollParent[0].scrollLeft = P = this.scrollParent[0].scrollLeft + U.scrollSpeed
                    } else {
                        if (T.pageX - this.overflowOffset.left < U.scrollSensitivity) {
                            this.scrollParent[0].scrollLeft = P = this.scrollParent[0].scrollLeft - U.scrollSpeed
                        }
                    }
                } else {
                    if (T.pageY - this.document.scrollTop() < U.scrollSensitivity) {
                        P = this.document.scrollTop(this.document.scrollTop() - U.scrollSpeed)
                    } else {
                        if (this.window.height() - (T.pageY - this.document.scrollTop()) < U.scrollSensitivity) {
                            P = this.document.scrollTop(this.document.scrollTop() + U.scrollSpeed)
                        }
                    }
                    if (T.pageX - this.document.scrollLeft() < U.scrollSensitivity) {
                        P = this.document.scrollLeft(this.document.scrollLeft() - U.scrollSpeed)
                    } else {
                        if (this.window.width() - (T.pageX - this.document.scrollLeft()) < U.scrollSensitivity) {
                            P = this.document.scrollLeft(this.document.scrollLeft() + U.scrollSpeed)
                        }
                    }
                }
                if (P !== false && z.ui.ddmanager && !U.dropBehaviour) {
                    z.ui.ddmanager.prepareOffsets(this, T)
                }
            }
            this.positionAbs = this._convertPositionTo("absolute");
            if (!this.options.axis || this.options.axis !== "y") {
                this.helper[0].style.left = this.position.left + "px"
            }
            if (!this.options.axis || this.options.axis !== "x") {
                this.helper[0].style.top = this.position.top + "px"
            }
            for (R = this.items.length - 1; R >= 0; R--) {
                S = this.items[R];
                Q = S.item[0];
                V = this._intersectsWithPointer(S);
                if (!V) {
                    continue
                }
                if (S.instance !== this.currentContainer) {
                    continue
                }
                if (Q !== this.currentItem[0] && this.placeholder[V === 1 ? "next": "prev"]()[0] !== Q && !z.contains(this.placeholder[0], Q) && (this.options.type === "semi-dynamic" ? !z.contains(this.element[0], Q) : true)) {
                    this.direction = V === 1 ? "down": "up";
                    if (this.options.tolerance === "pointer" || this._intersectsWithSides(S)) {
                        this._rearrange(T, S)
                    } else {
                        break
                    }
                    this._trigger("change", T, this._uiHash());
                    break
                }
            }
            this._contactContainers(T);
            if (z.ui.ddmanager) {
                z.ui.ddmanager.drag(this, T)
            }
            this._trigger("sort", T, this._uiHash());
            this.lastPositionAbs = this.positionAbs;
            return false
        },
        _mouseStop: function(R, T) {
            if (!R) {
                return
            }
            if (z.ui.ddmanager && !this.options.dropBehaviour) {
                z.ui.ddmanager.drop(this, R)
            }
            if (this.options.revert) {
                var Q = this,
                U = this.placeholder.offset(),
                P = this.options.axis,
                S = {};
                if (!P || P === "x") {
                    S.left = U.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollLeft)
                }
                if (!P || P === "y") {
                    S.top = U.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollTop)
                }
                this.reverting = true;
                z(this.helper).animate(S, parseInt(this.options.revert, 10) || 500,
                function() {
                    Q._clear(R)
                })
            } else {
                this._clear(R, T)
            }
            return false
        },
        cancel: function() {
            if (this.dragging) {
                this._mouseUp({
                    target: null
                });
                if (this.options.helper === "original") {
                    this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
                } else {
                    this.currentItem.show()
                }
                for (var P = this.containers.length - 1; P >= 0; P--) {
                    this.containers[P]._trigger("deactivate", null, this._uiHash(this));
                    if (this.containers[P].containerCache.over) {
                        this.containers[P]._trigger("out", null, this._uiHash(this));
                        this.containers[P].containerCache.over = 0
                    }
                }
            }
            if (this.placeholder) {
                if (this.placeholder[0].parentNode) {
                    this.placeholder[0].parentNode.removeChild(this.placeholder[0])
                }
                if (this.options.helper !== "original" && this.helper && this.helper[0].parentNode) {
                    this.helper.remove()
                }
                z.extend(this, {
                    helper: null,
                    dragging: false,
                    reverting: false,
                    _noFinalSort: null
                });
                if (this.domPosition.prev) {
                    z(this.domPosition.prev).after(this.currentItem)
                } else {
                    z(this.domPosition.parent).prepend(this.currentItem)
                }
            }
            return this
        },
        serialize: function(R) {
            var P = this._getItemsAsjQuery(R && R.connected),
            Q = [];
            R = R || {};
            z(P).each(function() {
                var S = (z(R.item || this).attr(R.attribute || "id") || "").match(R.expression || (/(.+)[\-=_](.+)/));
                if (S) {
                    Q.push((R.key || S[1] + "[]") + "=" + (R.key && R.expression ? S[1] : S[2]))
                }
            });
            if (!Q.length && R.key) {
                Q.push(R.key + "=")
            }
            return Q.join("&")
        },
        toArray: function(R) {
            var P = this._getItemsAsjQuery(R && R.connected),
            Q = [];
            R = R || {};
            P.each(function() {
                Q.push(z(R.item || this).attr(R.attribute || "id") || "")
            });
            return Q
        },
        _intersectsWith: function(aa) {
            var R = this.positionAbs.left,
            Q = R + this.helperProportions.width,
            Y = this.positionAbs.top,
            X = Y + this.helperProportions.height,
            S = aa.left,
            P = S + aa.width,
            ab = aa.top,
            W = ab + aa.height,
            ac = this.offset.click.top,
            V = this.offset.click.left,
            U = (this.options.axis === "x") || ((Y + ac) > ab && (Y + ac) < W),
            Z = (this.options.axis === "y") || ((R + V) > S && (R + V) < P),
            T = U && Z;
            if (this.options.tolerance === "pointer" || this.options.forcePointerForContainers || (this.options.tolerance !== "pointer" && this.helperProportions[this.floating ? "width": "height"] > aa[this.floating ? "width": "height"])) {
                return T
            } else {
                return (S < R + (this.helperProportions.width / 2) && Q - (this.helperProportions.width / 2) < P && ab < Y + (this.helperProportions.height / 2) && X - (this.helperProportions.height / 2) < W)
            }
        },
        _intersectsWithPointer: function(R) {
            var S = (this.options.axis === "x") || this._isOverAxis(this.positionAbs.top + this.offset.click.top, R.top, R.height),
            Q = (this.options.axis === "y") || this._isOverAxis(this.positionAbs.left + this.offset.click.left, R.left, R.width),
            U = S && Q,
            P = this._getDragVerticalDirection(),
            T = this._getDragHorizontalDirection();
            if (!U) {
                return false
            }
            return this.floating ? (((T && T === "right") || P === "down") ? 2 : 1) : (P && (P === "down" ? 2 : 1))
        },
        _intersectsWithSides: function(S) {
            var Q = this._isOverAxis(this.positionAbs.top + this.offset.click.top, S.top + (S.height / 2), S.height),
            R = this._isOverAxis(this.positionAbs.left + this.offset.click.left, S.left + (S.width / 2), S.width),
            P = this._getDragVerticalDirection(),
            T = this._getDragHorizontalDirection();
            if (this.floating && T) {
                return ((T === "right" && R) || (T === "left" && !R))
            } else {
                return P && ((P === "down" && Q) || (P === "up" && !Q))
            }
        },
        _getDragVerticalDirection: function() {
            var P = this.positionAbs.top - this.lastPositionAbs.top;
            return P !== 0 && (P > 0 ? "down": "up")
        },
        _getDragHorizontalDirection: function() {
            var P = this.positionAbs.left - this.lastPositionAbs.left;
            return P !== 0 && (P > 0 ? "right": "left")
        },
        refresh: function(P) {
            this._refreshItems(P);
            this._setHandleClassName();
            this.refreshPositions();
            return this
        },
        _connectWith: function() {
            var P = this.options;
            return P.connectWith.constructor === String ? [P.connectWith] : P.connectWith
        },
        _getItemsAsjQuery: function(P) {
            var R, Q, W, T, U = [],
            S = [],
            V = this._connectWith();
            if (V && P) {
                for (R = V.length - 1; R >= 0; R--) {
                    W = z(V[R], this.document[0]);
                    for (Q = W.length - 1; Q >= 0; Q--) {
                        T = z.data(W[Q], this.widgetFullName);
                        if (T && T !== this && !T.options.disabled) {
                            S.push([z.isFunction(T.options.items) ? T.options.items.call(T.element) : z(T.options.items, T.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), T])
                        }
                    }
                }
            }
            S.push([z.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                options: this.options,
                item: this.currentItem
            }) : z(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]);
            function X() {
                U.push(this)
            }
            for (R = S.length - 1; R >= 0; R--) {
                S[R][0].each(X)
            }
            return z(U)
        },
        _removeCurrentsFromItems: function() {
            var P = this.currentItem.find(":data(" + this.widgetName + "-item)");
            this.items = z.grep(this.items,
            function(R) {
                for (var Q = 0; Q < P.length; Q++) {
                    if (P[Q] === R.item[0]) {
                        return false
                    }
                }
                return true
            })
        },
        _refreshItems: function(P) {
            this.items = [];
            this.containers = [this];
            var T, R, Y, U, X, Q, aa, Z, V = this.items,
            S = [[z.isFunction(this.options.items) ? this.options.items.call(this.element[0], P, {
                item: this.currentItem
            }) : z(this.options.items, this.element), this]],
            W = this._connectWith();
            if (W && this.ready) {
                for (T = W.length - 1; T >= 0; T--) {
                    Y = z(W[T], this.document[0]);
                    for (R = Y.length - 1; R >= 0; R--) {
                        U = z.data(Y[R], this.widgetFullName);
                        if (U && U !== this && !U.options.disabled) {
                            S.push([z.isFunction(U.options.items) ? U.options.items.call(U.element[0], P, {
                                item: this.currentItem
                            }) : z(U.options.items, U.element), U]);
                            this.containers.push(U)
                        }
                    }
                }
            }
            for (T = S.length - 1; T >= 0; T--) {
                X = S[T][1];
                Q = S[T][0];
                for (R = 0, Z = Q.length; R < Z; R++) {
                    aa = z(Q[R]);
                    aa.data(this.widgetName + "-item", X);
                    V.push({
                        item: aa,
                        instance: X,
                        width: 0,
                        height: 0,
                        left: 0,
                        top: 0
                    })
                }
            }
        },
        refreshPositions: function(P) {
            this.floating = this.items.length ? this.options.axis === "x" || this._isFloating(this.items[0].item) : false;
            if (this.offsetParent && this.helper) {
                this.offset.parent = this._getParentOffset()
            }
            var R, S, Q, T;
            for (R = this.items.length - 1; R >= 0; R--) {
                S = this.items[R];
                if (S.instance !== this.currentContainer && this.currentContainer && S.item[0] !== this.currentItem[0]) {
                    continue
                }
                Q = this.options.toleranceElement ? z(this.options.toleranceElement, S.item) : S.item;
                if (!P) {
                    S.width = Q.outerWidth();
                    S.height = Q.outerHeight()
                }
                T = Q.offset();
                S.left = T.left;
                S.top = T.top
            }
            if (this.options.custom && this.options.custom.refreshContainers) {
                this.options.custom.refreshContainers.call(this)
            } else {
                for (R = this.containers.length - 1; R >= 0; R--) {
                    T = this.containers[R].element.offset();
                    this.containers[R].containerCache.left = T.left;
                    this.containers[R].containerCache.top = T.top;
                    this.containers[R].containerCache.width = this.containers[R].element.outerWidth();
                    this.containers[R].containerCache.height = this.containers[R].element.outerHeight()
                }
            }
            return this
        },
        _createPlaceholder: function(Q) {
            Q = Q || this;
            var P, R = Q.options;
            if (!R.placeholder || R.placeholder.constructor === String) {
                P = R.placeholder;
                R.placeholder = {
                    element: function() {
                        var T = Q.currentItem[0].nodeName.toLowerCase(),
                        S = z("<" + T + ">", Q.document[0]).addClass(P || Q.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper");
                        if (T === "tbody") {
                            Q._createTrPlaceholder(Q.currentItem.find("tr").eq(0), z("<tr>", Q.document[0]).appendTo(S))
                        } else {
                            if (T === "tr") {
                                Q._createTrPlaceholder(Q.currentItem, S)
                            } else {
                                if (T === "img") {
                                    S.attr("src", Q.currentItem.attr("src"))
                                }
                            }
                        }
                        if (!P) {
                            S.css("visibility", "hidden")
                        }
                        return S
                    },
                    update: function(S, T) {
                        if (P && !R.forcePlaceholderSize) {
                            return
                        }
                        if (!T.height()) {
                            T.height(Q.currentItem.innerHeight() - parseInt(Q.currentItem.css("paddingTop") || 0, 10) - parseInt(Q.currentItem.css("paddingBottom") || 0, 10))
                        }
                        if (!T.width()) {
                            T.width(Q.currentItem.innerWidth() - parseInt(Q.currentItem.css("paddingLeft") || 0, 10) - parseInt(Q.currentItem.css("paddingRight") || 0, 10))
                        }
                    }
                }
            }
            Q.placeholder = z(R.placeholder.element.call(Q.element, Q.currentItem));
            Q.currentItem.after(Q.placeholder);
            R.placeholder.update(Q, Q.placeholder)
        },
        _createTrPlaceholder: function(Q, P) {
            var R = this;
            Q.children().each(function() {
                z("<td>&#160;</td>", R.document[0]).attr("colspan", z(this).attr("colspan") || 1).appendTo(P)
            })
        },
        _contactContainers: function(P) {
            var U, S, Y, V, W, aa, ab, T, X, R, Q = null,
            Z = null;
            for (U = this.containers.length - 1; U >= 0; U--) {
                if (z.contains(this.currentItem[0], this.containers[U].element[0])) {
                    continue
                }
                if (this._intersectsWith(this.containers[U].containerCache)) {
                    if (Q && z.contains(this.containers[U].element[0], Q.element[0])) {
                        continue
                    }
                    Q = this.containers[U];
                    Z = U
                } else {
                    if (this.containers[U].containerCache.over) {
                        this.containers[U]._trigger("out", P, this._uiHash(this));
                        this.containers[U].containerCache.over = 0
                    }
                }
            }
            if (!Q) {
                return
            }
            if (this.containers.length === 1) {
                if (!this.containers[Z].containerCache.over) {
                    this.containers[Z]._trigger("over", P, this._uiHash(this));
                    this.containers[Z].containerCache.over = 1
                }
            } else {
                Y = 10000;
                V = null;
                X = Q.floating || this._isFloating(this.currentItem);
                W = X ? "left": "top";
                aa = X ? "width": "height";
                R = X ? "clientX": "clientY";
                for (S = this.items.length - 1; S >= 0; S--) {
                    if (!z.contains(this.containers[Z].element[0], this.items[S].item[0])) {
                        continue
                    }
                    if (this.items[S].item[0] === this.currentItem[0]) {
                        continue
                    }
                    ab = this.items[S].item.offset()[W];
                    T = false;
                    if (P[R] - ab > this.items[S][aa] / 2) {
                        T = true
                    }
                    if (Math.abs(P[R] - ab) < Y) {
                        Y = Math.abs(P[R] - ab);
                        V = this.items[S];
                        this.direction = T ? "up": "down"
                    }
                }
                if (!V && !this.options.dropOnEmpty) {
                    return
                }
                if (this.currentContainer === this.containers[Z]) {
                    if (!this.currentContainer.containerCache.over) {
                        this.containers[Z]._trigger("over", P, this._uiHash());
                        this.currentContainer.containerCache.over = 1
                    }
                    return
                }
                V ? this._rearrange(P, V, null, true) : this._rearrange(P, null, this.containers[Z].element, true);
                this._trigger("change", P, this._uiHash());
                this.containers[Z]._trigger("change", P, this._uiHash(this));
                this.currentContainer = this.containers[Z];
                this.options.placeholder.update(this.currentContainer, this.placeholder);
                this.containers[Z]._trigger("over", P, this._uiHash(this));
                this.containers[Z].containerCache.over = 1
            }
        },
        _createHelper: function(Q) {
            var R = this.options,
            P = z.isFunction(R.helper) ? z(R.helper.apply(this.element[0], [Q, this.currentItem])) : (R.helper === "clone" ? this.currentItem.clone() : this.currentItem);
            if (!P.parents("body").length) {
                z(R.appendTo !== "parent" ? R.appendTo: this.currentItem[0].parentNode)[0].appendChild(P[0])
            }
            if (P[0] === this.currentItem[0]) {
                this._storedCSS = {
                    width: this.currentItem[0].style.width,
                    height: this.currentItem[0].style.height,
                    position: this.currentItem.css("position"),
                    top: this.currentItem.css("top"),
                    left: this.currentItem.css("left")
                }
            }
            if (!P[0].style.width || R.forceHelperSize) {
                P.width(this.currentItem.width())
            }
            if (!P[0].style.height || R.forceHelperSize) {
                P.height(this.currentItem.height())
            }
            return P
        },
        _adjustOffsetFromHelper: function(P) {
            if (typeof P === "string") {
                P = P.split(" ")
            }
            if (z.isArray(P)) {
                P = {
                    left: +P[0],
                    top: +P[1] || 0
                }
            }
            if ("left" in P) {
                this.offset.click.left = P.left + this.margins.left
            }
            if ("right" in P) {
                this.offset.click.left = this.helperProportions.width - P.right + this.margins.left
            }
            if ("top" in P) {
                this.offset.click.top = P.top + this.margins.top
            }
            if ("bottom" in P) {
                this.offset.click.top = this.helperProportions.height - P.bottom + this.margins.top
            }
        },
        _getParentOffset: function() {
            this.offsetParent = this.helper.offsetParent();
            var P = this.offsetParent.offset();
            if (this.cssPosition === "absolute" && this.scrollParent[0] !== this.document[0] && z.contains(this.scrollParent[0], this.offsetParent[0])) {
                P.left += this.scrollParent.scrollLeft();
                P.top += this.scrollParent.scrollTop()
            }
            if (this.offsetParent[0] === this.document[0].body || (this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() === "html" && z.ui.ie)) {
                P = {
                    top: 0,
                    left: 0
                }
            }
            return {
                top: P.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: P.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function() {
            if (this.cssPosition === "relative") {
                var P = this.currentItem.position();
                return {
                    top: P.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: P.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            } else {
                return {
                    top: 0,
                    left: 0
                }
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: (parseInt(this.currentItem.css("marginLeft"), 10) || 0),
                top: (parseInt(this.currentItem.css("marginTop"), 10) || 0)
            }
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function() {
            var Q, S, P, R = this.options;
            if (R.containment === "parent") {
                R.containment = this.helper[0].parentNode
            }
            if (R.containment === "document" || R.containment === "window") {
                this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, R.containment === "document" ? this.document.width() : this.window.width() - this.helperProportions.width - this.margins.left, (R.containment === "document" ? this.document.width() : this.window.height() || this.document[0].body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]
            }
            if (! (/^(document|window|parent)$/).test(R.containment)) {
                Q = z(R.containment)[0];
                S = z(R.containment).offset();
                P = (z(Q).css("overflow") !== "hidden");
                this.containment = [S.left + (parseInt(z(Q).css("borderLeftWidth"), 10) || 0) + (parseInt(z(Q).css("paddingLeft"), 10) || 0) - this.margins.left, S.top + (parseInt(z(Q).css("borderTopWidth"), 10) || 0) + (parseInt(z(Q).css("paddingTop"), 10) || 0) - this.margins.top, S.left + (P ? Math.max(Q.scrollWidth, Q.offsetWidth) : Q.offsetWidth) - (parseInt(z(Q).css("borderLeftWidth"), 10) || 0) - (parseInt(z(Q).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, S.top + (P ? Math.max(Q.scrollHeight, Q.offsetHeight) : Q.offsetHeight) - (parseInt(z(Q).css("borderTopWidth"), 10) || 0) - (parseInt(z(Q).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]
            }
        },
        _convertPositionTo: function(R, T) {
            if (!T) {
                T = this.position
            }
            var Q = R === "absolute" ? 1 : -1,
            P = this.cssPosition === "absolute" && !(this.scrollParent[0] !== this.document[0] && z.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent: this.scrollParent,
            S = (/(html|body)/i).test(P[0].tagName);
            return {
                top: (T.top + this.offset.relative.top * Q + this.offset.parent.top * Q - ((this.cssPosition === "fixed" ? -this.scrollParent.scrollTop() : (S ? 0 : P.scrollTop())) * Q)),
                left: (T.left + this.offset.relative.left * Q + this.offset.parent.left * Q - ((this.cssPosition === "fixed" ? -this.scrollParent.scrollLeft() : S ? 0 : P.scrollLeft()) * Q))
            }
        },
        _generatePosition: function(S) {
            var U, T, V = this.options,
            R = S.pageX,
            Q = S.pageY,
            P = this.cssPosition === "absolute" && !(this.scrollParent[0] !== this.document[0] && z.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent: this.scrollParent,
            W = (/(html|body)/i).test(P[0].tagName);
            if (this.cssPosition === "relative" && !(this.scrollParent[0] !== this.document[0] && this.scrollParent[0] !== this.offsetParent[0])) {
                this.offset.relative = this._getRelativeOffset()
            }
            if (this.originalPosition) {
                if (this.containment) {
                    if (S.pageX - this.offset.click.left < this.containment[0]) {
                        R = this.containment[0] + this.offset.click.left
                    }
                    if (S.pageY - this.offset.click.top < this.containment[1]) {
                        Q = this.containment[1] + this.offset.click.top
                    }
                    if (S.pageX - this.offset.click.left > this.containment[2]) {
                        R = this.containment[2] + this.offset.click.left
                    }
                    if (S.pageY - this.offset.click.top > this.containment[3]) {
                        Q = this.containment[3] + this.offset.click.top
                    }
                }
                if (V.grid) {
                    U = this.originalPageY + Math.round((Q - this.originalPageY) / V.grid[1]) * V.grid[1];
                    Q = this.containment ? ((U - this.offset.click.top >= this.containment[1] && U - this.offset.click.top <= this.containment[3]) ? U: ((U - this.offset.click.top >= this.containment[1]) ? U - V.grid[1] : U + V.grid[1])) : U;
                    T = this.originalPageX + Math.round((R - this.originalPageX) / V.grid[0]) * V.grid[0];
                    R = this.containment ? ((T - this.offset.click.left >= this.containment[0] && T - this.offset.click.left <= this.containment[2]) ? T: ((T - this.offset.click.left >= this.containment[0]) ? T - V.grid[0] : T + V.grid[0])) : T
                }
            }
            return {
                top: (Q - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ((this.cssPosition === "fixed" ? -this.scrollParent.scrollTop() : (W ? 0 : P.scrollTop())))),
                left: (R - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ((this.cssPosition === "fixed" ? -this.scrollParent.scrollLeft() : W ? 0 : P.scrollLeft())))
            }
        },
        _rearrange: function(T, S, Q, R) {
            Q ? Q[0].appendChild(this.placeholder[0]) : S.item[0].parentNode.insertBefore(this.placeholder[0], (this.direction === "down" ? S.item[0] : S.item[0].nextSibling));
            this.counter = this.counter ? ++this.counter: 1;
            var P = this.counter;
            this._delay(function() {
                if (P === this.counter) {
                    this.refreshPositions(!R)
                }
            })
        },
        _clear: function(Q, S) {
            this.reverting = false;
            var P, T = [];
            if (!this._noFinalSort && this.currentItem.parent().length) {
                this.placeholder.before(this.currentItem)
            }
            this._noFinalSort = null;
            if (this.helper[0] === this.currentItem[0]) {
                for (P in this._storedCSS) {
                    if (this._storedCSS[P] === "auto" || this._storedCSS[P] === "static") {
                        this._storedCSS[P] = ""
                    }
                }
                this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
            } else {
                this.currentItem.show()
            }
            if (this.fromOutside && !S) {
                T.push(function(U) {
                    this._trigger("receive", U, this._uiHash(this.fromOutside))
                })
            }
            if ((this.fromOutside || this.domPosition.prev !== this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent !== this.currentItem.parent()[0]) && !S) {
                T.push(function(U) {
                    this._trigger("update", U, this._uiHash())
                })
            }
            if (this !== this.currentContainer) {
                if (!S) {
                    T.push(function(U) {
                        this._trigger("remove", U, this._uiHash())
                    });
                    T.push((function(U) {
                        return function(V) {
                            U._trigger("receive", V, this._uiHash(this))
                        }
                    }).call(this, this.currentContainer));
                    T.push((function(U) {
                        return function(V) {
                            U._trigger("update", V, this._uiHash(this))
                        }
                    }).call(this, this.currentContainer))
                }
            }
            function R(W, U, V) {
                return function(X) {
                    V._trigger(W, X, U._uiHash(U))
                }
            }
            for (P = this.containers.length - 1; P >= 0; P--) {
                if (!S) {
                    T.push(R("deactivate", this, this.containers[P]))
                }
                if (this.containers[P].containerCache.over) {
                    T.push(R("out", this, this.containers[P]));
                    this.containers[P].containerCache.over = 0
                }
            }
            if (this.storedCursor) {
                this.document.find("body").css("cursor", this.storedCursor);
                this.storedStylesheet.remove()
            }
            if (this._storedOpacity) {
                this.helper.css("opacity", this._storedOpacity)
            }
            if (this._storedZIndex) {
                this.helper.css("zIndex", this._storedZIndex === "auto" ? "": this._storedZIndex)
            }
            this.dragging = false;
            if (!S) {
                this._trigger("beforeStop", Q, this._uiHash())
            }
            this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
            if (!this.cancelHelperRemoval) {
                if (this.helper[0] !== this.currentItem[0]) {
                    this.helper.remove()
                }
                this.helper = null
            }
            if (!S) {
                for (P = 0; P < T.length; P++) {
                    T[P].call(this, Q)
                }
                this._trigger("stop", Q, this._uiHash())
            }
            this.fromOutside = false;
            return ! this.cancelHelperRemoval
        },
        _trigger: function() {
            if (z.Widget.prototype._trigger.apply(this, arguments) === false) {
                this.cancel()
            }
        },
        _uiHash: function(P) {
            var Q = P || this;
            return {
                helper: Q.helper,
                placeholder: Q.placeholder || z([]),
                position: Q.position,
                originalPosition: Q.originalPosition,
                offset: Q.positionAbs,
                item: Q.currentItem,
                sender: P ? P.element: null
            }
        }
    });
    /*!
     * jQuery UI Menu 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/menu/
     */
    ;
    var M = z.widget("ui.menu", {
        version: "1.11.4",
        defaultElement: "<ul>",
        delay: 300,
        options: {
            icons: {
                submenu: "ui-icon-carat-1-e"
            },
            items: "> *",
            menus: "ul",
            position: {
                my: "left-1 top",
                at: "right top"
            },
            role: "menu",
            blur: null,
            focus: null,
            select: null
        },
        _create: function() {
            this.activeMenu = this.element;
            this.mouseHandled = false;
            this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content").toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length).attr({
                role: this.options.role,
                tabIndex: 0
            });
            if (this.options.disabled) {
                this.element.addClass("ui-state-disabled").attr("aria-disabled", "true")
            }
            this._on({
                "mousedown .ui-menu-item": function(P) {
                    P.preventDefault()
                },
                "click .ui-menu-item": function(P) {
                    var Q = z(P.target);
                    if (!this.mouseHandled && Q.not(".ui-state-disabled").length) {
                        this.select(P);
                        if (!P.isPropagationStopped()) {
                            this.mouseHandled = true
                        }
                        if (Q.has(".ui-menu").length) {
                            this.expand(P)
                        } else {
                            if (!this.element.is(":focus") && z(this.document[0].activeElement).closest(".ui-menu").length) {
                                this.element.trigger("focus", [true]);
                                if (this.active && this.active.parents(".ui-menu").length === 1) {
                                    clearTimeout(this.timer)
                                }
                            }
                        }
                    }
                },
                "mouseenter .ui-menu-item": function(P) {
                    if (this.previousFilter) {
                        return
                    }
                    var Q = z(P.currentTarget);
                    Q.siblings(".ui-state-active").removeClass("ui-state-active");
                    this.focus(P, Q)
                },
                mouseleave: "collapseAll",
                "mouseleave .ui-menu": "collapseAll",
                focus: function(R, P) {
                    var Q = this.active || this.element.find(this.options.items).eq(0);
                    if (!P) {
                        this.focus(R, Q)
                    }
                },
                blur: function(P) {
                    this._delay(function() {
                        if (!z.contains(this.element[0], this.document[0].activeElement)) {
                            this.collapseAll(P)
                        }
                    })
                },
                keydown: "_keydown"
            });
            this.refresh();
            this._on(this.document, {
                click: function(P) {
                    if (this._closeOnDocumentClick(P)) {
                        this.collapseAll(P)
                    }
                    this.mouseHandled = false
                }
            })
        },
        _destroy: function() {
            this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-menu-icons ui-front").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show();
            this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").removeUniqueId().removeClass("ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function() {
                var P = z(this);
                if (P.data("ui-menu-submenu-carat")) {
                    P.remove()
                }
            });
            this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")
        },
        _keydown: function(T) {
            var Q, S, U, R, P = true;
            switch (T.keyCode) {
            case z.ui.keyCode.PAGE_UP:
                this.previousPage(T);
                break;
            case z.ui.keyCode.PAGE_DOWN:
                this.nextPage(T);
                break;
            case z.ui.keyCode.HOME:
                this._move("first", "first", T);
                break;
            case z.ui.keyCode.END:
                this._move("last", "last", T);
                break;
            case z.ui.keyCode.UP:
                this.previous(T);
                break;
            case z.ui.keyCode.DOWN:
                this.next(T);
                break;
            case z.ui.keyCode.LEFT:
                this.collapse(T);
                break;
            case z.ui.keyCode.RIGHT:
                if (this.active && !this.active.is(".ui-state-disabled")) {
                    this.expand(T)
                }
                break;
            case z.ui.keyCode.ENTER:
            case z.ui.keyCode.SPACE:
                this._activate(T);
                break;
            case z.ui.keyCode.ESCAPE:
                this.collapse(T);
                break;
            default:
                P = false;
                S = this.previousFilter || "";
                U = String.fromCharCode(T.keyCode);
                R = false;
                clearTimeout(this.filterTimer);
                if (U === S) {
                    R = true
                } else {
                    U = S + U
                }
                Q = this._filterMenuItems(U);
                Q = R && Q.index(this.active.next()) !== -1 ? this.active.nextAll(".ui-menu-item") : Q;
                if (!Q.length) {
                    U = String.fromCharCode(T.keyCode);
                    Q = this._filterMenuItems(U)
                }
                if (Q.length) {
                    this.focus(T, Q);
                    this.previousFilter = U;
                    this.filterTimer = this._delay(function() {
                        delete this.previousFilter
                    },
                    1000)
                } else {
                    delete this.previousFilter
                }
            }
            if (P) {
                T.preventDefault()
            }
        },
        _activate: function(P) {
            if (!this.active.is(".ui-state-disabled")) {
                if (this.active.is("[aria-haspopup='true']")) {
                    this.expand(P)
                } else {
                    this.select(P)
                }
            }
        },
        refresh: function() {
            var T, Q, S = this,
            R = this.options.icons.submenu,
            P = this.element.find(this.options.menus);
            this.element.toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length);
            P.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-front").hide().attr({
                role: this.options.role,
                "aria-hidden": "true",
                "aria-expanded": "false"
            }).each(function() {
                var W = z(this),
                V = W.parent(),
                U = z("<span>").addClass("ui-menu-icon ui-icon " + R).data("ui-menu-submenu-carat", true);
                V.attr("aria-haspopup", "true").prepend(U);
                W.attr("aria-labelledby", V.attr("id"))
            });
            T = P.add(this.element);
            Q = T.find(this.options.items);
            Q.not(".ui-menu-item").each(function() {
                var U = z(this);
                if (S._isDivider(U)) {
                    U.addClass("ui-widget-content ui-menu-divider")
                }
            });
            Q.not(".ui-menu-item, .ui-menu-divider").addClass("ui-menu-item").uniqueId().attr({
                tabIndex: -1,
                role: this._itemRole()
            });
            Q.filter(".ui-state-disabled").attr("aria-disabled", "true");
            if (this.active && !z.contains(this.element[0], this.active[0])) {
                this.blur()
            }
        },
        _itemRole: function() {
            return {
                menu: "menuitem",
                listbox: "option"
            } [this.options.role]
        },
        _setOption: function(P, Q) {
            if (P === "icons") {
                this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(Q.submenu)
            }
            if (P === "disabled") {
                this.element.toggleClass("ui-state-disabled", !!Q).attr("aria-disabled", Q)
            }
            this._super(P, Q)
        },
        focus: function(Q, P) {
            var S, R;
            this.blur(Q, Q && Q.type === "focus");
            this._scrollIntoView(P);
            this.active = P.first();
            R = this.active.addClass("ui-state-focus").removeClass("ui-state-active");
            if (this.options.role) {
                this.element.attr("aria-activedescendant", R.attr("id"))
            }
            this.active.parent().closest(".ui-menu-item").addClass("ui-state-active");
            if (Q && Q.type === "keydown") {
                this._close()
            } else {
                this.timer = this._delay(function() {
                    this._close()
                },
                this.delay)
            }
            S = P.children(".ui-menu");
            if (S.length && Q && (/^mouse/.test(Q.type))) {
                this._startOpening(S)
            }
            this.activeMenu = P.parent();
            this._trigger("focus", Q, {
                item: P
            })
        },
        _scrollIntoView: function(S) {
            var V, R, T, P, Q, U;
            if (this._hasScroll()) {
                V = parseFloat(z.css(this.activeMenu[0], "borderTopWidth")) || 0;
                R = parseFloat(z.css(this.activeMenu[0], "paddingTop")) || 0;
                T = S.offset().top - this.activeMenu.offset().top - V - R;
                P = this.activeMenu.scrollTop();
                Q = this.activeMenu.height();
                U = S.outerHeight();
                if (T < 0) {
                    this.activeMenu.scrollTop(P + T)
                } else {
                    if (T + U > Q) {
                        this.activeMenu.scrollTop(P + T - Q + U)
                    }
                }
            }
        },
        blur: function(Q, P) {
            if (!P) {
                clearTimeout(this.timer)
            }
            if (!this.active) {
                return
            }
            this.active.removeClass("ui-state-focus");
            this.active = null;
            this._trigger("blur", Q, {
                item: this.active
            })
        },
        _startOpening: function(P) {
            clearTimeout(this.timer);
            if (P.attr("aria-hidden") !== "true") {
                return
            }
            this.timer = this._delay(function() {
                this._close();
                this._open(P)
            },
            this.delay)
        },
        _open: function(Q) {
            var P = z.extend({
                of: this.active
            },
            this.options.position);
            clearTimeout(this.timer);
            this.element.find(".ui-menu").not(Q.parents(".ui-menu")).hide().attr("aria-hidden", "true");
            Q.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(P)
        },
        collapseAll: function(Q, P) {
            clearTimeout(this.timer);
            this.timer = this._delay(function() {
                var R = P ? this.element: z(Q && Q.target).closest(this.element.find(".ui-menu"));
                if (!R.length) {
                    R = this.element
                }
                this._close(R);
                this.blur(Q);
                this.activeMenu = R
            },
            this.delay)
        },
        _close: function(P) {
            if (!P) {
                P = this.active ? this.active.parent() : this.element
            }
            P.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false").end().find(".ui-state-active").not(".ui-state-focus").removeClass("ui-state-active")
        },
        _closeOnDocumentClick: function(P) {
            return ! z(P.target).closest(".ui-menu").length
        },
        _isDivider: function(P) {
            return ! /[^\-\u2014\u2013\s]/.test(P.text())
        },
        collapse: function(Q) {
            var P = this.active && this.active.parent().closest(".ui-menu-item", this.element);
            if (P && P.length) {
                this._close();
                this.focus(Q, P)
            }
        },
        expand: function(Q) {
            var P = this.active && this.active.children(".ui-menu ").find(this.options.items).first();
            if (P && P.length) {
                this._open(P.parent());
                this._delay(function() {
                    this.focus(Q, P)
                })
            }
        },
        next: function(P) {
            this._move("next", "first", P)
        },
        previous: function(P) {
            this._move("prev", "last", P)
        },
        isFirstItem: function() {
            return this.active && !this.active.prevAll(".ui-menu-item").length
        },
        isLastItem: function() {
            return this.active && !this.active.nextAll(".ui-menu-item").length
        },
        _move: function(S, Q, R) {
            var P;
            if (this.active) {
                if (S === "first" || S === "last") {
                    P = this.active[S === "first" ? "prevAll": "nextAll"](".ui-menu-item").eq( - 1)
                } else {
                    P = this.active[S + "All"](".ui-menu-item").eq(0)
                }
            }
            if (!P || !P.length || !this.active) {
                P = this.activeMenu.find(this.options.items)[Q]()
            }
            this.focus(R, P)
        },
        nextPage: function(R) {
            var Q, S, P;
            if (!this.active) {
                this.next(R);
                return
            }
            if (this.isLastItem()) {
                return
            }
            if (this._hasScroll()) {
                S = this.active.offset().top;
                P = this.element.height();
                this.active.nextAll(".ui-menu-item").each(function() {
                    Q = z(this);
                    return Q.offset().top - S - P < 0
                });
                this.focus(R, Q)
            } else {
                this.focus(R, this.activeMenu.find(this.options.items)[!this.active ? "first": "last"]())
            }
        },
        previousPage: function(R) {
            var Q, S, P;
            if (!this.active) {
                this.next(R);
                return
            }
            if (this.isFirstItem()) {
                return
            }
            if (this._hasScroll()) {
                S = this.active.offset().top;
                P = this.element.height();
                this.active.prevAll(".ui-menu-item").each(function() {
                    Q = z(this);
                    return Q.offset().top - S + P > 0
                });
                this.focus(R, Q)
            } else {
                this.focus(R, this.activeMenu.find(this.options.items).first())
            }
        },
        _hasScroll: function() {
            return this.element.outerHeight() < this.element.prop("scrollHeight")
        },
        select: function(P) {
            this.active = this.active || z(P.target).closest(".ui-menu-item");
            var Q = {
                item: this.active
            };
            if (!this.active.has(".ui-menu").length) {
                this.collapseAll(P, true)
            }
            this._trigger("select", P, Q)
        },
        _filterMenuItems: function(R) {
            var P = R.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"),
            Q = new RegExp("^" + P, "i");
            return this.activeMenu.find(this.options.items).filter(".ui-menu-item").filter(function() {
                return Q.test(z.trim(z(this).text()))
            })
        }
    });
    /*!
     * jQuery UI Autocomplete 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/autocomplete/
     */
    ;
    z.widget("ui.autocomplete", {
        version: "1.11.4",
        defaultElement: "<input>",
        options: {
            appendTo: null,
            autoFocus: false,
            delay: 300,
            minLength: 1,
            position: {
                my: "left top",
                at: "left bottom",
                collision: "none"
            },
            source: null,
            term: "term",
            change: null,
            close: null,
            focus: null,
            open: null,
            response: null,
            search: null,
            select: null,
            width: null
        },
        requestIndex: 0,
        pending: 0,
        _create: function() {
            var R, P, S, U = this.element[0].nodeName.toLowerCase(),
            T = U === "textarea",
            Q = U === "input";
            this.isMultiLine = T ? true: Q ? false: this.element.prop("isContentEditable");
            this.valueMethod = this.element[T || Q ? "val": "text"];
            this.isNewMenu = true;
            this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off");
            this._on(this.element, {
                keydown: function(V) {
                    if (this.element.prop("readOnly")) {
                        R = true;
                        S = true;
                        P = true;
                        return
                    }
                    R = false;
                    S = false;
                    P = false;
                    var W = z.ui.keyCode;
                    switch (V.keyCode) {
                    case W.PAGE_UP:
                        R = true;
                        this._move("previousPage", V);
                        break;
                    case W.PAGE_DOWN:
                        R = true;
                        this._move("nextPage", V);
                        break;
                    case W.UP:
                        R = true;
                        this._keyEvent("previous", V);
                        break;
                    case W.DOWN:
                        R = true;
                        this._keyEvent("next", V);
                        break;
                    case W.ENTER:
                        if (this.menu.active) {
                            R = true;
                            V.preventDefault();
                            this.menu.select(V)
                        }
                        break;
                    case W.TAB:
                        if (this.menu.active) {
                            this.menu.select(V)
                        }
                        break;
                    case W.ESCAPE:
                        if (this.menu.element.is(":visible")) {
                            if (!this.isMultiLine) {
                                this._value(this.term)
                            }
                            this.close(V);
                            V.preventDefault()
                        }
                        break;
                    default:
                        P = true;
                        this._searchTimeout(V);
                        break
                    }
                },
                keypress: function(V) {
                    if (R) {
                        R = false;
                        if (!this.isMultiLine || this.menu.element.is(":visible")) {
                            V.preventDefault()
                        }
                        return
                    }
                    if (P) {
                        return
                    }
                    var W = z.ui.keyCode;
                    switch (V.keyCode) {
                    case W.PAGE_UP:
                        this._move("previousPage", V);
                        break;
                    case W.PAGE_DOWN:
                        this._move("nextPage", V);
                        break;
                    case W.UP:
                        this._keyEvent("previous", V);
                        break;
                    case W.DOWN:
                        this._keyEvent("next", V);
                        break
                    }
                },
                input: function(V) {
                    if (S) {
                        S = false;
                        V.preventDefault();
                        return
                    }
                    this._searchTimeout(V)
                },
                focus: function() {
                    this.selectedItem = null;
                    this.previous = this._value()
                },
                blur: function(V) {
                    if (this.cancelBlur) {
                        delete this.cancelBlur;
                        return
                    }
                    clearTimeout(this.searching);
                    this.close(V);
                    this._change(V)
                }
            });
            this._initSource();
            this.menu = z("<ul>").addClass("ui-autocomplete ui-front").addClass(this.options.comClass ? this.options.comClass: "").appendTo(this._appendTo()).menu({
                role: null
            }).hide().menu("instance");
            this._on(this.menu.element, {
                mousedown: function(V) {
                    V.preventDefault();
                    this.cancelBlur = true;
                    this._delay(function() {
                        delete this.cancelBlur
                    });
                    var W = this.menu.element[0];
                    if (!z(V.target).closest(".ui-menu-item").length) {
                        this._delay(function() {
                            var X = this;
                            this.document.one("mousedown",
                            function(Y) {
                                if (Y.target !== X.element[0] && Y.target !== W && !z.contains(W, Y.target)) {
                                    X.close()
                                }
                            })
                        })
                    }
                },
                menufocus: function(X, Y) {
                    var V, W;
                    if (this.isNewMenu) {
                        this.isNewMenu = false;
                        if (X.originalEvent && /^mouse/.test(X.originalEvent.type)) {
                            this.menu.blur();
                            this.document.one("mousemove",
                            function() {
                                z(X.target).trigger(X.originalEvent)
                            });
                            return
                        }
                    }
                    W = Y.item.data("ui-autocomplete-item");
                    if (false !== this._trigger("focus", X, {
                        item: W
                    })) {
                        if (X.originalEvent && /^key/.test(X.originalEvent.type)) {
                            this._value(W.value)
                        }
                    }
                    V = Y.item.attr("aria-label") || W.value;
                    if (V && z.trim(V).length) {
                        this.liveRegion.children().hide();
                        z("<div>").text(V).appendTo(this.liveRegion)
                    }
                },
                menuselect: function(X, Y) {
                    var W = Y.item.data("ui-autocomplete-item"),
                    V = this.previous;
                    if (this.element[0] !== this.document[0].activeElement) {
                        this.element.focus();
                        this.previous = V;
                        this._delay(function() {
                            this.previous = V;
                            this.selectedItem = W
                        })
                    }
                    if (false !== this._trigger("select", X, {
                        item: W
                    })) {
                        this._value(W.value)
                    }
                    this.term = this._value();
                    this.close(X);
                    this.selectedItem = W
                }
            });
            this.liveRegion = z("<span>", {
                role: "status",
                "aria-live": "assertive",
                "aria-relevant": "additions"
            }).addClass("ui-helper-hidden-accessible").appendTo(this.document[0].body);
            this._on(this.window, {
                beforeunload: function() {
                    this.element.removeAttr("autocomplete")
                }
            })
        },
        _destroy: function() {
            clearTimeout(this.searching);
            this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete");
            this.menu.element.remove();
            this.liveRegion.remove()
        },
        _setOption: function(P, Q) {
            this._super(P, Q);
            if (P === "source") {
                this._initSource()
            }
            if (P === "appendTo") {
                this.menu.element.appendTo(this._appendTo())
            }
            if (P === "disabled" && Q && this.xhr) {
                this.xhr.abort()
            }
        },
        _appendTo: function() {
            var P = this.options.appendTo;
            if (P) {
                P = P.jquery || P.nodeType ? z(P) : this.document.find(P).eq(0)
            }
            if (!P || !P[0]) {
                P = this.element.closest(".ui-front")
            }
            if (!P.length) {
                P = this.document[0].body
            }
            return P
        },
        _initSource: function() {
            var R, P, Q = this;
            if (z.isArray(this.options.source)) {
                R = this.options.source;
                this.source = function(T, S) {
                    S(z.ui.autocomplete.filter(R, T.term))
                }
            } else {
                if (typeof this.options.source === "string") {
                    P = this.options.source;
                    this.source = function(T, S) {
                        if (Q.xhr) {
                            Q.xhr.abort()
                        }
                        Q.xhr = z.ajax({
                            url: P,
                            data: T,
                            dataType: "json",
                            success: function(U) {
                                S(U)
                            },
                            error: function() {
                                S([])
                            }
                        })
                    }
                } else {
                    this.source = this.options.source
                }
            }
        },
        _searchTimeout: function(P) {
            clearTimeout(this.searching);
            this.searching = this._delay(function() {
                var R = this.term === this._value(),
                Q = this.menu.element.is(":visible"),
                S = P.altKey || P.ctrlKey || P.metaKey || P.shiftKey;
                if (!R || (R && !Q && !S)) {
                    this.selectedItem = null;
                    this.search(null, P)
                }
            },
            this.options.delay)
        },
        search: function(Q, P) {
            Q = Q != null ? Q: this._value();
            this.term = this._value();
            if (Q.length < this.options.minLength) {
                return this.close(P)
            }
            if (this._trigger("search", P) === false) {
                return
            }
            return this._search(Q)
        },
        _search: function(Q) {
            this.pending++;
            this.element.addClass("ui-autocomplete-loading");
            this.cancelSearch = false;
            var P = {};
            P[this.options.term] = Q;
            this.source(P, this._response())
        },
        _response: function() {
            var P = ++this.requestIndex;
            return z.proxy(function(Q) {
                if (P === this.requestIndex) {
                    this.__response(Q)
                }
                this.pending--;
                this.element.removeClass("ui-autocomplete-loading")
            },
            this)
        },
        __response: function(P) {
            if (P) {
                P = this._normalize(P)
            }
            this._trigger("response", null, {
                content: P
            });
            if (!this.options.disabled && P && P.length && !this.cancelSearch) {
                this._suggest(P);
                this._trigger("open")
            } else {
                this._close()
            }
        },
        close: function(P) {
            this.cancelSearch = true;
            this._close(P)
        },
        _close: function(P) {
            if (this.menu.element.is(":visible")) {
                this.menu.element.hide();
                this.menu.blur();
                this.isNewMenu = true;
                this._trigger("close", P)
            }
        },
        _change: function(P) {
            if (this.previous !== this._value()) {
                this._trigger("change", P, {
                    item: this.selectedItem
                })
            }
        },
        _normalize: function(P) {
            if (P.length && P[0].label && P[0].value) {
                return P
            }
            return z.map(P,
            function(Q) {
                if (typeof Q === "string") {
                    return {
                        label: Q,
                        value: Q
                    }
                }
                return z.extend({},
                Q, {
                    label: Q.label || Q.value,
                    value: Q.value || Q.label
                })
            })
        },
        _suggest: function(P) {
            var Q = this.menu.element.empty();
            this._renderMenu(Q, P);
            this.isNewMenu = true;
            this.menu.refresh();
            Q.show();
            this._resizeMenu();
            Q.position(z.extend({
                of: this.element
            },
            this.options.position));
            if (this.options.autoFocus) {
                this.menu.next()
            }
        },
        _resizeMenu: function() {
            var P = this.menu.element;
            P.outerWidth(this.options.width || Math.max(P.width("").outerWidth() + 1, this.element.outerWidth()))
        },
        _renderMenu: function(Q, P) {
            var R = this;
            z.each(P,
            function(S, T) {
                R._renderItemData(Q, T)
            })
        },
        _renderItemData: function(P, Q) {
            return this._renderItem(P, Q).data("ui-autocomplete-item", Q)
        },
        _renderItem: function(P, Q) {
            return z("<li>").html(Q.label).appendTo(P)
        },
        _move: function(Q, P) {
            if (!this.menu.element.is(":visible")) {
                this.search(null, P);
                return
            }
            if (this.menu.isFirstItem() && /^previous/.test(Q) || this.menu.isLastItem() && /^next/.test(Q)) {
                if (!this.isMultiLine) {
                    this._value(this.term)
                }
                this.menu.blur();
                return
            }
            this.menu[Q](P)
        },
        widget: function() {
            return this.menu.element
        },
        _value: function() {
            return this.valueMethod.apply(this.element, arguments)
        },
        _keyEvent: function(Q, P) {
            if (!this.isMultiLine || this.menu.element.is(":visible")) {
                this._move(Q, P);
                P.preventDefault()
            }
        }
    });
    z.extend(z.ui.autocomplete, {
        escapeRegex: function(P) {
            return P.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
        },
        filter: function(R, P) {
            var Q = new RegExp(z.ui.autocomplete.escapeRegex(P), "i");
            return z.grep(R,
            function(S) {
                return Q.test(S.label || S.value || S)
            })
        }
    });
    z.widget("ui.autocomplete", z.ui.autocomplete, {
        options: {
            messages: {
                noResults: "No search results.",
                results: function(P) {
                    return P + (P > 1 ? " results are": " result is") + " available, use up and down arrow keys to navigate."
                }
            }
        },
        __response: function(Q) {
            var P;
            this._superApply(arguments);
            if (this.options.disabled || this.cancelSearch) {
                return
            }
            if (Q && Q.length) {
                P = this.options.messages.results(Q.length)
            } else {
                P = this.options.messages.noResults
            }
            this.liveRegion.children().hide();
            z("<div>").text(P).appendTo(this.liveRegion)
        }
    });
    var c = z.ui.autocomplete;
    /*!
     * jQuery UI Datepicker 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/datepicker/
     */
    ;
    z.extend(z.ui, {
        datepicker: {
            version: "1.11.4"
        }
    });
    var i;
    function n(Q) {
        var P, R;
        while (Q.length && Q[0] !== document) {
            P = Q.css("position");
            if (P === "absolute" || P === "relative" || P === "fixed") {
                R = parseInt(Q.css("zIndex"), 10);
                if (!isNaN(R) && R !== 0) {
                    return R
                }
            }
            Q = Q.parent()
        }
        return 0
    }
    function O() {
        this._curInst = null;
        this._keyEvent = false;
        this._disabledInputs = [];
        this._datepickerShowing = false;
        this._inDialog = false;
        this._mainDivId = "ui-datepicker-div";
        this._inlineClass = "ui-datepicker-inline";
        this._appendClass = "ui-datepicker-append";
        this._triggerClass = "ui-datepicker-trigger";
        this._dialogClass = "ui-datepicker-dialog";
        this._disableClass = "ui-datepicker-disabled";
        this._unselectableClass = "ui-datepicker-unselectable";
        this._currentClass = "ui-datepicker-current-day";
        this._dayOverClass = "ui-datepicker-days-cell-over";
        this.regional = [];
        this.regional[""] = {
            closeText: "Done",
            prevText: "Prev",
            nextText: "Next",
            currentText: "Today",
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            weekHeader: "Wk",
            dateFormat: "mm/dd/yy",
            firstDay: 0,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: ""
        };
        this._defaults = {
            showOn: "focus",
            showAnim: "fadeIn",
            showOptions: {},
            defaultDate: null,
            appendText: "",
            buttonText: "...",
            buttonImage: "",
            buttonImageOnly: false,
            hideIfNoPrevNext: false,
            navigationAsDateFormat: false,
            gotoCurrent: false,
            changeMonth: false,
            changeYear: false,
            yearRange: "c-10:c+10",
            showOtherMonths: false,
            selectOtherMonths: false,
            showWeek: false,
            calculateWeek: this.iso8601Week,
            shortYearCutoff: "+10",
            minDate: null,
            maxDate: null,
            duration: "fast",
            beforeShowDay: null,
            beforeShow: null,
            onSelect: null,
            onChangeMonthYear: null,
            onClose: null,
            numberOfMonths: 1,
            showCurrentAtPos: 0,
            stepMonths: 1,
            stepBigMonths: 12,
            altField: "",
            altFormat: "",
            constrainInput: true,
            showButtonPanel: false,
            autoSize: false,
            disabled: false
        };
        z.extend(this._defaults, this.regional[""]);
        this.regional.en = z.extend(true, {},
        this.regional[""]);
        this.regional["en-US"] = z.extend(true, {},
        this.regional.en);
        this.dpDiv = f(z("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))
    }
    z.extend(O.prototype, {
        markerClassName: "hasDatepicker",
        maxRows: 4,
        _widgetDatepicker: function() {
            return this.dpDiv
        },
        setDefaults: function(P) {
            q(this._defaults, P || {});
            return this
        },
        _attachDatepicker: function(S, P) {
            var T, R, Q;
            T = S.nodeName.toLowerCase();
            R = (T === "div" || T === "span");
            if (!S.id) {
                this.uuid += 1;
                S.id = "dp" + this.uuid
            }
            Q = this._newInst(z(S), R);
            Q.settings = z.extend({},
            P || {});
            if (T === "input") {
                this._connectDatepicker(S, Q)
            } else {
                if (R) {
                    this._inlineDatepicker(S, Q)
                }
            }
        },
        _newInst: function(Q, P) {
            var R = Q[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
            return {
                id: Q[0],
                input: Q,
                selectedDay: 0,
                selectedMonth: 0,
                selectedYear: 0,
                drawMonth: 0,
                drawYear: 0,
                inline: P,
                dpDiv: (!P ? this.dpDiv: f(z("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")))
            }
        },
        _connectDatepicker: function(R, Q) {
            var P = z(R);
            Q.append = z([]);
            Q.trigger = z([]);
            if (P.hasClass(this.markerClassName)) {
                return
            }
            this._attachments(P, Q);
            P.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp);
            this._autoSize(Q);
            z.data(R, "datepicker", Q);
            if (Q.settings.disabled) {
                this._disableDatepicker(R)
            }
        },
        _attachments: function(R, U) {
            var Q, T, P, V = this._get(U, "appendText"),
            S = this._get(U, "isRTL");
            if (U.append) {
                U.append.remove()
            }
            if (V) {
                U.append = z("<span class='" + this._appendClass + "'>" + V + "</span>");
                R[S ? "before": "after"](U.append)
            }
            R.unbind("focus", this._showDatepicker);
            if (U.trigger) {
                U.trigger.remove()
            }
            Q = this._get(U, "showOn");
            if (Q === "focus" || Q === "both") {
                R.focus(this._showDatepicker)
            }
            if (Q === "button" || Q === "both") {
                T = this._get(U, "buttonText");
                P = this._get(U, "buttonImage");
                U.trigger = z(this._get(U, "buttonImageOnly") ? z("<img/>").addClass(this._triggerClass).attr({
                    src: P,
                    alt: T,
                    title: T
                }) : z("<button type='button'></button>").addClass(this._triggerClass).html(!P ? T: z("<img/>").attr({
                    src: P,
                    alt: T,
                    title: T
                })));
                R[S ? "before": "after"](U.trigger);
                U.trigger.click(function() {
                    if (z.datepicker._datepickerShowing && z.datepicker._lastInput === R[0]) {
                        z.datepicker._hideDatepicker()
                    } else {
                        if (z.datepicker._datepickerShowing && z.datepicker._lastInput !== R[0]) {
                            z.datepicker._hideDatepicker();
                            z.datepicker._showDatepicker(R[0])
                        } else {
                            z.datepicker._showDatepicker(R[0])
                        }
                    }
                    return false
                })
            }
        },
        _autoSize: function(V) {
            if (this._get(V, "autoSize") && !V.inline) {
                var S, Q, R, U, T = new Date(2009, 12 - 1, 20),
                P = this._get(V, "dateFormat");
                if (P.match(/[DM]/)) {
                    S = function(W) {
                        Q = 0;
                        R = 0;
                        for (U = 0; U < W.length; U++) {
                            if (W[U].length > Q) {
                                Q = W[U].length;
                                R = U
                            }
                        }
                        return R
                    };
                    T.setMonth(S(this._get(V, (P.match(/MM/) ? "monthNames": "monthNamesShort"))));
                    T.setDate(S(this._get(V, (P.match(/DD/) ? "dayNames": "dayNamesShort"))) + 20 - T.getDay())
                }
                V.input.attr("size", this._formatDate(V, T).length)
            }
        },
        _inlineDatepicker: function(Q, P) {
            var R = z(Q);
            if (R.hasClass(this.markerClassName)) {
                return
            }
            R.addClass(this.markerClassName).append(P.dpDiv);
            z.data(Q, "datepicker", P);
            this._setDate(P, this._getDefaultDate(P), true);
            this._updateDatepicker(P);
            this._updateAlternate(P);
            if (P.settings.disabled) {
                this._disableDatepicker(Q)
            }
            P.dpDiv.css("display", "block")
        },
        _dialogDatepicker: function(W, Q, U, R, V) {
            var P, Z, T, Y, X, S = this._dialogInst;
            if (!S) {
                this.uuid += 1;
                P = "dp" + this.uuid;
                this._dialogInput = z("<input type='text' id='" + P + "' style='position: absolute; top: -100px; width: 0px;'/>");
                this._dialogInput.keydown(this._doKeyDown);
                z("body").append(this._dialogInput);
                S = this._dialogInst = this._newInst(this._dialogInput, false);
                S.settings = {};
                z.data(this._dialogInput[0], "datepicker", S)
            }
            q(S.settings, R || {});
            Q = (Q && Q.constructor === Date ? this._formatDate(S, Q) : Q);
            this._dialogInput.val(Q);
            this._pos = (V ? (V.length ? V: [V.pageX, V.pageY]) : null);
            if (!this._pos) {
                Z = document.documentElement.clientWidth;
                T = document.documentElement.clientHeight;
                Y = document.documentElement.scrollLeft || document.body.scrollLeft;
                X = document.documentElement.scrollTop || document.body.scrollTop;
                this._pos = [(Z / 2) - 100 + Y, (T / 2) - 150 + X]
            }
            this._dialogInput.css("left", (this._pos[0] + 20) + "px").css("top", this._pos[1] + "px");
            S.settings.onSelect = U;
            this._inDialog = true;
            this.dpDiv.addClass(this._dialogClass);
            this._showDatepicker(this._dialogInput[0]);
            if (z.blockUI) {
                z.blockUI(this.dpDiv)
            }
            z.data(this._dialogInput[0], "datepicker", S);
            return this
        },
        _destroyDatepicker: function(R) {
            var S, P = z(R),
            Q = z.data(R, "datepicker");
            if (!P.hasClass(this.markerClassName)) {
                return
            }
            S = R.nodeName.toLowerCase();
            z.removeData(R, "datepicker");
            if (S === "input") {
                Q.append.remove();
                Q.trigger.remove();
                P.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)
            } else {
                if (S === "div" || S === "span") {
                    P.removeClass(this.markerClassName).empty()
                }
            }
            if (i === Q) {
                i = null
            }
        },
        _enableDatepicker: function(S) {
            var T, R, P = z(S),
            Q = z.data(S, "datepicker");
            if (!P.hasClass(this.markerClassName)) {
                return
            }
            T = S.nodeName.toLowerCase();
            if (T === "input") {
                S.disabled = false;
                Q.trigger.filter("button").each(function() {
                    this.disabled = false
                }).end().filter("img").css({
                    opacity: "1.0",
                    cursor: ""
                })
            } else {
                if (T === "div" || T === "span") {
                    R = P.children("." + this._inlineClass);
                    R.children().removeClass("ui-state-disabled");
                    R.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", false)
                }
            }
            this._disabledInputs = z.map(this._disabledInputs,
            function(U) {
                return (U === S ? null: U)
            })
        },
        _disableDatepicker: function(S) {
            var T, R, P = z(S),
            Q = z.data(S, "datepicker");
            if (!P.hasClass(this.markerClassName)) {
                return
            }
            T = S.nodeName.toLowerCase();
            if (T === "input") {
                S.disabled = true;
                Q.trigger.filter("button").each(function() {
                    this.disabled = true
                }).end().filter("img").css({
                    opacity: "0.5",
                    cursor: "default"
                })
            } else {
                if (T === "div" || T === "span") {
                    R = P.children("." + this._inlineClass);
                    R.children().addClass("ui-state-disabled");
                    R.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", true)
                }
            }
            this._disabledInputs = z.map(this._disabledInputs,
            function(U) {
                return (U === S ? null: U)
            });
            this._disabledInputs[this._disabledInputs.length] = S
        },
        _isDisabledDatepicker: function(Q) {
            if (!Q) {
                return false
            }
            for (var P = 0; P < this._disabledInputs.length; P++) {
                if (this._disabledInputs[P] === Q) {
                    return true
                }
            }
            return false
        },
        _getInst: function(Q) {
            try {
                return z.data(Q, "datepicker")
            } catch(P) {
                throw "Missing instance data for this datepicker"
            }
        },
        _optionDatepicker: function(V, Q, U) {
            var R, P, T, W, S = this._getInst(V);
            if (arguments.length === 2 && typeof Q === "string") {
                return (Q === "defaults" ? z.extend({},
                z.datepicker._defaults) : (S ? (Q === "all" ? z.extend({},
                S.settings) : this._get(S, Q)) : null))
            }
            R = Q || {};
            if (typeof Q === "string") {
                R = {};
                R[Q] = U
            }
            if (S) {
                if (this._curInst === S) {
                    this._hideDatepicker()
                }
                P = this._getDateDatepicker(V, true);
                T = this._getMinMaxDate(S, "min");
                W = this._getMinMaxDate(S, "max");
                q(S.settings, R);
                if (T !== null && R.dateFormat !== undefined && R.minDate === undefined) {
                    S.settings.minDate = this._formatDate(S, T)
                }
                if (W !== null && R.dateFormat !== undefined && R.maxDate === undefined) {
                    S.settings.maxDate = this._formatDate(S, W)
                }
                if ("disabled" in R) {
                    if (R.disabled) {
                        this._disableDatepicker(V)
                    } else {
                        this._enableDatepicker(V)
                    }
                }
                this._attachments(z(V), S);
                this._autoSize(S);
                this._setDate(S, P);
                this._updateAlternate(S);
                this._updateDatepicker(S)
            }
        },
        _changeDatepicker: function(R, P, Q) {
            this._optionDatepicker(R, P, Q)
        },
        _refreshDatepicker: function(Q) {
            var P = this._getInst(Q);
            if (P) {
                this._updateDatepicker(P)
            }
        },
        _setDateDatepicker: function(R, P) {
            var Q = this._getInst(R);
            if (Q) {
                this._setDate(Q, P);
                this._updateDatepicker(Q);
                this._updateAlternate(Q)
            }
        },
        _getDateDatepicker: function(R, P) {
            var Q = this._getInst(R);
            if (Q && !Q.inline) {
                this._setDateFromField(Q, P)
            }
            return (Q ? this._getDate(Q) : null)
        },
        _doKeyDown: function(S) {
            var Q, P, U, T = z.datepicker._getInst(S.target),
            V = true,
            R = T.dpDiv.is(".ui-datepicker-rtl");
            T._keyEvent = true;
            if (z.datepicker._datepickerShowing) {
                switch (S.keyCode) {
                case 9:
                    z.datepicker._hideDatepicker();
                    V = false;
                    break;
                case 13:
                    U = z("td." + z.datepicker._dayOverClass + ":not(." + z.datepicker._currentClass + ")", T.dpDiv);
                    if (U[0]) {
                        z.datepicker._selectDay(S.target, T.selectedMonth, T.selectedYear, U[0])
                    }
                    Q = z.datepicker._get(T, "onSelect");
                    if (Q) {
                        P = z.datepicker._formatDate(T);
                        Q.apply((T.input ? T.input[0] : null), [P, T])
                    } else {
                        z.datepicker._hideDatepicker()
                    }
                    return false;
                case 27:
                    z.datepicker._hideDatepicker();
                    break;
                case 33:
                    z.datepicker._adjustDate(S.target, (S.ctrlKey ? -z.datepicker._get(T, "stepBigMonths") : -z.datepicker._get(T, "stepMonths")), "M");
                    break;
                case 34:
                    z.datepicker._adjustDate(S.target, (S.ctrlKey ? +z.datepicker._get(T, "stepBigMonths") : +z.datepicker._get(T, "stepMonths")), "M");
                    break;
                case 35:
                    if (S.ctrlKey || S.metaKey) {
                        z.datepicker._clearDate(S.target)
                    }
                    V = S.ctrlKey || S.metaKey;
                    break;
                case 36:
                    if (S.ctrlKey || S.metaKey) {
                        z.datepicker._gotoToday(S.target)
                    }
                    V = S.ctrlKey || S.metaKey;
                    break;
                case 37:
                    if (S.ctrlKey || S.metaKey) {
                        z.datepicker._adjustDate(S.target, (R ? +1 : -1), "D")
                    }
                    V = S.ctrlKey || S.metaKey;
                    if (S.originalEvent.altKey) {
                        z.datepicker._adjustDate(S.target, (S.ctrlKey ? -z.datepicker._get(T, "stepBigMonths") : -z.datepicker._get(T, "stepMonths")), "M")
                    }
                    break;
                case 38:
                    if (S.ctrlKey || S.metaKey) {
                        z.datepicker._adjustDate(S.target, -7, "D")
                    }
                    V = S.ctrlKey || S.metaKey;
                    break;
                case 39:
                    if (S.ctrlKey || S.metaKey) {
                        z.datepicker._adjustDate(S.target, (R ? -1 : +1), "D")
                    }
                    V = S.ctrlKey || S.metaKey;
                    if (S.originalEvent.altKey) {
                        z.datepicker._adjustDate(S.target, (S.ctrlKey ? +z.datepicker._get(T, "stepBigMonths") : +z.datepicker._get(T, "stepMonths")), "M")
                    }
                    break;
                case 40:
                    if (S.ctrlKey || S.metaKey) {
                        z.datepicker._adjustDate(S.target, +7, "D")
                    }
                    V = S.ctrlKey || S.metaKey;
                    break;
                default:
                    V = false
                }
            } else {
                if (S.keyCode === 36 && S.ctrlKey) {
                    z.datepicker._showDatepicker(this)
                } else {
                    V = false
                }
            }
            if (V) {
                S.preventDefault();
                S.stopPropagation()
            }
        },
        _doKeyPress: function(R) {
            var Q, P, S = z.datepicker._getInst(R.target);
            if (z.datepicker._get(S, "constrainInput")) {
                Q = z.datepicker._possibleChars(z.datepicker._get(S, "dateFormat"));
                P = String.fromCharCode(R.charCode == null ? R.keyCode: R.charCode);
                return R.ctrlKey || R.metaKey || (P < " " || !Q || Q.indexOf(P) > -1)
            }
        },
        _doKeyUp: function(R) {
            var P, S = z.datepicker._getInst(R.target);
            if (S.input.val() !== S.lastVal) {
                try {
                    P = z.datepicker.parseDate(z.datepicker._get(S, "dateFormat"), (S.input ? S.input.val() : null), z.datepicker._getFormatConfig(S));
                    if (P) {
                        z.datepicker._setDateFromField(S);
                        z.datepicker._updateAlternate(S);
                        z.datepicker._updateDatepicker(S)
                    }
                } catch(Q) {}
            }
            return true
        },
        _showDatepicker: function(Q) {
            Q = Q.target || Q;
            if (Q.nodeName.toLowerCase() !== "input") {
                Q = z("input", Q.parentNode)[0]
            }
            if (z.datepicker._isDisabledDatepicker(Q) || z.datepicker._lastInput === Q) {
                return
            }
            var S, W, R, U, V, P, T;
            S = z.datepicker._getInst(Q);
            if (z.datepicker._curInst && z.datepicker._curInst !== S) {
                z.datepicker._curInst.dpDiv.stop(true, true);
                if (S && z.datepicker._datepickerShowing) {
                    z.datepicker._hideDatepicker(z.datepicker._curInst.input[0])
                }
            }
            W = z.datepicker._get(S, "beforeShow");
            R = W ? W.apply(Q, [Q, S]) : {};
            if (R === false) {
                return
            }
            q(S.settings, R);
            S.lastVal = null;
            z.datepicker._lastInput = Q;
            z.datepicker._setDateFromField(S);
            if (z.datepicker._inDialog) {
                Q.value = ""
            }
            if (!z.datepicker._pos) {
                z.datepicker._pos = z.datepicker._findPos(Q);
                z.datepicker._pos[1] += Q.offsetHeight
            }
            U = false;
            z(Q).parents().each(function() {
                U |= z(this).css("position") === "fixed";
                return ! U
            });
            V = {
                left: z.datepicker._pos[0],
                top: z.datepicker._pos[1]
            };
            z.datepicker._pos = null;
            S.dpDiv.empty();
            S.dpDiv.css({
                position: "absolute",
                display: "block",
                top: "-1000px"
            });
            z.datepicker._updateDatepicker(S);
            V = z.datepicker._checkOffset(S, V, U);
            S.dpDiv.css({
                position: (z.datepicker._inDialog && z.blockUI ? "static": (U ? "fixed": "absolute")),
                display: "none",
                left: V.left + "px",
                top: V.top + "px"
            });
            if (!S.inline) {
                P = z.datepicker._get(S, "showAnim");
                T = z.datepicker._get(S, "duration");
                S.dpDiv.css("z-index", n(z(Q)) + 1);
                z.datepicker._datepickerShowing = true;
                if (z.effects && z.effects.effect[P]) {
                    S.dpDiv.show(P, z.datepicker._get(S, "showOptions"), T)
                } else {
                    S.dpDiv[P || "show"](P ? T: null)
                }
                if (z.datepicker._shouldFocusInput(S)) {
                    S.input.focus()
                }
                z.datepicker._curInst = S
            }
        },
        _updateDatepicker: function(S) {
            this.maxRows = 4;
            i = S;
            S.dpDiv.empty().append(this._generateHTML(S));
            this._attachHandlers(S);
            var U, P = this._getNumberOfMonths(S),
            T = P[1],
            R = 17,
            Q = S.dpDiv.find("." + this._dayOverClass + " a");
            if (Q.length > 0) {
                k.apply(Q.get(0))
            }
            S.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("");
            if (T > 1) {
                S.dpDiv.addClass("ui-datepicker-multi-" + T).css("width", (R * T) + "em")
            }
            S.dpDiv[(P[0] !== 1 || P[1] !== 1 ? "add": "remove") + "Class"]("ui-datepicker-multi");
            S.dpDiv[(this._get(S, "isRTL") ? "add": "remove") + "Class"]("ui-datepicker-rtl");
            if (S === z.datepicker._curInst && z.datepicker._datepickerShowing && z.datepicker._shouldFocusInput(S)) {
                S.input.focus()
            }
            if (S.yearshtml) {
                U = S.yearshtml;
                setTimeout(function() {
                    if (U === S.yearshtml && S.yearshtml) {
                        S.dpDiv.find("select.ui-datepicker-year:first").replaceWith(S.yearshtml)
                    }
                    U = S.yearshtml = null
                },
                0)
            }
        },
        _shouldFocusInput: function(P) {
            return P.input && P.input.is(":visible") && !P.input.is(":disabled") && !P.input.is(":focus")
        },
        _checkOffset: function(U, S, R) {
            var T = U.dpDiv.outerWidth(),
            X = U.dpDiv.outerHeight(),
            W = U.input ? U.input.outerWidth() : 0,
            P = U.input ? U.input.outerHeight() : 0,
            V = document.documentElement.clientWidth + (R ? 0 : z(document).scrollLeft()),
            Q = document.documentElement.clientHeight + (R ? 0 : z(document).scrollTop());
            S.left -= (this._get(U, "isRTL") ? (T - W) : 0);
            S.left -= (R && S.left === U.input.offset().left) ? z(document).scrollLeft() : 0;
            S.top -= (R && S.top === (U.input.offset().top + P)) ? z(document).scrollTop() : 0;
            S.left -= Math.min(S.left, (S.left + T > V && V > T) ? Math.abs(S.left + T - V) : 0);
            S.top -= Math.min(S.top, (S.top + X > Q && Q > X) ? Math.abs(X + P) : 0);
            return S
        },
        _findPos: function(S) {
            var P, R = this._getInst(S),
            Q = this._get(R, "isRTL");
            while (S && (S.type === "hidden" || S.nodeType !== 1 || z.expr.filters.hidden(S))) {
                S = S[Q ? "previousSibling": "nextSibling"]
            }
            P = z(S).offset();
            return [P.left, P.top]
        },
        _hideDatepicker: function(R) {
            var Q, U, T, P, S = this._curInst;
            if (!S || (R && S !== z.data(R, "datepicker"))) {
                return
            }
            if (this._datepickerShowing) {
                Q = this._get(S, "showAnim");
                U = this._get(S, "duration");
                T = function() {
                    z.datepicker._tidyDialog(S)
                };
                if (z.effects && (z.effects.effect[Q] || z.effects[Q])) {
                    S.dpDiv.hide(Q, z.datepicker._get(S, "showOptions"), U, T)
                } else {
                    S.dpDiv[(Q === "slideDown" ? "slideUp": (Q === "fadeIn" ? "fadeOut": "hide"))]((Q ? U: null), T)
                }
                if (!Q) {
                    T()
                }
                this._datepickerShowing = false;
                P = this._get(S, "onClose");
                if (P) {
                    P.apply((S.input ? S.input[0] : null), [(S.input ? S.input.val() : ""), S])
                }
                this._lastInput = null;
                if (this._inDialog) {
                    this._dialogInput.css({
                        position: "absolute",
                        left: "0",
                        top: "-100px"
                    });
                    if (z.blockUI) {
                        z.unblockUI();
                        z("body").append(this.dpDiv)
                    }
                }
                this._inDialog = false
            }
        },
        _tidyDialog: function(P) {
            P.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
        },
        _checkExternalClick: function(Q) {
            if (!z.datepicker._curInst) {
                return
            }
            var P = z(Q.target),
            R = z.datepicker._getInst(P[0]);
            if (((P[0].id !== z.datepicker._mainDivId && P.parents("#" + z.datepicker._mainDivId).length === 0 && !P.hasClass(z.datepicker.markerClassName) && !P.closest("." + z.datepicker._triggerClass).length && z.datepicker._datepickerShowing && !(z.datepicker._inDialog && z.blockUI))) || (P.hasClass(z.datepicker.markerClassName) && z.datepicker._curInst !== R)) {
                z.datepicker._hideDatepicker()
            }
        },
        _adjustDate: function(T, S, R) {
            var Q = z(T),
            P = this._getInst(Q[0]);
            if (this._isDisabledDatepicker(Q[0])) {
                return
            }
            this._adjustInstDate(P, S + (R === "M" ? this._get(P, "showCurrentAtPos") : 0), R);
            this._updateDatepicker(P)
        },
        _gotoToday: function(S) {
            var P, R = z(S),
            Q = this._getInst(R[0]);
            if (this._get(Q, "gotoCurrent") && Q.currentDay) {
                Q.selectedDay = Q.currentDay;
                Q.drawMonth = Q.selectedMonth = Q.currentMonth;
                Q.drawYear = Q.selectedYear = Q.currentYear
            } else {
                P = new Date();
                Q.selectedDay = P.getDate();
                Q.drawMonth = Q.selectedMonth = P.getMonth();
                Q.drawYear = Q.selectedYear = P.getFullYear()
            }
            this._notifyChange(Q);
            this._adjustDate(R)
        },
        _selectMonthYear: function(T, P, S) {
            var R = z(T),
            Q = this._getInst(R[0]);
            Q["selected" + (S === "M" ? "Month": "Year")] = Q["draw" + (S === "M" ? "Month": "Year")] = parseInt(P.options[P.selectedIndex].value, 10);
            this._notifyChange(Q);
            this._adjustDate(R)
        },
        _selectDay: function(U, S, P, T) {
            var Q, R = z(U);
            if (z(T).hasClass(this._unselectableClass) || this._isDisabledDatepicker(R[0])) {
                return
            }
            Q = this._getInst(R[0]);
            Q.selectedDay = Q.currentDay = z("a", T).html();
            Q.selectedMonth = Q.currentMonth = S;
            Q.selectedYear = Q.currentYear = P;
            this._selectDate(U, this._formatDate(Q, Q.currentDay, Q.currentMonth, Q.currentYear))
        },
        _clearDate: function(Q) {
            var P = z(Q);
            this._selectDate(P, "")
        },
        _selectDate: function(T, P) {
            var Q, S = z(T),
            R = this._getInst(S[0]);
            P = (P != null ? P: this._formatDate(R));
            if (R.input) {
                R.input.val(P)
            }
            this._updateAlternate(R);
            Q = this._get(R, "onSelect");
            if (Q) {
                Q.apply((R.input ? R.input[0] : null), [P, R])
            } else {
                if (R.input) {
                    R.input.trigger("change")
                }
            }
            if (R.inline) {
                this._updateDatepicker(R)
            } else {
                this._hideDatepicker();
                this._lastInput = R.input[0];
                if (typeof(R.input[0]) !== "object") {
                    R.input.focus()
                }
                this._lastInput = null
            }
        },
        _updateAlternate: function(T) {
            var S, R, P, Q = this._get(T, "altField");
            if (Q) {
                S = this._get(T, "altFormat") || this._get(T, "dateFormat");
                R = this._getDate(T);
                P = this.formatDate(S, R, this._getFormatConfig(T));
                z(Q).each(function() {
                    z(this).val(P)
                })
            }
        },
        noWeekends: function(Q) {
            var P = Q.getDay();
            return [(P > 0 && P < 6), ""]
        },
        iso8601Week: function(P) {
            var Q, R = new Date(P.getTime());
            R.setDate(R.getDate() + 4 - (R.getDay() || 7));
            Q = R.getTime();
            R.setMonth(0);
            R.setDate(1);
            return Math.floor(Math.round((Q - R) / 86400000) / 7) + 1
        },
        parseDate: function(af, aa, ah) {
            if (af == null || aa == null) {
                throw "Invalid arguments"
            }
            aa = (typeof aa === "object" ? aa.toString() : aa + "");
            if (aa === "") {
                return null
            }
            var S, ac, Q, ag = 0,
            V = (ah ? ah.shortYearCutoff: null) || this._defaults.shortYearCutoff,
            R = (typeof V !== "string" ? V: new Date().getFullYear() % 100 + parseInt(V, 10)),
            Y = (ah ? ah.dayNamesShort: null) || this._defaults.dayNamesShort,
            aj = (ah ? ah.dayNames: null) || this._defaults.dayNames,
            P = (ah ? ah.monthNamesShort: null) || this._defaults.monthNamesShort,
            T = (ah ? ah.monthNames: null) || this._defaults.monthNames,
            U = -1,
            ak = -1,
            ae = -1,
            X = -1,
            ad = false,
            ai,
            Z = function(am) {
                var an = (S + 1 < af.length && af.charAt(S + 1) === am);
                if (an) {
                    S++
                }
                return an
            },
            al = function(ao) {
                var am = Z(ao),
                ap = (ao === "@" ? 14 : (ao === "!" ? 20 : (ao === "y" && am ? 4 : (ao === "o" ? 3 : 2)))),
                ar = (ao === "y" ? ap: 1),
                aq = new RegExp("^\\d{" + ar + "," + ap + "}"),
                an = aa.substring(ag).match(aq);
                if (!an) {
                    throw "Missing number at position " + ag
                }
                ag += an[0].length;
                return parseInt(an[0], 10)
            },
            W = function(an, ao, aq) {
                var am = -1,
                ap = z.map(Z(an) ? aq: ao,
                function(at, ar) {
                    return [[ar, at]]
                }).sort(function(at, ar) {
                    return - (at[1].length - ar[1].length)
                });
                z.each(ap,
                function(at, au) {
                    var ar = au[1];
                    if (aa.substr(ag, ar.length).toLowerCase() === ar.toLowerCase()) {
                        am = au[0];
                        ag += ar.length;
                        return false
                    }
                });
                if (am !== -1) {
                    return am + 1
                } else {
                    throw "Unknown name at position " + ag
                }
            },
            ab = function() {
                if (aa.charAt(ag) !== af.charAt(S)) {
                    throw "Unexpected literal at position " + ag
                }
                ag++
            };
            for (S = 0; S < af.length; S++) {
                if (ad) {
                    if (af.charAt(S) === "'" && !Z("'")) {
                        ad = false
                    } else {
                        ab()
                    }
                } else {
                    switch (af.charAt(S)) {
                    case "d":
                        ae = al("d");
                        break;
                    case "D":
                        W("D", Y, aj);
                        break;
                    case "o":
                        X = al("o");
                        break;
                    case "m":
                        ak = al("m");
                        break;
                    case "M":
                        ak = W("M", P, T);
                        break;
                    case "y":
                        U = al("y");
                        break;
                    case "@":
                        ai = new Date(al("@"));
                        U = ai.getFullYear();
                        ak = ai.getMonth() + 1;
                        ae = ai.getDate();
                        break;
                    case "!":
                        ai = new Date((al("!") - this._ticksTo1970) / 10000);
                        U = ai.getFullYear();
                        ak = ai.getMonth() + 1;
                        ae = ai.getDate();
                        break;
                    case "'":
                        if (Z("'")) {
                            ab()
                        } else {
                            ad = true
                        }
                        break;
                    default:
                        ab()
                    }
                }
            }
            if (ag < aa.length) {
                Q = aa.substr(ag);
                if (!/^\s+/.test(Q)) {
                    throw "Extra/unparsed characters found in date: " + Q
                }
            }
            if (U === -1) {
                U = new Date().getFullYear()
            } else {
                if (U < 100) {
                    U += new Date().getFullYear() - new Date().getFullYear() % 100 + (U <= R ? 0 : -100)
                }
            }
            if (X > -1) {
                ak = 1;
                ae = X;
                do {
                    ac = this._getDaysInMonth(U, ak - 1);
                    if (ae <= ac) {
                        break
                    }
                    ak++;
                    ae -= ac
                } while ( true )
            }
            ai = this._daylightSavingAdjust(new Date(U, ak - 1, ae));
            if (ai.getFullYear() !== U || ai.getMonth() + 1 !== ak || ai.getDate() !== ae) {
                throw "Invalid date"
            }
            return ai
        },
        ATOM: "yy-mm-dd",
        COOKIE: "D, dd M yy",
        ISO_8601: "yy-mm-dd",
        RFC_822: "D, d M y",
        RFC_850: "DD, dd-M-y",
        RFC_1036: "D, d M y",
        RFC_1123: "D, d M yy",
        RFC_2822: "D, d M yy",
        RSS: "D, d M y",
        TICKS: "!",
        TIMESTAMP: "@",
        W3C: "yy-mm-dd",
        _ticksTo1970: (((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) + Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000),
        formatDate: function(Y, S, T) {
            if (!S) {
                return ""
            }
            var aa, ab = (T ? T.dayNamesShort: null) || this._defaults.dayNamesShort,
            Q = (T ? T.dayNames: null) || this._defaults.dayNames,
            W = (T ? T.monthNamesShort: null) || this._defaults.monthNamesShort,
            U = (T ? T.monthNames: null) || this._defaults.monthNames,
            Z = function(ac) {
                var ad = (aa + 1 < Y.length && Y.charAt(aa + 1) === ac);
                if (ad) {
                    aa++
                }
                return ad
            },
            P = function(ae, af, ac) {
                var ad = "" + af;
                if (Z(ae)) {
                    while (ad.length < ac) {
                        ad = "0" + ad
                    }
                }
                return ad
            },
            V = function(ac, ae, ad, af) {
                return (Z(ac) ? af[ae] : ad[ae])
            },
            R = "",
            X = false;
            if (S) {
                for (aa = 0; aa < Y.length; aa++) {
                    if (X) {
                        if (Y.charAt(aa) === "'" && !Z("'")) {
                            X = false
                        } else {
                            R += Y.charAt(aa)
                        }
                    } else {
                        switch (Y.charAt(aa)) {
                        case "d":
                            R += P("d", S.getDate(), 2);
                            break;
                        case "D":
                            R += V("D", S.getDay(), ab, Q);
                            break;
                        case "o":
                            R += P("o", Math.round((new Date(S.getFullYear(), S.getMonth(), S.getDate()).getTime() - new Date(S.getFullYear(), 0, 0).getTime()) / 86400000), 3);
                            break;
                        case "m":
                            R += P("m", S.getMonth() + 1, 2);
                            break;
                        case "M":
                            R += V("M", S.getMonth(), W, U);
                            break;
                        case "y":
                            R += (Z("y") ? S.getFullYear() : (S.getYear() % 100 < 10 ? "0": "") + S.getYear() % 100);
                            break;
                        case "@":
                            R += S.getTime();
                            break;
                        case "!":
                            R += S.getTime() * 10000 + this._ticksTo1970;
                            break;
                        case "'":
                            if (Z("'")) {
                                R += "'"
                            } else {
                                X = true
                            }
                            break;
                        default:
                            R += Y.charAt(aa)
                        }
                    }
                }
            }
            return R
        },
        _possibleChars: function(T) {
            var S, R = "",
            Q = false,
            P = function(U) {
                var V = (S + 1 < T.length && T.charAt(S + 1) === U);
                if (V) {
                    S++
                }
                return V
            };
            for (S = 0; S < T.length; S++) {
                if (Q) {
                    if (T.charAt(S) === "'" && !P("'")) {
                        Q = false
                    } else {
                        R += T.charAt(S)
                    }
                } else {
                    switch (T.charAt(S)) {
                    case "d":
                    case "m":
                    case "y":
                    case "@":
                        R += "0123456789";
                        break;
                    case "D":
                    case "M":
                        return null;
                    case "'":
                        if (P("'")) {
                            R += "'"
                        } else {
                            Q = true
                        }
                        break;
                    default:
                        R += T.charAt(S)
                    }
                }
            }
            return R
        },
        _get: function(Q, P) {
            return Q.settings[P] !== undefined ? Q.settings[P] : this._defaults[P]
        },
        _setDateFromField: function(U, R) {
            if (U.input.val() === U.lastVal) {
                return
            }
            var P = this._get(U, "dateFormat"),
            W = U.lastVal = U.input ? U.input.val() : null;
            W = W ? (/^\d{4}-\d{2}$/g.test(W) ? (W + "-01") : W) : null;
            var V = this._getDefaultDate(U),
            Q = V,
            S = this._getFormatConfig(U);
            try {
                Q = this.parseDate((P === "yy-mm" ? "yy-mm-dd": P), W, S) || V
            } catch(T) {
                W = (R ? "": W)
            }
            U.selectedDay = Q.getDate();
            U.drawMonth = U.selectedMonth = Q.getMonth();
            U.drawYear = U.selectedYear = Q.getFullYear();
            U.currentDay = (W ? Q.getDate() : 0);
            U.currentMonth = (W ? Q.getMonth() : 0);
            U.currentYear = (W ? Q.getFullYear() : 0);
            this._adjustInstDate(U)
        },
        _getDefaultDate: function(P) {
            return this._restrictMinMax(P, this._determineDate(P, this._get(P, "defaultDate"), new Date()))
        },
        _determineDate: function(T, Q, U) {
            var S = function(W) {
                var V = new Date();
                V.setDate(V.getDate() + W);
                return V
            },
            R = function(ac) {
                try {
                    return z.datepicker.parseDate(z.datepicker._get(T, "dateFormat"), ac, z.datepicker._getFormatConfig(T))
                } catch(ab) {}
                var W = (ac.toLowerCase().match(/^c/) ? z.datepicker._getDate(T) : null) || new Date(),
                X = W.getFullYear(),
                aa = W.getMonth(),
                V = W.getDate(),
                Z = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,
                Y = Z.exec(ac);
                while (Y) {
                    switch (Y[2] || "d") {
                    case "d":
                    case "D":
                        V += parseInt(Y[1], 10);
                        break;
                    case "w":
                    case "W":
                        V += parseInt(Y[1], 10) * 7;
                        break;
                    case "m":
                    case "M":
                        aa += parseInt(Y[1], 10);
                        V = Math.min(V, z.datepicker._getDaysInMonth(X, aa));
                        break;
                    case "y":
                    case "Y":
                        X += parseInt(Y[1], 10);
                        V = Math.min(V, z.datepicker._getDaysInMonth(X, aa));
                        break
                    }
                    Y = Z.exec(ac)
                }
                return new Date(X, aa, V)
            },
            P = (Q == null || Q === "" ? U: (typeof Q === "string" ? R(Q) : (typeof Q === "number" ? (isNaN(Q) ? U: S(Q)) : new Date(Q.getTime()))));
            P = (P && P.toString() === "Invalid Date" ? U: P);
            if (P) {
                P.setHours(0);
                P.setMinutes(0);
                P.setSeconds(0);
                P.setMilliseconds(0)
            }
            return this._daylightSavingAdjust(P)
        },
        _daylightSavingAdjust: function(P) {
            if (!P) {
                return null
            }
            P.setHours(P.getHours() > 12 ? P.getHours() + 2 : 0);
            return P
        },
        _setDate: function(V, S, U) {
            var P = !S,
            R = V.selectedMonth,
            T = V.selectedYear,
            Q = this._restrictMinMax(V, this._determineDate(V, S, new Date()));
            V.selectedDay = V.currentDay = Q.getDate();
            V.drawMonth = V.selectedMonth = V.currentMonth = Q.getMonth();
            V.drawYear = V.selectedYear = V.currentYear = Q.getFullYear();
            if ((R !== V.selectedMonth || T !== V.selectedYear) && !U) {
                this._notifyChange(V)
            }
            this._adjustInstDate(V);
            if (V.input) {
                V.input.val(P ? "": this._formatDate(V))
            }
        },
        _getDate: function(Q) {
            var P = (!Q.currentYear || (Q.input && Q.input.val() === "") ? null: this._daylightSavingAdjust(new Date(Q.currentYear, Q.currentMonth, Q.currentDay)));
            return P
        },
        _attachHandlers: function(Q) {
            var P = this._get(Q, "stepMonths"),
            R = Q.id;
            Q.dpDiv.find("[data-handler]").map(function() {
                var S = {
                    prev: function() {
                        z.datepicker._adjustDate(R, -P, "M")
                    },
                    next: function() {
                        z.datepicker._adjustDate(R, +P, "M")
                    },
                    hide: function() {
                        z.datepicker._hideDatepicker()
                    },
                    today: function() {
                        z.datepicker._gotoToday(R)
                    },
                    selectDay: function() {
                        z.datepicker._selectDay(R, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this);
                        return false
                    },
                    selectMonth: function() {
                        z.datepicker._selectMonthYear(R, this, "M");
                        return false
                    },
                    selectYear: function() {
                        z.datepicker._selectMonthYear(R, this, "Y");
                        return false
                    }
                };
                z(this).bind(this.getAttribute("data-event"), S[this.getAttribute("data-handler")])
            })
        },
        _generateHTML: function(aG) {
            var ai, ah, aB, at, T, aK, aE, ax, aN, aq, aR, aa, ac, ab, Q, aJ, Y, al, aM, az, aS, ak, ap, Z, U, aC, av, ay, aw, X, an, ad, aF, aI, S, aL, aP, au, ae, aH = new Date(),
            aj = this._daylightSavingAdjust(new Date(aH.getFullYear(), aH.getMonth(), aH.getDate())),
            aO = this._get(aG, "isRTL"),
            aQ = this._get(aG, "showButtonPanel"),
            aA = this._get(aG, "hideIfNoPrevNext"),
            ao = this._get(aG, "navigationAsDateFormat"),
            af = this._getNumberOfMonths(aG),
            W = this._get(aG, "showCurrentAtPos"),
            ar = this._get(aG, "stepMonths"),
            am = (af[0] !== 1 || af[1] !== 1),
            R = this._daylightSavingAdjust((!aG.currentDay ? new Date(9999, 9, 9) : new Date(aG.currentYear, aG.currentMonth, aG.currentDay))),
            V = this._getMinMaxDate(aG, "min"),
            ag = this._getMinMaxDate(aG, "max"),
            P = aG.drawMonth - W,
            aD = aG.drawYear;
            if (P < 0) {
                P += 12;
                aD--
            }
            if (ag) {
                ai = this._daylightSavingAdjust(new Date(ag.getFullYear(), ag.getMonth() - (af[0] * af[1]) + 1, ag.getDate()));
                ai = (V && ai < V ? V: ai);
                while (this._daylightSavingAdjust(new Date(aD, P, 1)) > ai) {
                    P--;
                    if (P < 0) {
                        P = 11;
                        aD--
                    }
                }
            }
            aG.drawMonth = P;
            aG.drawYear = aD;
            ah = this._get(aG, "prevText");
            ah = (!ao ? ah: this.formatDate(ah, this._daylightSavingAdjust(new Date(aD, P - ar, 1)), this._getFormatConfig(aG)));
            aB = (this._canAdjustMonth(aG, -1, aD, P) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + ah + "'><span class='ui-icon ui-icon-circle-triangle-" + (aO ? "e": "w") + "'>" + ah + "</span></a>": (aA ? "": "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + ah + "'><span class='ui-icon ui-icon-circle-triangle-" + (aO ? "e": "w") + "'>" + ah + "</span></a>"));
            at = this._get(aG, "nextText");
            at = (!ao ? at: this.formatDate(at, this._daylightSavingAdjust(new Date(aD, P + ar, 1)), this._getFormatConfig(aG)));
            T = (this._canAdjustMonth(aG, +1, aD, P) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + at + "'><span class='ui-icon ui-icon-circle-triangle-" + (aO ? "w": "e") + "'>" + at + "</span></a>": (aA ? "": "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + at + "'><span class='ui-icon ui-icon-circle-triangle-" + (aO ? "w": "e") + "'>" + at + "</span></a>"));
            aK = this._get(aG, "currentText");
            aE = (this._get(aG, "gotoCurrent") && aG.currentDay ? R: aj);
            aK = (!ao ? aK: this.formatDate(aK, aE, this._getFormatConfig(aG)));
            ax = (!aG.inline ? "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(aG, "closeText") + "</button>": "");
            aN = (aQ) ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (aO ? ax: "") + (this._isInRange(aG, aE) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + aK + "</button>": "") + (aO ? "": ax) + "</div>": "";
            aq = parseInt(this._get(aG, "firstDay"), 10);
            aq = (isNaN(aq) ? 0 : aq);
            aR = this._get(aG, "showWeek");
            aa = this._get(aG, "dayNames");
            ac = this._get(aG, "dayNamesMin");
            ab = this._get(aG, "monthNames");
            Q = this._get(aG, "monthNamesShort");
            aJ = this._get(aG, "beforeShowDay");
            Y = this._get(aG, "showOtherMonths");
            al = this._get(aG, "selectOtherMonths");
            aM = this._getDefaultDate(aG);
            az = "";
            aS;
            for (ak = 0; ak < af[0]; ak++) {
                ap = "";
                this.maxRows = 4;
                for (Z = 0; Z < af[1]; Z++) {
                    U = this._daylightSavingAdjust(new Date(aD, P, aG.selectedDay));
                    aC = " ui-corner-all";
                    av = "";
                    if (am) {
                        av += "<div class='ui-datepicker-group";
                        if (af[1] > 1) {
                            switch (Z) {
                            case 0:
                                av += " ui-datepicker-group-first";
                                aC = " ui-corner-" + (aO ? "right": "left");
                                break;
                            case af[1] - 1 : av += " ui-datepicker-group-last";
                                aC = " ui-corner-" + (aO ? "left": "right");
                                break;
                            default:
                                av += " ui-datepicker-group-middle";
                                aC = "";
                                break
                            }
                        }
                        av += "'>"
                    }
                    av += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + aC + "'>" + (/all|left/.test(aC) && ak === 0 ? (aO ? T: aB) : "") + (/all|right/.test(aC) && ak === 0 ? (aO ? aB: T) : "") + this._generateMonthYearHeader(aG, P, aD, V, ag, ak > 0 || Z > 0, ab, Q) + "</div><table class='ui-datepicker-calendar" + (this._get(aG, "isSelMon") ? " ui-datepicker-isSelMon": "") + "'><thead><tr>";
                    ay = (aR ? "<th class='ui-datepicker-week-col'>" + this._get(aG, "weekHeader") + "</th>": "");
                    for (aS = 0; aS < 7; aS++) {
                        aw = (aS + aq) % 7;
                        ay += "<th scope='col'" + ((aS + aq + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'": "") + "><span title='" + aa[aw] + "'>" + ac[aw] + "</span></th>"
                    }
                    av += ay + "</tr></thead><tbody>";
                    X = this._getDaysInMonth(aD, P);
                    if (aD === aG.selectedYear && P === aG.selectedMonth) {
                        aG.selectedDay = Math.min(aG.selectedDay, X)
                    }
                    an = (this._getFirstDayOfMonth(aD, P) - aq + 7) % 7;
                    ad = Math.ceil((an + X) / 7);
                    aF = (am ? this.maxRows > ad ? this.maxRows: ad: ad);
                    this.maxRows = aF;
                    aI = this._daylightSavingAdjust(new Date(aD, P, 1 - an));
                    for (S = 0; S < aF; S++) {
                        av += "<tr>";
                        aL = (!aR ? "": "<td class='ui-datepicker-week-col'>" + this._get(aG, "calculateWeek")(aI) + "</td>");
                        for (aS = 0; aS < 7; aS++) {
                            aP = (aJ ? aJ.apply((aG.input ? aG.input[0] : null), [aI]) : [true, ""]);
                            au = (aI.getMonth() !== P);
                            ae = (au && !al) || !aP[0] || (V && aI < V) || (ag && aI > ag);
                            aL += "<td class='" + ((aS + aq + 6) % 7 >= 5 ? " ui-datepicker-week-end": "") + (au ? " ui-datepicker-other-month": "") + ((aI.getTime() === U.getTime() && P === aG.selectedMonth && aG._keyEvent) || (aM.getTime() === aI.getTime() && aM.getTime() === U.getTime()) ? " " + this._dayOverClass: "") + (ae ? " " + this._unselectableClass + " ui-state-disabled": "") + (au && !Y ? "": " " + aP[1] + (aI.getTime() === R.getTime() ? " " + this._currentClass: "") + (aI.getTime() === aj.getTime() ? " ui-datepicker-today": "")) + "'" + ((!au || Y) && aP[2] ? " title='" + aP[2].replace(/'/g, "&#39;") + "'": "") + (ae ? "": " data-handler='selectDay' data-event='click' data-month='" + aI.getMonth() + "' data-year='" + aI.getFullYear() + "'") + ">" + (au && !Y ? "&#xa0;": (ae ? "<span class='ui-state-default'>" + aI.getDate() + "</span>": "<a class='ui-state-default" + (aI.getTime() === aj.getTime() ? " ui-state-highlight": "") + (aI.getTime() === R.getTime() ? " ui-state-active": "") + (au ? " ui-priority-secondary": "") + "' href='#'>" + aI.getDate() + "</a>")) + "</td>";
                            aI.setDate(aI.getDate() + 1);
                            aI = this._daylightSavingAdjust(aI)
                        }
                        av += aL + "</tr>"
                    }
                    P++;
                    if (P > 11) {
                        P = 0;
                        aD++
                    }
                    av += "</tbody></table>" + (am ? "</div>" + ((af[0] > 0 && Z === af[1] - 1) ? "<div class='ui-datepicker-row-break'></div>": "") : "");
                    ap += av
                }
                az += ap
            }
            az += aN;
            aG._keyEvent = false;
            return az
        },
        _generateMonthYearHeader: function(T, R, ab, V, Z, ac, X, P) {
            var ag, Q, ah, ae, U, ad, aa, W, S = this._get(T, "changeMonth"),
            ai = this._get(T, "changeYear"),
            aj = this._get(T, "showMonthAfterYear"),
            Y = "<div class='ui-datepicker-title'>",
            af = "";
            if (ac || !S) {
                af += "<span class='ui-datepicker-month'>" + X[R] + "</span>"
            } else {
                ag = (V && V.getFullYear() === ab);
                Q = (Z && Z.getFullYear() === ab);
                af += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>";
                for (ah = 0; ah < 12; ah++) {
                    if ((!ag || ah >= V.getMonth()) && (!Q || ah <= Z.getMonth())) {
                        af += "<option value='" + ah + "'" + (ah === R ? " selected='selected'": "") + ">" + P[ah] + "</option>"
                    }
                }
                af += "</select>"
            }
            if (!aj) {
                Y += af + (ac || !(S && ai) ? "&#xa0;": "")
            }
            if (!T.yearshtml) {
                T.yearshtml = "";
                if (ac || !ai) {
                    Y += "<span class='ui-datepicker-year'>" + ab + "</span>"
                } else {
                    ae = this._get(T, "yearRange").split(":");
                    U = new Date().getFullYear();
                    ad = function(al) {
                        var ak = (al.match(/c[+\-].*/) ? ab + parseInt(al.substring(1), 10) : (al.match(/[+\-].*/) ? U + parseInt(al, 10) : parseInt(al, 10)));
                        return (isNaN(ak) ? U: ak)
                    };
                    aa = ad(ae[0]);
                    W = Math.max(aa, ad(ae[1] || ""));
                    aa = (V ? Math.max(aa, V.getFullYear()) : aa);
                    W = (Z ? Math.min(W, Z.getFullYear()) : W);
                    T.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>";
                    for (; aa <= W; aa++) {
                        T.yearshtml += "<option value='" + aa + "'" + (aa === ab ? " selected='selected'": "") + ">" + aa + "</option>"
                    }
                    T.yearshtml += "</select>";
                    Y += T.yearshtml;
                    T.yearshtml = null
                }
            }
            Y += this._get(T, "yearSuffix");
            if (aj) {
                Y += (ac || !(S && ai) ? "&#xa0;": "") + af
            }
            Y += "</div>";
            return Y
        },
        _adjustInstDate: function(S, V, U) {
            var R = S.drawYear + (U === "Y" ? V: 0),
            T = S.drawMonth + (U === "M" ? V: 0),
            P = Math.min(S.selectedDay, this._getDaysInMonth(R, T)) + (U === "D" ? V: 0),
            Q = this._restrictMinMax(S, this._daylightSavingAdjust(new Date(R, T, P)));
            S.selectedDay = Q.getDate();
            S.drawMonth = S.selectedMonth = Q.getMonth();
            S.drawYear = S.selectedYear = Q.getFullYear();
            if (U === "M" || U === "Y") {
                this._notifyChange(S)
            }
        },
        _restrictMinMax: function(S, Q) {
            var R = this._getMinMaxDate(S, "min"),
            T = this._getMinMaxDate(S, "max"),
            P = (R && Q < R ? R: Q);
            return (T && P > T ? T: P)
        },
        _notifyChange: function(Q) {
            var P = this._get(Q, "onChangeMonthYear");
            if (P) {
                P.apply((Q.input ? Q.input[0] : null), [Q.selectedYear, Q.selectedMonth + 1, Q])
            }
        },
        _getNumberOfMonths: function(Q) {
            var P = this._get(Q, "numberOfMonths");
            return (P == null ? [1, 1] : (typeof P === "number" ? [1, P] : P))
        },
        _getMinMaxDate: function(Q, P) {
            return this._determineDate(Q, this._get(Q, P + "Date"), null)
        },
        _getDaysInMonth: function(P, Q) {
            return 32 - this._daylightSavingAdjust(new Date(P, Q, 32)).getDate()
        },
        _getFirstDayOfMonth: function(P, Q) {
            return new Date(P, Q, 1).getDay()
        },
        _canAdjustMonth: function(S, U, R, T) {
            var P = this._getNumberOfMonths(S),
            Q = this._daylightSavingAdjust(new Date(R, T + (U < 0 ? U: P[0] * P[1]), 1));
            if (U < 0) {
                Q.setDate(this._getDaysInMonth(Q.getFullYear(), Q.getMonth()))
            }
            return this._isInRange(S, Q)
        },
        _isInRange: function(T, R) {
            var Q, W, S = this._getMinMaxDate(T, "min"),
            P = this._getMinMaxDate(T, "max"),
            X = null,
            U = null,
            V = this._get(T, "yearRange");
            if (V) {
                Q = V.split(":");
                W = new Date().getFullYear();
                X = parseInt(Q[0], 10);
                U = parseInt(Q[1], 10);
                if (Q[0].match(/[+\-].*/)) {
                    X += W
                }
                if (Q[1].match(/[+\-].*/)) {
                    U += W
                }
            }
            return ((!S || R.getTime() >= S.getTime()) && (!P || R.getTime() <= P.getTime()) && (!X || R.getFullYear() >= X) && (!U || R.getFullYear() <= U))
        },
        _getFormatConfig: function(P) {
            var Q = this._get(P, "shortYearCutoff");
            Q = (typeof Q !== "string" ? Q: new Date().getFullYear() % 100 + parseInt(Q, 10));
            return {
                shortYearCutoff: Q,
                dayNamesShort: this._get(P, "dayNamesShort"),
                dayNames: this._get(P, "dayNames"),
                monthNamesShort: this._get(P, "monthNamesShort"),
                monthNames: this._get(P, "monthNames")
            }
        },
        _formatDate: function(S, P, T, R) {
            if (!P) {
                S.currentDay = S.selectedDay;
                S.currentMonth = S.selectedMonth;
                S.currentYear = S.selectedYear
            }
            var Q = (P ? (typeof P === "object" ? P: this._daylightSavingAdjust(new Date(R, T, P))) : this._daylightSavingAdjust(new Date(S.currentYear, S.currentMonth, S.currentDay)));
            return this.formatDate(this._get(S, "dateFormat"), Q, this._getFormatConfig(S))
        }
    });
    function f(Q) {
        var P = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
        return Q.delegate(P, "mouseout",
        function() {
            z(this).removeClass("ui-state-hover");
            if (this.className.indexOf("ui-datepicker-prev") !== -1) {
                z(this).removeClass("ui-datepicker-prev-hover")
            }
            if (this.className.indexOf("ui-datepicker-next") !== -1) {
                z(this).removeClass("ui-datepicker-next-hover")
            }
        }).delegate(P, "mouseover", k)
    }
    function k() {
        if (!z.datepicker._isDisabledDatepicker(i.inline ? i.dpDiv.parent()[0] : i.input[0])) {
            z(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");
            z(this).addClass("ui-state-hover");
            if (this.className.indexOf("ui-datepicker-prev") !== -1) {
                z(this).addClass("ui-datepicker-prev-hover")
            }
            if (this.className.indexOf("ui-datepicker-next") !== -1) {
                z(this).addClass("ui-datepicker-next-hover")
            }
        }
    }
    function q(R, Q) {
        z.extend(R, Q);
        for (var P in Q) {
            if (Q[P] == null) {
                R[P] = Q[P]
            }
        }
        return R
    }
    z.fn.datepicker = function(Q) {
        if (!this.length) {
            return this
        }
        if (!z.datepicker.initialized) {
            z(document).mousedown(z.datepicker._checkExternalClick);
            z.datepicker.initialized = true
        }
        if (z("#" + z.datepicker._mainDivId).length === 0) {
            z("body").append(z.datepicker.dpDiv)
        }
        var P = Array.prototype.slice.call(arguments, 1);
        if (typeof Q === "string" && (Q === "isDisabled" || Q === "getDate" || Q === "widget")) {
            return z.datepicker["_" + Q + "Datepicker"].apply(z.datepicker, [this[0]].concat(P))
        }
        if (Q === "option" && arguments.length === 2 && typeof arguments[1] === "string") {
            return z.datepicker["_" + Q + "Datepicker"].apply(z.datepicker, [this[0]].concat(P))
        }
        return this.each(function() {
            typeof Q === "string" ? z.datepicker["_" + Q + "Datepicker"].apply(z.datepicker, [this].concat(P)) : z.datepicker._attachDatepicker(this, Q)
        })
    };
    z.datepicker = new O();
    z.datepicker.initialized = false;
    z.datepicker.uuid = new Date().getTime();
    z.datepicker.version = "1.11.4";
    var v = z.datepicker;
    /*!
     * jQuery UI Effects 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/category/effects-core/
     */
    ;
    var h = "ui-effects-",
    m = z;
    z.effects = {
        effect: {}
    };
    /*!
     * jQuery Color Animations v2.1.2
     * https://github.com/jquery/jquery-color
     *
     * Copyright 2014 jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * Date: Wed Jan 16 08:47:09 2013 -0600
     */
    (function(ad, S) {
        var Z = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",
        W = /^([\-+])=\s*(\d+\.?\d*)/,
        V = [{
            re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
            parse: function(ae) {
                return [ae[1], ae[2], ae[3], ae[4]]
            }
        },
        {
            re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
            parse: function(ae) {
                return [ae[1] * 2.55, ae[2] * 2.55, ae[3] * 2.55, ae[4]]
            }
        },
        {
            re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
            parse: function(ae) {
                return [parseInt(ae[1], 16), parseInt(ae[2], 16), parseInt(ae[3], 16)]
            }
        },
        {
            re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
            parse: function(ae) {
                return [parseInt(ae[1] + ae[1], 16), parseInt(ae[2] + ae[2], 16), parseInt(ae[3] + ae[3], 16)]
            }
        },
        {
            re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
            space: "hsla",
            parse: function(ae) {
                return [ae[1], ae[2] / 100, ae[3] / 100, ae[4]]
            }
        }],
        T = ad.Color = function(af, ag, ae, ah) {
            return new ad.Color.fn.parse(af, ag, ae, ah)
        },
        Y = {
            rgba: {
                props: {
                    red: {
                        idx: 0,
                        type: "byte"
                    },
                    green: {
                        idx: 1,
                        type: "byte"
                    },
                    blue: {
                        idx: 2,
                        type: "byte"
                    }
                }
            },
            hsla: {
                props: {
                    hue: {
                        idx: 0,
                        type: "degrees"
                    },
                    saturation: {
                        idx: 1,
                        type: "percent"
                    },
                    lightness: {
                        idx: 2,
                        type: "percent"
                    }
                }
            }
        },
        ac = {
            "byte": {
                floor: true,
                max: 255
            },
            percent: {
                max: 1
            },
            degrees: {
                mod: 360,
                floor: true
            }
        },
        ab = T.support = {},
        Q = ad("<p>")[0],
        P,
        aa = ad.each;
        Q.style.cssText = "background-color:rgba(1,1,1,.5)";
        ab.rgba = Q.style.backgroundColor.indexOf("rgba") > -1;
        aa(Y,
        function(ae, af) {
            af.cache = "_" + ae;
            af.props.alpha = {
                idx: 3,
                type: "percent",
                def: 1
            }
        });
        function X(af, ah, ag) {
            var ae = ac[ah.type] || {};
            if (af == null) {
                return (ag || !ah.def) ? null: ah.def
            }
            af = ae.floor ? ~~af: parseFloat(af);
            if (isNaN(af)) {
                return ah.def
            }
            if (ae.mod) {
                return (af + ae.mod) % ae.mod
            }
            return 0 > af ? 0 : ae.max < af ? ae.max: af
        }
        function U(ae) {
            var ag = T(),
            af = ag._rgba = [];
            ae = ae.toLowerCase();
            aa(V,
            function(al, am) {
                var aj, ak = am.re.exec(ae),
                ai = ak && am.parse(ak),
                ah = am.space || "rgba";
                if (ai) {
                    aj = ag[ah](ai);
                    ag[Y[ah].cache] = aj[Y[ah].cache];
                    af = ag._rgba = aj._rgba;
                    return false
                }
            });
            if (af.length) {
                if (af.join() === "0,0,0,0") {
                    ad.extend(af, P.transparent)
                }
                return ag
            }
            return P[ae]
        }
        T.fn = ad.extend(T.prototype, {
            parse: function(ak, ai, ae, aj) {
                if (ak === S) {
                    this._rgba = [null, null, null, null];
                    return this
                }
                if (ak.jquery || ak.nodeType) {
                    ak = ad(ak).css(ai);
                    ai = S
                }
                var ah = this,
                ag = ad.type(ak),
                af = this._rgba = [];
                if (ai !== S) {
                    ak = [ak, ai, ae, aj];
                    ag = "array"
                }
                if (ag === "string") {
                    return this.parse(U(ak) || P._default)
                }
                if (ag === "array") {
                    aa(Y.rgba.props,
                    function(al, am) {
                        af[am.idx] = X(ak[am.idx], am)
                    });
                    return this
                }
                if (ag === "object") {
                    if (ak instanceof T) {
                        aa(Y,
                        function(al, am) {
                            if (ak[am.cache]) {
                                ah[am.cache] = ak[am.cache].slice()
                            }
                        })
                    } else {
                        aa(Y,
                        function(am, an) {
                            var al = an.cache;
                            aa(an.props,
                            function(ao, ap) {
                                if (!ah[al] && an.to) {
                                    if (ao === "alpha" || ak[ao] == null) {
                                        return
                                    }
                                    ah[al] = an.to(ah._rgba)
                                }
                                ah[al][ap.idx] = X(ak[ao], ap, true)
                            });
                            if (ah[al] && ad.inArray(null, ah[al].slice(0, 3)) < 0) {
                                ah[al][3] = 1;
                                if (an.from) {
                                    ah._rgba = an.from(ah[al])
                                }
                            }
                        })
                    }
                    return this
                }
            },
            is: function(ag) {
                var ae = T(ag),
                ah = true,
                af = this;
                aa(Y,
                function(ai, ak) {
                    var al, aj = ae[ak.cache];
                    if (aj) {
                        al = af[ak.cache] || ak.to && ak.to(af._rgba) || [];
                        aa(ak.props,
                        function(am, an) {
                            if (aj[an.idx] != null) {
                                ah = (aj[an.idx] === al[an.idx]);
                                return ah
                            }
                        })
                    }
                    return ah
                });
                return ah
            },
            _space: function() {
                var ae = [],
                af = this;
                aa(Y,
                function(ag, ah) {
                    if (af[ah.cache]) {
                        ae.push(ag)
                    }
                });
                return ae.pop()
            },
            transition: function(af, al) {
                var ag = T(af),
                ah = ag._space(),
                ai = Y[ah],
                aj = this.alpha() === 0 ? T("transparent") : this,
                ak = aj[ai.cache] || ai.to(aj._rgba),
                ae = ak.slice();
                ag = ag[ai.cache];
                aa(ai.props,
                function(ap, ar) {
                    var ao = ar.idx,
                    an = ak[ao],
                    am = ag[ao],
                    aq = ac[ar.type] || {};
                    if (am === null) {
                        return
                    }
                    if (an === null) {
                        ae[ao] = am
                    } else {
                        if (aq.mod) {
                            if (am - an > aq.mod / 2) {
                                an += aq.mod
                            } else {
                                if (an - am > aq.mod / 2) {
                                    an -= aq.mod
                                }
                            }
                        }
                        ae[ao] = X((am - an) * al + an, ar)
                    }
                });
                return this[ah](ae)
            },
            blend: function(ah) {
                if (this._rgba[3] === 1) {
                    return this
                }
                var ag = this._rgba.slice(),
                af = ag.pop(),
                ae = T(ah)._rgba;
                return T(ad.map(ag,
                function(ai, aj) {
                    return (1 - af) * ae[aj] + af * ai
                }))
            },
            toRgbaString: function() {
                var af = "rgba(",
                ae = ad.map(this._rgba,
                function(ag, ah) {
                    return ag == null ? (ah > 2 ? 1 : 0) : ag
                });
                if (ae[3] === 1) {
                    ae.pop();
                    af = "rgb("
                }
                return af + ae.join() + ")"
            },
            toHslaString: function() {
                var af = "hsla(",
                ae = ad.map(this.hsla(),
                function(ag, ah) {
                    if (ag == null) {
                        ag = ah > 2 ? 1 : 0
                    }
                    if (ah && ah < 3) {
                        ag = Math.round(ag * 100) + "%"
                    }
                    return ag
                });
                if (ae[3] === 1) {
                    ae.pop();
                    af = "hsl("
                }
                return af + ae.join() + ")"
            },
            toHexString: function(ae) {
                var af = this._rgba.slice(),
                ag = af.pop();
                if (ae) {
                    af.push(~~ (ag * 255))
                }
                return "#" + ad.map(af,
                function(ah) {
                    ah = (ah || 0).toString(16);
                    return ah.length === 1 ? "0" + ah: ah
                }).join("")
            },
            toString: function() {
                return this._rgba[3] === 0 ? "transparent": this.toRgbaString()
            }
        });
        T.fn.parse.prototype = T.fn;
        function R(ag, af, ae) {
            ae = (ae + 1) % 1;
            if (ae * 6 < 1) {
                return ag + (af - ag) * ae * 6
            }
            if (ae * 2 < 1) {
                return af
            }
            if (ae * 3 < 2) {
                return ag + (af - ag) * ((2 / 3) - ae) * 6
            }
            return ag
        }
        Y.hsla.to = function(ag) {
            if (ag[0] == null || ag[1] == null || ag[2] == null) {
                return [null, null, null, ag[3]]
            }
            var ae = ag[0] / 255,
            aj = ag[1] / 255,
            ak = ag[2] / 255,
            am = ag[3],
            al = Math.max(ae, aj, ak),
            ah = Math.min(ae, aj, ak),
            an = al - ah,
            ao = al + ah,
            af = ao * 0.5,
            ai,
            ap;
            if (ah === al) {
                ai = 0
            } else {
                if (ae === al) {
                    ai = (60 * (aj - ak) / an) + 360
                } else {
                    if (aj === al) {
                        ai = (60 * (ak - ae) / an) + 120
                    } else {
                        ai = (60 * (ae - aj) / an) + 240
                    }
                }
            }
            if (an === 0) {
                ap = 0
            } else {
                if (af <= 0.5) {
                    ap = an / ao
                } else {
                    ap = an / (2 - ao)
                }
            }
            return [Math.round(ai) % 360, ap, af, am == null ? 1 : am]
        };
        Y.hsla.from = function(ai) {
            if (ai[0] == null || ai[1] == null || ai[2] == null) {
                return [null, null, null, ai[3]]
            }
            var ah = ai[0] / 360,
            ag = ai[1],
            af = ai[2],
            ae = ai[3],
            aj = af <= 0.5 ? af * (1 + ag) : af + ag - af * ag,
            ak = 2 * af - aj;
            return [Math.round(R(ak, aj, ah + (1 / 3)) * 255), Math.round(R(ak, aj, ah) * 255), Math.round(R(ak, aj, ah - (1 / 3)) * 255), ae]
        };
        aa(Y,
        function(af, ah) {
            var ag = ah.props,
            ae = ah.cache,
            aj = ah.to,
            ai = ah.from;
            T.fn[af] = function(ao) {
                if (aj && !this[ae]) {
                    this[ae] = aj(this._rgba)
                }
                if (ao === S) {
                    return this[ae].slice()
                }
                var al, an = ad.type(ao),
                ak = (an === "array" || an === "object") ? ao: arguments,
                am = this[ae].slice();
                aa(ag,
                function(ap, ar) {
                    var aq = ak[an === "object" ? ap: ar.idx];
                    if (aq == null) {
                        aq = am[ar.idx]
                    }
                    am[ar.idx] = X(aq, ar)
                });
                if (ai) {
                    al = T(ai(am));
                    al[ae] = am;
                    return al
                } else {
                    return T(am)
                }
            };
            aa(ag,
            function(ak, al) {
                if (T.fn[ak]) {
                    return
                }
                T.fn[ak] = function(ap) {
                    var ar = ad.type(ap),
                    ao = (ak === "alpha" ? (this._hsla ? "hsla": "rgba") : af),
                    an = this[ao](),
                    aq = an[al.idx],
                    am;
                    if (ar === "undefined") {
                        return aq
                    }
                    if (ar === "function") {
                        ap = ap.call(this, aq);
                        ar = ad.type(ap)
                    }
                    if (ap == null && al.empty) {
                        return this
                    }
                    if (ar === "string") {
                        am = W.exec(ap);
                        if (am) {
                            ap = aq + parseFloat(am[2]) * (am[1] === "+" ? 1 : -1)
                        }
                    }
                    an[al.idx] = ap;
                    return this[ao](an)
                }
            })
        });
        T.hook = function(af) {
            var ae = af.split(" ");
            aa(ae,
            function(ag, ah) {
                ad.cssHooks[ah] = {
                    set: function(al, am) {
                        var aj, ak, ai = "";
                        if (am !== "transparent" && (ad.type(am) !== "string" || (aj = U(am)))) {
                            am = T(aj || am);
                            if (!ab.rgba && am._rgba[3] !== 1) {
                                ak = ah === "backgroundColor" ? al.parentNode: al;
                                while ((ai === "" || ai === "transparent") && ak && ak.style) {
                                    try {
                                        ai = ad.css(ak, "backgroundColor");
                                        ak = ak.parentNode
                                    } catch(an) {}
                                }
                                am = am.blend(ai && ai !== "transparent" ? ai: "_default")
                            }
                            am = am.toRgbaString()
                        }
                        try {
                            al.style[ah] = am
                        } catch(an) {}
                    }
                };
                ad.fx.step[ah] = function(ai) {
                    if (!ai.colorInit) {
                        ai.start = T(ai.elem, ah);
                        ai.end = T(ai.end);
                        ai.colorInit = true
                    }
                    ad.cssHooks[ah].set(ai.elem, ai.start.transition(ai.end, ai.pos))
                }
            })
        };
        T.hook(Z);
        ad.cssHooks.borderColor = {
            expand: function(af) {
                var ae = {};
                aa(["Top", "Right", "Bottom", "Left"],
                function(ah, ag) {
                    ae["border" + ag + "Color"] = af
                });
                return ae
            }
        };
        P = ad.Color.names = {
            aqua: "#00ffff",
            black: "#000000",
            blue: "#0000ff",
            fuchsia: "#ff00ff",
            gray: "#808080",
            green: "#008000",
            lime: "#00ff00",
            maroon: "#800000",
            navy: "#000080",
            olive: "#808000",
            purple: "#800080",
            red: "#ff0000",
            silver: "#c0c0c0",
            teal: "#008080",
            white: "#ffffff",
            yellow: "#ffff00",
            transparent: [null, null, null, 0],
            _default: "#ffffff"
        }
    })(m); (function() {
        var Q = ["add", "remove", "toggle"],
        R = {
            border: 1,
            borderBottom: 1,
            borderColor: 1,
            borderLeft: 1,
            borderRight: 1,
            borderTop: 1,
            borderWidth: 1,
            margin: 1,
            padding: 1
        };
        z.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"],
        function(T, U) {
            z.fx.step[U] = function(V) {
                if (V.end !== "none" && !V.setAttr || V.pos === 1 && !V.setAttr) {
                    m.style(V.elem, U, V.end);
                    V.setAttr = true
                }
            }
        });
        function S(X) {
            var U, T, V = X.ownerDocument.defaultView ? X.ownerDocument.defaultView.getComputedStyle(X, null) : X.currentStyle,
            W = {};
            if (V && V.length && V[0] && V[V[0]]) {
                T = V.length;
                while (T--) {
                    U = V[T];
                    if (typeof V[U] === "string") {
                        W[z.camelCase(U)] = V[U]
                    }
                }
            } else {
                for (U in V) {
                    if (typeof V[U] === "string") {
                        W[U] = V[U]
                    }
                }
            }
            return W
        }
        function P(T, V) {
            var X = {},
            U, W;
            for (U in V) {
                W = V[U];
                if (T[U] !== W) {
                    if (!R[U]) {
                        if (z.fx.step[U] || !isNaN(parseFloat(W))) {
                            X[U] = W
                        }
                    }
                }
            }
            return X
        }
        if (!z.fn.addBack) {
            z.fn.addBack = function(T) {
                return this.add(T == null ? this.prevObject: this.prevObject.filter(T))
            }
        }
        z.effects.animateClass = function(T, U, X, W) {
            var V = z.speed(U, X, W);
            return this.queue(function() {
                var aa = z(this),
                Y = aa.attr("class") || "",
                Z,
                ab = V.children ? aa.find("*").addBack() : aa;
                ab = ab.map(function() {
                    var ac = z(this);
                    return {
                        el: ac,
                        start: S(this)
                    }
                });
                Z = function() {
                    z.each(Q,
                    function(ac, ad) {
                        if (T[ad]) {
                            aa[ad + "Class"](T[ad])
                        }
                    })
                };
                Z();
                ab = ab.map(function() {
                    this.end = S(this.el[0]);
                    this.diff = P(this.start, this.end);
                    return this
                });
                aa.attr("class", Y);
                ab = ab.map(function() {
                    var ae = this,
                    ac = z.Deferred(),
                    ad = z.extend({},
                    V, {
                        queue: false,
                        complete: function() {
                            ac.resolve(ae)
                        }
                    });
                    this.el.animate(this.diff, ad);
                    return ac.promise()
                });
                z.when.apply(z, ab.get()).done(function() {
                    Z();
                    z.each(arguments,
                    function() {
                        var ac = this.el;
                        z.each(this.diff,
                        function(ad) {
                            ac.css(ad, "")
                        })
                    });
                    V.complete.call(aa[0])
                })
            })
        };
        z.fn.extend({
            addClass: (function(T) {
                return function(V, U, X, W) {
                    return U ? z.effects.animateClass.call(this, {
                        add: V
                    },
                    U, X, W) : T.apply(this, arguments)
                }
            })(z.fn.addClass),
            removeClass: (function(T) {
                return function(V, U, X, W) {
                    return arguments.length > 1 ? z.effects.animateClass.call(this, {
                        remove: V
                    },
                    U, X, W) : T.apply(this, arguments)
                }
            })(z.fn.removeClass),
            toggleClass: (function(T) {
                return function(W, V, U, Y, X) {
                    if (typeof V === "boolean" || V === undefined) {
                        if (!U) {
                            return T.apply(this, arguments)
                        } else {
                            return z.effects.animateClass.call(this, (V ? {
                                add: W
                            }: {
                                remove: W
                            }), U, Y, X)
                        }
                    } else {
                        return z.effects.animateClass.call(this, {
                            toggle: W
                        },
                        V, U, Y)
                    }
                }
            })(z.fn.toggleClass),
            switchClass: function(T, V, U, X, W) {
                return z.effects.animateClass.call(this, {
                    add: V,
                    remove: T
                },
                U, X, W)
            }
        })
    })(); (function() {
        z.extend(z.effects, {
            version: "1.11.4",
            save: function(S, T) {
                for (var R = 0; R < T.length; R++) {
                    if (T[R] !== null) {
                        S.data(h + T[R], S[0].style[T[R]])
                    }
                }
            },
            restore: function(S, U) {
                var T, R;
                for (R = 0; R < U.length; R++) {
                    if (U[R] !== null) {
                        T = S.data(h + U[R]);
                        if (T === undefined) {
                            T = ""
                        }
                        S.css(U[R], T)
                    }
                }
            },
            setMode: function(R, S) {
                if (S === "toggle") {
                    S = R.is(":hidden") ? "show": "hide"
                }
                return S
            },
            getBaseline: function(S, T) {
                var U, R;
                switch (S[0]) {
                case "top":
                    U = 0;
                    break;
                case "middle":
                    U = 0.5;
                    break;
                case "bottom":
                    U = 1;
                    break;
                default:
                    U = S[0] / T.height
                }
                switch (S[1]) {
                case "left":
                    R = 0;
                    break;
                case "center":
                    R = 0.5;
                    break;
                case "right":
                    R = 1;
                    break;
                default:
                    R = S[1] / T.width
                }
                return {
                    x: R,
                    y: U
                }
            },
            createWrapper: function(S) {
                if (S.parent().is(".ui-effects-wrapper")) {
                    return S.parent()
                }
                var T = {
                    width: S.outerWidth(true),
                    height: S.outerHeight(true),
                    "float": S.css("float")
                },
                W = z("<div></div>").addClass("ui-effects-wrapper").css({
                    fontSize: "100%",
                    background: "transparent",
                    border: "none",
                    margin: 0,
                    padding: 0
                }),
                R = {
                    width: S.width(),
                    height: S.height()
                },
                V = document.activeElement;
                try {
                    V.id
                } catch(U) {
                    V = document.body
                }
                S.wrap(W);
                if (S[0] === V || z.contains(S[0], V)) {
                    z(V).focus()
                }
                W = S.parent();
                if (S.css("position") === "static") {
                    W.css({
                        position: "relative"
                    });
                    S.css({
                        position: "relative"
                    })
                } else {
                    z.extend(T, {
                        position: S.css("position"),
                        zIndex: S.css("z-index")
                    });
                    z.each(["top", "left", "bottom", "right"],
                    function(X, Y) {
                        T[Y] = S.css(Y);
                        if (isNaN(parseInt(T[Y], 10))) {
                            T[Y] = "auto"
                        }
                    });
                    S.css({
                        position: "relative",
                        top: 0,
                        left: 0,
                        right: "auto",
                        bottom: "auto"
                    })
                }
                S.css(R);
                return W.css(T).show()
            },
            removeWrapper: function(R) {
                var S = document.activeElement;
                if (R.parent().is(".ui-effects-wrapper")) {
                    R.parent().replaceWith(R);
                    if (R[0] === S || z.contains(R[0], S)) {
                        z(S).focus()
                    }
                }
                return R
            },
            setTransition: function(S, U, R, T) {
                T = T || {};
                z.each(U,
                function(W, V) {
                    var X = S.cssUnit(V);
                    if (X[0] > 0) {
                        T[V] = X[0] * R + X[1]
                    }
                });
                return T
            }
        });
        function P(S, R, T, U) {
            if (z.isPlainObject(S)) {
                R = S;
                S = S.effect
            }
            S = {
                effect: S
            };
            if (R == null) {
                R = {}
            }
            if (z.isFunction(R)) {
                U = R;
                T = null;
                R = {}
            }
            if (typeof R === "number" || z.fx.speeds[R]) {
                U = T;
                T = R;
                R = {}
            }
            if (z.isFunction(T)) {
                U = T;
                T = null
            }
            if (R) {
                z.extend(S, R)
            }
            T = T || R.duration;
            S.duration = z.fx.off ? 0 : typeof T === "number" ? T: T in z.fx.speeds ? z.fx.speeds[T] : z.fx.speeds._default;
            S.complete = U || R.complete;
            return S
        }
        function Q(R) {
            if (!R || typeof R === "number" || z.fx.speeds[R]) {
                return true
            }
            if (typeof R === "string" && !z.effects.effect[R]) {
                return true
            }
            if (z.isFunction(R)) {
                return true
            }
            if (typeof R === "object" && !R.effect) {
                return true
            }
            return false
        }
        z.fn.extend({
            effect: function() {
                var T = P.apply(this, arguments),
                V = T.mode,
                R = T.queue,
                S = z.effects.effect[T.effect];
                if (z.fx.off || !S) {
                    if (V) {
                        return this[V](T.duration, T.complete)
                    } else {
                        return this.each(function() {
                            if (T.complete) {
                                T.complete.call(this)
                            }
                        })
                    }
                }
                function U(Y) {
                    var Z = z(this),
                    X = T.complete,
                    aa = T.mode;
                    function W() {
                        if (z.isFunction(X)) {
                            X.call(Z[0])
                        }
                        if (z.isFunction(Y)) {
                            Y()
                        }
                    }
                    if (Z.is(":hidden") ? aa === "hide": aa === "show") {
                        Z[aa]();
                        W()
                    } else {
                        S.call(Z[0], T, W)
                    }
                }
                return R === false ? this.each(U) : this.queue(R || "fx", U)
            },
            show: (function(R) {
                return function(T) {
                    if (Q(T)) {
                        return R.apply(this, arguments)
                    } else {
                        var S = P.apply(this, arguments);
                        S.mode = "show";
                        return this.effect.call(this, S)
                    }
                }
            })(z.fn.show),
            hide: (function(R) {
                return function(T) {
                    if (Q(T)) {
                        return R.apply(this, arguments)
                    } else {
                        var S = P.apply(this, arguments);
                        S.mode = "hide";
                        return this.effect.call(this, S)
                    }
                }
            })(z.fn.hide),
            toggle: (function(R) {
                return function(T) {
                    if (Q(T) || typeof T === "boolean") {
                        return R.apply(this, arguments)
                    } else {
                        var S = P.apply(this, arguments);
                        S.mode = "toggle";
                        return this.effect.call(this, S)
                    }
                }
            })(z.fn.toggle),
            cssUnit: function(R) {
                var S = this.css(R),
                T = [];
                z.each(["em", "px", "%", "pt"],
                function(U, V) {
                    if (S.indexOf(V) > 0) {
                        T = [parseFloat(S), V]
                    }
                });
                return T
            }
        })
    })(); (function() {
        var P = {};
        z.each(["Quad", "Cubic", "Quart", "Quint", "Expo"],
        function(R, Q) {
            P[Q] = function(S) {
                return Math.pow(S, R + 2)
            }
        });
        z.extend(P, {
            Sine: function(Q) {
                return 1 - Math.cos(Q * Math.PI / 2)
            },
            Circ: function(Q) {
                return 1 - Math.sqrt(1 - Q * Q)
            },
            Elastic: function(Q) {
                return Q === 0 || Q === 1 ? Q: -Math.pow(2, 8 * (Q - 1)) * Math.sin(((Q - 1) * 80 - 7.5) * Math.PI / 15)
            },
            Back: function(Q) {
                return Q * Q * (3 * Q - 2)
            },
            Bounce: function(S) {
                var Q, R = 4;
                while (S < ((Q = Math.pow(2, --R)) - 1) / 11) {}
                return 1 / Math.pow(4, 3 - R) - 7.5625 * Math.pow((Q * 3 - 2) / 22 - S, 2)
            }
        });
        z.each(P,
        function(R, Q) {
            z.easing["easeIn" + R] = Q;
            z.easing["easeOut" + R] = function(S) {
                return 1 - Q(1 - S)
            };
            z.easing["easeInOut" + R] = function(S) {
                return S < 0.5 ? Q(S * 2) / 2 : 1 - Q(S * -2 + 2) / 2
            }
        })
    })();
    var I = z.effects;
    /*!
     * jQuery UI Effects Blind 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/blind-effect/
     */
    ;
    var L = z.effects.effect.blind = function(R, X) {
        var S = z(this),
        ab = /up|down|vertical/,
        aa = /up|left|vertical|horizontal/,
        ac = ["position", "top", "bottom", "left", "right", "height", "width"],
        Y = z.effects.setMode(S, R.mode || "hide"),
        ad = R.direction || "up",
        U = ab.test(ad),
        T = U ? "height": "width",
        Z = U ? "top": "left",
        af = aa.test(ad),
        W = {},
        ae = Y === "show",
        Q,
        P,
        V;
        if (S.parent().is(".ui-effects-wrapper")) {
            z.effects.save(S.parent(), ac)
        } else {
            z.effects.save(S, ac)
        }
        S.show();
        Q = z.effects.createWrapper(S).css({
            overflow: "hidden"
        });
        P = Q[T]();
        V = parseFloat(Q.css(Z)) || 0;
        W[T] = ae ? P: 0;
        if (!af) {
            S.css(U ? "bottom": "right", 0).css(U ? "top": "left", "auto").css({
                position: "absolute"
            });
            W[Z] = ae ? V: P + V
        }
        if (ae) {
            Q.css(T, 0);
            if (!af) {
                Q.css(Z, V + P)
            }
        }
        Q.animate(W, {
            duration: R.duration,
            easing: R.easing,
            queue: false,
            complete: function() {
                if (Y === "hide") {
                    S.hide()
                }
                z.effects.restore(S, ac);
                z.effects.removeWrapper(S);
                X()
            }
        })
    };
    /*!
     * jQuery UI Effects Bounce 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/bounce-effect/
     */
    ;
    var G = z.effects.effect.bounce = function(Y, X) {
        var P = z(this),
        Q = ["position", "top", "bottom", "left", "right", "height", "width"],
        W = z.effects.setMode(P, Y.mode || "effect"),
        V = W === "hide",
        ag = W === "show",
        ah = Y.direction || "up",
        R = Y.distance,
        U = Y.times || 5,
        ai = U * 2 + (ag || V ? 1 : 0),
        af = Y.duration / ai,
        aa = Y.easing,
        S = (ah === "up" || ah === "down") ? "top": "left",
        Z = (ah === "up" || ah === "left"),
        ae,
        T,
        ad,
        ab = P.queue(),
        ac = ab.length;
        if (ag || V) {
            Q.push("opacity")
        }
        z.effects.save(P, Q);
        P.show();
        z.effects.createWrapper(P);
        if (!R) {
            R = P[S === "top" ? "outerHeight": "outerWidth"]() / 3
        }
        if (ag) {
            ad = {
                opacity: 1
            };
            ad[S] = 0;
            P.css("opacity", 0).css(S, Z ? -R * 2 : R * 2).animate(ad, af, aa)
        }
        if (V) {
            R = R / Math.pow(2, U - 1)
        }
        ad = {};
        ad[S] = 0;
        for (ae = 0; ae < U; ae++) {
            T = {};
            T[S] = (Z ? "-=": "+=") + R;
            P.animate(T, af, aa).animate(ad, af, aa);
            R = V ? R * 2 : R / 2
        }
        if (V) {
            T = {
                opacity: 0
            };
            T[S] = (Z ? "-=": "+=") + R;
            P.animate(T, af, aa)
        }
        P.queue(function() {
            if (V) {
                P.hide()
            }
            z.effects.restore(P, Q);
            z.effects.removeWrapper(P);
            X()
        });
        if (ac > 1) {
            ab.splice.apply(ab, [1, 0].concat(ab.splice(ac, ai + 1)))
        }
        P.dequeue()
    };
    /*!
     * jQuery UI Effects Clip 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/clip-effect/
     */
    ;
    var u = z.effects.effect.clip = function(S, V) {
        var T = z(this),
        Z = ["position", "top", "bottom", "left", "right", "height", "width"],
        Y = z.effects.setMode(T, S.mode || "hide"),
        ab = Y === "show",
        aa = S.direction || "vertical",
        X = aa === "vertical",
        ac = X ? "height": "width",
        W = X ? "top": "left",
        U = {},
        Q,
        R,
        P;
        z.effects.save(T, Z);
        T.show();
        Q = z.effects.createWrapper(T).css({
            overflow: "hidden"
        });
        R = (T[0].tagName === "IMG") ? Q: T;
        P = R[ac]();
        if (ab) {
            R.css(ac, 0);
            R.css(W, P / 2)
        }
        U[ac] = ab ? P: 0;
        U[W] = ab ? 0 : P / 2;
        R.animate(U, {
            queue: false,
            duration: S.duration,
            easing: S.easing,
            complete: function() {
                if (!ab) {
                    T.hide()
                }
                z.effects.restore(T, Z);
                z.effects.removeWrapper(T);
                V()
            }
        })
    };
    /*!
     * jQuery UI Effects Drop 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/drop-effect/
     */
    ;
    var l = z.effects.effect.drop = function(Q, U) {
        var R = z(this),
        W = ["position", "top", "bottom", "left", "right", "opacity", "height", "width"],
        V = z.effects.setMode(R, Q.mode || "hide"),
        Y = V === "show",
        X = Q.direction || "left",
        S = (X === "up" || X === "down") ? "top": "left",
        Z = (X === "up" || X === "left") ? "pos": "neg",
        T = {
            opacity: Y ? 1 : 0
        },
        P;
        z.effects.save(R, W);
        R.show();
        z.effects.createWrapper(R);
        P = Q.distance || R[S === "top" ? "outerHeight": "outerWidth"](true) / 2;
        if (Y) {
            R.css("opacity", 0).css(S, Z === "pos" ? -P: P)
        }
        T[S] = (Y ? (Z === "pos" ? "+=": "-=") : (Z === "pos" ? "-=": "+=")) + P;
        R.animate(T, {
            queue: false,
            duration: Q.duration,
            easing: Q.easing,
            complete: function() {
                if (V === "hide") {
                    R.hide()
                }
                z.effects.restore(R, W);
                z.effects.removeWrapper(R);
                U()
            }
        })
    };
    /*!
     * jQuery UI Effects Explode 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/explode-effect/
     */
    ;
    var F = z.effects.effect.explode = function(ac, ab) {
        var V = ac.pieces ? Math.round(Math.sqrt(ac.pieces)) : 3,
        Q = V,
        P = z(this),
        X = z.effects.setMode(P, ac.mode || "hide"),
        ag = X === "show",
        T = P.show().css("visibility", "hidden").offset(),
        ad = Math.ceil(P.outerWidth() / Q),
        aa = Math.ceil(P.outerHeight() / V),
        U = [],
        af,
        ae,
        R,
        Z,
        Y,
        W;
        function ah() {
            U.push(this);
            if (U.length === V * Q) {
                S()
            }
        }
        for (af = 0; af < V; af++) {
            Z = T.top + af * aa;
            W = af - (V - 1) / 2;
            for (ae = 0; ae < Q; ae++) {
                R = T.left + ae * ad;
                Y = ae - (Q - 1) / 2;
                P.clone().appendTo("body").wrap("<div></div>").css({
                    position: "absolute",
                    visibility: "visible",
                    left: -ae * ad,
                    top: -af * aa
                }).parent().addClass("ui-effects-explode").css({
                    position: "absolute",
                    overflow: "hidden",
                    width: ad,
                    height: aa,
                    left: R + (ag ? Y * ad: 0),
                    top: Z + (ag ? W * aa: 0),
                    opacity: ag ? 0 : 1
                }).animate({
                    left: R + (ag ? 0 : Y * ad),
                    top: Z + (ag ? 0 : W * aa),
                    opacity: ag ? 1 : 0
                },
                ac.duration || 500, ac.easing, ah)
            }
        }
        function S() {
            P.css({
                visibility: "visible"
            });
            z(U).remove();
            if (!ag) {
                P.hide()
            }
            ab()
        }
    };
    /*!
     * jQuery UI Effects Fade 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/fade-effect/
     */
    ;
    var H = z.effects.effect.fade = function(S, P) {
        var Q = z(this),
        R = z.effects.setMode(Q, S.mode || "toggle");
        Q.animate({
            opacity: R
        },
        {
            queue: false,
            duration: S.duration,
            easing: S.easing,
            complete: P
        })
    };
    /*!
     * jQuery UI Effects Fold 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/fold-effect/
     */
    ;
    var w = z.effects.effect.fold = function(R, V) {
        var S = z(this),
        aa = ["position", "top", "bottom", "left", "right", "height", "width"],
        X = z.effects.setMode(S, R.mode || "hide"),
        ad = X === "show",
        Y = X === "hide",
        af = R.size || 15,
        Z = /([0-9]+)%/.exec(af),
        ae = !!R.horizFirst,
        W = ad !== ae,
        T = W ? ["width", "height"] : ["height", "width"],
        U = R.duration / 2,
        Q,
        P,
        ac = {},
        ab = {};
        z.effects.save(S, aa);
        S.show();
        Q = z.effects.createWrapper(S).css({
            overflow: "hidden"
        });
        P = W ? [Q.width(), Q.height()] : [Q.height(), Q.width()];
        if (Z) {
            af = parseInt(Z[1], 10) / 100 * P[Y ? 0 : 1]
        }
        if (ad) {
            Q.css(ae ? {
                height: 0,
                width: af
            }: {
                height: af,
                width: 0
            })
        }
        ac[T[0]] = ad ? P[0] : af;
        ab[T[1]] = ad ? P[1] : 0;
        Q.animate(ac, U, R.easing).animate(ab, U, R.easing,
        function() {
            if (Y) {
                S.hide()
            }
            z.effects.restore(S, aa);
            z.effects.removeWrapper(S);
            V()
        })
    };
    /*!
     * jQuery UI Effects Highlight 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/highlight-effect/
     */
    ;
    var B = z.effects.effect.highlight = function(U, P) {
        var R = z(this),
        Q = ["backgroundImage", "backgroundColor", "opacity"],
        T = z.effects.setMode(R, U.mode || "show"),
        S = {
            backgroundColor: R.css("backgroundColor")
        };
        if (T === "hide") {
            S.opacity = 0
        }
        z.effects.save(R, Q);
        R.show().css({
            backgroundImage: "none",
            backgroundColor: U.color || "#ffff99"
        }).animate(S, {
            queue: false,
            duration: U.duration,
            easing: U.easing,
            complete: function() {
                if (T === "hide") {
                    R.hide()
                }
                z.effects.restore(R, Q);
                P()
            }
        })
    };
    /*!
     * jQuery UI Effects Size 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/size-effect/
     */
    ;
    var a = z.effects.effect.size = function(Y, X) {
        var ac, V, W, P = z(this),
        ab = ["position", "top", "bottom", "left", "right", "width", "height", "overflow", "opacity"],
        aa = ["position", "top", "bottom", "left", "right", "overflow", "opacity"],
        Z = ["width", "height", "overflow"],
        T = ["fontSize"],
        ae = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"],
        Q = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"],
        U = z.effects.setMode(P, Y.mode || "effect"),
        ad = Y.restore || U !== "effect",
        ah = Y.scale || "both",
        af = Y.origin || ["middle", "center"],
        ag = P.css("position"),
        R = ad ? ab: aa,
        S = {
            height: 0,
            width: 0,
            outerHeight: 0,
            outerWidth: 0
        };
        if (U === "show") {
            P.show()
        }
        ac = {
            height: P.height(),
            width: P.width(),
            outerHeight: P.outerHeight(),
            outerWidth: P.outerWidth()
        };
        if (Y.mode === "toggle" && U === "show") {
            P.from = Y.to || S;
            P.to = Y.from || ac
        } else {
            P.from = Y.from || (U === "show" ? S: ac);
            P.to = Y.to || (U === "hide" ? S: ac)
        }
        W = {
            from: {
                y: P.from.height / ac.height,
                x: P.from.width / ac.width
            },
            to: {
                y: P.to.height / ac.height,
                x: P.to.width / ac.width
            }
        };
        if (ah === "box" || ah === "both") {
            if (W.from.y !== W.to.y) {
                R = R.concat(ae);
                P.from = z.effects.setTransition(P, ae, W.from.y, P.from);
                P.to = z.effects.setTransition(P, ae, W.to.y, P.to)
            }
            if (W.from.x !== W.to.x) {
                R = R.concat(Q);
                P.from = z.effects.setTransition(P, Q, W.from.x, P.from);
                P.to = z.effects.setTransition(P, Q, W.to.x, P.to)
            }
        }
        if (ah === "content" || ah === "both") {
            if (W.from.y !== W.to.y) {
                R = R.concat(T).concat(Z);
                P.from = z.effects.setTransition(P, T, W.from.y, P.from);
                P.to = z.effects.setTransition(P, T, W.to.y, P.to)
            }
        }
        z.effects.save(P, R);
        P.show();
        z.effects.createWrapper(P);
        P.css("overflow", "hidden").css(P.from);
        if (af) {
            V = z.effects.getBaseline(af, ac);
            P.from.top = (ac.outerHeight - P.outerHeight()) * V.y;
            P.from.left = (ac.outerWidth - P.outerWidth()) * V.x;
            P.to.top = (ac.outerHeight - P.to.outerHeight) * V.y;
            P.to.left = (ac.outerWidth - P.to.outerWidth) * V.x
        }
        P.css(P.from);
        if (ah === "content" || ah === "both") {
            ae = ae.concat(["marginTop", "marginBottom"]).concat(T);
            Q = Q.concat(["marginLeft", "marginRight"]);
            Z = ab.concat(ae).concat(Q);
            P.find("*[width]").each(function() {
                var aj = z(this),
                ai = {
                    height: aj.height(),
                    width: aj.width(),
                    outerHeight: aj.outerHeight(),
                    outerWidth: aj.outerWidth()
                };
                if (ad) {
                    z.effects.save(aj, Z)
                }
                aj.from = {
                    height: ai.height * W.from.y,
                    width: ai.width * W.from.x,
                    outerHeight: ai.outerHeight * W.from.y,
                    outerWidth: ai.outerWidth * W.from.x
                };
                aj.to = {
                    height: ai.height * W.to.y,
                    width: ai.width * W.to.x,
                    outerHeight: ai.height * W.to.y,
                    outerWidth: ai.width * W.to.x
                };
                if (W.from.y !== W.to.y) {
                    aj.from = z.effects.setTransition(aj, ae, W.from.y, aj.from);
                    aj.to = z.effects.setTransition(aj, ae, W.to.y, aj.to)
                }
                if (W.from.x !== W.to.x) {
                    aj.from = z.effects.setTransition(aj, Q, W.from.x, aj.from);
                    aj.to = z.effects.setTransition(aj, Q, W.to.x, aj.to)
                }
                aj.css(aj.from);
                aj.animate(aj.to, Y.duration, Y.easing,
                function() {
                    if (ad) {
                        z.effects.restore(aj, Z)
                    }
                })
            })
        }
        P.animate(P.to, {
            queue: false,
            duration: Y.duration,
            easing: Y.easing,
            complete: function() {
                if (P.to.opacity === 0) {
                    P.css("opacity", P.from.opacity)
                }
                if (U === "hide") {
                    P.hide()
                }
                z.effects.restore(P, R);
                if (!ad) {
                    if (ag === "static") {
                        P.css({
                            position: "relative",
                            top: P.to.top,
                            left: P.to.left
                        })
                    } else {
                        z.each(["top", "left"],
                        function(ai, aj) {
                            P.css(aj,
                            function(al, an) {
                                var am = parseInt(an, 10),
                                ak = ai ? P.to.left: P.to.top;
                                if (an === "auto") {
                                    return ak + "px"
                                }
                                return am + ak + "px"
                            })
                        })
                    }
                }
                z.effects.removeWrapper(P);
                X()
            }
        })
    };
    /*!
     * jQuery UI Effects Scale 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/scale-effect/
     */
    ;
    var e = z.effects.effect.scale = function(P, S) {
        var Q = z(this),
        Y = z.extend(true, {},
        P),
        T = z.effects.setMode(Q, P.mode || "effect"),
        U = parseInt(P.percent, 10) || (parseInt(P.percent, 10) === 0 ? 0 : (T === "hide" ? 0 : 100)),
        W = P.direction || "both",
        X = P.origin,
        R = {
            height: Q.height(),
            width: Q.width(),
            outerHeight: Q.outerHeight(),
            outerWidth: Q.outerWidth()
        },
        V = {
            y: W !== "horizontal" ? (U / 100) : 1,
            x: W !== "vertical" ? (U / 100) : 1
        };
        Y.effect = "size";
        Y.queue = false;
        Y.complete = S;
        if (T !== "effect") {
            Y.origin = X || ["middle", "center"];
            Y.restore = true
        }
        Y.from = P.from || (T === "show" ? {
            height: 0,
            width: 0,
            outerHeight: 0,
            outerWidth: 0
        }: R);
        Y.to = {
            height: R.height * V.y,
            width: R.width * V.x,
            outerHeight: R.outerHeight * V.y,
            outerWidth: R.outerWidth * V.x
        };
        if (Y.fade) {
            if (T === "show") {
                Y.from.opacity = 0;
                Y.to.opacity = 1
            }
            if (T === "hide") {
                Y.from.opacity = 1;
                Y.to.opacity = 0
            }
        }
        Q.effect(Y)
    };
    /*!
     * jQuery UI Effects Puff 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/puff-effect/
     */
    ;
    var N = z.effects.effect.puff = function(W, P) {
        var U = z(this),
        V = z.effects.setMode(U, W.mode || "hide"),
        S = V === "hide",
        T = parseInt(W.percent, 10) || 150,
        R = T / 100,
        Q = {
            height: U.height(),
            width: U.width(),
            outerHeight: U.outerHeight(),
            outerWidth: U.outerWidth()
        };
        z.extend(W, {
            effect: "scale",
            queue: false,
            fade: true,
            mode: V,
            complete: P,
            percent: S ? T: 100,
            from: S ? Q: {
                height: Q.height * R,
                width: Q.width * R,
                outerHeight: Q.outerHeight * R,
                outerWidth: Q.outerWidth * R
            }
        });
        U.effect(W)
    };
    /*!
     * jQuery UI Effects Pulsate 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/pulsate-effect/
     */
    ;
    var y = z.effects.effect.pulsate = function(P, T) {
        var R = z(this),
        W = z.effects.setMode(R, P.mode || "show"),
        aa = W === "show",
        X = W === "hide",
        ab = (aa || W === "hide"),
        Y = ((P.times || 5) * 2) + (ab ? 1 : 0),
        S = P.duration / Y,
        Z = 0,
        V = R.queue(),
        Q = V.length,
        U;
        if (aa || !R.is(":visible")) {
            R.css("opacity", 0).show();
            Z = 1
        }
        for (U = 1; U < Y; U++) {
            R.animate({
                opacity: Z
            },
            S, P.easing);
            Z = 1 - Z
        }
        R.animate({
            opacity: Z
        },
        S, P.easing);
        R.queue(function() {
            if (X) {
                R.hide()
            }
            T()
        });
        if (Q > 1) {
            V.splice.apply(V, [1, 0].concat(V.splice(Q, Y + 1)))
        }
        R.dequeue()
    };
    /*!
     * jQuery UI Effects Shake 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/shake-effect/
     */
    ;
    var s = z.effects.effect.shake = function(X, W) {
        var P = z(this),
        Q = ["position", "top", "bottom", "left", "right", "height", "width"],
        V = z.effects.setMode(P, X.mode || "effect"),
        af = X.direction || "left",
        R = X.distance || 20,
        U = X.times || 3,
        ag = U * 2 + 1,
        ab = Math.round(X.duration / ag),
        T = (af === "up" || af === "down") ? "top": "left",
        S = (af === "up" || af === "left"),
        ae = {},
        ad = {},
        ac = {},
        aa,
        Y = P.queue(),
        Z = Y.length;
        z.effects.save(P, Q);
        P.show();
        z.effects.createWrapper(P);
        ae[T] = (S ? "-=": "+=") + R;
        ad[T] = (S ? "+=": "-=") + R * 2;
        ac[T] = (S ? "-=": "+=") + R * 2;
        P.animate(ae, ab, X.easing);
        for (aa = 1; aa < U; aa++) {
            P.animate(ad, ab, X.easing).animate(ac, ab, X.easing)
        }
        P.animate(ad, ab, X.easing).animate(ae, ab / 2, X.easing).queue(function() {
            if (V === "hide") {
                P.hide()
            }
            z.effects.restore(P, Q);
            z.effects.removeWrapper(P);
            W()
        });
        if (Z > 1) {
            Y.splice.apply(Y, [1, 0].concat(Y.splice(Z, ag + 1)))
        }
        P.dequeue()
    };
    /*!
     * jQuery UI Effects Slide 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/slide-effect/
     */
    ;
    var r = z.effects.effect.slide = function(R, V) {
        var S = z(this),
        X = ["position", "top", "bottom", "left", "right", "width", "height"],
        W = z.effects.setMode(S, R.mode || "show"),
        Z = W === "show",
        Y = R.direction || "left",
        T = (Y === "up" || Y === "down") ? "top": "left",
        Q = (Y === "up" || Y === "left"),
        P,
        U = {};
        z.effects.save(S, X);
        S.show();
        P = R.distance || S[T === "top" ? "outerHeight": "outerWidth"](true);
        z.effects.createWrapper(S).css({
            overflow: "hidden"
        });
        if (Z) {
            S.css(T, Q ? (isNaN(P) ? "-" + P: -P) : P)
        }
        U[T] = (Z ? (Q ? "+=": "-=") : (Q ? "-=": "+=")) + P;
        S.animate(U, {
            queue: false,
            duration: R.duration,
            easing: R.easing,
            complete: function() {
                if (W === "hide") {
                    S.hide()
                }
                z.effects.restore(S, X);
                z.effects.removeWrapper(S);
                V()
            }
        })
    };
    /*!
     * jQuery UI Effects Transfer 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/transfer-effect/
     */
    ;
    var j = z.effects.effect.transfer = function(Q, U) {
        var S = z(this),
        X = z(Q.to),
        aa = X.css("position") === "fixed",
        W = z("body"),
        Y = aa ? W.scrollTop() : 0,
        Z = aa ? W.scrollLeft() : 0,
        P = X.offset(),
        T = {
            top: P.top - Y,
            left: P.left - Z,
            height: X.innerHeight(),
            width: X.innerWidth()
        },
        V = S.offset(),
        R = z("<div class='ui-effects-transfer'></div>").appendTo(document.body).addClass(Q.className).css({
            top: V.top - Y,
            left: V.left - Z,
            height: S.innerHeight(),
            width: S.innerWidth(),
            position: aa ? "fixed": "absolute"
        }).animate(T, Q.duration, Q.easing,
        function() {
            R.remove();
            U()
        })
    }
}));