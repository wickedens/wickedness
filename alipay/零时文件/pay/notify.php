<?php
/*
 * 统一回调通知页面 (需商户在控制台应用配置中设置Notify_url)
 * 2017-2-24
 * http://www.ispay.cn
 */
require_once 'config.php';
require_once 'lib/Ispay.class.php';
date_default_timezone_set('Asia/Shanghai');
//实例化
$Ispay = new ispayService($config['requestUrl'], $config['payId'], $config['payKey']);
//接受ISPAY通知返回的支付渠道
$payChannel = $_GET['payChannel']; //(alipay=支付宝;wxpay=微信支付;qqpay=手Q支付)
//接受ISPAY通知返回的支付金额
$Money = $_GET['Money'];  //(单位分)
//接受ISPAY通知返回的订单号
$orderNumber = $_GET['orderNumber'];  //(商户订单号)
//接受ISPAY通知返回的回调签名
$callbackSign = $_GET['callbackSign'];  //(详情查看ISPAY Api文档)
//回调签名校验
if($Ispay->callbackSignCheck($payChannel, $Money, $orderNumber, $callbackSign)){
	//回调请求校验  (有效预防商户泄露payKey导致回调签名遭到破解的另一种校验方式,弊端会影响回调的成功率,要求安全性建议开启。) 开启请将注释//去掉
	//if(!$Ispay->callbackRequestCheck($payChannel, $Money, $orderNumber)){echo "fail!";exit;}
	//<--------------------------商户业务代码写在下方-------------------------->



	//<--------------------------商户业务代码写在上方-------------------------->
	//下方输出是告知ISPAY服务器业务受理成功,请不要修改下方输出内容,否则会导致重复通知,ISPAY服务器会在24小时内通知8次,输出SUCCESS则不进行通知
	echo "SUCCESS";
}else{
	echo "callbackSign fail!";
	exit;
}
?>