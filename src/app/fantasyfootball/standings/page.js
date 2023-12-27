'use client'

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function FullStandings(){

    const [ standings, setStandings ] = React.useState([]);

    const columns = [
        {field: 'teamcode', headerName: 'Team', width: 120},
        {field: 'wins', headerName: 'W', type: 'number', width: 80},
        {field: 'losses', headerName: 'L', type: 'number', width: 80},
        {field: 'ptsFor', headerName: 'PF', type: 'number', width: 80},
        {field: 'ptsAgainst', headerName: 'PK', type: 'number', width: 80},
    ];

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Team</TableCell>
                        <TableCell>W</TableCell>
                        <TableCell>L</TableCell>
                        <TableCell>PF</TableCell>
                        <TableCell>PA</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                    standings.map((team) => 
                        (
                        <TableRow key={team.teamcode}>
                            <TableCell>{team.teamcode}</TableCell>
                            <TableCell>{team.wins}</TableCell>
                            <TableCell>{team.losses}</TableCell>
                            <TableCell>{team.ptsFor}</TableCell>
                            <TableCell>{team.ptsAgainst}</TableCell>
                        </TableRow>)
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );

}
