import React from 'react';
import { 
  Form, Input, Button, Select,
  TreeSelect, DatePicker, Row, Col, Icon, Checkbox,
  Radio,Switch,Upload,message,Modal 
} from 'antd';
import 'antd/dist/antd.css';
import YearPicker from '../yearpicker';
import { ConfigProvider } from 'antd';
import moment from 'moment';
import zhCN from 'antd/es/locale/zh_CN';

const { Option } = Select;
const { SHOW_PARENT } = TreeSelect;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

@Form.create()
class SearchForm extends React.Component {
  state = {
    size: '',
    value: [],
    Collapse: true,
    previewVisible: false,
    previewImage: '',
    fileList: [
 
    ],
    ispicFirst:true
  }

  componentDidMount(){

  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { form } = this.props.
    form.validateFields((err, fieldsValue) => {
      if (err) return
      // console.log(fieldsValue)
      this.props.handleSubmit?this.props.handleSubmit(fieldsValue,this.state.fileList):null
    }).catch(errorInfo => {
      console.log(errorInfo)
    })
  }

  handleChange = (e) => {
    console.log('e',e)
  }

  onChange = value => {
    console.log('onChange ', value);
    this.setState({ value });
  };

  // 选择年份控件点击事件
  changeYearRender = (val, data) => {
    console.log(val,data)
    var obj = {}, filed = data.filed
    obj[filed] = moment(val).format('YYYY')
    this.props.form.setFieldsValue(obj)
  }
  changeYearValue = (val, data) => {
    var obj = {}, filed = data.filed
    obj[filed] = val?moment(val).format('YYYY'):''
    this.props.form.setFieldsValue(obj)
  }


  // 表单数据初始值
  initialValue = data => {
    if (data.filedType == 'string') {
      if (data.defaultData) {
        // console.log('data.defaultData', data.defaultData)
        return data.defaultData
      } else {
        return null
      }
    }
    if (data.filedType == 'array') {
      // console.log('data.defaultData', data)
      if (data.defaultData.length) {
        // console.log('data.defaultData', data.defaultData)
        return data.defaultData
      } else {
        return null
      }
    }
    if (data.filedType == 'time') {
      let time = ''
      let timearr = []
      if (data.type == 'datepicker') {
        data.defaultData !== ''?
        time = moment(data.defaultData, 'YYYY-MM-DD'):
        time = null
      }
      if (data.type.toLowerCase() == 'yearpicker') {
        data.defaultData !== ''?
        time = moment(data.defaultData, 'YYYY'):
        time = null
      }
      if (data.type.toLowerCase() == 'weekpicker') {
        time = null
      }
      if (data.type.toLowerCase() == 'monthpicker') {
        data.defaultData !== ''?
        time = moment(data.defaultData, 'YYYY-MM'):
        time = null
      }
      if (data.type.toLowerCase() == 'rangepicker') {
        if(data.defaultData !== '') {
        let timelist = data.defaultData.split(',')
        let arr = [moment(timelist[0], 'YYYY-MM-DD'),moment(timelist[1], 'YYYY-MM-DD')]
        timearr = arr
        } else {
          timearr = null
        }
      }
      if (data.type.toLowerCase() !== 'rangepicker') {
        return time
      } else {
        return timearr
      }
    }
    if (data.filedType == 'boolean') {
      if (data.defaultData) {
        return data.defaultData
      } else {
        return false
      }
    }
  }

  // 表单条目
  formMate = (data) => {
    const disabled = this.props.disabled?this.props.disabled:false
    const tProps = {
      treeData: data.option,
      // value: this.state.value,
      onChange: this.onChange,
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      placeholder: 'Please select',
      style: {
        width: this.props.formType=='commen'?'100%':(this.props.size?this.props.size:'150px'),
      },
    };
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    // 普通输入框
    if (data.type.toLowerCase() == 'input') {
      return <Input 
      placeholder={data.placeholder} 
      disabled={disabled?disabled:(data.enable?data.enable:false)}
      />
    }
    // 下拉选择
    if (data.type.toLowerCase() == 'select') {
      return <Select style={{ width: this.props.formType=='commen'?'100%':150 }} onChange={e => this.handleChange(e)} 
      disabled={disabled?disabled:(data.enable?data.enable:false)} placeholder={data.placeholder}>
      {
        data.option&&data.option.length?
        data.option.map((item, itd) => {
        return <Option key={itd} value={item.value}>{item.value}</Option>
        }):null
      }
    </Select>
    }
    // 日期选择
    if (data.type.toLowerCase() == 'datepicker') { 
      return <DatePicker 
      style={{ width: this.props.formType=='commen'?'100%':150 }}
      size={this.state.size} 
      disabled={disabled?disabled:(data.enable?data.enable:false)} 
      placeholder={data.placeholder}
      />
    }
    // 周选择
    if (data.type.toLowerCase() == 'weekpicker') { 
      return <WeekPicker 
      style={{ width: this.props.formType=='commen'?'100%':150 }}
      size={this.state.size} 
      disabled={disabled?disabled:(data.enable?data.enable:false)} 
      placeholder={data.placeholder}
      />
    }
    // 起止日期选择
    if (data.type.toLowerCase() == 'rangepicker') { 
      return <RangePicker 
      style={{ width: this.props.formType=='commen'?'100%':150 }}
      size={this.state.size} 
      disabled={disabled?disabled:(data.enable?data.enable:false)} 
      placeholder={data.placeholder}
      />
    }
    // 月份选择
    if (data.type.toLowerCase() == 'monthpicker') { 
      return <MonthPicker 
      style={{ width: this.props.formType=='commen'?'100%':150 }}
      size={this.state.size} 
      disabled={disabled?disabled:(data.enable?data.enable:false)} 
      placeholder={data.placeholder}
      />
    }
    // 年份选择
    if (data.type.toLowerCase() == 'yearpicker') {
      return <YearPicker 
      style={{ width: this.props.formType=='commen'?'100%':150 }}
      size={this.state.size} 
      disabled={disabled?disabled:(data.enable?data.enable:false)} 
      placeholder={data.placeholder}
      changeRender={e => this.changeYearRender(e,data)}
      changeValue={e => this.changeYearValue(e,data)}
      times={(data.defaultData||data.defaultData!=='')?data.defaultData:null}
      />
    }
    // 树形选择
    if (data.type.toLowerCase() == 'treeselect') {
      return <TreeSelect 
      {...tProps} 
      maxtagcoun={4} 
      disabled={disabled?disabled:(data.enable?data.enable:false)} 
      placeholder={data.placeholder}
      />
    }
    // 复选框组 .toLowerCase()
    if (data.type.toLowerCase() == 'checkbox') { 
      return <Checkbox.Group style={{ width: '100%' }} disabled={disabled?disabled:(data.enable?data.enable:false)}>
        <Row>
          {
            data.option&&data.option.length?
            data.option.map((item, itd) => {
            return <Checkbox key={itd} disabled={item.enable?item.enable:false} value={item.value}>{item.title}</Checkbox>
            }):null
          }
        </Row>
      </Checkbox.Group>
    }
    // 单选框组
    if (data.type.toLowerCase() == 'radio') { 
      return <Radio.Group disabled={disabled?disabled:(data.enable?data.enable:false)}>
        {
          data.option&&data.option.length?
          data.option.map((item, itd) => {
          return <Radio value={item.value} key={itd}>{item.title}</Radio>
          }):null
        }
      </Radio.Group>
    }
    // 图片上传
    if (data.type.toLowerCase() == 'picupload') { 
      return <div className="clearfix">
        <Upload
          action={this.props.uploadUrl?this.props.uploadUrl:''}
          listType="picture-card"
          fileList={!this.state.fileList.length&&this.state.ispicFirst?data.defaultData:this.state.fileList}
          onPreview={this.handlePreview}
          onChange={ (e) => this.handleChangepic(e, data.defaultData)}
        >
          {this.state.fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
        </Modal>
      </div>
    }
    // 文件上传
    if (data.type.toLowerCase() == 'fileupload') { 
      return <Upload name="logo" action={this.props.uploadUrl?this.props.uploadUrl:''} listType={this.props.listType?this.props.listType:'text'}>
      <Button>
        <Icon type="upload" /> Click to upload
      </Button>
    </Upload>
    }
    // 拖拽上传
    if (data.type.toLowerCase() == 'drageupload') { 
      return <Upload.Dragger name="files" action={this.props.uploadUrl?this.props.uploadUrl:''}>
        <p className="ant-upload-drag-icon">
          <Icon type="inbox" />
        </p>
        <p className="ant-upload-text">{this.props.dragtxt?this.props.dragtxt:'点击或拖拽文件上传'}</p>
        <p className="ant-upload-hint">{this.props.draghint?this.props.draghint:'Support for a single or bulk upload.'}</p>
      </Upload.Dragger>
    }
    // 分割条
    if (data.type.toLowerCase() == 'divider') { 
      if (data.typeName.toLowerCase() == '') {
        return ''
      }
      if (data.typeName.toLowerCase() == '') {
        return ''
      }
      if (data.typeName.toLowerCase() == '') {
        return ''
      }
      if (data.typeName.toLowerCase() == '') {
        return ''
      }
    }
    if (data.type.toLowerCase() == 'switch') {
      // checkedChildren="开" unCheckedChildren="关"
      return <Switch />
    }
  }

  // 展开/收起
  expendFrom = () => {
    this.setState({
      Collapse: !this.state.Collapse
    })
  }

  // 取消表单提交
  handleCancel = () => {
    this.resetForms()
    this.props.handleCancel()
  }

  // 重置表单
  resetForms = (str) => {
    this.props.form.resetFields()
  }

  // 文件上传相关
  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    console.log('file',file)
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChangepic = (e, defaultData) => {
    console.log(e)
    this.setState({
      ispicFirst: false,
      fileList: e.fileList
    })
  };

  render(){
    const { 
      formList, // 表单数据列表
      formLayout, // 表单样式布局控制
      formItemLayout, // 表单项布局样式控制
      formType, // 表单类型（分为搜索表单和普通提交型表单）
      btnCon, // 自定义表单按钮文字内容
      limtLength, // 搜索表单是否折叠长度控制
      btnLocal, // 通用表单按钮位置
      children,
      isFormchildren, // 是否为表单自定义结构
    } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form
    const { Collapse } = this.state
    return (
      <Row gutter={24}>
        <ConfigProvider locale={zhCN}>
          <Form layout={formLayout&&formLayout.layout?formLayout.layout:'inline'} {...formItemLayout} onSubmit={e => this.handleSubmit(e)}>
            {
              formList&&formList.length?
              formList.map((el,index) => {
                return<Col md={formLayout&&formLayout.md?formLayout.md:24} sm={formLayout&&formLayout.sm?formLayout.sm:24} key={index} hidden={Collapse&&limtLength&&(limtLength<index+1)?true:false}>
                  <Form.Item label={el.label}>
                    {
                      (el.type.toLowerCase() == 'fileupload' || el.type.toLowerCase() == 'picupload' || el.type.toLowerCase() == 'drageupload')?
                      getFieldDecorator(el.filed, {
                        initialValue:  this.initialValue(el),
                        valuePropName: 'filelist',
                        getValueFromEvent: this.normFile,
                      })(
                        this.formMate(el)
                      ):
                      el.type.toLowerCase() == 'switch'?
                      getFieldDecorator(el.filed, {
                        valuePropName: 'checked',
                        initialValue:  this.initialValue(el),
                      })(
                        this.formMate(el)
                      ):
                      getFieldDecorator(el.filed, {
                        initialValue:  this.initialValue(el),
                        rules: [{ required: el.requeird?el.requeird:false, message: `${el.tips?el.tips:''}不能为空` }]
                      })(
                        this.formMate(el)
                      )
                    }
                  </Form.Item>
                </Col>
              }):null
            }
            {
              // 自定义表单结构
              isFormchildren == 'form'?
              children.map((el, index) => {
                return <Col md={formLayout&&formLayout.md?formLayout.md:24} sm={formLayout&&formLayout.sm?formLayout.sm:24} key={index} hidden={Collapse&&limtLength&&(limtLength<index+1)?true:false}>
                  <Form.Item label={el.label} key={el.filed}>
                    {
                      getFieldDecorator(el.filed, {
                        initialValue:  el.defaultData?el.defaultData:null,
                        rules: [{ required: el.requeird?el.requeird:false, message: `${el.tips?el.tips:''}不能为空` }]
                      })(
                        el.comments
                      )
                    }
                  </Form.Item>
                </Col>
              }):null
            }
            {
              formType&&formType == 'search'?
              <Col md={6} sm={24}>
                  <Col md={6} sm={24}>
                    <Button type="primary" htmlType="submit">
                      查 询
                    </Button>
                  </Col>
                  <Col md={6} sm={24}>
                    <Button type="primary" onClick={() => this.resetForms('resetForm')}>
                      重 置
                    </Button>
                  </Col>
                  {
                    limtLength&&formType&&formType == 'search'?<a style={{ marginLeft: 20, fontSize: 14, lineHeight: 2 }} onClick={this.expendFrom}>
                      { Collapse?'展 开':'收起' } <Icon type={this.state.Collapse ? 'down' : 'up'} />
                    </a>:null
                  }
                  
              </Col>:
              <Col md={24} sm={24}>
                <Col offset={btnLocal&&btnLocal.offset?btnLocal.offset:8} md={btnLocal&&btnLocal.md?btnLocal.md:4} sm={24}>
                  <Button type="primary" htmlType="submit">
                    {btnCon&&btnCon.confirm?btnCon.confirm:'提 交'}
                  </Button>
                </Col>
                <Col md={btnLocal&&btnLocal.md?btnLocal.md:4} sm={24}>
                  <Button onClick={this.handleCancel}>
                    {btnCon&&btnCon.cancel?btnCon.cancel:'取 消'}
                  </Button>
                </Col>
              </Col>
            }
          </Form>
          {
            isFormchildren == 'commen'?
            children.map(el => {
              return <div key={el.key}>
                {el.comments}
              </div>
            }):null
          }
        </ConfigProvider>
      </Row>
    )
  }
}

export default SearchForm;