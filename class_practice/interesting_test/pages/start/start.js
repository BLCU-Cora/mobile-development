// pages/start/start.js
Page({
  data: {
    name: '',
    description: '',
    showLoading: true
  },

  onLoad: function (options) {
    // 获取传递过来的name参数
    let name = options.name;
    this.setData({
      name: name
    });
    // 页面加载时触发，读取数据
    this.loadData();
  },

  // 读取数据
  loadData: function () {
    let that = this;

    // 模拟请求数据
    wx.request({
      url: 'http://localhost:8008/questionnaires',
      method: "GET",
      success: function (res) {
        let data = res.data;
        console.log("Received data:", data); // 打印接收到的数据
        if (Array.isArray(data.questionnaires) && data.questionnaires.length > 0) { // 检查是否有数据返回
          // 根据name查找description
          let item = data.questionnaires.find(item => item.name === that.data.name);
          if (item) {
            that.setData({
              description: item.description, // 设置description
              showLoading: false // 关闭加载动画
            });
          }
        }
      },
      fail: function (error) {
        console.error("Failed to load data: ", error);
        // 在失败情况下可以进行错误处理
      }
    });
  }
});
