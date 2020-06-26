import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 所有的任务列表
    list: [],
    // 文本框的内容
    inputValue: null,
    // 下一个Id
    nextId: 4,
    viewKey: 'all'
  },
  mutations: {
    initList(state, list) {
      state.list = list
    },
    setInputValue(state, val) {
      state.inputValue = val
    },
    addItem(state) {
      const obj = {
        id: state.nextId,
        info: state.inputValue.trim(),
        done: false
      }
      state.list.push(obj)
      state.nextId++
      state.inputValue = null
    },
    removeItem(state, id) {
      // 根据id查找对应项的索引
      const i = state.list.findIndex(x => x.id === id)
      // 根据索引删除对应的元素
      if (i !== -1) {
        state.list.splice(i, 1)
      }
    },
    changeStatus(state, param) {
      // 根据id查找对应项的索引
      const i = state.list.findIndex(x => x.id === param.id)
      // 根据索引删除对应的元素
      if (i !== -1) {
        const item = state.list[i]
        item.done = param.status
      }
    },
    clearDone(state) {
      state.list = state.list.filter(x => !x.done)
    },
    changeViewKey(state, key) {
      state.viewKey = key
    }
  },
  actions: {
    getList(context) {
      axios.get('./list.json').then(({ data }) => {
        // console.log(data)
        context.commit('initList', data)
      })
    }
  },
  getters: {
    rest(state) {
      return state.list.filter(x => !x.done).length
    },
    infoList(state) {
      if (state.viewKey === 'all') { return state.list }
      if (state.viewKey === 'undone') { return state.list.filter(x => !x.done) }
      if (state.viewKey === 'done') { return state.list.filter(x => x.done) }
      return state.list
    }
  },
  modules: {}
})
