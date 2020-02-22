"use strict";
/**
 * @filename DiceManager.ts
 * @authors_name Ralph Royce Boongaling (301100805)
 * @date 02/22/2020
 * @program_description This class handles the dice that are displayed in a line on a single scene.
 */
var objects;
(function (objects) {
    var DiceManager = /** @class */ (function () {
        /**
         *Creates an instance of DiceManager to spawn and handle all dice
         * @param {number} dice the number of Dice to spawn in a single row
         * @memberof DiceManager
         */
        function DiceManager(dice) {
            this.waitingForRoll = false;
            // if 4d6 mode should be enabled (this calculates the total and drops the lowest value)
            this.fourDSixMode = dice >= 4;
            // the array of dice which are created
            this.dice = [];
            // create each die with a spacing of 10px appart
            var x = 0;
            for (var i = 0; i < dice; i++) {
                this.dice.push(new objects.Dice(x));
                x += this.dice[this.dice.length - 1].width + 10;
            }
            // crete the total label. Note that this is only used in 4d6 mode
            this.totalLabel = new objects.Label("", "20pt", "Arial", undefined, 100, 300);
        }
        /**
         * This method initializes each sub-object in this object (ex. Dice classes and other labels)
         * @param {objects.Scene} stage the stage to add each item to
         * @memberof DiceManager
         */
        DiceManager.prototype.init = function (stage) {
            // init each dice
            this.dice.forEach(function (dice) {
                dice.init(stage);
            });
            // add the "total" label
            stage.addChild(this.totalLabel);
        };
        // PRIVATE METHODS
        DiceManager.prototype._checkBounds = function () {
        };
        /**
         * start the rolling of each dice contained within this class
         * @memberof DiceManager
         */
        DiceManager.prototype.Roll = function () {
            this.dice.forEach(function (dice) {
                dice.Roll();
            });
            this.waitingForRoll = true;
        };
        /**
         * handles the update of each dice
         * @memberof DiceManager
         */
        DiceManager.prototype.Update = function () {
            this.dice.forEach(function (dice) {
                dice.Update();
            });
            // if the dice have stopped rolling, and the system has not yet calculated the total, calculate and display the total if 4d6 is enabled
            if (!this.dice[0].IsRolling() && this.waitingForRoll) {
                this.waitingForRoll = false;
                if (this.fourDSixMode)
                    this.totalLabel.setText("Total: " + this.CalculateValues());
            }
        };
        /**
         * Calculates the total for this specific roll (minus the lowest dice)
         * @returns {number} the total
         * @memberof DiceManager
         */
        DiceManager.prototype.CalculateValues = function () {
            var values = [];
            // put each value into an array
            this.dice.forEach(function (dice) {
                values.push(dice.GetValue());
            });
            // get the index of the smallest item in the array, and remove it
            delete values[values.indexOf(Math.min.apply(Math, values))];
            // calculate the sum of the remaining items and return it
            var sum = 0;
            values.forEach(function (v) {
                sum += v;
            });
            return sum;
        };
        return DiceManager;
    }());
    objects.DiceManager = DiceManager;
})(objects || (objects = {}));
//# sourceMappingURL=DiceManager.js.map