// 资源消耗加载
function cpu_shiylv(data){
    $div = $('#max-div')
    $div.empty()
    ls = [
        '<div class="div-cpu" id="cpu-shiylv">',
            '<table style="border: 0px solid red;">',
                '<tr class="tr-1">',
                    '<td>',
                        '<span class="cpu_1"><font size="5" face="幼圆"><b>CPU使用率:</b></font></span>',
                        '<span class="cpu_2_1"><font size="7" face="BankGothic Md BT"><b>', data['cpu'] ,'%</b></font></span>',
                    '</td>',
                    '<td rowspan="2">',
                    '<div class="cpu am-progress am-progress-striped am-progress am-active div-backcolor">',
                        '<div style="width: 100%;height:', data['cpu'] ,'%;position: absolute;bottom: 0;" class="am-progress-bar am-progress-bar-secondary"></div>',
                    '</div>',
                '</td>',
                '</tr>',
                '<tr>',
                    '<td>',
                        '<div class="nei-div">',
                            '操作系统<span class="nei-spa">', data['sysname'],'</span> <br /><br />',
                            '网络名称<span class="nei-spa">', data['webname'], '</span> <br /><br />',
                            '开机时间<span class="nei-spa-time">', data['stearttime'], '</span> <br /><br />',
                        '</div>',
                    '</td>',
                '</tr>',
            '</table>',
        '</div>',

        '<div class="div-cpu">',
            '<table style="border: 0px solid red;">',
                '<tr class="tr-1">',
                    '<td>',
                        '<span class="cpu_1"><font size="5" face="幼圆"><b>内存使用率:</b></font></span>',
                        '<span class="cpu_2"><font size="7" face="BankGothic Md BT"><b>', data['memory'], '%</b></font></span>',
                    '</td>',
                    '<td rowspan="2">',
                    '<div class="cpu am-progress am-progress-striped am-progress am-active div-backcolor">',
                        '<div style="width: 100%;height:', data['memory'], '%;position: absolute;bottom: 0;" class="am-progress-bar am-progress-bar-secondary"></div>',
                    '</div>',
                '</td>',
                '</tr>',
                '<tr>',
                    '<td>',
                        '<div class="nei-div">',
                            '总内存<span class="nei-spa">', data['total'], ' GB</span> <br /><br />',
                            '已使用<span class="nei-spa">', data['yishiy'], ' GB</span> <br /><br />',
                            '可使用<span class="nei-spa">', data['free'], ' GB</span> <br /><br />',
                        '</div>',
                    '</td>',
                '</tr>',
            '</table>',
        '</div>',

        '<div class="div-right">',
            '<table style="border: 0px solid red;">',
                '<tr class="tr-1">',
                    '<td>',
                        '<span class="cpu_1"><font size="5" face="幼圆"><b>网络使用率:</b></font></span>',
                        '<span class="cpu_2"><font size="7" face="BankGothic Md BT"><b>', data['wangluoshiyong'], '</b></font></span>',
                    '</td>',
                    '<td rowspan="2">',
                    '<div class="cpu am-progress am-progress-striped am-progress am-active div-backcolor">',
                        '<div style="width: 100%;height: ', data['wangluoshiyong'], ';position: absolute;bottom: 0;" class="am-progress-bar am-progress-bar-secondary"></div>',
                    '</div>',
                '</td>',
                '</tr>',
                '<tr>',
                    '<td>',
                        '<div class="nei-div">',
                            '接收流量<span class="nei-spa">', data['bytes_rcvd'], '</span> <br /><br />',
                            '发送流量<span class="nei-spa">', data['bytes_sent'], '</span> <br /><br />',
                            '适配器名称<span class="nei-spa-only">', data['name'], '</span> <br /><br />',
                        '</div>',
                    '</td>',
                '</tr>',
            '</table>',
        '</div>'
    ].join('')
    $div.append(ls)
}
// 端口数据加载
function port_data(data){
    $tbody = $('#port_data').find('tbody')
    $tbody.empty()
    for(var i = 0; i < data.length; i++){
        var item = data[i]
        ls = [
            '<tr>',
                '<td style="width:28%;">',
                    item['name'],
                '</td>',
                '<td style="width:23.3%;">',
                    item['IP'],
                '</td>',
                '<td style="width:10.2%;">',
                    item['port'],
                '</td>',
                '<td style="width:14.7%;">',
                    item['yIP'],
                '</td>',
                '<td style="width:11.3%;">',
                    item['yport'],
                '</td>',
                '<td style="width:0%;">',
                    item['status'],
                '</td>',
            '</tr>'
        ].join('')
        $tbody.append(ls)
    }
}
// 网络数据加载
function network_data(data){
    $tbody = $('#network_data').find('tbody')
    $tbody.empty()
    for(var i = 0; i < data.length; i++){
        var item = data[i]
        ls = [
            '<tr>',
                '<td>',
                    item['name'],
                '</td>',
                '<td>',
                    item['bytes_sent'],
                '</td>',
                '<td>',
                    item['bytes_rcvd'],
                '</td>',
                '<td>',
                    item['packets_recv'],
                '</td>',
                '<td>',
                    item['username'],
                '</td>',
            '</tr>'
        ].join('')
        $tbody.append(ls)
    }
}
// 进程数据加载
function process_data(data){
    $tbody = $('#process_data').find('tbody')
    $tbody.empty()
    for(var i = 0; i < data.length; i++){
        var item = data[i]
        ls = [
            '<tr id="', item['pid'], '" name="', item['name'], '">',
                '<td style="width:30%;">',
                    item['name'],
                '</td>',
                '<td style="width:10.2%;">',
                    item['pid'],
                '</td>',
                '<td style="width:10.2%;">',
                    item['cpu_percent'] + ' %',
                '</td>',
                '<td style="width:11.5%;">',
                    item['memory_percent'] + ' k',
                '</td>',
                '<td style="width:18.5%;">',
                    item['username'],
                '</td>',
                '<td style="width:0%;">',
                    item['create_time'],
                '</td>',
            '</tr>'
        ].join('')
        $tbody.append(ls)
    }
}
// 磁盘数据加载
function disk_data(data){
    $tbody = $('#disk_data').find('tbody')
    $tbody.empty()
    for(var i = 0; i < data.length; i++){
        var item = data[i]
        ls = [
            '<tr>',
                '<td>',
                    item['attr'],
                '盘</td>',
                '<td id="', item['attr'],'" style="width: 20em;">',
                    '<div style="margin-top: 1.5em;" class="am-progress am-progress-striped am-progress-sm am-active ">',
                    '<div class="am-progress-bar am-progress-bar-secondary"  style="width: ', item['percent'],'%"></div>',
                    '</div>',
                '</td>',
                '<td>&nbsp;&nbsp;&nbsp;&nbsp;可用',
                     item['free'], 'G&nbsp;&nbsp;&nbsp;&nbsp;共', item['total'],
                'G</td>',
            '</tr>'
        ].join('')
        $tbody.append(ls)
    }
}
// 遍历磁盘内容
function traverse_disk_data(data){
    $tbody = $('#disk_data').find('tbody')
    $tbody.empty()
    for(var i = 0; i < data[0].length; i++){
        item = data[0][i]
        ls = [
            '<tr>',
                '<td style="width: 40%;" id="', item['path'], '" >',
                '<span style="color: #FFA500" class="am-icon-folder am-icon-sm"></span>&nbsp;',
                    '<a href="javascript:;">',
                        item['dir_name'],
                    '</a>',
                '</td>',
                '<td style="width: 10%;">文件夹</td>',
                '<td style="width: 20%;">',
                    item['dir_time'],
                '</td>',
                '<td style="width: 20%;">',
                '</td>',
            '</tr>'
        ].join('')
        $tbody.append(ls)
    }
    for(var i = 0; i < data[1].length; i++){
        item = data[1][i]
        ls = [
            '<tr>',
                '<td>',
                '<span class="am-icon-file"></span>&nbsp;',
                    item['dir_name'],
                '</td>',
                '<td>', item['type'],'</td>',
                '<td>',
                    item['dir_time'],
                '</td>',
                '<td>',
                    item['size'],
                '</td>',
            '</tr>'
        ].join('')
        $tbody.append(ls)
    }
}
// 请求后端数据
function list_data(name, args){
    var path = undefined

    switch(name){
        case "network":
            path = GLOBLE.NETWORK
            break
        case "process":
            path = GLOBLE.PROCESS
            break
        case "port":
            path = GLOBLE.PORT
            break
        case "consumption":
            path = GLOBLE.CONSUMPTION
            break
    }

    $.ajax({
        url: path,
        data: args,
        dataType: 'json',
        success: function(data){
            switch(name){
                case "process":
                    process_data(data)
                    break
                case "network":
                    network_data(data)
                    break
                case "port":
                    port_data(data)
                    break
                case "consumption":
                    cpu_shiylv(data)
                    break
            }
        }
    })
}
// 杀死进程
function delete_process(process_id){
    var _data = {}
    _data['id'] = process_id
    $.ajax({
        url: GLOBLE.DELETE_PROCESS,
        data: _data,
        success: function(data){
            if(data != ''){
                alert(data)
            }
        }
    })
}
// 关键字遍历磁盘内容
function traverse_disk_key_data(data){
    $tbody = $('#disk_data').find('tbody')
    for(var i = 0; i < data[0].length; i++){
        item = data[0][i]
        ls = [
            '<tr>',
                '<td style="width: 40%;" id="', item['path'], '" >',
                '<span style="color: #FFA500" class="am-icon-folder am-icon-sm"></span>&nbsp;',
                    '<a href="javascript:;">',
                        item['name'],
                    '</a>',
                '</td>',
                '<td style="width: 10%;">文件夹</td>',
                '<td style="width: 20%;">',
                    item['time'],
                '</td>',
                '<td style="width: 20%;">',
                '</td>',
            '</tr>'
        ].join('')
        $tbody.append(ls)
    }
    for(var i = 0; i < data[1].length; i++){
        item = data[1][i]
        ls = [
            '<tr>',
                '<td>',
                '<span class="am-icon-file"></span>&nbsp;',
                    item['name'],
                '</td>',
                '<td>', item['type'],'</td>',
                '<td>',
                    item['time'],
                '</td>',
                '<td>',
                    item['size'],
                '</td>',
            '</tr>'
        ].join('')
        $tbody.append(ls)
    }
}
// 面包屑导航
function render_disk_data(path){
    var $breadcrumb = $('.path-line .am-breadcrumb')
    $breadcrumb.empty()
    var li = []
    var path_arr = []
    var li_path = ''
    if(path == '' || path == undefined || path == '/' || path == null){
        $breadcrumb.append(
            '<li><i class="am-icon-home"></i>计算机</li>'
        )
        return;
    }
    else{
        path.replace(/\//g, function(__){
            var sub_path = arguments[2].substr(0, arguments[1])
            path_arr.push(sub_path)
        });
        path_arr.push(path)
    }
    $breadcrumb.append(
        '<li path=""><a href="javascript:;"><i class="am-icon-home"></i>计算机</a></li>'
    )
    for(var i = 0; i < path_arr.length; i++){
        var path_index = path_arr[i].lastIndexOf('/');
        var path_name = path_arr[i].substr(path_index + 1);
        li_path += path_name + '/'
        if(i == path_arr.length - 2) {
            li = [
                '<li no_path="', li_path,'" >',
                    path_name,
                '</li>'
            ];
        }
        else {
            li = [
                '<li path="', li_path,'" >',
                    '<a href="javascript:;">',
                        path_name,
                    '</a>',
                '</li>'
            ];
        }
        // 把构造的html源码添加到页面上
        var $li = $(li.join(''));
        if(path_arr[i] == '') {
            path_arr[i] = '/';
        }
        // 额外添加一个属性，用于记录目录跳转目标路径
        $li.find('a').attr('data-path', path_arr[i]);
        $breadcrumb.append($li);
    }
}
// 计算机信息加载
function information_data(data){
    $tbody = $('#information_data').find('tbody')
    $tbody.empty()
    ls = [
        '<tr><td>', data['version'][0],'</td><td>', data['version'][1],'</td></tr>',
        '<tr><td>', data['architecture'][0],'</td><td>', data['architecture'][1],'</td></tr>',
        '<tr><td>', data['system'][0],'</td><td>', data['system'][1],'</td></tr>',
        '<tr><td>', data['processor'][0],'</td><td>', data['processor'][1],'</td></tr>',
        '<tr><td>', data['total'][0],'</td><td>', data['total'][1],'&nbsp;MB</td></tr>',
        '<tr><td>', data['machine'][0],'</td><td>', data['machine'][1],'</td></tr>',
        '<tr><td>', data['node'][0],'</td><td>', data['node'][1],'</td></tr>',
        '<tr><td>', data['name'][0],'</td><td>', data['name'][1],'</td></tr>',
        '<tr><td>', data['boot_time'][0],'</td><td>', data['boot_time'][1],'</td></tr>',
    ].join('')
    $tbody.append(ls)
}


$(document).ready(function(){
    // 排序名字
    var sorted_name = 'name'
    // 升序降序
    var reverse = 0
    // 发送数据
    var args = {}
    // 发送数据
    var _data = {}
    // 关键字查询地址
    no_path = ''
    // 加载进程
    $.ajax({
        url: GLOBLE.PROCESS,
        dataType: 'json',
        success: function(data){
            process_data(data)
        }
    })
    // 加载网络
    $.ajax({
        url: GLOBLE.NETWORK,
        dataType: 'json',
        success: function(data){
            network_data(data)
        }
    })
    // 加载端口
    $.ajax({
        url: GLOBLE.PORT,
        dataType: 'json',
        success: function(data){
            port_data(data)
        }
    })
    // 获取排序数据
    $an = $('th[id]')
    $an.on('click', function(){
        sorted_name = $(this).attr('id')
        reverse += 1
        args = {
            'name': sorted_name,
            'reverse': reverse
        }
    })
    // 无限刷新
    setInterval(function(){

        if($('#task').attr('class') == 'am-active'){

            name = $('li[name][class="am-active"]').attr('name')
            list_data(name, args)
        }
        else if($('#resource').attr('class') == 'am-active'){
            name = $('li[name="consumption"][class="am-active"]').attr('name')
            if(name == "consumption"){
                list_data(name, args)
            }
        }
    },1000);
    // 鼠标悬停离开
    $('thead th').hover(function(){
        $(this).css("background-color","gray");
    },function(){
        $(this).css("background-color","black");
    });
    // 杀死进程
    $('#process_data').on('mousedown' ,'tr[id]',function(e){
        var process_id = $(this).attr('id')
        var process_name = $(this).attr('name')
        if(e.which == 3){
            var r=confirm('删除：\n        '+process_name);
            if(r == true){
                delete_process(process_id)
            }
        }
    })
    // 加载磁盘
    $.ajax({
        url: GLOBLE.DISK,
        dataType: 'json',
        success: function(data){
            disk_data(data)
        }
    })
    // 遍历目录
    $dir = $('#disk_data')
    $dir.on('click', 'td[id]', function(){
        path = $(this).attr('id') + '/'
        args['dir_path'] = path

        $.ajax({
            url: GLOBLE.TRAVERSE_DISK,
            data: args,
            dataType: 'json',
            success: function(data){
                if(data == ''){
                    alert('文件夹受保护，没有权限访问')
                }
                else{
                    traverse_disk_data(data, path)
                    render_disk_data(path)
                    $('#disk_data_thead').css('display', '')
                    $('#keyword').css('display', '')
                    no_path = path
                }
            }
        })
    })
    // 面包屑导航
    $('.path-line > .am-breadcrumb').on('click', 'li[path]', function(){
        path = $(this).attr('path')
        if(path == ""){
            $.ajax({
                url: GLOBLE.DISK,
                dataType: 'json',
                success: function(data){
                    disk_data(data)
                    render_disk_data(path)
                    $('#disk_data_thead').css('display', 'none')
                    $('#keyword').css('display', 'none')
                    no_path = path
                }
            })
        }
        else{
            args['dir_path'] = path
            $.ajax({
                url: GLOBLE.TRAVERSE_DISK,
                data: args,
                dataType: 'json',
                success: function(data){
                    traverse_disk_data(data)
                    render_disk_data(path)
                    $('#disk_data_thead').css('display', '')
                    $('#keyword').css('display', '')
                    no_path = path
                }
            })
        }
    })
    // 资源消耗
    $.ajax({
        url: GLOBLE.CONSUMPTION,
        dataType: 'json',
        success: function(data){
            cpu_shiylv(data)
        }
    })
    // 计算机信息
    $.ajax({
        url: GLOBLE.INFORMATION,
        dataType: 'json',
        success: function(data){
            information_data(data)
        }
    })
    // 关键字搜索
    num = 0
    $('#keyword_bt').click(function(){
        $tbody = $('#disk_data').find('tbody').empty()
        $('#key_search').attr('class', 'am-icon-spinner am-icon-spin');
        args['word'] = $('#keyword_ct').val()
        args['path'] = no_path
        function keyword(){
            args['num'] = num
            $.ajax({
                url: GLOBLE.KEYWORD,
                data: args,
                dataType: 'json',
                success: function(data){
                    if(data.length > 0){
                        traverse_disk_key_data(data)
                        num = data[2]
                        setTimeout(function(){
                            keyword()
                        },100);
                        ///////////////////////////////////////////////////
                        // var $elem = $('#key_search');

                        // if($elem.hasClass('am-icon-spin')) {
                        //     $elem.removeClass('am-icon-spin');
                        // }
                        // else {
                        //     $elem.addClass('am-icon-spin');
                        // }

                        // $elem.toggleClass('am-icon-spin');
                        ///////////////////////////////////////////////////
                    }
                    else{
                        $('#key_search').attr('class', 'am-icon-search');
                    }
                }
            })
        }
        keyword()
    })
})