package com.shinowit.service;

import com.shinowit.entity.TMeOutStockDetailsInfoEntity;
import com.shinowit.entity.TMeOutStockInfoEntity;
import com.shinowit.framework.dao.BaseDAO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by daihui on 2014-11-29.
 */
@Service
public class OutStockUpdateService {

    @Resource
    private BaseDAO<TMeOutStockInfoEntity> outStockInfoDAO;
    @Resource
    private BaseDAO<TMeOutStockDetailsInfoEntity> outStockDetailsInfoDAO;

    @Transactional
    public boolean outStockInfoUpdate(TMeOutStockInfoEntity outStockInfo,List<TMeOutStockDetailsInfoEntity> outStockDetailsInfoList){
        boolean result=false;
        try {
            boolean isSuccess=outStockInfoDAO.update(outStockInfo);
            if(true==isSuccess){
                for(TMeOutStockDetailsInfoEntity detailsInfo:outStockDetailsInfoList){
                    outStockDetailsInfoDAO.update(detailsInfo);
                }
            }
            result=true;
        }catch (Exception e){
            e.printStackTrace();
        }
        return result;
    }
}
