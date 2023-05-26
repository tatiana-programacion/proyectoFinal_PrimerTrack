import {render} from '@testing-library/react'
import Body from '../components/Body/Body';

describe('Container body', () => {
    const view = render(<Body/>);
    it('Renderiza apropiadamente', () => {
      expect(view.container).toBeInTheDocument();
    })
})