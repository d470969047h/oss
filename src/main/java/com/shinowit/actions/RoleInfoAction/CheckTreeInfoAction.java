package com.shinowit.actions.RoleInfoAction;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.roleDAO;
import com.shinowit.entity.RoleTreeNode;

import javax.annotation.Resource;

/**
 * Created by daihui on 2014-12-01.
 */
public class CheckTreeInfoAction extends ActionSupport {

   @Resource
    private roleDAO roledao;

    private RoleTreeNode roleTreeNode;

    private boolean success;

    public String queryCheckTreeInfo(){
        setSuccess(true);
        roleTreeNode=roledao.queryMenu();
        return SUCCESS;
    }

    public RoleTreeNode getRoleTreeNode() {
        return roleTreeNode;
    }

    public void setRoleTreeNode(RoleTreeNode roleTreeNode) {
        this.roleTreeNode = roleTreeNode;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }
}







