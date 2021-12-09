/*
  店铺关注规则.by kohelp
*/
const app = getApp();
Component({
  mixins: [],
  data: {
    labelCol: { fixedSpan: 1 },
    wrapperCol: { span: 20 },
  },
  props: { actId: 0 },
  didMount() {
  },
  didUpdate() { },
  didUnmount() { },
  methods: {
  onBaseNext() {
      this.props.onHandleTab('award')
    }
  },
});