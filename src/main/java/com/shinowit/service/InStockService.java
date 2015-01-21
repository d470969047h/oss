package com.shinowit.service;

import com.shinowit.entity.TMeInStockDetailsInfoEntity;
import com.shinowit.entity.TMeInStockInfoEntity;
import com.shinowit.framework.dao.BaseDAO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by daihui on 2014-11-17.
 */
@Service
public class InStockService {

    @Resource
    private BaseDAO<TMeInStockInfoEntity> inStockDAO;

    @Resource
    private BaseDAO<TMeInStockDetailsInfoEntity> inStockDetailsDAO;

    @Transactional
    public boolean save(TMeInStockInfoEntity inStockInfo, List<TMeInStockDetailsInfoEntity> inStockDetailsInfoList) {

        boolean result = false;
        try {
            String newRecordID = (String) inStockDAO.insert(inStockInfo);
            for (TMeInStockDetailsInfoEntity inStockDetails : inStockDetailsInfoList) {

                inStockDetails.setMyMeInStockInfoByBillCode(inStockInfo);
              inStockDetailsDAO.insert(inStockDetails);

            }
            result = true;
        } catch (Exception e) {
          e.printStackTrace();

        }
        return result;
    }
}
