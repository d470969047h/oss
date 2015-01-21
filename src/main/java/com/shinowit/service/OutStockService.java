package com.shinowit.service;

import com.shinowit.entity.TMeOutStockDetailsInfoEntity;
import com.shinowit.entity.TMeOutStockInfoEntity;
import com.shinowit.framework.dao.BaseDAO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by daihui on 2014-11-27.
 */
@Service
public class OutStockService {

    @Resource
    private BaseDAO<TMeOutStockInfoEntity> outStockDAO;
    @Resource
    private BaseDAO<TMeOutStockDetailsInfoEntity> outStockdetailDAO;

    @Transactional
    public boolean save(TMeOutStockInfoEntity outStockInfo, List<TMeOutStockDetailsInfoEntity> outStockDetailsInfoList) {
        boolean result = false;
        try {
            String newRecordID = (String) outStockDAO.insert(outStockInfo);
            for (TMeOutStockDetailsInfoEntity details : outStockDetailsInfoList) {
                details.setMyMeOutStockInfoByOutBillCode(outStockInfo);
                outStockdetailDAO.insert(details);
            }
            result = true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }


}
