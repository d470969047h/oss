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
 * Created by daihui on 2014-12-04.
 */
@Service
public class RoleInfoUpdateService {

    @Resource
    private BaseDAO<TAuRoleInfoEntity> roleInfoDAO;

    @Resource
    private BaseDAO<TAuAuthorizationEntity> auAuthorizationDAO;

//    @Resource
//    private BaseDAO<TAuMenuInfoEntity> menuInfoDAO;

    @Transactional
    public boolean updateRoleInfoService(TAuRoleInfoEntity roleInfo, List<TAuMenuInfoEntity> menuInfoList) {
        boolean result = false;
        Object obj1 = roleInfoDAO.update(roleInfo);
        int i=auAuthorizationDAO.extcuteHQL("DELETE FROM TAuAuthorizationEntity WHERE myAuRoleInfoByRoleId.roleId=?",roleInfo.getRoleId());
        if (null != obj1&&i>0) {
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
