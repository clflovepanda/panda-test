export const state = () => ({
    status: 0
})

export const mutations = {
    change (status) {
        state.status = status
    }
}