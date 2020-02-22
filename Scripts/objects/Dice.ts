/**
 * @filename Dice.ts
 * @authors_name Ralph Royce Boongaling (301100805)
 * @date 02/22/2020
 * @program_description This class handles a single dice that when rolled, it will generates a value.
 */

module objects
{
    export class Dice extends GameObject
    {       
        private value:number;
        private label:objects.Label;
        private realStage:objects.Scene;

        private rolling:boolean = false;


        // constructor
        constructor(x:number = 0, y:number= 0)
        {
            super(config.Game.ASSETS.getResult("blank"), x, y, true);
            this.x += this.width / 2;
            this.y += this.height / 2;

            this.value = -1;
            this.label = new objects.Label("", undefined, undefined, undefined, x + (this.image.width / 2), y + this.image.height + 30);
            this.Start();
        }
        public IsRolling():boolean{
            return this.rolling;
        }
        public init(stage:objects.Scene){
            this.realStage = stage;
            this.realStage.addChild(this);
            this.realStage.addChild(this.label);
        }
        
        // PRIVATE METHODS
        protected _checkBounds(): void {
            
        }

        /**
         * This function is used for initialization
         *
         * @memberof Button
         */
        public Start(): void {
            this.name = "Dice";
        }

        public Update(): void {
            if(this.rolling){
                this.rotation += 5;
            }
            if (this.rotation == 360){
                this.rotation = 0;
                this.rolling = false;
                this.UpdateRoll();
            }
        }

        public Reset(): void {
            
        }
        public Roll():void{
            this.rolling = true;
        }
        public UpdateRoll(): void {
            this.value = this.getNextNumber();
            console.log("dice" + this.value)
            this.image = new createjs.Bitmap(config.Game.ASSETS.getResult("dice" + this.value)).image;
            this.label.setText("[" + this.value + "]");
        }

        private getNextNumber():number{
            let min = Math.ceil(1);
            let max = Math.floor(6);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        public GetValue():number{
            return this.value;
        }
    }
}