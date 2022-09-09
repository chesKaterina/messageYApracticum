import Block from '../../utils/Block';
import template from './input.hbs';

interface InputProps {
  events: {
    click: () => void;
    change: ()=> void;
  };
  className: string;
  type?: string;
  placeholder?: string;
}

export class Input extends Block {
  constructor(props: InputProps) {
    super('input', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
