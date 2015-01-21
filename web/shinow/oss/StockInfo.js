Ext.define('shinow.oss.StockInfo', {//商品类别
    extend: 'Ext.grid.Panel',
    itemsPerPage: 5,//全局
    initComponent: function () {
        var me = this, checkBox, StockInfoStore;
        checkBox = Ext.create('Ext.selection.CheckboxModel');
        //store
        StockInfoStore = Ext.create('Ext.data.Store', {
            autoLoad: false,
            fields: [
                {name: 'id', type: 'Integer'},
                {name: 'myMeMerchandiseInfoByMerchandiseId.merchandiseName', type: 'String'},
                {name: 'myMeMerchandiseInfoByMerchandiseId.myMeMerchandiseCInfoByMerchandiseCid.merchandiseCName', type: 'String'},
                {name: 'myMeMerchandiseInfoByMerchandiseId.myMeUnitInfoByUnitId.name', type: 'String'},
                {name: 'avgPrice', type: 'Float'},
                {name: 'num', type: 'Integer'}
            ],
            pageSize: me.itemsPerPage,
            proxy: {
                type: 'ajax',
                url: '/stockInfoQuery',
                reader: {
                    type: 'json',
                    root: 'stockInfoList',
                    totalProperty: 'rowCount'
                }
            },
            //查询时分页监听
            listeners: {
                beforeload: function (store, operation) {
                    var merN, merCN;
                    merN = Ext.getCmp('merNAME');                          //获取输入框
                    merCN = Ext.getCmp('merCNAME');                              //获取输入框
                    if (merN || merCN) {
                        if (merN.getValue() || merCN.getValue()) {
                            if (operation.params) {                             //获取查询条件
                                operation.params.merchandiseNAME = merN.getValue();
                                operation.params.merchandiseCNAME = merCN.getValue();
                            }
                            else {
                                operation.params = {merchandiseNAME: merN.getValue()};
                                operation.params = {merchandiseCNAME: merCN.getValue()};
                            }
                        }
                    }
                }
            }
        });

        StockInfoStore.load({
            params: {
                start: 0,
                limit: me.itemsPerPage
            }
        });
        Ext.apply(this, {
            title: '库存信息查看',
            closable: true,
            loadMask: true,//数据加载时有一个蒙版，防止用户误点
            id: 'stockInfoGrid',
            width: 400,
            store: StockInfoStore,
            //添加checkBox
            selModel: checkBox,
            disableSelection: false,//选择多行
            columns: [
                {text: '递增流水号', dataIndex: 'id' },
                {text: '商品名称', dataIndex: 'myMeMerchandiseInfoByMerchandiseId.merchandiseName'},
                {text: '商品类别', dataIndex: 'myMeMerchandiseInfoByMerchandiseId.myMeMerchandiseCInfoByMerchandiseCid.merchandiseCName'},
                {text: '单位', dataIndex: 'myMeMerchandiseInfoByMerchandiseId.myMeUnitInfoByUnitId.name'},
                {text: '数量', dataIndex: 'num'},
                {text: '加权平均价', dataIndex: 'avgPrice'}
            ],
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    store: StockInfoStore,
                    dock: 'bottom',
                    displayInfo: true
                }
            ],
            tbar: [
                {
                    xtype: 'textfield',
                    fieldLabel: '商品名称',
                    labelAlign: 'right',
                    name: 'merchandiseNAME',
                    id: 'merNAME'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: '商品类别',
                    labelAlign: 'right',
                    name: 'merchandiseCNAME',//与action的一样
                    id: 'merCNAME'
                },
                {
                    xtype: 'button',
                    text: '查询',
                    handler: me.queryData
                },
                '->',
                {
                    text: '库存信息统计图',
                    handler: function () {
                        me.ChartWindow()
                    }
                }

            ]
        });
        this.callParent();
    },

    //库存信息统计图window
    ChartWindow: function () {
        var StockInfoChartStore = Ext.create("Ext.data.Store", {
            proxy: {
                url: "/stockInfoChart",
                type: "ajax",
                reader: {
                    type: "json",
                    root: "stockInfoChartList"
                }
            },
            fields: [
                'merchandiseName',
                'avgPrice',
                'num'
            ],
            autoLoad: true
        });

        //统计图window
        var window = Ext.create('Ext.window.Window', {
            xtype: 'panel',
            layout: 'hbox',
            height: 650,
            title: '库存信息统计',
            modal: true,
            items: [
                //饼图
                {
                    xtype: 'chart',
                    animate: true,
                    store: StockInfoChartStore,
                    height: 600,
                    width: 600,
                    shadow: true,
                    legend: {
                        position: 'right'
                    },
                    theme: 'Base:gradients',
                    series: [
                        {
                            type: 'pie',
                            field: 'num',
                            showInLegend: true,
                            tips: {
                                trackMouse: true,
                                width: 140,
                                height: 28,
                                renderer: function (storeItem, item) {
                                    var total = 0;
                                    StockInfoChartStore.each(function (rec) {
                                        total += rec.get('num');
                                    });
                                    this.setTitle(storeItem.get('merchandiseName') + ': ' + Math.round(storeItem.get('num') / total * 100) + '%');
                                }
                            },
                            highlight: {
                                segment: {
                                    margin: 10
                                }
                            },
                            label: {
                                field: 'merchandiseName',
                                display: 'rotate',
                                contrast: true,
                                font: '18px Arial'
                            }, style: {
                            'stroke-width': 1,
                            'stroke': '#fff'
                        }
                        }
                    ]
                },
                //柱状图
                {
                    xtype: "chart",
                    margin: "0 0 0 90",
                    height: 550,
                    width: 550,
                    animate: true,
                    store: StockInfoChartStore,
                    axes: [
                        {
                            type: 'Numeric',
                            position: 'left',
                            fields: ['avgPrice'],
                            label: {
                                renderer: Ext.util.Format.numberRenderer('0,0')
                            },
                            title: '加权平均价',
                            grid: true,
                            minimum: 0
                        },
                        {
                            type: 'Category',
                            position: 'bottom',
                            fields: ['merchandiseName'],
                            title: '商品名称'
                        }
                    ],
                    series: [
                        {
                            type: 'column',
                            axis: 'left',
                            highlight: true,
                            tips: {
                                trackMouse: true,
                                width: 140,
                                height: 28,
                                renderer: function (storeItem, item) {
                                    this.setTitle(storeItem.get('merchandiseName') + ': ' + storeItem.get('avgPrice') + '元');
                                }
                            },
                            label: {
                                display: 'insideEnd',
                                'text-anchor': 'middle',
                                field: 'avgPrice',
                                renderer: Ext.util.Format.numberRenderer('0'),
                                orientation: 'vertical',
                                color: '#333'
                            },
                            xField: 'merchandiseName',
                            yField: 'avgPrice'
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
        Ext.getCmp('stockInfoGrid').store.load({
            params: {
                merchandiseNAME: Ext.getCmp('merNAME').getValue(),
                merchandiseCNAME: Ext.getCmp('merCNAME').getValue()
            }
        });
    }

});
