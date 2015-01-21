package com.shinowit.dao;


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
public class TreeDAO {

    @Resource
    private SessionFactory sessionFactory;


    private void querySubModule(TreeNode parentNode, String operId) {
        Session session = sessionFactory.openSession();
        String sql = "select d.* from TAu_OperInfo a \n" +
                "inner join TAu_RoleInfo b on a.RoleID=b.RoleID \n" +
                "inner join TAu_Authorization c on b.RoleID=c.RoleID\n" +
                "inner join TAu_MenuInfo d on c.MenuID=d.MenuID\n" +
                " where a.OperID=? and d.SortID =?";
        Query query = session.createSQLQuery(sql).addEntity(TAuMenuInfoEntity.class);
        query.setParameter(0, operId);
        query.setParameter(1, parentNode.getMenuInfoEntity().getMenuId());
        List<TAuMenuInfoEntity> moduleList = query.list();
        session.close();

        for (TAuMenuInfoEntity t : moduleList) {
            TreeNode tree = new TreeNode();
            tree.setMenuInfoEntity(t);
            parentNode.addChild(tree);
            querySubModule(tree, operId);
        }
    }


    @Transactional
    public TreeNode queryMenu(String operId) {
        TreeNode result = new TreeNode();
        Session session = sessionFactory.openSession();
        String sql = " select d.* from TAu_OperInfo a \n" +
                "inner join TAu_RoleInfo b on a.RoleID=b.RoleID \n" +
                "inner join TAu_Authorization c on b.RoleID=c.RoleID\n" +
                "inner join TAu_MenuInfo d on c.MenuID=d.MenuID\n" +
                " where a.OperID=? and d.SortID ='0' ";
        Query query = session.createSQLQuery(sql).addEntity(TAuMenuInfoEntity.class);
        query.setParameter(0, operId);

        List<TAuMenuInfoEntity> powerList = query.list();
        session.close();

        for (TAuMenuInfoEntity t : powerList) {
            TreeNode node = new TreeNode();
            node.setMenuInfoEntity(t);
            result.addChild(node);
            querySubModule(node, operId);
        }
        return result;
    }

}
