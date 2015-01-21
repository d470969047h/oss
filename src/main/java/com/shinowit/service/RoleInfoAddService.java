package com.shinowit.service;

import com.shinowit.entity.TAuAuthorizationEntity;
import com.shinowit.entity.TAuMenuInfoEntity;
import com.shinowit.entity.TAuRoleInfoEntity;
import com.shinowit.framework.dao.BaseDAO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by daihui on 2014-12-03.
 */
@Service
public class RoleInfoAddService {

    @Resource
    private BaseDAO<TAuRoleInfoEntity> roleInfoDAO;

    @Resource
    private BaseDAO<TAuAuthorizationEntity> auAuthorizationDAO;

    @Transactional
    public boolean addRoleInfoService(TAuRoleInfoEntity roleInfo, List<TAuMenuInfoEntity> menuInfoList) {
        boolean result = false;
        Object obj = roleInfoDAO.insert(roleInfo);
        if (null != obj) {
            for (TAuMenuInfoEntity details : menuInfoList) {
                TAuAuthorizationEntity authorization = new TAuAuthorizationEntity();
                authorization.setMyAuRoleInfoByRoleId(roleInfo);
                authorization.setMyAuMenuInfoByMenuId(details);
                authorization.setIsEnabled(true);
                auAuthorizationDAO.insert(authorization);
                result = true;
            }
        }
        return result;
    }
}
