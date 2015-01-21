package com.shinowit.entity;

import javax.persistence.*;

/**
 * Created by daihui on 2014-12-07.
 */
@Entity
@Table(name = "V_RoleInfo", schema = "dbo", catalog = "oss")
public class VRoleInfoEntity {
    private Boolean checked;
    private String roleId;
    private String text;
    private Boolean leaf;

    @Basic
    @Column(name = "checked")
    public Boolean getChecked() {
        return checked;
    }

    public void setChecked(Boolean checked) {
        this.checked = checked;
    }

    @Basic
    @Column(name = "RoleID")
    @Id
    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }

    @Basic
    @Column(name = "text")
    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    @Basic
    @Column(name = "leaf")
    public Boolean getLeaf() {
        return leaf;
    }

    public void setLeaf(Boolean leaf) {
        this.leaf = leaf;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        VRoleInfoEntity that = (VRoleInfoEntity) o;

        if (checked != null ? !checked.equals(that.checked) : that.checked != null) return false;
        if (leaf != null ? !leaf.equals(that.leaf) : that.leaf != null) return false;
        if (roleId != null ? !roleId.equals(that.roleId) : that.roleId != null) return false;
        if (text != null ? !text.equals(that.text) : that.text != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = checked != null ? checked.hashCode() : 0;
        result = 31 * result + (roleId != null ? roleId.hashCode() : 0);
        result = 31 * result + (text != null ? text.hashCode() : 0);
        result = 31 * result + (leaf != null ? leaf.hashCode() : 0);
        return result;
    }
}
