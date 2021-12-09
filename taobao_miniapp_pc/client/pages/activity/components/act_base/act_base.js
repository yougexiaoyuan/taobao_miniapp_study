/*
  活动基础信息.by kohelp
*/
const { cloud } = getApp();
Component({
  mixins: [],
  data: {
    labelCol: { fixedSpan: 4 },
    wrapperCol: { span: 20 },
    formData: {},
    lucky_title: '',
    is_auto_memo: true,
    is_need_userauth: true,
    memo: '',
    dateRangeData: [],
    handleStatus: 'updated'
  },
  props: { actId: 0 },
  didMount() {
    let that = this
    if (that.props.actId == 0) {
      that.setData({
        lucky_title: '默认活动名称',
        dateRangeData: ['2021-09-24 00:00:01', '2021-10-24 23:59:59'],
        handleStatus: 'created'
      })
    }
    else
      that.initData()
  },
  didUpdate() {
  },
  didUnmount() { },
  methods: {
    // 列表初始化
    initData() {
      let that = this
      my.showLoading({ content: '获取基本信息...' });

      cloud.function.invoke('activityBase', { acid: that.props.actId }, 'select').then(res => {
        if (res.success) {
          my.hideLoading();
          that.setData({
            lucky_title: res.data.lucky_title,
            memo: res.data.memo,
            is_auto_memo: res.data.is_auto_memo,
            is_need_userauth: res.data.is_need_userauth,
            dateRangeData: [res.data.start_date, res.data.end_date],
            formData: res.data
          })
        } else {
          my.showToast({ content: '保存失败，请稍后再试' });
        }
      })
    },
    onChange(e) {
      let {
        detail: { value },
        currentTarget: { dataset }
      } = e;
      let { name } = dataset;
      this.setData({ [name]: value });
    },
    onDateChange(e) {
      this.setData({ dateRangeData: e.detail.value });
    },
    // 页面保存事件
    handleSubmit() {
      let formData = this.data.formData
      formData['lucky_title'] = this.data.lucky_title
      if (formData['lucky_title'] == '') {
        my.showToast({ content: '请输入活动标题' });
        return false;
      }
      formData['memo'] = this.data.memo
      if (this.data.dateRangeData.length == 2) {
        if (this.data.dateRangeData[0] == null) {
          my.showToast({ content: '请选择活动开始时间' });
          return false;
        }
        if (this.data.dateRangeData[1] == null) {
          my.showToast({ content: '请选择活动结束时间' });
          return false;
        }
        formData['start_date'] = this.data.dateRangeData[0]
        formData['end_date'] = this.data.dateRangeData[1]
      }
      else {
        my.showToast({ content: '请选择活动时间' });
        return false;
      }

      formData['is_auto_memo'] = this.data.is_auto_memo * 1
      formData['is_need_userauth'] = this.data.is_need_userauth * 1

      this.data.handleStatus == 'created' ? this.handleSaveSubmit(formData) : this.handleUpdateSubmit(formData)
    },
    // 创建保存
    handleSaveSubmit(formData) {
      let userInfo = my.getStorageSync({ key: 'user_info' });
      formData.shop_id = userInfo.data.user_info.sid
      formData.seller_nick = userInfo.data.user_info.nickName

      cloud.function.invoke('activityBase', formData, 'insert').then(res => {
        if (res.success) {
          my.showToast({ content: '保存成功' });
          my.redirectTo({ url: `/pages/activity/activity_form/activity_form?id=${res.insertId}` })
        } else {
          my.showToast({ content: '保存失败，请稍后再试' });
        }
      })
    },
    // 编辑保存
    handleUpdateSubmit(formData) {
      formData['id'] = this.props.actId
      my.showLoading({ content: '保存中...' });
      cloud.function.invoke('activityBase', formData, 'update').then(res => {
        my.hideLoading()
        if (res.success) {
          my.showToast({ content: '保存成功' });
        } else {
          my.showToast({ content: '保存失败，请稍后再试' });
        }
      })
    },
    onBaseNext() {
      this.props.onHandleTab('rule')
    },
    handleBackActivityList() {
      my.navigateTo({ url: `/pages/activity/activity_list/activity_list` })
    }
  },
});