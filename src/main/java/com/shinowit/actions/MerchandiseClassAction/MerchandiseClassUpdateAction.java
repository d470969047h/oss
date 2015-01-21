package com.shinowit.actions.MerchandiseClassAction;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.entity.TMeMerchandiseCInfoEntity;
import com.shinowit.framework.dao.BaseDAO;

import javax.annotation.Resource;

/**
 * Created by daihui on 2014-11-12.
 */
public class MerchandiseClassUpdateAction extends ActionSupport {

    private TMeMerchandiseCInfoEntity merCInfo;

    @Resource
    private BaseDAO<TMeMerchandiseCInfoEntity> merCDAO;

    private String message;

    private boolean success;

    public String updateMerC(){
        boolean result=merCDAO.update(merCInfo);
        if(true==result){
            setSuccess(true);
            setMessage("修改商品类别成功！");
        }else{
            setSuccess(false);
            setMessage("修改商品类别失败！");
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
}
