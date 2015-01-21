package com.shinowit.actions.SupplierAction;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.entity.TBaSupplierInfoEntity;
import com.shinowit.framework.dao.BaseDAO;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by daihui on 2014-11-11.
 */
public class SupplierUpdateAction extends ActionSupport {

    @Resource
    private BaseDAO<TBaSupplierInfoEntity> supDAO;

    private List<TBaSupplierInfoEntity> supList;

    private TBaSupplierInfoEntity supInfo;

    private String message;

    private boolean success;

    public String updateSupplier(){
        boolean result=supDAO.update(supInfo);
        if(true==result){
            setSuccess(true);
            setMessage("修改供应商信息成功!");
        }else{
            setSuccess(false);
            setMessage("修改供应商信息失败！");
        }
        return SUCCESS;
    }

    public List<TBaSupplierInfoEntity> getSupList() {
        return supList;
    }

    public void setSupList(List<TBaSupplierInfoEntity> supList) {
        this.supList = supList;
    }

    public TBaSupplierInfoEntity getSupInfo() {
        return supInfo;
    }

    public void setSupInfo(TBaSupplierInfoEntity supInfo) {
        this.supInfo = supInfo;
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
