import {render} from '@testing-library/react'
import AdminImages from '../components/AdminImages/AdminImages';

describe('Admin Images', () => {
    const view = render(<AdminImages/>);
    it('Renderiza apropiadamente', () => {
      expect(view.container).toBeInTheDocument();
    })
})