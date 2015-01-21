package com.shinowit.actions.inStockAction;

/**
 * Created by daihui on 2014-11-20.
 */

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.entity.TMeInStockInfoEntity;
import com.shinowit.framework.dao.BaseDAO;

import javax.annotation.Resource;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

public class InStockPagingAction extends ActionSupport {

    private List<TMeInStockInfoEntity> inStockList;

    @Resource
    private BaseDAO<TMeInStockInfoEntity> inStockDAO;

    private String inStockHandler;

    private int page;

    private int limit;

    private int rowCount;

    public String queryInStockInfo() {

        String sqlpage = " FROM TMeInStockInfoEntity WHERE 1=1 ";
        String sqlcount = " SELECT COUNT(*) FROM TMeInStockInfoEntity WHERE 1=1 ";

        List<Object> params = new ArrayList<Object>();
        if ((null != inStockHandler) && (inStockHandler.trim().length() > 0)) {
            try {
                byte[] paramStr = inStockHandler.getBytes("ISO-8859-1");
                inStockHandler = new String(paramStr, "UTF-8");
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            sqlpage = sqlpage + " AND handler LIKE ? ";
            sqlcount = sqlcount + " AND handler LIKE ?";

            params.add("%" + inStockHandler + "%");
        }
        sqlpage = sqlpage + " ORDER BY inTime DESC ";

        rowCount = inStockDAO.queryRecordCount(sqlcount, params.toArray());
        if ((rowCount % limit == 0) && (rowCount / limit < page)) {
            page = page - 1;
        }
            inStockList = inStockDAO.queryForPage(sqlpage, page, limit, params.toArray());
            return SUCCESS;
    }

    public List<TMeInStockInfoEntity> getInStockList() {
        return inStockList;
    }

    public void setInStockList(List<TMeInStockInfoEntity> inStockList) {
        this.inStockList = inStockList;
    }

    public String getInStockHandler() {
        return inStockHandler;
    }

    public void setInStockHandler(String inStockHandler) {
        this.inStockHandler = inStockHandler;
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


