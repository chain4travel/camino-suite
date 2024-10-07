import { render } from '@testing-library/react';

import CamBtn from './CamBtn';

describe('CamBtn', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CamBtn />);
    expect(baseElement).toBeTruthy();
  });
});
