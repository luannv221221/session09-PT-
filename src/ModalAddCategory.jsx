import { Button, Form, Input, Modal, Switch } from 'antd'
import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { getCategoriesThunk } from './redux/reducres/categorySlice';

function ModalAddCategory({ isModalOpen, handleCancel, handleOk }) {

    const [category, setCategory] = useState({
        categoryName: "",
        categoryStatus: ""
    });

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const dispath = useDispatch();
    const addCategory = () => {
        console.log(category);
        axios.post("http://localhost:8080/api/v1/categories", category).then((res) => {
            handleCancel();
            dispath(getCategoriesThunk());
        }).catch((err) => console.log(err));
    }


    return (
        <>
            <Modal title="Thêm mới danh mục" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={false}>
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"

                >
                    <Form.Item
                        label="Category Name"
                        name="category"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your category!',
                            },
                        ]}
                    >
                        <Input onChange={(e) => setCategory({ ...category, categoryName: e.target.value })} />
                    </Form.Item>
                    <Form.Item name="status" label="status" valuePropName="checked">
                        <Switch onChange={(checked) => setCategory({ ...category, categoryStatus: checked })} />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >

                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" block onClick={addCategory}>
                            Thêm mới
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default ModalAddCategory