package com.shinowit.service;

import com.shinowit.entity.TAuAuthorizationEntity;
import com.shinowit.entity.TAuRoleInfoEntity;
import com.shinowit.framework.dao.BaseDAO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

/**
 * Created by daihui on 2014-12-04.
 */
@Service
public class RoleInfoDeleteService {

    @Resource
    private BaseDAO<TAuRoleInfoEntity> roleInfoDAO;

    @Resource
    private BaseDAO<TAuAuthorizationEntity> auAuthorizationDAO;

    @Transactional
    public boolean deleteRoleInfoService(TAuRoleInfoEntity roleInfo) {
        boolean result = false;
        int i = auAuthorizationDAO.extcuteHQL("DELETE FROM TAuAuthorizationEntity WHERE myAuRoleInfoByRoleId.roleId=?", roleInfo.getRoleId());
        if (i > 0) {
            Object obj1 = roleInfoDAO.delete(roleInfo);
            if (null != obj1) {
                result = true;
            }
        }
        return result;
    }
}
