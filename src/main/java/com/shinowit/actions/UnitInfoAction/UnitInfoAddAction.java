package com.shinowit.actions.UnitInfoAction;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.entity.TMeUnitInfoEntity;
import com.shinowit.framework.dao.BaseDAO;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by daihui on 2014-11-12.
 */
public class UnitInfoAddAction extends ActionSupport {


    @Resource
    private BaseDAO<TMeUnitInfoEntity> uDAO;

    private TMeUnitInfoEntity unitInfo;

    private String message;

    private boolean success;

    public String addUnitInfo(){
        List<TMeUnitInfoEntity> obj1=uDAO.myFindByHql("FROM TMeUnitInfoEntity WHERE name=?", unitInfo.getName());
        if(obj1.size()==0){
            Object obj=uDAO.insert(unitInfo);
            if(null!=obj){
                setSuccess(true);
                setMessage("单位信息添加成功！");
                return SUCCESS;
            }else{
                setSuccess(false);
                setMessage("单位信息添加失败！");
                return SUCCESS;
            }
        }else{
            setSuccess(false);
            setMessage("单位信息添加失败！该单位已存在！");
        }
        return SUCCESS;
    }

    public TMeUnitInfoEntity getUnitInfo() {
        return unitInfo;
    }

    public void setUnitInfo(TMeUnitInfoEntity unitInfo) {
        this.unitInfo = unitInfo;
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


