<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import = "kr.smartflow.viewer.Converter" %>
<%@ page import = "java.io.File" %>
<%@ page import = "java.net.URLEncoder" %>
<%@ include file="/sfview/properties.jsp" %>
<%
	String path = "/sfview/example/";
	String folder = application.getRealPath(path); 

	File file = new File(folder);
	String[] filenames = file.list();
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>viewer examples</title>
</head>
<body>
<%
for (String filename: filenames) {
%>	
   <a href="<%=path + filename%>"><%=filename%></a>
<%
}			
%>
</body>
</html>