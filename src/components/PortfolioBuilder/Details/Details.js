import React from 'react';
import './Details.scss';

import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

const Details = ({email}) => {
    return (
        <div className="details">
            <h1>FOR MORE INFORMATION</h1>
            <ButtonGroup size="large" variant="contained" color="primary">
                <Button href='/files/my-cv.pdf' download>VIEW MY CV</Button>
                {/* <Button href={`mailto:${email || 'abc@gmail.com'}`}>CONTACT ME</Button> */}
                <Button
  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email || 'abc@gmail.com'}&su=Subject&body=Message`}
  target="_blank"
  rel="noopener noreferrer"
>
  CONTACT ME
</Button>

            </ButtonGroup>
        </div>
    )
}

export default Details
