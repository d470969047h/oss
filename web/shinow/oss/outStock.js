/**
 * Created by daihui on 2014-11-16.
 */
Ext.define('shinow.oss.outStock', {
    extend: 'Ext.panel.Panel',
    myCode: '',
    myName: '',
    totalmoney: '',
    maxNum: 0,
    initComponent: function () {
        var curdate = new Date();
        var curtime = Ext.Date.format(curdate, 'Y-m-d H:i:s');
        var me = this, cellEditing, comboOperStore, MerInfoStore, OutTypeStore;
        cellEditing = new Ext.grid.plugin.CellEditing(
            {
                clicksToEdit: 2,
                listeners: {
                    edit: function (editor, context) {
                        if (context.value) {
                            var myStore = Ext.data.StoreManager.lookup('myOutStockStore');
                            if (context.field === 'outStockMerName') {
                                context.record.set('outStockMerNameHidden', me.myCode);
                                context.record.set('outStockMerName', me.myName);
                            }
                            if (context.field === 'outStockMerName') {
                                Ext.Ajax.request({
                                    url: '/outStockQuery?merchandiseID=' + me.myCode,
                                    success: function (response) {
                                        var msg = Ext.JSON.decode(response.responseText);
                                        for (var i = 0; i < msg.stockInfoList.length; i++) {
                                            context.record.set('stockPrice', msg.stockInfoList[i].avgPrice);
                                            maxNum = context.record.set('number', msg.stockInfoList[i].num);
                                        }
                                    }
                                });
                            }
                            if (context.field === "number") {
                                if (context.record.data.price) {
                                    context.record.set('total', context.record.data.price * context.value);
                                }
                            }
                            if (context.field === "price") {
                                if (context.record.data.number) {
                                    context.record.set('total', context.record.data.number * context.value);
                                }
                            }
                            //满足条件自动添加一行
                            if (context.record.get('outStockMerName') !== '' && context.record.get('number') > 0 && context.record.get('stockPrice') > 0 && context.record.get('price') > 0) {
                                var isEmptyRow = false;
                                context.grid.store.each(function (record) {
                                    {
                                        if (record.get('outStockMerName') === '' || context.record.get('number') <= 0 || context.record.get('stockPrice') <= 0 && context.record.get('price') <= 0) {
                                            isEmptyRow = true;
                                            return false;
                                        }
                                    }
                                });
                                if (!isEmptyRow) {
                                    context.grid.store.add({});
                                }
                            }
                        }
                        //将grid的总价直接添加到上面主表的入库金额
                        me.totalmoney = 0;
                        for (var i = 0; i < myStore.data.items.length; i++) {
                            if (!isNaN(myStore.data.items[i].data.total) && myStore.data.items[i].data.total != "") {
                                me.totalmoney += myStore.data.items[i].data.total;
                            }
                        }
                        Ext.getCmp('outStockTotalMoney').setValue(me.totalmoney);
                    }
                }
            });
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
        Ext.apply(this, {
            title: '商品出库',
            layout: 'vbox',
            id: 'outStockGrid',
            closable: true,
            bbar: [
                {
                    text: '提交',
                    buttonAlign: 'center',
                    handler: function () {
                        var myData = Ext.data.StoreManager.lookup('myOutStockStore').data.items;
                        var postData = '';
                        Ext.each(myData, function (item, index) {
                            if (!item.data.total) {
                                return;
                            }
                            postData += 'outStockDetailsInfoList[' + index + '].myMeMerchandiseInfoByMerchandiseId.merchandiseId=' + item.data.outStockMerNameHidden +
                                        '&outStockDetailsInfoList[' + index + '].num=' + item.data.number +
                                        '&outStockDetailsInfoList[' + index + '].price=' + item.data.price + item.data.number +
                                        '&outStockDetailsInfoList[' + index + '].stockPrice=' + item.data.stockPrice;
                            if (index != myData.length - 1) {
                                postData += '&';
                            }
                        });
                        Ext.getCmp('myOutForm').submit({
                            url: '/outStock?' + postData,
                            success: function (form, action) {
                                var msg = Ext.JSON.decode(action.response.responseText);
                                Ext.MessageBox.show({
                                    title: '成功',
                                    msg: msg.message,
                                    icon: Ext.MessageBox.WARNING,
                                    buttons: Ext.MessageBox.YES
                                });
                                Ext.getCmp('outStockGrid').store.reload();
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
                }
            ],
            items: [
                {
                    xtype: 'form',
                    width: '100%',
                    id: 'myOutForm',
                    flex: 1,
                    layout: 'vbox',
                    items: [
                        {
                            layout: 'column',
                            height: 58,
                            border: false,
                            width: '100%',
                            defaults: {
                                allowBlank: false,
                                xtype: 'textfield',
                                labelWidth: 90,
                                columnWidth: .33,
                                margin: '5 0 0 0',
                                labelAlign: 'right'
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    fieldLabel: '操作员',
                                    store: comboOperStore,
                                    displayField: 'operName',
                                    valueField: 'operId',
                                    name: 'outStockInfo.myAuOperInfoByOperId.operId',
                                    allowBlank: false
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: '出库方式',
                                    store: OutTypeStore,
                                    displayField: 'label',
                                    valueField: 'value',
                                    name: 'outStockInfo.outType',
                                    allowBlank: false
                                },
                                {
                                    fieldLabel: '出库时间',
                                    value: curtime,
                                    name: 'outStockInfo.outTime'
                                },
                                {
                                    fieldLabel: '经手人',
                                    name: 'outStockInfo.handler'
                                },
                                {
                                    fieldLabel: '出库金额',
                                    id: 'outStockTotalMoney',
                                    readOnly: true,
                                    name: 'outStockInfo.totalMoney',
                                    value: me.totalmoney
                                }

                            ]
                        },
                        {
                            layout: 'fit',
                            border: false,
                            width: '100%',
                            margin: '2 0 0 0',
                            items: [
                                {
                                    xtype: "textarea",
                                    labelWidth: 80,
                                    labelAlign: "right",
                                    margin: '0 12 0 0',
                                    fieldLabel: "备注",
                                    name: "outStockInfo.remark"
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'grid',
                    width: '100%',
                    flex: 2,
                    autoScroll: true,
                    plugins: cellEditing,
                    store: Ext.create('Ext.data.ArrayStore', {
                        id: 'myOutStockStore',
                        data: [
                            {}
                        ],
                        fields: [
                            'outStockMerNameHidden', 'outStockMerName', 'number', 'stockPrice', 'price', 'total'
                        ]
                    }),
                    columns: [

                        {
                            dataIndex: 'outStockMerNameHidden',
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
                                        me.myName = records[0].data.merchandiseName;

                                    }
                                }
                            }
                        },
                        {
                            text: '出库数量',
                            editor: new Ext.form.field.Number({
                                listeners: {
                                    maxValue: '',
                                    minValue: 1
                                },
                                allowBlank: false
                            }),
                            dataIndex: 'number'
                        },
                        {
                            text: '出库成本价',
                            editor: new Ext.form.field.Number({
                                allowBlank: false
                            }),
                            dataIndex: 'stockPrice'
                        },
                        {
                            text: '单价',
                            editor: new Ext.form.field.Number({
                                maxValue: 9999,
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
    }
})
;