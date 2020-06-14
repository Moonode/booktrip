Component({
  data: {

  },
  properties: {
    title: String,
    item: Object,
  },
  methods: {
    tapItem(e) {
      const data = e.currentTarget.dataset;
      const index = data.index;
      const item = this.data.item[index];
      this.triggerEvent('tapitem', {
        data,
        item
      });
    }
  }
})