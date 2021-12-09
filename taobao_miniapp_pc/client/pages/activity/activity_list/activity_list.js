/*
  活动列表
*/
const { cloud } = getApp();
Page({
  data: {
    modalMa: false,
    loading: false,
    datasource: [],
    total: 0,
    qrCodeImage: '',
    qrUrl: ''
  },
  onLoad(query) {
    this.initData();
  },
  onShow() { },
  // 列表初始化
  initData() {
    let that = this

    my.showLoading({ content: '加载中...' });

    let userInfo = my.getStorageSync({ key: 'user_info' });

    cloud.function.invoke('activityBase', { shop_id: userInfo.data.user_info.sid }, 'selectAll').then(res => {

      my.hideLoading();
      if (res.success) {
        that.setData({
          datasource: res.list
        })

      } else {
        my.showToast({ content: '获取失败，请稍后再试' });
      }
    })
  },
  // 分页事件
  onPageSizeChange(e) {
    app.page = e.detail.value
    this.initData()
  },
  // 创建
  onCreate() {
    my.redirectTo({ url: `/pages/activity/activity_form/activity_form` })
    // my.qn.switchTabEx({
    //   id: "create_activity_list",
    //   complete: (res) => {
    //     // console.log(res);
    //   },
    // });
  },
  // 编辑
  onEdit(e) {
    let id = e.target.dataset.id
    my.redirectTo({ url: `/pages/activity/activity_form/activity_form?id=${id}` })
  },
  // 数据
  onData(e) {
    let id = e.target.dataset.id
    my.navigateTo({ url: `/pages/activity/data_analyse/data_analyse?acid=${id}` })
  },
  // 链接
  onLink(e) {
    let that = this, acid = e.target.dataset.id
    my.showLoading({ content: '加载中...' });
    app.luckyHttp(`${app.v2lucky_get_qrcode}`, 'GET', { acid: acid }, res => {
      my.hideLoading();
      that.setData({
        modalMa: true,
        qrCodeImage: res.qrcode,
        qrUrl: res.url
      })
    })
  },
  modalOnCancel() {
    this.setData({
      modalMa: false
    })
  },
  // 店铺装修
  onGoShop() {
    my.qn.navigateToWebPage({
      url: "https://wangpu.taobao.com/wirelessPageList.htm?spm=a211b7.9460838.0.0.b05b4aa0Xch2rg#/shop_index-index/basic",
      success: res => {
      },
      fail: res => {
      }
    });
  },
  // 查看装修教程
  onGoHelp() {
    my.qn.navigateToWebPage({
      url: "https://www.yuque.com/docs/share/868b2147-2284-4a4b-8ab4-b0a11b01b0f8?#",
      success: res => {
      },
      fail: res => {
      }
    });
  },
  // 复制链接
  onCopyUrl() {
    my.setClipboard({
      text: this.data.qrUrl,
      complete() {
        my.getClipboard({
          success: ({ text }) => {
            my.showToast({ content: '复制成功' });
          },
        });
      }
    });
  },
  // 删除
  onDel(e) {
    let that = this
    my.confirm({
      title: '删除提示',
      content: '确认删除此条活动数据吗？',
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      success: (result) => {
        if (result.confirm) {
          let id = e.target.dataset.id
          my.showLoading({ content: '删除中...' });

          cloud.function.invoke('activityBase', { acid: id }, 'delete').then(res => {
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
  }
})