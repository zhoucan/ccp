const user = {
  namespaced: true,
  state: {
    withdrawalDisabled: false
  },

  mutations: {
    BtnReset (state, data) {
      state.withdrawalDisabled = data
    },

    BtnLoding (state, data) {
      state.withdrawalDisabled = data
    }
  },
  actions: {

  }

}

export default user
