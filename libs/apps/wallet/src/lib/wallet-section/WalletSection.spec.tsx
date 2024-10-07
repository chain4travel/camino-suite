import { render } from '@testing-library/react';

import WalletSection from './WalletSection';

describe('WalletSection', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WalletSection />);
    expect(baseElement).toBeTruthy();
  });
});
