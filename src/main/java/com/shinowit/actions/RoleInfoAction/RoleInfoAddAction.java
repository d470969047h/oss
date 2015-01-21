package com.shinowit.actions.RoleInfoAction;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.entity.TAuMenuInfoEntity;
import com.shinowit.entity.TAuRoleInfoEntity;
import com.shinowit.service.RoleInfoAddService;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by daihui on 2014-12-03.
 */
public class RoleInfoAddAction extends ActionSupport {
    private boolean state;

    private boolean success;

    private String message;

    private TAuRoleInfoEntity roleInfo;

    private List<TAuMenuInfoEntity> menuInfoList;

    @Resource
    private RoleInfoAddService roleInfoAddService;

    public String addRoleInfo(){
        boolean isSuccess=false;
        try {
            isSuccess=roleInfoAddService.addRoleInfoService(roleInfo,menuInfoList);
        }catch (Exception e){
            e.printStackTrace();
        }
        if(true==isSuccess){
            setState(true);
            setSuccess(true);
            setMessage("添加角色成功*^_^*");
            return SUCCESS;
        }else{
            setState(true);
            setSuccess(false);
            setMessage("添加角色失败-_-!!");
        }
        return SUCCESS;
    }

    public TAuRoleInfoEntity getRoleInfo() {
        return roleInfo;
    }

    public void setRoleInfo(TAuRoleInfoEntity roleInfo) {
        this.roleInfo = roleInfo;
    }


//    @JSON(serialize = false)
    public List<TAuMenuInfoEntity> getMenuInfoList() {
        return menuInfoList;
    }

//    @JSON(serialize = false)
    public void setMenuInfoList(List<TAuMenuInfoEntity> menuInfoList) {
        this.menuInfoList = menuInfoList;
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
