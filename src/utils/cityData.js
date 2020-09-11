const cityData = [
    //一级菜单
    {
        label: '北京市',
        value: 'beijing',
        //二级菜单
        children: [
            {
                label: '东城区',
                value: 'dongchengqu'
            },
            {
                label: '西城区',
                value: 'xichengqu'
            },
            {
                label: '海淀区',
                value: 'haidianqu'
            },
            {
                label: '朝阳区',
                value: 'chaoyangqu'
            }
        ]
    },
    //一级菜单
    {
        label: '河南省',
        value: 'henan',
        //二级
        children: [
            {
                
                label: '信阳市',
                value: 'xinyangshi',
                //三级
                children: [
                    {
                        label: '固始县',
                        value: 'gushixian'
                    },
                    {
                        label: '光山县',
                        value: 'guangshanxain'
                    },
                    {
                        label: '商城县',
                        value: 'shangchengxian'
                    },
                    {
                        label: '平桥区',
                        value: 'pingqiaoqu'
                    }
                ]
            },
            {
                label: '开封市',
                value: 'kaifengshi',
                children: [
                    {
                        label: '龙亭区',
                        value: 'longtingqu'
                    },
                    {
                        label: '鼓楼区',
                        value: 'gulouqu'
                    },
                    {
                        label: '金明区',
                        value: 'jinmingqu'
                    }
                ]
            },
            {
                label: '漯河市',
                value: 'luoheshi',
                children: [
                    {
                        label: '源汇区',
                        value: 'yuanhuiqu'
                    },
                    {
                        label: '昭陵区',
                        value: 'zhaolingqu'
                    },
                    {
                        label: '舞阳县',
                        value: 'wuyangxian'
                    }
                ]
            },
            {
                label: '周口市',
                value: 'zhoukoushi',
                children: [
                    {
                        label: '川汇区',
                        value: 'chuanhuiqu'
                    },
                    {
                        label: '商水县',
                        value: "shangshuixian"
                    }
                ]
            },
            {
                label: '郑州市',
                value: 'zhengzhoushi',
                children: [
                    {
                        label: '中原区',
                        value: 'zhongyuanqu'
                    },
                    {
                        label: '二七区',
                        value: 'erqiqu'
                    },
                    {
                        label: '金水区',
                        value: 'jinshuiqu'
                    }
                ]
            }
        ]
    },
    //一级菜单
    {
        label: '上海市',
        value: 'shanghai',
        //二级菜单
        children: [
            {
                label: '黄浦区',
                value: 'huangpuqu'
            },
            {
                label: '徐汇区',
                value: 'xuhuiqu'
            },
            {
                label: '长宁区',
                value: 'changningqu'
            },
            {
                label: '普陀区',
                value: 'putuoqu'
            }
        ]
    }
]
export default cityData