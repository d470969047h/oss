package com.shinowit.actions.StockAction;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.entity.TMeStockInfoEntity;
import com.shinowit.framework.dao.BaseDAO;

import javax.annotation.Resource;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by daihui on 2014-11-23.
 */
public class StockInfoAction extends ActionSupport {

    private int rowCount;

    private int page;

    private int limit;

    private String merchandiseNAME;

    private String merchandiseCNAME;

    private List<TMeStockInfoEntity> stockInfoList;

    @Resource
    private BaseDAO<TMeStockInfoEntity> stockInfoDAO;

    public String stockInfoQuery() {
        String pageSql = " FROM TMeStockInfoEntity WHERE 1=1 ";
        String countSql = " SELECT COUNT(*) FROM TMeStockInfoEntity WHERE 1=1 ";

        List<Object> params = new ArrayList<Object>();
        if ((null != merchandiseNAME) && (merchandiseNAME.trim().length() > 0)) {
            try {
                byte[] paramStr = merchandiseNAME.getBytes("ISO-8859-1");
                merchandiseNAME = new String(paramStr, "UTF-8");
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            pageSql = pageSql + " AND myMeMerchandiseInfoByMerchandiseId.merchandiseName LIKE ? ";
            countSql = countSql + " AND myMeMerchandiseInfoByMerchandiseId.merchandiseName LIKE ? ";
            params.add("%" + merchandiseNAME + "%");
        }
        if ((null != merchandiseCNAME) && (merchandiseCNAME.trim().length() > 0)) {
            try {
                byte[] paramStr = merchandiseCNAME.getBytes("ISO-8859-1");
                merchandiseCNAME = new String(paramStr, "UTF-8");
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            pageSql = pageSql + " AND myMeMerchandiseCInfoByMerchandiseCid.merchandiseCName LIKE ? ";
            countSql = countSql + " AND myMeMerchandiseCInfoByMerchandiseCid.merchandiseCName LIKE ? ";
            params.add("%" + merchandiseCNAME + "%");
        }
        rowCount = stockInfoDAO.queryRecordCount(countSql, params.toArray());
        if ((rowCount % limit == 0) && (rowCount / limit < page)) {
            page = page - 1;
        }
        stockInfoList = stockInfoDAO.queryForPage(pageSql, page, limit, params.toArray());
        return SUCCESS;
    }

    public int getRowCount() {
        return rowCount;
    }

    public void setRowCount(int rowCount) {
        this.rowCount = rowCount;
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

    public List<TMeStockInfoEntity> getStockInfoList() {
        return stockInfoList;
    }

    public void setStockInfoList(List<TMeStockInfoEntity> stockInfoList) {
        this.stockInfoList = stockInfoList;
    }

    public String getMerchandiseNAME() {
        return merchandiseNAME;
    }

    public void setMerchandiseNAME(String merchandiseNAME) {
        this.merchandiseNAME = merchandiseNAME;
    }

    public String getMerchandiseCNAME() {
        return merchandiseCNAME;
    }

    public void setMerchandiseCNAME(String merchandiseCNAME) {
        this.merchandiseCNAME = merchandiseCNAME;
    }
}
