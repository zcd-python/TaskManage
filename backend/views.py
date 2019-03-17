# -*- coding: utf-8 -*-
from flask import (
    render_template, render_template_string, request
)

from . import utils
from . import app
import json 
import os
import collections
import psutil, time

REMOTE_HOST = "https://pyecharts.github.io/assets/js"

@app.route('/')
def view_index():
    return render_template('index.html')

# 遍历磁盘
@app.route('/traverse_disk')
def view_traverse_disk():
    path = request.values.get('dir_path', None)
    path = path.replace('/', str(os.sep))
    ls = utils.traverse_disk(path)
    return json.dumps(ls, ensure_ascii=False)

# 磁盘
@app.route('/disk')
def view_disk():
    ls = utils.my_disk()
    return json.dumps(ls, ensure_ascii=False)

# 进程
@app.route('/process')
def view_process():
    name = str(request.values.get('name', 'name'))
    reverse = bool(int(request.values.get('reverse', 0)) % 2)
    try:
        ls = sorted(utils.my_process(), key=lambda item: item[name], reverse=reverse)
    except Exception as e:
        name = 'name'
        ls = sorted(utils.my_process(), key=lambda item: item[name], reverse=reverse)
    return json.dumps(ls, ensure_ascii=False)

# 网络
@app.route('/network')
def view_network():
    ls = utils.my_network()
    return json.dumps(ls, ensure_ascii=False)

# 端口
@app.route('/port')
def view_port():
    name = str(request.values.get('name', 'name'))
    reverse = bool(int(request.values.get('reverse', 0)) % 2)
    try:
        ls = sorted(utils.my_port(), key=lambda item: item[name], reverse=reverse)
    except Exception as e:
        name = 'name'
        ls = sorted(utils.my_port(), key=lambda item: item[name], reverse=reverse)
    return json.dumps(ls ,ensure_ascii=False)

# 消耗
@app.route('/consumption')
def view_consumption():
    ls = utils.my_consumption()
    return json.dumps(ls ,ensure_ascii=False)

# 本机信息
@app.route('/information')
def view_information():
    ls = utils.my_information()
    return json.dumps(ls, ensure_ascii=False)

# 杀死进程
@app.route('/delete_process')
def view_delete_process():
    process_id = int(request.values.get('id', None))
    try:
        os.kill(process_id, 9)
    except Exception as e:
        return '进程受保护，不能结束！'
    return ''
print
# 关键字搜索
@app.route('/keyword')
def view_keyword():
    path = r'{0}'.format(request.values.get('path', None))
    path = path.replace('/', str(os.sep))
    word = request.values.get('word', None)
    num = int(request.values.get('num', 0))
    ls = [[], [], 0]
    i = 0
    for (root, dirs, files) in os.walk(path):
        i += 1
        if i > num:
            for _dir in dirs:
                if word in _dir:
                    dic = {
                    'name': _dir
                    }
                    ls[0].append(dic)
            for _file in files:
                if word in _file:
                    dic = {
                    'name': _file
                    }
                    ls[1].append(dic)
        ls[2] = i
        if len(ls[0]) > 0 or len(ls[1]) > 0:
            return json.dumps(ls, ensure_ascii=False)
    else:
        ls = []
    return json.dumps(ls, ensure_ascii=False)

# ls = [[],[]]
#     content = os.listdir(r'{0}'.format(path))
#     for i in content:
#         path = '{0}{1}'.format(path, i)
#         if os.path.isdir(r'{0}'.format(list_path)):
#             dic = {
#                 'name': i,
#                 'time': time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(os.path.getmtime(list_path))),
#                 'path': list_path
#             }
#             ls[0].append(dic)
#         else:
#             dic = {
#                 'name': i,
#                 'time': time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(os.path.getmtime(list_path))),
#                 'size': os.path.getsize(list_path),
#                 'type': os.path.splitext(list_path)[-1]
#             }
#             ls[1].append(dic)
#     return ls




''' 图形界面样板 '''
# @app.route("/aaa")
# def hello():
#     s3d = scatter3d()
#     return render_template(
#         "index.html",
#         myechart=s3d.render_embed(),
#         host=REMOTE_HOST,
#         script_list=s3d.get_js_dependencies(),
#     )
# def scatter3d():
#     from pyecharts import Bar
#     attr = ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
#     v1 = [5, 20, 36, 10, 75, 90]
#     v2 = [10, 25, 8, 60, 20, 80]
#     bar = Bar("柱状图数据堆叠示例")
#     bar.add("商家A", attr, v1, is_stack=True)
#     bar.add("商家B", attr, v2, is_stack=True)
#     bar.render()
#     return bar

