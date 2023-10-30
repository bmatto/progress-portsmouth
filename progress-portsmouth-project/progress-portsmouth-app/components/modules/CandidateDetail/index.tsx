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

// TODO remove, this demo shouldn't need to reset the theme.
// const defaultTheme = createTheme();

import YouTubePlayerIsland from './YouTubePlayerIsland?island';

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
      hs_path
      photo
      position_on_issues
      video
      why_im_running
      name
      bio
      incumbent
      associations {
        candidate_night_2023_collection__candidate_night {
          items {
            question
            start_time
          }
        }
        candidate_social_links_collection__social_links {
          items {
            platform
            link
          }
        }
      }
    }
  }
}

`;

export const Component = (props) => {
  const candidate = props.dataQueryResult.data.HUBDB.candidates;
  const candidateSocialLinks =
    candidate.associations.candidate_social_links_collection__social_links
      .items;
  const candidateNightQuestions =
    candidate.associations.candidate_night_2023_collection__candidate_night
      .items;

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
              component="h1"
              variant="h1"
              align="center"
              color="text.primary"
            >
              {candidate.name}
            </Typography>
            <Box
              sx={{
                width: 300,
                py: 5,
              }}
              component="img"
              src={candidate.photo.url}
            />
            <Typography
              component="h2"
              variant="h2"
              align="center"
              color="text.primary"
            >
              Candidate Bio
            </Typography>
            <Box
              sx={{
                py: 3,
              }}
              dangerouslySetInnerHTML={{
                __html: candidate.bio,
              }}
            />
            {candidate.why_im_running && (
              <>
                <Typography
                  component="h2"
                  variant="h2"
                  align="center"
                  color="text.primary"
                >
                  Why I'm Running
                </Typography>
                <Box
                  sx={{
                    py: 3,
                  }}
                  dangerouslySetInnerHTML={{
                    __html: candidate.why_im_running,
                  }}
                />
              </>
            )}
            {candidate.video && (
              <>
                <Typography
                  component="h2"
                  variant="h2"
                  align="center"
                  color="text.primary"
                >
                  Candidate Video
                </Typography>
                <Card sx={{ py: 4 }}>
                  <CardMedia
                    sx={{ maxWidth: 600 }}
                    controls={true}
                    component="video"
                    src={candidate.video.url}
                  />
                </Card>
              </>
            )}

            <Box
              sx={{
                bgcolor: 'background.paper',
                py: 6,
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
              {candidateNightQuestions && (
                <Island
                  module={YouTubePlayerIsland}
                  startTimes={candidateNightQuestions}
                />
              )}
            </Box>

            {candidateSocialLinks.length > 0 && (
              <>
                <Typography
                  sx={{ py: 3 }}
                  component="h3"
                  variant="h3"
                  align="center"
                  color="text.primary"
                >
                  Candidate Links
                </Typography>
                <Stack
                  direction="row"
                  spacing={2}
                  divider={<Divider orientation="vertical" flexItem />}
                >
                  {candidateSocialLinks.map((link) => {
                    logInfo(link.link);
                    return (
                      <Link key={link.link} target="_blank" href={link.link}>
                        {link.platform ? link.platform.label : ''}
                      </Link>
                    );
                  })}
                </Stack>
              </>
            )}

            {candidate.position_on_issues && (
              <>
                <Typography
                  sx={{ py: 3 }}
                  component="h3"
                  variant="h3"
                  align="center"
                  color="text.primary"
                >
                  Position On Issues
                </Typography>
                <Box
                  sx={{
                    py: 3,
                  }}
                  dangerouslySetInnerHTML={{
                    __html: candidate.position_on_issues,
                  }}
                />
              </>
            )}
          </Box>
        </Container>
      </main>
    </>
  );
};
