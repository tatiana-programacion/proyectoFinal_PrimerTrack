import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'
import SocialNetwork from '../components/SocialNetwork/SocialNetwork';

test('Redes sociales', () => {
    const {container} = render(<SocialNetwork />);
  
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const boxes = container.getElementsByClassName('fa-brands');
    expect(boxes.length).toBe(4);
});

describe('Redes sociales', () => {
  it('Renderiza apropiadamente', () => {
    const view = render(<SocialNetwork />);
    expect(view.container).toBeInTheDocument();
  })

  it('4 redes sociales', () => {
    render(<SocialNetwork/>);
    expect(screen.getAllByTestId('social')).toHaveLength(4)
  })
})