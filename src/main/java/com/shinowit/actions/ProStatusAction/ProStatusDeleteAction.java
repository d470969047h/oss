package com.shinowit.actions.ProStatusAction;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.entity.TMeProStatusInfoEntity;
import com.shinowit.framework.dao.BaseDAO;

import javax.annotation.Resource;

/**
 * Created by daihui on 2014-11-12.
 */
public class ProStatusDeleteAction extends ActionSupport{

    private TMeProStatusInfoEntity proSInfo;

    @Resource
    private BaseDAO<TMeProStatusInfoEntity> proSDAO;

    private String message;

    private boolean success;

    private String proS;

    public String deleteProS(){
        boolean result=proSDAO.delete(proSInfo);
        if(true==result){
            setSuccess(true);
            setMessage("删除单条促销状态信息成功！");
        }else{
            setSuccess(false);
            setMessage("删除单条促销状态失败！");
        }
        return SUCCESS;
    }

    public String deleteManyProS(){
        String Arrays[]=proS.split(",");
        for(String str:Arrays){
            int i=proSDAO.extcuteHQL("DELETE FROM TMeProStatusInfoEntity WHERE proStatusId=?",Short.valueOf(str));
            if(i==1){
                setSuccess(true);
                setMessage("删除促销状态信息成功！");
            }else if(i<1){
                setSuccess(false);
                setMessage("删除促销状态信息失败！");
            }
        }
        return SUCCESS;
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

    public TMeProStatusInfoEntity getProSInfo() {
        return proSInfo;
    }

    public void setProSInfo(TMeProStatusInfoEntity proSInfo) {
        this.proSInfo = proSInfo;
    }

    public String getProS() {
        return proS;
    }

    public void setProS(String proS) {
        this.proS = proS;
    }
}
