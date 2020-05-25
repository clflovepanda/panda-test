export const state = () => ({
    serviceEditStatus: false,
    interfaceEditStatus: false,
    moduleCreateStatus: false,
    moduleEditStatus: false,
    sceneCreateStatus: false,
    sceneEditStatus: false,
    globalConfigCreateStatus: false,
    sortServiceStatus: false,
    configParamsStatus: false
})

export const mutations = {
    updateServiceEditStatus(state, newVal) {
        state.serviceEditStatus = newVal;
    },
    updateInterfaceEditStatus(state, newVal) {
        state.interfaceEditStatus = newVal;
    },
    updateModuleCreateStatus(state, newVal) {
        state.moduleCreateStatus = newVal;
    },
    updateModuleEditStatus(state, newVal) {
        state.moduleEditStatus = newVal;
    },
    updateSceneCreateStatus(state, newVal) {
        state.sceneCreateStatus = newVal;
    },
    updateSceneEditStatus(state, newVal) {
        state.sceneEditStatus = newVal;
    },
    updateGlobalConfigCreateStatus(state, newVal) {
        state.globalConfigCreateStatus = newVal;
    },
    updateSortService(state, newVal) {
        state.sortServiceStatus = newVal;
    },
    updateConfigParamsStatus(state, newVal) {
        state.configParamsStatus = newVal;
    }
}