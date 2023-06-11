export default {
  options(cc) {
    const arr = []
    if (cc) {
      for (const key in cc) {
        const lvp = cc[key]
        const {
          label,
          value
        } = lvp
        arr.push({
          label,
          value
        })
      }
    }
    return arr
  },
  getLabel(cc, vv) {
    if (cc) {
      for (const key in cc) {
        const lvp = cc[key]
        const {
          label,
          value
        } = lvp
        if (`${value}` === `${vv}`) {
          return label
        }
      }
    }
    return '-'
  }
}