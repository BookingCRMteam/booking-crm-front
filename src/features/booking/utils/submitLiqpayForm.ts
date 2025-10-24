export const submitLiqpayForm = (htmlFormString: string) => {
  const container = document.createElement('div');
  container.innerHTML = htmlFormString;

  const form = container.querySelector('form');

  if (form) {
    document.body.appendChild(form);
    form.submit();
  } else {
    throw new Error('Не вдалося створити форму оплати');
  }
};
