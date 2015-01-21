package com.shinowit.entity;

import javax.persistence.*;

/**
 * Created by daihui on 2014-12-10.
 */
@Entity
@Table(name = "V_StockInfoChart", schema = "dbo", catalog = "oss")
public class VStockInfoChartEntity {
    private String merchandiseName;
    private int id;
    private int num;
    private float avgPrice;

    @Basic
    @Column(name = "MerchandiseName")
    public String getMerchandiseName() {
        return merchandiseName;
    }

    public void setMerchandiseName(String merchandiseName) {
        this.merchandiseName = merchandiseName;
    }

    @Basic
    @Id
    @Column(name = "ID")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "Num")
    public int getNum() {
        return num;
    }

    public void setNum(int num) {
        this.num = num;
    }

    @Basic
    @Column(name = "AvgPrice")
    public float getAvgPrice() {
        return avgPrice;
    }

    public void setAvgPrice(float avgPrice) {
        this.avgPrice = avgPrice;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        VStockInfoChartEntity that = (VStockInfoChartEntity) o;

        if (Float.compare(that.avgPrice, avgPrice) != 0) return false;
        if (id != that.id) return false;
        if (num != that.num) return false;
        if (merchandiseName != null ? !merchandiseName.equals(that.merchandiseName) : that.merchandiseName != null)
            return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = merchandiseName != null ? merchandiseName.hashCode() : 0;
        result = 31 * result + id;
        result = 31 * result + num;
        result = 31 * result + (avgPrice != +0.0f ? Float.floatToIntBits(avgPrice) : 0);
        return result;
    }
}
