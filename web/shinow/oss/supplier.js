Ext.define('shinow.oss.supplier', {//供应商
    extend: 'Ext.grid.Panel',
//    requires: [
//        'Ext.ux.grid.filter.StringFilter',
//        'Ext.ux.grid.filter.NumericFilter',
//        'Ext.ux.grid.FiltersFeature'
//    ],
    itemsPerPage: 150,//全局
    initComponent: function () {
        var me = this;
        var checkBox=Ext.create('Ext.selection.CheckboxModel');
        //store
        var store = Ext.create('Ext.data.Store', {
            autoLoad: false,
            fields: [
                {name:'id',type:'int'},
                {name:'supplierId',type:'String'},
                {name:'supplierName',type:'String'},
                {name:'supplierAb',type:'String'},
                {name:'address',type:'String'},
                {name:'linkName',type:'String'},
                {name:'linkTel',type:'String'},
                {name:'qq',type:'String'},
                {name:'email',type:'String'},
                {name:'sortId',type:'Integer'},
                {name:'state',type:'Boolean'}
            ],
            pageSize: me.itemsPerPage,
            proxy: {
                type: 'ajax',
                url: '/Supplier',
                reader: {
                    type: 'json',
                    root: 'supplierList',
                    totalProperty: 'rowCount'
                }
            },
            //查询时分页监听
            listeners: {
                beforeload: function (store, operation) {
                    var supBH = Ext.getCmp('supId');                          //获取输入框
                    var name = Ext.getCmp('supName');                              //获取输入框
                    if (name || supBH) {
                        if (name.getValue() || supBH.getValue()) {
                            if (operation.params) {                             //获取查询条件
                                operation.params.supplierId = supBH.getValue();
                                operation.params.supplierName = name.getValue();
                            }
                            else {
                                operation.params = {supplierId: supBH.getValue()}
                                operation.params = {supplierName: name.getValue()}
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
            title: '供应商管理',
            closable: true,
            loadMask: true,//数据加载时有一个蒙版，防止用户误点
            id: 'supplier',
            width: 400,
            store: store,
            //添加checkBox
            selModel:checkBox,
            disableSelection:false,//多选
            columns: [
                {text:'递增流水号',dataIndex:'id' },
                {text:'供应商编码',dataIndex:'supplierId'},
                {text:'供应商名称',dataIndex:'supplierName'},
                {text:'供应商助记码',dataIndex:'supplierAb'},
                {text:'地址',dataIndex:'address'},
                {text:'联系人',dataIndex:'linkName'},
                {text:'联系电话',dataIndex:'linkTel'},
                {text:'QQ',dataIndex:'qq'},
                {text:'Email',dataIndex:'email'},
                {text:'排序编码',dataIndex:'sortId'},
                {text: '状态', dataIndex: 'state', renderer: function (value) {
                    if ((value == 'false') || (value == false)) {
                        return '未启用';
                    }
                    if ((value == 'true') || (true == value)) {
                        return '启用';
                    }
                }
                }
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
                    text: '单条删除',
                    handler: function () {
                        me.deleteWindow(me)
                    }
                },
                {
                    xtype: 'button',
                    text: '多条删除',
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
                    fieldLabel: '供应商编号',
                    labelAlign: 'right',
                    name: 'supplierId',
                    id: 'supId',
                    allowBlank: true
                },
                {
                    xtype: 'textfield',
                    fieldLabel: '供应商名称',
                    labelAlign: 'right',
                    name: 'supplierName',
                    id: 'supName',
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
            data : [
                {"abbr":"true", "name":"开启"},
                {"abbr":"false", "name":"关闭"}
            ]
        });
        var window = Ext.create('Ext.window.Window', {
            title: '添加数据',
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
                            fieldLabel: '供应商编码',
                            name: 'supInfo.supplierId',
                            allowBlank: false
                        },
                        {
                            fieldLabel: '供应商名称',
                            name: 'supInfo.supplierName',
                            allowBlank: false
                        },
                        {
                            fieldLabel: '供应商助记码',
                            name: 'supInfo.supplierAb',
                            allowBlank: false
                        },
                        {
                            fieldLabel: '地址',
                            name: 'supInfo.address',
                            allowBlank: false
                        },
                        {
                            fieldLabel: '联系人',
                            name: 'supInfo.linkName',
                            allowBlank: false
                        },
                        {
                            fieldLabel: '联系电话',
                            name: 'supInfo.linkTel',
                            allowBlank: false
                        },
                        {
                            fieldLabel: 'QQ',
                            name: 'supInfo.qq',
                            allowBlank: false
                        },
                        {
                            fieldLabel: 'Email',
                            name: 'supInfo.email',
                            allowBlank: false
                        },
                        {
                            fieldLabel: '排序编码',
                            name: 'supInfo.sortId',
                            allowBlank: false
                        },
                        {
                           xtype:'combobox',
                            fieldLabel: '状态',
                            store: comboStore,
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'abbr',
                            name: 'supInfo.state'
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
                url: '/AddSupplier',
                success: function (form, action) {
                    var msg = Ext.JSON.decode(action.response.responseText);
                    Ext.MessageBox.show({
                        title:'成功',
                        msg:msg.message,
                        icon:Ext.MessageBox.WARNING,
                        buttons:Ext.MessageBox.YESNO

                    });
                    Ext.getCmp('supplier').store.reload();
                    Ext.getCmp('window').close();

                },
                failure: function (form, action) {
                    var msg = Ext.JSON.decode(action.response.responseText);
                    Ext.MessageBox.show({
                        title:'失败',
                        msg:msg.message,
                        icon:Ext.MessageBox.QUESTION,
                        buttons:Ext.MessageBox.YES

                    });
                }
            });
        }
    },

    //修改数据
    updateWindow: function (update) {
        //combobox的数据源
        var comboStore = Ext.create('Ext.data.Store', {
            fields: ['abbr', 'name'],
            data : [
                {"abbr":"true", "name":"开启"},
                {"abbr":"false", "name":"关闭"}
            ]
        });
        var record=Ext.getCmp('supplier').getSelectionModel().getLastSelected();
       // var record = Ext.getCmp('grid').getSelectionModel().getSelection()[0];
        var window = Ext.create('Ext.window.Window', {
            title: '修改数据',
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
                            fieldLabel: '递增流水号',
                            name: 'supInfo.id',
                            value:record.get('id'),
                            readOnly:true,
                            tooltip: '供应商递增流水号不允许修改'
                        },
                        {
                            fieldLabel: '供应商编码',
                            name: 'supInfo.supplierId',
                            value:record.get('supplierId'),
                            allowBlank: false,
                            tooltip: '修改供应商编码'
                        },
                        {
                            fieldLabel: '供应商名称',
                            name: 'supInfo.supplierName',
                            value:record.get('supplierName'),
                            tooltip:'修改供应商名称',
                            allowBlank: false
                        },
                        {
                            fieldLabel: '供应商助记码',
                            name: 'supInfo.supplierAb',
                            value:record.get('supplierAb'),
                            tooltip:'修改供应商助记码',
                            allowBlank: false
                        },
                        {
                            fieldLabel: '地址',
                            name: 'supInfo.address',
                            value:record.get('address'),
                            tooltip:'修改供应商地址',
                            allowBlank: false
                        },
                        {
                            fieldLabel: '联系人',
                            name: 'supInfo.linkName',
                            value:record.get('linkName'),
                            tooltip:'修改供应商联系人',
                            allowBlank: false
                        },
                        {
                            fieldLabel: '联系电话',
                            name: 'supInfo.linkTel',
                            value:record.get('linkTel'),
                            tooltip:'修改供应商联系电话',
                            allowBlank: false
                        },
                        {
                            fieldLabel: 'QQ',
                            name: 'supInfo.qq',
                            value:record.get('qq'),
                            tooltip:'修改供应商qq',
                            allowBlank: false
                        },
                        {
                            fieldLabel: 'Email',
                            name: 'supInfo.email',
                            value:record.get('email'),
                            tooltip:'修改供应商email',
                            allowBlank: false
                        },
                        {
                            fieldLabel: '排序编码',
                            name: 'supInfo.sortId',
                            value:record.get('sortId'),
                            tooltip:'供应商排序编码不允许修改',
                            readOnly:true
                        },
                        {
                            xtype:'combobox',
                            fieldLabel: '状态',
                            store: comboStore,
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'abbr',
                            value:record.get('state'),
                            tooltip:'修改供应商状态',
                            name: 'supInfo.state'
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
                url: '/UpdateSupplier',
                success: function (form, action) {
                    var msg = Ext.JSON.decode(action.response.responseText);
                  Ext.MessageBox.show({
                     title:'成功',
                      msg:msg.message,
                      icon:Ext.MessageBox.WARNING,
                      buttons:Ext.MessageBox.YES
                  });
                    Ext.getCmp('supplier').store.reload();
                    Ext.getCmp('window').close();

                },
                failure: function (form, action) {
                    var msg = Ext.JSON.decode(action.response.responseText);
                    Ext.MessageBox.show({
                        title:'失败',
                        msg:msg.message,
                        icon:Ext.MessageBox.WARNING,
                        buttons:Ext.MessageBox.YES
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
            data : [
                {"abbr":"true", "name":"开启"},
                {"abbr":"false", "name":"关闭"}
            ]
        });
        var record = Ext.getCmp('supplier').getSelectionModel().getLastSelected();
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
                            fieldLabel: '递增流水号',
                            name: 'supInfo.id',
                            value:record.get('id'),
                            readOnly:true,
                            tooltip: '供应商递增流水号不允许修改'
                        },
                        {
                            fieldLabel: '供应商编码',
                            name: 'supInfo.supplierId',
                            value:record.get('supplierId'),
                            readOnly:true,
                            tooltip: '修改供应商编码'
                        },
                        {
                            fieldLabel: '供应商名称',
                            name: 'supInfo.supplierName',
                            value:record.get('supplierName'),
                            tooltip:'修改供应商名称',
                            readOnly:true
                        },
                        {
                            fieldLabel: '供应商助记码',
                            name: 'supInfo.supplierAb',
                            value:record.get('supplierAb'),
                            tooltip:'修改供应商助记码',
                            readOnly:true
                        },
                        {
                            fieldLabel: '地址',
                            name: 'supInfo.address',
                            value:record.get('address'),
                            tooltip:'修改供应商地址',
                            readOnly:true
                        },
                        {
                            fieldLabel: '联系人',
                            name: 'supInfo.linkName',
                            value:record.get('linkName'),
                            tooltip:'修改供应商联系人',
                            readOnly:true
                        },
                        {
                            fieldLabel: '联系电话',
                            name: 'supInfo.linkTel',
                            value:record.get('linkTel'),
                            tooltip:'修改供应商联系电话',
                            readOnly:true
                        },
                        {
                            fieldLabel: 'QQ',
                            name: 'supInfo.qq',
                            value:record.get('qq'),
                            tooltip:'修改供应商qq',
                            readOnly:true
                        },
                        {
                            fieldLabel: 'Email',
                            name: 'supInfo.email',
                            value:record.get('email'),
                            tooltip:'修改供应商email',
                            readOnly:true
                        },
                        {
                            fieldLabel: '排序编码',
                            name: 'supInfo.sortId',
                            value:record.get('sortId'),
                            tooltip:'供应商排序编码不允许修改',
                            readOnly:true
                        },
                        {
                            xtype:'combobox',
                            fieldLabel: '状态',
                            store: comboStore,
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'abbr',
                            value:record.get('state'),
                            tooltip:'修改供应商状态',
                            name: 'supInfo.state',
                            readOnly:true
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
        var form = this.up('window').down('form').getForm();
        if (form.isValid()) {
            form.submit({
                url: '/DeleteSupplier',
                success: function (form, action) {
                    var Pages = Ext.getCmp('supplier').store.currentPage;
                    var msg = Ext.JSON.decode(action.response.responseText);
                    Ext.MessageBox.show({
                        title:'成功',
                        msg:msg.message,
                        icon:Ext.MessageBox.WARNING,
                        buttons:Ext.MessageBox.YES
                    });
                    var count=Ext.getCmp('supplier').getStore().getCount();
                    if(count>=1){
                        Ext.getCmp('supplier').store.reload();
                        Ext.getCmp('window').close();
                    }
                    Ext.getCmp('supplier').store.loadPage(Pages);
                    Ext.getCmp('supplier').store.reload();
                    Ext.getCmp('window').close();
                },
                failure: function (form, action) {
                    var msg = Ext.JSON.decode(action.response.responseText);
                    Ext.MessageBox.show({
                        title:'失败',
                        msg:msg.message,
                        icon:Ext.MessageBox.WARNING,
                        buttons:Ext.MessageBox.YES
                    });
                }
            });
        }
    },
    //多条删除
    deleteMany:function(){
        var record=Ext.getCmp('supplier').getSelectionModel().getSelection();
        var list='';
        for(var i= 0,length=Ext.getCmp('supplier').getSelectionModel().getSelection().length;i<length;i++){
            list+=record[i].get('supplierId');
            if(i!=length-1){
                list+=',';
            }
        }
        Ext.MessageBox.show({
            title:'删除提示',
            msg:'确实要删除【'+Ext.getCmp('supplier').getSelectionModel().getSelection().length+'】条数据吗？',
            icon:Ext.MessageBox.WARNING,
            buttons:Ext.MessageBox.YESNO,
            fn:function(btn){
                if(btn=='yes'){
                    Ext.Ajax.request({
                        url:'/DeleteManySupplier?manySupplier='+list,
                        success:function(response){
                            var msg=Ext.JSON.decode(response.responseText);
                            Ext.getCmp('supplier').store.reload();
                            Ext.MessageBox.show({
                              title:'成功',
                              msg:msg.message,
                              icon:Ext.MessageBox.WARNING,
                              buttons:Ext.MessageBox.YES
                            });
                        },
                        failure:function(response){
                            var msg=Ext.JSON.decode(response.responseText);
                            Ext.getCmp('supplier').store.reload();
                            Ext.MessageBox.show({
                                title:'失败',
                                msg:msg.message,
                                icon:Ext.MessageBox.QUESTION,
                                buttons:Ext.MessageBox.YES
                            });
                        }
                    });
                }
            }
        });
    },

    //查询数据
    queryData: function () {
        Ext.getCmp('supplier').store.load({
            params: {
                supplierId: Ext.getCmp('supId').getValue(),
                supplierName: Ext.getCmp('supName').getValue()
            }
        });
    }

});
