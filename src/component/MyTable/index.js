import React from 'react';
import {Table, Row, Col, ConfigProvider, Badge, Menu, Dropdown, Icon, Pagination, Input, Form } from 'antd';
import { Resizable } from 'react-resizable';
import zhCN from 'antd/es/locale/zh_CN';
import './index.css'

// 表格单元格编辑设置
const EditableContext = React.createContext();
const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);
const EditableFormRow = Form.create()(EditableRow);
class EditableCell extends React.Component {
  state = {
    editing: false,
  };

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  save = e => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };

  renderCell = form => {
    this.form = form;
    const { children, dataIndex, record, title } = this.props;
    const { editing } = this.state;
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `${title} is required.`,
            },
          ],
          initialValue: record[dataIndex],
        })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={this.toggleEdit}
      >
        {children}
      </div>
    );
  };

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    );
  }
}

// --------------------------------------------------------------------------

// 表格列可伸缩
const ResizeableTitle = props => {
  // console.log('props',props)
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  );
};

const menu = (
  <Menu>
    <Menu.Item>Action 1</Menu.Item>
    <Menu.Item>Action 2</Menu.Item>
  </Menu>
);

class MyTable extends React.Component {
  state = {
    editing: false, // 单元格是否处于编辑状态
    dataSource: [], // 表数据
    columns: [], // 表头数据
    selectedRowKeys: [], // 勾选表格数据key值
    selectedRows: [], // 勾选表格数据行数据集合
  }

  // 渲染界面
  componentDidMount(){
    const { dataSource, columns } = this.props;
    if (dataSource) {
      this.setState({dataSource: dataSource})
    }
    if (columns) {
      this.setState({columns: columns})
    }
  }

  componentWillReceiveProps(nextProps){
    console.log('nextProps.dataSource',nextProps.dataSource)
    this.setState({dataSource: nextProps.dataSource})
  }

  // 改变表格数据选中状态
  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRowKeys, selectedRows });
    // 将选中数据向父组件传递备用
    this.props.onSelectChange(selectedRowKeys, selectedRows)
  };

  // 备用事件
  handleChange = (pagination, filters, sorter, extra) => {
    // console.log('params', pagination, filters, sorter, extra);
    this.props.handleChange(pagination, filters, sorter, extra)
  }

  // 展开查看隐藏数据
  expandedRowRender = (record,index, indent, expanded) => {
    // console.log('record', record)
    // console.log('index', index)
    // console.log('indent', indent)
    // console.log('expanded', expanded)
    this.props.expandedRowRender(record,index, indent, expanded)
    return (
      <p style={{ margin: 0 }}>{record[this.props.expandedRowFiled]}</p>
    )
    
  }

  // 表格列伸缩相关
  components = {
    header: {
      cell: ResizeableTitle,
    },
  }

  // 拖动列宽
  handleResize = index => (e, { size }) => {
    // console.log(index)
    this.setState(({ columns }) => {
      const nextColumns = [...this.state.columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      };
      return { columns: nextColumns };
    });
  }

  // 保存单元格编辑数据状态
  handleSave = row => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.props.handleSaveCell?this.props.handleSaveCell(row):null  
    this.setState({ dataSource: newData });
  };

  render() {

    

    // 定义state及通信数据
    const { dataSource, selectedRowKeys, selectedRows } = this.state;
    const { isexpandedRowRender, isrowSelection, resizeAble, isChildTable, pagination, editablecell } = this.props
    // 表格数据选中处理
    const rowSelection = {
      selectedRowKeys,
      selectedRows,
      onChange: this.onSelectChange,
    };

    // 表头数据处理
    const columnsdata = editablecell?
    this.state.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    })
    :this.state.columns
    
    // 是否可伸缩列条件判断获取表头数据
    const columns = resizeAble?columnsdata.map((col, index) => ({
      ...col,
      onHeaderCell: column => ({
        width: column.width,
        onResize: this.handleResize(index),
      }),
    })):columnsdata;


    // 子表格相关
    const expandedRowRenderTable = (record,index, indent, expanded) => {
      console.log(record)
      if(record.childrenTable){
        const {columns,data} = record.childrenTable
        return <Table columns={columns&&columns.length?columns:[]} dataSource={data&&data.length?data:[]} pagination={false} />;
      }
    }

    // 定义编辑单元格相关
    const editcomponents = {
      header: {
        cell: ResizeableTitle,
      },
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };

    // const columns = this.columns.map(col => {
    //   if (!col.editable) {
    //     return col;
    //   }
    //   return {
    //     ...col,
    //     onCell: record => ({
    //       record,
    //       editable: col.editable,
    //       dataIndex: col.dataIndex,
    //       title: col.title,
    //       handleSave: this.handleSave,
    //     }),
    //   };
    // });
    
    return (
      <Row gutter={24}>
        <ConfigProvider locale={zhCN}>
          <Table
          loading={ !dataSource&&!dataSource.length }
          components={editablecell?editcomponents:this.components}
          dataSource={this.state.dataSource}
          columns={columns}
          rowSelection={isrowSelection?rowSelection:null}
          onChange={this.handleChange}
          bordered={this.props.bordered?this.props.bordered:false}
          scroll={this.props.scroll?this.props.scroll:false}
          expandedRowRender={
            isChildTable?(record,index, indent, expanded) => expandedRowRenderTable(record,index, indent, expanded):
            (isexpandedRowRender?(record,index, indent, expanded) => this.expandedRowRender(record,index, indent, expanded):false)
            
          }
          pagination={pagination?pagination:false}
          // onExpand={(expanded, record) => this.onExpand(expanded, record)}
          />
        </ConfigProvider>
      </Row>
    );
  }
}

export default MyTable;
