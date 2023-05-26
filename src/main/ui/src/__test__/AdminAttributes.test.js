import {render} from '@testing-library/react'
import AdminAttributes from '../components/AdminAttributes/AdminAttributes';

const onLoadAttributes = () =>{
  console.log("Cargar ciudades")
} 

describe('Buscador', () => {
    const view = render(<AdminAttributes onLoadAttributes={onLoadAttributes}/>);
    it('Renderiza apropiadamente', () => {
      expect(view.container).toBeInTheDocument();
    })

})