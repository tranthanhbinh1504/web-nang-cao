import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableFooter from '@mui/material/TableFooter'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Pagination from '@mui/material/Pagination'
import { useHistory } from 'react-router-dom'
import { notification } from 'src/api/notification'
import './style.scss'





const TableNotification: React.FC = () => {
  const [data, setData] = useState<any>()
  const [page, setPage] = useState(1)
  // const [noOfPages] = React.useState(
  //   Math.ceil(data.length / itemsPerPage)
  // )
  const [noOfPages, setNoOfPages] = useState(0)
  const itemsPerPage = 5
  const history = useHistory()


  useEffect(() => {
    getDataTable()
  }, [])

  const getDataTable = () => {
    notification().then((value) => {
      setData(value)
      setNoOfPages(value.length > 1 ? Math.ceil(value.length / itemsPerPage) : 1)
    })
  }

  const moveToDetail = () => {
    history.push('notificationDetail')
  }

  //panigation


  const handleChangePage = (event:any, value:any) => {
    setPage(value)
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableBody>
          {data && data.slice((page - 1) * itemsPerPage, page * itemsPerPage)
            .map((row: any, index: number) => {
              return(
                <TableRow key={row.title}>
                  <TableCell component="th" scope="row">
                    <div>
                      <h4>{row.title}</h4>
                      <p>{row.content}</p>
                      <p>{row.img}</p>
                      <div>
                        <a className='detailLink' onClick={() => moveToDetail()}>Chi tiết thông báo</a>
                        <p className='notificationDate'>{row.department} | {row.dateTime}</p>
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
