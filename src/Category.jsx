import React, { useEffect, useState } from 'react';
import { Button, Modal, Space, Spin, Table, Tag } from 'antd';
import ModalAddCategory from './ModalAddCategory';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesThunk } from './redux/reducres/categorySlice';
const columns = [
    {
        title: 'Name',
        dataIndex: 'categoryName',
        key: 'categoryName',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Status',
        key: 'categoryStatus',
        dataIndex: 'categoryStatus',
        render: (status) => (
            <Tag color={status ? 'blue' : 'red'}>{status ? 'Active' : 'Inactive'}</Tag>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: () => (
            <Space size="middle">
                <a>Edit</a>
                <a>Delete</a>
            </Space>
        ),
    },
];
// const data = [
//     {
//         categoryId: 1,
//         categoryName: 'John Brown',
//         categoryStatus: true
//     },
//     {
//         categoryId: 2,
//         categoryName: 'John HIHI',
//         categoryStatus: false
//     },
// ];
const Category = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dataAPI = useSelector((state) => state.category.data);
    const isLoading = useSelector((state) => state.category.loading);
    console.log("data", dataAPI);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const dispath = useDispatch();
    useEffect(() => {
        dispath(getCategoriesThunk());
    }, [])
    return (
        <>
            {isLoading ? <Spin /> :
                <>

                    <Button type="primary" onClick={showModal}>
                        Thêm mới
                    </Button>

                    <Table columns={columns} dataSource={dataAPI} rowKey={record => record.categoryId} />
                    <ModalAddCategory handleOk={handleOk} handleCancel={handleCancel} isModalOpen={isModalOpen} />
                </>
            }
        </>
    )
}
export default Category;