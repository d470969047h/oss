/**
 * Created by daihui on 2014-11-20.
 */
Ext.define('shinow.oss.inStockQuery', {
    extend: 'Ext.panel.Panel',
    //统计图引入
    require: [
        'Ext.chart.*',
        'Ext.layout.container.Fit',
        'Ext.window.MessageBox',
        'Ext.grid.Panel'
    ],
    id: 'MyinStockQuery',
    myCode: '',
    myName: '',
    totalmoney: '',
    nowEditRecord: {},
    itemsPerPage:150,//全局
    initComponent: function () {
        var curdate = new Date();
        var curtime = Ext.Date.format(curdate, 'Y-m-d H:i:s');
        var me = this, northStore, cellEditing1, cellEditing2, comboOperStore, SupplierStore, MerInfoStore, InTypeStore;
        //操作员的combobox数据源
        comboOperStore = Ext.create('Ext.data.Store', {
            fields: ['operId', 'operName'],
            proxy: {
                type: 'ajax',
                url: '/operPagingInfo',
                reader: {
                    type: 'json',
                    root: 'operInfoList'
                }
            }
        });
        //供应商的combobox数据源
        SupplierStore = Ext.create('Ext.data.Store', {
            fields: ['supplierId', 'supplierName'],
            proxy: {
                type: 'ajax',
                url: '/Supplier',
                reader: {
                    type: 'json',
                    root: 'supplierList'
                }
            }
        });
        //商品信息的combobox数据源
        MerInfoStore = Ext.create('Ext.data.Store', {
            fields: ['merchandiseId', 'merchandiseName'],
            proxy: {
                type: 'ajax',
                url: '/merchandiseInfo',
                reader: {
                    type: 'json',
                    root: 'merchandiseInfoList'
                }
            }
        });
        //入库方式的combobox数据源
        InTypeStore = Ext.create('Ext.data.Store', {
            fields: ['value', 'label'],
            data: [
                {value: '1', label: '正常入库'},
                {value: '2', label: '报溢'},
                {value: '3', label: '盘盈'}
            ]
        });

        northStore = Ext.create('Ext.data.Store', {
            pageSize: me.itemsPerPage,
            autoLoad: false,
            fields: [
                {name: 'billCode', type: 'String'},
                {name: 'myAuOperInfoByOperId.operName', type: 'String'},
                {name: 'myBaSupplierInfoBySupplierId.supplierName', type: 'String'},
                {name: 'myAuOperInfoByOperId.operId', type: 'String'},
                {name: 'myBaSupplierInfoBySupplierId.supplierId', type: 'String'},
                {name: 'inType', type: 'Byte'},
                {name: 'inTime', type: 'Timestamp'},
                {name: 'totalMoney', type: 'Float'},
                {name: 'handler', type: 'String'},
                {name: 'remark', type: 'String'}
            ],
            proxy: {
                type: 'ajax',
                url: '/inStockPaging',
                reader: {
                    type: 'json',
                    root: 'inStockList',
                    totalProperty: 'rowCount'
                }
            },
            //查询时分页监听
            listeners: {
                beforeload: function (store, operation) {
                    var inHandler;
                    inHandler = Ext.getCmp('inHandler');                              //获取输入框
                    if (inHandler) {
                        if (inHandler.getValue()) {
                            if (operation.params) {                             //获取查询条件
                                operation.params.inStockHandler = inHandler.getValue();
                            }
                            else {
                                operation.params = {inStockHandler: inHandler.getValue()}
                            }
                        }
                    }
                }
            }
        });
        northStore.load({
            params: {
                start: 0,
                limit: me.itemsPerPage
            }
        });

        cellEditing1 = new Ext.grid.plugin.CellEditing(
            {
                clicksToEdit: 2,//单击几次可编辑
                listeners: {
                    edit: function (editor, context) {
                        if (context.value) {
                            var myupdateStore = Ext.data.StoreManager.lookup("myUpdateStore");
                            if (context.field === 'inStockMerName') {
                                context.record.set('inStockMerNameHidden', me.myCode);
                                context.record.set('inStockMerName', me.myName);
                            }
                            if (context.field === "num") {
                                if (context.record.data.price) {
                                    context.record.set('total', context.record.data.price * context.value);
                                }
                            }
                            if (context.field === "price") {
                                if (context.record.data.num) {
                                    context.record.set('total', context.record.data.num * context.value);
                                }
                            }
                            me.totalmoney = 0;
                            if (myupdateStore.data.items.length === 0) {
                                me.totalmoney = 0;
                            } else {
                                for (var i = 0; i < myupdateStore.data.items.length; i++) {
                                    if (!isNaN(myupdateStore.data.items[i].data.total) && myupdateStore.data.items[i].data.total != "") {
                                        me.totalmoney += myupdateStore.data.items[i].data.total;
                                    }
                                }
                            }
                            var parentStore = Ext.getCmp('stockNorthGrid').store;
                            me.nowEditRecord.data.totalMoney = me.totalmoney;
                            var parentIndex = parentStore.indexOf(me.nowEditRecord);
                            parentStore.remove(me.nowEditRecord);
                            parentStore.insert(parentIndex, me.nowEditRecord);
                        }
                    }
                }
            }
        );
        cellEditing2 = new Ext.grid.plugin.CellEditing({
        });

        Ext.apply(this, {
            title: '商品入库查询',
            id: 'inStockQueryGrid',
            layout: 'border',
            border: false,
            loadMask: {msg: '加载数据中，请稍候...'},//数据加载时有一个蒙版，防止用户误点
            closable: true,
            items: [
                {
                    xtype: 'grid',
                    region: 'north',
                    id: "stockNorthGrid",
                    width: '100%',
                    flex: 1,
                    plugins: cellEditing2,
                    autoScroll: true,
                    store: northStore,
                    columns: [
                        {
                            text: '入库单号',
                            dataIndex: 'billCode',
                            hidden: true
                        },
                        {
                            text: '操作员',
                            dataIndex: 'myAuOperInfoByOperId.operName',
                            editor: {
                                allowBlank: false,
                                xtype: "combobox",
                                store: comboOperStore,
                                displayField: 'operName',
                                valueField: 'operId'
                            }
                        },
                        {
                            text: '供应商',
                            dataIndex: 'myBaSupplierInfoBySupplierId.supplierName',
                            editable: true,
                            editor: {
                                allowBlank: false,
                                xtype: "combobox",
                                store: SupplierStore,
                                displayField: 'supplierName',
                                valueField: 'supplierId'
                            }
                        },
                        {
                            text: '入库方式',
                            dataIndex: 'inType',
                            editor: {
                                xtype: "combobox",
                                name: "instockinfo.inType",
                                store: InTypeStore,
                                displayField: "label",
                                valueField: "value"
                            },
                            renderer: function (value) {
                                if ((value == '1') || (value == 1)) {
                                    return '正常入库';
                                }
                                if ((value == '2') || (value == 2)) {
                                    return '报溢';
                                }
                                if ((value == '3') || (value == 3)) {
                                    return '盘盈';
                                }
                            }
                        },
                        {
                            text: '入库时间',
                            dataIndex: 'inTime',
                            editable: true,
                            value: curtime,
                            editor: {
                                allowBlank: false
                            }
                        },
                        {
                            text: '经手人',
                            dataIndex: 'handler',
                            editable: true,
                            editor: {
                                allowBlank: false
                            }
                        },
                        {
                            text: '入库金额',
                            dataIndex: 'totalMoney',
                            editable: false
                        },
                        {
                            text: '备注',
                            dataIndex: 'remark',
                            editable: true,
                            editor: {
                                allowBlank: false
                            }
                        }
                    ],
                    dockedItems: [
                        {
                            xtype: 'pagingtoolbar',
                            store: northStore,
                            dock: 'bottom',
                            displayInfo: true
                        }
                    ],
                    tbar: [
                        {
                            xtype: 'textfield',
                            fieldLabel: '经手人',
                            labelAlign: 'right',
                            name: 'inStockHandler',//与action的一样
                            id: 'inHandler',
                            allowBlank: true
                        },
                        {
                            xtype: 'button',
                            text: '查询',
                            handler: me.queryData
                        },
                        '->',
                        {
                            text: '入库明细统计图',
                            handler: function () {
                                me.ChartWindow()
                            }
                        }
                    ],
                    listeners: {
                        itemcontextmenu: function (view, record, item, index, e) {
                            //禁用浏览器的右键相应事件
                            e.preventDefault();
                            e.stopEvent();
                            me.nowEditRecord = record;
                            var menu = new Ext.menu.Menu({
                                //控制右键菜单位置
                                float: true,
                                items: [
                                    {
                                        text: "查看",
                                        iconCls: 'leaf',
                                        handler: function () {
                                            //当点击时隐藏右键菜单
                                            this.up("menu").hide();
                                            Ext.Ajax.request({
                                                url: '/inStockDetailsPaging',
                                                params: {
                                                    BillCODE: record.get('billCode')
                                                },
                                                success: function (response) {
                                                    var msg = Ext.JSON.decode(response.responseText);
                                                    Ext.getCmp('stockCenterGrid').store.reload();
                                                    Ext.each(msg.inStockDetailsList, function (item) {
                                                        Ext.data.StoreManager.lookup('myUpdateStore').add({
                                                            price: item.price,
                                                            inStockMerName: item.myMeMerchandiseInfoByMerchandiseId.merchandiseName,
                                                            num: item.num,
                                                            total: item.price * item.num,
                                                            inStockMerNameHidden: item.myMeMerchandiseInfoByMerchandiseId.merchandiseId,
                                                            id: item.id,
                                                            inStockInfoByBillCode: item.myMeInStockInfoByBillCode.billCode//主表主键作外键
                                                        });
                                                    });
                                                }
                                            });
                                        }
                                    },
                                    {
                                        text: "修改",
                                        iconCls: 'leaf',
                                        handler: function () {
                                            this.up("menu").hide();
                                            var northData = Ext.getCmp('stockNorthGrid').getSelectionModel().getSelection()[0];
                                            var centerData = Ext.data.StoreManager.lookup('myUpdateStore').data.items;//找到空store
                                            var updateData = [];//用来装修改的数据
                                            var myData = [];//放主表数据
                                            Ext.each(centerData, function (item, index) {//遍历从表的那个kongstore
                                                updateData[index] = item.data;
                                                updateData[index]['myMeMerchandiseInfoByMerchandiseId'] = {};//对象化
                                                updateData[index]['myMeMerchandiseInfoByMerchandiseId']['merchandiseId'] = item.data.inStockMerNameHidden;
                                                updateData[index]['myMeInStockInfoByBillCode'] = {};//对象化
                                                updateData[index]['myMeInStockInfoByBillCode']['billCode'] = item.data.inStockInfoByBillCode;
                                            });
                                            Ext.each(northData, function (item) {//遍历主编的store
                                                myData = item.data;
                                                myData['myAuOperInfoByOperId'] = {};//对象化
                                                myData['myAuOperInfoByOperId']['operId'] = northData.get('myAuOperInfoByOperId.operId');
                                                myData['myBaSupplierInfoBySupplierId'] = {};//对象化
                                                myData['myBaSupplierInfoBySupplierId']['supplierId'] = northData.get('myBaSupplierInfoBySupplierId.supplierId');
                                            });
                                            var form = Ext.create('Ext.form.Panel', {});//声明一个伪form，为了使用jsonSubmit方法
                                            form.submit({
                                                url: '/inStockInfoUpdate',
                                                jsonSubmit: true,
                                                params: {
                                                    inStockInfo: myData,
                                                    inStockDetailsInfoList: updateData
                                                },
                                                success: function (form, action) {
                                                    var msg = Ext.JSON.decode(action.response.responseText);
                                                    if (msg.state) {
                                                        Ext.MessageBox.show({
                                                            title: '提示',
                                                            msg: msg.message,
                                                            icon: Ext.MessageBox.WARNING,
                                                            buttons: Ext.MessageBox.YES
                                                        });
                                                        Ext.getCmp('stockNorthGrid').store.reload();
                                                        Ext.getCmp('inStockQueryGrid').store.reload();
                                                    } else {
                                                        Ext.MessageBox.show({
                                                            title: '提示',
                                                            msg: msg.message,
                                                            icon: Ext.MessageBox.QUESTION,
                                                            buttons: Ext.MessageBox.YES
                                                        });
                                                    }
                                                },
                                                failure: function () {
                                                    Ext.MessageBox.show({
                                                        title: '提示',
                                                        msg: '网络超时，请重试！',
                                                        icon: Ext.MessageBox.QUESTION,
                                                        buttons: Ext.MessageBox.YES
                                                    });
                                                }
                                            });
                                        }
                                    },
                                    {
                                        text: "删除",
                                        iconCls: 'leaf',
                                        handler: function () {
                                            this.up("menu").hide();
                                            Ext.Ajax.request({
                                                url: '/inStockInfoDelete?inStockInfo.billCode=' + record.get("billCode"),
                                                success: function (response) {
                                                    var msg = Ext.JSON.decode(response.responseText);
                                                    if (msg.state) {
                                                        Ext.MessageBox.show({
                                                            title: '成功',
                                                            msg: msg.message,
                                                            icon: Ext.MessageBox.WARNING,
                                                            buttons: Ext.MessageBox.YES
                                                        });
                                                        Ext.getCmp('stockNorthGrid').store.reload();
                                                        Ext.getCmp('stockCenterGrid').store.reload();
                                                    } else {
                                                        Ext.MessageBox.show({
                                                            title: '失败',
                                                            msg: msg.message,
                                                            icon: Ext.MessageBox.WARNING,
                                                            buttons: Ext.MessageBox.YES
                                                        });
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
                                    }
                                ]
                            }).showAt(e.getXY());//让右键菜单跟随鼠标位置
                        }
                    }

                },
                {
                    xtype: 'grid',
                    region: 'center',
                    width: '100%',
                    flex: 1,
                    plugins: cellEditing1,
                    id: "stockCenterGrid",
                    autoScroll: true,
                    store: Ext.create('Ext.data.ArrayStore', {
                        id: 'myUpdateStore',
                        data: [],
                        loadMask: {msg: '数据加载中，请稍候...'},
                        fields: [
                            {name: 'id', type: 'Integer'},
                            {name: 'num', type: 'Integer'},
                            {name: 'price', type: 'Float'},
                            {name: 'inStockMerNameHidden', type: 'String'},
                            {name: 'inStockMerName', type: 'String'},
                            {name: 'myMeMerchandiseInfoByMerchandiseId.merchandiseId', type: 'String'},
                            {name: 'myMeInStockInfoByBillCode.billCode', type: 'String'},
                            {name: 'inStockInfoByBillCode', type: 'String'},
                            {name: 'total', type: 'Float'}

                        ]
                    }),
                    columns: [
                        {
                            dataIndex: 'inStockMerNameHidden',
                            hidden: true
                        },
                        {
                            text: '递增的流水号',
                            dataIndex: 'id',
                            hidden: true
                        },
                        {
                            text: '商品名称',
                            dataIndex: 'inStockMerName',
                            editor: {
                                xtype: 'combobox',
                                displayField: 'merchandiseName',
                                valueField: 'merchandiseId',
                                allowBlank: false,
                                store: MerInfoStore,
                                listeners: {
                                    select: function (combo, records) {
                                        me.myCode = this.value;
                                        me.myName = records[0].get('merchandiseName');
                                    }
                                }
                            }
                        },
                        {
                            text: '入库数量',
                            editor: new Ext.form.field.Number({
                                maxValue: 99999,
                                minValue: 1,
                                allowBlank: false
                            }),
                            dataIndex: 'num'
                        },
                        {
                            text: '进价',
                            editor: new Ext.form.field.Number({
                                maxValue: 999999,
                                minValue: 1,
                                allowBlank: false
                            }),
                            dataIndex: 'price'
                        },

                        {
                            text: '总价',
                            dataIndex: 'total'
                        }
                    ]
                }
            ]
        });
        this.callParent();
    },
    //入库详情统计图window
    ChartWindow: function () {
        //明细pie数据源
        var pieStore = Ext.create('Ext.data.JsonStore', {
            proxy: {
                url: "/instockDetailsQuery",
                type: "ajax",
                reader: {
                    type: "json",
                    root: "inStockDetaileChartList"
                }
            },
            fields: [
                "merchandiseName",
                "num",
                "price"

            ],
            autoLoad: false
        });
        //pie图
        var pieChart = Ext.create('Ext.chart.Chart', {
            width: 100,
            height: 100,
            animate: false,
            store: pieStore,
            shadow: false,
            insetPadding: 0,
            theme: 'Base:gradients',
            series: [
                {
                    type: 'pie',
                    field: 'num',
                    showInLegend: false,
                    label: {
                        field: 'merchandiseName',
                        display: 'rotate',
                        contrast: true,
                        font: '9px Arial'
                    }
                }
            ]
        });

        //明细gridStore
        var gridStore = Ext.create('Ext.data.JsonStore', {

            proxy: {
                url: "/instockDetailsQuery",
                type: "ajax",
                reader: {
                    type: "json",
                    root: "inStockDetaileChartList"
                }
            },
            fields: [
                "merchandiseName",
                "num",
                "price"
            ],
            autoLoad: false
        });
        //明细grid
        var grid = Ext.create('Ext.grid.Panel', {
            store: gridStore,
            height: 130,
            width: 480,
            columns: [
                {
                    text: '商品名称',
                    dataIndex: 'merchandiseName'
                },
                {
                    text: '数量',
                    dataIndex: 'num'
                },
                {
                    text: '单价',
                    dataIndex: 'price'
                }
            ]
        });

        var store1 = Ext.create('Ext.data.JsonStore', {

            proxy: {
                url: "/instockChartQuery",
                type: "ajax",
                reader: {
                    type: "json",
                    root: "inStockChartList"
                }
            },
            fields: [
                "totalMoney",
                "inTime"
                // "num"
            ],
            autoLoad: true
        });

        var chart = Ext.create('Ext.chart.Chart', {
            animate: true,
            shadow: true,
            store: store1,
            axes: [
                {
                    title:'入库总金额',
                    type: 'Numeric',
                    position: 'left',
                    fields: ['totalMoney'],
                    grid: true
                },
                {
                    title:'入库时间',
                    type: 'Category',
                    position: 'bottom',
                    fields: ['inTime']
                }
            ],
            series: [
                {
                    type: 'line',
                    axis: 'left',
                    gutter: 80,
                    xField: 'inTime',
                    yField: ['totalMoney'],
                    tips: {
                        trackMouse: true,
                        width: 580,
                        height: 170,
                        layout: 'fit',
                        items: {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [pieChart, grid]
                        },
                        renderer: function (klass, item) {
                            grid.store.load({
                                params: {
                                    intime: klass.get('inTime')
                                }
                            });
                            pieChart.store.load({
                                params: {
                                    intime: klass.get('inTime')
                                }
                            });
                            this.setTitle(item.storeItem.get('inTime') + "的明细信息");
                        }
                    }
                }
            ]
        });

        //统计图window
        var window = Ext.create('Ext.window.Window', {
            title: '入库详情统计图',
            modal: true,
            id: 'inStockChartWindow',
            items: [
                {
                    xtype: 'panel',
                    height: 400,
                    width: 850,
                    items: [
                        {
                            height: 400,
                            renderTo: Ext.getBody(),
                            layout: 'fit',
                            tbar: [
                                {
                                    text: '保存统计图',
                                    handler: function () {
                                        Ext.MessageBox.confirm('确认下载', '你想要下载图标作为图片保存吗?', function (choice) {
                                            if (choice == 'yes') {
                                                chart.save({
                                                    type: 'image/png'
                                                });
                                            }
                                        });
                                    }
                                }
                            ],
                            items: chart
                        }

                    ]
                }
            ],
            buttonAlign: 'center',
            buttons: [
                {
                    text: '确定',
                    handler: function () {
                        this.up('window').close();
                    }
                }
            ]
        });
        window.show();
        window.center();
    },


    //查询数据
    queryData: function () {
        Ext.getCmp('stockNorthGrid').store.load({
            params: {
                inStockHandler: Ext.getCmp('inHandler').getValue()
            }
        });
    }
});