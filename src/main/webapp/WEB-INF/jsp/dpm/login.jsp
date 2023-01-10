<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>전자문서관리 시스템</title>
     <link href="/css/layerPop.css" rel="stylesheet">
</head>
<body>
    <div class="smbc-wrap">
        <div class="smbc-login-wrap">
            <div class="smbc-login-box">
                <img src="/images/login-visual.png" alt="전자문서 관리시스템"/>
                <form id="frmLogin" role="form"  method="post" name="loginForm">
                    <h2><span>Login Account</span></h2>
                    <ul class="input-form">
                        <li>
                            <div>
                                <span class="id-icon">아이디</span>
                                <input type="text" name="chrrId" id="txtUserId" placeholder="아이디"/>
                            </div>
                        </li>
                        <li>
                            <div>
                                <span class="pw-icon">비밀번호</span>
                                <input type="password" name="chrrPwd" id="txtPassword" placeholder="비밀번호"/>
                            </div>
                        </li>
                    </ul>
                    <div style="float: left;">
                    <span class="info" style="margin-left: 0px;">
                     	<label for="ckbLastLogin">
                            <span style="padding-left: 15px;"><a href="#" onclick="modLogin.layer_popup('#layer');">비밀번호 변경</a></span>
                        </label>
                    </span>
                    </div>
                    <div style="float:right;">
                    <span class="info" style="margin-left: -100px;">
                        <input id="ckbLastLogin" type="checkbox"/>
                        <label for="ckbLastLogin">
                            <span style="padding-left: 15px;">아이디 저장</span>
                        </label>
                    </span>
                    </div>
                    <button type ="button"class="login-btn" id="btnLogin">LOGIN</button>
                  <!--   <p class="pw-info">처음 로그인 하시는 분은 <a href="#">'초기비밀번호 설정'</a> 클릭 후
                        비밀번호를 변경하시기 바랍니다.</p> -->
                    <div>
                     	<input id="loginResult" type="hidden" value="${loginResult}">
                    </div>    
                </form>

            </div>
        </div>
    </div>
    <jsp:include page="/WEB-INF/jsp/dpm/pwdChngLayerPopup.jsp" />  
    <jsp:include page="/WEB-INF/jsp/include/script.jsp" />	
    <script type="text/javascript" src="/js/dpm/login.js"></script>    
</body>
</html>