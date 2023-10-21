import { Stack, Link, Divider } from '@mui/material';
import { useRef } from 'react';
import YouTube from 'react-youtube';

const OPENING_STATEMENT = 'Opening Statement';

export default function YouTubePlayerIsland({ startTimes }) {
  const player = useRef();

  const openingStatementStartTime =
    startTimes.find((time) => {
      return time.question === OPENING_STATEMENT;
    }) || 0;

  const handleQuestion = (startTime, event) => {
    event.preventDefault();
    player.current.internalPlayer.seekTo(startTime);
    return false;
  };

  const setOpeningStartTimeOnReady = (event) => {
    event.target.seekTo(openingStatementStartTime.start_time);
  };

  return (
    <>
      <YouTube
        ref={player}
        videoId={`T0ylrqsE_jM`}
        onReady={setOpeningStartTimeOnReady}
      />
      <Stack spacing={2} divider={<Divider orientation="vertical" flexItem />}>
        {startTimes.map((startTime) => {
          return (
            <Link
              key={startTime.start_time}
              href="#"
              onClick={handleQuestion.bind(null, startTime.start_time)}
            >
              {startTime.question}
            </Link>
          );
        })}
      </Stack>
    </>
  );
}
