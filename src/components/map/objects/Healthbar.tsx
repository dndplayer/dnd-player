import * as PIXI from 'pixi.js';

export default class Healthbar extends PIXI.Graphics {
	public hp: number;
	public hpMax: number;

	private _barWidth: number;
	private _barHeight: number;

	get barWidth(): number {
		return this._barWidth;
	}

	get barHeight(): number {
		return this._barHeight;
	}

	redraw = (targetWidth: number, targetHeight: number): void => {
		const healthbarMinWidth = 128;
		const healthbarHeight = 64;
		const healthbarPercent = this.hp / this.hpMax;

		const hbWidth = Math.max(healthbarMinWidth, targetWidth);

		this._barWidth = hbWidth;
		this._barHeight = healthbarHeight;

		this.clear();
		this.beginFill(0x761633);
		this.drawRect(0, 0, hbWidth, healthbarHeight);
		this.endFill();

		this.beginFill(0xff0000);
		this.drawRect(0, 0, hbWidth * healthbarPercent, healthbarHeight);
		this.endFill();
	};
}
