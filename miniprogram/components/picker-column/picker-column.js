Component({
  data: {
    idx: 0,
  },
  properties: {
    text: String,
    items: Array,
  },
  methods: {
    pickerChange(e) {
      const idx = e.detail.value[0];
      const items = this.data.items;
      this.setData({
        idx,
        items
      });
      this.triggerEvent('change', {
        index: idx,
        value: items[idx],
      })
    }
  },
})