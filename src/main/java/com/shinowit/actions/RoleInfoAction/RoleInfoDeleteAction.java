package com.shinowit.actions.RoleInfoAction;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.entity.TAuRoleInfoEntity;
import com.shinowit.service.RoleInfoDeleteService;

import javax.annotation.Resource;

/**
 * Created by daihui on 2014-12-07.
 */
public class RoleInfoDeleteAction extends ActionSupport {

    private boolean state;

    private boolean success;

    private String message;

    private TAuRoleInfoEntity deleteRoleInfo;

    @Resource
    private RoleInfoDeleteService roleInfoDeleteService;

    public String delRoleInfo(){
        boolean isSuccess=false;
        try {
             isSuccess=roleInfoDeleteService.deleteRoleInfoService(deleteRoleInfo);
        }catch (Exception e){
            e.printStackTrace();
        }
        if(true==isSuccess){
            setState(true);
            setSuccess(true);
            setMessage("删除成功*^_^*");
            return SUCCESS;
        }else{
            setState(true);
            setSuccess(false);
            setMessage("删除失败-_-!!");
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

    public TAuRoleInfoEntity getDeleteRoleInfo() {
        return deleteRoleInfo;
    }

    public void setDeleteRoleInfo(TAuRoleInfoEntity deleteRoleInfo) {
        this.deleteRoleInfo = deleteRoleInfo;
    }

}
