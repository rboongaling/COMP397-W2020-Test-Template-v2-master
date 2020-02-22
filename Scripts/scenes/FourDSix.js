"use strict";
/**
 * @filename FourDSix.ts
 * @authors_name Ralph Royce Boongaling (301100805)
 * @date 02/22/2020
 * @program_description This scene will handles the 4 dice version of the game which is the 4D6.
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
var scenes;
(function (scenes) {
    var FourDSix = /** @class */ (function (_super) {
        __extends(FourDSix, _super);
        // PRIVATE INSTANCE MEMBERS
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function FourDSix() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        //initialize and instatiate
        FourDSix.prototype.Start = function () {
            // create the link to regular mode
            this._regularMode = new objects.Button(config.Game.ASSETS.getResult("backButton"), 320, 400, true);
            // create the dice manager with 4 dice
            this._diceManager = new objects.DiceManager(4);
            // allows me to use the "this" keyword in a different scope
            var parent = this;
            // add the "Roll" button
            this._rollButton = new objects.Button(config.Game.ASSETS.getResult("rollButton"), 320, 300, true, function () {
                // when the "roll" button is clicked, start the rolling of the dice!
                parent._diceManager.Roll();
            });
            // add the "Update" ticker
            createjs.Ticker.on("tick", this.Update);
            this.Main();
        };
        FourDSix.prototype.Update = function () {
            // update the dice manager which updates each dice
            this._diceManager.Update();
        };
        FourDSix.prototype.Main = function () {
            // add the background image
            this.addChild(new objects.Image(config.Game.ASSETS.getResult("background")));
            // add the click event to the 4d6 button
            this._regularMode.on("click", function () {
                config.Game.SCENE = scenes.State.PLAY;
            });
            // initialize the dice manager, and add the buttons to the scene
            this._diceManager.init(this);
            this.addChild(this._rollButton);
            this.addChild(this._regularMode);
        };
        return FourDSix;
    }(objects.Scene));
    scenes.FourDSix = FourDSix;
})(scenes || (scenes = {}));
//# sourceMappingURL=FourDSix.js.map