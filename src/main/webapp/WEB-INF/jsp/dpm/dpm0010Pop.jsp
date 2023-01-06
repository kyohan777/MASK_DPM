<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%
  /**
  * @File Name : dpm0010Pop.jsp
  * @Description : 이미지조회
  * @Modification Information
  * 
  *   수정일             수정자                   수정내용
  *  -------    --------    ---------------------------
  *  2019.04.01             최초 생성
  *
  *  
  *  ------------------------------------------------
  *  jqGrid 4.7.0  jQuery Grid
  *  Copyright (c) 2008, Tony Tomov, tony@trirand.com
  *  Dual licensed under the MIT and GPL licenses
  *  http://www.opensource.org/licenses/mit-license.php
  *  http://www.gnu.org/licenses/gpl-2.0.html
  *  Date: 2014-12-08  
  *  ------------------------------------------------*
  */
%>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=10">
    <title>전자문서관리 시스템</title>
    
</head>
<body>
    <div class="system clearfix search-container">
        <div class="">
            <!-- 
            <div class="clearfix header-container">
            </div>
             -->
            <div class="menu-container clearfix">
                <!-- 
                <div class="logo float-left">

                    <img src="/images/logo.png" alt="로고">

                </div>
                 -->
                <div class="mainmenu float-left">
                    <ul id="ulLevel0" class="list-unstyled clearfix">

                    </ul>
                </div>
            </div>
            <div class="subtitle-container clearfix">
                <div class="sub-header float-left">

                    <img src="/images/icon-subtitle-search.png" alt=""><span id="spnSubtitle" class="subtitle">이미지조회</span>

                </div>
                                    
                <div class="float-right bread">
                    <button id="btnMasking" type="button" class="btn btn-secondary btn-white" style="width:100px;">마스킹</button>
                    <button id="btnMaskingCancel" type="button" class="btn btn-secondary btn-white" style="width:100px;">마스킹취소</button>
                    <button id="btnExit" type="button" class="btn btn-secondary btn-white" style="width:100px;">종료</button>
                    <div id="divMenuPath">
                   
                    <!--  
                        <ul class="list-unstyled clearfix">
                            <li class="float-left"><i class="fas fa-home"></i> <a id="home" href="#" onclick="javascript:document.frmError.submit();">HOME</a> </li>
                        </ul>
                    -->                        
                    </div>
                </div>

            </div>
            <div>
                <!-- 툴바 -->
	            <div style="margin-top:0px;">
	                <table width="100%" height="68px" border="1" cellspacing="0" cellpadding="0">
	                    <tr>
	                        <td valign="middle" id="tdAllView2">
	                            <div id="divAllView2">
	                            </div>
	                        </td>
	                    </tr>
	                </table>
	            </div>
            </div>
            
            <div class="leftframe_02" style="min-height:600px;width:310px;">
                    <div style="margin-top:0px;">
                        <table width="100%" height="100%" border="1" cellspacing="0" cellpadding="0">
                            <tr>
                                <td valign="top" id="tdAllView3">
                                    <div id="divAllView3">
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>            
            </div>
            
            <div class="rightframe_02" style="min-height:600px;left:290px;min-width:365PX;width:365PX">
	            <div id="contentPage">
	
	                <div style="margin-top:0px;">
	                    <table width="100%" height="100%" border="1" cellspacing="0" cellpadding="0">
	                        <tr>
	                            <td valign="top" id="tdAllView1">
	                                <div id="divAllView1">
	                                </div>
	                            </td>
	                        </tr>
	                    </table>
	                </div>
	                
	                <div id="divFileManager"></div>
	                <div id="divCommUtil"></div>
	                
	            </div>            
            </div>            
            <!-- content페이지 start-->

            <!-- content페이지 end-->     
        </div>
    </div>
    <jsp:include page="/WEB-INF/jsp/include/script.jsp" />
    <script type="text/javascript" src="/js/dpm/dpm0010Pop.js"></script>
</body>
</html>