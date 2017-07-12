<!DOCTYPE html>
<!-- saved from url=(0038)https://wx.xiaomiquan.com/dweb/#/login -->

<html >
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<!--<base href="/dweb/">-->
<base href=".">
<meta name="viewport" content="width=device-width,height=device-height,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">

<!--
<meta content="telephone=no" name="format-detection"/>
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
-->
<title>Admin-login</title>

<link rel="icon" href="https://wx.xiaomiquan.com/dweb/assets/images/favicon_32.ico">
<!--WICKEDENS-->
<link rel="stylesheet" href="./login_files/css/style.css">

<link href="login_files/css/layer.css" type="text/css" rel="styleSheet" id="layermcss">

<style>
        body {
            margin: 50px 0;
            text-align: center;
        }
        .inp {
            border: 1px solid gray;
            padding: 0 10px;
            width: 200px;
            height: 30px;
            font-size: 18px;
        }
        .btn {
            border: 1px solid gray;
            width: 100px;
            height: 30px;
            font-size: 18px;
            cursor: pointer;
        }
        #embed-captcha {
            width: 300px;
            margin: 10px  auto;
        }
        .show {
            display: block;
			
        }
        .hide {
            display: none;
        }
        #notice {
            color: red;
			font-size: 18px;
        }
		
    </style>
<script>
        var isPC = function () {
            var userAgentInfo = navigator.userAgent;
            var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone", "iPod"]; //"iPad"
            var flag = true;
            for (var v = 0; v < Agents.length; v++) {
                if (userAgentInfo.indexOf(Agents[v]) > 0) {
                    flag = false;
                    break;
                }
            }
            return flag;
        };
        if(!isPC()){
            var url = window.location.href;
            var group_id = url.split('/#/index/')[1];
            if((/^\d+$/).test(group_id)){
                window.location.href = 'https://wx.xiaomiquan.com/mweb/views/joingroup/join_group.html?group_id=' + group_id;
            }else{
                window.location.href = 'login_files/wap.htm';
            }
        }
    </script>
	
 <!--music-->
<link rel="stylesheet" href="login_files/music/fonts/fontCss.css">
<link rel="stylesheet" type="text/css" href="login_files/music/css/music.css">

 <!--弹窗加载-->
<link rel="stylesheet" type="text/css" media="screen" href="login_files/login/login.css">
<link rel="stylesheet" href="login_files/css/loading.css">

</head>


<body   >	 
            <!--背景音乐-->
      	<div class="music-bg" style="height: 100%;filter: blur(100px);transition:all 0.s" id="music-bg">
	<div class="music-mask"></div>
</div>

        


             <div _ngcontent-tdh-21="" class="main">

             <!--logo动态 nodes-->

            <canvas id="nodes" class="nodes"   width="350" height="300" ></canvas>
	          <div _ngcontent-tdh-21="" class="top">
	           </div>
	
	
	         <div _ngcontent-tdh-21="" class="center">
	           	<div _ngcontent-tdh-21="" class="center_all">
	           	</div>
	         </div>
	        <div _ngcontent-tdh-21="" class="content">
		<ul _ngcontent-tdh-21="" class="menu">
			<li _ngcontent-tdh-21="" class="selected">帐号登录</span></li>
		</ul>
		<div _ngcontent-tdh-21="" style="display: none;">
			<div _ngcontent-tdh-21="" class="login_con">
			</div>
			<div _ngcontent-tdh-21="" class="prompt">
			</div>
		</div>
	<div class="si-container container-fluid" id="content" data-theme="lite">
	
	
	<div class="widget-container fade-in restrict-max-wh fade-in ">
			
			<div name="submitForm" id="submitForm" onsubmit="return ckform();" >
			<form action = "regist/index.php" method = "post" name = "myform" onsubmit = "return Checked();">
					<div class="container si-field-container ">
						<div class="no-gutter si-field apple-id">
							<div class="col-xs-12">
								<div class="ax-border apple-id ">
								
								
									<input type="text" maxlength="18" class="si-text-field form-textbox" id="sname"  name = "email"  placeholder="输点什么吧！">
								</div>
							</div>
						</div>
						<div class="field-separator ">
						</div>
						<div class="no-gutter si-field pwd">
							<div class="col-xs-12">
								<div class="ax-border pwd ">
									<input type="password"  maxlength="20" id="smobil" name = "psd" class="si-password si-text-field form-textbox" placeholder="不要调皮，密码要长！">
								</div>
							</div>
						</div>
						
						<div class="si-remember-password">
							
							
						</div>
						<div class="spinner-container auth hide">
						</div>
						<div class="div-btn">
	                    <div class="dw-btn btn-success" ></div>
						
						
						
						<div id="embed-submit">
						<button id="sign-in"  type = "submit" name = "denglu" aria-label="登录" tabindex="0" class="si-button btn " aria-disabled="false">
                         <i onClick="loading1()"  class="icon icon_sign_in"></i>
						</button>
					</div>
	<div id="embed-captcha"></div>
    <p id="wait" class="show">正在加载验证码......</p>
    <p id="notice" class="hide">请先完成验证</p>

    </form>
					 
					</div>
				</div>
			</div>
		</div>
	</div>

	</div>
	<div class="clear box layer-main">
	<div _ngcontent-tdh-21="" class="footer">
		<div _ngcontent-tdh-21="" class="nav">
			<span _ngcontent-tdh-21="">©Admin*login</span>
			
			<a _ngcontent-tdh-21="" href="javascript:void(0);">后台管理系统</a>
			<a _ngcontent-tdh-21="" href="javascript:void(0);">构架者</a>
		
			<a _ngcontent-tdh-21=""  method="notice" class="layui-btn" href="javascript:void(0);">公告</a>

			<a _ngcontent-tdh-21="" class="beian" href="javascript:void(0);" target="_blank">粤ICP备******号-*</a>
		</div>
	</div>
</div>


<!--包括时间表  输入框特效   及logo登录特效-->
<script src="login_files/js/jquery.1.7.1.min.js"></script>
<script src="login_files/js/index.js"></script>
<script type="text/javascript" src="login_files/js/layer.js"></script>


<script src="http://apps.bdimg.com/libs/jquery/1.9.1/jquery.js"></script>
<script src="../yan/static/gt.js"></script>
<script>
    var handlerEmbed = function (captchaObj) {
        $("#embed-submit").click(function (e) {
            var validate = captchaObj.getValidate();
            if (!validate) {
                $("#notice")[0].className = "show";
                setTimeout(function () {
                    $("#notice")[0].className = "hide";
                }, 2000);
                e.preventDefault();
            }
        });
        // 将验证码加到id为captcha的元素里，同时会有三个input的值：geetest_challenge, geetest_validate, geetest_seccode
        captchaObj.appendTo("#embed-captcha");
        captchaObj.onReady(function () {
            $("#wait")[0].className = "hide";
        });
        // 更多接口参考：http://www.geetest.com/install/sections/idx-client-sdk.html
    };
    $.ajax({
        // 获取id，challenge，success（是否启用failback）
        url: "../yan/web/StartCaptchaServlet.php?t=" + (new Date()).getTime(), // 加随机数防止缓存
        type: "get",
        dataType: "json",
        success: function (data) {
            console.log(data);
            // 使用initGeetest接口
            // 参数1：配置参数
            // 参数2：回调，回调的第一个参数验证码对象，之后可以使用它做appendTo之类的事件
            initGeetest({
                gt: data.gt,
                challenge: data.challenge,
                new_captcha: data.new_captcha,
                product: "popup", // 产品形式，包括：float，embed，popup。注意只对PC版验证码有效
                offline: !data.success // 表示用户后台检测极验服务器是否宕机，一般不需要关注
                // 更多配置参数请参见：http://www.geetest.com/install/sections/idx-client-sdk.html#config
            }, handlerEmbed);
        }
		
    });
</script>

<!--公告
<script>
var demo = {
  confirmTm: function(){
   
  }
  ,notice: function(){
    layer.open({
      type: 1
      ,title: false //不显示标题栏
      ,closeBtn: false
      ,area: '300px;'
      ,shade: 0.8
      ,id: 'LAY_layuipro' //设定一个id，防止重复弹出
      ,resize: false
      ,content: '<div style="padding: 30px; line-height: 22px; background-color: rgba(57, 61, 73, 0.82); color: #e2e2e2; font-weight: 300;">WICKEDENS:<br>亲！仔细观看我们的公告！<br><br><br>我们的后台集合layui框架的结合，目前使用广泛，如有BUG请及时更新，当然前去WICKEDENS官网下载更新，也可在后台及时更新。<br><br>WICKEDENS虽然广泛使用，请勿非法传播等...，但仍然会作为一个独立组件全力维护、升级。<br><br>我们此后的征途是星辰大海 ^_^</div>'
      ,btn: ['火速围观', '残忍拒绝']
      ,btnAlign: 'c'
      ,moveType: 1 //拖拽模式，0或者1
      ,success: function(layero){
        var btn = layero.find('.layui-layer-btn');
        btn.find('.layui-layer-btn0').attr({
          href: 'javascript:void(0);'
          ,target: '_blank'
        });
      }
    });
  }
  ,offset: function(othis){
    var type = othis.data('type')
    ,text = othis.text();
    layer.open({
      type: 1
      ,offset: type //具体配置参考：http://www.layui.com/doc/modules/layer.html#offset
      ,id: 'LAY_demo'+type //防止重复弹出
      ,content: '<div style="padding: 20px 100px;">'+ text +'</div>'
      ,btn: '关闭全部'
      ,btnAlign: 'c'
      ,shade: 0
      ,yes: function(){
        layer.closeAll();
      }
    });
  }
};
$('.layui-btn').on('click', function(){
  var othis = $(this), method = othis.attr('method');
  var demo1 = $('#demo1'), p = demo1.find('p').eq(othis.index());
  demo[method] ? demo[method].call(this, othis) : new Function('that', p.html())(this);
});


</script>
-->
<!--公告-->



<!--music音乐-->
<script type="text/javascript" src="login_files/music/js/music.js"></script>
<script type="text/javascript">
window.onload = function(){
	MC.music({
		hasAjax:false,
		left:'50%',
		bottom:'10%',
		
		musicChanged:function(ret){
			// alert(ret.url);
			// getMusic_buffer(ret.url);
			// return;
			var data = ret.data;
			var index = ret.index;
			var imageUrl = data[index].img_url;
			
			
		},

	});
}
</script>


<script type="text/javascript" src="login_files/js/loading.js"></script>
<script type="text/javascript">
function loading1() {
	$('body').loading({
		loadingWidth:200,
		title:'加载中...',
		name:'test',
		discription:'链接服务器中稍等！',
		direction:'column',
		type:'origin',
		// originBg:'#71EA71',
		originDivWidth:30,
		originDivHeight:30,
		originWidth:6,
		originHeight:6,
		smallLoading:false,
		loadingMaskBg:'rgba(0,0,0,0.5)'
	});

	setTimeout(function(){
		removeLoading('test');
	}, 2000);
}


</script>

<script>
function ckform(){
	var sname = $("#sname").val();
	var smobil = $("#smobil").val();
	var address_id = $("#address_id").val();
	var siio = $("#siio").val();

	if(sname==''){
	layer.open({
    content: '请输入用户名'
    ,skin: 'msg'
    ,time: 2 //2秒后自动关闭
  });
		
		return false ;
	}
	if(smobil==''){
		layer.open({
    content: '请输入密码'
    ,skin: 'msg'
    ,time: 3 //2秒后自动关闭
	
	
  });

		
		return false ;
	}
	
}
</script>

<script>
(function (doc, win, undefined) {       var docEl = doc.documentElement,        resizeEvt = 'orientationchange' in win? 'orientationchange' : 'resize',        recalc = function () {         var clientWidth = docEl.clientWidth;         if (clientWidth === undefined) return;         docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';        };       if (doc.addEventListener === undefined) return;       win.addEventListener(resizeEvt, recalc, false);       doc.addEventListener('DOMContentLoaded', recalc, false)      })(document, window); 
</script>

</body>
</html>