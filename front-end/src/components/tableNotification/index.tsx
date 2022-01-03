import React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableFooter from '@mui/material/TableFooter'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Pagination from '@mui/material/Pagination'
import { useHistory } from 'react-router-dom'
import './style.scss'


function createData(title: string, content: string, department: string,  date: string) {
  return { title, content, department, date }
}

const rows = [
  createData('Học phí', 'Đóng tiền học phí HK1', 'Phòng tài chính', '12/03/2021'),
  createData('Học phí', 'Đóng tiền học phí HK2', 'Phòng tài chính', '12/03/2021'),
  createData('Học phí', 'Đóng tiền học phí HK3', 'Phòng tài chính', '12/03/2021'),
  createData('Học phí', 'Đóng tiền học phí HK4', 'Phòng tài chính', '12/03/2021'),
  createData('Học phí', 'Đóng tiền học phí HK5', 'Phòng tài chính', '12/03/2021'),
  createData('Học phí', 'Đóng tiền học phí HK6', 'Phòng tài chính', '12/03/2021'),
  createData('Học phí', 'Đóng tiền học phí HK7', 'Phòng tài chính', '12/03/2021'),
  createData('Học phí', 'Đóng tiền học phí HK8', 'Phòng tài chính', '12/03/2021'),
  createData('Học phí', 'Đóng tiền học phí HK9', 'Phòng tài chính', '12/03/2021'),
  createData('Học phí', 'Đóng tiền học phí HK10', 'Phòng tài chính', '12/03/2021'),
  createData('Học phí', 'Đóng tiền học phí HK11', 'Phòng tài chính', '12/03/2021'),
  createData('Học phí', 'Đóng tiền học phí HK12', 'Phòng tài chính', '12/03/2021'),
]

const TableNotification: React.FC = () => {

  const history = useHistory()

  const moveToDetail = () => {
    history.push('notificationDetail')
  }

  //panigation
  const itemsPerPage = 5
  const [page, setPage] = React.useState(1)
  const [noOfPages] = React.useState(
    Math.ceil(rows.length / itemsPerPage)
  )
  const handleChangePage = (event:any, value:any) => {
    setPage(value)
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableBody>
          {rows
            .slice((page - 1) * itemsPerPage, page * itemsPerPage)
            .map((row, index) => {
              return(
                <TableRow key={row.title}>
                  <TableCell component="th" scope="row">
                    <div>
                      <h4>{row.title}</h4>
                      <p>{row.content}</p>
                      <div>
                        <a className='detailLink' onClick={() => moveToDetail()}>Chi tiết thông báo</a>
                        <p className='notificationDate'>{row.department} | {row.date}</p>
                      </div>
                    </div>
                  </TableCell >
                </TableRow>
              )
            })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <Pagination
              defaultPage={6}
              count={noOfPages}
              page={page}
              onChange={handleChangePage}
              sx={{justifyContent:'right'}}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}

export default TableNotification
