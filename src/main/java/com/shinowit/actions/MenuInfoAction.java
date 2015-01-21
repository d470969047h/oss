package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.entity.VMenuInfo1Entity;
import com.shinowit.framework.dao.BaseDAO;
import org.apache.struts2.ServletActionContext;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by daihui on 2014-11-07.
 */
public class MenuInfoAction extends ActionSupport {

    private List<VMenuInfo1Entity> titleList;

    @Resource
    private BaseDAO<VMenuInfo1Entity> vMenuInfo1DAO;

    public String queryMenuInfo() {
        String roleId= (String)ServletActionContext.getContext().getSession().get("operRoleID");
        titleList=vMenuInfo1DAO.myFindByHql("FROM VMenuInfo1Entity WHERE roleId=?",roleId);
        return SUCCESS;
    }

    public List<VMenuInfo1Entity> getTitleList() {
        return titleList;
    }

    public void setTitleList(List<VMenuInfo1Entity> titleList) {
        this.titleList = titleList;
    }
}
