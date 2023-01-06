<%@ page language="java" contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import = "kr.smartflow.viewer.Converter" %>
<%@ page import = "java.io.File" %>
<%@ page import = "java.net.URLEncoder" %>
<%@ page import = "kr.smartflow.viewer.Converter" %>
<%@ page import = "kr.smartflow.viewer.FileInfo" %>
<%@ include file="/sfview/properties.jsp" %>
<%
String folder = request.getParameter("folder");
if (folder == null) {
	System.err.println("usage example: /list_file.jsp?folder=/tif/jpeg");
	return;
} else if (folder.indexOf("..") >= 0) {
	System.err.println("folder not allowed contains ..:" + folder);
	return;
}

File file = new File(baseFolder + folder);
String[] filenames = file.list();
%>
[
<%
for (int i = 0; i < filenames.length; i++) {
	String url =  String.format("/sfview/show_file.jsp?filename=%s/%s", folder, URLEncoder.encode(filenames[i], "UTF-8"));
	if (i != 0) 
		out.println(",");
	out.print(String.format("[\"%s\", \"%s\"]", url, filenames[i]));
}			
%>
]