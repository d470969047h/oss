/**
 * Created by daihui on 2014-11-30.
 */
Ext.define('shinow.oss.operInfo', {
    extend: 'Ext.panel.Panel',
    itemsPerPage: 5,//全局
    postRoleIdData: [],
   // updatePostMenuInfoData: [],
    initComponent: function () {
        var me = this, operStore, authorizationTreeStore, roleTreeStore;
        operStore = Ext.create('Ext.data.Store', {
            autoLoad: false,
            fields: [
                {name: 'id', type: 'Short'},
                {name: 'operId', type: 'String'},
                {name: 'operName', type: 'String'},
                {name: 'pwd', type: 'String'},
                {name: 'address', type: 'String'},
                {name: 'linkTel', type: 'String'},
                {name: 'qq', type: 'String'},
                {name: 'email', type: 'String'},
                {name: 'mobile', type: 'String'},
                {name: 'sortId', type: 'Short'},
                {name: 'state', type: 'Boolean'},
                {name: 'myAuRoleInfoByRoleId.roleId', type: 'String'}
            ],
            pageSize: me.itemsPerPage,
            proxy: {
                type: 'ajax',
                url: '/operPagingInfo',
                reader: {
                    type: 'json',
                    root: 'tAuOperInfoEntityList',
                    totalProperty: 'rowCount'
                }
            }
        });
        operStore.load({
            params: {
                start: 0,
                limit: me.itemsPerPage
            }
        });

        //右边展示角色的树
        roleTreeStore = Ext.create('Ext.data.TreeStore', {
            autoLoad: false,
            proxy: {
                type: 'ajax',
                url: '/roleInfoQuery',//请求
                reader: {
                    type: 'json',
                    root: 'roleInfoList'//数据
                }
            },
            root: {
                text: '角色',
                expanded: true
            }
        });

        Ext.apply(this, {
            title: '用户管理',
            id: 'operInfoEdit',
            layout: 'border',
            loadMask: true,
            closable: true,
            items: [
                {
                    title: '用户列表',
                    region: 'center',
                    xtype: 'grid',
                    id: 'operInfoGrid',
                    width: '100%',
                    store: operStore,
                    columns: [
                        {text: '操作员编码', dataIndex: 'operId'},
                        {text: '操作员名称', dataIndex: 'operName'},
                        {text: '密码', dataIndex: 'pwd'},
                        {text: '地址', dataIndex: 'address'},
                        {text: '联系电话', dataIndex: 'linkTel'},
                        {text: 'QQ', dataIndex: 'qq'},
                        {text: 'Email', dataIndex: 'email'},
                        {text: '手机号码', dataIndex: 'mobile'},
                        {text: '排序编码', dataIndex: 'sortId'},
                        {text: '状态', dataIndex: 'state', renderer: function (value) {
                            if ((value == 'false') || (value == false)) {
                                return '未启用';
                            }
                            if ((value == 'true') || (true == value)) {
                                return '启用'
                            }
                        }
                        }
                    ],
                    //选择grid某行展示右边的tree相对的权限
                    listeners: {
                        select: function () {
                            var record = Ext.getCmp('operInfoGrid').getSelectionModel().getLastSelected();
                            //var RoleID = record.get('roleId');
                            Ext.getCmp('roleTreePanel').store.reload();
                            Ext.Ajax.request({
                                url: '/operInfoQueryById',
                                params: {
                                    RoleInfoID: record.get('myAuRoleInfoByRoleId.roleId')
                                },
                                success: function (response) {
                                    var msg = Ext.JSON.decode(response.responseText);
                                    Ext.getCmp('roleTreePanel').getRootNode().eachChild(function (item1) {
                                        Ext.each(msg.authorizationList, function (item) {
                                            if (item1.raw.roleId === item.myAuRoleInfoByRoleId.roleId) {
                                                item1.set('checked', true);
                                            }
                                        });
                                    });

                                    Ext.Ajax.request({
                                        url: '/roleIDInfoquery?roleID=' + record.get('myAuRoleInfoByRoleId.roleId'),
                                        async: false,
                                        success: function (response) {
                                            me.jsonData = response.responseText;
                                            if (typeof(me.jsonData) === 'string') {
                                                me.jsonData = Ext.JSON.decode(me.jsonData);
                                                me.mystore= me.jsonData.treeNode.children;
                                                Ext.getCmp("authorizationTreePanel").getRootNode().removeAll(false);
                                                Ext.getCmp("authorizationTreePanel").setRootNode(me.jsonData.treeNode);
                                                Ext.getCmp("authorizationTreePanel").getRootNode().data.text = record.get('roleName');
                                                Ext.getCmp("authorizationTreePanel").expandAll();
                                            }
                                        }
                                    });
                                }
                            });
                        }
                    },
                    dockedItems: [
                        {
                            xtype: 'pagingtoolbar',
                            store: operStore,
                            dock: 'bottom',
                            displayInfo: true
                        }
                    ],
                    tbar: [
                        {
                            xtype: 'button',
                            text: '用户添加',
                            handler: function () {
                                me.AddOperWindow(me);
                            }
                        },
                        {
                            xtype: 'button',
                            text: '用户编辑',
                            handler: function () {
                                me.UpdateOperWindow(me);
                            }
                        },
                        {
                            xtype: 'button',
                            text: '用户删除',
                            handler:me.deleteOperInfo
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    region: 'east',
                    layout: 'vbox',
                    items: [
                        Ext.create('Ext.tree.Panel', {
                            title: '用户角色',
                            flex: 1,
                            border: true,
                            id: 'roleTreePanel',
                            width: 210,
                            useArrows: false,//为true时树上使用Vista-style风格的箭头
                            store: roleTreeStore
                        }),
                        Ext.create('Ext.tree.Panel', {
                            title: '用户权限',
                            flex: 2,
                            border: true,
                            id: 'authorizationTreePanel',
                            width: 210,
                            useArrows: false,//为true时树上使用Vista-style风格的箭头
                            store: Ext.create("Ext.data.TreeStore", {
                                id: 'oper_au_tree',
                                fields: [
                                    { name: 'id', type: 'string', mapping: 'menuInfoEntity.id'},
                                    { name: 'text', type: 'string', mapping: 'menuInfoEntity.menuName'}
                                ],
                                root: {
                                    text: '权限',
                                    id: '-1',
                                    children:  me.mystore
                                }
                            })
                        })
                    ]
                }
            ]
        });
        this.callParent();
    },
    //添加用户window
    AddOperWindow: function (param1) {
        var stateStore, roleComStore;
        //状态combobox数据源
        stateStore = Ext.create('Ext.data.Store', {
            fields: ['abbr', 'name'],
            data: [
                {"abbr": "true", "name": "使用"},
                {"abbr": "false", "name": "停用"}
            ]
        });

        //添加角色的combobox数据源
        roleComStore = Ext.create('Ext.data.Store', {
            fields: ['roleId', 'roleName'],
            proxy: {
                type: 'ajax',
                url: '/RoleComInfo',
                reader: {
                    type: 'json',
                    root: 'roleComInfoList'
                }
            }
        });

        var window = Ext.create('Ext.window.Window', {
            title: '添加用户信息',
            layout: 'fit',
            modal: true,
            id: 'addOperWindow',
            items: [
                {
                    xtype: 'form',
                    border: false,
                    id: 'operAddForm',
                    width: 270,
                    bodyPadding: '5 5 0',
                    fieldDefaults: {
                        msgTarget: 'side',
                        labelAlign: 'right'
                    },
                    defaultType: 'textfield',
                    items: [
                        {
                            fieldLabel: '操作员名称',
                            name: 'operInfo.operName',
                            allowBlank: false
                        },
                        {
                            fieldLabel: '操作员编码',
                            name: 'operInfo.operId',
                            allowBlank: false
                        },
                        {
                            inputType: 'password',
                            fieldLabel: '密码',
                            name: 'operInfo.pwd',
                            allowBlank: false
                        },
                        {
                            fieldLabel: '地址',
                            name: 'operInfo.address',
                            allowBlank: true
                        },
                        {
                            fieldLabel: '联系电话',
                            name: 'operInfo.linkTel',
                            allowBlank: false
                        },
                        {
                            fieldLabel: 'QQ',
                            name: 'operInfo.qq',
                            allowBlank: true
                        },
                        {
                            fieldLabel: 'Email',
                            name: 'operInfo.email',
                            allowBlank: true
                        },
                        {
                            fieldLabel: '手机号码',
                            name: 'operInfo.mobile',
                            allowBlank: false
                        },
                        {
                            fieldLabel: '排序编码',
                            name: 'operInfo.sortId',
                            allowBlank: true
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: '状态',
                            store: stateStore,
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'abbr',
                            name: 'operInfo.state',
                            allowBlank: true
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: '用户角色',
                            store: roleComStore,
                            displayField: 'roleName',
                            valueField: 'roleId',
                            name: 'operInfo.myAuRoleInfoByRoleId.roleId'
                        }
                    ]
                }
            ],
            buttonAlign: 'center',
            buttons: [
                {
                    text: '确定',
                    handler: param1.addOperInfo
                },
                {
                    text: '取消',
                    handler: function () {
                        this.up('window').close();
                    }
                },
                {
                    text: '重置',
                    handler: function () {
                        Ext.getCmp('operForm').getForm().reset();
                    }
                }
            ]
        });
        window.show();
        window.center();
    },
    //添加用户方法
    addOperInfo:function(){
            var form = Ext.getCmp('operAddForm').getForm();
            if (form.isValid()) {
                form.submit({
                    url: '/addOperInfo',
                    success: function (form,action) {
                        var msg = Ext.JSON.decode(action.response.responseText);
                        if (msg.state) {
                            Ext.MessageBox.show({
                                title: '成功',
                                msg: msg.message,
                                icon: Ext.MessageBox.WARNING,
                                buttons: Ext.MessageBox.YES
                            });
                            Ext.getCmp('operInfoGrid').store.reload();
                            Ext.getCmp('addOperWindow').close();
                        } else {
                            Ext.MessageBox.show({
                                title: '失败',
                                msg: msg.message,
                                icon: Ext.MessageBox.WARNING,
                                buttons: Ext.MessageBox.YES
                            });
                            Ext.getCmp('operInfoGrid').store.reload();
                            Ext.getCmp('addOperWindow').close();
                        }

                    },
                    failure: function (response) {
                        var msg = Ext.JSON.decode(response.responseText);
                        Ext.MessageBox.show({
                            title: '失败',
                            msg: msg.message,
                            icon: Ext.MessageBox.WARNING,
                            buttons: Ext.MessageBox.YES
                        });
                    }
                });
            }
        },

    //修改用户window
    UpdateOperWindow: function (param2) {
        var stateStore, roleComStore;
        //状态combobox数据源
        stateStore = Ext.create('Ext.data.Store', {
            fields: ['abbr', 'name'],
            data: [
                {"abbr": "true", "name": "使用"},
                {"abbr": "false", "name": "停用"}
            ]
        });

        //修改角色的combobox数据源
        roleComStore = Ext.create('Ext.data.Store', {
            fields: ['roleId', 'roleName'],
            proxy: {
                type: 'ajax',
                url: '/RoleComInfo',
                reader: {
                    type: 'json',
                    root: 'roleComInfoList'
                }
            }
        });
        var record=Ext.getCmp('operInfoGrid').getSelectionModel().getLastSelected();
        var window = Ext.create('Ext.window.Window', {
            title: '修改用户信息',
            layout: 'fit',
            modal: true,
            id: 'updateOperWindow',
            items: [
                {
                    xtype: 'form',
                    border: false,
                    id: 'operUpdateForm',
                    width: 270,
                    bodyPadding: '5 5 0',
                    fieldDefaults: {
                        msgTarget: 'side',
                        labelAlign: 'right'
                    },
                    defaultType: 'textfield',
                    items: [
                        {
                            fieldLabel: '操作员名称',
                            name: 'operInfo.operName',
                            value:record.get('operName'),
                            allowBlank: false
                        },
                        {
                            fieldLabel: '操作员编码',
                            name: 'operInfo.operId',
                            value:record.get('operId'),
                            readOnly:true,
                            allowBlank: false
                        },
                        {
                            inputType: 'password',
                            fieldLabel: '密码',
                            name: 'operInfo.pwd',
                            value:record.get('pwd'),
                            allowBlank: false
                        },
                        {
                            fieldLabel: '地址',
                            name: 'operInfo.address',
                            value:record.get('address'),
                            allowBlank: true
                        },
                        {
                            fieldLabel: '联系电话',
                            name: 'operInfo.linkTel',
                            value:record.get('linkTel'),
                            allowBlank: false
                        },
                        {
                            fieldLabel: 'QQ',
                            name: 'operInfo.qq',
                            value:record.get('qq'),
                            allowBlank: true
                        },
                        {
                            fieldLabel: 'Email',
                            name: 'operInfo.email',
                            value:record.get('email'),
                            allowBlank: true
                        },
                        {
                            fieldLabel: '手机号码',
                            name: 'operInfo.mobile',
                            value:record.get('mobile'),
                            allowBlank: false
                        },
                        {
                            fieldLabel: '排序编码',
                            name: 'operInfo.sortId',
                            value:record.get('sortId'),
                            allowBlank: true
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: '状态',
                            store: stateStore,
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'abbr',
                            name: 'operInfo.state',
                            value:record.get('state'),
                            allowBlank: true
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: '用户角色',
                            store: roleComStore,
                            displayField: 'roleName',
                            valueField: 'roleId',
                            name: 'operInfo.myAuRoleInfoByRoleId.roleId'
                        }
                    ]
                }
            ],
            buttonAlign: 'center',
            buttons: [
                {
                    text: '确定',
                    handler: param2.updateOperInfo
                },
                {
                    text: '取消',
                    handler: function () {
                        this.up('window').close();
                    }
                },
                {
                    text: '重置',
                    handler: function () {
                        Ext.getCmp('operForm').getForm().reset();
                    }
                }
            ]
        });
        window.show();
        window.center();
    },
    //修改用户方法
    updateOperInfo:function(){
        var form = Ext.getCmp('operUpdateForm').getForm();
        if (form.isValid()) {
            form.submit({
                url: '/updateOperInfo',
                success: function (form,action) {
                    var msg = Ext.JSON.decode(action.response.responseText);
                    if (msg.state) {
                        Ext.MessageBox.show({
                            title: '成功',
                            msg: msg.message,
                            icon: Ext.MessageBox.WARNING,
                            buttons: Ext.MessageBox.YES
                        });
                        Ext.getCmp('operInfoGrid').store.reload();
                        Ext.getCmp('updateOperWindow').close();
                    } else {
                        Ext.MessageBox.show({
                            title: '失败',
                            msg: msg.message,
                            icon: Ext.MessageBox.WARNING,
                            buttons: Ext.MessageBox.YES
                        });
                        Ext.getCmp('operInfoGrid').store.reload();
                        Ext.getCmp('updateOperWindow').close();
                    }

                },
                failure: function (response) {
                    var msg = Ext.JSON.decode(response.responseText);
                    Ext.MessageBox.show({
                        title: '失败',
                        msg: msg.message,
                        icon: Ext.MessageBox.WARNING,
                        buttons: Ext.MessageBox.YES
                    });
                }
            });
        }
    },


    //删除用户方法
    deleteOperInfo: function(){
        var record=Ext.getCmp('operInfoGrid').getSelectionModel().getLastSelected();
        Ext.MessageBox.show({
            title: '删除提示',
            msg: '确实要删除【' + record.get('operName')  + '】吗？',
            icon: Ext.MessageBox.WARNING,
            buttons: Ext.MessageBox.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    Ext.Ajax.request({
                        url: '/deleteOperInfo?operInfo.operId=' + record.get('operId'),
                        success: function (response) {
                            var msg = Ext.JSON.decode(response.responseText);
                            if(msg.state){
                                Ext.MessageBox.show({
                                    title: '删除成功',
                                    msg: msg.message,
                                    icon: Ext.MessageBox.WARNING,
                                    buttons: Ext.MessageBox.YES
                                });
                                Ext.getCmp('operInfoGrid').store.reload();
                            }else{
                                Ext.MessageBox.show({
                                    title: '删除失败',
                                    msg: msg.message,
                                    icon: Ext.MessageBox.WARNING,
                                    buttons: Ext.MessageBox.YES
                                });
                            }
                        },
                        failure: function () {
                           // var msg = Ext.JSON.decode(response.responseText);
                            Ext.MessageBox.show({
                                title: '失败',
                                msg: '失败',
                                icon: Ext.MessageBox.QUESTION,
                                buttons: Ext.MessageBox.YES
                            });
                        }
                    });
                }
            }
        });
    }
});