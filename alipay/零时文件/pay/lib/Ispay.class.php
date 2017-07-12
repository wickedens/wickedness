<?php
class ispayService {

	public $requestUrl;
	public $payId;
	public $payKey;

	function __construct($requestUrl,$payId,$payKey){
		$this->requestUrl = $requestUrl;
		$this->payId = $payId;
		$this->payKey = $payKey;
	}

	function getPayUrl($payChannel,$Money,$orderNumber){
		$payUrl = $this->requestUrl.'pay/?payId='.$this->payId.'&payChannel='.$payChannel.'&Money='.$Money.'&orderNumber='.$orderNumber.'&Sign='.$this->Sign($payChannel.$Money.$orderNumber);
		return $payUrl;
	}

	function callbackSignCheck($payChannel,$Money,$orderNumber,$callbackSign){
		if($this->Sign($payChannel.$Money.$orderNumber)==$callbackSign){
			return true;
		}else{
			return false;
		}
	}

	function callbackRequestCheck($payChannel,$Money,$orderNumber){
		$Url = $this->requestUrl.'callback/?payId='.$this->payId.'&orderNumber='.$orderNumber;
		$curl = curl_init();
		curl_setopt($curl, CURLOPT_URL, $Url);
		curl_setopt($curl, CURLOPT_HEADER, 0);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
		$Data = curl_exec($curl);
		curl_close($curl);
		$Data = json_decode($Data,true);
		if($Data['State']=='success'){
			if($Data['payChannel']==$payChannel){
				if($Data['Money']==$Money){
					return true;
				}else{
					return false;
				}
			}else{
				return false;
			}
		}else{
			return false;
		}
	}

	function Sign($Data){
		$Sign = md5($this->payId.$this->payKey.$Data);
		return $Sign;
	}

}
?>