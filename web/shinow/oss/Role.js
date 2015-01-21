
Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.util.*',
    'Ext.toolbar.Paging',
    'Ext.tip.QuickTipManager'
]);

Ext.define('Model.System.Role', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'id', type: 'string' },
        { name: 'text', type: 'string' },
        { name: 'level', type: 'string' }
    ]
});

Ext.define('Scripts.System.Role', {
    extend: 'Ext.panel.Panel',
    closable: true,
    layout: 'hbox',
    listeners: {
        beforeclose: function (panel, eOpts)
        {
        }
    },
    roleGridConfig: {},
    gridStore: {},
    roleGrid: {},
    tbar: [],
    roleData: {},
    treeStore: Ext.create('Ext.data.TreeStore', {
        model: 'Model.System.Role',
        proxy: {
            type: 'ajax',
            url: '/Sys/Role/GetRolePermision'
        },
        reader: {
            type: 'json'
        },
        root: {
            text: '权限信息',
            id: '0',
            expanded: true
        },
        autoLoad: false
    }),
    editTreeStore: Ext.create('Ext.data.TreeStore', {
        model: 'Model.System.Role',
        proxy: {
            type: 'ajax',
            url: '/Sys/Role/GetRolePermision'
        },
        reader: {
            type: 'json'
        },
        root: {
            text: '权限信息',
            id: '0',
            expanded: true
        },
        autoLoad: false
    }),
    editTree: function ()
    {
        var me = this;
        return Ext.create('Ext.tree.Panel', {
            width: 400,
            height: 400,
            title: '角色权限',
            border: true,
            animate: true,
            checkModel: 'cascade',
            autoScroll: true,
            rootVisible: false,
            store: me.editTreeStore,
            scope:me,
            listeners: {
                "checkchange": function (node, checked, eOpts)
                {
                    if (node.data.level == "3")
                    {
                        if (!checked)
                        {
                            node.parentNode.set('checked', checked);
                            node.parentNode.parentNode.set('checked', checked);
                        }
                        else
                        {
                            node.parentNode.set('checked', me.checkParentSelect(node.parentNode.childNodes));
                            node.parentNode.parentNode.set('checked', me.checkParentSelect(node.parentNode.parentNode.childNodes));
                        }
                    }
                    else if (node.data.level == "2")
                    {
                        if (node.childNodes.length > 0)
                        {
                            for (var i = 0; i < node.childNodes.length; i++)
                            {
                                node.childNodes[i].set('checked', checked);
                            }
                        }

                        if (!checked)
                        {
                            node.parentNode.set('checked', checked);
                        }
                        else
                        {
                            node.parentNode.set('checked', me.checkParentSelect(node.parentNode.childNodes));
                        }
                    }
                    else
                    {
                        if (node.childNodes.length > 0)
                        {
                            for (var i = 0; i < node.childNodes.length; i++)
                            {
                                node.childNodes[i].set('checked', checked);
                                if (node.childNodes[i].childNodes.length > 0)
                                {
                                    for (var j = 0; j < node.childNodes[i].childNodes.length; j++)
                                    {
                                        node.childNodes[i].childNodes[j].set('checked', checked);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
    },
    checkParentSelect: function(childs)
    {
        var me = this;
        var checkedNodes = me.editTree.getChecked();
        var num = 0;
        for (var i = 0; i < childs.length; i++)
        {
            for(var j = 0; j < checkedNodes.length; j++)
            {
                if (childs[i].data.id == checkedNodes[j].data.id)
                {
                    num++;
                    break;
                }
            }
        }
        return num == childs.length;
    },
    initComponent: function ()
    {
        var me = this;
        
        me.tbar = Shinow.cars.getActionItems(this);
        me.roleGridConfig = Shinow.cars.getGridConfig(90011010);
        me.gridStore = me.createGridStore();
        me.roleGridConfig.gridConfig.store = me.gridStore;
        me.roleGridConfig.gridConfig.scope = me;
        if (me.roleGridConfig.gridConfig.dockedItems)
        {
            me.roleGridConfig.gridConfig.dockedItems[0].store = me.gridStore;
        }

        me.roleGrid = me.gridPanel();
        me.contentPanel = me.contentPanel();
        me.contentPanel.on("load", function (node, response)
        {

        });
        me.gridStore.on({
            load: {
                fn: function ()
                {
                    me.contentPanel.store.load({ params: { roleId: 0 } });
                    me.roleData = {};
                }
            },
            scope: this
        });
        me.items = [me.roleGrid, me.contentPanel];
        me.editTree = me.editTree();

        me.roleForm = me.createRoleForm();
        me.dataWin = me.createDataWin();
        me.gridStore.load();

        this.callParent(arguments);
    },
    createGridStore: function()
    {
        var me = this;
        return Ext.create('Ext.data.Store', me.roleGridConfig.gridStore);
    },
    gridPanel: function ()
    {
        var me = this;
        return Ext.create('Ext.grid.Panel', me.roleGridConfig.gridConfig);
    },
    contentPanel: function ()
    {
        var me = this;
        return Ext.create('Ext.tree.Panel', {
            width: "25%",
            height: '100%',
            title: '角色权限',
            border: true,
            animate: true,
            autoScroll: true,
            rootVisible: false,
            store: me.treeStore,
            listeners: {
                "checkchange": function (node, checked, eOpts)
                {
                    node.set('checked', !checked);
                }
            }
        });
    },
    gridStateRenderer: function(value,cellmeta,record,rowIndex,columnIndex,store)
    {
        return "<img class='grid_icon_boolean' src='../Content/images/menu/" + (value ? "icon_right.png" : "icon_error.png") + "' alt='' />"
    },
    displayRoleTree: function (view, record, item, index, e)
    {
        var me = this;
        me.contentPanel.store.load({ params: { roleId: record.data.Id } });
        me.roleData = record.data;
    },
    refreshPage: function ()
    {
        var me = this;
        me.gridStore.load();
    },
    deleteRole: function ()
    {
        var me = this;
        var items = me.roleGrid.getSelectionModel().getSelection();
        if (items.length == 0)
        {
            Ext.Msg.alert('提示', '请选择需要删除的角色');
        }
        else
        {
            Ext.MessageBox.confirm("提示", "确认删除所选的角色 <br /> [" + items[0].data.Name + "]?", function (id)
            {
                if (id == "yes")
                {
                    Ext.Ajax.request({
                        url: '/Sys/Role/Delete',
                        async: false,
                        params: { roleId: items[0].data.Id },
                        failure: function (response)
                        {
                            Shinow.cars.showResponseErrorMessage(response.status);
                        },
                        success: function (response)
                        {
                            me.refreshPage();
                        }
                    });
                }
            });
        }
    },
    createRoleForm: function ()
    {
        return Ext.create('Ext.form.Panel', {
            frame: false,
            border: false,
            width: 390,
            bodyPadding: 5,
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 90,
                anchor: '100%'
            },
            items: [{
                xtype: 'hiddenfield',
                name: 'Id',
                value: ''
            },
            {
                xtype: 'textfield',
                name: 'Name',
                fieldLabel: '角色名称',
                value: '',
                allowBlank: false,
                emptyText: '',
                blankText: "请输入角色名称"
            },
            {
                xtype: 'numberfield',
                name: 'Sort',
                fieldLabel: '排序',
                value: 10,
                allowDecimals: false,
                minValue: 1,
                maxValue: 99999,
                allowBlank: false,
                blankText: "请输入1~99999间的整数"
            },
            {
                xtype: 'checkboxfield',
                name: 'State',
                fieldLabel: '状态',
                boxLabel: '有效',
                checked: true,
                inputValue: true
            }
            ]
        });
    },
    createDataWin: function ()
    {
        var me = this;
        return Ext.create('Ext.window.Window', {
            title: "",
            width: 410,
            resizable: false,
            draggable: true,//允许组件被拖拽
            collapsible: false,
            closeAction: 'close',
            closable: true,
            modal: 'true',
            buttonAlign: "center",
            bodyStyle: "padding:0 0 0 0",
            items: [me.roleForm, me.editTree],
            buttons: [{
                text: "保存",
                minWidth: 70,
                handler: function ()
                {
                    if (me.roleForm.getForm().isValid())
                    {
                        var entity = {};
                        entity.Id = me.roleForm.getForm().findField('Id').getValue();
                        entity.Name = Ext.String.trim(me.roleForm.getForm().findField('Name').getValue());
                        entity.Sort = me.roleForm.getForm().findField('Sort').getValue();
                        entity.State = me.roleForm.getForm().findField('State').getValue();
                        entity.RoleDetailModel = new Array();
                        if (entity.Id == "")
                        {
                            entity.Id = 0;
                        }
                        else
                        {
                            entity.Id = Number(entity.Id);
                        }

                        var checkedNodes = me.editTree.getChecked();
                        if (checkedNodes.length > 0)
                        {
                            for (var i = 0; i < checkedNodes.length; i++)
                            {
                                if (checkedNodes[i].data.level == "3")
                                {
                                    entity.RoleDetailModel.push({ ActionId: Number(checkedNodes[i].data.id) });
                                }
                            }
                        }
                        if (entity.RoleDetailModel.length == 0)
                        {
                            Ext.Msg.alert('提示', '请选择角色的授权权限');
                            return;
                        }

                        Ext.Ajax.request({
                            url: entity.Id == 0 ? "/Sys/Role/Add" : "/Sys/Role/Update",
                            async: false,
                            jsonData: entity,
                            failure: function (response)
                            {
                                Shinow.cars.showResponseErrorMessage(response.status);
                            },
                            success: function (response)
                            {
                                me.dataWin.close();
                                me.refreshPage();
                            }
                        });
                    }
                }
            }, {
                text: "关闭",
                minWidth: 70,
                handler: function ()
                {
                    me.dataWin.close();
                }
            }]
        })
    },
    addRole: function ()
    {
        var me = this;
        me.roleForm.getForm().reset();
        me.editTree.store.load({ params: { roleId: 0 } });
        me.dataWin.setTitle("添加新角色");
        me.dataWin.show();
        me.roleForm.getForm().findField('Name').focus();
    },
    editRole: function ()
    {
        var me = this;
        if (me.roleData.Id != undefined)
        {
            me.roleForm.getForm().reset();

            me.roleForm.getForm().findField('Id').setValue(me.roleData.Id);
            me.roleForm.getForm().findField('Name').setValue(me.roleData.Name);
            me.roleForm.getForm().findField('Sort').setValue(me.roleData.Sort);
            me.roleForm.getForm().findField('State').setValue(me.roleData.State);

            me.editTree.store.load({ params: { roleId: me.roleData.Id } });

            me.dataWin.setTitle("编辑角色");
            me.dataWin.show();
            me.roleForm.getForm().findField('Name').focus();
        }
        else
        {
            Ext.Msg.alert('提示', '请选择需要编辑的角色');
        }
    }
});