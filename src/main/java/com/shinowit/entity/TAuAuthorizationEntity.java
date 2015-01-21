package com.shinowit.entity;

import javax.persistence.*;

/**
 * Created by daihui on 2014-11-10.
 */
@Entity
@Table(name = "TAu_Authorization")
public class TAuAuthorizationEntity {
    private Integer id;
    private Boolean isEnabled;
    private TAuMenuInfoEntity myAuMenuInfoByMenuId;
    private TAuRoleInfoEntity myAuRoleInfoByRoleId;

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "IsEnabled")
    public Boolean getIsEnabled() {
        return isEnabled;
    }

    public void setIsEnabled(Boolean isEnabled) {
        this.isEnabled = isEnabled;
    }


    @ManyToOne
    @JoinColumn(name = "MenuID", referencedColumnName = "MenuID")
    public TAuMenuInfoEntity getMyAuMenuInfoByMenuId() {
        return myAuMenuInfoByMenuId;
    }

    public void setMyAuMenuInfoByMenuId(TAuMenuInfoEntity myAuMenuInfoByMenuId) {
        this.myAuMenuInfoByMenuId = myAuMenuInfoByMenuId;
    }

    @ManyToOne
    @JoinColumn(name = "RoleID", referencedColumnName = "RoleID")
    public TAuRoleInfoEntity getMyAuRoleInfoByRoleId() {
        return myAuRoleInfoByRoleId;
    }

    public void setMyAuRoleInfoByRoleId(TAuRoleInfoEntity myAuRoleInfoByRoleId) {
        this.myAuRoleInfoByRoleId =myAuRoleInfoByRoleId;
    }
}
