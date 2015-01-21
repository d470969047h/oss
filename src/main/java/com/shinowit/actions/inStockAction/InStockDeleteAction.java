package com.shinowit.actions.inStockAction;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.entity.TMeInStockInfoEntity;
import com.shinowit.service.InStockDeleteService;

import javax.annotation.Resource;

/**
 * Created by daihui on 2014-11-20.
 */
public class InStockDeleteAction extends ActionSupport {
    private String message;

    private boolean success;

    private boolean state;

    private TMeInStockInfoEntity inStockInfo;

    @Resource
    private InStockDeleteService delService;

    public String inStockDelete() {
        String inStockBillCode = inStockInfo.getBillCode();
        boolean result = delService.delete(inStockBillCode);
        if (true == result) {
            setState(true);
            setSuccess(true);
            setMessage("删除成功！");
            return SUCCESS;
        } else {
            setState(false);
            setSuccess(true);
            setMessage("删除失败！");
            return SUCCESS;
        }
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

    public boolean isState() {
        return state;
    }

    public void setState(boolean state) {
        this.state = state;
    }

    public TMeInStockInfoEntity getInStockInfo() {
        return inStockInfo;
    }

    public void setInStockInfo(TMeInStockInfoEntity inStockInfo) {
        this.inStockInfo = inStockInfo;
    }
}
