import * as React from 'react';
import {
  Card,
  CardContent,
  CssBaseline,
  Grid,
  Box,
  Typography,
  Container,
} from '@mui/material';

// TODO remove, this demo shouldn't need to reset the theme.
// const defaultTheme = createTheme();

export { fields } from './fields.jsx';
export const meta = {
  label: `Candidate Events`,
};

export const query = `
query CandidatesQuery {
  HUBDB {
    election_events_2023_collection(orderBy: date__asc) {
      items {
        hs_id
        what
        when
        where
        time
      }
    }
  }
}
`;

const CandidateEvent = (props) => {
  return (
    <Grid item xs={12} sm={6} md={6}>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CardContent>
          <Typography align="center" component="h2" variant="h5">
            {props.when}
          </Typography>
          <Typography
            component="div"
            variant="subtitle1"
            sx={{ py: 1 }}
            align="center"
            dangerouslySetInnerHTML={{
              __html: props.time,
            }}
          />
          <Typography
            variant="subtitle2"
            sx={{ py: 0 }}
            align="center"
            component="div"
            dangerouslySetInnerHTML={{
              __html: props.where,
            }}
          ></Typography>
          <Typography
            align="center"
            component="div"
            variant="body1"
            sx={{
              py: 2,
            }}
            dangerouslySetInnerHTML={{
              __html: props.what,
            }}
          ></Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

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
              component="h3"
              variant="h3"
              align="center"
              color="text.primary"
              gutterBottom
            >
              {props.fieldValues.candidateEventsTitle}
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              {props.fieldValues.candidatesEventsDescription}
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 0 }} maxWidth="md">
          <Grid container spacing={4}>
            {props.dataQueryResult.data.HUBDB.election_events_2023_collection.items.map(
              (event) => (
                <CandidateEvent key={event.hs_id} {...event} />
              ),
            )}
          </Grid>
        </Container>
      </main>
    </>
  );
};
