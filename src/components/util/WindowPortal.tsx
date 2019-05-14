import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const copyStyles = (sourceDoc, targetDoc) => {
	Array.from(sourceDoc.styleSheets).forEach((styleSheet: any) => {
		try {
			if (styleSheet.href) {
				const newLinkEl = sourceDoc.createElement('link');
				newLinkEl.href = styleSheet.href;
				newLinkEl.rel = 'stylesheet';
				targetDoc.head.appendChild(newLinkEl);
			} else if (styleSheet.cssRules) {
				// for <style> elements
				const newStyleEl = sourceDoc.createElement('style');

				Array.from(styleSheet.cssRules).forEach((cssRule: any) => {
					// write the text of each rule into the body of the style element
					newStyleEl.appendChild(sourceDoc.createTextNode(cssRule.cssText));
				});

				targetDoc.head.appendChild(newStyleEl);
			}
		} catch (err) {}
	});
};

interface Props {
	title?: string;
	onClose?: () => void;
}

interface State {
	win: any;
	el: any;
}

export default class WindowPortal extends Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			win: null,
			el: null
		};
	}

	render(): any {
		const { el } = this.state;
		if (!el) {
			return null;
		}
		return ReactDOM.createPortal(this.props.children, el);
	}

	componentDidMount() {
		let win = window.open(
			'',
			'',
			'width=600,height=400,left=200,top=200,toolbar=no,menubar=no,scrollbars=yes,resizable=yes'
		);

		let el = document.createElement('div');

		win.document.body.appendChild(el);

		win.document.title = this.props.title || '';

		copyStyles(document, win.document);

		win.addEventListener('beforeunload', () => this.props.onClose && this.props.onClose());

		this.setState({
			win,
			el
		});
	}

	componentWillUnmount() {
		this.state.win.close();
	}
}
