package com.shinowit.actions.MerchandiseClassAction;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.entity.TMeMerchandiseCInfoEntity;
import com.shinowit.framework.dao.BaseDAO;

import javax.annotation.Resource;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by daihui on 2014-11-12.
 */
public class MerchandisePagingClassAction extends ActionSupport {

    private List<TMeMerchandiseCInfoEntity> merchandiseCList;

    @Resource
    private BaseDAO<TMeMerchandiseCInfoEntity> merCDAO;

    private String merchandiseCid;

    private String merchandiseCName;

    private int page;

    private int limit;

    private int rowCount;

    public String queryMerC() {

        String sqlpage = " FROM TMeMerchandiseCInfoEntity WHERE 1=1 ";
        String sqlcount = " SELECT COUNT(*) FROM TMeMerchandiseCInfoEntity WHERE 1=1 ";

        List<Object> params = new ArrayList<Object>();
        if ((null != merchandiseCName) && (merchandiseCName.trim().length() > 0)) {
            try {
                byte[] paramStr = merchandiseCName.getBytes("ISO-8859-1");
                merchandiseCName = new String(paramStr, "UTF-8");
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            sqlpage = sqlpage + " and merchandiseCName LIKE ? ";
            sqlcount = sqlcount + " and merchandiseCName LIKE ?";
            params.add("%" + merchandiseCName + "%");
        }
        if ((null != merchandiseCid) && (merchandiseCid.trim().length() > 0)) {
            sqlpage = sqlpage + " and merchandiseCid LIKE ? ";
            sqlcount = sqlcount + " and merchandiseCid LIKE ?";
            params.add("%" + merchandiseCid + "%");
        }

        rowCount = merCDAO.queryRecordCount(sqlcount, params.toArray());
        if ((rowCount % limit == 0) && (rowCount / limit < page)) {
            page = page - 1;
            merchandiseCList = merCDAO.queryForPage(sqlpage, page, limit, params.toArray());
        } else {
            merchandiseCList = merCDAO.queryForPage(sqlpage, page, limit, params.toArray());
            return SUCCESS;
        }
        return SUCCESS;
    }

    public List<TMeMerchandiseCInfoEntity> getMerchandiseCList() {
        return merchandiseCList;
    }

    public void setMerchandiseCList(List<TMeMerchandiseCInfoEntity> merchandiseCList) {
        this.merchandiseCList = merchandiseCList;
    }

    public String getMerchandiseCid() {
        return merchandiseCid;
    }

    public void setMerchandiseCid(String merchandiseCid) {
        this.merchandiseCid = merchandiseCid;
    }

    public String getMerchandiseCName() {
        return merchandiseCName;
    }

    public void setMerchandiseCName(String merchandiseCName) {
        this.merchandiseCName = merchandiseCName;
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


