import {render} from '@testing-library/react'
import Search from '../components/Search/Search';

const onLoadCities = () =>{
  console.log("Cargar ciudades")
} 

describe('Buscador', () => {
    const view = render(<Search onLoadCities={onLoadCities}/>);
    it('Renderiza apropiadamente', () => {
      expect(view.container).toBeInTheDocument();
    })

})