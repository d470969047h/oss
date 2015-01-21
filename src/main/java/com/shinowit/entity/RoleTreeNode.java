package com.shinowit.entity;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by daihui on 2014-12-11.
 */
public class RoleTreeNode {

    private RoleTreeNode parent;

    private boolean checked;

    private List<RoleTreeNode> children = new ArrayList<RoleTreeNode>();

    private TAuMenuInfoEntity menuInfoEntity;


    public void addChild(RoleTreeNode childNode){
        childNode.parent=this;
        children.add(childNode);
    }

    public boolean isChecked() {
        return checked==true;
    }

    public List<RoleTreeNode> getChildren() {
        return children;
    }

    public boolean isLeaf(){
        return children.size()==0;
    }

    public TAuMenuInfoEntity getMenuInfoEntity() {
        return menuInfoEntity;
    }

    public void setMenuInfoEntity(TAuMenuInfoEntity menuInfoEntity) {
        this.menuInfoEntity = menuInfoEntity;
    }
}
