package com.shinowit.actions.UnitInfoAction;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.entity.TMeUnitInfoEntity;
import com.shinowit.framework.dao.BaseDAO;

import javax.annotation.Resource;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by daihui on 2014-11-12.
 */
public class UnitInfoPagingAction extends ActionSupport {

    private List<TMeUnitInfoEntity> unitInfoList;

    @Resource
    private BaseDAO<TMeUnitInfoEntity> unitDAO;

    private String UnitID;

    private String UnitName;

    private int page;

    private int limit;

    private int rowCount;

    public String queryUnitInfo() {

        String sqlpage = " FROM TMeUnitInfoEntity WHERE 1=1 ";
        String sqlcount = " SELECT COUNT(*) FROM TMeUnitInfoEntity WHERE 1=1 ";

        List<Object> params = new ArrayList<Object>();
        if ((null != UnitName) && (UnitName.trim().length() > 0)) {
            try {
                byte[] paramStr1 = UnitName.getBytes("ISO-8859-1");
                UnitName = new String(paramStr1, "UTF-8");
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            sqlpage = sqlpage + " and name LIKE ? ";
            sqlcount = sqlcount + " and name LIKE ?";
            params.add("%" + UnitName + "%");
        }
        if ((null != UnitID) && (UnitID.trim().length() > 0)) {
            try {
                byte[] paramStr2 = UnitID.getBytes("ISO-8859-1");
                UnitID = new String(paramStr2, "UTF-8");
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            sqlpage = sqlpage + " and unitId LIKE ? ";
            sqlcount = sqlcount + " and unitId LIKE ?";
            params.add("%" + UnitID + "%");
        }

        rowCount = unitDAO.queryRecordCount(sqlcount, params.toArray());
        if ((rowCount % limit == 0) && (rowCount / limit < page)) {
            page = page - 1;
        }
        unitInfoList = unitDAO.queryForPage(sqlpage, page, limit, params.toArray());
        return SUCCESS;
    }

    public String getUnitID() {
        return UnitID;
    }

    public void setUnitID(String unitID) {
        UnitID = unitID;
    }

    public String getUnitName() {
        return UnitName;
    }

    public void setUnitName(String unitName) {
        UnitName = unitName;
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

    public List<TMeUnitInfoEntity> getUnitInfoList() {
        return unitInfoList;
    }

    public void setUnitInfoList(List<TMeUnitInfoEntity> unitInfoList) {
        this.unitInfoList = unitInfoList;
    }
}


