package com.shinowit.actions.inStockAction;

/**
 * Created by daihui on 2014-11-20.
 */

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.entity.TMeInStockDetailsInfoEntity;
import com.shinowit.framework.dao.BaseDAO;

import javax.annotation.Resource;
import java.util.List;

public class InStockDetailsPagingAction extends ActionSupport {

    private List<TMeInStockDetailsInfoEntity> inStockDetailsList;

    @Resource
    private BaseDAO<TMeInStockDetailsInfoEntity> inStockDetailsDAO;

    private String BillCODE;

    public String queryInStockDetailsInfo() {
        inStockDetailsList=inStockDetailsDAO.myFindByHql("FROM TMeInStockDetailsInfoEntity WHERE myMeInStockInfoByBillCode.billCode=?",BillCODE);
        return SUCCESS;

    }

    public List<TMeInStockDetailsInfoEntity> getInStockDetailsList() {
        return inStockDetailsList;
    }

    public void setInStockDetailsList(List<TMeInStockDetailsInfoEntity> inStockDetailsList) {
        this.inStockDetailsList = inStockDetailsList;
    }

    public String getBillCODE() {
        return BillCODE;
    }

    public void setBillCODE(String billCODE) {
        BillCODE = billCODE;
    }
}


