package com.shinowit.actions.OperInfoAction;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.entity.TAuOperInfoEntity;
import com.shinowit.framework.dao.BaseDAO;

import javax.annotation.Resource;

/**
 * Created by daihui on 2014-12-03.
 */
public class OperInfoDeleteAction extends ActionSupport {

    private boolean state;

    private boolean success;

    private String message;

    private TAuOperInfoEntity operInfo;

    @Resource
    private BaseDAO<TAuOperInfoEntity> operInfoDAO;


    public String deleteOperInfo() {
            boolean isSuccess = operInfoDAO.delete(operInfo);
            if (true==isSuccess) {
                setSuccess(true);
                setState(true);
                setMessage("用户信息删除成功*^_^*");
                return SUCCESS;
            } else {
                setSuccess(true);
                setState(false);
                setMessage("用户信息删除失败-_-!!");
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
