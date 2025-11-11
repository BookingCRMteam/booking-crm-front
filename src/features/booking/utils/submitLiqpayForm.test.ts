import DOMPurify from 'dompurify';

import { submitLiqpayForm } from './submitLiqpayForm';

describe('submitLiqpayForm', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    jest.useFakeTimers();

    jest
      .spyOn(HTMLFormElement.prototype, 'submit')
      .mockImplementation(() => {});
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('appends the form, submits it, and then removes it', () => {
    const html = `<form action="/pay" method="POST">
      <input name="amount" value="100" type="hidden"/>
      <button type="submit">Pay</button>
    </form>`;

    submitLiqpayForm(html);

    const formInDom = document.body.querySelector('form');
    expect(formInDom).toBeInTheDocument();

    jest.runAllTimers();

    expect(document.body.querySelector('form')).toBeNull();
  });

  it('throws an error if no form is found', () => {
    const html = `<div>No form here</div>`;
    expect(() => submitLiqpayForm(html)).toThrow(
      'Не вдалося створити форму оплати',
    );
  });

  it('sanitizes html using DOMPurify', () => {
    const html = `<form action="/pay"><script>alert("hack")</script></form>`;
    const sanitizeSpy = jest.spyOn(DOMPurify, 'sanitize');

    try {
      submitLiqpayForm(html);
    } catch {}

    expect(sanitizeSpy).toHaveBeenCalledWith(html, {
      ALLOWED_TAGS: ['form', 'input', 'button'],
      ALLOWED_ATTR: ['action', 'method', 'name', 'value', 'type'],
    });
  });
});
