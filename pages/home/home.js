Page({
  data: {
    albumName: '', // 相册名称
    albumDesc: '', // 相册描述
    albumCover: '' // 存储上传的相册封面图片路径
  },

  // 上传相册封面图片
  uploadCover: function () {
    wx.chooseImage({
      count: 1,
      success: (res) => {
        this.setData({
          albumCover: res.tempFilePaths[0] // 设置相册封面图片路径
        });
      }
    });
  },

  // 输入相册名称
  inputAlbumName: function (e) {
    this.setData({
      albumName: e.detail.value
    });
  },

  // 输入相册描述
  inputAlbumDesc: function (e) {
    this.setData({
      albumDesc: e.detail.value
    });
  },

  // 创建相册
  createAlbum: function () {
    const app = getApp();
    app.globalData.albumData = {
      name: this.data.albumName,
      desc: this.data.albumDesc,
      cover: this.data.albumCover
    };
    wx.switchTab({
      url: '/pages/picenter/picenter'
    });
  }
});
