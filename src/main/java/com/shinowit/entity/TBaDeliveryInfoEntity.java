package com.shinowit.entity;

import javax.persistence.*;

/**
 * Created by daihui on 2014-11-10.
 */
@Entity
@Table(name = "TBa_DeliveryInfo")
public class TBaDeliveryInfoEntity {
    private Byte id;
    private String deliveryId;
    private String deliveryName;
    private String address;
    private String linkName;
    private String linkTel;
    private String qq;
    private String email;
    private Byte sortId;
    private Boolean state;
//    private Collection<TMeOrderInfoEntity> myMeOrderInfosByDeliveryId;

    @Basic
    @Column(name = "ID",insertable = false,updatable = false)
    public Byte getId() {
        return id;
    }

    public void setId(Byte id) {
        this.id = id;
    }

    @Id
    @Column(name = "DeliveryID")
    public String getDeliveryId() {
        return deliveryId;
    }

    public void setDeliveryId(String deliveryId) {
        this.deliveryId = deliveryId;
    }

    @Basic
    @Column(name = "DeliveryName")
    public String getDeliveryName() {
        return deliveryName;
    }

    public void setDeliveryName(String deliveryName) {
        this.deliveryName = deliveryName;
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
    public Byte getSortId() {
        return sortId;
    }

    public void setSortId(Byte sortId) {
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

//    @Override
//    public boolean equals(Object o) {
//        if (this == o) return true;
//        if (o == null || getClass() != o.getClass()) return false;
//
//        TBaDeliveryInfoEntity that = (TBaDeliveryInfoEntity) o;
//
//        if (id != that.id) return false;
//        if (address != null ? !address.equals(that.address) : that.address != null) return false;
//        if (deliveryId != null ? !deliveryId.equals(that.deliveryId) : that.deliveryId != null) return false;
//        if (deliveryName != null ? !deliveryName.equals(that.deliveryName) : that.deliveryName != null) return false;
//        if (email != null ? !email.equals(that.email) : that.email != null) return false;
//        if (linkName != null ? !linkName.equals(that.linkName) : that.linkName != null) return false;
//        if (linkTel != null ? !linkTel.equals(that.linkTel) : that.linkTel != null) return false;
//        if (qq != null ? !qq.equals(that.qq) : that.qq != null) return false;
//        if (sortId != null ? !sortId.equals(that.sortId) : that.sortId != null) return false;
//        if (state != null ? !state.equals(that.state) : that.state != null) return false;
//
//        return true;
//    }
//
//    @Override
//    public int hashCode() {
//        int result = (int) id;
//        result = 31 * result + (deliveryId != null ? deliveryId.hashCode() : 0);
//        result = 31 * result + (deliveryName != null ? deliveryName.hashCode() : 0);
//        result = 31 * result + (address != null ? address.hashCode() : 0);
//        result = 31 * result + (linkName != null ? linkName.hashCode() : 0);
//        result = 31 * result + (linkTel != null ? linkTel.hashCode() : 0);
//        result = 31 * result + (qq != null ? qq.hashCode() : 0);
//        result = 31 * result + (email != null ? email.hashCode() : 0);
//        result = 31 * result + (sortId != null ? sortId.hashCode() : 0);
//        result = 31 * result + (state != null ? state.hashCode() : 0);
//        return result;
//    }
//
//    @OneToMany(mappedBy = "myBaDeliveryInfoByDeliveryId")
//    public Collection<TMeOrderInfoEntity> getMyMeOrderInfosByDeliveryId() {
//        return myMeOrderInfosByDeliveryId;
//    }
//
//    public void setMyMeOrderInfosByDeliveryId(Collection<TMeOrderInfoEntity> myMeOrderInfosByDeliveryId) {
//        this.myMeOrderInfosByDeliveryId = myMeOrderInfosByDeliveryId;
//    }
}
