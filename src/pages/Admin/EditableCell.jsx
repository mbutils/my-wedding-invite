import { Form, Input, Select } from 'antd';

const EditableCell = (props) => {
    const {
        editing,
        dataIndex,
        title,
        inputType,
        inputOptions,
        record,
        index,
        children,
        ...restProps
    } = props;

    const inputNode = inputType === 'select' ? <Select id={dataIndex} options={inputOptions} allowClear /> : <Input />;

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

export default EditableCell;