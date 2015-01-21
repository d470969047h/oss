package com.shinowit.actions.OutStockAction;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.entity.TMeOutStockDetailsInfoEntity;
import com.shinowit.framework.dao.BaseDAO;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by daihui on 2014-11-24.
 */
public class OutStockDetailsInfoQuery extends ActionSupport {

    private String outBILLCODE;

    private List<TMeOutStockDetailsInfoEntity> outStockInfoDetailsList;

    @Resource
    private BaseDAO<TMeOutStockDetailsInfoEntity> outStockInfoDetailsDAO;

    public String queryStockDetailsInfo(){
        outStockInfoDetailsList=outStockInfoDetailsDAO.myFindByHql("FROM TMeOutStockDetailsInfoEntity WHERE myMeOutStockInfoByOutBillCode.outBillCode=?",outBILLCODE);
        return SUCCESS;
    }

    public String getOutBILLCODE() {
        return outBILLCODE;
    }

    public void setOutBILLCODE(String outBILLCODE) {
        this.outBILLCODE = outBILLCODE;
    }

    public List<TMeOutStockDetailsInfoEntity> getOutStockInfoDetailsList() {
        return outStockInfoDetailsList;
    }

    public void setOutStockInfoDetailsList(List<TMeOutStockDetailsInfoEntity> outStockInfoDetailsList) {
        this.outStockInfoDetailsList = outStockInfoDetailsList;
    }
}
