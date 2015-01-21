package com.shinowit.actions.OutStockAction;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.entity.TMeOutStockDetailsInfoEntity;
import com.shinowit.entity.TMeOutStockInfoEntity;
import com.shinowit.service.OutStockService;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by daihui on 2014-11-27.
 */
public class OutStockAction extends ActionSupport {

    @Resource
    private OutStockService outStockService;

    private TMeOutStockInfoEntity outStockInfo;

    private List<TMeOutStockDetailsInfoEntity> outStockDetailsInfoList;

    private String message;

    private boolean success;

    public String outStock(){
        boolean result=outStockService.save(outStockInfo,outStockDetailsInfoList);
        if(true==result){
            setSuccess(true);
            setMessage("出库成功！");
            return SUCCESS;
        }else{
            setSuccess(false);
            setMessage("出库失败，请检查！");
        }
        return SUCCESS;
    }

    public TMeOutStockInfoEntity getOutStockInfo() {
        return outStockInfo;
    }

    public void setOutStockInfo(TMeOutStockInfoEntity outStockInfo) {
        this.outStockInfo = outStockInfo;
    }

    public List<TMeOutStockDetailsInfoEntity> getOutStockDetailsInfoList() {
        return outStockDetailsInfoList;
    }

    public void setOutStockDetailsInfoList(List<TMeOutStockDetailsInfoEntity> outStockDetailsInfoList) {
        this.outStockDetailsInfoList = outStockDetailsInfoList;
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
