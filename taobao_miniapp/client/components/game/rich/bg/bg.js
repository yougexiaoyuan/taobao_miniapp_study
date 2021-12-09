const app = getApp();
Component({
  mixins: [],
  data: {
  },
  props: { item: {}, round_change_angle: 0, gameRunning: false, idx: 0 },
  didMount() {
    this.setData({
      width: this.props.item.position.width * app.numMultiple,
      height: this.props.item.position.height * app.numMultiple,
      top: this.props.item.position.top * app.numMultiple,
      left: this.props.item.position.left * app.numMultiple,
      logoConfig: this.props.item.logoConfig ? this.props.item.logoConfig.url : '',
      zindex:this.props.item.position.zindex,
    });
  },
  didUpdate(prevProps, prevData) {
    // console.log('bg____prevData',prevData);
    // console.log('bg____prevProps',prevProps);
  },
  didUnmount() { },
  methods: {},
});
