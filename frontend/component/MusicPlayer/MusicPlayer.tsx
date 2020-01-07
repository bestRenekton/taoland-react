import React, { memo, useState, useRef, useEffect } from 'react';
import { PlayArrow, Pause } from '@material-ui/icons';

import { CircularProgress } from '@material-ui/core';
import styles from './MusicPlayer.less';
import { useEventListener } from '@/hooks';


interface IMusicPlayer {

}


export const MusicPlayer: React.SFC<IMusicPlayer> = memo(() => {
    // console.log('MusicPlayer',props)
    //= =====================data======================
    const [play, setPlay] = useState(false);
    const [progress, setProgress] = useState(0);
    const audio = useRef<HTMLAudioElement>();
    //= =====================function======================
    const changePlay = (flag: boolean) => {
        if (flag) {
            audio.current.play();
            // duration
            // currentTime
        } else {
            audio.current.pause();
        }
        setPlay(flag);
    };
    // 监听进度条
    const timeupdateHandler = () => {
        let { duration } = audio.current;
        let { currentTime } = audio.current;
        // console.log((currentTime / duration * 100).toFixed(2));
        setProgress(Number((currentTime / duration * 100).toFixed(2)));
    };
    //= =====================effect======================
    useEventListener('timeupdate', timeupdateHandler, audio.current);
    useEffect(() => {
        audio.current.volume = 0.2;
    }, []);
    //= =====================render======================
    return (
        <div className={styles.playerBox}>
            <audio id="PLAYER" preload="preload" loop ref={audio}>
                <source src="/audio/bgm.mp3" type="audio/mpeg" />
            </audio>
            <CircularProgress
              variant="static"
              value={progress}
              className={`${styles.progress} ${play ? styles.play : ''}`}
            />
            {
                play
                    ? <Pause onClick={() => { changePlay(false); }} fontSize="large" className={styles.playIcon} />
                    : <PlayArrow onClick={() => { changePlay(true); }} fontSize="large" className={styles.playIcon} />
            }

        </div>
    );
});
