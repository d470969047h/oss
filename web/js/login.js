/**
 * Created by daihui on 2014-11-06.
 */
Ext.define('Login', {
    extend: 'Ext.form.Panel',
    initComponent: function () {
        var me = this;
        Ext.apply(this, {
            title: '登陆',
            layout: 'fit',
            width: 300,
            items: [
                {
                    xtype: 'form',
                    border: false,
                    margin: 5,
                    bodyStyle:{
                        backgroundColor:'#dfe9f6'
                    },
                    defaults: {
                        xtype: 'textfield',
                        allowBlank: false,
                        labelWidth: 80,
                        labelAlign: 'right'
                    },
                    items: [
                        {
                            fieldLabel: '用户名',
                            name: 'operInfo.operName'
                        },
                        {
                            fieldLabel: '密码',
                            name: 'operInfo.pwd',
                            inputType: 'password'
                        },
                        {
                            xtype:'panel',
                            layout:'column',
                            border:false,
                            bodyStyle:{
                                backgroundColor:'#dfe9f6'
                            },
                            items:[
                                {
                                    xtype:'textfield',
                                    fieldLabel:'验证码',
                                    name:'myValidCode',
                                    labelWidth:80,
                                    labelAlign: 'right',
                                    allowBlank:false,
                                    columnWidth:.82
                                },
                                {
                                    xtype:'panel',
                                    border:false,
                                    html:'<img id="myimg" src="validCode.jsp" width="50" height="20" onclick="this.src=\'validCode.jsp?r=\'+Math.random()">',
                                    columnWidth:.18
                                }
                            ]
                        }

                    ]
                }
            ],
            buttons: [
                {
                    defaults: {frame: true},
                    text: "登陆",
                    handler: me.doLogin
                },
                {
                    text: "重置",
                    handler: me.doReset
                }
            ],
            buttonAlign: 'center',
            renderTo: Ext.getBody()
        });
        this.callParent();
    },

    doLogin: function () {
        var form = this.up("panel").down("form").getForm();
        if (form.isValid()) {
            form.submit(
                {
                    url: '/login',
                    success: function (form, action) {
                        var msg = Ext.JSON.decode(action.response.responseText);
                        if (msg.state) {
                            Ext.Msg.alert('成功', msg.message);
                            window.location='/main'
                        } else {
                            Ext.Msg.alert("提示", msg.message);
                        }
                    },
                    failure: function (form, action) {
                        var msg = Ext.JSON.decode(action.response.responseText);
                        Ext.Msg.alert("提示", msg.message);
                    }
                });
            return;
        }
        Ext.Msg.alert('提示', '用户名或密码不能为空！');
    },

    doReset: function () {
        this.up('panel').down('form').getForm().reset();
    }


});

