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
      rule_type: 213,
      lucky_status: 0,
      last_days: '7', //最近多少天
    },
    // 规则列表
    ruleList: SettingConfig.RuleList,
    ruleSearchList: SettingConfig.ruleSearchList,
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
  },
  didUpdate() { },
  didUnmount() {

  },
  methods: {
    // 列表初始化
    initData() {
      let that = this
      my.showLoading({ content: '获取数据详情...' });
      let formSearch = that.data.formSearch
      formSearch.acid = that.props.actId
      app.luckyHttp(app.followinfo, 'GET', formSearch, res => {
        my.hideLoading();
        let list = res.list
        list.forEach(element => {
          element.buyer_pin = app.handleStringLength(element.buyer_pin)
          if (formSearch.rule_type == 231) {
            element.rule_value_filter = element.rule_value.voteval
          }
          if (formSearch.rule_type == 232) {
            element.rule_value_filter = Object.values(element.rule_value).join('|')
          }
        });
        that.setData({
          list: list,
          total: res.count
        })
      })
    },
    // 导出
    onExports() {
      my.showLoading({ content: '正在导出...' });
      let formSearch = this.data.formSearch
      formSearch.acid = this.props.actId
      app.luckyHttp(app.export_input_answer, 'GET', formSearch, res1 => {
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

      that.initData()
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
      that.initData()
    },
    // 活动规则变化
    handleDataRuleFilter(e) {
      let that = this
      let formSearch = that.data.formSearch
      formSearch.rule_type = e.target.dataset.index
      formSearch.page = 1
      that.setData({ formSearch: formSearch })
      that.initData()
    }
  },
});