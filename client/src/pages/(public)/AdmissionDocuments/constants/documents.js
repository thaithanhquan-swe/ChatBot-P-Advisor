export const DOCUMENT_TYPES = ['Tất cả định dạng', 'PDF', 'DOCX', 'TXT'];

export const FILE_TYPE_MAPPING = {
  PDF: 'application/pdf',
  DOCX: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  TXT: 'text/plain',
};

export function getFileTypeLabel(fileType) {
  if (!fileType) return 'FILE';
  const typeStr = fileType.toLowerCase();

  if (typeStr === 'pdf' || typeStr.includes('application/pdf')) return 'PDF';
  if (
    typeStr === 'docx' ||
    typeStr === 'doc' ||
    typeStr.includes('wordprocessingml') ||
    typeStr.includes('msword')
  ) {
    return 'DOCX';
  }
  if (typeStr === 'txt' || typeStr.includes('text/plain')) return 'TXT';

  if (fileType.length <= 5) return fileType.toUpperCase();
  return 'FILE';
}

export function formatFileSize(bytes) {
  if (bytes === undefined || bytes === null || Number.isNaN(Number(bytes))) return '-';
  if (typeof bytes === 'string' && (bytes.includes('KB') || bytes.includes('MB') || bytes.includes('B'))) {
    return bytes;
  }
  const num = Number(bytes);
  if (num === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(num) / Math.log(k));
  return `${parseFloat((num / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

export function formatDate(value) {
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

