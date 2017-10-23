import Mock from 'mockjs';

Mock.mock('http://192.168.6.52:8080/pbplatformws/captcha/1_0', {
  'uuid': '@string(16)',
  'captcha': Mock.Random.dataImage('140x42', Mock.Random.string('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz', 5))
})
Mock.mock('http://192.168.6.52:8080/pbplatformws/1_0', function (options) {
  let data;
  let rData = JSON.parse(options.body);
  switch (rData.func) {
    case '600':
      data = Mock.mock({
        'retHead': '0',
        'func': '600',
        'data': [{
          'uid': '83',
          'userType': '2',
          'loginName': 'pbtest',
          'token': '@string(15)',
          'funcList': [{
            'pid': '1',
            'parentCode': 0,
            'code': '1',
            'description': '通知',
            'url': 'subpage',
            'children': []
          }]
        }]
      });
      break;
    case '603':
      data = {
        'retHead': '0',
        'func': '603'
      };
      break;
    case '604':
      data = {
        'retHead': '0',
        'func': '604',
        data: [{
          users: [
            {
              'roleName': '权限管理员',
              'rid': '1',
              'loginName': 'admin',
              'id': '1',
              'status': 1
            },
            {
              'roleName': '权限管理员',
              'rid': '1',
              'loginName': 'pbtest',
              'id': '45',
              'status': 1
            },
            {
              'roleName': '权限管理员',
              'rid': '1',
              'loginName': 'pb',
              'id': '47',
              'status': 1
            }
          ]
        }]
      };
      break;
    case '605':
      data = {
        'retHead': '0',
        'func': '605'
      };
      break;
    case '606':
      data = {
        'retHead': '0',
        'func': '606'
      };
      break;
    case '607':
      data = {
        'retHead': '0',
        'func': '607',
        data: [{
          users: [{
            'phone': '17688569453',
            'rid': '1',
            'loginName': 'pbtest',
            'roleName': '权限管理员',
            'name': '测试员',
            'remark': ' ',
            'id': '45',
            'userType': '2',
            'department': '研发二部',
            'status': '1'

          }]
        }]
      };
      break;
    case '608':
      data = {
        'retHead': '0',
        'func': '608'
      };
      break;
    case '609':
      data = {
        'retHead': '0',
        'func': '609',
        data: [{
          roles: [
            {
              modifyTime: 1490666079000,
              roleName: '权限管理员',
              remark: '权限管理员',
              rid: '1'
            },
            {
              modifyTime: 1490666079000,
              roleName: '普通管理员',
              remark: '普通管理员',
              rid: '2'
            },
            {
              modifyTime: 1490666079000,
              roleName: '操作员',
              remark: '操作员',
              rid: '3'
            },
            {
              modifyTime: 1490666079000,
              roleName: '蕴业项目权限',
              remark: '蕴业项目权限',
              rid: '4'
            },
          ]
        }]
      };
      break;
    case '610':
      data = {
        'retHead': '0',
        'func': '610'
      };
      break;
    case '611':
      data = {
        'retHead': '0',
        'func': '611'
      };
      break;
    case '612':
      data = {
        'retHead': '0',
        'func': '612'
      };
      break;
    case '613':
      data = {
        'retHead': '0',
        'func': '613',
        'data': [{
          'uid': '47',
          'loginName': 'pb',
          'userType': 2,
          'funcList': [
            {
              'code': '1',
              'parentCode': '0',
              'orderNum': '1',
              'description': 'APP管理',
              'pid': '1',
              'url': null,
              'children': [
                {
                  'pid': '2',
                  'orderNum': '1',
                  'code': '2',
                  'parentCode': '1',
                  'description': '栏目管理',
                  'url': '/pobo_managers/dist/biz/column.html',
                  'children': []
                },
                {
                  'pid': '3',
                  'orderNum': '2',
                  'code': '3',
                  'parentCode': '1',
                  'description': '栏目内容管理',
                  'url': '/pobo_managers/dist/biz/column_info.html',
                  'children': []
                },
                {
                  'pid': '4',
                  'orderNum': '3',
                  'code': '4',
                  'parentCode': '1',
                  'description': '广告管理',
                  'url': '/pobo_managers/dist/biz/gggl.html',
                  'children': []
                },
                {
                  'pid': '5',
                  'orderNum': '4',
                  'code': '5',
                  'parentCode': '1',
                  'description': '搜索功能管理',
                  'url': '/pobo_managers/dist/biz/func.html',
                  'children': []
                },
                {
                  'pid': '6',
                  'orderNum': '5',
                  'code': '6',
                  'parentCode': '1',
                  'description': 'APP下载地址管理',
                  'url': ' /pobo_managers/dist/biz/download.html',
                  'children': []
                }
              ]
            }
          ]
        }]
      };
      break;
    case '614':
      data = {
        'retHead': '0',
        'func': '614'
      };
      break;
    case '615':
      data = {
        'retHead': '0',
        'func': '615'
      };
      break;
    default:

  }
  return data;
});

// export { codeData, routerData };