
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
				//비밀번호 만료여부 확인
				if(objChrr.xpYn ==="Y"){
					alert("비밀번호가 만료되었습니다. 비밀번호를 변경해주세요.");
					return;
				}
				//비밀번호 만료 10일전 여부 확인
				if(objChrr.xp10DayYn ==="Y"){
					 alert("비밀번호 만료일 "+objChrr.xpDay+"일 전입니다.비밀번호를 변경해주세요.");
				}
				
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
	//비밀번호 변경 처리
	function userPwdChange(userId,userPw,idNo){
		var objParam = {"chrrId"  : userId,
						"chrrPwd" : userPw,
						"idNo"    : idNo};
						
		modAjax.request("/login/updateChrrPwd.do", objParam,  {
			async: false,
			success: function(data) {				
					if(data.rsYn =='Y'){
						alert("정상적으로 변경했습니다.");
						reset();
						closePopup('#layer');
					}			
			},
            error: function(response) {
                console.log(response);
            }
    	});			
	}
	//비밀번호 유효성 체크
	function pwdChng(){
		 var objChrr;
		 var chrrId     = $("#chrrId").val();
		 var nowChrrPwd = $("#nowChrrPwd").val();
		 var pw = $("#newChrrPwd").val();
		 var pw2 = $("#newChrrPwd2").val();
		 var reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
		//비밀번호 유효성검사
		if(modComm.isEmpty(chrrId)) {
			alert("ID를 입력하십시오.");
			$("#chrrId").focus();
			return;
		}
		if(modComm.isEmpty(nowChrrPwd)) {
			alert("(현재)비밀번호를 입력하십시오.");
			$("#nowChrrPwd").focus();
			return;
		}
		if(modComm.isEmpty(pw)) {
			alert("새비밀번호를 입력하십시오.");
			$("#newChrrPwd").focus();
			return;
		}
		if(modComm.isEmpty(pw2)) {
			alert("새비밀번호 확인을 입력하십시오.");
			$("#newChrrPwd2").focus();
			return;
		}
		if($('#newChrrPwd').val() != $('#newChrrPwd2').val()){
		  alert("비밀번호가 일치하지 않습니다.");
          $('#newChrrPwd2').val('');
          $("#newChrrPwd2").focus();
          return;
        }
		if(pw.length < 8 || pw.length > 20){
		  alert("8자리 ~ 20자리 이내로 입력해주세요.");
		  return false;
		}else if(pw.search(/\s/) != -1){
		  alert("비밀번호는 공백 없이 입력해주세요.");
		  return false;
		}
		 if(false === reg.test(pw)) {
		  alert('비밀번호는 8자 이상이어야 하며, 숫자/대문자/소문자/특수문자를 모두 포함해야 합니다.');
		  return;
		}
		if(/(\w)\1\1\1/.test(pw)){
			alert('같은 문자를 4번 이상 사용하실 수 없습니다.');
            return false;
		}
		objChrr = userLoginCheck(chrrId,nowChrrPwd);
		if(!modComm.isEmpty(objChrr) && objChrr.hasOwnProperty("chrrId") && !modComm.isEmpty(objChrr.chrrId)) {
			if(objChrr.pwdYn =="N"){
				alert("(현재) 비밀번호가 일치하지 않습니다.");
				$("#nowChrrPwd").focus();
				return;			
			}else{
				userPwdChange(chrrId,pw,objChrr.idNo);
			}
		}else {
			alert("담당자 ID가 존재하지 않습니다.");
			$("#chrrId").focus();
			return;			
		}
		 
	};	
	
	
	//레이어팝업 오픈
	function layer_popup(el){

    	var $el = $(el);    //레이어의 id를 $el 변수에 저장
    	var isDim = $el.prev().hasClass('dimBg'); //dimmed 레이어를 감지하기 위한 boolean 변수

    	isDim ? $('.dim-layer').fadeIn() : $el.fadeIn();

   		var $elWidth = ~~($el.outerWidth()),
        $elHeight = ~~($el.outerHeight()),
        docWidth = $(document).width(),
        docHeight = $(document).height();

    	// 화면의 중앙에 레이어를 띄운다.
    	if ($elHeight < docHeight || $elWidth < docWidth) {
       		 $el.css({
            	marginTop: -$elHeight /2,
           		 marginLeft: -$elWidth/2
        	})	
    	} else {
        	$el.css({top: 0, left: 0});
    	}

    	$el.find('#close').click(function(){
			reset();
        	isDim ? $('.dim-layer').fadeOut() : $el.fadeOut(); // 닫기 버튼을 클릭하면 레이어가 닫힌다.
        	return false;
    	});	

    	$('.layer .dimBg').click(function(){
        	$('.dim-layer').fadeOut();
        	return false;
    	});

	};
	
	//등록 후 레이어 닫기
	function closePopup(el){
		var $el = $(el);   
        var isDim = $el.prev().hasClass('dimBg'); 
        isDim ? $('.dim-layer').fadeIn() : $el.fadeIn();
        isDim ? $('.dim-layer').fadeOut() : $el.fadeOut(); 
	}
	//비밀번호 변경 레이어 데이터 리셋 처리
	function reset(){
		$("#chrrId").val('');
		$("#nowChrrPwd").val('');
		$("#newChrrPwd").val('');
		$("#newChrrPwd2").val('');	
	}
	
	return {
		getCookie : getCookie,
		login : login,
		loginSSO : loginSSO,
		pwdChng : pwdChng,
		layer_popup: layer_popup

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