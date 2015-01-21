package com.shinowit.entity;

import javax.persistence.*;

/**
 * Created by daihui on 2014-11-10.
 */
@Entity
@Table(name = "TMe_InStockDetailsInfo")
public class TMeInStockDetailsInfoEntity {
    private Integer id;
    private Integer num;
    private Float price;
    private TMeInStockInfoEntity myMeInStockInfoByBillCode;
    private TMeMerchandiseInfoEntity myMeMerchandiseInfoByMerchandiseId;

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Basic
    @Column(name = "Num")
    public Integer getNum() {
        return num;
    }

    public void setNum(Integer num) {
        this.num = num;
    }

    @Basic
    @Column(name = "Price")
    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }


    @ManyToOne
    @JoinColumn(name = "BillCode", referencedColumnName = "BillCode")
    public TMeInStockInfoEntity getMyMeInStockInfoByBillCode() {
        return myMeInStockInfoByBillCode;
    }

    public void setMyMeInStockInfoByBillCode(TMeInStockInfoEntity myMeInStockInfoByBillCode) {
        this.myMeInStockInfoByBillCode = myMeInStockInfoByBillCode;
    }

    @ManyToOne
    @JoinColumn(name = "MerchandiseID", referencedColumnName = "MerchandiseID")
    public TMeMerchandiseInfoEntity getMyMeMerchandiseInfoByMerchandiseId() {
        return myMeMerchandiseInfoByMerchandiseId;
    }

    public void setMyMeMerchandiseInfoByMerchandiseId(TMeMerchandiseInfoEntity myMeMerchandiseInfoByMerchandiseId) {
        this.myMeMerchandiseInfoByMerchandiseId = myMeMerchandiseInfoByMerchandiseId;
    }
}
