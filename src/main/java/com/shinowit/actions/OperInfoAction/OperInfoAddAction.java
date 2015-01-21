package com.shinowit.actions.OperInfoAction;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.entity.TAuOperInfoEntity;
import com.shinowit.framework.dao.BaseDAO;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by daihui on 2014-12-03.
 */
public class OperInfoAddAction extends ActionSupport {

    private boolean state;

    private boolean success;

    private String message;

    private TAuOperInfoEntity operInfo;

    @Resource
    private BaseDAO<TAuOperInfoEntity> operInfoDAO;


    public String addOperInfo() {
        List<TAuOperInfoEntity> obj1 = operInfoDAO.myFindByHql("FROM TAuOperInfoEntity WHERE operId=? OR operName=?", operInfo.getOperId(), operInfo.getOperName());
        if (obj1.size() < 1) {
            Object obj = operInfoDAO.insert(operInfo);
            if (null != obj) {
                setSuccess(true);
                setState(true);
                setMessage("用户信息添加成功！");
                return SUCCESS;
            } else {
                setSuccess(true);
                setState(false);
                setMessage("用户信息添加失败！");
                return SUCCESS;
            }
        } else {
            setSuccess(false);
            setState(false);
            setMessage("用户信息添加失败！该用户已存在！");
        }
        return SUCCESS;
    }

    public TAuOperInfoEntity getOperInfo() {
        return operInfo;
    }

    public void setOperInfo(TAuOperInfoEntity operInfo) {
        this.operInfo = operInfo;
    }

    public boolean isState() {
        return state;
    }

    public void setState(boolean state) {
        this.state = state;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
