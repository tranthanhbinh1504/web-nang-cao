import * as React from 'react'
import Alert from '@mui/material/Alert'
interface Props {
  alertdata?:string;
}

const AlertError:React.FC<Props> = ({alertdata}) => {
  return(
    <>
      <Alert
        severity="error"
        sx={{display: alertdata? 'bkock':'none'}}>
        {alertdata}
      </Alert>
    </>
  )
}
export default AlertError