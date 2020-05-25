
export const state = () => ({
    sceneModuleList: [
        {
            name: "Panda测试模块",
            comments: "一块只属于Panda的测试模块",
            scenes: [
                {
                    name: "语音通话主流程",
                    moduleName: "Panda测试模块",
                    comments: "语音通话的一般正确流程",
                    detail: {}
                }
            ]
        },
        {
            name: "Panda测试模块2",
            comments: "一块只属于Panda的测试模块2"
        }
    ],
    tempModuleData: {},
    tempSceneData: {}
})

export const mutations = {
    initSceneModuleList (state, sceneModuleList) {
        state.sceneModuleList = sceneModuleList;
    },
    addSceneModule(state, sceneModule) {
        let flag = false;
        state.sceneModuleList.forEach(element => {
            if(sceneModule.name == element.name) {
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
            if(rowData.name == element.name) {
                element.comments = rowData.comments;
            }
        });
    },
    deleteModuleData(state, rowData) {
        let index = -1;
        state.sceneModuleList.forEach((ele, i) => {
            if(ele.name == rowData.name) {
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
            if(element.name == rowData.moduleName) {
                let newEle = JSON.parse(JSON.stringify(rowData));
                element.scenes.push(newEle);
            }
        });
    },
    updateSceneData(state, rowData) {
        state.sceneModuleList.forEach(element => {
            if(element.name == rowData.moduleName) {
                element.scenes.forEach(scene => {
                    if(scene.name == rowData.name) {
                        scene.comments = rowData.comments;
                    }
                });
            }
        });
    },
    deleteSceneData(state, rowData) {
        state.sceneModuleList.forEach(element => {
            if(element.name == rowData.moduleName) {
                let index = -1;
                element.scenes.forEach((scene, i) => {
                    if(scene.name == rowData.name) {
                        index = i;
                    }
                });
                if(index > -1) {
                    element.scenes.splice(index, 1);
                }
            }
        });
    }
}