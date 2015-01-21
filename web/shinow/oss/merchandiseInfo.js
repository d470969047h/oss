Ext.define('shinow.oss.merchandiseInfo', {//商品类别
    extend: 'Ext.grid.Panel',
    itemsPerPage: 100,//全局
    initComponent: function () {
        var me = this, checkBox, store;
        checkBox = Ext.create('Ext.selection.CheckboxModel');
        //store
        store = Ext.create('Ext.data.Store', {
            autoLoad: false,
            fields: [
                {name: 'id', type: 'Integer'},
                {name: 'merchandiseId', type: 'String'},
                {name: 'myMeUnitInfoByUnitId.name', type: 'String'},
                {name: 'myMeProStatusInfoByProStatusId.proStatusName', type: 'String'},
                {name: 'myMeMerchandiseCInfoByMerchandiseCid.merchandiseCName', type: 'String'},
                {name: 'merchandiseName', type: 'String'},
                {name: 'merchandiseAb', type: 'String'},
                {name: 'price', type: 'Float'},
                {name: 'saleStatus', type: 'Boolean'},
                {name: 'spec', type: 'String'},
                {name: 'describe', type: 'String'},
                {name: 'picPath', type: 'String'},
                {name: 'clickCount', type: 'Integer'},
                {name: 'remark', type: 'String'}
            ],
            pageSize: me.itemsPerPage,
            proxy: {
                type: 'ajax',
                url: '/merchandiseInfo',
                reader: {
                    type: 'json',
                    root: 'merchandiseInfoList',
                    totalProperty: 'rowCount'
                }
            },

        //查询时分页监听
            listeners: {
                beforeload: function (store, operation) {
                    var merBH = Ext.getCmp('merID');                          //获取输入框
                    var name = Ext.getCmp('merName');                              //获取输入框
                    if (name || merBH) {
                        if (name.getValue() || merBH.getValue()) {
                            if (operation.params) {                             //获取查询条件
                                operation.params.merchandiseInfoID = merBH.getValue();
                                operation.params.merchandiseInfoName = name.getValue();
                            }
                            else {
                                operation.params = {merchandiseInfoID: merBH.getValue()}
                                operation.params = {merchandiseInfoName: name.getValue()}
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
            title: '商品信息管理',
            closable: true,
            xtype: 'grid',
            flex: 6,
            loadMask: true,//数据加载时有一个蒙版，防止用户误点
            id: 'merchandiseInfoGrid',
            width: '100%',
            store: store,
            //添加checkBox
            selModel: checkBox,
            disableSelection: false,//选择多行
            columns: [
                // {text: '递增流水号', dataIndex: 'id' },
                {text: '商品编码', dataIndex: 'merchandiseId'},
                {text: '商品名称', dataIndex: 'merchandiseName'},
                {text: '商品类别', dataIndex: 'myMeMerchandiseCInfoByMerchandiseCid.merchandiseCName'},
                {text: '单位', dataIndex: 'myMeUnitInfoByUnitId.name'},
                {text: '促销状态', dataIndex: 'myMeProStatusInfoByProStatusId.proStatusName'},
                {text: '商品助记码', dataIndex: 'merchandiseAb'},
                {text: '商品价格', dataIndex: 'price'},
                {text: '销售状态', dataIndex: 'saleStatus', renderer: function (value) {
                    if ((value == 'false') || (value == false)) {
                        return '未销售';
                    }
                    if ((value == 'true') || (true == value)) {
                        return '销售';
                    }
                }
                },
                {text: '规格', dataIndex: 'spec'},
                {text: '描述', dataIndex: 'describe'},
                {text: '图片', dataIndex: 'picPath'},
                {text: '点击数', dataIndex: 'clickCount'},
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

            listeners: {
                select: function () {
                     var record = Ext.getCmp('merchandiseInfoGrid').getSelectionModel().getLastSelected();
                     var window = Ext.create('Ext.window.Window', {
                        title: '商品图片展示',
                        id: 'window',
                        modal:true,
                        items: [
                            {
                                xtype: "panel",
                                border: false,
                                width: 200,
                                height: 200,
                                html: '<img style="height: 200px;width: 200px;" src="'+record.get('picPath')+'"/>'
                            }
                        ],
                        buttonAlign: 'center',
                        buttons: [
                            {
                                text: 'OK',
                                handler: function () {
                                    this.up('window').close();
                                }
                            }
                        ]
                    });
                    window.show();
                    window.center();
                }
            },
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
                    fieldLabel: '商品类别',
                    labelAlign: 'right',
                    name: 'merchandiseInfoC',
                    id: 'merID',
                    allowBlank: true
                },
                {
                    xtype: 'textfield',
                    fieldLabel: '商品名称',
                    labelAlign: 'right',
                    name: 'merchandiseInfoName',//与action的一样
                    id: 'merName',
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
        //商品类别的combobox数据源
        var comboMerCStore = Ext.create('Ext.data.Store', {
            fields: ['merchandiseCid', 'merchandiseCName'],
            proxy: {
                type: 'ajax',
                url: '/merchandiseClass',
                reader: {
                    type: 'json',
                    root: 'merchandiseCList'
                },
                simpleSortMode: true//对单个字段排序
            }
        });
        //单位的combobox数据源
        var comboUnitStore = Ext.create('Ext.data.Store', {
            fields: ['unitId', 'name'],
            proxy: {
                type: 'ajax',
                url: '/unitInfoPaging',
                reader: {
                    type: 'json',
                    root: 'unitInfoList'
                },
                simpleSortMode: true//对单个字段排序
            }
        });
        //促销状态的combobox数据源
        var comboProStore = Ext.create('Ext.data.Store', {
            fields: ['proStatusId', 'proStatusName'],
            proxy: {
                type: 'ajax',
                url: '/proStatus',
                reader: {
                    type: 'json',
                    root: 'proStatusList'
                },
                simpleSortMode: true//对单个字段排序
            }
        });
        //销售状态的combobox数据源
        var comboSaleStore = Ext.create('Ext.data.Store', {
            fields: ['key', 'value'],
            data: [
                {'key': 'true', 'value': '销售'},
                {'key': 'false', 'value': '不销售'}
            ]
        });

        var window = Ext.create('Ext.window.Window', {
                title: '添加商品信息',
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
                            labelAlign: 'right'
                            // labelWidth: 75
                        },
                        defaultType: 'textfield',
                        items: [

                            {
                                fieldLabel: '商品名称',
                                name: 'merInfo.merchandiseName',
                                allowBlank: false
                            },
                            {
                                xtype: 'combobox',
                                fieldLabel: '商品类别',
                                store: comboMerCStore,
                                displayField: 'merchandiseCName',
                                valueField: 'merchandiseCid',
                                name: 'merInfo.myMeMerchandiseCInfoByMerchandiseCid.merchandiseCid',
                                allowBlank: false
                            },
                            {
                                xtype: 'combobox',
                                fieldLabel: '单位',
                                store: comboUnitStore,
                                displayField: 'name',
                                valueField: 'unitId',
                                name: 'merInfo.myMeUnitInfoByUnitId.unitId',
                                allowBlank: false
                            },
                            {
                                xtype: 'combobox',
                                fieldLabel: '促销状态',
                                store: comboProStore,
                                displayField: 'proStatusName',
                                valueField: 'proStatusId',
                                name: 'merInfo.myMeProStatusInfoByProStatusId.proStatusId',
                                allowBlank: false
                            },
                            {
                                fieldLabel: '商品助记码',
                                name: 'merInfo.merchandiseAb',
                                allowBlank: false
                            },
                            {
                                fieldLabel: '商品价格',
                                name: 'merInfo.price',
                                allowBlank: false
                            },
                            {
                                xtype: 'combobox',
                                fieldLabel: '销售状态',
                                store: comboSaleStore,
                                displayField: 'value',
                                valueField: 'key',
                                name: 'merInfo.saleStatus',
                                allowBlank: false
                            },
                            {
                                fieldLabel: '规格',
                                name: 'merInfo.spec',
                                allowBlank: false
                            },
                            {
                                fieldLabel: '描述',
                                name: 'merInfo.describe',
                                allowBlank: false
                            },
                            {
                                xtype: 'filefield',
                                emptyText: '请选择一张图片',
                                fieldLabel: '图片',
                                id: 'merchandiseImg',
                                name: 'merInfo.picPath',
                                buttonText: '',
                                allowBlank: false,
                                buttonConfig: {
                                    iconCls: 'upload-icon'
                                }
                            },
                            {
                                fieldLabel: '点击数',
                                name: 'merInfo.clickCount',
                                allowBlank: false
                            },
                            {
                                fieldLabel: '备注',
                                name: 'merInfo.remark'
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

            }
        );
        window.show();
        window.center();
    },
    //添加数据
    addData: function () {
        var form = this.up('window').down('form').getForm();
        if (form.isValid()) {
            form.submit({
                url: '/AddMerchandiseInfo',
                success: function (form, action) {
                    var msg = Ext.JSON.decode(action.response.responseText);
                    Ext.MessageBox.show({
                        title: '成功',
                        msg: msg.message,
                        icon: Ext.MessageBox.WARNING,
                        buttons: Ext.MessageBox.YES
                    });
                    Ext.getCmp('merchandiseInfoGrid ').store.reload();
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
        //商品类别的combobox数据源
        var comboMerCStore = Ext.create('Ext.data.Store', {
            fields: ['merchandiseCid', 'merchandiseCName'],
            proxy: {
                type: 'ajax',
                url: '/merchandiseClass',
                reader: {
                    type: 'json',
                    root: 'merchandiseCList'
                },
                simpleSortMode: true//对单个字段排序
            }
        });
        //单位的combobox数据源
        var comboUnitStore = Ext.create('Ext.data.Store', {
            fields: ['unitId', 'name'],
            proxy: {
                type: 'ajax',
                url: '/unitInfoPaging',
                reader: {
                    type: 'json',
                    root: 'unitInfoList'
                },
                simpleSortMode: true//对单个字段排序
            }
        });
        //促销状态的combobox数据源
        var comboProStore = Ext.create('Ext.data.Store', {
            fields: ['proStatusId', 'proStatusName'],
            proxy: {
                type: 'ajax',
                url: '/proStatus',
                reader: {
                    type: 'json',
                    root: 'proStatusList'
                },
                simpleSortMode: true//对单个字段排序
            }
        });
        //销售状态的combobox数据源
        var comboSaleStore = Ext.create('Ext.data.Store', {
            fields: ['key', 'value'],
            data: [
                {'key': 'true', 'value': '销售'},
                {'key': 'false', 'value': '不销售'}
            ]
        });
        var record = Ext.getCmp('merchandiseInfoGrid').getSelectionModel().getLastSelected();
        var window = Ext.create('Ext.window.Window', {
            title: '修改商品信息',
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
                            fieldLabel: '商品编码',
                            name: 'merInfo.merchandiseId',
                            value: record.get('merchandiseId'),
                            readOnly: true
                        },
                        {
                            fieldLabel: '商品名称',
                            name: 'merInfo.merchandiseName',
                            value: record.get('merchandiseName'),
                            allowBlank: false
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: '商品类别',
                            store: comboMerCStore,
                            displayField: 'merchandiseCName',
                            valueField: 'merchandiseCid',
                            name: 'merInfo.myMeMerchandiseCInfoByMerchandiseCid.merchandiseCid',
                            value: record.get('myMeMerchandiseCInfoByMerchandiseCid.merchandiseCid'),
                            allowBlank: false
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: '单位',
                            store: comboUnitStore,
                            displayField: 'name',
                            valueField: 'unitId',
                            name: 'merInfo.myMeUnitInfoByUnitId.unitId',
                            value: record.get('unitId'),
                            allowBlank: false
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: '促销状态',
                            store: comboProStore,
                            displayField: 'proStatusName',
                            valueField: 'proStatusId',
                            name: 'merInfo.myMeProStatusInfoByProStatusId.proStatusId',
                            value: record.get('proStatusId'),
                            allowBlank: false
                        },
                        {
                            fieldLabel: '商品助记码',
                            name: 'merInfo.merchandiseAb',
                            value: record.get('merchandiseAb'),
                            allowBlank: false
                        },
                        {
                            fieldLabel: '商品价格',
                            name: 'merInfo.price',
                            value: record.get('price'),
                            allowBlank: false
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: '销售状态',
                            store: comboSaleStore,
                            displayField: 'value',
                            valueField: 'key',
                            name: 'merInfo.saleStatus',
                            value: record.get('key'),
                            allowBlank: false
                        },
                        {
                            fieldLabel: '规格',
                            name: 'merInfo.spec',
                            value: record.get('spec'),
                            allowBlank: false
                        },
                        {
                            fieldLabel: '描述',
                            name: 'merInfo.describe',
                            value: record.get('describe'),
                            allowBlank: false
                        },

                        {
                            fieldLabel: '图片',
                            name: 'merInfo.picPath',
                            value: record.get('picPath'),
                            allowBlank: false
                        },
                        {
                            fieldLabel: '点击数',
                            name: 'merInfo.clickCount',
                            value: record.get('merInfo.clickCount'),
                            allowBlank: false
                        },
                        {
                            fieldLabel: '备注',
                            name: 'merInfo.remark',
                            value: record.get('remark')
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
                url: '/UpdateMerchandiseInfo',
                success: function (form, action) {
                    var msg = Ext.JSON.decode(action.response.responseText);
                    Ext.MessageBox.show({
                        title: '成功',
                        msg: msg.message,
                        icon: Ext.MessageBox.WARNING,
                        buttons: Ext.MessageBox.YES
                    });
                    Ext.getCmp('merchandiseInfoGrid').store.reload();
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

    //删除数据
    deleteWindow: function (delete1) {
        var record = Ext.getCmp('merchandiseInfoGrid').getSelectionModel().getLastSelected();
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
                            fieldLabel: '商品编码',
                            name: 'merInfoPOJO.merchandiseId',
                            value: record.get('merchandiseId'),
                            readOnly: true
                        },
                        {
                            fieldLabel: '商品名称',
                            name: 'merInfoPOJO.merchandiseName',
                            value: record.get('merchandiseName')
                        },
                        {
                            fieldLabel: '商品助记码',
                            name: 'merInfoPOJO.merchandiseAb',
                            value: record.get('merchandiseAb')
                        },
                        {
                            fieldLabel: '商品价格',
                            name: 'merInfoPOJO.price',
                            value: record.get('price')
                        },
                        {
                            fieldLabel: '规格',
                            name: 'merInfoPOJO.spec',
                            value: record.get('spec')
                        },
                        {
                            fieldLabel: '描述',
                            name: 'merInfoPOJO.describe',
                            value: record.get('describe')
                        },
                        {
                            fieldLabel: '图片',
                            name: 'merInfoPOJO.picPath',
                            value: record.get('picPath')
                        },
                        {
                            fieldLabel: '点击数',
                            name: 'merInfoPOJO.clickCount',
                            value: record.get('merInfo.clickCount')
                        },
                        {
                            fieldLabel: '备注',
                            name: 'merInfoPOJO.remark',
                            value: record.get('remark')
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
                url: '/DeleteMerchandiseInfo',
                success: function (form, action) {
                    var Pages = Ext.getCmp('merchandiseInfoGrid').store.currentPage;
                    var msg = Ext.JSON.decode(action.response.responseText);
                    Ext.MessageBox.show({
                        title: '成功',
                        msg: msg.message,
                        icon: Ext.MessageBox.WARNING,
                        buttons: Ext.MessageBox.YES
                    });
                    var count = Ext.getCmp('merchandiseInfoGrid').getStore().getCount();
                    if (count >= 1) {
                        Ext.getCmp('merchandiseInfoGrid').store.reload();
                        Ext.getCmp('window').close();
                    }
                    Ext.getCmp('merchandiseInfoGrid').store.loadPage(Pages);
                    Ext.getCmp('merchandiseInfoGrid').store.reload();
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
        var record = Ext.getCmp('merchandiseInfoGrid').getSelectionModel().getSelection();
        var list = '';
        for (var i = 0, length = Ext.getCmp('merchandiseInfoGrid').getSelectionModel().getSelection().length; i < length; i++) {
            list += record[i].get('merchandiseId');
            if (i != length - 1) {
                list += ',';
            }
        }
        Ext.MessageBox.show({
            title: '删除提示',
            msg: '确实要删除【' + Ext.getCmp('merchandiseInfoGrid').getSelectionModel().getSelection().length + '】条数据吗？',
            icon: Ext.MessageBox.WARNING,
            buttons: Ext.MessageBox.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    Ext.Ajax.request({
                        url: '/DeleteManyMerchandiseInfo?merIn=' + list,
                        success: function (response) {
                            var msg = Ext.JSON.decode(response.responseText);
                            Ext.getCmp('merchandiseInfoGrid').store.reload();
                            Ext.MessageBox.show({
                                title: '成功',
                                msg: msg.message,
                                icon: Ext.MessageBox.WARNING,
                                buttons: Ext.MessageBox.YES
                            });
                        },
                        failure: function (response) {
                            var msg = Ext.JSON.decode(response.responseText);
                            Ext.getCmp('merchandiseInfoGrid').store.reload();
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
        Ext.getCmp('merchandiseInfoGrid').store.load({
            params: {
                merchandiseInfoC: Ext.getCmp('merID').getValue(),
                merchandiseInfoName: Ext.getCmp('merName').getValue()
            }
        });
    }
});
