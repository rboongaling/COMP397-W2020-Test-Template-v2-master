"use strict";
/**
 * @filename Dice.ts
 * @authors_name Ralph Royce Boongaling (301100805)
 * @date 02/22/2020
 * @program_description This class handles a single dice that when rolled, it will generates a value.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var objects;
(function (objects) {
    var Dice = /** @class */ (function (_super) {
        __extends(Dice, _super);
        // constructor
        function Dice(x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var _this = _super.call(this, config.Game.ASSETS.getResult("blank"), x, y, true) || this;
            _this.rolling = false;
            _this.x += _this.width / 2;
            _this.y += _this.height / 2;
            _this.value = -1;
            _this.label = new objects.Label("", undefined, undefined, undefined, x + (_this.image.width / 2), y + _this.image.height + 30);
            _this.Start();
            return _this;
        }
        Dice.prototype.IsRolling = function () {
            return this.rolling;
        };
        Dice.prototype.init = function (stage) {
            this.realStage = stage;
            this.realStage.addChild(this);
            this.realStage.addChild(this.label);
        };
        // PRIVATE METHODS
        Dice.prototype._checkBounds = function () {
        };
        /**
         * This function is used for initialization
         *
         * @memberof Button
         */
        Dice.prototype.Start = function () {
            this.name = "Dice";
        };
        Dice.prototype.Update = function () {
            if (this.rolling) {
                this.rotation += 5;
            }
            if (this.rotation == 360) {
                this.rotation = 0;
                this.rolling = false;
                this.UpdateRoll();
            }
        };
        Dice.prototype.Reset = function () {
        };
        Dice.prototype.Roll = function () {
            this.rolling = true;
        };
        Dice.prototype.UpdateRoll = function () {
            this.value = this.getNextNumber();
            console.log("dice" + this.value);
            this.image = new createjs.Bitmap(config.Game.ASSETS.getResult("dice" + this.value)).image;
            this.label.setText("[" + this.value + "]");
        };
        Dice.prototype.getNextNumber = function () {
            var min = Math.ceil(1);
            var max = Math.floor(6);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        Dice.prototype.GetValue = function () {
            return this.value;
        };
        return Dice;
    }(objects.GameObject));
    objects.Dice = Dice;
})(objects || (objects = {}));
//# sourceMappingURL=Dice.js.map