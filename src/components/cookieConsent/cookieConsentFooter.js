'use client'

import * as React from 'react'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

const cookieConsentText = "We use cookies on our website to enhance your browsing experience and ensure the security of your interactions with our platform. By continuing to use our website, you consent to the use of cookies in accordance with this Cookies Consent."

export default function CookieConsentFooter(props){
    
    const { cookiesAckd, setCookiesAckd, ...otherProps } = props
    const [consentBoxOpen, setConsentBoxOpen] = React.useState(!cookiesAckd)

    async function handleBoxClose(){
        await setCookiesAckd();
        setConsentBoxOpen(false);
    }

    return (
        <React.Fragment>
            <Drawer 
                anchor="bottom"
                open={consentBoxOpen}
                variant="persistent"
            >
                <Typography>{cookieConsentText}</Typography>
                <Button onClick={handleBoxClose}>OK.</Button>
            </Drawer>
        </React.Fragment>
    )
}
