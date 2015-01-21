package com.shinowit.entity;

import javax.persistence.*;
import java.sql.Timestamp;

/**
 * Created by daihui on 2014-12-09.
 */
@Entity
@Table(name = "V_InStockChart", schema = "dbo", catalog = "oss")
public class VInStockChartEntity {
    private int num;
    private float price;
    private int id;
    private Timestamp inTime;
    private Float totalMoney;
    private String merchandiseName;

    @Basic
    @Column(name = "Num")
    public int getNum() {
        return num;
    }

    public void setNum(int num) {
        this.num = num;
    }

    @Basic
    @Column(name = "Price")
    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
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
    @Column(name = "InTime")
    public Timestamp getInTime() {
        return inTime;
    }

    public void setInTime(Timestamp inTime) {
        this.inTime = inTime;
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
    @Column(name = "MerchandiseName")
    public String getMerchandiseName() {
        return merchandiseName;
    }

    public void setMerchandiseName(String merchandiseName) {
        this.merchandiseName = merchandiseName;
    }


}
