import { render } from '@testing-library/react';

import SharedLayout from './shared-layout';

describe('SharedLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SharedLayout menus={[]} children={undefined} />);
    expect(baseElement).toBeTruthy();
  });
});
