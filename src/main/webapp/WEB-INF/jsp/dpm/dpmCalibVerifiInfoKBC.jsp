<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>전자문서관리 시스템</title>
    
    <link rel="stylesheet alternative" href="/sfview/theme/dark/css/viewer.css" class="alternative" disabled id="dark">
    <link rel="stylesheet alternative" href="/sfview/theme/light/css/viewer.css" class="alternative" disabled id="light">
    <script src="/sfview/js/jquery-3.6.0.min.js"></script>
    <script src="/sfview/js/jszip.min.js"></script>

    <script src="/sfview/theme/js/toolbar.js"></script>
    <script src="/sfview/theme/js/page_control.js"></script>

    <script src="/sfview/js/event_map.js"></script>
    <script src="/sfview/js/thumbnails.js"></script>
    <script src="/sfview/js/view.js"></script>
    
    
    <style>
    #box-left {
 		 flex: 1;
	}
	#box-center {
  		flex: 2;
  		
	}
	#box-right {
		flex: 1;
	}
	#mkTable > tr{
	height : 40px
	}
	

    </style>
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
                      <form id="frmCalibVerifiInfo" role="form"  method="post"> 
                            <ul class="smbc-top-search">
                                <li>
                                    <label>처리일자</label>
                                    <div class="datepicker-wrap">
										<input id="textPrcDt" name="textPrcDt" type="text" class="form-control "
									     style="width: 130px; margin-right: 0px; padding-right: 30px;"
										maxlength="10" autocomplete="off"> 
										<span class="icon-calendar">
										<img id="imgStartDt" img src="../images/icon-calendar.png" alt="달력">
										</span>
                                    </div>
                                </li>
                            </ul>
                            
                        <input id="columnName" type="hidden" name="columnName">
						<input id="sortOrder" type="hidden" name="sortOrder">    
                       <!-- 엑셀출력을 위한 컬럼정보 -->
						<input id="gridLabelList" type="hidden" name="gridLabels"> 
						<input id="gridNameList"  type="hidden" name="gridNames"> 
						<input id="gridWidthList" type="hidden" name="gridWidths"> 
						<input id="gridAlignList" type="hidden" name="gridAligns">
   					</form>
                            <ul class="smbc-top-btn-wrap">
                                <li class="search-btn"><button id="searchBtn">조회</button></li>
                            </ul>
                        </div>
                        <div class="smbc-data-wrap">
                            <div class="smbc-data-title">
                                <h3>교정/검증 처리</h3>
                                <!-- 
                                <ul class="smbc-data-top-menu">
                                    <li><button id="btnModify">수정</button></li>
                                </ul>
                                <ul class="smbc-data-top-menu">
                                    <li><button id="btnConfirm">확인</button></li>
                                </ul>
                                 -->
                            </div>
                            <div class="smbc-data-wrap">
                            <div class="smbc-data-con-wrap" style="display: flex; height: calc(100%);">
                           		 <div id='box-left'>
                           			 <div id="gridContainer">
										<table id="jqGrid"></table>
										<div id="jqGridPager"></div>
									</div>
                            	</div>
                            	
                            	<div id='box-center'>
		                            	<iframe src="/sfview/viewer.jsp" id="viwerIframe"
		                            			width="100%" 
			  									height="100%" 
									            frameborder="0" 
									            allowfullscreen 
									            >
									    </iframe>
                            	</div>
                            	
                            	<div id='box-right'>
                            	
                            	 <div id='box-right-1' class="smbc-data-con-wrap">
                                	<div id='box-right-2' class="smbc-data-grid-wrap">
                                
                                <form id="frmImrInfo" role="form"  method="post">
                                	<input id="elementId" name="elementId" type="hidden">
                                	<input id="intvisionImr" name="intvisionImr" type="hidden">
                                    <table>
                                        <colgroup>
                                            <col/>
                                            <col/>
                                            <col/>
                                        </colgroup>
                                        <thead>
                                            <tr>
                                                <th style="text-align: center">구분</th>
                                                <th style="text-align: center" width="50">계정계</th>
                                                <th style="text-align: center" width="50">IMR</th>
                                            </tr>
                                        </thead>
                                        <tbody id="mkTable">
                                            <tr id="TR_A">
                                                <td style="text-align: left">금융상품안내 및 이용권유를 위한 수집, 이용</td>
                                                <td id="BPR_A"></td>
                                                <td id="IMR_A"></td>
                                            </tr>
                                             <tr id="TR_B">
                                                <td style="text-align: left">금융상품 이외의 서비스 안내 및 이용권유를 위한 수집,이용</td>
                                                <td id="BPR_B"></td>
                                                <td id="IMR_B"></td>
                                            </tr>
                                             <tr id="TR_C">
                                                <td style="text-align: left">업무제휴계약을 체결한 제휴 보험사에 제공</td>
                                                <td id="BPR_C"></td>
                                                <td id="IMR_C"></td>
                                            </tr>
                                             <tr id="TR_D">
                                                <td style="text-align: left">업무제휴계약을 체결한 제휴 딜러사에 제공</td>
                                                <td id="BPR_D"></td>
                                                <td id="IMR_D"></td>
                                            </tr>
                                             <tr id="TR_E">
                                                <td style="text-align: left">KB국민은행 등 KB금융 그룹 내 자회사에 제공</td>
                                                <td id="BPR_E"></td>
                                                <td id="IMR_E"></td>
                                            </tr>
                                             <tr id="TR_TM_RECV_YN">
                                                <td style="text-align: left">[수집 마케팅] 전화 수신 동의</td>
                                                <td id="BPR_TM_RECV_YN"></td>
                                                <td id="IMR_TM_RECV_YN"></td>
                                            </tr>
                                             <tr id="TR_SMS_RECV_YN">
                                                <td style="text-align: left">[수집 마케팅] 문자(SMS) 수신 동의</td>
                                                <td id="BPR_SMS_RECV_YN"></td>
                                                <td id="IMR_SMS_RECV_YN"></td>
                                            </tr>
                                             <tr id="TR_DM_RECV_YN">
                                                <td style="text-align: left">[수집 마케팅] DM 수신 동의 (우편을 DM으로 인식)</td>
                                                <td id="BPR_DM_RECV_YN"></td>
                                                <td id="IMR_DM_RECV_YN"></td>
                                            </tr>
                                             <tr id="TR_EMAIL_RECV_YN">
                                                <td style="text-align: left">[수집 마케팅] 이메일 수신 동의</td>
                                                <td  id="BPR_EMAIL_RECV_YN"></td>
                                                <td id="IMR_EMAIL_RECV_YN"></td>
                                            </tr>
                                             <tr id="TR_TM_OFFER_YN">
                                                <td style="text-align: left">[제공 마케팅] 전화 제공 동의</td>
                                                <td id="BPR_TM_OFFER_YN"></td>
                                                <td id="IMR_TM_OFFER_YN"></td>
                                            </tr>
                                             <tr id="TR_EMAIL_OFFER_YN">
                                                <td style="text-align: left">[제공 마케팅] 이메일 제공 동의</td>
                                                <td id="BPR_EMAIL_OFFER_YN"></td>
                                                <td id="IMR_EMAIL_OFFER_YN"></td>
                                            </tr>
                                            <tr id="TR_DM_OFFER_YN">
                                                <td style="text-align: left">[제공 마케팅] DM 제공 동의</td>
                                                <td id="BPR_DM_OFFER_YN"></td>
                                                <td id="IMR_DM_OFFER_YN"></td>
                                            </tr>
                                            <tr id="TR_SMS_OFFER_YN">
                                                <td style="text-align: left">[제공 마케팅] 문자(SMS) 제공 동의</td>
                                                <td id="BPR_SMS_OFFER_YN"></td>
                                                <td id="IMR_SMS_OFFER_YN"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    
                                    </form>
	                                <!-- 
	                                <div class="smbc-data-title">
		                                <ul class="smbc-data-top-menu">
		                                    <li><button id="btn_confirm">확정</button></li>
		                                </ul>
		                            </div>
                            		 -->
                                    
                                </div>
                            </div>
                            	</div>
                             
                            </div>
                        </div>
                        </div>
					</div>
                </div>
            </div>
        </div>
    </div>
    <jsp:include page="/WEB-INF/jsp/include/script.jsp" />  
    <script type="text/javascript" src="/js/dpm/dpmCalibVerifiInfoKBC.js"></script>
</body>
</html>