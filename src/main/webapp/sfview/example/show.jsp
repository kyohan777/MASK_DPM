<%@ page language="java"
%><%@ page import = "kr.smartflow.viewer.Converter" 
%><%@ include file="/sfview/properties.jsp" %><%
Converter.getImage(baseFolder + "/lzwbw.tif", response);
%>