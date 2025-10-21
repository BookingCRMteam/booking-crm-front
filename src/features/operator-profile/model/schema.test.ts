import { operatorProfileSchema } from './schema';

const createMockFile = (
  name: string,
  type: string,
  sizeInBytes: number = 100,
) => {
  const buffer = new Uint8Array(sizeInBytes);
  return new File([buffer], name, { type: type, lastModified: Date.now() });
};

describe('operatorProfileSchema', () => {
  it('should validate successfully with valid minimal data', () => {
    const data = {
      philosophy: 'A short philosophy.',
      description: 'A short description.',
      photo: undefined,
      removePhoto: false,
    };
    expect(() => operatorProfileSchema.parse(data)).not.toThrow();
  });

  it('should validate successfully with empty strings (optional fields)', () => {
    const data = {
      philosophy: '',
      description: '',
    };
    expect(() => operatorProfileSchema.parse(data)).not.toThrow();
  });

  it('should fail if philosophy exceeds 1000 characters', () => {
    const longText = 'A'.repeat(1001);
    const data = { philosophy: longText };

    expect(() => operatorProfileSchema.parse(data)).toThrow(
      'Максимальна довжина — 1000 символів',
    );
  });

  it('should fail if description exceeds 500 characters', () => {
    const longText = 'B'.repeat(501);
    const data = { description: longText };

    expect(() => operatorProfileSchema.parse(data)).toThrow(
      'Максимальна довжина — 500 символів',
    );
  });

  it('should fail if philosophy contains HTML tags', () => {
    const data = {
      philosophy: 'My philosophy with <script>alert(1)</script> tag',
    };

    expect(() => operatorProfileSchema.parse(data)).toThrow(
      'HTML-теги заборонені',
    );
  });

  it('should fail if description contains HTML tags', () => {
    const data = { description: 'Description with <b>bold</b> text' };

    expect(() => operatorProfileSchema.parse(data)).toThrow(
      'HTML-теги заборонені',
    );
  });

  it('should validate successfully with a valid image file (PNG)', () => {
    const validFile = createMockFile('valid.png', 'image/png');
    const data = { photo: validFile };

    expect(() => operatorProfileSchema.parse(data)).not.toThrow();
  });

  it('should validate successfully with a valid image file (JPEG)', () => {
    const validFile = createMockFile('valid.jpg', 'image/jpeg');
    const data = { photo: validFile };

    expect(() => operatorProfileSchema.parse(data)).not.toThrow();
  });

  it('should validate successfully with a file exactly at max size (5 MB)', () => {
    const maxSize = 5 * 1024 * 1024;
    const maxFile = createMockFile('max.png', 'image/png', maxSize);
    const data = { photo: maxFile };

    expect(() => operatorProfileSchema.parse(data)).not.toThrow();
  });

  it('should fail if photo file size exceeds 5 MB', () => {
    const oversized = 5 * 1024 * 1024 + 1;
    const oversizedFile = createMockFile(
      'oversized.jpeg',
      'image/jpeg',
      oversized,
    );
    const data = { photo: oversizedFile };

    expect(() => operatorProfileSchema.parse(data)).toThrow(
      'Файл має бути менше 5 МБ',
    );
  });

  it('should fail if photo file type is not accepted (e.g., GIF)', () => {
    const wrongTypeFile = createMockFile('doc.gif', 'image/gif');
    const data = { photo: wrongTypeFile };

    expect(() => operatorProfileSchema.parse(data)).toThrow(
      'Дозволено лише JPG або PNG',
    );
  });
});
