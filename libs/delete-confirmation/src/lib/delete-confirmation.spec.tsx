import { render } from '@testing-library/react';

import DeleteConfirmation from './delete-confirmation';

describe('DeleteConfirmation', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DeleteConfirmation showModal={false} hideModal={false} confirmModal={undefined} id={''} deleteStatus={undefined} />);
    expect(baseElement).toBeTruthy();
  });
});
