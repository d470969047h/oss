package com.shinowit.entity;

import org.apache.struts2.json.annotations.JSON;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Collection;

/**
 * Created by daihui on 2014-11-10.
 */
@Entity
@Table(name = "TMe_InStockInfo")
public class TMeInStockInfoEntity {
    private Integer id;
    private String billCode;
    private Byte inType;
    private Timestamp inTime;
    private String handler;
    private Float totalMoney;
    private String remark;
    private Collection<TMeInStockDetailsInfoEntity> myMeInStockDetailsInfosByBillCode;
    private TAuOperInfoEntity myAuOperInfoByOperId;
    private TBaSupplierInfoEntity myBaSupplierInfoBySupplierId;

    @Basic
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID",insertable = false,updatable = false)
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Id
    @Column(name = "BillCode")
    @GenericGenerator(name = "system-uuid", strategy = "uuid") //有编译警告不用管
    @GeneratedValue(generator = "system-uuid")
    public String getBillCode() {
        return billCode;
    }

    public void setBillCode(String billCode) {
        this.billCode = billCode;
    }

    @Basic
    @Column(name = "InType")
    public Byte getInType() {
        return inType;
    }

    public void setInType(Byte inType) {
        this.inType = inType;
    }

    @Basic
    @Column(name = "InTime")
    @JSON(format = "yyyy-MM-dd HH:mm:ss")
    public Timestamp getInTime() {
        return inTime;
    }

    @JSON(format = "yyyy-MM-dd HH:mm:ss")
    public void setInTime(Timestamp inTime) {
        this.inTime = inTime;
    }

    @Basic
    @Column(name = "Handler")
    public String getHandler() {
        return handler;
    }

    public void setHandler(String handler) {
        this.handler = handler;
    }

    @Basic
    @Column(name = "TotalMoney")
    public Float getTotalMoney() {
        return totalMoney;
    }

    public void setTotalMoney(Float totalMoney) {
        this.totalMoney = totalMoney;
    }

    @Basic
    @Column(name = "Remark")
    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        TMeInStockInfoEntity that = (TMeInStockInfoEntity) o;

        if (id != that.id) return false;
        if (billCode != null ? !billCode.equals(that.billCode) : that.billCode != null) return false;
        if (handler != null ? !handler.equals(that.handler) : that.handler != null) return false;
        if (inTime != null ? !inTime.equals(that.inTime) : that.inTime != null) return false;
        if (inType != null ? !inType.equals(that.inType) : that.inType != null) return false;
        if (remark != null ? !remark.equals(that.remark) : that.remark != null) return false;
        if (totalMoney != null ? !totalMoney.equals(that.totalMoney) : that.totalMoney != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (billCode != null ? billCode.hashCode() : 0);
        result = 31 * result + (inType != null ? inType.hashCode() : 0);
        result = 31 * result + (inTime != null ? inTime.hashCode() : 0);
        result = 31 * result + (handler != null ? handler.hashCode() : 0);
        result = 31 * result + (totalMoney != null ? totalMoney.hashCode() : 0);
        result = 31 * result + (remark != null ? remark.hashCode() : 0);
        return result;
    }

    @OneToMany(mappedBy = "myMeInStockInfoByBillCode")
    public Collection<TMeInStockDetailsInfoEntity> getMyMeInStockDetailsInfosByBillCode() {
        return myMeInStockDetailsInfosByBillCode;
    }

    public void setMyMeInStockDetailsInfosByBillCode(Collection<TMeInStockDetailsInfoEntity> myMeInStockDetailsInfosByBillCode) {
        this.myMeInStockDetailsInfosByBillCode = myMeInStockDetailsInfosByBillCode;
    }

    @ManyToOne
    @JoinColumn(name = "OperID", referencedColumnName = "OperID")
    public TAuOperInfoEntity getMyAuOperInfoByOperId() {
        return myAuOperInfoByOperId;
    }

    public void setMyAuOperInfoByOperId(TAuOperInfoEntity myAuOperInfoByOperId) {
        this.myAuOperInfoByOperId = myAuOperInfoByOperId;
    }

    @ManyToOne
    @JoinColumn(name = "SupplierID", referencedColumnName = "SupplierID")
    public TBaSupplierInfoEntity getMyBaSupplierInfoBySupplierId() {
        return myBaSupplierInfoBySupplierId;
    }

    public void setMyBaSupplierInfoBySupplierId(TBaSupplierInfoEntity myBaSupplierInfoBySupplierId) {
        this.myBaSupplierInfoBySupplierId = myBaSupplierInfoBySupplierId;
    }
}
