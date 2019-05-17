import React, { ReactNode } from 'react';
import { ObserveKeys, HotKeys } from 'react-hotkeys';
import stringMath from 'string-math';

interface Props {
	value: number;
	onEnter: (newVal: number) => void;
}

interface State {
	newValue: string;
}

const keyMap = {
	ENTER: 'enter',
	CANCEL: 'esc'
};

export default class InlineCalculator extends React.Component<Props, State> {
	constructor(props) {
		super(props);
		this.state = {
			newValue: props.value.toString()
		};
	}

	handlers = {
		ENTER: (): void => this.onEnter(),
		CANCEL: (): void => this.onCancel()
	};

	_input: HTMLInputElement;

	componentDidUpdate(prevProps: Props): void {
		if (prevProps.value !== this.props.value) {
			this.setState({
				newValue: this.props.value.toString()
			});
		}
	}

	render(): ReactNode {
		const onChange = this.onChange.bind(this);
		const onCancel = this.onCancel.bind(this);
		const onFocus = this.onFocus.bind(this);
		return (
			<HotKeys keyMap={keyMap} handlers={this.handlers}>
				<ObserveKeys only={Object.values(keyMap)} except={undefined}>
					<input
						ref={i => (this._input = i)}
						value={this.state.newValue}
						onChange={onChange}
						onBlur={onCancel}
						onFocus={onFocus}
					/>
				</ObserveKeys>
			</HotKeys>
		);
	}

	onChange(e: React.ChangeEvent<HTMLInputElement>): void {
		this.setState({ newValue: e.target.value });
	}

	onEnter(): void {
		let val = this.state.newValue;
		if (val[0] === '-' || val[0] === '+') {
			val = this.props.value + val;
		}
		this.props.onEnter(stringMath(val));
		this._input.blur();
	}

	onFocus(): void {
		setTimeout(
			(): number =>
				(this._input.selectionStart = this._input.selectionEnd = this.state.newValue.length),
			0
		);
	}

	onCancel(): void {
		this._input.blur();
		this.setState({ newValue: this.props.value.toString() });
	}
}
