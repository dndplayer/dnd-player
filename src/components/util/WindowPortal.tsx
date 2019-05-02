import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const copyStyles = (sourceDoc, targetDoc) => {
	Array.from(sourceDoc.styleSheets).forEach(styleSheet => {
		try {
			if ((styleSheet as any).cssRules) {
				// for <style> elements
				const newStyleEl = sourceDoc.createElement('style');

				Array.from((styleSheet as any).cssRules).forEach(cssRule => {
					// write the text of each rule into the body of the style element
					newStyleEl.appendChild(sourceDoc.createTextNode((cssRule as any).cssText));
				});

				targetDoc.head.appendChild(newStyleEl);
			} else if ((styleSheet as any).href) {
				// for <link> elements loading CSS from a URL
				const newLinkEl = sourceDoc.createElement('link');

				newLinkEl.rel = 'stylesheet';
				newLinkEl.href = (styleSheet as any).href;
				targetDoc.head.appendChild(newLinkEl);
			}
		} catch (err) {}
	});
};

interface Props {
	title?: string;
	onClose?: () => void;
}

export default class WindowPortal extends Component<Props> {
	constructor(props: Props) {
		super(props);

		this.containerEl = document.createElement('div');
		this.externalWindow = null;
	}

	private containerEl: any;
	private externalWindow: any;

	render(): any {
		return ReactDOM.createPortal(this.props.children, this.containerEl);
	}

	componentDidMount() {
		this.externalWindow = window.open(
			'',
			'',
			'width=600,height=400,left=200,top=200,toolbar=no,menubar=no,scrollbars=yes,resizable=yes'
		);

		this.externalWindow.document.body.appendChild(this.containerEl);

		this.externalWindow.document.title = this.props.title || '';

		copyStyles(document, this.externalWindow.document);

		this.externalWindow.addEventListener(
			'beforeunload',
			() => this.props.onClose && this.props.onClose()
		);
	}

	componentWillUnmount() {
		this.externalWindow.close();
	}
}
