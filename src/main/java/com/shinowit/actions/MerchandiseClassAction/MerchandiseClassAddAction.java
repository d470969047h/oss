package com.shinowit.actions.MerchandiseClassAction;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.entity.TMeMerchandiseCInfoEntity;
import com.shinowit.framework.dao.BaseDAO;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by daihui on 2014-11-12.
 */
public class MerchandiseClassAddAction extends ActionSupport {

    private TMeMerchandiseCInfoEntity merCInfo;

    @Resource
    private BaseDAO<TMeMerchandiseCInfoEntity> merCDAO;

    private String message;

    private boolean success;



    public String merCAdd(){
        List<TMeMerchandiseCInfoEntity> obj1=merCDAO.myFindByHql("FROM TMeMerchandiseCInfoEntity WHERE merchandiseCid=? OR merchandiseCName=?",merCInfo.getMerchandiseCid(),merCInfo.getMerchandiseCName());
        if(obj1.size()==0){
            Object obj=merCDAO.insert(merCInfo);
            if(null!=obj){
                setSuccess(true);
                setMessage("商品类别信息添加成功！");
            }else{
                setSuccess(false);
                setMessage("商品类别信息添加失败！");
            }
        }else{
            setSuccess(false);
            setMessage("商品类别信息添加失败！该商品类别已存在！");
        }
        return SUCCESS;
    }
    public TMeMerchandiseCInfoEntity getMerCInfo() {
        return merCInfo;
    }

    public void setMerCInfo(TMeMerchandiseCInfoEntity merCInfo) {
        this.merCInfo = merCInfo;
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
