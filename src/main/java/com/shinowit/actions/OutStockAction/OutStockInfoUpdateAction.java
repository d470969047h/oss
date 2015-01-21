package com.shinowit.actions.OutStockAction;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.entity.TMeOutStockDetailsInfoEntity;
import com.shinowit.entity.TMeOutStockInfoEntity;
import com.shinowit.service.OutStockUpdateService;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by daihui on 2014-11-29.
 */
public class OutStockInfoUpdateAction extends ActionSupport {

    private boolean state;

    private boolean success;

    private String message;

    private TMeOutStockInfoEntity outStockInfo;

    private List<TMeOutStockDetailsInfoEntity> outStockDetailsInfoList;

    @Resource
    private OutStockUpdateService outStockUpdateService;

    public String updateOutStockDetailsInfo(){
        boolean isSuccess=outStockUpdateService.outStockInfoUpdate(outStockInfo,outStockDetailsInfoList);
        if(true==isSuccess){
            setState(true);
            setSuccess(true);
            setMessage("修改出库信息成功了哦*^_^*");
            return SUCCESS;
        }else{
            setState(true);
            setSuccess(false);
            setMessage("修改出库信息失败-_-!!");
        }
        return SUCCESS;
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
}
