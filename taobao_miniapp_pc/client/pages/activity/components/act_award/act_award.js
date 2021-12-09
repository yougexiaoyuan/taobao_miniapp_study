/*
  奖品操作.by kohelp
*/
const { cloud, verifyNumber } = getApp();
Component({
  mixins: [],
  data: {
    awardTypeClick: false, // 奖品点击的标记
    editAwardType: 0, // 编辑时的 奖品类型
    taobaoAwardType: 0,
    dialogStatus: 'created', // 当前提交类型
    loading: false,
    min_award_num: 0, //奖品数量最小值
    fromList: {
      typeList: [
        { text: '自定义奖品', val: 301 }
      ]
    },
    formValidate: {
      acid: -1,
      award_sort: 1,
      award_type: 301,
      award_title: '恭喜您得到一个神秘礼品，快去联系客服',
      award_chance: 10,
      award_num: 1,
      award_pic_url:
        'https://img.alicdn.com/imgextra/i3/289589474/TB2JLSmkR8kpuFjSspeXXc7IpXa-289589474.jpg',
      award_per_limit: 0,
    },

    labelCol: { fixedSpan: 8 },
    wrapperCol: { span: 24 },
    dataSelectNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    // 奖品列表
    dataAward: [],
    // 奖品列表过滤使用
    awardTypeObj: {
      301: '自定义奖品',
    },
    // 排序
    sort: 1,
    // 新增&编辑的标记
    id: undefined,
    // 列表展示
    listShow: true,
    // form表单展示
    formShow: false,
  },
  props: { actId: 0 },
  didMount() {
    let that = this
    that.initData()
  },
  didUpdate() {
  },
  didUnmount() { },
  methods: {
    // 列表初始化
    initData() {
      let that = this
      my.showLoading({ content: '加载中...' });

      cloud.function.invoke('activityAward', { acid: that.props.actId }, 'selectAll').then(res => {

        my.hideLoading();
        if (res.success) {

          let len = res.list.length
          for (let i = 0; i < len; i++) {
            res.list[i]['awardTypeName'] = this.data.awardTypeObj[res.list[i]['award_type']]
          }

          that.setData({
            dataAward: res.list
          })

        } else {
          my.showToast({ content: '获取失败，请稍后再试' });
        }
      })
    },
    // form表单数据初始化
    resetFormInfo() {
      let that = this
      that.setData({
        formValidate: {
          acid: -1,
          award_sort: 1,
          award_type: 301,
          award_title: '恭喜您得到一个神秘礼品，快去联系客服',
          award_chance: 10,
          award_num: 1,
          award_pic_url:
            'https://img.alicdn.com/imgextra/i3/289589474/TB2JLSmkR8kpuFjSspeXXc7IpXa-289589474.jpg',
          award_per_limit: 0,
        },
        ruleTableList: [],
      })
    },
    // 添加奖品
    handleAdd() {
      let that = this
      if (that.data.dataAward.length >= 12) {
        my.showToast({ content: '奖品不能超过12个' });
        return false
      }
      let sort = 1
      if (that.data.dataAward.length > 0) {
        var lastAward = that.data.dataAward.slice(-1)
        sort = lastAward[0].award_sort + 1
      }
      // 数据初始化
      that.resetFormInfo()
      that.setData({ sort: sort, id: undefined, listShow: false, formShow: true, dialogStatus: 'created' })
    },
    // form返回列表
    onToAwardList() {
      let that = this
      that.setData({ listShow: true, formShow: false })
    },
    // 编辑
    onEdit(e) {
      this.getEditInfo(e.target.dataset.id)
    },
    // 获取编辑时的信息
    getEditInfo(id) {
      let that = this
      my.showLoading({ content: '加载中...' });

      cloud.function.invoke('activityAward', { id: id }, 'select').then(res => {
        if (res.success) {
          my.hideLoading();

          let formValidate = Object.assign({}, res.data)
          formValidate.award_chance = formValidate.award_chance + '';

          that.setData({
            id: id,
            listShow: false,
            formShow: true,
            dialogStatus: 'updated',
            formValidate: formValidate,
            min_award_num: formValidate.award_num,
            editAwardType: formValidate.award_type
          })

        } else {
          my.showToast({ content: '保存失败，请稍后再试' });
        }
      })
    },
    // 删除
    onDel(e) {
      let that = this
      my.confirm({
        title: '删除提示',
        content: '确认删除此条奖品数据吗？',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        success: (result) => {
          if (result.confirm) {
            let id = e.target.dataset.row.id

            my.showLoading({ content: '加载中...' });

            cloud.function.invoke('activityAward', { id: id }, 'delete').then(res => {
              my.hideLoading();
              if (res.success) {
                my.showToast({ content: '删除成功' });
                that.initData()
              } else {
                my.showToast({ content: '删除失败，请稍后再试' });
              }
            })
          }
        },
      });
    },
    // 表单change事件
    onAwardChange(e) {
      let that = this
      let formValidate = that.data.formValidate
      formValidate[e.target.dataset.name] = e.detail.value
      // 奖品类型修改
      if ('award_type' == e.target.dataset.name) {

        let award_type = e.detail.value
        if (that.data.id == null) formValidate.award_num = 1

        if (award_type === 301) {
          if (that.data.dialogStatus !== 'updated' || that.data.awardTypeClick) {
            formValidate.award_title = '恭喜您得到一个神秘礼品，快去联系客服'

            formValidate.award_pic_url =
              'https://img.alicdn.com/imgextra/i3/289589474/TB2JLSmkR8kpuFjSspeXXc7IpXa-289589474.jpg'
          }
        }
      }

      that.setData({ formValidate: formValidate })
    },

    // 打开图片空间
    onImages() {
      my.qn.navigateToWebPage({
        url: "https://sucai.wangpu.taobao.com/",
        success: res => {
        },
        fail: res => {
        }
      });
    },

    // 新增保存事件
    handleSubmit() {
      let that = this

      let formData = that.data.formValidate
      // 校验必填项
      if (formData.award_type == '') {
        my.showToast({ content: '请选择奖品类型' });
        return false
      }
      if (formData.award_title == '') {
        my.showToast({ content: '请输入奖品名称' });
        return false
      }
      if (formData.award_chance == '') {
        my.showToast({ content: '请输入奖品概率' });
        return false
      }

      if (formData.award_chance < 0 || formData.award_chance > 100) {
        my.showToast({ content: '请输入0-100的数字' });
        return false
      }

      // 正则验证小数点后两位
      const pattern = /^\d+.?\d{0,2}$/;
      if (!pattern.test(formData.award_chance)) {
        my.showToast({ content: '小数点后最多只能输入两位' });
        return false
      }

      if (formData.award_num == '') {
        my.showToast({ content: '请输入奖品数量' });
        return false
      }

      // 数字验证 
      if (verifyNumber(formData.award_num)) {
        my.showToast({ content: '奖品数量请输入数字' });
        return false
      }

      if (formData.award_pic_url == '') {
        my.showToast({ content: '请输入奖品图片' });
        return false
      }

      formData.acid = that.props.actId
      formData.award_sort = that.data.sort

      console.log('formData', formData)

      let userInfo = my.getStorageSync({ key: 'user_info' });
      formData.shop_id = userInfo.data.user_info.sid

      cloud.function.invoke('activityAward', formData, 'insert').then(res => {
        if (res.success) {
          my.showToast({ content: '保存成功' });
          that.initData()
          that.onToAwardList()
        } else {
          my.showToast({ content: '保存失败，请稍后再试' });
        }
      })

    },
    // 编辑保存事件
    handleUpdate() {
      let that = this

      let formData = that.data.formValidate
      // 校验必填项
      if (formData.award_type == '') {
        my.showToast({ content: '请选择奖品类型' });
        return false
      }
      if (formData.award_title == '') {
        my.showToast({ content: '请输入奖品名称' });
        return false
      }
      if (formData.award_chance == '') {
        my.showToast({ content: '请输入奖品概率' });
        return false
      }


      if (formData.award_chance < 0 || formData.award_chance > 100) {
        my.showToast({ content: '请输入0-100的数字' });
        return false
      }

      // 正则验证小数点后两位
      const pattern = /^\d+.?\d{0,2}$/;
      if (!pattern.test(formData.award_chance)) {
        my.showToast({ content: '小数点后最多只能输入两位' });
        return false
      }

      if (formData.award_num == '') {
        my.showToast({ content: '请输入奖品数量' });
        return false
      }

      // 数字验证 
      if (verifyNumber(formData.award_num)) {
        my.showToast({ content: '奖品数量请输入数字' });
        return false
      }

      if (formData.award_pic_url == '') {
        my.showToast({ content: '请输入奖品图片' });
        return false
      }

      my.showLoading({ content: '更新保存中...' });


      cloud.function.invoke('activityAward', formData, 'update').then(res => {
        my.hideLoading()
        console.log('33333',res)
        if (res.success) {
          my.showToast({ content: '修改成功' });
          that.initData()
          that.onToAwardList()
        } else {
          my.showToast({ content: '保存失败，请稍后再试' });
        }
      })
    },
    onBaseNext() {
      this.props.onHandleTab('spread')
    },
    onUp(e) {
      let that = this
      let index = e.target.dataset.index
      if (index > 0) {
        my.showLoading({ content: '排序中...' });
        let upid = this.data.dataAward[index].id
        let downid = this.data.dataAward[index - 1].id

        app.luckyHttp(`${app.luckyAwardSort}&method=put`, 'POST', { uid: upid, did: downid }, res => {
          res = JSON.parse(res)
          // changeAwardSort({ uid: upid, did: downid }).then(async (res) => {
          my.hideLoading();
          if (res.status == 200) {
            that.initData()
          } else {
            my.showToast({ content: res.msg });
          }
        })

      } else {
        my.showToast({ content: '已经是第一条了！' });
        return false
      }
    },
    onDown(e) {
      let that = this
      let index = e.target.dataset.index
      if (index + 1 === this.data.dataAward.length) {

        my.showToast({ content: '已经是最后一条了！' });
        return false
      } else {
        my.showLoading({ content: '排序中...' });
        let upid = this.data.dataAward[index + 1].id
        let downid = this.data.dataAward[index].id
        app.luckyHttp(`${app.luckyAwardSort}&method=put`, 'POST', { uid: upid, did: downid }, res => {
          res = JSON.parse(res)
          my.hideLoading();
          if (res.status == 200) {
            that.initData()
          } else {
            my.showToast({ content: res.msg });
          }
        })
      }
    },
    handleBackActivityList() {
      my.navigateTo({ url: `/pages/activity/activity_list/activity_list` })
    }
  },
});