<%--
  Created by IntelliJ IDEA.
  User: daihui
  Date: 2014-11-06
  Time: 23:31
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<% String path = request.getContextPath();%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<html>
<head>
    <link href="<%=path%>/style/main.css" rel="stylesheet" type="text/css"/>
    <link href="<%=path%>/Extjs/resources/ext-theme-neptune/ext-theme-neptune-all.css" rel="stylesheet"
          type="text/css"/>
    <link href="<%=path%>/Extjs/src/ux/grid/css/GridFilters.css" rel="stylesheet" type="text/css"/>
    <link href="<%=path%>/Extjs/src/ux/grid/css/RangeMenu.css" rel="stylesheet" type="text/css"/>
    <script src="<%=path%>/Extjs/ext-all.js" type="text/javascript"></script>
    <script src="<%=path%>/js/main.js" type="text/javascript"></script>
    <script src="<%=path%>/Extjs/locale/ext-lang-zh_CN.js" rel="script"></script>
    <style type="text/css">
        .x-btn-default-toolbar-large-icon
        .x-btn-icon-el {
            width: 324px;
            height: 74px;
        }

        .x-btn-default-large-icon
        .x-btn-icon-el {
            width: 228px;
            height: 166px;
        }

        .x-btn-default-toolbar-large
        .x-btn-arrow-right {
            padding-right: 0;
        }

        .io {
            font-size: 555px;
        }

        #io {
            font-size: 100px;
        }
    </style>
    <script type="text/javascript">
        Ext.onReady(function () {
            Ext.create('main', {
                renderTo: Ext.getBody()
            });
        });
    </script>
    <title></title>
</head>
<body>
<s:hidden
        id="aa"
        name="operInfo.operName"
        value="%{#session.operSession.operName}">
</s:hidden>
</body>
</html>



