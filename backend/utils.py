# -*- coding: utf-8 -*-
''' 计算机信息收集 '''

import psutil
import os
import datetime
import time
import socket
import platform
try:
    import wmi
except ImportError:
    os.system('pip install wmi')
    import wmi
# 所有的功能尽量找到
# pp([
#     p.info for p in psutil.process_iter(
#         attrs=[
#             'pid',  # pid
#             'name', # 进程名
#             'username', # 哪个用户下面运行的进程
#             'ppid', # 父进程的pid
#             'exe', # 进程运行命令的绝对路径
#             'create_time', # 进程创建时间
#             'status', # 进程当前运行状态
#             'cwd', # 进程运行的所在目录
#             'num_threads', # 进程使用的线程数
#             'cpu_percent', # 以百分比形式返回表示进程CPU利用率的浮点数
#             'memory_info', # 以字节为单位返回表示RSS（驻留集大小）和VMS（虚拟内存大小）的元组
#             'memory_percent', #比较物理系统内存以处理驻留内存（RSS）并以百分比计算进程内存利用率。
#             'cpu_times'  #返回一个元组，其值为进程CPU用户和系统时间，表示进程在用户/系统模式下花费的秒数
#         ]
#     )
# ])
# 进程
def my_process():
    ls = []
    for p in psutil.process_iter():
        try:
            name = p.name()
            if len(p.name()) > 18:
                name = p.name()[0:18] + '....'
            dic = {
                'name': name,#进程名
                'pid': p.pid,#进程pid
                'create_time': time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(p.create_time())),#进程创建时间
                'cpu_percent': round(p.cpu_percent() * (psutil.cpu_percent() / 100), 1),
                'memory_percent': int((p.memory_percent())*100),#内存占用率
                'cwd': p.cwd(), #获取地址
                'username': p.username()
            }
            ls.append(dic)
        except Exception as e:
            pass
    return ls

# 网络
def my_network():
    ls = []
    # for p in psutil.process_iter():
    try:
        dic = {
            # 'name': p.name(),#进程名称
            'bytes_sent': int(psutil.net_io_counters().bytes_sent/1024), #网卡上传总流量
            'bytes_rcvd': int(psutil.net_io_counters().bytes_recv/1024), #网卡下载总流量
            'packets_recv': int(psutil.net_io_counters().packets_recv/1024) #包的流量
        }
        ls.append(dic)
    except Exception as e:
        pass
    return ls

# 端口
def my_port():
    lst2 = []
    ip = socket.gethostbyname(socket.gethostname())
    for conn in psutil.net_connections(kind ='inet'):
        try:
            proc = psutil.Process(pid=conn.pid)
            if bool(conn.raddr):
                rip, rport = conn.raddr
            else:
                rip = rport = ''
            IP = ip + '({})'.format(conn.laddr[0])
            if len(IP) > 18:
                IP = IP[0:18] + '...'
            dic ={
                'name': proc.name(),#进程名称
                'IP': IP, #IP
                'port': conn.laddr[-1], #端口号
                'yIP': rip, #远程IP
                'yport': rport,#远程端口号
                'status': conn.status #状态
            }
            lst2.append(dic)
        except Exception as e:
            pass
    return lst2

# 消耗
def my_consumption():
    # CPU使用率
    cpu = int(psutil.cpu_percent(1))
    # 物理内存使用率
    memory = int(psutil.virtual_memory().total - psutil.virtual_memory().free) / float(psutil.virtual_memory().total)
    # 剩余物理内存
    free = round(psutil.virtual_memory().free / (1024.0 * 1024.0 * 1024.0), 2)
    # 物理内存
    total = round(psutil.virtual_memory().total / (1024.0 * 1024.0 * 1024.0), 2)
    # 已使用
    yishiy = round(total - free, 2)
    # 适配器名称
    name = None
    for i in psutil.net_if_addrs().keys():
        name = i
        break

    net = psutil.net_io_counters()
    # 网卡接收流量
    bytes_rcvd = '{0:.2f} MB'.format(net.bytes_sent / 1024 / 1024)
    # 网卡发送流量
    bytes_sent = '{0:.2f} MB'.format(net.bytes_recv / 1024 / 1024)
    # 操作系统
    sysname = platform.system()
    # 网络名称
    webname = platform.node()
    # 开机时间
    stearttime = datetime.datetime.fromtimestamp(psutil.boot_time()).strftime("%Y-%m-%d %H:%M:%S")

    params = {
        'cpu': cpu,   # CPU使用率
        'memory': int(memory * 100),    # 物理内存使用率
        'wangluoshiyong': wangluoshiyong(),   # 网络使用率
        'free': free,    # 剩余物理内存
        'total': total,     # 物理内存
        'yishiy': yishiy,         # 已使用的物理内存
        'name': name,    # 适配器名称
        'bytes_rcvd': bytes_rcvd,    # 网卡接收流量
        'bytes_sent': bytes_sent,     # 网卡发送流量
        'sysname': sysname,     # 操作系统
        'webname': webname,     # 网络名称
        'stearttime': stearttime        # 开机时间
    }
    # return render_template('sysinfo.html', **params)
    return params



# 网络使用率
def wangluoshiyong():
    def __check_speeds():
        rs = {}
        for net_name,stats in psutil.net_if_stats().items():
            if type(stats) is tuple or not stats.isup:
                continue
            rs[net_name] = stats.speed
        return rs
    def __snapshoot():
        rs = {}
        for net_name,stats in psutil.net_io_counters(pernic=True).items():
            rs[net_name] = stats.bytes_recv
        return rs
     
    nets = __check_speeds()
    while True:
        snap_prev = __snapshoot()
        time.sleep(1)
        snap_now = __snapshoot()
        name_list = []
        for net_name,speed in nets.items():
            recv_prev = snap_prev[net_name]
            recv_now = snap_now[net_name]
            rate = (recv_now-recv_prev)/(speed*1024*1024/8.)
            return '%.2f%%' % (rate*100)

# 磁盘
def my_disk():
    ls = []
    io = psutil.disk_partitions()
    for i in io:
        try:
            o = psutil.disk_usage(i.device)
            total = round(o[0] / (1024.0 * 1024.0 * 1024.0), 2)  # 总量
            free = round(o[2] / (1024.0 * 1024.0 * 1024.0), 2)
            dic = {
                'attr': i[0][:-1],
                'total': total,
                'free': free,
                'percent': o[3]
            }
            ls.append(dic)
        except Exception as e:
            pass
    return ls


def get_file_type(file_name):
    '''后缀名预测'''
    import mimetypes
    mimetypes.init()
    mime = mimetypes.guess_type(file_name)[0]
    if not mime is None:
        pass

# 遍历磁盘
def traverse_disk(path):
    ls = [[],[]]
    try:
        content = os.listdir(r'{0}'.format(path))
    except Exception as e:
        return ''
    for i in content:
        list_path = '{0}{1}'.format(path, i)
        if os.path.isdir(r'{0}'.format(list_path)):
            dic = {
                'dir_name': i,
                'dir_time': time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(os.path.getmtime(list_path))),
                'path': list_path.replace(os.sep, '/')
            }
            ls[0].append(dic)
        else:
            dic = {
                'dir_name': i,
                'dir_time': time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(os.path.getmtime(list_path))),
                'size': os.path.getsize(list_path),
                'type': os.path.splitext(list_path)[-1]
            }
            ls[1].append(dic)
    return ls




# 本机信息
def my_information():
    try:
        dic = {
            'version': ['操作系统的版本号', platform.version()],#获取操作系统的版本号
            'architecture': ['操作系统的位数', platform.architecture()],#获取操作系统的位数
            'machine': ['计算机的类型', platform.machine()],#获取计算机的类型
            'node': ['计算机的网络名称', platform.node()],#计算机的网络名称
            'processor': ['处理器信息', platform.processor()],#计算机的处理器信息
            'system': ['操作系统的类型', platform.system()], #获取操作系统的类型 
            'name': ['计算机名', socket.getfqdn()], #计算机名
            'boot_time': ['开机时间', time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(psutil.boot_time()))],#开机时间
            'total': ['内存', int(psutil.virtual_memory().total/1024/1024)]#内存MB为单位
        }
    except Exception as e:
        pass
    return dic

