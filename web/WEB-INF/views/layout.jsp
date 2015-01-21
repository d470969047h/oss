<%--
  Created by IntelliJ IDEA.
  User: daihui
  Date: 2014-11-19
  Time: 19:59
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title></title>
</head>
<body>
<%
    session.invalidate();
    response.sendRedirect(request.getContextPath() + "/mylogin.action");
%>
</body>
</html>
