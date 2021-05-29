import React, {useEffect, useState} from 'react';
 import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props){
    return <MuiAlert elevation={6} variant="filled" {...props}></MuiAlert>
}

export default function SnackBar({snackState,type ,message}) {
    const [val, setVal] = useState(false)

    useEffect(() => {
        if(snackState){
            setVal(true)
        }
    }, [snackState])

    const handleClose = () => {
        setVal(false)
        console.log(val)
    }

    return(
        <Snackbar open={val} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={type}>
                {message}
            </Alert>
        </Snackbar>
    )
}
