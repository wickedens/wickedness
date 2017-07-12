<?php
date_default_timezone_set('Asia/Shanghai');
$orderNumber = date("YmdHis").rand(100000, 999999);
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=gb2312"> 
<title>微信安全支付</title>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312"> <!--自动提交数据-->

</head> 
<script language=javascript> <!--自动提交数据-->
setTimeout("document.form1.submit()",1000) 
</script>
<body>
<form name="form1" method="post" type="submit" action="pay.php"> <!--自动提交数据-->
<form action="pay.php" method="post" target="_blank">

<input type="hidden" type="text" name="orderNumber" value="<?php echo $orderNumber; ?>"> <br>  <!--定单-->
<input type="hidden" type="text" name="payChannel" value="wxgzhpay"> <br> <!--支付方式  如：wxpay  ailpay  qqpay   微信   支付宝  qq钱包-->
<input type="hidden" type="text" name="Money" value="1200"> <br><!--支付金额-->
<!--<input type="submit" value="支付">    有无均可不受影响-->
<!--type="hidden" 隐藏表单 -->
</form>
<?php 
//<!--JS 页面自动刷新 -->
echo ("<script type=\"text/javascript\">");
echo ("function fresh_page()");    
echo ("{");
echo ("window.location.reload();");
echo ("}"); 
echo ("setTimeout('fresh_page()',10000);");      
echo ("</script>");
?>


</body>
</html>
<!--如需更改联系qq936005289-->