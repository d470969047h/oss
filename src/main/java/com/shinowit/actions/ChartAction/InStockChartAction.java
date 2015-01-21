package com.shinowit.actions.ChartAction;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.entity.TMeInStockInfoEntity;
import com.shinowit.framework.dao.BaseDAO;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by daihui on 2014-12-09.
 */
public class InStockChartAction extends ActionSupport {

    @Resource
    private BaseDAO<TMeInStockInfoEntity> inStockChartDAO;

    private List<TMeInStockInfoEntity> inStockChartList;

    public String instockChart(){
        inStockChartList=inStockChartDAO.listAll(TMeInStockInfoEntity.class);
        return SUCCESS;
    }

    public List<TMeInStockInfoEntity> getInStockChartList() {
        return inStockChartList;
    }

    public void setInStockChartList(List<TMeInStockInfoEntity> inStockChartList) {
        this.inStockChartList = inStockChartList;
    }
}
