const app = getApp();
Component({
  mixins: [],
  data: {},
  props: { item: {} },
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
      titleColor: this.props.item.titleColor.color[0].item
      // titleConfig: this.props.item.titleConfig.value
    });
  },
  didUpdate() { },
  didUnmount() { },
  methods: {
    handleShowGoods() {
      my.navigateTo({ url: '/pages/showgoods/showgoods' })
    }
  }
});
