import React from 'react';
import ReactDom from 'react-dom';
import mycomponent from '../src/index';
import { Divider, Col, Form, Input } from 'antd';


const { MyTable, SearchForm } = mycomponent

const formList = [
  {filedType: 'string', type: 'input', childtype: '', filed: 'name', defaultData: '', placeholder: '请输入姓名', requeird: false, label: '姓名', enable: false},
  {filedType: 'string', type: 'input', childtype: '', filed: 'phone', defaultData: '', placeholder: '请输入电话', requeird: false, label: '电话', enable: false},
  {filedType: 'string', type: 'input', childtype: '', filed: 'idCard', defaultData: '', placeholder: '请输入身份证号', requeird: false, label: '身份证号', enable: false},
  {filedType: 'array', type: 'treeSelect', childtype: '', filed: 'department', defaultData: '', placeholder: '请选择部门', requeird: false, label: '部门',
    option:[
      {
        title: 'Node1',
        value: '0-0',
        key: '0-0',
        children: [
          {
            title: 'Child Node1',
            value: '0-0-0',
            key: '0-0-0',
          },
        ],
      },
      {
        title: 'Node2',
        value: '0-1',
        key: '0-1',
        children: [
          {
            title: 'Child Node3',
            value: '0-1-0',
            key: '0-1-0',
          },
          {
            title: 'Child Node4',
            value: '0-1-1',
            key: '0-1-1',
          },
          {
            title: 'Child Node5',
            value: '0-1-2',
            key: '0-1-2',
          },
        ],
      },
    ], 
    enable: false
  },
  {filedType: 'string', type: 'input', childtype: '', filed: 'address', defaultData: '', placeholder: '请输入地址', requeird: false, label: '地址', enable: false},
  {filedType: 'string', type: 'select', childtype: '', filed: 'sex', defaultData: '', placeholder: '请选择性别', requeird: false, label: '性别', enable: false,
    option:[
      {value: '男', title: '男'},
      {value: '女', title: '女'}
    ]
  },
  {filedType: 'time', type: 'datepicker', childtype: '', filed: 'date', defaultData: '', placeholder: '请选择日期', requeird: false, label: '日期', enable: false},
  {filedType: 'time', type: 'datepicker', childtype: '', filed: 'date', defaultData: '', placeholder: '请选择日期', requeird: false, label: '日期', enable: false},
]
const commenFormList = [
  {filedType: 'boolean', type: 'Switch', childtype: '', filed: 'switch', defaultData: true, placeholder: '', requeird: false, label: '是否启用', enable: false},
  {filedType: 'array', type: 'picUpload', childtype: '', filed: 'piclist', defaultData: [
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-2',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-3',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-4',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }
  ], placeholder: '', requeird: false, label: 'xxy', enable: false},
  // {filedType: 'array', type: 'drageUpload', childtype: '', filed: 'filelist', defaultData: [], placeholder: '', requeird: false, label: 'xxx', enable: false},
  // {filedType: 'array', type: 'fileUpload', childtype: '', filed: 'file', defaultData: '', placeholder: '', requeird: false, label: '文件', enable: false},
  {filedType: 'string', type: 'input', childtype: '', filed: 'name', defaultData: '', placeholder: '请输入姓名', requeird: false, label: '姓名', enable: false},
  {filedType: 'string', type: 'input', childtype: '', filed: 'phone', defaultData: '', placeholder: '请输入电话', requeird: false, label: '电话', enable: false},
  {filedType: 'string', type: 'input', childtype: '', filed: 'idCard', defaultData: '', placeholder: '请输入身份证号', requeird: false, label: '身份证号', enable: false},
  {filedType: 'array', type: 'treeSelect', childtype: '', filed: 'department', defaultData: [], placeholder: '请选择部门', requeird: false, label: '部门',
    option:[
      {
        title: 'Node1',
        value: '0-0',
        key: '0-0',
        children: [
          {
            title: 'Child Node1',
            value: '0-0-0',
            key: '0-0-0',
          },
        ],
      },
      {
        title: 'Node2',
        value: '0-1',
        key: '0-1',
        children: [
          {
            title: 'Child Node3',
            value: '0-1-0',
            key: '0-1-0',
          },
          {
            title: 'Child Node4',
            value: '0-1-1',
            key: '0-1-1',
          },
          {
            title: 'Child Node5',
            value: '0-1-2',
            key: '0-1-2',
          },
        ],
      },
    ], 
    enable: false
  },
  {filedType: 'string', type: 'input', childtype: '', filed: 'address', defaultData: '', placeholder: '请输入地址', requeird: false, label: '地址', enable: false},
  {filedType: 'string', type: 'select', childtype: '', filed: 'sex', defaultData: '', placeholder: '请选择性别', requeird: false, label: '性别', enable: false,
    option:[
      {value: '男', title: '男'},
      {value: '女', title: '女'}
    ]
  },
  {filedType: 'array', type: 'Checkbox', childtype: '', filed: 'itemtype', defaultData: '', placeholder: '请选择xxx', requeird: false, label: 'xxx', enable: false,
    option: [
      {value: 'A', title: 'A', enable: false},
      {value: 'B', title: 'B', enable: false},
      {value: 'C', title: 'C', enable: false},

    ]
  },
  {filedType: 'string', type: 'radio', childtype: '', filed: 'radiotype', defaultData: '', placeholder: '请选择xxx', requeird: false, label: 'xxx', enable: false,
    option: [
      {value: 'A', title: 'A', enable: false},
      {value: 'B', title: 'B', enable: false},
      {value: 'C', title: 'C', enable: false},
    ]
  },
  {filedType: 'time', type: 'yearpicker', childtype: '', filed: 'year', defaultData: '2020', placeholder: '请选择年份', requeird: false, label: '年份', enable: false},
  {filedType: 'time', type: 'weekpicker', childtype: '', filed: 'week', defaultData: '', placeholder: '请选周数', requeird: false, label: '周次', enable: false},
  {filedType: 'time', type: 'rangepicker', childtype: '', filed: 'datetodate', defaultData: '', placeholder: '请选时间段', requeird: false, label: '起止日期', enable: false},
  {filedType: 'time', type: 'MonthPicker', childtype: '', filed: 'month', defaultData: '', placeholder: '请选月份', requeird: false, label: '月份', enable: false},
]
let dataSource = [
];
for (let i = 0; i < 10; i++) {
  dataSource.push({
    key: i,
    name: `John Brown${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
    Sex: i,
    Department: `lalalalaalalall${i}`,
    description: `My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.${i}`,
    childrenTable: {
      columns: [
        { title: 'Date', dataIndex: 'date', key: 'date' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        {
          title: 'Status',
          key: 'state',
          render: () => (
            <span>
              Finished
            </span>
          ),
        },
        { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' },
        {
          title: 'Action',
          dataIndex: 'operation',
          key: 'operation',
          render: (record, text, index) => (
            <span className="table-operation">
              <a onClick={ () => Editable(record, text, index)}>Pause</a>
            </span>
          ),
        },
      ],
      data:[
        {key: '1',date: '1111', name: 'gggg', state: '', upgradeNum: 'huhuhu'},
        {key: '2',date: '1111', name: 'gggg', state: '', upgradeNum: 'huhuhu'},
        {key: '3',date: '1111', name: 'gggg', state: '', upgradeNum: 'huhuhu'},
        {key: '4',date: '1111', name: 'gggg', state: '', upgradeNum: 'huhuhu'},
      ]
    }
  });
}

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    width: 100
  },
  {
    title: 'Age',
    dataIndex: 'age',
    width: 100,
    editable: true,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    width: 200
  },
  {
    title: 'Sex',
    dataIndex: 'Sex',
    width: 200,
  },
  {
    title: 'Department',
    dataIndex: 'Department',
    width: 300,
  },
];

// 表单布局自定义
// 搜索表单
const formLayout = {
  layout: 'inline',
  md: 5,
  sm: 24
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};

// 通用提交表单
const conmmenformLayout = {
  layout: 'horizontal',
  md: 24,
  sm: 24
}
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

// 勾选数据
const onSelectChange = function (key, val) {
  console.log('key', key)
  console.log('val', val)
}
// 备用事件
const handleChange = function (pagination, filters, sorter, extra){
  console.log('params', pagination, filters, sorter, extra);
}

// 展开隐藏数据
const expandedRowRender = function (record, index, indent, expanded) {
  // console.log('record', record)
  // console.log('index', index)
  // console.log('indent', indent)
  // console.log('expanded', expanded)
}

const handleSubmit = (data) => {
  console.log('data',data)
  
}

const handleSubmits = (data, filelist) => {
  console.log(data)
  console.log('filelist',filelist)
}

const handleCancel = () => {
  console.log('关闭')
}

// 表格单元格编辑
const handleSaveCell = (row) => {
  console.log('row',row)
  // const newData = [...dataSource];
  // const index = newData.findIndex(item => row.key === item.key);
  // const item = newData[index];
  // newData.splice(index, 1, {
  //   ...item,
  //   ...row,
  // });
  dataSource = []
  // console.log(dataSource)
  // setTimeout(() => {
  //   dataSource = newData
  // }, 500)
}

const Editable = (record, text, index) => {
  console.log('record',record)
  console.log('text', text)
  console.log('index', index)
}

@Form.create()
class Demo extends React.Component{
  render(){
    const { getFieldDecorator, getFieldValue } = this.props.form
    return <div style={{width: '98%', height: '100%', paddingLeft: '30px'}}>
    <h1>组件预览：</h1>
      <SearchForm 
        formList={formList} 
        formLayout={formLayout}
        formItemLayout={formItemLayout}
        formType='search'
        btnCon={{confirm: '确 认', cancel: '取 消'}}
        limtLength={2}
        handleSubmit={handleSubmit}
      />

      <Divider />

      <MyTable
        resizeAble={true}
        dataSource={dataSource.length?dataSource:[]}
        columns={columns}
        onSelectChange={onSelectChange}
        handleChange={handleChange}
        bordered={true}
        expandedRowRender={expandedRowRender}
        isexpandedRowRender={false}
        expandedRowFiled={'description'}
        isrowSelection={false}
        scroll={{ y: 400 }}
        isChildTable={true}
        pagination={true}
        // editablecell={true}
        // handleSaveCell={handleSaveCell}
      />

      <Divider />

      <Col md={10} sm={24}>
        <SearchForm 
          formList={commenFormList} 
          formLayout={conmmenformLayout} 
          formItemLayout={conmmenformItemLayout}
          formType='commen'
          btnCon={{confirm: '确 认', cancel: '取 消'}}
          handleSubmit={handleSubmits}
          disabled={false}
          btnLocal={{md: 4, offset: 8}}
          handleCancel={handleCancel}
          isFormchildren='form'
          dragtxt=''
          draghint=''
          listType='picture'
          uploadUrl="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        >
          {
            [
              {key:"usernames", defaultData: '李四', filed: 'usernames', label: '姓名', comments: <Input placeholder="测试"/>},
              {key:"telphone", defaultData: '123213212', filed: 'telphone', label: '固话', comments: <Input placeholder="固话"/>},
            ]
          }
        </SearchForm>
      </Col>
    </div>
  }
}
// const Demo = () => {
 
// }

ReactDom.render(<Demo />, document.getElementById('root'));

