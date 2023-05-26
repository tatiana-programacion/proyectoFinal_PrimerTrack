import {render} from '@testing-library/react'
import CardCategory from '../components/CardCategory/CardCategory';

const details = {
    imagenUrl: "https://0521ptc8n2-grupo4-img.s3.us-east-2.amazonaws.com/productos/HotelUno/HotelUnoImg01.jpg",
    titulo: "Titulo prueba",
    descripcion: "Descripcion de prueba"
}

describe('Card Category', () => {
    const view = render(<CardCategory details={details}/>);
    it('Renderiza apropiadamente', () => {
      expect(view.container).toBeInTheDocument();
    })
})