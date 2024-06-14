// pages/termList/termList.js
Page({
  data: {
    dataList: [], // 数据列表
    showLoading: true, // 是否显示加载动画
    category: '' // 接收传递过来的category参数
  },

  onLoad: function (options) {
    // 获取传递过来的category参数
    let category = options.category || ''; // 使用空字符串作为默认值
    this.setData({
      category: category
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

        // 检查是否有数据返回
        if (data && data.questionnaires && data.questionnaires.length > 0) {
          // 根据category筛选数据
          let filteredData = data.questionnaires.filter(item => item.category === that.data.category);
          console.log("Filtered data:", filteredData); // 检查筛选后的数据
          
          // 设置数据列表
          that.setData({
            dataList: filteredData,
            showLoading: false // 关闭加载动画
          });
        } else {
          console.log("No data received or empty data array.");
          // 处理没有数据的情况
          that.setData({
            showLoading: false // 关闭加载动画
          });
        }
      },
      fail: function (error) {
        console.error("Failed to load data: ", error);
        // 在失败情况下可以进行错误处理
        that.setData({
          showLoading: false // 关闭加载动画
        });
      }
    });
  }
});
