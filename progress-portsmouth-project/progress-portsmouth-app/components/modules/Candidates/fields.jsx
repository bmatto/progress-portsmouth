import {
  ModuleFields,
  TextField,
  RichTextField,
} from '@hubspot/cms-components/fields';

export const fields = (
  <ModuleFields>
    <TextField
      label="Candidates Title"
      name="candidateTitle"
      default="Candidates"
    />
    <RichTextField
      label="Candidates Description"
      name="candidatesDescription"
      default="Something short and leading about the collection below—its
              contents, the creator, etc. Make it short and sweet, but not too
              short so folks don't simply skip over it entirely."
    />
  </ModuleFields>
);
