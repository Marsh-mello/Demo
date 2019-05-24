/** layuiAdmin.std-v1.0.0-beta7 LPPL License By http://www.layui.com/admin/ */ ;
layui.define("view", function(e) {
	var a = layui.jquery,
		i = layui.laytpl,
		t = layui.element,
		n = layui.setter,
		s = layui.view,
		l = layui.device(),
		o = a(window),
		r = a("body"),
		d = a("#" + n.container),
		u = "layui-show",
		c = "layui-this",
		y = "layui-disabled",
		f = "#LAY_app_body",
		m = "LAY_app_flexible",
		h = "layadmin-layout-tabs",
		p = "layadmin-side-spread-sm",
		v = "layadmin-tabsbody-item",
		b = "layui-icon-shrink-right",
		g = "layui-icon-spread-left",
		x = "layadmin-side-shrink",
		C = "LAY-system-side-menu",
		P = {
			v: "1.0.0-beta7 std",
			req: s.req,
			sendAuthCode: function(e) {
				e = a.extend({
					seconds: 60,
					elemPhone: "#LAY_phone",
					elemVercode: "#LAY_vercode"
				}, e);
				var i, t = e.seconds,
					n = a(e.elem),
					s = function(a) {
						t--, t < 0 ? (n.removeClass(y).html("获取验证码"), t = e.seconds, clearInterval(i)) : n.addClass(y).html(t + "秒后重获"), a || (i = setInterval(function() {
							s(!0)
						}, 1e3))
					};
				e.elemPhone = a(e.elemPhone), e.elemVercode = a(e.elemVercode), n.on("click", function() {
					var i = e.elemPhone,
						n = i.val();
					if(t === e.seconds) {
						if(!/^1\d{10}$/.test(n)) return i.focus(), layer.msg("请输入正确的手机号");
						if("object" == typeof e.ajax) {
							var l = e.ajax.success;
							delete e.ajax.success
						}
						P.req(a.extend(!0, {
							url: "/auth/code",
							type: "get",
							data: {
								phone: n
							},
							success: function(a) {
								layer.msg("验证码已发送至你的手机，请注意查收", {
									icon: 1,
									shade: 0
								}), e.elemVercode.focus(), s(), l && l(a)
							}
						}, e.ajax))
					}
				})
			},
			screen: function() {
				var e = o.width();
				return e >= 1200 ? 3 : e >= 992 ? 2 : e >= 768 ? 1 : 0
			},
			exit: s.exit,
			sideFlexible: function(e) {
				var i = d,
					t = a("#" + m),
					s = P.screen();
				"spread" === e ? (t.removeClass(g).addClass(b), s < 2 ? i.addClass(p) : i.removeClass(p), i.removeClass(x)) : (t.removeClass(b).addClass(g), s < 2 ? i.removeClass(x) : i.addClass(x), i.removeClass(p)), layui.event.call(this, n.MOD_NAME, "side({*})", {
					status: e
				})
			},
			on: function(e, a) {
				return layui.onevent.call(this, n.MOD_NAME, e, a)
			},
			popup: s.popup,
			popupRight: function(e) {
				return P.popup.index = layer.open(a.extend({
					type: 1,
					id: "LAY_adminPopupR",
					anim: -1,
					title: !1,
					closeBtn: !1,
					offset: "r",
					shade: .1,
					shadeClose: !0,
					skin: "layui-anim layui-anim-rl layui-layer-adminRight",
					area: "300px"
				}, e))
			},
			theme: function(e) {
				var t = (n.theme, layui.data(n.tableName)),
					s = "LAY_layadmin_theme",
					l = document.createElement("style"),
					o = i([".layui-side-menu,", ".layadmin-pagetabs .layui-tab-title li:after,", ".layadmin-pagetabs .layui-tab-title li.layui-this:after,", ".layui-layer-admin .layui-layer-title,", ".layadmin-side-shrink .layui-side-menu .layui-nav>.layui-nav-item>.layui-nav-child", "{background-color:{{d.color.main}} !important;}", ".layui-nav-tree .layui-this,", ".layui-nav-tree .layui-this>a,", ".layui-nav-tree .layui-nav-child dd.layui-this,", ".layui-nav-tree .layui-nav-child dd.layui-this a", "{background-color:{{d.color.selected}} !important;}", ".layui-layout-admin .layui-logo{background-color:{{d.color.logo || d.color.main}} !important;}}"].join("")).render(e = a.extend({}, t.theme, e)),
					d = document.getElementById(s);
				"styleSheet" in l ? (l.setAttribute("type", "text/css"), l.styleSheet.cssText = o) : l.innerHTML = o, l.id = s, d && r[0].removeChild(d), r[0].appendChild(l), r.attr("layadmin-themealias", e.color.alias), t.theme = t.theme || {}, layui.each(e, function(e, a) {
					t.theme[e] = a
				}), layui.data(n.tableName, {
					key: "theme",
					value: t.theme
				})
			},
			tabsPage: {},
			tabsBody: function(e) {
				return a(f).find("." + v).eq(e || 0)
			},
			tabsBodyChange: function(e, a) {
				a = a || {}, P.tabsBody(e).addClass(u).siblings().removeClass(u), A.rollPage("auto", e), layui.event.call(this, n.MOD_NAME, "tabsPage({*})", {
					url: a.url,
					text: a.text
				})
			},
			resize: function(e) {
				var a = layui.router(),
					i = a.path.join("-");
				o.off("resize", P.resizeFn[i]), e(), P.resizeFn[i] = e, o.on("resize", P.resizeFn[i])
			},
			resizeFn: {},
			runResize: function() {
				var e = layui.router(),
					a = e.path.join("-");
				P.resizeFn[a] && P.resizeFn[a]()
			},
			delResize: function() {
				var e = layui.router(),
					a = e.path.join("-");
				o.off("resize", P.resizeFn[a]), delete P.resizeFn[a]
			},
			closeThisTabs: function() {
				P.tabsPage.index && a(_).eq(P.tabsPage.index).find(".layui-tab-close").trigger("click")
			}
		},
		A = P.events = {
			flexible: function(e) {
				var a = e.find("#" + m),
					i = a.hasClass(g);
				P.sideFlexible(i ? "spread" : null)
			},
			refresh: function() {
				var e = P.tabsBody(P.tabsPage.index).find(".layadmin-iframe");
				e[0].contentWindow.location.reload(!0)
			},
			message: function(e) {
				e.find(".layui-badge-dot").remove()
			},
			theme: function() {
				P.popupRight({
					id: "LAY_adminPopupTheme",
					success: function() {
						s(this.id).render("system/theme")
					}
				})
			},
			note: function(e) {
				var a = P.screen() < 2,
					i = layui.data(n.tableName).note;
				A.note.index = P.popup({
					title: "便签",
					shade: 0,
					offset: ["41px", a ? null : e.offset().left - 250 + "px"],
					anim: -1,
					id: "LAY_adminNote",
					skin: "layadmin-note layui-anim layui-anim-upbit",
					content: '<textarea placeholder="内容"></textarea>',
					resize: !1,
					success: function(e, a) {
						var t = e.find("textarea"),
							s = void 0 === i ? "便签中的内容会存储在本地，这样即便你关掉了浏览器，在下次打开时，依然会读取到上一次的记录。是个非常小巧实用的本地备忘录" : i;
						t.val(s).focus().on("keyup", function() {
							layui.data(n.tableName, {
								key: "note",
								value: this.value
							})
						})
					}
				})
			},
			about: function() {
				P.popupRight({
					id: "LAY_adminPopupAbout",
					success: function() {
						s(this.id).render("system/about")
					}
				})
			},
			more: function() {
				P.popupRight({
					id: "LAY_adminPopupMore",
					success: function() {
						s(this.id).render("system/more")
					}
				})
			},
			back: function() {
				history.back()
			},
			setTheme: function(e) {
				var a = n.theme,
					i = e.data("index");
				e.siblings(".layui-this").data("index");
				e.hasClass(c) || (e.addClass(c).siblings(".layui-this").removeClass(c), a.color[i] && (a.color[i].index = i, P.theme({
					color: a.color[i]
				})))
			},
			rollPage: function(e, i) {
				var t = a("#LAY_app_tabsheader"),
					n = t.children("li"),
					s = (t.prop("scrollWidth"), t.outerWidth()),
					l = parseFloat(t.css("left"));
				if("left" === e) {
					if(!l && l <= 0) return;
					var o = -l - s;
					n.each(function(e, i) {
						var n = a(i),
							s = n.position().left;
						if(s >= o) return t.css("left", -s), !1
					})
				} else "auto" === e ? ! function() {
					var e, o = n.eq(i);
					if(o[0]) {
						if(e = o.position().left, e < -l) return t.css("left", -e);
						if(e + o.outerWidth() >= s - l) {
							var r = e + o.outerWidth() - (s - l);
							n.each(function(e, i) {
								var n = a(i),
									s = n.position().left;
								if(s + l > 0 && s - l > r) return t.css("left", -s), !1
							})
						}
					}
				}() : n.each(function(e, i) {
					var n = a(i),
						o = n.position().left;
					if(o + n.outerWidth() >= s - l) return t.css("left", -o), !1
				})
			},
			leftPage: function() {
				A.rollPage("left")
			},
			rightPage: function() {
				A.rollPage()
			},
			closeThisTabs: function() {
				P.closeThisTabs()
			},
			closeOtherTabs: function(e) {
				var i = "LAY-system-pagetabs-remove";
				"all" === e ? (a(_ + ":gt(0)").remove(), a(f).find("." + v + ":gt(0)").remove(), a(_).eq(0).trigger("click")) : (a(_).each(function(e, t) {
					e && e != P.tabsPage.index && (a(t).addClass(i), P.tabsBody(e).addClass(i))
				}), a("." + i).remove())
			},
			closeAllTabs: function() {
				A.closeOtherTabs("all")
			},
			shade: function() {
				P.sideFlexible()
			},
			im: function() {
				P.popup({
					id: "LAY-popup-layim-demo",
					shade: 0,
					area: ["800px", "300px"],
					title: "面板外的操作示例",
					offset: "lb",
					success: function() {
						layui.view(this.id).render("layim/demo").then(function() {
							layui.use("im")
						})
					}
				})
			}
		};
	! function() {
		var e = layui.data(n.tableName);
		e.theme && P.theme(e.theme), l.ie && l.ie < 10 && s.error("IE" + l.ie + "下访问可能不佳，推荐使用：Chrome / Firefox / Edge 等高级浏览器", {
			offset: "auto",
			id: "LAY_errorIE"
		})
	}(), t.on("tab(" + h + ")", function(e) {
		P.tabsPage.index = e.index
	}), P.on("tabsPage(setMenustatus)", function(e) {
		var i = e.url,
			t = function(e) {
				return {
					list: e.children(".layui-nav-child"),
					a: e.children("*[lay-href]")
				}
			},
			n = a("#" + C),
			s = "layui-nav-itemed",
			l = function(e) {
				e.each(function(e, n) {
					var l = a(n),
						o = t(l),
						r = o.list.children("dd"),
						d = i === o.a.attr("lay-href");
					if(r.each(function(e, n) {
							var l = a(n),
								o = t(l),
								r = o.list.children("dd"),
								d = i === o.a.attr("lay-href");
							if(r.each(function(e, n) {
									var l = a(n),
										o = t(l),
										r = i === o.a.attr("lay-href");
									if(r) {
										var d = o.list[0] ? s : c;
										return l.addClass(d).siblings().removeClass(d), !1
									}
								}), d) {
								var u = o.list[0] ? s : c;
								return l.addClass(u).siblings().removeClass(u), !1
							}
						}), d) {
						var u = o.list[0] ? s : c;
						return l.addClass(u).siblings().removeClass(u), !1
					}
				})
			};
		n.find("." + c).removeClass(c), P.screen() < 2 && P.sideFlexible(), l(n.children("li"))
	}), t.on("nav(layadmin-system-side-menu)", function(e) {
		e.siblings(".layui-nav-child")[0] && d.hasClass(x) && (P.sideFlexible("spread"), layer.close(e.data("index")))
	}), t.on("nav(layadmin-pagetabs-nav)", function(e) {
		var a = e.parent();
		a.removeClass(c), a.parent().removeClass(u)
	});
	var k = function(e) {
			var a = e.attr("lay-id"),
				i = e.index();
			P.tabsBodyChange(i, {
				url: a
			})
		},
		_ = "#LAY_app_tabsheader>li";
	r.on("click", _, function() {
		var e = a(this),
			i = e.index();
		P.tabsPage.type = "tab", P.tabsPage.index = i, k(e)
	}), t.on("tabDelete(" + h + ")", function(e) {
		var i = a(_ + ".layui-this");
		e.index && P.tabsBody(e.index).remove(), k(i), P.delResize()
	}), r.on("click", "*[lay-href]", function() {
		var e = a(this),
			i = e.attr("lay-href"),
			t = e.attr("lay-text");
		layui.router();
		P.tabsPage.elem = e;
		var n = parent === self ? layui : top.layui;
		n.index.openTabsPage(i, t || e.text())
	}), r.on("click", "*[layadmin-event]", function() {
		var e = a(this),
			i = e.attr("layadmin-event");
		A[i] && A[i].call(this, e)
	}), r.on("mouseenter", "*[lay-tips]", function() {
		var e = a(this);
		if(!e.parent().hasClass("layui-nav-item") || d.hasClass(x)) {
			var i = e.attr("lay-tips"),
				t = e.attr("lay-offset"),
				n = e.attr("lay-direction"),
				s = layer.tips(i, this, {
					tips: n || 1,
					time: -1,
					success: function(e, a) {
						t && e.css("margin-left", t + "px")
					}
				});
			e.data("index", s)
		}
	}).on("mouseleave", "*[lay-tips]", function() {
		layer.close(a(this).data("index"))
	});
	var z = layui.data.resizeSystem = function() {
		layer.closeAll("tips"), z.lock || setTimeout(function() {
			P.sideFlexible(P.screen() < 2 ? "" : "spread"), delete z.lock
		}, 100), z.lock = !0
	};
	o.on("resize", layui.data.resizeSystem), e("admin", P)
});