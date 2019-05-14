import * as PIXI from 'pixi.js';

export default class Ac extends PIXI.Container {
	/** Armor class **/
	public ac: number;

	private _barAc: PIXI.Text;

	constructor() {
		super();

		this._barAc = new PIXI.Text(
			this.ac ? `${this.ac}` : '',
			new PIXI.TextStyle({
				fill: '#fff',
				fontSize: 30
			})
		);
		this._barAc.anchor.set(0.5, 0.5);
		this.addChild(this._barAc);
	}

	redraw = (): void => {
		if (!this.ac) {
			this._barAc.text = '';
			return;
		}

		this._barAc.position.set(0, 0);
		this._barAc.text = `${this.ac || ''}`;
	};
}
