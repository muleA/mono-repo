import { render } from '@testing-library/react';

import EntityList from './entity-list';

describe('EntityList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EntityList />);
    expect(baseElement).toBeTruthy();
  });
});
