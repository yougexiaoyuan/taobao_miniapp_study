const app = getApp();
Component({
  mixins: [],
  data: {},
  props: { item: {} },
  didMount() {
    console.log(this.props);
    console.log('app.awardImg', app.awardImg);
    
    this.setData({
      indicatorDots: false,
				circular: true,
				autoplay: true,
				interval: 2500,
				duration: 500,
        swiperCur: 0,
        
      width: this.props.item.position.width * app.numMultiple,
      height: this.props.item.position.height * app.numMultiple,
      top: this.props.item.position.top * app.numMultiple,
      left: this.props.item.position.left * app.numMultiple,

      imgUrls: this.props.awardImg,
      // docConfig: this.props.item.docConfig.type,
      // imgConfig: this.props.item.imgConfig.type,
      lrConfig: this.props.item.lrConfig.val,
      imageH: this.props.item.position.height * app.numMultiple

    });
  },
  didUpdate() { },
  didUnmount() { 
    console.log('this.props.item',this.props.item)
  },
  methods: {
    
  }
});
