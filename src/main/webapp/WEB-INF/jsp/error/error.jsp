<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>전자문서관리 시스템</title>
    
</head>
<body>
    <div class="system clearfix search-container">
        <div class="">
            <div class="clearfix header-container">
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

                    <img src="/images/icon-subtitle-search.png" alt="" style="visibility:hidden;">
                    
                </div>
                <div class="float-right bread">
                    <div id="divMenuPath">
                        <ul class="list-unstyled clearfix">
                            <li class="float-left"><i class="fas fa-home"></i> <a id="home" href="#" onclick="javascript:document.frmError.submit();">HOME</a> </li>
                        </ul>                        
                    </div>
                </div>

            </div>
            <!-- content페이지 start-->
            <div id="contentPage">
	            <br>
	            <span class="subtitle" style="color:red;"><c:out value="${MESSAGE}" default="ERROR"/></span>
	            <br>
	            <!-- 
	            <br><span class="subtitle">· STATUS_CODE : <c:out value="${STATUS_CODE}"/></span>
	            <br><span class="subtitle">· REQUEST_URI : <c:out value="${REQUEST_URI}"/></span>
	            <br><span class="subtitle">· EXCEPTION_TYPE : <c:out value="${EXCEPTION_TYPE}"/></span>
	            <br><span class="subtitle">· EXCEPTION : <c:out value="${EXCEPTION}"/></span>
	            <br><span class="subtitle">· SERVLET_NAME : <c:out value="${SERVLET_NAME}"/></span>
	             -->
	            <form id="frmError" name="frmError" action="/login/login.do" role="form"  method="post">
	               <input type="hidden" id="txtLoginchrrId" name="chrrId" value="${chrrId}" />
	            </form>
            </div>
            <!-- content페이지 end-->      
        </div>
    </div>
    <jsp:include page="/WEB-INF/jsp/include/script.jsp" />
</body>
</html>
