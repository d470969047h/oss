package com.shinowit.actions.ChartAction;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.entity.VInStockChartEntity;
import com.shinowit.framework.dao.BaseDAO;

import javax.annotation.Resource;
import java.sql.Timestamp;
import java.util.List;

/**
 * Created by daihui on 2014-12-09.
 */
public class InStockDetailChartAction extends ActionSupport {

    @Resource
    private BaseDAO<VInStockChartEntity> inStockDetaileChartDAO;

    private List<VInStockChartEntity> inStockDetaileChartList;

    private Timestamp intime;

    public String instockDetailesChart(){
        inStockDetaileChartList=inStockDetaileChartDAO.myFindByHql("FROM VInStockChartEntity WHERE inTime=?",intime);
        return SUCCESS;
    }

    public List<VInStockChartEntity> getInStockDetaileChartList() {
        return inStockDetaileChartList;
    }

    public void setInStockDetaileChartList(List<VInStockChartEntity> inStockDetaileChartList) {
        this.inStockDetaileChartList = inStockDetaileChartList;
    }

    public Timestamp getIntime() {
        return intime;
    }

    public void setIntime(Timestamp intime) {
        this.intime = intime;
    }
}
