package com.shinowit.actions.OperInfoAction;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.entity.TAuOperInfoEntity;
import com.shinowit.framework.dao.BaseDAO;

import javax.annotation.Resource;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by daihui on 2014-11-17.
 */
public class OperPagingInfoAction extends ActionSupport {
    private List<TAuOperInfoEntity> operInfoList;

    private List<TAuOperInfoEntity> tAuOperInfoEntityList;
    @Resource
    private BaseDAO<TAuOperInfoEntity> operDAO;

    private String operID;

    private String operNAME;

    private int page;

    private int limit;

    private int rowCount;

    public String queryOperInfo() {

        String sqlpage = " FROM TAuOperInfoEntity WHERE 1=1 ";
        String sqlcount = " SELECT COUNT(*) FROM TAuOperInfoEntity WHERE 1=1 ";

        List<Object> params = new ArrayList<Object>();
        if ((null != operNAME) && (operNAME.trim().length() > 0)) {
            try {
                byte[] paramStr1 = operNAME.getBytes("ISO-8859-1");
                operNAME = new String(paramStr1, "UTF-8");
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            sqlpage = sqlpage + " and operName LIKE ? ";
            sqlcount = sqlcount + " and operName LIKE ?";
            params.add("%" + operNAME + "%");
        }
        if ((null != operID) && (operID.trim().length() > 0)) {
            try {
                byte[] paramStr2 = operID.getBytes("ISO-8859-1");
                operID = new String(paramStr2, "UTF-8");
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            sqlpage = sqlpage + " and operId LIKE ? ";
            sqlcount = sqlcount + " and operId LIKE ?";
            params.add("%" + operID + "%");
        }

        rowCount = operDAO.queryRecordCount(sqlcount, params.toArray());
        if ((rowCount % limit == 0) && (rowCount / limit < page)) {
            page = page - 1;
        }
        operInfoList = operDAO.queryForPage(sqlpage, page, limit, params.toArray());

        tAuOperInfoEntityList=operDAO.listAll(TAuOperInfoEntity.class);
        return SUCCESS;
    }

    public String getOperID() {
        return operID;
    }

    public void setOperID(String operID) {
        this.operID = operID;
    }

    public String getOperNAME() {
        return operNAME;
    }

    public void setOperNAME(String operNAME) {
        this.operNAME = operNAME;
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

    public List<TAuOperInfoEntity> getOperInfoList() {
        return operInfoList;
    }

    public void setOperInfoList(List<TAuOperInfoEntity> operInfoList) {
        this.operInfoList = operInfoList;
    }

    public List<TAuOperInfoEntity> gettAuOperInfoEntityList() {
        return tAuOperInfoEntityList;
    }

    public void settAuOperInfoEntityList(List<TAuOperInfoEntity> tAuOperInfoEntityList) {
        this.tAuOperInfoEntityList = tAuOperInfoEntityList;
    }
}
