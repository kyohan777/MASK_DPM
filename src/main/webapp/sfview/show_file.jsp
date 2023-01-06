<%@ page language="java"%>
<%@ page import = "kr.smartflow.viewer.Converter"%>
<%@ include file="/sfview/properties.jsp" %>
<%
	String filename = request.getParameter("filename");
	
	if (filename == null) {
		System.err.println("usage example: /show_file.jsp?filename=/tif/jpeg/1.tif");
		return;
	} else if (filename.indexOf("..") >= 0) {
		System.err.println("filename not allowed contains ..");
		return;
	}
	
	Converter.getImage(baseFolder + filename, response);
%>