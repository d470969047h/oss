package com.shinowit.actions.inStockAction;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.entity.TMeInStockDetailsInfoEntity;
import com.shinowit.entity.TMeInStockInfoEntity;
import com.shinowit.service.InStockService;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by daihui on 2014-11-17.
 */
public class InStockAction extends ActionSupport {

    @Resource
    private InStockService inStockService;

    private TMeInStockInfoEntity inStockInfo;

    private List<TMeInStockDetailsInfoEntity> inStockDetailsInfoList;
    private boolean success;

    private String message;

    public String Instock() {
        boolean result = inStockService.save(inStockInfo, inStockDetailsInfoList);
        if (true == result) {
            setSuccess(true);
            setMessage("入库成功！");
            return SUCCESS;
        } else {
            setSuccess(false);
            setMessage("入库失败");
        }
        return SUCCESS;
    }

    public TMeInStockInfoEntity getInStockInfo() {
        return inStockInfo;
    }

    public void setInStockInfo(TMeInStockInfoEntity inStockInfo) {
        this.inStockInfo = inStockInfo;
    }


    public List<TMeInStockDetailsInfoEntity> getInStockDetailsInfoList() {
        return inStockDetailsInfoList;
    }

    public void setInStockDetailsInfoList(List<TMeInStockDetailsInfoEntity> inStockDetailsInfoList) {
        this.inStockDetailsInfoList = inStockDetailsInfoList;
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
