import * as React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CssBaseline,
  Grid,
  Box,
  Typography,
  Container,
} from '@mui/material';

import styles from './candidates.module.css';

// TODO remove, this demo shouldn't need to reset the theme.
// const defaultTheme = createTheme();

export { fields } from './fields.jsx';
export const meta = {
  label: `Candidates Module`,
};

export const query = `
query CandidatesQuery {
  HUBDB {
    candidates_collection {
      items {
        name
        photo
        bio
        position_on_issues
        video
        incumbent
        hs_path
        hs_id
      }
    }
  }
}
`;

export const Component = (props) => {
  return (
    <>
      <CssBaseline />
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              {props.fieldValues.candidateTitle}
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              {props.fieldValues.candidatesDescription}
            </Typography>
            {/* <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">Main call to action</Button>
              <Button variant="outlined">Secondary action</Button>
            </Stack> */}
          </Container>
        </Box>
        <Container sx={{ py: 0 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {props?.dataQueryResult.data.HUBDB.candidates_collection.items.map(
              (candidate) => {
                return (
                  <Grid item key={candidate.hs_id} xs={12} sm={6} md={4}>
                    <Card
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                      className={candidate?.incumbent && styles.incumbentCard}
                    >
                      {candidate.photo && (
                        <CardMedia
                          component="div"
                          sx={{
                            // 16:9
                            pt: '100%',
                          }}
                          image={candidate.photo.url}
                        />
                      )}

                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {candidate.name}
                        </Typography>
                        <div
                          style={{
                            maxHeight: '150px',
                            overflow: 'hidden',
                          }}
                          dangerouslySetInnerHTML={{
                            __html: candidate.bio,
                          }}
                        />
                      </CardContent>
                      {candidate.hs_path && (
                        <CardActions>
                          <Button
                            href={`/candidate/${candidate.hs_path}`}
                            size="small"
                          >
                            Read More
                          </Button>
                        </CardActions>
                      )}
                    </Card>
                  </Grid>
                );
              },
            )}
          </Grid>
        </Container>
      </main>
    </>
  );
};
