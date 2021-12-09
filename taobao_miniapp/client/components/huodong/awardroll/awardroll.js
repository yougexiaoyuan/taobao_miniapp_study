const app = getApp();
Component({
  mixins: [],
  data: {
 
  },
  props: { item: {},awardRollInfo:''},
  didMount() {
    this.setData({
      width: this.props.item.position.width * app.numMultiple,
      height: this.props.item.position.height * app.numMultiple,
      top: this.props.item.position.top * app.numMultiple,
      left: this.props.item.position.left * app.numMultiple,
      fontSize: this.props.item.fontSize.val * app.numMultiple,
      logoConfig: this.props.item.logoConfig ? this.props.item.logoConfig.url : '',
      titleColor: this.props.item.titleColor?this.props.item.titleColor.color[0].item:'',
      bgColor: this.props.item.bgColor?this.props.item.bgColor.color[0].item:''
    });
  },
  didUpdate() { },
  didUnmount() { },
  methods: {
  }
});
