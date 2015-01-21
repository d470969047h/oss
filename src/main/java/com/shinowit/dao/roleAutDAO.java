package com.shinowit.dao;
import com.shinowit.entity.RoleTreeNode;
import com.shinowit.entity.TAuMenuInfoEntity;
import com.shinowit.entity.TreeNode;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;


/**
 * Created by SC on 2014/11/30.
 */
@Service
public class roleAutDAO {

    @Resource
    private SessionFactory sessionFactory;


    private void querySubModule(String roleid,TreeNode parentNode) {
        Session session = sessionFactory.openSession();
        String sql = "select distinct d.* from  TAu_RoleInfo b \n" +
                "inner join TAu_Authorization c on b.RoleID=c.RoleID\n" +
                "inner join TAu_MenuInfo d on c.MenuID=d.MenuID\n" +
                "where b.RoleID=? and d.SortID =? ";
        Query query = session.createSQLQuery(sql).addEntity(TAuMenuInfoEntity.class);
        query.setParameter(0,roleid);
        query.setParameter(1, parentNode.getMenuInfoEntity().getMenuId());
        List<TAuMenuInfoEntity> moduleList = query.list();
        session.close();

        for (TAuMenuInfoEntity t : moduleList) {
            TreeNode tree = new TreeNode();
            tree.setMenuInfoEntity(t);
            parentNode.addChild(tree);
            querySubModule(roleid,tree);
        }
    }


    @Transactional
    public TreeNode queryMenu(String roelid) {
        TreeNode result = new TreeNode();
        Session session = sessionFactory.openSession();
        String sql = " select distinct d.* from TAu_RoleInfo b \n" +
                "inner join TAu_Authorization c on b.RoleID=c.RoleID\n" +
                "inner join TAu_MenuInfo d on c.MenuID=d.MenuID\n" +
                " where d.SortID ='0' and b.RoleID=? ";
        Query query = session.createSQLQuery(sql).addEntity(TAuMenuInfoEntity.class);
          query.setParameter(0,roelid);
        List<TAuMenuInfoEntity> powerList = query.list();
        session.close();

        for (TAuMenuInfoEntity t : powerList) {
            TreeNode node = new TreeNode();
            node.setMenuInfoEntity(t);
            result.addChild(node);
            querySubModule(roelid,node);
        }
        return result;
    }

}
