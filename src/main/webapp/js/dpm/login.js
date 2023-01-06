
/**
  * @File Name : login.js
  * @Description : 로그인
  * @Modification Information
  * 
  *   수정일       수정자                   수정내용
  *  -------    --------    ---------------------------
  *  2019.04.01             최초 생성
  *
  *  
  *
 */

var modLogin = (function(){
	
	/**
	 * ID저장 기능을 위한 cookie set 
	 */	
	function setCookie(cookieName, value, exdays) {
	    var exdate = new Date();
	    exdate.setDate(exdate.getDate() + exdays);
	    var cookieValue = escape(value) + ((exdays==null) ? "" : "; expires=" + exdate.toGMTString());
	    document.cookie = cookieName + "=" + cookieValue;			
	};

	/**
	 * cookie에 저장된 ID get 
	 */		
	function getCookie(cookieName) {
	    cookieName = cookieName + '=';
	    var cookieData = document.cookie;
	    var start = cookieData.indexOf(cookieName);
	    var cookieValue = '';
	    if(start != -1){
	        start += cookieName.length;
	        var end = cookieData.indexOf(';', start);
	        if(end == -1)end = cookieData.length;
	        cookieValue = cookieData.substring(start, end);
	    }
	    return unescape(cookieValue);			
	};
	
	/**
	 * cookie정보 삭제 
	 */	
	function deleteCookie(cookieName) {
	    var expireDate = new Date();
	    expireDate.setDate(expireDate.getDate() - 1);
	    document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString();
	};
	
	/**
	 * 로그인처리 
	 */	
	function login() {
		var objChrr;
		
		if(modComm.isEmpty($("#txtUserId").val())) {
			alert("ID를 입력하십시오.");
			$("#txtUserId").focus();
			return;
		}
		if(modComm.isEmpty($("#txtPassword").val())) {
			alert("비밀번호를 입력하십시오.");
			$("#txtPassword").focus();
			return;
		}
		
		objChrr = userLoginCheck($("#txtUserId").val(),$("#txtPassword").val());
		if(!modComm.isEmpty(objChrr) && objChrr.hasOwnProperty("chrrId") && !modComm.isEmpty(objChrr.chrrId)) {
			if(objChrr.pwdYn =="N"){
				alert("비밀번호가 일치하지 않습니다.");
				$("#txtPassword").focus();
				return;			
			}else{
				//로그인			
				if($("#ckbLastLogin").is(":checked")) {
					setCookie("lastLoginId", $("#txtUserId").val(), 7);	//7일 동안 쿠키 보관
				} else {
					deleteCookie("lastLoginId");
				}

				var frmLogin = $("#frmLogin")[0];
				frmLogin.action = "/login/login.do";
				frmLogin.method = "post";
				frmLogin.submit();
			}
		} else {
			alert("담당자 ID가 존재하지 않습니다.");
			$("#txtUserId").focus();
			return;			
		}
	};
	
	/**
	 * 로그인처리 
	 */	
	function loginSSO() {
		var objChrr;

		var frmLogin = $("#frmLogin")[0];
		frmLogin.action = "/login/loginSSO.do";
		frmLogin.method = "post";
		frmLogin.submit();


	};
	
	/**
	 * 담당자ID 유무 검사 
	 */	
	function userLoginCheck(userId,userPw) {
		var objParam = {"chrrId" : userId,
						"chrrPwd" : userPw};
		var objResult;
		
		modAjax.request("/login/loginCheck.do", objParam,  {
			async: false,
			success: function(data) {				
				if(!modComm.isEmpty(data) && data.rsYn == "Y" && data.hasOwnProperty("selOne")) {
					objResult = data.selOne;
				}							
			},
            error: function(response) {
                console.log(response);
            }
    	});					
		
		return objResult;

	};	
	
	return {
		getCookie : getCookie,
		login : login,
		loginSSO : loginSSO

	};

})();

/**
 * 로그인 버튼클릭
 */
$("#btnLogin").on("click",function(){
	modLogin.login();	
});


$("#txtUserId").keydown(function(key){
	if(key.keyCode == 13) {
		modLogin.login();
	}
});
$("#txtPassword").keydown(function(key){
	if(key.keyCode == 13) {
		modLogin.login();
	}
});

/**
 * DOM  load 완료 시 실행
 */
$(document).ready(function() {
	if ($("#loginResult").val() != undefined && $("#loginResult").val() != ""){
		alert($("#loginResult").val());
	}
	var lastLoginId = modLogin.getCookie("lastLoginId");
	if(lastLoginId != null){
		$("#txtUserId").val(lastLoginId);
		
	if(!modComm.isEmpty($("#txtUserId").val())) {
		$("#ckbLastLogin").attr("checked", true);		
	}
		
	$("#txtUserId").focus();
	}
	
});