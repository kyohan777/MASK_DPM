<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>iDMask 이미지 카스킹점검 시스템</title>
</head>
<body>
 <div class="smbc-popup-wrap">
        <div class="smbc-page-tit">
            <h3 style="color:red;">반출(출력)사유 등록</h3>
        </div>
        <form id="frmExportReason" role="form"  method="post"> 
        <div class="smbc-data-wrap">
            <!-- <div class="smbc-data-title">
               
            </div> -->
            <div style="text-align: center;font-size: 19px;">
            <span style="color:red;" >해당문서의 외부 유출을 엄격히 금합니다 </span> 
	     	 </br></br>반출(출력) 목적과 사유를 기록해야만  이미지 다운로드가 가능합니다   
	      	</br></br>목적과 사유를  등록 하세요(필수) 
            </div>
            <div class="smbc-data-con-wrap">
                <div class="smbc-data-grid-wrap">
                    <table>
                        <colgroup>
                            <col style="width:30%;"/>
                            <col style="width:auto;"/>

                        </colgroup>
                        <tbody>
                            <tr>
                                <td><span>ELEMENT ID</span></td>
                                <td id="elementId"></td>
                            </tr>
                            <tr>
                                <td><span>사용자 ID</span></td>
                                <td id="chrrId"></td>
                            </tr>
                            <tr>
                                <td><span>사용자 명</span></td>
                                <td id="chrrNm"></td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
        <div class="smbc-detail-wrap">
            <div class="smbc-detail-wrap">
                <ul class="smbc-detail-list">
                    <li class="full">
                        <label>목적(필수)</label>
                         <input id="purpose" name="purpose"type="text" size="200" style="width:570px" placeholder="출력(반출)목적">
                    </li>
                    <li style="width: 100%;">
                        <label>사유(필수)</label>
                         <textarea id="queryReason"name="queryReason" rows="4" cols="90" placeholder="출력(반출) 사유 입력"></textarea>
                    </li>
                </ul>
            </div>
        </div>
        <input type="hidden" id="queryType" name="queryType" value="FDN">
        </form>
        <div class="smbc-pop-btn-wrap" style="padding:0px">
            <button class="pop-btn-close" style="width:100px;height: 30px;margin: 10px;" id="cancel">취소</button>
            <button class="pop-btn-close" style="width:100px;height: 30px;margin: 10px;" id="insert">확인</button>
        </div>
 </div>
 <jsp:include page="/WEB-INF/jsp/include/script.jsp" />  
 <script type="text/javascript" src="/js/dpm/exportReasonPopup.js"></script>
</body>
<!--//----------------- layerPopup------------------>
</body>

</html>