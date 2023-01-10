<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Insert title here</title>
</head>
<body>
<!-------------------- layerPopup------------------>
<div class="dim-layer">
    <div class="dimBg"></div>
    <div id="layer" class="pop-layer">
        <div class="pop-container">
            <div class="pop-conts">
                <!--content //-->
                <div style="padding: 10px;color: #404040;font-size: 14px;">
                영문 대소,특수문자,숫자를 포함하여 8자 이상 입력하세요<br/><br/>
                (4개이상 중복된 문자는 허용하지 않습니다.)
                </div>
                <form id="frmPwdChng" role="form"  method="post"> 
              	<div class="join_form">
            		<table>
              			<colgroup>
                			<col width="30%"/>
                			<col width="auto"/>
              				</colgroup>
             			<tbody>
             			
                		<tr>
                  			<th><span>아이디</span></th>
                  			<td><input type="text" id="chrrId" name="chrrId" maxlength='9' autocomplete="off" placeholder="ID 를 입력하세요."></td>
                		</tr>
                		<tr>
                  			<th><span>(현재)비밀번호</span></th>
                  			<td><input type="password" id="nowChrrPwd" name="" maxlength='20' autocomplete="off" placeholder="(현재)비밀번호를 입력하세요."></td>
                		</tr>
                		<tr>
                  			<th><span>새비밀번호</span></th>
                  			<td><input type="password" id="newChrrPwd" name="chrrPwd" maxlength='20'autocomplete="off" placeholder="새비밀번호를 입력해주세요."></td>
                		</tr>
                		<tr>
                  			<th><span>새비밀번호 확인</span></th>
                  			<td><input type="password" id="newChrrPwd2" name="" maxlength='20'autocomplete="off" placeholder="비밀번호 확인"></td>
                		</tr>
              			</tbody>
            		</table>
         	 </div><!-- join_form E  -->
         	 </form>
                <div class="btn-r">
                	<a href="#" class="btn-layerClose" onclick="modLogin.pwdChng();">비밀번호 변경</a>
                    <a href="#" class="btn-layerClose" id="close">닫기</a>
                </div>
                <!--// content-->
            </div>
        </div>
    </div>
</div>
<!--//----------------- layerPopup------------------>
</body>

</html>