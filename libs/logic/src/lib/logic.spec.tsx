import { render } from '@testing-library/react';

import Logic from './logic';

describe('Logic', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Logic />);
    expect(baseElement).toBeTruthy();
  });
});
