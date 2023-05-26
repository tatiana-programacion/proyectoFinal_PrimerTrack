import {render} from '@testing-library/react'
import AdminForm from '../components/AdminForm/AdminForm';

const onLoadCities = () =>{
  console.log("Cargar ciudades")
}
const onLoadCategories = () =>{
    console.log("Cargar categorias")
  }  

describe('Admin Form', () => {
    const view = render(<AdminForm onLoadCities={onLoadCities} onLoadCategories={onLoadCategories}/>);
    it('Renderiza apropiadamente', () => {
      expect(view.container).toBeInTheDocument();
    })
})