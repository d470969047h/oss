package com.shinowit.framework.dao;

import org.apache.log4j.Logger;
import org.hibernate.*;
import org.hibernate.criterion.Example;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.io.Serializable;
import java.util.List;

@SuppressWarnings("unchecked")

@Repository
public class BaseDAO<T> {

    protected final Logger logger = Logger.getLogger(getClass());

    @Resource
    protected SessionFactory sessionFactory;

    /**
     * 插入实体类的泛型方法
     *
     * @param pojo 实体类信息
     * @return
     */
    @Transactional
    public Serializable insert(T pojo) throws HibernateException {
        Session session = null;
        Serializable result = null;
        try {
            session = sessionFactory.getCurrentSession();
            result = (Serializable) session.save(pojo);
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            throw new HibernateException(e);
        }
        return result;
    }


    /**
     * 修改实体类
     *
     * @param pojo
     * @return
     */
    @Transactional
    public boolean update(T pojo) throws HibernateException {
        Session session = null;
        boolean result = false;
        try {
            session = sessionFactory.getCurrentSession();
            session.update(pojo);
            result = true;
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            throw new HibernateException(e);
        }
        return result;
    }


    @Transactional
    public boolean delete(T pojo) throws HibernateException {
        Session session = null;
        boolean result = false;
        try {
            session = sessionFactory.getCurrentSession();
            session.delete(pojo);
            result = true;
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            throw new HibernateException(e);
        }
        return result;
    }




    public T findById(Class<?> c, Serializable id) {
        Session session = null;
        T result = null;
        try {
            session = sessionFactory.getCurrentSession();
            result = (T) session.get(c, id);
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
        }
        return result;
    }

    public List<T> queryForPage(String hql, int pageIndex, int pageSize) {
        List<T> result = null;
        Session session = null;
        try {
            session = sessionFactory.getCurrentSession();
            Query q = session.createQuery(hql);
            q.setCacheable(true);
            q.setFirstResult((pageIndex - 1) * pageSize);
            q.setMaxResults(pageSize);
            result = q.list();
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
        }
        return result;
    }


    public List<T> queryForPage(String hql, int pageIndex, int pageSize, final Object... objects) {
        List<T> result = null;
        Session session = null;
        try {
            session = sessionFactory.getCurrentSession();
            Query q = session.createQuery(hql);
            q.setCacheable(true);
            for (int i = 0; i < objects.length; i++) {
                q.setParameter(i, objects[i]);
            }
            q.setFirstResult((pageIndex - 1) * pageSize);
            q.setMaxResults(pageSize);
            result = q.list();
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
        }
        return result;
    }

    public int queryRecordCount(String hql, final Object... objects) {
        int result = 0;
        Session session = null;
        try {
            session = sessionFactory.getCurrentSession();
            Query q = session.createQuery(hql);

            for (int i = 0; i < objects.length; i++) {
                q.setParameter(i, objects[i]);
            }

            result = Integer.valueOf(q.uniqueResult().toString());
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
        }

        return result;
    }


    public List<T> findByExample(Class<?> c, T t) {
        List<T> result = null;
        Session session = null;
        try {
            session = sessionFactory.getCurrentSession();
            Example example = Example.create(t);
            Criteria criteria = session.createCriteria(c);
            criteria.add(example);
            result = criteria.list();
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
        }

        return result;
    }


    public List<T> listAll(Class<?> c) {
        List<T> result = null;
        Session session = null;
        try {
            session = sessionFactory.getCurrentSession();
            Criteria criteria = session.createCriteria(c);

            result = criteria.list();
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
        }
        return result;
    }


    public List<Object[]> findBySql(String sql, final Object... objects) {
        List<Object[]> result = null;
        Session session = null;
        try {
            session = sessionFactory.getCurrentSession();
            Query query = session.createSQLQuery(sql);
            for (int i = 0; i < objects.length; i++) {
                query.setParameter(i, objects[i]);
            }
            result = query.list();
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
        }
        return result;
    }


    public List<Object[]> findByHql(String hql, final Object... objects) {
        List<Object[]> list = null;
        Session session = null;
        try {
            session = sessionFactory.getCurrentSession();
            Query query = session.createQuery(hql);
            for (int i = 0; i < objects.length; i++) {
                query.setParameter(i, objects[i]);
            }
            list = query.list();
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
        }

        return list;
    }

    public List<T> myFindByHql(String hql, final Object... objects) {
        List<T> list = null;
        Session session = null;
        try {
            session = sessionFactory.getCurrentSession();
            Query query = session.createQuery(hql);
            for (int i = 0; i < objects.length; i++) {
                query.setParameter(i, objects[i]);
            }
            list = query.list();
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
        }
        return list;
    }


    @Transactional
    public int extcuteHQL(String hql,Object ...params) throws HibernateException {
        Session session = null;
        int result = 0;
        try {
            session = sessionFactory.getCurrentSession();
           Query query=session.createQuery(hql);
            for(int i=0;i<params.length;i++){
                query.setParameter(i,params[i]);
            }
            result=query.executeUpdate();
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            throw new HibernateException(e);
        }
        return result;
    }
}


