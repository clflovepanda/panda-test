export const state = () => ({
    serviceList: [
        {
            name: "IRimRoomService1",
            secondName: "招聘方IM中台房间服务1",
            comments: "关于招聘方视频房间相关功能1",
            interfaces: [
                {
                    name: "enterRoom",
                    secondName: "进入房间",
                    comments: "用户进入房间后客户端回调这个接口",
                    params: ""
                }
            ]
        }, {
            name: "IRimRoomService2",
            secondName: "招聘方IM中台房间服务2",
            comments: "关于招聘方视频房间相关功能2",
            interfaces: [

            ]
        }, {
            name: "IRimRoomService3",
            secondName: "招聘方IM中台房间服务3",
            comments: "关于招聘方视频房间相关功能3",
            interfaces: [

            ]
        }
    ],
    tempRowData: {},
    tempRowInfData: {},
    tempSelectService: ""
})

export const mutations = {
    initServiceData(state, serviceList) {
        state.serviceList = serviceList;
    },
    updateTempRowData(state, temp) {
        state.tempRowData = temp;
    },
    updateServiceList(state, rowData) {
        state.serviceList.forEach(element => {
            if (element.name == rowData.name) {
                element.secondName = rowData.secondName;
                element.comments = rowData.comments;
            }
        });
    },
    updateTempRowInfoData(state, temp) {
        state.tempRowInfData = temp;
    },
    updateInterfaceList(state, obj) {
        let serviceName = obj.serviceName;
        let infRowData = obj.rowData;
        state.serviceList.forEach(element => {
            if (element.name == serviceName) {
                element.interfaces.forEach(infEle => {
                    if (infEle.name == infRowData.name) {
                        infEle.secondName = infRowData.secondName;
                        infEle.comments = infRowData.comments;
                        infEle.params = infRowData.params;
                    }
                });
            }
        });
    },
    updateTempSelectService(state, data) {
        state.tempSelectService = data;
    }
}