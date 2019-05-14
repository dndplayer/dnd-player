import * as PIXI from 'pixi.js';

export default class Healthbar extends PIXI.Container {
	/** Current HP level **/
	public hp: number;
	/** Maximum HP level **/
	public hpMax: number;
	/** Armor class **/
	public ac: number;

	public showText: boolean = false;

	private _barGraphic: PIXI.Graphics;
	private _barText: PIXI.Text;
	private _barAc: PIXI.Text;

	private _barWidth: number;
	private _barHeight: number;

	private _lastTargetWidth: number = 0;

	constructor() {
		super();

		this._barGraphic = new PIXI.Graphics();
		this._barText = new PIXI.Text(
			this.hpMax ? `${this.hp}/${this.hpMax}` : '',
			new PIXI.TextStyle({ fontSize: 18, fontWeight: 'bold' })
		);
		this._barAc = new PIXI.Text(
			this.ac ? `${this.ac}` : '',
			new PIXI.TextStyle({
				fill: '#fff',
				fontSize: 30
			})
		);
		this._barText.anchor.set(0.5, 0.5);
		this._barAc.anchor.set(0.5, 1);

		this.interactive = true; // Required for hover showing HP text

		this.addChild(this._barGraphic);
		this.addChild(this._barText);
		this.addChild(this._barAc);
	}

	/**
	 * Return the current healthbar calculated width
	 **/
	get barWidth(): number {
		return this._barWidth;
	}

	/**
	 * Return the current healthbar calculated height
	 **/
	get barHeight(): number {
		return this._barHeight;
	}

	/**
	 * Re draws the Graphic based on the current state. Call to force a refresh of the healthbar.
	 * @param targetWidth Specify the desired width of the healthbar - usually an associated Sprite
	 **/
	redraw = (targetWidth?: number): void => {
		if (!this.hpMax) {
			this._barText.text = '';
			return;
		}

		const healthbarMinWidth = 200;
		const healthbarHeight = 20;
		const healthbarMinorTick = 15;
		const healthbarMajorTick = 60;
		const healthbarPercent = this.hp / this.hpMax;

		this._lastTargetWidth = targetWidth || this._lastTargetWidth;

		const hbWidth = Math.max(healthbarMinWidth, this._lastTargetWidth);

		this._barWidth = hbWidth;
		this._barHeight = healthbarHeight;

		this._barGraphic
			.clear()
			.beginFill(0)
			.drawRect(0, 0, hbWidth, healthbarHeight)
			.endFill();

		// Main bar
		this._barGraphic
			.beginFill(0x61c02d)
			.drawRect(1, 1, hbWidth * healthbarPercent - 2, healthbarHeight - 2)
			.endFill();

		// Shading
		this._barGraphic
			.beginFill(0xffffff, 0.3)
			.drawRect(1, 1, hbWidth * healthbarPercent - 2, 3)
			.endFill()
			.beginFill(0, 0.3)
			.drawRect(1, healthbarHeight - 4, hbWidth * healthbarPercent - 2, 3)
			.endFill();

		this._barGraphic.beginFill(0, 0.9);
		for (let i = healthbarMinorTick; i < this.hp; i += healthbarMinorTick) {
			if (!(i % healthbarMajorTick)) {
				this._barGraphic.drawRect((i / this.hpMax) * hbWidth - 1, 0, 2, healthbarHeight);
			} else {
				this._barGraphic.drawRect((i / this.hpMax) * hbWidth - 0.5, 0, 1, healthbarHeight);
			}
		}
		this._barGraphic.endFill();

		// Match hit area to bar graphic
		this._barGraphic.hitArea = new PIXI.Rectangle(0, 0, hbWidth, healthbarHeight);

		this._barText.position.set(hbWidth / 2, healthbarHeight / 2);
		// this._barText.width = this._barWidth;
		// this._barText.height = this._barHeight;
		this._barText.text = `${this.hp}/${this.hpMax}`;
		this._barText.style.fill = 'white';

		this._barText.visible = this.showText;
		this._barAc.position.set(hbWidth / 2, 0);
		this._barAc.text = `${this.ac || ''}`;
	};
}
