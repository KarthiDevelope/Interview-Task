import React, { useState } from 'react';
import { Button, Drawer, Form, Input, Select, Row, Col, Divider } from 'antd';
import { MinusCircleOutlined } from "@ant-design/icons";


const { Option } = Select;

const Home = () => {

    const [open, setOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [newSchema, setNewSchema] = useState('');
    const [segments, setSegments] = useState([
        { label: 'First Name', value: 'first_name' },
        { label: 'Last Name', value: 'last_name' },
        { label: 'Gender', value: 'gender' },
        { label: 'Age', value: 'age' },
        { label: 'Account Name', value: 'account_name' },
        { label: 'City', value: 'city' },
        { label: 'State', value: 'state' }
    ]);
    const [segmentData, setSegmentData] = useState(null);

    const handleAddSchema = () => {
        setSelectedOptions([...selectedOptions, newSchema]);
        setNewSchema('');
    };

    const handleSelectChange = (value) => {
        console.log("value", value);
        setNewSchema(value);
    };

    const handleRemoveSchema = (index) => {
        const updatedOptions = [...selectedOptions];
        updatedOptions.splice(index, 1);
        setSelectedOptions(updatedOptions);
    };

    const handleEditSchema = (index, value) => {
        const updatedOptions = [...selectedOptions];
        updatedOptions[index] = value;
        setSelectedOptions(updatedOptions);
    };


    const handleSaveSegment = (values) => {
        const newSegmentData = {
            segment_name: values?.segment_name,
            schema: selectedOptions?.map(option => ({ [option]: option }))
        };

        setSegmentData(newSegmentData);

        console.log("segmentData", newSegmentData);

    };


    return (
        <div>
            <h1>Interview Task</h1>
            <Button type='primary' onClick={() => setOpen(true)}>
                Save Segment
            </Button>
            {segmentData && (
                <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '10px' }}>
                    <h3>Segment Data</h3>
                    <pre>{JSON.stringify(segmentData, null, 2)}</pre>
                </div>
            )}
            <Drawer
                title="Saving Segment"
                open={open}
                onClose={() => setOpen(false)}
                width={400}
            >
                <p>Enter the Name of the Segment</p>

                <Form
                    onFinish={handleSaveSegment}
                >

                    <Form.Item name="segment_name">
                        <Input placeholder='Name of the Segment' />
                    </Form.Item>
                    <p>To Save your Segment, you need to add the Schemas to build the query</p>

                    {selectedOptions?.map((option, index) => (
                        <>
                            <Row justify="space-between" key={index}>
                                <Col span={18}>
                                    <Select
                                        placeholder="Edit schema"
                                        style={{ width: "100%" }}
                                        defaultValue={option}
                                        onChange={(value) => handleEditSchema(index, value)}
                                    >
                                        {segments?.map(schema => (
                                            <Option key={schema?.value} value={schema?.value}>
                                                {schema?.label}
                                            </Option>
                                        ))}
                                    </Select>
                                </Col>
                                <Col span={3}>
                                    <MinusCircleOutlined onClick={() => handleRemoveSchema(index, '')} />
                                </Col>
                            </Row>
                            <br />
                        </>
                    ))}

                    <Divider />

                    <Row justify="space-between">
                        <Col span={18}>
                            <Select
                                placeholder="Add Schema to Segment"
                                style={{ width: "100%" }}
                                value={newSchema || undefined}
                                onChange={handleSelectChange}
                            >
                                {segments?.filter(schema => !selectedOptions?.includes(schema?.value))?.map(schema => (
                                    <Option key={schema?.value} value={schema?.value}>{schema?.label}</Option>
                                ))}
                            </Select>
                        </Col>

                    </Row>
                    <br />
                    <br />
                    <Button
                        className='Add_Button'
                        type="dashed"
                        onClick={handleAddSchema}
                        disabled={newSchema == ''}
                    >
                        + Add new schema
                    </Button>

                    <br />
                    <br />
                    <br />
                    <Button type="primary" htmlType="submit">
                        Save the Segment
                    </Button>

                </Form>
            </Drawer>
        </div>
    );
};

export default Home;
