import cloud from '@tbmp/mp-cloud-sdk'

cloud.init({
  env: 'test',
})

App({
  cloud,
  onLaunch(options) {
    my.showLoading({ content: '登录中...' });

    let userInfo = my.getStorageSync({ key: 'user_info' });

    if (userInfo.data == null  || userInfo.data.user_info.nickName == '') {
      this.getShopInfo().then(res => {
        my.hideLoading();
        if (res.nickName == '') {
          my.alert({
            content: '授权已过期，请重新授权111',
            complete: () => {
              my.qn.cleanToken({
                success: (res) => {
                },
                fail: (res) => {
                }
              })
              my.exit();
            }
          })
        }

        my.setStorageSync({
          key: 'user_info',
          data: {
            user_info: res,
          }
        });
        // my.navigateTo({ url: `/pages/activity/activity_list/activity_list` })
      })
    }

      // my.navigateTo({ url: `/pages/activity/activity_list/activity_list` })
    my.hideLoading();

  },

  onShow(options) {

  },
  tempVersion:"0.0.2",
  page: 1,
  limit: 10,

  // 校验数字
  verifyNumber(val) {
    return !/^\+?[1-9][0-9]*$/g.test(val)
  },

  // 校验url
  verifyUrl(url) {
    return !/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/g.test(url)
  },

  handleStringLength(name) {
    if (name.length > 30)
      return name.charAt(0) + ' * * ';
    else
      return name;
  },

  globalInfo: {},

  getUserInfo() {
    return new Promise((resolve, reject) => {
      if (my.canIUse('authorize')) {
        my.authorize({
          scopes: 'scope.userInfo',
          success: authcode => {
            my.getAuthUserInfo({
              success: res => {
                this.userInfo = res;
                resolve(this.userInfo);
              },
              fail: () => {
                reject({});
              },
            })
          }
        });
      } else {
        reject({});
      }
    })
  },
  // 获取商家店铺信息
  getShopInfo() {
    return new Promise((resolve, reject) => {
      let shopInfo = {}
      this.getUserInfo().then(user => {
        shopInfo = Object.assign({}, user)
        cloud.function.invoke('topapi', {
          api: 'taobao.shop.seller.get',
          params: { fields: 'sid,title,pic_path' }
        }, 'main').then(async res => {
          if (res.success) {
            shopInfo = Object.assign(shopInfo, res.data.shop)
            cloud.function.invoke('topapi', {
              api: 'taobao.vas.subscribe.get',
              params: { article_code: 'FW_GOODS-1000146271', nick: user.nickName }
            }, 'main').then(async res => {
              shopInfo = Object.assign(shopInfo, res.data.article_user_subscribes.article_user_subscribe[0])
            })

            resolve(shopInfo)
          } else {
            reject()
          }
        })
      }, () => {
        reject()
      })
    })
  }


});
