package com.shinowit.actions.OperInfoAction;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.entity.VRoleInfoEntity;
import com.shinowit.framework.dao.BaseDAO;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by daihui on 2014-12-07.
 */
public class RoleInfoQueryForTreeAction extends ActionSupport {

    private List<VRoleInfoEntity> roleInfoList;

    @Resource
    private BaseDAO<VRoleInfoEntity> roleInfoDAO;

    public String queryRoleForTree(){
        roleInfoList=roleInfoDAO.listAll(VRoleInfoEntity.class);
        return SUCCESS;
    }

    public List<VRoleInfoEntity> getRoleInfoList() {
        return roleInfoList;
    }

    public void setRoleInfoList(List<VRoleInfoEntity> roleInfoList) {
        this.roleInfoList = roleInfoList;
    }
}
