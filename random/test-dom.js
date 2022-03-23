test('EXAMPLE: should get #fakeAppRoot', () => {
  const bodyElement = screen.getByTestId('body-element');

  expect(bodyElement).toContainHTML('<div data-testid="fakeAppRoot"></div>');

  expect(screen.getByTestId('fakeAppRoot')).toBeDefined();
});
