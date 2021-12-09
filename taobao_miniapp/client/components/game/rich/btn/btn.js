const app = getApp();
import common from '/minxins/common';
import FruitMachine from '/utils/fruitMachineNew.js'
Component({
  mixins: [common],
  data: { loading: false, fruitMachineObj: {}, gameRunning: false },
  props: { item: {}, actInfo: {}, luckyAward: {} },
  didMount() {
    this.setData({
      width: this.props.item.position.width * app.numMultiple,
      height: this.props.item.position.height * app.numMultiple,
      top: this.props.item.position.top * app.numMultiple,
      left: this.props.item.position.left * app.numMultiple,
      logoConfig: this.props.item.logoConfig ? this.props.item.logoConfig.url : '',
      zindex: this.props.item.position.zindex,
    });
  },
  didUpdate() { },
  didUnmount() { },
  methods: {
    // 开始抽奖
    startGame(e) {
      let that = this
      this.getLuckyRes(that.props.actInfo).then((luckyRes) => {
        if (luckyRes === false) {
          return false
        }
        // 本组件使用
        that.setData({ gameRunning: true })

        that.setGameData({
          'gameRunning': true
        });
        that.handleLuckyResult(luckyRes).then(([res, isRunning]) => {
          if (isRunning == false) {
            that.winOrLose(res);
            setTimeout(function () {
              that.setData({ gameRunning: false, loading: false })
            }, 1000)
          } else {
            let awardinfo = this.props.luckyAward;;
            let awardnum = 8;
            if (awardinfo.award_sort && awardinfo.award_sort > 0) {
              awardnum = awardinfo.award_sort;
            }
            console.log('this.props.luckyAward', this.props.luckyAward)
            console.log('awardnum', awardnum)
            let fruitMachineObj = new FruitMachine(this, {
              ret: awardnum, // 取值1～8
              speed: 100,
              callback: () => {
                that.winOrLose(res);
                setTimeout(() => {
                  that.setData({ gameRunning: false, loading: false })
                }, 1000);
              }
            });
            fruitMachineObj.start();
          }
        })

      }).catch((luckyRes) => {
        that.setData({ gameRunning: false, loading: false })
        my.alert({
          content: luckyRes,
        });
      });
    },
    setIdx(data) {
      this.setGameData(data);
    }
  },
});
