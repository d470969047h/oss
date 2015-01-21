package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.entity.TAuOperInfoEntity;
import com.shinowit.framework.dao.BaseDAO;
import org.apache.struts2.ServletActionContext;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.List;

/**
 * Created by daihui on 2014-11-06.
 */
public class LoginAction extends ActionSupport {

    private String message;

    private boolean success;

    private boolean state;

    private TAuOperInfoEntity operInfo;

    private List<TAuOperInfoEntity> operList;

    private String myValidCode;

    private String loginOperId;

    @Resource
    private BaseDAO<TAuOperInfoEntity> operDAO;

    public String mylogin(){
        return SUCCESS;
    }

    public String login() {

        if (null == operInfo.getOperName() || null == operInfo.getPwd()) {
            setState(false);
            setSuccess(false);
            setMessage("账号或密码不能为空啊！请重试！");
            return "ok";
        }
        operList = operDAO.myFindByHql("FROM TAuOperInfoEntity WHERE operName=? AND pwd=?", operInfo.getOperName(), operInfo.getPwd());
        for (TAuOperInfoEntity oper : operList) {
             loginOperId = oper.getOperId();
            if ((null != operInfo.getOperName()) && (!oper.getOperName().equals(operInfo.getOperName()))) {
                setState(false);
                setSuccess(true);
                setMessage("用户名或密码错误！");
                return "ok";
            }
            if ((null != operInfo.getPwd()) && (!oper.getPwd().equals(operInfo.getPwd()))) {
                setState(false);
                setSuccess(true);
                setMessage("用户名或密码错误！");
                return "ok";
            }
        }
        HttpSession session = ServletActionContext.getRequest().getSession();
        String validCode = (String) session.getAttribute("rand");
        if (null != myValidCode && (!myValidCode.equals(validCode))) {
            setState(false);
            setSuccess(true);
            setMessage("验证码错误！请重新输入！");
            return "ok";
        } else {
            ServletActionContext.getContext().getSession().put("operSession",operInfo);
            ServletActionContext.getContext().getSession().put("operOperID",loginOperId);
            setState(true);
            setSuccess(true);
            setMessage("登陆成功！");
            return "ok";
        }
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public boolean isState() {
        return state;
    }

    public void setState(boolean state) {
        this.state = state;
    }

    public TAuOperInfoEntity getOperInfo() {
        return operInfo;
    }

    public void setOperInfo(TAuOperInfoEntity operInfo) {
        this.operInfo = operInfo;
    }

    public List<TAuOperInfoEntity> getOperList() {
        return operList;
    }

    public void setOperList(List<TAuOperInfoEntity> operList) {
        this.operList = operList;
    }

    public String getMyValidCode() {
        return myValidCode;
    }

    public void setMyValidCode(String myValidCode) {
        this.myValidCode = myValidCode;
    }

    public String getLoginOperId() {
        return loginOperId;
    }

    public void setLoginOperId(String loginOperId) {
        this.loginOperId = loginOperId;
    }
}
