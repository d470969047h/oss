package com.shinowit.actions.MerchandiseInfoAction;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.entity.TMeMerchandiseInfoEntity;
import com.shinowit.framework.dao.BaseDAO;

import javax.annotation.Resource;

/**
 * Created by daihui on 2014-11-12.
 */
public class MerchandiseInfoDeleteAction extends ActionSupport{

    private TMeMerchandiseInfoEntity merInfoPOJO;

    @Resource
    private BaseDAO<TMeMerchandiseInfoEntity> merDAO;

    private String message;

    private boolean success;

    private String merIn;

    public String deleteMerInfo(){
        boolean result=merDAO.delete(merInfoPOJO);
        if(true==result){
            setSuccess(true);
            setMessage("删除单条商品信息成功！");
            return SUCCESS;
        }else{
            setSuccess(false);
            setMessage("删除单条商品失败！");
            return SUCCESS;
        }
    }

    public String deleteManyMerInfo(){
        String Arrays[]=merIn.split(",");
        for(String str:Arrays){
            int i=merDAO.extcuteHQL("DELETE FROM TMeMerchandiseInfoEntity WHERE merchandiseId=?",str);
            if(i==1){
                setSuccess(true);
                setMessage("删除商品信息成功！");
            }else if(i<1){
                setSuccess(false);
                setMessage("删除商品信息失败！");
            }
        }
        return SUCCESS;
    }

    public TMeMerchandiseInfoEntity getMerInfoPOJO() {
        return merInfoPOJO;
    }

    public void setMerInfoPOJO(TMeMerchandiseInfoEntity merInfoPOJO) {
        this.merInfoPOJO = merInfoPOJO;
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

    public String getMerIn() {
        return merIn;
    }

    public void setMerIn(String merIn) {
        this.merIn = merIn;
    }
}
