Page({
  data: {
    'weburl':''
  },
  onLoad(query) {
    this.setData({
      'weburl':query.url
    });
  },
});
