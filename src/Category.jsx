import React, { useEffect, useState } from 'react';
import { Button, Modal, Pagination, Space, Spin, Table, Tag } from 'antd';
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
    const totalPage = useSelector((state) => state.category.totalPages) + 1;
    const totalElement = useSelector((state) => state.category.totalElements);
    const isLoading = useSelector((state) => state.category.loading);
    const [flag, setFlag] = useState(true);
    console.log(totalPage);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {

        setIsModalOpen(false);
    };
    const [currentPage, setCurrent] = useState(1);
    const onChangePage = (currentPage) => {
        console.log(currentPage);
        setCurrent(currentPage);
        setFlag(!flag)
    }
    const dispath = useDispatch();
    useEffect(() => {
        dispath(getCategoriesThunk({ page: currentPage }));
    }, [flag])

    function onShowSizeChange(current, pageSize) {
        console.log(current, pageSize);
    }

    return (
        <>
            {isLoading ? <Spin /> :
                <>

                    <Button type="primary" onClick={showModal}>
                        Thêm mới
                    </Button>

                    <Table columns={columns} dataSource={dataAPI} rowKey={record => record.categoryId} pagination={false} />
                    <Pagination onChange={(currentPage) => onChangePage(currentPage)}
                        total={totalElement} current={currentPage} pageSize={totalPage} />
                    <ModalAddCategory handleOk={handleOk} handleCancel={handleCancel} isModalOpen={isModalOpen} />
                </>
            }
        </>
    )
}
export default Category;