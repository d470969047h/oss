package com.shinowit.actions.SupplierAction;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.entity.TBaSupplierInfoEntity;
import com.shinowit.framework.dao.BaseDAO;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by daihui on 2014-11-11.
 */
public class SupplierAddAction extends ActionSupport {

    @Resource
    private BaseDAO<TBaSupplierInfoEntity> supDAO;

    private TBaSupplierInfoEntity supInfo;

    private String message;

    private boolean success;

    public String addSupplier(){
            List<TBaSupplierInfoEntity> obj1=supDAO.myFindByHql("FROM TBaSupplierInfoEntity WHERE supplierId=? OR supplierName=?", supInfo.getSupplierId(), supInfo.getSupplierName());
            if(obj1.size()<1){
                Object obj=supDAO.insert(supInfo);
                if(null!=obj){
                    setSuccess(true);
                    setMessage("供应商信息添加成功！");
                }else{
                    setSuccess(false);
                    setMessage("供应商信息添加失败！");
                }
            }else{
                setSuccess(false);
                setMessage("供应商信息添加失败！该供应商已存在！");
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
}
