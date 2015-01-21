package com.shinowit.actions.ChartAction;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.entity.TMeOutStockInfoEntity;
import com.shinowit.framework.dao.BaseDAO;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by daihui on 2014-12-09.
 * 出库统计图
 */
public class OutStockChartAction extends ActionSupport {

    @Resource
    private BaseDAO<TMeOutStockInfoEntity> outStockChartDAO;

    private List<TMeOutStockInfoEntity> outStockChartList;

    public String outstockChart() {
        outStockChartList = outStockChartDAO.listAll(TMeOutStockInfoEntity.class);
        return SUCCESS;
    }

    public List<TMeOutStockInfoEntity> getOutStockChartList() {
        return outStockChartList;
    }

    public void setOutStockChartList(List<TMeOutStockInfoEntity> outStockChartList) {
        this.outStockChartList = outStockChartList;
    }
}
