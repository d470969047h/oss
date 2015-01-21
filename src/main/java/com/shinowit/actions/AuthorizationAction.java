package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.TreeDAO;
import com.shinowit.entity.TreeNode;
import org.apache.struts2.ServletActionContext;

import javax.annotation.Resource;

/**
 * Created by daihui on 2014-12-11.
 */
public class AuthorizationAction extends ActionSupport {

    @Resource
    private TreeDAO treeDAO;

    private TreeNode treeNode;

    private boolean success;

    public String menuInfo(){
        setSuccess(true);
        String roleId= (String) ServletActionContext.getContext().getSession().get("operOperID");
        treeNode=treeDAO.queryMenu(roleId);
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
}
