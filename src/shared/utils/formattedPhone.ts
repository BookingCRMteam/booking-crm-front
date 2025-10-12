export const formattedPhone = (phone?: string | null): string => {
  if (!phone) return '';

  let digits = phone.replace(/\D/g, '');

  if (digits.startsWith('380')) {
    digits = digits.slice(2);
  }

  if (digits.length !== 10) return phone.trim();

  return digits.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4');
};
