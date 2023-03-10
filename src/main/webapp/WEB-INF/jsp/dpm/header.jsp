<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<html  style="height: 99%;">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=10"> 
</head>
<style type="text/css">
	
   ul li{
		list-style: none;
	}
	a {
		text-decoration: none;
		color:#333;
	}

	#menu {
		font:bold 16px "malgun gothic";
		width:700px;
		height:50px;
		background: #f3f3f3;
		color:black;
		line-height: 50px; 
		text-align: center;
	}

	#menu > ul > li {
		float:left;
		width:140px;
		position:relative;
	}
	#menu > ul > li > ul {
		width:130px;
		display:none;
		position: absolute;
		font-size:14px;
		background: #f3f3f3;
	}
	#menu > ul > li:hover > ul {
		display:block;
		 z-index:1;
	}
	#menu > ul > li > ul > li:hover {
		background: #f3f3f3;
		transition: ease 1s;
		}
	</style>
<body>

 <h1 style="width:520px">   
     <a href="#" onclick="goPage('Daily');">
          <img src="../images/samsung-logo.png" alt="로고"/>
          <span style="width:310px">iDMask 이미지 마스킹점검 시스템</span>
     </a>
</h1>
<nav class="smbc-nav">
 <div id="menu">
	<ul>
		<li><a href="#">통계</a>
			<ul>
				<li><a href="#" onclick="goPage('Daily');">업무별 점검 현황</a></li>
				<li><a href="#" onclick="goPage('Day');">일별 통계</a></li>
				<li><a href="#" onclick="goPage('Month');">월별 통계</a></li>
			</ul>
		</li>
		<li><a href="#">이미지 조회</a>
			<ul>
				<li><a href="#" onclick="goPage('MaskVerfi');">이미지 조회</a></li>
				<li><a href="#" onclick="goPage('Export');">반출이력 조회</a></li>
			</ul>
		</li>
		<c:if test="${chrrId == 'admin'}">
		<li><a href="#">관리</a>
			<ul>
				<li><a href="#"  onclick ="goPage('UserManage');">사용자 관리</a></li>
			</ul>
		</li>
		</c:if>
	</ul>
</div>
    <ul class="smbc-nav-btn-wrap">
         <li class="logout-btn"> <img src="/images/security.png" style ="float:right; width:120x;height:40px;" alt="대외비"> </li>
         <li class="logout-btn"><button id="spnLogout">로그아웃</button></li>
    </ul>
</nav>
<form id="frmHeader" role="form"  method="post" name="frmHeader">
</form>
 <jsp:include page="/WEB-INF/jsp/include/script.jsp" />    
<script type="text/javascript" src="/js/dpm/header.js"></script>
</body>
</html>