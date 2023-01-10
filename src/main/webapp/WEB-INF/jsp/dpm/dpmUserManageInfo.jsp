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
        <div class="smbc-main-wrap">
            <div class="smbc-main-box">
            	<!-- 메뉴바 영역 -->
                <header class="smbc-header">
                    <jsp:include page="header.jsp" />
                </header>
                <!-- 메뉴바 영역 -->
                <div class="smbc-content-wrap">
                   <div class="smbc-main-content-wrap" id= "contentPage">
                        <div class="smbc-top-search-wrap">
                        <form id="frmUserManageInfo" role="form"  method="post"> 
                        	<input id="columnName" type="hidden" name="columnName">
							<input id="sortOrder" type="hidden" name="sortOrder">
                            <ul class="smbc-top-search">
                             	<li>
                                    <input type="text" id="chrrId" name="chrrId" class="input-st01" style ="background: #E3FFF0; color : black" placeholder="담당자 ID">
                                </li>
                                <li>
                                    <input type="text" id="chrrNm" name="chrrNm" class="input-st01" style ="background: #E3FFF0; color : black" placeholder="담당자명">
                                </li>
                                <li>
                                    <input type="text" id="deptnm" name="deptnm" class="input-st01" style ="background: #E3FFF0 ; color : black" placeholder="부서명">
                                </li>
                                 <li>
                                    <label>사용여부</label>
                                    <div class="datepicker-wrap">
										<select id="useYn" name="useYn"class="form-control"
									     style="width: 130px; background: #E3FFF0;margin-right: 0px; padding-right: 30px;">
									     	<option value="Y">Y</option>
									     	<option value="N">N</option>
									     	<option value="">전체</option>
									     	
									     </select> 
                                    </div>
                                </li>
                               <%--  <li>
                        			<label>접속자 정보</label>
                        			<input type="text" value="사번 : ${companyId}" disabled style ="color:white">
                        			<input type="text" value="성명 : ${chrrNm}" disabled style ="color:white"> 
                    			</li> --%>
                    			<li>
                    				<button id="resetBtn" type="button" class="reset">초기화</button>
                    			</li>
                            </ul>
                            <!-- 엑셀출력을 위한 컬럼정보 -->
							<input id="gridLabelList" type="hidden" name="gridLabels"> 
							<input id="gridNameList"  type="hidden" name="gridNames"> 
							<input id="gridWidthList" type="hidden" name="gridWidths"> 
							<input id="gridAlignList" type="hidden" name="gridAligns">
   						</form>
                            <ul class="smbc-top-btn-wrap">
                                <li class="search-btn"><button onclick="modDpmUserManageInfo.selList();">조회</button></li>
                            </ul>
                        </div>
                        <div class="smbc-data-wrap">
                            <div class="smbc-data-title">
                                <h3>사용자 관리</h3>
                                 <ul class="smbc-data-top-menu">
                                 	<li><button onclick="newUser();">신규등록</button></li>
                                    <li><button id="btnExcel">엑셀다운로드</button></li>
                                </ul>
                            </div>
                            <div class="smbc-data-con-wrap">
                             <div id="gridContainer">
								<table id="jqGrid"></table>
								<div id="jqGridPager"></div>
							</div>
                            </div>
                        </div>
					</div>
                </div>
            </div>
        </div>
    </div>
    
<!-------------------- layerPopup------------------>
<div class="dim-layer">
    <div class="dimBg"></div>
    <div id="layer" class="pop-layer">
        <div class="pop-container">
            <div class="pop-conts">
                <!--content //-->
                <form id="frmUserInfo" role="form"  method="post"> 
              	<div class="join_form">
              	 <input type = "hidden" id ="idNo" name="idNo">
            		<table>
              			<colgroup>
                			<col width="30%"/>
                			<col width="auto"/>
              				</colgroup>
             			<tbody>
             			
                		<tr>
                  			<th><span>담당자 ID</span></th>
                  			<td><input type="text" id="newChrrId" name="chrrId" maxlength='9' autocomplete="off" placeholder="ID 를 입력하세요."></td>
                		</tr>
                		<tr>
                  			<th><span>(회사)사번</span></th>
                  			<td><input type="text" id="newCompanyId" name="companyId" maxlength='20' autocomplete="off" placeholder="회사번호를 입력하세요."></td>
                		</tr>
                		<tr id="pwdTr">
                  			<th><span>비밀번호</span></th>
                  			<td><input type="password" id="newChrrPwd" name="chrrPwd" autocomplete="off" placeholder="비밀번호를 입력해주세요."></td>
                		</tr>
                		<tr>
                  			<th><span>담당자명</span></th>
                  			<td><input type="text" id="newChrrNm" name="chrrNm" autocomplete="off" placeholder="담당자명을 입력해주세요"></td>
                		</tr>
                		<tr>
                  			<th><span>부서명</span></th>
                  			<td><input type="text"id="newDeptnm" name= "deptnm" autocomplete="off" placeholder="부서명을 입력해주세요"></td>
                		</tr>
                		<tr>
                  			<th><span>사용여부</span></th>
                  			<td><input type="text"id="newUyn" name= "uyn" autocomplete="off" value="Y" disabled></td>
                		</tr>
                		<tr>
                  			<th><span>사유</span></th>
                  			<td>
                  			<textarea id="NewRgReason" name="rgReason" rows="5" cols="45">
							</textarea>
							</td>
                		</tr>
              			</tbody>
            		</table>
         	 </div><!-- join_form E  -->
         	 </form>
                <div class="btn-r">
                	<a href="#" class="btn-layerClose" id="chgPwd">비밀번호 변경</a>
                 	<a href="#" class="btn-layerClose" id="update">변경</a>
                 	<a href="#" class="btn-layerClose" id="insert">등록</a>
                    <a href="#" class="btn-layerClose" id="delete">삭제</a>
                    <a href="#" class="btn-layerClose" id="close">닫기</a>
                </div>
                <!--// content-->
            </div>
        </div>
    </div>
</div>
<!--//----------------- layerPopup------------------>
    <jsp:include page="/WEB-INF/jsp/include/script.jsp" />  
    <script type="text/javascript" src="/js/dpm/dpmUserManageInfo.js"></script>
</body>
</html>