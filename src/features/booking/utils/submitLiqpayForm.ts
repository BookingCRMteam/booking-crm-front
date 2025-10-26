import DOMPurify from 'dompurify';

export const submitLiqpayForm = (htmlFormString: string) => {
  const sanitizedHtml = DOMPurify.sanitize(htmlFormString, {
    ALLOWED_TAGS: ['form', 'input', 'button'],
    ALLOWED_ATTR: ['action', 'method', 'name', 'value', 'type'],
  });

  const container = document.createElement('div');
  container.innerHTML = sanitizedHtml;

  const form = container.querySelector('form');

  if (form) {
    document.body.appendChild(form);
    try {
      form.submit();
    } finally {
      setTimeout(() => form.remove(), 0);
    }
  } else {
    throw new Error('Не вдалося створити форму оплати');
  }
};
