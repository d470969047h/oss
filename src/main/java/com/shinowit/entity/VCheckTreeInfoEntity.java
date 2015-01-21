package com.shinowit.entity;

import javax.persistence.*;

/**
 * Created by daihui on 2014-12-01.
 */
@Entity
@Table(name = "V_CheckTreeInfo", schema = "dbo", catalog = "oss")
public class VCheckTreeInfoEntity {
    private String menuId;
    private String text;
    private String url;
    private Short sortId;
    private Boolean leaf;
    private String tag;
    private Boolean checked;
    private short id;

    @Basic
    @Column(name = "MenuID")
    public String getMenuId() {
        return menuId;
    }

    public void setMenuId(String menuId) {
        this.menuId = menuId;
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
    @Column(name = "URL")
    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
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
    @Column(name = "leaf")
    public Boolean getLeaf() {
        return leaf;
    }

    public void setLeaf(Boolean leaf) {
        this.leaf = leaf;
    }

    @Basic
    @Column(name = "tag")
    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    @Basic
    @Column(name = "checked")
    public Boolean getChecked() {
        return checked;
    }

    public void setChecked(Boolean checked) {
        this.checked = checked;
    }

    @Basic
    @Id
    @Column(name = "ID")
    public short getId() {
        return id;
    }

    public void setId(short id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        VCheckTreeInfoEntity that = (VCheckTreeInfoEntity) o;

        if (id != that.id) return false;
        if (checked != null ? !checked.equals(that.checked) : that.checked != null) return false;
        if (leaf != null ? !leaf.equals(that.leaf) : that.leaf != null) return false;
        if (menuId != null ? !menuId.equals(that.menuId) : that.menuId != null) return false;
        if (sortId != null ? !sortId.equals(that.sortId) : that.sortId != null) return false;
        if (tag != null ? !tag.equals(that.tag) : that.tag != null) return false;
        if (text != null ? !text.equals(that.text) : that.text != null) return false;
        if (url != null ? !url.equals(that.url) : that.url != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = menuId != null ? menuId.hashCode() : 0;
        result = 31 * result + (text != null ? text.hashCode() : 0);
        result = 31 * result + (url != null ? url.hashCode() : 0);
        result = 31 * result + (sortId != null ? sortId.hashCode() : 0);
        result = 31 * result + (leaf != null ? leaf.hashCode() : 0);
        result = 31 * result + (tag != null ? tag.hashCode() : 0);
        result = 31 * result + (checked != null ? checked.hashCode() : 0);
        result = 31 * result + (int) id;
        return result;
    }
}
