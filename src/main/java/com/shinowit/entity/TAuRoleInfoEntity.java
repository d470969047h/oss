package com.shinowit.entity;

import javax.persistence.*;

/**
 * Created by daihui on 2014-11-10.
 */
@Entity
@Table(name = "TAu_RoleInfo")
public class TAuRoleInfoEntity {
    private Integer id;
    private String roleId;
    private String roleName;
    private Short sortId;
    private Boolean state;
    private Boolean checked;
//    private Collection<TAuAuthorizationEntity> myAuAuthorizationsByRoleId;
//    private Collection<TAuOperInfoEntity> myAuOperInfosByRoleId;

    @Basic
    @Column(name = "ID",insertable = false,updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Id
    @Column(name = "RoleID")
    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }

    @Basic
    @Column(name = "RoleName")
    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    @Basic
    @Column(name = "SortID")
    public Short getSortId() {
        return sortId;
    }

    public void setSortId(Short sortId) {
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

    public Boolean isChecked() {
        return checked=false;
    }

    public void setChecked(Boolean checked) {
        this.checked = checked;
    }

    //    @OneToMany(mappedBy = "myAuRoleInfoByRoleId")
//    public Collection<TAuAuthorizationEntity> getMyAuAuthorizationsByRoleId() {
//        return myAuAuthorizationsByRoleId;
//    }
//
//    public void setMyAuAuthorizationsByRoleId(Collection<TAuAuthorizationEntity> myAuAuthorizationsByRoleId) {
//        this.myAuAuthorizationsByRoleId = myAuAuthorizationsByRoleId;
//    }
//
//    @OneToMany(mappedBy = "myAuRoleInfoByRoleId")
//    public Collection<TAuOperInfoEntity> getMyAuOperInfosByRoleId() {
//        return myAuOperInfosByRoleId;
//    }
//
//    public void setMyAuOperInfosByRoleId(Collection<TAuOperInfoEntity> myAuOperInfosByRoleId) {
//        this.myAuOperInfosByRoleId = myAuOperInfosByRoleId;
//    }
}
