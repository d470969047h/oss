package com.shinowit.entity;

import javax.persistence.*;

/**
 * Created by daihui on 2014-11-10.
 */
@Entity
@Table(name = "TBa_MembeAddrInfo")
public class TBaMembeAddrInfoEntity {
    private Integer id;
    private String recMan;
    private String tel;
    private String recAddress;
    private String postCode;
    private Boolean isDefault;
    private TBaMemberInfoEntity myBaMemberInfoByUserName;

    @Id
    @Column(name = "ID")
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Basic
    @Column(name = "RecMan")
    public String getRecMan() {
        return recMan;
    }

    public void setRecMan(String recMan) {
        this.recMan = recMan;
    }

    @Basic
    @Column(name = "Tel")
    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    @Basic
    @Column(name = "RecAddress")
    public String getRecAddress() {
        return recAddress;
    }

    public void setRecAddress(String recAddress) {
        this.recAddress = recAddress;
    }

    @Basic
    @Column(name = "PostCode")
    public String getPostCode() {
        return postCode;
    }

    public void setPostCode(String postCode) {
        this.postCode = postCode;
    }

    @Basic
    @Column(name = "IsDefault")
    public Boolean getIsDefault() {
        return isDefault;
    }

    public void setIsDefault(Boolean isDefault) {
        this.isDefault = isDefault;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        TBaMembeAddrInfoEntity that = (TBaMembeAddrInfoEntity) o;

        if (id != that.id) return false;
        if (isDefault != null ? !isDefault.equals(that.isDefault) : that.isDefault != null) return false;
        if (postCode != null ? !postCode.equals(that.postCode) : that.postCode != null) return false;
        if (recAddress != null ? !recAddress.equals(that.recAddress) : that.recAddress != null) return false;
        if (recMan != null ? !recMan.equals(that.recMan) : that.recMan != null) return false;
        if (tel != null ? !tel.equals(that.tel) : that.tel != null) return false;

        return true;
    }

//    @Override
//    public int hashCode() {
//        int result = id;
//        result = 31 * result + (recMan != null ? recMan.hashCode() : 0);
//        result = 31 * result + (tel != null ? tel.hashCode() : 0);
//        result = 31 * result + (recAddress != null ? recAddress.hashCode() : 0);
//        result = 31 * result + (postCode != null ? postCode.hashCode() : 0);
//        result = 31 * result + (isDefault != null ? isDefault.hashCode() : 0);
//        return result;
//    }

    @ManyToOne
    @JoinColumn(name = "UserName", referencedColumnName = "UserName")
    public TBaMemberInfoEntity getMyBaMemberInfoByUserName() {
        return myBaMemberInfoByUserName;
    }

    public void setMyBaMemberInfoByUserName(TBaMemberInfoEntity myBaMemberInfoByUserName) {
        this.myBaMemberInfoByUserName = myBaMemberInfoByUserName;
    }
}
