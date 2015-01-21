package com.shinowit.entity;

import javax.persistence.*;
import java.sql.Timestamp;

/**
 * Created by daihui on 2014-11-10.
 */
@Entity
@Table(name = "TBa_LogInfo")
public class TBaLogInfoEntity {
    private Integer id;
    private Timestamp logTime;
    private String ip;
    private String content;
    private TAuMenuInfoEntity myAuMenuInfoByMenuId;
    private TAuOperInfoEntity myAuOperInfoByOperId;

    @Id
    @Column(name = "ID")
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Basic
    @Column(name = "LogTime")
    public Timestamp getLogTime() {
        return logTime;
    }

    public void setLogTime(Timestamp logTime) {
        this.logTime = logTime;
    }

    @Basic
    @Column(name = "IP")
    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    @Basic
    @Column(name = "Content")
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        TBaLogInfoEntity that = (TBaLogInfoEntity) o;

        if (id != that.id) return false;
        if (content != null ? !content.equals(that.content) : that.content != null) return false;
        if (ip != null ? !ip.equals(that.ip) : that.ip != null) return false;
        if (logTime != null ? !logTime.equals(that.logTime) : that.logTime != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (logTime != null ? logTime.hashCode() : 0);
        result = 31 * result + (ip != null ? ip.hashCode() : 0);
        result = 31 * result + (content != null ? content.hashCode() : 0);
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

    @ManyToOne
    @JoinColumn(name = "OperID", referencedColumnName = "OperID")
    public TAuOperInfoEntity getMyAuOperInfoByOperId() {
        return myAuOperInfoByOperId;
    }

    public void setMyAuOperInfoByOperId(TAuOperInfoEntity myAuOperInfoByOperId) {
        this.myAuOperInfoByOperId = myAuOperInfoByOperId;
    }
}
