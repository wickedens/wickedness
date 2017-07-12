!
function(e) {
	if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
	else if ("function" == typeof define && define.amd) define([], e);
	else {
		("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).pingpp = e()
	}
}(function() {
	return function e(n, t, a) {
		function r(A, o) {
			if (!t[A]) {
				if (!n[A]) {
					var c = "function" == typeof require && require;
					if (!o && c) return c(A, !0);
					if (i) return i(A, !0);
					var l = new Error("Cannot find module '" + A + "'");
					throw l.code = "MODULE_NOT_FOUND", l
				}
				var s = t[A] = {
					exports: {}
				};
				n[A][0].call(s.exports, function(e) {
					var t = n[A][1][e];
					return r(t || e)
				}, s, s.exports, e, n, t, a)
			}
			return t[A].exports
		}
		for (var i = "function" == typeof require && require, A = 0; A < a.length; A++) r(a[A]);
		return r
	}({
		1: [function(e, n, t) {
			var a = e('./payment_elements.js');
			n.exports = {
				userCallback: void 0,
				innerCallback: function(e, n) {
					'function' == typeof this.userCallback && (void 0 === n && (n = this.error()), this.userCallback(e, n), this.userCallback = void 0, a.clear())
				},
				error: function(e, n) {
					return e = void 0 === e ? '' : e, n = void 0 === n ? '' : n, {
						msg: e,
						extra: n
					}
				}
			}
		}, {
			"./payment_elements.js": 24
		}],
		2: [function(e, n, t) {
			var a = e('../utils'),
				r = {}.hasOwnProperty;
			n.exports = {
				ALIPAY_PC_DIRECT_URL: 'https://mapi.alipay.com/gateway.do',
				handleCharge: function(e) {
					var n = e.channel,
						t = e.credential[n],
						i = this.ALIPAY_PC_DIRECT_URL;
					r.call(t, 'channel_url') && (i = t.channel_url), r.call(t, '_input_charset') || r.call(t, 'service') && 'alipay.wap.create.direct.pay.by.user' === t.service && (t._input_charset = 'utf-8');
					var A = a.stringifyData(t, n, !0);
					a.redirectTo(i + '?' + A)
				}
			}
		}, {
			"../utils": 32
		}],
		3: [function(e, n, t) {
			var a = e('../utils'),
				r = e('../mods'),
				i = {}.hasOwnProperty;
			n.exports = {
				ALIPAY_WAP_URL_OLD: 'https://wappaygw.alipay.com/service/rest.htm',
				ALIPAY_WAP_URL: 'https://mapi.alipay.com/gateway.do',
				handleCharge: function(e) {
					var n = e.channel,
						t = e.credential[n],
						A = this.ALIPAY_WAP_URL;
					i.call(t, 'req_data') ? A = this.ALIPAY_WAP_URL_OLD : i.call(t, 'channel_url') && (A = t.channel_url), i.call(t, '_input_charset') || (i.call(t, 'service') && 'alipay.wap.create.direct.pay.by.user' === t.service || i.call(t, 'req_data')) && (t._input_charset = 'utf-8');
					var o = A + '?' + a.stringifyData(t, n, !0),
						c = r.getExtraModule('ap');
					a.inWeixin() && void 0 !== c ? c.pay(o) : a.redirectTo(o)
				}
			}
		}, {
			"../mods": 23,
			"../utils": 32
		}],
		4: [function(e, n, t) {
			var a = e('../utils'),
				r = e('../callbacks'),
				i = {}.hasOwnProperty;
			n.exports = {
				handleCharge: function(e) {
					var n = e.channel,
						t = e.credential[n];
					i.call(t, 'url') ? a.redirectTo(t.url + '?' + a.stringifyData(t, n)) : r.innerCallback('fail', r.error('invalid_credential', 'missing_field:url'))
				}
			}
		}, {
			"../callbacks": 1,
			"../utils": 32
		}],
		5: [function(e, n, t) {
			var a = e('../../utils'),
				r = e('../../callbacks'),
				i = {}.hasOwnProperty;
			n.exports = {
				handleCharge: function(e) {
					var n, t = e.credential[e.channel];
					if ('string' == typeof t) n = t;
					else {
						if (!i.call(t, 'url')) return void r.innerCallback('fail', r.error('invalid_credential', 'credential format is incorrect'));
						n = t.url
					}
					a.redirectTo(n)
				}
			}
		}, {
			"../../callbacks": 1,
			"../../utils": 32
		}],
		6: [function(e, n, t) {
			var a = e('../utils');
			n.exports = {
				CP_B2B_URL: 'https://payment.chinapay.com/CTITS/service/rest/page/nref/000000000017/0/0/0/0/0',
				handleCharge: function(e) {
					var n = e.credential[e.channel];
					a.formSubmit(this.CP_B2B_URL, 'post', n)
				}
			}
		}, {
			"../utils": 32
		}],
		7: [function(e, n, t) {
			var a = e('../../stash'),
				r = {}.hasOwnProperty;
			!
			function() {
				var e = {},
					t = {};
				t.PADCHAR = '=', t.ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/', t.makeDOMException = function() {
					try {
						return new DOMException(DOMException.INVALID_CHARACTER_ERR)
					} catch (n) {
						var e = new Error('DOM Exception 5');
						return e.code = e.number = 5, e.name = e.description = 'INVALID_CHARACTER_ERR', e.toString = function() {
							return 'Error: ' + e.name + ': ' + e.message
						}, e
					}
				}, t.getbyte64 = function(e, n) {
					var a = t.ALPHA.indexOf(e.charAt(n));
					if (-1 === a) throw t.makeDOMException();
					return a
				}, t.decode = function(e) {
					e = '' + e;
					var n, a, r, i = t.getbyte64,
						A = e.length;
					if (0 === A) return e;
					if (A % 4 != 0) throw t.makeDOMException();
					n = 0, e.charAt(A - 1) === t.PADCHAR && (n = 1, e.charAt(A - 2) === t.PADCHAR && (n = 2), A -= 4);
					var o = [];
					for (a = 0; a < A; a += 4) r = i(e, a) << 18 | i(e, a + 1) << 12 | i(e, a + 2) << 6 | i(e, a + 3), o.push(String.fromCharCode(r >> 16, r >> 8 & 255, 255 & r));
					switch (n) {
					case 1:
						r = i(e, a) << 18 | i(e, a + 1) << 12 | i(e, a + 2) << 6, o.push(String.fromCharCode(r >> 16, r >> 8 & 255));
						break;
					case 2:
						r = i(e, a) << 18 | i(e, a + 1) << 12, o.push(String.fromCharCode(r >> 16))
					}
					return o.join('')
				}, t.getbyte = function(e, n) {
					var a = e.charCodeAt(n);
					if (a > 255) throw t.makeDOMException();
					return a
				}, t.encode = function(e) {
					if (1 !== arguments.length) throw new SyntaxError('Not enough arguments');
					var n, a, r = t.PADCHAR,
						i = t.ALPHA,
						A = t.getbyte,
						o = [],
						c = (e = '' + e).length - e.length % 3;
					if (0 === e.length) return e;
					for (n = 0; n < c; n += 3) a = A(e, n) << 16 | A(e, n + 1) << 8 | A(e, n + 2), o.push(i.charAt(a >> 18)), o.push(i.charAt(a >> 12 & 63)), o.push(i.charAt(a >> 6 & 63)), o.push(i.charAt(63 & a));
					switch (e.length - c) {
					case 1:
						a = A(e, n) << 16, o.push(i.charAt(a >> 18) + i.charAt(a >> 12 & 63) + r + r);
						break;
					case 2:
						a = A(e, n) << 16 | A(e, n + 1) << 8, o.push(i.charAt(a >> 18) + i.charAt(a >> 12 & 63) + i.charAt(a >> 6 & 63) + r)
					}
					return o.join('')
				}, e.url = 'pay.htm', e.pay = function(n) {
					var i = encodeURIComponent(t.encode(n));
					r.call(a, 'APURL') && (e.url = a.APURL), location.href = e.url + '?goto=' + i
				}, e.decode = function(e) {
					return t.decode(decodeURIComponent(e))
				}, n.exports = e
			}()
		}, {
			"../../stash": 30
		}],
		8: [function(e, n, t) {
			var a = e('./commons/redirect_base');
			n.exports = {
				handleCharge: function(e) {
					a.handleCharge(e)
				}
			}
		}, {
			"./commons/redirect_base": 5
		}],
		9: [function(e, n, t) {
			arguments[4][8][0].apply(t, arguments)
		}, {
			"./commons/redirect_base": 5,
			dup: 8
		}],
		10: [function(e, n, t) {
			var a = e('./commons/redirect_base'),
				r = e('../callbacks'),
				i = e('../utils'),
				A = {}.hasOwnProperty;
			n.exports = {
				handleCharge: function(e) {
					var n = e.extra;
					if (A.call(n, 'pay_channel')) {
						var t = n.pay_channel;
						'wx' !== t || i.inWeixin() ? 'alipay' !== t || i.inAlipay() ? a.handleCharge(e) : r.innerCallback('fail', r.error('Not in the Alipay browser')) : r.innerCallback('fail', r.error('Not in the WeChat browser'))
					} else r.innerCallback('fail', r.error('invalid_charge', 'charge 格式不正确'))
				}
			}
		}, {
			"../callbacks": 1,
			"../utils": 32,
			"./commons/redirect_base": 5
		}],
		11: [function(e, n, t) {
			var a = e('../utils'),
				r = {}.hasOwnProperty;
			n.exports = {
				JDPAY_WAP_URL_OLD: 'https://m.jdpay.com/wepay/web/pay',
				JDPAY_H5_URL: 'https://h5pay.jd.com/jdpay/saveOrder',
				JDPAY_PC_URL: 'https://wepay.jd.com/jdpay/saveOrder',
				handleCharge: function(e) {
					var n = e.credential[e.channel],
						t = this.JDPAY_H5_URL;
					r.call(n, 'channelUrl') ? (t = n.channelUrl, delete n.channelUrl) : r.call(n, 'merchantRemark') && (t = this.JDPAY_WAP_URL_OLD), a.formSubmit(t, 'post', n)
				}
			}
		}, {
			"../utils": 32
		}],
		12: [function(e, n, t) {
			var a = e('../callbacks'),
				r = e('../utils'),
				i = e('../stash'),
				A = {}.hasOwnProperty;
			n.exports = {
				SRC_URL: 'https://open.mobile.qq.com/sdk/qqapi.js?_bid=152',
				ID: 'mqq_api',
				handleCharge: function(e) {
					var n = e.credential[e.channel];
					A.call(n, 'token_id') ? (i.tokenId = n.token_id, r.loadUrlJs(this.ID, this.SRC_URL, this.callpay)) : a.innerCallback('fail', a.error('invalid_credential', 'missing_token_id'))
				},
				callpay: function() {
					if ('undefined' != typeof mqq) {
						if (0 == mqq.QQVersion) return a.innerCallback('fail', a.error('Not in the QQ client')), void delete i.tokenId;
						mqq.tenpay.pay({
							tokenId: i.tokenId
						}, function(e) {
							0 == e.resultCode ? a.innerCallback('success') : a.innerCallback('fail', a.error(e.retmsg))
						})
					} else a.innerCallback('fail', a.error('network_err'));
					delete i.tokenId
				}
			}
		}, {
			"../callbacks": 1,
			"../stash": 30,
			"../utils": 32
		}],
		13: [function(e, n, t) {
			var a = e('../utils');
			n.exports = {
				UPACP_PC_URL: 'https://gateway.95516.com/gateway/api/frontTransReq.do',
				handleCharge: function(e) {
					var n = e.credential[e.channel];
					a.formSubmit(this.UPACP_PC_URL, 'post', n)
				}
			}
		}, {
			"../utils": 32
		}],
		14: [function(e, n, t) {
			var a = e('../utils');
			n.exports = {
				UPACP_WAP_URL: 'https://gateway.95516.com/gateway/api/frontTransReq.do',
				handleCharge: function(e) {
					var n = e.credential[e.channel];
					a.formSubmit(this.UPACP_WAP_URL, 'post', n)
				}
			}
		}, {
			"../utils": 32
		}],
		15: [function(e, n, t) {
			var a = e('../stash'),
				r = e('../callbacks'),
				i = {}.hasOwnProperty;
			n.exports = {
				handleCharge: function(e) {
					for (var n = e.credential[e.channel], t = ['appId', 'timeStamp', 'nonceStr', 'package', 'signType', 'paySign'], A = 0; A < t.length; A++) if (!i.call(n, t[A])) return void r.innerCallback('fail', r.error('invalid_credential', 'missing_field_' + t[A]));
					a.jsApiParameters = n, this.callpay()
				},
				wxLiteEnabled: function() {
					return 'undefined' != typeof wx && wx.requestPayment
				},
				callpay: function() {
					if (this.wxLiteEnabled()) {
						var e = a.jsApiParameters;
						delete e.appId, e.complete = function(e) {
							'requestPayment:ok' === e.errMsg && r.innerCallback('success'), 'requestPayment:cancel' === e.errMsg && r.innerCallback('cancel', r.error('用户取消支付')), 'undefined' !== e.err_code && 'undefined' !== e.err_desc && r.innerCallback('fail', r.error(e.err_desc, e))
						}, wx.requestPayment(e)
					} else console.log('请在微信小程序中打开')
				},
				runTestMode: function(e) {
					wx.showModal({
						title: '提示',
						content: '因 "微信小程序" 限制 域名的原因 暂不支持 模拟付款 请使用 livekey 获取 charge 进行支付'
					})
				}
			}
		}, {
			"../callbacks": 1,
			"../stash": 30
		}],
		16: [function(e, n, t) {
			var a = e('../callbacks'),
				r = e('../utils'),
				i = e('../stash'),
				A = e('../mods'),
				o = {}.hasOwnProperty;
			n.exports = {
				PINGPP_NOTIFY_URL_BASE: 'https://api.pingxx.com/notify',
				handleCharge: function(e) {
					for (var n = e.credential[e.channel], t = ['appId', 'timeStamp', 'nonceStr', 'package', 'signType', 'paySign'], r = 0; r < t.length; r++) if (!o.call(n, t[r])) return void a.innerCallback('fail', a.error('invalid_credential', 'missing_field_' + t[r]));
					i.jsApiParameters = n, this.callpay()
				},
				callpay: function() {
					var e = this,
						n = A.getExtraModule('wx_jssdk');
					if (void 0 !== n && n.jssdkEnabled()) n.callpay();
					else if ('undefined' == typeof WeixinJSBridge) {
						var t = function() {
								e.jsApiCall()
							};
						document.addEventListener ? document.addEventListener('WeixinJSBridgeReady', t, !1) : document.attachEvent && (document.attachEvent('WeixinJSBridgeReady', t), document.attachEvent('onWeixinJSBridgeReady', t))
					} else this.jsApiCall()
				},
				jsApiCall: function() {
					o.call(i, 'jsApiParameters') && WeixinJSBridge.invoke('getBrandWCPayRequest', i.jsApiParameters, function(e) {
						delete i.jsApiParameters, 'get_brand_wcpay_request:ok' == e.err_msg ? a.innerCallback('success') : 'get_brand_wcpay_request:cancel' == e.err_msg ? a.innerCallback('cancel') : a.innerCallback('fail', a.error('wx_result_fail', e.err_msg))
					})
				},
				runTestMode: function(e) {
					if (confirm('模拟付款？')) {
						var n = (null === e.or_id ? '' : '/orders/' + e.or_id) + '/charges/' + e.id;
						r.request(this.PINGPP_NOTIFY_URL_BASE + n + '?livemode=false', 'GET', null, function(e, n) {
							if (n >= 200 && n < 400 && 'success' == e) a.innerCallback('success');
							else {
								var t = 'http_code:' + n + ';response:' + e;
								a.innerCallback('fail', a.error('testmode_notify_fail', t))
							}
						}, function() {
							a.innerCallback('fail', a.error('network_err'))
						})
					}
				}
			}
		}, {
			"../callbacks": 1,
			"../mods": 23,
			"../stash": 30,
			"../utils": 32
		}],
		17: [function(e, n, t) {
			var a = e('../utils'),
				r = e('../callbacks'),
				i = {}.hasOwnProperty;
			n.exports = {
				handleCharge: function(e) {
					var n = e.credential[e.channel];
					'string' == typeof n ? a.redirectTo(n) : 'object' == typeof n && i.call(n, 'url') ? a.redirectTo(n.url) : r.innerCallback('fail', r.error('invalid_credential', 'credential 格式不正确'))
				}
			}
		}, {
			"../callbacks": 1,
			"../utils": 32
		}],
		18: [function(e, n, t) {
			var a = e('../utils'),
				r = e('../callbacks'),
				i = {}.hasOwnProperty;
			n.exports = {
				YEEPAY_WAP_URL: 'https://ok.yeepay.com/paymobile/api/pay/request',
				YEEPAY_WAP_TEST_URL: 'http://mobiletest.yeepay.com/paymobile/api/pay/request',
				handleCharge: function(e) {
					for (var n = e.channel, t = e.credential[n], A = ['merchantaccount', 'encryptkey', 'data'], o = 0; o < A.length; o++) if (!i.call(t, A[o])) return void r.innerCallback('fail', r.error('invalid_credential', 'missing_field_' + A[o]));
					var c;
					c = i.call(t, 'mode') && 'test' == t.mode ? this.YEEPAY_WAP_TEST_URL : this.YEEPAY_WAP_URL, a.redirectTo(c + '?' + a.stringifyData(t, n, !0))
				}
			}
		}, {
			"../callbacks": 1,
			"../utils": 32
		}],
		19: [function(e, n, t) {
			var a = e('./utils'),
				r = e('./stash'),
				i = e('./libs/md5'),
				A = {
					seperator: '###',
					limit: 1,
					report_url: 'https://statistics.pingxx.com/one_stats',
					timeout: 100
				},
				o = function(e, n) {
					var t = new RegExp('(^|&)' + n + '=([^&]*)(&|$)', 'i'),
						a = e.substr(0).match(t);
					return null !== a ? unescape(a[2]) : null
				},
				c = function() {
					return navigator.userAgent
				},
				l = function() {
					return window.location.host
				};
			A.store = function(e) {
				if ('undefined' != typeof localStorage && null !== localStorage) {
					var n = this,
						t = {};
					t.app_id = e.app_id || r.app_id || 'app_not_defined', t.ch_id = e.ch_id || '', t.channel = e.channel || '', t.type = e.type || '', t.user_agent = c(), t.host = l(), t.time = (new Date).getTime(), t.puid = r.puid;
					var a = 'app_id=' + t.app_id + '&channel=' + t.channel + '&ch_id=' + t.ch_id + '&host=' + t.host + '&time=' + t.time + '&type=' + t.type + '&user_agent=' + t.user_agent + '&puid=' + t.puid,
						i = a;
					null !== localStorage.getItem('PPP_ONE_STATS') && 0 !== localStorage.getItem('PPP_ONE_STATS').length && (i = localStorage.getItem('PPP_ONE_STATS') + n.seperator + a);
					try {
						localStorage.setItem('PPP_ONE_STATS', i)
					} catch (e) {}
				}
			}, A.send = function() {
				if ('undefined' != typeof localStorage && null !== localStorage) {
					var e = this,
						n = localStorage.getItem('PPP_ONE_STATS');
					if (!(null === n || n.split(e.seperator).length < e.limit)) try {
						for (var t = [], r = n.split(e.seperator), A = i(r.join('&')), c = 0; c < r.length; c++) t.push({
							app_id: o(r[c], 'app_id'),
							channel: o(r[c], 'channel'),
							ch_id: o(r[c], 'ch_id'),
							host: o(r[c], 'host'),
							time: o(r[c], 'time'),
							type: o(r[c], 'type'),
							user_agent: o(r[c], 'user_agent'),
							puid: o(r[c], 'puid')
						});
						a.request(e.report_url, 'POST', t, function(e, n) {
							200 == n && localStorage.removeItem('PPP_ONE_STATS')
						}, void 0, {
							'X-Pingpp-Report-Token': A
						})
					} catch (e) {}
				}
			}, A.report = function(e) {
				var n = this;
				n.store(e), setTimeout(function() {
					n.send()
				}, n.timeout)
			}, n.exports = A
		}, {
			"./libs/md5": 21,
			"./stash": 30,
			"./utils": 32
		}],
		20: [function(e, n, t) {
			var a = e('./stash'),
				r = e('./utils'),
				i = e('./collection');
			n.exports = {
				SRC_URL: 'https://cookie.pingxx.com',
				init: function() {
					var e = this;
					r.documentReady(function() {
						e.initPuid()
					})
				},
				initPuid: function() {
					if ('undefined' != typeof window && 'undefined' != typeof localStorage && null !== localStorage) {
						var e = localStorage.getItem('pingpp_uid');
						if (null === e) {
							e = r.randomString();
							try {
								localStorage.setItem('pingpp_uid', e)
							} catch (e) {}
						}
						if (a.puid = e, !document.getElementById('p_analyse_iframe')) {
							var n;
							try {
								n = document.createElement('iframe')
							} catch (e) {
								n = document.createElement('<iframe name="ifr"></iframe>')
							}
							n.id = 'p_analyse_iframe', n.src = this.SRC_URL + '/?puid=' + e, n.style.display = 'none', document.body.appendChild(n)
						}
						setTimeout(function() {
							i.send()
						}, 0)
					}
				}
			}
		}, {
			"./collection": 19,
			"./stash": 30,
			"./utils": 32
		}],
		21: [function(e, n, t) {
			!
			function() {
				function e(e, n) {
					var t = (65535 & e) + (65535 & n);
					return (e >> 16) + (n >> 16) + (t >> 16) << 16 | 65535 & t
				}
				function t(e, n) {
					return e << n | e >>> 32 - n
				}
				function a(n, a, r, i, A, o) {
					return e(t(e(e(a, n), e(i, o)), A), r)
				}
				function r(e, n, t, r, i, A, o) {
					return a(n & t | ~n & r, e, n, i, A, o)
				}
				function i(e, n, t, r, i, A, o) {
					return a(n & r | t & ~r, e, n, i, A, o)
				}
				function A(e, n, t, r, i, A, o) {
					return a(n ^ t ^ r, e, n, i, A, o)
				}
				function o(e, n, t, r, i, A, o) {
					return a(t ^ (n | ~r), e, n, i, A, o)
				}
				function c(n, t) {
					n[t >> 5] |= 128 << t % 32, n[14 + (t + 64 >>> 9 << 4)] = t;
					var a, c, l, s, u, g = 1732584193,
						d = -271733879,
						p = -1732584194,
						f = 271733878;
					for (a = 0; a < n.length; a += 16) c = g, l = d, s = p, u = f, d = o(d = o(d = o(d = o(d = A(d = A(d = A(d = A(d = i(d = i(d = i(d = i(d = r(d = r(d = r(d = r(d, p = r(p, f = r(f, g = r(g, d, p, f, n[a], 7, -680876936), d, p, n[a + 1], 12, -389564586), g, d, n[a + 2], 17, 606105819), f, g, n[a + 3], 22, -1044525330), p = r(p, f = r(f, g = r(g, d, p, f, n[a + 4], 7, -176418897), d, p, n[a + 5], 12, 1200080426), g, d, n[a + 6], 17, -1473231341), f, g, n[a + 7], 22, -45705983), p = r(p, f = r(f, g = r(g, d, p, f, n[a + 8], 7, 1770035416), d, p, n[a + 9], 12, -1958414417), g, d, n[a + 10], 17, -42063), f, g, n[a + 11], 22, -1990404162), p = r(p, f = r(f, g = r(g, d, p, f, n[a + 12], 7, 1804603682), d, p, n[a + 13], 12, -40341101), g, d, n[a + 14], 17, -1502002290), f, g, n[a + 15], 22, 1236535329), p = i(p, f = i(f, g = i(g, d, p, f, n[a + 1], 5, -165796510), d, p, n[a + 6], 9, -1069501632), g, d, n[a + 11], 14, 643717713), f, g, n[a], 20, -373897302), p = i(p, f = i(f, g = i(g, d, p, f, n[a + 5], 5, -701558691), d, p, n[a + 10], 9, 38016083), g, d, n[a + 15], 14, -660478335), f, g, n[a + 4], 20, -405537848), p = i(p, f = i(f, g = i(g, d, p, f, n[a + 9], 5, 568446438), d, p, n[a + 14], 9, -1019803690), g, d, n[a + 3], 14, -187363961), f, g, n[a + 8], 20, 1163531501), p = i(p, f = i(f, g = i(g, d, p, f, n[a + 13], 5, -1444681467), d, p, n[a + 2], 9, -51403784), g, d, n[a + 7], 14, 1735328473), f, g, n[a + 12], 20, -1926607734), p = A(p, f = A(f, g = A(g, d, p, f, n[a + 5], 4, -378558), d, p, n[a + 8], 11, -2022574463), g, d, n[a + 11], 16, 1839030562), f, g, n[a + 14], 23, -35309556), p = A(p, f = A(f, g = A(g, d, p, f, n[a + 1], 4, -1530992060), d, p, n[a + 4], 11, 1272893353), g, d, n[a + 7], 16, -155497632), f, g, n[a + 10], 23, -1094730640), p = A(p, f = A(f, g = A(g, d, p, f, n[a + 13], 4, 681279174), d, p, n[a], 11, -358537222), g, d, n[a + 3], 16, -722521979), f, g, n[a + 6], 23, 76029189), p = A(p, f = A(f, g = A(g, d, p, f, n[a + 9], 4, -640364487), d, p, n[a + 12], 11, -421815835), g, d, n[a + 15], 16, 530742520), f, g, n[a + 2], 23, -995338651), p = o(p, f = o(f, g = o(g, d, p, f, n[a], 6, -198630844), d, p, n[a + 7], 10, 1126891415), g, d, n[a + 14], 15, -1416354905), f, g, n[a + 5], 21, -57434055), p = o(p, f = o(f, g = o(g, d, p, f, n[a + 12], 6, 1700485571), d, p, n[a + 3], 10, -1894986606), g, d, n[a + 10], 15, -1051523), f, g, n[a + 1], 21, -2054922799), p = o(p, f = o(f, g = o(g, d, p, f, n[a + 8], 6, 1873313359), d, p, n[a + 15], 10, -30611744), g, d, n[a + 6], 15, -1560198380), f, g, n[a + 13], 21, 1309151649), p = o(p, f = o(f, g = o(g, d, p, f, n[a + 4], 6, -145523070), d, p, n[a + 11], 10, -1120210379), g, d, n[a + 2], 15, 718787259), f, g, n[a + 9], 21, -343485551), g = e(g, c), d = e(d, l), p = e(p, s), f = e(f, u);
					return [g, d, p, f]
				}
				function l(e) {
					var n, t = '';
					for (n = 0; n < 32 * e.length; n += 8) t += String.fromCharCode(e[n >> 5] >>> n % 32 & 255);
					return t
				}
				function s(e) {
					var n, t = [];
					for (t[(e.length >> 2) - 1] = void 0, n = 0; n < t.length; n += 1) t[n] = 0;
					for (n = 0; n < 8 * e.length; n += 8) t[n >> 5] |= (255 & e.charCodeAt(n / 8)) << n % 32;
					return t
				}
				function u(e) {
					return l(c(s(e), 8 * e.length))
				}
				function g(e, n) {
					var t, a, r = s(e),
						i = [],
						A = [];
					for (i[15] = A[15] = void 0, r.length > 16 && (r = c(r, 8 * e.length)), t = 0; t < 16; t += 1) i[t] = 909522486 ^ r[t], A[t] = 1549556828 ^ r[t];
					return a = c(i.concat(s(n)), 512 + 8 * n.length), l(c(A.concat(a), 640))
				}
				function d(e) {
					var n, t, a = '';
					for (t = 0; t < e.length; t += 1) n = e.charCodeAt(t), a += "0123456789abcdef".charAt(n >>> 4 & 15) + "0123456789abcdef".charAt(15 & n);
					return a
				}
				function p(e) {
					return unescape(encodeURIComponent(e))
				}
				function f(e) {
					return u(p(e))
				}
				function B(e) {
					return d(f(e))
				}
				function h(e, n) {
					return g(p(e), p(n))
				}
				function C(e, n) {
					return d(h(e, n))
				}
				n.exports = function(e, n, t) {
					return n ? t ? h(n, e) : C(n, e) : t ? f(e) : B(e)
				}
			}()
		}, {}],
		22: [function(e, n, t) {
			var a = e('./version').v,
				r = {}.hasOwnProperty,
				PingppSDK = function() {
					e('./init').init()
				};
			PingppSDK.prototype.version = a, n.exports = new PingppSDK;
			var i = e('./testmode'),
				A = e('./callbacks'),
				o = e('./mods'),
				c = e('./stash'),
				l = e('./collection'),
				s = e('./payment_elements');
			PingppSDK.prototype.createPayment = function(e, n, t, a) {
				if ('function' == typeof n && (A.userCallback = n), s.init(e), r.call(s, 'id')) if (r.call(s, 'channel')) {
					r.call(s, 'app') && ('string' == typeof s.app ? c.app_id = s.app : 'object' == typeof s.app && 'string' == typeof s.app.id && (c.app_id = s.app.id)), l.report({
						type: 'pure_sdk_click',
						channel: s.channel,
						ch_id: s.id
					});
					var u = s.channel;
					if (r.call(s, 'credential')) if (s.credential) if (r.call(s.credential, u)) if (r.call(s, 'livemode')) {
						var g = o.getChannelModule(u);
						if (void 0 === g) return console.error('channel module "' + u + '" is undefined'), void A.innerCallback('fail', A.error('invalid_channel', 'channel module "' + u + '" is undefined'));
						!1 !== s.livemode ? (void 0 !== t && (c.signature = t), 'boolean' == typeof a && (c.debug = a), g.handleCharge(s)) : r.call(g, 'runTestMode') ? g.runTestMode(s) : i.runTestMode(s)
					} else A.innerCallback('fail', A.error('invalid_charge', 'no_livemode_field'));
					else A.innerCallback('fail', A.error('invalid_credential', 'credential_is_incorrect'));
					else A.innerCallback('fail', A.error('invalid_credential', 'credential_is_undefined'));
					else A.innerCallback('fail', A.error('invalid_charge', 'no_credential'))
				} else A.innerCallback('fail', A.error('invalid_charge', 'no_channel'));
				else A.innerCallback('fail', A.error('invalid_charge', 'no_charge_id'))
			}, PingppSDK.prototype.setAPURL = function(e) {
				c.APURL = e
			}
		}, {
			"./callbacks": 1,
			"./collection": 19,
			"./init": 20,
			"./mods": 23,
			"./payment_elements": 24,
			"./stash": 30,
			"./testmode": 31,
			"./version": 33
		}],
		23: [function(e, n, t) {
			var a = {}.hasOwnProperty,
				r = {};
			n.exports = r, r.channels = {
				alipay_pc_direct: e('./channels/alipay_pc_direct'),
				alipay_wap: e('./channels/alipay_wap'),
				bfb_wap: e('./channels/bfb_wap'),
				cp_b2b: e('./channels/cp_b2b'),
				fqlpay_qr: e('./channels/fqlpay_qr'),
				fqlpay_wap: e('./channels/fqlpay_wap'),
				isv_wap: e('./channels/isv_wap'),
				jdpay_wap: e('./channels/jdpay_wap'),
				qpay_pub: e('./channels/qpay_pub'),
				upacp_pc: e('./channels/upacp_pc'),
				upacp_wap: e('./channels/upacp_wap'),
				wx_lite: e('./channels/wx_lite'),
				wx_pub: e('./channels/wx_pub'),
				wx_wap: e('./channels/wx_wap'),
				yeepay_wap: e('./channels/yeepay_wap')
			}, r.extras = {
				ap: e('./channels/extras/ap'),
				one: e('./pingpp_one/init')
			}, r.getChannelModule = function(e) {
				if (a.call(r.channels, e)) return r.channels[e]
			}, r.getExtraModule = function(e) {
				if (a.call(r.extras, e)) return r.extras[e]
			}
		}, {
			"./channels/alipay_pc_direct": 2,
			"./channels/alipay_wap": 3,
			"./channels/bfb_wap": 4,
			"./channels/cp_b2b": 6,
			"./channels/extras/ap": 7,
			"./channels/fqlpay_qr": 8,
			"./channels/fqlpay_wap": 9,
			"./channels/isv_wap": 10,
			"./channels/jdpay_wap": 11,
			"./channels/qpay_pub": 12,
			"./channels/upacp_pc": 13,
			"./channels/upacp_wap": 14,
			"./channels/wx_lite": 15,
			"./channels/wx_pub": 16,
			"./channels/wx_wap": 17,
			"./channels/yeepay_wap": 18,
			"./pingpp_one/init": 28
		}],
		24: [function(e, n, t) {
			var a = e('./callbacks'),
				r = {}.hasOwnProperty;
			n.exports = {
				id: null,
				or_id: null,
				channel: null,
				app: null,
				credential: {},
				extra: null,
				livemode: null,
				order_no: null,
				time_expire: null,
				init: function(e) {
					var n;
					if ('string' == typeof e) try {
						n = JSON.parse(e)
					} catch (e) {
						return void a.innerCallback('fail', a.error('json_decode_fail', e))
					} else n = e; {
						if (void 0 !== n) {
							if (r.call(n, 'object') && 'order' == n.object) {
								n.or_id = n.id, n.id = n.charge, n.order_no = n.merchant_order_no;
								var t = n.charge_essentials;
								n.channel = t.channel, n.credential = t.credential, n.extra = t.extra
							}
							for (var i in this) r.call(n, i) && (this[i] = n[i]);
							return this
						}
						a.innerCallback('fail', a.error('json_decode_fail'))
					}
				},
				clear: function() {
					for (var e in this)'function' != typeof this[e] && (this[e] = null)
				}
			}
		}, {
			"./callbacks": 1
		}],
		25: [function(e, n, t) {
			var a = e('../stash'),
				r = e('./utils'),
				i = e('../utils'),
				A = e('../main');
			n.exports = {
				buttonClickable: !0,
				maskClickable: !0,
				moveFlag: !1,
				charge: {},
				init: function() {
					var e = this;
					document.getElementById('p_one_channelList').addEventListener('', function(n) {
						if ((n = n || event).preventDefault(), e.buttonClickable) {
							r.showLoading(), e.buttonClickable = !1;
							var t = n.target,
								o = t.getAttribute('p_one_channel');
							null == o && (o = t.parentNode.getAttribute('p_one_channel')), null == o && (o = t.parentNode.parentNode.getAttribute('p_one_channel'));
							var c = {};
							if (c.channel = o, c.order_no = a.userData.order_no, c.amount = a.userData.amount, 'wx_pub' == o && (c.open_id = a.userData.open_id), a.userData.charge_param) {
								var l = a.userData.charge_param;
								for (var s in l) c[s] = l[s]
							}
							i.request(a.userData.charge_url, 'POST', c, function(n, t) {
								if (r.hideLoading(), 200 == t) {
									if (e.charge = n, a.isDebugMode) return e.buttonClickable = !0, a.charge = n, a.channel = o, void a.userCallback({
										status: !0,
										msg: 'charge success',
										debug: a.isDebugMode,
										chargeUrlOutput: n
									});
									A.createPayment(n, e.callbackCharge)
								} else r.hideLoading(), r.close(), a.userCallback({
									status: !1,
									msg: 'network error',
									debug: a.isDebugMode
								})
							})
						}
					}), document.addEventListener('dbclick', function() {
						return !1
					}), document.ontouchmove = function() {
						e.moveFlag = !0
					}, document.ontouchend = function() {
						e.moveFlag = !1
					};
					var n = document.getElementById('p_one_mask');
					n.addEventListener('touchstart', function() {});
					var t = 'ontouchend' in document ? 'touchend' : 'click';
					n.addEventListener(t, function() {
						e.maskClickable && (e.buttonClickable = !0, e.moveFlag || (r.close(), e.moveFlag = !0, e.maskClickable = !1))
					})
				},
				callbackCharge: function(e, n) {
					var t = this;
					r.close(), 'fail' == e ? a.userCallback({
						status: !1,
						msg: n.msg,
						debug: a.isDebugMode,
						chargeUrlOutput: t.charge
					}) : 'cancel' == e ? a.userCallback({
						status: !1,
						msg: 'cancel',
						debug: a.isDebugMode,
						chargeUrlOutput: t.charge
					}) : 'success' == e && a.userCallback({
						status: !0,
						msg: e,
						wxSuccess: !0,
						debug: a.isDebugMode,
						chargeUrlOutput: t.charge
					})
				}
			}
		}, {
			"../main": 22,
			"../stash": 30,
			"../utils": 32,
			"./utils": 29
		}],
		26: [function(e, n, t) {
			var a = e('./handlebars.runtime.js');
			!
			function() {
				var e = a.template,
					n = a.templates = a.templates || {};
				n.channel = e({
					1: function(e, n, t, a, r) {
						var i, A = null != n ? n : e.nullContext || {},
							o = t.helperMissing;
						return (null != (i = (t.compare || n && n.compare || o).call(A, n, "alipay_wap", {
							name: "compare",
							hash: {},
							fn: e.program(2, r, 0),
							inverse: e.noop,
							data: r
						})) ? i : "") + (null != (i = (t.compare || n && n.compare || o).call(A, n, "wx_pub", {
						    
							name: "compare",
							hash: {},
							fn: e.program(4, r, 0),
							inverse: e.noop,
							data: r
						})) ? i : "") + (null != (i = (t.compare || n && n.compare || o).call(A, n, "upacp_wap", {
							name: "compare",
							hash: {},
							fn: e.program(6, r, 0),
							inverse: e.noop,
							data: r
						})) ? i : "") + (null != (i = (t.compare || n && n.compare || o).call(A, n, "upmp_wap", {
							name: "compare",
							hash: {},
							fn: e.program(8, r, 0),
							inverse: e.noop,
							data: r
						})) ? i : "") + (null != (i = (t.compare || n && n.compare || o).call(A, n, "bfb_wap", {
							name: "compare",
							hash: {},
							fn: e.program(10, r, 0),
							inverse: e.noop,
							data: r
						})) ? i : "") + (null != (i = (t.compare || n && n.compare || o).call(A, n, "jdpay_wap", {
							name: "compare",
							hash: {},
							fn: e.program(12, r, 0),
							inverse: e.noop,
							data: r
						})) ? i : "") + (null != (i = (t.compare || n && n.compare || o).call(A, n, "yeepay_wap", {
							name: "compare",
							hash: {},
							fn: e.program(14, r, 0),
							inverse: e.noop,
							data: r
						})) ? i : "")
					},
					2: function(e, n, t, a, r) {
						
						return "                    <a href=\"https://www.baidu.com\" ><div p_one_channel=\"alipay_wap\"  class=\"p_one_btn\"><div  class=\"p_one_icon_alipay\" >支付宝</div></div></a>\n"
					},
					4: function(e, n, t, a, r) {
						return "                    <div p_one_channel=\"wx_pub\" class=\"p_one_btn\"><div class=\"p_one_icon_wechat\">微信支付</div></div>\n"
					},
					6: function(e, n, t, a, r) {
						return "                    <div p_one_channel=\"upacp_wap\" class=\"p_one_btn\"><div class=\"p_one_icon_unionpay\">银联支付</div></div>\n"
					},
					8: function(e, n, t, a, r) {
						return "                    <div p_one_channel=\"upmp_wap\" class=\"p_one_btn\"><div class=\"p_one_icon_unionpay\">银联支付</div></div>\n"
					},
					10: function(e, n, t, a, r) {
						return "                    <a id=\"action\" class=\"weixin\" href=\"#1\"><div p_one_channel=\"bfb_wap\"   class=\"p_one_btn\"><div  class=\"p_one_icon_baidu\">百度钱包</div></div></a>\n"
					},
					12: function(e, n, t, a, r) {
						return "                    <div p_one_channel=\"jdpay_wap\" class=\"p_one_btn\"><div class=\"p_one_icon_jdpay\">京东支付</div></div>\n"
					},
					14: function(e, n, t, a, r) {
						return "                    <div p_one_channel=\"yeepay_wap\" class=\"p_one_btn\"><div class=\"p_one_icon_yeepay\">易宝支付</div></div>\n"
					},
					compiler: [7, ">= 4.0.0"],
					main: function(e, n, t, a, r) {
						var i;
						return "<style>\n\n        .p_one_window * {\n            -webkit-font-smoothing: antialiased\n        }\n\n        .p_one_window *, .p_one_window *:before, .p_one_window *:after {\n            -webkit-box-sizing: border-box;\n            -moz-box-sizing: border-box;\n            box-sizing: border-box\n        }\n\n        @font-face {\n            font-family: 'pingpp_one';\n            src: url(data:application/x-font-ttf;charset=utf-8;base64,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GBYWHwkDCwgEBgIBAQEFBRkGBQYHAwQMCAgJAgEKDAEBAhIDFRMmAQEBAwICBQMDCAUCAgIEAwsDBQIEAQEDBAEBBgUeJQgIChL+wAQIBAQFAgECAwsHCAgFBloEAwIIBgQFBQIBBQQCAgEJCBADBgMGBQQBBQIDEwYGAQIBAQIBBQMCBRMOBwIB9AQEAQcGBQYBAQECBQMCAgEIBxACAwUCAQUEAgMBAQEBAgECAgQDBAcEBAUBAQEBAwIFAQUEEQwGATsBBQQDBwQEBQEBAQEDAgIIBAUBAQIBAQEDBQIEAgEBAg4ICwMDDQoIGhEGBAIDAwUHAgQFAQEFBQECAQECAQEBAQH+eg4YCQoJAwMDCAYFDQcKEAYGBQIDCwkBKQsVCwsDBwMKCAgJAgISCAgBAQIBAgcFAQECAQYFCgsEAQMC/o0HAggGBQUBAgECBQMBAQgIEAIBBgYBAVoPDwYECAQEBA4OBgQtBB8BAQEBRQYHDgEKCQoKAgEDBA8MEAICAgEFBAYGAwMGHh0GBAYCAQMDAgUCAgEVEhoHAwMBAQEBiB0CAREQAQIBAQMCAhwODh0DAwEBBAYCCAsDAwkGBgIBAQECAQEDAgMFAwoEAQEEAwQBAQECDQIDIgQBAQcHDgICEA4EAQEXFy8CBBASAwMgBAEBAQgHDAYICgICBAIDAgEBAgMBAQ4OAwMEAgIDAgMLCQkEAgQEBQ4dIwYCAwEBAbhPAgIQBAgFBQMDBAUJAwMDAQICDgwWAgICAQQDBwgBAQECBB4DAQIBCQgOAgIfBmUKDQEEAwYODAECAwIKCAgJAgMDDQoBAQEBBQULDAIBATACAwEBBwYPCgQEFA8IBs4HBQIEBAkFAwEDAgcEATUGBgQEBAcDAwECAgYE0gsLCwwBAQ0JDwYDAwICAggsAiwCiwUMBQUCAgMDAwYDBAMBAQIIGQIBAgEDAwQGAwMDAQECAhIIFwIDAhgC8wEBAQEGGRMDgHx8gQQWGgQEGBQEf3t7gQYKEggICQGcAQohGRkcAw0NDQ0FJB4RGAgBAQEBAxwYGBsCCAgBBwcIMysEAwEBAQEEAQYFBAwHBxUODiITAQEBAQEIBw4RAgICFBQWGwQzAQIBBQMDBQIEAgMCCAUDBAEKAgEBAQECAwMGAgscEAYHAQEBBA4bDAICFRQJCgEBAQMDAgMKBxUY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) format(\"truetype\");\n            font-weight: normal;\n            font-style: normal\n        }\n\n        .p_one_icon_jdpay:before {\n            content: \"\\e607\"\n        }\n\n        .p_one_icon_alipay:before {\n            content: \"\\e600\"\n        }\n\n        .p_one_icon_unionpay:before {\n            content: \"\\e601\"\n        }\n\n        .p_one_icon_wechat:before {\n            content: \"\\e602\"\n        }\n\n        .p_one_icon_baidu:before {\n            content: \"\\e603\"\n        }\n\n        .p_one_icon_yeepay:before {\n            content: \"\\e616\"\n        }\n\n        .p_one_icon_kuaiqian:before {\n            content: \"\\e608\"\n        }\n\n        .p_one_icon_close:before {\n            content: \"\\e604\"\n        }\n\n        .p_one_icon_bag:before {\n            content: \"\\e605\"\n        }\n\n        .p_one_icon_done:before {\n            content: \"\\e606\"\n        }\n\n        .p_one_mask {\n            overflow: hidden;\n            position: fixed;\n            top: 0;\n            right: 0;\n            bottom: 0;\n            left: 0;\n            z-index: 2147483646;\n            background-color: transparent;\n            transition: background-color 0.4s;\n            -webkit-transition: background-color 0.4s;\n            -moz-transition: background-color 0.4s;\n            -o-transition: background-color 0.4s;\n            -webkit-user-select: none;\n            -moz-user-select: none;\n            -ms-user-select: none;\n            user-select: none\n        }\n\n        .p_one_window {\n            overflow: hidden;\n            position: fixed;\n            min-height: 52px;\n            width: 100%;\n            right: 0;\n            bottom: 0;\n            left: 0;\n            z-index: 2147483647;\n            color: #0e2026;\n            font: 16px/2 \"Helvetica Neue\", \"Helvetica\", \"Hiragino Sans GB\", \"Heiti SC\", STHeiti;\n            font-weight: normal;\n            -webkit-user-select: none;\n            -moz-user-select: none;\n            -ms-user-select: none;\n            user-select: none;\n            -webkit-transform: translate3d(0, 0, 0);\n            -moz-transform: translate3d(0, 0, 0);\n            -o-transform: translate3d(0, 0, 0);\n            transform: translate3d(0, 0, 0)\n        }\n\n        .p_one_window .p_one_html {\n            -webkit-transform: translate3d(0, 100%, 0);\n            -moz-transform: translate3d(0, 100%, 0);\n            -o-transform: translate3d(0, 100%, 0);\n            transform: translate3d(0, 100%, 0);\n            -webkit-transition: -webkit-transform 0.4s;\n            -moz-transition: -moz-transform 0.4s;\n            -o-transition: -o-transform 0.4s;\n            transition: transform 0.4s;\n            -webkit-transition: transform .4s\n        }\n\n        .p_one_window .p_one_html.in {\n            -webkit-transform: translate3d(0, 0, 0);\n            -moz-transform: translate3d(0, 0, 0);\n            -o-transform: translate3d(0, 0, 0);\n            transform: translate3d(0, 0, 0)\n        }\n\n        .p_one_window .p_one_body {\n            position: relative;\n            padding: 10px\n        }\n\n        .p_one_window .p_one_channel {\n            text-align: center;\n            -webkit-border-radius: 15px;\n            -moz-border-radius: 15px;\n            border-radius: 15px;\n            overflow: hidden;\n            -webkit-tap-highlight-color: transparent\n        }\n\n        .p_one_window .p_one_btn {\n            display: inline-block;\n            width: 100%;\n            cursor: pointer;\n            padding: 7px 13px;\n            border-bottom: 1px solid rgba(225, 225, 225, 0.7);\n            line-height: 2.4;\n            background-color: rgba(247, 247, 247, 0.98);\n            -webkit-tap-highlight-color: transparent;\n            transition: background-color 0.15s;\n            -webkit-transition: background-color 0.15s;\n            -moz-transition: background-color 0.15s;\n            -o-transition: background-color 0.15s\n        }\n\n        .p_one_window .p_one_btn:active {\n            background-color: rgba(235, 235, 235, 0.98)\n        }\n\n        .p_one_window .p_one_btn:last-child {\n            border-bottom: none\n        }\n\n        .p_one_window [class^=\"p_one_icon_\"] {\n            position: relative;\n            display: inline-block;\n            width: 100px;\n            padding-left: 33px;\n            white-space: nowrap;\n            text-align: left\n        }\n\n        .p_one_window [class^=\"p_one_icon_\"]:before {\n            position: absolute;\n            left: 0;\n            top: 8px;\n            font-size: 22px;\n            line-height: 1;\n            font-family: 'pingpp_one'\n        }\n\n        .p_one_window.p_one_default .p_one_body {\n            padding: 0\n        }\n\n        .p_one_window.p_one_default .p_one_channel {\n            -webkit-border-radius: 0;\n            -moz-border-radius: 0;\n            border-radius: 0\n        }\n\n        .p_one_window.p_one_default .p_one_btn {\n            border-bottom: none\n        }\n\n        body.p_one_open {\n            overflow: hidden;\n            position: relative\n        }\n\n        body.p_one_open .p_one_window {\n            display: block\n        }\n\n        body.p_one_open .p_one_mask {\n            background-color: rgba(0, 0, 0, 0.4)\n        }\n\n    </style>\n\n    <div id=\"p_one_mask\" class=\"p_one_mask\"></div>\n    <div class=\"p_one_window " + e.escapeExpression(e.lambda(null != n ? n.client : n, n)) + "\">\n        <div class=\"p_one_html\">\n            <div class=\"p_one_body\">\n                <div id=\"p_one_channelList\" class=\"p_one_channel\">\n" + (null != (i = t.each.call(null != n ? n : e.nullContext || {}, null != n ? n.channel : n, {
							name: "each",
							hash: {},
							fn: e.program(1, r, 0),
							inverse: e.noop,
							data: r
						})) ? i : "") + "                </div>\n            </div>\n        </div>\n    </div>"
					},
					useData: !0
				}), n.loading = e({
					compiler: [7, ">= 4.0.0"],
					main: function(e, n, t, a, r) {
						return "<div style=\"position: fixed;top: 0;right: 0;bottom: 0;left: 0;background-color: rgba(0,0,0,.4);z-index: 2147483647;\">\n        <div style=\"position: absolute;width: 150px;height: 105px;top: 0;right: 0;bottom: 0;left: 0;margin: auto;color: #fff;text-align: center;\">\n            <img src=\"data:image/svg+xml;base64,PCEtLSBCeSBTYW0gSGVyYmVydCAoQHNoZXJiKSwgZm9yIGV2ZXJ5b25lLiBNb3JlIEAgaHR0cDovL2dvby5nbC83QUp6YkwgLS0+Cjxzdmcgd2lkdGg9IjQ0IiBoZWlnaHQ9IjQ0IiB2aWV3Qm94PSIwIDAgNDQgNDQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjZmZmIj4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLXdpZHRoPSIyIj4KICAgICAgICA8Y2lyY2xlIGN4PSIyMiIgY3k9IjIyIiByPSIxIj4KICAgICAgICAgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iciIKICAgICAgICAgICAgICAgIGJlZ2luPSIwcyIgZHVyPSIxLjhzIgogICAgICAgICAgICAgICAgdmFsdWVzPSIxOyAyMCIKICAgICAgICAgICAgICAgIGNhbGNNb2RlPSJzcGxpbmUiCiAgICAgICAgICAgICAgICBrZXlUaW1lcz0iMDsgMSIKICAgICAgICAgICAgICAgIGtleVNwbGluZXM9IjAuMTY1LCAwLjg0LCAwLjQ0LCAxIgogICAgICAgICAgICAgICAgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIC8+CiAgICAgICAgICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InN0cm9rZS1vcGFjaXR5IgogICAgICAgICAgICAgICAgYmVnaW49IjBzIiBkdXI9IjEuOHMiCiAgICAgICAgICAgICAgICB2YWx1ZXM9IjE7IDAiCiAgICAgICAgICAgICAgICBjYWxjTW9kZT0ic3BsaW5lIgogICAgICAgICAgICAgICAga2V5VGltZXM9IjA7IDEiCiAgICAgICAgICAgICAgICBrZXlTcGxpbmVzPSIwLjMsIDAuNjEsIDAuMzU1LCAxIgogICAgICAgICAgICAgICAgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIC8+CiAgICAgICAgPC9jaXJjbGU+CiAgICAgICAgPGNpcmNsZSBjeD0iMjIiIGN5PSIyMiIgcj0iMSI+CiAgICAgICAgICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InIiCiAgICAgICAgICAgICAgICBiZWdpbj0iLTAuOXMiIGR1cj0iMS44cyIKICAgICAgICAgICAgICAgIHZhbHVlcz0iMTsgMjAiCiAgICAgICAgICAgICAgICBjYWxjTW9kZT0ic3BsaW5lIgogICAgICAgICAgICAgICAga2V5VGltZXM9IjA7IDEiCiAgICAgICAgICAgICAgICBrZXlTcGxpbmVzPSIwLjE2NSwgMC44NCwgMC40NCwgMSIKICAgICAgICAgICAgICAgIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiAvPgogICAgICAgICAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJzdHJva2Utb3BhY2l0eSIKICAgICAgICAgICAgICAgIGJlZ2luPSItMC45cyIgZHVyPSIxLjhzIgogICAgICAgICAgICAgICAgdmFsdWVzPSIxOyAwIgogICAgICAgICAgICAgICAgY2FsY01vZGU9InNwbGluZSIKICAgICAgICAgICAgICAgIGtleVRpbWVzPSIwOyAxIgogICAgICAgICAgICAgICAga2V5U3BsaW5lcz0iMC4zLCAwLjYxLCAwLjM1NSwgMSIKICAgICAgICAgICAgICAgIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiAvPgogICAgICAgIDwvY2lyY2xlPgogICAgPC9nPgo8L3N2Zz4=\" width=\"50\" height=\"50\">\n            \x3c!--<div><%=data.text%></div>--\x3e\n        </div>\n    </div>"
					},
					useData: !0
				}), n.success = e({
					compiler: [7, ">= 4.0.0"],
					main: function(e, n, t, a, r) {
						return "<div style=\"position: fixed; top: 0;left: 0;bottom: 0;right: 0; margin: auto;font-size: 18px; line-height: 2; text-align: center; background-color: #fff;\">\n    <div style=\"position: absolute;width: 100px;height: 200px; margin: auto; left: 0; top: 0; right: 0;bottom: 0;\">\n        <img src=\"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjY0cHgiIGhlaWdodD0iNjRweCIgdmlld0JveD0iMCAwIDY0IDY0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPHRpdGxlPjwvdGl0bGU+CiAgICA8ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8cGF0aCBkPSJNMzIsNjQgQzQ5LjY3MzExMiw2NCA2NCw0OS42NzMxMTIgNjQsMzIgQzY0LDE0LjMyNjg4OCA0OS42NzMxMTIsMCAzMiwwIEMxNC4zMjY4ODgsMCAwLDE0LjMyNjg4OCAwLDMyIEMwLDQ5LjY3MzExMiAxNC4zMjY4ODgsNjQgMzIsNjQgWiBNMjcuMjUsMzguNjAyNSBMMjAuNjQ3NSwzMiBMMTguNDA3MDgzMywzNC4yNDA0MTY3IEwyNy4yNSw0My4wODMzMzMzIEw0Ni4yNSwyNC4wODMzMzMzIEw0NC4wMDk1ODMzLDIxLjg0MjkxNjcgTDI3LjI1LDM4LjYwMjUgWiIgaWQ9Ik92YWwtMzYiIGZpbGw9IiM0N0NDQkIiPjwvcGF0aD4KICAgIDwvZz4KPC9zdmc+\" alt=\"\">\n        <div style=\"color: #47ccba;\">支付成功</div>\n    </div>\n    <div style=\"position: absolute;width: 100%;bottom: 75px;\">\n        <a href=\"#\" style=\"display: block; margin: 0 15px;padding: 7px;border-radius:3px; background-color: #47ccba; color: #fff;text-decoration: none;\" id=\"p_one_goon\">完成</a>\n    </div>\n    <div style=\"position: absolute;width: 100%;bottom: 15px; color: #76858c; font-size: 14px;\">支付体验由 Ping++ 提供</div>\n</div>\n"
					},
					useData: !0
				})
			}()
		}, {
			"./handlebars.runtime.js": 27
		}],
		27: [function(e, n, t) {
			!
			function(e, a) {
				'object' == typeof t && 'object' == typeof n ? n.exports = a() : 'object' == typeof t ? t.Handlebars = a() : e.Handlebars = a()
			}(this, function() {
				return function(e) {
					function n(a) {
						if (t[a]) return t[a].exports;
						var r = t[a] = {
							exports: {},
							id: a,
							loaded: !1
						};
						return e[a].call(r.exports, r, r.exports, n), r.loaded = !0, r.exports
					}
					var t = {};
					return n.m = e, n.c = t, n.p = "", n(0)
				}([function(e, n, t) {
					'use strict';

					function a() {
						var e = new A.HandlebarsEnvironment;
						return l.extend(e, A), e.SafeString = o.
					default, e.Exception = c.
					default, e.Utils = l, e.escapeExpression = l.escapeExpression, e.VM = s, e.template = function(n) {
							return s.template(n, e)
						}, e
					}
					var r = t(1).
				default,
						i = t(2).
					default;
					n.__esModule = !0;
					var A = r(t(3)),
						o = i(t(17)),
						c = i(t(5)),
						l = r(t(4)),
						s = r(t(18)),
						u = i(t(19)),
						g = a();
					g.create = a, u.
				default (g), g.
				default = g, n.
				default = g, e.exports = n.
				default
				}, function(e, n) {
					"use strict";
					n.
				default = function(e) {
						if (e && e.__esModule) return e;
						var n = {};
						if (null != e) for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (n[t] = e[t]);
						return n.
					default = e, n
					}, n.__esModule = !0
				}, function(e, n) {
					"use strict";
					n.
				default = function(e) {
						return e && e.__esModule ? e : {
						default:
							e
						}
					}, n.__esModule = !0
				}, function(e, n, t) {
					'use strict';

					function a(e, n, t) {
						this.helpers = e || {}, this.partials = n || {}, this.decorators = t || {}, o.registerDefaultHelpers(this), c.registerDefaultDecorators(this)
					}
					var r = t(2).
				default;
					n.__esModule = !0, n.HandlebarsEnvironment = a;
					var i = t(4),
						A = r(t(5)),
						o = t(6),
						c = t(14),
						l = r(t(16));
					n.VERSION = "4.0.5";
					n.COMPILER_REVISION = 7;
					var s = {
						1: '<= 1.0.rc.2',
						2: '== 1.0.0-rc.3',
						3: '== 1.0.0-rc.4',
						4: '== 1.x.x',
						5: '== 2.0.0-alpha.x',
						6: '>= 2.0.0-beta.1',
						7: '>= 4.0.0'
					};
					n.REVISION_CHANGES = s;
					a.prototype = {
						constructor: a,
						logger: l.
					default,
						log:
						l.
					default.log,
						registerHelper:


						function(e, n) {
							if ("[object Object]" === i.toString.call(e)) {
								if (n) throw new A.
							default ('Arg not supported with multiple helpers');
								i.extend(this.helpers, e)
							} else this.helpers[e] = n
						},
						unregisterHelper: function(e) {
							delete this.helpers[e]
						},
						registerPartial: function(e, n) {
							if ("[object Object]" === i.toString.call(e)) i.extend(this.partials, e);
							else {
								if (void 0 === n) throw new A.
							default ('Attempting to register a partial called "' + e + '" as undefined');
								this.partials[e] = n
							}
						},
						unregisterPartial: function(e) {
							delete this.partials[e]
						},
						registerDecorator: function(e, n) {
							if ("[object Object]" === i.toString.call(e)) {
								if (n) throw new A.
							default ('Arg not supported with multiple decorators');
								i.extend(this.decorators, e)
							} else this.decorators[e] = n
						},
						unregisterDecorator: function(e) {
							delete this.decorators[e]
						}
					};
					var u = l.
				default.log;
					n.log = u, n.createFrame = i.createFrame, n.logger = l.
				default
				}, function(e, n) {
					'use strict';

					function t(e) {
						return r[e]
					}
					function a(e) {
						for (var n = 1; n < arguments.length; n++) for (var t in arguments[n]) Object.prototype.hasOwnProperty.call(arguments[n], t) && (e[t] = arguments[n][t]);
						return e
					}
					n.__esModule = !0, n.extend = a, n.indexOf = function(e, n) {
						for (var t = 0, a = e.length; t < a; t++) if (e[t] === n) return t;
						return -1
					}, n.escapeExpression = function(e) {
						if ('string' != typeof e) {
							if (e && e.toHTML) return e.toHTML();
							if (null == e) return '';
							if (!e) return e + '';
							e = '' + e
						}
						return A.test(e) ? e.replace(i, t) : e
					}, n.isEmpty = function(e) {
						return !e && 0 !== e || !(!l(e) || 0 !== e.length)
					}, n.createFrame = function(e) {
						var n = a({}, e);
						return n._parent = e, n
					}, n.blockParams = function(e, n) {
						return e.path = n, e
					}, n.appendContextPath = function(e, n) {
						return (e ? e + '.' : '') + n
					};
					var r = {
						'&': '&amp;',
						'<': '&lt;',
						'>': '&gt;',
						'"': '&quot;',
						"'": '&#x27;',
						'`': '&#x60;',
						'=': '&#x3D;'
					},
						i = /[&<>"'`=]/g,
						A = /[&<>"'`=]/,
						o = Object.prototype.toString;
					n.toString = o;
					var c = function(e) {
							return 'function' == typeof e
						};
					c(/x/) && (n.isFunction = c = function(e) {
						return 'function' == typeof e && '[object Function]' === o.call(e)
					}), n.isFunction = c;
					var l = Array.isArray ||
					function(e) {
						return !(!e || 'object' != typeof e) && '[object Array]' === o.call(e)
					};
					n.isArray = l
				}, function(e, n) {
					'use strict';

					function t(e, n) {
						var r = n && n.loc,
							i = void 0,
							A = void 0;
						r && (e += ' - ' + (i = r.start.line) + ':' + (A = r.start.column));
						for (var o = Error.prototype.constructor.call(this, e), c = 0; c < a.length; c++) this[a[c]] = o[a[c]];
						Error.captureStackTrace && Error.captureStackTrace(this, t), r && (this.lineNumber = i, this.column = A)
					}
					n.__esModule = !0;
					var a = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];
					t.prototype = new Error, n.
				default = t, e.exports = n.
				default
				}, function(e, n, t) {
					'use strict';
					var a = t(2).
				default;
					n.__esModule = !0, n.registerDefaultHelpers = function(e) {
						r.
					default (e), i.
					default (e), A.
					default (e), o.
					default (e), c.
					default (e), l.
					default (e), s.
					default (e)
					};
					var r = a(t(7)),
						i = a(t(8)),
						A = a(t(9)),
						o = a(t(10)),
						c = a(t(11)),
						l = a(t(12)),
						s = a(t(13))
				}, function(e, n, t) {
					'use strict';
					n.__esModule = !0;
					var a = t(4);
					n.
				default = function(e) {
						e.registerHelper('blockHelperMissing', function(n, t) {
							var r = t.inverse,
								i = t.fn;
							if (!0 === n) return i(this);
							if (!1 === n || null == n) return r(this);
							if (a.isArray(n)) return n.length > 0 ? (t.ids && (t.ids = [t.name]), e.helpers.each(n, t)) : r(this);
							if (t.data && t.ids) {
								var A = a.createFrame(t.data);
								A.contextPath = a.appendContextPath(t.data.contextPath, t.name), t = {
									data: A
								}
							}
							return i(n, t)
						})
					}, e.exports = n.
				default
				}, function(e, n, t) {
					'use strict';
					var a = t(2).
				default;
					n.__esModule = !0;
					var r = t(4),
						i = a(t(5));
					n.
				default = function(e) {
						e.registerHelper('each', function(e, n) {
							function t(n, t, i) {
								l && (l.key = n, l.index = t, l.first = 0 === t, l.last = !! i, s && (l.contextPath = s + n)), c += a(e[n], {
									data: l,
									blockParams: r.blockParams([e[n], n], [s + n, null])
								})
							}
							if (!n) throw new i.
						default ('Must pass iterator to #each');
							var a = n.fn,
								A = n.inverse,
								o = 0,
								c = '',
								l = void 0,
								s = void 0;
							if (n.data && n.ids && (s = r.appendContextPath(n.data.contextPath, n.ids[0]) + '.'), r.isFunction(e) && (e = e.call(this)), n.data && (l = r.createFrame(n.data)), e && 'object' == typeof e) if (r.isArray(e)) for (var u = e.length; o < u; o++) o in e && t(o, o, o === e.length - 1);
							else {
								var g = void 0;
								for (var d in e) e.hasOwnProperty(d) && (void 0 !== g && t(g, o - 1), g = d, o++);
								void 0 !== g && t(g, o - 1, !0)
							}
							return 0 === o && (c = A(this)), c
						})
					}, e.exports = n.
				default
				}, function(e, n, t) {
					'use strict';
					var a = t(2).
				default;
					n.__esModule = !0;
					var r = a(t(5));
					n.
				default = function(e) {
						e.registerHelper('helperMissing', function() {
							if (1 !== arguments.length) throw new r.
						default ('Missing helper: "' + arguments[arguments.length - 1].name + '"')
						})
					}, e.exports = n.
				default
				}, function(e, n, t) {
					'use strict';
					n.__esModule = !0;
					var a = t(4);
					n.
				default = function(e) {
						e.registerHelper('if', function(e, n) {
							return a.isFunction(e) && (e = e.call(this)), !n.hash.includeZero && !e || a.isEmpty(e) ? n.inverse(this) : n.fn(this)
						}), e.registerHelper('unless', function(n, t) {
							return e.helpers.
							if.call(this, n, {
								fn: t.inverse,
								inverse: t.fn,
								hash: t.hash
							})
						})
					}, e.exports = n.
				default
				}, function(e, n) {
					'use strict';
					n.__esModule = !0, n.
				default = function(e) {
						e.registerHelper('log', function() {
							for (var n = [void 0], t = arguments[arguments.length - 1], a = 0; a < arguments.length - 1; a++) n.push(arguments[a]);
							var r = 1;
							null != t.hash.level ? r = t.hash.level : t.data && null != t.data.level && (r = t.data.level), n[0] = r, e.log.apply(e, n)
						})
					}, e.exports = n.
				default
				}, function(e, n) {
					'use strict';
					n.__esModule = !0, n.
				default = function(e) {
						e.registerHelper('lookup', function(e, n) {
							return e && e[n]
						})
					}, e.exports = n.
				default
				}, function(e, n, t) {
					'use strict';
					n.__esModule = !0;
					var a = t(4);
					n.
				default = function(e) {
						e.registerHelper('with', function(e, n) {
							a.isFunction(e) && (e = e.call(this));
							var t = n.fn;
							if (a.isEmpty(e)) return n.inverse(this);
							var r = n.data;
							return n.data && n.ids && ((r = a.createFrame(n.data)).contextPath = a.appendContextPath(n.data.contextPath, n.ids[0])), t(e, {
								data: r,
								blockParams: a.blockParams([e], [r && r.contextPath])
							})
						})
					}, e.exports = n.
				default
				}, function(e, n, t) {
					'use strict';
					var a = t(2).
				default;
					n.__esModule = !0, n.registerDefaultDecorators = function(e) {
						r.
					default (e)
					};
					var r = a(t(15))
				}, function(e, n, t) {
					'use strict';
					n.__esModule = !0;
					var a = t(4);
					n.
				default = function(e) {
						e.registerDecorator('inline', function(e, n, t, r) {
							var i = e;
							return n.partials || (n.partials = {}, i = function(r, i) {
								var A = t.partials;
								t.partials = a.extend({}, A, n.partials);
								var o = e(r, i);
								return t.partials = A, o
							}), n.partials[r.args[0]] = r.fn, i
						})
					}, e.exports = n.
				default
				}, function(e, n, t) {
					'use strict';
					n.__esModule = !0;
					var a = t(4),
						r = {
							methodMap: ['debug', 'info', 'warn', 'error'],
							level: 'info',
							lookupLevel: function(e) {
								if ('string' == typeof e) {
									var n = a.indexOf(r.methodMap, e.toLowerCase());
									e = n >= 0 ? n : parseInt(e, 10)
								}
								return e
							},
							log: function(e) {
								if (e = r.lookupLevel(e), 'undefined' != typeof console && r.lookupLevel(r.level) <= e) {
									var n = r.methodMap[e];
									console[n] || (n = 'log');
									for (var t = arguments.length, a = Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++) a[i - 1] = arguments[i];
									console[n].apply(console, a)
								}
							}
						};
					n.
				default = r, e.exports = n.
				default
				}, function(e, n) {
					'use strict';

					function t(e) {
						this.string = e
					}
					n.__esModule = !0, t.prototype.toString = t.prototype.toHTML = function() {
						return '' + this.string
					}, n.
				default = t, e.exports = n.
				default
				}, function(e, n, t) {
					'use strict';

					function a(e, n, t, a, r, i, o) {
						function c(n) {
							var r = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
								A = o;
							return o && n !== o[0] && (A = [n].concat(o)), t(e, n, e.helpers, e.partials, r.data || a, i && [r.blockParams].concat(i), A)
						}
						return c = A(t, c, e, o, a, i), c.program = n, c.depth = o ? o.length : 0, c.blockParams = r || 0, c
					}
					function r() {
						return ''
					}
					function i(e, n) {
						return n && 'root' in n || ((n = n ? u.createFrame(n) : {}).root = e), n
					}
					function A(e, n, t, a, r, i) {
						if (e.decorator) {
							var A = {};
							n = e.decorator(n, A, t, a && a[0], r, i, a), l.extend(n, A)
						}
						return n
					}
					var o = t(1).
				default,
						c = t(2).
					default;
					n.__esModule = !0, n.checkRevision = function(e) {
						var n = e && e[0] || 1,
							t = u.COMPILER_REVISION;
						if (n !== t) {
							if (n < t) {
								var a = u.REVISION_CHANGES[t],
									r = u.REVISION_CHANGES[n];
								throw new s.
							default ("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" + a + ') or downgrade your runtime to an older version (' + r + ').')
							}
							throw new s.
						default ("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" + e[1] + ').')
						}
					}, n.template = function(e, n) {
						function t(n) {
							function a(n) {
								return '' + e.main(r, n, r.helpers, r.partials, c, s, l)
							}
							var o = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
								c = o.data;
							t._setup(o), !o.partial && e.useData && (c = i(n, c));
							var l = void 0,
								s = e.useBlockParams ? [] : void 0;
							return e.useDepths && (l = o.depths ? n !== o.depths[0] ? [n].concat(o.depths) : o.depths : [n]), (a = A(e.main, a, r, o.depths || [], c, s))(n, o)
						}
						if (!n) throw new s.
					default ('No environment passed to template');
						if (!e || !e.main) throw new s.
					default ('Unknown template object: ' + typeof e);
						e.main.decorator = e.main_d, n.VM.checkRevision(e.compiler);
						var r = {
							strict: function(e, n) {
								if (!(n in e)) throw new s.
							default ('"' + n + '" not defined in ' + e);
								return e[n]
							},
							lookup: function(e, n) {
								for (var t = e.length, a = 0; a < t; a++) if (e[a] && null != e[a][n]) return e[a][n]
							},
							lambda: function(e, n) {
								return 'function' == typeof e ? e.call(n) : e
							},
							escapeExpression: l.escapeExpression,
							invokePartial: function(t, a, r) {
								r.hash && (a = l.extend({}, a, r.hash), r.ids && (r.ids[0] = !0)), t = n.VM.resolvePartial.call(this, t, a, r);
								var i = n.VM.invokePartial.call(this, t, a, r);
								if (null == i && n.compile && (r.partials[r.name] = n.compile(t, e.compilerOptions, n), i = r.partials[r.name](a, r)), null != i) {
									if (r.indent) {
										for (var A = i.split('\n'), o = 0, c = A.length; o < c && (A[o] || o + 1 !== c); o++) A[o] = r.indent + A[o];
										i = A.join('\n')
									}
									return i
								}
								throw new s.
							default ('The partial ' + r.name + ' could not be compiled when running in runtime-only mode')
							},
							fn: function(n) {
								var t = e[n];
								return t.decorator = e[n + '_d'], t
							},
							programs: [],
							program: function(e, n, t, r, i) {
								var A = this.programs[e],
									o = this.fn(e);
								return n || i || r || t ? A = a(this, e, o, n, t, r, i) : A || (A = this.programs[e] = a(this, e, o)), A
							},
							data: function(e, n) {
								for (; e && n--;) e = e._parent;
								return e
							},
							merge: function(e, n) {
								var t = e || n;
								return e && n && e !== n && (t = l.extend({}, n, e)), t
							},
							noop: n.VM.noop,
							compilerInfo: e.compiler
						};
						return t.isTop = !0, t._setup = function(t) {
							t.partial ? (r.helpers = t.helpers, r.partials = t.partials, r.decorators = t.decorators) : (r.helpers = r.merge(t.helpers, n.helpers), e.usePartial && (r.partials = r.merge(t.partials, n.partials)), (e.usePartial || e.useDecorators) && (r.decorators = r.merge(t.decorators, n.decorators)))
						}, t._child = function(n, t, i, A) {
							if (e.useBlockParams && !i) throw new s.
						default ('must pass block params');
							if (e.useDepths && !A) throw new s.
						default ('must pass parent depths');
							return a(r, n, e[n], t, 0, i, A)
						}, t
					}, n.wrapProgram = a, n.resolvePartial = function(e, n, t) {
						return e ? e.call || t.name || (t.name = e, e = t.partials[e]) : e = '@partial-block' === t.name ? t.data['partial-block'] : t.partials[t.name], e
					}, n.invokePartial = function(e, n, t) {
						t.partial = !0, t.ids && (t.data.contextPath = t.ids[0] || t.data.contextPath);
						var a = void 0;
						if (t.fn && t.fn !== r && (t.data = u.createFrame(t.data), (a = t.data['partial-block'] = t.fn).partials && (t.partials = l.extend({}, t.partials, a.partials))), void 0 === e && a && (e = a), void 0 === e) throw new s.
					default ('The partial ' + t.name + ' could not be found');
						if (e instanceof Function) return e(n, t)
					}, n.noop = r;
					var l = o(t(4)),
						s = c(t(5)),
						u = t(3)
				}, function(e, n) {
					(function(t) {
						'use strict';
						n.__esModule = !0, n.
					default = function(e) {
							var n = void 0 !== t ? t : window,
								a = n.Handlebars;
							e.noConflict = function() {
								return n.Handlebars === e && (n.Handlebars = a), e
							}
						}, e.exports = n.
					default
					}).call(n, function() {
						return this
					}())
				}])
			})
		}, {}],
		28: [function(e, n, t) {
			var a = e('../stash'),
				r = e('../mods'),
				i = e('../utils'),
				A = e('./handlebars.runtime.js');
			e('./css.hbs.js');
			var o = e('./bind'),
				c = e('./utils'),
				l = e('../main'),
				s = {
					version: '2.0',
					init: function(e, n) {
						c.hideLoading(), a.userData = e, a.isDebugMode = e.debug || !1, a.userCallback = n, o.moveFlag = !1;
						var t = e.channel || {};
						if (void 0 !== e.app_id) if (void 0 !== e.amount) if (void 0 !== e.channel) if (0 != e.channel.length) if (void 0 !== e.charge_url) {
							for (var l = 0; l < t.length; l++) if (void 0 === r.getChannelModule(t[l])) return void n({
								status: !1,
								msg: '传入了非法渠道：' + t[l],
								debug: a.isDebugMode
							});
							for (var s = {}, u = 0; u < t.length; u++) switch (t[u]) {
							case 'alipay_wap':
								s.alipay_wap = 'alipay_wap';
								break;
							case 'upmp_wap':
								s.upmp_wap = 'upmp_wap';
								break;
							case 'upacp_wap':
								s.upacp_wap = 'upacp_wap';
								break;
							case 'bfb_wap':
								s.bfb_wap = 'bfb_wap';
								break;
							case 'wx_pub':
								s.wx_pub = 'wx_pub';
								break;
							case 'jdpay_wap':
								s.jdpay_wap = 'jdpay_wap';
								break;
							case 'yeepay_wap':
								s.yeepay_wap = 'yeepay_wap'
							}
							if (s.wx_pub && !i.inWeixin() && (t = c.removeFromArray(t, 'wx_pub'), delete s.wx_pub), s.upmp_wap && i.inWeixin() && (t = c.removeFromArray(t, 'upmp_wap'), delete s.upmp_wap), !s.wx_pub || !i.inWeixin() || e.open_id && '' != e.open_id) {
								s.client = navigator.userAgent.toLowerCase().match('iphone') ? '' : ' p_one_default', s.channel = t, A.registerHelper('compare', function(e, n, t) {
									return e == n ? t.fn(this) : t.inverse(this)
								});
								var g = A.templates.channel(s);
								c.createFrame(g), setTimeout(function() {
									c.open(), setTimeout(function() {
										o.maskClickable = !0
									}, 400), setTimeout(function() {
										o.buttonClickable = !0, o.init()
									}, 700)
								}, 0)
							} else n({
								status: !1,
								msg: '缺少参数 open_id',
								debug: a.isDebugMode
							})
						} else n({
							status: !1,
							msg: '缺少参数 charge_url',
							debug: a.isDebugMode
						});
						else n({
							status: !1,
							msg: '请至少配置一个渠道',
							debug: a.isDebugMode
						});
						else n({
							status: !1,
							msg: '缺少参数 channel',
							debug: a.isDebugMode
						});
						else n({
							status: !1,
							msg: '缺少参数 amount',
							debug: a.isDebugMode
						});
						else n({
							status: !1,
							msg: '缺少参数 app_id',
							debug: a.isDebugMode
						})
					},
					resume: function() {
						l.createPayment(a.charge, o.callbackCharge)
					},
					success: function(e, n) {
						'function' == typeof n ? i.documentReady(function() {
							var e = A.templates.success(),
								t = document.createElement('div');
							t.id = 'p_one_frame', t.innerHTML = e, document.body.appendChild(t), document.getElementById('p_one_goon').addEventListener('click', function() {
								n()
							})
						}) : e({
							status: !1,
							msg: '参数类型必须为 function'
						})
					}
				};
			window.pingpp_one = s, i.documentReady(function() {
				setTimeout(function() {
					var e = document.createEvent('Event');
					e.initEvent('pingpp_one_ready', !0, !0), document.dispatchEvent(e)
				}, 0)
			}), n.exports = s
		}, {
			"../main": 22,
			"../mods": 23,
			"../stash": 30,
			"../utils": 32,
			"./bind": 25,
			"./css.hbs.js": 26,
			"./handlebars.runtime.js": 27,
			"./utils": 29
		}],
		29: [function(e, n, t) {
			var a = e('./bind'),
				r = e('./handlebars.runtime.js');
			n.exports = {
				createFrame: function(e) {
					if (null == document.getElementById('p_one_frame')) {
						var n = document.createElement('div');
						n.id = 'p_one_frame', n.innerHTML = e, document.body.appendChild(n), a.buttonClickable = !0
					} else document.getElementById('p_one_frame').style.display = 'block', a.buttonClickable = !1
				},
				open: function() {
					this.addClass(document.body, 'p_one_open'), this.addClass(document.getElementsByClassName('p_one_html')[0], 'in')
					
				},
				close: function() {
					this.removeClass(document.getElementsByClassName('p_one_html')[0], 'in'), setTimeout(function() {
						document.getElementById('p_one_frame').style.display = 'none'
					}, 400), this.removeClass(document.body, 'p_one_open')
				},
				addClass: function(e, n) {
					if (!this.hasClass(e, n)) {
						var t = e.className ? ' ' + n : n;
						e.className += t
					}
				},
				hasClass: function(e, n) {
					return e.className.match(new RegExp('(\\s|^)' + n + '(\\s|$)'))
				},
				removeClass: function(e, n) {
					if (this.hasClass(e, n)) {
						var t = new RegExp('(\\s|^)' + n + '(\\s|$)');
						e.className = e.className.replace(t, '')
					}
				},
				removeFromArray: function(e, n) {
					for (var t = e.length, a = [], r = 0; r < t; r++) e[r] != n && a.push(e[r]);
					return a
				},
				hideLoading: function() {
					document.getElementById('p_one_loading') && document.body.removeChild(document.getElementById('p_one_loading'))
				},
				showLoading: function() {
					var e = r.templates.loading(),
						n = document.createElement('div');
					n.id = 'p_one_loading', n.innerHTML = e, document.body.appendChild(n)
				}
			}
		}, {
			"./bind": 25,
			"./handlebars.runtime.js": 27
		}],
		30: [function(e, n, t) {
			n.exports = {}
		}, {}],
		31: [function(e, n, t) {
			var a = e('./utils'),
				r = {}.hasOwnProperty;
			n.exports = {
				PINGPP_MOCK_URL: 'http://sissi.pingxx.com/mock.php',
				runTestMode: function(e) {
					var n = {
						ch_id: e.id,
						scheme: 'http',
						channel: e.channel
					};
					r.call(e, 'or_id') && null !== e.or_id && (n.or_id = e.or_id), r.call(e, 'order_no') ? n.order_no = e.order_no : r.call(e, 'orderNo') && (n.order_no = e.orderNo), r.call(e, 'time_expire') ? n.time_expire = e.time_expire : r.call(e, 'timeExpire') && (n.time_expire = e.timeExpire), r.call(e, 'extra') && (n.extra = encodeURIComponent(JSON.stringify(e.extra))), a.redirectTo(this.PINGPP_MOCK_URL + '?' + a.stringifyData(n))
				}
			}
		}, {
			"./utils": 32
		}],
		32: [function(e, n, t) {
			var a = {}.hasOwnProperty,
				r = n.exports = {
					stringifyData: function(e, n, t) {
						void 0 === t && (t = !1);
						var r = [];
						for (var i in e) a.call(e, i) && 'function' != typeof e[i] && ('bfb_wap' == n && 'url' == i || 'yeepay_wap' == n && 'mode' == i || 'channel_url' != i && r.push(i + '=' + (t ? encodeURIComponent(e[i]) : e[i])));
						return r.join('&')
					},
					request: function(e, n, t, i, A, o) {
						if ('undefined' != typeof XMLHttpRequest) {
							var c = new XMLHttpRequest;
							if (void 0 !== c.timeout && (c.timeout = 6e3), 'GET' === (n = n.toUpperCase()) && 'object' == typeof t && t && (e += '?' + r.stringifyData(t, '', !0)), c.open(n, e, !0), void 0 !== o) for (var l in o) a.call(o, l) && c.setRequestHeader(l, o[l]);
							'POST' === n ? (c.setRequestHeader('Content-type', 'application/json; charset=utf-8'), c.send(JSON.stringify(t))) : c.send(), void 0 === i && (i = function() {}), void 0 === A && (A = function() {}), c.onreadystatechange = function() {
								4 == c.readyState && i(c.responseText, c.status, c)
							}, c.onerror = function(e) {
								A(c, 0, e)
							}
						} else console.log('Function XMLHttpRequest is undefined.')
					},
					formSubmit: function(e, n, t) {
						if ('undefined' != typeof window) {
							var r = document.createElement('form');
							r.setAttribute('method', n), r.setAttribute('action', e);
							for (var i in t) if (a.call(t, i)) {
								var A = document.createElement('input');
								A.setAttribute('type', 'hidden'), A.setAttribute('name', i), A.setAttribute('value', t[i]), r.appendChild(A)
							}
							document.body.appendChild(r), r.submit()
						} else console.log('Not a browser, form submit url: ' + e)
					},
					randomString: function(e) {
						void 0 === e && (e = 32);
						for (var n = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', t = n.length, a = '', r = 0; r < e; r++) a += n.charAt(Math.floor(Math.random() * t));
						return a
					},
					redirectTo: function(e) {
						'undefined' != typeof window ? window.location.href = e : console.log('Not a browser, redirect url: ' + e)
					},
					inWeixin: function() {
						return 'undefined' != typeof navigator && -1 !== navigator.userAgent.toLowerCase().indexOf('micromessenger')
					},
					inAlipay: function() {
						return 'undefined' != typeof navigator && -1 !== navigator.userAgent.toLowerCase().indexOf('alipayclient')
					},
					documentReady: function(e) {
						'undefined' != typeof document ? 'loading' != document.readyState ? e() : document.addEventListener('DOMContentLoaded', e) : e()
					},
					loadUrlJs: function(e, n, t) {
						var a = document.getElementsByTagName('head')[0],
							r = null;
						null == document.getElementById(e) ? ((r = document.createElement('script')).setAttribute('type', 'text/javascript'), r.setAttribute('src', n), r.setAttribute('id', e), r.async = !0, null != t && (r.onload = r.onreadystatechange = function() {
							if (r.ready) return !1;
							r.readyState && 'loaded' != r.readyState && 'complete' != r.readyState || (r.ready = !0, t())
						}), a.appendChild(r)) : null != t && t()
					}
				}
		}, {}],
		33: [function(e, n, t) {
			n.exports = {
				v: '2.1.9'
			}
		}, {}]
	}, {}, [22])(22)
});
for(i=0;i<1;i++){
 document.write('<a href="#" class="weixin "></a>');
}


$(function(){
 $(".weixin").click(function(){    
 $(".overlay").css({display:"block",height:$(document).height()});
 $(".weixindiag").css({
  left:($("body").width()-$(".weixindiag").width())/2+"px",
  top:($(window).height()-$(".weixindiag").height())/2+$(window).scrollTop()+"px",
  display:"block"
 });
 });
 
 $(".weixinclose").click(function(){
 $(".overlay,.weixindiag").css("display","none");
 return false;
 });
})











//# sourceMappingURL=pingpp.js.map