'use client'

import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {Button, styled} from '@mui/material';
import { blue } from '@mui/material/colors';

export default function FantasyFootballPlayers({players}){

    const [ playerList, setPlayerList ] = React.useState(players);
    const [ playerListLength, setPlayerListLength ] = React.useState(players.length);
    const [ filters, setFilters ] = React.useState([]);

    const PagingButton = styled(Button)(({theme}) => ({
        backgroundColor: blue.A200
    }));

    const columns = [
        {field: 'rank', headerName: 'Rank', type: 'number', width: 60},
        {field: 'name', headerName: 'Name', width: 200},
        {field: 'priPosition', headerName: 'Position', width: 100},
        {field: 'team', headerName: 'Team', width: 70},
        {field: 'acqStatus', headerName: 'Status', width: 100},
        {field: 'byeWeek', headerName: 'Bye Week', type: 'number', width: 100}
    ];

    return (
        <DataGrid 
            rows={playerList}
            columns={columns}
            getRowId={(row) => row.publicId}
            rowHeight={40}
            rowCount={playerListLength}
            paginationMode='client'
            initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: 25,
                        page: 0
                    }
                }
            }}
            
        />
    );
}
