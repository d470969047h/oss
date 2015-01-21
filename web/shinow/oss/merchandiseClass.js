Ext.define('shinow.oss.merchandiseClass', {//商品类别
    extend: 'Ext.grid.Panel',
    itemsPerPage: 100,//全局
    initComponent: function () {
        var me = this,checkBox,store;
         checkBox=Ext.create('Ext.selection.CheckboxModel');
        //store
         store = Ext.create('Ext.data.Store', {
            autoLoad: false,
            fields: [
                {name:'id',type:'int'},
                {name:'merchandiseCid',type:'String'},
                {name:'merchandiseCName',type:'String'},
                {name:'sortId',type:'Integer'},
                {name:'state',type:'Boolean'}
            ],
            pageSize: me.itemsPerPage,
            proxy: {
                type: 'ajax',
                url: '/merchandiseClass',
                reader: {
                    type: 'json',
                    root: 'merchandiseCList',
                    totalProperty: 'rowCount'
                }
            },
            //查询时分页监听
            listeners: {
                beforeload: function (store, operation) {
                    var merBH,name;
                     merBH = Ext.getCmp('merCId');                          //获取输入框
                     name = Ext.getCmp('merCName');                              //获取输入框
                    if (name || merBH) {
                        if (name.getValue() || merBH.getValue()) {
                            if (operation.params) {                             //获取查询条件
                                operation.params.merchandiseCid = merBH.getValue();
                                operation.params.merchandiseCName = name.getValue();
                            }
                            else {
                                operation.params = {merchandiseCid: merBH.getValue()}
                                operation.params = {merchandiseCName: name.getValue()}
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
            title: '商品类别管理',
            closable: true,
            loadMask: true,//数据加载时有一个蒙版，防止用户误点
            id: 'merchandiseC',
            width: 400,
            store: store,
            //添加checkBox
            selModel:checkBox,
            disableSelection:false,//选择多行
            columns: [
                {text:'递增流水号',dataIndex:'id' },
                {text:'商品类别编码',dataIndex:'merchandiseCid'},
                {text:'商品类别名称',dataIndex:'merchandiseCName'},
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
                    fieldLabel: '商品类别编码',
                    labelAlign: 'right',
                    name: 'merchandiseCid',
                    id: 'merCId',
                    allowBlank: true
                },
                {
                    xtype: 'textfield',
                    fieldLabel: '商品类别名称',
                    labelAlign: 'right',
                    name: 'merchandiseCName',//与action的一样
                    id: 'merCName',
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
                {"abbr":"true", "name":"使用"},
                {"abbr":"false", "name":"停用"}
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
                            fieldLabel: '商品类别编码',
                            name: 'merCInfo.merchandiseCid',
                            allowBlank: false
                        },
                        {
                            fieldLabel: '商品类别名称',
                            name: 'merCInfo.merchandiseCName',
                            allowBlank: false
                        },
                        {
                            fieldLabel: '排序编码',
                            name: 'merCInfo.sortId',
                            allowBlank: false
                        },
                        {
                           xtype:'combobox',
                            fieldLabel: '状态',
                            store: comboStore,
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'abbr',
                            name: 'merCInfo.state'
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
        var form,msg
         form = this.up('window').down('form').getForm();
        if (form.isValid()) {
            form.submit({
                url: '/AddMerC',
                success: function (form, action) {
                     msg = Ext.JSON.decode(action.response.responseText);
                    Ext.MessageBox.show({
                        title:'成功',
                        msg:msg.message,
                        icon:Ext.MessageBox.WARNING,
                        buttons:Ext.MessageBox.YES

                    });
                    Ext.getCmp('merchandiseC').store.reload();
                    Ext.getCmp('window').close();

                },
                failure: function (form, action) {
                     msg = Ext.JSON.decode(action.response.responseText);
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
        var comboStore,record,window;
        //combobox的数据源
         comboStore = Ext.create('Ext.data.Store', {
            fields: ['abbr', 'name'],
            data : [
                {"abbr":"true", "name":"使用"},
                {"abbr":"false", "name":"停用"}
            ]
        });
         record=Ext.getCmp('merchandiseC').getSelectionModel().getLastSelected();
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
                            fieldLabel: '递增流水号',
                            name: 'merCInfo.id',
                            value:record.get('id'),
                            readOnly:true,
                            tooltip: '递增流水号不允许修改'
                        },
                        {
                            fieldLabel: '供应商编码',
                            name: 'merCInfo.merchandiseCid',
                            value:record.get('merchandiseCid'),
                            allowBlank: false,
                            tooltip: '修改供应商编码'
                        },
                        {
                            fieldLabel: '供应商名称',
                            name: 'merCInfo.merchandiseCName',
                            value:record.get('merchandiseCName'),
                            tooltip:'修改商品类别名称',
                            allowBlank: false
                        },
                        {
                            fieldLabel: '排序编码',
                            name: 'merCInfo.sortId',
                            value:record.get('sortId'),
                            tooltip:'商品类别排序编码不允许修改',
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
                            tooltip:'修改商品类别状态',
                            name: 'merCInfo.state'
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
        var form,msg;
         form = this.up('window').down('form').getForm();
        if (form.isValid()) {
            form.submit({
                url: '/UpdateMerC',
                success: function (form, action) {
                     msg = Ext.JSON.decode(action.response.responseText);
                  Ext.MessageBox.show({
                     title:'成功',
                      msg:msg.message,
                      icon:Ext.MessageBox.WARNING,
                      buttons:Ext.MessageBox.YES
                  });
                    Ext.getCmp('merchandiseC').store.reload();
                    Ext.getCmp('window').close();

                },
                failure: function (form, action) {
                     msg = Ext.JSON.decode(action.response.responseText);
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
        var comboStore,record,window;
        //combobox的数据源
         comboStore = Ext.create('Ext.data.Store', {
            fields: ['abbr', 'name'],
            data : [
                {"abbr":"true", "name":"使用"},
                {"abbr":"false", "name":"停用"}
            ]
        });
         record = Ext.getCmp('merchandiseC').getSelectionModel().getLastSelected();
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
                            fieldLabel: '递增流水号',
                            name: 'merCInfo.id',
                            value:record.get('id'),
                            readOnly:true,
                            tooltip: '递增流水号不允许修改'
                        },
                        {
                            fieldLabel: '供应商编码',
                            name: 'merCInfo.merchandiseCid',
                            value:record.get('merchandiseCid'),
                            readOnly:true,
                            allowBlank: false,
                            tooltip: '修改供应商编码'
                        },
                        {
                            fieldLabel: '供应商名称',
                            name: 'merCInfo.merchandiseCName',
                            value:record.get('merchandiseCName'),
                            tooltip:'修改商品类别名称',
                            readOnly:true,
                            allowBlank: false
                        },
                        {
                            fieldLabel: '排序编码',
                            name: 'merCInfo.sortId',
                            value:record.get('sortId'),
                            tooltip:'商品类别排序编码不允许修改',
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
                            tooltip:'修改商品类别状态',
                            readOnly:true,
                            name: 'merCInfo.state'
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
                url: '/DeleteMerC',
                success: function (form, action) {
                     Pages = Ext.getCmp('merchandiseC').store.currentPage;
                     msg = Ext.JSON.decode(action.response.responseText);
                    Ext.MessageBox.show({
                        title:'成功',
                        msg:msg.message,
                        icon:Ext.MessageBox.WARNING,
                        buttons:Ext.MessageBox.YES
                    });
                     count=Ext.getCmp('merchandiseC').getStore().getCount();
                    if(count>=1){
                        Ext.getCmp('merchandiseC').store.reload();
                        Ext.getCmp('window').close();
                    }
                    Ext.getCmp('merchandiseC').store.loadPage(Pages);
                    Ext.getCmp('merchandiseC').store.reload();
                    Ext.getCmp('window').close();
                },
                failure: function (form, action) {
                     msg = Ext.JSON.decode(action.response.responseText);
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
        var record,list;
         record=Ext.getCmp('merchandiseC').getSelectionModel().getSelection();
         list='';
        for(var i= 0,length=Ext.getCmp('merchandiseC').getSelectionModel().getSelection().length;i<length;i++){
            list+=record[i].get('merchandiseCid');
            if(i!=length-1){
                list+=',';
            }
        }
        Ext.MessageBox.show({
            title:'删除提示',
            msg:'确实要删除【'+Ext.getCmp('merchandiseC').getSelectionModel().getSelection().length+'】条数据吗？',
            icon:Ext.MessageBox.WARNING,
            buttons:Ext.MessageBox.YESNO,
            fn:function(btn){
                if(btn=='yes'){
                    Ext.Ajax.request({
                        url:'/DeleteManyMerC?merC='+list,
                        success:function(response){
                            var msg=Ext.JSON.decode(response.responseText);
                            Ext.getCmp('merchandiseC').store.reload();
                            Ext.MessageBox.show({
                                title:'成功',
                                msg:msg.message,
                                icon:Ext.MessageBox.WARNING,
                                buttons:Ext.MessageBox.YES
                            });
                        },
                        failure:function(response){
                            var msg=Ext.JSON.decode(response.responseText);
                            Ext.getCmp('merchandiseC').store.reload();
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
        Ext.getCmp('merchandiseC').store.load({
            params: {
                merchandiseCid: Ext.getCmp('merCId').getValue(),
                merchandiseCName: Ext.getCmp('merCName').getValue()
            }
        });
    }

});
