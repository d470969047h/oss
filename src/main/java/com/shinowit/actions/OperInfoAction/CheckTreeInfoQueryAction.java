package com.shinowit.actions.OperInfoAction;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.entity.TAuAuthorizationEntity;
import com.shinowit.framework.dao.BaseDAO;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by daihui on 2014-12-03.
 */
public class CheckTreeInfoQueryAction extends ActionSupport {

    private List<TAuAuthorizationEntity> authorizationList;

    private String RoleInfoID;

    @Resource
    private BaseDAO<TAuAuthorizationEntity> authorizationDAO;

    public String checkTreeInfoQuery() {
        authorizationList = authorizationDAO.myFindByHql("FROM TAuAuthorizationEntity WHERE myAuRoleInfoByRoleId.roleId=?", RoleInfoID);
        return SUCCESS;
    }

    public List<TAuAuthorizationEntity> getAuthorizationList() {
        return authorizationList;
    }

    public void setAuthorizationList(List<TAuAuthorizationEntity> authorizationList) {
        this.authorizationList = authorizationList;
    }

    public String getRoleInfoID() {
        return RoleInfoID;
    }

    public void setRoleInfoID(String roleInfoID) {
        RoleInfoID = roleInfoID;
    }

}
