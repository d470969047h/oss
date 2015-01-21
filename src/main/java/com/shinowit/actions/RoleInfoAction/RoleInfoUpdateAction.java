package com.shinowit.actions.RoleInfoAction;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.entity.TAuMenuInfoEntity;
import com.shinowit.entity.TAuRoleInfoEntity;
import com.shinowit.service.RoleInfoUpdateService;
import org.apache.struts2.json.annotations.JSON;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by daihui on 2014-12-04.
 */
public class RoleInfoUpdateAction extends ActionSupport {

    private boolean state;

    private boolean success;

    private String message;

    private TAuRoleInfoEntity updateRoleInfo;

    private List<TAuMenuInfoEntity> updateMenuInfoList;

    @Resource
    private RoleInfoUpdateService infoUpdateService;

    public String updateRoleInfo(){
        boolean isSuccess=false;
        try {
             isSuccess=infoUpdateService.updateRoleInfoService(updateRoleInfo,updateMenuInfoList);
        }catch (Exception e){
                e.printStackTrace();
        }
        if(true==isSuccess){
            setState(true);
            setSuccess(true);
            setMessage("修改角色信息成功！");
            return SUCCESS;
        }else{
            setState(true);
            setSuccess(false);
            setMessage("修改角色信息失败！");
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

    public TAuRoleInfoEntity getUpdateRoleInfo() {
        return updateRoleInfo;
    }

    public void setUpdateRoleInfo(TAuRoleInfoEntity updateRoleInfo) {
        this.updateRoleInfo = updateRoleInfo;
    }

    @JSON(serialize = false)
    public List<TAuMenuInfoEntity> getUpdateMenuInfoList() {
        return updateMenuInfoList;
    }

    @JSON(serialize = false)
    public void setUpdateMenuInfoList(List<TAuMenuInfoEntity> updateMenuInfoList) {
        this.updateMenuInfoList = updateMenuInfoList;
    }

}
