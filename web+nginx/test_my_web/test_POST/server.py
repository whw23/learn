import json
import os
import time

from flask import Flask, request

# put your api key in os.environ

your_api_key = os.environ.get('API_KEY')

app = Flask(__name__)
@app.route('/register_device', methods=['POST'])
def register_device():
    # check if the api key is correct
    headers = request.headers
    if headers.get('api-key') != your_api_key:
        return 'invalid api key', 401
    # save the device id to a file
    device_id = headers.get('device-id')
    device_connection_string = headers.get('device-connection-string')
    print(device_id)
    print(device_connection_string)
    
    # 判断是否存在device_list.json文件，如果不存在则创建一个空的device_list.json文件
    if not os.path.exists('device_list.json'):
        device_list = {}
    else:
        with open('device_list.json', 'r') as f:
            device_list = json.load(f)
    device_info = {}
    device_info['CONNECTION_STRING'] = device_connection_string
    device_list[device_id] = device_info
    with open('device_list.json', 'w') as f:
        json.dump(device_list, f)
    return 'ok'


@app.route('/post_data', methods=['POST'])
def post_data():
    headers = request.headers
    # check if the api key is correct
    if headers.get('api-key') != your_api_key:
        return 'invalid api key', 401
    print(headers,'\n')
    
    # get the data from the request
    data = request.data.decode('utf-8')
    print(data,'\n')
    return 'post data success', 200

if __name__ == '__main__':
    app.run(host='localhost', port=5000)  