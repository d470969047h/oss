package com.shinowit.entity;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by daihui on 2014-12-11.
 */
public class TreeNode {

    private TreeNode parent;

    private List<TreeNode> children = new ArrayList<TreeNode>();

    private TAuMenuInfoEntity menuInfoEntity;


    public void addChild(TreeNode childNode){
        childNode.parent=this;
        children.add(childNode);
    }

    public List<TreeNode> getChildren() {
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
