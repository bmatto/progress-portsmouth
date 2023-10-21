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
      hs_path
      hs_name
      photo
      position_on_issues
      video
      why_im_running
      name
      bio
      incumbent
    }
    candidate_night_2023_collection {
      items {
        start_time
        question
        associations {
          candidates_collection__candidate {
            items {
              hs_id
              hs_path
            }
          }
        }
      }
    }
    candidate_social_links_collection {
      items {
        platform
        link
        associations {
          candidates_collection__candidate {
            items {
              hs_id
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
  const candidate = props.dataQueryResult.data.HUBDB.candidates;
  const candidateHSID = candidate.hs_id;
  const socialLinks =
    props.dataQueryResult.data.HUBDB.candidate_social_links_collection.items;
  const startTimes =
    props.dataQueryResult.data.HUBDB.candidate_night_2023_collection.items;

  const filteredSocialLinks = socialLinks.filter((link) => {
    return (
      link.associations.candidates_collection__candidate.items[0]?.hs_id ===
      candidateHSID
    );
  });

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
                <Card sx={{ py: 3 }}>
                  <CardMedia
                    controls={true}
                    component="video"
                    src={candidate.video.url}
                  />
                </Card>
              </>
            )}
            <Typography
              sx={{ py: 3 }}
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
          <Stack
            direction="row"
            spacing={2}
            divider={<Divider orientation="vertical" flexItem />}
          >
            {filteredSocialLinks.map((link) => {
              logInfo(link.link);
              return (
                <Link key={link.link} target="_blank" href={link.link}>
                  {link.platform ? link.platform.label : ''}
                </Link>
              );
            })}
          </Stack>
        </Container>
      </main>
    </>
  );
};
