const app = getApp();
export default {
  data: {
  },
  onInit() {
    // console.log('init');
  },
  deriveDataFromProps(nextProps) { },
  didMount() {
  },
  didUpdate(prevProps, prevData) {
  },
  didUnmount() { },
  methods: {
    setGameData(data) {
      this.props.onHandleRoundRun(data);
    },
    getLuckyRes(actInfo) {
      // console.log('common', 1)
      return new Promise((resolve, reject) => {
        // console.log('common', 2)
        // 防止重复点击

        // console.log('this.data.loading',this.data.loading)
        // console.log('this.data.gameRunning',this.data.gameRunning)


        // 活动是否有效

        if (actInfo.is_need_userauth == 1) {
          // console.log('common', 7)
          app.getUserInfo().then(user => {
            // console.log('common', 20)
            console.log('common', user)
            if (this.props.actInfo.validActivityFlag === false) {
              // console.log('common', 6)
              return reject('活动还未开始或已结束');
            }

            if (this.data.loading) {
              // console.log('common', 3)
              return resolve(false)
            } else {
              // console.log('common', 4)
              this.setData({
                loading: true
              });
            }
            // 游戏正在运行
            if (this.data.gameRunning) {
              // console.log('common', 93)
              return resolve(false)
            }
            // console.log('common', 21)

            this.setGameData({ gameRunning: true })

            // console.log('common', 8)
            this.mixinsGameStart(resolve, reject);
          }, () => {
            // console.log('common', 9)
            this.setGameData({ gameRunning: false, loading: false })
            return resolve(false)
          })
        } else {
          // console.log('common', 10)
          if (this.props.actInfo.validActivityFlag === false) {
            // console.log('common', 6)
            return reject('活动还未开始或已结束');
          }

          if (this.data.loading) {
            // console.log('common', 11)
            return resolve(false)
          } else {
            // console.log('common', 12)
            this.setData({
              loading: true
            });
          }
          // console.log('common', 13)
          // 游戏正在运行
          if (this.data.gameRunning) {
            // console.log('common', 14)
            return resolve(false)
          }
          // console.log('common', 15)
          this.setGameData({ gameRunning: true })
          // console.log('common', 16)
          this.mixinsGameStart(resolve, reject);
        }
      })
    },
    // 封装一个方法。因为有是否获取用户真实昵称的逻辑。
    mixinsGameStart(resolve, reject) {
      // console.log('common', 11)
      my.showLoading({ content: '加载中...' });

      // 拼接数据
      let data = { acid: app.activeId, shop_id: app.shopId, platform: 'tb' }
      console.log('common', data)
      // 调用url请求

      app.cloud.function.invoke('luckyHandler', data, 'getLuckyChance').then(res => {
        my.hideLoading();
        this.setData({
          loading: false
        });
        resolve(res);
      }, error => {
        reject(error)
      });
    },
    handleLuckyResult(data, changeLuckyAwardUrl = app.changeLuckySendStatus) {
      // console.log('common', 15)
      // console.log('data', data);
      let that = this
      return new Promise((resolve) => {
        // console.log('common', 16)
        // 正常抽奖后的逻辑
        if (data.code == 100) {
          // console.log('common', 17)
          // 设置参数的临时对象
          let setDataObj = {}
          // 中奖
          if (data.lucky_status) {
            // console.log('common', 18)
            // 淘宝官方奖品标记
            setDataObj.luckyAward = data.award_info

       

        
              // console.log('common', 21)
              setDataObj.luckyRes = true
              that.props.onHandleRoundRun(setDataObj)
              return resolve([true, true])
            
          } else {
            // console.log('common', 22)
            that.props.onHandleRoundRun({
              luckyAward: {},
              luckyRes: false,
              drawNoLuckyMsg: ''
            })
            return resolve([false, true])
          }
        } else {
          // console.log('common', 23)
          // 各种不符合抽奖。例如：未满足抽奖条件。中奖次数，抽奖次数等限制.
          let setDataObj = {
            luckyAward: {},
            luckyRes: false,
            drawNoLuckyMsg: data.msg
          }
          that.props.onHandleRoundRun(setDataObj)
          let running = true
          if (data.code == 103 || data.code == 104 || data.code == 105 || data.code == 107)
            running = false
          // 第一个参数 是中奖结果，第二个是 游戏效果
          // console.log('我执行了了   ')
          return resolve([false, running])
        }
      })
    },
    // 处理发送淘宝奖池的逻辑
    handleTbAward(awardInfo, setDataObj, changeLuckyAwardUrl, callBackFun) {
      // console.log('common', 24)
      // console.log('common——awardInfo', awardInfo)
      my.authorize({
        scopes: 'scope.lotteryDraw',
        success: function (res) {
          // console.log('common', 25)
          my.tb.tidaLotterydraw({
            schemaId: awardInfo.schema_id,
            raffleCode: awardInfo.raffle_code,
            relationId: app.shopId.toString() + app.activeId.toString(),
            success(res) {
              // console.log('common', 26)
              //如果发送成功
              setDataObj.luckyRes = true
              callBackFun(true)
            },
            fail(res) {
              // console.log('common', 27)
              setDataObj.luckyRes = false
              setDataObj.luckyAward = {}
              callBackFun(false)
            },
            complete(res) {
              // console.log('common', 28)
              // console.log('common——res', res)
              if (res.data.result.resultType != 1) {
                // console.log('common', awardInfo)
                //如果发送失败，则修改发奖状态为失败
                var failData = { 'luckyLogId': awardInfo.luckyLogId, 'acid': app.activeId, 'send_state': 0 };

                // 增加到日志中
                res.failData = failData
                app.luckyHttp(app.addLogInfo, 'POST', { msg: JSON.stringify(res) }, res => {
                  // console.log('common', 30)
                  // console.log('res', res)
                });

                // 调用url请求
                app.luckyHttp(changeLuckyAwardUrl, 'POST', failData, res => {
                  // console.log('common', 31)
                  if (res.status === 200) {
                    // console.log('common', 32)
                  } else {
                    // console.log('common', 33)
                    app.funcExcept(res, false);
                  }
                }, error => {
                  // console.log('error', error)
                });
              }
            }
          })
        },
        fail(res) {
          // console.log('common', 34)
          console.log('res', res)
        }
      });
    },
    winOrLose(luckyRes) {
      // console.log('luckyRes', luckyRes)
      // console.log('common', 35)
      var that = this
      var animation = my.createAnimation({
        duration: 400,
        timeFunction: "linear"

      })

      that.animation = animation
      // animation.translate(0,0)
      animation.translateY(0).step()
      let data = { showWin: true, showShadow: true }
      if (!luckyRes)
        data = { showLose: true, showShadow: true }
      data.animationData = animation.export()
      that.props.onHandleRoundRun(data)

      // that.props.onHandleRoundRun({
      //   animationData: animation.export(),
      // })
      // setTimeout(function () {
      //   console.log('common', 36)
      //   animation.translateY(0).step()
      //   that.props.onHandleRoundRun({
      //     animationData: animation.export(),
      //   })

      // }, 1000)

      setTimeout(() => {
        that.setGameData({
          'gameRunning': false,
        });
      }, 2000)
      // console.log('common', 37)
    },
    entryShop() {
      // console.log('sdfsdsfsd我执行了')
    }
  },
};