import { render } from '@testing-library/react';

import PartnerSection from './PartnerSection';

describe('PartnerSection', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PartnerSection />);
    expect(baseElement).toBeTruthy();
  });
});
