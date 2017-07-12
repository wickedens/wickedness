<!DOCTYPE html>
<!-- saved from url=(0091)https://pay.swiftpass.cn/pay/jspay?token_id=198faff4fa1dea4754cb3c8f2ebb53bec&showwxtitle=1 -->
<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>微信安全支付</title>

<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="format-detection" content="telephone=no">
<style type="text/css">
body{padding: 0;margin:0;background-color:#eeeeee;font-family: '黑体';}
.pay-main{background-color: #4cb131;padding-top: 20px;padding-left: 20px;padding-bottom: 20px;}
.pay-main img{margin: 0 auto;display: block;}
.pay-main .lines{margin: 0 auto;text-align: center;color:#cae8c2;font-size:12pt;margin-top: 10px;}
.tips .img{margin: 20px;}
.tips .img img{width:20px;}
.tips span{vertical-align: top;color:#ababab;line-height:18px;padding-left: 10px;padding-top:0px;}
.action{background:#4cb131;padding: 10px 0;color:#ffffff;text-align: center;font-size:14pt;border-radius: 10px 10px; margin: 15px;}
.action:focus{background:#4cb131;}
.action.disabled{background-color:#aeaeae;}
.footer{position: absolute;bottom:0;left:0;right:0;text-align: center;padding-bottom: 20px;font-size:10pt;color:#aeaeae;}
.footer .ct-if{margin-top:6px;font-size:8pt;}
</style>
<!--仅微信网页打开--><!--
<script type="text/javascript">
    // 对浏览器的UserAgent进行正则匹配，不含有微信独有标识的则为其他浏览器
    var useragent = navigator.userAgent;
    if (useragent.match(/MicroMessenger/i) != 'MicroMessenger') {
        // 这里警告框会阻塞当前页面继续加载
        alert('已禁止本次访问：您必须使用微信内置浏览器访问本页面！');
        // 以下代码是用javascript强行关闭当前页面
        var opened = window.open('about:blank', '_self');
        opened.opener = null;
        opened.close();
    }
</script>



<!--标签 去除a标记下划线-->
<style> 
a{text-decoration:none;color:#333;}
</style> 

<script></script></head>
<body>
<div class="conainer">
<div class="pay-main">
<img src="./微信安全支付_files/pay_logo.png">
<div class="lines"><span>微信安全支付</span></div>
</div>
<div class="tips">
<div class="img">
<img src="./微信安全支付_files/pay_ok.png">
<span>已开启支付安全</span>
</div>
</div>
<a href="pay/index.php">
<div id="action" class="action" onclick="onApiSuccess();">确认支付</div></a>
<div class="footer"><div>支付安全由中国人民财产保险股份有限公司承保</div><div class="ct-if"></div></div>
</div>


</body></html>