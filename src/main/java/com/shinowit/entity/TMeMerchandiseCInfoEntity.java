package com.shinowit.entity;

import javax.persistence.*;

/**
 * Created by daihui on 2014-11-10.
 */
@Entity
@Table(name = "TMe_MerchandiseCInfo")
public class TMeMerchandiseCInfoEntity {
    private Integer id;
    private String merchandiseCid;
    private String merchandiseCName;
    private Integer sortId;
    private Boolean state;
//    private Collection<TMeMerchandiseInfoEntity> myMeMerchandiseInfosByMerchandiseCid;

    @Basic
    @Column(name = "ID",insertable = false,updatable = false)
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Id
    @Column(name = "MerchandiseCID")
    public String getMerchandiseCid() {
        return merchandiseCid;
    }

    public void setMerchandiseCid(String merchandiseCid) {
        this.merchandiseCid = merchandiseCid;
    }

    @Basic
    @Column(name = "MerchandiseCName")
    public String getMerchandiseCName() {
        return merchandiseCName;
    }

    public void setMerchandiseCName(String merchandiseCName) {
        this.merchandiseCName = merchandiseCName;
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

//    @Override
//    public boolean equals(Object o) {
//        if (this == o) return true;
//        if (o == null || getClass() != o.getClass()) return false;
//
//        TMeMerchandiseCInfoEntity that = (TMeMerchandiseCInfoEntity) o;
//
//        if (id != that.id) return false;
//        if (merchandiseCName != null ? !merchandiseCName.equals(that.merchandiseCName) : that.merchandiseCName != null)
//            return false;
//        if (merchandiseCid != null ? !merchandiseCid.equals(that.merchandiseCid) : that.merchandiseCid != null)
//            return false;
//        if (sortId != null ? !sortId.equals(that.sortId) : that.sortId != null) return false;
//        if (state != null ? !state.equals(that.state) : that.state != null) return false;
//
//        return true;
//    }
//
//    @Override
//    public int hashCode() {
//        int result = id;
//        result = 31 * result + (merchandiseCid != null ? merchandiseCid.hashCode() : 0);
//        result = 31 * result + (merchandiseCName != null ? merchandiseCName.hashCode() : 0);
//        result = 31 * result + (sortId != null ? sortId.hashCode() : 0);
//        result = 31 * result + (state != null ? state.hashCode() : 0);
//        return result;
//    }

//    @OneToMany(mappedBy = "myMeMerchandiseCInfoByMerchandiseCid")
//    public Collection<TMeMerchandiseInfoEntity> getMyMeMerchandiseInfosByMerchandiseCid() {
//        return myMeMerchandiseInfosByMerchandiseCid;
//    }
//
//    public void setMyMeMerchandiseInfosByMerchandiseCid(Collection<TMeMerchandiseInfoEntity> myMeMerchandiseInfosByMerchandiseCid) {
//        this.myMeMerchandiseInfosByMerchandiseCid = myMeMerchandiseInfosByMerchandiseCid;
//    }
}
