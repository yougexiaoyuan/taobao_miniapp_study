Page({
  data: {
    memo_nodes: [],
  },
  onLoad(query) {
    let app = getApp();
    console.log(app.memo_nodes);
    this.setData({
      memo_nodes: app.memo_nodes,
    });
  },
  close() {
    my.navigateBack()
  },
});
