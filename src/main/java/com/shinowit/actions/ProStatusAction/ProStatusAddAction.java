package com.shinowit.actions.ProStatusAction;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.entity.TMeProStatusInfoEntity;
import com.shinowit.framework.dao.BaseDAO;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by daihui on 2014-11-12.
 */
public class ProStatusAddAction extends ActionSupport {


    @Resource
    private BaseDAO<TMeProStatusInfoEntity> proSDAO;

    private TMeProStatusInfoEntity proSInfo;

    private String message;

    private boolean success;

    public String addProStatus(){
        List<TMeProStatusInfoEntity> obj1=proSDAO.myFindByHql("FROM TMeProStatusInfoEntity WHERE proStatusName=?", proSInfo.getProStatusName());
        if(obj1.size()==0){
            Object obj=proSDAO.insert(proSInfo);
            if(null!=obj){
                setSuccess(true);
                setMessage("商品促销状态信息添加成功！");
            }else{
                setSuccess(false);
                setMessage("商品促销状态信息添加失败！");
            }
        }else{
            setSuccess(false);
            setMessage("商品促销状态信息添加失败！该商品促销状态已存在！");
        }
        return SUCCESS;
    }

    public TMeProStatusInfoEntity getProSInfo() {
        return proSInfo;
    }

    public void setProSInfo(TMeProStatusInfoEntity proSInfo) {
        this.proSInfo = proSInfo;
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


