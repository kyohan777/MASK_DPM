<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>iDMask 이미지 카스킹점검 시스템</title>
<style>
    #box-left {
 		 flex: 1;
	}
	/* #box-center {
  		flex: 3;
  		
	} */
	#box-right {
		flex: 1;
	}
	#mkTable > tr{
	height : 40px
	}
	

    </style>
</head>
<body>
 <div class="smbc-popup-wrap">
        <div class="smbc-page-tit">
            <h3 style="color:red;">마스킹 이미지 확인</h3>
        </div>
        <form id="frmExportReason" role="form"  method="post"> 
        <div class="smbc-data-wrap">
             <div class="smbc-data-title">
             <button type="button" onclick="test();"></button>
            </div> 
            <div class="smbc-data-wrap">
                <div class="smbc-data-con-wrap" style="display: flex; height: calc(100%);">
                    <div id='box-left'>
                     <iframe src="/sfview/viewerOrg.jsp" id="viewerOne"
		              width="100%" 
			  		  height="100%" 
					  frameborder="0" 
					  allowfullscreen 
                      >
					  </iframe>
                     </div>
	                 <div id='box-right'>
	                  <iframe src="/sfview/viewer.jsp" id="viewerTwo"
		              width="100%" 
			  		  height="100%" 
					  frameborder="0" 
					  allowfullscreen 
					  >
					  </iframe>
					 </div>	    
                </div>
           </div>
        </div>
        <input type="hidden" id="imgPathOrg" value="${imgPathOrg}">
        <input type="hidden" id="elementId" value="${elementId}">
        <input type="hidden" id="totalPageCnt" value="${totalPageCnt}">
        </form>
 </div>
 <jsp:include page="/WEB-INF/jsp/include/script.jsp" />  
 <script type="text/javascript" src="/js/dpm/dpmImgViewerPopup.js"></script>
</body>

</html>