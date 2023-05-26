import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'
import Footer from '../components/Footer/Footer';


test('Renderizar footer correctamente', () => {
    const view = render(<Footer />);
    expect(view.container).toBeInTheDocument();
});

test('Texto del footer', () => {
    render(<Footer/>)
    expect(screen.getByText('©2021 Digital Booking')).toBeInTheDocument();
})