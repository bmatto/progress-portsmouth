import * as React from 'react';
import {
  CssBaseline,
  Box,
  Typography,
  Container,
  Stack,
  Link,
  Divider,
  Card,
  CardMedia,
} from '@mui/material';

import { logInfo, Island } from '@hubspot/cms-components';

import YouTubePlayerIsland from './YouTubePlayerIsland?island';

// TODO remove, this demo shouldn't need to reset the theme.
// const defaultTheme = createTheme();

export { fields } from './fields.jsx';
export const meta = {
  label: `Candidate Detail Module`,
};

export const query = `
# $path: "{{ dynamic_page_hubdb_row.hs_path }}"
query CandidateQuery($path: String! = "josh-denton") {
  HUBDB {
    candidates(uniqueIdentifier: "hs_path", uniqueIdentifierValue: $path) {
      hs_id
    }
    candidate_night_2023_collection {
      items {
        start_time
        question
        associations {
          candidates_collection__candidate {
            items {
              hs_id
            }
          }
        }
      }
    }
  }
}

`;

export const Component = (props) => {
  const candidate = props.dataQueryResult.data.HUBDB.candidates;
  const candidateHSID = candidate.hs_id;

  const startTimes =
    props.dataQueryResult.data.HUBDB.candidate_night_2023_collection.items;

  const candidateStartTimes = startTimes.filter((time) => {
    return (
      time.associations.candidates_collection__candidate.items[0]?.hs_id ===
      candidateHSID
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
