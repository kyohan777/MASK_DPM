<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import = "kr.smartflow.viewer.Converter" %>
<%
	Package pkg = Package.getPackage("kr.smartflow.viewer");
%>
<table>
<tr><th>java.version<th><td><%=System.getProperty("java.version")%><td></tr>
<tr><th>java.vendor<th><td><%=System.getProperty("java.vendor")%><td></tr>
<tr><th>browser<th><td><script>document.write(navigator.appVersion)</script><td></tr>
<tr><th>converter version<th><td><%=pkg.getImplementationVersion()%><td></tr>
</table>