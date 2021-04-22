import React from 'react';
import './Details.scss';

import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

const Details = ({email}) => {
    return (
        <div className="details">
            <h1>FOR MORE INFORMATION</h1>
            <ButtonGroup size="large" variant="contained" color="primary">
                <Button>VIEW MY CV</Button>
                <Button href={`mailto:${email}`}>CONTACT ME</Button>
            </ButtonGroup>
        </div>
    )
}

export default Details
