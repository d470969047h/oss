package com.shinowit.actions.SupplierAction;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.entity.TBaSupplierInfoEntity;
import com.shinowit.framework.dao.BaseDAO;

import javax.annotation.Resource;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by daihui on 2014-11-11.
 */
public class SupplierPagingAction extends ActionSupport {

    private List<TBaSupplierInfoEntity> supplierList;

    @Resource
    private BaseDAO<TBaSupplierInfoEntity> supplierDAO;

    private String supplierName;

    private String supplierId;

    private int rowCount;

    private int limit;

    private int page;

    public String querySupplier(){


        String sqlpage = " FROM TBaSupplierInfoEntity WHERE 1=1 ";
        String sqlcount = " SELECT COUNT(*) FROM TBaSupplierInfoEntity WHERE 1=1 ";

        List<Object> params = new ArrayList<Object>();

        if ((null != supplierName) && (supplierName.trim().length() > 0)) {
            try {
                byte[] paramStr1 = supplierName.getBytes("ISO-8859-1");
                supplierName = new String(paramStr1, "UTF-8");
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            sqlpage = sqlpage + " and supplierName LIKE ? ";
            sqlcount = sqlcount + " and supplierName LIKE ?";
            params.add("%" + supplierName + "%");
        }

        if ((null != supplierId) && (supplierId.trim().length() > 0)) {
            try {
                byte[] paramStr2 = supplierId.getBytes("ISO-8859-1");
                supplierId = new String(paramStr2, "UTF-8");
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            sqlpage = sqlpage + " and supplierId LIKE ? ";
            sqlcount = sqlcount + " and supplierId LIKE ?";
            params.add("%" + supplierId + "%");
        }

        rowCount = supplierDAO.queryRecordCount(sqlcount, params.toArray());
        if ((rowCount % limit == 0) && (rowCount / limit < page)) {
            page = page - 1;
        }
        supplierList = supplierDAO.queryForPage(sqlpage, page, limit, params.toArray());
        return SUCCESS;
    }

    public List<TBaSupplierInfoEntity> getSupplierList() {
        return supplierList;
    }

    public void setSupplierList(List<TBaSupplierInfoEntity> supplierList) {
        this.supplierList = supplierList;
    }

    public String getSupplierName() {
        return supplierName;
    }

    public void setSupplierName(String supplierName) {
        this.supplierName = supplierName;
    }

    public String getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(String supplierId) {
        this.supplierId = supplierId;
    }

    public int getRowCount() {
        return rowCount;
    }

    public void setRowCount(int rowCount) {
        this.rowCount = rowCount;
    }

    public int getLimit() {
        return limit;
    }

    public void setLimit(int limit) {
        this.limit = limit;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }
}
