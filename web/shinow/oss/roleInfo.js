/**
 * Created by daihui on 2014-11-30.
 */
Ext.define('shinow.oss.roleInfo', {
    extend: 'Ext.panel.Panel',
    itemsPerPage: 5,//全局
    postMenuIdData: [],
    updatePostMenuInfoData: [],
    RolesStore: '',
    jsonData:{treeNode:{children:[]}},
    initComponent: function () {
        var me = this, roleStore;
        roleStore = Ext.create('Ext.data.Store', {
            autoLoad: false,
            fields: [
                {name: 'id', type: 'Integer'},
                {name: 'roleId', type: 'String'},
                {name: 'roleName', type: 'String'},
                {name: 'sortId', type: 'Short'},
                {name: 'state', type: 'Boolean'}
            ],
            pageSize: me.itemsPerPage,
            proxy: {
                type: 'ajax',
                url: '/roleInfoPaging',
                reader: {
                    type: 'json',
                    root: 'roleInfoList',
                    totalProperty: 'rowCount'
                }
            }
        });
        roleStore.load({
            params: {
                start: 0,
                limit: me.itemsPerPage
            }
        });

        //右边展示权限的树store
//        roleTreeStore = Ext.create('Ext.data.TreeStore', {
//            autoLoad: false,
//            proxy: {
//                type: 'ajax',
//                url: '/checkTreeInfo',//请求
//                reader: {
//                    type: 'json',
//                    root: 'checkTreeList'//数据
//                }
//            },
//            root: {
//                text: '权限',
//                expanded: true
//            }
//        });

        //        Ext.Ajax.request({
//            url: '/checkTreeInfo?roleId='+RoleID,
//            async: false,
//            success: function (response) {
//                me.jsonData = response.responseText;
//                if (typeof(me.jsonData) === 'string') {
//                    me.jsonData = Ext.JSON.decode(me.jsonData);
//                }
//            }
//        });

        Ext.apply(this, {
            title: '角色管理',
            id: 'roleInfoEdit',
            layout: 'border',
            loadMask: true,
            closable: true,
            items: [
                {
                    title: '用户角色',
                    region: 'center',
                    xtype: 'grid',
                    id: 'roleInfoGrid',
                    width: '100%',
                    store: roleStore,
                    columns: [
                        {text: '角色编码', dataIndex: 'roleId'},
                        {text: '角色名称', dataIndex: 'roleName'},
                        {text: '排序编码', dataIndex: 'sortId'},
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
                    //选择grid某行展示右边的tree相对的权限
                    listeners: {
                        select: function () {
                            var record = Ext.getCmp('roleInfoGrid').getSelectionModel().getSelection()[0];
                            var RoleID = record.get('roleId');
//  Ext.getCmp('eastTreePanel').store.reload();
//                            Ext.Ajax.request({
//                                url: '/checkTreeInfo?roleId='+record.get('roleId'),
//                                success: function (response) {
//                                    var msg = Ext.JSON.decode(response.responseText);
//                                    Ext.getCmp('eastTreePanel').getRootNode().eachChild(function (item1) {
//                                        Ext.each(msg.authorizationList, function (item) {
//                                            if (item1.raw.menuId === item.myAuMenuInfoByMenuId.menuId) {
//                                                item1.set('checked', true);
//                                            }
//                                        });
//
//                                    });
//                                }
//                            });
                            Ext.Ajax.request({
                                url: '/roleIDInfoquery?roleID=' + RoleID,
                                async: false,
                                success: function (response) {
                                    me.jsonData = response.responseText;
                                    if (typeof(me.jsonData) === 'string') {
                                        me.jsonData = Ext.JSON.decode(me.jsonData);
                                        me.mystore= me.jsonData.treeNode.children;
                                        Ext.getCmp("eastTreePanel").getRootNode().removeAll(false);
                                        Ext.getCmp("eastTreePanel").setRootNode(me.jsonData.treeNode);
                                        Ext.getCmp("eastTreePanel").getRootNode().data.text = record.get('roleName');
                                        Ext.getCmp("eastTreePanel").expandAll();
                                    }
                                }
                            });
                        }
                    },
                    dockedItems: [
                        {
                            xtype: 'pagingtoolbar',
                            store: roleStore,
                            dock: 'bottom',
                            displayInfo: true
                        }
                    ],
                    tbar: [
                        {
                            xtype: 'button',
                            text: '角色添加',
                            handler: function () {
                                me.AddRoleWindow(me);
                            }
                        },
                        {
                            xtype: 'button',
                            text: '角色编辑',
                            handler: function () {
                                me.UpdateRoleWindow(me);
                            }
                        },
                        {
                            xtype: 'button',
                            text: '角色删除',
                            handler: function () {
                                me.DeleteRoleWindow(me);
                            }
                        }
                    ]
                },
                {
                    xtype: "treepanel",
                    region: 'east',
                    title: '该角色权限',
                    border: true,
                    id: 'eastTreePanel',
                    width: 210,
                    //useArrows: false,//为true时树上使用Vista-style风格的箭头
                    store: Ext.create("Ext.data.TreeStore", {
                        id: 'role_treeid',
                        fields: [
                            { name: 'id', type: 'string', mapping: 'menuInfoEntity.id'},
                            { name: 'text', type: 'string', mapping: 'menuInfoEntity.menuName'}
                        ],
                        root: {
                            text: '权限',
                            id: '-1',
                            children:  me.mystore
                        }
                    })
                }
            ]
        });
        this.callParent();
    },

    //添加角色window
    AddRoleWindow: function (param1) {

        //状态combobox数据源
        var stateStore = Ext.create('Ext.data.Store', {
            fields: ['abbr', 'name'],
            data: [
                {"abbr": "true", "name": "使用"},
                {"abbr": "false", "name": "停用"}
            ]
        });

        Ext.Ajax.request({
            url: '/checkTreeInfo',
            async: false,
            success: function (response) {
                jsonData = response.responseText;
                if (typeof(jsonData) === 'string') {
                    jsonData = Ext.JSON.decode(jsonData);
                }
            }
        });
        var roleTreeEditStore = Ext.create("Ext.data.TreeStore", {
            fields: [
                { name: 'id', type: 'string', mapping: 'menuInfoEntity.menuId'},
                { name: 'text', type: 'string', mapping: 'menuInfoEntity.menuName'}
            ],
            root: {
                text: '用户权限',
                id: '-1',
                children: jsonData.roleTreeNode.children
            }
        });

        var window = Ext.create('Ext.window.Window', {
            title: '添加角色信息',
            layout: 'fit',
            modal: true,
            id: 'addRoleWindow',
            items: [
                {
                    xtype: 'form',
                    border: false,
                    id: 'roleForm',
                    width: 270,
                    bodyPadding: '5 5 0',
                    fieldDefaults: {
                        msgTarget: 'side',
                        labelAlign: 'right'
                    },
                    defaultType: 'textfield',
                    items: [
                        {
                            fieldLabel: '角色名称',
                            name: 'roleName',
                            allowBlank: false
                        },
                        {
                            fieldLabel: '角色编码',
                            name: 'roleId',
                            allowBlank: false
                        },
                        {
                            fieldLabel: '排序编码',
                            name: 'sortId',
                            allowBlank: false
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: '状态',
                            store: stateStore,
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'abbr',
                            name: 'state'
                        },
                        {
                            xtype: 'panel',
                            border: false,
                            items: [
                                {
                                    xtype: 'treepanel',
                                    title: '角色权限',
                                    width: 260,
                                    height: 250,
                                    border: false,
                                    id: 'addRoleTree',
                                    store: roleTreeEditStore,
                                    listeners: {
                                        'checkchange': function (node, checked) {
                                            node.expand();
                                            node.checked = checked;

                                            if (true == checked) {
                                                var parent_node = node.parentNode;
                                                while (parent_node != null) {
                                                    parent_node.set('checked', checked);
                                                    parent_node = parent_node.parentNode;
                                                }
                                            }
                                            node.eachChild(function (child) {
                                                child.set('checked', checked);
                                                child.fireEvent('checkchange', child, checked);
                                            });
                                            if (Ext.getCmp("addRoleTree").getRootNode().data.id == "-1") {
                                                Ext.getCmp("addRoleTree").getRootNode().data.checked = false;
                                            }
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }
            ],
            buttonAlign: 'center',
            buttons: [
                {
                    text: '确定',
                    handler: param1.addRoleInfo

                },
                {
                    text: '取消',
                    handler: function () {
                        this.up('window').close();
                    }
                },
                {
                    text: '重置',
                    handler: function () {
                        Ext.getCmp('roleForm').getForm().reset();
                    }
                }
            ]
        });
        window.show();
        window.center();
        Ext.getCmp('addRoleTree').expandAll();//展开tree的所有节点
    },
    //添加角色方法
    addRoleInfo: function () {
        var roleInfoArray = {};
        var formData = Ext.getCmp('roleForm').query();//取所有組件
        Ext.each(formData, function (item1) {
            if (item1) {
                if (item1.xtype == 'combobox' || item1.xtype == 'textfield') {
                    roleInfoArray[item1.name] = item1.lastValue;
                }
            }
        });
        //遍历被选中的tree
        var roleTree = [];
        var checkedTree = Ext.getCmp('addRoleTree').getChecked();
        Ext.each(checkedTree, function (item, index) {
            if (item.data.id != '-1') {
                roleTree[index] = {};
                roleTree[index].menuId = item.data.id;
            }
        });

        var form = Ext.create('Ext.form.Panel', {});//伪form
        if (form.isValid()) {
            form.submit({
                url: '/addRoleInfo',
                jsonSubmit: true,
                params: {
                    menuInfoList: roleTree,
                    roleInfo: roleInfoArray
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
                        Ext.getCmp('roleInfoGrid').store.reload();
                        Ext.getCmp('deleteRoleWindow').close();
                    } else {
                        Ext.MessageBox.show({
                            title: '提示',
                            msg: msg.message,
                            icon: Ext.MessageBox.QUESTION,
                            buttons: Ext.MessageBox.YES
                        });
                        Ext.getCmp('roleInfoGrid').store.reload();
                        Ext.getCmp('addRoleWindow').close();
                    }
                },
                failure: function () {
                    Ext.MessageBox.show({
                        title: '提示',
                        msg: '网络超时，数据可能已经添加到数据库，请检查！',
                        icon: Ext.MessageBox.QUESTION,
                        buttons: Ext.MessageBox.YES
                    });
                }
            });
        }
    },

    //修改角色的window
    UpdateRoleWindow: function (param2) {
        //状态combobox数据源
        var updateStateStore = Ext.create('Ext.data.Store', {
            fields: ['abbr', 'name'],
            data: [
                {"abbr": "true", "name": "使用"},
                {"abbr": "false", "name": "停用"}
            ]
        });

        //修改权限的tree
        Ext.Ajax.request({
            url: '/checkTreeInfo',
            async: false,
            success: function (response) {
                jsonData = response.responseText;
                if (typeof(jsonData) === 'string') {
                    jsonData = Ext.JSON.decode(jsonData);
                }
            }
        });
        var roleTreeUpdateStore = Ext.create("Ext.data.TreeStore", {
            fields: [
                { name: 'id', type: 'string', mapping: 'menuInfoEntity.menuId'},
                { name: 'text', type: 'string', mapping: 'menuInfoEntity.menuName'}
            ],
            root: {
                text: '用户权限',
                id: '-1',
                children: jsonData.roleTreeNode.children
            }
        });
        var record = Ext.getCmp('roleInfoGrid').getSelectionModel().getSelection()[0];
        var window = Ext.create('Ext.window.Window', {
            title: '修改角色信息',
            layout: 'fit',
            modal: true,
            id: 'updateRoleWindow',
            items: [
                {
                    xtype: 'form',
                    border: false,
                    id: 'roleUpdateForm',
                    width: 270,
                    bodyPadding: '5 5 0',
                    fieldDefaults: {
                        msgTarget: 'side',
                        labelAlign: 'right'
                    },
                    defaultType: 'textfield',
                    items: [
                        {
                            fieldLabel: '角色名称',
                            name: 'roleName',
                            value: record.get('roleName'),
                            allowBlank: false
                        },
                        {
                            fieldLabel: '角色编码',
                            name: 'roleId',
                            value: record.get('roleId'),
                            readOnly: true,
                            allowBlank: false
                        },
                        {
                            fieldLabel: '排序编码',
                            name: 'sortId',
                            value: record.get('sortId'),
                            allowBlank: false
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: '状态',
                            store: updateStateStore,
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'abbr',
                            value: record.get('state'),
                            name: 'state'
                        },
                        {
                            xtype: 'panel',
                            border: false,
                            items: [
                                {
                                    xtype: 'treepanel',
                                    title: '角色权限',
                                    width: 260,
                                    height: 250,
                                    border: false,
                                    useArrows: false,
                                    rootVisible: false,
                                    id: 'updateRoleTree',
                                    store: roleTreeUpdateStore,
                                    listeners: {
                                        'checkchange': function (node, checked) {
                                            node.expand();
                                            node.checked = checked;

                                            if (true == checked) {
                                                var parent_node = node.parentNode;
                                                while (parent_node != null) {
                                                    parent_node.set('checked', checked);
                                                    parent_node = parent_node.parentNode;
                                                }
                                            }
                                            node.eachChild(function (child) {
                                                child.set('checked', checked);
                                                child.fireEvent('checkchange', child, checked);
                                            });
                                            if (Ext.getCmp("updateRoleTree").getRootNode().data.id == "-1") {
                                                Ext.getCmp("updateRoleTree").getRootNode().data.checked = false;
                                            }
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }
            ],
            buttonAlign: 'center',
            buttons: [
                {
                    text: '确定',
                    handler: param2.updateRoleInfo


                },
                {
                    text: '取消',
                    handler: function () {
                        this.up('window').close();
                    }
                },
                {
                    text: '重置',
                    handler: function () {
                        Ext.getCmp('roleUpdateForm').getForm().reset();
                    }
                }
            ]
        });
        window.show();
        window.center();
        Ext.getCmp('updateRoleTree').expandAll();//展开tree的所有节点
    },
    //修改角色方法
    updateRoleInfo: function () {
        var updateRoleInfoArray = {},
            formData,//取所有組件
            form;//伪form
        formData = Ext.getCmp('roleUpdateForm').query();
        Ext.each(formData, function (item1) {
            if (item1) {
                if (item1.xtype == 'combobox' || item1.xtype == 'textfield') {
                    updateRoleInfoArray[item1.name] = item1.lastValue;
                }
            }
        });

        //修改角色的tree提交时的遍历
        var roleTree = [];
        var checkedTree = Ext.getCmp('updateRoleTree').getChecked();
        Ext.each(checkedTree, function (item, index) {
            if (item.data.id != '-1') {
                roleTree[index] = {};
                roleTree[index].menuId = item.data.id;
            }
        });

        form = Ext.create('Ext.form.Panel', {});
        if (form.isValid()) {
            form.submit({
                url: '/updateRoleInfo',
                jsonSubmit: true,
                params: {
                    updateMenuInfoList: roleTree,
                    updateRoleInfo: updateRoleInfoArray
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
                        Ext.getCmp('roleInfoGrid').store.reload();
                        Ext.getCmp('updateRoleWindow').close();
                    } else {
                        Ext.MessageBox.show({
                            title: '提示',
                            msg: msg.message,
                            icon: Ext.MessageBox.QUESTION,
                            buttons: Ext.MessageBox.YES
                        });
                        Ext.getCmp('roleInfoGrid').store.reload();
                        Ext.getCmp('updateRoleWindow').close();
                    }
                },
                failure: function () {
                    Ext.MessageBox.show({
                        title: '提示',
                        msg: '网络超时，数据可能已经修改到数据库，请检查！',
                        icon: Ext.MessageBox.QUESTION,
                        buttons: Ext.MessageBox.YES
                    });
                }
            });
        }
    },

    //删除角色的window
    DeleteRoleWindow: function (param3) {
        //状态combobox数据源
        var deleteStateStore = Ext.create('Ext.data.Store', {
            fields: ['abbr', 'name'],
            data: [
                {"abbr": "true", "name": "使用"},
                {"abbr": "false", "name": "停用"}
            ]
        });
        var record = Ext.getCmp('roleInfoGrid').getSelectionModel().getSelection()[0];
        var window = Ext.create('Ext.window.Window', {
            title: '确定删除该角色和权限吗？',
            layout: 'fit',
            modal: true,
            id: 'deleteRoleWindow',
            items: [
                {
                    xtype: 'form',
                    border: false,
                    id: 'roleDeleteForm',
                    width: 270,
                    bodyPadding: '5 5 0',
                    fieldDefaults: {
                        msgTarget: 'side',
                        labelAlign: 'right'
                    },
                    defaultType: 'textfield',
                    items: [
                        {
                            fieldLabel: '角色名称',
                            name: 'roleName',
                            value: record.get('roleName'),
                            readOnly: true,
                            allowBlank: false
                        },
                        {
                            fieldLabel: '角色编码',
                            name: 'roleId',
                            value: record.get('roleId'),
                            readOnly: true,
                            allowBlank: false
                        },
                        {
                            fieldLabel: '排序编码',
                            name: 'sortId',
                            value: record.get('sortId'),
                            readOnly: true,
                            allowBlank: false
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: '状态',
                            store: deleteStateStore,
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'abbr',
                            value: record.get('state'),
                            readOnly: true,
                            name: 'state'
                        }
                    ]
                }
            ],
            buttonAlign: 'center',
            buttons: [
                {
                    text: '确定',
                    handler: function () {
                        param3.deleteRoleInfo()

                    }
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
    //删除角色方法
    deleteRoleInfo: function () {
        var deleteRoleInfoArray = {},
            formData,//取所有組件
            form;//伪form
        formData = Ext.getCmp('roleDeleteForm').query();
        Ext.each(formData, function (item1) {
            if (item1) {
                if (item1.xtype == 'combobox' || item1.xtype == 'textfield') {
                    deleteRoleInfoArray[item1.name] = item1.lastValue;
                }
            }
        });

        form = Ext.create('Ext.form.Panel', {});
        if (form.isValid()) {
            form.submit({
                url: '/deleteRoleInfo',
                jsonSubmit: true,
                params: {
                    deleteRoleInfo: deleteRoleInfoArray
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
                        Ext.getCmp('roleInfoGrid').store.reload();
                        Ext.getCmp('deleteRoleWindow').close();
                    } else {
                        Ext.MessageBox.show({
                            title: '提示',
                            msg: msg.message,
                            icon: Ext.MessageBox.QUESTION,
                            buttons: Ext.MessageBox.YES
                        });
                        Ext.getCmp('roleInfoGrid').store.reload();
                        Ext.getCmp('deleteRoleWindow').close();
                    }
                },
                failure: function () {
                    Ext.MessageBox.show({
                        title: '提示',
                        msg: '网络超时，数据可能已经删除到数据库，请检查！',
                        icon: Ext.MessageBox.QUESTION,
                        buttons: Ext.MessageBox.YES
                    });
                }
            });
        }
    }
});