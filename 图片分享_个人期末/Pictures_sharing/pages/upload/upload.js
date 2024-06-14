Page({
  data: {
    name: '',       // 相册名称
    desc: '',       // 相册描述
    date: '点击选择日期',  // 选择的日期，默认为点击选择日期
    mediaUrl: ''    // 媒体文件路径
  },

  onLoad: function (options) {
    const app = getApp();
    this.setData({
      name: app.globalData.albumData.name  // 设置相册名称为全局数据中的名称
    });
  },

  inputDesc: function (e) {
    this.setData({
      desc: e.detail.value  // 输入相册描述时更新数据
    });
  },

  uploadMedia: function () {
    wx.chooseImage({
      count: 1,
      success: (res) => {
        console.log('Chosen image path:', res.tempFilePaths[0]);
        this.setData({
          mediaUrl: res.tempFilePaths[0]  // 设置选择的图片路径
        });
      }
    });
  },


  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value  // 选择日期时更新数据
    });
  },

  publish: function () {
    console.log('Publish button clicked');
    console.log('Navigating to picenter with data:', this.data);

    const app = getApp();
    app.globalData.uploadData = {
      name: this.data.name,
      desc: this.data.desc,
      date: this.data.date,
      mediaUrl: this.data.mediaUrl
    };

    wx.switchTab({
      url: '/pages/picenter/picenter',
      success: function () {
        console.log('SwitchTab successful');
      },
      fail: function (err) {
        console.error('SwitchTab failed', err);
      }
    });
  },

  // 新增的加载数据函数
  loadData: function () {
    // 这里可以重新加载数据的逻辑
    console.log('Reloading data for upload page...');
    // Your data loading logic here
  }
});
