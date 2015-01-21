package com.shinowit.actions.ChartAction;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.entity.VStockInfoChartEntity;
import com.shinowit.framework.dao.BaseDAO;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by daihui on 2014-12-09.
 */
public class StockInfoChartAction extends ActionSupport {

    @Resource
    private BaseDAO<VStockInfoChartEntity> StockInfoChartDAO;

    private List<VStockInfoChartEntity> StockInfoChartList;

    public String stockInfoChart(){
        StockInfoChartList=StockInfoChartDAO.listAll(VStockInfoChartEntity.class);
        return SUCCESS;
    }

    public List<VStockInfoChartEntity> getStockInfoChartList() {
        return StockInfoChartList;
    }

    public void setStockInfoChartList(List<VStockInfoChartEntity> stockInfoChartList) {
        StockInfoChartList = stockInfoChartList;
    }
}
