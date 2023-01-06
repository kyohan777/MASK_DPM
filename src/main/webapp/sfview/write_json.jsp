<%@ page language="java"%>
<%@ page import="java.io.FileOutputStream" %>
<%@ page import="java.io.FileNotFoundException" %>
<%@ page import="java.io.IOException" %>
<%@ include file="/sfview/properties.jsp" %>
<%	
	String json = request.getParameterValues("json")[0];
	String filename = baseFolder + request.getParameterValues("filename")[0];
	
	try {
		FileOutputStream fos = new FileOutputStream(filename);
		fos.write(json.getBytes());
		System.out.println("json write:" + filename);
	} catch (FileNotFoundException e) {
		System.err.println("json file write file not found error:" + filename);
	} catch (IOException e1) {
		System.err.println("json file write ioexception:" + filename);
	}
%>