import * as React from 'react';
import { CssBaseline, Box, Typography, Container } from '@mui/material';

// TODO remove, this demo shouldn't need to reset the theme.
// const defaultTheme = createTheme();

export { fields } from './fields.jsx';
export const meta = {
  label: `Candidate Detail Module`,
};

export const query = `
# $path: "{{ dynamic_page_hubdb_row.hs_path }}"
query CandidateQuery($path: String! = "andrew-bagley") {
  HUBDB {
    candidates(uniqueIdentifier: "hs_path", uniqueIdentifierValue: $path) {
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
  }
}

`;

export const Component = (props) => {
  const candidate = props.dataQueryResult.data.HUBDB.candidates;

  return (
    <>
      <CssBaseline />
      <main>
        <Container maxWidth="sm">
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
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              {candidate.name}
            </Typography>
            <Box
              sx={{
                width: 300,
              }}
              component="img"
              src={candidate.photo.url}
            />
            <Box
              dangerouslySetInnerHTML={{
                __html: candidate.bio,
              }}
            />
          </Box>
        </Container>
      </main>
    </>
  );
};
