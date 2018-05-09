<template>
    <div :class="css.root">
        <div class="sv_custom_header"></div>
        <div class="sv_container">
         
          
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="活动名称" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>                 
          </el-form>

      </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { baseCss } from "../defaultCss/basecss";
import { VueFormBuildModel as FormBuildModel } from "./formBuildModel";

@Component
export class FormBuild extends Vue {
  @Prop formBuild: FormBuildModel;

  forceUpdate() {
    this.$forceUpdate();
  }

  constructor() {
    super();
  }
  data(){
    return{
       ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
    }
  }

  mounted() {
    this.formBuild.renderCallback = this.forceUpdate;
    this.formBuild.startTimerFromUI();
  }
  beforeDestroy() {
    this.formBuild.stopTimer();
    this.formBuild.renderCallback = undefined;
  }

  get hasTitle() {
    return !!this.formBuild.title && this.formBuild.showTitle;
  }
  get hasCompletedPage() {
    return this.formBuild.showCompletedPage && this.formBuild.state === "completed";
  }
  get css() {
    return this.formBuild.css;
  }
  getNavBtnClasses(btnType) {
    const btnClass = this.css.navigation[btnType];
    return this.css.navigationButton + " " + btnClass;
  }
  getCompletedPageClasses() {
    var css = this.css;
    return css.body + " " + css.completedPage;
  }
  getCompletedStateClasses() {
    return this.css.saveData[this.formBuild.completedState];
  }
  start() {
    this.formBuild.start();
  }
  prevPage() {
    this.formBuild.prevPage();
  }
  nextPage() {
    this.formBuild.nextPage();
  }
  completeLastPage() {
    this.formBuild.completeLastPage();
  }
  doTrySaveAgain() {
    this.formBuild.doComplete();
  }
}

Object.defineProperty(FormBuild, "cssType", {
  get: function() {
    return baseCss.currentType;
  },
  set: function(newType) {
    baseCss.currentType = newType;
  },
  enumerable: true,
  configurable: false
});

Vue.component("formbuild", FormBuild);
export default FormBuild;
</script>
