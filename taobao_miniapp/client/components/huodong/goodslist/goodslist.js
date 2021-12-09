const app = getApp();
Component({
  mixins: [],
  data: {
    favimg:'//img.alicdn.com/imgextra/i4/289589474/O1CN01vQB21o2Jr8yCIH0VB_!!289589474.png',
    hadFavimg:'//img.alicdn.com/imgextra/i3/289589474/O1CN01z2E9hP2Jr8yCIJUP4_!!289589474.png',
  },
  props: { item: {} },
  didMount() {
   
    this.setData({
      width: this.props.item.position.width * app.numMultiple,
      height: this.props.item.position.height * app.numMultiple,
      top: this.props.item.position.top * app.numMultiple,
      left: this.props.item.position.left * app.numMultiple,
      zindex: this.props.item.position.zindex,

      themeColor: this.props.item.themeColor.color[0].item,//背景颜色
      itemStyle: this.props.item.itemStyle.type,//this.props.item.itemStyle.type,//显示类型 1，2，3列
      goodsList: this.props.item.goodsList.list,
    });
    // let newGoodsList = this.props.item.goodsList.list;
    // for(let i in newGoodsList){
    //   this.checkGoodsFav(newGoodsList[i].num_iid,function(res){
    //     console.log(JSON.stringify(res))
    //     if(res.isCollect){
    //       newGoodsList[i].haveFav = 1;
    //     }else{
    //       newGoodsList[i].haveFav = 0;
    //     }
        
        
    //   },function(res){
    //     console.log(JSON.stringify(res))
    //   })
    // }
    // this.setData({
    //   goodsList:newGoodsList
    // })
  },
  didUpdate() { },
  didUnmount() { },
  methods: {
    checkGoodsFav(itemId,fun1,fun2){
      my.tb.checkGoodsCollectedStatus({
            id: Number(itemId),
            success: (res) => {
                fun1(res)
            },
            fail: (res) => {
                fun2(res)
            }
      })
    },
    openGoods(e) {
      let itemId = e.currentTarget.dataset['id']
      console.log(itemId)
      my.tb.openDetail({
        itemId: itemId,
        fail: (e) => {
          // my.alert({ content: 'error ' + e.message });
        },
      })
    },
    favGoods(e) {
      
      let itemId = e.currentTarget.dataset['id'];
      let idx = e.currentTarget.dataset['idx']
      my.tb.collectGoods({
        id: Number(itemId),
        success: (res) => {
          my.showToast({ 'content': '收藏成功' });
          
          let l = this.data.goodsList;
          l[idx].haveFav = 1;
           this.setData({
            goodsList:l
          })


        },
        fail: (res) => {
          my.showToast({ 'content': '收藏失败，'+ res.errorMessage });
        },
        complete: (res) => {
          // my.alert({ content: "complete - " + JSON.stringify(res) })
        }
      })
    },
  }
});
