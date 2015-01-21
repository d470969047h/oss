package com.shinowit.service;

import com.shinowit.entity.TMeOutStockDetailsInfoEntity;
import com.shinowit.entity.TMeOutStockInfoEntity;
import com.shinowit.framework.dao.BaseDAO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

/**
 * Created by daihui on 2014-11-29.
 */
@Service
public class OutStockDeleteService {

    @Resource
    private BaseDAO<TMeOutStockInfoEntity> outStockInfoDAO;

    @Resource
    private BaseDAO<TMeOutStockDetailsInfoEntity> outStockDetailsInfoDAO;

    @Transactional
    public boolean outStockInfoDelete(String outBillCode){
        boolean result=false;
        try {
            int freCount=outStockDetailsInfoDAO.extcuteHQL("DELETE FROM TMeOutStockDetailsInfoEntity WHERE myMeOutStockInfoByOutBillCode.outBillCode=?",outBillCode);
            if(freCount>0){
                outStockInfoDAO.extcuteHQL("DELETE FROM TMeOutStockInfoEntity WHERE outBillCode=?",outBillCode);
            }
            result=true;
        }catch (Exception e){
            e.printStackTrace();
        }
        return result;
    }
}
