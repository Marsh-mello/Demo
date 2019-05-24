/** layuiAdmin.std-v1.0.0-beta7 LPPL License By http://www.layui.com/admin/ */ ;
layui.define(["laytpl", "layer"], function(e) {
	var t = layui.jquery,
		n = layui.laytpl,
		a = layui.layer,
		r = layui.setter,
		o = (layui.device(), layui.hint()),
		i = function(e) {
			return new d(e)
		},
		s = "LAY_app_body",
		d = function(e) {
			this.id = e, this.container = t("#" + (e || s))
		};
	i.loading = function(e) {
		e.append(this.elemLoad = t('<i class="layui-anim layui-anim-rotate layui-anim-loop layui-icon layui-icon-loading layadmin-loading"></i>'))
	}, i.removeLoad = function() {
		this.elemLoad && this.elemLoad.remove()
	}, i.exit = function(e) {
		layui.data(r.tableName, {
			key: r.request.tokenName,
			remove: !0
		}), e && e()
	}, i.req = function(e) {
		var n = e.success,
			a = (e.error, r.request),
			o = r.response,
			s = function() {
				return r.debug ? "<br><cite>URL：</cite>" + e.url : ""
			};
		return e.data = e.data || {}, e.headers = e.headers || {}, a.tokenName && (e.data[a.tokenName] = a.tokenName in e.data ? e.data[a.tokenName] : layui.data(r.tableName)[a.tokenName] || "", e.headers[a.tokenName] = a.tokenName in e.headers ? e.headers[a.tokenName] : layui.data(r.tableName)[a.tokenName] || ""), delete e.success, delete e.error, t.ajax(t.extend({
			type: "get",
			dataType: "json",
			success: function(t) {
				var a = o.statusCode;
				if(t[o.statusName] == a.ok) "function" == typeof e.done && e.done(t);
				else if(t[o.statusName] == a.logout) i.exit();
				else {
					var r = ["<cite>Error：</cite> " + (t[o.msgName] || "返回状态码异常"), s()].join("");
					i.error(r)
				}
				"function" == typeof n && n(t)
			},
			error: function(e, t) {
				var n = ["请求异常，请重试<br><cite>错误信息：</cite>" + t, s()].join("");
				i.error(n), "function" == typeof n && n(res)
			}
		}, e))
	}, i.popup = function(e) {
		var n = e.success,
			r = e.skin;
		return delete e.success, delete e.skin, a.open(t.extend({
			type: 1,
			title: "提示",
			content: "",
			id: "LAY-system-view-popup",
			skin: "layui-layer-admin" + (r ? " " + r : ""),
			shadeClose: !0,
			closeBtn: !1,
			success: function(e, r) {
				var o = t('<i class="layui-icon" close>&#x1006;</i>');
				e.append(o), o.on("click", function() {
					a.close(r)
				}), "function" == typeof n && n.apply(this, arguments)
			}
		}, e))
	}, i.error = function(e, n) {
		return i.popup(t.extend({
			content: e,
			maxWidth: 300,
			offset: "t",
			anim: 6,
			id: "LAY_adminError"
		}, n))
	}, d.prototype.render = function(e, n) {
		var a = this;
		layui.router();
		return e = r.views + e + r.engine, t("#" + s).children(".layadmin-loading").remove(), i.loading(a.container), t.ajax({
			url: e,
			type: "get",
			dataType: "html",
			data: {
				v: layui.cache.version
			},
			success: function(e) {
				e = "<div>" + e + "</div>";
				var r = t(e).find("title"),
					o = r.text(),
					s = {
						title: o,
						body: e
					};
				r.remove(), a.params = n || {}, a.then && (a.then(s), delete a.then), a.parse(e), i.removeLoad(), a.done && (a.done(s), delete a.done)
			},
			error: function(e) {
				return i.removeLoad(), a.render.isError ? i.error("请求视图文件异常，状态：" + e.status) : (404 === e.status ? a.render("template/tips/404") : a.render("template/tips/error"), void(a.render.isError = !0))
			}
		}), a
	}, d.prototype.parse = function(e, a, r) {
		var s = this,
			d = "object" == typeof e,
			u = d ? e : t(e),
			l = d ? e : u.find("*[template]"),
			c = function(e) {
				var a = n(e.dataElem.html());
				e.dataElem.after(a.render(t.extend({
					params: y.params
				}, e.res))), "function" == typeof r && r();
				try {
					e.done && new Function("d", e.done)(e.res)
				} catch(o) {
//					console.error(e.dataElem[0], "\n存在错误回调脚本\n\n", o)
				}
			},
			y = layui.router();
		u.find("title").remove(), s.container[a ? "after" : "html"](u.children()), y.params = s.params || {};
		for(var p = l.length; p > 0; p--) ! function() {
			var e = l.eq(p - 1),
				t = e.attr("lay-done") || e.attr("lay-then"),
				a = n(e.attr("lay-url") || "").render(y),
				r = n(e.attr("lay-data") || "").render(y),
				s = n(e.attr("lay-headers") || "").render(y);
			try {
				r = new Function("return " + r + ";")()
			} catch(d) {
				o.error("lay-data: " + d.message), r = {}
			}
			try {
				s = new Function("return " + s + ";")()
			} catch(d) {
				o.error("lay-headers: " + d.message), s = s || {}
			}
			a ? i.req({
				type: e.data("lay-type") || "get",
				url: a,
				data: r,
				dataType: "json",
				headers: s,
				success: function(n) {
					c({
						dataElem: e,
						res: n,
						done: t
					})
				}
			}) : c({
				dataElem: e,
				done: t
			})
		}();
		return s
	}, d.prototype.autoRender = function(e, n) {
		var a = this;
		t(e || "body").find("*[template]").each(function(e, n) {
			var r = t(this);
			a.container = r, a.parse(r, "refresh")
		})
	}, d.prototype.send = function(e, t) {
		var a = n(e || this.container.html()).render(t || {});
		return this.container.html(a), this
	}, d.prototype.refresh = function(e) {
		var t = this,
			n = t.container.next(),
			a = n.attr("lay-templateid");
		return t.id != a ? t : (t.parse(t.container, "refresh", function() {
			t.container.siblings('[lay-templateid="' + t.id + '"]:last').remove(), "function" == typeof e && e()
		}), t)
	}, d.prototype.then = function(e) {
		return this.then = e, this
	}, d.prototype.done = function(e) {
		return this.done = e, this
	}, e("view", i)
});