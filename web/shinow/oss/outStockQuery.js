/**
 * Created by daihui on 2014-11-20.
 */
Ext.define('shinow.oss.outStockQuery', {
    extend: 'Ext.panel.Panel',
    //统计图引入
    require: [
        'Ext.chart.*',
        'Ext.layout.container.Fit',
        'Ext.window.MessageBox',
        'Ext.grid.Panel'
    ],
    id: 'MyoutStockQuery',
    myCode: '',
    myName: '',
    totalmoney: '',
    nowEditRecord: {},
    itemsPerPage: 200,//全局
    initComponent: function () {
        var curdate = new Date();
        var curtime = Ext.Date.format(curdate, 'Y-m-d H:i:s');
        var me = this, outStockNorthStore, cellEditing1, cellEditing2, comboOperStore, MerInfoStore, OutTypeStore;
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
        //出库方式的combobox数据源
        OutTypeStore = Ext.create('Ext.data.Store', {
            fields: ['value', 'label'],
            data: [
                {value: '1', label: '正常出库'},
                {value: '2', label: '盘亏'},
                {value: '3', label: '报损'}
            ]
        });

        outStockNorthStore = Ext.create('Ext.data.Store', {
            pageSize: me.itemsPerPage,
            autoLoad: false,
            fields: [
                {name: 'outBillCode', type: 'String'},
                {name: 'myAuOperInfoByOperId.operName', type: 'String'},
                {name: 'myMeMerchandiseInfoByMerchandiseId.merchandiseId', type: 'String'},
                {name: 'myAuOperInfoByOperId.operId', type: 'String'},
                {name: 'myMeMerchandiseInfoByMerchandiseId.merchandiseName', type: 'String'},
                {name: 'outType', type: 'Byte'},
                {name: 'outTime', type: 'Timestamp'},
                {name: 'totalMoney', type: 'Float'},
                {name: 'handler', type: 'String'},
                {name: 'remark', type: 'String'}
            ],
            proxy: {
                type: 'ajax',
                url: '/outStockPaging',
                reader: {
                    type: 'json',
                    root: 'outStockList',
                    totalProperty: 'rowCount'
                }
            },
            //查询时分页监听
            listeners: {
                beforeload: function (store, operation) {
                    var outHandler;
                    outHandler = Ext.getCmp('handler');                              //获取输入框
                    if (outHandler) {
                        if (outHandler.getValue()) {
                            if (operation.params) {                             //获取查询条件
                                operation.params.outStockHandler = outHandler.getValue();
                            }
                            else {
                                operation.params = {outStockHandler: outHandler.getValue()}
                            }
                        }
                    }
                }
            }
        });
        outStockNorthStore.load({
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
                            var myOutStockUpdateStore = Ext.data.StoreManager.lookup("myOutStockUpdateStore");
                            if (context.field === 'outStockMerName') {
                                context.record.set('outStockMerNameHidden', me.myCode);
                                context.record.set('outStockMerName', me.myName);
                            }
                            //选择下拉菜单自动改变值
                            if (context.field === 'outStockMerName') {
                                Ext.Ajax.request({
                                    url: '/outStockQuery?merchandiseID=' + me.myCode,
                                    success: function (response) {
                                        var msg = Ext.JSON.decode(response.responseText);
                                        for (var i = 0; i < msg.stockInfoList.length; i++) {
                                            context.record.set('stockPrice', msg.stockInfoList[i].avgPrice);
                                            maxNum = context.record.set('num', msg.stockInfoList[i].num);
                                        }
                                    }
                                });
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
                            if (myOutStockUpdateStore.data.items.length === 0) {
                                me.totalmoney = 0;
                            } else {
                                for (var i = 0; i < myOutStockUpdateStore.data.items.length; i++) {
                                    if (!isNaN(myOutStockUpdateStore.data.items[i].data.total) && myOutStockUpdateStore.data.items[i].data.total != "") {
                                        me.totalmoney += myOutStockUpdateStore.data.items[i].data.total;
                                    }
                                }
                            }
                            var parentStore = Ext.getCmp('outStockNorthGrid').store;
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
            title: '商品出库查询',
            id: 'outStockQueryGrid',
            layout: 'border',
            border: false,
            loadMask: {msg: '加载数据中，请稍候...'},//数据加载时有一个蒙版，防止用户误点
            closable: true,
            items: [
                {
                    xtype: 'grid',
                    region: 'north',
                    id: "outStockNorthGrid",
                    width: '100%',
                    flex: 1,
                    plugins: cellEditing2,
                    autoScroll: true,
                    store: outStockNorthStore,
                    columns: [
                        {
                            text: '出库单号',
                            dataIndex: 'outBillCode',
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
                            text: '出库方式',
                            dataIndex: 'outType',
                            editor: {
                                xtype: "combobox",
                                name: "outstockinfo.outType",
                                store: OutTypeStore,
                                displayField: "label",
                                valueField: "value"
                            },
                            renderer: function (value) {
                                if ((value == '1') || (value == 1)) {
                                    return '正常出库';
                                }
                                if ((value == '2') || (value == 2)) {
                                    return '盘亏';
                                }
                                if ((value == '3') || (value == 3)) {
                                    return '报损';
                                }
                            }
                        },
                        {
                            text: '出库时间',
                            dataIndex: 'outTime',
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
                            text: '出库金额',
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
                            store: outStockNorthStore,
                            dock: 'bottom',
                            displayInfo: true
                        }
                    ],
                    tbar: [
                        {
                            xtype: 'textfield',
                            fieldLabel: '经手人',
                            labelAlign: 'right',
                            name: 'outStockHandler',//与action的一样
                            id: 'handler',
                            allowBlank: true
                        },
                        {
                            xtype: 'button',
                            text: '查询',
                            handler: me.queryData
                        },
                        '->',
                        {
                            text: '出库统计图',
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
                                                url: '/outStockDetailsInfoQuery',
                                                params: {
                                                    outBILLCODE: record.get('outBillCode')
                                                },
                                                success: function (response) {
                                                    var msg = Ext.JSON.decode(response.responseText);
                                                    Ext.getCmp('outStockCenterGrid').store.reload();
                                                    Ext.each(msg.outStockInfoDetailsList, function (item) {
                                                        Ext.data.StoreManager.lookup('myOutStockUpdateStore').add({
                                                            price: item.price,
                                                            outStockMerName: item.myMeMerchandiseInfoByMerchandiseId.merchandiseName,
                                                            num: item.num,
                                                            stockPrice: item.stockPrice,
                                                            total: item.price * item.num,
                                                            outStockMerNameHidden: item.myMeMerchandiseInfoByMerchandiseId.merchandiseId,
                                                            id: item.id,
                                                            outStockInfoByBillCode: item.myMeOutStockInfoByOutBillCode.outBillCode//主表主键作外键
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
                                            var northData = Ext.getCmp('outStockNorthGrid').getSelectionModel().getSelection()[0];
                                            var centerData = Ext.data.StoreManager.lookup('myOutStockUpdateStore').data.items;//找到空store
                                            var updateData = [];//用来装修改的数据
                                            var myData = [];//放主表数据
                                            Ext.each(centerData, function (item, index) {//遍历从表的那个kongstore
                                                updateData[index] = item.data;
                                                updateData[index]['myMeMerchandiseInfoByMerchandiseId'] = {};//对象化
                                                updateData[index]['myMeMerchandiseInfoByMerchandiseId']['merchandiseId'] = item.data.outStockMerNameHidden;
                                                updateData[index]['myMeOutStockInfoByOutBillCode'] = {};//对象化
                                                updateData[index]['myMeOutStockInfoByOutBillCode']['outBillCode'] = item.data.outStockInfoByBillCode;
                                            });
                                            Ext.each(northData, function (item) {//遍历主表的store
                                                myData = item.data;
                                                myData['myAuOperInfoByOperId'] = {};//对象化
                                                myData['myAuOperInfoByOperId']['operId'] = northData.get('myAuOperInfoByOperId.operId');
                                            });
                                            var form = Ext.create('Ext.form.Panel', {});//声明一个伪form，为了使用jsonSubmit方法
                                            form.submit({
                                                url: '/outStockInfoUpdate',
                                                jsonSubmit: true,
                                                params: {
                                                    outStockInfo: myData,
                                                    outStockDetailsInfoList: updateData
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
                                                        Ext.getCmp('outStockNorthGrid').store.reload();
                                                        Ext.getCmp('outStockCenterGrid').store.reload();
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
                                                url: '/outStockInfoDelete?outStockInfo.outBillCode=' + record.get("outBillCode"),
                                                success: function (response) {
                                                    var msg = Ext.JSON.decode(response.responseText);
                                                    if (msg.state) {
                                                        Ext.MessageBox.show({
                                                            title: '成功',
                                                            msg: msg.message,
                                                            icon: Ext.MessageBox.WARNING,
                                                            buttons: Ext.MessageBox.YES
                                                        });
                                                        Ext.getCmp('outStockNorthGrid').store.reload();
                                                        Ext.getCmp('outStockCenterGrid').store.reload();
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
                    id: "outStockCenterGrid",
                    autoScroll: true,
                    store: Ext.create('Ext.data.ArrayStore', {
                        id: 'myOutStockUpdateStore',
                        data: [],
                        loadMask: {msg: '数据加载中，请稍候...'},
                        fields: [
                            {name: 'id', type: 'Integer'},
                            {name: 'num', type: 'Integer'},
                            {name: 'price', type: 'Float'},
                            {name: 'stockPrice', type: 'Float'},
                            {name: 'outStockMerNameHidden', type: 'String'},
                            {name: 'outStockMerName', type: 'String'},
                            {name: 'myMeMerchandiseInfoByMerchandiseId.merchandiseId', type: 'String'},
                            {name: 'myMeOutStockInfoByOutBillCode.outBillCode', type: 'String'},
                            {name: 'outStockInfoByBillCode', type: 'String'},
                            {name: 'total', type: 'Float'}

                        ]
                    }),
                    columns: [
                        {
                            text:'商品的ID',
                            dataIndex: 'outStockMerNameHidden',
                            hidden: true
                        },
                        {
                            text: '递增的流水号',
                            dataIndex: 'id',
                            hidden: true
                        },
                        {
                            text: '商品名称',
                            dataIndex: 'outStockMerName',
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
                            text: '出库数量',
                            editor: new Ext.form.field.Number({
                                maxValue: 99999,
                                minValue: 1,
                                allowBlank: false
                            }),
                            dataIndex: 'num'
                        },
                        {
                            text: '出库成本',
                            dataIndex: 'stockPrice',
                            readOnly: true
                        },
                        {
                            text: '单价',
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

    //出库详情统计图window
    ChartWindow: function () {
        //明细pie数据源
        var pieStore = Ext.create('Ext.data.JsonStore', {
            proxy: {
                url: "/outstockDetailsQuery",
                type: "ajax",
                reader: {
                    type: "json",
                    root: "outStockDetaileChartList"
                }
            },
            fields: [
                "myMeMerchandiseInfoByMerchandiseId.merchandiseName",
                "num",
                "price",
                "stockPrice"

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
                        field: 'myMeMerchandiseInfoByMerchandiseId.merchandiseName',
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
                url: "/outstockDetailsQuery",
                type: "ajax",
                reader: {
                    type: "json",
                    root: "outStockDetaileChartList"
                }
            },
            fields: [
                "myMeMerchandiseInfoByMerchandiseId.merchandiseName",
                "num",
                "price",
                "stockPrice"
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
                    dataIndex: 'myMeMerchandiseInfoByMerchandiseId.merchandiseName'
                },
                {
                    text: '数量',
                    dataIndex: 'num'
                },
                {
                    text: '单价',
                    dataIndex: 'price'
                },
                {
                    text: '出库成本价',
                    dataIndex: 'stockPrice'
                }
            ]
        });

        //统计图store
        var store1 = Ext.create('Ext.data.JsonStore', {
            proxy: {
                url: "/outstockChartQuery",
                type: "ajax",
                reader: {
                    type: "json",
                    root: "outStockChartList"
                }
            },
            fields: [
                "totalMoney",
                "outTime"
            ],
            autoLoad: true
        });

        var chart = Ext.create('Ext.chart.Chart', {
            animate: true,
            shadow: true,
            store: store1,
            axes: [
                {
                    title: '出库总金额',
                    type: 'Numeric',
                    position: 'left',
                    fields: ['totalMoney'],
                    grid: true
                },
                {
                    title: '出库时间',
                    type: 'Category',
                    position: 'bottom',
                    fields: ['outTime']
                }
            ],
            series: [
                {
                    type: 'line',
                    axis: 'left',
                    gutter: 80,
                    xField: 'outTime',
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
                                    outtime: klass.get('outTime')
                                }
                            });
                            pieChart.store.load({
                                params: {
                                    outtime: klass.get('outTime')
                                }
                            });
                            this.setTitle(item.storeItem.get('outTime') + "的明细信息");
                        }
                    }
                }
            ]
        });

        //统计图window
        var window = Ext.create('Ext.window.Window', {
            title: '出库详情统计图',
            modal: true,
            id: 'outStockChartWindow',
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
        Ext.getCmp('outStockNorthGrid').store.load({
            params: {
                outStockHandler: Ext.getCmp('handler').getValue()
            }
        });
    }
});