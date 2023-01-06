<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%
  /**
  * @File Name : main.jsp
  * @Description : 메인화면
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
  *  ------------------------------------------------
  */
%>
<html  style="height: 99%;">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=10"> 
    <title>전자문서관리 시스템</title>
</head>
<body>
    <form id="frmMain" role="form"  method="post">
    <div class="system clearfix search-container">
        <div class="">
            <div class="clearfix header-container">

                <div class="float-right claerfix">
                    <div class="topmenu-container float-right">
                        <div>
                            <div class="d-inline-block">
                                <i class="fas fa-user-friends text-muted"></i>&nbsp;
                                <span><c:out value="${chrrNm}"/></span>
                                <!-- global로 사용할 로그인 사용자 정보(다른업무 페이지에서 동일 ID 사용하지 말것 -->
                                <input type="hidden" id="txtLoginchrrId" name="chrrId" value="${chrrId}" />
                                <input type="hidden" id="txtLoginchrrNm" name="chrrNm" value="${chrrNm}" />
                            </div>
                            <div class="d-inline-block">
                                <i class="fas fa-unlock-alt text-muted"></i>&nbsp;
                                <span id="spnLogout" style="cursor:pointer">로그아웃</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="menu-container clearfix">
                <div class="logo float-left">
                    <img src="/images/logo.png" alt="로고">
                </div>
                <div class="mainmenu float-left">
                    <ul id="ulLevel0" class="list-unstyled clearfix">

                    </ul>
                </div>
            </div>
            
            
            <div class="subtitle-container clearfix">
                <div class="sub-header float-left">
                    <img src="/images/icon-subtitle-search.png" alt="" ><span id="spnSubtitle" class="subtitle"></span>
                </div>
                <div class="float-right bread">
                    <div id="divMenuPath">
                        <ul class="list-unstyled clearfix">
                            <li class="float-left"><i class="fas fa-home"></i> <a id="home" href="#">HOME</a> </li>
                            <li class="float-left"><i class="fas fa-chevron-right"></i></li>
                            <li class="float-left"><span id="spnUpMnNm"></span></li>
                            <li class="float-left"><i class="fas fa-chevron-right"></i></li>
                            <li class="float-left"><span id="spnMnNm"></span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    </form>    
    <jsp:include page="/WEB-INF/jsp/include/script.jsp" />    
    <script type="text/javascript" src="/js/dpm/main.js"></script>
   
</body>
</html>