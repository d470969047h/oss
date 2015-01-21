package com.shinowit.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

/**
 * Created by daihui on 2014-11-10.
 */
@Entity
@Table(name = "TMe_MerchandiseInfo")
public class TMeMerchandiseInfoEntity {
    private Integer id;
    private String merchandiseId;
    private String merchandiseName;
    private String merchandiseAb;
    private Float price;
    private Boolean saleStatus;
    private String spec;
    private String describe;
    private String picPath;
    private Integer clickCount;
    private String remark;
//    private Collection<TMeInStockDetailsInfoEntity> myMeInStockDetailsInfosByMerchandiseId;
    private TMeMerchandiseCInfoEntity myMeMerchandiseCInfoByMerchandiseCid;
    private TMeProStatusInfoEntity myMeProStatusInfoByProStatusId;
    private TMeUnitInfoEntity myMeUnitInfoByUnitId;
//    private Collection<TMeOrderDetailsInfoEntity> myMeOrderDetailsInfosByMerchandiseId;
//    private Collection<TMeOutStockDetailsInfoEntity> myMeOutStockDetailsInfosByMerchandiseId;
//    private Collection<TMeStockInfoEntity> myMeStockInfosByMerchandiseId;

    @Basic
    @Column(name = "ID", insertable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Id
    @Column(name = "MerchandiseID")
    @GenericGenerator(name = "system-uuid", strategy = "uuid") //有编译警告不用管
    @GeneratedValue(generator = "system-uuid")
    public String getMerchandiseId() {
        return merchandiseId;
    }

    public void setMerchandiseId(String merchandiseId) {
        this.merchandiseId = merchandiseId;
    }

    @Basic
    @Column(name = "MerchandiseName")
    public String getMerchandiseName() {
        return merchandiseName;
    }

    public void setMerchandiseName(String merchandiseName) {
        this.merchandiseName = merchandiseName;
    }

    @Basic
    @Column(name = "MerchandiseAB")
    public String getMerchandiseAb() {
        return merchandiseAb;
    }

    public void setMerchandiseAb(String merchandiseAb) {
        this.merchandiseAb = merchandiseAb;
    }

    @Basic
    @Column(name = "Price")
    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    @Basic
    @Column(name = "SaleStatus")
    public Boolean getSaleStatus() {
        return saleStatus;
    }

    public void setSaleStatus(Boolean saleStatus) {
        this.saleStatus = saleStatus;
    }

    @Basic
    @Column(name = "Spec")
    public String getSpec() {
        return spec;
    }

    public void setSpec(String spec) {
        this.spec = spec;
    }

    @Basic
    @Column(name = "Describe")
    public String getDescribe() {
        return describe;
    }

    public void setDescribe(String describe) {
        this.describe = describe;
    }

    @Basic
    @Column(name = "PicPath")
    public String getPicPath() {
        return picPath;
    }

    public void setPicPath(String picPath) {
        this.picPath = picPath;
    }

    @Basic
    @Column(name = "ClickCount")
    public Integer getClickCount() {
        return clickCount;
    }

    public void setClickCount(Integer clickCount) {
        this.clickCount = clickCount;
    }

    @Basic
    @Column(name = "Remark")
    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    

//    @OneToMany(mappedBy = "myMeMerchandiseInfoByMerchandiseId")
//    public Collection<TMeInStockDetailsInfoEntity> getMyMeInStockDetailsInfosByMerchandiseId() {
//        return myMeInStockDetailsInfosByMerchandiseId;
//    }
//
//    public void setMyMeInStockDetailsInfosByMerchandiseId(Collection<TMeInStockDetailsInfoEntity> myMeInStockDetailsInfosByMerchandiseId) {
//        this.myMeInStockDetailsInfosByMerchandiseId = myMeInStockDetailsInfosByMerchandiseId;
//    }

    @ManyToOne
    @JoinColumn(name = "MerchandiseCID", referencedColumnName = "MerchandiseCID")
    public TMeMerchandiseCInfoEntity getMyMeMerchandiseCInfoByMerchandiseCid() {
        return myMeMerchandiseCInfoByMerchandiseCid;
    }

    public void setMyMeMerchandiseCInfoByMerchandiseCid(TMeMerchandiseCInfoEntity myMeMerchandiseCInfoByMerchandiseCid) {
        this.myMeMerchandiseCInfoByMerchandiseCid = myMeMerchandiseCInfoByMerchandiseCid;
    }

    @ManyToOne
    @JoinColumn(name = "ProStatusID", referencedColumnName = "ProStatusID")
    public TMeProStatusInfoEntity getMyMeProStatusInfoByProStatusId() {
        return myMeProStatusInfoByProStatusId;
    }

    public void setMyMeProStatusInfoByProStatusId(TMeProStatusInfoEntity myMeProStatusInfoByProStatusId) {
        this.myMeProStatusInfoByProStatusId = myMeProStatusInfoByProStatusId;
    }

    @ManyToOne
    @JoinColumn(name = "UnitID", referencedColumnName = "UnitID")
    public TMeUnitInfoEntity getMyMeUnitInfoByUnitId() {
        return myMeUnitInfoByUnitId;
    }

    public void setMyMeUnitInfoByUnitId(TMeUnitInfoEntity myMeUnitInfoByUnitId) {
        this.myMeUnitInfoByUnitId = myMeUnitInfoByUnitId;
    }

//    @OneToMany(mappedBy = "myMeMerchandiseInfoByMerchandiseId")
//    public Collection<TMeOrderDetailsInfoEntity> getMyMeOrderDetailsInfosByMerchandiseId() {
//        return myMeOrderDetailsInfosByMerchandiseId;
//    }
//
//    public void setMyMeOrderDetailsInfosByMerchandiseId(Collection<TMeOrderDetailsInfoEntity> myMeOrderDetailsInfosByMerchandiseId) {
//        this.myMeOrderDetailsInfosByMerchandiseId = myMeOrderDetailsInfosByMerchandiseId;
//    }
//
//    @OneToMany(mappedBy = "myMeMerchandiseInfoByMerchandiseId")
//    public Collection<TMeOutStockDetailsInfoEntity> getMyMeOutStockDetailsInfosByMerchandiseId() {
//        return myMeOutStockDetailsInfosByMerchandiseId;
//    }
//
//    public void setMyMeOutStockDetailsInfosByMerchandiseId(Collection<TMeOutStockDetailsInfoEntity> myMeOutStockDetailsInfosByMerchandiseId) {
//        this.myMeOutStockDetailsInfosByMerchandiseId = myMeOutStockDetailsInfosByMerchandiseId;
//    }
//
//    @OneToMany(mappedBy = "myMeMerchandiseInfoByMerchandiseId")
//    public Collection<TMeStockInfoEntity> getMyMeStockInfosByMerchandiseId() {
//        return myMeStockInfosByMerchandiseId;
//    }
//
//    public void setMyMeStockInfosByMerchandiseId(Collection<TMeStockInfoEntity> myMeStockInfosByMerchandiseId) {
//        this.myMeStockInfosByMerchandiseId = myMeStockInfosByMerchandiseId;
//    }
}
