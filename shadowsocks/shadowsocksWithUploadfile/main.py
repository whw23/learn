from flask import Flask, request, jsonify, send_from_directory
import requests
import os
import uuid
import mimetypes
import re
from urllib.parse import urlparse, unquote

app = Flask(__name__)

# 设置存储文件的文件夹路径
UPLOAD_FOLDER = '/app/static/uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# 静态文件访问配置
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# API 密钥配置
API_KEY = '********'  # 请替换为您的 API 密钥

@app.route('/upload_file', methods=['POST'])
def upload_file():  # 修改函数名为 upload_file
    # 获取请求头中的 API 密钥
    api_key = request.headers.get('api-key')

    # 检查 API 密钥是否正确
    if api_key != API_KEY:
        return jsonify({"error": "Unauthorized, invalid API key"}), 403

    # 获取传入的文件 URL
    input_file_url = request.json.get('input_file_url')

    if not input_file_url:
        return jsonify({"error": "No file URL provided"}), 400

    try:
        # 从 URL 下载文件
        response = requests.get(input_file_url)
        response.raise_for_status()  # 如果请求失败则抛出异常

        # 获取文件的原始格式
        content_type = response.headers.get('Content-Type')
        content_disposition = response.headers.get('Content-Disposition')

        extension = 'bin'  # 默认扩展名

        if content_disposition:
            # 使用正则表达式从 Content-Disposition 获取文件名
            filename_match = re.findall('filename="?([^"]+)"?', content_disposition)
            if filename_match:
                filename = filename_match[0]
                extension = os.path.splitext(filename)[-1].lstrip('.')
        if extension == 'bin' and content_type:
            # 使用 mimetypes 根据 Content-Type 获取扩展名
            guessed_extension = mimetypes.guess_extension(content_type)
            if guessed_extension:
                extension = guessed_extension.lstrip('.')
        if extension == 'bin':
            # 从 URL 获取扩展名
            parsed_url = urlparse(input_file_url)
            path = unquote(parsed_url.path)
            extension = os.path.splitext(path)[-1].lstrip('.')
            if not extension:
                extension = 'bin'

        # 获取传入的文件名
        input_filename = request.json.get('filename')
        if input_filename:
            filename = input_filename + '.' + extension
        else:
            # 生成一个唯一的文件名
            filename = str(uuid.uuid4()) + '.' + extension
            
        file_path = os.path.join(UPLOAD_FOLDER, filename)

        # 将文件保存到本地
        with open(file_path, 'wb') as f:
            f.write(response.content)

        # 返回文件的访问 URL
        file_access_url = f"{request.scheme}://{request.host}/uploads/{filename}"
        return jsonify({"file_url": file_access_url})  # 修改键为 file_url

    except requests.exceptions.RequestException as e:
        return jsonify({"error": f"Failed to download file: {str(e)}"}), 500

# 处理静态文件的请求
@app.route('/uploads/<filename>')  # 保持路由不变
def serve_image(filename):  # 可以考虑重命名为 serve_file
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=443, debug=True, ssl_context=('/etc/letsencrypt/live/sswithuploadfile.e8a7eggzemerevby.westus2.azurecontainer.io/fullchain.pem', '/etc/letsencrypt/live/sswithuploadfile.e8a7eggzemerevby.westus2.azurecontainer.io/privkey.pem'))

