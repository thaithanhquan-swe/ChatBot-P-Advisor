export const DOCUMENT_STATUS = {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
  ARCHIVED: 'ARCHIVED',
};

export const DOCUMENT_STATUS_OPTIONS = Object.values(DOCUMENT_STATUS);

export const DOCUMENT_FILE_TYPES = [
  {
    value: 'application/pdf',
    label: 'PDF',
  },
  {
    value: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    label: 'DOCX',
  },
  {
    value: 'text/plain',
    label: 'TXT',
  },
];
