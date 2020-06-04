export const state = () => ({
    status: 0
})

export const mutations = {
    change (status) {
        state.status = status
    }
}

export const actions = {
    async nuxtServerInit({commit}, {req, app}){
        const temp = await app.$axios.get("http://127.0.0.1:3000/api/getServiceDomTree", {
            params: {
                param: "abc"
            }
        });
        let data1 = decodeURIComponent(temp.data);
        commit("serviceData/initServiceData", JSON.parse(data1));

        const modules = await app.$axios.get("http://127.0.0.1:3000/api/getModuleList", {
            params: {
                param: "abc"
            }
        });
        let d = modules.data;
        if (d == null || d == "") {
            d = "[]";
        }
        let data2 = decodeURIComponent(d);
        commit("sceneData/initSceneModuleList", JSON.parse(data2));
    }
}