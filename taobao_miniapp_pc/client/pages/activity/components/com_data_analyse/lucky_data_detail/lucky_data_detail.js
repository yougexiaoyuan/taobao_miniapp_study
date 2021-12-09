import SettingConfig from "/config"
const app = getApp();
Component({
  mixins: [],
  data: {
    loading: false,
    // form搜索
    formSearch: {
      page: 1,
      limit: 10,
      acid: '',
      date: '',
      buyer_pin: '',
      award_id: '',
      rule_id: '',
      rule_type: '',
      lucky_status: 0,
      last_days: '7', //最近多少天
    },
    // 规则列表
    ruleList: SettingConfig.RuleList,
    statusList: [
      { id: 0, name: '全部' },
      { id: 1, name: '中奖' },
      { id: 2, name: '未中奖' },
    ],
    // 列表数据
    list: [],
    total: 0,
    // 奖品名称集合
    awardNameList: []
  },
  props: { actId: 0 },
  didMount() {
    let that = this
    that.initData()
    // that.initAward()
  },
  didUpdate() { },
  didUnmount() {

  },
  methods: {
    // 列表初始化
    initData() {
      let that = this
      my.showLoading({ content: '获取数据详情...' });

      app.cloud.function.invoke('luckyHandler', { acid: that.props.actId }, 'getLuckyTimesForSeller').then(res => {
        my.hideLoading();
        let list = res.list
        list.forEach(element => {
          element.buyer_pin = app.handleStringLength(element.buyer_pin)
          element.rule_type_name = that.data.ruleList[element.rule_type]
        });
        that.setData({
          list: list
        })
      })
    },
    // 初始化中奖数据
    initLuckyData() {
      let that = this
      my.showLoading({ content: '获取数据详情...' });
      let formSearch = that.data.formSearch
      formSearch.acid = that.props.actId

      app.cloud.function.invoke('luckyHandler', { acid: that.props.actId }, 'getLuckyDogForSeller').then(res => {
        console.log('aaaaaa', res.list)
        my.hideLoading();
        let list = res.list
        list.forEach(element => {
          element.buyer_pin = app.handleStringLength(element.buyer_pin)
          element.rule_type_name = that.data.ruleList[element.rule_type]
        });
        that.setData({
          list: list
        })
      })
    },
    // 初始化奖品
    initAward() {
      let that = this
      app.luckyHttp(app.get_award_id, 'GET', { acid: that.props.actId }, res => {
        that.setData({
          awardNameList: res.info
        })
      })
    },
    // 导出
    onExports() {
      my.showLoading({ content: '正在导出...' });
      let formSearch = this.data.formSearch
      formSearch.acid = this.props.actId
      app.luckyHttp(formSearch.lucky_status ? app.export_luckydog : app.export_drawinfo, 'GET', formSearch, res1 => {
        my.hideLoading()
        my.downloadFile({
          url: res1.url,
          success(res2) {
            my.qn.saveFileToDisk({
              apFilePath: res2.apFilePath,
              defaultFileName: res1.filename,
              complete: res3 => {
                my.showToast({ content: '导出成功' });
              }
            })
          }
        })
      })
    },
    // 搜索
    handleFilter() {
      let that = this
      let formSearch = that.data.formSearch
      formSearch.page = 1
      if (formSearch.lucky_status == 1) that.initLuckyData()
      else that.initData()
    },
    onChange(e) {
      let that = this
      let formSearch = that.data.formSearch
      formSearch[e.target.dataset.name] = e.detail.value
      that.setData({ formSearch: formSearch })
    },
    onDateChange(e) {
      let that = this
      let formSearch = that.data.formSearch
      if (e.detail.value.length == 2) {
        if (e.detail.value[0] != null && e.detail.value[1] != null) {
          formSearch.date = e.detail.value.join('-').replace(/ 00:00:00/g, '')
          that.setData({ formSearch: formSearch })
        } else {
          formSearch.date = ''
          that.setData({ formSearch: formSearch })
        }
      }
      else {
        formSearch.date = ''
        that.setData({ formSearch: formSearch })
      }
      // this.setData({ dateRangeData: e.detail.value });
    },
    // 分页事件
    onPageSizeChange(e) {
      let that = this
      let formSearch = that.data.formSearch
      formSearch.page = e.detail.value
      if (formSearch.lucky_status == 1) that.initLuckyData()
      else that.initData()
    },
    // 活动规则变化
    handleDataRuleFilter(e) {
      let that = this
      let formSearch = that.data.formSearch
      formSearch.rule_type = e.target.dataset.index
      formSearch.page = 1
      that.setData({ formSearch: formSearch })
      if (formSearch.lucky_status == 1) that.initLuckyData()
      else that.initData()
    },
    // 抽奖状态变化
    handleLuckyStatusFilter(e) {
      let that = this
      let formSearch = that.data.formSearch
      formSearch.lucky_status = e.target.dataset.index
      formSearch.page = 1
      that.setData({ formSearch: formSearch })
      if (e.target.dataset.index == 2 || e.target.dataset.index == 0) {
        that.initData()
      } else that.initLuckyData()
    }
  },
});