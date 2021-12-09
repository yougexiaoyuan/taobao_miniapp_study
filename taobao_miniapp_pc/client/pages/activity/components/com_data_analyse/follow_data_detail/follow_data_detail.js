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
      game_type: 607,
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
    awardNameList:[]
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
      app.luckyHttp(app.get_analysis_list, 'GET', formSearch, res => {
        my.hideLoading();
        let list = res.list
        list.forEach(element => {
          element.buyer_pin = app.handleStringLength(element.buyer_pin)
          element.rule_type_name = that.data.ruleList[element.rule_type]
        });
        that.setData({
          list: list,
          total: res.count
        })
      })
    },
    // 初始化中奖数据
    initLuckyData(){      
        let that = this
      my.showLoading({ content: '获取数据详情...' });
      let formSearch = that.data.formSearch
      formSearch.acid = that.props.actId
      app.luckyHttp(app.get_analysis_list, 'GET', formSearch, res => {
        my.hideLoading();
        let list = res.list
        list.forEach(element => {
          element.buyer_pin = app.handleStringLength(element.buyer_pin)
          element.rule_type_name = that.data.ruleList[element.rule_type]
        });
        that.setData({
          list: list,
          total: res.count
        })
      })
    },
    // 导出
    onExports() {
      my.showToast({ content: '开发中...敬请期待' });
    },
    // 搜索
    handleFilter() {
      let that = this
      let formSearch = that.data.formSearch
      formSearch.page = 1
      if(formSearch.lucky_status==1) that.initLuckyData()
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
          formSearch.date = e.detail.value.join('-').replace(/ 00:00:00/g,'')
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
            if(formSearch.lucky_status==1) that.initLuckyData()
      else that.initData()
    },
    // 活动规则变化
    handleDataRuleFilter(e){
       let that = this
      let formSearch = that.data.formSearch
          formSearch.rule_type = e.target.dataset.index
      formSearch.page =1 
         that.setData({ formSearch: formSearch })
               if(formSearch.lucky_status==1) that.initLuckyData()
      else that.initData()
    },
    // 抽奖状态变化
    handleLuckyStatusFilter(e) {
      let that = this
      let formSearch = that.data.formSearch
      formSearch.lucky_status = e.target.dataset.index
      formSearch.page =1 
      that.setData({ formSearch: formSearch })
      if(e.target.dataset.index==2||e.target.dataset.index==0){
         that.initData()
      }else that.initLuckyData()
    }
  },
});