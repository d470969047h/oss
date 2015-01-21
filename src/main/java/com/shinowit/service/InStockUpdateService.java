package com.shinowit.service;

import com.shinowit.entity.TMeInStockDetailsInfoEntity;
import com.shinowit.entity.TMeInStockInfoEntity;
import com.shinowit.framework.dao.BaseDAO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by daihui on 2014-11-28.
 */
@Service
public class InStockUpdateService {

    @Resource
    private BaseDAO<TMeInStockInfoEntity> inStockInfoDAO;
    @Resource
    private BaseDAO<TMeInStockDetailsInfoEntity> inStockDetailsInfoDAO;

    @Transactional
    public boolean update(TMeInStockInfoEntity inStockInfo,List<TMeInStockDetailsInfoEntity> inStockDetailsInfoList) {
        boolean result = false;
        try {
           boolean isSuccess= inStockInfoDAO.update(inStockInfo);
            if(true==isSuccess){
                for(TMeInStockDetailsInfoEntity detail:inStockDetailsInfoList){//前台已经有主表主键，不用再获取
                    inStockDetailsInfoDAO.update(detail);
                }
            }
            result = true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }
}
