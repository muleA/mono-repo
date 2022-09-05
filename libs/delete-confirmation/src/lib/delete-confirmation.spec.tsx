import { render } from '@testing-library/react';

import DeleteConfirmation from './delete-confirmation';

describe('DeleteConfirmation', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DeleteConfirmation />);
    expect(baseElement).toBeTruthy();
  });
});
