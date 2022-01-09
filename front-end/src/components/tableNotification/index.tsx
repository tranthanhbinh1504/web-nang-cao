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
import './style.scss'

type Props = {
  item: any
}

const TableNotification: React.FC<Props>  = ({
  item
}) => {
  const [page, setPage] = useState(1)
  const itemsPerPage = 5
  const noOfPages = item && item.length > 1 ? Math.ceil(item.length / itemsPerPage) : 1
  const history = useHistory()

  const moveToDetail = (notificationId: any) => {
    history.push(`/notificationDetail/${notificationId}`)
  }

  const handleChangePage = (event:any, value:any) => {
    setPage(value)
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableBody>
          {item && item.slice((page - 1) * itemsPerPage, page * itemsPerPage)
            .map((row: any, index: number) => {
              return(
                <TableRow key={row.index}>
                  <TableCell component="th" scope="row">
                    <div>
                      <h4>{row.title}</h4>
                      <p>{row.content}</p>
                      <div>
                        <a className='detailLink' onClick={() => moveToDetail(row.id)}>Chi tiết thông báo</a>
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
