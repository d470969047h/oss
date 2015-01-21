package com.shinowit.actions.UnitInfoAction;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.entity.TMeUnitInfoEntity;
import com.shinowit.framework.dao.BaseDAO;

import javax.annotation.Resource;

/**
 * Created by daihui on 2014-11-12.
 */
public class UnitInfoUpdateAction extends ActionSupport {

    private TMeUnitInfoEntity unitInfo;

    @Resource
    private BaseDAO<TMeUnitInfoEntity> uDAO;

    private String message;

    private boolean success;

    public String updateUnitInfo(){
        boolean result=uDAO.update(unitInfo);
        if(true==result){
            setSuccess(true);
            setMessage("修改单位成功！");
        }else{
            setSuccess(false);
            setMessage("修改单位失败！");
        }
        return SUCCESS;
    }

    public TMeUnitInfoEntity getUnitInfo() {
        return unitInfo;
    }

    public void setUnitInfo(TMeUnitInfoEntity unitInfo) {
        this.unitInfo = unitInfo;
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
