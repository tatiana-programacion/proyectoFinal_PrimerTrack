import {render} from '@testing-library/react'
import AdminPolicies from '../components/AdminPolicies/AdminPolicies';

describe('Administrador -> politicas', () => {
    const view = render(<AdminPolicies/>);
    it('Renderiza apropiadamente', () => {
      expect(view.container).toBeInTheDocument();
    })
})