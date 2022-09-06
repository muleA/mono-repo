import { render } from '@testing-library/react';

import SharedTable from './shared-table';

describe('SharedTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SharedTable />);
    expect(baseElement).toBeTruthy();
  });
});
