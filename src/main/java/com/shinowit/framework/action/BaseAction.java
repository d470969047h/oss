package com.shinowit.framework.action;

import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.interceptor.ValidationWorkflowAware;
import org.apache.log4j.Logger;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;
import org.apache.struts2.util.ServletContextAware;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class BaseAction extends ActionSupport implements ServletRequestAware, ServletContextAware, ServletResponseAware,ValidationWorkflowAware {

    private static final long serialVersionUID = -1040212988363452551L;
    protected final Logger logger = Logger.getLogger(getClass());

    protected HttpServletRequest request;
    protected ServletContext application;
    protected HttpServletResponse response;
    protected HttpSession session;


    @Override
    public void setServletRequest(HttpServletRequest request) {
        this.request = request;
        session = this.request.getSession();
    }

    @Override
    public void setServletResponse(HttpServletResponse response) {
        this.response = response;
    }

    @Override
    public void setServletContext(ServletContext application) {
        this.application = application;
    }

    public void prepareDict(){
        //查询数据字典的方法，主要是交给子类去重写
    }

    @Override
    public String getInputResultName() {
        /*
        在使用数据校验框架的时候，如果校验失败会自动跳input视图,但是如果界面有通过action查询数据字典的数据时就会报错
        这里实现了校验失败跳input视图时自动调用prepareDict方法去查询数据字典数据 ，子类将需要查询数据字典的代码放在
        prepareDict方法里面即可。
         */

        prepareDict();
        return "input";
    }


}


