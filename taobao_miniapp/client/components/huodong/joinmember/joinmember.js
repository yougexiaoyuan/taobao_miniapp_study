const app = getApp();
Component({
  mixins: [],
  data: {},
  props: { item: {} },
  didMount() {
    console.log(this.props.item)
    this.setData({
      width: this.props.item.position.width * app.numMultiple,
      height: this.props.item.position.height * app.numMultiple,
      top: this.props.item.position.top * app.numMultiple,
      left: this.props.item.position.left * app.numMultiple,
      
      logoConfig: this.props.item.logoConfig ? this.props.item.logoConfig.url : '',
      btnUrlConfig: this.props.item.btnUrlConfig ? this.props.item.btnUrlConfig.value : '',
      
    });
  },
  didUpdate() { },
  didUnmount() { },
  methods: {
    
    clickEvent() {
      let that = this;
      let url = that.data.btnUrlConfig;
      console.log(url)
      if (url) {
        // my.navigateTo({ url: '/pages/web/web?url=' + encodeURIComponent(url) })
            app.navigateToOutside(url)
        return false;
      } else{
        this.props.onOpenShop();
      }
    }
  }
});
