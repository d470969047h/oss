package com.shinowit.actions.UnitInfoAction;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.entity.TMeUnitInfoEntity;
import com.shinowit.framework.dao.BaseDAO;

import javax.annotation.Resource;

/**
 * Created by daihui on 2014-11-12.
 */
public class UnitInfoDeleteAction extends ActionSupport {

    @Resource
    private BaseDAO<TMeUnitInfoEntity> uDAO;

    private String message;

    private boolean success;

    private TMeUnitInfoEntity unitInfo;

    private String unit;

    public String deleteUnitInfo() {
        boolean result = uDAO.delete(unitInfo);
        if (true == result) {
            setSuccess(true);
            setMessage("删除单条单位信息成功！");
        } else {
            setSuccess(false);
            setMessage("删除单条单位信息失败！");
        }
        return SUCCESS;
    }

    public String deleteManyUnitInfo() {
        String Arrays[] = unit.split(",");
        for (String str : Arrays) {
            int i = uDAO.extcuteHQL("DELETE FROM TMeUnitInfoEntity WHERE unitId=?", Byte.valueOf(str));
            if (i == 1) {
                setSuccess(true);
                setMessage("删除单位信息成功！");
            } else if (i < 1) {
                setSuccess(false);
                setMessage("删除单位信息失败！");
            }
        }
        return SUCCESS;
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

    public TMeUnitInfoEntity getUnitInfo() {
        return unitInfo;
    }

    public void setUnitInfo(TMeUnitInfoEntity unitInfo) {
        this.unitInfo = unitInfo;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }
}
