package com.shinowit.actions.MerchandiseInfoAction;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.entity.TMeMerchandiseInfoEntity;
import com.shinowit.framework.dao.BaseDAO;

import javax.annotation.Resource;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by daihui on 2014-11-12.
 */
public class MerchandiseInfoPagingAction extends ActionSupport {

    private List<TMeMerchandiseInfoEntity> merchandiseInfoList;

    @Resource
    private BaseDAO<TMeMerchandiseInfoEntity> merDAO;

    private String merchandiseInfoC;

    private String merchandiseInfoName;

    private int page;

    private int limit;

    private int rowCount;

    public String queryMerInfo() {

        String sqlpage = " FROM TMeMerchandiseInfoEntity WHERE 1=1 ";
        String sqlcount = " SELECT COUNT(*) FROM TMeMerchandiseInfoEntity WHERE 1=1 ";

        List<Object> params = new ArrayList<Object>();
        if ((null != merchandiseInfoName) && (merchandiseInfoName.trim().length() > 0)) {
            try {
                byte[] paramStr1 = merchandiseInfoName.getBytes("ISO-8859-1");
                merchandiseInfoName = new String(paramStr1, "UTF-8");
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            sqlpage = sqlpage + " and merchandiseName LIKE ? ";
            sqlcount = sqlcount + " and merchandiseName LIKE ?";
            params.add("%" + merchandiseInfoName + "%");
        }
        if ((null != merchandiseInfoC) && (merchandiseInfoC.trim().length() > 0)) {
            try {
                byte[] paramStr2 = merchandiseInfoC.getBytes("ISO-8859-1");
                merchandiseInfoC = new String(paramStr2, "UTF-8");
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            sqlpage = sqlpage + " and myMeMerchandiseCInfoByMerchandiseCid.merchandiseCName LIKE ? ";
            sqlcount = sqlcount + " and myMeMerchandiseCInfoByMerchandiseCid.merchandiseCName LIKE ?";
            params.add("%" + merchandiseInfoC + "%");
        }

        rowCount = merDAO.queryRecordCount(sqlcount, params.toArray());
        if ((rowCount % limit == 0) && (rowCount / limit < page)) {
            page = page - 1;
        }
        merchandiseInfoList = merDAO.queryForPage(sqlpage, page, limit, params.toArray());
        return SUCCESS;
    }

    public String getMerchandiseInfoC() {
        return merchandiseInfoC;
    }

    public void setMerchandiseInfoC(String merchandiseInfoC) {
        this.merchandiseInfoC = merchandiseInfoC;
    }

    public String getMerchandiseInfoName() {
        return merchandiseInfoName;
    }

    public void setMerchandiseInfoName(String merchandiseInfoName) {
        this.merchandiseInfoName = merchandiseInfoName;
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

    public List<TMeMerchandiseInfoEntity> getMerchandiseInfoList() {
        return merchandiseInfoList;
    }

    public void setMerchandiseInfoList(List<TMeMerchandiseInfoEntity> merchandiseInfoList) {
        this.merchandiseInfoList = merchandiseInfoList;
    }
}


