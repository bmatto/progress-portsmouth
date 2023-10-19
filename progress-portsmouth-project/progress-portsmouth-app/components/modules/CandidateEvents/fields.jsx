import {
  ModuleFields,
  TextField,
  RichTextField,
} from '@hubspot/cms-components/fields';

export const fields = (
  <ModuleFields>
    <TextField
      label="Candidates Title"
      name="candidateEventsTitle"
      default="Candidate Events 2023"
    />
    <RichTextField
      label="Candidates Description"
      name="candidatesEventsDescription"
      default="Something short and leading about the collection below—its
              contents, the creator, etc. Make it short and sweet, but not too
              short so folks don't simply skip over it entirely."
    />
  </ModuleFields>
);
