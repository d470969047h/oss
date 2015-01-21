package com.shinowit.actions.MerchandiseInfoAction;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.entity.TMeMerchandiseInfoEntity;
import com.shinowit.framework.dao.BaseDAO;

import javax.annotation.Resource;

/**
 * Created by daihui on 2014-11-12.
 */
public class MerchandiseInfoUpdateAction extends ActionSupport {

    private TMeMerchandiseInfoEntity merInfo;

    @Resource
    private BaseDAO<TMeMerchandiseInfoEntity> merDAO;

    private String message;

    private boolean success;

    public String updateINFO(){
        boolean result=merDAO.update(merInfo);
        if(true==result){
            setSuccess(true);
            setMessage("修改商品成功！");
        }else{
            setSuccess(false);
            setMessage("修改商品失败！");
        }
        return SUCCESS;
    }

    public TMeMerchandiseInfoEntity getMerInfo() {
        return merInfo;
    }

    public void setMerInfo(TMeMerchandiseInfoEntity merInfo) {
        this.merInfo = merInfo;
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
