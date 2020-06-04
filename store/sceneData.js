
export const state = () => ({
    sceneModuleList: [
        {
            name: "Panda测试模块",
            comments: "一块只属于Panda的测试模块",
            sceneInfos: [
                {
                    name: "语音通话主流程",
                    moduleName: "Panda测试模块",
                    comments: "语音通话的一般正确流程",
                    arrangeInfos: [
                        {
                            arrangeType: "接口",
                            isComplete: true,
                            methodInfo: {}
                        }
                    ]
                }
            ]
        }
    ],
    tempModuleData: {},
    tempSceneData: {},
    nowSortModule: {},
    nowSortScene: {},
    nowSortMethod: {},
    nowSortParam: {},
})

export const mutations = {
    initSceneModuleList(state, sceneModuleList) {
        state.sceneModuleList = sceneModuleList;
    },
    addSceneModule(state, sceneModule) {
        let flag = false;
        state.sceneModuleList.forEach(element => {
            if (sceneModule.name == element.name) {
                flag = true;
                return;
            }
        });
        if (flag) {
            return;
        }
        state.sceneModuleList.push(JSON.parse(JSON.stringify(sceneModule)));
    },
    updateTempModuleData(state, temp) {
        state.tempModuleData = temp;
    },
    updateModuleData(state, rowData) {
        state.sceneModuleList.forEach(element => {
            if (rowData.name == element.name) {
                element.comments = rowData.comments;
            }
        });
    },
    deleteModuleData(state, rowData) {
        let index = -1;
        state.sceneModuleList.forEach((ele, i) => {
            if (ele.name == rowData.name) {
                index = i;
            }
        });
        state.sceneModuleList.splice(index, 1);
    },
    updateTempSceneData(state, rowData) {
        state.tempSceneData = rowData;
    },
    addScene(state, rowData) {
        state.sceneModuleList.forEach(element => {
            if (element.name == rowData.moduleName) {
                let newEle = JSON.parse(JSON.stringify(rowData));
                if (element.sceneInfos) {
                    element.sceneInfos.push(newEle);
                } else {
                    element.sceneInfos = [];
                    element.sceneInfos.push(newEle);
                }

            }
        });
    },
    updateSceneData(state, rowData) {
        state.sceneModuleList.forEach(element => {
            if (element.name == rowData.moduleName) {
                element.sceneInfos.forEach(scene => {
                    if (scene.name == rowData.name) {
                        scene.comments = rowData.comments;
                    }
                });
            }
        });
    },
    deleteSceneData(state, rowData) {
        state.sceneModuleList.forEach(element => {
            if (element.name == rowData.moduleName) {
                let index = -1;
                element.sceneInfos.forEach((scene, i) => {
                    if (scene.name == rowData.name) {
                        index = i;
                    }
                });
                if (index > -1) {
                    element.sceneInfos.splice(index, 1);
                }
            }
        });
    },
    updateNowSortModule(state, moduleName) {
        state.nowSortModule = moduleName;
    },
    updateNowSortScene(state, sceneName) {
        state.nowSortScene = sceneName;
    },
    updateNowSortMethod(state, methodIndex) {
        state.nowSortMethod = methodIndex;
    },
    updateNowSortParam(state, param) {
        state.nowSortParam = param;
    },
    addSenceInf(state, data) {
        state.sceneModuleList.forEach(element => {
            if (element.name == state.nowSortModule) {
                element.sceneInfos.forEach(el => {
                    if (el.name == state.nowSortScene) {
                        if (el.arrangeInfos == null) {
                            el.arrangeInfos = [];
                        }
                        let arrange = {
                            arrangeType: "接口",
                            isComplete: "false",
                            methodInfo: data
                        };
                        el.arrangeInfos.push(arrange);
                    }
                });
            }
        });
    },
    deleteSceneInf(state, data) {
        state.sceneModuleList.forEach(element => {
            if (element.name == state.nowSortModule) {
                element.sceneInfos.forEach(el => {
                    if (el.name == state.nowSortScene) {
                        if (el.arrangeInfos != null) {
                            el.arrangeInfos.splice(data, 1);
                        }
                    }
                });
            }
        });
    },
    updateArrangeStatus(state, data) {
        let moduleName = data.moduleName;
        let sceneName = data.sceneName;
        let arrangeMethodIndex = data.arrangeMethodIndex;
        let status = data.status;
        state.sceneModuleList.forEach(tempModule => {
            if (moduleName == tempModule.name) {
                tempModule.sceneInfos.forEach(tempScene => {
                    if (sceneName == tempScene.name) {
                        let arrangeInfo = tempScene.arrangeInfos[arrangeMethodIndex];
                        arrangeInfo.complete = status;
                    }
                });
            }
        });
    },
    setParamVal(state, data) {
        console.log("vuex:", data);
        let value = "";
        if (data.from == "全局配置") {
            value += "全局配置:" + data.value;
        } else if (data.from == "上下文数据") {
            value += "上下文数据:" + data.idx + ";" + data.value;
        } else if (data.from == "手动输入") {
            value += "手动输入:" + data.value;
        }
        state.sceneModuleList.forEach(module => {
            if (module.name == state.nowSortModule) {
                module.sceneInfos.forEach(scene => {
                    if (scene.name == state.nowSortScene) {
                        let arrange = scene.arrangeInfos[state.nowSortMethod];
                        state.nowSortParam = "" + state.nowSortParam;
                        let idx = state.nowSortParam.split("-");
                        console.log(arrange);
                        let param = arrange.methodInfo.paramInfos[parseInt(idx[0])];
                        if (idx.length > 1) {
                            for(let i = 1 ; i < idx.length ; i ++) {
                                param = param.attrs[idx[i]];
                            }
                        }
                        console.log(value);
                        param.value = value;
                        param.hasVal = true;
                        // // console.log("arrange:", arrange);
                        // state.nowSortParam = "" + state.nowSortParam;
                        // let idx = state.nowSortParam.split("-");
                        // console.log("idx:", idx);
                        // let arrange = scene.arrangeInfos[idx[0]];
                        // console.log("arrange:", arrange);
                        // if (idx.length > 1) {
                        //     let param = arrange.methodInfo.paramInfos[idx[1]];
                        //     for (let i = 2; i < idx.length; i++) {
                        //         param = param.attrs[idx[i]];
                        //     }
                        //     param.value = value;
                        //     param.hasVal = true;
                        // }
                    }
                });
            }
        });
    }
}