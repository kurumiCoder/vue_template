const Block = defineComponent({
  props: {
    txt: {
      type: String,
      default: '默认内容',
    },
  },
  setup(props) {
    const { txt } = props
    const css = 'font-size:28px;color:red'

    return () => <p style={css}>{txt}</p>
  },
})

export default Block
