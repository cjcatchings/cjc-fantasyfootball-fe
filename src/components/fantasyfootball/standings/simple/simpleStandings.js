import * as React from 'react';
import standingsData from '../sample/sampleQuickStandings.json';
import { DataGrid } from '@mui/x-data-grid';

export default function SimpleStandings(props){

    const columns = [
        {field: 'teamcode', headerName: 'Team', width: 120},
        {field: 'wins', headerName: 'W', type: 'number', width: 50},
        {field: 'losses', headerName: 'L', type: 'number', width: 50}
    ];

    return(
        <DataGrid 
            rows={standingsData}
            columns={columns}
            getRowId={(row) => row.teamcode}
            hideFooter
            rowHeight={40}
        />
    );
}
