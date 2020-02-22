/**
 * @filename DiceManager.ts
 * @authors_name Ralph Royce Boongaling (301100805)
 * @date 02/22/2020
 * @program_description This class handles the dice that are displayed in a line on a single scene.
 */

module objects
{
    export class DiceManager
    {       
        private dice:objects.Dice[];
        private waitingForRoll:boolean = false;
        private totalLabel:objects.Label;
        private fourDSixMode:boolean;

        /**
         *Creates an instance of DiceManager to spawn and handle all dice
         * @param {number} dice the number of Dice to spawn in a single row
         * @memberof DiceManager
         */
        constructor(dice:number)
        {
            // if 4d6 mode should be enabled (this calculates the total and drops the lowest value)
            this.fourDSixMode = dice >= 4

            // the array of dice which are created
            this.dice = [];

            // create each die with a spacing of 10px appart
            let x = 0;
            for (let i = 0; i < dice; i++) {
                this.dice.push(new objects.Dice(x))
                x += this.dice[this.dice.length-1].width + 10;
            }

            // crete the total label. Note that this is only used in 4d6 mode
            this.totalLabel = new Label("", "20pt", "Arial", undefined, 100, 300);
        }

        /**
         * This method initializes each sub-object in this object (ex. Dice classes and other labels)
         * @param {objects.Scene} stage the stage to add each item to
         * @memberof DiceManager
         */
        public init(stage:objects.Scene){
            // init each dice
            this.dice.forEach(dice => {
                dice.init(stage);
            });

            // add the "total" label
            stage.addChild(this.totalLabel);
        }
        
        // PRIVATE METHODS
        protected _checkBounds(): void {
            
        }

        /**
         * start the rolling of each dice contained within this class
         * @memberof DiceManager
         */
        public Roll(): void {
            this.dice.forEach(dice => {
                dice.Roll();
            });
            this.waitingForRoll = true;
        }

        /**
         * handles the update of each dice
         * @memberof DiceManager
         */
        public Update():void{
            this.dice.forEach(dice => {
                dice.Update();
            });
            // if the dice have stopped rolling, and the system has not yet calculated the total, calculate and display the total if 4d6 is enabled
            if (!this.dice[0].IsRolling() && this.waitingForRoll){
                this.waitingForRoll = false;
                if (this.fourDSixMode) this.totalLabel.setText("Total: " + this.CalculateValues())
            }
        }

        /**
         * Calculates the total for this specific roll (minus the lowest dice)
         * @returns {number} the total
         * @memberof DiceManager
         */
        public CalculateValues():number{
            let values:number[] = [];

            // put each value into an array
            this.dice.forEach(dice => {
                values.push(dice.GetValue());
            });
            
            // get the index of the smallest item in the array, and remove it
            delete values[values.indexOf(Math.min(...values))];
            
            // calculate the sum of the remaining items and return it
            let sum = 0;
            values.forEach(v => {
                sum += v;
            });

            return sum;
        }
    }
}