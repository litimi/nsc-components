This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## react+antd二次封装控件

组件包含表格和表单
引用方式：
` ``
import { MyTable, SearchForm } from 'ademoreactnpm';
` ``

### 表格参数说明

resizeAble：true/false ----是否开启表格列可伸缩

bordered：true/false  -----是否有边框

isexpandedRowRender：true/false -----是否开启展开隐藏功能

expandedRowFiled：string -----展开隐藏字段

isrowSelection：true/false -----是否开启表格可选状态

scroll：{x：'', y: ''}

isChildTable：true/false -------是否展示子表格，若开启嵌套子表格展示则表个数据内应包含childrenTable字段，该字段为子表格表格及表头数据集合，结构为：
` ``
childrenTable:{
  columns: [],
  data: []
}

pagination：true/false/object
object：
const xxxx = {
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: 页数,
  pageSize,
  current: 第几页,
  total: xxx,
  onShowSizeChange: (current, pageSize) => this.function(current, pageSize),
  onChange: (current) => this.function({
    ...searchItem,
    page: current,
    size: pageSize
  }),
};
` ``
详细配置可查看antd官网分页配置<br>

{#### 表格数据及表头数据依然为antd格式(不嵌套子表格时) #######}<br>

dataSource：[] ------表格数据<br>
columns: [] ------表头数据<br>

{#### 函数事件 #####}<br>

onSelectChange 勾选表格数据返回值为选中key值及每一行的数据集合function(key,val){}<br>

handleChange 备用函数<br>
` ``
function (pagination, filters, sorter, extra){
  console.log('params', pagination, filters, sorter, extra);
}
` ``

expandedRowRender  展开隐藏事件<br>
` ``
function (record, index, indent, expanded) {
  // console.log('record', record)
  // console.log('index', index)
  // console.log('indent', indent)
  // console.log('expanded', expanded)
}
` ``


### 表单参数说明
formList：[] -----表单渲染数据，数据格式如下：<br>
commenFormList = [<br>
  {<br>
  filedType: '', type: 'drageUpload', childtype: '', filed: 'filelist', <br>defaultData: '', placeholder: '', requeird: false, label: 'xxx', enable: false<br>},<br>
  {<br>filedType: '', type: 'fileUpload', childtype: '', filed: 'file',<br> defaultData: '', placeholder: '', requeird: false, label: '文件', enable: false<br>},<br>
  {<br>
    filedType: 'string', type: 'input', childtype: '', filed: 'name', <br>defaultData: '', placeholder: '请输入姓名', requeird: false, label: '姓名', enable: false<br>
  },<br>
  {<br>
    filedType: 'array', type: 'treeSelect', childtype: '', filed: 'department', <br>
    defaultData: '', placeholder: '请选择部门', requeird: false, label: '部门',<br>
    option:[<br>
      {<br>
        title: 'Node1',<br>
        value: '0-0',<br>
        key: '0-0',<br>
        children: [<br>
          {<br>
            title: 'Child Node1',<br>
            value: '0-0-0',<br>
            key: '0-0-0',<br>
          },<br>
        ],<br>
      },<br>
      {<br>
        title: 'Node2',<br>
        value: '0-1',<br>
        key: '0-1',<br>
        children: [<br>
          {<br>
            title: 'Child Node3',<br>
            value: '0-1-0',<br>
            key: '0-1-0',<br>
          },<br>
        ],<br>
      },<br>
    ], <br>
    enable: false<br>
  },<br>
  {<br>
    filedType: 'string', type: 'select', childtype: '', filed: 'sex', <br>defaultData: '', placeholder: '请选择性别', requeird: false, <br>label: '性别', enable: false,<br>
    option:[<br>
      {value: '男', title: '男'},<br>
      {value: '女', title: '女'}<br>
    ]<br>
  },<br>
  {<br>
    filedType: 'array', type: 'Checkbox', childtype: '', filed: 'itemtype', <br>defaultData: '', placeholder: '请选择xxx', requeird: false, label: 'xxx', enable: false,<br>
    option: [<br>
      {value: 'A', title: 'A', enable: false},<br>
      {value: 'B', title: 'B', enable: false},<br>
      {value: 'C', title: 'C', enable: false},<br>
    ]<br>
  },<br>
  {<br>
    filedType: 'string', type: 'radio', childtype: '', filed: 'radiotype', <br>defaultData: '', placeholder: '请选择xxx', requeird: false, label: 'xxx', enable: false,<br>
    option: [<br>
      {value: 'A', title: 'A', enable: false},<br>
      {value: 'B', title: 'B', enable: false},<br>
      {value: 'C', title: 'C', enable: false},<br>
    ]<br>
  },<br>
  {filedType: 'time', type: 'yearpicker', childtype: '', filed: 'year', defaultData: '', placeholder: '请选择年份', requeird: false, label: '年份', enable: false},
  {filedType: 'time', type: 'weekpicker', childtype: '', filed: 'week', defaultData: '', placeholder: '请选周数', requeird: false, label: '周次', enable: false},
  {filedType: 'time', type: 'rangepicker', childtype: '', filed: 'datetodate', defaultData: '', placeholder: '请选时间段', requeird: false, label: '起止日期', enable: false},
  {filedType: 'time', type: 'MonthPicker', childtype: '', filed: 'month', defaultData: '', placeholder: '请选月份', requeird: false, label: '月份', enable: false},
]<br>

formLayout ------表单样式配置如下：<br>
` ``
const conmmenformLayout = {
  layout: 'horizontal',
  md: 24,
  sm: 24
}
` ``
<br>

formItemLayout ------表单项格式样式配置如下：<br>
` ``
const conmmenformItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
}
` ``
<br>
formType：commen/search -----通用提交表单/搜索表单<br>

btnCon：{confirm:'xxx', cancel: 'xxx'} ------定义表单底部按钮文字<br>

handleSubmit：function  ------提交表单数据返<br>

disabled：true/false ------表单项是否可用<br>

btnLocal：表单按钮位置设置配置如下：<br>
btnLocal={{md: 4, offset: 8}}<br>

handleCancel：function -----取消按钮点击事件<br>

limtLength：Number ------作为搜索表单时防止表单项过多配置折叠显示条目数<br>

isFormchildren: 'form'/'commen' 在该表单无法满足需求时，<br>使用react的children属性自定义<br>组件，form为定义在表单内为表单内元件，commen为表单外部提交按钮下部位置（样式由使者<br>在父组件内添加上），当前结构为：<br>
[<br>
  {key:"usernames", defaultData: '李四', filed: 'usernames', label: '姓名', comments: 元素标签},
  {key:"telphone", defaultData: '123213212', filed: 'telphone', label: '固话', comments: 元素标签},
]<br>

上传参数说明：<br>
uploadUrl：上传路径<br>
listType：按钮上传时的上传样式类型string（text, picture 和 picture-card）<br>
draghint,dragtxt: 拖拽上传文字内容string<br>

### 表单项添加上传控件（拖拽上传及按钮点击上传）
#### 表单默认值返回，添加switch开关,头像类图片上传修改为提交时将数据传至父组件内由个人处理至表单数据内。。。。。。。
### 由于将antd的全部样式引入致使包体积过大，改进中。。。。。




