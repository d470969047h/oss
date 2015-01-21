/**
 * Created by daihui on 2014/10/26.
 */
/**
 * Created by Administrator on 2014/10/24.
 */
Ext.define('main', {
    extend: 'Ext.container.Viewport',
    initComponent: function () {
        var me = this;
        //treeStore
        var opername = document.getElementById("aa").value;

        //登陆左边tree的store
        Ext.Ajax.request({
            url: '/MainMenu',
            async: false,
            success: function (response) {
                me.jsonData = response.responseText;
                if (typeof(me.jsonData) === 'string') {
                    me.jsonData = Ext.JSON.decode(me.jsonData);
                }
            }
        });
        var role_treestore = Ext.create("Ext.data.TreeStore", {
            id: 'role_treeid',
            fields: [
                { name: 'id', type: 'string', mapping: 'menuInfoEntity.menuId'},
                { name: 'text', type: 'string', mapping: 'menuInfoEntity.menuName'}
            ],
            root: {
                text: '系统菜单管理',
                id: '-1',
                children: me.jsonData.treeNode.children
            }
        });

        Ext.apply(this, {
            layout: 'border',
            items: [
                {
                    region: 'north',
                    xtype: 'toolbar',
                    border: false,
                    height: 80,
                    style: {
                        backgroundColor: '#1b96a9'
                    },

                    items: [
                        {
                            xtype: 'button',
                            iconCls: 'logo',
                            scale: 'large',
                            height: 74,
                            width: 324,
                            style: {
                                borderStyle: 'none',
                                padding: 0,
                                marginLeft: '10px'
                            },
                            listeners: {
                                click: function () {
                                    window.location = '/main.action'
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            iconCls: 'sockt',
                            scale: 'large',
                            height: 70,
                            width: 95,
                            menu: [
                                {
                                    text: '仓库管理',
                                    menu: [
                                        {
                                            text: '商品入库查询',
                                            listeners: {
                                                click: function () {
                                                    Ext.require('shinow.oss.inStockQuery', function () {

                                                        var center = Ext.getCmp('tabCenter');
                                                        var tab = center.items.get('inStockQueryGrid');
                                                        if (!tab) {
                                                            var obj = Ext.create('shinow.oss.inStockQuery');
                                                            center.add(obj);
                                                            center.setActiveTab(obj);
                                                        }
                                                        else {
                                                            if (center.setActiveTab() !== tab) {
                                                                center.setActiveTab(tab);
                                                            }
                                                        }
                                                    }, this);

                                                }
                                            }
                                        },
                                        {
                                            text: '商品出库查询',
                                            listeners: {
                                                click: function () {
                                                    Ext.require('shinow.oss.outStockQuery', function () {

                                                        var center = Ext.getCmp('tabCenter');
                                                        var tab = center.items.get('outStockQueryGrid');
                                                        if (!tab) {
                                                            var obj = Ext.create('shinow.oss.outStockQuery');
                                                            center.add(obj);
                                                            center.setActiveTab(obj);
                                                        }
                                                        else {
                                                            if (center.setActiveTab() !== tab) {
                                                                center.setActiveTab(tab);
                                                            }
                                                        }
                                                    }, this);

                                                }
                                            }
                                        },
                                        {
                                            text: '库存信息查看',
                                            listeners: {
                                                click: function () {
                                                    Ext.require('shinow.oss.StockInfo', function () {

                                                        var center = Ext.getCmp('tabCenter');
                                                        var tab = center.items.get('stockInfoGrid');
                                                        if (!tab) {
                                                            var obj = Ext.create('shinow.oss.StockInfo');
                                                            center.add(obj);
                                                            center.setActiveTab(obj);
                                                        }
                                                        else {
                                                            if (center.setActiveTab() !== tab) {
                                                                center.setActiveTab(tab);
                                                            }
                                                        }
                                                    }, this);

                                                }
                                            }
                                        }
                                    ]
                                }
                            ],
                            style: {
                                borderStyle: 'none',
                                padding: 0,
                                marginLeft: '30px'
                            },
                            listeners: {
                                mouseover: function (btn) {
                                    btn.showMenu();
                                    btn.setIcon('images/sockt1.png');
                                    Ext.create('Ext.menu.Menu', {
                                        width: 100,
                                        id: 'firstMenu',
                                        floating: false
                                    });
                                },
                                mouseout: function (btn) {
                                    btn.setIcon('images/sockt.png');
                                    Ext.getCmp('firstMenu').hide();
                                }

                            }
                        },
                        {

                            xtype: 'button',
                            iconCls: 'buy',
                            scale: 'large',
                            height: 70,
                            width: 95,
                            style: {
                                borderStyle: 'none',
                                padding: 0,
                                marginLeft: '15px'
                            },
                            listeners: {
                                mouseover: function (btn) {
                                    btn.setIcon('images/buy1.png');
                                },
                                mouseout: function (btn) {
                                    btn.setIcon('images/buy.png');
                                },

                                click: function () {
                                    Ext.require('shinow.oss.inStock', function () {

                                        var center = Ext.getCmp('tabCenter');
                                        var tab = center.items.get('inStockGrid');
                                        if (!tab) {
                                            var obj = Ext.create('shinow.oss.inStock');
                                            center.add(obj);
                                            center.setActiveTab(obj);
                                        }
                                        else {
                                            if (center.setActiveTab() !== tab) {
                                                center.setActiveTab(tab);
                                            }
                                        }
                                    }, this);

                                }
                            }
                        },
                        {
                            xtype: 'button',
                            iconCls: 'sell',
                            scale: 'large',
                            height: 70,
                            width: 95,
                            style: {
                                borderStyle: 'none',
                                padding: 0,
                                marginLeft: '15px'
                            },
                            listeners: {
                                mouseover: function (btn) {
                                    btn.setIcon('images/sell1.png');
                                },
                                mouseout: function (btn) {
                                    btn.setIcon('images/sell.png');
                                },
                                click: function () {
                                    Ext.require('shinow.oss.outStock', function () {

                                        var center = Ext.getCmp('tabCenter');
                                        var tab = center.items.get('outStockGrid');
                                        if (!tab) {
                                            var obj = Ext.create('shinow.oss.outStock');
                                            center.add(obj);
                                            center.setActiveTab(obj);
                                        }
                                        else {
                                            if (center.setActiveTab() !== tab) {
                                                center.setActiveTab(tab);
                                            }
                                        }
                                    }, this);

                                }
                            }
                        },
                        {
                            xtype: 'button',
                            iconCls: 'money',
                            scale: 'large',
                            height: 70,
                            width: 95,
                            style: {
                                borderStyle: 'none',
                                padding: 0,
                                marginLeft: '15px'
                            },
                            listeners: {
                                mouseover: function (btn) {
                                    btn.setIcon('images/money1.png');
                                },
                                mouseout: function (btn) {
                                    btn.setIcon('images/money.png');
                                }
                            }

                        },
                        {
                            xtype: 'button',
                            iconCls: 'baobiao',
                            scale: 'large',
                            height: 70,
                            width: 95,
                            style: {
                                borderStyle: 'none',
                                padding: 0,
                                marginLeft: '15px'
                            },
                            listeners: {
                                mouseover: function (btn) {
                                    btn.setIcon('images/baobiao1.png');

                                },
                                mouseout: function (btn) {
                                    btn.setIcon('images/baobiao.png');
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            iconCls: 'seting',
                            scale: 'large',
                            height: 70,
                            width: 95,
                            menu: [
                                {
                                    text: '基础资料',
                                    floating: false,
                                    menu: [
                                        {
                                            text: '供应商管理',
                                            floating: false,
                                            listeners: {
                                                click: function () {
                                                    Ext.require('shinow.oss.supplier', function () {

                                                        var center = Ext.getCmp('tabCenter');
                                                        var tab = center.items.get('supplier');
                                                        if (!tab) {
                                                            var obj = Ext.create('shinow.oss.supplier');
                                                            center.add(obj);
                                                            center.setActiveTab(obj);
                                                        }
                                                        else {
                                                            if (center.setActiveTab() !== tab) {
                                                                center.setActiveTab(tab);
                                                            }
                                                        }
                                                    }, this);

                                                }
                                            }
                                        },
                                        {
                                            text: '商品管理',
                                            floating: false,
                                            listeners: {
                                                click: function () {
                                                    Ext.require('shinow.oss.merchandiseInfo', function () {

                                                        var center = Ext.getCmp('tabCenter');
                                                        var tab = center.items.get('merchandiseInfoGrid');
                                                        if (!tab) {
                                                            var obj = Ext.create('shinow.oss.merchandiseInfo');
                                                            center.add(obj);
                                                            center.setActiveTab(obj);
                                                        }
                                                        else {
                                                            if (center.setActiveTab() !== tab) {
                                                                center.setActiveTab(tab);
                                                            }
                                                        }
                                                    }, this);

                                                }
                                            }
                                        }

                                    ]
                                },
                                {
                                    text: '辅助资料',
                                    floating: false,

                                    menu: [
                                        {
                                            text: '促销状态维护',
                                            listeners: {
                                                click: function () {
                                                    Ext.require('shinow.oss.proStatus', function () {
                                                        var center = Ext.getCmp('tabCenter');
                                                        var tab = center.items.get('proStatus');
                                                        if (!tab) {
                                                            var obj = Ext.create('shinow.oss.proStatus');
                                                            center.add(obj);
                                                            center.setActiveTab(obj);
                                                        }
                                                        else {
                                                            if (center.setActiveTab() !== tab) {
                                                                center.setActiveTab(tab);
                                                            }
                                                        }
                                                    }, this);
                                                }
                                            },
                                            floating: false
                                        },
                                        {
                                            text: '商品类别维护',
                                            floating: false,
                                            listeners: {
                                                click: function () {
                                                    Ext.require('shinow.oss.merchandiseClass', function () {

                                                        var center = Ext.getCmp('tabCenter');
                                                        var tab = center.items.get('merchandiseC');
                                                        if (!tab) {
                                                            var obj = Ext.create('shinow.oss.merchandiseClass');
                                                            center.add(obj);
                                                            center.setActiveTab(obj);
                                                        }
                                                        else {
                                                            if (center.setActiveTab() !== tab) {
                                                                center.setActiveTab(tab);
                                                            }
                                                        }
                                                    }, this);

                                                }
                                            }
                                        },
                                        {
                                            text: '商品单位维护',
                                            floating: false,
                                            listeners: {
                                                click: function () {
                                                    Ext.require('shinow.oss.unitInfo', function () {

                                                        var center = Ext.getCmp('tabCenter');
                                                        var tab = center.items.get('unitInfoGrid');
                                                        if (!tab) {
                                                            var obj = Ext.create('shinow.oss.unitInfo');
                                                            center.add(obj);
                                                            center.setActiveTab(obj);
                                                        }
                                                        else {
                                                            if (center.setActiveTab() !== tab) {
                                                                center.setActiveTab(tab);
                                                            }
                                                        }
                                                    }, this);

                                                }
                                            }
                                        },
                                        {
                                            text: '商品信息维护',
                                            floating: false
                                        },
                                        {
                                            text: '用户角色分类维护',
                                            floating: false,
                                            listeners: {
                                                click: function () {
                                                    Ext.require('shinow.oss.roleInfo', function () {

                                                        var center = Ext.getCmp('tabCenter');
                                                        var tab = center.items.get('roleInfoGrid');
                                                        if (!tab) {
                                                            var obj = Ext.create('shinow.oss.roleInfo');
                                                            center.add(obj);
                                                            center.setActiveTab(obj);
                                                        }
                                                        else {
                                                            if (center.setActiveTab() !== tab) {
                                                                center.setActiveTab(tab);
                                                            }
                                                        }
                                                    }, this);

                                                }
                                            }
                                        },
                                        {
                                            text: '系统菜单维护',
                                            floating: false
                                        }
                                    ]
                                },
                                {
                                    text: '高级设置',
                                    floating: false,
                                    menu: [
                                        {
                                            text: '操作日志查询',
                                            floating: false
                                        }
                                    ]
                                }
                            ],
                            style: {
                                borderStyle: 'none',
                                padding: 0,
                                marginLeft: '15px'
                            },
                            listeners: {
                                mouseover: function (btn) {
                                    this.showMenu();
                                    btn.setIcon('images/seting1.png');

                                },
                                mouseout: function (btn) {
                                    btn.setIcon('images/seting.png');
                                }
                            }

                        },
                        '->',       //等于 { xtype: 'tbfill' },
                        {
                            xtype: 'button',
                            id: 'layout',
                            text: '注销',
                            listeners: {
                                click: function () {
                                    Ext.Msg.alert("提示", "注销成功！");
                                    window.location = '/layout.action'
                                }
                            }
                        }
                    ]
                },
                {
                    region: 'south',
                    xtype: 'panel',
                    //title: '友情提示',
                    html: "<table style= 'border=1px;height=22px;width:1336px;margin: 0 0 4px 0'>" +
                        "<tr>" +
                        "<td valign='middle'>" +
                        "<marquee direction=left scrollamount=2 scrolldelay=60 onmouseover='this.stop()' onmouseout='this.start()'>" +
                        "<div style='float: left;margin:2px 0 0 0'>欢迎<span style='color: mediumvioletred'>" + opername + "</span>，今天是双十二" + opername + "一定要监控好物流订单哦！要不然会赔钱的哦!</div></MARQUEE>" +
                        "</td>" +
                        "</tr>" +
                        "</table>",
                    bodyStyle: {
                        backgroundColor: '#157ECB'
                    },
                    margins: '0 0 0 0'
                },
                //
                {
                    xtype: 'treepanel',
                    region: 'west',
                    id: 'westPanel',
                    width: 175,
                    store: role_treestore,
                    listeners: {
                        itemclick: function (treePanel, record) {
                            Ext.require(record.raw.menuInfoEntity.url, function () {
                                var center = Ext.getCmp('tabCenter');
                                var tab = center.items.get(record.raw.menuInfoEntity.tag);
                                if (!tab) {
                                    var obj = Ext.create(record.raw.menuInfoEntity.url);
                                    center.add(obj);
                                    center.setActiveTab(obj);
                                }
                                else {
                                    if (center.setActiveTab() !== tab) {
                                        center.setActiveTab(tab);
                                    }
                                }
                            }, this);
                        }
                    }
                },
                {
                    title: '快速查看',
                    region: 'east',
                    xtype: 'panel',
                    collapsible: true,
                    collapsed: true,//默认是缩进状态
                    width: 220,
                    id: 'west-region-container',
                    layout: 'accordion',
                    items: [
                        {
                            title: '天气预报',
                            html: '<iframe allowtransparency="true" frameborder="0" width="140" height="300" scrolling="no" src="http://tianqi.2345.com/plugin/widget/index.htm?s=2&z=3&t=1&v=1&d=3&bd=0&k=000000&f=&q=1&e=1&a=1&c=54511&w=140&h=300&align=center"></iframe>'
                        },
                        {
                            title: '日历',
                            items: [
                                Ext.create('Ext.panel.Panel', {
                                    width: 210,
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'datepicker',
                                            minDate: new Date(),
                                            handler: function (picker, date) {
                                            }
                                        }
                                    ]
                                })
                            ]

                        }

                    ]
                },

                {
                    region: 'center',
                    id: 'tabCenter',
                    xtype: 'tabpanel',
                    deferredRender: false,
                    activeTab: 0,
                    items: [
                        {
                            title: '首页',
                            bodyPadding: 50,
                            defaults: {
                                width: 912
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: {
                                        type: 'table',
                                        columns: 4
                                    },
                                    defaults: {
                                        width: 228,
                                        height: 166,
                                        border: false
                                    },
                                    items: [
                                        {
                                            xtype: 'button',
                                            iconCls: 'center1',
                                            id: 'center1',
                                            scale: 'large',
                                            style: {
                                                borderStyle: 'none',
                                                padding: 0
                                            },
                                            listeners: {
                                                mouseover: function (btn) {
                                                    btn.setIcon('images/center1a.png');
                                                },
                                                mouseout: function (btn) {
                                                    btn.setIcon('images/center1.png');
                                                },
                                                click: function () {
                                                    Ext.require('shinow.oss.inStock', function () {

                                                        var center = Ext.getCmp('tabCenter');
                                                        var tab = center.items.get('inStockGrid');
                                                        if (!tab) {
                                                            var obj = Ext.create('shinow.oss.inStock');
                                                            center.add(obj);
                                                            center.setActiveTab(obj);
                                                        }
                                                        else {
                                                            if (center.setActiveTab() !== tab) {
                                                                center.setActiveTab(tab);
                                                            }
                                                        }
                                                    }, this);

                                                }
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            iconCls: 'center2',
                                            scale: 'large',
                                            style: {
                                                borderStyle: 'none',
                                                padding: 0
                                            },
                                            listeners: {
                                                mouseover: function (btn) {
                                                    btn.setIcon('images/center2a.png');
                                                },
                                                mouseout: function (btn) {
                                                    btn.setIcon('images/center2.png');
                                                },
                                                click: function () {
                                                    Ext.require('shinow.oss.outStock', function () {

                                                        var center = Ext.getCmp('tabCenter');
                                                        var tab = center.items.get('outStockGrid');
                                                        if (!tab) {
                                                            var obj = Ext.create('shinow.oss.outStock');
                                                            center.add(obj);
                                                            center.setActiveTab(obj);
                                                        }
                                                        else {
                                                            if (center.setActiveTab() !== tab) {
                                                                center.setActiveTab(tab);
                                                            }
                                                        }
                                                    }, this);

                                                }
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            iconCls: 'center3',
                                            scale: 'large',
                                            style: {
                                                borderStyle: 'none',
                                                padding: 0
                                            },
                                            listeners: {
                                                mouseover: function (btn) {
                                                    btn.setIcon('images/center3a.png');
                                                },
                                                mouseout: function (btn) {
                                                    btn.setIcon('images/center3.png');
                                                }

                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            iconCls: 'center4',
                                            scale: 'large',
                                            style: {
                                                borderStyle: 'none',
                                                padding: 0
                                            },
                                            listeners: {
                                                mouseover: function (btn) {
                                                    btn.setIcon('images/center4a.png');
                                                },
                                                mouseout: function (btn) {
                                                    btn.setIcon('images/center4.png');
                                                },
                                                click: function () {
                                                    Ext.require('shinow.oss.StockInfo', function () {

                                                        var center = Ext.getCmp('tabCenter');
                                                        var tab = center.items.get('stockInfoGrid');
                                                        if (!tab) {
                                                            var obj = Ext.create('shinow.oss.StockInfo');
                                                            center.add(obj);
                                                            center.setActiveTab(obj);
                                                        }
                                                        else {
                                                            if (center.setActiveTab() !== tab) {
                                                                center.setActiveTab(tab);
                                                            }
                                                        }
                                                    }, this);

                                                }
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            iconCls: 'center5',
                                            scale: 'large',
                                            style: {
                                                borderStyle: 'none',
                                                padding: 0
                                            },
                                            listeners: {
                                                mouseover: function (btn) {
                                                    btn.setIcon('images/center5a.png');
                                                },
                                                mouseout: function (btn) {
                                                    btn.setIcon('images/center5.png');
                                                }
                                            }
                                        }
                                        ,
                                        {
                                            xtype: 'button',
                                            iconCls: 'center6',
                                            scale: 'large',
                                            style: {
                                                borderStyle: 'none',
                                                padding: 0
                                            },
                                            listeners: {
                                                mouseover: function (btn) {
                                                    btn.setIcon('images/center6a.png');
                                                },
                                                mouseout: function (btn) {
                                                    btn.setIcon('images/center6.png');
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            iconCls: 'center7',
                                            scale: 'large',
                                            style: {
                                                borderStyle: 'none',
                                                padding: 0
                                            },
                                            listeners: {
                                                mouseover: function (btn) {
                                                    btn.setIcon('images/center7a.png');
                                                },
                                                mouseout: function (btn) {
                                                    btn.setIcon('images/center7.png');
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            iconCls: 'center8',
                                            scale: 'large',
                                            style: {
                                                borderStyle: 'none',
                                                padding: 0
                                            },
                                            listeners: {
                                                mouseover: function (btn) {
                                                    btn.setIcon('images/center8a.png');
                                                },
                                                mouseout: function (btn) {
                                                    btn.setIcon('images/center8.png');
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]


                        }
                    ]
                }
            ]
        });
        this.callParent();
        Ext.getCmp('westPanel').expandAll();

    }
});
