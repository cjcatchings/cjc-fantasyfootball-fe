import * as React from 'react';
import FantasyFootballHeader from '../../components/header/fantasyfootball/ffheader';
import { headers } from 'next/headers';

export default function Layout(props){

    const reqHeaders = headers();
    const nameHeader = reqHeaders.get("X-Full-Name");
    const url = reqHeaders.get("X-url");
    const isHome = url === "/fantasyfootball";
  
    return (
          <>
            <MemorizedHeader 
                isHome={isHome} userFullName={nameHeader}/>
            <main>{props.children}</main>
          </>
      )
}

const MemorizedHeader = React.memo(FantasyFootballHeader);
