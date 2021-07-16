<template>
 <div class="list">
   <div class="backbtn">
        <el-button @click="goBack"  el-button icon="el-icon-arrow-left" circle></el-button>
   </div>
  <div class="content">
      <el-card class="box-card">
        <el-form :inline="true" ref="ruleForm" :model="formInline" class="demo-form-inline">
          <el-row>
            <el-col :xs="6" :md="3">
            <el-form-item>
              <el-input v-model="formInline.toAddress" placeholder="提现地址"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="6" :md="3">
            <el-form-item>
                <el-input v-model="formInline.hash" placeholder="hahs值"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="6" :md="3">
              <el-form-item>
                <el-select v-model="formInline.cashStatus" placeholder="状态" clearable>
                   <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-row>
          </el-form>
         <el-table
                ref="tableRef"
                :height="tableHeight"
                :data="tableData"
                style="width: 100%">
                <el-table-column
                type="index"
                label="序号"
                width="100">
              </el-table-column>
                <el-table-column
                  prop="toAddress"
                  label="提现地址"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="cashStatus"
                  label="状态"
                  width="180">
                  <template slot-scope="scope">
                    <p v-if="scope.row.cashStatus == true">完成</p>
                    <p v-if="scope.row.cashStatus == false">未完成</p>
                </template>
                </el-table-column>
                <el-table-column
                prop="hash"
                label="交易hash"
                width="180">
              </el-table-column>
                <el-table-column
                  prop="amount"
                  label="金额">
                </el-table-column>
                 <el-table-column
                  prop="createTime"
                  label="创建时间">
                </el-table-column>
                <el-table-column
                prop="updateTime"
                label="完成时间">
              </el-table-column>
               </el-table>
               <el-row type="flex"  justify="end">
                <el-pagination
                class="pagination"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="this.formInline.currentPage"
                :page-sizes="[10, 20, 30]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
              </el-pagination>
              </el-row>
      </el-card>
  </div>
 </div>
</template>

<script>
import { cppOutRechargeList } from '@/api'
export default {
  data () {
    return {
      options: [{
        value: '1',
        label: '完成'
      },
      {
        value: '0',
        label: '未完成'
      }],
      tableData: [],
      formInline: {
        pageNum: 1,
        pageSize: 10
      },
      tableHeight: 500,
      total: 0
    }
  },
  created () {
    this.getcppOutRechargeList()
  },
  mounted () {
    this.$nextTick(() => {
      this.tableHeight = window.innerHeight - this.$refs.tableRef.$el.getBoundingClientRect().top - 137
      window.onresize = () => {
        this.tableHeight = window.innerHeight - this.$refs.tableRef.$el.getBoundingClientRect().top - 137
      }
    })
  },
  methods: {
    onSubmit () {
      this.getcppOutRechargeList()
    },
    handleSizeChange (val) {
      this.formInline.pageSize = val
      this.getcppOutRechargeList()
    },
    handleCurrentChange (val) {
      this.formInline.pageNum = val
      this.getcppOutRechargeList()
    },
    goBack () {
      this.$router.go(-1)
    },
    getcppOutRechargeList () {
      cppOutRechargeList(this.formInline).then(res => {
        const { total, rows } = res
        this.tableData = rows
        this.total = total
      })
    }
  }

}
</script>

<style scoped>
.backbtn {
    padding: 20px;
}
.content {
  width: 90%;
  margin: 0 auto;
}
.pagination {
  margin: 20px;
}

</style>
