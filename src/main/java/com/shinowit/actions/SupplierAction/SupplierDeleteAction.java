package com.shinowit.actions.SupplierAction;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.entity.TBaSupplierInfoEntity;
import com.shinowit.framework.dao.BaseDAO;

import javax.annotation.Resource;

/**
 * Created by daihui on 2014-11-11.
 */
public class SupplierDeleteAction extends ActionSupport{

    @Resource
    private BaseDAO<TBaSupplierInfoEntity> supDAO;

    private TBaSupplierInfoEntity supInfo;

    private String message;

    private boolean success;

    private String manySupplier;

    public String deleteSupplier(){
        Object obj=supDAO.delete(supInfo);
        if(true==obj){
             setSuccess(true);
            setMessage("删除供应商信息成功！");
        }else{
            setSuccess(false);
            setMessage("删除供应商信息失败！");
        }
        return SUCCESS;
    }

    public String deleteManySupplier(){
            String Arrays[]=manySupplier.split(",");
        for(String str:Arrays){
            int i=supDAO.extcuteHQL("DELETE FROM TBaSupplierInfoEntity WHERE supplierId=?",str);
            if(i==1){
                setSuccess(true);
                setMessage("删除供应商信息成功！");
            }else if(i<1){
                setSuccess(false);
                setMessage("删除供应商信息失败！");
            }

        }
        return SUCCESS;
    }

    public TBaSupplierInfoEntity getSupInfo() {
        return supInfo;
    }

    public void setSupInfo(TBaSupplierInfoEntity supInfo) {
        this.supInfo = supInfo;
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

    public String getManySupplier() {
        return manySupplier;
    }

    public void setManySupplier(String manySupplier) {
        this.manySupplier = manySupplier;
    }
}
