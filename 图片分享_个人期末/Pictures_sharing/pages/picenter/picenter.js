Page({
  data: {
    name: '', // 相册名称
    desc: '', // 相册描述
    cover: '', // 相册封面图片路径
    images: [] // 图片列表
  },

  // 页面显示时触发
  onShow: function () {
    const app = getApp();
    const albumData = app.globalData.albumData || {}; // 获取相册数据
    const uploadData = app.globalData.uploadData || {}; // 获取上传数据

    console.log('albumData:', albumData);
    console.log('uploadData:', uploadData);

    // 更新页面数据
    this.setData({
      name: albumData.name,
      desc: albumData.desc,
      cover: albumData.cover,
      images: app.globalData.images // 更新图片列表数据
    });

    // 如果有新上传的图片，则添加到图片列表中
    if (uploadData.mediaUrl) {
      const newImage = {
        url: uploadData.mediaUrl,
        date: uploadData.date,
        desc: uploadData.desc
      };
      console.log('Adding new image:', newImage);

      // 更新图片列表数据
      const updatedImages = [...this.data.images, newImage];
      this.setData({
        images: updatedImages
      });

      // 更新全局图片列表数据
      app.globalData.images = [...app.globalData.images, newImage];

      // 清空上传数据，避免重复添加
      app.globalData.uploadData = {};
    }

    console.log('Final images data:', this.data.images);
    
    // 更新页面数据
    this.setData({
      images: app.globalData.images
    });
  },

  // 删除图片
  deleteImage: function (e) {
    const index = e.currentTarget.dataset.index;
    const app = getApp();
    app.globalData.images.splice(index, 1); // 从全局图片列表中删除
    this.setData({
      images: app.globalData.images // 更新页面图片列表数据
    });
  },

  // 跳转到上传页面
  goToUploadPage: function () {
    wx.switchTab({
      url: '/pages/upload/upload'
    });
  }
});
