package com.shinowit.actions.ProStatusAction;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.entity.TMeProStatusInfoEntity;
import com.shinowit.framework.dao.BaseDAO;

import javax.annotation.Resource;

/**
 * Created by daihui on 2014-11-12.
 */
public class ProStatusUpdateAction extends ActionSupport {

    private TMeProStatusInfoEntity proSInfo;

    @Resource
    private BaseDAO<TMeProStatusInfoEntity> proSDAO;

    private String message;

    private boolean success;

    public String updateProS(){
        boolean result=proSDAO.update(proSInfo);
        if(true==result){
            setSuccess(true);
            setMessage("修改促销状态成功！");
        }else{
            setSuccess(false);
            setMessage("修改促销状态失败！");
        }
        return SUCCESS;
    }

    public TMeProStatusInfoEntity getProSInfo() {
        return proSInfo;
    }

    public void setProSInfo(TMeProStatusInfoEntity proSInfo) {
        this.proSInfo = proSInfo;
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
}
