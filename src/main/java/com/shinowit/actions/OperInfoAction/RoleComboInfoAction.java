package com.shinowit.actions.OperInfoAction;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.entity.TAuRoleInfoEntity;
import com.shinowit.framework.dao.BaseDAO;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by daihui on 2014-11-17.
 */
public class RoleComboInfoAction extends ActionSupport {
    private List<TAuRoleInfoEntity> roleComInfoList;
    @Resource
    private BaseDAO<TAuRoleInfoEntity> roleComDAO;

    public String queryRoleComInfo() {
        roleComInfoList=roleComDAO.listAll(TAuRoleInfoEntity.class);
        return SUCCESS;
    }

    public List<TAuRoleInfoEntity> getRoleComInfoList() {
        return roleComInfoList;
    }

    public void setRoleComInfoList(List<TAuRoleInfoEntity> roleComInfoList) {
        this.roleComInfoList = roleComInfoList;
    }
}
