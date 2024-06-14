import os
import json
from flask import Flask, jsonify

app = Flask(__name__)

# 获取当前文件所在目录的绝对路径
current_dir = os.path.dirname(os.path.abspath(__file__))

# 读取 data.json 文件的数据
def read_data():
    try:
        with open(os.path.join(current_dir, 'data.json'), 'r', encoding='utf-8') as f:
            data = json.load(f)
        return data
    except Exception as e:
        print("Failed to read data.json:", e)
        return None

# 获取问卷数据
@app.route('/questionnaires', methods=['GET'])
def get_questionnaires():
    data = read_data()
    if data:
        return jsonify(data)
    else:
        return jsonify({'error': 'Failed to read data.json'})

if __name__ == '__main__':
    app.run(host='localhost', port=8008)
