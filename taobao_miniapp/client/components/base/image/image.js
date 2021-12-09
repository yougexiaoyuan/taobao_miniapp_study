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
      logoConfig: this.props.item.logoConfig ? this.props.item.logoConfig.url : '',
      bgColor: this.props.item.bgColor.color[0].item,
      linkConfig: this.props.item.linkConfig?this.props.item.linkConfig.value:''
    });
  },
  didUpdate() { },
  didUnmount() { },
  methods: {
    handleClick() {
      let that = this;
      let url = that.data.linkConfig;
      if (url) {
        // my.navigateTo({ url: '/pages/web/web?url=' + encodeURIComponent(url) })
            app.navigateToOutside(url)
        return false;
      }
    }
  },
});
