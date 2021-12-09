/*
  抽奖活动规则配置页面.by kohelp
*/
const { cloud, verifyNumber } = getApp();
Component({
  mixins: [],
  data: {
    modalShow: false,
    dataSelectNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    activity: {
      max_join_times: 0,
      max_lucky_times: 0,
      per_day_times: 0,
    },
    ruleList: {
      211: '免费抽奖',
      221: '分享活动',
    },
    // 单个规则code集合
    singleRuleArr: [
      211,
      221,
    ],
    // 后缀集合
    ruleSuffixList: {
      211: '',
      221: '',
    },
    // 规则信息是否展示
    ruleShow: {
      finish_times: false,
      finish_times_name: '',
      finish_times_suffix: '',
      join_times: false,
      is_multi: false,
      orderstate: false,
      extend: false,
    },
    formValidate: {
      acid: 0,
      rule_type: 0, // 规则类型
      rule_sort: "1", // 规则排序
      rule_extend: {
        rule_type: 1, // 规则类型
        finish_times: 0, // 完成次数
        join_times: 1, // 可抽次数
        is_multi: "0", // 是否累加
        key: {},
        value: {},
      },
    },
    selectedRuleIndex: 211,
    labelCol: { fixedSpan: 5 },
    wrapperCol: { span: 24 },

    // 最终选择的规则列表
    ruleSeletedList: [],

    clickedSetInfo: {},
  },
  props: { actId: 0 },
  didMount() {
    // 数据初始化
    let that = this
    that.switchRules(that.data.selectedRuleIndex)
    that.getRuleList()
  },
  didUpdate() { },
  didUnmount() { },
  methods: {
    // 获取规则信息
    getRuleList() {
      let that = this
      my.showLoading({ content: '加载中...' });

      cloud.function.invoke('activityRule', { acid: that.props.actId }, 'select').then(res => {
        console.log('11111', res)
        my.hideLoading();
        if (res.success) {

          // 处理排序
          let formValidate = that.data.formValidate
          if (res.ruleList && res.ruleList.length < 6) {
            formValidate.rule_sort = (res.ruleList.length + 1) + ''
          } else {
            formValidate.rule_sort = '1'
          }

          let ruleList = res.ruleList

          // 处理规则名称
          if (ruleList && ruleList.length > 0) {
            let i = 0
            ruleList.forEach(rule => {
              // 组合规则
              if (0 == rule.rule_type) {
                let j = 0
                rule.rule_extend.forEach(sub_rule => {
                  ruleList[i]['rule_extend'][j]['rule_name'] = that.filterRuleExtend(sub_rule)
                  j++
                })
              }
              else {
                ruleList[i]['rule_name'] = that.filterRuleExtend(JSON.parse(rule.rule_extend))
              }
              i++
            });
          }

          that.setData({
            activity: res.activity,
            ruleSeletedList: res.ruleList,
            formValidate: formValidate
          })
        } else {
          my.showToast({ content: '保存失败，请稍后再试' });
        }
      })
    },
    // 过滤规则信息
    filterRuleExtend(extend) {
      if (extend == null) return ''

      switch (extend.rule_type) {
        case 211:
        case 221:
          return (
            this.data.ruleList[extend.rule_type] +
            '，可抽奖' +
            extend.join_times +
            '次'
          )
        default:
          return ''
      }
    },
    // 删除规则
    handleDel(e) {
      let that = this
      let rId = e.target.dataset.rule_id
      let ruleType = e.target.dataset.rule_type
      let index = e.target.dataset.sub_index
      my.confirm({
        title: '删除提示',
        content: '删除该类型规则后，再次添加相同规则类型时，之前已抽奖的用户，满足条件的话，会再次拥有抽奖机会，请注意！',
        confirmButtonText: '确定删除',
        cancelButtonText: '我再想想',
        success: (result) => {
          if (result.confirm) {
            my.showLoading({ content: '删除中...' });
            cloud.function.invoke('activityRule', { acid: that.props.acid, id: rId, index: index, rule_type: ruleType }, 'delete').then(res => {
              my.hideLoading();
              if (res.success) {
                my.showToast({ content: '删除成功' });
                that.getRuleList()
              } else {
                my.showToast({ content: '删除失败，请稍后再试' });
              }
            })
          }
        }
      })
    },
    handelSetExtend(e) {

    },

    // 3个限制条件修改
    onActivityChange(e) {
      let that = this
      let activity = that.data.activity
      // 每人最大抽奖次数  
      if (e.target.dataset.name == 'max_join_times') {
        activity.max_join_times = e.detail.value
      }
      // 每人最大中奖次数 
      if (e.target.dataset.name == 'max_lucky_times') {
        activity.max_lucky_times = e.detail.value
      }
      // 每人每天最大抽奖次数
      if (e.target.dataset.name == 'per_day_times') {
        activity.per_day_times = e.detail.value
      }
      that.setData({ activity: activity })
    },
    // 规则排序和自动累加倍数修改
    onChange(e) {
      let that = this
      let formValidate = that.data.formValidate

      // 抽奖次数
      if (e.target.dataset.name == 'join_times') {
        formValidate.rule_extend.join_times = e.detail.value
      }

      // 规则排序
      if (e.target.dataset.name == 'rule_sort') {
        formValidate.rule_sort = e.detail.value
      }

      that.setData({ formValidate: formValidate })
    },

    onSwitchRules(e) {
      let that = this
      let rule_type = e.target.dataset.value * 1
      that.switchRules(rule_type)
    },
    // 切换规则
    switchRules(rule_type) {
      let that = this

      that.resetRuleShow()
      that.resetFormValidate()
      that.setData({ selectedRuleIndex: rule_type })

      let formValidate = this.data.formValidate
      let ruleShow = this.data.ruleShow

      formValidate.rule_type = rule_type
      formValidate.rule_extend.rule_type = rule_type

      switch (rule_type) {
        case 211: // 无门槛抽奖
          ruleShow.join_times = true
          break
        case 221: // 分享
          ruleShow.join_times = true
          break
      }
      that.setData({ ruleShow: ruleShow, formValidate: formValidate })
    },
    // 获取规则后缀名称
    getRuleSuffix(rule_type) {
      return this.data.ruleSuffixList[rule_type]
    },
    // 重置
    resetRuleShow() {
      let that = this
      let ruleShow = {
        finish_times: false,
        finish_times_name: '',
        finish_times_suffix: '',
        join_times: false,
        is_multi: false,
        orderstate: false,
        extend: false,
      }
      that.setData({ ruleShow: ruleShow })
    },
    resetFormValidate() {
      let that = this
      let formValidate = {
        acid: that.props.actId,
        rule_type: 0, // 规则类型
        rule_sort: that.data.formValidate.rule_sort, // 规则排序
        rule_extend: {
          rule_type: 1, // 规则类型
          finish_times: 1, // 完成次数
          join_times: 1, // 可抽次数
          is_multi: "0", // 是否累加
          key: {},
          value: {},
        },
      }
      that.setData({ formValidate: formValidate })
    },
    // 下一步提交表单
    handleSubmit() {
      let that = this
      let aa = {
        finish_times: true
      }
      that.setData({ ruleShow: aa })
    },

    // 保存规则
    handleAdd() {
      let that = this
       my.showLoading({ content: '保存中...' });
      // 验证唯一规则
      if (that.data.singleRuleArr.indexOf(that.data.formValidate.rule_type) > -1) {
        var re = new RegExp('rule_type":' + that.data.formValidate.rule_type, 'gim')
        if (re.test(JSON.stringify(that.data.ruleSeletedList))) {
          my.showToast({ content: that.data.ruleList[that.data.formValidate.rule_type] + '规则已存在' });
          return false
        }
      }

      let ruleCount = 0
      let sortRuleCout = {}
      for (const rule of that.data.ruleSeletedList) {
        if (
          that.data.formValidate.rule_sort == rule.rule_sort &&
          rule.rule_type === 0 &&
          rule.rule_extend &&
          rule.rule_extend.length >= 6
        ) {
          my.showToast({ content: '混合规则最多配置6个子规则' });
          return false
        }
        if (rule.rule_type === 0) {
          ruleCount++
        }
        sortRuleCout[rule.rule_sort] = rule.rule_extend
      }
      if (
        ruleCount >= 2 &&
        Object.prototype.toString.call(
          sortRuleCout[that.data.formValidate.rule_sort]
        ) === '[object Object]'
      ) {
        my.showToast({ content: '一个活动最多配置2个混合规则' });
        return false
      }

      if ([211, 221].indexOf(that.data.formValidate.rule_type) > -1) {
        if (verifyNumber(that.data.formValidate.rule_extend.join_times)) {
          my.showToast({ content: '可抽奖请输入数字' });
          return false
        }
      }

      console.log('that.data.formValidate', that.data.formValidate)
      let formData = that.data.formValidate
      let userInfo = my.getStorageSync({ key: 'user_info' });
      formData.shop_id = userInfo.data.user_info.sid     
      formData.rule_extend = JSON.stringify(formData.rule_extend)

      cloud.function.invoke('activityRule', formData, 'insert').then(res => {
        console.log(111111, res)
        my.hideLoading();
        if (res.success) {
          my.showToast({ content: '保存成功' });
          that.getRuleList()
        } else {
          my.showToast({ content: '保存失败，请稍后再试' });
        }
      })
    },
 
    // 修改三个属性
    onUpdateThrees() {
      let that = this
      let formData = that.data.activity
      formData['id'] = that.props.actId
      my.showLoading({ content: '更新中...' });

      cloud.function.invoke('activityBase', formData, 'updateThree').then(res => {
        my.hideLoading()
        if (res.success) {
          my.showToast({ content: '更新成功' });
        } else {
          my.showToast({ content: '更新失败，请稍后再试' });
        }
      })
    },

    onBaseNext() {
      this.props.onHandleTab('award')
    },
    handleBackActivityList() {
      my.navigateTo({ url: `/pages/activity/activity_list/activity_list` })
    }
  },
});