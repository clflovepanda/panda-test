
export const state = () => ({
    globalConfigList: [
        {
            name: "UserEId",
            type: "Long",
            value: "123456",
            comments: "用于测试的招聘方ID"
        },{
            name: "UserCId",
            type: "Long",
            value: "333444",
            comments: "用于测试的招聘方ID"
        }
    ]
})

export const mutations = {
    add(state, config) {
        state.globalConfigList.push(JSON.parse(JSON.stringify(config)));
    },
    delete(state, config) {
        let index = -1;
        state.globalConfigList.forEach((element, i) => {
            if (config.name == element.name) {
                index = i;
            }
        });
        state.globalConfigList.splice(index, 1);
    }
}