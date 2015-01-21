Ext.define('shinow.oss.proStatus', {//商品类别
    extend: 'Ext.grid.Panel',
    id:'MyproStatus',
    itemsPerPage: 150,//全局
    initComponent: function () {
        var me = this,checkBox,store;
         checkBox = Ext.create('Ext.selection.CheckboxModel');
        //store
         store = Ext.create('Ext.data.Store', {
            autoLoad: false,
            fields: [
                {name: 'proStatusId', type: 'Short'},
                {name: 'proStatusName', type: 'String'},
                {name: 'status', type: 'Boolean'},
                {name: 'remark', type: 'String'}
            ],
            pageSize: me.itemsPerPage,
             proxy: {
                type: 'ajax',
                url: '/proStatus',
                reader: {
                    type: 'json',
                    root: 'proStatusList',
                    totalProperty: 'rowCount'
                }
            },
             //查询时分页监听
             listeners: {
                beforeload: function (store, operation) {
                    var proBH,proName;
                     proBH = Ext.getCmp('proSId');                          //获取输入框
                     proName = Ext.getCmp('proSName');                              //获取输入框
                    if (proName || proBH) {
                        if (proName.getValue() || proBH.getValue()) {
                            if (operation.params) {                             //获取查询条件
                                operation.params.proStatusId = proBH.getValue();
                                operation.params.proStatusName = proName.getValue();
                            }
                            else {
                                operation.params = {proStatusId: proBH.getValue()}
                                operation.params = {proStatusName: proName.getValue()}
                            }
                        }
                    }
                }
            }
        });

        store.load({
            params: {
                start: 0,
                limit: me.itemsPerPage
            }
        });

        Ext.apply(this, {
            title: '促销状态管理',
            closable: true,
            loadMask: true,//数据加载时有一个蒙版，防止用户误点
            id: 'proStatus',
            width: 400,
            store: store,
            //添加checkBox
            selModel: checkBox,
            disableSelection: false,//选择多行
            columns: [
                {text: '促销状态编码', dataIndex: 'proStatusId' },
                {text: '促销状态名称', dataIndex: 'proStatusName'},
                {text: '状态', dataIndex: 'status', renderer: function (value) {
                    if ((value == 'false') || (value == false)) {
                        return '未启用';
                    }
                    if ((value == 'true') || (true == value)) {
                        return '启用';
                    }
                }
                },
                {text: '备注', dataIndex: 'remark'}
            ],
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    store: store,
                    dock: 'bottom',
                    displayInfo: true
                }
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: '添加',
                    handler: function () {
                        me.AddWindow(me)
                    }
                },
                {
                    xtype: 'button',
                    text: '删除单条',
                    handler: function () {
                        me.deleteWindow(me)
                    }
                },
                {
                    xtype: 'button',
                    text: '删除多条',
                    handler: me.deleteMany

                },
                {
                    xtype: 'button',
                    text: '修改',
                    handler: function () {
                        me.updateWindow(me)
                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: '促销状态编码',
                    labelAlign: 'right',
                    name: 'ProStatusID',
                    id: 'proSId',
                    allowBlank: true
                },
                {
                    xtype: 'textfield',
                    fieldLabel: '促销状态名称',
                    labelAlign: 'right',
                    name: 'ProStatusName',//与action的一样
                    id: 'proSName',
                    allowBlank: true
                },
                {
                    xtype: 'button',
                    text: '查询',
                    handler: me.queryData
                }

            ]
        });
        this.callParent();
    },

    //添加数据window
    AddWindow: function (add) {
        //combobox的数据源
        var comboStore,window;
         comboStore = Ext.create('Ext.data.Store', {
            fields: ['abbr', 'name'],
            data: [
                {"abbr": "true", "name": "使用"},
                {"abbr": "false", "name": "停用"}
            ]
        });
         window = Ext.create('Ext.window.Window', {
            title: '添加商品分类',
            id: 'window',
            modal: true,        //添加一个蒙版
            items: [
                {
                    xtype: 'form',
                    border: false,
                    id: 'addForm',
                    frame: true,
                    bodyPadding: '5 5 0',
                    width: 390,
                    fieldDefaults: {
                        msgTarget: 'side',
                        labelAlign: 'right',
                        labelWidth: 75
                    },
                    defaultType: 'textfield',
                    items: [
                        {
                            fieldLabel: '促销状态名称',
                            name: 'proSInfo.proStatusName',
                            allowBlank: false
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: '状态',
                            store: comboStore,
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'abbr',
                            name: 'proSInfo.status'
                        },
                        {
                            fieldLabel: '备注',
                            name: 'proSInfo.remark',
                            allowBlank: false
                        }
                    ]
                }
            ],
            buttonAlign: 'center',
            buttons: [
                {
                    text: '确定',
                    handler: add.addData
                },
                {
                    text: '取消',
                    handler: function () {
                        this.up('window').close();
                    }
                },


                {
                    text: '清空',
                    handler: function () {
                        Ext.getCmp('addForm').getForm().reset();
                    }
                }
            ]

        });
        window.show();
        window.center();

    },
    //添加数据
    addData: function () {
        var form;
         form = this.up('window').down('form').getForm();
        if (form.isValid()) {
            form.submit({
                url: '/AddProStatus',
                success: function (form, action) {
                    var msg = Ext.JSON.decode(action.response.responseText);
                    Ext.MessageBox.show({
                        title: '成功',
                        msg: msg.message,
                        icon: Ext.MessageBox.WARNING,
                        buttons: Ext.MessageBox.YES

                    });
                    Ext.getCmp('proStatus').store.reload();
                    Ext.getCmp('window').close();

                },
                failure: function (form, action) {
                    var msg = Ext.JSON.decode(action.response.responseText);
                    Ext.MessageBox.show({
                        title: '失败',
                        msg: msg.message,
                        icon: Ext.MessageBox.QUESTION,
                        buttons: Ext.MessageBox.YES

                    });
                }
            });
        }
    },

    //修改数据
    updateWindow: function (update) {
        var comboStore,record,window;
        //combobox的数据源
         comboStore = Ext.create('Ext.data.Store', {
            fields: ['abbr', 'name'],
            data: [
                {"abbr": "true", "name": "使用"},
                {"abbr": "false", "name": "停用"}
            ]
        });
         record = Ext.getCmp('proStatus').getSelectionModel().getLastSelected();
         window = Ext.create('Ext.window.Window', {
            title: '修改商品分类',
            id: 'window',
            modal: true,        //添加一个蒙版
            items: [
                {
                    xtype: 'form',
                    border: false,
                    id: 'updateForm',
                    frame: true,
                    bodyPadding: '5 5 0',
                    width: 390,
                    fieldDefaults: {
                        msgTarget: 'side',
                        labelAlign: 'right',
                        labelWidth: 75
                    },
                    defaultType: 'textfield',
                    items: [
                        {
                            fieldLabel: '促销状态编码',
                            name: 'proSInfo.proStatusId',
                            value: record.get('proStatusId'),
                            allowBlank: false,
                            readOnly: true,
                            tooltip: '修改促销状态编码'
                        },
                        {
                            fieldLabel: '促销状态名称',
                            name: 'proSInfo.proStatusName',
                            value: record.get('proStatusName'),
                            tooltip: '修改促销状态名称',
                            allowBlank: false
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: '状态',
                            store: comboStore,
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'abbr',
                            value: record.get('status'),
                            tooltip: '修改促销状态',
                            name: 'proSInfo.status'
                        },
                        {
                            fieldLabel: '备注',
                            name: 'proSInfo.remark',
                            value: record.get('remark'),
                            tooltip: '修改备注',
                            allowBlank: false
                        }
                    ]
                }
            ],
            buttonAlign: 'center',
            buttons: [
                {
                    text: '确定',
                    handler: update.updateData
                },
                {
                    text: '取消',
                    handler: function () {
                        this.up('window').close();
                    }
                }

            ]

        });
        window.show();
        window.center();

    },
    //修改数据
    updateData: function () {
        var form;
         form = this.up('window').down('form').getForm();
        if (form.isValid()) {
            form.submit({
                url: '/UpdateProStatus',
                success: function (form, action) {
                    var msg = Ext.JSON.decode(action.response.responseText);
                    Ext.MessageBox.show({
                        title: '成功',
                        msg: msg.message,
                        icon: Ext.MessageBox.WARNING,
                        buttons: Ext.MessageBox.YES
                    });
                    Ext.getCmp('proStatus').store.reload();
                    Ext.getCmp('window').close();

                },
                failure: function (form, action) {
                    var msg = Ext.JSON.decode(action.response.responseText);
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

    //删除数据
    deleteWindow: function (delete1) {
        var comboStore,record,window;
        //combobox的数据源
         comboStore = Ext.create('Ext.data.Store', {
            fields: ['abbr', 'name'],
            data: [
                {"abbr": "true", "name": "使用"},
                {"abbr": "false", "name": "停用"}
            ]
        });
         record = Ext.getCmp('proStatus').getSelectionModel().getLastSelected();
         window = Ext.create('Ext.window.Window', {
            title: '确定删除该条记录吗？',
            id: 'window',
            modal: true,        //添加一个蒙版
            items: [
                {
                    xtype: 'form',
                    border: false,
                    id: 'deleteForm',
                    frame: true,
                    bodyPadding: '5 5 0',
                    width: 390,
                    fieldDefaults: {
                        msgTarget: 'side',
                        labelAlign: 'right',
                        labelWidth: 75
                    },
                    defaultType: 'textfield',
                    items: [
                        {
                            fieldLabel: '促销状态编码',
                            name: 'proSInfo.proStatusId',
                            value: record.get('proStatusId'),
                            allowBlank: false,
                            readOnly: true,
                            tooltip: '删除促销状态编码'
                        },
                        {
                            fieldLabel: '促销状态名称',
                            name: 'proSInfo.proStatusName',
                            value: record.get('proStatusName'),
                            tooltip: '删除促销状态名称',
                            readOnly: true
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: '状态',
                            store: comboStore,
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'abbr',
                            value: record.get('status'),
                            tooltip: '删除促销状态',
                            readOnly: true,
                            name: 'proSInfo.status'
                        },
                        {
                            fieldLabel: '备注',
                            name: 'proSInfo.remark',
                            value: record.get('remark'),
                            tooltip: '删除备注',
                            readOnly: true
                        }
                    ]
                }
            ],
            buttonAlign: 'center',
            buttons: [
                {
                    text: '确定',
                    handler: delete1.deleteData
                },
                {
                    text: '取消',
                    handler: function () {
                        this.up('window').close();
                    }
                }

            ]

        });
        window.show();
        window.center();

    },
    //删除单条数据
    deleteData: function () {
        var form,Pages,msg,count;
         form = this.up('window').down('form').getForm();
        if (form.isValid()) {
            form.submit({
                url: '/DeleteProStatus',
                success: function (form, action) {
                     Pages = Ext.getCmp('proStatus').store.currentPage;
                     msg = Ext.JSON.decode(action.response.responseText);
                    Ext.MessageBox.show({
                        title: '成功',
                        msg: msg.message,
                        icon: Ext.MessageBox.WARNING,
                        buttons: Ext.MessageBox.YES
                    });
                     count = Ext.getCmp('proStatus').getStore().getCount();
                    if (count >= 1) {
                        Ext.getCmp('proStatus').store.reload();
                        Ext.getCmp('window').close();
                    }
                    Ext.getCmp('proStatus').store.loadPage(Pages);
                    Ext.getCmp('proStatus').store.reload();
                    Ext.getCmp('window').close();
                },
                failure: function (form, action) {
                     msg = Ext.JSON.decode(action.response.responseText);
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

    //多条删除
    deleteMany: function () {
        var record,list,msg;
         record = Ext.getCmp('proStatus').getSelectionModel().getSelection();
         list = '';
        for (var i = 0, length = Ext.getCmp('proStatus').getSelectionModel().getSelection().length; i < length; i++) {
            list += record[i].get('proStatusId');
            if (i != length - 1) {
                list += ',';
            }
        }
        Ext.MessageBox.show({
            title: '删除提示',
            msg: '确实要删除【' + Ext.getCmp('proStatus').getSelectionModel().getSelection().length + '】条数据吗？',
            icon: Ext.MessageBox.WARNING,
            buttons: Ext.MessageBox.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    Ext.Ajax.request({
                        url: '/DeleteManyProStatus?proS=' + list,
                        success: function (response) {
                             msg = Ext.JSON.decode(response.responseText);
                            Ext.getCmp('proStatus').store.reload();
                            Ext.MessageBox.show({
                                title: '成功',
                                msg: msg.message,
                                icon: Ext.MessageBox.WARNING,
                                buttons: Ext.MessageBox.YES
                            });
                        },
                        failure: function (response) {
                             msg = Ext.JSON.decode(response.responseText);
                            Ext.getCmp('proStatus').store.reload();
                            Ext.MessageBox.show({
                                title: '失败',
                                msg: msg.message,
                                icon: Ext.MessageBox.QUESTION,
                                buttons: Ext.MessageBox.YES
                            });
                        }
                    });
                }
            }
});
},

//查询数据
queryData: function () {
    Ext.getCmp('proStatus').store.load({
        params: {
            ProStatusID: Ext.getCmp('proSId').getValue(),
            ProStatusName: Ext.getCmp('proSName').getValue()
        }
    });
}

});
