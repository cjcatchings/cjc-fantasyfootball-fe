import * as React from 'react';
import styles from './newsSlider.module.css';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';

export default function FantasyFootballNewsSlider(props){
    const {headlines, ...other} = props;
    const numOfHeadlines = headlines.length;

    const [ slideChecked, setSlideChecked ] = React.useState(true);
    const [ headlineIndex, setHeadlineIndex ] = React.useState(0);
    const [ currentSlidingText, setCurrentSlidingText ] = React.useState(numOfHeadlines > 0 ? headlines[0] : null);
    const boxRef = React.useRef(null);
    const slidingTextRef = React.useRef(null);

    const slideEndListener = React.useCallback((e) => {
        if(!slideChecked){
            setTimeout(() => {
                setHeadlineIndex((prev) => prev == (numOfHeadlines - 1) ? 0 : (prev + 1));
            }, 2000);
        }
    },[slideChecked, numOfHeadlines]);

    React.useEffect(() => {
        const currentNewsTextLength = currentSlidingText.length;
        const tempTransform = -1 * (currentNewsTextLength ** 1.1);
        const slidingTextAnimation = [
            {transform: 'translateX(0%)', offset: 0.0},
            {transform: 'translateX(0%)', offset: 0.1},
            {transform: `translateX(${tempTransform}%)`, offset: 0.9},
            {transform: `translateX(${tempTransform}%)`, offset: 1.0}
        ];
        const slidingTextTimings = {duration: 12000};
        if(slidingTextRef.current){
            slidingTextRef.current.style.left = `0%`;
            const textAnimation = slidingTextRef.current.animate(slidingTextAnimation, slidingTextTimings);
            textAnimation.onfinish = () => {
                setSlideChecked(false);
                if(slidingTextRef.current){
                    slidingTextRef.current.style.left = `${tempTransform}%`;
                }
            };
        }else{
            console.info("Sliding text ref was null.  It may have been torn down but debug if you expect the slider.")
        }
    }, [currentSlidingText]);

    React.useEffect(() => {
        setCurrentSlidingText(headlines[headlineIndex]);
        setSlideChecked(true);
    }, [headlineIndex, headlines]);

    return(
        <Box sx={{height: 30, width: '300px', padding: 0, borderRadius: 1, overflow: 'hidden'}} ref={boxRef}>
            <Box sx={{height: 30}}>
                <Slide direction="up" in={slideChecked} container={boxRef.current} timeout={1000} addEndListener={slideEndListener} mountOnEnter unmountOnExit>
                    <Box sx={{position: 'relative'}}>
                        <span ref={slidingTextRef} className={styles.slidingText}>{currentSlidingText}</span>
                    </Box>
                </Slide>
            </Box>
        </Box>
    );
}
