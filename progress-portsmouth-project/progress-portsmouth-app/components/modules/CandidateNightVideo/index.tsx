import * as React from 'react';
import { CssBaseline, Box, Typography, Container } from '@mui/material';

import { Island } from '@hubspot/cms-components';
import { logInfoDebugOnly } from '@hubspot/cms-components';

import YouTubePlayerIsland from './YouTubePlayerIsland?island';

// TODO remove, this demo shouldn't need to reset the theme.
// const defaultTheme = createTheme();

export { fields } from './fields.jsx';
export const meta = {
  label: `Candidate Detail Module`,
};

export const query = `
query CandidateQuery {
  HUBDB {
    candidate_night_2023_collection {
      items {
        start_time
        question
        associations {
          candidates_collection__candidate {
            items {
              hs_path
            }
          }
        }
      }
    }
  }
}
`;

export const Component = (props) => {
  const candidateHSPATH = props.hublParameters?.hs_path || 'josh-denton';

  logInfoDebugOnly(props.hublParameters);

  const startTimes =
    props.dataQueryResult.data.HUBDB.candidate_night_2023_collection.items;

  const candidateStartTimes = startTimes.filter((time) => {
    if (
      time.associations === null ||
      time.associations.candidates_collection__candidate.items === null
    ) {
      return false;
    }

    return (
      time.associations.candidates_collection__candidate.items[0]?.hs_path ===
      candidateHSPATH
    );
  });

  return (
    <>
      <CssBaseline />
      <main>
        <Container maxWidth="lg">
          <Box
            sx={{
              bgcolor: 'background.paper',
              pt: 8,
              pb: 6,
            }}
            alignItems={'center'}
            display={'flex'}
            flexDirection={'column'}
          >
            <Typography
              sx={{ py: 4 }}
              component="h2"
              variant="h2"
              align="center"
              color="text.primary"
            >
              Candidate Night
            </Typography>
            {candidateStartTimes && (
              <Island
                module={YouTubePlayerIsland}
                startTimes={candidateStartTimes}
              />
            )}
          </Box>
        </Container>
      </main>
    </>
  );
};
