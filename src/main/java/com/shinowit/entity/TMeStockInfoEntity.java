package com.shinowit.entity;

import javax.persistence.*;

/**
 * Created by daihui on 2014-11-10.
 */
@Entity
@Table(name = "TMe_StockInfo")
public class TMeStockInfoEntity {
    private Integer id;
    private Float avgPrice;
    private Integer num;
    private TMeMerchandiseInfoEntity myMeMerchandiseInfoByMerchandiseId;

    @Id
    @Column(name = "ID")
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Basic
    @Column(name = "AvgPrice")
    public Float getAvgPrice() {
        return avgPrice;
    }

    public void setAvgPrice(Float avgPrice) {
        this.avgPrice = avgPrice;
    }

    @Basic
    @Column(name = "Num")
    public Integer getNum() {
        return num;
    }

    public void setNum(Integer num) {
        this.num = num;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        TMeStockInfoEntity that = (TMeStockInfoEntity) o;

        if (Float.compare(that.avgPrice, avgPrice) != 0) return false;
        if (id != that.id) return false;
        if (num != that.num) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (avgPrice != +0.0f ? Float.floatToIntBits(avgPrice) : 0);
        result = 31 * result + num;
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
}
