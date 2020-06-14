Component({
  data: {
    marginLeft: -10,
    last: 0,
  },
  properties: {
    tabs: Object,
  },
  methods: {
    tapTabs(e) {
      const current = e.currentTarget.dataset.index;
      const { tabs } = this.data;
      const last = tabs.findIndex((val, idx) => {
        return val.isActive;
      })
      tabs[last].isActive = false;
      tabs[current].isActive = true;
      let { marginLeft } = this.data;
      marginLeft += 90 * (current - last);
      this.setData({
        tabs,
        marginLeft,
        last
      });
      this.triggerEvent('change', {
        current,
        last,
        tabs
      })
    },
  }
})