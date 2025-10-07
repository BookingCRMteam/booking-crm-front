export const formattedPhone = (phone: string): string => {
  if (!phone) return '';
  const cleanPhone = phone.startsWith('+38') ? phone.slice(3) : phone;
  const digits = cleanPhone.replace(/\D/g, '');
  if (digits.length !== 10) return cleanPhone;
  return digits.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4');
};
