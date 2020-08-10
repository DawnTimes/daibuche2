<template>
	<div>
		<div class="userPage">
			<header class="car-management-header">
				车 辆 调 剂
			</header>
			<span>
				<!-- <i class="iconfont iconkehuguanli"></i>车辆调剂 -->
			</span>
			<!--          <el-form :inline="true" :model="params" class="demo-form-inline">
      <el-form-item label="原经销商" label-width="100px">
        <el-input v-model="params.oldDealer" placeholder="请填写" size="small" style="width:230px"></el-input>
      </el-form-item>
    
      
       <el-form-item label="原经销商" label-width="100px">
        <el-input v-model="params.newDealer" placeholder="请填写" size="small" style="width:230px"></el-input>
      </el-form-item>
        </el-form>    -->

			<div>
				<el-row type="flex" class="row-bg" justify="end">
					<!-- @click="doAdjust" v-show="rolePermission.PreAdjust" -->
					<el-button icon="el-icon-search" type="primary" plain round @click="dispasal">预处置</el-button>
					<el-button icon="el-icon-search" type="primary" plain round @click="searchCarType">搜索</el-button>
					<el-button icon="el-icon-search" type="primary" plain round @click="doAdjust" v-show="rolePermission.PreAdjust">预调剂</el-button>
					<el-button icon="el-icon-search" type="primary" plain round @click="cancelAdjust" v-show="rolePermission.cancelAdjust">调剂取消</el-button>

				</el-row>
			</div>
		</div>

		<el-table :header-cell-style="{
			'text-align':'center',
			'font-weight':'bold',  
			'background':'#627CAF',    
			'color': '#fff',
			}"
		 :height="GLOBAL.height" size="medium" :data="tableData"  style="width: 100%" type="index" @selection-change="handleSelectionChange"
		 :row-class-name="tableRowClassName" border>
			<!-- 手动/自动、车系、车型 3列，放置在车架号码列后面 -->
			<el-table-column type="selection" width="55"></el-table-column>
			<el-table-column fixed type="index" label="序号" :index="indexMethod" width="80"></el-table-column>
			<el-table-column fixed prop="batch" label="批次" width="80" :show-overflow-tooltip='true' resizable></el-table-column>
			<el-table-column fixed prop="frameNumber" label="车辆识别代号/车架号码" width="200" :show-overflow-tooltip='true' resizable></el-table-column>
			<el-table-column prop="atmt" label="手动/自动" width="100" :show-overflow-tooltip='true' resizable></el-table-column>
			<el-table-column prop="carSeries" label="车系" width="120" :show-overflow-tooltip='true' resizable></el-table-column>
			<el-table-column prop="carModel" label="车型" width="200" :show-overflow-tooltip='true' resizable></el-table-column>
			<el-table-column prop="factoryMatchesModel" label="主机厂匹配车型" width="250" :show-overflow-tooltip='true' resizable></el-table-column>
			<el-table-column prop="plateNumber" label="车牌" width="120" :show-overflow-tooltip='true' resizable></el-table-column>
			<el-table-column prop="agentFullName" label="原经销商名称" width="250" :show-overflow-tooltip='true' resizable></el-table-column>
			<el-table-column prop="inAgentName" label="调入经销商名称" width="250" :show-overflow-tooltip='true' resizable></el-table-column>
			<el-table-column prop="outAgentName" label="调出经销商名称" width="250" :show-overflow-tooltip='true' resizable></el-table-column>
			<el-table-column prop="carBrand" label="品牌" width="220" :show-overflow-tooltip='true' resizable></el-table-column>
			<el-table-column prop="carUse" label="车用途类型" width="120" :show-overflow-tooltip='true' resizable></el-table-column>
			<el-table-column prop="isLimitLicence" label="是否限牌" width="100" :show-overflow-tooltip='true' resizable></el-table-column>
			<el-table-column prop="licenceName" label="牌照商" width="250" :show-overflow-tooltip='true' resizable></el-table-column>
			<el-table-column prop="areaName" label="所属区域" width="100" :show-overflow-tooltip='true' resizable></el-table-column>
			<el-table-column prop="provinceName" label="省份" width="100" :show-overflow-tooltip='true' resizable></el-table-column>
			<el-table-column prop="cityName" label="城市" width="100" :show-overflow-tooltip='true' resizable></el-table-column>
			<el-table-column prop="totalMonthlyRent" label="月租金合计" width="100" :show-overflow-tooltip='true' resizable align="right"></el-table-column>
			<el-table-column prop="lessor" label="出租方" width="250" :show-overflow-tooltip='true' resizable></el-table-column>
			<el-table-column prop="reservoir" label="蓄水池" width="80" :show-overflow-tooltip='true' resizable></el-table-column>
			<!-- <el-table-column prop="adjustStatus" label="调剂状态" width="120">
        <template slot-scope="scope">
          <router-link to="/PreAdjust" v-if="scope.row.sureState!='已生成'">
            <el-button type="text" size="small">{{scope.row.sureState}}</el-button>
          </router-link>
          <span v-if="scope.row.sureState=='已生成'">{{scope.row.sureState}}</span>
        </template>
      </el-table-column> -->
			<el-table-column prop="adjustStatusView" label="调剂状态" width="150" :show-overflow-tooltip='true' resizable></el-table-column>
			<el-table-column prop="finalPayment" label="尾款" width="90" :show-overflow-tooltip='true' align="right" resizable></el-table-column>
			<el-table-column prop="carStatus" label="处置状态" width="90" :show-overflow-tooltip='true' align="right" resizable></el-table-column>
			<el-table-column prop="note" label="备注" width="150" :show-overflow-tooltip='true' resizable></el-table-column>
			<!-- <el-table-column fixed="right" prop="contral" label="操作" width="80">
        <template slot-scope="scope">
          <router-link :to="{path:'/VehicleDetail',query:{type:scope.row.id}}">
            <el-button type="text" size="small">查看详情</el-button>
          </router-link>
        </template>
      </el-table-column>-->
		</el-table>
		<el-pagination background class="paginationClass" @size-change="handleSizeChange" @current-change="handleCurrentChange"
		 :current-page="currentPage" :page-sizes="[10, 50, 150, 500]" :page-size="pageSize" layout="prev, pager, next, sizes, jumper"
		 :total="totalCount"></el-pagination>
		<div v-if="showModel1" class="showCarInfo">
			<div class="msgbody">
				<header>
					{{showSearchText}}
					<i class="el-icon-close icon-right" @click="closeWindow" style="cursor:pointer;"></i>
				</header>
				<div class="main-body">
					<el-form ref="form" :model="params" label-width="120px">
						<el-row>
							<el-col :span="24">
								<div class="grid-content bg-purple">
									<el-form-item label="批次">
										<el-input v-model="params.batch"></el-input>
									</el-form-item>
								</div>
							</el-col>
							<el-col :span="24">
								<div class="grid-content bg-purple">
									<el-form-item label="车辆识别代号">
										<el-input v-model="params.frameNumber"></el-input>
									</el-form-item>
								</div>
							</el-col>
							<el-col :span="24">
								<div class="grid-content bg-purple">
									<el-form-item label="主机厂匹配车型">
										<el-input v-model="params.factoryMatchesModel"></el-input>
									</el-form-item>
								</div>
							</el-col>
							<el-col :span="24">
								<div class="grid-content bg-purple">
									<el-form-item label="手动/自动">
										<el-select v-model="params.atmt" style="width:100%" clearable>
											<!-- AT--自动/MT--手动 -->
											<el-option label="手动" value="MT"></el-option>
											<el-option label="自动" value="AT"></el-option>
										</el-select>
									</el-form-item>
								</div>
							</el-col>
							<el-col :span="24">
								<div class="grid-content bg-purple">
									<el-form-item label="车牌">
										<el-input v-model="params.plateNumber"></el-input>
									</el-form-item>
								</div>
							</el-col>
							<el-col :span="24">
								<div class="grid-content bg-purple-light">
									<el-form-item label="车用途类型">
										<!-- SUBCAR-代步车/HELPCAR-救援车 -->
										<el-select clearable v-model="params.carUse" placeholder="请选择新增车型所属车系" style="width:100%">
											<el-option label="代步车" value="SUBCAR"></el-option>
											<el-option label="救援车" value="HELPCAR"></el-option>
										</el-select>
									</el-form-item>
								</div>
							</el-col>
							<el-col :span="24">
								<div class="grid-content bg-purple">
									<el-form-item label="车系">
										<el-input v-model="params.carSeries"></el-input>
									</el-form-item>
								</div>
							</el-col>
							<el-col :span="24">
								<div class="grid-content bg-purple">
									<el-form-item label="经销商代码">
										<el-input v-model="params.agentCode2"></el-input>
									</el-form-item>
								</div>
							</el-col>
						</el-row>



						<el-row>
							<div class="grid-content bg-purple-light">
								<el-form-item class="page-form-item" label="原经销商名称">
									<el-select v-model="agentFullNameViewForSearch" placeholder="请选择经销商" multiple ref="selectReport" style="width:91%"
									 @remove-tag="removeTag">
										<el-option value="" label="" style="height:200px;overflow: auto;background-color:#fff">
											<el-tree @node-click="nodeClick2" :load="loadNode" lazy :props="defaultProps" node-key="id"></el-tree>
										</el-option>
									</el-select>
								</el-form-item>
							</div>
						</el-row>




						<el-row>
							<div class="grid-content bg-purple-light">
								<el-form-item class="grid-content bg-purple-light" label="牌照商">
									<el-select v-model="licenceNameViewForSearch" placeholder="请选择牌照商" multiple style="width:91%" @remove-tag="removeTag2">
										<el-option value="" label="" style="height:200px;overflow: auto;background-color:#fff">
											<el-tree @node-click="licenceClick" :load="licence" lazy :props="defaultProps" node-key="id"></el-tree>
										</el-option>
									</el-select>
								</el-form-item>
							</div>
						</el-row>

						<el-row>
							<el-col :span="24">
								<div class="grid-content bg-purple-light">
									<el-form-item label="是否限牌">
										<el-select clearable v-model="params.limitOrNot" style="width:100%">
											<el-option label="是" value="Y"></el-option>
											<el-option label="否" value="N"></el-option>
										</el-select>
									</el-form-item>
								</div>
							</el-col>
							<el-col :span="24">
								<div class="grid-content bg-purple-light">
									<el-form-item label="省份">
										<el-select clearable v-model="params.provinceCode" style="width:100%" @change="provinceChange">
											<el-option v-for="item in provinceList" :key="item.provinceCode" :label="item.provinceName" :value="item.provinceCode"></el-option>
										</el-select>
									</el-form-item>
								</div>
							</el-col>
							<el-col :span="24">
								<div class="grid-content bg-purple-light">
									<el-form-item label="城市">
										<el-select v-model="params.cityCode" style="width:100%" clearable>
											<el-option v-for="item in cityList" :key="item.cityCode" :label="item.cityName" :value="item.cityCode"></el-option>
										</el-select>
									</el-form-item>
								</div>
							</el-col>
							<el-col :span="24">
								<div class="grid-content bg-purple-light">
									<el-form-item label="调剂状态">
										<!-- 1预调剂/2-确认待合同生效/3-生效/4-处置 -->
										<el-select v-model="params.adjustStatus" style="width:100%" clearable>
											<el-option label="预调剂" value="1"></el-option>
											<el-option label="确认待合同生效" value="2"></el-option>
											<el-option label="生效" value="3"></el-option>
											<el-option label="处置" value="4"></el-option>
										</el-select>
									</el-form-item>
								</div>
							</el-col>
						</el-row>




						<el-form-item>
							<el-button type="primary" @click="onSubmit">提交</el-button>
							<el-button @click="closeWindow">取消</el-button>
						</el-form-item>
					</el-form>
				</div>
			</div>
		</div>

		<div v-if="showModel2" class="showAdjust">
			<div class="msgbody" style="width:35%;">
				<header>
					预调剂
					<i class="el-icon-close icon-right" @click="closeWindow" style="cursor:pointer;"></i>
				</header>
				<div class="main-body">
					<el-form ref="form" :model="adjustParams" label-width="110px">
						<el-row>
							<el-col :span="24">
								<div class="grid-content bg-purple">
									<!-- <el-form-item label="调入经销商">
                    <el-input v-model="adjustParams.agentName" size="small"></el-input>
                  </el-form-item> -->
									<el-form-item class="page-form-item" label="调入经销商">
										<el-select v-model="agentFullNameView" placeholder="请选择经销商" ref="selectReport" style="width:85%">
											<el-option value="" label="" style="height:200px;overflow: auto;background-color:#fff">
												<el-tree @node-click="nodeClick" :load="loadNode" lazy :props="defaultProps" node-key="id"></el-tree>
											</el-option>
										</el-select>
									</el-form-item>


									<el-form-item label="合同生效日">
										<el-datePicker :picker-options="pickerOptions" style="width:85%" v-model="adjustParams.contractValidTime"
										 type="date" placeholder="合同生效日" size="small" value-format="yyyy-MM-dd"></el-datePicker>
									</el-form-item>

									<el-form-item label="备注">
										<el-input type="textarea" v-model="adjustParams.note" style="width:85%"></el-input>
									</el-form-item>
								</div>
							</el-col>
						</el-row>
						<el-form-item>
							<el-button type="primary" @click="onSubmitAdjust">提交</el-button>
							<el-button @click="closeWindow">取消</el-button>
						</el-form-item>
					</el-form>
				</div>
			</div>
		</div>
		<div v-if="showModel3" class="showAdjust">
			<div class="msgbody" style="width:35%;">
				<header>
					预处置
					<i class="el-icon-close icon-right" @click="closeWindow" style="cursor:pointer;"></i>
				</header>
				<div class="main-body">
					<el-form ref="form" :model="adjustParams" label-width="110px">
						<el-row>
							<el-col :span="24">
								<div class="grid-content bg-purple">
									<!-- <el-form-item label="调入经销商">
		                  <el-input v-model="adjustParams.agentName" size="small"></el-input>
		                </el-form-item> -->
									<!-- 		              <el-form-item class="page-form-item" label="调入经销商">
		                <el-select v-model="agentFullNameView" placeholder="请选择经销商" ref="selectReport" style="width:85%">
		                  <el-option value="" label="" style="height:200px;overflow: auto;background-color:#fff">
		                    <el-tree
		                      @node-click="nodeClick"
		                      :load="loadNode"
		                      lazy
		                      :props="defaultProps"
		                      node-key="id"
		                    ></el-tree>
		                  </el-option>
		                </el-select>
		              </el-form-item> -->


									<el-form-item label="合同生效日">
										<el-datePicker :picker-options="pickerOptions" style="width:85%" v-model="adjustParams.contractValidTime"
										 type="date" placeholder="合同生效日" size="small" value-format="yyyy-MM-dd"></el-datePicker>
									</el-form-item>

									<el-form-item label="备注">
										<el-input type="textarea" v-model="adjustParams.note" style="width:85%"></el-input>
									</el-form-item>
								</div>
							</el-col>
						</el-row>
						<el-form-item>
							<el-button type="primary" @click="onSubmitAdjust1">提交</el-button>
							<el-button @click="closeWindow">取消</el-button>
						</el-form-item>
					</el-form>
				</div>
			</div>
		</div>

	</div>
</template>
<script>
	import axios from "@/common/axios.js";
	import common from "@/common/common.js";
	// import { dateDisabled } from "@/common/dateDisabled.js";
	// import date from "@/common/dateDisabled.js";
	export default {
		data() {
			return {
				pickerOptions: {
					disabledDate(inputDate) {
						var year = inputDate.getFullYear();
						var month = (inputDate.getMonth() + 1).toString();
						var day = (inputDate.getDate()).toString();
						if (month.length == 1) {
							month = "0" + month;
						}
						if (day.length == 1) {
							day = "0" + day;
						}
						var dateTime = year + "-" + month + "-" + day;
						// console.log(dateTime);
						var d = new Date(dateTime.replace(/\-/, "/ "));
						// console.log(d.getDate());
						var nd = new Date(d.getTime() + 24 * 60 * 60 * 1000); //next day 
						// 只能选每月的 4 号 和 19 号
						// if(d.getDate() == 4 || d.getDate() == 19) {
						// 	return false
						// } else {
						// 	return true
						// }
						return (d.getMonth() == nd.getMonth())
						// return (d.getDate() != 4)
						// return dateDisabled(inputDate);
						// return date.dateDisabled(inputDate);
					}
				},
				rolePermission: {
					'PreAdjust': false,
					'cancelAdjust': false
				},
				rolePermissionArray: [142, 143],
				defaultProps: {
					children: "children",
					label: "name",
					isLeaf: 'leaf'
				},
				inAgentId: '',
				agentFullNameView: '',
				agentFullNameViewForSearch: [],
				licenceNameViewForSearch: [],
				provinceList: [],
				cityList: [],
				totalCount: 0,
				currentPage: 1, //初始页
				pageSize: 10, //    每页的数据
				tableData: [],
				showSearchText: "",
				showModel1: false, //搜索窗
				showModel2: false, //预调剂窗
				showModel3: false, //预处置窗口
				checkedList: [],
				checked: false,
				multipleSelection: [],
				agentCodeArray: [],
				licenceCodeArray: [],
				params: {
					turnPageBeginPos: 1, // 开始是数据的序号，后台需要
					turnPageShowNum: 10, // 每页展示的条数
					batch: '',
					frameNumber: '',
					factoryMatchesModel: '',
					atmt: '',
					plateNumber: '',
					carUse: '',
					agentCode: [],
					licenceCode: [],
					limitOrNot: '',
					provinceCode: '',
					cityCode: '',
					adjustStatus: '',
					operationType: ''
				},
				realParams: {
					batch: '',
					frameNumber: '',
					factoryMatchesModel: '',
					atmt: '',
					plateNumber: '',
					carUse: '',
					agentCode: [],
					licenceCode: [],
					limitOrNot: '',
					provinceCode: '',
					cityCode: '',
					adjustStatus: '',
					operationType: ''
				},
				crudParams: {
					turnPageBeginPos: 1, // 开始是数据的序号，后台需要
					turnPageShowNum: 10, // 每页展示的条数
					batch: '',
					frameNumber: '',
					factoryMatchesModel: '',
					atmt: '',
					plateNumber: '',
					carUse: '',
					agentCode: [],
					licenceCode: [],
					limitOrNot: '',
					provinceCode: '',
					cityCode: '',
					adjustStatus: ''
				},
				adjustParams: {
					contractValidTime: '',
					note: ''
				},
				beforeSearchData: {
					useTypeData: [],
					licenserData: [],
					provinceData: [],
					city: []
				},
				pageUrl: ""
			};
		},
		mounted() {
			let that = this;
			that.rolePermissionArray.forEach((item, index, array) => {
				common.checkRolePermission(item, this.$store.state.asideInfoIds, Object.keys(that.rolePermission)[index], that.rolePermission);
			})

			setTimeout(function() {
				let height = document.getElementsByClassName('el-table__fixed')[0].style.height
				height = height.replace('px', '')
				height = parseInt(height); // 234
				height = (height - 14) + 'px'
				document.getElementsByClassName('el-table__fixed')[0].style.height = height

			}, 1000);
		},
		methods: {
			tableRowClassName(row) {
				if (row.row.carStatus == "已处置" || row.row.carStatus == "Y") {
					return 'info-row';
				}
				return '';
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
				} else if (node.level === 1) {
					// 查询省份
					let url = common.findProviInfoUrl
					axios.post(url, {
						areaCode: node.data.areaCode
					}).then(res => {
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
					axios.post(url, {
						provinceCode: node.data.provinceCode
					}).then(res => {
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
					axios.post(url, {
						cityCode: node.data.cityCode
					}).then(res => {
						/*             licenceCode: "2"
						            licenceId: "4"
						            licenceName: "广汽租赁"  */
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
			removeTag2(data) {
				console.log(this.licenceCodeArray)
				for (let i = 0; i < this.licenceCodeArray.length; i++) {
					if (this.licenceCodeArray[i].licenceName === data) {
						this.licenceCodeArray.splice(i, 1)
					}
				}
				console.log(this.licenceCodeArray)
			},
			removeTag(data) {
				console.log(this.agentCodeArray)
				for (let i = 0; i < this.agentCodeArray.length; i++) {
					if (this.agentCodeArray[i].agentFullName === data) {
						this.agentCodeArray.splice(i, 1)
					}
				}
				console.log(this.agentCodeArray)
			},
			nodeClick(data, node, component) {
				console.log(data)
				this.agentFullNameView = data.agentFullName
				this.inAgentId = data.agentId
			},
			nodeClick2(data, node, component) {
				let flag = true
				console.log(this.agentCodeArray)
				if (this.agentFullNameViewForSearch.length > 0) {
					this.agentFullNameViewForSearch.forEach((obj, index) => {
						if (obj === data.agentFullName) {
							flag = false
						}
					})
				}
				if (flag) {
					console.log(data)
					this.agentFullNameViewForSearch.push(data.agentFullName)
					this.agentCodeArray.push(data)
					console.log(this.agentCodeArray)
				}
			},
			licenceClick(data, node, component) {
				console.log(data)
				let flag = true
				if (this.licenceNameViewForSearch.length > 0) {
					this.licenceNameViewForSearch.forEach((obj, index) => {
						if (obj === data.licenceName) {
							flag = false
						}
					})
				}
				if (flag) {
					this.licenceNameViewForSearch.push(data.licenceName)
					this.licenceCodeArray.push(data)
					console.log(this.licenceCodeArray)
				}
			},
			// 懒加载，加载树
			loadNode(node, resolve) {
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
				} else if (node.level === 1) {
					// 查询省份
					let url = common.findProviInfoUrl
					axios.post(url, {
						areaCode: node.data.areaCode
					}).then(res => {
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
					axios.post(url, {
						provinceCode: node.data.provinceCode
					}).then(res => {
						if (res.em === "Success!") {
							res.data.cityList.forEach((obj, index) => {
								obj.name = obj.cityName
							})
							return resolve(res.data.cityList)
						}
					})
				} else {
					// 查询供应商
					let url = common.findCityAgentUrl
					axios.post(url, {
						cityCode: node.data.cityCode
					}).then(res => {
						// agentCode、agentFullName、agentShortName
						if (res.em === "Success!") {
							res.data.cityAgent.forEach((obj, index) => {
								obj.name = obj.agentFullName
								obj.leaf = true
							})
							return resolve(res.data.cityAgent)
						}
					})
				}
			},
			indexMethod(index) {
				let order = this.pageSize * (this.currentPage - 1)
				return index + order + 1
			},

			initData() {
				let url = common.findCarPageUrl
				this.params.status = "1";
				axios.post(url, this.params).then(res => {
					console.log(res)
					if (res.em === "Success!") {
						this.tableData = res.data.carInfoList;
						this.tableData.forEach((obj, index) => {
							if (obj.isLimitLicence) {
								if (obj.isLimitLicence === "Y") {
									obj.isLimitLicence = '是'
								}
								if (obj.isLimitLicence === "N") {
									obj.isLimitLicence = '否'
								}
							}

							if (obj.atmt) {
								if (obj.atmt === 'AT') {
									obj.atmt = '自动'
								}
								if (obj.atmt === 'MT') {
									obj.atmt = '手动'
								}
							}
							if (obj.reservoir) {
								// Y-是/N-否/S-自用
								if (obj.reservoir === 'Y') {
									obj.reservoir = '是'
								}
								if (obj.reservoir === 'N') {
									obj.reservoir = '否'
								}
								if (obj.reservoir === 'S') {
									obj.reservoir = '自用'
								}
							}
							if (obj.carUse) {
								// SUBCAR-代步车/HELPCAR-救援车
								if (obj.carUse === 'SUBCAR') {
									obj.carUse = '代步车'
								}
								if (obj.carUse === 'HELPCAR') {
									obj.carUse = '救援车'
								}
							}
							if (obj.adjustStatus) {
								// 1-预调剂/2-确认待合同生效/3-生效/4-处置
								if (obj.adjustStatus === '1') {
									obj.adjustStatusView = '预调剂'
								}
								if (obj.adjustStatus === '2') {
									obj.adjustStatusView = '确认待合同生效'
								}
								if (obj.adjustStatus === '3') {
									obj.adjustStatusView = '生效'
								}
								if (obj.adjustStatus === '4') {
									obj.adjustStatusView = '处置'
								}
								if (obj.carStatus) {
									if (obj.carStatus === "Y") {
										obj.carStatus = '已处置'

									}
									if (obj.carStatus === "N") {
										obj.carStatus = '未处置'
									}
								}
							}
						});
						this.totalCount = parseInt(res.data.turnPageTotalNum);
					}
				});
			},
			initData2() {
				this.realParams.turnPageBeginPos = this.params.turnPageBeginPos
				this.realParams.turnPageShowNum = this.params.turnPageShowNum
				this.realParams.status = "1";
				let url = common.findCarPageUrl
				axios.post(url, this.realParams).then(res => {
					console.log(res)
					if (res.em === "Success!") {
						this.tableData = res.data.carInfoList;
						this.tableData.forEach((obj, index) => {
							if (obj.isLimitLicence) {
								if (obj.isLimitLicence === "Y") {
									obj.isLimitLicence = '是'
								}
								if (obj.isLimitLicence === "N") {
									obj.isLimitLicence = '否'
								}
							}

							if (obj.atmt) {
								if (obj.atmt === 'AT') {
									obj.atmt = '自动'
								}
								if (obj.atmt === 'MT') {
									obj.atmt = '手动'
								}
							}
							if (obj.reservoir) {
								// Y-是/N-否/S-自用
								if (obj.reservoir === 'Y') {
									obj.reservoir = '是'
								}
								if (obj.reservoir === 'N') {
									obj.reservoir = '否'
								}
								if (obj.reservoir === 'S') {
									obj.reservoir = '自用'
								}
							}
							if (obj.carUse) {
								// SUBCAR-代步车/HELPCAR-救援车
								if (obj.carUse === 'SUBCAR') {
									obj.carUse = '代步车'
								}
								if (obj.carUse === 'HELPCAR') {
									obj.carUse = '救援车'
								}
							}
							if (obj.adjustStatus) {
								// 1-预调剂/2-确认待合同生效/3-生效/4-处置
								if (obj.adjustStatus === '1') {
									obj.adjustStatusView = '预调剂'
								}
								if (obj.adjustStatus === '2') {
									obj.adjustStatusView = '确认待合同生效'
								}
								if (obj.adjustStatus === '3') {
									obj.adjustStatusView = '生效'
								}
								if (obj.adjustStatus === '4') {
									obj.adjustStatusView = '处置'
								}
							}
							if (obj.carStatus) {
								if (obj.carStatus === "Y") {
									obj.carStatus = '已处置'
								}
								if (obj.carStatus === "N") {
									obj.carStatus = '未处置'
								}
							}
						});
						this.totalCount = parseInt(res.data.turnPageTotalNum);
					}
				});
			},
			handleSizeChange(pageSize) {
				this.currentPage = 1
				this.params.turnPageBeginPos = 1
				this.pageSize = pageSize
				this.params.turnPageShowNum = pageSize

				this.initData2()
			},
			handleCurrentChange(currentPage) {
				this.currentPage = currentPage
				this.params.turnPageBeginPos = ((currentPage - 1) * this.pageSize) + 1
				this.initData2()
			},
			indexMethod(index) {
				let order = this.pageSize * (this.currentPage - 1);
				return index + order + 1;
			},
			filterTag(value, row) {
				return row.sureState === value;
			},
			provinceChange() {
				let url = common.findCityInfoUrl
				axios.post(url, {
					provinceCode: this.params.provinceCode
				}).then(res => {
					if (res.em === "Success!") {
						this.cityList = res.data.cityList
					}
				})
			},
			searchCarType() {
				this.params = this.crudParams;
				this.carModelDisable = false;
				this.showSearchText = "搜索车辆调剂";
				this.showModel1 = true;

				// 给省份 赋值
				let url = common.findProviInfoUrl
				axios.post(url, {}).then(res => {
					if (res.em === "Success!") {
						this.provinceList = res.data.provinceList
					}
				})
			},
			closeWindow() {
				this.showModel1 = false;
				this.showModel2 = false;
				this.showModel3 = false;
				this.setValueForCurd();
			},
			setValueForCurd() {
				this.crudParams = this.params;
			},
			onSubmit() {
				this.params.turnPageBeginPos = 1
				this.currentPage = 1



				this.params.agentCode = []
				this.params.licenceCode = []
				if (this.agentCodeArray.length > 0) {
					this.agentCodeArray.forEach((obj, index) => {
						this.params.agentCode.push(obj.agentCode)
					})
				}
				if (this.licenceCodeArray.length > 0) {
					this.licenceCodeArray.forEach((obj, index) => {
						this.params.licenceCode.push(obj.licenceCode)
					})
				}
				for (var i = this.params.agentCode.length - 1; i >= 0; i--) {
					if (!this.params.agentCode[i])
						this.params.agentCode.splice(i, 1)
				}
				for (var i = this.params.licenceCode.length - 1; i >= 0; i--) {
					if (!this.params.licenceCode[i])
						this.params.licenceCode.splice(i, 1)
				}
				if (this.params) {
					if (this.params.agentCode.length == 0 && this.params.licenceCode.length == 0) {
						this.params.operationType = '2';
					} else {
						this.params.operationType = '1';
					}
				}

				this.closeWindow();
				this.initData();

				Object.assign(this.realParams, this.params)
			},
			//预处置
			dispasal: function() {
				// 先清空遗留数据
				this.adjustParams.contractValidTime = ''
				this.adjustParams.note = ''
				this.agentFullNameView = ''
				this.inAgentId = ''

				console.log(JSON.stringify(this.multipleSelection))
				//进入预调剂
				// 先校验数据
				if (this.multipleSelection.length > 0) {
					// 勾选的状态一定要为3 生效状态才行
					let flag = false
					let flagCar = false
					for (let i = 0; i < this.multipleSelection.length; i++) {
						if (this.multipleSelection[i].carStatus === '已处置') {
							flagCar = true
							break;
						}
						if (this.multipleSelection[i].adjustStatus == "1") {
							flag = true
							break
						}
					}
					if (flagCar) {
						this.$alert('该车辆已被处置！', '提示', {
							confirmButtonText: '确定'
						})
						return
					}
					if (flag) {
						this.$alert('该车辆正在处于调剂状态，请先确认调剂！', '提示', {
							confirmButtonText: '确定'
						})
						return
					}
				} else {
					this.$alert('请先勾选数据！', '提示', {
						confirmButtonText: '确定'
					})
					return
				}

				this.showModel3 = true;
			},
			//预调剂
			doAdjust: function() {
				// 先清空遗留数据
				this.adjustParams.contractValidTime = ''
				this.adjustParams.note = ''
				this.agentFullNameView = ''
				this.inAgentId = ''

				console.log(JSON.stringify(this.multipleSelection))
				//进入预调剂
				// 先校验数据
				if (this.multipleSelection.length > 0) {
					// 勾选的状态一定要为3 生效状态才行
					let flag = false
					let flagCar = false
					for (let i = 0; i < this.multipleSelection.length; i++) {
						if (this.multipleSelection[i].carStatus === '已处置') {
							flagCar = true
							break;
						}
						if (this.multipleSelection[i].adjustStatus == "1") {
							flag = true
							break
						}
					}
					if (flagCar) {
						this.$alert('该车辆已被处置！', '提示', {
							confirmButtonText: '确定'
						})
						return
					}
					if (flag) {
						this.$alert('请确认您所勾选的数据调剂状态都不含预调剂状态！', '提示', {
							confirmButtonText: '确定'
						})
						return
					}
				} else {
					this.$alert('请先勾选数据！', '提示', {
						confirmButtonText: '确定'
					})
					return
				}

				this.showModel2 = true;
			},

			cancelAdjust: function() {
				//取消调剂
				// 取消之前先校验
				// 1先检测是否勾选了数据
				if (this.multipleSelection.length > 0) {
					// 勾选的状态一定要为1 预调剂状态才行
					let flag = false

					for (let i = 0; i < this.multipleSelection.length; i++) {
						if (this.multipleSelection[i].adjustStatus != "1") {
							flag = true
							break
						}
					}
					if (flag) {
						this.$alert('请确认您所勾选的数据调剂状态全部都为预调剂状态！', '提示', {
							confirmButtonText: '确定'
						})
						return
					}
				} else {
					this.$alert('请先勾选数据！', '提示', {
						confirmButtonText: '确定'
					})
					return
				}

				this.$confirm('请确认是否取消调剂', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let params2 = {}
					params2.carPreAdjust = []
					this.multipleSelection.forEach((obj, index) => {
						let temp = {}
						temp.subcarAgentCompanyId = obj.agentCode
						temp.carInfoId = obj.carInfoId
						temp.adjustTaskNo = obj.adjustTaskNo
						temp.adjustStatus = '1'
						params2.carPreAdjust.push(temp)
					})
					// 发送请求

					let url = common.deleteCarPreAdjustUrl
					axios.post(url, params2).then(res => {
						if (res.em === 'Success!') {
							this.$message({
								message: "操作成功!",
								type: "success",
								duration: 1500
							})
							this.showModel2 = false
							console.log(this.params)
							this.initData();
						} else {
							this.$alert(res.em, '提示', {
								confirmButtonText: '确定'
							})
						}
					})
				}).catch(() => {

				});

				//循环遍历被选中的行，获得id，发送消息


			},
			handleSelectionChange(selections) {
				this.multipleSelection = selections
			},
			/*     onSubmitAdjust() {
			      let inAgentId = ''
			      let urlForId = common.agentListUrl
			      let paramsForId = {
			                          "agentName": this.adjustParams.agentName,
			                          "turnPageBeginPos": "1",
			                          "turnPageShowNum": "10"
			                        }
			      axios.post(urlForId, paramsForId).then(res => {
			        inAgentId = res.data.agentList[0].agentId
			        let params2 = {}
			        params2.carPreAdjust = []
			        this.multipleSelection.forEach((obj, index) => {
			          let temp = {}
			          temp.inAgentId = inAgentId
			          temp.contractValidTime = this.adjustParams.contractValidTime
			          temp.subcarAgentCompanyId = obj.agendId
			          temp.carInfoId = obj.carInfoId
			          temp.adjustStatus = '3'
			          params2.carPreAdjust.push(temp)
			        })
			          // 发送请求
			          let url = common.carPreAdjustUrl
			          axios.post(url, params2).then(res => {
			            if (res.em === 'Success!') {
			                this.$message({message: "操作成功!",type: "success",duration: 1500})
			                this.showModel2 = false
			                console.log(this.params)
			                this.initData();
			            } else {
			                this.$alert('操作失败，请联系管理员!', '提示', {confirmButtonText: '确定'})
			            }
			          })         
			      })

			    } */
			onSubmitAdjust() {
				let params2 = {}
				params2.carPreAdjust = []
				this.multipleSelection.forEach((obj, index) => {
					console.log(obj.agendId)
					let temp = {}
					if (obj.carStatus === "已处置") {
						temp.carStatus = 'Y'
					} else {
						temp.carStatus = 'N'
					}
					temp.inAgentId = this.inAgentId
					temp.contractValidTime = this.adjustParams.contractValidTime
					temp.note = this.adjustParams.note
					temp.subcarAgentCompanyId = obj.agendId
					temp.carInfoId = obj.carInfoId
					temp.adjustStatus = '3'
					temp.adjustType = '0'
					params2.carPreAdjust.push(temp)
				})
				// 发送请求
				let url = common.carPreAdjustUrl
				console.log(params2)
				axios.post(url, params2).then(res => {
					if (res.em === 'Success!') {
						this.$message({
							message: "操作成功!",
							type: "success",
							duration: 1500
						})
						this.showModel2 = false
						console.log(this.params)
						this.initData();
					} else {
						this.$alert(res.em, '提示', {
							confirmButtonText: '确定'
						})
					}
				})

			},
			onSubmitAdjust1() {
				let params2 = {}
				params2.carPreAdjust = []
				this.multipleSelection.forEach((obj, index) => {
					console.log(obj.agendId)
					let temp = {}
					if (obj.carStatus === "已处置") {
						temp.carStatus = 'Y'
					} else {
						temp.carStatus = 'N'
					}
					temp.inAgentId = ''
					temp.contractValidTime = this.adjustParams.contractValidTime
					temp.note = this.adjustParams.note
					temp.subcarAgentCompanyId = obj.agendId
					temp.carInfoId = obj.carInfoId
					temp.adjustStatus = '3'
					temp.adjustType = '1'
					params2.carPreAdjust.push(temp)
				})
				// 发送请求
				let url = common.carPreAdjustUrl
				console.log(params2)
				axios.post(url, params2).then(res => {
					if (res.em === 'Success!') {
						this.$message({
							message: "操作成功!",
							type: "success",
							duration: 1500
						})
						this.showModel3 = false
						console.log(this.params)
						this.initData();
					} else {
						this.$alert(res.em, '提示', {
							confirmButtonText: '确定'
						})
					}
				})

			}
		},
		created() {
			this.initData();
			//初始化下拉框数据
			let url = common.carBrandOperationUrl
			axios.post(url, {}).then(res => {
				if (res.em === "Success!") {
					this.beforeSearchData = res.data;
				}
			});
		}
	};
</script>
<style>
	.el-table .info-row {
		background: #e4e4e4;
	}
</style>
<style scoped>
	.paginationClass {
		margin-top: 1%;
		float: right;
	}

	.userPage {
		margin: 10px 0;
		overflow: hidden;
		padding: 0 0 0 20px;
		display: flex;
		align-content: center;
		justify-content: space-between;
	}

	.userPage span {
		display: inline-block;
		/* height: 62px;
      line-height: 62px;
      width: 200px; */
		color: #d42027;
		font-size: 24px;
		line-height: 120px;
	}

	.userPage span i {
		font-size: 32px;
		margin-right: 10px;
	}

	.el-form--inline .el-form-item {
		display: inline-block;
		margin-right: 20px;
		vertical-align: top;
	}

	.el-button.is-round {
		border-radius: 20px;
		padding: 10px 35px;
	}

	.showCarInfo,
	.showAdjust {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.6);
		z-index: 10;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.showCarInfo header,
	.showAdjust header {
		text-align: center;
		font-size: 28px;
		padding: 0 20px 20px;
	}

	header .icon-right {
		float: right;
	}

	.showCarInfo .msgbody {
		padding: 20px;
		background: #ffffff;
		width: 50%;
		border-radius: 10px;
	}

	.showCarInfo .el-col {
		width: 48%;
	}

	.showCarInfo .el-col:nth-child(2n) {
		padding-right: 4%;
	}

	.showAdjust .msgbody {
		padding: 20px;
		background: #ffffff;
		width: 40%;
		border-radius: 10px;
	}

	.car-management-header {
		margin-left: 30px;
		width: 100%;
		height: 40px;
		font-size: 22px;
		color: #666;
		position: absolute;
		left: 0;
		top: 10px;
		padding: 10px 0 0 20px;
		box-sizing: border-box;
	}
</style>
