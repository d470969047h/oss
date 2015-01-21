package com.shinowit.entity;

import javax.persistence.*;

/**
 * Created by daihui on 2014-11-10.
 */
@Entity
@Table(name = "TAu_MenuInfoDetail")
public class TAuMenuInfoDetailEntity {
    private Integer detailId;
    private String name;
    private String model;
    private String src;
    private String tag;
    private TAuMenuInfoEntity myAuMenuInfoByMenuId;

    @Id
    @Column(name = "detail_id")
    public Integer getDetailId() {
        return detailId;
    }

    public void setDetailId(Integer detailId) {
        this.detailId = detailId;
    }

    @Basic
    @Column(name = "name")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Basic
    @Column(name = "model")
    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    @Basic
    @Column(name = "src")
    public String getSrc() {
        return src;
    }

    public void setSrc(String src) {
        this.src = src;
    }

    @Basic
    @Column(name = "tag")
    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        TAuMenuInfoDetailEntity that = (TAuMenuInfoDetailEntity) o;

        if (detailId != that.detailId) return false;
        if (model != null ? !model.equals(that.model) : that.model != null) return false;
        if (name != null ? !name.equals(that.name) : that.name != null) return false;
        if (src != null ? !src.equals(that.src) : that.src != null) return false;
        if (tag != null ? !tag.equals(that.tag) : that.tag != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = detailId;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (model != null ? model.hashCode() : 0);
        result = 31 * result + (src != null ? src.hashCode() : 0);
        result = 31 * result + (tag != null ? tag.hashCode() : 0);
        return result;
    }

    @ManyToOne
    @JoinColumn(name = "MenuID", referencedColumnName = "MenuID")
    public TAuMenuInfoEntity getMyAuMenuInfoByMenuId() {
        return myAuMenuInfoByMenuId;
    }

    public void setMyAuMenuInfoByMenuId(TAuMenuInfoEntity myAuMenuInfoByMenuId) {
        this.myAuMenuInfoByMenuId = myAuMenuInfoByMenuId;
    }
}
