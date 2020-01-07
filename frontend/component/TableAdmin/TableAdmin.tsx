import React, { memo, useState } from 'react';
import { Table, Paper, TableHead, TableRow, TableCell, TableBody, Button, TableContainer } from '@material-ui/core';
import { useRouter } from 'next/router';
// import styles from './TableAdmin.less';
import { IArticleItem } from '@/interface/home';


interface ITableAdmin {
    data: Array<IArticleItem>,
    editFun: (flag: boolean, _id?: string) => void
    delFun: (_id: string) => void,
}
export const TableAdmin: React.SFC<ITableAdmin> = memo((props) => {
    // console.log('TableAdmin',props)
    //= =====================data======================
    const { data, editFun, delFun } = props;
    const router = useRouter();

    //= =====================function======================
    const goDetail = (id: string) => {
        router.push('/article/[id]', `/article/${id}`);
    };
    //= =====================effect======================
    //= =====================render======================
    return (
        <TableContainer component={Paper}>
            <Table aria-label="article table">
                <TableHead>
                    <TableRow>
                        <TableCell>序号</TableCell>
                        <TableCell>标题</TableCell>
                        <TableCell align="center">顶置</TableCell>
                        <TableCell align="center">类型</TableCell>
                        <TableCell align="center">日期</TableCell>
                        <TableCell align="center">操作</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, i) => (
                        <TableRow key={row._id}>
                            <TableCell>{i + 1}</TableCell>
                            <TableCell style={{ width: 300 }}>{row.title}</TableCell>
                            <TableCell align="center">{row.level}</TableCell>
                            <TableCell align="center">{row.category.join(' , ')}</TableCell>
                            <TableCell align="center">{row.date}</TableCell>
                            <TableCell align="center" style={{ width: 280 }}>
                                <Button variant="contained" size="small" onClick={() => { editFun(true, row._id); }}>修改</Button>
                                <Button variant="contained" color="primary" onClick={() => { delFun(row._id); }} size="small" style={{ margin: '0 10px' }}>删除</Button>
                                <Button variant="contained" size="small" onClick={() => { goDetail(row._id); }}>查看</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
});
