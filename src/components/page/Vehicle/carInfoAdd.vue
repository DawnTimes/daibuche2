<template>
  <el-form ref="form" :model="form" label-width="160px" class="definewth">
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-form-item label="批次"  prop="batch">
            <el-input v-model="form.batch"></el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-light">
          <el-form-item label="msrp" prop="msrp">
            <el-input v-model="form.msrp" placeholder="官方指导价"></el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-form-item label="车辆识别代号" prop="frameNumber">
            <el-input v-model="form.frameNumber" ></el-input>
          </el-form-item>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
              <div class="grid-content bg-purple">
                <el-form-item label="车辆业务类型" prop="carBusinessType">
                  <el-input v-model="form.carBusinessType" disabled="disabled"></el-input>
                </el-form-item>
              </div>
      </el-col>

      <el-col :span="8" v-if="add" >
        <div class="grid-content bg-purple-light">
          <el-form-item class="page-form-item" label="品牌、车系：" prop="carBrand">
            <el-select v-model="form.carBrand" placeholder="请选择所属品牌" @change="carBrandChanged" class="mselect">
              <el-option v-for="item in carseris"  :key="item.carBrandName" :label="item.carBrandName" :value="item.carBrandName" ></el-option>
            </el-select>
            <el-select v-model="form.carSeries" placeholder="请选择所属车系"  @change="carSeriesChanged" class="mselect">
              <el-option  v-for="item in carSeriesList" :key="item.carSeriesName" :label="item.carSeriesName" :value="item.carSeriesName" ></el-option>
            </el-select>
             <el-select v-model="form.carModel" placeholder="请选择所属车型" class="mselect">
              <el-option  v-for="item in carModelList" :key="item.carModelName" :label="item.carModelName" :value="item.carModelName" ></el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-light">
          <el-form-item label="主机厂匹配车型" prop="factoryMatchesModel">
            <el-input v-model="form.factoryMatchesModel"></el-input>
          </el-form-item>
        </div>
      </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">
            <el-form-item label="车牌" prop="plateNumber">
              <el-input v-model="form.plateNumber"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-form-item label="发动机号码" prop="engineNumber">
              <el-input v-model="form.engineNumber"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">
            <el-form-item label="月租金" prop="monthlyRent">
              <el-input v-model="form.monthlyRent"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple-light">
          <el-form-item label="租牌费" prop="rentCardFee">
            <el-input v-model="form.rentCardFee"></el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-light">
          <el-form-item label="月租金合计" prop="totalMonthlyRent">
            <el-input v-model="form.totalMonthlyRent"></el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-light">
          <el-form-item label="尾款" prop="finalPayment">
            <el-input v-model="form.finalPayment"></el-input>
          </el-form-item>
        </div>
      </el-col>
      </el-row>
      <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple-light">
          <el-form-item class="grid-content bg-purple-light" label="牌照商" prop="licenceId">
            <el-select v-model="licenceId" placeholder="请选择牌照商"  ref="selectReport" style="width:100%">
              <el-option value="" label="" style="height:200px;overflow: auto;background-color:#fff">
                <el-tree
                  @node-click="licenceClick"
                  :load="licence"
                  lazy
                  :props="defaultProps"
                  node-key="id"
                ></el-tree>
              </el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-col>
      
      <el-col :span="8">
        <div class="grid-content bg-purple-light">
          <el-form-item label="蓄水池" prop="reservoir">
            <el-select v-model="form.reservoir" placeholder clearable>
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
            <el-select v-model="form.leaseWay" placeholder clearable>
              <el-option label="直租" value="LEASE"></el-option>
              <el-option label="回租" value="BACK-LEASE"></el-option>
              <el-option label="经租" value="OPERATING-LEASE"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-col>
      </el-row>
      <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple-light">
          <el-form-item label="保险承保公司" prop="insuranceCompany">
            <el-input v-model="form.insuranceCompany"></el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-light">
          <el-form-item label="商业保险单号" prop="insuranceNo">
            <el-input v-model="form.insuranceNo"></el-input>
          </el-form-item>
        </div>
      </el-col>
      
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-form-item label="手动/自动" prop="atmt">
            <el-select v-model="form.atmt" placeholder clearable>
              <el-option label="手动" value="MT"></el-option>
              <el-option label="自动" value="AT"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-col>
      </el-row>
      <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple-light">
          <el-form-item label="车用途类型" prop="carUse">
            <el-select v-model="form.carUse" placeholder="请选择用途类型" clearable>
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
            <el-select v-model="form.isLimitLicence" placeholder="是否限牌" clearable>
              <el-option label="是" value="Y"></el-option>
              <el-option label="否" value="N"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-form-item label="租金状态" prop="rentState">
            <el-select v-model="form.rentState" placeholder clearable>
              <!-- 0空/1生效/2待会计审核/3待财务负责人审核 -->
              <el-option label="生效" value="1"></el-option>
              <el-option label="待会计审核" value="2"></el-option>
              <el-option label="待财务负责人审核" value="3"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-col>
      </el-row>
      <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple-light">
          <el-form-item label="备注">
            <el-input v-model="form.note"></el-input>
          </el-form-item>
        </div>
      </el-col>
    </el-row>
    <el-form-item class="submitBtn">
      <el-button type="primary" @click="onSubmit('form')"> {{showSearch}}</el-button>
      <el-button @click="onCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from "@/common/axios.js";
import common from "@/common/common.js";
export default {
  props: ["showMsg", "msgType", "showSearch"],
  name: "carInfoAdd",
  data() {
    return {
      form: {},
      add: true,
      licenceId:'',
      province: "",
      city: "",
      provinces: [],
      cities: [],
      defaultProps: {
        children: "children",
        label: "name",
        isLeaf: 'leaf'
      },
      carseris:[], //品牌
      carParams:{
        "carBrand": "",
        "carSeries": "",
        "carSeriesName": "",
        "operation": "",
        "turnPageBeginPos": "0",
        "turnPageShowNum": "1000"
      },
      carSeriesList:[],
      carModelList:[]
    };
  },

  created() {
    this.form.carBusinessType ="SUBCAR";
  },
  mounted() {
    this.serchCarBrand()
  },
  methods: {
      licenceClick(data, node, component){
        console.log(data)
        this.licenceId=data.licenceName
        this.form.subcarLicenceCompanyId = data.licenceId
      },
      // 牌照商查询
       licence(node, resolve) {
        if (node.level === 0) {
          // 查询区域
          let url = common.findAreaInfoUrl
          axios.post(url, {}).then(res => {
            if (res.em === "Success!") {
              res.data.areaList.forEach((obj, index) => {
                obj.name = obj.areaName
              })
              return resolve(res.data.areaList)
            }
          })          
        }else if (node.level === 1) {
          // 查询省份
          let url = common.findProviInfoUrl
          axios.post(url, { areaCode: node.data.areaCode }).then(res => {
            if (res.em === "Success!") {
                res.data.provinceList.forEach((obj, index) => {
                obj.name = obj.provinceName
              })
              return resolve(res.data.provinceList)
            }
          })          
        } else if (node.level === 2) {
          // 查询城市
          let url = common.findCityInfoUrl
          axios.post(url, { provinceCode: node.data.provinceCode }).then(res => {
            if (res.em === "Success!") {
                res.data.cityList.forEach((obj, index) => {
                obj.name = obj.cityName
              })
              return resolve(res.data.cityList)
            }
          })            
        } else {
          // 查询牌照商
          let url = common.findCityLicenceUrl
          axios.post(url, { cityCode: node.data.cityCode }).then(res => {
            
            //agentCode、agentFullName、agentShortName
            if (res.em === "Success!") {
                res.data.cityLicence.forEach((obj, index) => {
                obj.name = obj.licenceName
                obj.leaf = true
              })
              return resolve(res.data.cityLicence)
            }
          })            
        }
      },
    onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$emit("onAddSubmit", this.form);
          } else {
            return false;
          }
        });
    },
    onCancel() {
      this.$emit("onCancel");
    },
    serchCarBrand(){
        let url=common.carBrandOperationUrl
         axios.post(url, {}).then(res => {
            this.carseris=res.data.carBrankList
          })   
    },
    carBrandChanged() {
      let url=common.carSeriesOperationUrl
      let  temp=this.carseris
      let _this=this
        temp.forEach(function(obj,index){
          if(obj.carBrandName==_this.form.carBrand){
            _this.carParams.carBrand=obj.carBrand
          }
        })
      axios.post(url, this.carParams).then(res => {
          this.carSeriesList=res.data.carSeriesList
           _this.carParams.carSeries=""
      }) 
    },
    carSeriesChanged(){
      let url=common.carModelOperationUrl
      let  temp=this.carSeriesList
      let _this=this
        temp.forEach(function(obj,index){
          if(obj.carSeriesName==_this.form.carSeries){
            _this.carParams.carSeries=obj.carSeries
            _this.carParams.carBrand=""

          }
        })
      axios.post(url, this.carParams).then(res => {
          this.carModelList=res.data.carModelList
      }) 
    },
    querySearchAsync(queryString, cb) {

      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 3000 * Math.random());
    },
    createStateFilter(queryString) {
      return state => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      console.log(item);
    },
    getCheckedKeys() {
      console.log(this.$refs.tree.getCheckedKeys());
    }
  }
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
.el-form-item--mini.el-form-item {
    margin-bottom: 10px;
}
.el-input--mini .el-input__inner {
    height: 40px;
    line-height: 40px;
}
.mselect .el-input__inner{
  width: 114px;
}

</style>
