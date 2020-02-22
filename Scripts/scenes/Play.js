"use strict";
/**
 * @filename Play.ts
 * @authors_name Ralph Royce Boongaling (301100805)
 * @date 02/22/2020
 * @program_description This scene handles the 2 dice version of the game.
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
    var Play = /** @class */ (function (_super) {
        __extends(Play, _super);
        // PRIVATE INSTANCE MEMBERS
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Play() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        //initialize and instatiate
        Play.prototype.Start = function () {
            // create the link to 4D6 mode
            this._fourDSix = new objects.Button(config.Game.ASSETS.getResult("4d6"), 320, 400, true);
            // create the dice manager with 2 dice
            this._diceManager = new objects.DiceManager(2);
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
        Play.prototype.Update = function () {
            // update the dice manager which updates each dice
            this._diceManager.Update();
        };
        Play.prototype.Main = function () {
            // add the background image
            this.addChild(new objects.Image(config.Game.ASSETS.getResult("background")));
            // add the click event to the 4d6 button
            this._fourDSix.on("click", function () {
                config.Game.SCENE = scenes.State.FOUR_D_SIX;
            });
            // initialize the dice manager, and add the buttons to the scene
            this._diceManager.init(this);
            this.addChild(this._rollButton);
            this.addChild(this._fourDSix);
        };
        return Play;
    }(objects.Scene));
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=Play.js.map