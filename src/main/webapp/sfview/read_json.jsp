<%@ page language="java" contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.io.FileInputStream" %>
<%@ page import="java.io.OutputStream" %>
<%@ page import="java.io.FileNotFoundException" %>
<%@ page import="java.io.IOException" %>

<%@ include file="/sfview/properties.jsp" %>
<%
	String filename = request.getParameter("filename");
	if (filename == null) {
		System.err.println("filename parameter not found");
		return;
	}
	
	try {
		FileInputStream fis = new FileInputStream(baseFolder + filename);

		out.clear();
		out=pageContext.pushBody();
		OutputStream os = response.getOutputStream();

		byte[] buff = new byte[64*1024]; 
		while (fis.available() > 0) {
			int len = fis.read(buff);
			os.write(buff,0, len);
		}
	} catch (FileNotFoundException e) {
		// do nothing
	} catch (IOException e1) {
		// do nothing;
	}
%>