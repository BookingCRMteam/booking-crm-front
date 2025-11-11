export const formattedPhone = (phone?: string | null): string => {
  if (!phone) return '';

  const digits = phone.replace(/\D/g, '');

  if (digits.length === 12 && digits.startsWith('380')) {
    return digits.replace(
      /(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/,
      '+$1 $2 $3 $4 $5',
    );
  }

  if (digits.length === 10 && digits.startsWith('0')) {
    return digits.replace(/0(\d{2})(\d{3})(\d{2})(\d{2})/, '+380 $1 $2 $3 $4');
  }

  return phone.trim();
};
