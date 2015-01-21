package com.shinowit.actions.MerchandiseInfoAction;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.entity.TMeMerchandiseInfoEntity;
import com.shinowit.framework.dao.BaseDAO;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by daihui on 2014-11-12.
 */
public class MerchandiseInfoAddAction extends ActionSupport {

    private TMeMerchandiseInfoEntity merInfo;

    @Resource
    private BaseDAO<TMeMerchandiseInfoEntity> merDAO;

    private String message;

    private boolean success;


    public String merAdd() {
        List<TMeMerchandiseInfoEntity> obj1 = merDAO.myFindByHql("FROM TMeMerchandiseInfoEntity WHERE merchandiseId=?", merInfo.getMerchandiseId());
        if (obj1.size() == 0) {
            Object obj = merDAO.insert(merInfo);
            if (null != obj) {
                setSuccess(true);
                setMessage("商品信息添加成功！");
            } else {
                setSuccess(false);
                setMessage("商品信息添加失败！");
            }
        } else {
            setSuccess(false);
            setMessage("商品信息添加失败！该商品已存在！");
        }
        return SUCCESS;
    }

    public TMeMerchandiseInfoEntity getMerInfo() {
        return merInfo;
    }

    public void setMerInfo(TMeMerchandiseInfoEntity merInfo) {
        this.merInfo = merInfo;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }
}
