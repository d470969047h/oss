package com.shinowit.entity;

import javax.persistence.*;

/**
 * Created by daihui on 2014-11-10.
 */
@Entity
@Table(name = "TMe_OutStockDetailsInfo")
public class TMeOutStockDetailsInfoEntity {
    private Integer id;
    private Integer num;
    private Float price;
    private Float stockPrice;
    private TMeMerchandiseInfoEntity myMeMerchandiseInfoByMerchandiseId;
    private TMeOutStockInfoEntity myMeOutStockInfoByOutBillCode;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
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

    @Basic
    @Column(name = "stock_price")
    public Float getStockPrice() {
        return stockPrice;
    }

    public void setStockPrice(Float stockPrice) {
        this.stockPrice = stockPrice;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        TMeOutStockDetailsInfoEntity that = (TMeOutStockDetailsInfoEntity) o;

        if (id != that.id) return false;
        if (num != null ? !num.equals(that.num) : that.num != null) return false;
        if (price != null ? !price.equals(that.price) : that.price != null) return false;
        if (stockPrice != null ? !stockPrice.equals(that.stockPrice) : that.stockPrice != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (num != null ? num.hashCode() : 0);
        result = 31 * result + (price != null ? price.hashCode() : 0);
        result = 31 * result + (stockPrice != null ? stockPrice.hashCode() : 0);
        return result;
    }

    @ManyToOne
    @JoinColumn(name = "MerchandiseID", referencedColumnName = "MerchandiseID")
    public TMeMerchandiseInfoEntity getMyMeMerchandiseInfoByMerchandiseId() {
        return myMeMerchandiseInfoByMerchandiseId;
    }

    public void setMyMeMerchandiseInfoByMerchandiseId(TMeMerchandiseInfoEntity myMeMerchandiseInfoByMerchandiseId) {
        this.myMeMerchandiseInfoByMerchandiseId = myMeMerchandiseInfoByMerchandiseId;
    }

    @ManyToOne
    @JoinColumn(name = "OutBillCode", referencedColumnName = "OutBillCode")
    public TMeOutStockInfoEntity getMyMeOutStockInfoByOutBillCode() {
        return myMeOutStockInfoByOutBillCode;
    }

    public void setMyMeOutStockInfoByOutBillCode(TMeOutStockInfoEntity myMeOutStockInfoByOutBillCode) {
        this.myMeOutStockInfoByOutBillCode = myMeOutStockInfoByOutBillCode;
    }
}
