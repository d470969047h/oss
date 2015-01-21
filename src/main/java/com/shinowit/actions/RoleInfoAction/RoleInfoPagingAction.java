package com.shinowit.actions.RoleInfoAction;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.entity.TAuRoleInfoEntity;
import com.shinowit.framework.dao.BaseDAO;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by daihui on 2014-12-01.
 */
public class RoleInfoPagingAction extends ActionSupport {
    private int page;

    private int limit;

    private int rowCount;

    private List<TAuRoleInfoEntity> roleInfoList;

    @Resource
    private BaseDAO<TAuRoleInfoEntity> roleInfoDAO;

    public String roliInfoQuery() {
        String sqlPaging = " FROM TAuRoleInfoEntity WHERE 1=1 ";
        String sqlCouont = " SELECT COUNT(*) FROM TAuRoleInfoEntity WHERE 1=1 ";
        rowCount = roleInfoDAO.queryRecordCount(sqlCouont);
        if ((rowCount % limit == 0) && (rowCount / limit < page)) {
            page = page - 1;
        }
        roleInfoList = roleInfoDAO.queryForPage(sqlPaging, page, limit);
        return SUCCESS;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getLimit() {
        return limit;
    }

    public void setLimit(int limit) {
        this.limit = limit;
    }

    public int getRowCount() {
        return rowCount;
    }

    public void setRowCount(int rowCount) {
        this.rowCount = rowCount;
    }

    public List<TAuRoleInfoEntity> getRoleInfoList() {
        return roleInfoList;
    }

    public void setRoleInfoList(List<TAuRoleInfoEntity> roleInfoList) {
        this.roleInfoList = roleInfoList;
    }
}
