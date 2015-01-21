package com.shinowit.actions.OutStockAction;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.entity.TMeOutStockInfoEntity;
import com.shinowit.service.OutStockDeleteService;

import javax.annotation.Resource;

/**
 * Created by daihui on 2014-11-29.
 */
public class OutStockInfoDeleteAction extends ActionSupport {

    private TMeOutStockInfoEntity outStockInfo;

    private boolean state;

    private boolean success;

    private String message;

    @Resource
    private OutStockDeleteService outStockDeleteService;

    public String outStockInfoDelete(){
        String outBillcode=outStockInfo.getOutBillCode();
        boolean isSuccess=outStockDeleteService.outStockInfoDelete(outBillcode);
        if(true==isSuccess){
           setState(true);
            setSuccess(true);
            setMessage("删除出库信息成功*^_^*");
            return SUCCESS;
        }else{
            setState(true);
            setSuccess(false);
            setMessage("删除出库信息失败-_-!!");
        }
        return SUCCESS;
    }

    public TMeOutStockInfoEntity getOutStockInfo() {
        return outStockInfo;
    }

    public void setOutStockInfo(TMeOutStockInfoEntity outStockInfo) {
        this.outStockInfo = outStockInfo;
    }

    public boolean isState() {
        return state;
    }

    public void setState(boolean state) {
        this.state = state;
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
