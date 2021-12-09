import parse from 'mini-html-parser2';
const app = getApp();
Component({
  mixins: [],
  data: {},
  props: { item: {} },
  didMount() {
    let nodes=[]
    var info = this.getBaseObjForDetailMemo();
    parse(this.props.item.titleConfig.value.replace(/\n+/g, '<br/>'), (err, n) => {
        // console.log('n', n)
        n.forEach(function (item) {
          // console.log('item', item)
          info.children.push(item);
        })
        nodes.push(info);
      })

    this.setData({
      width: this.props.item.position.width * app.numMultiple,
      height: this.props.item.position.height * app.numMultiple,
      top: this.props.item.position.top * app.numMultiple,
      left: this.props.item.position.left * app.numMultiple,
      fontSize: this.props.item.fontSize.val * app.numMultiple,
      linkConfig: this.props.item.linkConfig.value,
      mbConfig: this.props.item.mbConfig.val * app.numMultiple,
      textPosition: this.props.item.textPosition.type,
      logoConfig: this.props.item.logoConfig ? this.props.item.logoConfig.url : '',
      textStyle: this.props.item.textStyle.type,
      titleColor: this.props.item.titleColor.color[0].item,
      titleConfig: nodes
    });
  },
  didUpdate() { },
  didUnmount() { },
  methods: {
    getBaseObjForDetailMemo() {
    return {
      name: 'div',
      attrs: {
        class: 'card',
      },
      children: [
        {
          name: 'div',
          attrs: {
            class: 'card-title',
          },
          children: [{
            type: 'text',
            text: ``,
          }],
        }
      ]
    }
  },
    // 文本点击事件
    clickEvent(e) {
      let url = e.currentTarget.dataset.url;
      if (url) {
        app.navigateToOutside(url)
      }
    }
  },
});
