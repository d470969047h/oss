/**
 * Created by daihui on 2014-11-16.
 */
Ext.define('shinow.oss.inStock', {
    extend: 'Ext.panel.Panel',

    myCode: '',
    myName: '',
    totalmoney: '',
    initComponent: function () {
        var curdate = new Date();
        var curtime = Ext.Date.format(curdate, 'Y-m-d H:i:s');
        var me = this, cellEditing, comboOperStore, SupplierStore, MerInfoStore, InTypeStore;
        cellEditing = new Ext.grid.plugin.CellEditing(
            {
                clicksToEdit: 1,
                listeners: {
                    edit: function (editor, context) {
                        if (context.value) {
                            var myStore = Ext.data.StoreManager.lookup('myStore');
                            if (context.field === 'inStockMerName') {
                                context.record.set('inStockMerNameHidden', me.myCode);
                                context.record.set('inStockMerName', me.myName);
                            }
                            if (context.field === "number") {
                                if (context.record.data.price) {
                                    context.rescord.set('total', context.record.data.price * context.value);
                                }
                            }
                            if (context.field === "price") {
                                if (context.record.data.number) {
                                    context.record.set('total', context.record.data.number * context.value);
                                }
                            }
                            //满足条件自动添加一行
                            if (context.record.get('inStockMerName') !== '' && context.record.get('number') > 0 && context.record.get('price') > 0) {
                                var isEmptyRow = false;
                                context.grid.store.each(function (record) {
                                    {
                                        if (record.get('inStockMerName') === '' || context.record.get('number') <= 0 || context.record.get('price') <= 0) {
                                            isEmptyRow = true;
                                            return false;
                                        }
                                    }
                                });
                                if (!isEmptyRow) {
                                    context.grid.store.add({});
                                }
                            }

                            //将grid的总价直接添加到上面主表的入库金额
                            me.totalmoney = 0;
                            for (var i = 0; i < myStore.data.items.length; i++) {
                                if (!isNaN(myStore.data.items[i].data.total) && myStore.data.items[i].data.total != "") {
                                    me.totalmoney += myStore.data.items[i].data.total;
                                }
                            }
                            Ext.getCmp('inStockTotalMoney').setValue(me.totalmoney);
                        }
                    }
                }
            }
        );
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
        Ext.apply(this, {
            title: '商品入库',
            layout: 'vbox',
            id: 'inStockGrid',
            closable: true,
            bbar: [
                {
                    text: '提交',
                    buttonAlign: 'center',
                    handler: function () {
                        var myData = Ext.data.StoreManager.lookup('myStore').data.items;
                        var postData = '';
                        Ext.each(myData, function (item, index) {
                            if (!item.data.total) {
                                return;
                            }
                            postData += 'inStockDetailsInfoList[' + index + '].myMeMerchandiseInfoByMerchandiseId.merchandiseId=' + item.data.inStockMerNameHidden +
                                '&inStockDetailsInfoList[' + index + '].num=' + item.data.number +
                                '&inStockDetailsInfoList[' + index + '].price=' + item.data.price;
                            if (index != myData.length - 1) {
                                postData += '&';
                            }
                        });
                        Ext.getCmp('myForm').submit({
                            url: '/inStock?' + postData,
                            success: function (form, action) {
                                var msg = Ext.JSON.decode(action.response.responseText);
                                Ext.MessageBox.show({
                                    title: '成功',
                                    msg: msg.message,
                                    icon: Ext.MessageBox.WARNING,
                                    buttons: Ext.MessageBox.YES
                                });
                                Ext.getCmp('detailsGrid').store.reload();
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
                    id: 'myForm',
                    flex: 1,
                    layout: 'vbox',
                    items: [
                        {
                            layout: 'column',
                            height: 58,
                            border: false,
                            width: '100%',
                            defaults: {
//                                allowBlank: false,
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
                                    name: 'inStockInfo.myAuOperInfoByOperId.operId',
                                    allowBlank: false
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: '供应商',
                                    store: SupplierStore,
                                    displayField: 'supplierName',
                                    valueField: 'supplierId',
                                    name: 'inStockInfo.myBaSupplierInfoBySupplierId.supplierId',
                                    allowBlank: false
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: '入库方式',
                                    store: InTypeStore,
                                    displayField: 'label',
                                    valueField: 'value',
                                    name: 'inStockInfo.inType',
                                    allowBlank: false
                                },
                                {
                                    fieldLabel: '入库时间',
                                    value: curtime,

                                    name: 'inStockInfo.inTime'
                                },
                                {
                                    fieldLabel: '经手人',
                                    name: 'inStockInfo.handler'
                                },
                                {
                                    fieldLabel: '入库金额',
                                    id: 'inStockTotalMoney',
                                    readOnly: true,
                                    name: 'inStockInfo.totalMoney',
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
                                    name: "inStockInfo.remark"
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'grid',
                    width: '100%',
                    flex: 2,
                    id: 'detailsGrid',
                    autoScroll: true,
                    plugins: cellEditing,
                    store: Ext.create('Ext.data.ArrayStore', {
                        id: 'myStore',
                        data: [
                            {}
                        ],
                        fields: [
                            'inStockMerNameHidden', 'inStockMerName', 'number', 'price', 'total'
                        ]
                    }),
                    columns: [
                        {
                            dataIndex: 'inStockMerNameHidden',
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
                                        me.myName = records[0].data.merchandiseName;
                                    }
                                }
                            }
                        },
                        {
                            text: '入库数量',
                            editor: new Ext.form.field.Number({
                                maxValue: 9999,
                                minValue: 1,
                                allowBlank: false
                            }),
                            dataIndex: 'number'
                        },
                        {
                            text: '进价',
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



});