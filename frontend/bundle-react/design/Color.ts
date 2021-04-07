import assert from "../../bundle-logic/testing/Assert";
import { isNull, notNull } from "../../bundle-logic/testing/NullCheck";

export class Color {
  private rgb: [number, number, number];
  private hex: [string, string, string];

  constructor(color: string) {
    if (this.parseRgb(color)) {
      this.convertRgbToHex();
    } else if (this.parseHex(color)) {
      this.convertHexToRgb();
    } else {
      throw new Error("Unsupported color format");
    }
  }

  private parseRgb(color: string): boolean {
    let matchString = /(\d{1,3}), (\d{1,3}), (\d{1,3})/i;
    let match = matchString.exec(color);

    if (isNull(match)) {
      let matchWithRgbChars = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/i;
      match = matchWithRgbChars.exec(color);
    }

    if (notNull(match)) {
      const colors = match.map((color) => parseInt(color));
      this.rgb = [colors[0], colors[1], colors[2]];
      return true;
    } else {
      return false;
    }
  }

  private parseHex(color: string): boolean {
    let match6 = /^#([0-9a-f]){6}$/gi;
    let matchArray = color.match(match6);
    let matches = matchArray[0];
    if (notNull(matches)) {
      this.hex = [
        matches[1] + matches[2],
        matches[3] + matches[4],
        matches[5] + matches[6],
      ];
      return true;
    }

    let match3 = /([0-9a-f]){3}$/gi;
    matchArray = color.match(match3);
    matches = matchArray[0];
    if (notNull(matches)) {
      this.hex = [
        matches[1].repeat(2),
        matches[2].repeat(2),
        matches[3].repeat(2),
      ];
      return true;
    } else {
      return false;
    }
  }

  private convertHexToRgb() {
    const rgb: number[] = [];
    this.hex.forEach((color) => {
      rgb.push(parseInt(color, 16));
    });
    this.rgb = [rgb[0], rgb[1], rgb[2]];
  }

  private convertRgbToHex() {
    const hex: string[] = [];
    this.rgb.forEach((color) => {
      let asHex = Number(color).toString(16);
      if (asHex.length === 1) {
        asHex = "0" + asHex;
      }
      this.hex.push(asHex);
    });
    this.hex = [hex[0], hex[1], hex[2]];
  }

  get css() {
    return this.asHex.css;
  }

  get asRGB(): RGBColor {
    return new RGBColor(this.rgb);
  }

  asRGBA(opacity: number): RGBAColor {
    return this.asRGB.asRGBA(opacity);
  }

  get asHex(): HexColor {
    return new HexColor(this.hex);
  }

  asHex8(percent: number): Hex8Color {
    return this.asHex.asHex8(percent);
  }
}

class RGBColor {
  constructor(private rgb: [number, number, number]) {}

  asRGBA(opacity: number): RGBAColor {
    assert(opacity >= 0 && opacity <= 1);
    const rgba: [number, number, number, number] = [
      this.red,
      this.green,
      this.blue,
      opacity,
    ];
    return new RGBAColor(rgba);
  }

  get css(): string {
    return `rgb(${this.red}, ${this.green}, ${this.blue})`;
  }

  private get red() {
    return this.rgb[0];
  }

  private get green() {
    return this.rgb[1];
  }

  private get blue() {
    return this.rgb[2];
  }
}

class RGBAColor {
  constructor(private rgba: [number, number, number, number]) {}

  get css(): string {
    return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.opacity})`;
  }

  private get red() {
    return this.rgba[0];
  }

  private get green() {
    return this.rgba[1];
  }

  private get blue() {
    return this.rgba[2];
  }

  private get opacity() {
    return this.rgba[3];
  }
}

class HexColor {
  constructor(private hex: [string, string, string]) {}

  // No clue
  asHex8(percent: number): Hex8Color {
    assert(percent >= 0 && percent <= 100);
    let decimalValue = Math.round((percent * 255) / 100);
    let hexValue: string;

    if (percent < 7) {
      hexValue = "0" + decimalValue.toString(16).toUpperCase();
    } else {
      hexValue = decimalValue.toString(16).toUpperCase();
    }

    const hex8: [string, string, string, string] = [
      this.hex[0],
      this.hex[1],
      this.hex[2],
      hexValue,
    ];
    return new Hex8Color(hex8);
  }

  get css() {
    return `#${this.hex[0]}${this.hex[1]}${this.hex[2]}`;
  }
}

class Hex8Color {
  constructor(private hex8: [string, string, string, string]) {}

  get css() {
    return `#${this.hex8[0]}${this.hex8[1]}${this.hex8[2]}${this.hex8[3]}`;
  }
}
