package com.shinowit.actions.RoleInfoAction;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.roleAutDAO;
import com.shinowit.entity.TreeNode;

import javax.annotation.Resource;

/**
 * Created by daihui on 2014-12-03.
 */
public class RoleInfoIDQueryAction extends ActionSupport {

    private TreeNode treeNode;

    private String roleID;

    @Resource
    private roleAutDAO roleautDAO;

    private boolean success;

    public String queryRoleInfoID(){
        setSuccess(true);
        treeNode=roleautDAO.queryMenu(roleID);
        return SUCCESS;
    }

    public TreeNode getTreeNode() {
        return treeNode;
    }

    public void setTreeNode(TreeNode treeNode) {
        this.treeNode = treeNode;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getRoleID() {
        return roleID;
    }

    public void setRoleID(String roleID) {
        this.roleID = roleID;
    }
}
