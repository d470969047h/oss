<%--
  Created by IntelliJ IDEA.
  User: daihui
  Date: 2014-11-06
  Time: 20:52
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<% String path=request.getContextPath();%>
<html>
<head>
    <title></title>
    <script src="<%=path%>/Extjs/ext-all.js" type="text/javascript"></script>
    <script src="<%=path%>/js/login.js" type="text/javascript"></script>
    <link href="<%=path%>/Extjs/resources/ext-theme-neptune/ext-theme-neptune-all.css" rel="stylesheet" type="text/css"/>
    <script src="<%=path%>/Extjs/locale/ext-lang-zh_CN.js" type="text/javascript"></script>
    <script type="text/javascript">
        Ext.onReady(function(){
            Ext.create('Login',{
                renderTo:Ext.getBody()
            }).center();
        });
    </script>
</head>
<body style="background: url(<%=path%>/images/background.png);background-size: 100%" >

</body>
</html>
