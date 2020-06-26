<template>
  <div id="app">
    <a-input
      placeholder="请输入任务"
      class="input"
      :value="inputValue"
      @change="handleInputValue"
    />
    <a-button type="primary" @click="addItemToList">添加事项</a-button>

    <a-list bordered :dataSource="infoList" class="list-group">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox
          :checked="item.done"
          @change="
            e => {
              itemStatusChanged(e, item.id)
            }
          "
          >{{ item.info }}</a-checkbox
        >
        <!-- 删除链接 -->
        <a slot="actions" @click="removeItemById(item.id)">删除</a>
      </a-list-item>

      <!-- footer 区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{ rest }} 条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button :type="viewKey === 'all' ? 'primary':'default'" @click="changeList('all')">全部</a-button>
          <a-button :type="viewKey === 'undone' ? 'primary':'default'" @click="changeList('undone')">未完成</a-button>
          <a-button :type="viewKey === 'done' ? 'primary':'default'" @click="changeList('done')">已完成</a-button>
        </a-button-group>
        <!-- 清空已经完成的任务 -->
        <a @click="clearDoneItems">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'App',
  created() {
    this.$store.dispatch('getList')
  },
  computed: {
    ...mapState(['inputValue', 'viewKey']),
    ...mapGetters(['rest', 'infoList'])
  },
  methods: {
    handleInputValue(e) {
      console.log(e.target.value)
      this.$store.commit('setInputValue', e.target.value)
    },
    addItemToList() {
      if (!this.inputValue) {
        return this.$message.warning('文本框内容不能为空！')
      }
      this.$store.commit('addItem')
    },
    removeItemById(id) {
      // console.log(id)
      this.$store.commit('removeItem', id)
    },
    itemStatusChanged(e, id) {
      // console.log(e.target.checked)
      const param = {
        id: id,
        status: e.target.checked
      }
      this.$store.commit('changeStatus', param)
    },
    clearDoneItems() {
      this.$store.commit('clearDone')
    },
    changeList(key) {
      // console.log(key)
      this.$store.commit('changeViewKey', key)
    }
  }
}
</script>

<style scoped>
#app {
  padding: 10px;
}

.input {
  width: 500px;
  margin-right: 10px;
}

.list-group {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
