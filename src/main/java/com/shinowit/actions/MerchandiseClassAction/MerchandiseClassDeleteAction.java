package com.shinowit.actions.MerchandiseClassAction;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.entity.TMeMerchandiseCInfoEntity;
import com.shinowit.framework.dao.BaseDAO;

import javax.annotation.Resource;

/**
 * Created by daihui on 2014-11-12.
 */
public class MerchandiseClassDeleteAction extends ActionSupport{

    private TMeMerchandiseCInfoEntity merCInfo;

    @Resource
    private BaseDAO<TMeMerchandiseCInfoEntity> merCDAO;

    private String message;

    private boolean success;

    private String merC;

    public String deleteMerC(){
        boolean result=merCDAO.delete(merCInfo);
        if(true==result){
            setSuccess(true);
            setMessage("删除单条商品类别信息成功！");
        }else{
            setSuccess(false);
            setMessage("删除单条商品类别失败！");
        }
        return SUCCESS;
    }

    public String deleteManyMerC(){
        String Arrays[]=merC.split(",");
        for(String str:Arrays){
            int i=merCDAO.extcuteHQL("DELETE FROM TMeMerchandiseCInfoEntity WHERE merchandiseCid=?",str);
            if(i==1){
                setSuccess(true);
                setMessage("删除商品类别信息成功！");
            }else if(i<1){
                setSuccess(false);
                setMessage("删除商品类别信息失败！");
            }
        }
        return SUCCESS;
    }

    public TMeMerchandiseCInfoEntity getMerCInfo() {
        return merCInfo;
    }

    public void setMerCInfo(TMeMerchandiseCInfoEntity merCInfo) {
        this.merCInfo = merCInfo;
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

    public String getMerC() {
        return merC;
    }

    public void setMerC(String merC) {
        this.merC = merC;
    }
}
