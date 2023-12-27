import { render } from '@testing-library/react';
import GridPaperItem from './gridPaperItem';
import {ThemeProvider} from 'styled-components';
import { createTheme } from '@mui/material/styles';
import 'jest-styled-components';

describe( 'Tests the gridPaperItem component', () => {
    const height = '100px';
    const bgcolor = '#000000';

    it('Tests that the GridPaperItem component style attributes match what was provided.', async () => {
        const MyGridPaperItem = GridPaperItem({height: height, bgcolor: bgcolor});
        const muiTheme = createTheme();
        const {getByTestId} = render(
            <ThemeProvider theme={muiTheme}>
                <MyGridPaperItem data-testid="myTestId"/>
            </ThemeProvider>
        );
        const componentToTest = getByTestId("myTestId");
        expect(componentToTest).toMatchSnapshot();
        expect(componentToTest).toHaveStyle({
            'height': '100px',
            'background-color': bgcolor,
            'box-shadow': '4px 4px black'
        });
    });
});