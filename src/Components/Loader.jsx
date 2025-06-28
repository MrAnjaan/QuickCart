import React from 'react'
import { BeatLoader, ClipLoader } from "react-spinners";


const Loader = (props) => {

    const loaderStyle = props.position === 'center' ? {
        position: 'fixed',
        top: '50%',
        left: '45%',
        transform: 'translate(-50%, -50%)',
    } : {
        position: 'relative',
        margin: '20px auto',
        marginLeft: '43%',
        display: 'block'
    };

    return (
        <ClipLoader
            color='#ffca2c'
            loading={props.loading}
            cssOverride={loaderStyle}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    )
}

export default Loader