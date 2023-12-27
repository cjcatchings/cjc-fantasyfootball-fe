'use client'

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

export default function Roster({playerRoster}){

    const [ roster, setRoster ] = React.useState(playerRoster);
    const [ resultsAvailable, setResultsAvailable ] = React.useState(true);
    const [ selectedPlayer, setSelectedPlayer ] = React.useState(null);

    const columns = [
        {field: 'rank', headerName: 'Rank', type: 'number', width: 60},
        {field: 'name', headerName: 'Name', width: 200},
        {field: 'priPosition', headerName: 'Position', width: 100},
        {field: 'team', headerName: 'Team', width: 70},
        {field: 'acqStatus', headerName: 'Status', width: 100},
        {field: 'byeWeek', headerName: 'Bye Week', type: 'number', width: 100}
    ];

    const permittedSlotsMap = React.useMemo(() => {return {
        'QB': ['QB', 'BE', 'IR'],
        'RB': ['RB', 'FLEX1', 'FLEX2', 'BE', 'IR'],
        'WR': ['WR1', 'WR2', 'FLEX1', 'FLEX2', 'BE', 'IR'],
        'TE': ['TE', 'FLEX1', 'FLEX2', 'BE', 'IR'],
        'DST': ['DST', 'BE', 'IR'],
        'HC': ['HC', 'BE', 'IR']
    }}, []);



    const renderPlayerRow = React.useCallback((player, posDisp, posKey) => {
        {
            const handleMoveButtonClick = () => {
                if(!selectedPlayer){
                    setSelectedPlayer({pos: posDisp, player: player});
                }
                else if(selectedPlayer.player == player){
                    setSelectedPlayer(null);
                }else{
                    if(player){
                        /**
                         * If starter is being swapped for a bench/IR slot, call move endpoint 
                         * for bench player instead.  This way a 'swap' between starter and bench
                         * player is made on the backend.
                         */
                        const position = selectedPlayer.pos === 'BE' ? 'BENCH' : 
                            selectedPlayer.pos;
                        let moveFetchEndpoint;
                        if(!['BE','IR'].includes(posDisp)){
                            moveFetchEndpoint = `${selectedPlayer.player.publicId}/${posDisp}`;
                        }else{
                            moveFetchEndpoint = `${player.publicId}/${position}`;
                        }
                        fetch(
                            `/fantasyfootball/roster/move/${moveFetchEndpoint}`,
                            {method: 'POST'}
                        ).then(data => data.json())
                        .then(jsonData => {
                            setRoster(jsonData);
                            setSelectedPlayer(null);
                        }).catch((err) => {
                            console.error(`Error occurred: ${err}`);
                            setSelectedPlayer(null);
                        });
                    }else{
                        fetch(
                            `/fantasyfootball/roster/bench/${selectedPlayer.player.publicId}`,
                            {method: 'POST'}
                        ).then(data => data.json())
                        .then(jsonData => {
                            setRoster(jsonData);
                            setSelectedPlayer(null);
                        }).catch((err) => {
                            console.error(`Error occurred: ${err}`);
                            setSelectedPlayer(null);
                        });
                    }
                }
            }

            const MoveButton = () => {
                if(!selectedPlayer){
                    return <Button 
                        size="small"
                        onClick={handleMoveButtonClick}
                        variant="outlined">Move</Button>
                }
                if(selectedPlayer.player == player){
                    return <Button 
                        size="small"
                        onClick={handleMoveButtonClick}
                        variant="contained">Move Pl</Button>
                }
                if(permittedSlotsMap[selectedPlayer.player.priPosition].includes(posDisp)
                    && (posDisp !== 'BE' || 
                        (selectedPlayer.pos !== 'BE' 
                            && permittedSlotsMap[player.priPosition].includes(selectedPlayer.pos)))){
                    return <Button
                        size="small"
                        onClick={handleMoveButtonClick}
                        variant="outlined">Here</Button>
                }
                return null;
            }
            return player ? (
                <TableRow key={`${posKey}${player.publicId}`}>
                    <TableCell>{posDisp}</TableCell>
                    <TableCell>{player.name}</TableCell>
                    <TableCell>
                        <MoveButton/>
                    </TableCell>
                    <TableCell>{player.priPosition}</TableCell>
                    <TableCell>{player.team}</TableCell>
                </TableRow>
            ) : (
                <TableRow key={`${posKey}none`}>
                    <TableCell>{posDisp}</TableCell>
                    <TableCell>Empty</TableCell>
                </TableRow>
            )
        }
    }, [selectedPlayer, permittedSlotsMap]);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell></TableCell>
                        <TableCell>Pos.</TableCell>
                        <TableCell>Team</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {renderPlayerRow(roster.QB, "QB", "QB")}
                    {renderPlayerRow(roster.RB, "RB", "RB")}
                    {renderPlayerRow(roster.WR1, "WR1", "WRONE")}
                    {renderPlayerRow(roster.WR2, "WR2", "WRTWO")}
                    {renderPlayerRow(roster.TE, "TE", "TE")}
                    {renderPlayerRow(roster.FLEX1, "FLEX1", "FLEXONE")}
                    {renderPlayerRow(roster.FLEX2, "FLEX2", "FLEXTWO")}
                    {renderPlayerRow(roster.DST, "D/ST", "DST")}
                    {renderPlayerRow(roster.HC, "HC", "HC")}
                    <TableRow key="Separator1"><TableCell></TableCell></TableRow>
                    {roster.BENCH.map((player, ix) => { return renderPlayerRow(player, "BE", `BE${ix}-`)})}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
