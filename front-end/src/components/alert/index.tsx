import * as React from 'react'
import Alert from '@mui/material/Alert'
interface Props {
  alertdata?:string;
  alert?:boolean;
}

const AlertError:React.FC<Props> = ({alertdata,alert}) => {
  return(
    <>
      <Alert
        severity={alert ? 'success' : 'error'}
        sx={{display: alertdata? 'bkock':'none'}}>
        {alertdata}
      </Alert>
    </>
  )
}
export default AlertError