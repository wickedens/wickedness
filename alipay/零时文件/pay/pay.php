<?php
/* 
 * 统一下单支付页面
 * 2017-2-24
 * http://www.ispay.cn
 */
require_once 'config.php';
require_once 'lib/Ispay.class.php';
date_default_timezone_set('Asia/Shanghai');
//实例化
$Ispay = new ispayService($config['requestUrl'], $config['payId'], $config['payKey']);
//支付渠道
$payChannel = $_POST['payChannel']; //(alipay=支付宝;wxpay=微信支付;qqpay=手Q支付)
//支付金额
$Money = $_POST['Money']*100;  //(单位分)
//订单号
$orderNumber = $_POST['orderNumber']; //(商户生成订单号,支付完成后由ISPAY通知返回给商户)
//获取支付链接并跳转
$payUrl = $Ispay->getPayUrl($payChannel, $Money, $orderNumber);
header("Location: ".$payUrl);
?>