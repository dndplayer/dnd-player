import * as PIXI from 'pixi.js';
import svg from './Ac.svg';

export default class Ac extends PIXI.Container {
	/** Armor class **/
	public ac: number;

	private _barAc: PIXI.Text;

	constructor() {
		super();

		this._barAc = new PIXI.Text(
			this.ac ? `${this.ac}` : '',
			new PIXI.TextStyle({
				fill: '#222',
				fontFamily:
					"-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;",
				fontSize: 200
			})
		);
		var texture = PIXI.Texture.from(svg);
		const sprite = new PIXI.Sprite(texture);
		sprite.width = 128;
		sprite.height = 96;
		sprite.anchor.set(0.4, 0.5);
		this.addChild(sprite);
		sprite.addChild(this._barAc);
		this._barAc.anchor.set(0.5, 0.5);
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
