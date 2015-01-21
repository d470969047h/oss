package com.shinowit.actions.inStockAction;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.entity.TMeInStockDetailsInfoEntity;
import com.shinowit.entity.TMeInStockInfoEntity;
import com.shinowit.service.InStockUpdateService;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by daihui on 2014-11-28.
 */
public class InStockUpdateAction extends ActionSupport {

    @Resource
    private InStockUpdateService inStockUpdateService;

    private TMeInStockInfoEntity inStockInfo;

    private List<TMeInStockDetailsInfoEntity> inStockDetailsInfoList;

    private boolean state;

    private boolean success;

    private String message;

    public String updateInStockInfo(){
        boolean isSuccess=inStockUpdateService.update(inStockInfo,inStockDetailsInfoList);
        if(true==isSuccess){
            setState(true);
            setSuccess(true);
            setMessage("修改入库信息成功！^_^");
            return SUCCESS;
        }else{
            setState(true);
            setSuccess(false);
            setMessage("修改入库失败了！-_-！");
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
