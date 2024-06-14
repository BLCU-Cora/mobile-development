App({
  onLaunch: function () {
    const fs = wx.getFileSystemManager();
    const DATA_JSON_PATH = 'utils/data.json';
    const USER_FILE_PATH = `${wx.env.USER_DATA_PATH}/data.json`;

    fs.access({
      path: USER_FILE_PATH,
      success() {
        console.log('data.json 已存在');
      },
      fail() {
        console.log('data.json 不存在，开始写入');
        fs.readFile({
          filePath: DATA_JSON_PATH,
          success(res) {
            fs.writeFile({
              filePath: USER_FILE_PATH,
              data: res.data,
              success() {
                console.log('data.json 文件写入成功');
              },
              fail(err) {
                console.error('data.json 文件写入失败：', err);
              }
            });
          },
          fail(err) {
            console.error('读取 data.json 文件失败：', err);
          }
        });
      }
    });
  }
});
