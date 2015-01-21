package com.shinowit.actions.ChartAction;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.entity.TMeOutStockDetailsInfoEntity;
import com.shinowit.framework.dao.BaseDAO;

import javax.annotation.Resource;
import java.sql.Timestamp;
import java.util.List;

/**
 * Created by daihui on 2014-12-09.
 */
public class OutStockDetailChartAction extends ActionSupport {

    @Resource
    private BaseDAO<TMeOutStockDetailsInfoEntity> outStockDetailsInfoEntityeDAO;

    private List<TMeOutStockDetailsInfoEntity> outStockDetaileChartList;

    private Timestamp outtime;

    public String outstockDetailesChart(){
        outStockDetaileChartList=outStockDetailsInfoEntityeDAO.myFindByHql("FROM TMeOutStockDetailsInfoEntity WHERE myMeOutStockInfoByOutBillCode.outTime=?",outtime);
        return SUCCESS;
    }

    public List<TMeOutStockDetailsInfoEntity> getOutStockDetaileChartList() {
        return outStockDetaileChartList;
    }

    public void setOutStockDetaileChartList(List<TMeOutStockDetailsInfoEntity> outStockDetaileChartList) {
        this.outStockDetaileChartList = outStockDetaileChartList;
    }

    public Timestamp getOuttime() {
        return outtime;
    }

    public void setOuttime(Timestamp outtime) {
        this.outtime = outtime;
    }
}
