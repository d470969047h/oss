package com.shinowit.actions.OutStockAction;

/**
 * Created by daihui on 2014-11-20.
 */

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.entity.TMeOutStockInfoEntity;
import com.shinowit.framework.dao.BaseDAO;

import javax.annotation.Resource;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

public class OutStockPagingAction extends ActionSupport {

    private List<TMeOutStockInfoEntity> outStockList;

    @Resource
    private BaseDAO<TMeOutStockInfoEntity> outStockDAO;

    private String outStockHandler;

    private int page;

    private int limit;

    private int rowCount;

    public String queryOutStockInfo() {

        String sqlpage = " FROM TMeOutStockInfoEntity WHERE 1=1 ";
        String sqlcount = " SELECT COUNT(*) FROM TMeOutStockInfoEntity WHERE 1=1 ";

        List<Object> params = new ArrayList<Object>();
        if ((null != outStockHandler) && (outStockHandler.trim().length() > 0)) {
            try {
                // new String(outStockHandler.getBytes("iso-8859-1"), "utf-8");
                byte[] paramStr = outStockHandler.getBytes("ISO-8859-1");
                outStockHandler = new String(paramStr, "UTF-8");
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            sqlpage = sqlpage + " AND handler LIKE ? ";
            sqlcount = sqlcount + " AND handler LIKE ?";
            params.add("%" + outStockHandler + "%");
        }
        sqlpage = sqlpage + " ORDER BY outTime DESC ";

        rowCount = outStockDAO.queryRecordCount(sqlcount, params.toArray());
        if ((rowCount % limit == 0) && (rowCount / limit < page)) {
            page = page - 1;
        }
        outStockList = outStockDAO.queryForPage(sqlpage, page, limit, params.toArray());
        return SUCCESS;
    }

    public String getOutStockHandler() {
        return outStockHandler;
    }

    public void setOutStockHandler(String outStockHandler) {
        this.outStockHandler = outStockHandler;
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

    public List<TMeOutStockInfoEntity> getOutStockList() {
        return outStockList;
    }

    public void setOutStockList(List<TMeOutStockInfoEntity> outStockList) {
        this.outStockList = outStockList;
    }
}


