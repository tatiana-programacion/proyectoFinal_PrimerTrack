import {render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from '../context/UserContext';
import FormLogin from '../components/FormLogin/FormLogin';

describe('Buscador', () => {
    const view = render(
        <UserProvider>
            <BrowserRouter>
                <FormLogin/>
            </BrowserRouter>
            
        </UserProvider>
    );
    it('Renderiza apropiadamente', () => {
      expect(view.container).toBeInTheDocument();
    })
})