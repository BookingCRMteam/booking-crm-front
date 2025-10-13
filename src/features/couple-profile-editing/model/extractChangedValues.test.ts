import { extractChangedValues } from './extractChangedValues';

interface TestFormValues {
  name: string;
  surname: string;
  age: number | null;
  email: string;
}

describe('extractChangedValues', () => {
  it('returns empty object when no fields are dirty', () => {
    const dirtyFields: Partial<Record<keyof TestFormValues, boolean>> = {};
    const data: TestFormValues = {
      name: 'Іван',
      surname: 'Коваленко',
      age: 30,
      email: 'ivan@example.com',
    };

    const result = extractChangedValues<TestFormValues>(dirtyFields, data);

    expect(result).toEqual({});
  });

  it('returns only a single changed field', () => {
    const dirtyFields = { name: true };
    const data = {
      name: 'New Name',
      surname: 'Коваленко',
      age: 30,
      email: 'ivan@example.com',
    };

    const result = extractChangedValues<TestFormValues>(dirtyFields, data);

    expect(result).toEqual({ name: 'New Name' });
  });

  it('returns multiple changed fields, ignoring unchanged ones', () => {
    const dirtyFields = { name: true, age: true };
    const data = {
      name: 'New Name',
      surname: 'Коваленко',
      age: 35,
      email: 'ivan@example.com',
    };

    const result = extractChangedValues<TestFormValues>(dirtyFields, data);

    expect(result).toEqual({ name: 'New Name', age: 35 });
  });

  it('handles null values correctly', () => {
    const dirtyFields = { age: true };
    const data = {
      name: 'Іван',
      surname: 'Коваленко',
      age: null,
      email: 'ivan@example.com',
    };

    const result = extractChangedValues<TestFormValues>(dirtyFields, data);

    expect(result).toEqual({ age: null });
  });

  it('returns all fields when all are dirty', () => {
    const dirtyFields = { name: true, surname: true, age: true, email: true };
    const data = { name: 'A', surname: 'B', age: 10, email: 'c@d.com' };

    const result = extractChangedValues<TestFormValues>(dirtyFields, data);

    expect(result).toEqual(data);
  });
});
