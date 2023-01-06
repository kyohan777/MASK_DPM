<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- content view 영역 -->
<div class="smbc-main-content-wrap" id= "contentPage">
     
</div>
<jsp:include page="/WEB-INF/jsp/include/script.jsp" />  
<script type="text/javascript">
$(document).ready(function() {	
	$("#contentPage").load("/dpm/"+"${viewPagePath}");
});
</script>
