/**
 * @filename FourDSix.ts
 * @authors_name Ralph Royce Boongaling (301100805)
 * @date 02/22/2020
 * @program_description This scene will handles the 4 dice version of the game which is the 4D6.
 */

module scenes
{
    export class FourDSix extends objects.Scene
    {
        private _diceManager: objects.DiceManager;
        private _rollButton: objects.Button
        private _regularMode: objects.Button;


        // PRIVATE INSTANCE MEMBERS
 

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super();

            this.Start();
        }

        // PRIVATE METHODS

        // PUBLIC METHODS

        //initialize and instatiate
        public Start(): void 
        {
            // create the link to regular mode
            this._regularMode = new objects.Button(config.Game.ASSETS.getResult("backButton"), 320, 400, true);

            // create the dice manager with 4 dice
            this._diceManager = new objects.DiceManager(4);

            // allows me to use the "this" keyword in a different scope
            let parent = this;

            // add the "Roll" button
            this._rollButton = new objects.Button(config.Game.ASSETS.getResult("rollButton"), 320, 300, true, function(){
                // when the "roll" button is clicked, start the rolling of the dice!
                parent._diceManager.Roll();
            });
            // add the "Update" ticker
            createjs.Ticker.on("tick", this.Update);

            this.Main();
        }        
        
        public Update(): void 
        {
            // update the dice manager which updates each dice
            this._diceManager.Update();
        }
        
        public Main(): void 
        {
            // add the background image
            this.addChild(new objects.Image(config.Game.ASSETS.getResult("background")))

            // add the click event to the 4d6 button
            this._regularMode.on("click", ()=>{
                config.Game.SCENE = scenes.State.PLAY;
            });

            // initialize the dice manager, and add the buttons to the scene
            this._diceManager.init(this)
            this.addChild(this._rollButton);
            this.addChild(this._regularMode);
        }       
    }
}