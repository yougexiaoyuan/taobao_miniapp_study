const app = getApp();
import parse from 'mini-html-parser2';
Component({
  mixins: [],
  data: {
    // 活动详情
    memo_nodes: '',
  },
  props: { item: {},ruleList:{},awardList: {}},
  didMount() {
    this.setData({
      width: this.props.item.position.width * app.numMultiple,
      height: this.props.item.position.height * app.numMultiple,
      top: this.props.item.position.top * app.numMultiple,
      left: this.props.item.position.left * app.numMultiple,
      fontSize: this.props.item.fontSize.val * app.numMultiple,
      // linkConfig: this.props.item.linkConfig.value,
      mbConfig: this.props.item.mbConfig.val * app.numMultiple,
      textPosition: this.props.item.textPosition.type,
      logoConfig: this.props.item.logoConfig ? this.props.item.logoConfig.url : '',
      textStyle: this.props.item.textStyle.type,
      titleColor: this.props.item.titleColor?this.props.item.titleColor.color[0].item:'',
      bgColor: this.props.item.bgColor?this.props.item.bgColor.color[0].item:''
      // titleConfig: this.props.item.titleConfig.value
    });
    setTimeout(() => {
      this.handleActivityDetail();
    }, 100);
  },
  didUpdate() { },
  didUnmount() { },
  methods: {
    // 处理活动详情
    async handleActivityDetail() {
      this.setData({
        memo_nodes: app.memo_nodes,
      });
    },
  }
});
