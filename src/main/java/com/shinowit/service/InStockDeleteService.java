package com.shinowit.service;

import com.shinowit.entity.TMeInStockDetailsInfoEntity;
import com.shinowit.entity.TMeInStockInfoEntity;
import com.shinowit.framework.dao.BaseDAO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

/**
 * Created by daihui on 2014-11-17.
 */
@Service
public class InStockDeleteService {

    @Resource
    private BaseDAO<TMeInStockInfoEntity> inStockDAO;

    @Resource
    private BaseDAO<TMeInStockDetailsInfoEntity> inStockDetailsDAO;

    @Transactional
    public boolean delete(String billcode) {
        boolean result = false;
        try {
            int count=inStockDetailsDAO.extcuteHQL("DELETE FROM TMeInStockDetailsInfoEntity WHERE myMeInStockInfoByBillCode.billCode=?",billcode);
            if(count>0){
                inStockDAO.extcuteHQL("DELETE FROM TMeInStockInfoEntity WHERE billCode=?",billcode);
            }
            result = true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }
}
