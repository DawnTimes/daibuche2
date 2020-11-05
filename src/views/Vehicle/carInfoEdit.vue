<template>
  <el-form ref="form" :model="form" label-width="160px" class="definewth">
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-form-item label="批次" prop="batch">
            <el-input v-model="form.batch" disabled="disabled"></el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-light">
          <el-form-item label="msrp" prop="msrp">
            <el-input v-model="form.msrp" disabled="disabled" placeholder="官方指导价"></el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-form-item label="车辆识别代号" prop="frameNumber">
            <el-input v-model="form.frameNumber" disabled="disabled"></el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-form-item label="车辆业务类型" prop="carBusinessType">
            <el-input v-model="form.carBusinessType" disabled="disabled"></el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-light">
          <el-form-item class="page-form-item" label="品牌、车系：" prop="carBrand">
            <el-input v-model="form.carBrand" disabled="disabled" class="mselect"></el-input>
            <el-input v-model="form.carSeries" disabled="disabled" class="mselect"></el-input>
            <el-input v-model="form.carModel" disabled="disabled" class="mselect"></el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-light">
          <el-form-item label="主机厂匹配车型" prop="factoryMatchesModel">
            <el-input v-model="form.factoryMatchesModel" disabled="disabled"></el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-light">
          <el-form-item label="车牌" prop="plateNumber">
            <el-input v-model="form.plateNumber" disabled="disabled"></el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-form-item label="发动机号码" prop="engineNumber">
            <el-input v-model="form.engineNumber" disabled="disabled"></el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-light">
          <el-form-item label="月租金" prop="monthlyRent">
            <el-input v-model="form.monthlyRent" disabled="disabled"></el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-light">
          <el-form-item label="租牌费" prop="rentCardFee">
            <el-input v-model="form.rentCardFee" disabled="disabled"></el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-light">
          <el-form-item label="月租金合计" prop="totalMonthlyRent">
            <el-input v-model="form.totalMonthlyRent" disabled="disabled"></el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-light">
          <el-form-item label="尾款" prop="finalPayment">
            <el-input v-model="form.finalPayment" disabled="disabled"></el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-light">
          <el-form-item label="牌照商">
            <el-input v-model="form.licenceName" disabled="disabled"></el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-light">
          <el-form-item label="蓄水池" prop="reservoir">
            <el-select v-model="form.reservoir" placeholder @input="change($event)">
              <el-option label="是" value="Y"></el-option>
              <el-option label="否" value="N"></el-option>
              <el-option label="自用" value="S"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-light">
          <el-form-item label="租赁方式" prop="leaseWay">
            <el-input v-model="form.leaseWay" disabled="disabled"></el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-light">
          <el-form-item label="保险承保公司" prop="insuranceCompany">
            <el-input v-model="form.insuranceCompany" disabled="disabled"></el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-light">
          <el-form-item label="商业保险单号" prop="insuranceNo">
            <el-input v-model="form.insuranceNo" disabled="disabled"></el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-form-item label="手动/自动" prop="atmt">
            <el-input v-model="form.atmt" disabled="disabled"></el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-light">
          <el-form-item label="车用途类型" prop="carUse">
            <el-select v-model="form.carUse" placeholder="请选择用途类型" @input="change($event)">
              <!-- SUBCAR-代步车/HELPCAR-救援车 -->
              <el-option label="代步车" value="SUBCAR"></el-option>
              <el-option label="救援车" value="HELPCAR"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-form-item label="是否限牌" prop="isLimitLicence">
            <el-input v-model="form.isLimitLicence" disabled="disabled"></el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-form-item label="租金状态" prop="rentState">
            <el-input v-model="form.rentState" disabled="disabled"></el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-light">
          <el-form-item label="备注">
            <el-input v-model="form.note" @input="change($event)"></el-input>
          </el-form-item>
        </div>
      </el-col>
    </el-row>
    <el-form-item class="submitBtn">
      <el-button type="primary" @click="onSubmit('form')">{{showSearch}}</el-button>
      <el-button @click="onCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from '@/common/axios.js';
import common from '@/common/common.js';
export default {
  props: ['showMsg', 'msgType', 'showSearch'],
  name: 'carInfoEdit',
  data() {
    return {
      form: {},
      defaultProps: {
        children: 'children',
        label: 'name',
        isLeaf: 'leaf',
      },
    };
  },
  created() {
    this.form = this.showMsg;
    console.log(this.form);
  },
  mounted() {},
  methods: {
    change(e) {
      this.$forceUpdate();
    },
    onSubmit(formName) {
      this.$emit('onEditSubmit', this.form);
    },
    onCancel() {
      this.$emit('onCancel');
    },
  },
};
</script>

<style scoped>
.el-form-item {
  margin-bottom: 10px;
}

.el-form-item__error {
  left: auto;
  right: 0;
  top: 30%;
}
.mselect {
  width: 114px;
}
</style>
