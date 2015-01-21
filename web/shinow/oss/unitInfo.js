Ext.define('shinow.oss.unitInfo', {//商品类别
    extend: 'Ext.grid.Panel',
    itemsPerPage: 100,//全局
    initComponent: function () {
        var me = this;
        var checkBox = Ext.create('Ext.selection.CheckboxModel');
        //store
        var store = Ext.create('Ext.data.Store', {
            autoLoad: false,
            fields: [
                {name: 'unitId', type: 'Integer'},
                {name: 'name', type: 'String'},
                {name: 'status', type: 'Boolean'},
                {name: 'remark', type: 'String'}
            ],
            pageSize: me.itemsPerPage,
            proxy: {
                type: 'ajax',
                url: '/unitInfoPaging',
                reader: {
                    type: 'json',
                    root: 'unitInfoList',
                    totalProperty: 'rowCount'
                }
            },
            //查询时分页监听
            listeners: {
                beforeload: function (store, operation) {
                    var uBH = Ext.getCmp('uId');                          //获取输入框
                    var Name = Ext.getCmp('uName');                              //获取输入框
                    if (Name || uBH) {
                        if (Name.getValue() || uBH.getValue()) {
                            if (operation.params) {                             //获取查询条件
                                operation.params.unitId = uBH.getValue();
                                operation.params.name = Name.getValue();
                            }
                            else {
                                operation.params = {unitId: uBH.getValue()}
                                operation.params = {name: Name.getValue()}
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
            title: '单位管理',
            closable: true,
            loadMask: true,//数据加载时有一个蒙版，防止用户误点
            id: 'unitInfoGrid',
            width: 400,
            store: store,
            //添加checkBox
            selModel: checkBox,
            disableSelection: false,//选择多行
            columns: [
                {text: '单位编码', dataIndex: 'unitId' },
                {text: '单位名称', dataIndex: 'name'},
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
                    fieldLabel: '单位编码',
                    labelAlign: 'right',
                    name: 'UnitID',
                    id: 'uId',
                    allowBlank: true
                },
                {
                    xtype: 'textfield',
                    fieldLabel: '单位名称',
                    labelAlign: 'right',
                    name: 'UnitName',//与action的一样
                    id: 'uName',
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
        var comboStore = Ext.create('Ext.data.Store', {
            fields: ['abbr', 'name'],
            data: [
                {"abbr": "true", "name": "使用"},
                {"abbr": "false", "name": "停用"}
            ]
        });
        var window = Ext.create('Ext.window.Window', {
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
                            fieldLabel: '单位名称',
                            name: 'unitInfo.name',
                            allowBlank: false
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: '状态',
                            store: comboStore,
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'abbr',
                            name: 'unitInfo.status'
                        },
                        {
                            fieldLabel: '备注',
                            name: 'unitInfo.remark'
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
        var form = this.up('window').down('form').getForm();
        if (form.isValid()) {
            form.submit({
                url: '/AddUnitInfo',
                success: function (form, action) {
                    var msg = Ext.JSON.decode(action.response.responseText);
                    Ext.MessageBox.show({
                        title: '成功',
                        msg: msg.message,
                        icon: Ext.MessageBox.WARNING,
                        buttons: Ext.MessageBox.YES

                    });
                    Ext.getCmp('unitInfoGrid').store.reload();
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
        //combobox的数据源
        var comboStore = Ext.create('Ext.data.Store', {
            fields: ['abbr','name'],
            data: [
                {"abbr": "true", "name": "使用"},
                {"abbr": "false", "name": "停用"}
            ]
        });
        var record = Ext.getCmp('unitInfoGrid').getSelectionModel().getSelection()[0];
        var window = Ext.create('Ext.window.Window', {
            title: '修改单位信息',
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
                            fieldLabel: '单位编码',
                            name: 'unitInfo.unitId',
                            value: record.get('unitId'),
                           // allowBlank: false,
                            readOnly: true,
                            tooltip: '修改单位编码'
                        },
                        {
                            fieldLabel: '单位名称',
                            name: 'unitInfo.name',
                            value: record.get('name'),
                            tooltip: '修改促销状态名称'
                          //  allowBlank: false
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
                            name: 'unitInfo.status'
                        },
                        {
                            fieldLabel: '备注',
                            name: 'unitInfo.remark',
                            value: record.get('remark'),
                            tooltip: '修改备注'
                           // allowBlank: false
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
        var form = this.up('window').down('form').getForm();
        if (form.isValid()) {
            form.submit({
                url: '/UpdateUnitInfo',
                success: function (form, action) {
                    var msg = Ext.JSON.decode(action.response.responseText);
                    Ext.MessageBox.show({
                        title: '成功',
                        msg: msg.message,
                        icon: Ext.MessageBox.WARNING,
                        buttons: Ext.MessageBox.YES
                    });
                    Ext.getCmp('unitInfoGrid').store.reload();
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
        //combobox的数据源
        var comboStore = Ext.create('Ext.data.Store', {
            fields: ['abbr', 'name'],
            data: [
                {"abbr": "true", "name": "使用"},
                {"abbr": "false", "name": "停用"}
            ]
        });
        var record = Ext.getCmp('unitInfoGrid').getSelectionModel().getSelection()[0];
        var window = Ext.create('Ext.window.Window', {
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
                            fieldLabel: '单位编码',
                            name: 'unitInfo.unitId',
                            value: record.get('unitId'),
                            allowBlank: false,
                            readOnly: true,
                            tooltip: '删除促销状态编码'
                        },
                        {
                            fieldLabel: '单位名称',
                            name: 'unitInfo.name',
                            value: record.get('name'),
                            tooltip: '删除单位名称',
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
                            tooltip: '删除状态',
                            readOnly: true,
                            name: 'unitInfo.status'
                        },
                        {
                            fieldLabel: '备注',
                            name: 'unitInfo.remark',
                            value: record.get('remark'),
                            tooltip: '删除备注'
                           // readOnly: true
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
        var record = Ext.getCmp('unitInfoGrid').getSelectionModel().getSelection()[0];
        var form = this.up('window').down('form').getForm();
        if (form.isValid()) {
            form.submit({
                url: '/DeleteUnifInfo',
                success: function (form, action) {
                    var Pages = Ext.getCmp('unitInfoGrid').store.currentPage;
                    var msg = Ext.JSON.decode(action.response.responseText);
                    Ext.MessageBox.show({
                        title: '成功',
                        msg: msg.message,
                        icon: Ext.MessageBox.WARNING,
                        buttons: Ext.MessageBox.YES
                    });
                    var count = Ext.getCmp('unitInfoGrid').getStore().getCount();
                    if (count >= 1) {
                        Ext.getCmp('unitInfoGrid').store.reload();
                        Ext.getCmp('window').close();
                    }
                    Ext.getCmp('unitInfoGrid').store.loadPage(Pages);
                    Ext.getCmp('unitInfoGrid').store.reload();
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

    //多条删除
    deleteMany: function () {
        var record = Ext.getCmp('unitInfoGrid').getSelectionModel().getSelection();
        var list = '';
        for (var i = 0, length = Ext.getCmp('unitInfoGrid').getSelectionModel().getSelection().length; i < length; i++) {
            list += record[i].get('unitId');
            if (i != length - 1) {
                list += ',';
            }
        }
        Ext.MessageBox.show({
            title: '删除提示',
            msg: '确实要删除【' + Ext.getCmp('unitInfoGrid').getSelectionModel().getSelection().length + '】条数据吗？',
            icon: Ext.MessageBox.WARNING,
            buttons: Ext.MessageBox.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    Ext.Ajax.request({
                        url: '/DeleteManyUnitInfo?unit=' + list,
                        success: function (response) {
                            var msg = Ext.JSON.decode(response.responseText);
                            Ext.getCmp('unitInfoGrid').store.reload();
                            Ext.MessageBox.show({
                                title: '成功',
                                msg: msg.message,
                                icon: Ext.MessageBox.WARNING,
                                buttons: Ext.MessageBox.YES
                            });
                        },
                        failure: function (response) {
                            var msg = Ext.JSON.decode(response.responseText);
                            Ext.getCmp('unitInfoGrid').store.reload();
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
        Ext.getCmp('unitInfoGrid').store.load({
            params: {
                UnitID: Ext.getCmp('uId').getValue(),
                UnitName: Ext.getCmp('uName').getValue()
            }
        });
    }

});
