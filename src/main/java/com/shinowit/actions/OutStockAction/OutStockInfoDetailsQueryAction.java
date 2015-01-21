package com.shinowit.actions.OutStockAction;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.entity.TMeStockInfoEntity;
import com.shinowit.framework.dao.BaseDAO;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by daihui on 2014-11-29.
 */
public class OutStockInfoDetailsQueryAction extends ActionSupport {

    private String merchandiseID;

    @Resource
    private BaseDAO<TMeStockInfoEntity> stockInfoDAO;

    private List<TMeStockInfoEntity> stockInfoList;

    public String queryStockInfo() {
        stockInfoList=stockInfoDAO.myFindByHql("FROM TMeStockInfoEntity WHERE myMeMerchandiseInfoByMerchandiseId.merchandiseId=?",merchandiseID);
        return SUCCESS;
    }

    public String getMerchandiseID() {
        return merchandiseID;
    }

    public void setMerchandiseID(String merchandiseID) {
        this.merchandiseID = merchandiseID;
    }

    public List<TMeStockInfoEntity> getStockInfoList() {
        return stockInfoList;
    }

    public void setStockInfoList(List<TMeStockInfoEntity> stockInfoList) {
        this.stockInfoList = stockInfoList;
    }
}
