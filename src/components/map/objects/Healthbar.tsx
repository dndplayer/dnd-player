import * as PIXI from 'pixi.js';

export default class Healthbar extends PIXI.Container {
	/** Current HP level **/
	public hp: number;
	/** Maximum HP level **/
	public hpMax: number;

	/** Should the HP level text always show or only on mouse over? **/
	public alwaysShowText: boolean = false;

	private _barGraphic: PIXI.Graphics;
	private _barText: PIXI.Text;

	private _barWidth: number;
	private _barHeight: number;

	private _showText: boolean = false;

	private _lastTargetWidth: number = 0;

	constructor() {
		super();

		this._barGraphic = new PIXI.Graphics();
		this._barText = new PIXI.Text(
			this.hpMax ? `${this.hp}/${this.hpMax}` : '',
			new PIXI.TextStyle({ fontSize: 90, fontWeight: 'bold' })
		);
		this._barText.anchor.set(0.5, 0.5);

		this.interactive = true; // Required for hover showing HP text

		this.addChild(this._barGraphic);
		this.addChild(this._barText);

		this.on('added', this.onAdded);
		this.on('removed', this.onRemoved);
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

		const healthbarMinWidth = 240;
		const healthbarHeight = 100;
		const healthbarPercent = this.hp / this.hpMax;

		this._lastTargetWidth = targetWidth || this._lastTargetWidth;

		const hbWidth = Math.max(healthbarMinWidth, this._lastTargetWidth);

		this._barWidth = hbWidth;
		this._barHeight = healthbarHeight;

		this._barGraphic.clear();
		this._barGraphic.beginFill(0x761633);
		this._barGraphic.drawRect(0, 0, hbWidth, healthbarHeight);
		this._barGraphic.endFill();

		this._barGraphic.beginFill(0xff0000);
		this._barGraphic.drawRect(0, 0, hbWidth * healthbarPercent, healthbarHeight);
		this._barGraphic.endFill();

		// Match hit area to bar graphic
		this._barGraphic.hitArea = new PIXI.Rectangle(0, 0, hbWidth, healthbarHeight);

		this._barText.position.set(hbWidth / 2, healthbarHeight / 2);
		// this._barText.width = this._barWidth;
		// this._barText.height = this._barHeight;
		this._barText.text = `${this.hp}/${this.hpMax}`;
		this._barText.style.fill = 'white';

		this._barText.visible = this._showText;
	};

	onAdded = (): void => {
		this.on('mouseover', this.onMouseOver, this);
		this.on('mouseout', this.onMouseOut, this);
	};
	onRemoved = (): void => {
		this.off('mouseover');
		this.off('mouseout');
	};

	onMouseOver = (e: PIXI.interaction.InteractionEvent): void => {
		// TODO: Show HP text
		this._showText = true;

		this.redraw();
	};
	onMouseOut = (e: PIXI.interaction.InteractionEvent): void => {
		// TODO: Hide HP text
		this._showText = false;

		this.redraw();
	};
}
