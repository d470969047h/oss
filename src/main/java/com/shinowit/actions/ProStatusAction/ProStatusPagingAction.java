package com.shinowit.actions.ProStatusAction;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.entity.TMeProStatusInfoEntity;
import com.shinowit.framework.dao.BaseDAO;

import javax.annotation.Resource;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by daihui on 2014-11-12.
 */
public class ProStatusPagingAction extends ActionSupport {

    private List<TMeProStatusInfoEntity> proStatusList;

    @Resource
    private BaseDAO<TMeProStatusInfoEntity> proSDAO;

    private String ProStatusID;

    private String ProStatusName;

    private int page;

    private int limit;

    private int rowCount;

    public String queryProS(){

        String sqlpage = " FROM TMeProStatusInfoEntity WHERE 1=1 ";
        String sqlcount = " SELECT COUNT(*) FROM TMeProStatusInfoEntity WHERE 1=1 ";

        List<Object> params = new ArrayList<Object>();
        if ((null != ProStatusName) && (ProStatusName.trim().length() > 0)) {
            try {
                byte[] paramStr1 = ProStatusName.getBytes("ISO-8859-1");
                ProStatusName = new String(paramStr1, "UTF-8");
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            sqlpage = sqlpage + " and ProStatusName LIKE ? ";
            sqlcount = sqlcount + " and ProStatusName LIKE ?";
            params.add("%" + ProStatusName + "%");
        }
        if ((null != ProStatusID) && (ProStatusID.trim().length() > 0)) {
            try {
                byte[] paramStr2 = ProStatusID.getBytes("ISO-8859-1");
                ProStatusID = new String(paramStr2, "UTF-8");
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            sqlpage = sqlpage + " and ProStatusID LIKE ? ";
            sqlcount = sqlcount + " and ProStatusID LIKE ?";
            params.add("%" + ProStatusID + "%");
        }

        rowCount = proSDAO.queryRecordCount(sqlcount, params.toArray());
        if ((rowCount % limit == 0) && (rowCount / limit < page)) {
            page = page - 1;
        }
        proStatusList = proSDAO.queryForPage(sqlpage, page, limit, params.toArray());
        return SUCCESS;
    }

    public List<TMeProStatusInfoEntity> getProStatusList() {
        return proStatusList;
    }

    public void setProStatusList(List<TMeProStatusInfoEntity> proStatusList) {
        this.proStatusList = proStatusList;
    }

    public String getProStatusID() {
        return ProStatusID;
    }

    public void setProStatusID(String proStatusID) {
        ProStatusID = proStatusID;
    }

    public String getProStatusName() {
        return ProStatusName;
    }

    public void setProStatusName(String proStatusName) {
        ProStatusName = proStatusName;
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
}


