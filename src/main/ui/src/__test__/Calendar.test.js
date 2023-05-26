import {render } from '@testing-library/react'
import Calendar from '../components/Calendar/Calendar';
import { BrowserRouter } from 'react-router-dom';

describe('Calendario', () => {
    const view = render(
        <BrowserRouter>
            <Calendar />
        </BrowserRouter>
        );
    it('Renderiza apropiadamente', () => {
      expect(view.container).toBeInTheDocument();
    })
})