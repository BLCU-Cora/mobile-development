// pages/termList/termList.js
Page({
  data: {
    dataList: [], // 数据列表
    showLoading: true // 是否显示加载动画
  },

  onLoad: function () {
    // 页面加载时触发，读取数据
    this.loadData();
  },

  // 读取数据
  loadData: function () {
    let that = this;

    // 发起网络请求读取后台接口数据
    wx.request({
      url: 'http://localhost:8008/questionnaires', // 后台接口地址
      method: "GET",
      success: function (res) {
        let data = res.data;
        console.log("Received data:", data); // 打印接收到的数据
        if (Array.isArray(data.questionnaires) && data.questionnaires.length > 0) { // 检查是否有数据返回
          that.setData({
            dataList: data.questionnaires, // 设置数据列表
            showLoading: false // 关闭加载动画
          });
        }
      },
      fail: function (error) {
        console.error("Failed to load data: ", error);
        // 在失败情况下可以进行错误处理
      }
    });
  },

  // 下拉刷新
  onPullDownRefresh: function () {
    this.setData({
      dataList: [], // 清空数据列表
      showLoading: true // 显示加载动画
    });
    this.loadData(); // 重新加载数据
    wx.stopPullDownRefresh(); // 停止下拉刷新
  }
});
