package com.shinowit.entity;

import javax.persistence.*;
import java.util.Collection;

/**
 * Created by daihui on 2014-11-10.
 * 供应商信息
 */
@Entity
@Table(name = "TBa_SupplierInfo")
public class TBaSupplierInfoEntity {
    private Integer id;
    private String supplierId;
    private String supplierName;
    private String supplierAb;
    private String address;
    private String linkName;
    private String linkTel;
    private String qq;
    private String email;
    private Integer sortId;
    private Boolean state;
    private Collection<TMeInStockInfoEntity> myMeInStockInfosBySupplierId;

    @Basic
    @Column(name = "ID",insertable = false,updatable = false)
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Id
    @Column(name = "SupplierID")
    public String getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(String supplierId) {
        this.supplierId = supplierId;
    }

    @Basic
    @Column(name = "SupplierName")
    public String getSupplierName() {
        return supplierName;
    }

    public void setSupplierName(String supplierName) {
        this.supplierName = supplierName;
    }

    @Basic
    @Column(name = "SupplierAB")
    public String getSupplierAb() {
        return supplierAb;
    }

    public void setSupplierAb(String supplierAb) {
        this.supplierAb = supplierAb;
    }

    @Basic
    @Column(name = "Address")
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Basic
    @Column(name = "LinkName")
    public String getLinkName() {
        return linkName;
    }

    public void setLinkName(String linkName) {
        this.linkName = linkName;
    }

    @Basic
    @Column(name = "LinkTel")
    public String getLinkTel() {
        return linkTel;
    }

    public void setLinkTel(String linkTel) {
        this.linkTel = linkTel;
    }

    @Basic
    @Column(name = "QQ")
    public String getQq() {
        return qq;
    }

    public void setQq(String qq) {
        this.qq = qq;
    }

    @Basic
    @Column(name = "Email")
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Basic
    @Column(name = "SortID")
    public Integer getSortId() {
        return sortId;
    }

    public void setSortId(Integer sortId) {
        this.sortId = sortId;
    }

    @Basic
    @Column(name = "State")
    public Boolean getState() {
        return state;
    }

    public void setState(Boolean state) {
        this.state = state;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        TBaSupplierInfoEntity that = (TBaSupplierInfoEntity) o;

        if (id != that.id) return false;
        if (address != null ? !address.equals(that.address) : that.address != null) return false;
        if (email != null ? !email.equals(that.email) : that.email != null) return false;
        if (linkName != null ? !linkName.equals(that.linkName) : that.linkName != null) return false;
        if (linkTel != null ? !linkTel.equals(that.linkTel) : that.linkTel != null) return false;
        if (qq != null ? !qq.equals(that.qq) : that.qq != null) return false;
        if (sortId != null ? !sortId.equals(that.sortId) : that.sortId != null) return false;
        if (state != null ? !state.equals(that.state) : that.state != null) return false;
        if (supplierAb != null ? !supplierAb.equals(that.supplierAb) : that.supplierAb != null) return false;
        if (supplierId != null ? !supplierId.equals(that.supplierId) : that.supplierId != null) return false;
        if (supplierName != null ? !supplierName.equals(that.supplierName) : that.supplierName != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (supplierId != null ? supplierId.hashCode() : 0);
        result = 31 * result + (supplierName != null ? supplierName.hashCode() : 0);
        result = 31 * result + (supplierAb != null ? supplierAb.hashCode() : 0);
        result = 31 * result + (address != null ? address.hashCode() : 0);
        result = 31 * result + (linkName != null ? linkName.hashCode() : 0);
        result = 31 * result + (linkTel != null ? linkTel.hashCode() : 0);
        result = 31 * result + (qq != null ? qq.hashCode() : 0);
        result = 31 * result + (email != null ? email.hashCode() : 0);
        result = 31 * result + (sortId != null ? sortId.hashCode() : 0);
        result = 31 * result + (state != null ? state.hashCode() : 0);
        return result;
    }

    @OneToMany(mappedBy = "myBaSupplierInfoBySupplierId")
    public Collection<TMeInStockInfoEntity> getMyMeInStockInfosBySupplierId() {
        return myMeInStockInfosBySupplierId;
    }

    public void setMyMeInStockInfosBySupplierId(Collection<TMeInStockInfoEntity> myMeInStockInfosBySupplierId) {
        this.myMeInStockInfosBySupplierId = myMeInStockInfosBySupplierId;
    }
}
