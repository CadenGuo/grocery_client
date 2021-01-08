import React from 'react';
import {
  Button,
  Input,
} from 'antd';
import { EditTwoTone } from '@ant-design/icons';

interface IPropsWithDisplayText {
  onChangeSubmit: (newContent: string) => void;
  displayingText: string;
  buttonSize?: 'small' | 'large';
  inputSize?: 'small' | 'large';
  inputStyle?: object;
  disabled?: boolean;
}

interface IPropsWithOriginalComponent {
  onChangeSubmit: (newContent: string) => void;
  originalTextComponent?: React.ReactNode;
  buttonSize?: 'small' | 'large';
  inputSize?: 'small' | 'large';
  inputStyle?: object;
  disabled?: boolean;
}

// interface IOwnProps extends (IPropsWithDisplayText || IPropsWithOriginalComponent)

type States = {
  isEditing: boolean;
};

type Props = IPropsWithDisplayText & IPropsWithOriginalComponent;

class EditableText extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isEditing: false,
    };
  }

  static defaultProps = {
    buttonSize: null,
    inputSize: null,
    disabled: false,
  };

  closeEditing = () => {
    this.setState({
      isEditing: false,
    });
  }

  onCheckClick = () => {
    const { onChangeSubmit } = this.props;
    const newContent = (document.getElementById('editable-text-input') as HTMLInputElement).value;
    onChangeSubmit(newContent);
    this.closeEditing();
  }

  getEditingComponent = () => {
    const {
      buttonSize,
      inputSize,
      inputStyle,
      displayingText,
    } = this.props;
    return (
      <div className="flex-start-justify-container">
        <Input
          id="editable-text-input"
          size={inputSize}
          style={inputStyle || { minWidth: 300 }}
          defaultValue={displayingText}
        />
        &nbsp;
        <Button type="primary" size={buttonSize} icon="check" onClick={this.onCheckClick} />
        &nbsp;
        <Button icon="close" size={buttonSize} onClick={this.closeEditing} />
      </div>
    );
  }

  render() {
    const {
      displayingText,
      originalTextComponent,
      disabled,
    } = this.props;
    const { isEditing } = this.state;
    return (<span>
      {
        isEditing ? this.getEditingComponent()
          : <span>
            {originalTextComponent || displayingText}&nbsp;
            {!disabled && <EditTwoTone onClick={() => this.setState({ isEditing: true })} />}
          </span>
      }
    </span>);
  }
}

export default EditableText;
